<template>
  <div class="category_box">
    <div class="cateContainer">
        <div class="category_box_left">
          <h2>{{$t('home.Category')}}</h2>
          <ul v-for="(a,index) in attrCategory" :key="index">
            <li @click="getSelectedAttrs(a)">{{a.Name}}</li>
            <!-- <li v-for="(g,index) in a" :key="index"><a :href="'/product/search?key=+&grapeId='+g.Id">{{g.Name}}</a></li> -->
          </ul>
        </div>
    </div>
    <ul class="category_box_right">
      <li v-for="(b,index) in productCate" :key="index">
        <router-link :to="'/product/search/-?' + 'catalogs=' + JSON.stringify([b.Id]) + '&type=0'">{{b.Name}}</router-link>
      </li>
    </ul>
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
  getAttrCategory () {
    var param = {
      id: 4,
      lang: this.$store.state.lang
    };
    this.$Api.prodAttrApi.getById(param).then(result => {
      this.attrCategory = result.AttrValues;
    });
  }
  getSelectedAttrs (val) {
    this.$router.push('/product/search/-?attrs=' + JSON.stringify([{ Id: 4, Vals: [parseInt(val.Id)] }]) + '&type=0');
  }
  getProductCate () {
    this.$Api.product.getAttrList().then(result => {
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
    min-height: 45rem;
    float: left;
    padding-top: 4.2rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: url(/static/Image/home/categroy.jpg) 0 0 no-repeat;
    background-size: cover;
}
.category_box_left {
  width: 85%;
  margin: 0 auto;
}

.category_box_left h2 {
    font-size: 2.5rem;
    margin-bottom: 2.5rem;
    color: #fff;
}
.category_box_left > ul {
  width: 48%;
  float: left;
}
.category_box_left > ul:nth-child(2n){
  margin-right: 4%;
}
.category_box_left > ul > li {
    margin-bottom: 0.5rem;
    color: #FFF;
    font-family: "PingFang", "Microsoft yahei";
    font-size: 1.3rem;
    word-break: break-all;
}
.category_box_left > ul > li > a {
  font-size: 1.3rem;
  line-height: 1.1rem;
  color: #fff;
  font-family: "PingFang";
}
.category_box_right {
  width: 100%;
  float: left;
}
.category_box_right li {
  width: 49.8%;
  height: 15rem;
  float: left;
  border-bottom: 1px solid #b2b5b5;
}
.category_box_right li:nth-child(2n) {
    border-left: 1px solid #b2b5b5;
}
.category_box_right li {
  background: url('/static/Image/home/cate.jpg') 0 0 no-repeat;
  background-size: cover;
}
.category_box_right li a {
    font-size: 1.6rem;
    color: #fff;
    display: block;
    margin-top: 3rem;
    margin-left: 10px;
    font-family: "FuturaNext", "Microsoft yahei";
    font-weight: 600;
    word-break: break-all;
    width: 59%;
    text-orientation: none;
    text-decoration: none;
}
</style>
