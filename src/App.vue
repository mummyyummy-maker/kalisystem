<script setup lang="ts">
import MadeWithDyad from './components/MadeWithDyad.vue'
import { useInventoryData } from './composables/useInventoryData'

const { inventoryData, loading, error } = useInventoryData()
</script>

<template>
  <div class="app-layout">
    <main class="main-content">
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-center mb-8">Inventory Management</h1>
        
        <div v-if="loading" class="text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p class="mt-2 text-muted-foreground">Loading inventory data...</p>
        </div>
        
        <div v-else-if="error" class="text-center text-destructive">
          <p>{{ error }}</p>
          <button @click="refetch" class="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">
            Retry
          </button>
        </div>
        
        <div v-else class="space-y-4">
          <div class="text-center mb-6">
            <p class="text-muted-foreground">
              Loaded {{ inventoryData.length }} inventory items
            </p>
          </div>
          
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div 
              v-for="item in inventoryData.slice(0, 12)" 
              :key="item.Item_name"
              class="p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div class="flex items-center gap-2 mb-2">
                <span class="text-lg">{{ item.category.split(' ')[0] }}</span>
                <h3 class="font-semibold text-sm">{{ item.Item_name }}</h3>
              </div>
              <div class="text-xs text-muted-foreground space-y-1">
                <p><span class="font-medium">Category:</span> {{ item.category }}</p>
                <p><span class="font-medium">Supplier:</span> {{ item.default_supplier }}</p>
                <p><span class="font-medium">Quantity:</span> {{ item.order_quantity }} {{ item.measure_unit }}</p>
              </div>
            </div>
          </div>
          
          <div v-if="inventoryData.length > 12" class="text-center mt-6">
            <p class="text-sm text-muted-foreground">
              Showing first 12 items of {{ inventoryData.length }} total items
            </p>
          </div>
        </div>
      </div>
    </main>
    <MadeWithDyad />
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
  width: 100%;
}
</style>
