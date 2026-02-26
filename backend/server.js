import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import { scrapeAll } from './scraper/index.js';
import { getNews, getNewsByCategory } from './data/store.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// 获取所有新闻
app.get('/api/news', (req, res) => {
  const { category } = req.query;
  const news = category ? getNewsByCategory(category) : getNews();
  res.json({
    success: true,
    data: news,
    updatedAt: new Date().toISOString(),
  });
});

// 手动触发抓取
app.post('/api/scrape', async (req, res) => {
  try {
    await scrapeAll();
    res.json({ success: true, message: '抓取完成' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 定时抓取 - 每30分钟执行一次
cron.schedule('*/30 * * * *', async () => {
  console.log(`[${new Date().toLocaleString()}] 开始定时抓取...`);
  try {
    await scrapeAll();
    console.log(`[${new Date().toLocaleString()}] 抓取完成`);
  } catch (error) {
    console.error('定时抓取失败:', error);
  }
});

// 启动时立即抓取一次
scrapeAll().then(() => {
  console.log('初始抓取完成');
});

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log('定时任务已启动：每30分钟抓取一次');
});