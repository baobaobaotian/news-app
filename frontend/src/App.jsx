import React, { useState, useEffect } from 'react';
import NewsCard from './components/NewsCard';
import CategoryTabs from './components/CategoryTabs';
import Header from './components/Header';
import { fetchAllNews } from './api/news';

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const loadNews = async () => {
    try {
      setLoading(true);
      const data = await fetchAllNews();
      setNews(data);
    } catch (error) {
      console.error('加载新闻失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadNews();
    setRefreshing(false);
  };

  useEffect(() => {
    loadNews();
  }, []);

  const filteredNews = category === 'all' 
    ? news 
    : news.filter(item => item.category === category);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Header />
      
      <CategoryTabs 
        active={category} 
        onChange={setCategory} 
      />

      <main className="px-3 pt-2">
        {/* 下拉刷新提示 */}
        {refreshing && (
          <div className="text-center py-4 text-gray-500 text-sm">
            <div className="animate-spin inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full mr-2"></div>
            刷新中...
          </div>
        )}

        {/* 加载骨架屏 */}
        {loading && !refreshing ? (
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNews.map((item, index) => (
              <NewsCard 
                key={item.id || index} 
                data={item} 
                rank={index + 1}
              />
            ))}
          </div>
        )}

        {/* 空状态 */}
        {!loading && filteredNews.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <div className="text-4xl mb-2">📭</div>
            <div>暂无内容</div>
          </div>
        )}
      </main>

      {/* 刷新按钮 */}
      <button
        onClick={handleRefresh}
        disabled={refreshing}
        className="fixed bottom-20 right-4 w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform"
      >
        <svg className={`w-6 h-6 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>

      {/* 底部导航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 safe-bottom z-50">
        <div className="flex justify-around items-center h-14">
          <button className="flex flex-col items-center text-primary">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            <span className="text-xs mt-0.5">首页</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs mt-0.5">发现</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs mt-0.5">我的</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default App;