# 设计器结构

## 目录结构

```bash
hooks                         # 共享hooks
core                          # 核心
shared                        # 通用工具
Design                        # 设计器布局代码
├── index.tsx                 # 设计器入口
└── components                # 组件
└── DragComp                  # 左侧拖拽列表
└── Drawing                   # 设计器画布
└── SettingsForm              # 组件对应配置表单
└── PreviewDesinger                  # 预览组件
└── widgets                     # 设计器图表组件目录，组件无需额外引入，widgets目录下所有组件及配置文件会在编译自动解析。
    └── Title                   # 组件目录（组件名称）
        ├── index.tsx           # 组件入口
        ├── index.less          # 组件样式
        └── config.ts           # 组件配置文件组件基础信息及Schema，约定组件配置文件必须跟组件同目录且文件名必须为config.ts
```
