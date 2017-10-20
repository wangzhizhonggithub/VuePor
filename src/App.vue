<template>
  <div class="tmpl">
  
    jhkhkh {{name}}
  
    <!--使用占位符 -->
  
    <router-view></router-view>
  
  
  
  </div>
</template>

<script>
  // es6的写法
  
  export default {
  
    data() {
  
      return {
  
        name: 'heima'
  
      }
  
    },
  
    methods: {}
  
  }
</script>
<style scoped>
  
</style>