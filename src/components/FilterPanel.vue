<template>
<div>
  <template v-for="(input) in inputs" :key="input.key">
    <div v-if="input.type ==='select'" class="flex gap-3 items-center">
      <label class="font-bold">{{ input.label }}</label>
      <select
        v-model="values[input.key]"
        class="flex-1 border px-2 py-1"
      >
        <option
          v-for="{value, text} in input.options"
          :key="value"
          :value="value"
          :selected="value === values[input.key]"
        >
          {{ text }}
        </option>
      </select>
    </div>
  </template>
</div>
</template>

<script setup>
import { toRefs } from 'vue';

// const emit = defineEmits(['update:values']);
const props = defineProps({
  inputs: Array,
  values: Object,
});
const { inputs, values } = toRefs(props);
</script>
