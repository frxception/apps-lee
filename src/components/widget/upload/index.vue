<template lang="pug">
    .upload-btn
        input(:id='id', type='file', :name='name', :accept='accept', v-on:change='fileChanged', :multiple='multiple')
        label(v-if='ripple', :id='`label${id}`', :for='id', :class='`v-btn ${classes}${color} upload-btn`', v-ripple='')
            slot(name='icon-left')
            |       {{ icon ? '' : title }}
            slot(name='icon')
        label(v-else='', :id='`label${id}`', :for='id', :class='`v-btn ${classes}${color} upload-btn`')
            slot(name='icon-left')
            |       {{ icon ? '' : title }}
            slot(name='icon')

</template>

<script lang="ts">
import { Vue, Component, Prop, Watch} from 'vue-property-decorator';
@Component({})
export default class Upload extends Vue {
    @Prop({type: String, default: '*'})
    public accept!: string;
    @Prop({type: Boolean, default: false})
    public block!: boolean;
    @Prop({type: Boolean, default: false})
    public depressed!: string;
    @Prop({type: Function, default: undefined})
    public fileChangedCallback!: any;
    @Prop({type: String, default: 'primary'})
    public color!: string;
    @Prop({default: false, type: Boolean})
    public disabled!: boolean;
    @Prop({default: false, type: Boolean })
    public flat!: boolean;
    @Prop( {default: true, type: Boolean })
    public hover!: boolean;
    @Prop({default: false, type: Boolean})
    public icon!: boolean;
    @Prop({default: false, type: Boolean })
    public large!: string;
    @Prop({ default: false, type: Boolean})
    public loading!: boolean;
    @Prop({default: false, type: Boolean})
    public multiple!: boolean;
    @Prop({default: 'uploadFile', type: String})
    public name!: string;
    @Prop({default: false, type: Boolean})
    public outline!: boolean;
    @Prop({default: true, type: Boolean})
    public ripple!: boolean;
    @Prop({default: false, type: Boolean})
    public round!: boolean;
    @Prop({default: false, type: Boolean})
    public small!: boolean;
    @Prop({default: 'Upload', type: String})
    public title!: string;
    @Prop({default: false, type: Boolean})
    public uniqueId!: boolean;

    private get id() {
        return this.uniqueId || 'uploadFile';
    }

    private get classes() {
        const classes: any = {
          'v-btn--block': this.block,
          'v-btn--flat': this.flat,
          'upload-btn-hover': this.hover,
          'v-btn--icon': this.icon,
          'v-btn--large': this.large,
          'v-btn--loading': this.loading,
          'v-btn--outline v-btn--depressed': this.outline,
          'v-btn--round': this.round,
          'v-btn--small': this.small,
          'v-btn--disabled': this.disabled,
          'v-btn--depressed': this.depressed,
        };
        if (this.flat) {
          this.color = '';
        }
        let classString = '';
        for (const key in classes) {
          if (classes[key]) {
            classString += `${key} `;
          }
        }
        return classString;
    }

    public fileChanged(e: any) {
        if (e) {
          if (this.fileChangedCallback) {
            if (e.target.files) {
              if (!this.multiple && e.target.files[0]) {
                this.fileChangedCallback(e.target.files[0]);
              } else if (this.multiple) {
                this.fileChangedCallback(e.target.files);
              } else {
                this.fileChangedCallback(null);
              }
            } else {
              this.fileChangedCallback(null);
            }
          }
        }
      }
}
</script>


<style lang="stylus">
.upload-btn 
	padding-left 16px
	padding-right 16px
	input[type=file] 
		position absolute
		height 0.1px
		width 0.1px
		overflow hidden
		opacity 0
		z-index -1
.upload-btn-hover 
	cursor pointer
</style>
