<template>
<div class="cateMain">
  <!-- 获取所在的产品目录 -->
  <div  class="detail-select-attribute" :class="{'detail-select-titleeng':$Storage.get('locale') === 'E'}" v-for="(cat,index) in cateTree" :key="'cat'+index">
    <div>
      <div v-if="cat.ParentId!=0">
        <p class="detail-select-title" >{{cateTree[0].Name}}</p>
      </div>
      <ul class="common-select">
        <li v-if="cat.ParentId!=0">{{cat.Name}}</li>
      </ul>
      <div class="clear"></div>
    </div>
  </div>
    <!-- 获取所在的产品非库存属性 -->
  <div  class="detail-select-attribute" :class="{'detail-select-titleeng':$Storage.get('locale') === 'E'}" v-for="(attr,index) in source" :key="'attr'+index">
    <div v-if="attr.length>0">
      <div v-for="(title,index1) in attr" :key="index1">
          <p class="detail-select-title"  v-if="index1==0">{{title.Type.Name}}</p>
      </div>
      <ul class="common-select">
        <li v-for="(one,index) in attr" :key="'sub'+index">{{one.Name}}</li>
      </ul>
      <div class="clear"></div>
    </div>
  </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
@Component
export default class PkProductDetailCate extends Vue {
  @Prop() private readonly source!: string[];
  @Prop() private readonly cateTree!: string[];
}
</script>
<style scoped lang="less">
ul,li{
  list-style: none;
}
.cateMain{
    // width: 95%;
    // margin: 0 auto;
    padding: 0 10px;
}
.clear{
  clear: both;
}
.detail-select-attribute{
  width:100%;
  display: block;
  margin-bottom: 1rem;
}
.detail-select-attribute .detail-select-title{
    width: 90px;
    margin-right: 15px;
    float: left;
    font-size: 18px;
    color: #8b0b04;
    text-align: center;
    line-height: 18px;
    font-weight: 700;
    padding-top: 10px;
}
.detail-select-attribute:nth-child(2) .detail-select-title{
  padding-top: 0;
}
.detail-select-titleeng .detail-select-title{
  // width: 140px;
  // line-height: 38px;
}
.detail-select-attribute .common-select{
  // width:75%;
  word-break: break-all;
  float: left;
}
.detail-select-attribute .common-select li{
    display: inline-block;
    background-color: #fff;
    color: #8b0b04;
    margin-right: 10px;
    font-size: 16px;
    margin-bottom: 10px;
    // padding-top: 10px;
    // padding-bottom: 10px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 8px;
    box-shadow: 0 0 3px #bebebe;
    border: 1px solid #c9c9c9;
    // width: 94px;
    height: 42px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    font-weight: bold;
}
</style>
