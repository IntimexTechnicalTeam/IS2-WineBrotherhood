<template>
  <div class="page_warrper" :style="styla">
    <!-- <div class="container">
      <div class="item first" @click="first">First</div>
      <div class="item before" @click="before"></div>
      <div class="item">
        <input ref="value" v-model="current" type="number" min="1" :max="total" />
      </div>
      <div class="item after" @click="after"></div>
      <div class="item" @click="last">Last</div>
    </div> -->
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
    console.log(Array(Math.ceil(this.total / this.pageNum)), 'Array(Math.ceil(this.total / this.pageNum))');
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
<style scoped lang=less>
.page_warrper {
  margin: 20px auto;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
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
  /* padding: 15px 18px !important; */
  margin: 0 1rem;
  cursor: pointer;
  border: none;
  background: #8b0b04;
  color: #fff;
  border-radius: 10px;
  height: 45px;
  line-height: 45px;
  font-size: 14px;
  padding: 0 1.5rem;
  font-weight: bold;
  box-shadow: 0 0 5px rgba(68, 68, 68, 0.5);
}
.noClick{
  cursor: not-allowed;
  line-height: 45px;
  display: inline-block;
  color: #2e2e2e ;
  background: #ead3b1;
  /* border: 1px solid #ead3b1; */
}
.selectPage{
  height: 45px;
  border-radius: 10px;
  outline: 0;
  font-size: 14px;
  padding: 0 1rem;
  padding-right: 2rem;
  background: transparent url('/images/mobile/selectPage.png') 90% 50% no-repeat;
  appearance: none;
  text-transform: capitalize;
  color: #2b4071;
  font-weight: bold;
  box-shadow: 0 0 5px rgba(68, 68, 68, 0.5);
  border: none;
}
.pageing{
  /* letter-spacing: 2px; */
  margin-left: 1rem;
  margin-right: 1rem;
  font-size: 14px;
  color: #2b4071;
  font-weight: bold;
}
</style>
