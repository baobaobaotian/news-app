// 数据存储 - 使用内存存储，重启后重置
// 生产环境可以改用 SQLite 或 Redis

let newsData = [];

export function saveNews(news) {
  // 去重并排序
  const seen = new Set();
  newsData = news
    .filter(item => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    })
    .sort((a, b) => {
      // 按热度排序
      const hotA = parseInt(a.hot?.replace(/[^\d]/g, '')) || 0;
      const hotB = parseInt(b.hot?.replace(/[^\d]/g, '')) || 0;
      return hotB - hotA;
    });
}

export function getNews() {
  return newsData;
}

export function getNewsByCategory(category) {
  return newsData.filter(item => item.category === category);
}