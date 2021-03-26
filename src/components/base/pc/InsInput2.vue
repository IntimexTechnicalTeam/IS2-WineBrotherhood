<template>
  <div
    class="input_outer delin"
    :style="{ display: display, width: width ? width : 'auto' }"
  >
    <div class="input_warpper">
      <div class="input_label" :style="{ width: labelWidth }" v-if="needLabel">
        {{ label }}<span v-if="must" style="color: red">*</span>
      </div>
      <div class="input_main">
        <textarea
          v-if="type === 'textarea'"
          :placeholder="placeholder"
          class="my_textarea"
          rows="6"
          v-model="Value"
          :disabled="disabled"
        />
        <el-date-picker
          v-else-if="type === 'date'"
          v-model="Value"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder=""
          :disabled="disabled"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
        <input
          v-model="Value"
          @blur="blur"
          v-else
          :placeholder="placeholder"
          class="my_input"
          :type="inputtype"
          :disabled="disabled"
        />
        <div></div>
        <transition-group name="iefade">
          <span class="error 1" key="1" v-show="!error && needValidate">{{
            $t(tm)
          }}</span>
          <span class="error 2" key="2" v-show="none && needValidate"
            >{{ $t("Input.input") }}{{ needLabel ? label : placeholder }}</span
          >
          <span class="error 3" key="3" v-show="!ruleerr && needValidate">{{
            ruleerrmsg
          }}</span>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
@Component
export default class InsInput extends Vue {
  @Prop({ default: 'label' }) private label!: string;
  @Prop({ default: false }) private needLabel!: boolean;
  @Prop({ default: '' }) private value!: string;
  @Prop({ default: true }) private border!: boolean;
  @Prop({ default: 'text' }) private type!: string;
  @Prop({ default: true }) private needValidate!: boolean;
  @Prop({ default: '' }) private placeholder!: string;
  @Prop({ default: '' }) private width!: string;
  @Prop({ default: 'block' }) private display!: string;
  @Prop({ default: '' }) private rule!: any;
  @Prop({ default: true }) private must!: boolean;
  @Prop({ default: '120px' }) private labelWidth!: string;
  @Prop({ default: false }) private disabled!: boolean;
  private tm = '';
  private Value: string = '';
  private error: boolean = true;
  private none: boolean = false;
  private ruleerr: boolean = false;
  private ruleerrmsg: string = '';
  private inputtype: string = '';
  private needValie: boolean = true;
  private static defaultRule: any = {
    textarea: '',
    text: '',
    email: /^\w+([.-]\w+)*@\w+([.-]\w+)*\.\w+$/,
    url: '',
    number: /^\d+$/,
    range: '',
    color: '',
    password: '',
    phone: ''
  };
  created() {
    this.Value = this.value;
    this.tm = 'Input.' + this.type;
    if (
      this.type === 'password' ||
      this.type === 'confirmpassword' ||
      this.type === 'logopassword'
    ) {
      this.inputtype = 'password';
    } else {
      this.inputtype = 'text';
    }
  }
  pickerOptions: object = {
    disabledDate(time) {
      return time.getTime() < Date.now();
    }
  };
  @Watch('Value')
  onValueChange() {
    this.error = true;
    // this.ruleerr = true;
    this.none = false;
    this.$emit('input', this.Value);
    if (this.needValie === true) {
      if (this.Value !== '') {
        this.none = false;
      } else {
        this.none = true;
        this.ruleerr = true;
        this.ruleerrmsg = '';
        return false;
      }
      // this.Shake(() => {
      if (this.type === 'password') {
        // var i = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
        var i = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/;
        if (i.test(this.Value) === false) {
          this.ruleerr = false;
          this.ruleerrmsg = this.$t('Register.Registerdigital') + '';
          return false;
        } else {
          this.ruleerr = true;
          this.ruleerrmsg = '';
        }
      }
      // 国内电话和香港电话正则表达式
      if (this.type === 'phone') {
        /* eslint-disable */
        var mobile = /^(\+)?(\d{0,4}\-?)?\d{7,11}$/;
        if (mobile.test(this.Value) === false) {
          this.ruleerr = false;
          this.ruleerrmsg = this.$t("Input.phoneincorrect") + "";
          return false;
        } else {
          this.ruleerr = true;
          this.ruleerrmsg = "";
        }
      }
      if (!this.rule || this.rule === "") {
      } else {
        if (this.rule instanceof RegExp) {
          this.error =
            (this.rule as RegExp).test(this.Value) || this.Value === "";
        } else if (typeof this.rule === "string") {
          this.error = this.rule === this.Value;
        }
        if (this.error === false) return false;
      }
      if (InsInput.defaultRule[this.type] instanceof RegExp) {
        this.error =
          (InsInput.defaultRule[this.type] as RegExp).test(this.Value) ||
          this.Value === "";
        // if (this.error === false) this.$emit('error');
      }

      // });
    } else {
      return false;
    }
  }
  @Watch("value")
  onvalueChange() {
    this.Value = this.value;
  }
  blur() {
    if (this.error === true) {
      this.error = true;
      this.ruleerr = true;
      this.none = false;

      if (this.Value === "" && this.must) {
        this.none = true;
        return false;
      } else {
        this.none = false;
      }
      // 密码正则表达式
      if (this.type === "password") {
        // var i = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
        var i = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/;
        if (i.test(this.Value) === false) {
          this.ruleerr = false;
          this.ruleerrmsg = this.$t("Register.Registerdigital") + "";
          return false;
        } else {
          this.ruleerr = true;
          this.ruleerrmsg = "";
        }
      }
      // 国内电话和香港电话正则表达式
      if (this.type === "phone") {
        /* eslint-disable */
        var mobile = /^(\+)?(\d{0,4}\-?)?\d{7,11}$/;
        if (mobile.test(this.Value) === false) {
          this.ruleerr = false;
          this.ruleerrmsg = this.$t("Input.phoneincorrect") + "";
          return false;
        } else {
          this.ruleerr = true;
          this.ruleerrmsg = "";
        }
      }
    }
  }
  validate() {
    this.error = true;
    this.ruleerr = true;
    this.none = false;
    if (!this.needValidate || !this.must) return true;
    if (this.Value === "") {
      this.none = true;
      return false;
    }
    if (this.type === "password") {
      // var i = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
      /* eslint-disable */
      var i = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/;
      if (i.test(this.Value) === false) {
        this.ruleerr = false;
        this.ruleerrmsg = this.$t("Register.Registerdigital") + "";
        return false;
      } else {
        this.ruleerr = true;
        this.ruleerrmsg = "";
      }
    }
    // 国内电话和香港电话正则表达式
    if (this.type === "phone") {
      /* eslint-disable */
      var mobile = /^(\+)?(\d{0,4}\-?)?\d{7,11}$/;
      if (mobile.test(this.Value) === false) {
        this.ruleerr = false;
        this.ruleerrmsg = this.$t("Input.phoneincorrect") + "";
        return false;
      } else {
        this.ruleerr = true;
        this.ruleerrmsg = "";
      }
    }
    if (!this.rule || this.rule === "") {
    } else {
      if (this.rule instanceof RegExp)
        this.error =
          (this.rule as RegExp).test(this.Value) || this.Value === "";
      else if (typeof this.rule === "string") {
        this.error = this.rule === this.Value;
      }
      if (this.error === false) return false;
    }

    if (InsInput.defaultRule[this.type] instanceof RegExp) {
      this.error =
        (InsInput.defaultRule[this.type] as RegExp).test(this.Value) ||
        this.Value === "";
      if (this.error === false) return false;
    }

    return true;
  }
  reset() {
    this.Value = "";
    this.tm = "";
    this.ruleerrmsg = "";
    // this.error = false;
    this.ruleerr = true;
    this.none = false;
    this.needValie = false;
  }
}
</script>
<style lang="less">
.delin {
  // input{
  //   line-height: 16px;
  //   font-size: 16px;
  //   min-width: 200px;
  //   padding: 12px 0 0;
  //   outline: none;
  //   border-top: 0;
  //   border-left: 0;
  //   border-right: 0;
  //   border-bottom: 0;
  //   border-radius: 0;
  //   background-color: gray;
  // }
  .el-input__inner {
    height: inherit;
    box-sizing: border-box;
    line-height: 16px;
    font-size: 14px;
    width: 100%;
    padding: 12px;
    outline: none;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: 0;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 0px;
    color: #000;
  }
  .el-input--prefix {
    i {
      display: none;
    }
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100% !important;
  }
  .el-date-editor.el-input__inner {
    padding: 12px;
    border-radius: 0px !important;
  }
}
</style>
<style lang="less" scoped>
.input_outer {
  padding-top: 30px;
  .error {
    font-size: @min_font_size;
    color: red;
    position: absolute;
  }
}
.input_warpper {
  display: flex;
  .input_label {
    font-size: 16px;
    min-width: 120px;
    display: flex;
    align-items: center;
    // text-align: right;
  }
  .input_main {
    flex-grow: 1;
    input {
      box-sizing: border-box;
      line-height: 16px;
      font-size: 14px;
      width: 100%;
      height: 40px;
      padding: 12px;
      outline: none;
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-bottom: 0;
      background-color: rgba(0, 0, 0, 0.1);
      color: #000;
    }
    .my_textarea {
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-bottom: 0;
      background-color: rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
      resize: none;
      outline: none;
      width: 100%;
      line-height: 16px;
      font-size: 14px;
      padding: 12px;
      color: #000;
    }
  }
}
.iefade-enter-active,
.iefade-leave-active {
  transition: opacity 0.5s;
}
.iefade-enter,
.iefade-leave-to {
  opacity: 0;
}
.platform_mobile {
  .input_outer .error {
    width: auto;
  }
}
</style>
