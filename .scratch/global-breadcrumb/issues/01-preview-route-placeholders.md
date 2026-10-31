# 01: 固定路由占位与发布门禁

**What to build:** 访客和编辑可以打开站点地图中的固定 Launch 路径，看到清楚标记的待填充页面；开发预览还可以查看固定 Planned 路径。占位只证明路由存在，不表示内容已审定或页面已公开。

**Blocked by:** None（can start immediately）

**Status:** resolved

- [x] 除现有首页外，所有固定 Launch 路径都能打开带唯一标题和待审核说明的占位页；页面使用现有 Header、main、Footer 外壳，不添加未经核实的业务主张、表单或素材。
- [x] 每个占位页输出 `noindex`，不产生公开 canonical、结构化数据或 XML sitemap 条目；路由可访问与内容已发布是两个不同状态。
- [x] 固定 Planned 路径只用于开发预览，生产环境不公开；不存在真实文章记录时，不为 `/blog/{slug}` 模式生成任意文章占位。
- [x] 未列入站点地图的路径保持 404，英文路径、标签和层级与站点地图一致；首页现有预览行为不回退。

## Comments

Claimed by Codex at 2026-11-01.

2026-11-01: `site/tests/int/preview-routes.int.spec.ts` 与路由登记、Header、Footer 集成测试共 33 项通过；改动文件 ESLint、`tsc --noEmit` 和 webpack 生产构建通过。生产 HTTP 逐一核对 17 个固定 Launch 页面为 200、正确 H1、待审核文案及 `noindex`，且无 canonical 或 JSON-LD；`/sitemap.xml` 为 404。开发 HTTP 核对四个固定 Planned 页面为 200/noindex，生产均为 404；虚构文章和产品型号均为 404；首页仍为 200/noindex。默认 Turbopack 构建因 worktree 的跨目录 `node_modules` 软链接失败，非源码诊断。Standards 与 Spec 审查均无阻塞发现。
