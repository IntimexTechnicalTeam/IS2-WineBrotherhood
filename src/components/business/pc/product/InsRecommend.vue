<template>
<div class="recommend_warrper">
    <ElButton type="success" @click="openDialog">{{$t('product.Recommend')}}</ElButton>
    <Dialog :title="$t('product.Recommend')" :visible.sync="dialogFormVisible" style="width: 1024px;margin: 0 auto;" @close="beforeClose">
        <Form :model="form" :rules="rules" ref="form">
            <FormItem :label="$t('Register.UserEmail')" :label-width="formLabelWidth" prop="ToEmail">
                <ElInput v-model="form.ToEmail" auto-complete="off"></ElInput>
            </FormItem>
            <FormItem :label="$t('product.Remarks')" :label-width="formLabelWidth" prop="Remark">
                <ElInput type="textarea" v-model="form.Remark"></ElInput>
            </FormItem>
        </Form>
        <div slot="footer" class="dialog-footer">
            <ElButton @click="cancel">{{$t('Message.Cancel')}}</ElButton>
            <ElButton type="primary" @click="confirm(form.ToEmail, form.Remark)">{{$t('Message.Confirm')}}</ElButton>
        </div>
    </Dialog>
</div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import { Form, FormItem, Input as ElInput, Button as ElButton, Dialog } from 'element-ui';
@Component({ components: { Form, FormItem, ElInput, ElButton, Dialog } })
export default class Recommend extends Vue {
      @Prop() private Skus!:string;
      private rules = {
        ToEmail: [
          { required: true, message: '', trigger: 'blur' }
        ],
        Remark: [
          { required: true, message: '', trigger: 'blur' }
        ]
      }
      updated () {
        this.rules.ToEmail[0].message = this.$t('Login.EnterEmail') as string;
        this.rules.Remark[0].message = this.$t('Login.EnterEmail') as string;
      }
      private dialogFormVisible:boolean = false
      private form = {
        ToEmail: '',
        Remark: ''
      }
      private formLabelWidth:string = '120px'
      cancel () {
        this.dialogFormVisible = false;
      }
      confirm (ToEmail, Remark) {
        this.$Api.member.getProfile2().then((result) => {
          // this.$Login(() => {
          // });
          return result.MemberId;
        }).then((result) => {
          this.$Api.product.SaveMemberRecommendProduct({
            MemberId: result,
            Skus: this.Skus + ',',
            ToEmail: ToEmail,
            Remark: Remark,
            IType: 1
          }).then(result => {
            this.$message(result);
          });
        }).catch((error) => {
          console.error(error);
          this.$Login(this.confirm, ToEmail, Remark);
        });
        this.dialogFormVisible = false;
      }
      openDialog () {
        this.dialogFormVisible = true;
      }
      beforeClose () {
        (this.$refs['form'] as Form).resetFields();
      }
}
</script>
<style lang="less" scoped>
.el-dialog{
    width: 512px !important;
}
.recommend_warrper{
    margin-top: 1rem;
    text-align: left;
}
</style>
