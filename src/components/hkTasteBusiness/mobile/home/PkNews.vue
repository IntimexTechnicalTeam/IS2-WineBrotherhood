<template>
  <div class="news">
    <h2>{{$t('home.News')}}</h2>
    <ul>
      <li v-for="(n,index) in lastestContents" :key="index">
        <router-link :to="'/cms/content/'+n.Id">
          <img :src="n.Cover" class="NewsPart" />
        </router-link>
        <div class="Newsbox">
          <!-- <p class="news-date">{{n.CreateDate}}</p> -->
          <p class="news-title">{{n.Title}}</p>
          <p class="news-Desc">{{n.Desc}}</p>
          <p class="more">
            <router-link :to="'/cms/content/'+n.Id">{{$t('home.More')}}</router-link>
          </p>
        </div>
      </li>
    </ul>
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
        item.CreateDate = item.CreateDate.substring(0, item.CreateDate.indexOf(' ')
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
  margin: 0 auto;
  padding-top: 5.5rem;
  padding-bottom: 3rem;
  overflow: hidden;
}
.news h2 {
  width: 100%;
  height: 100%;
  color: #8b0b04;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  font-family: 'Arial';
  margin-bottom: 2rem;
}
.news li {
  margin-bottom: 3rem;
}
.news li>a {
  width: 100%;
  // height: 19.5rem;
  background-color: #ededed;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}
.news li a img {
  width: 100%;
  // max-height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  height: 22rem;
}
.news li .news-date {
  display: inline-block;
  width: 100%;
  font-size: 1.5rem;
  color: #7e7e7e;
  text-align: left;
  height: 3rem;
  line-height: 3rem;
  margin-top: 1rem;
  border-bottom: 1px solid #bdbdbd;

}
.news li .news-title {
  width: 100%;
  font-size: 1.6rem;
  color: #000000;
  text-align: left;
  height: 4rem;
  line-height: 2rem;
  margin-top: 1rem;
  display:flex;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  font-weight: bold;
}
.news .more {
  display: block;
  width: 94%;
  margin: 0 auto;
  overflow: hidden;
}
.news .more a {
  color: #14234f;
  font-size: 1.2rem;
  float: right;
  text-decoration: underline;
  font-weight: bold;
}
.news li .Newsbox{
  padding: 0 1rem;
  box-sizing: border-box;
}
.news li .Newsbox .news-Desc{
  font-size: 1.2rem;
  color: #000000;
  line-height: 2.4rem;
  margin-bottom: 1rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  word-break: break-word;
}
</style>
