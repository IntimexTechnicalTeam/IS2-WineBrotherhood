<template>
  <div class="in_tab_warpper">
    <div class="in_tab_header" :style="headerStyla">
      <div
        class="in_tab_header_item"
        :class="{'in_tab_header_click':index===Current}"
        v-for="(item,index) in tabs.Tabs"
        :key="index"
        @click="choseTab(index)"
      >{{item}}</div>
    </div>
    <!-- <div class="in_tab_content">{{tabs[Current].content}}</div> -->
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import TabInfo from '@/model/Tab';
@Component
export default class insTab extends Vue {
  // data
  private Current: number = 0;
  //   props
  @Prop() private readonly tabs!: TabInfo;
  @Prop() private readonly headerStyla!: string;
  //   method
  choseTab (i: number) {
    // if (this.tabs[i].action) {
    //   this.$emit(this.tabs[i].action);
    // } else {
    //   this.Current = i;
    // }
  }
}
</script>
<style scoped>
.in_tab_warpper {
  user-select: none;
}
.in_tab_header {
  display: flex;
}
.in_tab_header_item {
  width: 100%;
  height: 4rem;
  line-height: 4rem;
  font-size: 2rem;
  box-sizing: border-box;
  cursor: pointer;
  border: 1px solid #EBEEF5;
}
@media screen and (min-width: 800px){
  .in_tab_header_item:hover {
  box-sizing: border-box;
  border-top: 2px solid black;
}
}
.in_tab_header_click {
  box-sizing: border-box;
  border-top: 2px solid black;
}
.in_tab_content {
  padding: 3rem 3rem 5rem;
  font-size: 1.3rem;
  text-align: left;
  border-bottom: 1px solid #EBEEF5;
  border-left: 1px solid #EBEEF5;
  border-right: 1px solid #EBEEF5;
}
</style>
