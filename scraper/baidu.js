import * as cheerio from 'cheerio';

// 百度热搜抓取
export async function scrapeBaidu() {
  try {
    // 百度热搜页面
    const response = await fetch('https://top.baidu.com/board?tab=realtime');
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const news = [];
    $('.category-wrap_iQLoo').each((i, elem) => {
      const title = $(elem).find('.c-single-text-ellipsis').text().trim();
      const hot = $(elem).find('.hot-index_1Bl1a').text().trim();
      const url = $(elem).find('a').attr('href');
      
      if (title) {
        news.push({
          id: `baidu-${i}`,
          title,
          source: '百度',
          time: '刚刚',
          hot: hot || `${(10 - i) * 50}万`,
          url: url || '#',
          category: 'hot',
        });
      }
    });
    
    return news;
  } catch (error) {
    console.log('百度抓取失败，使用模拟数据:', error.message);
    return [
      { id: 'baidu-1', title: '百度热搜话题示例1', hot: '520万', category: 'hot', source: '百度', time: '刚刚', url: '#' },
      { id: 'baidu-2', title: '百度热搜话题示例2', hot: '310万', category: 'tech', source: '百度', time: '刚刚', url: '#' },
    ];
  }
}