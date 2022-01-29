// 引入外部js或第三方js
export function LoadScript (src, async: boolean = false, id: string = '', site: string = 'body') { // site -> 'head', js在<head>標籤內引入； 'body'，js在<body>標籤內引入
  return new Promise((resolve, reject) => {
    if (!isInclude(src)) {
      const oScript = document.createElement('script');
      oScript.type = 'text/javascript';
      oScript.src = src;

      if (async) {
        oScript.async = true;
      }

      if (id) {
        oScript.id = id;
      }

      switch (site) {
        case 'head':
          document.getElementsByTagName('head')[0].appendChild(oScript);
          break;
        default:
          document.body.appendChild(oScript);
      }

      resolve(true);
    }
  });
}

// 判斷js是否已引入
function isInclude (name) {
  var js = /js$/i.test(name);
  var es = document.getElementsByTagName(js ? 'script' : 'link');
  for (var i = 0; i < es.length; i++) { if (es[i][js ? 'src' : 'href'].indexOf(name) !== -1) return true; }
  return false;
}

// 获取url参数
export function getQueryString (name) {
  // eslint-disable-next-line no-useless-escape
  var result = window.location.search.match(new RegExp('[\?\&]' + name + '=([^\&]+)', 'i'));
  if (result == null || result.length < 1) {
    return '';
  }
  return result[1];
}
