<template lang="pug">
v-card(flat)
    v-card-title
        v-spacer
        v-btn(dark,small,color="info",@click="drawer=true") 新增
    v-card-text
        v-data-table(item-key="id",:headers='headers', :items='allCategory',select-all,no-data-text="还没有分类哦,快去添加一条吧!",rows-per-page-text="每页行数")
            template(v-slot:items='props')
                    //- tr(:active='props.selected' @click='props.selected = !props.selected')
                    td
                        v-checkbox(:input-value='props.selected',color='pink', hide-details)
                    td {{ props.item.label }}
                    td {{ props.item.count }}
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
    v-card-actions
    v-navigation-drawer(v-model='drawer',temporary,right,hide-overlay,fixed)
        v-toolbar(color='blue', dark='')
            v-toolbar-title
                span(v-if="updateId === 0") 新增分类
                span(v-else) 修改分类
        v-container()
            v-card(flat='')
                v-card-text
                  v-form(ref='form',v-model='valid', lazy-validation)
                      v-text-field(v-model="category.label.value",:rules="category.label.rule",label='分类名')
                      v-text-field(v-model="category.slug.value",:rules="category.slug.rule",label='别名')
                      v-select(v-model="category.parent.value",:rules="category.parent.rule",:items="allCategory",item-text="label",item-value="id",label='父级')
                      v-text-field(v-model="category.desc.value",:rules="category.desc.rule",label='描述')
                v-card-actions
                    v-spacer
                    v-btn(:loading="loading",:disabled="!valid",color='primary', flat, @click='operating()') 确认

</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import NProgress from 'nprogress';
import { ALLCATEGORY, CREATE, UPDATE, DELETE } from '@/graphql/category';
@Component({
  apollo: {
    allCategory() {
      return {
        query: ALLCATEGORY,
      };
    },
  },
})
export default class Category extends Vue {
  // 右侧表单
  private drawer: boolean = false;
  // 修改的id
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
  // 验证
  private valid: boolean = true;

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
  // 表单内容

  @Watch('drawer')
  private onDrawer(val: object, oldVal: any) {
    if (!val) {
      this.updateId = 0;
      (this.$refs.form as any).reset();
    }
  }

  private updete(data: any) {
    this.category.label.value = data.label;
    this.category.slug.value = data.slug;
    this.category.desc.value = data.desc;
    this.category.parent.value = data.parent;
    this.updateId = data.id;
    this.drawer = true;
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
          (this.$refs.form as any).reset();
          this.drawer = false;
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
          (this.$refs.form as any).reset();
          this.drawer = false;
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
}
</script>