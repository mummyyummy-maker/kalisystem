<script setup lang="ts">
import { RouterView } from "vue-router";
import MadeByDyad from "./components/MadeByDyad.vue";
</script>

<template>
  <div class="app-layout">
    <main class="main-content">
      <RouterView />
    </main>
    <MadeByDyad />
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}

.main-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
