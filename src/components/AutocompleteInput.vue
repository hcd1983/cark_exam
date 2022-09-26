<template>
  <div ref="el" class="relative">
    <input
      :value="search"
      :placeholder="placeholder"
      @input="handleInput"
      @keydown.up="handlePressUp"
      @keydown.down="handlePressDown"
      @keydown.esc="handlePressEsc"
      @keydown.enter="handlePressEnter"
      type="search"
      class="border-gray-700 border w-full py-3 px-2 outline-none rounded-md"
    />
    <div v-if="showOptions" class="absolute w-full top-full bg-gray-100">
      <ul class="grid gap-2">
        <li
          v-for="(suggestion, idx) in suggestions"
          :key="suggestion"
          :class="[`${currentIdx === idx ? 'bg-gray-700 text-white' : ''}`]"
        >
          <button
            @click.prevent="handleSuggestionClick(idx)"
            @mouseenter.prevent="currentIdx = idx"
            @mouseleave.prevent="currentIdx = null"
            @focus="currentIdx = idx"
            @blur="currentIdx = null"
            class="w-full flex items-center justify-start px-1 py-2 outline-none"
          >
            {{ suggestion }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, computed } from 'vue';
import handleClickOutSide from '@/inc/handleClickOutSide';

const props = defineProps({
  suggestions: Array,
  placeholder: String,
});
const { suggestions, placeholder } = toRefs(props);
const el = ref(null);
const search = ref('');
const currentIdx = ref(null);
const showOptions = ref(true);

const emit = defineEmits(['change', 'submit']);

const currentSuggestion = computed(() => {
  if (suggestions.value.length && currentIdx.value !== null) {
    return suggestions.value[currentIdx.value];
  }
  return null;
});

const hideSuggestions = () => {
  currentIdx.value = null;
  showOptions.value = false;
};

// eslint-disable-next-line no-unused-vars
const showSuggestions = () => {
  showOptions.value = true;
};

const handleInput = (e) => {
  showOptions.value = true;
  emit('change', e.target.value);
  search.value = e.target.value;
};

const handlePressUp = () => {
  if (!showOptions.value) return;
  if (!currentIdx.value) {
    currentIdx.value = suggestions.value.length - 1;
  } else {
    currentIdx.value -= 1;
  }
};

const handlePressDown = () => {
  if (!showOptions.value) return;
  if (currentIdx.value === null || currentIdx.value === suggestions.value.length - 1) {
    currentIdx.value = 0;
  } else {
    currentIdx.value += 1;
  }
};

const handlePressEsc = (e) => {
  e.preventDefault();
  if (showOptions.value) {
    hideSuggestions();
  } else {
    search.value = '';
    emit('submit', null);
  }
};

const handlePressEnter = (e) => {
  if (currentSuggestion.value) {
    search.value = currentSuggestion.value;
    emit('submit', currentSuggestion.value);
  } else {
    emit('submit', e.target.value);
  }
  hideSuggestions();
};

const handleSuggestionClick = (idx) => {
  currentIdx.value = idx;
  search.value = currentSuggestion.value;
  emit('submit', currentSuggestion.value);
  hideSuggestions();
};

handleClickOutSide(el, hideSuggestions);
</script>
