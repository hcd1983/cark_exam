# cark_exam

## Component spec design

Pick at least 2 components and designing with following spec and typing definition(spec only):

* Props
* Emits
* Slot with example
* Description for implementation strategy.
* (Optional) Exposed function.
* (Optional) Additional features you like.

1. Autocomplete input.
2. Recursive menu item with SVG icon support.
3. Image slideshow
4. Object picker with custom render support
5. DataTable with api support
6. Renderless component.
7. Any other goods you like.

## View on Github Pages
https://github.hcd-design-studio.com/cark_exam/

## 專案說明

### 串接 spaceX launches api
火箭發射計畫表格。


### API
使用 [miragejs](https://miragejs) ，在本地端模擬 API 。

* /api/suggestions: 取得建議字串。用於 Autocomplete 的字串選項。
* /api/launches: 火箭發射計畫列表，包含 filter 選項。

## 前端架構說明

分成四個 components ，全部都能和 api 連動，主要操作都放在 [App.vue](https://github.com/hcd1983/cark_exam/blob/master/src/App.vue)，以下將為每一個部分依**功能說明**、**執行方法**進行說明，並在最後說明觸發 api 的條件。

* Autocomplete input
* Object picker filter
* Pagination 
* Datatable

以下依照方便理解的順序說明每個 component

## Autocomplete
file: https://github.com/hcd1983/cark_exam/blob/master/src/components/AutocompleteInput.vue

![](https://i.imgur.com/hgnLoQT.png)

### 功能說明

* props 動態導入建議字串並顯示
* 建議字串列表顯示時，鍵盤按上下可以選擇字串
* 建議字串列表顯示時，滑鼠移入可以選擇字串
* 建議字串列表顯示時，點 esc ，建議字串列表隱藏
* 建議字串列表隱藏時，點 esc ，input 內文字清除
* 建議字串列表反黑時，點 enter，input 填入建議文字， 呼叫 api 更新 table
* 建議字串列表無反黑時，點 enter 使用 input 內文字，呼叫 api 更新 table
* 建議字串列表顯示時，滑鼠點擊 input 或 建議列表外時(click outside)，建議字串列表隱藏
* 使用滑鼠點擊建議選項時，input 填入建議文字， 呼叫 api 更新 table

### 執行策略

* 從父物件串接 api 並導入建議字串
```javascript=
// AutocompleteInput.vue
// script setup
const props = defineProps({
  suggestions: Array,
  placeholder: String,
});
```
這樣的好處是，不管是靜態的建議字串，或是動態由 api 導入都可以由父物件決定。
所以 debounce function 放在父物件:
```javascript=
// App.vue 
const suggestions = ref([]);
const getSuggestions = debounce((text) => {
  const config = {
    params: { search: text },
  };
  axios.get('/api/suggestions', config).then(({ data }) => {
    suggestions.value = data;
  });
}, 500);
```
see debounce.js : https://github.com/hcd1983/cark_exam/blob/master/src/inc/debounce.js

* 會產生文字改變，和提交表單兩種事件。因此有 define 2 個 emit
```+=
// AutocompleteInput.vue
// script setup

// change 用來監聽 input 的變化
// submit 則是送出
const emit = defineEmits(['change', 'submit']);
```

* 滑鼠點擊 input 或 建議列表外時(click outside)，建議字串列表隱藏: 導入 composable file，製作 clickoutside

```javascript=
// handleClickOutSide.js
import { onMounted, onBeforeUnmount } from 'vue';

const handleClickOutSide = (elRef, onClickOutside) => {
  if (!elRef) return;
  const handler = (e) => {
    const el = elRef.value;
    if (!el) return;
    if (!el.contains(e.target)) {
      if (typeof onClickOutside === 'function') {
        onClickOutside();
      }
    }
  };
  onMounted(() => {
    window.addEventListener('click', handler);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('click', handler);
  });
};

export default handleClickOutSide;
```
使用在 AutocompleteInput.vue 最外層的 element
```htmlmixed=
// AutocompleteInput.vue
// template
<div ref="el">
   ...
</div>
```
```javascript=
// AutocompleteInput.vue
// script setup
import handleClickOutSide from '@/inc/handleClickOutSide';

const el = ref(null);
const onClickoutside = () => {} // clickoutside callback
handleClickOutSide(el, onClickoutside);
```



## Datatable

file: https://github.com/hcd1983/cark_exam/blob/master/src/components/DataTable.vue

![](https://i.imgur.com/M4SHvlS.png)

### 功能說明
在 App.vue 設定好每個欄位的標題和內容後，將所有資料放入 DataTable components，可渲染出表格，並對欄位進行內容和樣式上的修正。

### 執行策略
使用 scoped-slot 進行設計

```javascript=
// App.vue script setup

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

const tableRows = ref([]) // get data from api

```
在 DataTable.vue 的 template 的表格中 ，依照 col 帶入的 key 命名 slot name，並倒入資料。
```html=
<!-- DataTable.vue -->

<!-- head  -->
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
  
<!-- in table body row -->
<tr>
    <td
          v-for="col in cols"
          :key="`${idx}-${col.key}`"
          :class="col.tdClass"
        >
          <slot :name="col.key" :data="row">
            {{
              `${ ['string', 'number', 'boolean' ].includes(typeof (row[col.key])) ?
                row[col.key] : '' }`
            }}
          </slot>
    </td>
</tr>
```

在 App.vue 編輯需要調整的欄位，例如 logo：

```html=
<!-- App.vue -->
<template>
    <DataTable :rows="tableRows" :cols="TableCols">
        <template #logo="{ data }">
          <img
            v-if="data.links.patch.small"
            :src="data.links.patch.small"
            :alt="data.name"
            class="logo_image"
          />
        </template>
    </DataTable>
</template>
```

## Pagination component with renderless
file: https://github.com/hcd1983/cark_exam/blob/master/src/components/Pagination.vue

![](https://i.imgur.com/LN7jE08.png)

### 功能說明

在 Pagination componet 輸入必要資訊後，回傳產生頁碼的必要變數，並可在父物件中進行設計。

### 執行策略
適用 renderless componet 結構，搭配 scope-slot 。

```javascript=
// Pagination.vue
import { toRefs, computed } from 'vue';

export default {
  name: 'Pagination',
  props: {
    totalItems: Number, // 所有物件的總數       
    perPage: Number,    // 每頁物件的數量
    current: Number,    // 當前所在的頁面
  },
  setup(props, ctx) {
      const slotProps = computed(() => {
      // some logic here ...
          
      return {
        totalPages,
        current,
        totalItems,
        nextPage, // if no next page return null
        prevPage, // if no prev page return null
      };
    });
    // 直接使用 ctx.slots    
    return () => ctx.slots.default?.(slotProps.value) ?? '';
  },
};
```
利用 child componet 的計算結果，放到父物件去進行排版。
```html=
<!-- App.vue -->
<template>
    <Pagination
    :totalItems="totalItems"
    :perPage="perPage"
    :current="page"
    #="{ totalPages, totalItems, nextPage, prevPage, current }"
    >
        <button v-if="prevPage" @click="prev()" >Prev</button>
        <button v-if="nexPage" @click="next()">Next</button>
        {{ current }} / {{ totalPages }}
    </Pagination>
</template>    
```

## Filter
file: https://github.com/hcd1983/cark_exam/blob/master/src/components/FilterPanel.vue

![](https://i.imgur.com/zCQRUnI.png)

### 功能說明
變更選項後，重新向 api 索取資料。在父物件可以用簡單的設定檔產出選單和選項，可和父物件資料做 model 綁定

### 執行策略
使用 v-mode:varName 綁定 App.vue 和 FilterPanel.vue 產生的 input。

在 App.vue 製作欄位模組
```htmlmixed=
<!-- App.vue -->

<template>
    <FilterPanel
    :inputs="InputSetting"
    v-model:values="values"
  />
</template>
```
```javascript=
// App.vue script setup

//  需要綁定的選項
const values = reactive({
  isSuccess: null,
  sortBy: 'date_unix',
  sort: 'asc',
});

// 製作欄為的選項， key 對應 values 的 Property
const InputSetting = [
  {
    type: 'select',
    key: 'sortBy',
    label: '排序依',
    options: [
      { text: '任務名稱', value: 'name' },
      { text: '任務日期', value: 'date_unix' },
    ],
  },
  ...
];
```
```htmlmixed=
<!-- FilterPanel.vue -->

<template v-for="(input) in inputs" :key="input.key">
    <div v-if="input.type ==='select'">
      <label>{{ input.label }}</label>
      <select
        :value="values[input.key]"
        @input="handleUpdate($event, input.key)"      
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

```

## Api render table 事件觸發與設計策略

### Call Api 觸發條件與機制
* **App 第一次渲染**：Call api ＆ render
* **頁碼變更 (上一頁或下一頁)**： Call api ＆ render
* **每頁顯示數量變更**： 頁碼變回第 1 頁 => Call api ＆ render
* **filter 排序變更時**： 頁碼變回第 1 頁 => Call api ＆render
* **提交搜尋關鍵字**： 頁碼變回第 1 頁，filter 的任務狀態變成全選 => Call api ＆render

### 架構策略

由於頁碼、關鍵字、filter 是由不同的 componet 介面做管理，因此把變數分成三個部分。

```javascript=
// 關鍵字
const search = ref('');

// 每頁顯示數量與當前
const pagesParams = reactive({
  perPage: 20,
  page: 1,
});

// 排序及 filter
const filterParams = reactive({
  isSuccess: null,
  sortBy: 'date_unix',
  sort: 'asc',
});
```

### Preview
![](https://i.imgur.com/WYSrKHU.png)
 