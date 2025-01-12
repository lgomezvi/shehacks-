import React, { useState } from 'react'
import Card from '../components/Card'
import { Menu } from '../components/Menu'
import { Search, ChevronDown } from 'lucide-react' // Import icons

const items = [
    { category: 'tech', image: '/Selling/used_Macbook.jpg', title: 'Macbook Pro', originalPrice: 1299, salePrice: 999 },
    { category: 'furniture', image: '/Selling/grey_couch.jpg', title: 'Grey Couch', salePrice: 70 },
    { category: 'textbooks', image: '/Selling/dental_textbook.jpg', title: 'Dental Hygiene Textbook', originalPrice: 300, salePrice: 250 },
    { category: 'furniture', image: '/Selling/dresser.jpg', title: 'White Dresser', salePrice: 20 },
    { category: 'textbooks', image: '/Selling/human_anatomy_textbook.jpg', title: 'Human Anatomy Textbook', salePrice: 50 },
    { category: 'tech', image: '/Selling/beats.jpg', title: 'Beats Solo 3', originalPrice: 100, salePrice: 80 },
    { category: 'furniture', image: '/Selling/table.jpg', title: 'Table', salePrice: 60 },
    { category: 'textbooks', image: '/Selling/nursing_textbook.jpg', title: 'Nursing Textbook', salePrice: 60 },
    { category: 'apparel', image: '/Selling/backpack.jpg', title: 'Kanken Backpacks', salePrice: 30 },
    { category: 'household', image: '/Selling/rice_cooker.jpg', title: 'Rice Cooker', originalPrice: 30, salePrice: 20 },
  ]

const sortOptions = [
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Name: A to Z', value: 'name-asc' },
  { label: 'Name: Z to A', value: 'name-desc' },
]

const Explore: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('price-asc')
  const [priceRange, setPriceRange] = useState('all')

  // Filter items based on category and search query
  const filteredItems = items
    .filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPriceRange = priceRange === 'all' || 
        (priceRange === 'under-50' && item.salePrice < 50) ||
        (priceRange === '50-100' && item.salePrice >= 50 && item.salePrice <= 100) ||
        (priceRange === 'over-100' && item.salePrice > 100)
      return matchesCategory && matchesSearch && matchesPriceRange
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.salePrice - b.salePrice
        case 'price-desc':
          return b.salePrice - a.salePrice
        case 'name-asc':
          return a.title.localeCompare(b.title)
        case 'name-desc':
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="w-full max-w-6xl space-y-4 mb-6">
        {/* Search and Filters Container */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative min-w-[200px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>

          {/* Price Range Dropdown */}
          <div className="relative min-w-[150px]">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full appearance-none px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            >
              <option value="all">All Prices</option>
              <option value="under-50">Under $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="over-100">Over $100</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Category Menu */}
        <Menu selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </div>

      {/* Results count */}
      <div className="w-full max-w-6xl mb-4">
        <p className="text-gray-600">
          Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {filteredItems.map((item, index) => (
          <Card
            key={index}
            image={item.image}
            title={item.title}
            originalPrice={item.originalPrice}
            salePrice={item.salePrice}
          />
        ))}
      </div>

      {/* No results message */}
      {filteredItems.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No items found matching your criteria</p>
        </div>
      )}
    </div>
  )
}

export default Explore