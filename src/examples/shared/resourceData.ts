import { IResourceData } from '@/datav/react/types';

export const resourceData: IResourceData[] = [
  {
    name: '图表',
    icon: 'chart',
    children: [
      {
        name: '通用图表',
        children: [
          {
            name: 'Echarts自定义配置',
            cover: '/menuCover/图表/通用图表/echarts_logo.png',
            type: 'ECharts',
          },
        ],
      },
      {
        name: '柱状图',
        children: [
          {
            name: '基础柱状图',
            cover: '/menuCover/图表/柱状图/基础柱状图.png',
            type: 'BaseBar',
          },
          {
            name: '折线柱状图',
            cover: '/menuCover/图表/柱状图/折线柱状图.png',
            type: 'LineBer',
          },
          {
            name: '垂直胶囊柱状图',
            cover: '/menuCover/图表/柱状图/垂直胶囊柱状图.png',
            type: 'StackBar',
          },
          // {
          //   name: '垂直分组柱状图',
          //   cover: '/menuCover/图表/柱状图/垂直分组柱状图.png',
          //   type: 'Title',
          // },
          {
            name: '斑马柱状图',
            cover: '/menuCover/图表/柱状图/斑马柱状图.png',
            type: 'ZebraBar',
          },
          // {
          //   name: '区间范围柱状图',
          //   cover: '/menuCover/图表/柱状图/区间范围柱状图.png',
          //   type: 'Demo',
          // },
          // {
          //   name: '瀑布图',
          //   cover: '/menuCover/图表/柱状图/瀑布图.png',
          //   type: 'Demo',
          // },
          // {
          //   name: '梯形柱状图',
          //   cover: '/menuCover/图表/柱状图/梯形柱状图.png',
          //   type: 'Demo',
          // },
        ],
      },
      {
        name: '条形图',
        children: [
          {
            name: '水平基础柱状图',
            cover: '/menuCover/图表/条形图/水平基础柱状图.png',
            type: 'YCategoryBar',
          },
          // {
          //   name: '分组柱状图',
          //   cover: '/menuCover/图表/条形图/分组柱状图.png',
          // },
          // {
          //   name: '水平胶囊柱状图',
          //   cover: '/menuCover/图表/条形图/水平胶囊柱状图.png',
          // },
          // {
          //   name: '百分比占比条形图',
          //   cover: '/menuCover/图表/条形图/百分比占比条形图.png',
          // },
          // {
          //   name: '堆叠条形图',
          //   cover: '/menuCover/图表/条形图/堆叠条形图.png',
          // },
        ],
      },
      {
        name: '折线图',
        children: [
          {
            name: '基础折线图',
            cover: '/menuCover/图表/折线图/基础折线图.png',
            type: 'BaseLine',
          },
          {
            name: '堆叠折线图',
            cover: '/menuCover/图表/折线图/堆叠折线图.png',
            type: 'StackLine',
          },
          // {
          //   name: '区域翻牌器',
          //   cover: '/menuCover/图表/折线图/区域翻牌器.png',
          // },
          // {
          //   name: '区域图',
          //   cover: '/menuCover/图表/折线图/区域图.png',
          // },
          // {
          //   name: '双轴折线图',
          //   cover: '/menuCover/图表/折线图/双轴折线图.png',
          // },
          // {
          //   name: '颜色分段折线图',
          //   cover: '/menuCover/图表/折线图/颜色分段折线图.png',
          // },
        ],
      },
      {
        name: '饼图',
        children: [
          {
            name: '单值百分比饼图',
            cover: '/menuCover/图表/饼图/单值百分比饼图.png',
            type: 'PercentagePie',
          },
          {
            name: '多维度饼图',
            cover: '/menuCover/图表/饼图/多维度饼图.png',
          },
          {
            name: '分类玫瑰图',
            cover: '/menuCover/图表/饼图/分类玫瑰图.png',
            type: 'RosePie',
          },
          // {
          //   name: '目标占比饼图',
          //   cover: '/menuCover/图表/饼图/目标占比饼图.png',
          // },
          // {
          //   name: '指标占比饼图',
          //   cover: '/menuCover/图表/饼图/指标占比饼图.png',
          // },
          {
            name: '环图',
            cover: '/menuCover/图表/饼图/环图.png',
          },
          {
            name: '标注对比饼图',
            cover: '/menuCover/图表/饼图/标注对比饼图.png',
          },
        ],
      },
      {
        name: '雷达图',
        children: [
          {
            name: '基础雷达图',
            cover: '/menuCover/图表/雷达图/基础雷达图.png',
            type: 'BaseRadar',
          },
        ],
      },
      {
        name: '散点图',
        children: [
          {
            name: '基础散点图',
            cover: '/menuCover/图表/散点图/基础散点图.png',
          },
          {
            name: '气泡图',
            cover: '/menuCover/图表/散点图/气泡图.png',
            type: 'HorizontalScatter',
          },
        ],
      },
      {
        name: '其他',
        children: [
          {
            name: '词云',
            cover: '/menuCover/图表/其他/词云.png',
          },
          {
            name: '漏斗图',
            cover: '/menuCover/图表/其他/漏斗图.png',
            type: 'BaseFunnel',
          },
          {
            name: '仪表盘',
            cover: '/menuCover/图表/其他/仪表盘.png',
          },
        ],
      },
    ],
  },
  {
    name: '信息',
    icon: 'info',
    children: [
      {
        name: '通用标题',
        cover: '/menuCover/信息/通用标题.png',
        type: 'Title',
      },
      {
        name: '跑马灯',
        cover: '/menuCover/信息/跑马灯.png',
        type: 'Marquee',
      },
      {
        name: '轮播列表',
        cover: '/menuCover/信息/轮播列表.png',
        type: 'ScrollBoard',
      },
      {
        name: '数字翻牌器',
        cover: '/menuCover/信息/数字翻牌器.png',
        type: 'NumberFlop',
      },
      {
        name: '多行文本',
        cover: '/menuCover/信息/多行文本.png',
        type: 'Text',
      },
      {
        name: '时间器',
        cover: '/menuCover/信息/时间器.png',
        type: 'Timer',
      },
      {
        name: '倒计时',
        cover: '/menuCover/信息/倒计时.png',
        type: 'CountDown',
      },
      {
        name: '二维码',
        cover: '/menuCover/信息/二维码.png',
      },
    ],
  },
  {
    name: '地图',
    icon: 'map',
    children: [
      {
        name: '3D地球',
        cover: '/menuCover/地图/3D地球.png',
      },
      {
        name: '3D平面世界图',
        cover: '/menuCover/地图/3D平面世界图.png',
      },
      {
        name: '基础平面地图',
        cover: '/menuCover/地图/基础平面地图.png',
      },
    ],
  },
  {
    name: '媒体',
    icon: 'media',
    children: [
      {
        name: '视频播放器',
        cover: '/menuCover/媒体/视频播放器.png',
        type: 'VideoPlayer',
      },
      {
        name: '边框',
        cover: '/menuCover/媒体/边框.png',
        type: 'BorderBox',
      },
      {
        name: '装饰',
        cover: './menuCover/媒体/装饰.png',
        type: 'Decorate',
      },
      {
        name: '单张图片',
        cover: '/menuCover/媒体/单张图片.png',
        type: 'SingleImg',
      },
      {
        name: '自定义背景块',
        cover: '/menuCover/媒体/自定义背景块.png',
        type: 'BgBox',
      },
    ],
  },
  {
    name: '其他',
    icon: 'other',
    children: [
      {
        name: '弦图',
        cover: '/menuCover/其他/弦图.png',
      },
    ],
  },
];
