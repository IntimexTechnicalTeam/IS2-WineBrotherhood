<template>
  <div class="in_select_container" :style="styla" v-if="items.length>0">
    <div class="in_select_label">{{items[0].Type.Name}}</div>
    <div class="in_select_warpper">
      <input type="text" style="display:none;" v-model="Value" />
      <div
        class="in_select_main"
        @click="DropdownShow=!DropdownShow"
        :class="{'choised':Value,'select_focus':DropdownShow}"
      >{{Value?Value:Placeholder}}</div>
      <transition name="fade">
        <div class="in_select_dropdown" v-show="DropdownShow" @mouseleave="leftDropdown">
          <ul class="in_select_dropdown_none" v-if="None">
            <li>暂无内容</li>
          </ul>
          <ul class="in_select_dropdown_content" @click="choice">
            <li v-for="(content,index) in items" :key="index" :data-key="index">{{content.Name}}</li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import ProductAttr from '@/model/ProductAttr';
@Component
export default class InsSelect extends Vue {
  // data
  private Value: string = '';
  private RealValue: string = '';
  private AdditionalPrice: object = {};
  private None: boolean = false;
  private Content: string[] = [];
  private DropdownShow: boolean = false;
  private Placeholder = '请选择';
  //   props
  @Prop() private readonly label!: string;
  @Prop() private readonly styla!: string;
  @Prop() private readonly items!: ProductAttr[];
  //   method
  choice (e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.nodeName !== 'LI') {
      return;
    }
    this.Value = this.items[target.dataset.key as string].Name;
    this.RealValue = this.items[target.dataset.key as string].Id;
    this.AdditionalPrice = {
      TypeId: this.items[target.dataset.key as string].Type.TypeId,
      AdditionalPrice: this.items[target.dataset.key as string].AdditionalPrice
    };
    this.DropdownShow = false;
    this.$emit('input', this.RealValue);
    this.$emit('changePrice', this.AdditionalPrice);
  }
  leftDropdown (e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.nodeName === 'DIV') {
      this.DropdownShow = false;
    }
  }
  //   created
  created () {
    if (this.items.length > 0) {
      this.Value = this.items[0].Name;
      this.RealValue = this.items[0].Id;
      this.AdditionalPrice = {
        TypeId: this.items['0'].Type.TypeId,
        AdditionalPrice: this.items['0'].AdditionalPrice
      };
      this.$emit('changePrice', this.AdditionalPrice);
      this.$emit('input', this.RealValue);
    }
  }
  @Watch('items', { deep: true })
  onItemsChange () {
    if (this.items.length > 0) {
      this.Value = this.items[0].Name;
      this.RealValue = this.items[0].Id;
      this.AdditionalPrice = {
        TypeId: this.items['0'].Type.TypeId,
        AdditionalPrice: this.items['0'].AdditionalPrice
      };
      this.$emit('changePrice', this.AdditionalPrice);
      this.$emit('input', this.RealValue);
    }
  }
}
</script>
<style scoped>
.in_select_container {
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  user-select: none;
}
.in_select_label {
  width: 100px;
  font-size: 16px;
  display: flex;
  align-items: center;
  text-align: left;
}
.in_select_warpper {
  box-sizing: border-box;
  width: 200px;
  height: 40px;
  position: relative;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;

  text-align: left;
}
.in_select_main {
  font-size: 12px;
  height: 100%;
  line-height: 32px;
  color: rgba(0, 0, 0, 0.2);
  padding: 0 20px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}
.in_select_main::after {
  content: " ";
  position: absolute;
  right: 20px;
  top: 10px;
  height: 8.4px;
  width: 8.4px;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  transform-origin: 25% 75%;
  transform: rotateZ(-45deg);
}
.in_select_dropdown {
  position: absolute;
  overflow: hidden;
  box-sizing: border-box;
  width: 200px;
  background-color: white;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 2019;
}
.in_select_dropdown li {
  font-size: 12px;
  height: 32px;
  line-height: 32px;
  padding: 0 20px;
}
.in_select_dropdown li:hover {
  background: rgba(0, 0, 0, 0.1);
}
.in_select_dropdown ul {
  margin: 3px 3px 3px 3px;
}
.select_focus {
  border: 1px solid rgba(0, 0, 255, 0.2);
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.2);
}
.choised {
  color: rgba(0, 0, 0, 1);
  line-height: 40px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
  transform: translate3d(0,0,0);
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translate3d(0,0,0);
}
</style>
