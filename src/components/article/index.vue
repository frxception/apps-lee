<template>
  <div>
    <v-card flat="flat">
      <v-card-title>
        <v-btn flat input-value="input-value" round="round">全部</v-btn>
        <v-btn flat disabled="disabled" round="round">已发布</v-btn>
        <v-btn flat disabled="disabled" round="round">草稿</v-btn>
        <v-btn flat disabled="disabled" round="round">回收站</v-btn>
        <v-btn flat round="round">
          刷新
          <v-icon>format_align_left</v-icon>
        </v-btn>
        <v-btn flat round="round">
          批量操作
          <v-icon>format_align_left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-select label="所有分类"></v-select>
        <!-- v-select(label="所有标签")-->
        <v-select label="最新发布"></v-select>
        <v-text-field v-model="search" append-icon="search" label="search" single-line></v-text-field>
        <v-btn flat="flat" small="small" @click="$router.push('/article/create')">
          <v-icon>add</v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table
        item-key="id"
        v-model="selected"
        select-all="select-all"
        :headers="headers"
        :items="allArticle"
        :search="search"
      >
        <template v-slot:items="props">
          <!--  @click='props.selected = !props.selected'-->
          <tr :active="props.selected" @click="props.selected = !props.selected">
            <td>
              <!-- v-checkbox(@click='OnSelected(props.item)',:input-value='props.selected',color='pink', hide-details)-->
              <v-checkbox :input-value="props.selected" color="pink" hide-details="hide-details"></v-checkbox>
            </td>
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.title }}</td>
            <!-- td {{ props.item.slug }}-->
            <td>{{ props.item.category.label }}</td>
            <td>{{ props.item.author.name }}</td>
            <td>
              <span v-if="props.item.status">发布</span>
              <span v-else>草稿</span>
            </td>
            <td>
              <span v-if="props.item.type===1">文章</span>
              <span v-else>页面</span>
            </td>
            <td>
              <span v-if="props.item.publish==='publish'">公开</span>
              <span v-else-if="props.item.publish==='hidden'">隐藏</span>
              <span v-else>密码保护</span>
            </td>
            <td>
              <span v-if="props.item.isTop">置顶</span>
              <span v-else>不置顶</span>
            </td>
            <td>
              <span v-if="props.item.allowComment">允许</span>
              <span v-else>不允许</span>
            </td>
            <td>
              <v-tooltip top="top">
                <template v-slot:activator="{ on }">
                  <span v-on="on" v-time="props.item.createdAt"></span>
                </template>
                <span v-time="props.item.createdAt"></span>
              </v-tooltip>
            </td>
            <!-- td-->
            <!--   v-tooltip(top)-->
            <!--     template(v-slot:activator='{ on }')-->
            <!--       span(v-on='on') {{ props.item.updatedAt | date }}-->
            <!--     span {{ props.item.updatedAt | formatdate }}-->
            <td class="text-xs-center">
              <v-btn
                color="success"
                small="small"
                flat="flat"
                round="round"
                @click="$router.push(`/article/update/${props.item.id}`)"
              >编辑</v-btn>
              <v-btn
                v-if="props.item.status"
                color="error"
                small="small"
                flat="flat"
                round="round"
              >移到草稿</v-btn>
              <v-btn v-else small="small" flat="flat" round="round">快速发布</v-btn>
              <v-btn
                color="error"
                small="small"
                flat="flat"
                round="round"
                @click="remove(props.item)"
              >删除</v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import NProgress from 'nprogress';
import { ALLARTICLE } from '@/graphql/query';
import { DELETEARTICLE } from '../../graphql/mutation';
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
  private allArticle: any;
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
  private async remove(item: any): Promise<void> {
    try {
      NProgress.start();
      const result = await this.$apollo.mutate({
        mutation: DELETEARTICLE,
        variables: {
          id: item.id,
        },
      });
      this.allArticle.splice(this.allArticle.indexOf(item.id), 1);
      NProgress.done();
      this.$message('删除成功');
    } catch (error) {
      this.$message.error(`删除失败:${error}`);
      NProgress.done();
    }
  }
}
</script>
