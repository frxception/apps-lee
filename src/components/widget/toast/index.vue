<template lang="pug">
    v-snackbar.application(:timeout='timeout', :color='color', :bottom="y === 'bottom'", :top="y === 'top'", :left="x === 'left'", :right="x === 'right'", :auto-height='autoHeight', :multi-line='multiLine', :vertical='vertical', v-model='active', @click='dismiss')
        v-icon.mr-4(dark='', left='', v-if='!!icon')
            | {{ icon }}
        span {{message}}
        v-btn(color='pink', flat='', @click='active = false') Close

</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
@Component({})
export default class Toast extends Vue {
    @Prop({type: String, default: 'right'}) public x!: string;
    @Prop({type: String, default: 'bottom'}) public y!: string;
    @Prop({type: String, default: 'info'}) public color!: string;
    @Prop({type: String}) public message!: string;
    @Prop({type: Number, default: 3000}) public timeout!: number;
    @Prop({type: Boolean, default: true}) public dismissable!: boolean;
    @Prop({type: Boolean, default: false}) public autoHeight!: boolean;
    @Prop({type: Boolean, default: false}) public multiLine!: boolean;
    @Prop({type: Boolean, default: false}) public vertical!: boolean;

    public  active: boolean = false;

    @Watch('active')
    @Emit('statusChange')
    public activeChanged(val: string, oldVal: string): void {
        return;
    }
    public close() {
        this.active = false;
    }

    public dismiss() {
        if (this.dismissable) {
          this.close();
        }
    }

    private mounted(): void {
        this.$nextTick(() => this.show());
    }

    private show() {
        this.active = true;
    }

}
</script>

