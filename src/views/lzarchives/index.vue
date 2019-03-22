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
                        <router-link class="nav-item" :to="{name:'jd-person'}" id="router-jd-person">建档人员</router-link>
                        <router-link class="nav-item" :to="{name:'gl-person'}" id="router-gl-person">管理人员</router-link>
                        <router-link class="nav-item" :to="{name:'manage-account'}" id="router-manage-account">管理台账</router-link>
                        <router-link class="nav-item" :to="{name:'count-analyse'}" id="router-count-analyse">统计分析</router-link>
                        <router-link class="nav-item" :to="{name:'operate-log'}" id="router-operate-log">操作日志</router-link>
                    </div>
                </div>
            </div>
        </div>
        <router-view/>
    </div>
</template>


<script>
import '@/assets/app.scss'
export default {
    name:'LzArchives'
}
</script>

<style scoped lang="scss">
    
</style>