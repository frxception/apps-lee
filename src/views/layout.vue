<template>
  <v-app :dark="dark">
    <v-btn small fab dark falt fixed top right="right" color="red" style="top: 180px;right: 0;">
      <v-icon>settings</v-icon>
    </v-btn>
    <v-navigation-drawer
      app
      floating
      :mini-variant="mini"
      fixed
      hide-overlay
      :width="256"
      v-model="drawer"
    >
      <v-toolbar dark="dark" color="purple accent-4">
        <v-list>
          <v-list-tile>
            <v-list-tile-avatar>
              <img src="@/assets/ooopic_1559634216.png">
            </v-list-tile-avatar>
            <v-list-tile-title class="title">TEEOO</v-list-tile-title>
            <v-list-tile-sub-title>.cn</v-list-tile-sub-title>
          </v-list-tile>
        </v-list>\
      </v-toolbar>
      <!-- subheader -->
      <v-list dense>
        <template v-for="item in items">
          <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
          <v-list-tile v-else :key="item.title" :to="item.path">
            <v-list-tile-action>
              <!-- <v-icon :color="item.color">{{ item.icon }}</v-icon> -->
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark="dark" color="purple accent-4">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="mini = !mini">
        <v-icon v-html="mini ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="dark = !dark">
        <v-icon v-if="dark">brightness_4</v-icon>
        <v-icon v-if="!dark">brightness_5</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn flat icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn @click="screenfull" flat="flat" icon="icon">
        <v-icon v-html="!isFullscreen ? 'fullscreen' : 'fullscreen_exit'"></v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import screenfull, { Screenfull } from 'screenfull'

@Component({})
export default class Layout extends Vue {
    public items: any = [
        { header: '仪表盘' },
        {
            icon: 'home',
            color: 'purple',
            title: '网站概要',
            path: '/dashboard'
        },
        { header: '管理' },
        {
            icon: 'bookmark',
            color: 'orange',
            title: '分类管理',
            path: '/category'
        },
        {
            icon: 'local_offer',
            color: 'red',
            title: '标签管理',
            path: '/tags'
        },
        {
            icon: 'rate_review',
            color: 'purple',
            title: '文章管理',
            path: '/article'
        },
        {
            icon: 'comment',
            color: 'pink',
            title: '评论管理'
        },
        {
            icon: 'links',
            color: 'purple',
            title: '友情链接',
            path: '/links'
        },
        {
            icon: 'folder',
            color: 'teal',
            title: '附件管理',
            path: '/annex'
        },
        { header: '设置' },
        {
            icon: 'settings',
            color: 'cyan',
            title: '基础设置',
            path: '/options'
        },
        {
            icon: 'account_circle',
            color: 'cyan',
            title: '用户设置',
            path: '/options'
        },
        {
            icon: 'message',
            color: 'cyan',
            title: '评论设置',
            path: '/options'
        },
        {
            icon: 'email',
            color: 'cyan',
            title: '邮件设置',
            path: '/options'
        }
    ]

    private isFullscreen: boolean = false

    private dark: boolean = false

    private mini: boolean = false

    private drawer: boolean = true

    public screenfull() {
        if (!(screenfull as Screenfull).enabled) {
            this.$message('您的浏览器不起作用')
            return false
        }
        ;(screenfull as Screenfull).toggle()
        this.isFullscreen = true
        this.$message(`你已进入全屏浏览,按ESC键退出`)
    }

    private checkFull() {
        let isFull =
            document.fullscreenEnabled ||
            (window as any).fullScreen ||
            (document as any).webkitIsFullScreen ||
            (document as any).msFullscreenEnabled
        if (isFull === undefined) {
            isFull = false
        }
        return isFull
    }
    private mounted() {
        window.onresize = () => {
            if (!this.checkFull()) {
                this.isFullscreen = false
            }
            // this.$message(`你已退出全屏浏览`);
        }
    }
}
</script>
<style></style>
