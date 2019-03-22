<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: '微软雅黑', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width:1600px;
}
/*重置ivu样式*/
.ivu-modal-content{
  border-radius: 0 !important;
}
.ivu-table-border .ivu-table-tip td{
  border-right:0;
}
</style>
