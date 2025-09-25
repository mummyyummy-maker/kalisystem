<script setup lang="ts">
import { ref, computed } from 'vue'
import { useInventoryData } from '@/composables/useInventoryData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Search, RefreshCw, Package, Users, ShoppingCart } from 'lucide-vue-next'

const { 
  items, 
  loading, 
  error, 
  fetchInventoryData, 
  getCategories, 
  getSuppliers,
  searchItems,
  filterByCategory,
  filterBySupplier
} = useInventoryData()

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedSupplier = ref('')

const filteredItems = computed(() => {
  let result = items.value

  if (searchQuery.value) {
    result = searchItems(searchQuery.value)
  }

  if (selectedCategory.value) {
    result = result.filter(item => item.category === selectedCategory.value)
  }

  if (selectedSupplier.value) {
    result = result.filter(item => 
      item.default_supplier === selectedSupplier.value || 
      item.supplier_alternative === selectedSupplier.value
    )
  }

  return result
})

const stats = computed(() => ({
  totalItems: items.value.length,
  categories: getCategories().length,
  suppliers: getSuppliers().length
}))

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedSupplier.value = ''
}
</script>

<template>
  <div class="container mx-auto p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Inventory Management</h1>
        <p class="text-muted-foreground">Manage your restaurant inventory and suppliers</p>
      </div>
      <Button @click="fetchInventoryData" :disabled="loading" class="gap-2">
        <RefreshCw :class="{ 'animate-spin': loading }" class="h-4 w-4" />
        Refresh Data
      </Button>
    </div>

    <!-- Stats Cards -->
    <div class="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Total Items</CardTitle>
          <Package class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ stats.totalItems }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Categories</CardTitle>
          <ShoppingCart class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ stats.categories }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Suppliers</CardTitle>
          <Users class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ stats.suppliers }}</div>
        </CardContent>
      </Card>
    </div>

    <!-- Error Alert -->
    <Alert v-if="error" variant="destructive">
      <AlertDescription>{{ error }}</AlertDescription>
    </Alert>

    <!-- Filters -->
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="relative flex-1">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              v-model="searchQuery"
              placeholder="Search items, categories, or suppliers..."
              class="pl-10"
            />
          </div>
          <Select v-model="selectedCategory">
            <SelectTrigger class="w-full sm:w-[200px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem v-for="category in getCategories()" :key="category" :value="category">
                {{ category }}
              </SelectItem>
            </SelectContent>
          </Select>
          <Select v-model="selectedSupplier">
            <SelectTrigger class="w-full sm:w-[200px]">
              <SelectValue placeholder="All Suppliers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Suppliers</SelectItem>
              <SelectItem v-for="supplier in getSuppliers()" :key="supplier" :value="supplier">
                {{ supplier }}
              </SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" @click="clearFilters">
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Inventory Table -->
    <Card>
      <CardHeader>
        <CardTitle>Inventory Items ({{ filteredItems.length }})</CardTitle>
      </CardHeader>
      <CardContent>
        <div v-if="loading" class="space-y-3">
          <Skeleton v-for="i in 5" :key="i" class="h-12 w-full" />
        </div>
        <div v-else-if="filteredItems.length === 0" class="text-center py-8 text-muted-foreground">
          No items found matching your criteria.
        </div>
        <Table v-else>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Default Supplier</TableHead>
              <TableHead>Order Qty</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Default Qty</TableHead>
              <TableHead>Brand</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in filteredItems" :key="item.item_name">
              <TableCell class="font-medium">{{ item.item_name }}</TableCell>
              <TableCell>
                <Badge variant="secondary">{{ item.category }}</Badge>
              </TableCell>
              <TableCell>{{ item.default_supplier }}</TableCell>
              <TableCell>{{ item.order_quantity }}</TableCell>
              <TableCell>{{ item.measure_unit }}</TableCell>
              <TableCell>{{ item.default_quantity || '-' }}</TableCell>
              <TableCell>{{ item.brand_tag || '-' }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>