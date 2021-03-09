<template>
    <div class="ShoppingCartItem_warpper" :class="{ bg: index%2 !== 0 }">
        <div class="shoppingcart_item_image">
            <img :src="ShopcartItem.Product.Img" />
        </div>
        <div class="shoppingcart_item_detail">
            <div class="shoppingcart_item_name">{{ShopcartItem.Product.Name}}</div>
            <div class="shoppingcart_item_code">{{ShopcartItem.Product.Code}}</div>
            <div class="shoppingcart_item_qty">
                <div class="qty_count">{{$t('Shoppingcart.Quantity')}}:&nbsp;{{ShopcartItem.Qty}}</div>
                <div class="qty_count">{{currentCode}} {{(ShopcartItem.Product.SalePrice * ShopcartItem.Qty) | PriceFormat}}</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import ShopcartItem from '@/model/shopCartItem';
import inNum from '@/components/base/mobile/InsNum.vue';
@Component({ components: { inNum } })
export default class InsShoppingcartItem extends Vue {
    @Prop() private readonly ShopcartItem !:ShopcartItem;
    @Prop() private readonly index !:number;
    @Prop() private readonly lock !:boolean;
    currentCode:string='HKD';
    @Watch('ShopcartItem.Qty', { deep: true })
    QtyChange () {
      this.$emit('QtyChange', this.index, this.ShopcartItem.Id);
    }
    removeItem () {
      this.$emit('removeItem', this.index, this.ShopcartItem.Id);
    }
    LoadData () {
      this.$Api.shoppingCart.LoadData().then((result) => {
        this.currentCode = result.DefaultCurrency.Code;
      });
    }
    mounted () {
      this.LoadData();
    }
}
</script>
<style lang="less" scoped>
.bg{
    background-color: rgba(0, 0, 0, 0.025);
}
.ShoppingCartItem_warpper{
    display: flex;
    flex-wrap: nowrap;
    padding: 20px 0;
    // border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    position: relative;
    .close{
        position: absolute;
        top: 12px;
        right: 12px;
        i{
            font-size: 2rem;
        }
    }
}
.shoppingcart_item_image{
    margin: 0 0 0 12px;
}
.shoppingcart_item_image > img{
    width: 100px;
    height: 100px;
}
.shoppingcart_item_detail{
    margin: 0 0 0 12px;
}
.shoppingcart_item_detail > div{

}
.shoppingcart_item_name{
    line-height: 24px;
    font-size: 1.2rem;
    width: 200px;
    // height: 2.5rem;
    // width: 10rem;
}
.shoppingcart_item_code,
.shoppingcart_item_attr,
.shoppingcart_item_price{
    font-size: 1.4rem;
    padding: 6px 0;
    span{
        font-size: 1.4rem;
    }
    div{
        font-size: 1.4rem;
    }
}
.shoppingcart_item_qty{
    .qty_count{
        font-size: 1.4rem;
        line-height: 1.6rem;
    }
}
.shoppingcart_item_attr{
    span{
        margin-right: 12px;
    }
}
.shoppingcart_item_price{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
}
</style>
