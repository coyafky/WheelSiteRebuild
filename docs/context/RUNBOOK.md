# 操作手册

## 运行、构建与验证

应用操作目录为 [`site/`](../../site/)，版本和配置文件见 [Project Bootstrap](../02-架构/PROJECT_BOOTSTRAP.md)。本地开发建议步骤见 [`site/README.md`](../../site/README.md)；数据库启动、完整应用运行和管理后台登录仍待验证。

2026-10-31 本轮直接验证（范围仅为 Bootstrap 骨架）：在 `site/` 中，使用 Node.js 24.22.2 + pnpm 11.28.10 执行生产 `build`、`tsc --noEmit` 与 `lint` 均通过，构建生成 `/`、`/admin` 与 Payload API 路由。standalone 构建产物在本机启动，`GET /` 返回 HTTP 200 和 Bootstrap 占位内容。开发与生产 Compose 文件的 `config --quiet` 语法检查通过。以上不代表数据库连接或业务页面验收。Docker Desktop 守护进程当时不可连接，容器启动和镜像构建未验证。

2026-10-31 公开站点组件库接入后，在相同 Node/pnpm 版本下重新执行 `build`、`tsc --noEmit` 与 `lint` 通过；浏览器查看占位页桌面排版，并在 375 px 视口确认无横向溢出。此检查只覆盖 Card 实际渲染和主题令牌读取；Button、Input、Textarea、Label 尚未在业务页面验证。

2026-10-31 首页实现预览：在 `site/` 下用 Node.js 24.22.2 执行 `npm run dev`，因 3000 端口已占用，Next.js 选用 `http://localhost:3001`。`GET /` 返回 HTTP 200，浏览器确认 `noindex, nofollow`、四平台和三个轮毂路径的占位呈现，且未发布目的页未生成链接。按用户反馈调整首屏内容密度后，在 375×812、768×900、1024×768、1280×800、1440×900 CSS px 视口检查：四个平台速览均在首屏内，页面无横向溢出。首页模型的两项集成测试、`tsc --noEmit`、`lint` 与生产 `build` 通过。此验证在无 PostgreSQL 连接下覆盖占位预览，不代表 CMS 读写、素材权利、业务内容或公开发布验收。

接到具体操作任务后，只检查相关配置和项目说明，核实前置条件、命令与预期结果，再记录实际执行范围和结果。文档步骤本身不构成执行授权。

## 交付

VPS 交付与发布步骤尚未核实。生产 Compose 只是配置基线；需先完成迁移、备份与恢复、对象存储、域名/HTTPS、业务功能及内容验收。发布状态只有在取得对应操作的直接证据后才更新。
