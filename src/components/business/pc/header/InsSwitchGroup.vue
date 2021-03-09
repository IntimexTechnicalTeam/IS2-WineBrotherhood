<template>
  <div>
    <codeselect />
    <langSelect />
    <div class="clear"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import codeselect from './InsCodeSelect.vue';
import langSelect from './InsLangSelect.vue';

@Component({
  components: {
    codeselect,
    langSelect
  }
})
export default class InsSwitchGroup extends Vue {}
</script>
<style scoped lang="less">

</style>
