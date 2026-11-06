# 北大医疗 · 医疗服务网络 H5（iOS 26 风格）

纯静态手机端站点，无构建依赖。视觉采用 Liquid Glass 玻璃质感、悬浮胶囊导航与原生分组卡片。

## 页面

| 页面 | 文件 | 说明 |
| --- | --- | --- |
| 首页 | `mobile.html` | 师资力量、正在开展的健康营项目、分院网络、学科科室 |
| 师资团队 | `team.html` | 专家 / 医师 / 护理 / 运营 / 科室，支持搜索、分页 |
| 健康营案例 | `camp.html` | 项目团队按角色分组，支持角色、医院筛选与成员详情 |
| 分院网络 | `hospitals.html` | 6 大地区 12 家机构，支持搜索、地区筛选、机构详情 |
| 成员介绍 | `member.html?id=` | 医师与运营/项目成员详情 |
| 科室介绍 | `department.html?id=` | 科室简介、特色、学科带头人、医生团队 |
| 关于 | `brand.html` | 医院规模、发展历程、愿景 |
| 入口 | `index.html` | 跳转到 `mobile.html` |

## 本地预览

```bash
python3 -m http.server 8080
# 打开 http://localhost:8080/mobile.html
```

不要直接双击 HTML，浏览器在 `file://` 下会限制页面参数与部分资源。

## 数据与替换

页面按需加载数据，首屏不再下载全量医师库：

- `featured-experts-data.js`：首页精选专家（约 3KB）
- `team-experts-data.js`：师资页首屏 57 位专家（约 35KB）
- `team-doctors-data.js`：医师 Tab 点击后按需加载的 669 位医师
- `departments-index.js`：师资页科室列表轻量索引
- `departments-data.js`：科室详情页使用（完整科室介绍）
- `member-team-0~7.js` / `member-details-0~7.js`：成员页按 id 分片加载
- `member-lookup.js`、`medical-team-data.js`、`member-details.js`：完整源数据，保留用于重新生成分片，页面不再直接加载
- `operations-team-data.js`：运营、健管、营养、康复岗位人员
- `camp-data.js`：**健康营项目案例**。项目名称、营期、团队成员、所属医院、时间线均在此配置；团队成员可按项目自由组合，页面支持按角色与医院自由浏览。
- `institutions-data.js`：12 家成员机构与地区

健康营所属医院为案例演示配置，正式使用时替换 `camp-data.js` 中 `roster[].hospital` / `hospitalId` 即可，无需改动页面。

## 性能说明

- 首屏 JS：首页约 38KB、师资页约 90KB、健康营约 35KB、运营成员详情约 38KB（未压缩传输量，已较改版前下降 90%+）
- 卡片不再使用实时 `backdrop-filter`，仅固定顶栏、Tab、底部弹层保留玻璃模糊
- 内容区默认可见，不依赖滚动监听才显示，避免弱网/微信内出现空白
- 微信内与低内存设备自动关闭固定栏模糊（`html.perf-lite`）

## 交互

- 底部四 Tab：首页 / 师资 / 健康营 / 分院
- 顶栏滚动后自动变为毛玻璃，并显示页面标题
- iOS 原生侧滑返回；Android 微信内额外提供左边缘右滑返回（`app.js`）
- 成员、机构详情使用底部 Sheet，支持点击遮罩关闭
- 搜索、筛选、分页加载、复制地址、拨打电话

## 技术

- `ios.css`：设计系统（玻璃、圆角、字体、Tab、Sheet）
- `views.css`：内页组件样式
- `home.css`：首页专属样式
- `app.js`：共享运行时（滚动、动效、Sheet、Toast、返回手势）
- `icons.js`：SVG 图标 sprite
