// 知乎热榜抓取
export async function scrapeZhihu() {
  try {
    const response = await fetch('https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=50');
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.data?.map((item, index) => {
      const detail = item.target || item;
      return {
        id: `zhihu-${detail.id}`,
        title: detail.title || detail.question?.title || '无标题',
        source: '知乎',
        time: '刚刚',
        hot: `${detail.detail_text || `${(index + 1) * 100}万`}`,
        url: `https://zhihu.com/question/${detail.id}`,
        category: categorizeZhihu(detail.title),
      };
    }) || [];
  } catch (error) {
    // 如果 API 失败，返回模拟数据
    console.log('知乎 API 失败，使用模拟数据');
    return [
      { id: 'zhihu-1', title: '知乎热门问题示例1', hot: '450万', category: 'tech', source: '知乎', time: '刚刚', url: '#' },
      { id: 'zhihu-2', title: '知乎热门问题示例2', hot: '280万', category: 'hot', source: '知乎', time: '刚刚', url: '#' },
    ];
  }
}

function categorizeZhihu(title) {
  const keywords = {
    tech: ['科技', 'AI', '人工智能', '手机', '电脑', '互联网', '编程', '代码'],
    ent: ['明星', '电影', '电视剧', '综艺', '娱乐', '八卦'],
    sport: ['足球', '篮球', 'NBA', '世界杯', '奥运', '体育'],
    finance: ['股票', '基金', '投资', '理财', '经济', '房价', '比特币'],
    game: ['游戏', '王者荣耀', '原神', 'Steam', '电竞'],
  };
  
  for (const [cat, words] of Object.entries(keywords)) {
    if (words.some(w => title.includes(w))) return cat;
  }
  return 'hot';
}