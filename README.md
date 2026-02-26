# 热点新闻聚合网站

一个移动端友好的全网热点新闻聚合网站，自动抓取知乎、微博、百度、头条等平台的热点内容。

## 项目结构

```
news-app/
├── frontend/          # React 前端
│   ├── src/
│   │   ├── components/   # 组件
│   │   ├── api/          # API 接口
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── backend/           # Node.js 后端
    ├── scraper/       # 抓取脚本
    │   ├── index.js   # 主入口
    │   ├── weibo.js   # 微博抓取
    │   ├── zhihu.js   # 知乎抓取
    │   ├── baidu.js   # 百度抓取
    │   └── toutiao.js # 头条抓取
    ├── data/
    │   └── store.js   # 数据存储
    └── server.js      # API 服务
```

## 快速开始

### 1. 启动后端服务

```bash
cd backend
npm install
npm start
```

后端服务运行在 `http://localhost:3001`

- 自动每30分钟抓取一次热点
- 提供 `/api/news` 接口获取新闻
- 提供 `/api/scrape` 接口手动触发抓取

### 2. 启动前端开发服务器

```bash
cd frontend
npm install
npm run dev
```

前端运行在 `http://localhost:5173`

### 3. 构建部署

```bash
cd frontend
npm run build
```

构建产物在 `dist/` 目录，可以部署到 Vercel/Cloudflare Pages。

## API 接口

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/news` | GET | 获取所有新闻 |
| `/api/news?category=tech` | GET | 按分类获取新闻 |
| `/api/scrape` | POST | 手动触发抓取 |
| `/health` | GET | 健康检查 |

## 数据源

- **知乎热榜** - 知乎热门问题
- **微博热搜** - 微博热门话题
- **百度热搜** - 百度搜索热点
- **头条热榜** - 今日头条热点

## 部署建议

### 前端部署
- **Vercel**: `vercel --prod`
- **Cloudflare Pages**: 连接 GitHub 自动部署

### 后端部署
- **Railway**: 连接 GitHub 自动部署
- **Render**: 免费托管 Node.js 服务
- **VPS**: Docker 部署

## 注意事项

1. **CORS 问题**: 部分 API 有跨域限制，需要通过后端代理
2. **反爬机制**: 频繁抓取可能触发反爬，建议控制频率
3. **数据存储**: 当前使用内存存储，重启后数据丢失
4. **生产环境**: 建议使用 Redis 或数据库存储

## 后续优化

- [ ] 接入真实 API 数据源
- [ ] 添加 SQLite/Redis 持久化
- [ ] 添加用户收藏功能
- [ ] 添加推送通知
- [ ] 添加暗黑模式
- [ ] 添加 PWA 支持