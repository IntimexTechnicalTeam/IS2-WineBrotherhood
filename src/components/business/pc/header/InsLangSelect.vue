<template>
    <div class="btn">
        <span>
        <a href="javascript:;" @click="changLange('C')">繁</a>
        </span> |
        <span>
        <a id="eng" href="javascript:;" @click="changLange('E')">ENG</a>
        </span>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Cookie from 'js-cookie';
@Component
export default class InsLangSelect extends Vue {
  private changLange (lang) {
    this.$Api.member.setUILanguage(lang === 'zh' ? 'C' : 'E').then((result) => {
      this.$i18n.locale = lang;
      // console.log(this.hhh, this.$t('test'),'test');
      localStorage.setItem('locale', lang);
      this.$message({
        message: this.$t('changeLangSuccess') as string,
        type: 'success',
        customClass: 'messageboxNoraml'
      });
    }).catch((error) => {
      console.log(error);
    });
  }
}
</script>
<style lang="less">
.messageboxNoraml{
  z-index: 1000000000!important;
}
</style>
<style scoped lang="less">
.btn {
  border-radius: 5px;
  width: 120px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  display: inline-block;
  text-align: center;
  font-size: 12px;
  margin: 0 auto;
  margin-left: 8px;

  span a {
    color: #000;
    padding: 0px 5px;
  }
}
</style>
