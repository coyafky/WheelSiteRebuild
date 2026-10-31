# 02: 每页粘性主导航

**What to build:** 采购者在任意页面看到一条白色粘性 Header，并能从这里进入产品、能力、合作方式、关于、联系，或开始询盘。当前页有明确的激活状态。未发布的 Blog 和未核实的辅助条不会出现。

**Blocked by:** 01: 共享导航路由登记

**Status:** ready-for-agent

- [ ] 在 1024 和 1440 CSS px，顺序为 Products、Engineering、How We Work、About、Contact；品牌回首页；Request a Quote 去 `/request-quote`。每条都是规范的站内链接。
- [ ] 精确匹配的当前链接带有 `aria-current="page"`。父级可以有可见的激活样式，但不会把多个链接同时标成当前页。红色下划线不是唯一状态信号。
- [ ] 没有 UtilityBar、电话、邮箱、语言切换、搜索、车型适配、RAYONE 素材或占位 `href`。品牌在正式标记批准前使用标明草稿的占位。
- [ ] Blog 未发布时不出现。发布后出现在 How We Work 和 About 之间，并指向 `/blog`；关闭该门禁后其他导航不变。
- [ ] PrimaryHeader 吸顶，且不挡住页内锚点目标。普通文本对比度至少 4.5:1，大文本和有意义的界面至少 3:1。200% 缩放下焦点可见，主要操作不被裁切。
