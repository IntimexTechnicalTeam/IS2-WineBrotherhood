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
        <router-link
          :to="'/product/search/-?' + 'catalogs=' + JSON.stringify([b.Id]) + '&type=0'"
        >{{b.Name}}</router-link>
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
  productCate: any[] = [];
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
    this.$router.push(
      '/product/search/-?attrs=' +
        JSON.stringify([{ Id: 4, Vals: [parseInt(val.Id)] }]) +
        '&type=0'
    );
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
ul,
li {
  list-style: none;
}
.clear {
  clear: both;
}
.category_box {
  min-width: 1200px;
  overflow: hidden;
}
.category_box a {
  color: #fff;
}
.category_box_left {
  width: 25%;
  height: 0;
  float: left;
  padding-bottom: 36.58%;
  padding-left: 2%;
  box-sizing: border-box;
  background: url('/static/Image/home/index03.jpg') 0 0 no-repeat;
  background-size: cover;
}
.category_box_left h2 {
  font-size: 1.9vw;
  margin-top: 10%;
  margin-bottom: 5%;
  color: #fff;
  font-family: "FuturaNext";
}
.category_box_left > ul {
  width: 45%;
  float: left;
}
.category_box_left > ul > li {
  width: 100%;
  height: 0;
  padding-bottom: 20%;
}
.category_box li{
    color: #fff;
    cursor: pointer;
}
.category_box_left > ul > li  {
  font-size: 1vw;
  font-family: "PingFang";
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.category_box_right {
  width: 75%;
  float: right;
}
.category_box_right li {
  width: 25%;
  height: 0;
  padding-bottom: 24.4%;
  float: left;
  box-sizing: border-box;
}
.category_box_right li a {
  display: block;
  font-size: 1.9vw;
  margin-left: 11%;
  margin-top: 15%;
  font-family: "FuturaNext";
}
.category_box_right li {
  background: url('/static/Image/home/index04.jpg') 0 0 no-repeat;
  background-size: cover;
}
</style>
