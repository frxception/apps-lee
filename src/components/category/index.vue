<template lang="pug">
v-card(flat)
    v-layout(row,wrap)
        v-flex(xs12 sm4)
            v-card-text
                v-form(ref='form',v-model='valid', lazy-validation)
                    v-text-field(v-model="category.label.value",:rules="category.label.rule",label='分类名')
                    v-text-field(v-model="category.slug.value",:rules="category.slug.rule",label='别名')
                    v-select(v-model="category.parent.value",:rules="category.parent.rule",:items="allCategory",item-text="label",item-value="id",label='父级')
                    v-text-field(v-model="category.desc.value",:rules="category.desc.rule",label='描述')
            v-card-actions
                v-spacer
                v-btn(:loading="loading",:disabled="!valid",color='primary', flat, @click='operating()') 确认
        v-flex(xs12 sm8)
            v-btn(color='success',small,flat) 刷新
                v-icon(small) refresh
            v-btn(color='error',small,flat,:disabled='disabled') 批量删除
                v-icon(small) format_align_left
                v-badge(v-show='!disabled')
                    template(v-slot:badge='')
                        span {{count}}
            v-data-table(item-key="id",v-model='selected',:headers='headers', :items='allCategory',hide-actions,select-all,:pagination.sync="pagination")
                template(v-slot:items='props')
                    tr(:active='props.selected' @click='props.selected = !props.selected')
                        td
                            v-checkbox(:input-value='props.selected',color='pink', hide-details)
                        td {{ props.item.label }}
                        td
                            v-chip.ml-0(color='`teal lighten-4`', label='', small='') {{ props.item.count }}
                        td {{ props.item.desc }}
                        td {{ props.item.slug }}
                        td 0
                        td 
                            v-tooltip(top)
                                template(v-slot:activator='{ on }')
                                    span(v-on='on') {{ props.item.createdAt | date }}
                                span {{ props.item.createdAt | formatdate }}
                        td.justify-center.layout.px-0
                            v-btn(color='success',icon,small,flat,@click='updete(props.item)') 
                                v-icon(small) edit
                            v-btn(color='error',icon,small,flat,@click='remove(props.item)') 
                                v-icon(small) delete

            .text-xs-center.pt-2
                v-pagination(v-model='pagination.page', :length='pages')
    v-layout(row,wrap)
        v-flex(xs12 sm4)  
            v-treeview(:active.sync="active",activatable,open-on-click,transition :items="allCategoryByTree" item-text='label' item-key='id' open-all)
                template(v-slot:prepend='{ item, open , active }')
                    v-icon bookmark
        v-flex(xs12 sm8)  
            v-scroll-y-transition(mode='out-in')
                // TODO:
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import NProgress from 'nprogress';
import { ALLCATEGORY, BYTREE, CREATE, UPDATE, DELETE } from '@/graphql/category';

@Component({
  apollo: {
    allCategory() {
      return {
        query: ALLCATEGORY,
      };
    },
    allCategoryByTree() {
      return {
        query: BYTREE,
      };
    },
  },
})

export default class Category extends Vue {
  private updateId: number = 0;
  // 所有分类
  private allCategory: any;
  // 加载
  private loading: boolean = false;
  // 选中
  private active: any = [];
  // 表头
  private headers: any = [
    {
      text: '名称',
      value: 'label',
      sortable: true,
      // align: 'left',
    },
    {
      text: '子分类(数量)',
      sortable: false,
      // align: 'center'
    },
    {
      text: '描述',
      sortable: false,
      // align: 'center'
    },
    {
      text: '别名',
      sortable: false,
      // align: 'center'
    },
    {
      text: '文章数',
      sortable: false,
      // align: 'center'
    },
    {
      text: '创建时间',
      sortable: false,
      // align: 'center'
    },
    {
      text: '操作',
      sortable: false,
      align: 'center',
    },
  ];
  // 选中数据
  private selected: any = [];
  // 选中数量
  private count: number = 0;
  // tree选中
  private seletree: any = [];
  // 分页
  private pagination: any = {
    // descending: true,
    // page: 1,
    rowsPerPage: 5,
    // sortBy: 'id',
  };
  // 批量操作
  private disabled: boolean = true;
  // 验证
  private valid: boolean = true;
  // 表单内容
  private category: any = {
    label: {
      value: '',
      rule: [(v: string) => !!v || '分类名必须填写哦!'],
    },
    slug: {
      value: '',
      rule: [],
    },
    parent: {
      value: undefined,
      rule: [],
    },
    desc: {
      value: '这是一段默认的描述',
      rule: [],
    },
  };

  @Watch('selected')
  private onSelected(val: object, oldVal: any) {
    this.count = Object.keys(val).length;
    if (this.count > 0) {
      this.disabled = true;
    }
    this.disabled = !this.disabled;
  }

  @Watch('active')
  private onActive(val: object, oldVal: any) {
    // this.seletree = false
  }

  private updete(data: any) {
    this.category.label.value = data.label;
    this.category.slug.value = data.slug;
    this.category.desc.value = data.desc;
    this.category.parent.value = data.parent;
    this.updateId = data.id;
  }

  private async operating(): Promise<void> {
    if (this.updateId === 0) {
      this.loading = true;
      if ((this.$refs.form as any).validate()) {
        try {
          NProgress.start();
          const result = await this.$apollo.mutate({
            mutation: CREATE,
            variables: {
              category: {
                label: await this.category.label.value,
                slug: await this.category.slug.value,
                desc: await this.category.desc.value,
                parent: await this.category.parent.value,
              },
            },
          });
          this.allCategory.push(result.data.createCategory);
          NProgress.done();
        } catch (error) {
          NProgress.done();
        }
      }
      this.loading = false;
    } else {
      if ((this.$refs.form as any).validate()) {
        try {
          NProgress.start();
          const result = await this.$apollo.mutate({
            mutation: UPDATE,
            variables: {
              id: this.updateId,
              category: {
                label: await this.category.label.value,
                slug: await this.category.slug.value,
                desc: this.category.desc.value,
                parent: await this.category.parent.value,
              },
            },
          });
          NProgress.done();
        } catch (error) {
          NProgress.done();
        }
      }
    }
  }

  private async remove(item: any): Promise<void> {
    try {
      NProgress.start();
      const result = await this.$apollo.mutate({
        mutation: DELETE,
        variables: {
          id: item.id,
        },
      });
      this.allCategory.splice(this.allCategory.indexOf(item.id), 1);
      NProgress.done();
    } catch (error) {
      NProgress.done();
    }
  }

  private get pages(): number | any {
    if (
      this.pagination.rowsPerPage === undefined ||
      this.pagination.totalItems === undefined
    ) {
      return 0;
    }
    return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
  }

}
</script>
