<template>
<div>
  <template v-for="(input) in inputs" :key="input.key">
    <div v-if="input.type ==='select'" class="flex gap-3 items-center">
      <label class="font-bold">{{ input.label }}</label>
      <select
        @input="handleValeUpdate($event, input.key)"
        class="flex-1 border px-2 py-1"
      >
        <option v-for="{value, text} in input.options" :value="value" :key="value">
          {{ text }}
        </option>
      </select>
    </div>
  </template>
</div>
</template>

<script setup>
import { toRefs } from 'vue';

const emit = defineEmits(['update:values']);
const props = defineProps({
  inputs: Array,
  values: Object,
});
const { inputs, values } = toRefs(props);
const handleValeUpdate = ({ target }, key) => {
  const valuesCopy = {
    ...values.value,
  };
  valuesCopy[key] = target.value;
  emit('update:values', {
    ...valuesCopy,
  });
};
</script>
