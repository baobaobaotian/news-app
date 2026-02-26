// 新闻数据获取
// 使用免费 API 和自建数据源

const API_SOURCES = {
  // 知乎日报
  zhihu: 'https://news-at.zhihu.com/api/4/news/latest',
  // 微博热搜 (需要通过代理或自建服务)
  weibo: '/api/weibo',
  // 百度热点 (需要通过代理或自建服务)
  baidu: '/api/baidu',
  // 聚合数据 - 使用 mock 数据
};

// Mock 数据 - 用于演示
const MOCK_NEWS = [
  { id: 1, title: 'OpenAI 发布 GPT-5，性能提升 10 倍', source: '知乎', time: '10分钟前', hot: '234万', url: '#', category: 'tech' },
  { id: 2, title: '某明星宣布结婚，微博服务器瘫痪', source: '微博', time: '30分钟前', hot: '189万', url: '#', category: 'ent' },
  { id: 3, title: 'A股大涨，沪指突破 3500 点', source: '财经网', time: '1小时前', hot: '156万', url: '#', category: 'finance' },
  { id: 4, title: '国足世预赛出线形势分析', source: '体育周报', time: '2小时前', hot: '98万', url: '#', category: 'sport' },
  { id: 5, title: '《黑神话：悟空》销量破千万', source: '游戏资讯', time: '3小时前', hot: '87万', url: '#', category: 'game' },
  { id: 6, title: 'iPhone 17 设计图曝光，外观大改', source: '科技日报', time: '4小时前', hot: '76万', url: '#', category: 'tech' },
  { id: 7, title: '春节档电影票房创纪录', source: '娱乐新闻', time: '5小时前', hot: '65万', url: '#', category: 'ent' },
  { id: 8, title: '比特币突破 10 万美元大关', source: '区块链资讯', time: '6小时前', hot: '54万', url: '#', category: 'finance' },
  { id: 9, title: 'NBA 全明星赛名单公布', source: '体育新闻', time: '7小时前', hot: '43万', url: '#', category: 'sport' },
  { id: 10, title: 'Steam 冬季特卖开始', source: '游戏资讯', time: '8小时前', hot: '32万', url: '#', category: 'game' },
];

// 获取知乎日报
export async function fetchZhihuNews() {
  try {
    const response = await fetch(API_SOURCES.zhihu);
    const data = await response.json();
    return data.stories?.map(item => ({
      id: `zhihu-${item.id}`,
      title: item.title,
      source: '知乎日报',
      time: '今日',
      url: item.url,
      category: 'hot',
      image: item.images?.[0],
    })) || [];
  } catch (error) {
    console.error('知乎 API 失败:', error);
    return [];
  }
}

// 获取所有新闻
export async function fetchAllNews() {
  // 目前使用 mock 数据，后续可以接入真实 API
  // const zhihuNews = await fetchZhihuNews();
  
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return MOCK_NEWS.sort((a, b) => parseInt(b.hot) - parseInt(a.hot));
}

// 获取分类新闻
export async function fetchNewsByCategory(category) {
  const allNews = await fetchAllNews();
  if (category === 'all') return allNews;
  return allNews.filter(item => item.category === category);
}