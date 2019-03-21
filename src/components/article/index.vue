<template lang="pug">
  div
    v-card(flat)
      v-card-text
        v-layout(row,wrap)
            v-flex(d-flex,lg2,sm6,xs12)
            v-flex(d-flex,lg6,sm6,xs12)
              v-text-field(v-model="search",prepend-icon="search",label="检索信息Search",type="text")
            v-flex(d-flex,lg2,sm6,xs12)
              v-btn(round dark color="info") 查找
            v-flex(d-flex,lg2,sm6,xs12)
      v-card-actions
          v-layout(align-center justify-center)
            v-flex(xs12 sm8 md4)
              v-btn(flat small) 全部删除
              v-badge(overlap)
                template(v-slot:badge)
                  span {{selectedcount}}
                v-btn(flat small) 删除选中数据
              v-btn(flat small) 全部删除
    v-card(flat)
        v-btn(fab absolute small top right dark color="info" to="/article/create")
          v-icon
        v-data-table(v-model="selected",:no-results-text="`没有找到和 ' ${search} ' 相关的数据哦`",
        no-data-text="还没有数据哦,快去添加条吧!",:loading="loading",:pagination.sync="pagination",item-key="id",
        :headers="headers",:items="allArticle",:search="search",select-all,rows-per-page-text="每页行数")
          template(v-slot:items="props")
              td
                v-checkbox(v-model="props.selected",primary,hide-details)
              td {{ props.item.id }}
              td {{ props.item.title }}
              td {{ props.item.slug }}
              td {{ props.item.category.label }}
              td {{ props.item.author.name }}
              td {{ props.item.order }}
              td(v-if="props.item.template")
                span 发布
              td(v-else)
                span null
              td(v-if="props.item.status")
                span 发布
              td(v-else)
                span 草稿
              td(v-if='props.item.type===1')
                span 文章
              td(v-else-if='props.item.type===2')
                span 独立页面
              td(v-else)
                span 说说
              td(v-if="props.item.publish==='publish'")
                span 公开
              td(v-else-if="props.item.publish==='hidden'")
                span 隐藏
              td(v-else)
                span 密码保护
              td(v-if="props.item.isTop")
                span 置顶
              td(v-else)
                span 不置顶
              td(v-if="props.item.allowComment")
                span 允许
              td(v-else)
                span 不允许
              td {{ props.item.createdAt }}
              td {{ props.item.updatedAt }}
              td.justify-center.layout.px-0
                v-btn(small flat icon color="info")
                  v-icon(small) edit
                v-btn(small flat icon color="error")
                  v-icon(small) delete
</template>
<script lang="ts">
import gql from "graphql-tag";
import { Vue, Component, Watch } from "vue-property-decorator";
import { Action, Mutation, State } from "vuex-class";

@Component({
  apollo: {
    allArticle() {
      return {
        query: gql`
          query {
            allArticle {
              id
              title
              slug
              text
              html
              order
              template
              type
              status
              publish
              password
              isTop
              allowComment
              allowPing
              createdAt
              updatedAt
              dataVersion
              author {
                uid
                name
              }
              category {
                id
                label
              }
              tags {
                id
                label
              }
            }
          }
        `,
        result(result: object) {
          /* tslint:disable:no-console */
          console.log(
            "%cINFO",
            "background: #48BB31; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;",
            `Message: [Category result]: ${JSON.stringify(result)}`
          );
        },
        fetchPolicy: "cache-and-network"
      };
    }
  }
})
export default class Article extends Vue {
  get pages() {
    if (
      this.pagination.rowsPerPage === undefined ||
      this.pagination.totalItems === undefined
    ) {
      return 0;
    }

    return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
  }
  public loading: boolean = false;
  public pagination: any = {
    descending: false,
    page: 1,
    rowsPerPage: 10,
    sortBy: "id",
    totalItems: 0
  };
  public selected: object = [];
  public selectedcount: number = 0;
  public allArticle: any;
  public search: string = "";
  private headers: object = [
    {
      text: "ID",
      align: "left",
      value: "id"
    },
    { text: "标题", value: "label" },
    { text: "别名", value: "slug" },
    { text: "分类", value: "category" },
    // { text: "Tags", value: "tags" },
    { text: "作者", value: "count" },
    { text: "排序", value: "order" },
    { text: "模板", value: "template" },
    { text: "发布状态", value: "status" },
    { text: "类型", value: " type" },
    { text: "公开度", value: "public" },
    { text: "是否置顶", value: "isTop" },
    { text: "是否允许评论", value: "allowComment" },
    { text: "创建时间", value: "createdAt" },
    { text: "最后修改时间", value: "updatedAt" },
    { text: "操作", value: "", align: "center" }
  ];
  @Watch("selected")
  public onSelectedChanged(val: object, oldVal: any) {
    this.selectedcount = Object.keys(val).length;
  }
}
</script>

<style lang="stylus" scoped>

</style>
