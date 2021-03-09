<template>
    <li class="ReSearchItem">
        <p class="category">
           {{searchGroup.Name}}
            <i class="el-icon-arrow-up" @click="showSubmeun" v-if="!isOpen"></i>
            <i class="el-icon-arrow-down" @click="showSubmeun" v-else></i>
        </p>
        <ul :class="{'open': isOpen}"  v-show="isOpen">
            <li>
                <label for="All">All</label>
                <input type="checkbox" id="All" v-model="isAll" @click="checkAll($event,searchGroup)">
            </li>
            <li v-for="(child, index2) in (searchType === 1 ? searchGroup.AttrValues : searchType === 2 ? searchGroup.Children : [])" :key="index2">
                 <label :for="index2">{{child.Name}}</label>
                <input type="checkbox" :id="index2" :value="child.Id" v-model="checkedValue" @click="selectAttr($event,searchGroup)">
            </li>
        </ul>
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
    isOpen: boolean = true; // 是否展开
    isAll: boolean = false; // 是否全选
    checkedValue: number[] = []; // 选中的产品属性值
    selectedAttrs: attrItem[] = []; // 选中的产品属性值
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
    selectAttr (e, item) {
      setTimeout(() => {
        if (this.searchType === 1) {
          if (this.checkedValue.length !== this.searchGroup.AttrValues.length) {
            this.isAll = false;
          } else {
            this.isAll = true;
          }
          this.$emit('changeSelect', item.Id, this.checkedValue);
        } else if (this.searchType === 2) {
          if (this.checkedValue.length !== this.searchGroup.Children.length) {
            this.isAll = false;
          } else {
            this.isAll = true;
          }
          console.log(this.checkedValue, 'cate');
          this.$emit('changeSelect', item.Id, this.checkedValue);
        }
      }, 1);
    }
    showSubmeun () {
      this.isOpen = !this.isOpen;
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
.catSearch >li:last-child{
  display: none;
}
.ReSearchItem {
    p.category {
        width: 100%;
        font-size: 20px;
        color: #333333;
        background-color: #FFF;
        display: flex;
        justify-self: start;;
        align-items: center;
        flex-shrink: 0;
        padding-top: 2rem;
        padding-bottom: 2rem;
        position: relative;
        i{
          position: absolute;
          right: 0px;
          top: 2rem;
          font-size: 20px;
        }
    }

    >ul {
        >li {
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding-right: 1rem;
            input[type="checkbox"] {
                width: 2rem;
                height: 2rem;
                background-color: #fff;
                -webkit-appearance:none;
                border: 1px solid #959595;
                outline: none;
            }

            input[type="checkbox"]:checked {
                border: 1px solid #95d600;
                background-image: url('/images/pc/checked.png'); /*复选框的背景图*/
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;

                &+label {
                    color: #95d600;
                }
            }

            label {
            font-size: 18px;
            color: #333;
            width: 90%;
            }
        }

        i {
            position: absolute;
            font-size: 26px;
            right: 18px;
            top: 18px;
        }

        &.open {
            height: auto;
        }
    }
}
</style>
