<template lang="pug">
  div
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
        upload-btn(title='上传附件' name="file" flat color small :fileChangedCallback="upload")
          template(slot='icon-left')
            v-icon(left='' ) add
        v-data-table(v-model="selected",:no-results-text="`没有找到和 ' ${search} ' 相关的数据哦`",
        no-data-text="还没有数据哦,快去添加条吧!",:loading="loading",:pagination.sync="pagination",item-key="id",
        :headers="headers",:items="allAnnex",:search="search",select-all,rows-per-page-text="每页行数")
          template(v-slot:items="props")
              td
                v-checkbox(v-model="props.selected",primary,hide-details)
              td {{ props.item.id }}
              td {{ props.item.size }}
              td {{ props.item.author.name }}
              td {{ props.item.mimetype }}
              td {{ props.item.filename }}
              td {{ props.item.originalname }}
              td {{ props.item.encoding }}
              td {{ props.item.destination }}
              td {{ props.item.path }}
              td {{ props.item.createdAt }}
                  
</template>
<script lang="ts">
import gql from 'graphql-tag';
import UploadButton from 'vuetify-upload-button';
import { Vue, Component, Watch } from 'vue-property-decorator';
import axios from 'axios';

@Component({
  components: {
    'upload-btn': UploadButton,
  },
  apollo: {
    allAnnex() {
      return {
        query: gql`
          query {
            allAnnex {
              id
              author {
                name
              }
              size
              mimetype
              filename
              originalname
              encoding
              destination
              path
              createdAt
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
export default class Annex extends Vue {
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
  public allAnnex: any;
  public search: string = '';
  private headers: object = [
    {
      text: 'ID',
      align: 'left',
      value: 'id',
    },
    { text: '大小', value: 'size' },
    { text: '作者', value: 'author ' },
    { text: 'MIME类型', value: 'mimetype' },
    { text: '文件名', value: 'filename' },
    { text: '原文件名', value: 'originalname' },
    { text: '编码', value: 'encoding' },
    { text: '目录', value: 'destination' },
    { text: '路径', value: 'path' },
    { text: '上传时间', value: 'createdAt' },
  ];
  @Watch('selected')
  public onSelectedChanged(val: object, oldVal: any) {
    this.selectedcount = Object.keys(val).length;
  }

  public upload(file: any) {
    console.info(file);
    const formData = new FormData();
    formData.append('file', file);
    axios
      .post('http://172.17.3.68:3001/annex', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${this.$store.state.token}`,
        },
      })
      .then((data) => {
        this.allAnnex.push(data.data);
      })
      .catch((error) => {
        this.$toast('上传附件失败');
      });
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
