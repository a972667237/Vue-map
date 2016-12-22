<template>
  <div class="container">
  <el-menu theme="dark" default-active="2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-menu-item index="2">订单管理</el-menu-item>
  </el-menu>
  </div>
  <div class="line"></div></template>

<script>
  export default {
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
  .container{
    margin:0;
    padding: 0;
  }
</style>