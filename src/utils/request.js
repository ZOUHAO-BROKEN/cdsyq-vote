//import Fly from 'flyio';
import constants from './constants'
import {MODE} from './config';

//var fly = new Fly();


// https://www.easy-mock.com/mock/59afaafbe0dc6633419ef0be/rn/rn

// fly.interceptors.response.use(
//   function(response) {
//     //不要使用箭头函数，否则调用this.lock()时，this指向不对
//     if (response.status == '503') {
//       wx.showToast({
//         title: '疯狂运转中，请稍后再试',
//         // icon: 'fail',
//         duration: 1000
//       });
//       return
//     } else if (response.data.Data && response.data.Data.responseCode != '0') {
//       wx.showToast({
//         title: response.data.Data.responseMsg,
//         // icon: 'fail',
//         duration: 1000
//       });
//       return
//     }
//   },
//   function(err) {
//     console.log('error-interceptor', err);
//   }
// );

function sendRequest(method, url, data) {
  return new Promise(resolve => {
    wx.request({
      url,
      data,
      method,
      success: function (response) {
        if (response.status == '503') {
          wx.showToast({
            title: '疯狂运转中，请稍后再试',
            // icon: 'fail',
            duration: 2000
          });
          return
        } else if (response.data && response.data.responseCode != '0') {
          wx.showToast({
            title: response.data.responseMsg ? response.data.responseMsg : '异常错误',
            icon: 'none',
            duration: 2000
          });
          return
        }
        resolve(response.data.responseData)
      }
    })
  });
}

function getRequestUrl(transaction_id) {
  console.log('transaction_id', transaction_id);
  switch (MODE) {
    case 'prod':
      return constants[MODE].URL + "/" + transaction_id;
    default:
      // return `${constants[MODE].URL}mock/59afaafbe0dc6633419ef0be/rn/${transaction_id}`;
      return constants[MODE].URL + "/" + transaction_id;

  }
}

/**
 * 查询所有队伍
 * @param params
 * @returns {Promise<any>}
 */
export function getAllTeam(params = {}) {
  return sendRequest('GET', getRequestUrl('team/getAllTeam'))
}

export function voteTeam(params = {}) {
  return sendRequest('POST', getRequestUrl('team/vote'), params)
}

export function votePlayer(params = {}) {
  return sendRequest('POST', getRequestUrl('player/vote'), params)
}

export function getStaticUrl(url) {
  return "https://ccbynt.cn/khxxurl/static/" + url
}