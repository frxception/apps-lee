<template lang="pug">
    div
        v-dialog(v-model='dialog', width='500',persistent)
            v-card
                v-card-title.headline.grey.lighten-2  编辑分类
                v-card-text
                    v-form(ref='form', v-model='valid', lazy-validation='')
                        v-text-field(label='分类名')
                        v-text-field(label='别名')
                        v-select(label='父级')
                        v-text-field(label='描述')
                //v-divider
                v-card-actions
                    v-spacer
                    v-btn(color='primary', flat='', @click='dialog = false') 确认
        v-card(flat)
            v-card-text
                v-layout(row,wrap)
                    v-flex(d-flex,lg2,sm6,xs12)
                    v-flex(d-flex,lg6,sm6,xs12)
                        v-text-field(v-model="search",prepend-icon="search",label="检索信息Search",type="text")
                    v-flex(d-flex,lg2,sm6,xs12)
                        v-btn(round dark color="info") 查找
                    v-flex(d-flex,lg2,sm6,xs12)
            v-card-actions
                v-layout(align-center justify-center)
                    v-flex(xs12 sm8 md4)
                        v-btn(flat small) 全部删除
                        v-badge(overlap)
                            template(v-slot:badge)
                                span {{selectedcount}}
                            v-btn(flat small) 删除选中数据
                        v-btn(flat small) 全部删除
        v-card(flat)
            v-btn(fab absolute small top right dark color="info" @click='dialog = true')
                v-icon add
            v-data-table(v-model="selected",:no-results-text="`没有找到和 ' ${search} ' 相关的数据哦`",
                no-data-text="还没有数据哦,快去添加条吧!",:loading="loading",:pagination.sync="pagination",item-key="id",
                :headers="headers",:items="allCategory",:search="search",select-all,rows-per-page-text="每页行数")
                template(v-slot:items="props")
                    td
                        v-checkbox(v-model="props.selected",primary,hide-details)
                    td {{ props.item.id }}
                    td {{ props.item.label }}
                    td {{ props.item.slug }}
                    td {{ props.item.desc }}
                    td {{ props.item.count }}
                    td {{ props.item.order }}
                    td {{ props.item.createdAt }}
                    td {{ props.item.updatedAt }}
                    td.justify-center.layout.px-0
                        v-btn(small flat icon color="info")
                            v-icon(small) edit
                        v-btn(small flat icon color="error")
                            v-icon(small) delete

</template>
<script lang="ts">
import gql from 'graphql-tag';
import {Vue, Component, Watch} from 'vue-property-decorator';

@Component({
    components: {},
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
                    /* tslint:disable:no-console */
                    console.log(
                        '%cINFO',
                        'background: #48BB31; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
                        `Message: [Category result]: ${JSON.stringify(result)}`,
                    );
                },
                fetchPolicy: 'cache-and-network',
            };
        },
    },
})
export default class Category extends Vue {
    get pages() {
        if (
            this.pagination.rowsPerPage === undefined ||
            this.pagination.totalItems === undefined
        ) {
            return 0;
        }
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
    }
    public loading: boolean = false;
    public pagination: any = {
        descending: false,
        page: 1,
        rowsPerPage: 10,
        sortBy: 'id',
        totalItems: 0,
    };
    public selected: object = [];
    public selectedcount: number = 0;
    public allCategory: any;
    public search: string = '';
    public dialog: boolean = false;
    private headers: object = [
        {
            text: 'ID',
            align: 'left',
            value: 'id',
        },
        {text: '分类名', value: 'label'},
        {text: '别名', value: 'slug'},
        {text: '描述', value: 'desc'},
        {text: '子分类数量', value: 'count'},
        {text: '排序', value: 'order'},
        {text: '创建时间', value: 'createdAt'},
        {text: '最后修改时间', value: 'updatedAt'},
        {text: '操作', value: '', align: 'center'},
    ];

    @Watch('selected')
    public onSelectedChanged(val: object, oldVal: any) {
        this.selectedcount = Object.keys(val).length;
    }
}
</script>

<style lang="stylus" scoped>
    .theme--light.v-table tbody tr:not(:last-child)
        border-bottom: none;

    .theme--light.v-datatable .v-datatable__actions
        border-top: none;

    .theme--light.v-table thead tr:first-child
        border-bottom: none;

    tbody tr:nth-child(odd)
        background: #f4f4f4;
</style>
