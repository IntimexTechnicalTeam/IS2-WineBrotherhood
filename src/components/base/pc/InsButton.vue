<template>
  <div :style="BtnStyle + (borderRadius?'border-radius:20px':'')" class="in_btn" :class="MyType+' '+MySize" @click="click" >
    <div v-loading="loading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0)" v-if="icon" style="display:inline-block;vertical-align: middle;width:100%;">
      <img v-show="!loading" :src="'/static/Image/button/'+icon+'.png'">
      <div v-show="loading" class="img"></div>
      <span style="text-align:center;vertical-align: middle;">{{nama}}</span>
    </div>
    <div v-loading="loading" element-loading-spinner="el-icon-loading" element-loading-background="gray" style="display: flex;vertical-align: middle;width: 100%;height: 100%;align-items: center;justify-content: center;" v-else>
      <!-- <div v-show="loading" class="img"></div> -->
      <span style="text-align:center;vertical-align: middle;">{{nama}}</span>
    </div>
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
  @Prop() private readonly action!: string;
  @Prop({ default: false }) private readonly borderRadius!:boolean;
  @Prop({ default: false }) private readonly loading!: boolean;
  @Prop({ default: undefined }) private readonly icon: string | undefined;
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
    if (this.loading) return;
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
<style scoped lang="less">
.in_btn {
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
  vertical-align: middle;
  user-select: none;
  img{
    width: 18px;
    height: 18px;
    vertical-align: middle;
    margin: 0 12px;
  }
  .img{
    display: inline-block;
    width: 18px;
    height: 18px;
    vertical-align: middle;
    margin: 0 12px;
  }
}
.none {

}
.primary {
  background-color: @primary_color;
  color: white;
}
.primary2{
  background-color: @primary_color2;
  color: white;
}
.error {
  background-color: @error_color;
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
.large {
  font-size: 25px;
  line-height: 40px;
}
.middle {
  font-size: 18px;
  line-height: 40px;
  margin: 5px 5px;
}
// .small {
//   font-size: 12px;
//   line-height: 30px;
//   margin: 5px 5px;
// }
.small{
    font-size: 18px;
    line-height: 30px;
    // margin: 30px auto 0;
    width: 150px;
}
.loading{
  background-color: gray;
  border:1px solid gray;
}
</style>
