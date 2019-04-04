<template lang="pug">
div
  v-form(v-model="valid",ref="form",lazy-validation)
    v-card(flat)
      v-layout(row,wrap)
        v-flex(xs12 sm10)
          v-card(flat)
            v-card-text
              v-text-field(v-model="article.title.value",:rules="article.title.rule",label="标题",type="text")
              v-text-field(v-model="article.slug.value",:rules="article.slug.rule",label="别名",type="text")
              div.markdown
                div.toolbars
                  div.left
                    span.iconfont.icon-701bianjiqi_chexiao
                    span.iconfont.icon-702bianjiqi_zhongzuo
                    span.iconfont.icon-bold1
                    span.iconfont.icon-strikethrough
                    span.iconfont.icon-italic1
                    span.iconfont.icon-quotation_marks
                    span.iconfont.icon-char
                    span.iconfont.icon-736bianjiqi_daxie
                    span.iconfont.icon-737bianjiqi_xiaoxie
                    span.iconfont.icon-tirbe_icon_h
                    span.iconfont.icon-tirbe_icon_h1
                    span.iconfont.icon-tirbe_icon_h2
                    span.iconfont.icon-richtextbulletedlist
                    span.iconfont.icon-richtextnumberedlist
                  div.right
                    span.iconfont.icon-hr
                    span.iconfont.icon-link1
                    span.iconfont.icon-image1
                    span.iconfont.icon-code
                    span.iconfont.icon-insert_tag_field
                    span.iconfont.icon-table
                    span.iconfont.icon-760bianjiqi_shijian
                    span.iconfont.icon-755bianjiqi_fenye
                    span.iconfont.icon-save
                    span.iconfont.icon-774bianjiqi_yulan
                    span.iconfont.icon-expand
                v-layout(wrap)
                  v-flex(d-flex xs12 sm6 :class="{ ['pl-3']: this.$vuetify.breakpoint.smAndUp }")
                    v-textarea(@input="init",@focus="textarealoading=true",@blur="textarealoading=false",:loading="textarealoading",:single-line="true",v-model="article.text.value",:flat="true",:rows="20",label="输入内容",:clearable="false")
                  v-flex(d-flex xs12 sm6 :class="{ ['pl-3']: this.$vuetify.breakpoint.smAndUp }")
                    //- v-select(attach label="预览" :items="preview",v-model="type")
                    div(v-if="type === 'preview'" v-html="article.html.value")
                    v-textarea(v-else :value="article.html.value",auto-grow box readonly)
                //- div.content(:class="{ ['pl-3']: this.$vuetify.breakpoint.smAndUp }")
                //-   div.editor
                //-     v-textarea(@input="init",@focus="textarealoading=true",@blur="textarealoading=false",:loading="textarealoading",:single-line="true",v-model="article.text.value",:flat="true",:rows="20",label="输入内容",:clearable="false")
                //-   div.preview
                //-     v-select(attach label="预览" :items="preview",v-model="type")
                //-     div(v-if="type === 'preview'" v-html="article.html.value")
                //-     v-textarea(v-else :value="article.html.value",auto-grow box readonly)
              span 共计:
              v-chip(small,color="primary",text-color="white") 字数 {{wordcount}}
              span 其中包含:
              v-chip(small,color="red",text-color="white") {{character}} 个文字
              v-chip(small,color="green",text-color="white") {{symbol}} 个符号
              v-chip(small,color="pink",text-color="white") {{letter}} 个字母
              v-chip(small,color="teal",text-color="white") {{digital}} 个数字
              v-chip(small,color="orange",text-color="white") {{emoji}} 个emoji
            v-card-actions
              v-spacer
              v-btn(flat,@click="submit",:loading="loading",:disabled="!valid") 发布
              v-btn(flat) 草稿
        v-flex(xs12 sm2)
          v-card(flat)
            v-tabs
              v-tab(:key=1) 选项
              v-tab(:key=2) 附件
              v-tab-item(key=1)
                v-card-text
                  div(class="grey--text subheading") 定时发表
                    v-switch(label="启用定时发表",color="red",v-model="timing")
                    div(v-if="timing")
                      v-menu(ref="datamenu" :close-on-content-click="false" v-model="datamenu",:nudge-right="40" :return-value.sync="date" lazy transition="scale-transition",offset-y full-width)
                        v-text-field(slot="activator" v-model="date" label="请选择日期",prepend-icon="event" readonly)
                        v-date-picker(full-width,v-model="date" @input="$refs.datamenu.save(date)")
                      v-menu(ref="timemenu" :close-on-content-click="false" v-model="timemenu",:nudge-right="40" :return-value.sync="time" lazy transition="scale-transition",offset-y full-width)
                        v-text-field(prepend-icon="timer" slot="activator" v-model="time",label="请选择时间" readonly)
                        v-time-picker(v-if="timemenu" v-model="time" @change="$refs.timemenu.save(time)")
                  div(class="grey--text subheading") 标签
                      v-combobox(item-text="label",item-value="id",clearable,:search-input.sync="search",hide-selected,multiple,small-chips,v-model="article.tags.value",:items="allTags",:rules="article.tags.rule",label="Tags")
                  div(class="grey--text subheading") 分类
                    v-tabs
                      v-tab(:key=3) 分类
                      v-tab(:key=4) 目录树
                      v-tab-item(key=3)
                        v-select(clearable,:rules="article.category.rule",v-model="article.category.value",:items="allCategory",item-text="label",item-value="id")
                      v-tab-item(key=4)
                        v-treeview(:active.sync="leetree",class="title",:items="allCategoryByTree",activatable,item-text="label",item-value="id")
                        //- span {{selected}}
                  div(class="grey--text subheading") 状态
                    v-radio-group(row,v-model="article.status.value")
                      v-radio(label="发布文章",:value="1")
                      v-radio(label="保存草稿",:value="0")
                  div(class="grey--text subheading") 公开度
                    v-select(label="公开度",@change="select",v-model="article.publish.value",:items="publicstate",item-text="v",item-value="k")
                    v-text-field(v-if="password",label="密码",v-model="article.password.value",:rules="article.password.rule")
                  div(class="grey--text subheading") 权限控制
                    v-switch(v-model="article.allowComment.value",label="允许评论",color="red")
                    v-switch(v-model="article.isTop.value",v-if="istop",label="是否置顶",color="red")
              v-tab-item(key=2)
                v-text-field(label="Select Image" type="file" prepend-icon='attach_file')
</template>
<script lang="ts">
import '@/assets/main.css';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import gql from 'graphql-tag';
import twemoji from 'twemoji';
const CREATE = gql`
  mutation($article: ArticleInput) {
    createArticle(article: $article) {
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
    }
  }
`;
@Component({
  apollo: {
    allCategory() {
      return {
        query: gql`
          query {
            allCategory {
              id
              label
              slug
              desc
              count
              order
              createdAt
              updatedAt
            }
          }
        `,
        result(result: object) {
          // console.log(
          //   "%cINFO",
          //   "background: #48BB31; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;",
          //   `Message: [Category result]: ${JSON.stringify(result)}`
          // );
        },
        fetchPolicy: 'cache-and-network',
      };
    },
    allCategoryByTree() {
      return {
        query: gql`
          query {
            allCategoryByTree {
              id
              label
              slug
              desc
              count
              order
              parent
              createdAt
              updatedAt
              children
            }
          }
        `,
        result(result: object) {
          // console.log(
          //   "%cINFO",
          //   "background: #48BB31; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;",
          //   `Message: [Category result]: ${JSON.stringify(result)}`
          // );
        },
        fetchPolicy: 'cache-and-network',
      };
    },
    allTags() {
      return {
        query: gql`
          query {
            allTags {
              id
              label
            }
          }
        `,
        // result(result: object) {
        //   console.log(
        //     "%cINFO",
        //     "background: #48BB31; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;",
        //     `Message: [Category result]: ${JSON.stringify(result)}`
        //   );
        // },
        fetchPolicy: 'cache-and-network',
      };
    },
  },
})
export default class Operating extends Vue {
  public type: string = 'preview';
  public preview: any = [
    {
      text: 'Preview',
      value: 'preview',
    },
    {
      text: 'HTML Source',
      value: 'htmlSource',
    },
  ];
  public leetree: any = [];
  public allCategory: any;
  public allCategoryByTree: any;
  public allTags: any;
  public search: any = null;

  private timing: boolean = false;
  private timemenu: boolean = false;
  private time: any = null;
  private datamenu: boolean = false;
  private date: any = null;
  private istop: boolean = true;
  private password: boolean = false;
  private valid: boolean = true;
  private loading: boolean = false;

  private textarealoading: boolean = false;

  private wordcount: number = 0;
  private character: number = 0;
  private symbol: number = 0;
  private letter: number = 0;
  private digital: number = 0;
  private emoji: number = 0;

  private publicstate: object[] = [
    {
      k: 'publish',
      v: '公开',
    },
    {
      k: 'hidden',
      v: '隐藏',
    },
    {
      k: 'password',
      v: '密码保护',
    },
    {
      k: 'private',
      v: '私有',
    },
  ];
  private article: any = {
    title: {
      value: '标题',
      rule: [(v: string) => !!v || '标题为必填项!'],
    },
    slug: {
      value: '',
      rule: [],
    },
    category: {
      value: '',
      rule: [(v: string) => !!v || '分类不可为空!'],
    },
    html: {
      value: '',
      rule: [],
    },
    text: {
      value: `# Hello \n\n有钱就是可以为所欲为！8-)\n\n但我特么真的没钱 :cry:\n\n`,
      rule: [],
    },
    // 内容类别:{"1":"文章","2":"页面","3":"说说"}
    type: {
      value: 1,
      rule: [],
    },
    // 发布状态:{"1":"发布","0":"草稿"}
    status: {
      value: 1,
      rule: [],
    },
    // 内容状态:{"publish":"公开","hidden":"隐藏","password":"密码保护"}
    publish: {
      value: 'publish',
      rule: [],
    },
    password: {
      value: '',
      rule: [(v: string) => !!v || '密码为必填项!'],
    },
    // 是否置顶
    isTop: {
      value: false,
      rule: [],
    },
    tags: {
      value: '',
      rule: [(v: string) => !!v || 'Tags不可为空!'],
    },
    // 是否允许评论
    allowComment: {
      value: true,
      rule: [],
    },
  };

  private lenth: number = 0;

  // TODO: 深度监听暂时有问题先改为input
  // @Watch("article", { deep: true })
  // onArticleChanged(val: object, oldVal: any) {
  //   this.init();
  // }

  private init() {
    const markdown = require('markdown-it')().use(require('markdown-it-emoji'));
    this.article.html.value = markdown.render(this.article.text.value);
    this.article.html.value = twemoji.parse(this.article.html.value, {
      size: '16x16',
      base: 'http://twemoji.maxcdn.com/',
    });
    // 行数
    this.lenth = this.article.text.value.split('\n').length;
    // 计算所有字符
    this.wordcount = this.article.text.value.length;
    // 计算汉字
    this.character = 0;
    // 计算符号
    this.symbol = 0;
    // 计算字母
    this.letter = 0;
    // 计算emoji
    this.emoji = 0;
  }

  private async submit(): Promise<void> {
    this.loading = true;
    if ((this.$refs.form as any).validate()) {
      try {
        const result = await this.$apollo.mutate({
          mutation: CREATE,
          variables: {
            article: {
              title: await this.article.title.value,
              slug: await this.article.slug.value,
              category: await this.article.category.value,
              text: await this.article.text.value,
              html: await this.article.html.value,
              type: await this.article.type.value,
              status: await this.article.status.value,
              publish: await this.article.publish.value,
              isTop: await this.article.isTop.value,
              allowComment: await this.article.allowComment.value,
              tags: await this.article.tags.value,
              password: await this.article.password.value,
            },
          },
        });
        // (this.$refs.form as any).reset();
        this.$router.replace('/article');
        this.$toast(`新增文章 '${result.data.createArticle.title} '`);
      } catch (error) {
        this.$toast(`哎呀, 好像出问题了${error}`);
      }
    }
    this.loading = false;
  }
  // 更改公开度
  private async select(): Promise<void> {
    if (this.article.publish.value === 'password') {
      this.istop = false;
      this.password = true;
    } else if (this.article.publish.value === 'publish') {
      this.istop = true;
      this.password = false;
      this.article.password.value = '';
    } else {
      this.istop = true;
      this.password = false;
      this.article.password.value = '';
    }
  }

  private mounted() {
    this.init();
  }

  public get selected(): any {
    this.article.category.value = this.leetree[0];
    return null;
  }
}
</script>

<style lang="stylus" scoped>
.markdown
  // background-color: #fff
  border-radius: 4px
  .toolbars
    // box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.5);
    display: flex
    flex-flow: row wrap
    justify-content: space-between
    // width:100%;
    align-items: center
    border-radius: 4px 4px 0 0
    .left
      display: flex
      flex-flow: wrap
      overflow: hidden
      span
        margin-left: 20px
    .right
      display: flex
      flex-flow: wrap
      overflow: hidden
      span
        margin-left: 20px
  .content
    width: 100%
    display: flex
    .editor
      flex: 1
      textarea{
        height :300px
      }
    .preview
      font-size: 16px;
      padding-top: 12px
      margin-top: 4px
      flex: 1
</style>
