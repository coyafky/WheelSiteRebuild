# 01: 共享导航路由登记

**What to build:** Header 和 Footer 向同一份代码配置的英文路由登记查询目的地。登记给出稳定 id、规范路径和发布状态。未发布的 Blog、法律页、联系方式和认证不会变成可点击链接。这一步还没有新的页面导航，用测试核对登记与站点地图一致。

**Blocked by:** None（can start immediately）

**Status:** claimed

- [ ] 首页、四个产品平台、产品总览、Engineering 总览、轮毂与安全轮胎两条产品线能力、How We Work、About、Manufacturing、Contact、Request a Quote 的英文路径与站点地图一致，且除 `/` 外没有尾部斜杠。
- [ ] Blog、Privacy Policy、Terms of Use 默认未发布；联系方式和认证默认为空。
- [ ] Header 与 Footer 通过路由 id 取目的地，不各自维护第二份 URL 清单。
- [ ] 核心路由缺失或无效时配置失败；未核实的可选条目被省略，而不是链到占位地址。
