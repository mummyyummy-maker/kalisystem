import { ref, onMounted } from 'vue'

export interface InventoryItem {
  item_name: string
  category: string
  default_supplier: string
  supplier_alternative: string
  order_quantity: number
  measure_unit: string
  default_quantity: number
  brand_tag: string
}

export function useInventoryData() {
  const items = ref<InventoryItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchInventoryData = async () => {
    loading.value = true
    error.value = null
    
    try {
      const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQxaY0FXgYSKVrYoo-1k9bkSQDjZPKwpOnvQbYWB1QW4XT9rwU0GJUq4lN0YLRMXKXS4XHi2MsTfZLM/pub?gid=917352588&single=true&output=csv'
      
      const response = await fetch(csvUrl)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const csvText = await response.text()
      const parsedData = parseCSV(csvText)
      items.value = parsedData
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch inventory data'
      console.error('Error fetching inventory data:', err)
    } finally {
      loading.value = false
    }
  }

  const parseCSV = (csvText: string): InventoryItem[] => {
    const lines = csvText.trim().split('\n')
    const headers = lines[0].split(',').map(header => header.trim())
    
    return lines.slice(1).map(line => {
      const values = parseCSVLine(line)
      const item: any = {}
      
      headers.forEach((header, index) => {
        const key = header.toLowerCase().replace(/\s+/g, '_')
        let value = values[index]?.trim() || ''
        
        // Convert numeric fields
        if (key === 'order_quantity' || key === 'default_quantity') {
          const numValue = parseFloat(value)
          item[key] = isNaN(numValue) ? 0 : numValue
        } else {
          item[key] = value
        }
      })
      
      return item as InventoryItem
    }).filter(item => item.item_name) // Filter out empty rows
  }

  const parseCSVLine = (line: string): string[] => {
    const result: string[] = []
    let current = ''
    let inQuotes = false
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        result.push(current)
        current = ''
      } else {
        current += char
      }
    }
    
    result.push(current)
    return result
  }

  const getCategories = () => {
    const categories = new Set(items.value.map(item => item.category))
    return Array.from(categories).filter(Boolean).sort()
  }

  const getSuppliers = () => {
    const suppliers = new Set([
      ...items.value.map(item => item.default_supplier),
      ...items.value.map(item => item.supplier_alternative)
    ])
    return Array.from(suppliers).filter(Boolean).sort()
  }

  const searchItems = (query: string) => {
    if (!query.trim()) return items.value
    
    const searchTerm = query.toLowerCase()
    return items.value.filter(item =>
      item.item_name.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm) ||
      item.default_supplier.toLowerCase().includes(searchTerm)
    )
  }

  const filterByCategory = (category: string) => {
    if (!category) return items.value
    return items.value.filter(item => item.category === category)
  }

  const filterBySupplier = (supplier: string) => {
    if (!supplier) return items.value
    return items.value.filter(item => 
      item.default_supplier === supplier || item.supplier_alternative === supplier
    )
  }

  onMounted(() => {
    fetchInventoryData()
  })

  return {
    items,
    loading,
    error,
    fetchInventoryData,
    getCategories,
    getSuppliers,
    searchItems,
    filterByCategory,
    filterBySupplier
  }
}