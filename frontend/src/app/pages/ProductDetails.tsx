import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { items } from '../constants'

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const product = items.find(item => item.id.toString() === id)

  if (!product) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <button 
          onClick={() => router.push('/explore')}
          className="btn btn-primary"
        >
          Back to Explore
        </button>
      </div>
    </div>
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="max-w-4xl w-full">
        <button 
          onClick={() => router.push('/explore')}
          className="mb-4 btn btn-secondary"
        >
          ← Back to Explore
        </button>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-w-1 aspect-h-1">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <div className="mb-4">
              {product.originalPrice && product.originalPrice !== product.salePrice && (
                <span className="text-xl text-gray-500 line-through mr-2">
                  ${product.originalPrice}
                </span>
              )}
              <span className="text-2xl font-bold text-gray-900">
                ${product.salePrice}
              </span>
            </div>
            {/* <p className="text-gray-600">{product.description}</p> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
