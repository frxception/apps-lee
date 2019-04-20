<template lang="pug">
v-app(:dark='dark')
    v-navigation-drawer(floating,:width="256",:mini-variant='mini',:clipped='clipped',v-model='drawer', fixed, app)
        v-img(src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg",:aspect-ratio="16/9").headimg
            v-layout(pa-2 column fill-height).lightbox.white--text
                v-spacer
                v-btn(icon,large)
                    v-avatar(size="42px")
                        img(src="http://q1.qlogo.cn/g?b=qq&nk=1982890538&s=100")
                v-flex(shrink)
                div.subheading Litelee
                div.body-1 oo.ee.ooe.teeoo@gmail.com
        v-list
            div(class="text-xs-center" v-show="!mini")
            template(v-for='(item,i) in items')
                v-divider(v-if="item.divider" :key="i")
                v-list-tile(v-else :key="item.title" :to="item.path")
                    v-list-tile-action
                        v-icon {{ item.icon }}
                    v-list-tile-title {{ item.title }}
    v-toolbar(app,dark,:clipped-left='clipped',color="blue")
        v-toolbar-side-icon(@click.stop='drawer = !drawer')
        v-btn(icon='', @click.stop='mini = !mini')
            v-icon(v-html="mini ? 'chevron_right' : 'chevron_left'")
        v-btn(icon='', @click.stop='clipped = !clipped')
            v-icon web
        v-btn(icon='', @click.stop='dark = !dark')
            v-icon(v-if='dark') brightness_4
            v-icon(v-if='!dark') brightness_5
        v-spacer
        v-btn(flat,icon)
            v-icon color_lens
        v-btn(icon)
            v-icon apps
        v-btn(icon)
            v-icon notifications
    v-content(style='margin:1rem')
        transition(name="slide-x-transition",mode="out-in")
            router-view
    v-footer(height='auto',app)
        span(justify-center='')
          | ©2018 — 
          strong Lee

</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
@Component({})
export default class Layout extends Vue {
  private clipped: boolean = true;
  private dark: boolean = false;
  private mini: boolean = false;
  private drawer: boolean = true;
  private items: any = [
    {
      icon: 'home',
      color: 'purple',
      title: '首页',
      path: 'dashboard',
    },
    // {
    //   divider: true,
    // },
    {
      icon: 'bookmark',
      color: 'orange',
      title: '分类',
      path: 'category',
    },
    {
      icon: 'local_offer',
      color: 'red',
      title: '标签',
      path: 'tags',
    },
    {
      icon: 'drafts',
      color: 'purple',
      title: '文章',
      path: 'article',
    },
    // {
    //   icon: 'pages',
    //   color: 'purple',
    //   title: '页面',
    //   path: '/article',
    // },
    {
      icon: 'message',
      color: 'pink',
      title: '评论',
    },
    {
      icon: 'folder',
      color: 'pink',
      title: '附件',
      path: 'annex',
    },
    // {
    //   divider: true,
    // },
    {
      icon: 'settings',
      color: 'cyan',
      title: '设置',
    },
  ];
}
</script>