<template>
  <div class="in_num_warpper" :style="styla">
    <div class="in_num_main">
      <div class="in_num_label" v-if="label">{{label}}</div>
      <InputNumber v-model="value" @input="onValueChange" :min="min" :max="max === 0 ? Infinity : max" :size="size" :disabled="lock"></InputNumber>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import { InputNumber } from 'element-ui';
@Component({ components: { InputNumber } })
export default class InsNum extends Vue {
  @Prop() private readonly label!: string;
  @Prop() private readonly styla!: string;
  @Prop() private readonly min!: number;
  @Prop() private readonly max!: number;
  @Prop() private readonly size!: string;
  @Prop() private readonly lock!: boolean;
  private Max: number = 0;
  private Min: number = 1;
  @Prop() private v!:number;
  private value:number = 0;
  onValueChange () {
    this.$emit('input', this.value);
  }
  created () {
    this.value = this.v;
    this.Max = this.max !== undefined ? this.max : this.Max;
    this.Min = this.min !== undefined ? this.min : this.Min;
  }
}
</script>
<style lang="less">
.in_num_main .el-input-number--mini{
    width: 100px;
    line-height: 26px;
}
.in_num_main{
  .el-input-number__decrease, .el-input-number__increase{
    background-color: #fff;
    color: #999999;
    width: 2rem;
  }
}
</style>
<style scoped>
.el-input-number{
    position: relative;
    display: inline-block;
    width: 10rem;
    border: 1px solid #000;
}
.in_num_main {
  user-select: none;
  font-size: 16px;
  text-align: left;
  /* display: flex; */
}
.in_num_label {
  font-size: 16px;
  width: 100px;
  text-align: left;
  line-height: 36px;
}
</style>
