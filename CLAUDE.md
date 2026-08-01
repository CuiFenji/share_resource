# 超级站 — 项目文档

> 📖 本文档是给 AI（Claude Code）看的项目"记忆文件"，记录项目全貌。每次新对话时，AI 应首先阅读此文件再开工。
> ⚠️ **每次完成修改任务后，必须同步更新此文件的更新日志和工作日志章节。**

---

## 一、项目概述

| 项 | 内容 |
|----|------|
| **项目名称** | 超级站 |
| **定位** | 为资源分享类 UP 主（超级站）搭建的个人资源分享网站 |
| **目标用户** | 寻找影视资源、软件资源、教程的普通用户 |
| **核心目标** | 美观、易用、易维护的资源展示网站 |
| **创建日期** | 2026-07-23 |
| **当前阶段** | Phase 1 完成 — 前端静态网站（含后台管理） |

---

## 二、技术架构

| 项目 | 选择 |
|------|------|
| 前端技术 | 纯 HTML + CSS + JavaScript（零框架、零依赖） |
| 数据修改 | 后台管理 localStorage 即时生效 + 导出 data.js 替换文件 |
| 图片存储 | GitHub + jsDelivr CDN（`https://cdn.jsdelivr.net/gh/CuiFenji/sharephoto@main/`） |
| 响应式 | 桌面端为主（1200px 最大宽度），移动端基本适配 |
| 图标方案 | Emoji + 内联 SVG（无需引入图标库） |
| 部署 | 纯静态文件，可部署到任何静态托管服务 |
| 浏览器兼容 | 现代浏览器（Chrome/Firefox/Edge/Safari 最新版） |

---

## 三、文件结构

```
share_resource/
├── index.html              # 主页（Hero 大标题 + 双行封面滚动轮播 + 功能卡片）
├── resources.html           # 资源页（分类选项卡 + 搜索 + 横幅轮播 + 卡片列表 + 分页 + 下载弹窗）
├── detail.html              # 资源详情页（封面 + 简介 + 片段素材 + 技术规格 + 网盘下载）
├── tutorials.html           # 教程页（分类筛选 + 3列卡片网格含难度标签）
├── tutorial-detail.html     # 教程详情页（图标 + 大纲 + 正文 + 上一篇/下一篇）
├── feedback.html            # 反馈问题页（含 URL 参数预选问题类型）
├── admin.html               # 后台管理（密码登录 + 资源/教程增删改 + 导出 data.js，单文件自包含）
├── css/
│   └── style.css            # 全局样式表（设计系统 + 淡入动画 + 工具类）
├── js/
│   ├── main.js              # 全局脚本（导航高亮、淡入动画、搜索、分页、卡片渲染）
│   ├── data.js              # 全部数据（22条资源 + 8条教程 + 管理密码，var 全局声明）
├── images/
│   ├── covers/              # 封面图本地备份（实际使用 GitHub CDN 外链）
│   └── banners/             # 广告位/横幅大图（建议 1200×400）
├── CLAUDE.md                # 本文档（给 AI 看的项目手册）
└── README.md                # 项目说明（给人看）
```

---

## 四、设计规范（Design Tokens）

### 4.1 色彩系统

| CSS 变量名 | 色值 | 用途 |
|-----------|------|------|
| `--color-primary` | `#2563EB` | 主色调，按钮、链接、高亮 |
| `--color-primary-light` | `#EFF6FF` | 浅蓝背景 |
| `--color-primary-hover` | `#1D4ED8` | 按钮 hover 加深 |
| `--color-bg` | `#FFFFFF` | 页面主体背景 |
| `--color-bg-alt` | `#F8FAFC` | 区块间隔背景（浅灰） |
| `--color-text` | `#1E293B` | 标题、正文主色 |
| `--color-text-secondary` | `#64748B` | 简介、日期等辅助文字 |
| `--color-border` | `#E2E8F0` | 卡片边框、分割线 |
| `--color-success` | `#16A34A` | 下载按钮、成功状态 |
| `--color-white` | `#FFFFFF` | 纯白 |

### 4.2 排版

| CSS 变量名 | 值 | 用途 |
|-----------|-----|------|
| `--font-family` | `"PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif` | 全局字体 |
| `--text-h1` | `48px / 1.2 / 700` | 主页大标题 |
| `--text-h2` | `36px / 1.3 / 700` | 各区块标题 |
| `--text-h3` | `22px / 1.4 / 600` | 卡片内标题 |
| `--text-body` | `16px / 1.6 / 400` | 常规正文 |
| `--text-small` | `14px / 1.5 / 400` | 日期、标签 |
| `--text-xs` | `12px / 1.5 / 400` | Footer 信息 |

### 4.3 间距

| 变量 | 值 | 用途 |
|------|-----|------|
| `--space-xs` | `8px` | 极小间距 |
| `--space-sm` | `16px` | 小间距 |
| `--space-md` | `24px` | 中间距 |
| `--space-lg` | `32px` | 大间距 |
| `--space-xl` | `48px` | 超大间距 |
| `--space-2xl` | `80px` | 区块间距（上下） |
| `--max-width` | `1200px` | 页面最大宽度 |

### 4.4 圆角与阴影

| 变量 | 值 | 用途 |
|------|-----|------|
| `--radius-sm` | `8px` | 按钮、封面图圆角 |
| `--radius-md` | `12px` | 卡片圆角 |
| `--radius-lg` | `16px` | 大卡片/横幅圆角 |
| `--shadow-card` | `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)` | 卡片默认阴影 |
| `--shadow-hover` | `0 10px 25px rgba(0,0,0,0.1)` | 卡片 hover 阴影 |
| `--shadow-nav` | `0 1px 3px rgba(0,0,0,0.1)` | 导航栏滚动后阴影 |

### 4.5 过渡动效

| 变量 | 值 |
|------|-----|
| `--transition-fast` | `0.2s ease` |
| `--transition-normal` | `0.3s ease` |

### 4.6 全局动画（style.css）

| 类名 | 说明 |
|------|------|
| `.fade-in-up` | 元素从下方 30px 淡入，IntersectionObserver 触发 |
| `.fade-in-up.visible` | 进入视口后添加，触发动画 |
| `.delay-1` ~ `.delay-5` | 错开延迟 0.1s ~ 0.5s（依次出现效果） |

---

## 五、页面清单

| 文件 | 功能 | 状态 |
|------|------|------|
| `index.html` | 主页：Hero 大标题 + 双行封面滚动轮播（仅影视，无限循环）+ 向下箭头 + 功能介绍卡片 + Footer | ✅ 已完成 |
| `resources.html` | 资源页：分类选项卡（影视/软件）+ 多关键词模糊搜索 + 横幅轮播组件（公告+电影推荐）+ 卡片列表 + 分页（含左右箭头）+ 下载弹窗 + 无结果反馈链接 | ✅ 已完成 |
| `detail.html` | 资源详情页：封面 + 简介 + 片段素材（仅影视）+ 技术规格（影视/软件自适应字段）+ 百度/夸克选项卡 + 一键复制链接 | ✅ 已完成 |
| `tutorials.html` | 教程页：页面标题 + 分类筛选（全部/剪辑/调色/创作/音频/字幕）+ 3列卡片网格（含难度标签） | ✅ 已完成 |
| `tutorial-detail.html` | 教程详情页：大图标 + 标题标签 + 大纲卡片 + 正文 + 上一篇/下一篇导航 | ✅ 已完成 |
| `feedback.html` | 反馈问题页：URL 参数预选问题类型（`?type=resource_request`）+ 问题描述 + 联系方式 + 提交确认 | ✅ 已完成 |
| `admin.html` | 后台管理：密码登录（sessionStorage）+ 三选项卡（影视/软件/教程）+ 列表增删改 + 编辑弹窗 + 导出 data.js + 恢复默认 | ✅ 已完成 |

---

## 六、数据结构

### 6.1 影视资源（resources array, type="电影"|"剧集"）

```javascript
{
  id: number,          // 唯一 ID
  title: string,       // 资源名称
  type: string,        // "电影" | "剧集"
  tags: string[],      // 标签：["4K", "中字", "科幻"]
  cover: string,       // 封面路径 "images/covers/xxx.jpg"
  description: string, // 简介（1-2 句话）
  date: string,        // 发布日期 "2026-07-20"
  resolution: string,  // 分辨率 "4K HDR / 1080P BluRay"
  subtitle: string,    // 字幕语言 "中英双语"
  format: string,      // 视频格式 "MKV"
  size: string,        // 文件大小 "18.5 GB"
  clips: string[],     // 片段素材名称
  downloads: {
    baidu: { link: string },
    quark: { link: string }
  }
}
```

### 6.2 软件资源（resources array, type="软件"）

```javascript
{
  id: number,
  title: string,
  type: "软件",
  tags: string[],      // ["图像处理", "中文版", "Win/Mac"]
  cover: string,       // SVG 图标路径
  description: string,
  date: string,
  version: string,     // 版本号 "2026 v25.0"
  platform: string,    // 平台 "Windows / macOS"
  language: string,    // 界面语言 "简体中文 / English"
  size: string,        // 安装包大小 "4.8 GB"
  downloads: {
    baidu: { link: string },
    quark: { link: string }
  }
}
```

### 6.3 教程数据（tutorials array）

```javascript
{
  id: number,          // 唯一 ID
  title: string,       // 教程标题
  icon: string,        // Emoji 图标 "🎨"
  summary: string,     // 简短描述
  date: string,        // 发布日期
  difficulty: string,  // "入门" | "进阶" | "高级"
  category: string,    // "剪辑" | "调色" | "创作" | "音频" | "字幕"
  outline: string[],   // 教程大纲（3-5 条要点）
  content: string,     // 正文（纯文本，支持 ## 标题和段落）
  link: string         // "tutorial-detail.html?id=X"
}
```

### 6.4 横幅轮播数据（bannerSlides，resources.html 内联）

```javascript
{
  type: 'announcement' | 'movie',
  // 公告页
  icon: string,        // Emoji
  title: string,       // 标题
  subtitle: string,    // 副标题/免责声明
  bg: string,          // CSS 渐变背景
  // 电影推荐页（额外字段）
  badge: string,       // 标签如 "🔥 典藏推荐"
  description: string,
  cover: string,       // 海报路径（全幅背景）
  link: string,        // 跳转链接
  endColor: string,    // 渐变遮罩目标色
}
```

---

## 七、页面交互逻辑

| 功能 | 描述 | 实现位置 |
|------|------|----------|
| 导航高亮 | 根据当前页面 URL 自动高亮对应导航项 | `js/main.js` |
| 全局淡入动画 | 所有页面元素滚动到视口时从下方淡入，支持错开延迟 | `css/style.css` + `js/main.js` IntersectionObserver + `window.refreshFadeIn()` |
| 多关键词搜索 | 空格分隔关键词，全部命中才显示（AND 逻辑），按分类过滤 | `js/main.js` 搜索 + `resources.html` `getCategoryResources` |
| 分类选项卡 | 影视/软件切换：布局自适应、搜索 placeholder 切换、横幅显隐 | `resources.html` `switchCategory()` |
| 分页（含箭头） | 每页 6 条，左右箭头 + 页码按钮，首页/末页箭头禁用 | `js/main.js` `renderPage(pageNum, shouldScroll)` |
| 换页滚动 | 用户点分页时平滑滚到广告栏（-80px 导航栏偏移），首次加载不滚动 | `js/main.js` `shouldScroll` 参数 |
| 选项卡状态保持 | 从详情页返回资源页时，sessionStorage 恢复上次的影视/软件选项卡 | `resources.html` `sessionStorage` |
| 下载弹窗 | 点击下载→模态框：封面+片名+百度/夸克链接复制+免责声明，ESC 关闭 | `resources.html` `openDownloadModal` |
| 横幅轮播 | 3 张幻灯片（公告+2 电影推荐），5 秒自动切换，hover 暂停，圆点切换并重置计时 | `resources.html` 内联 JS |
| 电影推荐页 | 海报全幅背景 + 右侧宽渐变带（25%-80%）过渡到文字区，文字右对齐 | `resources.html` CSS + JS 渲染 |
| 无结果反馈 | 搜索无结果时显示「没有找到想要的影片？点此反馈 →」跳转反馈页并预选类型 | `resources.html` + `feedback.html` URL 参数 |
| 详情跳转 | 点击资源卡片 → `detail.html?id=X` | `js/main.js` |
| 技术规格自适应 | 影视显示分辨率/字幕/格式/大小，软件显示版本/平台/语言/大小 | `detail.html` 内联 JS |
| 片段素材 | 仅影视显示 clip-tag 列表，软件隐藏 | `detail.html` 内联 JS |
| 网盘选项卡 | 百度网盘/夸克网盘切换 | `detail.html` |
| 一键复制链接 | Clipboard API + 2秒「✅ 已复制」反馈 | `detail.html` + `resources.html` |
| 教程分类筛选 | 按分类按钮过滤：全部/剪辑/调色/创作/音频/字幕 | `tutorials.html` `filterTutorials()` |
| 教程详情 | 图标+大纲+正文+上一篇/下一篇导航 | `tutorial-detail.html` |
| 封面轮播 | 双行封面横向无限滚动（仅影视），hover 暂停 | `index.html` |

---

## 八、更新日志

| 日期 | 内容 | 操作用户 |
|------|------|----------|
| 2026-07-24 | 封面图片迁移至 GitHub + jsDelivr CDN（CuiFenji/sharephoto），全站统一使用在线地址 | 用户 + Claude |
| 2026-07-24 | ID 格式统一化：类型代号+月份+序号（如 010701=影视7月第1部），全站适配 | 用户 + Claude |
| 2026-07-24 | 后台管理系统 v2：浏览器端完整方案（localStorage + 导出 data.js），单文件 admin.html 自包含 | 用户 + Claude |
| 2026-07-24 | 横幅改造为自动轮播组件：公告页（免责声明）+ 电影推荐页（海报全幅背景+渐变过渡+右对齐文字） | 用户 + Claude |
| 2026-07-24 | 搜索升级为多关键词模糊匹配（空格分隔 AND 逻辑） | 用户 + Claude |
| 2026-07-24 | 资源页新增分类选项卡（影视/软件），软件详情页技术规格自适应 | 用户 + Claude |
| 2026-07-24 | 分页增加左右箭头按钮 + 换页自动滚动到广告栏 | 用户 + Claude |
| 2026-07-24 | 全部页面添加全局淡入动画（fadeInUp + IntersectionObserver） | 用户 + Claude |
| 2026-07-24 | 搜索无结果时添加反馈链接，自动预选「我想要该影片资源」 | 用户 + Claude |
| 2026-07-24 | 教程页重做：8篇影视制作/UP主教程 + 分类筛选 + 教程详情页 | 用户 + Claude |
| 2026-07-24 | 导入16张真实电影封面，首页改为双行滚动轮播 | 用户 + Claude |
| 2026-07-24 | 创建资源详情页 detail.html，扩展数据支持技术参数+双网盘下载 | 用户 + Claude |
| 2026-07-24 | 新增反馈问题页面 feedback.html，所有页面导航栏+Footer添加反馈入口 | 用户 + Claude |
| 2026-07-23 | 项目初始化，创建 CLAUDE.md、CSS、所有页面、示例数据 | 用户 + Claude |

---

## 九、工作日志

| 日期 | 对话摘要 | 完成内容 |
|------|----------|----------|
| 2026-07-24 | 横幅轮播组件：公告页+电影推荐、多关键词搜索、分类选项卡、分页箭头、全局淡入动画 | resources.html 横幅轮播重写、main.js 搜索/分页/动画重构、detail.html 软件适配、全部页面动画 |
| 2026-07-24 | 教程页面重新设计：8篇影视制作/UP主教程、分类筛选、教程详情页 | 重写 data.js tutorials、更新 tutorials.html、新建 tutorial-detail.html |
| 2026-07-24 | 软件资源功能：数据结构重设计、选项卡恢复、详情页自适应 | data.js 新增6条软件数据、resources.html 选项卡+搜索+软件模式 CSS、detail.html 技术规格自适应 |
| 2026-07-24 | 创建资源详情页：detail.html + 扩展 data.js 技术参数和双网盘下载 | 创建 detail.html、更新 data.js、更新 main.js |
| 2026-07-24 | 导入16张真实电影封面，首页双行无限滚动轮播 | 更新 data.js、index.html、resources.html |
| 2026-07-23 | 初始对话：规划网站布局和设计，确定技术方案 | 项目规划、CLAUDE.md、所有前端页面 |

---

## 十、待办事项

### Phase 1（已完成）
- [x] 所有前端页面（7 个页面）
- [x] CSS 全局样式 + 淡入动画
- [x] 22 条资源数据 + 8 条教程数据
- [x] 封面图片（16 张真实 + 6 个 SVG）
- [x] 多关键词搜索 + 分类过滤
- [x] 横幅轮播组件
- [x] 下载弹窗
- [x] 教程详情页
- [x] 反馈页（含预选类型）

### Phase 2（后续）
- [ ] 移动端适配优化
- [ ] SEO 优化
- [ ] 部署上线
- [ ] 自定义域名
- [ ] 后端数据存储（可选）

---

> ⚠️ **AI 使用说明**：每次新对话请先完整阅读此文件。每次修改项目后必须同步更新"更新日志"和"工作日志"。新增功能需在"交互逻辑"表中添加对应条目。
