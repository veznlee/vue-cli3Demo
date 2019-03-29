<template>
  <div class="fh-full-scroll module-top-nav-container f-pr">
    <div class="module-top-nav">
      <div class="nav-inner clearfix">
        <div class="nav-head">
          <router-link class="icon-box" :to="{name:'home'}">
            <i class="app-icon app-icon-index"></i>
          </router-link>
          <span class="text">廉政档案</span>
        </div>
        <div class="nav-body">
          <div class="module-nav-list">
            <router-link
            class="nav-item"
            v-for="item in currentRoute.children" 
            :key="item.id" 
            :to="{name:item.name}">{{item.mata.title}}</router-link>
          </div>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
import '@/assets/app.scss'
import findMenuMixin from '@/mixins/find-menu.js'
export default {
  mixins:[findMenuMixin],
  data(){
    return {
      pathName:'lzarchives'
    }
  }
}
</script>

<style scoped lang="scss">
    
</style>