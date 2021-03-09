<template>
    <div class="shoppingcart_warrper">
        <div class="shoppingcart_header" v-if="!lockShoppingcart">{{$t('Shoppingcart.ShoppingcartTitle')}}</div>
        <ShoppingCartItem v-for="(item,index) in Shoppcart.Items" :key="index" :index="index" :ShopcartItem="item" @QtyChange="updateQty" @removeItem="removeItem" :lock="lockShoppingcart" ></ShoppingCartItem>
        <div v-if="Shoppcart.Items !== undefined && Shoppcart.Items.length !== 0">
          <div class="shoppingcart_total1" v-if="!lockShoppingcart">{{$t('Shoppingcart.Total')}}:{{currentCode}}  {{(totalAmount) | PriceFormat}}</div>
          <div class="shoppingcart_total" @click="checkout" v-if="!lockShoppingcart"><ElButton type="success"><span style="font-size:1.5rem;">{{ $t('Shoppingcart.Checkout') }}</span></ElButton></div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import ShoppingCartItem from '@/components/business/mobile/account/InsShoppingcartItem.vue';
import ShopCart from '@/model/ShopCart';
import { Button as ElButton } from 'element-ui';
class Update {
  itemId!: string;
  qty!: number;
  constructor (itemId:string, qty:number) {
    this.itemId = itemId;
    this.qty = qty;
  }
}
@Component({ components: { ShoppingCartItem, ElButton } })
export default class InsShoppingCart extends Vue {
    @Prop() private readonly lockShoppingcart!:boolean;
    @Prop() private readonly cleanUpdate!:boolean;
    private Shoppcart:ShopCart = new ShopCart();
    private totalAmount:number = 0;
    private UpdateQueQue:Update[] = [];
    private CurrencyName:string = 'HKD';
    currentCode:string='HKD';
    created () {
      if (!this.cleanUpdate) { this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart()); }
      this.$store.state.shopCart.then((result) => {
        this.Shoppcart = result.ShopCart;
        this.totalAmount = result.ShopCart.TotalAmount;
        this.CurrencyName = result.ShopCart.Currency.Name;
        console.log(this.Shoppcart.Items, 'resultresultresultresult');
        if (this.Shoppcart.Items.length === 0) Vue.prototype.$Confirm(this.$t('Message.Message'), this.$t('Shoppingcart.None'), () => { this.$router.push('/product/search/-'); }, () => { this.$router.push('/'); });
      });
    }
    loadItems () {
      var itemsprice = 0;
      var Currencys;
      this.Shoppcart.Items.forEach(element => {
        itemsprice += element.Product.SalePrice * element.Qty;
      });
      this.totalAmount = itemsprice;
    }
    LoadData () {
      this.$Api.shoppingCart.LoadData().then((result) => {
        this.currentCode = result.DefaultCurrency.Code;
      });
    }
    mounted () {
      this.LoadData();
    }
  @Watch('Shoppcart.Items', { deep: true })
    onItemsChange (o, n) {
      this.loadItems();
    }
  updateQty (index, id) {
    // this.UpdateQueQue.push(new Update(id, this.Shoppcart.Items[index].Qty));
    this.Shake(() => {
      this.$Api.shoppingCart.updateItemQty(id, this.Shoppcart.Items[index].Qty).then(() => {
        this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
      });
    }, 500);
  }
  removeItem (index, id) {
    this.Shoppcart.Items.splice(index, 1);
    this.$Api.shoppingCart.removeItem(id).then(result => {
      this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
    });
  }
  checkout () {
    let temp = {};
    let item:Update;
    let waittingList = [Promise.resolve('head')];
    waittingList.length = 0;
    while (this.UpdateQueQue.length !== 0) {
      item = this.UpdateQueQue.shift() as Update;
      temp[item.itemId] = item.qty;
    }
    Object.keys(temp).forEach((element) => {
      waittingList.push(this.$Api.shoppingCart.updateItemQty(element, temp[element]));
    });
    Promise.all(waittingList).then((result) => {
      this.$router.push('/account/checkout');
    });
  }
}
</script>
<style lang="less" scoped>
.shoppingcart_warrper{
    background-color: white;
    padding: 2rem 0;
    border-radius: .5rem;
    // min-height: calc(100vh - 402px);
    .shoppingcart_header{
        font-size: 2rem;
        line-height: 5rem;
        text-align: center;
        font-weight: 700;
    }
}
.shoppingcart_total{
    text-align: right;
    padding: 1rem;
}
.shoppingcart_total1{
    font-size: 1.5rem;
    text-align: right;
    padding: 1rem;
    color:#d92526;
}
</style>
