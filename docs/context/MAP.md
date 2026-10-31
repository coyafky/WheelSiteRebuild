# 路径与环境映射

## 当前已知

- 本项目文档工作区：仓库根目录（目录名 `WheelSite_Rebuild`）。
- 已见文档分类目录：`docs/00-product/`、`docs/01-design/`、`docs/02-架构/`、`docs/03-Page/`、`docs/04-componets/`。
- 本地应用根目录为 [`site/`](../../site/)；Next.js App Router 在 `site/src/app/`，Payload 配置在 `site/src/payload.config.ts`，依赖与锁文件在 `site/package.json`、`site/pnpm-lock.yaml`。
- 公开站点的组件配置在 `site/components.json`、主题变量在 `site/src/app/globals.css`、组件源码在 `site/src/components/ui/`；Payload 管理后台使用独立布局。
- 首页路由在 `site/src/app/(frontend)/page.tsx`，页面组件在 `site/src/components/home/`，四平台与轮毂路径模型在 `site/src/content/home-model.ts`，Payload 平台读取在 `site/src/lib/get-home-platforms.ts`；页面契约见 [Home Page Spec](../../.scratch/page-home/spec.md)。
- 开发数据库配置在 `site/compose.dev.yaml`；单 VPS 生产基线在 `site/compose.prod.yaml`、`site/Dockerfile` 和 `site/Caddyfile`。生产 VPS、域名、数据库卷与对象存储实例尚未落地。
- 本地 Git 仓库位于项目根目录；截至 2026-10-31 尚无 GitHub 仓库或远端。

## 待核实

- 既有 HTML 预览与 `site/` 页面实现之间的迁移关系。
- 实际 VPS、域名、对象存储服务商、生产环境配置和同步方式。

目前没有足够证据建立以上映射。定位具体修改或运行对象时再检查相关路径，并只记录确认有效的关系。
