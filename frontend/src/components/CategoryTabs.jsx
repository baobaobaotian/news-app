import React from 'react';

const categories = [
  { id: 'all', name: '全部' },
  { id: 'hot', name: '热搜' },
  { id: 'tech', name: '科技' },
  { id: 'ent', name: '娱乐' },
  { id: 'sport', name: '体育' },
  { id: 'finance', name: '财经' },
  { id: 'game', name: '游戏' },
];

function CategoryTabs({ active, onChange }) {
  return (
    <div className="sticky top-0 z-40 bg-gray-50 py-2 px-3">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
              active === cat.id
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryTabs;