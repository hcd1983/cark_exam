<template>
  <div>
    <AutocompleteInput />
  </div>
  <h1 class="text-3xl font-bold underline text-red-300">
    Hello world!
  </h1>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import AutocompleteInput from '@/components/AutocompleteInput.vue';

export default {
  name: 'App',
  components: {
    AutocompleteInput,
  },
  async mounted() {
    const res = await fetch('/api/users');
    const data = await res.json();
    console.log(data);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
