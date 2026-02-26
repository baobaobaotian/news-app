import React from 'react';

function NewsCard({ data, rank }) {
  const { title, source, time, hot, url, category } = data;

  const getRankStyle = (r) => {
    if (r === 1) return 'bg-red-500 text-white';
    if (r === 2) return 'bg-orange-500 text-white';
    if (r === 3) return 'bg-yellow-500 text-white';
    return 'bg-gray-200 text-gray-600';
  };

  const getCategoryName = (cat) => {
    const map = {
      hot: '热搜',
      tech: '科技',
      ent: '娱乐',
      sport: '体育',
      finance: '财经',
      game: '游戏',
    };
    return map[cat] || '其他';
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-xl p-4 active:scale-[0.98] transition-transform"
    >
      <div className="flex gap-3">
        {/* 排名 */}
        <div className="flex-shrink-0">
          <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${getRankStyle(rank)}`}>
            {rank}
          </div>
        </div>

        {/* 内容 */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-gray-900 line-clamp-2 leading-snug">
            {title}
          </h3>
          
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            <span className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">
              {getCategoryName(category)}
            </span>
            <span>{source}</span>
            <span>·</span>
            <span>{time}</span>
            {hot && (
              <>
                <span>·</span>
                <span className="text-primary">{hot}</span>
              </>
            )}
          </div>
        </div>

        {/* 箭头 */}
        <div className="flex-shrink-0 self-center">
          <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
}

export default NewsCard;