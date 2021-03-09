const request = require('request');
const fs = require('fs');
const sys = require('./SysConst2.ts');
const Authorization = sys.Authorization;
const ApiServer = sys.ApiServer;
const ApiVersion = sys.ApiVersion;
var TokenOptions = {
  url: ApiServer + '/' + ApiVersion + '/token/get',
  headers: {
    Authorization:
      'Basic ' + Authorization
  }
};
var accessToken;
var allSeoList = {
  seoList: [''],
  seoItem: {}
};
allSeoList.seoList.length = 0;
request.get(TokenOptions, function (err, response, body) {
  console.log('TokenError: ' + err + '\r\n');
  accessToken = JSON.parse(response.body).access_token;
  var CMSSeoOption = {
    url: ApiServer + '/' + ApiVersion + '/seo/GetCMSSeoList',
    headers: {
      Authorization:
        'bearer ' + accessToken,
      ContentType: 'application/x-www-form-urlencoded'
    },
    form: {// form-data
      StringList: sys.FrontE.cmsSeoList
    }
  };
  var HomeSeoOption = {
    url: ApiServer + '/' + ApiVersion + '/seo/GetHomeSeoData',
    headers: {
      Authorization:
        'bearer ' + accessToken
    }
  };
  var PromotionSeoOption = {
    url: ApiServer + '/' + ApiVersion + '/seo/GetProductSeoList',
    headers: {
      Authorization:
        'bearer ' + accessToken
    },
    form: {// form-data
      StringList: sys.FrontE.productSeoList
    }
  };
  request.post(CMSSeoOption, function (error, response, body) {
    console.info('CMSError: ' + error + '\r\n');
    let data = JSON.parse(response.body).Data;
    console.info(data);
    if (data === undefined) throw new Error('CMSSeoFailed: ' + JSON.parse(response.body).Message); else console.log('CMSSeoSucceed!\r\n');
    let cmsList = [''];
    let cmsItem = {};
    if (data) {
      cmsList.length = 0;
      data.forEach(element => {
        cmsList.push('/CMS/content/' + element.Code);
        let defaultLang = 1;
        let keyword = '';
        let description = '';
        let cmstitle = '';
        keyword = element.Keyword;
        description = element.Description;
        cmstitle = element.Title;
        cmsItem['cms' + element.Code] = {
          keyword: keyword,
          description: description,
          title: cmstitle
        };
      });
    };
    allSeoList.seoList = allSeoList.seoList.concat(cmsList);
    allSeoList.seoItem = Object.assign(allSeoList.seoItem, cmsItem);
    request.get(HomeSeoOption, function (error, response, body) {
      console.info('HomeError: ' + error + '\r\n');
      let data = JSON.parse(response.body).Data;
      if (data === undefined) throw new Error('HomeSeoFailed: ' + JSON.parse(response.body).Message); else console.log('HomeSeoSucceed!\r\n');
      let homeList = [''];
      let homeItem = {};
      let keyword = '';
      let description = '';
      let hometitle = '';
      keyword = data.Keyword;
      description = data.Description;
      hometitle = data.Title;
      if (data) {
        homeList.length = 0;
        homeList.push('/');
        homeItem['home'] = {
          keyword: keyword,
          description: description,
          title: hometitle
        };
      };
      allSeoList.seoList = allSeoList.seoList.concat(homeList);
      allSeoList.seoItem = Object.assign(allSeoList.seoItem, homeItem);
      request.post(PromotionSeoOption, function (error, response, body) {
        console.info('PromotionError: ' + error + '\r\n');
        let data = JSON.parse(response.body).Data;
        if (data === undefined) throw new Error('PromotionSeoFailed: ' + JSON.parse(response.body).Message); else console.log('PromotionSeoSucceed!\r\n');
        let promotionList = [''];
        let promotionItem = {};
        let defaultLang = 1;
        if (data) {
          promotionList.length = 0;
          data.forEach(element => {
            promotionList.push('/product/detail/' + element.Id);
            let keyword = '';
            let description = '';
            let prodtitle = '';
            keyword = element.Keyword;
            description = element.Description;
            prodtitle = element.ProductName;
            promotionItem['product' + element.Id] = {
              keyword: keyword,
              description: description,
              title: prodtitle
            };
          });
        };
        allSeoList.seoList = allSeoList.seoList.concat(promotionList);
        allSeoList.seoItem = Object.assign(allSeoList.seoItem, promotionItem);
        let path = './src/sdk/common/SeoData.ts';
        fs.writeFileSync(path, 'module.exports = ' + JSON.stringify(allSeoList) + ';\r\n');
      });
    });
  });
});
