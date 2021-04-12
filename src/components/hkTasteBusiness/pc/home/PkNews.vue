<template>
  <div class="news">
    <h2>{{$t('home.News')}}</h2>
    <ul>
      <li v-for="(n,index) in lastestContents" :key="index">
        <router-link :to="'/cms/content/'+n.Id">
          <img :src="n.Cover" class="NewsPart" />
        </router-link>
        <!-- <p class="news-date">{{n.CreateDate}}</p> -->
        <p class="news-title">{{n.Title}}</p>
        <p class="news-Desc">{{n.Desc}}</p>
      </li>
    </ul>
    <p class="more">
      <router-link to="/cms/catDetail/40113">{{$t('home.More')}}</router-link>
    </p>
  </div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class PkNews extends Vue {
  lastestContents: any[] = [];
  getNews () {
    var cond = {
      Page: 1,
      PageSize: 3,
      catId: 40113
    };
    this.$Api.cms.getLastestContents(cond).then(result => {
      result.Data.forEach(function (item) {
        item.CreateDate = item.CreateDate.substring(
          0,
          item.CreateDate.indexOf(' ')
        );
      });
      this.lastestContents = result.Data;
    });
  }
  mounted () {
    this.getNews();
  }
}
</script>

<style scoped lang="less">
.news {
  width: 100%;
  /*height:800px;*/
  padding-bottom: 68px;
  padding-top: 34px;
  box-sizing: border-box;
}
.news h2 {
  font-size: 40px;
  color: #fff;
  text-align: center;
  margin-bottom: 65px;
  font-weight: bold;
}
.news ul {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.news li {
  width: 348px;
  margin-right: 78px;
  float: left;
  box-sizing: border-box;
}
.news li:nth-child(3n) {
  margin-right: 0;
}
.news li a {
  display: block;
  width: 100%;
  height: 348px;
  background-color: #ededed;
  display: flex;
  justify-content: center;
  align-items: center;
}
.news li a img {
  width: 100%;
  height: 100%;
  display: block;
  object-position: 50% 50%;
  object-fit: cover;
}
.news li .news-date {
  display: inline-block;
  width: 100%;
  font-size: 16px;
  color: #7e7e7e;
  text-align: left;
  height: 48px;
  line-height: 60px;
  border-bottom: 1px solid #bdbdbd;
}
.news li .news-title {
  width: 100%;
  font-size: 18px;
  color: #ffffff;
  text-align: left;
  height: 40px;
  line-height: 20px;
  margin-top: 26px;
  display: flex;
  display: -webkit-box;
  display: -moz-box;
  line-clamp: 2;
  -moz-line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  font-weight: bold;
}
.news li .news-Desc{
  display: inline-block;
  width: 100%;
  font-size: 16px;
  color: #ffffff;
  text-align: left;
  line-height: 24px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  word-break: break-word;
}
.news .more {
  display: block;
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  margin-top: 25px;
}
.news .more a {
  color: #fff;
  font-size: 16px;
  float: right;
  text-decoration: underline;
  font-weight: bold;
}
</style>
