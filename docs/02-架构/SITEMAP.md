# 独立站 Sitemap（页面与路由规范）

本文件约定英文独立站的页面层级、公开路由、导航关系和页面职责。逐页内容、交互、数据与 SEO 的规划入口见 [PageSpecs 索引](../03-Page/README.md)。它是 Markdown 设计文档，不是已部署路由清单，也不是供搜索引擎读取的 XML sitemap。

## 设计边界

- 目标：帮助全球 B2B 采购者发现合适的产品或定制方案，核查交付能力，并发起询盘。
- 主要路径：按产品平台找供给，按工程与质量证据核查能力，再按标准采购或定制开发提交需求。一般联系与采购询盘分开。
- 主站产品范围：轮毂、新能源三电壳体、铝制品定制、安全轮胎。集团信息用于企业背书；集团的其他产品线不进入本版产品目录。业务边界详见 [ADR 0001](../adr/0001-main-site-product-scope.md)。
- 首发客户、业务模式与转化口径见 [业务与产品定义](../00-product/PRODUCT_BRIEF.md)。轮毂在首页产品入口和 `/products` 总览中排首位，并有更完整的轮毂工程证据入口；其余三平台保持同等级可达的页面和采购询盘路径。
- 本版只设计英文页面，英文 URL 使用根路径；不设 `/en` 或中文路由。详见 [ADR 0002](../adr/0002-english-routes-at-root.md)。
- `Launch（首发目标）` 表示计划纳入网站第一次对外发布的页面；`Planned（后续规划）` 表示路由位置已约定，但尚未列入首发。两个状态只描述规划范围，均不表示页面已开发、验收或上线。

## 页面树

下表中的状态简写为 `Launch = 首发目标`、`Planned = 后续规划`。

```text
/                                  Home                      Launch
├── /products                      Products                  Launch
│   ├── /products/wheels            Wheels                    Launch
│   │   ├── /products/wheels/flow-formed  Flow-Formed Wheels  Launch
│   │   ├── /products/wheels/forged       Forged Wheels       Launch
│   │   └── /products/wheels/custom       Custom Wheels       Launch
│   ├── /products/ev-housings       EV Housings               Launch
│   ├── /products/custom-aluminum   Custom Aluminum          Launch
│   └── /products/safety-tires      Safety Tires              Launch
├── /capabilities                  Engineering               Launch
│   ├── /capabilities/wheels        Wheel Engineering         Launch
│   └── /capabilities/safety-tires  Safety Tire Capabilities  Launch
├── /how-we-work                   How We Work               Launch
├── /blog                          Blog                      Planned
│   ├── /blog/technical             Technical Articles        Planned
│   ├── /blog/company-news          Company News              Planned
│   └── /blog/{slug}                Article detail            Planned · route pattern
├── /about                         About                     Launch
│   └── /about/manufacturing        Manufacturing             Launch
├── /contact                       Contact                   Launch
├── /request-quote                 Request a Quote           Launch
├── /privacy-policy                Privacy Policy            Launch
└── /terms-of-use                  Terms of Use              Planned
```

`/blog/{slug}` 是文章详情的路由模式，不代表一篇已存在的文章。三个轮毂子页是已规划的固定主题页，不是可自动扩展的型号详情：旋压和锻造按工艺区分，定制按项目合作方式区分，三者并非互斥的产品分类。其他产品型号与方案详情本版不分配 URL。

## 页面职责

| 路由 | 主要任务与内容边界 | 主要下一步 |
| --- | --- | --- |
| `/` | 四大产品平台、合作价值、可核查的能力摘要，以及标准采购／定制开发两个入口；轮毂为首个产品入口，在其下展示旋压、锻造、定制三个子入口并链接 Wheel Engineering，其他平台仍可直接进入。能力摘要链接相应 Engineering 与 Company Manufacturing 证据。 | 进入平台页、轮毂子页、`/capabilities`、`/about/manufacturing`、`/how-we-work` 或 `/request-quote` |
| `/products` | 四大平台总览，轮毂排首位，其他三平台并列；每个平台卡片说明适用采购需求、可提供的内容和下一步。 | 进入平台页 |
| `/products/wheels` | 轮毂平台总览：解释旋压与锻造的工艺选路、定制轮毂的项目路径及其可交叉关系；提供通用规格输入和验证入口。其他类别可留在页内，型号内容充分后再考虑独立页面。 | 三个轮毂子页、`/capabilities/wheels`、`/request-quote` |
| `/products/wheels/flow-formed` | 旋压轮毂固定主题页：说明适用采购需求、旋压工艺范围、选型输入、可核实的工艺和验证证据；不宣称所有轮毂或型号均采用该工艺。 | `/products/wheels/forged`、`/products/wheels/custom`、`/capabilities/wheels`、`/request-quote` |
| `/products/wheels/forged` | 锻造轮毂固定主题页：说明适用采购需求、材料与成形路线、选型输入及验证证据；具体重量、性能和设备主张逐项核实。 | `/products/wheels/flow-formed`、`/products/wheels/custom`、`/capabilities/wheels`、`/request-quote` |
| `/products/wheels/custom` | 定制轮毂项目入口：说明按图纸、样件或目标要求进行评估、设计、试制、验证和交付的输入与阶段；工艺按项目选择，可涉及旋压或锻造，不将“定制”描述为第三种成形工艺。 | `/how-we-work`、适用工艺页、`/capabilities/wheels`、`/request-quote` |
| `/products/ev-housings` | 水冷电机壳、高压铸造电机壳、电控箱／逆变器壳体及其应用；明确图纸、材料、数量等询盘输入。 | `/how-we-work`、`/request-quote` |
| `/products/custom-aluminum` | 按图纸或样件开发的应用范围、输入资料、工程评估和合作阶段。 | `/how-we-work`、`/request-quote` |
| `/products/safety-tires` | 自密封原理、适用场景、选型信息及经核实的性能说明。 | `/capabilities/safety-tires`、`/how-we-work`、`/request-quote` |
| `/capabilities` | 对外导航名为 Engineering；以工程设计、制造、验证和出口交付为证据链组织总览。每项证据标明适用产品线，避免把轮毂能力写成全站通用能力。 | 进入对应能力页、产品页或 `/how-we-work` |
| `/capabilities/wheels` | Wheel Engineering：从需求与适配参数、3D／有限元／铸造模拟，到成形与精加工，再到检测和质量证明，按项目阶段呈现可核查证据。 | `/products/wheels`、`/about/manufacturing`、`/request-quote` |
| `/capabilities/safety-tires` | 按安全轮胎产品线组织研发、生产、穿刺测试、质量及可核实的证明材料。 | `/products/safety-tires`、`/request-quote` |
| `/how-we-work` | 分别说明标准采购与定制开发的需求输入、评估、样品／验证、订单或量产、出口交付阶段；说明每阶段由谁确认什么。不是经销授权申请页。 | 按合作类型进入 `/request-quote` |
| `/blog` | 技术说明与公司动态的共同入口。 | 进入分类列表 |
| `/blog/technical` | 产品原理、工艺、验证及应用的技术说明列表。 | 阅读文章，再进入相关产品页 |
| `/blog/company-news` | 有明确日期的公司事件、合作与业务动态列表。 | 阅读文章，再进入相关页面 |
| `/blog/{slug}` | 单篇文章；标明所属分类并链接相关产品或能力页面。 | 进入相关产品页或 `/request-quote` |
| `/about` | 说明主站业务主体、集团关系及可核实的资质与市场信息，并引导访客查看四条产品线的制造现场；不展示集团其他产品目录。 | `/about/manufacturing`、`/contact` 或 `/request-quote` |
| `/about/manufacturing` | 按四条产品线展示工厂／产线、关键工序、检测现场及对应的生产主体；说明共用制造资源与各线差异。回答“在哪里、由谁、如何制造”，具体工艺和验证细节仍链接对应产品与能力页。 | 进入对应产品页、能力页或 `/request-quote` |
| `/contact` | 一般联系信息和非采购类联系入口。 | 有产品需求时转 `/request-quote` |
| `/request-quote` | 一个采购询盘入口；表单区分产品采购、定制项目与 OEM/ODM 合作三类需求，分别收集相应的产品、规格、数量、用途、市场或图纸／样件信息。支持从产品页带入产品平台上下文，用户可以修改。How We Work 仍以标准采购与定制开发两条合作路径说明流程。 | 提交询盘 |
| `/privacy-policy` | 首发隐私告知页；文案须与真实询盘/一般联系的数据处理、接收方、保留与删除流程一致并经过审定。真实表单提交开放前必须已公开且可从表单到达。 | 返回询盘或相关主站页面 |
| `/terms-of-use` | 后续规划的条款页；文案须单独审核。 | 返回相关主站页面 |

产品页回答“提供什么、如何选型”；能力页回答“如何研发、制造和验证”；`/how-we-work` 回答“如何开始与推进合作”。能力页按产品线组织，目前只设轮毂和安全轮胎两页；新能源三电壳体与铝制品定制的能力信息暂放各自产品页及能力总览，不预留空的能力子页。此取舍详见 [ADR 0004](../adr/0004-capabilities-by-product-line.md)。

### Wheel Engineering 页内结构

`/capabilities/wheels` 以一个页面承载下列区块，页内目录使用表中锚点分别直达；锚点不构成新的公开页面。`/about/manufacturing` 说明生产主体、基地与现场，Wheel Engineering 说明项目如何设计、制造和验证，两页互相链接。

| 页内区块与锚点 | 回答的问题与内容 | 对应下一步 |
| --- | --- | --- |
| Engineering overview `#overview` | 轮毂项目从需求、设计、工艺选择、生产到验证的流程图；标明适用工艺和所需客户输入，链接实际工厂介绍。 | Design & Engineering、`/about/manufacturing` |
| Design & Engineering `#design-engineering` | 车型／用途、尺寸、PCD、ET、CB、载荷、目标市场等输入；3D 建模、有限元、铸造模拟与逆向工程如何用于设计评估。展示可核实的图示或案例，不把仿真图当成量产验证结果。 | Manufacturing Process、`/request-quote` |
| Manufacturing Process `#manufacturing-process` | 按适用项目说明重力铸造、低压铸造、旋压或锻造，再到热处理、CNC、表面处理和过程检查；区分现有产线与需要按项目确认的路线。 | Quality & Validation、`/about/manufacturing` |
| Quality & Validation `#quality-validation` | 尺寸与外观、动平衡、冲击、动态弯曲疲劳、动态径向疲劳等检测的目的与证据；证书按持证主体、适用产品、有效期和目标市场核实后展示。 | `/products/wheels`、`/request-quote` |

页面按“输入 → 工程判断 → 制造 → 验证”串联，而不是陈列设备和证书。具体测试参数、认证名称、产能及性能结论须逐项核实后才能作为对外主张。

### Company 下的制造内容

`/about/manufacturing` 是一个总览页，四个区块按**产品线**组织，不预设四座独立工厂或四个独立公开路由。每个区块都应有生产主体与基地关系、可用的真实现场图、关键工序、检测或交付证据，以及指向对应产品页的链接；缺少可核实资料的字段不展示。

| 产品线区块 | 页面重点 | 对应页面 |
| --- | --- | --- |
| Wheels | 轮毂制造链：材料与模具、铸造／旋压、热处理、CNC、涂装和检测；标明实际适用的基地和产线。 | `/products/wheels`、`/capabilities/wheels` |
| EV Housings | 电机与电控壳体的铸造、水道／焊接、精加工、尺寸与密封检测；与轮毂共用基地或资源的部分按实际关系说明。 | `/products/ev-housings` |
| Custom Aluminum | 按项目调用材料、模具、试制、机加工及验证资源；说明项目开发与共用产线的关系，不将定制业务写成单独工厂。 | `/products/custom-aluminum` |
| Safety Tires | 自密封涂层生产、相关轮胎加工与检测环节；标明各环节的生产主体、产线及与主站业务主体的关系。 | `/products/safety-tires`、`/capabilities/safety-tires` |

发布前逐项核实工厂名称与地址、所有权或合作关系、照片拍摄地点、产线适用产品、产能和认证主体。现有资料可支持区块主题，尚不足以把四条产品线宣称为四座自有工厂。

## 导航与链接关系

- 顶部 Logo 链接 `/`；文字导航依次为 Products、Engineering、How We Work、About、Contact；Blog 栏目开放后在 How We Work 与 About 之间显示 Blog；`Request a Quote` 为独立按钮，链接 `/request-quote`。移动端保持同样的目的地与层级。
- Products 的 Header 菜单直达四个平台页；轮毂三个子页通过首页和 Wheels 总览直接可达，Wheels 总览始终保留独立入口。Engineering 的 Header 主项指向 `/capabilities`，移动抽屉可展开两个已有能力子页；桌面访客可从 Engineering 总览和页脚分组直达子页。父级总览页始终保留明确入口。下拉菜单、页内目录和页脚分组只是访问这些页面的方式，不增加重复的公开路由。
- Wheel Engineering 页内目录提供 Overview、Design & Engineering、Manufacturing Process、Quality & Validation 四个锚点；从 `/products/wheels` 可直接链接相关区块，仍以 `/capabilities/wheels` 为规范页面 URL。
- About 的 Header 主项指向 `/about`；Company 页脚分组与 `/about` 正文直接提供 `/about/manufacturing` 入口。Manufacturing 按四条产品线设置页内目录和到相应产品页的链接。
- `/products` 必须直接链接四个平台页；首页和 `/products/wheels` 应直接提供三个轮毂子页入口，只有目标页实际公开后才显示可点击链接；`/capabilities` 必须直接链接两条能力子页。轮毂总页、子页与 Wheel Engineering 之间提供关联链接，安全轮胎产品页与对应能力页双向链接。
- 每个平台页可用页内目录组织“类型／应用 → 规格或项目输入 → 能力证据 → 询盘”。轮毂三个固定子页须有各自独立内容与审核结果才公开；不得把其他未经核实的轮毂类型、品牌或型号扩展成页面。
- 首页、各产品页、`/how-we-work` 及相关技术文章提供通往询盘页的明确入口。产品页发起的询盘应能带入产品平台和合作类型上下文；这不产生新的公开页面路由。一般联系继续进入 `/contact`。
- Blog 总览只链接已有正式文章的分类页；分类页链接本类文章；文章详情链接所属分类及相关产品／能力页。内容足够时可提供上一篇／下一篇和返回列表，帮助读者继续浏览。
- 有父级的页面提供返回父级的路径。页脚按 Products、Engineering、Company、Contact 分组，Engineering 包含轮毂与安全轮胎能力页，Company 包含 About 和 Manufacturing；How We Work 与 Request a Quote 保持可见。政策页面在审定并发布后再显示为可用链接。
- 公开页面应通过导航或正文中的实际链接可达；这与 [Google 对站点导航结构的说明](https://developers.google.com/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure)一致。

### 访客任务路径

下表约定页面之间应提供的链接，不要求访客按固定顺序浏览。Blog 路径仅在栏目正式开放后启用。

| 访客意图 | 发现入口 | 核查与决策路径 | 询盘入口 |
| --- | --- | --- | --- |
| 标准产品采购 | `/`、`/products` → 对应产品平台页 | 在平台页查看类别、规格或应用；需要验证供货能力时进入对应 Engineering 或 Manufacturing 证据，再返回产品页。 | 从产品页进入 `/request-quote`，带入平台与已知选型信息 |
| 轮毂工艺选型 | `/` 的轮毂子入口或 `/products/wheels` → 旋压／锻造页 | 比较适用需求和已核实的工艺、规格及验证证据；不从工艺页推断具体车型适配。 | 从所选轮毂页进入 `/request-quote`，带入 wheels 和可编辑的工艺意向 |
| 定制轮毂项目 | `/` 的定制轮毂入口或 `/products/wheels/custom` | 了解项目输入和合作阶段，按项目进一步查看旋压、锻造及 Wheel Engineering 证据。 | 以 wheels 和可编辑的定制项目类型进入 `/request-quote` |
| 按图纸或样件定制 | `/products/ev-housings`、`/products/custom-aluminum`，或其他平台的定制入口 | 进入 `/how-we-work` 了解工程评估、样品验证和量产阶段；从相关页面核查制造与质量证据。 | 以“定制开发”进入 `/request-quote` |
| 核查供应商与工厂 | `/about`、`/about/manufacturing` | 从四条产品线的生产主体和现场，进入对应产品页或已有能力页核查适用工艺与证据。 | 按目标产品进入 `/request-quote`；一般联系进入 `/contact` |
| 阅读技术或公司内容 | `/blog` → 分类 → 已发布文章 | 文章链接所讨论的产品平台、能力页或 Company 内容，提供返回分类的路径。 | 有明确采购意图时进入 `/request-quote` |

### 询盘入口与上下文

- `/request-quote` 是唯一公开采购询盘页面。直接进入时，访客自行选择“产品采购／定制项目／OEM/ODM 合作”类型及适用的产品平台；从产品页或 `/how-we-work` 进入时，只预选来源已明确的选项，所有预选信息均可查看和修改。三类询盘的定义与字段边界见 [RFQ 草案](../../.scratch/rfq-system/RFQ-System-Spec.md#3-inquiry-taxonomy-and-public-entry-points)。
- 入口可带入产品平台、合作类型，以及已选类别或型号的引用；尚无正式型号详情时只带平台或页内类别。旋压／锻造轮毂页可带入可编辑的工艺意向，定制轮毂页可预选可编辑的定制项目类型；这些仅表示买方意向，不证明型号工艺。来自 Engineering、Manufacturing 或 Blog 的入口可标记来源页面，但不推断访客的产品或合作类型。
- 产品采购侧重产品／规格、用途、数量和目标市场；定制项目侧重应用、材料、图纸或样件、目标数量与验证要求；OEM/ODM 合作侧重持续制造合作的需求。各平台只显示适用的补充说明与字段，具体字段及校验以 [询盘字段草案](../../.scratch/rfq-system/Inquiry-Field-Definition.md) 为准，实施状态仍待核实。
- 图纸、样件文件和个人联系信息通过表单提交，不放进可分享的 URL；来源上下文不改变 `/request-quote` 的规范路径，也不产生新的 sitemap 条目。

## URL 与内容发布规则

1. 固定路径使用英文小写与连字符；除首页 `/` 外不使用尾部斜杠。一个页面只保留一个规范 URL，站内链接使用该 URL。路径命名遵循[清晰、可读的 URL 建议](https://developers.google.com/search/docs/crawling-indexing/url-structure)。
2. 文章详情统一使用 `/blog/{slug}`，不把分类写入详情 URL；`technical` 和 `company-news` 不可用作文章 slug，文章 slug 在 Blog 内保持唯一。分类变更不要求更改文章 URL，详见 [ADR 0003](../adr/0003-blog-article-url.md)。文章发布后保持 slug 稳定；确需修改时，旧地址永久重定向到新地址。
3. 当前资料中尚无已审定的 Blog 文章；`/blog`、两个分类页和文章详情均先标 `Planned`。后台可先创建测试文章，但测试文章只用于草稿和预览，不对公众开放。至少一篇文章审定并发布后，可由管理员统一开放 Blog 栏目；不要求两个分类各有文章。栏目开放时，只开放已有正式文章的分类列表页和已审定发布的文章详情；空分类不显示入口或公开列表页。
4. `/privacy-policy` 是 `Launch` 目标，但须经法律/业务审定并实际公开，才能开放 `/request-quote` 与 `/contact` 的真实提交；未满足时表单不得制造成功提交的假象。`/terms-of-use` 保持 `Planned`，待文案审定后启用。页面树中的其他 `Launch` 页面也须经过内容核实、实现和验收才能对外发布。
5. 本版只为旋压、锻造、定制轮毂规定三个固定子页 URL；不规定其他轮毂类型、产品型号、合作方案或站内搜索的独立 URL，不建立地区专页，不扩展集团其他产品线。型号目录与搜索须有可维护的正式数据及明确的筛选维度后再设计；未来若新增页面，先明确独立内容、父级、页面目标与询盘路径，再更新本文件。
6. 实施阶段的 XML sitemap 只收录已公开且有规范 URL 的真实页面；不收录草稿、尚未启用的 `Planned` 页面、`/blog/{slug}` 这类路由模式或页内 `#` 锚点。`robots.txt` 指向正式 XML sitemap；页面、站内链接与 XML 中的规范 URL 保持一致。

### 后续页面层级的启用条件

| 候选层级 | 建立独立页面前须具备的内容 | 当前处理 |
| --- | --- | --- |
| 产品平台下的其他类别列表 | 类别有清晰采购区别、稳定的名称与选型字段，且有足够正式内容支持独立列表。 | 旋压、锻造、定制轮毂三个固定页已规划；其他类别先在平台页内分组，满足条件后再定路径与父级 |
| 型号或产品详情 | 可维护的型号标识、规格、适用范围、图片及对应询盘上下文；对外性能主张已核实。 | 不预分配详情 URL |
| OEM/ODM 等方案详情 | 明确的服务范围、适用产品、客户输入、交付阶段和可核查案例或能力证据。 | 先放在 `/how-we-work` 或对应产品页，不预分配方案 URL |
| 跨产品搜索 | 四个平台有可维护的结构化字段和可用的搜索结果；搜索能把访客带到正式页面及询盘。 | 暂不设搜索路由或索引页 |

## 参考站点的取舍

2026-10-31 核对 [RAYONE Wheels 公开站点](https://www.rayonewheels.com/) 的导航、产品中心、[Engineering 总览](https://www.rayonewheels.com/#technology)、[设计与仿真](https://www.rayonewheels.com/#fea)、[质量与认证](https://www.rayonewheels.com/#quality)、Company 下的工厂内容、合作入口及询盘：其结构把产品类型与选型、制造和质量证据、公司及工厂介绍、合作申请、产品询盘分别呈现，并可把具体产品带入询盘。本站借鉴这些**访问与转化关系**，对应四大产品平台、轮毂工程证据、`/about/manufacturing`、`/how-we-work` 和统一采购询盘；不沿用其五个轮毂子品牌、经销授权流程或型号层级。参考站点的首页大量使用 `#` 区块，同时也有[产品目录](https://www.rayonewheels.com/products)、文章等独立 URL 和[公开 XML sitemap](https://www.rayonewheels.com/sitemap.xml)；本站继续采用上文约定的独立规范 URL。完整对照见 [RAYONE Sitemap 调研](RAYONE_SITEMAP_RESEARCH.md)。

## 资料依据与核实边界

- [A 科技产品综合介绍](../99-原生资源/A科技_产品综合介绍.md)：四大产品平台、合作流程及现有产品描述。
- [轮毂产品手册核心介绍](../99-原生资源/A轮毂_产品手册核心介绍.md)：轮毂研发、生产与检测资料。
- [防扎安全轮胎项目核心介绍](../99-原生资源/A防扎安全轮胎_项目核心介绍.md)：安全轮胎研发、生产与测试资料。
- [贵州蓝辉集团简介](../99-原生资源/贵州蓝辉集团简介_2026.md)：企业背景及集团业务范围；具体关系和对外表述发布前仍需核实。

本文件确认的是页面设计。资料中的认证、产能、性能、市场覆盖等对外主张，仍需按具体页面和适用产品核实；当前仓库没有可据此判定已实现的站点路由。
