<template>
  <v-card flat="flat">
    <v-card-title>
      <v-spacer></v-spacer>
      <v-btn dark="dark" small="small" color="info" @click="drawer=true">新增</v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table
        v-model="selected"
        :no-results-text="`没有找到和 ' ${search} ' 相关的数据哦`"
        no-data-text="还没有数据哦,快去添加条吧!"
        :loading="loading"
        :pagination.sync="pagination"
        item-key="id"
        :headers="headers"
        :items="allTags"
        :search="search"
        select-all="select-all"
        rows-per-page-text="每页行数"
      >
        <template v-slot:items="props">
          <td>
            <v-checkbox v-model="props.selected" primary="primary" hide-details="hide-details"></v-checkbox>
          </td>
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.label }}</td>
          <td>{{ props.item.colro }}</td>
          <td>{{ props.item.hot }}</td>
          <td>{{ props.item.createdAt }}</td>
          <td>{{ props.item.updatedAt }}</td>
        </template>
      </v-data-table>
    </v-card-text>
    <v-navigation-drawer
      v-model="drawer"
      temporary="temporary"
      right="right"
      hide-overlay="hide-overlay"
      fixed="fixed"
    >
      <v-toolbar color="blue" dark>
        <v-toolbar-title>新增标签</v-toolbar-title>
      </v-toolbar>
      <v-container>
        <v-card flat>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation="lazy-validation">
              <v-text-field label="Tags" v-model="tags.label.value" :rules="tags.label.rule"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
          <v-btn
            :loading="loading"
            :disabled="!valid"
            color="primary"
            flat="flat"
            @click="operating()"
          >新增</v-btn>
        </v-card>
      </v-container>
    </v-navigation-drawer>
  </v-card>
</template>
<script lang="ts">
import gql from 'graphql-tag';
import { CREATETAGS } from '@/graphql/mutation';
import { ALLTAGS } from '@/graphql/query';
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
          mutation: CREATETAGS,
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