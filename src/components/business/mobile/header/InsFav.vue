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
    padding-left:1rem;
    padding-right: 1rem;
    float: left;
    height: 3.5rem;
    border-right: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width:2.5rem;
      margin: 0 auto;
      display: block;
    }
  }
</style>
