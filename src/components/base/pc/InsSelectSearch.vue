<template>
<div class="InsSelectSearch">
    <template v-if="type === 0">
    <p class="title">{{data.Desc}}</p>
    <Select v-model="value" placeholder="请选择" :multiple="multiple" clearable @change="changeSelect">
        <Option
        v-for="item in data.AttrValues"
        :key="item.Id"
        :label="item.Name"
        :value="item.Id">
        </Option>
    </Select>
    </template>

    <template v-if="type === 1">
    <p class="title">产品目录</p>
    <Select v-model="value" placeholder="请选择" :multiple="multiple" @change="changeSelect">
        <Option
        v-for="item in data"
        :key="item.Id"
        :label="item.Name"
        :value="item.Id">
        </Option>
    </Select>
    </template>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Select, Option } from 'element-ui';
@Component({
  name: 'InsSelectSearch',
  components: {
    Select, Option
  }
})
export default class InsSelectSearch extends Vue {
    @Prop({ default: () => {} }) private data!: object; // 选择数据
    @Prop({ default: 0 }) private type!: number; // 类型（产品属性/产品目录）
    @Prop({ default: true }) private multiple!: boolean; // 是否为多选

    value: any = '';

    // 选中的产品属性值对象数组
    get attrs () {
      return this.$route.query.attrs ? JSON.parse(this.$route.query.attrs as string) : [];
    }

    get routerType () {
      return this.$route.query.type ? JSON.parse(this.$route.query.type as string) : 0;
    }

    // url 选中目录数据
    get catalogs () {
      console.log(this.$route.query.catalogs, 'this.$route.query.catalogs');
      if (this.$route.query.catalogs) {
        return JSON.parse(this.$route.query.catalogs as string);
      } else {
        if (this.multiple) {
          return [];
        } else {
          return '';
        }
      }
    }

    changeSelect (val, flag) {
      if (this.type === 0) {
        this.$emit('changeSelect', this.value, (this.data as any).Id, flag);
      } else {
        this.$emit('changeSelect', this.value, 0);
      }
    }

    getSelectKeys () {
      if (!this.type) {
        let flag = 0;
        this.attrs.forEach(element => {
          if (element.Id === (this.data as any).Id && element.Vals.length) {
            if (this.multiple) {
              this.value = element.Vals;
            } else {
              this.value = element.Vals[0];
            }
            this.changeSelect(this.value, 1);
            flag = 1;
            console.log('1');
          } else if (element.Id === (this.data as any).Id && !this.routerType && this.multiple) {
            this.value = [];
            (this.data as any).AttrValues.forEach(element => {
              this.value.push(element.Id);
            });
            this.changeSelect(this.value, 1);
            flag = 1;
          }
        });

        if (!flag) {
          if (this.value.length) {
            this.value = this.multiple ? [] : '';
            this.changeSelect(this.value, 1);
          } else {
            this.value = '';
          }
        }
      } else {
        if (this.catalogs.length) {
          this.value = this.catalogs;
          this.changeSelect(this.value, 0);
        }
      }
    }

    mounted () {
      this.getSelectKeys();
    }

    @Watch('$route', { deep: true })
    onRouteChange (n, o) {
      if (!this.routerType) {
        this.getSelectKeys();
      }
    }
}
</script>
<style scoped lang="less">
.InsSelectSearch {
    display: inline-flex;
    align-items: center;

    .title {
      margin-right: 15px;
    }
}
</style>
