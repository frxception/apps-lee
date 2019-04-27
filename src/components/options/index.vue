<template lang="pug">
v-card(flat)
    v-tabs
        v-tab(v-for='n in tabs', :key='n.id', ripple='') {{ n.name }}
        //- 基本设置
        v-tab-item(key=1)
            v-card(flat='')
                v-card-text
                  v-form(ref='form',lazy-validation='')
                    v-text-field(label='站点名称', required='')
                    span.grey--text 站点的名称将显示在网页的标题处.
                    //- v-text-field(label='网站副标题', required='')
                    //- span.grey--text 网站副标题将显示在网页的标题处.
                    v-text-field(label='站点地址', required='')
                    span.grey--text 站点地址主要用于生成内容的永久链接.
                    v-text-field(label='站点描述', required='')
                    span.grey--text 站点描述将显示在网页代码的头部.
                    //- v-btn(absolute='', dark='', fab='', small, right='', color='pink')
                    //-   v-icon add
                    v-text-field(label='关键词', required='')
                    span.grey--text 请以半角逗号 "," 分割多个关键字. 
                    v-text-field(label='允许上传的文件类型', required='')
                    span.grey--text 用逗号 "," 将后缀名隔开, 例如: cpp, h, mak.
                    v-textarea(label='版权说明', required='')
                    //- span.grey--text 填入网站统计、备案号等内容.
                    //- v-btn(absolute,dark='',direction,bottom, small, right, color='pink') 保存设置
                    v-btn(color='success' @click="basic()") 保存设置
        //- 评论设置
        v-tab-item(key=2)
            v-card(flat='')
              v-card-text
                v-form(ref='form',lazy-validation='')
                    v-subheader 评论显示
                    v-checkbox(label='在评论中使用 Markdown 语法') 
                    v-checkbox(label='在评论中使用 Markdown 语法') 
                    v-checkbox(label='在评论中使用 Markdown 语法') 
                    v-checkbox(label='在评论中使用 Markdown 语法') 
                    v-subheader 评论提交
                    v-checkbox(label='所有评论必须经过审核') 
                    v-checkbox(label='必须填写邮箱') 
                    v-checkbox(label='必须填写网址') 
                    v-checkbox(label='开启反垃圾保护') 
                    v-btn(color='success') 保存设置
        //- 永久链接
        v-tab-item(key=3)
            v-card(flat='')
                v-card-text
                  v-form(ref='form',lazy-validation='')
                    
                    
                    v-radio-group(column='')
                      v-radio(value='Option 1', label='/archives/:id/')
                      v-radio(value='Option 2', label='/archives/:slug/')
                      v-radio(value='Option 3', label='/category/:slug/')
                      v-radio(value='Option 4', label='/archives/:year/:month/:day/:slug/')


                    v-text-field(label='独立页面路径', required='')
                    span.grey--text 可用参数: id 页面 ID, slug 页面缩略名请在路径中至少包含上述的一项参数.
                    //- v-text-field(label='网站副标题', required='')
                    //- span.grey--text 网站副标题将显示在网页的标题处.
                    v-text-field(label='分类路径', required='')
                    span.grey--text 可用参数: id 分类 ID, slug 分类缩略名请在路径中至少包含上述的一项参数.
                    br
                    v-btn(color='success') 保存设置
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
export default class Options extends Vue {
  private tabs: any = [
    {
      id: 1,
      name: '基本设置',
    },
    {
      id: 2,
      name: '评论设置',
    },
    {
      id: 3,
      name: '永久链接',
    },
    {
      id: 4,
      name: '邮件设置',
    },
  ];

  private basicdata: any = {
    // 网站名
    name: {
      value: '',
      rule: [(v: string) => !!v || '网站名必填哦!'],
    },
    // 描述
    desc: {
      value: '',
      rule: [],
    },
    // 关键字
    key: {
      value: '',
      rule: [],
    },
    // 站点地址
    host: {
      value: '',
      rule: [],
    },
    // 允许上传文件类型
    upload_type: {
      value: '',
      rule: [],
    },
    // 版权说明
    copyright: {
      value: '',
      rule: [],
    },
  };

  private async basic(): Promise<void> {
    return;
  }
}
</script>
