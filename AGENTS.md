# 项目协作规则

## 接手与读取

- 接手项目时先确认仓库根目录，并读取适用的 `AGENTS.md` 规则；规则有层级时同时遵守上级与项目规则。
- 按当前问题选择资料，不因文件存在、可能有用或被索引链接就读取。
- 不默认读取所有项目文件，也不默认全文读取选中的文件。定位到文件后，继续定位相关章节、条目、函数或配置项。
- 优先使用已有有效信息；需要查找时，按“索引或限定范围搜索 → 标题、符号或关键词 → 命中片段及必要上下文”的顺序读取。
- 只有证据不足、存在冲突或需要核对依赖时才扩大范围；信息足够即停止。不得连续分段读取，变相遍历无关全文。
- 全文读取仅用于短小且全部相关的文件、完整理解适用规则，或明确需要整份审查的任务。不得因此扩展为全目录或全项目读取。
- 索引是条件路由，不是必读清单。历史、日志、依赖、产物和数据目录不默认读取；不读取密钥及无关私人数据。
- 已加载且仍有效的内容不重复读取。

## 写入与记录

- 仅在任务允许且信息有实质变化时更新；只读任务不改记录。
- 每类事实只设一个权威来源，其他位置使用简短摘要和链接。
- 修改前读取目标部分及必要上下文，局部修改使用定点编辑；不得根据局部阅读覆盖整份文件。
- 当前状态直接修订，有价值的旧过程归档；不反复追加矛盾快照，不保存完整聊天和操作流水账。
- 区分事实、计划、建议、已确认决定与待核实事项；区分代码完成、测试通过、安装验证、用户验收和发布授权。
- 命令已配置不等于执行成功，历史结果不等于当前证据，文档中的操作步骤不构成执行授权。
- 使用清晰标题和项目内相对链接；核验日期注明对象与范围，不写入秘密或个人设备私有路径。

## 验证

- 文档任务只检查本次改动及其直接关联的链接、职责和事实来源；不把文档编辑扩展成全项目审计。
- 不声称运行、构建、测试、验收或发布已完成，除非有本次任务中的直接证据。
- 运行、构建、验收或交付前先按需读取 [`docs/context/RUNBOOK.md`](docs/context/RUNBOOK.md)；缺少已核实步骤时先说明待核实项。

## 文档路由

- 项目定位及任务路由：[`PROJECT_INDEX.md`](PROJECT_INDEX.md)。
- 项目用途、基本使用方式及文档入口：[`README.md`](README.md)。
- 当前目标与接续状态：[`docs/context/NOW.md`](docs/context/NOW.md)。
- 路径、版本及环境映射：[`docs/context/MAP.md`](docs/context/MAP.md)。
- 操作步骤：[`docs/context/RUNBOOK.md`](docs/context/RUNBOOK.md)。
- 决策、风险和历史：分别见 [`DECISIONS.md`](docs/context/DECISIONS.md)、[`RISKS.md`](docs/context/RISKS.md) 和 [`history/README.md`](docs/context/history/README.md)。

## Agent skills

### Issue tracker

Issues 和 specs 存放在 `.scratch/<feature>/` 下的本地 Markdown 文件。见 [`docs/agents/issue-tracker.md`](docs/agents/issue-tracker.md)。

### Triage labels

使用五个默认 triage 标签。见 [`docs/agents/triage-labels.md`](docs/agents/triage-labels.md)。

### Domain docs

采用 single-context 布局：根目录 `GLOSSARY.md` 与 `docs/adr/`。见 [`docs/agents/domain.md`](docs/agents/domain.md)。
