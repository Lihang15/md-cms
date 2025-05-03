import service from "./http";


  
  // POST 请求
  export const login = (data = {}) => {
    return service.post('/api/login', data);
  };

  // GET 请求
export const info = (params = {}) => {
    return service.get('/api/account/me', { params });
  };