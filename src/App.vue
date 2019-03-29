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

.ivu-modal-body .ivu-form-item:last-child{
  margin-bottom:6px;
}

.table-default td .ivu-picker-panel-body{
  font-size:12px;
}
</style>
