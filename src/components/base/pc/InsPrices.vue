<template>
    <div class="prices_warrper" :style="styla">
         <div class="primePricesMain" v-if="DefaultListPrice!==0 && DefaultListPrice !== DefaultSalePrice"><div :class="size">{{DefaultCurrency.Code }}&nbsp;</div><div class="primePrices" :class="size">{{(DefaultListPrice) | PriceFormat}}</div></div>
         <div class="currentPricesMain"><div :class="size">{{DefaultCurrency.Code}}&nbsp;</div><div :class="size + HL">{{(DefaultSalePrice) | PriceFormat}}</div></div>
         <div v-show="DefaultSalePrice!=currentPrices">
            <!-- <div class="primePricesMain" v-if="primePrices!==0 && primePrices !== currentPrices"><div :class="size">≈{{currency.Code }}&nbsp;</div><div class="primePrices" :class="size">{{(primePrices) | PriceFormat}}</div></div> -->
            <div class="currentPricesMain"><div :class="size">≈{{currency.Code}}&nbsp;</div><div :class="size + HL">{{(currentPrices) | PriceFormat}}</div></div>
         </div>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import Currency from '@/model/currency';
@Component
export default class InsPrices extends Vue {
    @Prop() primePrices!:string;
    @Prop() currentPrices!:string;
    @Prop() size!:string;
    @Prop() heightLine!:boolean;
    @Prop() styla!:string;
    @Prop() currency!: Currency;
    @Prop() DefaultListPrice!:string;
    @Prop() DefaultSalePrice!:string;
    @Prop() DefaultCurrency!: Currency;
    private Sizes = ['small', 'middle', 'large', 'huge', 'sb'];
    get HL ():string {
      return this.heightLine ? ' ' + this.size : '';
    }
    created () {
      if (this.Sizes.indexOf(this.size) === -1) {
        throw new Error('inPirces error:missing type name:' + this.size + '.And we only contain ' + this.Sizes.slice(0, this.Sizes.length - 1));
      }
    }
}
</script>
<style scoped lang="less">
.small{
    font-size: 1.12rem;
}
.middle{
    font-size: 1.33rem;
}
.large{
    font-size: 1.5rem;
}
.huge{
    font-size: 2rem;
}
.sb{
    font-size: 28px;
}
.primePricesMain{
    .primePrices{
        text-decoration: line-through;
    }
}
</style>
