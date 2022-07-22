# React可视化设计器
基于Formily表单驱动
* 💪 React 17.x
* 🔥 Formily 2.x
* 🔥 TypeScript 4.x
* 🔥 ECharts 5.x

## 安装与使用

```bash
# 安装依赖
npm install
# 跑起来！
npm run start
# 构建发布
npm run build
```
## 组件列表

```
- 页面功能
- [√] 编辑器
  * [√] 图层面板
  * [√] 组件面板
  * [√] 组件事件交互
  * [√] 配置面板
    - [√] 画布属性面板
    - [√] 组件属性面板
    - [√] 组件数据面板
    - [√] 组件交互面板
  * [√] 画布/右键菜单/快捷键
    - [√] 截屏/标尺/参考线/组件拖拽/缩放布局
    - [√] 置顶/置底/上移一层/下移一层/解锁/锁定/显示/隐藏/重命名/复制/删除
  * [√] 其他
    - [√] 保存/预览/发布
- 基础组件库
- [√] 通用
  * [√] ECharts通用配置组件
  * [√] G2通用配置组件
- [√] 柱图
  * [√] 基本柱状图
  * [√] 折线柱状图
  * [√] 垂直胶囊柱状图
  * [√] 斑马柱状图
- [√] 折线
  * [√] 基础折线图
  * [√] 堆叠折线图
- [√] 饼图
  * [√] 单值百分比饼图
  * [√] 分类玫瑰图
- [√] 其他
  * [√] 基础雷达图
  * [√] 气泡图
  * [√] 漏斗图
- [√] 信息
  * [√] 通用标题
  * [√] 多行文本
  * [√] 文本标签
  * [√] 倒计时
  * [√] 跑马灯
  * [√] 数字翻牌器
  * [√] 二维码
  * [√] 时间器
  * [√] 业务指标趋势
- [√] 列表
  * [√] 轮播列表
- [√] 媒体
  * [√] Iframe
  * [√] 装饰条
  * [√] 视频播放器
  * [√] 单张图片
  * [√] 边框
  * [√] 自定义背景
  * [√] 轮播图
- [√] 控件
  * [√] 全屏切换
  * [√] Tab切换
- [√] 其他
  * [√] 按钮
  * [√] 日期选择器
  * [√] 输入框
  * [√] 下拉选择器
```

#### 目录结构 (如: main-title):

```bash
src
├── datav             # 设计器核心代码
├── examples          # 设计器组件开发
|    └── schema           # 公共schema
|    └── widgets          # 组件目录
└── pages
    └── Design           # 设计器页面
```
