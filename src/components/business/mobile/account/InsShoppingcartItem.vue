<template>
    <div class="ShoppingCartItem_warpper" :style="index===0?'border-top:1px solid #eee;':''">
        <div class="shoppingcart_item_image">
            <img :src="ShopcartItem.Product.Img" />
        </div>
        <div class="shoppingcart_item_detail">
            <div class="shoppingcart_item_name">{{ShopcartItem.Product.Name}}</div>
            <div class="shoppingcart_item_code">{{ShopcartItem.Product.Code}}</div>
            <div class="shoppingcart_item_attr">
                <span v-if="ShopcartItem.AttrTypeName1 && ShopcartItem.AttrName1">{{ShopcartItem.AttrTypeName1}}:{{ShopcartItem.AttrName1}}</span>
                <span v-if="ShopcartItem.AttrTypeName2 && ShopcartItem.AttrName2">{{ShopcartItem.AttrTypeName2}}:{{ShopcartItem.AttrName2}}</span>
                <span v-if="ShopcartItem.AttrTypeName3 && ShopcartItem.AttrName3">{{ShopcartItem.AttrTypeName3}}:{{ShopcartItem.AttrName3}}</span>
            </div>
            <div class="shoppingcart_item_qty">
                <div class="qty_count">{{$t('Shoppingcart.Quantity')}}:&nbsp;</div>
                <inNum v-if="!lock" :min="ShopcartItem.Product.MinPurQty" :max="10000000" size="mini" :v="ShopcartItem.Qty" @input="(value)=>{this.ShopcartItem.Qty = value;}"></inNum>
                <div class="qty_count" v-else>{{ShopcartItem.Qty}}</div>
            </div>
            <div class="shoppingcart_item_price">
                <div>{{currentCode}} {{(ShopcartItem.Product.SalePrice) | PriceFormat}}</div>
            </div>
        </div>
        <div class="close" @click="removeItem" v-if="!lock">
            <i class="el-icon-circle-close"></i>
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
<style lang="less">
.ShoppingCartItem_warpper .el-input-number {
    position: relative;
    display: inline-block;
    width: 8rem;
    border: none;
}
</style>
<style lang="less" scoped>
.ShoppingCartItem_warpper{
    display: flex;
    flex-wrap: nowrap;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
    position: relative;
    .close{
        position: absolute;
        top: 1rem;
        right: 1rem;
        i{
            font-size: 2rem;
        }
    }
}
.shoppingcart_item_image{
    margin: 0 0 0 1rem;
}
.shoppingcart_item_image > img{
    width: 10rem;
    height: 10rem;
}
.shoppingcart_item_detail{
    margin: 0 0 0 1rem;
    margin-right: 3.5rem;
}
.shoppingcart_item_name,
.shoppingcart_item_code,
.shoppingcart_item_attr,
.shoppingcart_item_price{
    line-height: 2.5rem;
    font-size: 1.2rem;
    // width: 10rem;
}
.shoppingcart_item_price >div{
    font-size: 1.2rem;
    color:#d92526;
}
.shoppingcart_item_qty{
    display: flex;
    .qty_count{
        line-height: 26px;
        font-size: 1.2rem
    }
}
.shoppingcart_item_attr{
    span{
        margin-right: 1rem;
    }
}
.shoppingcart_item_price{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
}
</style>
