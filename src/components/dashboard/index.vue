<template>
  <v-container
    fluid
    grid-list-xl
  >
    <v-layout
      row
      wrap
      class="panel-group"
    >
      <v-flex
        d-flex
        xs12
        sm6
        md3
        class="card-panel-col"
      >
        <v-card flat="">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-people">
              <v-icon class-name="card-panel-icon">local_offer</v-icon>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">标签</div>
              <span class="card-panel-num">0/个</span>
            </div>
          </div>
        </v-card>
      </v-flex>
      <v-flex
        d-flex
        xs12
        sm6
        md3
        class="card-panel-col"
      >
        <v-card flat="">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-message">
              <v-icon class-name="card-panel-icon">bookmark</v-icon>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">分类</div>
              <span class="card-panel-num">0/个</span>
            </div>
          </div>
        </v-card>
      </v-flex>
      <v-flex
        d-flex
        xs12
        sm6
        md3
        class="card-panel-col"
      >
        <v-card flat="">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-money">
              <v-icon class-name="card-panel-icon">rate_review</v-icon>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">文章</div>
              <span class="card-panel-num">0/篇</span>
            </div>
          </div>
        </v-card>
      </v-flex>
      <v-flex
        d-flex
        xs12
        sm6
        md3
        class="card-panel-col"
      >
        <v-card flat="">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-shopping">
              <v-icon class-name="card-panel-icon">comment</v-icon>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">评论</div>
              <span class="card-panel-num">0/条</span>
            </div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import gql from 'graphql-tag'
@Component({
    components: {}
})
export default class Dashboard extends Vue {}
</script>
<style lang="stylus" scoped>
$people-color = #40c9c6;
$message-color = #36a3f7;
$money-color = #f4516c;
$shopping-color = #34bfa3;

.panel-group {
  // padding-top: 24px;
  .card-panel-col {
    // margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: $people-color;

        i {
          color: #fff;
        }
      }

      .icon-message {
        background: $message-color;

        i {
          color: #fff;
        }
      }

      .icon-money {
        background: $money-color;

        i {
          color: #fff;
        }
      }

      .icon-shopping {
        background: $shopping-color;

        i {
          color: #fff;
        }
      }
    }

    .icon-people > i {
      color: $people-color;
      font-size: 64px;
    }

    .icon-message > i {
      color: $message-color;
      font-size: 64px;
    }

    .icon-money > i {
      color: $money-color;
      font-size: 64px;
    }

    .icon-shopping > i {
      color: $shopping-color;
      font-size: 64px;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 8px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 64px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
