<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
import PageHeader from './layouts/PageHeader.vue'

export default {
  name: 'app',
  components: {
    PageHeader
  }
}
</script>

<style>
  #app{
  }
</style>
