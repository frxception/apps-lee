<template lang="pug">
    v-container.fluid.grid-list-xl
        v-layout(row,wrap)
            v-flex(d-flex,lg3,sm6,xs12)
                CardWidget(icon="domain",title="1,287,687",subTitle= '13% higher yesterday',supTitle="Today's Visits",color="#00b297")
            v-flex(d-flex,lg3,sm6,xs12)
                CardWidget(icon="money_off",title="1,287,687",subTitle= '13% higher yesterday',supTitle="Today's Visits",color="#dc3545")
            v-flex(d-flex,lg3,sm6,xs12)
                CardWidget(icon="computer",title="1,287,687",subTitle= '13% higher yesterday',supTitle="Today's Visits",color="#0866C6")
            v-flex(d-flex,lg3,sm6,xs12)
                CardWidget(icon="watch_later",title="1,287,687",subTitle= '13% higher yesterday',supTitle="Today's Visits",color="#1D2939")
</template>
<script lang="ts">
import {CardWidget} from '@/components/widget';
import {Component, Prop, Vue} from 'vue-property-decorator';
// Lazyload
@Component({
    components: {
        CardWidget,
    },
})
export default class Dashboard extends Vue {
}
</script>

<style lang="stylus" scoped>
</style>
