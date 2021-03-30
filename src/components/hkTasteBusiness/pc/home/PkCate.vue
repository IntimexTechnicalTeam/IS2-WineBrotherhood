<template>
  <div class="category_box">
    <div class="cateContainer">
      <div class="category_box">
        <h2>{{ productName.Name }}</h2>
        <ul class="category_box_right">
          <li v-for="(b, index) in productCate" :key="'b' + index">
            <router-link
              :to="
                '/product/search/-?' +
                  'catalogs=' +
                  JSON.stringify([b.Id]) +
                  '&type=0'
              "
            >
              <img :src="b.ImgB" alt="" />
              <div class="title">
                <h2>{{ b.Name }}</h2>
              </div>
            </router-link>
          </li>
          <li v-for="(a, index) in attrCategory" :key="'a' + index">
            <a @click="getSelectedAttrs(a)">
              <img :src="a.Image" alt="" />
              <div class="title">
                <h2>{{ a.Name }}</h2>
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
  productCate: any[] = [];
  productName: any[] = [];
  getAttrCategory() {
    var param = {
      id: 14,
      lang: this.$store.state.lang
    };
    this.$Api.prodAttrApi.getById(param).then(result => {
      this.attrCategory = result.AttrValues;
    });
  }
  getSelectedAttrs(val) {
    this.$router.push(
      '/product/search/-?attrs=' +
        JSON.stringify([{ Id: 14, Vals: [parseInt(val.Id)] }]) +
        '&type=0'
    );
  }
  getProductCate() {
    this.$Api.product.getAttrList().then(result => {
      this.productName = result[0];
      this.productCate = result[0].Children;
    });
  }
  mounted() {
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
.category_box h2 {
  width: 100%;
  height: 100%;
  color: #8b0b04;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: 700;
  font-family: "Arial";
  margin-bottom: 68px;
}
.category_box > .category_box_right {
  width: 1200px;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 70px;
}
.category_box > .category_box_right > li {
  float: left;
  width: 270px;
  margin-right: 40px;
  margin-bottom: 40px;
  position: relative;
  &:nth-child(4n) {
    margin-right: 0;
  }
  transition: all 0.3s;
  overflow: hidden;
  .title {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(20, 35, 79, 0.5);
    width: 100%;
    height: 100%;
    text-align: center;
    transition: all 0.3s;
    h2 {
      color: #fff;
      font-size: 16px;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      left: 50%;
      width: 100%;
      transition: all 0.3s;
    }
  }
  img {
    width: 100%;
    display: block;
    object-fit: cover;
    object-position: 50% 50%;
    transition: all 0.3s;
  }
  &:hover {
    box-shadow: 0 0 15px #302f2f;
    border-radius: 15px;
    a {
      .title {
        background-color: transparent;
        border-radius: 15px;
        h2 {
          font-size: 20px;
        }
      }
      img {
        transform: scale(1.2);
      }
    }
  }
}
</style>
