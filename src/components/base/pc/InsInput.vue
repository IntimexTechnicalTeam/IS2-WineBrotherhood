<template>
  <div class="input_outer">
    <div class="input_warpper">
        <div class="input_label">{{label}}<span v-if="must" style="color:red;">*</span></div>
        <div class="input_main">
            <input v-model="Value" @blur="blur" v-if="type!=='date'" class="my_input" :type="type === 'password' ? 'password' : 'text'">
            <DatePicker
              v-else
              v-model="Value"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="">
            </DatePicker>
        </div>
    </div>
    <transition-group name="iefade">
      <span class="error" key="1" v-show="!error && needValidate">{{$t(tm)}}</span>
      <span class="error" key="2" v-show="none && needValidate">{{$t('Input.input')}}{{label}}</span>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import { DatePicker } from 'element-ui';
@Component({ components: { DatePicker } })
export default class InsInput extends Vue {
    @Prop({ default: 'label' }) private label!:string;
    @Prop({ default: '' }) private value!:string;
    @Prop({ default: true }) private border!:boolean;
    @Prop({ default: 'text' }) private type!:string;
    @Prop({ default: true }) private needValidate!:boolean;
    @Prop({ default: '' }) private rule!:any;
    @Prop({ default: true }) private must!: boolean;
    private tm = '';
    private Value: string = '';
    private error: boolean = true;
    private none: boolean = false;
    private static defaultRule:any = { 'text': '', 'email': /^\w+([.-]\w+)*@\w+([.-]\w+)*\.\w+$/, 'url': '', 'number': /^\d+$/, 'range': '', 'color': '' };
    created () {
      this.Value = this.value;
      this.tm = 'Input.' + this.type;
    }
    @Watch('Value')
    onValueChange () {
      console.log(this.Value);
      if (this.Value !== '') this.none = false;
      this.Shake(() => {
        if (InsInput.defaultRule[this.type] instanceof RegExp) {
          this.error = (InsInput.defaultRule[this.type] as RegExp).test(this.Value) || this.Value === '';
          // if (this.error === false) this.$emit('error');
        };
        this.$emit('input', this.Value);
      });
    }
    @Watch('value')
    onvalueChange () {
      this.Value = this.value;
    }
    blur () {
      if (this.Value === '') this.none = true;
      else this.none = false;
    }
    validate () {
      if (!this.needValidate) return true;
      if (InsInput.defaultRule[this.type] instanceof RegExp) {
        this.error = (InsInput.defaultRule[this.type] as RegExp).test(this.Value) || this.Value === '';
        if (this.error === false) return false;
      };
      if (!this.rule) {
      } else {
        if (this.rule instanceof RegExp) this.error = (this.rule as RegExp).test(this.Value) || this.Value === '';
        if (this.error === false) return false;
        if (typeof this.rule === 'string') this.error = this.rule === this.Value;
      }
      if (this.Value === '' || this.Value === undefined || this.Value === null) { this.none = true; return false; }
      return true;
    }
    reset () {
      this.Value = '';
    }
}
</script>
<style lang="less">
.input_main{
    input{
      line-height: 16px;
      font-size: 16px;
      min-width: 200px;
      padding: 12px 0 0;
      outline: none;
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-bottom: 1px solid rgba(0, 0, 0, .3);
      border-radius: 0;
      background-color: transparent;
    }
    .el-input__inner{
      height: inherit;
    }
    .el-input--prefix{
      i{
        display: none;
      }
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: auto;
    }
  }
</style>
<style lang="less" scoped>
.input_outer{
  margin-top: 12px;
  .error{
    margin-left: 120px;
    font-size: @min_font_size;
    color: red;
    position: absolute;
    margin-top: -6px;
  }
}
.input_warpper{
  display: flex;
  .input_label{
    font-size: 16px;
    min-width: 120px;
  }
  .input_main{
    input{
      line-height: 16px;
      font-size: 16px;
      min-width: 200px;
      padding: 12px 0 0;
      outline: none;
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-bottom: 1px solid rgba(0, 0, 0, .3);
      background-color: transparent;
    }
  }
}
.iefade-enter-active,
.iefade-leave-active {
  transition: opacity .5s;
}
.iefade-enter, .iefade-leave-to {
  opacity: 0;
}
</style>
