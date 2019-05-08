<template lang="pug">
div
    v-card(flat)
        v-card-title
            v-btn(flat='',input-value,round) 全部
            v-btn(flat='',disabled,round) 已发布
            v-btn(flat='',disabled,round) 草稿
            v-btn(flat='',disabled,round) 回收站
            v-btn(flat='',round) 刷新
                v-icon format_align_left
            v-btn(flat='',round) 批量操作
                v-icon format_align_left
            v-spacer
            v-select(label="所有分类")
            // v-select(label="所有标签")
            v-select(label="最新发布")
            v-text-field(v-model='search', append-icon='search', label='search', single-line='')
            v-btn( flat,small, @click=`$router.push('/article/create')`)
              v-icon add
        v-data-table(item-key="id",v-model='selected',select-all,:headers='headers',:items="allArticle",:search='search')
            template(v-slot:items='props')
                //  @click='props.selected = !props.selected'
                tr(:active='props.selected',@click='props.selected = !props.selected')
                    td
                        // v-checkbox(@click='OnSelected(props.item)',:input-value='props.selected',color='pink', hide-details)
                        v-checkbox(:input-value='props.selected',color='pink', hide-details)
                    td {{ props.item.id }}
                    td {{ props.item.title }}
                    // td {{ props.item.slug }}
                    td {{ props.item.category.label }}
                    //- td 
                    //-     v-subheader(v-for='item in props.item.tags',:key='item.label') {{item.label}}
                    td {{ props.item.author.name }}
                    td
                        span(v-if='props.item.status') 发布
                        span(v-else) 草稿
                    td
                        span(v-if='props.item.type===1') 文章
                        span(v-else) 页面
                    td 
                        span(v-if="props.item.publish==='publish'") 公开
                        span(v-else-if="props.item.publish==='hidden'") 隐藏
                        span(v-else) 密码保护
                    td 
                        span(v-if='props.item.isTop') 置顶
                        span(v-else) 不置顶
                    td
                        span(v-if='props.item.allowComment') 允许
                        span(v-else) 不允许
                    td
                        v-tooltip(top)
                            template(v-slot:activator='{ on }')
                                span(v-on='on') {{ props.item.createdAt | date }}
                            span {{ props.item.createdAt | formatdate }}
                    // td
                    //   v-tooltip(top)
                    //     template(v-slot:activator='{ on }')
                    //       span(v-on='on') {{ props.item.updatedAt | date }}
                    //     span {{ props.item.updatedAt | formatdate }}
                    td.text-xs-center
                        v-btn(color='success',small,flat,round,@click=`$router.push("/article/edit/2")`) 编辑
                        v-btn(v-if='props.item.status',color='error',small,flat,round) 移到草稿
                        v-btn(v-else,small,flat,round) 快速发布
                        v-btn(color='error',small,flat,round,@click='remove(props.item)') 删除

</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import NProgress from 'nprogress';
import { ALLARTICLE } from '@/graphql/article';

@Component({
  apollo: {
    allArticle() {
      return {
        query: ALLARTICLE,
      };
    },
  },
})
export default class Article extends Vue {
  // 选中数据
  private selected: any = [];
  // 搜索内容
  private search: string = '';
  // 表头
  private headers: any = [
    {
      text: 'ID',
      value: 'id',
    },
    { text: '标题', value: 'label' },
    // { text: '别名', value: 'slug' },
    { text: '分类', value: 'category' },
    // { text: 'Tags', value: 'tags' },
    { text: '作者', value: 'count' },
    // { text: '排序', value: 'order' },
    // { text: '模板', value: 'template' },
    { text: '发布状态', value: 'status' },
    { text: '类型', value: ' type' },
    { text: '公开度', value: 'public' },
    { text: '是否置顶', value: 'isTop' },
    { text: '是否允许评论', value: 'allowComment' },
    { text: '创建时间', value: 'createdAt' },
    // { text: '最后修改时间', value: 'updatedAt' },
    { text: '操作', value: '', align: 'center' },
  ];

  private remove() {
    return;
  }
}
</script>