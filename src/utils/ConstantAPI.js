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
    CREATE: {
      url: `${API_DEFAULT}/order/create`,
      method: 'POST'
    }
  }
}
