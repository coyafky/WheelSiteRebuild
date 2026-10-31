# Project Bootstrap 技术栈与部署基线

状态：2026-10-31 已建立本地应用与配置；尚未完成 Docker 启动、VPS 安装验证或发布。用户给定的基础条件是 **VPS + Docker**，且尚无 GitHub 仓库。此文件记录据此采用的实施方案；内容管理边界仍以 [CMS 内容架构](CMS_ARCHITECTURE.md) 为准。

## 选型

| 层 | 本次选型 | 原因与边界 |
| --- | --- | --- |
| 应用 | 单一 Next.js 16.3.3 App Router + React 19.2.6 + TypeScript | 与已确认的 Next.js/Payload 同应用架构一致；公开页面与管理后台同源。版本来自本次 Payload 官方 blank 模板与锁文件。 |
| CMS | Payload 3.92.1 | 已确认的产品平台、Blog 和媒体管理方向；当前仅有模板自带 Users、Media，业务 schema 尚未实现。 |
| 公开站点 UI | shadcn/ui（Radix）+ Tailwind CSS 4 | 组件源码放入项目，按 [`Design.md`](../../Design.md) 的已批准令牌调整；当前接入 Button、Input、Textarea、Label、Card。Payload 后台仍使用自身 UI。 |
| 运行时与包管理 | Node.js 24.22.2 LTS + pnpm 11.28.10 | 满足当前 Payload 官方安装要求；固定镜像和包管理器版本，锁文件由 pnpm 管理。 |
| 数据 | PostgreSQL 17（Docker 官方镜像 `postgres:17-alpine`） | 与已确认的 Payload PostgreSQL 选择一致；开发数据库在 Docker 中，生产数据库先部署在同一 VPS 的私有 Compose 网络与持久卷中。 |
| 反向代理 | Caddy 2（`caddy:2-alpine`） | 对已绑定域名提供 HTTPS 与到应用容器的反向代理；应用端口不直接暴露到公网。 |
| 媒体 | Payload S3 兼容存储适配器 | 生产媒体使用外部对象存储；具体服务商与账号尚未确定。本地开发可使用本地上传目录。 |
| 编排 | Docker Compose | `compose.dev.yaml` 只启动开发数据库；`compose.prod.yaml` 定义应用、数据库和 Caddy 的单机基线。 |
| 版本管理 | 本地 Git 根仓库，无远端 | 先保留可审阅的本地变更；创建 GitHub 仓库、远端、CI/CD 与推送留待仓库所有者确定。 |

不引入第二个前端、独立 CMS 服务、Kubernetes 或静态导出。Payload 与需服务端处理的内容决定了应用使用 Node 运行时。[Payload 官方仓库](https://github.com/payloadcms/payload)和[安装文档](https://payloadcms.com/docs/getting-started/installation)是模板与兼容要求的参考；[Next.js 部署文档](https://nextjs.org/docs/app/getting-started/deploying)支持 Docker 与 standalone 输出；[Payload 部署文档](https://payloadcms.com/docs/production/deployment)说明数据库、永久文件存储和 Docker 的要求。[shadcn/ui Next.js 指南](https://ui.shadcn.com/docs/installation/next)说明现有项目接入方式。

## 实施范围与文件

- 应用与锁文件在 [`site/`](../../site/)；Next 配置启用 `standalone`，Payload 使用 PostgreSQL，并在有 S3 环境变量时启用对象存储。
- 公开站点组件配置在 [`site/components.json`](../../site/components.json)，主题映射在 [`site/src/app/globals.css`](../../site/src/app/globals.css)，基础组件在 [`site/src/components/ui/`](../../site/src/components/ui/)；主题只由公开站点布局引入。组件使用前仍需按页面 Spec 核对交互状态与可访问性。
- 本地数据库见 [`site/compose.dev.yaml`](../../site/compose.dev.yaml)；VPS 编排与代理见 [`site/compose.prod.yaml`](../../site/compose.prod.yaml)和 [`site/Caddyfile`](../../site/Caddyfile)。
- 环境变量示例见 [`site/.env.example`](../../site/.env.example)与 [`site/.env.production.example`](../../site/.env.production.example)。真实密钥、连接串与域名只放在未追踪的环境文件或 VPS 密钥管理中。
- 当前首页只是明确标注的 Bootstrap 占位页；既有静态设计预览没有迁入应用，也未代表生产内容。

## 上线前仍需完成

1. 确定 VPS、域名、DNS、对象存储服务商与访问凭据；核对防火墙、磁盘容量和恢复目标。
2. 实现业务 Payload schema 与公开路由；RFQ 扩展须先满足 [RFQ 规格](../../.scratch/rfq-system/RFQ-System-Spec.md)的权限和隐私条件。
3. 为 PostgreSQL 建立迁移、备份与恢复演练；生产 schema 使用可审阅迁移，不能将开发自动 push 当作发布流程。[Payload 迁移文档](https://payloadcms.com/docs/database/migrations)说明开发与生产差异。
4. 核实媒体上传/读取与对象存储备份策略；按 [Payload 存储适配器文档](https://payloadcms.com/docs/upload/storage-adapters)配置实际服务。
5. 在选定 VPS 上完成镜像构建、数据库迁移、HTTPS、功能与恢复验证，再决定发布。未创建 GitHub 仓库不阻止本地开发或手动镜像交付，但自动部署需要另行设计。
