<template>
  <div :style="BtnStyle" class="in_btn" :class="MyType+' '+MySize + ' '+ (loading?'loading':'')" @click="click">
    <div v-loading="loading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0)" v-if="icon" style="display:inline-block;vertical-align: middle;">
      <img v-show="!loading" :src="'/static/Image/button/'+icon+'.png'">
      <div v-show="loading" class="img"></div>
    </div>
    {{nama}}
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
@Component
export default class InsButton extends Vue {
  @Prop() private readonly nama!: string;
  @Prop() private readonly width!: string;
  @Prop() private readonly height!: string;
  @Prop() private readonly type!: string;
  @Prop() private readonly size!: string;
  @Prop({ default: false }) private readonly loading!: boolean;
  @Prop({ default: undefined }) private readonly icon: string | undefined;
  @Prop() private readonly action!: string;
  private MyType = '';
  private MySize = '';
  get BtnStyle (): string {
    let Width = this.width;
    let Height = this.height;
    let Style =
      (Width ? 'width:' + Width + ';' : '') +
      (Height ? 'height:' + Height + ';' : '');
    return Style;
  }
  click (): void {
    if (this.loading || this.type === 'error') return;
    if (this.action) {
      this.$emit('click', this.action);
    } else {
      this.$emit('click');
    }
  }
  created () {
    this.MyType = this.type ? this.type : 'primary';
    this.MySize = this.size ? this.size : 'large';
  }
}
</script>
<style lang="less">
.in_btn {
.el-loading-spinner i {
    color: white !important;
  }
}
</style>
<style scoped lang="less">
.in_btn {
  text-align: center;
  box-sizing: border-box;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  img{
    width: 1.5rem;
    height: 1.5rem;
    vertical-align: middle;
    margin: 0 1rem;
  }
  .img{
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    vertical-align: middle;
    margin: 0 1rem;
  }
}
.primary {
  border: 1px solid @primary_color;
  background-color: @primary_color;
  color: white;
}
.primary2{
  border: 1px solid @primary_color2;
  background-color: @primary_color2;
  color: white;
}
.error {
  border:1px solid gray;
  background-color: gray;
  color: white;
}
.warning {
  background-color: @warning_color;
  color: white;
}
.info {
  background-color: @info_color;
  color: white;
}
.success {
  background-color: @success_color;
  color: white;
}
.positive {
  border: 2px solid black;
  color: red;
  background-color: @positive_color;
}
.nagative {
  color: white;
  background-color: @nagative_color;
}
.white {
  color: black;
  background-color: white;
  border: 1px solid black;
}
.large {
  font-size: 2rem;
  line-height: 4rem;
}
.middle {
  font-size: 1.5rem;
  line-height: 3.3rem;
  margin: 0.5rem 0;
}
.small {
  font-size: 1rem;
  line-height: 2.5rem;
  margin: 0.5rem 0;
}
.loading{
  background-color: gray;
  border:1px solid gray;
}
</style>
