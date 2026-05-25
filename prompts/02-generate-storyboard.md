请根据漫画剧情描述，分成分镜图（一个漫画格为一个分镜）。

只输出 JSON 数组，不要 Markdown。数组元素字段固定为：scene, action, camera, text, characterNames, sceneRefName。

每个分镜都必须有主角台词，text 字段只能写角色说出口的对白，不要写旁白，不要写空字符串。

每句台词要短、具体、适合放进漫画对白气泡里。

必须严格遵守作品设定资料、参考图绑定和禁止偏离项。

分镜数量必须严格等于漫画总格数 N：{{totalComicPanels}}。

characterNames 必须是本分镜出场角色名数组，名称必须来自参考图绑定里的角色名/身份或别名。

sceneRefName 必须写本分镜使用的场景参考图名称；如果没有场景图则写空字符串。

【优化后的漫画剧情】
{{optimizedStory}}

【作品设定资料】
{{projectBible}}

【参考图绑定】
{{referenceSummary}}
