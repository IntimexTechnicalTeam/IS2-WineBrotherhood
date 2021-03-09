<template>
  <div ref="form">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import InsInput from './InsInput.vue';
@Component
export default class InsForm extends Vue {
    @Prop({ default: () => {
      return {};
    } }) value!:any;
    validate (f) {
      // let inputs = (this.$refs.form as HTMLElement).getElementsByClassName('my_input');
      // for (const iterator of inputs) {
      //   let event = document.createEvent('HTMLEvents');
      //   event.initEvent('blur', false, false);
      //   (iterator as any).dispatchEvent(event);
      // }
      let error = true;
      f = f instanceof Function ? f : () => {};
      for (const iterator of this.$children) {
        let v = (iterator as any).validate;
        if (v && !v()) error = false;
      }
      f(error);
    }
    reset () {
      for (const iterator of this.$children) {
        let reset = (iterator as InsInput).reset;
        if (reset) reset();
      }
    }
}
</script>
<style lang="less" scoped>
</style>
