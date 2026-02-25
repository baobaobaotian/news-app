// Vercel Serverless Function
// 路径: /api/news

const { scrapeAll } = require('../scraper/index');
const { getNews, getNewsByCategory } = require('../data/store');

module.exports = async (req, res) => {
  // 设置 CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { category, refresh } = req.query;

  // 手动触发抓取
  if (refresh === 'true') {
    try {
      await scrapeAll();
      return res.json({ success: true, message: '抓取完成' });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  // 获取新闻
  const news = category ? getNewsByCategory(category) : getNews();
  
  res.json({
    success: true,
    data: news,
    updatedAt: new Date().toISOString(),
  });
};