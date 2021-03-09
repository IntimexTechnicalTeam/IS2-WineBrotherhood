<template>
  <transition name="fade">
    <div v-if="Visible" class="message_warpper" :class="Type" :style="'transform: translate(-50%,'+parseFloat(informCount*150-200)+'%);'">{{Message}}</div>
  </transition>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
@Component
export default class InsInform extends Vue {
    public Message!:string;
    public Type:string = 'primary';
    public Visible:boolean = false;
    public Time:number = 2000;
    created () {
      window.setTimeout(() => {
        this.Visible = false;
        Vue.prototype.informCount--;
      }, this.Time);
    }
}
</script>
<style scoped>
.message_warpper{
    position: fixed;
    height: 28px;
    top: 10%;
    left: 50%;
    line-height: 28px;
    font-size: 14px;
    text-align: center;
    border-radius: 5px;
    padding: 5px 10px;
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
