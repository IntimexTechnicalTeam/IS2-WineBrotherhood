<template>
    <li class="ReSearchItem">
        <p class="category">
          {{searchGroup.Name}}
            <i class="el-icon-arrow-up"  @click="isOpen = !isOpen" v-if="!isOpen"></i>
            <i class="el-icon-arrow-down" @click="isOpen = !isOpen" v-else></i>
        </p>
        <transition name="fade">
        <ul :class="{'open': isOpen}" >
            <li>
                <input type="checkbox" :id="searchGroup.Name+'-All'" v-model="isAll" @click="checkAll($event,searchGroup)">
                <label :for="searchGroup.Name+'-All'" >{{$t('Message.All')}}</label>
            </li>
            <li v-for="(child, index2) in (searchType === 1 ? searchGroup.AttrValues : searchType === 2 ? searchGroup.Children : [])" :key="index2">
                <input type="checkbox" :id="child.Name+index2" :value="child.Id" v-model="checkedValue" @click="selectAttr(searchGroup)">
                <label :for="child.Name+index2">{{child.Name}}</label>
            </li>
            <!-- <i class="el-icon-plus" @click="isOpen = !isOpen" v-if="!isOpen"></i>
            <i class="el-icon-minus" @click="isOpen = !isOpen" v-else></i> -->
        </ul>
        </transition>
    </li>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
export interface attrItem {
  Id: number,
  Vals: number[]
}
@Component
export default class InsAdvancedSearch extends Vue {
    @Prop({ default: () => {} }) private searchGroup!: any;
    @Prop({ default: () => [] }) private defaultSelected!: number[];
    @Prop({ default: 1 }) private searchType!: number; // 搜索数据类型（1 => 产品属性， 2 => 产品目录）

    isOpen: boolean = false; // 是否展开
    isAll: boolean = false; // 是否全选
    checkedValue: number[] = []; // 选中的产品属性值
    selectedAttrs: attrItem[] = []; // 选中的产品属性值
    showSubmeun () {
      this.isOpen = !this.isOpen;
    }
    //  全选（产品属性）
    checkAll (e, attr) {
      console.log('checkAll');
      let a = e.target.checked;
      if (e.target.checked) {
        this.checkedValue = [];
        if (this.searchType === 1) {
          attr.AttrValues.forEach(element => {
            this.checkedValue.push(element.Id);
          });
          this.$emit('changeSelect', attr.Id, this.checkedValue);
        } else if (this.searchType === 2) {
          console.log('产品目录全选');
          attr.Children.forEach(element => {
            this.checkedValue.push(element.Id);
          });
          this.$emit('changeSelect', attr.Id, this.checkedValue);
        }
      } else {
        this.checkedValue = [];
        this.$emit('changeSelect', attr.Id, this.checkedValue);
      }
    }

    //  单属性选择（产品属性）
    selectAttr (item) {
      console.log(item, '单属性选择（产品属性）');
      setTimeout(() => {
        if (this.searchType === 1) {
          if (this.checkedValue.length !== this.searchGroup.AttrValues.length) {
            this.isAll = false;
          } else {
            this.isAll = true;
          }
          this.$emit('changeSelect', item.Id, this.checkedValue);
        } else if (this.searchType === 2) {
          console.log(item.Id, '改变的产品目录id');
          if (this.checkedValue.length !== this.searchGroup.Children.length) {
            this.isAll = false;
          } else {
            this.isAll = true;
          }
          this.$emit('changeSelect', item.Id, this.checkedValue);
        }
      }, 1);
    }

    created () {
      if (this.defaultSelected.length) {
        if (this.searchType === 1) {
          if (this.defaultSelected.length === this.searchGroup.AttrValues.length) {
            this.isAll = true;
          }
        } else if (this.searchType === 2) {
          if (this.defaultSelected.length === this.searchGroup.Children.length) {
            this.isAll = true;
          }
        }
        this.checkedValue = this.defaultSelected;
      }
    }
}
</script>
<style scoped lang="less">
.ReSearchItem {

      p.category {
        width: 100%;
        font-size:20px;
        color: #333333;
        background-color: #FFF;
        display: flex;
        justify-self: start;;
        align-items: center;
        flex-shrink: 0;
        padding-top: 20px;
        padding-bottom: 20px;
        position: relative;
        i{
          position: absolute;
          right: 0px;
          top: 20px;
          font-size: 1.6rem;
        }
    }

     >ul {
       transition: all 3s;
        >li {
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding-right: 1rem;
            input[type="checkbox"] {
                width: 18px;
                height: 18px;
                background-color: #fff;
                -webkit-appearance:none;
                border: 1px solid #cccccc;
                outline: none;
            }

            input[type="checkbox"]:checked {
                border: 1px solid #666666;
                background-image: url('/images/mobile/checked.png'); /*复选框的背景图*/
                background-repeat: no-repeat;
                background-position: center;
                background-size: auto;

                &+label {
                    color: #000;
                }
            }

            label {
            font-size: 18px;
            color: #666666;
            width: 90%;
            margin-left: 5px;
            }
        }

        i {
            position: absolute;
            font-size: 26px;
            right: 18px;
            top: 18px;
        }

        &.open {
                display: none;
                transition: all 3s;
        }
    }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
