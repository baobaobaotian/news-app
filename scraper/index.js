import { scrapeWeibo } from './weibo.js';
import { scrapeZhihu } from './zhihu.js';
import { scrapeBaidu } from './baidu.js';
import { scrapeToutiao } from './toutiao.js';
import { saveNews } from '../data/store.js';

export async function scrapeAll() {
  console.log('开始抓取全网热点...');
  
  const results = await Promise.allSettled([
    scrapeWeibo(),
    scrapeZhihu(),
    scrapeBaidu(),
    scrapeToutiao(),
  ]);
  
  const allNews = [];
  const sources = ['微博', '知乎', '百度', '头条'];
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`${sources[index]}: 抓取到 ${result.value.length} 条`);
      allNews.push(...result.value);
    } else {
      console.error(`${sources[index]}: 抓取失败 - ${result.reason.message}`);
    }
  });
  
  saveNews(allNews);
  console.log(`总共保存 ${allNews.length} 条新闻`);
  return allNews;
}