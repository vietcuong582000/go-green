import {API_DEFAULT} from "@/utils/Constant";

export const ConstantAPI = {
  'LOGIN': {
    url: `${API_DEFAULT}/auth/login`,
    method: 'POST'
  },
  'PRODUCT': {
    CREATE: {
      url: `${API_DEFAULT}/product/save`,
      method: 'POST'
    },
    GET: {
      url: `${API_DEFAULT}/product/search`,
      method: 'GET'
    },
    GET_HOME: {
      url: `${API_DEFAULT}/home/product/search`,
      method: 'GET'
    },
    GET_BY_ID: {
      url: `${API_DEFAULT}/home/product`,
      method: 'GET'
    },
    UPDATE: {
      url: `${API_DEFAULT}/product/save`,
      method: 'POST'
    },
    DELETE: {
      url: `${API_DEFAULT}/product/delete`,
      method: 'GET'
    },
    GET_LIST_EXPIRED: {
      url: `${API_DEFAULT}/product/list-order-by-expiration-date`,
      method: 'GET'
    },
    GET_LIST_WITH_KEY_AND_CATEGORY: {
      url: `${API_DEFAULT}/product/search-with-category`,
      method: 'GET'
    },
    GET_HOT_PRODUCT: {
      url: `${API_DEFAULT}/product/get-hot-product`,
      method: 'GET'
    }
  },
  'CATEGORY': {
    CREATE: {
      url: `${API_DEFAULT}/category/save`,
      method: 'POST'
    },
    GET: {
      url: `${API_DEFAULT}/category/search`,
      method: 'GET'
    },
    UPDATE: {
      url: `${API_DEFAULT}/category/save`,
      method: 'POST'
    },
    DELETE: {
      url: `${API_DEFAULT}/category/delete`,
      method: 'GET'
    }
  },
  'ORDER': {
    CREATE_HOME: {
      url: `${API_DEFAULT}/home/order/create`,
      method: 'POST'
    },
    CREATE: {
      url: `${API_DEFAULT}/order/create`,
      method: 'POST'
    },
    SEARCH: {
      url: `${API_DEFAULT}/order/search`,
      method: 'GET'
    },
    SEARCH_LIST_STATUS: {
      url: `${API_DEFAULT}/order/list-order-status`,
      method: 'GET'
    },
    GET_LIST_BY_DATE: {
      url: `${API_DEFAULT}/order/list-order-by-date`,
      method: 'GET'
    }
  }
}
