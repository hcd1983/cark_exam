<template>
  <div id="wrap">
    <div class="container mx-auto px-3 py-10">
      {{ requestParams }}
      <h2 class="text-3xl font-bold mb-3">Autocomplete with debounce</h2>
      <AutocompleteInput
        :suggestions="suggestions"
        placeholder="Please Type Mission Name"
        @change="getSuggestions"
        @submit="searchSubmit"
      />
      <h2 class="text-3xl font-bold mt-10">DataTable with api support & Object Piker Filter</h2>
      <FilterPanel
        class="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5 mt-3"
        :inputs="filterInputs"
        v-model:values="requestParams"
      />
      <DataTable :rows="tableRows" :cols="TableCols">
        <template #logo="{ data }">
          <img
            v-if="data.links.patch.small"
            :src="data.links.patch.small"
            :alt="data.name"
            class="w-auto h-[100px]"
          />
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import AutocompleteInput from '@/components/AutocompleteInput.vue';
import DataTable from '@/components/DataTable.vue';
import FilterPanel from '@/components/FilterPanel.vue';
import debounce from '@/inc/debounce';
import axios from 'axios';

const tableRows = ref([]);
const suggestions = ref([]);
const requestParams = ref({
  prePage: 20,
  page: 1,
  isSuccess: null,
  search: null,
  sortBy: 'date_unix',
  sort: 'asc',
});
const TableCols = [
  { label: 'Mission', key: 'name' },
  { label: 'Date', key: 'date_unix' },
  { label: 'Logo', key: 'logo' },
  { label: 'Status', key: 'success' },
  { label: 'Actions', key: 'actions' },
];

const filterInputs = [
  {
    type: 'select',
    key: 'sortBy',
    label: '排序依',
    options: [
      { text: '任務名稱', value: 'name' },
      { text: '任務日期', value: 'date_unix' },
    ],
  },
  {
    type: 'select',
    key: 'sort',
    label: '排序',
    options: [
      { text: 'ASC', value: 'asc' },
      { text: 'DESC', value: 'desc' },
    ],
  },
  {
    type: 'select',
    key: 'isSuccess',
    label: '任務狀態',
    options: [
      { text: '全部顯示', value: null },
      { text: '成功', value: true },
      { text: '失敗', value: false },
    ],
  },
];

const getData = () => {
  const config = {
    params: requestParams.value,
  };
  axios.get('/api/launches', config).then(({ data }) => {
    tableRows.value = data.launches;
  });
};

const getSuggestions = debounce((search) => {
  const config = {
    params: { search },
  };
  axios.get('/api/suggestions', config).then(({ data }) => {
    suggestions.value = data;
  });
}, 500);

const searchSubmit = (search) => {
  requestParams.value.search = search;
};

watch(requestParams, () => {
  getData();
}, { deep: true, immediate: true });

</script>
