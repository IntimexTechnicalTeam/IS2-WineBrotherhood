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
    line-height: 34px;
    color: #8b0b04;
    font-weight: 700;
}
.detail-select-titleeng .detail-select-title{
    width: 20%;
    margin-right: 5%;
    word-break: break-word;
    float: left;
    font-size: 1.2rem;
    text-align: right;
    color: #8b0b04;
    font-weight: 700;
    line-height: 34px;
}
.detail-select-titleeng:nth-child(2) .detail-select-title{
  line-height: initial;
}
.detail-select-attribute .common-select{
  // width:75%;
  word-break: break-all;
  float: left;
}
.detail-select-attribute .common-select li{
  display: inline-block;
  color: #8b0b04;
  margin-right: 1rem;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  // padding-top: .7rem;
  // padding-bottom: .7rem;
  line-height: 3rem;
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 5px;
  box-shadow: 0 0 3px #bebebe;
  border: 1px solid #c9c9c9;
}
</style>
