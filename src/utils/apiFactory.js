import moment from 'moment';
import Axios from 'axios';

export const objectToParams = (obj) => Object.keys(obj).reduce(function (a, k) {
  if (!checkIsNullOrUndefined(obj[k])) {
    if (k === 'page') {
      const page = Number(obj[k]) >= 1 ? Number(obj[k]) - 1 : Number(obj[k]);
      a.push(`${k}=${getQueryStringValue(page)}`);
    } else {
      a.push(`${k}=${getQueryStringValue(obj[k])}`);
    }
  }
  return a;
}, []).join('&');

export function checkIsNullOrUndefined(obj) {
  return (obj === undefined || obj === 'undefined' || obj === null || obj === '');
}

export function getQueryStringValue(value) {
  const sRet = isValidDateTime(value) ? moment(value).format('YYYY/MM/DD HH:mm:ss') : value;
  return encodeURIComponent(sRet);
}

export function isValidDateTime(datetime) {
  return datetime && Object.prototype.toString.call(datetime) === '[object Date]' && !isNaN(datetime);
}

export const getHeader = () => ({
  // Authorization: getToken(),
  // cApiKey: process.env.VUE_APP_API_KEY,
  'Content-Type': 'application/json;charset=UTF-8'
})

class ApiFactory {
  /**
   * @param constantApi : {} config in ConstantAPI.MENU_CODE.ENDPOINT
   * @param payload : {} set {} when ignore
   * @param params: {} parameters list: not pass if ignore
   * @param pToken: ACCESS_TOKEN
   * */
  static callAPI(constantApi, payload = {}, params = {}, pToken = undefined) {
    const url = `${constantApi.url}/${params}`;
    const method = constantApi.method;
    const headers = getHeader()
    if (pToken) {
      headers.Authorization = pToken
    }
    return Axios({
      method: method,
      url: url,
      data: payload,
      headers: headers
    }).then(res => {
      return res.data;
    }).catch(err => {
      return Promise.reject(err)
    });
  }
}

export default ApiFactory;
