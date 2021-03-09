<template>
    <div class="InsAdvancedSearch">
        <p class="resetTitle">{{$t('home.Screening')}}<span class="el-icon-close" @click="closeSub"></span></p>
        <p class="resetAll" @click="resetAll">{{$t('home.Resetall')}}</p>
        <ul class="attrSearch" v-if="init">
            <ReSearchItem v-for="(attr, index) in attrList" :key="index" :changeVal="changeVal" :searchGroup="attr" :defaultSelected="deAttrGIds.indexOf(attr.Id) !== -1 ? selectedAttrs[deAttrGIds.indexOf(attr.Id)].Vals : []"  @changeSelect="changeAttrSelect" />
        </ul>
        <ul class="catSearch" v-if="init">
           <ReSearchItem v-for="(cat, index) in catalogs" :key="index" :searchGroup="cat" :defaultSelected="deCatGIds.indexOf(cat.Id) !== -1 ? selectedCats[deCatGIds.indexOf(cat.Id)].Vals : []" :searchType="2"  @changeSelect="changeCatSelect" />
        </ul>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
export interface attrItem {
  Id: number,
  Vals: number[]
}
@Component({
  components: {
    ReSearchItem: () => import('@/components/hkTasteBusiness/mobile/product/ReListItem.vue')
  }
})
export default class InsAdvancedSearch extends Vue {
    @Prop({ default: 2 }) private attrType!: number; // 产品属性数据类型（0 => 所有属性， 1 => 仅库存属性， 2 => 仅非库存属性）

    attrList: any[] = []; // 产品属性数据
    catalogs: any[] = []; // 产品目录数据
    checkedValue: string[] = []; // 选中的产品属性值
    selectedAttrs: attrItem[] = []; // 选中的产品属性值
    deAttrGIds: number[] = []; // url获取的选中产品属性组id
    selectedCats: attrItem[] = []; // 选中的产品目录数据
    deCatGIds: number[] = []; // url获取的选中产品目录组id
    paramCats: number[] = []; // 选中的产品目录数据传参数组
    init: boolean = false;
    changeVal!: number;
    // 获取产品库存属性
    async getAttrList (Type) {
      await this.$Api.prodAttrApi.getAttrList({ type: Type }).then((result) => {
        console.log(result, '获取产品库存属性');
        this.attrList = result;

        // if (this.selectedAttrs.length) {
        // this.setDefaultChecked();
        // }
      });
    }

    // 获取产品目录列表
    async getCatalogs () {
      await this.$Api.product.getAttrList().then((result) => {
        this.catalogs = result;
        console.log(result, '获取产品目录列表');
      });
    }

    // 关闭搜索列表
    closeSub () {
      this.$emit('closeSub');
    }
    resetAll () {
      this.$emit('resetAll');
    }
    // 设置默认选择
    setDefaultChecked () {
      console.log('设置默认选择');
      if (this.selectedAttrs.length) {
        this.selectedAttrs.forEach(element => {
          if (!element.Vals.length) {
            for (let i = 0; i < this.attrList.length; i++) {
              if (element.Id === this.attrList[i].Id) {
                this.attrList[i].AttrValues.forEach(v => {
                  element.Vals.push(v.Id);
                });
                break;
              }
            }
          }
        });
      }

      if (!this.routerType && this.selectedAttrs.length) {
        this.selectedCats = [];

        this.catalogs.forEach((element, i) => {
          this.deCatGIds.push(element.Id);
          this.selectedCats.push({
            Id: element.Id,
            Vals: []
          });

          element.Children.forEach(item => {
            this.selectedCats[i].Vals.push(item.Id);
            this.paramCats.push(item.Id);
          });
        });

        console.log(this.selectedCats, this.paramCats, '全选目录 999999');
      }

      history.pushState(`${this.$route.path}?attrs=${JSON.stringify(this.selectedAttrs)}&catalogs=${JSON.stringify(this.selectedCats)}&type=${this.routerType}`, '', '');
      this.$emit('advancedChange', this.selectedAttrs, this.paramCats);

      this.init = true;
    }

    // 根据传入的属性值获取对应的Catalog;
    // getCatalogByAttributes (cond) {
    //   return new Promise(resolve => {
    //     this.$Api.product.getCatalogByAttributes(cond).then((result) => {
    //       this.paramCats = result;
    //       resolve();
    //     });
    //   });
    // }

    // 产品属性搜索条件改变
    async changeAttrSelect (Id?, attr?) {
      let flag = 0;
      for (let i = 0; i < this.selectedAttrs.length; i++) {
        if (this.selectedAttrs[i].Id === Id) {
          flag = 1;
          if (attr.length) {
            this.selectedAttrs[i].Vals = attr;
            break;
          } else {
            this.selectedAttrs.splice(i, 1);
          }
        }
      }

      if (!flag) {
        this.selectedAttrs.push({
          Id: Id,
          Vals: attr
        });
      }

      // 根据传入的属性值获取对应的Catalog;
      // if (this.selectedAttrs.length) {
      //   var cond = {
      //     Attributes: attr
      //   };

      //   await this.getCatalogByAttributes(cond);
      // } else {
      //   this.paramCats = [];
      // }

      history.pushState(`${this.$route.path}?attrs=${JSON.stringify(this.selectedAttrs)}&catalogs=${JSON.stringify(this.selectedCats)}&type=1`, '', '');
      this.$emit('advancedChange', this.selectedAttrs, this.paramCats);
    }

    // 产品目录搜索条件改变
    async changeCatSelect (Id, cat) {
      console.log(Id, cat, 'cat');
      let flag = 0;
      for (let i = 0; i < this.selectedCats.length; i++) {
        if (this.selectedCats[i].Id === Id) {
          flag = 1;
          if (cat.length) {
            this.selectedCats[i].Vals = cat;
            break;
          } else {
            this.selectedCats.splice(i, 1);
          }
        }
      }

      if (!flag) {
        this.selectedCats.push({
          Id: Id,
          Vals: cat
        });
      }

      this.paramCats = [];
      this.selectedCats.forEach(element => {
        element.Vals.forEach(v => {
          this.paramCats.push(v);
        });
      });

      history.pushState(`${this.$route.path}?attrs=${JSON.stringify(this.selectedAttrs)}&catalogs=${JSON.stringify(this.selectedCats)}&type=1`, '', '');
      this.$emit('advancedChange', this.selectedAttrs, this.paramCats);
    }

    get routerType () {
      return JSON.parse(this.$route.query.type as string || '0');
    }

    mounted () {
      // this.getAttrList(this.attrType);
      // this.getCatalogs();

      // Promise.all([this.getAttrList(this.attrType), this.getCatalogs()]).then((result) => {
      //   console.log('33333');
      //   this.setDefaultChecked();
      // });
    }
    created () {
      if (!this.routerType) {
        let a = (JSON.parse(this.$route.query.attrs as string))[0];
        this.changeAttrSelect(a.Id, a.Vals);
        this.changeVal = a.Vals[0];
      } else {
        this.changeVal = 14;
      }
      console.log(this.changeAttrSelect, 'this.changeValthis.changeVal');
      this.selectedAttrs = JSON.parse(this.$route.query.attrs as string || '[]');
      this.selectedAttrs.forEach(element => {
        this.deAttrGIds.push(element.Id);
      });

      this.selectedCats = JSON.parse(this.$route.query.catalogs as string || '[]');
      this.selectedCats.forEach(element => {
        this.deCatGIds.push(element.Id);
        element.Vals.forEach(v => {
          this.paramCats.push(v);
        });
      });

      Promise.all([this.getAttrList(this.attrType), this.getCatalogs()]).then((result) => {
        console.log('33333');
        this.setDefaultChecked();
      });
      // let a = (JSON.parse(this.$route.query.attrs as string))[0];
      // this.changeVal = a.Vals[0];

      // if (this.deAttrGIds.length) {
      //   var cond = {
      //     Attributes: this.deAttrGIds
      //   };
      //   this.getCatalogByAttributes(cond);
      // }
    }

    @Watch('$route', { deep: true })
    onRouteChange (n, o) {
      if (!this.routerType) {
        let a = (JSON.parse(this.$route.query.attrs as string || '[]'))[0];
        this.changeAttrSelect(a.Id, a.Vals);
        this.changeVal = a.Vals[0];
      } else {
        this.changeVal = 14;
      }
    }
}
</script>
<style scoped lang="less">
.InsAdvancedSearch {
  .resetAll{
    background: #333333;
    padding-left: 1rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    color:#FFF;
    font-size: 1.6rem;
    text-decoration: underline;
  }
  .resetTitle{
    background: #666666;
    padding-left: 1rem;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    color:#FFF;
    font-size: 1.6rem;
    span{
      float:right;
      margin-right: 1rem;
      font-size: 2.5rem;
    }
  }
}
.ReSearchItem{
    position: relative;
    background: #FFF;
    padding: 1rem;
    border-bottom: 1px solid #eee;
    // &::before{
    //     content: '';
    //     width: 95%;
    //     height: 10px;
    //     background: url(/images/mobile/productList_icon.png) no-repeat center center;
    //     background-size: contain;
    //     position: absolute;
    //     top: 5px;
    //     left: 2.5%;
    //   }
    //    &::after{
    //     content: '';
    //     width: 95%;
    //     height: 10px;
    //     background: url(/images/mobile/productList_icon.png) no-repeat center center;
    //     background-size: contain;
    //     position: absolute;
    //     bottom: 5px;
    //     left: 2.5%;
    //   }
  }
</style>
