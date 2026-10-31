# Issue tracker：本地 Markdown

这个项目的 issues 和 specs 作为 Markdown 文件存放在 `.scratch/` 中。

## 约定

- 每个 feature 一个目录：`.scratch/<feature-slug>/`
- Spec：`.scratch/<feature-slug>/spec.md`
- 每个 implementation ticket 单独存放：`.scratch/<feature-slug>/issues/<NN>-<slug>.md`，从 `01` 编号
- Triage state 写在 issue 文件顶部附近的 `Status:` 行；角色字符串见 [triage-labels.md](triage-labels.md)
- Comments 和讨论记录写在文件底部的 `## Comments` 下

## Skill 操作

- “Publish to the issue tracker”：在 `.scratch/<feature-slug>/` 下创建相应文件。
- “Fetch the relevant ticket”：读取用户指定路径或编号对应的文件。

## Wayfinding 操作

- Map：`.scratch/<effort>/map.md`，记录 Notes、Decisions-so-far 和 Fog。
- Child ticket：`.scratch/<effort>/issues/<NN>-<slug>.md`；`Type:` 为 `research`、`prototype`、`grilling` 或 `task`。
- Blocking：在 ticket 顶部附近写 `Blocked by: NN, NN`；全部 blocker 为 `resolved` 后才解除阻塞。
- Frontier：按编号寻找最早的 open、unblocked、unclaimed ticket。
- Claim：开始工作前将 `Status:` 设为 `claimed`。
- Resolve：在 `## Answer` 下写入答案，将 `Status:` 设为 `resolved`，并向 map 的 Decisions-so-far 添加简述和链接。
