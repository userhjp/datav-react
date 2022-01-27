export const typeData = [
  {
    id: '1',
    name: '图表',
    icon: 'chart',
    children: [
      {
        id: '11',
        name: '柱状图',
        children: [
          {
            id: '111',
            name: '基础柱状图',
            cover: '/menuCover/图表/柱状图/基础柱状图.png',
            type: 'BaseBar',
          },
          {
            id: '112',
            name: '折线柱状图',
            cover: '/menuCover/图表/柱状图/折线柱状图.png',
            type: 'LineBer',
          },
          {
            id: '113',
            name: '垂直胶囊柱状图',
            cover: '/menuCover/图表/柱状图/垂直胶囊柱状图.png',
            type: 'StackBar',
          },
          // {
          //   id: '114',
          //   name: '垂直分组柱状图',
          //   cover: '/menuCover/图表/柱状图/垂直分组柱状图.png',
          //   type: 'Title',
          // },
          {
            id: '115',
            name: '斑马柱状图',
            cover: '/menuCover/图表/柱状图/斑马柱状图.png',
            type: 'Demo',
          },
          {
            id: '116',
            name: '区间范围柱状图',
            cover: '/menuCover/图表/柱状图/区间范围柱状图.png',
            type: 'Demo',
          },
          {
            id: '117',
            name: '瀑布图',
            cover: '/menuCover/图表/柱状图/瀑布图.png',
            type: 'Demo',
          },
          {
            id: '118',
            name: '梯形柱状图',
            cover: '/menuCover/图表/柱状图/梯形柱状图.png',
            type: 'Demo',
          },
        ],
      },
      {
        id: '12',
        name: '条形图',
        children: [
          {
            id: '121',
            name: '水平基础条型图',
            cover: '/menuCover/图表/条形图/水平基础条型图.png',
            type: 'Demo',
          },
          {
            id: '122',
            name: '分组柱状图',
            cover: '/menuCover/图表/条形图/分组柱状图.png',
          },
          {
            id: '123',
            name: '水平胶囊柱状图',
            cover: '/menuCover/图表/条形图/水平胶囊柱状图.png',
          },
          {
            id: '124',
            name: '百分比占比条形图',
            cover: '/menuCover/图表/条形图/百分比占比条形图.png',
          },
          {
            id: '125',
            name: '堆叠条形图',
            cover: '/menuCover/图表/条形图/堆叠条形图.png',
          },
        ],
      },
      {
        id: '13',
        name: '折线图',
        children: [
          {
            id: '131',
            name: '基础折线图',
            cover: '/menuCover/图表/折线图/基础折线图.png',
            type: 'BaseLine',
          },
          {
            id: '132',
            name: '堆叠折线图',
            cover: '/menuCover/图表/折线图/堆叠折线图.png',
            type: 'StackLine',
          },
          {
            id: '133',
            name: '区域翻牌器',
            cover: '/menuCover/图表/折线图/区域翻牌器.png',
          },
          {
            id: '134',
            name: '区域图',
            cover: '/menuCover/图表/折线图/区域图.png',
          },
          {
            id: '135',
            name: '双轴折线图',
            cover: '/menuCover/图表/折线图/双轴折线图.png',
          },
          {
            id: '136',
            name: '颜色分段折线图',
            cover: '/menuCover/图表/折线图/颜色分段折线图.png',
          },
        ],
      },
      {
        id: '14',
        name: '饼图',
        children: [
          {
            id: '141',
            name: '单值百分比饼图',
            cover: '/menuCover/图表/饼图/单值百分比饼图.png',
          },
          {
            id: '142',
            name: '多维度饼图',
            cover: '/menuCover/图表/饼图/多维度饼图.png',
          },
          {
            id: '143',
            name: '目标占比饼图',
            cover: '/menuCover/图表/饼图/目标占比饼图.png',
          },
          {
            id: '144',
            name: '指标占比饼图',
            cover: '/menuCover/图表/饼图/指标占比饼图.png',
          },
          {
            id: '145',
            name: '环图',
            cover: '/menuCover/图表/饼图/环图.png',
          },
          {
            id: '146',
            name: '标注对比饼图',
            cover: '/menuCover/图表/饼图/标注对比饼图.png',
          },
          {
            id: '147',
            name: '分类玫瑰图',
            cover: '/menuCover/图表/饼图/分类玫瑰图.png',
          },
        ],
      },
      {
        id: '15',
        name: '雷达图',
        children: [
          {
            id: '151',
            name: '基础雷达图',
            cover: '/menuCover/图表/雷达图/基础雷达图.png',
          },
        ],
      },
      {
        id: '16',
        name: '散点图',
        children: [
          {
            id: '161',
            name: '基础散点图',
            cover: '/menuCover/图表/散点图/基础散点图.png',
          },
          {
            id: '162',
            name: '气泡图',
            cover: '/menuCover/图表/散点图/气泡图.png',
          },
        ],
      },
      {
        id: '17',
        name: '其他',
        children: [
          {
            id: '171',
            name: '词云',
            cover: '/menuCover/图表/其他/词云.png',
          },
          {
            id: '172',
            name: '漏斗图',
            cover: '/menuCover/图表/其他/漏斗图.png',
          },
          {
            id: '173',
            name: '仪表盘',
            cover: '/menuCover/图表/其他/仪表盘.png',
          },
        ],
      },
    ],
  },
  {
    id: '5',
    name: '信息',
    icon: 'info',
    children: [
      {
        id: '511',
        name: '通用标题',
        cover: '/menuCover/信息/通用标题.png',
        type: 'Title',
      },
      {
        id: '513',
        name: '跑马灯',
        cover: '/menuCover/信息/跑马灯.png',
        type: 'Marquee',
      },
      {
        id: '5123',
        name: '轮播列表',
        cover: '/menuCover/信息/轮播列表.png',
        type: 'ScrollBoard',
      },
      {
        id: '514',
        name: '数字翻牌器',
        cover: '/menuCover/信息/数字翻牌器.png',
        type: 'NumberFlop',
      },
      {
        id: '512',
        name: '多行文本',
        cover: '/menuCover/信息/多行文本.png',
        type: 'Text',
      },
      {
        id: '515',
        name: '时间器',
        cover: '/menuCover/信息/时间器.png',
        type: 'Timer',
      },
      {
        id: '516',
        name: '倒计时',
        cover: '/menuCover/信息/倒计时.png',
        type: 'CountDown',
      },
      {
        id: '517',
        name: '二维码',
        cover: '/menuCover/信息/二维码.png',
      },
    ],
  },
  {
    id: '2',
    name: '地图',
    icon: 'map',
    children: [
      {
        id: '21',
        name: '3D地球',
        cover: '/menuCover/地图/3D地球.png',
      },
      {
        id: '22',
        name: '3D平面世界图',
        cover: '/menuCover/地图/3D平面世界图.png',
      },
      {
        id: '23',
        name: '基础平面地图',
        cover: '/menuCover/地图/基础平面地图.png',
      },
    ],
  },
  {
    id: '3',
    name: '媒体',
    icon: 'media',
    children: [
      {
        id: '31',
        name: '视频播放器',
        cover: '/menuCover/媒体/视频播放器.png',
        type: 'VideoPlayer',
      },
    ],
  },
  {
    id: '4',
    name: '其他',
    icon: 'other',
    children: [
      {
        id: '41',
        name: '边框',
        cover: '/menuCover/其他/边框.png',
        type: 'BorderBox',
      },
      {
        id: '42',
        name: '单张图片',
        cover: '/menuCover/其他/单张图片.png',
        type: 'SingleImg',
      },
      {
        id: '43',
        name: '弦图',
        cover: '/menuCover/其他/弦图.png',
      },
    ],
  },
];
