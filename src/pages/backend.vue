<template>
    <main>
    <div class="nav_container">
      <el-menu theme="dark" default-active="/admin" class="el-menu-demo" mode="horizontal" v-bind:router="true">
        <el-menu-item index="/">地图界面</el-menu-item>
        <el-menu-item index="/admin">添加点</el-menu-item>
      </el-menu>
    </div>
    <article>
        <div class="form_container">
          <el-form label-position="top"  class="demo-form-stacked">
            <el-form-item label="名字">
              <el-input v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="纬度">
              <el-input v-model="lat"></el-input>
            </el-form-item>
            <el-form-item label="经度">
              <el-input v-model="lng"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click='addPoint' >立即创建</el-button>
            </el-form-item>
            </el-form>
        </div>
    </article>
  </main>
</template>

<script>
  import PageHeader from '../layouts/PageHeader.vue'
  import Vue from 'vue'

  export default {
    methods: {
      addPoint () {
        Vue.http.get('http://123.207.99.163/v/lat/' + this.lat + '/lng/' + this.lng + '/name/' + this.name).then((response) => {
          this.lat = ''
          this.lng = ''
          this.name = ''
        })
        this.$alert('提交成功', '提交成功', {
          comfirmButtonText: '确定'
        })
      }
    },
    data () {
      return {
        name: '',
        lat: '',
        lng: ''
      }
    },
    components: {
      PageHeader
    }
  }
</script>

<style>
  .form_container{
    padding: 1%;
  }
</style>