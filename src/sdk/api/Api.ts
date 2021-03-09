import axios from 'axios';
import Auth from '../common/Auth';
export default {
  // export default {
  //   // getData () {
  //   //   return axios.get(api.test)
  //   // }

  getData (page: any, limit: any) {
    return axios.get('https://cnodejs.org/api/v1/topics', {
      params: {
        page: page,
        limit: limit
      }
    });
  },

  getMenuData (series: number) {
    return axios.get(
      'https://www.easy-mock.com/mock/5d5a24323252771f969f089e/vt/getMenu',
      {
        params: {
          series: series
        }
      }
    );
  }
};

// export function getData (page, limit) {
//   return axios.get('https://cnodejs.org/api/v1/topics', {
//     params: {
//       page: page,
//       limit: limit
//     }
//   })
// }
