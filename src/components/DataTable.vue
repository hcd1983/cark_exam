<template>
<table v-if="cols.length && rows.length">
  <thead class="bg-black text-white">
  <tr>
    <th
      v-for="col in cols"
      :key="col.key"
    >
      {{ col.label }}
    </th>
  </tr>
  </thead>
  <tbody>
  <tr v-for="(row, idx) in rows" :key="idx" class="even:bg-gray-200">
    <td
      v-for="col in cols"
      :key="`${idx}-${col.key}`"
      :class="col.tdClass"
      class="py-1 align-middle"
    >
      <slot :name="col.key" :data="row">
        {{
          `${ ['string', 'number', 'boolean' ].includes(typeof (row[col.key])) ?
            row[col.key] : '' }`
        }}
      </slot>
    </td>
  </tr>
  </tbody>
</table>
<template v-else>
  No Data
</template>
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps({
  cols: { type: Array, default() { return []; } },
  rows: { type: Array, default() { return []; } },
});

const { cols, rows } = toRefs(props);
</script>
