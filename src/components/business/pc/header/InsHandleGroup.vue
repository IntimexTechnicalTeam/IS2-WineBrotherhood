<template>
  <div>
    <input type="text">
    <img class="search" src="/static/Image/home/search.png">
    <login />
    <div class="handle-one">
       <router-link to="/account/myFavorite" class="handle-icon fav-icon"></router-link>
    </div>
    <shopcart />
    <!-- <search /> -->
    <!-- <input v-model="searchKey" /> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import shopcart from './InsShoppingCart.vue';
import login from './InsLogin.vue';
// import search from './InsSearch.vue';

@Component({
  components: {
    shopcart,
    login
    // ,
    // search
  }
})
export default class InsHandleGroup extends Vue {
  // private searchKey: string = '';
  // @Watch('searchKey')
  // onSearchKeyChange () {
  //   this.$store.dispatch('setSearchKey', this.searchKey);
  // }
}
</script>
<style scoped lang="less">
.search{
  // height: 35px;
  vertical-align: middle;
  width: 22.5px;
  margin-right: 60px;
}
input{
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-bottom: 1px solid rgba(0,0,0,.2);
        outline: none;
        vertical-align: middle;
        background-color: transparent;
      }
.handle-one {
  // margin-top: 10px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  height: 35px;
  box-sizing: border-box;
  padding: 0 3px;

  .handle-icon {
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

  .fav-icon {
    background: url("../../../../assets/Images/pc/home/love.png") no-repeat
      center center;
      background-size:22.5px 22.5px;
  }
}
</style>
