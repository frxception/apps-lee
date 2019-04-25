<template lang="pug">
v-form(v-model="valid",ref="form",lazy-validation)
    v-card(flat)
      v-layout(row,wrap)
        v-flex(xs12 sm10)
          v-card(flat)
            v-card-text
              v-text-field(v-model="article.title.value",:rules="article.title.rule",label="标题",type="text",clearable)
              v-text-field(v-model="article.slug.value",:rules="article.slug.rule",label="别名",type="text",clearable)
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
              v-btn(flat,@click='release()',:loading="loading",:disabled="!valid") 发布文章
        v-flex(xs12 sm2)
          v-card(flat)
            v-card-text
              div(class="grey--text subheading") 标签
                v-combobox(item-text="label",item-value="id",clearable,:search-input.sync="search",hide-selected,multiple,small-chips,v-model="article.tags.value",:items="allTags",:rules="article.tags.rule",label="Tags")
              div(class="grey--text subheading") 分类
                v-select(clearable,:rules="article.category.rule",v-model="article.category.value",:items="allCategory",item-text="label",item-value="id",label="分类")
              div(class="grey--text subheading") 状态
                v-radio-group(row,v-model="article.status.value")
                  v-radio(label="发布文章",:value=`1`)
                  v-radio(label="保存草稿",:value=`0`)
              div(class="grey--text subheading") 公开度
                v-select(label="公开度",@change="publishSelect",v-model="article.publish.value",:items="publicstate",item-text="v",item-value="k")
                v-text-field(v-if="password",label="密码",v-model="article.password.value",:rules="article.password.rule")
              div(class="grey--text subheading") 权限控制
                v-switch(v-model="article.allowComment.value",label="允许评论",color="red")
                v-switch(v-model="article.isTop.value",v-if="isTop",label="是否置顶",color="red")

</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import twemoji from 'twemoji';
import { ALLTAGS } from '@/graphql/tags';
import { ALLCATEGORY } from '@/graphql/category';
import { CREATE } from '@/graphql/article';
import '@/assets/font/iconfont.css';

@Component({
  apollo: {
    allTags() {
      return {
        query: ALLTAGS,
        fetchPolicy: 'cache-and-network',
      };
    },
    allCategory() {
      return {
        query: ALLCATEGORY,
        fetchPolicy: 'cache-and-network',
      };
    },
  },
})
export default class ArticleCreate extends Vue {
  // 查找  tags
  public search: any = null;
  // 封面
  public cover?: string;
  // 摘要
  public summary?: string;
  // 预览类型
  private type: string = 'preview';
  private preview: object = [
    {
      text: 'Preview',
      value: 'preview',
    },
    {
      text: 'HTML Source',
      value: 'htmlSource',
    },
  ];
  private wordcount: number = 0;
  private character: number = 0;
  private symbol: number = 0;
  private letter: number = 0;
  private digital: number = 0;
  private emoji: number = 0;
  // 验证
  private valid: boolean = true;
  // 加载
  private loading: boolean = false;
  // 输入动画
  private textarealoading: boolean = false;
  // 文章是否加密
  private password: boolean = false;
  // 内容状态
  private publicstate: any = [
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
  // 是否置顶
  private isTop: boolean = true;
  // 提交内容
  private article: any = {
    // 标题
    title: {
      value: '',
      rule: [(v: string) => !!v || '标题为必填项!'],
    },
    // 别名
    slug: {
      value: '',
      rule: [],
    },
    // 解析内容
    html: {
      value: '',
      rule: [],
    },
    // 内容
    text: {
      value: `# Hello \n\n有钱就是可以为所欲为！8-)\n\n但我特么真的没钱 :cry:\n\n`,
      rule: [],
    },
    // tags
    tags: {
      value: undefined,
      rule: [],
    },
    // 分类
    category: {
      value: undefined,
      rule: [(v: string) => !!v || '分类不可为空!'],
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
    // 密码
    password: {
      value: '',
      rule: [(v: string) => !!v || '密码为必填项!'],
    },
    // 是否置顶
    isTop: {
      value: false,
      rule: [],
    },
    // 是否允许评论
    allowComment: {
      value: true,
      rule: [],
    },
  };

  private init() {
    const markdown = require('markdown-it')().use(require('markdown-it-emoji'));
    this.article.html.value = markdown.render(this.article.text.value);
    this.article.html.value = twemoji.parse(this.article.html.value, {
      size: '16x16',
      base: 'http://twemoji.maxcdn.com/',
    });
    // this.summary = this.article.html.value.replace(/<[^>]*>|/g, '');
    this.summary = this.article.html.value
      .replace(/<[^>]*>|/g, '')
      .replace(/\s+/g, '')
      .slice(0, 80);
    // 行数
    // this.lenth = this.article.text.value.split('\n').length;
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

  private publishSelect() {
    if (this.article.publish.value === 'password') {
      this.isTop = false;
      this.password = true;
    } else if (this.article.publish.value === 'publish') {
      this.article.password.value = '';
      this.isTop = true;
      this.password = false;
    } else {
      this.article.password.value = '';
      this.isTop = false;
      this.password = false;
    }
  }

  private async release(): Promise<void> {
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
              summary: await this.summary,
              cover: '',
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
      } catch (error) {
        // console.info(error);
      }
    }
    this.loading = false;
  }
  private mounted() {
    this.init();
  }
}
</script>

<style lang="stylus" scoped>
.markdown {
  // background-color: #fff
  border-radius: 4px;

  .toolbars {
    // box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    // width:100%;
    align-items: center;
    border-radius: 4px 4px 0 0;

    .left {
      display: flex;
      flex-flow: wrap;
      overflow: hidden;

      span {
        margin-left: 20px;
      }
    }

    .right {
      display: flex;
      flex-flow: wrap;
      overflow: hidden;

      span {
        margin-left: 20px;
      }
    }
  }

  .content {
    width: 100%;
    display: flex;

    .editor {
      flex: 1;

      textarea {
        height: 300px;
      }
    }

    .preview {
      font-size: 16px;
      padding-top: 12px;
      margin-top: 4px;
      flex: 1;
    }
  }
}
</style>
