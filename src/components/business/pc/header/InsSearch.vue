<template>
  <div class="handle-one search-input-box">
    <a href="javascript:;" class="handle-icon search-icon" @click="show = !show"></a>
    <transition name="slide-fade">
      <!-- <form name="search-form" method="post" action="/product/search"></form> -->
      <input v-model="searchKey" v-if="show" @keyup.enter="search()" />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class InsSearch extends Vue {
  private searchKey: string = '';
  show:boolean = false;

  search () {
    this.show = false;
    this.$router.push({ path: `/product/search/${this.searchKey}` });
    this.searchKey = '';
  }
}
</script>
<style scoped lang="less">
/*头部购物车弹框 css*/
.header_log .handle-icon {
  width: 30px;
  display: block;
  height: 35px;
  color: #cccccc;
  line-height: 35px;
  font-size: 17px;
  -webkit-transition-duration: 0.1s;
  transition-duration: 0.1s;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
.search-icon {
  background: url(../../../../assets/Images/forweb/searchbtn.png) no-repeat center
    center;
  background-size: 70%;
}

.search-input-box input {
    height: 30px;
    padding: 0 10px;
    font-size: 16px;
    position: absolute;
    top: 110%;
    right: 0;
    z-index: 3;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
