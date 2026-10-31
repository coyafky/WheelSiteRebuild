# 05: About、Manufacturing 与顶级页 Breadcrumb

**What to build:** 采购者从 Manufacturing 能直接返回 About；其他已存在的顶级页面也有简短的返回首页路径，而首页本身保持没有 Breadcrumb。

**Blocked by:** 02: Products 首条可见 Breadcrumb

**Status:** ready-for-agent

- [ ] Manufacturing 使用 Home → About → Manufacturing；已存在的 How We Work、Contact、Request a Quote 和获准开放的法律页使用 Home → 当前页；首页不渲染 Breadcrumb。
- [ ] 父级链接和当前文字的标签、顺序、规范路径一致；没有第二个指向当前页的链接。
- [ ] 预览或未审定法律页面不因 Breadcrumb 被视为公开；公开模式只暴露已发布的有效关系。
- [ ] 允许输出的 `BreadcrumbList` 与可见路径一致；窄屏、200% 缩放和键盘焦点可用。
