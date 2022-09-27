<template>
  <div id="wrap">
    <div class="container mx-auto px-3 py-10 max-w-[900px]">
      <h2 class="text-3xl font-bold mb-3">Autocomplete with debounce</h2>
      <AutocompleteInput
        :suggestions="suggestions"
        placeholder="Please Type Mission Name"
        @change="getSuggestions"
        @submit="searchSubmit"
      />
      <h2 class="text-3xl font-bold mt-10">Object Piker Filter</h2>
      <FilterPanel
        class="grid grid-cols-2 gap-5 md:grid-cols-3 mt-3"
        :inputs="filterInputs"
        v-model:values="filterParams"
      />
      <Pagination
        :totalItems="totalItems"
        :perPage="pagesParams.perPage"
        :current="pagesParams.page"
        #="{ totalPages, totalItems, nextPage, prevPage, current }"
      >
        <h2 class="text-3xl font-bold mt-10 mb-3">Pagination wih renderless component</h2>
        <div v-if="totalPages > 1" class="flex justify-center justify-between">
          <div class="flex gap-3 items-center">
            <label>每頁顯示</label>
            <select v-model="pagesParams.perPage"  class="flex-1 border px-2 py-1">
              <option v-for="val in [5, 10, 20, 30]" :key="val" :value="val">{{ val }}</option>
            </select>
          </div>
          <div class="flex items-center gap-2">
            <div class="grid grid-cols-2">
              <button
                :disabled="!prevPage"
                @click="pagesParams.page = prevPage"
                class="flex items-center justify-center w-[100px]
              text-white bg-gray-600 cursor-pointer
              hover:bg-black border-r border-gray-100 rounded-l-lg"
              >
                Prev
              </button>
              <button
                :disabled="!nextPage"
                @click="pagesParams.page = nextPage"
                class="flex items-center justify-center w-[100px]
              text-white bg-gray-600 cursor-pointer
              hover:bg-black border-l border-gray-100 rounded-r-lg"
              >
                Next
              </button>
            </div>
            <div> {{ current }} / {{ totalPages }}</div>
          </div>
        </div>
      </Pagination>
      <h2 class="text-3xl font-bold mt-10">DataTable</h2>
      <DataTable :rows="tableRows" :cols="TableCols" class="mt-10 w-full">
        <template #logo="{ data }">
          <img
            v-if="data.links.patch.small"
            :src="data.links.patch.small"
            :alt="data.name"
            class="w-[100px] h-[100px] mx-auto object-contain"
          />
        </template>
        <template #date="{data}">
          <TimeFormatter :time="new Date(data.date_unix * 1000)" />
        </template>
        <template #success="{ data }">
          <div
            v-if="data.success === true"
            class="py-1 px-2 bg-green-700 text-white text-sm rounded-lg flex w-fit mx-auto"
          >
            Success
          </div>
          <div
            v-else-if="data.success === false"
            class="py-1 px-2 bg-red-700 text-white text-sm rounded-lg flex w-fit mx-auto"
          >
            Fail
          </div>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import {
  // eslint-disable-next-line no-unused-vars
  ref, watch, reactive, computed, watchPostEffect,
} from 'vue';
import AutocompleteInput from '@/components/AutocompleteInput.vue';
import DataTable from '@/components/DataTable.vue';
import FilterPanel from '@/components/FilterPanel.vue';
import TimeFormatter from '@/components/TimeFormatter.vue';
import Pagination from '@/components/Pagination.vue';
import debounce from '@/inc/debounce';
import axios from 'axios';

const tableRows = ref([]);
const suggestions = ref([]);
const search = ref('');
const totalItems = ref(0);
const pagesParams = reactive({
  perPage: 20,
  page: 1,
});
const filterParams = reactive({
  isSuccess: null,
  sortBy: 'date_unix',
  sort: 'asc',
});

const requestParams = computed(() => ({
  search: search.value,
  ...filterParams,
  ...pagesParams,
}));

const TableCols = [
  {
    label: 'Mission', key: 'name', tdClass: 'text-center font-bold w-[150px]',
  },
  {
    label: 'Date', key: 'date', tdClass: 'text-center w-[150px]',
  },
  { label: 'Description', key: 'details', tdClass: 'line-clamp-3' },
  { label: 'Logo', key: 'logo', tdClass: 'w-[120px]' },
  { label: 'Status', key: 'success', tdClass: 'w-[100px]' },
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
    totalItems.value = data.total;
  });
};

const getSuggestions = debounce((text) => {
  const config = {
    params: { search: text },
  };
  axios.get('/api/suggestions', config).then(({ data }) => {
    suggestions.value = data;
  });
}, 500);

const searchSubmit = (text) => {
  search.value = text;
};

watchPostEffect(() => {
  getData();
});

watch(filterParams, () => {
  pagesParams.page = 1;
}, { deep: true });

watch(() => pagesParams.perPage, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    pagesParams.page = 1;
  }
}, { deep: true });

watch(search, () => {
  pagesParams.page = 1;
  filterParams.isSuccess = null;
});

</script>
