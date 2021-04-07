// 引入外部js
export default function LoadScript (src) {
  return new Promise((resolve, reject) => {
    if (!isInclude(src)) {
      const oScript = document.createElement('script');
      oScript.type = 'text/javascript';
      oScript.src = src;

      // document.getElementsByTagName('head')[0].appendChild(oScript);
      document.body.appendChild(oScript);

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
