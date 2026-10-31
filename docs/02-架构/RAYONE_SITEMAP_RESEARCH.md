# RAYONE Wheels Sitemap 与信息架构调研

> 调研日期：2026-10-31。对象：<https://www.rayonewheels.com/> 公开页面及其公开 `sitemap.xml`。本文件记录结构事实和对本项目 Sitemap 的建议，不等同于 RAYONE 的业务事实背书。

## 结论摘要

RAYONE 的关键经验不是把首页做得更长，而是把“产品发现 → 规格／适配判断 → 工程与工厂证据 → 询盘”串成一条路径，同时为不同采购意图提供不同入口。它采用混合结构：主页和部分导航使用 `#` 片段视图，产品、产品型号、询盘、OEM/ODM、新闻、行业文章和政策页则有真实独立路径并进入 XML sitemap。

对本项目最值得借鉴的最小结构是：

1. 保留四大产品平台总览，并给有稳定数据的产品类别提供独立列表页或可索引详情页的演进路径。
2. 把产品页的“规格／适配输入”与询盘上下文绑定；同一个询盘页根据来源预填产品、合作类型和需求字段。
3. 将 Engineering、Manufacturing、Quality 作为证据链互相链接，而不是只做一张公司宣传页。
4. 增加可持续的 Company News／Technical or Industry Insights 内容路径，文章再回链产品、工程和询盘。
5. 保留 Company Manufacturing 和 How We Work，但不照搬 RAYONE 的五个子品牌、轮毂型号目录、经销授权和饰品产品线。

## URL 与 Sitemap 事实

- 主页入口是 `https://www.rayonewheels.com/#home`。主页的主导航、工程区块、Company、Partnership、新闻卡片和部分产品详情入口大量使用 `#...` 片段。
- 站点同时提供真实的 `https://www.rayonewheels.com/sitemap.xml`，并在 `robots.txt` 中声明它。XML 中包含主页、`/products`、产品类别页、型号详情页、`/products/inquiry`、`/solutions/oem-odm-wheel-manufacturing`、`/news`、多篇 `/news/{slug}`、多篇 `/industry/{slug}` 以及 `/privacy.html`、`/terms.html`、`/warranty.html`。
- 代表性独立页面均返回 200，并有 canonical：`/products`、`/products/flow-formed-wheels`、`/products/flow-formed/dx002-1895`、`/products/custom-forged-wheels`、`/products/inquiry`、`/solutions/oem-odm-wheel-manufacturing`、`/news`、`/industry/ev-heavy-suv-wheel-fitment`。
- 主页 hash 区块不应被误写成公开 URL 层级。RAYONE 的 XML 列出了一组真实独立路径；hash 主要承担首页导航、专题联动和弹层状态。

来源：<https://www.rayonewheels.com/robots.txt>、<https://www.rayonewheels.com/sitemap.xml>、<https://www.rayonewheels.com/>。

### XML 独立 URL 的类别计数

2026-10-31 从公开 `sitemap.xml` 的 67 个 `<loc>` 汇总如下；这是路径类别计数，不是把首页 hash 区块当成 URL：

| 路径类别 | 数量 | 路径样例 |
| --- | ---: | --- |
| 首页 | 1 | `/` |
| Products 总览 | 1 | `/products` |
| 产品类别页 | 3 | `/products/flow-formed-wheels`、`/products/cast-wheels`、`/products/custom-forged-wheels` |
| 子品牌目录 | 5 | `/products/ks-forged`、`/products/r-1` |
| 旋压轮毂型号详情 | 24 | `/products/flow-formed/{slug}` |
| 重力铸造型号详情 | 8 | `/products/gravity-cast/{slug}` |
| Accessories 总览／详情 | 9 | `/products/accessories`、`/products/accessories/{slug}` |
| 产品询盘 | 1 | `/products/inquiry` |
| OEM/ODM 方案 | 1 | `/solutions/oem-odm-wheel-manufacturing` |
| News 总览／详情 | 8 | `/news`、`/news/{slug}` |
| Industry 文章 | 3 | `/industry/{slug}` |
| 法律与质保页面 | 3 | `/privacy.html`、`/terms.html`、`/warranty.html` |
| **合计** | **67** | — |

对照关系：主页采集到约 330 个 `#...` 链接，但这些大多是首页导航、页内区块、弹层详情或带查询参数的询盘状态；XML 列出的 67 个独立 URL 构成其公开 sitemap URL 集合，不应直接等同于全部可索引页面。对本项目的直接启示是：先定义哪些内容有稳定的规范 URL，再生成 XML sitemap；不要因为有一个页内区块就增加一个 URL。

### 窄屏移动导航实测

已在 390×844 的窄屏视口实测主页（先关闭分析偏好对话框，再打开汉堡菜单）。初始状态只显示 Logo、`Open navigation menu`、首屏 `Explore Wheels` 和 `Request a Quote`。菜单打开后提供：Home、Product Center 及其 Flow Formed／Custom Forged／Custom Forged Solution／KS ROCK Off-Road／Cast／Accessories 子项、Engineering、About RAYONE、Partnership 及 Apply to Become a Partner／OEM-ODM Manufacturing 子项、News；底部另有 Request a Quote、WHEEL SEARCH 和中英文切换。菜单有明确的 Close navigation menu。

窄屏菜单没有把桌面顶部的 Contact Us 和 Technical Support 作为独立菜单项显示；联系入口仍可从首页 CTA、询盘页和页脚的 Email／WhatsApp／Call 到达。这里记录的是实测可达入口，不推断未显示项目是否由滚动或其他状态提供。

本项目状态：已覆盖（移动端与桌面端共用页面目的地的原则）；需补强（实现同一组 Products、Engineering、How We Work、About、Contact、Request a Quote 目的地，并让移动菜单保留产品上下文和询盘入口）；不建议照搬（将大量轮毂子品牌子项塞进移动一级菜单）。

## 结构走查

### 1. 顶部导航与首页动线

主页顶端提供 Partnership Inquiry、Contact Us、Technical Support 和中英文切换；主导航分为 Product Center、Engineering、News、About RAYONE、Partnership，另有 Request a Quote 和 Wheel Search。主页首屏先给 Explore Wheels 与 Request a Quote，然后进入 Product Types、Why RAYONE、Five Sub-Brands、News & Updates、CTA／询盘。

可借鉴：顶端快捷入口应覆盖“采购询盘、一般联系、工程支持”三种意图；首屏 CTA 同时给产品发现和询盘；首页中段用优势卡片把用户带到工程、质量、品牌或合作，而不是只重复产品卡。

本项目状态：已覆盖（产品、Engineering、How We Work、About、Contact、Request a Quote）；需补强（首页按采购意图给出产品与标准采购／定制开发两个 CTA，并让 Engineering/Manufacturing 证据可回链）。

### 2. 产品发现与搜索

主页 Product Center 按 Flow Formed、Custom Forged、Cast 三种轮毂类型，再按 KS FORGED、KS ROCK、R-1、ROR、DIM 五个子品牌展开；有 View Full Catalog、Custom Forged Solution、KS ROCK Off-Road Solution 和 Accessories 等入口。Wheel Search 支持型号、品牌、尺寸、工艺、认证和新闻的内容搜索，并给出 DX Series、Flow Formed、Gravity Cast、Off-Road、尺寸、PCD、OEM/ODM 等建议搜索。

真实路径进一步分为 `/products` 总目录、类别列表（如 `/products/flow-formed-wheels`）、子品牌页（如 `/products/ks-forged`）和型号页（如 `/products/flow-formed/dx002-1895`）。

可借鉴：先建立总览 → 类别列表 → 详情的层级；搜索维度应来自真实可维护字段；类别页和详情页都要有“Request This Model”或同类 CTA。

本项目状态：已覆盖（`/products` 及四个平台页）；需内容条件（产品型号、规格、可筛选字段足够稳定后再做列表／详情或站内搜索）；暂不适用（五品牌、饰品目录、轮毂专属 PCD 搜索）。当前 Sitemap 已明确不为型号和搜索预分配 URL，这个判断保留。

来源：<https://www.rayonewheels.com/products>、<https://www.rayonewheels.com/products/flow-formed-wheels>、<https://www.rayonewheels.com/products/flow-formed/dx002-1895>。

### 3. 产品详情与询盘上下文

型号页包含返回类别目录、3D／颜色入口、Product Specifications 和 Request This Model。询盘链接把型号、产品名称、类别、图片和来源路由作为查询参数带入；`/products/inquiry` 页面明确说明所选产品会自动带入表单。定制锻造页则收集 Vehicle Data、Vehicle & Use Case、Engineering Validation、Drawing Approval & Production，并提供独立的车辆／项目询盘。

可借鉴：标准产品询盘与定制项目询盘共享一个受控入口，但表单字段按合作类型变化；产品页的上下文应可编辑而不是隐藏；详情页始终提供返回父级路径。

本项目状态：Sitemap 已规定 `/request-quote` 接收产品平台和合作类型上下文，且预填值可修改；实施时仍须确定字段、来源传递方式及校验。轮毂 3D viewer、颜色选择和车型适配数据库暂无适用条件。

来源：<https://www.rayonewheels.com/products/flow-formed/dx002-1895>、<https://www.rayonewheels.com/products/inquiry>、<https://www.rayonewheels.com/products/custom-forged-wheels>。

### 4. Engineering、Factory、Process、Quality

主页 `#technology` 是 Engineering & Manufacturing 总览，内部链接到 `#factory`、`#fea`、`#process`、`#finishing` 和 `#quality`。内容顺序是工厂能力（样品库存、研发中心、精密加工、出货复核）→ 设计与工程（车辆数据、刹车避让、ET、CB、PCD、载荷、结构强度和 FEA）→ 制造流程（原料、成形、热处理、旋压、CNC、表面处理、质量测试、包装交付）→ 精加工与追溯 → 质量与认证（气密、动平衡、冲击、弯曲疲劳、径向疲劳、盐雾、外观、批次追溯）。这些是主页 hash 区块，不是独立工程 URL。

可借鉴：工程页应按项目阶段组织证据，并把“设计判断”与“设备展示”分开；质量区块要说明测试目的、适用产品、证据和认证主体；从产品页和 Company Manufacturing 双向链接。

本项目状态：已在 Sitemap 规划（`/capabilities` 对外命名 Engineering、`/capabilities/wheels` 页内四段、`/about/manufacturing`，以及首页到这些证据区块的链接）；实现阶段需按规划落实；需内容条件（认证、产能、测试参数逐项核实后公开）；暂不适用（把轮毂工程证据直接套到三电壳体或安全轮胎）。

来源：<https://www.rayonewheels.com/#technology>、<https://www.rayonewheels.com/#fea>、<https://www.rayonewheels.com/#quality>。

### 5. Company 与制造现场

主页 About RAYONE 组织 Brand Story、Jiangxi Factory Capability、Milestones；Factory 区块提供样品库存、研发中心、精密加工和出货复核等信任证据。它将 Company 叙事和 Engineering/Factory 证据互相连接，而不是把工厂只放在页脚。

本项目状态：已在 Sitemap 规划（`/about`、`/about/manufacturing`，以及首页到 Company Manufacturing 的证据链接）；实现阶段需补齐制造页四条产品线区块的生产主体、基地关系、现场图和证据；需内容条件（工厂地址、所有权／合作关系、照片地点、产能和认证主体核实后再显示）。

来源：<https://www.rayonewheels.com/#about>、<https://www.rayonewheels.com/#factory>。

### 6. Partnership、OEM/ODM 与询盘

RAYONE 将 Partnership 作为独立导航意图，内容包含经销合作价值、从首次联系到市场启动的步骤、合作申请表和 OEM/ODM 制造方案。`/solutions/oem-odm-wheel-manufacturing` 是独立可索引方案页，分 Product & Market、Engineering & Quality、Packaging & Supply，并把需求提交导向产品询盘和 WhatsApp。

可借鉴：把一般采购询盘、定制项目、渠道／合作申请分开表达；OEM/ODM 方案页围绕“产品、工程质量、包装供货”组织；每个入口都回到可追踪的询盘动作。

本项目状态：已覆盖（`/how-we-work`、`/request-quote`）；需补强（How We Work 页面增加标准采购／定制开发两条路径的输入与阶段确认）；需内容条件（若将来有成熟经销或渠道政策，再增加 Partnership 页面）；暂不适用（RAYONE 的授权经销表单和轮毂专属 OEM/ODM 页面暂不直接复制）。

来源：<https://www.rayonewheels.com/#dealer-join>、<https://www.rayonewheels.com/solutions/oem-odm-wheel-manufacturing>、<https://www.rayonewheels.com/products/inquiry>。

### 7. News、Industry Insights 与内容回链

主页 News & Updates 展示展会、全球市场和认证等卡片；真实路径 `/news` 及 `/news/{slug}` 提供文章详情，并有 Previous/Next、Back to News、Explore Products、Dealer/OEM Inquiry。`/industry/{slug}` 作为行业文章路径，例子是新能源车轮毂适配指南，正文最后导向经销商询价资料。

可借鉴：把 Company News 与 Technical/Industry Insights 分成可识别的内容类型；文章详情要有返回列表、前后篇和相关产品／工程／询盘链接；只有有正式内容时才纳入 XML sitemap。

本项目状态：Sitemap 已规划 Blog、technical、company-news、slug 规则、相关产品／能力链接、上一篇／下一篇和返回列表；CMS 内容架构已允许文章关联产品平台和能力页。文章模板的询盘 CTA 仍可细化；至少一篇文章审定发布后才开放 Blog，符合现有 CMS 规则。

来源：<https://www.rayonewheels.com/news>、<https://www.rayonewheels.com/news/panama-latin-tyre-auto-parts-expo-2026>、<https://www.rayonewheels.com/industry/ev-heavy-suv-wheel-fitment>。

### 8. Fitment Gallery、社交入口和政策页

RAYONE 有 Wheel Fitment Inspiration 与 Submit Your Fitment 区块，并声明展示图不等于车主评价或适配保证；投稿通过 Email/WhatsApp，先确认发布许可。页脚提供 Email、WhatsApp、电话、Facebook、Instagram、产品／工程／Company／Partnership 分组和 Privacy、Terms、Warranty 三个真实路径。

可借鉴：如果未来有真实案例，可做“案例／应用灵感”内容并明确不是适配保证；页脚按访问意图分组；隐私、条款、质保等政策采用真实独立 URL。

本项目状态：暂不适用（UGC、社交账号、质保页尚无足够内容和流程）；需内容条件（有授权案例、提交审核流程和适配责任边界后再增加）；已覆盖／规划（Contact、Privacy、Terms）。

## 对当前 Sitemap 的执行建议

### P0：随首发结构落实

- 保持当前四大产品平台、Engineering、Company Manufacturing、How We Work 和统一 Request a Quote 的主树。
- 落实 Sitemap 已规定的询盘上下文：产品平台、合作类型、数量、规格／用途、目标市场、图纸或样件；实施时确认预填字段与校验。
- 落实 Sitemap 已规定的 `#overview`、`#design-engineering`、`#manufacturing-process`、`#quality-validation` 四个轮毂工程锚点和产品／工厂／询盘互链。
- 按 Sitemap 已规定的四产品线结构准备 Manufacturing 的主体／基地／现场／证据；核实前不创建四座工厂详情 URL。

### P1：内容准备后加入

- CMS 已允许 Blog 文章关联产品和能力页；可进一步确定文章模板的询盘 CTA 与前后篇链接。发布后为文章详情生成 canonical 和 XML sitemap 条目。
- 若产品资料稳定，先为四个平台建立“类别列表”模板；详情 URL 只在型号或方案字段、图库、适配和询盘上下文可持续维护时启用。
- 若未来形成明确 OEM/ODM 服务包，可增加 `/solutions/{slug}`；在此之前把方案内容放入 `/how-we-work` 或对应产品页。

### 暂不引入

- 五个轮毂子品牌、Accessories 目录、轮毂专属搜索字段、3D/颜色查看器、UGC 投稿和经销授权申请页。
- 把主页 hash 区块直接当作独立 Sitemap 页面；只有有独立内容、规范 URL、canonical 和发布条件的页面才进入 XML sitemap。

## 与当前 Sitemap 的状态矩阵

| RAYONE 逻辑 | 当前 Sitemap 状态 | 最小可执行动作 |
| --- | --- | --- |
| 产品总览 → 类别 → 详情 | 已覆盖总览／平台；详情需内容条件 | 先完善平台模板和字段，不新增 URL |
| 产品上下文带入询盘 | 已在 Sitemap 规划 | 实施时确定参数传递、可编辑预填字段和校验 |
| Product & Content Search | 暂不适用／需内容条件 | 产品字段稳定后再评估搜索，不预留 URL |
| Engineering → Design → Process → Quality | 已在 Sitemap 规划并已细化 | 按四个锚点和证据互链实现；内容仍需核实 |
| Company → Factory Capability | 已在 Sitemap 规划 | 按四产品线补主体、基地、现场和证据 |
| Partnership / OEM / ODM | How We Work 已覆盖；独立方案页需内容条件 | 先写两类合作流程；成熟后再建 `/solutions/{slug}` |
| News 与 Industry 文章 | Blog 已规划；相关文章关联已在 CMS 规划 | 保持 `/blog/{slug}`，细化 CTA 字段与文章模板 |
| Previous/Next 与 Back to List | 已在 Sitemap 规划 | 在文章模板中落实列表返回和前后篇 |
| Fitment Gallery / UGC | 暂不适用 | 有授权案例和审核流程后再评估 |
| Footer 分组与政策页 | 已覆盖／Privacy Policy 为 Launch 目标、Terms of Use 为 Planned | 实现 Products、Engineering、Company、Contact 分组；各政策页审定后公开 |
| XML sitemap 与 robots | 已在 Sitemap 规划，实施待核实 | 实施阶段为正式 URL 生成 XML sitemap 和 robots 引用 |

## 限制与核实边界

- 本调研只说明 Rayone 站点当前公开的链接和页面组织，不验证其认证、产能、市场覆盖、客户数量等商业主张。
- 主页的 `#` 区块和真实独立路径是两套不同层级；本项目借鉴的是导航与转化关系，不能把 Rayone 的 hash 名称直接转换成本站公开路由。
- 本项目当前仍是页面设计文档，不表示任何路由、XML sitemap、robots、canonical、表单或内容模型已经实现。
