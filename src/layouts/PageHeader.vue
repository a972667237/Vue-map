<template>
  <main>
    <div class="nav_container">
      <el-menu theme="dark" default-active="/admin" class="el-menu-demo" mode="horizontal" @select="handleSelect" v-bind:router="true">
        <el-menu-item index="/">地图界面</el-menu-item>
        <el-menu-item index="/admin">后台管理</el-menu-item>
      </el-menu>
    </div>
    <article>
      <slot></slot>
    </article>
  </main>
</template>

<script>
  export default {
    methods: {
      handleSelect (key, keyPath) {
      }
    }
  }
</script>

<style>
  body{
    margin: 0;
    padding: 0;
  }
</style>