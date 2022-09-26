<template>
  <input ref="input" @input="handleInput" :value="search" class="border-gray-700 border" />
  <div>
    <ul>
      <li v-for="suggestion in suggestions" :key="suggestion">
        <button @click="handleSuggestionClick(suggestion)">{{ suggestion }}</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';
import debounce from '@/inc/debounce';

export default {
  name: 'AutocompleteInput',
  setup() {
    const input = ref(null);
    const search = ref('');
    const suggestions = ref(['I', 'love', 'you']);
    const handleInput = debounce((e) => {
      search.value = e.target.value;
    }, 100);

    const handleSuggestionClick = (text) => {
      console.log(text);
      search.value = text;
    };

    // const getSuggestions = () => ['I', 'love', 'you'];

    return {
      search, handleInput, suggestions, handleSuggestionClick, input,
    };
  },
};
</script>

<style scoped>

</style>
