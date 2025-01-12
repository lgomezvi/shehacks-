import Link from 'next/link';
import React from 'react'

interface CardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  description: string;
  status: 'New' | 'Used' | 'Refurbished';
  location: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ id, image, title, price, description, status, location }) => {
  return (
    <Link href={`/explore/${id}`} className="group">
      <div className="max-w-sm rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="relative pb-[100%]">
          <img
            src={image}
            alt={title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500 mb-2 line-clamp-2">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-900">
              ${price}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{location}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                {status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card;