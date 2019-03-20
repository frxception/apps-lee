<template lang="pug">
  v-card.widget-card
    v-card-text.pa-0
        v-container.pa-0
            div.layout.row.ma-0(:style="{ backgroundColor: color }")
                div.sm4.xs4.flex
                    div.layout.column.ma-0.justify-center.align-center
                        v-icon(size="76px",color="white",style="opacity: 0.8;") {{icon}}
                div.layout.column.ma-0.justify-center(style="color: white;")
                    span.caption {{ subTitle }}
                    div.headline {{ title }}
                    span.caption {{ supTitle }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component({})
export default class CardWidget extends Vue {
  @Prop({
    type: String,
    required: false,
  })
  public supTitle!: string;

  @Prop({
    type: String,
    required: false,
  })
  public subTitle!: string;

  @Prop({
    type: String,
    required: false,
  })
  public title!: string;

  @Prop({
    type: String,
    required: false,
  })
  public icon!: string;

  @Prop({
    type: String,
    required: false,
  })
  public color!: string;
}
</script>
