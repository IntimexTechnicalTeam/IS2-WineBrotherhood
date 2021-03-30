<template>
  <div class="category_box">
    <div class="cateContainer">
        <div class="category_box">
          <h2>{{productName.Name}}</h2>
          <ul class="category_box_right">
            <li v-for="(b,index) in productCate" :key="'b'+index">
              <router-link :to="'/product/search/-?' + 'catalogs=' + JSON.stringify([b.Id]) + '&type=0'">
              <img :src="b.ImgB" alt="">
              <div class="title">
                  <h2>{{b.Name}}</h2>
              </div>
              </router-link>
            </li>
            <li v-for="(a,index) in attrCategory" :key="'a'+index">
              <a @click="getSelectedAttrs(a)">
                <img :src="a.Image" alt="">
                <div class="title">
                  <h2>{{a.Name}}</h2>
                </div>
              </a>
            </li>
          </ul>
        </div>
    </div>
    <div class="clear"></div>
  </div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class PkCate extends Vue {
  // 数组分割处理
  attrCategory = [];
  selectedAttrs: object[] = []; // 选中的产品属性值
  selectedCatalogs: number[] = []; // 选中的产品目录值
  productCate:any[]=[];
  productName:any[]=[];
  getAttrCategory () {
    var param = {
      id: 14,
      lang: this.$store.state.lang
    };
    this.$Api.prodAttrApi.getById(param).then(result => {
      console.log(result, '非属性');
      console.log(this.attrCategory, 'this.attrCategory111');
      this.attrCategory = result.AttrValues;
      console.log(this.attrCategory, 'this.attrCategory222');
    });
  }
  getSelectedAttrs (val) {
    console.log(val, 'ddd');
    this.$router.push('/product/search/-?attrs=' + JSON.stringify([{ Id: 14, Vals: [parseInt(val.Id)] }]) + '&type=0');
  }
  getProductCate () {
    this.$Api.product.getAttrList().then(result => {
      console.log(result, '属性');
      this.productName = result[0];
      this.productCate = result[0].Children;
    });
  }
  mounted () {
    this.getAttrCategory();
    this.getProductCate();
  }
}
</script>

<style scoped lang="less">
/*頁面中間目錄*/
ul,li{
    list-style: none;
}
.clear{
    clear: both;
}
.cateContainer{
    width: 100%;
    box-sizing: border-box;
}
.category_box {
  width: 100%;
  margin: 0 auto;
}

.category_box h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    font-weight: bold;
    color: #8b0b04;
    text-align: center;
}
.category_box > ul {
  width: 90%;
  margin: 0 auto;
}
.category_box > ul > li {
    float: left;
    width: 47%;
    position: relative;
    margin-bottom: 2rem;
    &:nth-child(2n){
      float: right;
    }
    .title{
      position: absolute;
      top: 0;
      left: 0;
      background-color:rgba(20, 35, 79, 0.5);
      width: 100%;
      height: 100%;
      text-align: center;
      h2{
        color: #fff;
        font-size: 1.2rem;
        position: absolute;
        top: 50%;
        transform: translate(-50%,-50%);
        left: 50%;
        width: 100%;
      }
    }
    img{
      width: 100%;
      display: block;
      object-fit: cover;
      object-position: 50% 50%;
    }
}
.category_box > ul > li > a {
  font-size: 1.3rem;
  line-height: 1.1rem;
  color: #fff;
  font-family: "PingFang";
}
</style>
