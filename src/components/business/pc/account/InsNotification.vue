<template>
  <div id="container" class="NotificationMain" style="padding-bottom:50px;">
    <accountHeader />
    <div class="maincontent">
      <p class="pageTitle">{{ $t("Notification.MyMessages") }}</p>
      <div id="main-content">
        <!-- 信箱选项栏 -->
        <Card shadow="hover" class="MessageHeader">
          <Row class="MessageRow">
            <ElCol :md="16" :xs="16"
              >{{ $t("Notification.TotalRecQtyWithSymbol") }}{{ TotalNum }}
              {{ $t("Notification.UnreadWithSymbol") }}{{ MessageQty }}</ElCol
            >
            <ElCol :span="8">
              <ElButton type="success" @click="changeStatus()">{{
                $t("Notification.MsgMarkAsRead")
              }}</ElButton>
            </ElCol>
          </Row>
        </Card>
        <!-- 信箱列表开始 -->
        <Card shadow="hover">
          <Table
            :data="allMessage"
            style="width: 100%"
            :header-cell-style="tableHeader"
            :empty-text="$t('Input.nomessage')"
          >
            <TableColumn type="expand">
              <template slot-scope="props">
                <ElForm label-position="left" inline class="demo-table-expand">
                  <FormItem>
                    <span>{{ props.row.Subject }}</span>
                  </FormItem>
                  <FormItem>
                    <span v-html="props.row.Content"></span>
                  </FormItem>
                </ElForm>
              </template>
            </TableColumn>
            <TableColumn
              :label="$t('Notification.Check')"
              min-width="60"
              align="center"
            >
              <template slot-scope="props">
                <Checkbox
                  @change="!markMsgAsRead(props.row.Id)"
                  prop="Id"
                ></Checkbox>
              </template>
            </TableColumn>
            <TableColumn
              :label="$t('Notification.Id')"
              align="center"
              width="100"
            >
              <template slot-scope="props"
                ><span
                  >{{ props.$index + (CurrentPage - 1) * pageNumber + 1 }}
                </span></template
              >
            </TableColumn>
            <TableColumn
              :label="$t('Notification.MsgSender')"
              prop="FromDisplay"
            ></TableColumn>
            <TableColumn
              :label="$t('Notification.MsgSubject')"
              prop="Subject"
            ></TableColumn>
            <TableColumn
              :label="$t('Notification.MsgSenderDate')"
              prop="CreateDateStr"
            ></TableColumn>
            <TableColumn
              :label="$t('Notification.MsgReadStatus')"
              prop="IsRead"
              :formatter="IsReadFilter"
              :filters="[
                { text: $t('Notification.Unread'), value: false },
                { text: $t('Notification.Read'), value: true }
              ]"
              :filter-method="filterTag"
              filter-placement="bottom-end"
            ></TableColumn>
          </Table>
          <inPage
            v-model="CurrentPage"
            :total="TotalRecord"
            :pageNum="pageNumber"
            styla="margin-top:20px;"
            v-show="TotalRecord > 0"
          ></inPage>
        </Card>
        <!-- 信箱列表结束 -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import {
  Loading,
  Card,
  Row,
  Col as ElCol,
  Table,
  TableColumn,
  FormItem,
  Button as ElButton,
  Form as ElForm,
  Checkbox
} from 'element-ui';
@Component({
  components: {
    accountHeader: () =>
      import('@/components/hkTasteBusiness/pc/account/accountHeader.vue'),
    inPage: () => import('@/components/base/pc/InsPage.vue'),
    Card,
    Row,
    ElCol,
    Table,
    TableColumn,
    FormItem,
    ElButton,
    ElForm,
    Checkbox
  }
})
export default class InsNotification extends Vue {
  multipleSelection: any = [];
  ShowUnRead: boolean = false;
  private CurrentPage: number = 1;
  private pageNumber: number = 12;
  TotalRecord: number = 0; // 总条目数
  checkAll: boolean = false;
  tableHeader: any = {
    background: '#eef1f6',
    color: '#606266'
  };
  allMessage: any[] = [];
  mPager = {
    Condition: {
      MemberId: '',
      QueryBgDtStr: '',
      QueryEdDtStr: '',
      Url: '',
      Sku: '',
      OrderId: undefined,
      IsRead: undefined,
      SendType: undefined
    },
    PageInfo: {
      Page: 1,
      PageSize: 5
    }
  };
  MessageQty: string = '';
  TotalNum: string = '';
  strId: any = [];
  selectChange(id) {
    console.log(id);
  }
  getMsgQty() {
    let that = this;
    this.$Api.messageApi.getUnreadMsgList(that.mPager).then(result => {
      that.MessageQty = result.data.ReturnValue.TotalRecord;
    });
  }
  getAllMessage() {
    let that = this;
    that.mPager.PageInfo.Page = this.CurrentPage;
    that.mPager.PageInfo.PageSize = this.pageNumber;
    this.$Api.messageApi.getAllMsgList(that.mPager).then(result => {
      that.allMessage = result.data.ReturnValue.Data;
      that.TotalRecord = result.data.ReturnValue.TotalRecord;
    });
  }
  markMsgAsRead(id) {
    let that = this;
    this.strId.push(id);
  }
  changeStatus() {
    if (this.strId !== '') {
      this.$Api.messageApi.markedMessageAsRead(this.strId).then(result => {
        if (result) {
          this.$message({
            message: this.$t('Notification.UpdateSucceeded') as string,
            type: 'success',
            customClass: 'messageboxNoraml'
          });
          this.getAllMessage();
          this.getMsgQty();
        }
      });
    }
  }

  mounted() {
    this.getAllMessage();
    this.getMsgQty();
  }
  IsReadFilter(row, column) {
    return row.IsRead === false
      ? (this.$t('Notification.Unread') as string)
      : (this.$t('Notification.Read') as string);
  }
  filterTag(value, row) {
    return row.IsRead === value;
  }
  @Watch('CurrentPage')
  onPageChange(o, n) {
    this.getAllMessage();
  }
}
</script>
<style lang="less">
.messageboxNoraml{
  z-index: 1000000000!important;
}
</style>
<style lang="less">
/*我的最爱*/
#container .el-form-item__content {
  text-align: left;
}
.pageNum {
  margin-top: 30px;
}
.MessageHeader {
  margin-bottom: 20px;
}
.el-card .el-card__body {
  padding: 10px !important;
}
.MessageRow div {
  line-height: 40px;
  color: #606266 !important;
}
.MessageRow div:last-child {
  text-align: right;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
.demo-table-expand .el-form-item:nth-child(1) span {
  font-size: 18px;
}
.NotificationMain
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: #8dc11f;
}
</style>
