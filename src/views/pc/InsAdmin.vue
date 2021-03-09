<template>
  <Container>
    <Main>
      <Row>
        <ElCol :span="24">
          <div class="grid-content bg-purple-dark" style="text-align: center;line-height:  200px;">
            <!-- <a v-on:click="loginAdmin">Login Management System</a> -->
            <ElButton
              type="primary"
              icon="el-icon-menu"
              v-on:click="loginAdmin"
            >Login Management System</ElButton>

          </div>
          <Alert v-if="opened" title="已經自動在新窗口打開後台管理系統，如果沒有，請檢查瀏覽器是否禁止打開新的窗口，或者嘗試點擊上面的按鈕重試！" type="info"></Alert>
        </ElCol>
      </Row>
    </Main>
  </Container>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AdminLoginUrl, AutoOpenAdmin } from '../../sdk/common/SysConst';
import { Container, Main, Row, Col as ElCol, Button as ElButton, Alert } from 'element-ui';
@Component({ components: { Container, Main, Row, ElCol, ElButton, Alert } })
export default class InsAdmin extends Vue {
  private opened: Boolean = false;
  loginAdmin () {
    // window.open(AdminLoginUrl, '_blank');
  }
  mounted () {
    console.log('admin mounted');
    if (AutoOpenAdmin) {
      window.location.href = AdminLoginUrl;
      this.opened = true;
    }
  }
}
</script>
