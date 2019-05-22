<template>
  <v-app :dark="dark">
    <v-navigation-drawer
      floating="floating"
      :width="256"
      :mini-variant="mini"
      :clipped="clipped"
      v-model="drawer"
      fixed="fixed"
      app="app"
    >
      <v-img
        class="headimg"
        src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
        :aspect-ratio="16/9"
      >
        <v-layout
          class="lightbox white--text"
          pa-2="pa-2"
          column="column"
          fill-height="fill-height"
        >
          <v-spacer></v-spacer>
          <v-btn icon="icon" large="large">
            <v-avatar size="42px">
              <img src="http://q1.qlogo.cn/g?b=qq&amp;nk=1982890538&amp;s=100">
            </v-avatar>
          </v-btn>
          <v-flex shrink="shrink"></v-flex>
          <div class="subheading">Litelee</div>
          <div class="body-1">oo.ee.ooe.teeoo@gmail.com</div>
        </v-layout>
      </v-img>
      <v-list>
        <div class="text-xs-center" v-show="!mini"></div>
        <template v-for="(item,i) in items">
          <v-divider v-if="item.divider" :key="i"></v-divider>
          <v-list-tile v-else :key="item.title" :to="item.path">
            <v-list-tile-action>
              <v-icon :color="item.color">{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app="app" :clipped-left="clipped" dark="dark" color="blue">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="mini = !mini">
        <v-icon v-html="mini ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="dark = !dark">
        <v-icon v-if="dark">brightness_4</v-icon>
        <v-icon v-if="!dark">brightness_5</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn flat="flat" icon="icon">
        <v-icon>color_lens</v-icon>
      </v-btn>
      <v-btn icon="icon">
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon="icon">
        <v-icon>notifications</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid="fluid">
        <transition name="slide-x-transition" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-content>
    <v-footer app="app"></v-footer>
  </v-app>
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
      path: '/dashboard',
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
    //   color: 'indigo',
    //   title: '页面',
    //   path: '/pages',
    // },
    {
      icon: 'message',
      color: 'pink',
      title: '评论',
    },
    {
      icon: 'folder',
      color: 'teal',
      title: '附件',
      path: '/annex',
    },
    {
      icon: 'settings',
      color: 'cyan',
      title: '设置',
      path: '/options',
    },
  ];
}
</script>
