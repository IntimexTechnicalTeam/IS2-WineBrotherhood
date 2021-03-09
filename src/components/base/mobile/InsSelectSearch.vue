<template>
<div class="InsSelectSearch">
    <template v-if="type === 0">
    <p class="title">{{data.Desc}}</p>
    <Select v-model="value" placeholder="请选择" :multiple="multiple" clearable @change="changeSelect">
        <Option
        v-for="item in data.AttrValues"
        :key="item.Id"
        :label="item.Name"
        :value="item.Id"
        :disabled="item.disabled">
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
export interface attrItem {
  Id: number,
  Vals: number[]
}
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
    @Prop({ default: () => [] }) private defaultAttrs!: attrItem[];
    @Prop({ default: () => [] }) private defaultCats!: number[];

    value: any = '';

    getSelectedKeys () {
      if (!this.type) {
        let flag = 0;
        this.defaultAttrs.forEach(element => {
          if (element.Id === (this.data as any).Id && element.Vals.length) {
            if (this.multiple) {
              this.value = element.Vals;
            } else {
              this.value = element.Vals[0];
            }
            flag = 1;
          } else if (element.Id === (this.data as any).Id && this.multiple) {
            this.value = [];
            (this.data as any).AttrValues.forEach(element => {
              this.value.push(element.Id);
            });
            flag = 1;
          }
        });

        if (!flag) {
          if (this.value.length) {
            this.value = this.multiple ? [] : '';
          } else {
            this.value = '';
          }
        }
      } else {
        console.log(this.defaultCats, 'this.defaultCatsthis.defaultCatsthis.defaultCatsthis.defaultCats');
        if (this.multiple) {
          this.value = JSON.parse(JSON.stringify(this.defaultCats));
        } else {
          this.value = JSON.parse(JSON.stringify(this.defaultCats))[0];
        }
      }
    }

    changeSelect () {
      if (this.type === 0) {
        this.$emit('changeSelect', { Id: (this.data as any).Id, Vals: this.value });
      } else {
        this.$emit('changeSelect', this.value);
      }
    }

    mounted () {
      this.getSelectedKeys();
    }

    @Watch('defaultAttrs', { deep: true })
    ondefaultAttrsChange (n, o) {
      this.getSelectedKeys();
    }

    @Watch('defaultCats', { deep: true })
    ondefaultCatsChange (n, o) {
      this.getSelectedKeys();
    }
}
</script>
<style scoped lang="less">
.InsSelectSearch {
    display: inline-flex;
    align-items: center;

    .title {
        margin-right: 0.5rem;
    }

    .el-select {
      width: 10rem;
    }
}
</style>
