# 02: 页脚产品、能力与公司链接

**What to build:** 采购者在任何宽度都能从页脚直接到达四个产品平台、已批准的产品线能力，以及 How We Work、About、Manufacturing 和 Contact。链接组始终展开，没有手风琴。

**Blocked by:** 01: 每页只出现一次的询盘收尾

**Status:** ready-for-agent

- [ ] 在 320、375、768、1024 和 1440 CSS px，Products 总览和四个产品平台都可见，标签与路径符合站点地图。不出现额外产品平台，也不出现新能源三电壳体或铝制品定制的能力子页。
- [ ] Engineering 含总览、Wheel Engineering 和 Safety Tire Capabilities。Company 含 How We Work、About、Manufacturing 和 Contact。
- [ ] Blog 未发布时不出现；用已审定并发布的内容打开后，指向 `/blog`。
- [ ] 桌面最多四列，平板两列，窄屏按阅读顺序单列。长标签换行，不裁切，不造成页面横向滚动。200% 缩放下链接仍可到达。
- [ ] 页脚是一个 contentinfo 地标，分组是带标题的语义列表。键盘焦点可见，链接名称和目的地有效。公开 HTML 中这些链接是锚点，不依赖水合，也不含占位 `href` 或尾斜杠变体。
