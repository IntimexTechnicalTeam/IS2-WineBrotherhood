import Vue from 'vue';
import Router from 'vue-router';
import storage from './sdk/common/Storage';
// import Auth from './sdk/common/Auth';
// import lang from './lang/index';
// import Home from './views/Home.vue';
// let userAgent:string = '';
// if (navigator.userAgent.indexOf('iPhone') !== -1 || navigator.userAgent.indexOf('Android ') !== -1) {
//   userAgent = 'mobile';
// } else {
//   userAgent = 'pc';
// }
Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
  return (originalPush.call(this, location) as any).catch(err => { console.log(err); });
};
export const pRoutes = [
  {
    path: '/',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */ './platform/pc/index.vue'),
    meta: {
      title: 'style3主页'
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ './views/pc/InsHome.vue')
      },
      {
        path: '/product/detail/:id',
        name: 'ProductsDetail',
        component: () =>
          import(/* webpackChunkName: "product" */ './views/pc/InsProductDetail.vue')
      },
      {
        path: '/product/search/:key',
        name: 'productSearch',
        component: () =>
          import(/* webpackChunkName: "product" */ './views/pc/InsProductSearchN.vue'),
        props: (route) => ({
          attrs: route.query.attrs,
          catalogs: route.query.catalogs,
          type: route.query.type
        }),
        meta: {
          title: 'Product'
        }
      },
      {
        path: '/product/cat/:catId?',
        name: 'product',
        component: () =>
          import(/* webpackChunkName: "product" */ './views/pc/InsProductCat.vue')
      },
      {
        path: '/cms/content/:id',
        name: 'cmsContent',
        component: () =>
          import(
            /* webpackChunkName: "cms" */ './components/business/pc/cms/InsCmsContent.vue'
          )
      },
      {
        path: '/cms/catDetail/:id',
        name: 'catDetail',
        component: () =>
          import(
            /* webpackChunkName: "cms" */ './components/business/pc/cms/InsCatDetail.vue'
          )
      },
      {
        path: '/account/login',
        name: 'login',
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsLoginN.vue'
          )
      },
      {
        path: '/account/register',
        name: 'register',
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsLoginN.vue'
          )
      },
      {
        path: '/account/registerSuccess',
        name: 'registerSuccess',
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsRegisterSuccess.vue'
          )
      },
      {
        // 个人中心
        path: '/account',
        name: 'memberCenter',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsMemberCenter.vue'
          ),
          children: [{
            // 个人信息
            path: 'memberInfo',
            name: 'memberInfo',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
            import(
              /* webpackChunkName: "account" */ './components/business/pc/account/InsMemberInfo.vue'
            )
          },
          {
            path: 'modifyPassword',
            name: 'modifyPassword',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/business/pc/account/InsModifyPassword.vue'
              )
          },
          {
            path: 'deliveryAddress',
            name: 'deliveryAddress',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/business/pc/account/InsDeliveryAddress.vue'
              )
          }
        ]
      },

      {
        path: '/account/myFavorite',
        name: 'myFavorite',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsMyFavorite.vue'
          )
      },
      {
        path: '/account/myCoupon',
        name: 'myCoupon',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsMyCoupon.vue'
          )
      },
      {
        path: '/account/notification',
        name: 'notification',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsNotification.vue'
          )
      },
      {
        path: '/account/shoppingcart',
        name: 'shoppingcart',
        component: () =>
          import(
            /* webpackChunkName: "account" */ './views/pc/InsShoppingCart.vue'
          )
      },
      {
        path: '/account/forgetPassword',
        name: 'forgetPassword',
        // meta: {
        //   requiresAuth: true // 是否进行登录验证
        // },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsForgetPassword.vue'
          )
      },
      {
        path: '/account/ResetPwd/:id/:code',
        name: 'ResetPwd',
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsResetPwd.vue'
          )
      },
      {
        path: '/account/checkout',
        name: 'checkout',
        meta: {
          requiresAuth: true, // 是否进行登录验证
          onlyFrom: '/account/shoppingcart'
        },
        component: () =>
          import(
            /* webpackChunkName: "checkout" */ './views/pc/InsCheckoutN.vue'
          )
      },
      {
        path: '/account/points',
        name: 'points',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsPoints.vue'
          )
      },
      {
        path: '/order/List',
        name: 'OrderList',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsOrderList.vue'
          )
      },
      {
        path: '/order/detail/:id',
        name: 'detail',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsOrderDetail.vue'
          )
      },
      {
        path: '/order/evidence/:id',
        name: 'evidence',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsOrderEvidence.vue'
          )
      },
      {
        path: '/account/orderComment/:id',
        name: 'orderComment',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsAddComments.vue'
          )
      },
      {
        path: '/account/completeCheckout/:id',
        name: 'completeCheckout',
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsCompleteCheckout.vue'
          )
      },
      // 付款状态
      {
        path: '/regnpay/form/:id',
        name: 'regnpay',
        component: () =>
        import(
          /* webpackChunkName: "rnp" */ './views/pc/InsRegAndPay.vue'
        )
      },
      {
        path: '/regnpay/result/:id',
        name: 'regnpayResult',
        component: () =>
          import(
          /* webpackChunkName: "rnp" */ './views/pc/InsRegAndPayResult.vue'
          )
      },
      {
        path: '/Payment/PaySuccess/:id',
        name: 'paymentResult',
        component: () =>
          import(
          /* webpackChunkName: "rnp" */ './views/pc/InsPaySuccess.vue'
          )
      },
      {
        path: '/payment/PayFail/:id',
        name: 'paymentFail',
        component: () =>
          import(
          /* webpackChunkName: "rnp" */ './views/pc/InsPayFail.vue'
          )
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import(/* webpackChunkName: "main" */ '@/views/pc/InsAdmin.vue')
      }
    ]
  }
];

export const mRoutes = [
  {
    path: '/',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */'./platform/mobile/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */'./views/mobile/InsHome.vue')
      },
      {
        path: '/product/detail/:id',
        name: 'ProductsDetail',
        component: () =>
          import(
            /* webpackChunkName: "product" */ './views/mobile/InsProductDetail.vue'
          )
      },
      {
        path: '/product/search/:key',
        name: 'productSearch',
        component: () =>
          import(/* webpackChunkName: "product" */ './views/mobile/InsProductSearchN.vue'),
        props: (route) => ({
          attrs: route.query.attrs,
          catalogs: route.query.catalogs,
          type: route.query.type
        }),
        meta: {
          title: 'Product'
        }
      },
      {
        path: '/product/cat/:catId?',
        name: 'productCat',
        component: () =>
          import(/* webpackChunkName: "product" */ './views/mobile/InsProductCat.vue')
      },
      // 会员中心路由开始
      {
        path: '/account/login',
        name: 'login',
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsLoginN.vue'
          )
      },
      {
        path: '/account/register',
        name: 'register',
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsLoginN.vue'
          )
      },
      {
        path: '/account/registerSuccess',
        name: 'registerSuccess',
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsRegisterSuccess.vue'
          )
      },
      {
        // 个人中心
        path: '/account',
        name: 'memberCenter',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsMemberCenter.vue'
          ),
          children: [{
            // 个人信息
            path: 'memberInfo',
            name: 'memberInfo',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
            import(
              /* webpackChunkName: "account" */ './components/business/mobile/account/InsMemberInfo.vue'
            )
          },
          {
            path: 'modifyPassword',
            name: 'modifyPassword',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/business/mobile/account/InsModifyPassword.vue'
              )
          },
          {
            path: 'deliveryAddress',
            name: 'deliveryAddress',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/business/mobile/account/InsDeliveryAddress.vue'
              )
          }
        ]
      },
      {
        path: '/account/ResetPwd/:id/:code',
        name: 'ResetPwd',
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsResetPwd.vue'
          )
      },
      {
        path: '/account/myFavorite',
        name: 'myFavorite',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsMyFavorite.vue'
          )
      },
      {
        path: '/account/myCoupon',
        name: 'myCoupon',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsMyCoupon.vue'
          )
      },
      {
        path: '/account/notification',
        name: 'notification',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsNotification.vue'
          )
      },
      {
        path: '/account/forgetPassword',
        name: 'forgetPassword',
        // meta: {
        //   requiresAuth: true // 是否进行登录验证
        // },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsForgetPassword.vue'
          )
      },
      {
        path: '/account/points',
        name: 'points',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsPoints.vue'
          )
      },
      {
        path: '/order/List',
        name: 'OrderList',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsOrderList.vue'
          )
      },
      {
        path: '/order/detail/:id',
        name: 'detail',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsOrderDetail.vue'
          )
      },
      {
        path: '/order/evidence/:id',
        name: 'evidence',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsOrderEvidence.vue'
          )
      },
      {
        path: '/account/orderComment/:id',
        name: 'orderComment',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsAddComments.vue'
          )
      },
      {
        path: '/account/shoppingcart',
        name: 'shoppingcart',
        component: () =>
          import(
            /* webpackChunkName: "account" */ './views/mobile/InsShoppingcart.vue'
          )
      },
      {
        path: '/account/checkout',
        name: 'checkout',
        meta: {
          requiresAuth: true, // 是否进行登录验证
          onlyFrom: '/account/shoppingcart'
        },
        component: () =>
          import(
            /* webpackChunkName: "checkout" */ './views/mobile/InsCheckoutN.vue'
          )
      },
      {
        path: '/account/completeCheckout/:id',
        name: 'completeCheckout',
        meta: {
          requiresAuth: true, // 是否进行登录验证
          onlyFrom: '/account/checkout'
        },
        component: () =>
          import(
            /* webpackChunkName: "checkout" */ './components/business/mobile/account/InsCompleteCheckout.vue'
          )
      },
      {
        path: '/cms/content/:id',
        name: 'cmsContent',
        component: () =>
          import(
            /* webpackChunkName: "cms" */ './components/business/mobile/cms/InsCmsContent.vue'
          )
      },
      {
        path: '/cms/catDetail/:id',
        name: 'catDetail',
        component: () =>
          import(
            /* webpackChunkName: "cms" */ './components/business/mobile/cms/InsCatDetail.vue'
          )
      },
      {
        path: '/regnpay/form/:id',
        name: 'regnpay',
        component: () =>
        import(
          /* webpackChunkName: "rnp" */ './views/mobile/InsRegAndPay.vue'
        )
      },
      {
        path: '/regnpay/result/:id',
        name: 'regnpayResult',
        component: () =>
          import(
          /* webpackChunkName: "rnp" */ './views/mobile/InsRegAndPayResult.vue'
          )
      },
      {
        path: '/Payment/PaySuccess/:id',
        name: 'paymentResult',
        component: () =>
          import(
          /* webpackChunkName: "rnp" */ './views/mobile/InsPaySuccess.vue'
          )
      },
      {
        path: '/payment/PayFail/:id',
        name: 'paymentFail',
        component: () =>
          import(
          /* webpackChunkName: "rnp" */ './views/mobile/InsPayFail.vue'
          )
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import(/* webpackChunkName: "main" */ '@/views/mobile/InsAdmin.vue')
      }
    ]
  }
];

let routers = [
  {
    path: '/',
    component: () => import('./platform/pc/index.vue')
  }
];

if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
  routers = mRoutes;
} else {
  routers = pRoutes;
}

const router = new Router({
  mode: 'history', // history
  base: process.env.BASE_URL,
  routes: routers
});

export default router;
router.beforeEach((to, from, next) => {
  if (from.name) {
    Vue.prototype.$ShowLayer();
    setTimeout(() => {
      Vue.prototype.$HiddenLayer();
    }, 500);
  }
  setTimeout(function () {
    if (to.path === '/account/login') {
      if (storage.get('isLogin')) {
        next({ path: '/home' });
      }
      next();
    } else {
      if (to.meta.requiresAuth && !storage.get('isLogin')) {
        // router.push({ path: '/account/login' });
        next({
          path: '/account/login',
          query: {
            returnurl: to.path
          }
        });
      } else if (to.meta.requiresAuth && storage.get('timeout') && storage.get('timeout') < new Date().getTime()) {
        Vue.prototype.$Login(function () { next(); });
      } else {
        next();
      }
    }
  }, 200);
});
router.beforeEach((to, from, next) => {
  if (to.meta.onlyFrom) {
    if (to.meta.onlyFrom === from.path) next();
    else next(to.meta.onlyFrom);
  } else {
    next();
  }
});
/**
 * 目前蒙层已经不会自动关闭，请在页面适当的时机自行打开。this.$HiddenLayer();
 */
/**
 * 目前所有路由均被拦截加上蒙层，防止页面抖动过大，有需要的小伙伴可以调用：this.$HiddenLayer()，在你觉得合适的时机关闭蒙层（目前我在本文档的159行设置计时器2秒后关闭蒙层）。
 * 如遇ts检测this.$HiddenLayer报找不到改属性或变量，请直接调用Vue.prototype.$HiddenLayer()。其实二者是相同的，但是TS貌似检测不到对象的原型，所以报错。
 * 关于layer配置在./init.ts上，如有需要可以自行修改，或者一起讨论如何修改。
 * */
