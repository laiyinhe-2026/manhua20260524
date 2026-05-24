# AI 漫画 / 角色生图工作台

React + Vite + TypeScript + Tailwind CSS 实现的 AI 漫画 / 角色生图创作工作台。

## 运行

```bash
npm install
npm run dev
```

## 主要能力

- 漫画剧情图 / 纯图两种输出模式
- 项目基础信息、风格、比例和生成数量设置
- 人物底图、场景设定、风格参考图管理
- DeepSeek V4 service 层 mock：剧情丰富、分镜规划、提示词生成
- GPT-image2 service 层 mock：批量生图与失败状态模拟
- 人物一致性描述和场景一致性描述自动拼装
- 分步骤人工审核、编辑、重新生成
- 批量生成任务区、结果预览、替换图片、导出 JSON / 文稿
- localStorage 草稿保存与刷新恢复

## 接入真实 API

- `src/services/deepseekService.ts`：接入 DeepSeek V4
- `src/services/gptImageService.ts`：接入 GPT-image2
- `src/services/mockService.ts`：当前演示 mock 数据
