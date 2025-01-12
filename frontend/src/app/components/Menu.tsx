// Menu.tsx
import React from 'react';

interface MenuProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const Menu: React.FC<MenuProps> = ({ selectedCategory, setSelectedCategory }) => {
  const categories = ['all', 'tech', 'furniture', 'textbooks', 'apparel', 'household'];

  return (
    <div className="flex flex-wrap gap-4 mb-4 overflow-x-auto py-2 items-center justify-center">
      {categories.map(category => (
        <button
          key={category}
          className={`btn btn-secondary ${
            selectedCategory === category ? 'bg-blue-700' : 'bg-blue-500'
          }`}
          onClick={() => setSelectedCategory(category)}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};