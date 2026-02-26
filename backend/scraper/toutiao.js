// 头条热榜抓取
export async function scrapeToutiao() {
  try {
    // 头条热榜 API
    const response = await fetch('https://www.toutiao.com/hot-event/hot-board/?origin=toutiao_pc');
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const html = await response.text();
    // 解析 JSON 数据
    const match = html.match(/<script id="RENDER_DATA" type="application\/json">(.+?)<\/script>/);
    
    if (match) {
      const data = JSON.parse(decodeURIComponent(match[1]));
      const items = data.initialState?.hotEvent?.data || [];
      
      return items.map((item, index) => ({
        id: `toutiao-${item.id}`,
        title: item.Title,
        source: '头条',
        time: '刚刚',
        hot: item.HotValue ? `${(item.HotValue / 10000).toFixed(0)}万` : `${(10 - index) * 40}万`,
        url: `https://www.toutiao.com/trending/${item.ClusterId}/`,
        category: categorizeToutiao(item.Title),
      }));
    }
    
    return [];
  } catch (error) {
    console.log('头条抓取失败，使用模拟数据:', error.message);
    return [
      { id: 'toutiao-1', title: '头条热榜话题示例1', hot: '480万', category: 'hot', source: '头条', time: '刚刚', url: '#' },
      { id: 'toutiao-2', title: '头条热榜话题示例2', hot: '290万', category: 'ent', source: '头条', time: '刚刚', url: '#' },
    ];
  }
}

function categorizeToutiao(title) {
  const keywords = {
    tech: ['科技', 'AI', '手机', '互联网', '5G', '芯片'],
    ent: ['明星', '电影', '综艺', '娱乐'],
    sport: ['足球', '篮球', '体育'],
    finance: ['股票', '经济', '房价'],
    game: ['游戏', '电竞'],
  };
  
  for (const [cat, words] of Object.entries(keywords)) {
    if (words.some(w => title.includes(w))) return cat;
  }
  return 'hot';
}