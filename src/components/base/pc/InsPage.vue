<template>
  <div class="page_warrper" :style="styla">
    <span class="last" :class="{ 'noClick': Page === 1 }" @click="current--">{{$t('CheckOut.Last')}} </span>
    <select v-model="current" class="selectPage">
      <option v-for="(item,index) in T" :value ="index + 1" :key="index" >{{ $t('product.per') + ' ' + (index + 1) + ' ' + $t('product.page')}}</option>
    </select>
    <span class="pageing"> / {{$t('CheckOut.Total') + Math.ceil(this.total / this.pageNum) + $t('product.page')}} </span>
    <span class="next" :class="{ 'noClick': Page === T.length }" @click="current++">{{$t('CheckOut.Next')}} </span>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
@Component
export default class InsPage extends Vue {
  @Prop() total!: number;
  @Prop() styla!: string;
  @Prop() pageNum!: number;
  private Page: number = 1;
  set current (num) {
    if (num < 1 || num > Math.ceil(this.total / this.pageNum)) {
      // Vue.prototype.$Confirm('页码范围在 1 到 ' + Math.ceil(this.total) + ' 之间', 'content some content');
      return;
    };
    this.Page = num;
    this.$emit('input', this.current);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    // let target = this.$refs.value as HTMLInputElement;
    // target.value = String(this.current);
  }
  get current () {
    return this.Page;
  }
  handleCurrentChange (currentPage) {
    this.current = currentPage;
  }
  get T () {
    return Array(Math.ceil(this.total / this.pageNum));
  }
  // first () {
  //   this.current = 1;
  // }
  // before () {
  //   this.current--;
  // }
  // after () {
  //   this.current++;
  // }
  // last () {
  //   this.current = Math.ceil(this.total);
  // }
}
</script>
<style scoped lang="less">
.page_warrper {
  margin: 50px auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center
}
.container {
  display: flex;
  justify-content: center;
}
.item {
  height: 30px;
  line-height: 30px;
  width: 30px;
  border-top: 1px solid @base_color;
  border-right: 1px solid @base_color;
  border-bottom: 1px solid @base_color;
  cursor: pointer;
  user-select: none;
}
.item input {
  height: 100%;
  width: 100%;
  background: none;
  outline: none;
  border: 0px solid #ccc;
  box-sizing: border-box;
  text-align: center;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input[type="number"]{
    -moz-appearance: textfield;
}
.before {
  position: relative;
}
.before::after {
  content: " ";
  position: absolute;
  border-right: 7.5px solid @base_color;
  border-left: 7.5px solid transparent;
  border-top: 7.5px solid transparent;
  border-bottom: 7.5px solid transparent;
  top: 50%;
  left: 50%;
  transform: translate(-75%, -50%);
}
.after {
  position: relative;
}
.after::after {
  content: " ";
  position: absolute;
  border-right: 7.5px solid transparent;
  border-left: 7.5px solid @base_color;
  border-top: 7.5px solid transparent;
  border-bottom: 7.5px solid transparent;
  top: 50%;
  left: 50%;
  transform: translate(-25%, -50%);
}
.first {
  border-left: 1px solid @base_color;
}
.last,.next{
  height: 2.3rem;
  line-height: 2.3rem;
  cursor: pointer;
  display: inline-block;
  border: 1px solid @base_color;
  margin:0 .5rem;
  padding: 0 1rem;
}
.noClick{
  color: black;
  background: white;
  cursor: not-allowed;
  border: 1px solid @base_color;
  line-height: 2.3rem;
  display: inline-block;
}
.selectPage{
    border: 1px solid @base_color;
    height: 2.45rem;
    padding: 0 0.5rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    background: @base_color;
    color: #fff;
}
.pageing{
  letter-spacing: 2px;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
