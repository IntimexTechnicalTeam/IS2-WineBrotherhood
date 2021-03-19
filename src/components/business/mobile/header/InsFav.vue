<template>
    <div class="fav">
          <div class="headerFav"><a href="javascript:;" @click="tofav" ><img  src="/images/mobile/Mobile-index_02.png"></a></div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Cookie from 'js-cookie';
@Component
export default class InsLangSwitch extends Vue {
  tofav () {
    window.location.href = '/account/myFavorite';
  }
}
</script>
<style scoped lang="less">
  .headerFav{
    padding-left:0.5rem;
    padding-right: 0.5rem;
    float: left;
    height: 2.5rem;
    // border-right: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      height:2rem;
      margin: 0 auto;
      display: block;
    }
  }
</style>
