<template>
  <main>
    <div class="nav_container">
      <el-menu theme="dark" default-active="/" class="el-menu-demo" mode="horizontal" v-bind:router="true" @select="clearWalking">
        <el-menu-item index="/">地图界面</el-menu-item>
        <el-menu-item index="/admin">添加点</el-menu-item>
        <el-menu-item index="/#/">最短距离：<template>{{ weight }}</template>m(点我清空已渲染路线)</el-menu-item>
      </el-menu>
    </div>
    <article>
      <div id="map_article"></div>
    </article>
  </main>
</template>

<script>
  import PageHeader from '../layouts/PageHeader.vue'
  import Vue from 'vue'

  export default {
    methods: {
      pointIn (point) {
        for (var i = 0; i < this.point_arr.length; i++) {
          if (this.point_arr[i].lat === point.lat) {
            return i.toString()
          }
        }
        return '-1'
      },
      clearWalking () {
        for (var i = 0; i < this.walking_arr.length; i++) {
          this.walking_arr[i].clearResults()
        }
      },
      initPoint (map) {
        let BMap = window.BMap
        for (var i = 0; i < this.point_arr.length; i++) {
          var marker = new BMap.Marker(this.point_arr[i])
          var _this = this
          marker.addEventListener('click', function () {
            if (_this.choice_arr.indexOf(this) !== -1) {
              this.getLabel().setStyle({
                color: 'black'
              })
              _this.choice_arr.pop(this)
            } else {
              _this.choice_arr.push(this)
              if (_this.choice_arr.length > 2) {
                _this.choice_arr.shift().getLabel().setStyle({
                  color: 'black'
                })
              }
              this.getLabel().setStyle({
                color: 'red'
              })
            }
            if (_this.choice_arr.length === 2) {
              _this.clearWalking()
              Vue.http.get('http://123.207.99.163/v/s/' + _this.pointIn(_this.choice_arr[0].point) + '/e/' + _this.pointIn(_this.choice_arr[1].point)).then((response) => {
                var pathArr = response.body.path
                _this.weight = response.body.distance
                while (pathArr.length > 1) {
                  var walking = new BMap.WalkingRoute(map, {
                    renderOptions: {map: map, autoViewport: false}
                  })
                  walking.search(_this.point_arr[pathArr[0]], _this.point_arr[pathArr[1]])
                  walking.setSearchCompleteCallback(function () {
                  })
                  pathArr.shift()
                  _this.walking_arr.push(walking)
                }
              })
              while (_this.choice_arr.length !== 0) {
                _this.choice_arr[0].getLabel().setStyle({
                  color: 'black'
                })
                _this.choice_arr.shift()
              }
            }
          })
          marker.setTitle(this.title_arr[i])
          var label = new BMap.Label(this.title_arr[i], {offset: new BMap.Size(20, -10)})
          marker.setLabel(label)
          map.addOverlay(marker)
        }
      },
      updatePoint (map) {
        Vue.http.get('http://123.207.99.163/v/places').then((response) => {
          let responseArr = response.body
          var BMap = window.BMap
          for (var item of responseArr) {
            this.point_arr.push(new BMap.Point(item.lng, item.lat))
            this.title_arr.push(item.name)
          }
          this.initPoint(map)
        })
      }
    },
    data () {
      return {
        point_arr: [],
        title_arr: [],
        choice_arr: [],
        walking_arr: [],
        weight: ''
      }
    },
    mounted: function () {
    // 百度地图API功能
      let BMap = window.BMap
      var map = new BMap.Map('map_article')
      map.centerAndZoom(new BMap.Point(113.942101, 22.538743), 17)
      this.updatePoint(map)
    },
    components: {
      PageHeader
    }
  }
</script>

<style>
  #map_article{
    width: 100%;
    height: 1000px;
    overflow: hidden;
  }
</style>