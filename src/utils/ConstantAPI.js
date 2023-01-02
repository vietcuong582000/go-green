import {API_DEFAULT} from "@/utils/Constant";

export const ConstantAPI = {
  'LOGIN': {
    url: `${API_DEFAULT}/auth/login`,
    method: 'POST'
  },
  'PRODUCT': {
    CREATE: {
      url: `${API_DEFAULT}/products`,
      method: 'POST'
    },
    GET: {
      url: `${API_DEFAULT}/products`,
      method: 'GET'
    },
    UPDATE: {
      url: `${API_DEFAULT}/products`,
      method: 'PUT'
    },
    DELETE: {
      url: `${API_DEFAULT}/products`,
      method: 'DELETE'
    }
  },
  'CATEGORY': {
    CREATE: {
      url: `${API_DEFAULT}/category`,
      method: 'POST'
    },
    GET: {
      url: `${API_DEFAULT}/category/search`,
      method: 'GET'
    },
    UPDATE: {
      url: `${API_DEFAULT}/category`,
      method: 'PUT'
    },
    DELETE: {
      url: `${API_DEFAULT}/category`,
      method: 'DELETE'
    }
  },
  'ORDER': {
    CREATE: {
      url: `${API_DEFAULT}/order/create`,
      method: 'POST'
    }
  }
}
