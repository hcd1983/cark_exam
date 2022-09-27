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

#### API
使用 [miragejs](https://miragejs) ，在本地端模擬 API 。

* /api/suggestions: 取得建議字串。用於 Autocomplete 的字串選項。
* /api/launches: 火箭發射計畫列表，包含 filter 選項。


___

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```
