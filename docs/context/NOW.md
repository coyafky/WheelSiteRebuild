# 当前状态

## 目标

当前目标：按已确认的 [Sitemap 设计](../02-架构/SITEMAP.md)准备英文独立站页面内容，并基于已建立的 [Project Bootstrap](../02-架构/PROJECT_BOOTSTRAP.md) 实现应用。

## 进展

- 已建立项目规则、索引、项目说明和专题文档骨架。
- 英文站页面层级、路由和导航已按 RAYONE Wheels 的部分产品发现、轮毂 Engineering、Company 制造内容与询盘逻辑修订；新增 How We Work 和 Manufacturing 首发目标页，并细化 Wheel Engineering 的设计、工艺和质量区块。页面规划已由用户确认，页面内容与实际页面验收仍待完成，完整范围见 [Sitemap](../02-架构/SITEMAP.md)。
- 已完成 [RAYONE Sitemap 与信息架构调研](../02-架构/RAYONE_SITEMAP_RESEARCH.md)，核对其首页 hash 区块、独立产品／文章／方案 URL 和 XML sitemap，并按当前设计的覆盖情况提出优先级建议；新增建议尚未改变本站页面树。
- 已在 [Sitemap](../02-架构/SITEMAP.md) 补充标准采购、定制开发、供应商核查与文章阅读的页面衔接路径，以及统一询盘的可编辑上下文；轮毂下新增旋压、锻造、定制三个固定子页作为 Launch 目标，工艺与项目路径明确区分。其他类别／型号详情仍受独立内容条件约束。
- 已确认 Next.js 与 Payload 的首期内容架构、产品平台和 Blog 内容边界，见 [CMS 内容架构](../02-架构/CMS_ARCHITECTURE.md)；已建立四平台 Payload 集合及首页预览，完整业务 schema 与其余页面仍待实现。
- 已依据用户给定的 VPS/Docker、暂无 GitHub 仓库条件建立 `site/` 应用骨架、本地 Git 仓库、PostgreSQL 开发 Compose 和生产 Compose/Caddy 配置，具体选型与边界见 [Project Bootstrap](../02-架构/PROJECT_BOOTSTRAP.md)。本轮生产构建、类型检查与 lint 已通过；容器运行和 VPS 发布尚未验证。
- 已为公开站点接入 shadcn/ui（Radix）和 Tailwind CSS 4，并按 [Design.md](../../Design.md) 映射按钮、表单与卡片基础件；Payload 后台仍使用自身 UI。首页预览已实际渲染 Button 与 Card，表单基础件仍待业务页面验证。
- 已确认首版业务需求、并列核心客户、轮毂优先、全球英文市场及三项转化统计口径，见 [业务与产品定义](../00-product/PRODUCT_BRIEF.md)；指标尚无真实基线，统计功能未核实。
- 此前的文档阶段没有代码验收；本轮首页预览已验证模型测试、静态检查、生产构建及本地页面响应。用户确认了 Sitemap 页面规划，未进行业务内容或公开发布验收。
- 已建立项目级 [Design.md](../../Design.md) 作为视觉与交互规则入口；项目负责人已批准首版视觉令牌与 WCAG 目标作为设计基线，Logo、图片权利、对外主张及实际页面验收仍待核实。
- 已按 [Specification Design 索引](../03-Page/README.md)建立 23 个逐页 PageSpec（18 个 Launch、5 个 Planned）、七个新增共享组件契约，以及内容模型、交互和 SEO 规划；首页与 Wheels 总页已纳入三个轮毂子入口。首页已按 [Home Page Spec](../../.scratch/page-home/spec.md)形成内部实现预览；既有 Header、Footer、RFQ 草案继续作为各自权威来源，其完整实现仍待完成。
- [初版 HTML 预览](../../design-preview.html)保留用于比较；当前视觉提案见 [浅色工业风 HTML 预览](../../design-preview-light-industrial.html)，轮毂三个规划入口已嵌入[三张生成概念图](../../preview-assets/README.md)。预览采用项目内图片与标明为概念图的生成素材；图片业务适用性和对外主张未获发布核准。本轮浏览器已检查新增轮毂入口在桌面与 375 px 窄屏的排版、图片加载和横向溢出；表单不发送数据，预览不代表真实页面验收或发布批准。
- 已按 [Global Hero Spec](../../.scratch/global-hero/spec.md)实现共享 Hero 组件：单一 H1、`type.display` / `type.h1` 两档字号、至多一主操作加一次链接（目的地由共享路由登记解析或限定页内锚点）、已批准图片或明确标注的待核实占位。首页首屏已改用该组件，四平台速览与锚点跳转保留。实现与验收证据见 `.scratch/global-hero/issues/*.md` 的 Comments；单测 13 项、类型检查、lint、生产构建通过，真实浏览器在 320/375/768/1024/1440 CSS px 与 200% 缩放下无横向溢出。这不是视觉签核或发布批准。
- 用户确认尚无可公开使用的 Logo、四平台产品图及英文简介；`site/` 首页因此使用清楚标识的占位、禁用未发布目的页链接，并设置 `noindex, nofollow`。Payload 平台内容与媒体权限已接入首页读取，但本地数据库尚未验证。

## 阻塞与待核实

- 首页占位预览可由 `npm run dev` 启动；Docker 守护进程未可用，数据库连接、CMS 读写、镜像构建和 VPS 验证待补。生产 VPS、域名、对象存储服务商与 PostgreSQL 备份/恢复流程尚未确定。
- 尚无已审定的 Blog 文章；栏目可在至少一篇文章审定并发布后开放。Privacy Policy 已列为首发目标，但文案和实际数据处理仍待审定；真实询盘与联系提交依赖其先行公开。Terms of Use 仍为后续规划；产品详情内容与具体实现状态待核实。

## 下一步

- 后续任务按 [`PROJECT_INDEX.md`](../../PROJECT_INDEX.md) 定位所需资料；三个 agent 按 ticket 领取制分工，领取流程、handoff 格式与 git 分支规则见 [`docs/agents/roles.md`](../agents/roles.md)。
- 补齐首页可公开使用的 Logo、四平台英文简介及产品图，核实图片权利与对外主张；按各页 Specs 实现目的页、共享 Header/Footer 与询盘流程，再依据内容和 SEO 发布门槛解除首页 noindex。三个轮毂子页、How We Work、Manufacturing 与 Privacy Policy 仍需各自资料和验收；Blog 和 Terms of Use 满足各自条件后再开放。
- 发现事实或状态实质变化后，先更新其唯一权威来源；按需修订本页。

## 证据入口

- 2026-10-31 规格规划核对范围：业务定义、Sitemap、Design、CMS 架构、现有 Header/Footer/RFQ 草案及与逐页内容直接相关的资料；20 个 PageSpec 的路由、状态、章节和本地链接已做文档级检查。
- 2026-10-31 轮毂扩展核对范围：新增三个子页与首页、轮毂总页、Sitemap、索引、内容模型、交互、SEO 和 RFQ 草案的本地链接及规划状态；首页预览新增一个轮毂组、三张入口卡的静态结构检查。浏览器在 1512 与 375 CSS px 下读到三列／一列布局，375 px 下没有横向溢出；这不是页面视觉验收或发布批准。
- 2026-10-31 轮毂概念图核对范围：三个项目内 PNG 文件存在，HTML 预览中的三张图均在桌面与 375 CSS px 窄屏浏览器加载；截图检查三列与单列卡片布局、可见概念图标签和文字可读性。未据此核实真实产品或公开发布资格。
- 前述页面规格和预览工作未运行网站、构建或执行页面、表单、SEO 的实施验收；本次 Bootstrap 构建证据见下项。
- 2026-10-31 Project Bootstrap 核对范围：`site/` 生成器骨架与依赖版本、TypeScript、ESLint、Next.js 生产构建、standalone 占位页 HTTP 200，以及开发/生产 Compose 语法。未做数据库、容器或业务页面功能验证；生产部署基线仍需 VPS 与服务商条件。
- 2026-10-31 组件库接入核对范围：公开站点的 shadcn/ui 组件配置、Tailwind CSS 4 主题与基础件；类型检查、lint、生产构建通过。浏览器在桌面读取到 20 px 卡片圆角和 `#C9151C` 主色，在 375 px 视口测得无横向溢出；Button、Input、Textarea、Label 的页面级行为和无障碍验收留给实际页面实现。
- 2026-11-01 共享 Hero 代码复核核对范围：对 Cursor 提出的 6 条意见逐条运行时验证。5 条成立并已修（媒体槽 `ReactNode` 逃生口、空白标签/空 alt/空占位标签、图片尺寸守卫、写死 `id="hero-title"`、非嵌入垂直内边距未用 `layout.sectionGap`）；1 条（图片盒塌陷）意见成立但所述失败情形两次浏览器实测均无法复现，按 Spec 正面要求加固并如实标注为加固而非缺陷修复。单测 23 项、全量 55 passed、`tsc --noEmit`、`eslint`、`next build` 通过；真实浏览器在 320/375/768/1024/1440 CSS px 下 `h1Count=1`、`h1Id=home-hero`、`overflowX=0`、主操作 44 px。详见 `.scratch/global-hero/issues/03-hero-media-slot.md` 的 Code review response。
- 2026-11-01 共享 Hero 核对范围：`site/src/components/hero/hero.tsx` 的单一 H1、两档字号、动作与媒体槽契约；单测 13 项、`tsc --noEmit`、`eslint`、`next build` 通过。真实浏览器在 320、375、768、1024、1440 CSS px 下测得 `h1Count=1`、`overflowX=0`、主次动作高度 44 px，1024 及以上字号 60 px、以下 40 px；以 720 CSS px 视口模拟 200% 缩放时无横向溢出、H1 未裁切。截图见 `.scratch/global-hero/evidence/`。未做品牌资产核准、视觉签核与公开发布验收。
- 2026-10-31 首页实现预览核对范围：四平台与三个轮毂路径模型的两项集成测试、TypeScript、lint 和生产构建通过；`npm run dev` 启动后浏览器确认 `/` 返回 HTTP 200、`noindex, nofollow`、占位内容与无未发布链接。根据用户对视口内容密度的反馈，首屏已加入四平台速览并收紧后续区块；在 375、768、1024、1280、1440 CSS px 宽度下，速览处于首屏内且无横向溢出。无数据库、真实产品素材或公开内容验收；详细尺寸、命令与边界见 [RUNBOOK](RUNBOOK.md)。
