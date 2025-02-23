<script setup>
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/store'


const mainStore = useMainStore()

const { count, doubleCount } = storeToRefs(mainStore)
const { increment } = mainStore
</script>

<template>
  <div class="qbee-theme__dark">
    <div @click="increment">点击</div>
    <div>次数：{{ count }}</div>
    <div>双倍次数：{{ doubleCount }}</div>
    <div class="ziti">测试样式</div>
  </div>
</template>

<style scoped>

.ziti{
  color: var(--cs-color_primary);
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
