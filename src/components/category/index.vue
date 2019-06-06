<template>
  <v-card flat>
    <v-card-title>
      {{filters}}
      <v-btn flat small>新增</v-btn>
      <v-menu offset-y :nudge-left="170" :close-on-content-click="true">
        <v-btn icon slot="activator">
          <v-icon>sort</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="(item) in headers" :key="item.value" @click="changeSort(item.value)">
            <v-list-tile-title>
              {{ item.text }}
              <v-icon
                v-if="pagination.sortBy === item.value"
              >{{pagination.descending ? 'arrow_downward':'arrow_upward'}}</v-icon>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-layout row wrap>
        <v-flex pa-2 xs12 sm6 md3>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="search"
            single-line
            hide-details
          ></v-text-field>
        </v-flex>
        <v-flex pa-2 xs12 sm6 md3>
          <v-select :items="headers" label="字段" v-model="filters.header"></v-select>
        </v-flex>
        <v-flex pa-2 xs12 sm6 md3>
          <v-menu
            v-model="start"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="filters.createdAt"
                label="开始时间"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="filters.createdAt" @input="start = false"></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex pa-2 xs12 sm6 md3>
          <v-menu
            v-model="end"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="filters.updatedAt"
                label="结束时间"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="filters.updatedAt" @input="end = false"></v-date-picker>
          </v-menu>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-text>
      <v-data-table
        hide-actions
        :headers="headers"
        :items="allCategory"
        :search="search"
        :loading="loading"
        :pagination.sync="pagination"
      >
        <template v-slot:items="props">
          <td>{{ props.item.label }}</td>
          <td>{{ props.item.slug }}</td>
          <td>{{ props.item.desc }}</td>
          <td>{{ props.item.count }}</td>
          <td>{{ props.item.ArticleCount }}</td>
          <td>{{ props.item.createdAt | diffForHumans}}</td>
          <td>{{ props.item.updatedAt | diffForHumans }}</td>
        </template>
        <template v-slot:no-results>
          <v-alert
            :value="true"
            color="error"
            icon="warning"
          >Your search for "{{ search }}" found no results.</v-alert>
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-actions>
      <div style="margin:0px auto">
        <v-pagination v-model="pagination.page" :length="pages" :total-visible="5"></v-pagination>
      </div>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { ALLCATEGORY } from '@/graphql/query'
@Component({
    apollo: {
        allCategory() {
            return {
                query: ALLCATEGORY
            }
        }
    }
})
export default class Category extends Vue {
    // 所有分类
    private allCategory: any
    // 查找
    private filters: object = {
        header: null,
        createdAt: null,
        updatedAt: null
    }
    // 查找内容
    private search: string = ''
    // 加载动画
    private loading: boolean = true
    // 开始时间菜单
    private start: boolean = false
    // 开始时间
    private startdate: any = new Date().toISOString().substr(0, 10)
    // 结束菜单
    private end: boolean = false
    // 结束时间
    private enddate: any = null
    // 表头
    private headers: any = [
        {
            text: '分类名',
            align: 'left',
            sortable: false,
            value: 'label'
        },
        { text: '分类别名', value: 'slug' },
        { text: '描述', value: 'desc' },
        { text: '子分类数量', value: 'count' },
        { text: '该分类下存在的文章数量', value: 'ArticleCount' },
        { text: '创建时间', value: 'createdAt' },
        { text: '最后修改时间', value: 'updatedAt' }
    ]
    // 分页
    private pagination: any = {
        rowsPerPage: 8
    }

    @Watch('allCategory')
    private totalItems(val: object, oldVal: any) {
        this.pagination.totalItems = Object.keys(val).length
        this.loading = !this.loading
    }

    private changeSort(column: string) {
        if (this.pagination.sortBy === column) {
            this.pagination.descending = !this.pagination.descending
        } else {
            this.pagination.sortBy = column
            this.pagination.descending = false
        }
    }

    private filterSearch() {}

    get pages(): number {
        if (
            this.pagination.rowsPerPage == null ||
            this.pagination.totalItems == null
        ) {
            return 0
        }

        return Math.ceil(
            this.pagination.totalItems / this.pagination.rowsPerPage
        )
    }
}
</script>
<style></style>
