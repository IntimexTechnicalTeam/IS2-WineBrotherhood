<template>
  <div id="container" class="catDetail pcCatDetail">
    <div class="DetailTitle"><img :src="ImgList"><div class="TitleBg"><div class="innerBoxText">{{CatName}}</div></div></div>
    <div class="catContent">
        <ul>
            <li v-for="(cms,index) in contentList" :key="index">
                <router-link :to="'/cms/content/'+cms.Id">
                    <div class="cover">
                        <img :src="cms.Cover" alt=""/>
                    </div>
                    <div class="introduce">
                        <p class="title">{{cms.Title}}</p>
                        <p class="createDate">{{cms.CreateDate}}</p>
                        <p class="desc">{{cms.Desc}}</p>
                        <p class="viewMore"><span>{{$t('Message.ViewDetail')}}</span></p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
     <div class="clear"></div>

      <!-- <div class="pager" v-if="totalRecord > pageSize">
        <ins-page :total="totalRecord" v-model="currentPage" :pageNum="pageSize" ></ins-page>
      </div> -->

      <div class="loading_box" ref="load" @touchstart="loading" v-if="totalRecord>pageSize">
        <span class="loading_title">{{tips?$t('Action.LoadMore'):$t('home.Thatsall')}}</span>
      </div>
      <div class="loading_box" v-else>
        <span class="loading_title">{{$t('home.Thatsall')}}</span>
      </div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Loading } from 'element-ui';
@Component({
  components: {
    // InsPage: () => import('@/components/base/mobile/InsPage.vue')
  }
})
export default class insNews extends Vue {
    contentList: object[] = []; // cms内容列表
    catId: number = 0; // Tree点击获取内容列表的目录id
    cateName:string='';
    currentPage: number = 1; // 当前页
    pageSize: number = 4; // 每页显示条目个数
    totalRecord: number = 0;// 总条目数
    private tips:boolean = true;
    private LoadingInstance!: any;
    private ImgList: string = '';
    CatName:string=''
    loading (e) {
      if (this.tips) {
        this.LoadingInstance = Loading.service({
          target: this.$refs.load as any,
          fullscreen: false,
          // spinner: 'el-icon-loading',
          text: 'Loading...'
        });
        setTimeout(() => {
          this.load();
          this.LoadingInstance.close();
        }, 2000);
      }
    }
    load () {
      if (this.totalRecord !== this.contentList.length) { this.currentPage++; } else { this.tips = false; }
    }
    // 获取cms该id下所有的cms
    getContentsByCatId (flag: string = '') {
      let catId = this.catId || this.id;
      var _this = this;
      this.$Api.cms.getContentsByCatId(catId, this.currentPage, this.pageSize).then((result) => {
        if (flag === 'loadpage') {
          this.contentList = this.contentList.concat(result.Data);
        } else {
          this.contentList = result.Data;
        }
        result.Data.forEach(function (i) {
          var newDate = new Date(i.CreateDate.replace(/-/g, '/'));
          i.CreateDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
          _this.cateName = i.Category.Name;
        });
        this.totalRecord = result.TotalRecord;
      });
    }
    getCategoryByDevice () {
      this.$Api.cms.getCategoryByDevice({ CatId: this.id, IsMobile: true }).then(async (result) => {
        this.ImgList = result.ImagePath;
        this.CatName = result.Name;
      }).catch((error) => {
        console.log(error, 'error');
        this.$message({
          message: error,
          type: 'error'
        });
      });
    }
    get id () {
      return this.$route.params.id;
    }
    get isMobile () {
      return this.$store.state.isMobile;
    }
    mounted () {
      this.getContentsByCatId();
      this.getCategoryByDevice();
    }
    @Watch('id', { deep: true })
    onIdChange () {
      this.getContentsByCatId();
    }

  @Watch('isMobile', { deep: true })
    onMediaChange () {
      this.getContentsByCatId();
    }
  @Watch('currentPage', { deep: true })
  onCurrentPage () {
    this.getContentsByCatId('loadpage');
  }
}
</script>
<style  lang="less">
.pcCatDetail{
  .noClick{
    color: #2e2e2e!important;
    background: #ead3b1!important;
    border: 1px solid #ead3b1!important;
  }
  .last, .next{
    padding: 15px 18px!important;
    margin: 0 12px;
    border-radius: 0px!important;
    cursor: pointer;
    border: 1px solid #ead3b1!important;
    background: #ead3b1!important;
    color: #2e2e2e!important;
  }
  .selectPage{
    height: 49px!important;
    border-radius: 0px!important;
    outline: 0;
    font-size: 16px;
  }
  .el-loading-spinner .circular {
    display: none;
  }
  .el-loading-text {
    font-size: 1.3rem;
    color: #cccccc;
    font-family: 'Arial';
  }
  .el-loading-parent--relative {
    > p {
      display: none;
    }
  }
}
</style>
<style scoped lang="less">
.DetailTitle{
  width: 100%;
  display: flex;
  flex-wrap:wrap;
  position: relative;
  align-items: center;
  justify-content: center;
  img{
    width: 100%;
  }
  .TitleBg{
    width: 75%;
    border: 1px solid #ffffff;
    height: 4.5rem;
    line-height: 4.5rem;
    margin: 0 auto;
    padding: 10px;
    margin-bottom: 20px;
    top: 50%;
    position: absolute;
    transform: translateY(-50%);
    .innerBoxText{
      background:#ffffff;
      color: #333333;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      font-weight: 700;
      font-family: 'Arial';
    }
  }
}
.Banner {
  width: 100%;
  height: 15rem;
  display:flex;
  align-items: center;
  position: relative;
}
.pager{
  width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.Catetitle {
  font-size: 2.52rem;
  text-align: center;
  line-height: 6.5rem;
  position: relative;
  color: #232323;
  font-weight: bold;
  // margin-bottom: 4rem;
  margin-bottom: 3rem;
  .title-img{
    width: 61%;
    position: absolute;
    bottom: 0rem;
    left: 50%;
    transform: translateX(-50%);
  }
}
    .catDetail {
        background: #fff;
        .catContent {
            width: 90%;
            margin: 0px auto;
            margin-top: 2rem;
            margin-bottom: 2rem;
            >ul{
              width: 100%;
             >li{
              //  width: 23%;
                width: 100%;
              //  float: left;
              //  margin-right: 2.66%;
              margin-bottom: 3.75rem;
              //  &:nth-child(4n){
              //    margin-right: 0%!important;
              //  }
               a{
                 display:block;
                 border:1px solid #eee;
                //  transition: all .3s ease;
                // -o-transition: all .3s ease;
                // -webkit-transition: all .3s ease;
                // -moz-transition: all .3s ease;
                //  &:hover{
                //    border:1px solid #00d0b5;
                //    .introduce{
                //      .title{
                //        color:#00d0b5;
                //      }
                //    }
                //  }
               }
               .introduce{
                 width: 90%;
                 margin: 0 auto;
                 //  padding-bottom: 20px;
                 padding-bottom: 1.6rem;
                 .title{
                  //  font-size:18px;
                   font-size: 1.5rem;
                   font-weight: bold;
                   padding-bottom: 10px;
                   border-bottom: 1px solid #eee;
                   color:#484848;
                   margin-bottom: 10px;
                   text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                    max-height: 40px;
                    margin-top: 20px;
                 }
                 .createDate{
                  //  font-size: 16px;
                  font-size: 1.2rem;
                  color:#000000;
                  padding-bottom: 10px;
                 }
                 .desc{
                  //  font-size: 14px;
                  font-size: 1.2rem;
                   color:#000000;
                  //  margin-bottom: 40px;
                  margin-bottom: 2.5rem;
                  text-overflow: -o-ellipsis-lastline;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  line-clamp: 2;
                  -webkit-box-orient: vertical;
                  // max-height: 36px;
                 }
                 .viewMore{
                   text-align: center;
                   display: inline-block;
                   width: 100%;
                   span{
                     //padding: 5px 20px;
                     padding: 0.4rem 2.8rem;
                     font-size: 1.32rem;
                     font-weight: bold;
                     background: @base_color;
                     display: inline-block;
                     color:#fff;
                   }
                 }
               }
               .cover{
                 width: 100%;
                 img{
                   width: 100%;
                 }
               }
             }
            }
            .layer {
                font-size: 16px;
            }
        }
    }
.loading_box{
  position: relative;
  text-align: center;
  margin-bottom: 7.5rem;
  margin-top: 6rem;
}
.loading_box:before{
  background:#ddd;
  content:"";
  display: block;
  height: 1px;
  position: absolute;
  top: 50%;
  width: 100%;
}
.loading_title{
  background: #fff;
  padding: 0 3rem;
  position: relative;
  z-index: 1;
  font-size: 1.5rem;
  color: #787878;
}
</style>
