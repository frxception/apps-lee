<template lang="pug">
v-card(flat)
    v-layout(row,wrap)
        v-flex(xs12 sm4)
            v-card-text
                v-form(ref='form',v-model='valid', lazy-validation)
                    v-text-field(label='Tags',v-model="tags.label.value",:rules="tags.label.rule")
            v-card-actions
                v-spacer
                v-btn(:loading="loading",:disabled="!valid",color='primary', flat, @click='operating()') 新增
        v-flex(xs12 sm8)
            v-data-table(v-model="selected",:no-results-text="`没有找到和 ' ${search} ' 相关的数据哦`",
            no-data-text="还没有数据哦,快去添加条吧!",:loading="loading",:pagination.sync="pagination",item-key="id",
            :headers="headers",:items="allTags",:search="search",select-all,rows-per-page-text="每页行数")
                template(v-slot:items="props")
                    td
                        v-checkbox(v-model="props.selected",primary,hide-details)
                    td {{ props.item.id }}
                    td {{ props.item.label }}
                    td {{ props.item.colro }}
                    td {{ props.item.hot }}
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
import { ALLTAGS, CREATE } from "@/graphql/tags";
import { Vue, Component, Watch } from "vue-property-decorator";
import NProgress from "nprogress";

@Component({
  components: {},
  apollo: {
    allTags() {
      return {
        query: ALLTAGS
      };
    }
  }
})
export default class Tags extends Vue {
  get pages() {
    if (
      this.pagination.rowsPerPage === undefined ||
      this.pagination.totalItems === undefined
    ) {
      return 0;
    }
    return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
  }
  // 选中数据
  private selected: any = [];
  // 验证
  private valid: boolean = true;
  // 加载
  public loading: boolean = false;
  public pagination: any = {
    descending: false,
    page: 1,
    rowsPerPage: 10,
    sortBy: "id",
    totalItems: 0
  };
  public allTags: any;
  public search: string = "";
  private headers: object = [
    {
      text: "ID",
      align: "left",
      value: "id"
    },
    { text: "分类名", value: "label" },
    { text: "颜色", value: "colro" },
    { text: "热度", value: "hot" },
    { text: "创建时间", value: "createdAt" },
    { text: "最后修改时间", value: "updatedAt" }
  ];
  private tags: any = {
    label: {
      value: "",
      rule: [(v: string) => !!v || "tag必须填写哦!"]
    }
  };
  private async operating(): Promise<void> {
    if ((this.$refs.form as any).validate()) {
      try {
        NProgress.start();
        const result = await this.$apollo.mutate({
          mutation: CREATE,
          variables: {
            tags: {
              label: await this.tags.label.value
            }
          }
        });
        this.allTags.push(result.data.createTags);
        NProgress.done();
      } catch (error) {
        NProgress.done();
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.theme--light.v-table tbody tr:not(:last-child) {
  border-bottom: none;
}

.theme--light.v-datatable .v-datatable__actions {
  border-top: none;
}

.theme--light.v-table thead tr:first-child {
  border-bottom: none;
}

tbody tr:nth-child(odd) {
  background: #f4f4f4;
}
</style>
