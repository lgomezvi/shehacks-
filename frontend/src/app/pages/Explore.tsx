import React, { useState } from 'react'
import Card from '../components/Card'
import {Menu} from '../components/Menu'


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

const Explore: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter(item => item.category === selectedCategory)

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <Menu selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
    </div>
  )
}

export default Explore