<template lang="pug">
    v-app(:dark='dark')
        v-navigation-drawer(persistent='', :width="256" :mini-variant='miniVariant', :clipped='clipped', v-model='drawer', enable-resize-watcher='', fixed='', app='')
            v-img(src="https://cdn.vuetifyjs.com/images/parallax/material.jpg",:aspect-ratio="16/9")
                v-layout(pa-2 column fill-height).lightbox.white--text
                    v-spacer
                    v-btn(icon,large)
                        v-avatar(size="42px")
                            img(src="http://q1.qlogo.cn/g?b=qq&nk=1982890538&s=100")
                    v-flex(shrink)
                    div.subheading Litelee
                    div.body-1 oo.ee.ooe.teeoo@gmail.com
            v-list
                div(class="text-xs-center" v-show="!miniVariant")
                template(v-for='(item,i) in items')
                    v-divider(v-if="item.divider" :key="i")
                    v-list-tile(v-else :key="item.title" :to="item.path")
                        v-list-tile-action
                            v-icon {{ item.icon }}
                        v-list-tile-title {{ item.title }}
        v-toolbar(app,dark,:clipped-left='clipped',color="blue",light)
            v-toolbar-side-icon(@click.stop='drawer = !drawer')
            v-btn(icon='', @click.stop='miniVariant = !miniVariant')
                v-icon(v-html="miniVariant ? 'chevron_right' : 'chevron_left'")
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
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';

@Component({})
export default class Back extends Vue {
  private clipped: boolean = false;
  private dark: boolean = false;
  private miniVariant: boolean = false;
  private right: boolean = true;
  private rightDrawer: boolean = false;
  private nickname: any = null;

  private dialog: boolean = false;
  private drawer: boolean = true;
  private items: any = [
    {
      icon: 'home',
      color: 'purple',
      title: '首页',
      path: '/dashboard',
    },
    {
      divider: true,
    },
    {
      icon: 'bookmark',
      color: 'orange',
      title: '分类',
      path: '/category',
    },
    {
      icon: 'local_offer',
      color: 'red',
      title: '标签',
      path: '/tags',
    },
    {
      icon: 'drafts',
      color: 'purple',
      title: '文章',
      path: '/article',
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
      path: '/annex',
    },
    {
      divider: true,
    },
    {
      icon: 'settings',
      color: 'cyan',
      title: '设置',
    },
  ];
}
</script>

<style lang="stylus" scoped>
</style>
