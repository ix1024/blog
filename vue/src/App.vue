<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/item">添加</router-link>
      <router-link to="/list">列表</router-link>
    </div>
    <router-view/>
  </div>
</template>


<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import 'assets/main.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.nav{
  padding: 10px;
}
</style>
