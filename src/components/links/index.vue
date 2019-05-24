<template>
  <v-card flat="flat">
    <v-card-title>
      <v-spacer></v-spacer>
      <v-btn dark="dark" small="small" color="info" @click="drawer=true">新增</v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table
        item-key="id"
        :headers="headers"
        :items="allLinks"
        select-all="select-all"
        no-data-text="还没有分类哦,快去添加一条吧!"
        rows-per-page-text="每页行数"
      >
        <template v-slot:items="props">
          <td>
            <v-checkbox :input-value="props.selected" color="pink" hide-details="hide-details"></v-checkbox>
          </td>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.url }}</td>
          <td>{{ props.item.logo }}</td>
          <td>{{ props.item.email }}</td>
          <td>{{ props.item.status ? "显示":"不显示" }}</td>
          <td>{{ props.item.target }}</td>
          <td>{{ props.item.desc }}</td>

          <td>
            <v-tooltip top="top">
              <template v-slot:activator="{ on }">
                <span v-on="on" v-time="props.item.createdAt"></span>
              </template>
              <span v-time="props.item.createdAt"></span>
            </v-tooltip>
          </td>
          <td class="text-xs-center">
            <v-btn
              color="success"
              icon="icon"
              small="small"
              flat="flat"
              @click="updete(props.item)"
            >
              <v-icon small="small">edit</v-icon>
            </v-btn>
            <v-btn color="error" icon="icon" small="small" flat="flat" @click="remove(props.item)">
              <v-icon small="small">delete</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-actions></v-card-actions>
    <v-navigation-drawer
      v-model="drawer"
      temporary="temporary"
      right="right"
      hide-overlay="hide-overlay"
      fixed="fixed"
    >
      <v-toolbar color="blue" dark>
        <v-toolbar-title>
          <span v-if="updateId === 0">新增友情链接</span>
          <span v-else>修改友情链接</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-container>
        <v-card flat>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation="lazy-validation">
              <v-text-field v-model="links.url.value" :rules="links.url.rule" label="友情链接地址"></v-text-field>
              <v-text-field v-model="links.name.value" :rules="links.name.rule" label="友情链接名称"></v-text-field>
              <v-text-field v-model="links.email.value" :rules="links.email.rule" label="站长EMAIL"></v-text-field>
              <v-text-field v-model="links.logo.value" :rules="links.logo.rule" label="友情链接logo"></v-text-field>
              <v-text-field
                v-model="links.target.value"
                :rules="links.target.rule"
                label="友情链接打开方式"
              ></v-text-field>
              <v-text-field v-model="links.desc.value" :rules="links.desc.rule" label="友情链接描述"></v-text-field>
              <v-text-field v-model="links.target.value" :rules="links.target.rule" label="状态"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :loading="loading"
              :disabled="!valid"
              color="primary"
              flat="flat"
              @click="operating()"
            >确认</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-navigation-drawer>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import NProgress from "nprogress";
import { ALLLINKS } from "@/graphql/query";
import { CREATELINKS, UPDATELINKS, DELETELINKS } from "@/graphql/mutation";
@Component({
  apollo: {
    allLinks() {
      return {
        query: ALLLINKS
      };
    }
  }
})
export default class Category extends Vue {
  // 右侧表单
  private drawer: boolean = false;
  // 修改的id
  private updateId: number = 0;
  // 所有分类
  private allLinks: any;
  // 加载
  private loading: boolean = false;
  // 选中
  private active: any = [];
  // 表头
  private headers: any = [
    {
      text: "名称",
      value: "name",
      sortable: true
      // align: 'left',
    },
    {
      text: "地址(url)",
      sortable: false
      // align: 'center'
    },
    {
      text: "logo",
      sortable: false
      // align: 'center'
    },
    {
      text: "email",
      sortable: false
      // align: 'center'
    },
    {
      text: "显示状态",
      sortable: false
      // align: 'center'
    },
    {
      text: "打开方式",
      sortable: false
      // align: 'center'
    },
    {
      text: "desc",
      sortable: false
      // align: 'center'
    },
    {
      text: "创建时间",
      sortable: false
      // align: 'center'
    },
    {
      text: "操作",
      sortable: false,
      align: "center"
    }
  ];
  // 验证
  private valid: boolean = true;
  private links: any = {
    url: {
      value: "",
      rule: [(v: string) => !!v || "url必须填写哦!"]
    },
    name: {
      value: "",
      rule: [(v: string) => !!v || "友情连接名称必须填写哦!"]
    },
    email: {
      value: null,
      rule: []
    },
    logo: {
      value: "",
      rule: []
    },
    target: {
      value: "_blank",
      rule: []
    },
    desc: {
      value: "这是一段默认的描述",
      rule: []
    },
    status: {
      value: Boolean(true),
      rule: []
    }
  };
  // 表单内容
  @Watch("drawer")
  private onDrawer(val: object, oldVal: any) {
    if (!val) {
      this.updateId = 0;
      (this.$refs.form as any).reset();
    }
  }
  private updete(data: any) {
    this.links.url.value = data.url;
    this.links.name.value = data.name;
    this.links.desc.value = data.desc;
    this.links.target.value = data.target;
    this.links.status.value = Boolean(data.status);

    this.links.logo.value = data.logo;
    this.links.email.value = data.email;

    this.updateId = data.id;
    this.drawer = true;
  }
  private async operating(): Promise<void> {
    if (this.updateId === 0) {
      this.loading = true;
      if ((this.$refs.form as any).validate()) {
        try {
          NProgress.start();
          const result = await this.$apollo.mutate({
            mutation: CREATELINKS,
            variables: {
              links: {
                url: await this.links.url.value,
                name: await this.links.name.value,
                desc: await this.links.desc.value,
                email: await this.links.email.value,
                logo: await this.links.logo.value,
                target: await this.links.target.value,
                status: await this.links.status.value
              }
            }
          });
          this.allLinks.push(result.data.createLinks);
          (this.$refs.form as any).reset();
          this.drawer = false;
          NProgress.done();
        } catch (error) {
          this.$message.error(`新增分类失败:${error}`);
          NProgress.done();
        }
      }
      this.loading = false;
    } else {
      if ((this.$refs.form as any).validate()) {
        try {
          NProgress.start();
          const result = await this.$apollo.mutate({
            mutation: UPDATELINKS,
            variables: {
              id: this.updateId,
              links: {
                url: await this.links.url.value,
                name: await this.links.name.value,
                desc: await this.links.desc.value,
                email: await this.links.email.value,
                logo: await this.links.logo.value,
                target: await this.links.target.value,
                status: await this.links.status.value
              }
            }
          });
          NProgress.done();
          (this.$refs.form as any).reset();
          this.drawer = false;
          this.$message(`成功修改${await this.links.name.value}`);
        } catch (error) {
          this.$message.error(
            `修改${await this.links.name.value}失败:${error}`
          );
          NProgress.done();
        }
      }
    }
  }
  private async remove(item: any): Promise<void> {
    try {
      NProgress.start();
      const result = await this.$apollo.mutate({
        mutation: DELETELINKS,
        variables: {
          id: item.id
        }
      });
      this.allLinks.splice(this.allLinks.indexOf(item.id), 1);
      NProgress.done();
      this.$message("删除成功");
    } catch (error) {
      this.$message.error(`删除失败:${error}`);
      NProgress.done();
    }
  }
}
</script>
