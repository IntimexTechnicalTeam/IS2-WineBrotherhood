<template>
  <div id="container">
    <accountHeader/>
    <p class="pageTitle">{{$t('MemberPoints.MemberPoints')}}</p>
    <!--main-content-->
    <div id="main-content" class="memberPointsMain">
      <!-- 头部工具条 -->
      <Card shadow="hover">
        <Row>
          <ElCol :span="24" class="memberPointsCol">
            <span>{{$t('MemberPoints.Hello')}},</span>
            <span>{{MemberName}}</span>
            <span>
              {{$t('MemberPoints.TotalPoints')}}:
              <i>{{TotalPoints}}</i>
            </span>
            <span>(1 HKD {{$t('MemberPoints.Equals')}} 1 {{$t('MemberPoints.Integral')}})</span>
          </ElCol>
        </Row>
      </Card>
      <!-- 头部工具条结束 -->

      <!-- 积分列表开始 -->
      <div class="memberPointsList"></div>
      <Card shadow="hover">
        <Tabs v-model="activeName">
          <!-- 积分详细开始 -->
          <TabPane :label="$t('MemberPoints.PointsDetail')" name="first">
            <Table
              :data="PointsData"
              style="width: 100%"
              :default-sort="{prop: 'OrderNo', order: 'descending'}"
              :header-cell-style="tableHeader"
            >
              <TableColumn prop="OrderNo" width="150" :label="$t('MemberPoints.OrderNo')" sortable></TableColumn>
              <TableColumn prop="Points"  width="150" :label="$t('MemberPoints.Points')" sortable></TableColumn>
              <TableColumn
                prop="TypeName"
                :label="$t('MemberPoints.PointsType')"
                width="150"
              ></TableColumn>
              <TableColumn prop="ModeName"  width="150" :label="$t('MemberPoints.PointsMode')"></TableColumn>
            </Table>
          </TabPane>
          <!-- 积分详细结束 -->
          <!-- 积分收入开始 -->
          <TabPane :label="$t('MemberPoints.PointsIncome')" name="second">
           <Table
              :data="IncomeData"
              style="width: 100%"
              :default-sort="{prop: 'OrderNo', order: 'descending'}"
              :header-cell-style="tableHeader"
            >
               <TableColumn prop="OrderNo" width="150" :label="$t('MemberPoints.OrderNo')" sortable></TableColumn>
              <TableColumn prop="Points"  width="150" :label="$t('MemberPoints.Points')" sortable></TableColumn>
              <TableColumn
                prop="TypeName"
                :label="$t('MemberPoints.PointsType')"
                width="150"
              ></TableColumn>
              <TableColumn prop="ModeName"  width="150" :label="$t('MemberPoints.PointsMode')"></TableColumn>
            </Table>
          </TabPane>
          <!-- 积分收入结束 -->
          <!-- 积分支出开始 -->
          <TabPane :label="$t('MemberPoints.PointsSpending')" name="third">
             <Table
              :data="SpendingData"
              style="width: 100%"
              :default-sort="{prop: 'OrderNo', order: 'descending'}"
              :header-cell-style="tableHeader"
            >
               <TableColumn prop="OrderNo" width="150" :label="$t('MemberPoints.OrderNo')" sortable></TableColumn>
              <TableColumn prop="Points"  width="150" :label="$t('MemberPoints.Points')" sortable></TableColumn>
              <TableColumn
                prop="TypeName"
                :label="$t('MemberPoints.PointsType')"
                width="150"
              ></TableColumn>
              <TableColumn prop="ModeName"  width="150" :label="$t('MemberPoints.PointsMode')"></TableColumn>
            </Table>
          </TabPane>
          <!-- 积分支出结束 -->
          <Pagination
            layout="prev, pager, next"
            :page-size="pagesize"
            @current-change="currentChange"
            @size-change="handleSizeChange"
            :current-page.sync="currentPage"
            :total="dataLength"
            class="pageCount"
            :pager-count="5"
            v-if="dataLength>1"
            background
          ></Pagination>
        </Tabs>
      </Card>
      <!-- 积分列表结束 -->

      <!-- 积分说明开始 -->
      <Card shadow="hover" class="pointsDetail">
        <h2>積分使用常見問題</h2>
        <p>1.積分的兌換比例</p>
        <p>積分和港幣兌換比例是1:1，即1積分相當於港幣1元。</p>
        <p>2.積分如何獲取</p>
        <p>用戶在網上商城進行購物時，成功購買商品則獲得相應金額的積分。</p>
        <p>3.積分如何扣除</p>
        <p>用戶在網上商城進行購物時，使用積分抵扣。</p>
      </Card>
      <!-- 积分说明结束 -->
    </div>
    <!--main-content-->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Card, Pagination, TableColumn, Tabs, TabPane, Table, Row, Col as ElCol } from 'element-ui';
import sdk from '@/sdk/InstoreSdk';
@Component({
  components: {
    accountHeader: () => import('@/components/hkTasteBusiness/mobile/account/accountHeader.vue'),
    Card,
    Pagination,
    TableColumn,
    Tabs,
    TabPane,
    Table,
    Row,
    ElCol
  }
})
export default class InsPoints extends Vue {
  activeName: string = 'first';
  currentPage: number = 1;
  pagesize: number = 3;
  dataLength: any = '';
  PointsData:any[]= [];
  TotalNum:any='';
  IncomeNum:any='';
  SpendingNum:any='';
  IncomeData:any[]=[];
  SpendingData:any[]=[];
  tableHeader: Object = {
    background: '#eef1f6',
    color: '#606266'
  };
   MemberName:string='';
   TotalPoints:string='';
   // 改变当前页
   currentChange (currentPage) {
     var that = this;
     that.currentPage = currentPage;
     console.log(currentPage, 'currentPage');
     if (that.activeName === 'first') {
       this.getAllDetail();
     }
     if (that.activeName === 'second') {
       this.getIncomePoints();
     }
     if (that.activeName === 'third') {
       this.getSpendingPoints();
     }
   }
   // 点击上一页和下一页的时事件
   handleSizeChange (psize) {
     this.pagesize = psize;
   }
   // 获取会员信息
   getMemberInfo () {
     let _this = this;
     sdk.api.member.getAccount().then(
       function (data) {
         _this.MemberName = data.FullName;
       }
     );
   }

   // 获取会员总积分
   getMemberTotal () {
     this.$Api.pointsApi.GetMemberTotalPointsInfo().then((result) => {
       this.TotalPoints = result.data.TotalPoints;
     });
   }

   getAllDetail () {
     return this.$Api.pointsApi.GetPointslDetail({ Mode: 0 }).then((result) => {
       let r = result.data.Data;
       this.PointsData = r.length ? r.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize) : [];
       this.TotalNum = result.data.TotalRecord;
     });
   }

   getIncomePoints () {
     return this.$Api.pointsApi.GetPointslDetail({ Mode: 1 }).then((result) => {
       let s = result.data.Data;
       this.IncomeData = s.length ? s.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize) : [];
       this.IncomeNum = result.data.TotalRecord;
     });
   }

   getSpendingPoints () {
     return this.$Api.pointsApi.GetPointslDetail({ Mode: 2 }).then((result) => {
       let p = result.data.Data;
       this.SpendingData = p.length ? p.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize) : [];
       this.SpendingNum = result.data.TotalRecord;
       console.log(result, 'result');
       console.log(this.SpendingData, 'PointsData');
     });
   }

   async created () {
     // 初始化的时候获取第一个的分页总数
     let that = this;
     this.getMemberInfo();
     this.getMemberTotal();
     this.getAllDetail().then(reslut => {
       if (that.activeName === 'first') {
         that.dataLength = that.TotalNum;
       }
     });
     this.getIncomePoints().then(reslut => {
       if (that.activeName === 'second') {
         that.dataLength = that.IncomeNum;
       }
     });
     this.getSpendingPoints().then(reslut => {
       if (that.activeName === 'third') {
         that.dataLength = that.SpendingNum;
       }
     });
   }
  // 通过监听Tab的变化，获取不同的数组的总数来分页
  @Watch('activeName', { deep: true })
   function (o, n) {
     let that = this;
     if (that.activeName === 'first') {
       this.getAllDetail();
       that.dataLength = that.TotalNum;
     }
     if (that.activeName === 'second') {
       this.getIncomePoints();
       that.dataLength = that.IncomeNum;
     }
     if (that.activeName === 'third') {
       this.getSpendingPoints();
       that.dataLength = that.SpendingNum;
     }
   }
}
</script>
<style lang="less" scoped>
.memberPointsMain {
  width: 95%;
  margin: 0 auto;
  margin-top: 60px;
  font-size: 16px;
}
.pointsDetail {
  margin-top: 30px;
  text-align: left;
}
.pointsDetail h2 {
  font-size: 18px;
  margin-bottom: 10px;
}
.pointsDetail p {
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 14px;
}
.pageCount {
  margin-top: 30px;
}
.memberPointsList {
  margin-top: 30px;
}
.el-table .warning-row {
  background: oldlace;
}
.memberPointsCol {
  text-align: left;
  color: #666;
}
.memberPointsCol span:nth-child(2),
.memberPointsCol span:nth-child(3) > i {
  color: red;
  font-style: normal;
  padding-right: 10px;
}
.memberPointsCol span:nth-child(4) {
  color: #ccc;
  font-size: 13px;
}
</style>
