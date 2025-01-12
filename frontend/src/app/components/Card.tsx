import React from 'react'

interface CardProps {
  image: string;
  title: string;
  originalPrice?: number;
  salePrice: number;
}

const Card: React.FC<CardProps> = ({ image, title, originalPrice, salePrice }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative pb-[100%]">
        <img
          src={image}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">{title}</h3>
        <div className="flex items-center gap-2">
          {originalPrice && originalPrice !== salePrice && (
            <span className="text-sm text-gray-500 line-through">
              ${originalPrice}
            </span>
          )}
          <span className="text-sm font-semibold text-gray-900">
            ${salePrice}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Card;