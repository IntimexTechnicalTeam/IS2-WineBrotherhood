<template>
  <div class="liveBox" style="text-align: center;">
    <div class="liveBox_in">
      <div style="width:63%;margin-right: 10%;">
        <img src="/static/Image/home/index06.jpg"  width="100%"/>
      </div>
      <div style="width: 30%; height: 500px; overflow-y: hidden;">
        <img src="/static/Image/home/index07.jpg" width="100%" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class PkLiveBox extends Vue {
}
</script>

<style scoped lang="less">
/*live*/
.liveBox {
    width: 100%;
    height:745px;
    background: url(/static/Image/home/index05.jpg) center 0 no-repeat;
    background-size:cover;
    display: flex;
    justify-content: center;
    align-items: center;
}
.liveBox_in {
    /*width: 75%;*/
    width:1200px;
    display: flex;
    display: -webkit-flex;
    display: -ms-flex;
    display: -moz-flex;
    justify-content: space-between;
}
</style>
