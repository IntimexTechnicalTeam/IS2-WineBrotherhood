<template>
 <div class="accountHeader">
    <div class="memberBg">
        <div class="innerBox">
            <p class="memberCenterTitle">{{$t('Account.MemberCenter')}}</p>
            <div class="leftside">
              <p>{{MemberName}}</p>
              <div class="leftnav">
                <router-link to="/account/memberInfo" class="iconBg"><div class="innerStyle"><span>{{$t('Account.MemberInformation')}}</span></div></router-link>
                <router-link to="/order/List" class="iconBg" ><div class="innerStyle"><span>{{$t('Account.MyOrder')}}</span></div></router-link>
                <router-link to="/account/notification" class="iconBg"><div class="innerStyle"><span>{{$t('Account.MyMessages')}}</span></div></router-link>
                <router-link to="/account/myFavorite" class="iconBg"  ><div class="innerStyle"><span>{{$t('Account.MyFavorite')}}</span></div></router-link>
                <router-link to="/account/myCoupon" class="iconBg" ><div class="innerStyle"><span>{{$t('MyCoupon.MyCoupon')}}</span></div></router-link>
              </div>
            </div>
        </div>
    </div>
 </div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
import sdk from '@/sdk/InstoreSdk';
@Component
export default class accountHeader extends Vue {
   MemberName:string='';
   TotalPoints:string='';
   // 获取会员信息
   getMemberInfo () {
     let _this = this;
     sdk.api.member.getProfile().then(
       function (data) {
         console.log(data, 'datadata');
         _this.MemberName = data.FirstName + '  ' + data.LastName;
       }
     );
   }
   // 获取会员总积分
   getMemberTotal () {
     this.$Api.pointsApi.GetMemberTotalPointsInfo().then((result) => {
       this.TotalPoints = result.data.TotalPoints;
     });
   }
   get currentlang () {
     return this.$i18n.locale;
   }
   mounted () {
     this.getMemberInfo();
     this.getMemberTotal();
   }
}
</script>

<style scoped lang="less">
/*頁面中間目錄*/
ul,li{
    list-style: none;
}
.clear{
    clear: both;
}
.router-link-active{
    border:1px solid #fff;
    background-size: contain;
    float: left;
    width: 200px!important;
    height: 120px!important;
    text-align: center;
    padding: 10px;
    .innerStyle{
      background: #fff;
      display: block;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
   span{
    font-weight: 600!important;
  }
}
.iconBg{
    border:1px solid #fff;
    background-size: contain;
    float: left;
    width: 180px;
    height: 111px;
    text-align: center;
    padding: 10px;
    .innerStyle{
      background: #fff;
      display: block;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &:hover{
      transform: translateY(-3px);
    }
  span{
    width: 100%;
    display: inline-block;

    color:#191919;
    font-size: 20px;
    font-weight: 500;
    text-transform:uppercase;
     padding: 10px;
  }
  strong{
    width: 100%;
    display: inline-block;
    color: #262626;
    font-size: 24px;
    font-weight: 600;
  }
  b{
    width: 100%;
    display: inline-block;
    color: #262626;
    font-size: 14px;
    font-weight: 600;
  }
}
.accountHeader{
    width: 100%;
    display: flex;
    .memberBg{
      background: url('/images/pc/pcindex_05.jpg') no-repeat center center;
      background-size: 100% 100%;
      box-sizing: border-box;
      display: inline-block;
      width: 100%;
      padding-top: 30px;
      padding-bottom: 30px;
      .innerBox{
        width: 1200px;
        margin: 0 auto;
        .memberCenterTitle{
          font-weight: 700;
          font-size: 40px;
          text-align: center;
          padding-top: 30px;
          color:#FFF;
          text-transform:uppercase;
        }
        .leftside{
          width: 100%;
          padding-top: 30px;
          p{
            font-size: 24px;
            color:#FFF;
            margin-bottom: 30px;
          }
          a{
            display: inline-block;
            margin-right: 15px;
            &:last-child{
              margin-right: 0px!important;
            }
            img{
              width: 100%;
            }
          }
        }
        .rightside{
          width: 10%;
          float: left;
          text-align: right;
          img{
               display: inline-block;
          }
        }

      }
    }
}

</style>
