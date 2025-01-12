import React from 'react'
import { useParams } from 'react-router-dom'

const items = [
  { id: 1, category: 'tech', image: '/Selling/used_Macbook.jpg', title: 'Macbook Pro', originalPrice: 1299, salePrice: 999, description: 'A high-performance laptop for all your needs.' },
  { id: 2, category: 'furniture', image: '/Selling/grey_couch.jpg', title: 'Grey Couch', salePrice: 70, description: 'A comfortable grey couch perfect for any living room.' },
  { id: 3, category: 'textbooks', image: '/Selling/dental_textbook.jpg', title: 'Dental Hygiene Textbook', originalPrice: 300, salePrice: 250, description: 'An essential textbook for dental hygiene students.' },
  // Add more items here
]

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const product = items.find(item => item.id === parseInt(id || ''))

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="max-w-lg w-full">
        <img src={product.image} alt={product.title} className="w-full h-auto object-cover mb-4" />
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
        {product.originalPrice && product.originalPrice !== product.salePrice && (
          <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
        )}
        <span className="text-lg font-semibold text-gray-900">${product.salePrice}</span>
        <p className="mt-4">{product.description}</p>
      </div>
    </div>
  )
}

export default ProductDetails
