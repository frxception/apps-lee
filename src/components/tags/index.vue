<template lang="pug">
v-card(flat)
    v-card-title
        v-spacer
        v-btn(dark,small,color="info",@click="drawer=true") 新增
    v-card-text
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
    v-navigation-drawer(v-model='drawer',temporary,right,hide-overlay,fixed)
        v-toolbar(color='blue', dark='')
            v-toolbar-title
                | 新增标签
        v-container()
            v-card(flat='')
                v-card-text
                    v-form(ref='form',v-model='valid', lazy-validation)
                        v-text-field(label='Tags',v-model="tags.label.value",:rules="tags.label.rule")
                v-card-actions
                    v-spacer
                v-btn(:loading="loading",:disabled="!valid",color='primary', flat, @click='operating()') 新增
</template>
<script lang="ts">
import gql from 'graphql-tag';
import { ALLTAGS, CREATE } from '@/graphql/tags';
import { Vue, Component, Watch } from 'vue-property-decorator';
import NProgress from 'nprogress';
@Component({
  components: {},
  apollo: {
    allTags() {
      return {
        query: ALLTAGS,
      };
    },
  },
})
export default class Tags extends Vue {
  // 加载
  public loading: boolean = false;
  public pagination: any = {
    descending: false,
    page: 1,
    rowsPerPage: 10,
    sortBy: 'id',
    totalItems: 0,
  };
  public allTags: any;
  public search: string = '';
  // 右侧表单
  private drawer: boolean = false;
  // 选中数据
  private selected: any = [];
  // 验证
  private valid: boolean = true;
  private headers: object = [
    {
      text: 'ID',
      align: 'left',
      value: 'id',
    },
    { text: '分类名', value: 'label' },
    { text: '颜色', value: 'colro' },
    { text: '热度', value: 'hot' },
    { text: '创建时间', value: 'createdAt' },
    { text: '最后修改时间', value: 'updatedAt' },
  ];

  private tags: any = {
    label: {
      value: '',
      rule: [(v: string) => !!v || 'tag必须填写哦!'],
    },
  };

  @Watch('drawer')
  private onDrawer(val: object, oldVal: any) {
    if (!val) {
      (this.$refs.form as any).reset();
    }
  }
  private async operating(): Promise<void> {
    if ((this.$refs.form as any).validate()) {
      try {
        NProgress.start();
        const result = await this.$apollo.mutate({
          mutation: CREATE,
          variables: {
            tags: {
              label: await this.tags.label.value,
            },
          },
        });
        this.allTags.push(result.data.createTags);
        this.drawer = false;
        NProgress.done();
      } catch (error) {
        NProgress.done();
      }
    }
  }
}
</script>