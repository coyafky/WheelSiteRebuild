# 03: Hero 媒体槽、占位与文字可读性

**What to build:** Hero 可以带一个已批准的视觉，或一个明确标注的内部占位。视觉缺失时页面依然完整可读。文字不压在未验证的照片上。占位不能被误当成真实产品或证据。

**Blocked by:** 01: Hero 内容契约与唯一 H1

**Status:** resolved

- [ ] 提供已批准媒体时渲染图片，带可用的 alt；纯装饰图使用空 alt，不写无关文字。
- [ ] 未提供已批准媒体时渲染明确标注的占位，标明待核实，且不显示为产品照片。
- [ ] 媒体缺失、加载失败或纯占位时，H1、说明与动作仍然完整可读可操作。
- [ ] 正文不叠在未经核实的照片上；需要叠放时必须落在可证明的实色表面。
- [ ] 图片 alt 与图内文字不含未核实的产品结果、认证、市场覆盖或公司身份主张。
- [ ] 已批准图片预留尺寸，避免加载时挤动布局。

## Comments

### Handoff — Alma 2026-11-01

- **做了什么**：Hero 媒体槽支持两种形态——已批准图片（带 alt、宽高预留、可选装饰性空 alt）与明确标注的待核实占位；媒体缺失时文字与动作完全可用。
- **改了哪些文件**：`site/src/components/hero/hero.tsx`、`site/tests/int/hero.int.spec.ts`
- **证据**：测试覆盖 `src`/`alt`/`width`/`height`、装饰性图 `alt=""`、占位 `role="img"` 的 `aria-label` 含 pending、无媒体时 H1 与动作仍可用。截图 `.scratch/global-hero/evidence/hero-*.png` 确认占位标签压在实色 `bg-card` 上，不与装饰圆重叠。
- **未做 / 有意留空**：占位是目录内的抽象图形，不是产品证据；真实产品图与权利仍 TBD。
- **下一步依赖**：解除 04 的阻塞（与 02 共同）。

### Code review response — Alma 2026-11-01

Cursor 的 3 条 Spec 意见经运行时实测核对，处理如下。

- **1. 媒体槽的 `ReactNode` 逃生口 — 成立，已修。**
  实测：传入 `createElement('img', {src:'/unverified.jpg', alt:''})` 时，媒体槽原样输出 `<img src="/unverified.jpg" alt="">`，无宽高、无 `object-cover` 包裹、无 alt 阻断。已把 `media` 收窄为纯 `HeroMedia`，删除 `ReactNode` 分支；两个守卫都失败时抛错。
- **2. 空白内容只拦了标题和说明 — 三条全部成立，已修。**
  - 路由动作 `label: '   '`：实测渲染出 `<a href="/request-quote">   </a>`（填充红按钮、无可读文字）。现在纯空白标签抛错；只有**完全未传**（`undefined`）才回落登记标签，并对此单列了用例。
  - `{ pending: true, label: '   ' }`：实测 `aria-label="    (not verified product imagery)"`。现在抛错。
  - 非装饰图 `alt: ''`：实测渲染 `<img alt="">`。现在非装饰图必须有非空 alt，装饰图仍走空 alt。
- **3. 图片尺寸没有被布局钉住 — 意见成立，但所述失败情形未能复现；仍按意见加了约束。**
  实测两种场景，带 `aspect-ratio` 与不带完全同尺寸：① 图片 404 加载失败（600×338 对 600×338）② 网格行被 900 px 文字列拉高（600×338 对 600×338）。**所以「盒子塌陷」在当前实现里我想不到也不能复现**。不过「按来源比例预留」本身是 Spec 与 Design.md 的正面要求（避免挤动、裁切不得切掉证据特征），所以已给媒体盒加 `data-media-box` + 内联 `aspect-ratio: w / h`，并补用例。诚实标注：**这是加固，不是修复可复现缺陷**。
- **4. 锚点注释比代码多承诺一步 — 成立，已改注释口径。** 服务端渲染无法查 DOM，注释现在只说「必须是页内 section id 形式的锚点」，不再声称已校验存在性。
- **5. 询盘未走 Inquiry CTA 组件 — 维持原状，非偏差。** Handoff 已把「不预填产品上下文」标为有意留空，属 RFQ 与 Inquiry CTA 的范围。

新增用例 5 条（媒体槽）。

### Code review response — Standards（同一来源）

- **1. 写死 `id="hero-title"` — 成立，已修。** 实测两个 Hero 同页会输出 **2 个** `id="hero-title"` 与 2 个 `aria-labelledby="hero-title"`，region 的可访问名都会指向文档里第一个标题。现在支持 `headingId`（校验为小写 slug），未传时用 `useId()` 生成实例唯一 id；首页显式传 `headingId="home-hero"`。补 3 条用例（slug、双实例 id 互不相同、非法 slug 抛错）。
  - 说明：初版用模块级计数器，被 `react-hooks/globals` 判错（渲染期写模块变量），改用 React `useId`，服务端/客户端一致。
- **2. 两处未入表的一次性数值 — 成立，已处理。**
  - 垂直内边距：非嵌入时原为 48/64/96 px，与 `layout.sectionGap`（76/96/136）不符 → 已改为 `py-[76px] sm:py-[96px] lg:py-[136px]`。
  - 标题字距 `-0.03em` / `-0.025em`：Design.md 的字号表只定义字号与字重，**不含字距**。保留并在文件内写明理由（大字号在该字重下不收紧会过松），属「记录偏离」而非「无据偏离」。
- **3. 图片守卫只看形状，不看尺寸 — 成立，已修。** 实测缺 `width`/`height`、`0`、负数三种输入都会渲染 `<img>`。现在守卫要求 `url` 非空、`width`/`height` 为**正整数**，否则抛错。补 1 条覆盖三种输入的用例。
