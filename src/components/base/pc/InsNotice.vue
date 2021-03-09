<template>
  <transition name="fade">
    <div v-if="Visible" class="message_warpper" :style="style">
        <div class="title">{{Title}}</div>
        <div class="content">{{Content}}</div>
    </div>
  </transition>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
@Component
export default class InsNotice extends Vue {
    public Content!:string;
    public Title!:string;
    public Type:string = 'primary';
    public Visible:boolean = false;
    public Time:number = 5000;
    created () {
      window.setTimeout(() => {
        this.Visible = false;
        Vue.prototype.noticeCount--;
      }, this.Time);
    }
    get style () {
      return 'transform: translate(10%,' + (Vue.prototype.noticeCount * 130 - 50) + '%);';
    }
}
</script>
<style scoped>
.message_warpper{
    position: fixed;
    width: 300px;
    left: 0;
    top: 0;
    z-index: 2019;
    background-color: white;
    border-radius: 4px;
    overflow: hidden;
    box-shadow:0px 0px 5px 5px rgba(0, 0, 0, .2);
}
.title{
    text-align: center;
    font-size: 16px;
    line-height: 32px;
    height: 32px;
    border-bottom: 1px solid rgba(0, 0, 0, .2)
}
.content{
    text-align: left;
    padding: 16px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.primary {
  background-color: #8dc11f;
  color: white;
}
.error {
  background-color: #ed4014;
  color: white;
}
.warning {
  background-color: #f90;
  color: white;
}
.info {
  background-color: #2db7f5;
  color: white;
}
.success {
  background-color: #19be6b;
  color: white;
}
</style>
