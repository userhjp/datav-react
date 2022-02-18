# 可视化设计器

## 目录结构

```bash
core                          # 核心
shared                        # 工具
react                         # 设计器布局代码
├── components                # 设计器组件
└── hooks                     # 共享hooks
└── schema                    # widget组件通用schema
└── containers                # 容器组件
└── settings-form             # 组件对应配置表单
└── widgets                     # 设计器图表组件目录，组件无需额外引入，widgets目录下所有组件及配置文件会在编译自动解析。
    └── Title                   # 组件目录（组件名称）
        ├── index.tsx           # 组件入口
        ├── index.less          # 组件样式
        └── config.ts           # 组件配置文件组件基础信息及Schema，约定组件配置文件必须跟组件同目录且文件名必须为config.ts 后续可能会重构组件注入方式
```
