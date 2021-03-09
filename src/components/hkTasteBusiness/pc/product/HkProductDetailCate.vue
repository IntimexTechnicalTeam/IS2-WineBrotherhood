<template>
<div class="cateMain">
  <!-- 获取所在的产品目录 -->
  <div  class="detail-select-attribute" v-for="(cat,index) in cateTree" :key="'cat'+index">
    <div>
      <ul class="common-select">
        <li v-if="cat.ParentId!=0">{{cat.Name}}</li>
      </ul>
      <div class="clear"></div>
    </div>
  </div>
    <!-- 获取所在的产品非库存属性 -->
  <div  class="detail-select-attribute" v-for="(attr,index) in source" :key="'attr'+index">
    <div v-if="attr.length>0">
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
    width: 95%;
    margin: 0 auto;
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
    width: 20%;
    margin-right: 5%;
    word-break: break-all;
    float: left;
    font-size: 1.2rem;
    text-align: right;
}
.detail-select-attribute .common-select{
  width:75%;
  word-break: break-all;
  float: left;
}
.detail-select-attribute .common-select li{
    display: inline-block;
    background-color: #262626;
    color: #FFF;
    margin-right: 0.5rem;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 5px;
}
</style>
