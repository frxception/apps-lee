<template lang="pug">
    v-container.fluid.grid-list-xl
        v-layout(row,wrap)
            // v-flex(d-flex,lg3,sm6,xs12)
            //     CardWidget(icon="domain",title="1,287,687",subTitle= '13% higher yesterday',supTitle="Today's Visits",color="#00b297")
            // v-flex(d-flex,lg3,sm6,xs12)
            //     CardWidget(icon="money_off",title="1,287,687",subTitle= '13% higher yesterday',supTitle="Today's Visits",color="#dc3545")
            // v-flex(d-flex,lg3,sm6,xs12)
            //     CardWidget(icon="computer",title="1,287,687",subTitle= '13% higher yesterday',supTitle="Today's Visits",color="#0866C6")
            // v-flex(d-flex,lg3,sm6,xs12)
            //     CardWidget(icon="watch_later",title="1,287,687",subTitle= '13% higher yesterday',supTitle="Today's Visits",color="#1D2939")
            v-flex(xs12 sm6 md6 lg3 d-flex)
                v-card(flat)
                    v-card-title(primary-title='')
                        .grey--text.subheading 内容统计
                    v-card-text 
                        ve-radar(:data='radar')
            v-flex(xs12 sm6 md6 lg3 d-flex)
                v-card(flat)
                    v-card-title(primary-title='')
                        .grey--text.subheading 评论统计
                    v-card-text 
                        ve-bar(:data='bar')
            v-flex(xs12 sm6 md6 lg3 d-flex)
                v-card(flat)
                    v-card-title(primary-title='')
                        .grey--text.subheading 标签热度
                    v-card-text 
                        ve-wordcloud(:data='wordcloud',:settings="chartSettings")
            v-flex(xs12 sm6 md6 lg3 d-flex)
                v-card(flat)
                    v-card-title(primary-title='')
                        .grey--text.subheading 访问统计
                    v-card-text 
                        ve-map(:data='map')
            v-flex(xs12)
                v-card(flat)
                    v-card-title(primary-title='')
                        .grey--text.subheading 访问记录
                    v-card-text 
                        ve-line(:data='line')
</template>
<script lang="ts">
import { CardWidget } from '@/components/widget';
import { Component, Prop, Vue } from 'vue-property-decorator';
// Lazyload
@Component({
  components: {
    CardWidget,
  },
})
export default class Dashboard extends Vue {
  public line: any = {
    columns: ['日期', '访问用户', '下单用户', '下单率'],
    rows: [
      { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
      { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
      { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
      { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
      { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
      { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
    ],
  };

  public map: any = {
    columns: ['位置', '税收', '人口', '面积'],
    rows: [
      { 位置: '吉林', 税收: 123, 人口: 123, 面积: 92134 },
      { 位置: '北京', 税收: 1223, 人口: 2123, 面积: 29234 },
      { 位置: '上海', 税收: 2123, 人口: 1243, 面积: 94234 },
      { 位置: '浙江', 税收: 4123, 人口: 5123, 面积: 29234 },
    ],
  };

  public radar: any = {
    columns: ['日期', '访问用户', '下单用户', '下单率'],
    rows: [
      { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
      { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
      { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
      { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
      { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
      { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
    ],
  };
  public bar: any = {
    columns: ['日期', '访问用户', '下单用户', '下单率'],
    rows: [
      { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
      { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
      { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
      { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
      { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
      { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
    ],
  };
  public chartSettings: any = {
    shape: 'star',
    color: ['#ff0', '#00f', '#f00', '#0ff'],
  };
  public funnel: any = {
    columns: ['状态', '数值'],
    rows: [
      { 状态: '展示', 数值: 900 },
      { 状态: '访问', 数值: 600 },
      { 状态: '点击', 数值: 300 },
      { 状态: '订单', 数值: 100 },
    ],
  };
  public wordcloud: any = {
    columns: ['word', 'count'],
    rows: [
      {
        word: 'visualMap',
        count: 22199,
      },
      {
        word: 'continuous',
        count: 10288,
      },
      {
        word: 'contoller',
        count: 620,
      },
      {
        word: 'series',
        count: 274470,
      },
      {
        word: 'gauge',
        count: 12311,
      },
      {
        word: 'detail',
        count: 1206,
      },
      {
        word: 'piecewise',
        count: 4885,
      },
      {
        word: 'textStyle',
        count: 32294,
      },
      {
        word: 'markPoint',
        count: 18574,
      },
      {
        word: 'pie',
        count: 38929,
      },
      {
        word: 'roseType',
        count: 969,
      },
      {
        word: 'label',
        count: 37517,
      },
      {
        word: 'emphasis',
        count: 12053,
      },
      {
        word: 'yAxis',
        count: 57299,
      },
      {
        word: 'name',
        count: 15418,
      },
      {
        word: 'type',
        count: 22905,
      },
      {
        word: 'gridIndex',
        count: 5146,
      },
      {
        word: 'normal',
        count: 49487,
      },
      {
        word: 'itemStyle',
        count: 33837,
      },
      {
        word: 'min',
        count: 4500,
      },
      {
        word: 'silent',
        count: 5744,
      },
      {
        word: 'animation',
        count: 4840,
      },
      {
        word: 'offsetCenter',
        count: 232,
      },
      {
        word: 'inverse',
        count: 3706,
      },
      {
        word: 'borderColor',
        count: 4812,
      },
      {
        word: 'markLine',
        count: 16578,
      },
      {
        word: 'line',
        count: 76970,
      },
      {
        word: 'radiusAxis',
        count: 6704,
      },
      {
        word: 'radar',
        count: 15964,
      },
      {
        word: 'data',
        count: 60679,
      },
      {
        word: 'dataZoom',
        count: 24347,
      },
      {
        word: 'tooltip',
        count: 43420,
      },
      {
        word: 'toolbox',
        count: 25222,
      },
      {
        word: 'geo',
        count: 16904,
      },
      {
        word: 'parallelAxis',
        count: 4029,
      },
    ],
  };
}
</script>

<style lang="stylus" scoped>
</style>
