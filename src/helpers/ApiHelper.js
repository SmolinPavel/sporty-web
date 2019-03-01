class ApiHelper {
  static getHeaders = (authToken, contentType = 'application/json') => ({
    'Content-Type': contentType,
    Authorization: ApiHelper.getTokenHeader(authToken)
    // language: ApiHelper.getLanguage()
  });

  static post = (url, reqBody, contentTypeParam, token, isStringify = true) => {
    const authToken = token || ApiHelper.getAuthToken();
    const contentType = contentTypeParam || 'application/json';
    const body = isStringify ? JSON.stringify(reqBody) : reqBody;

    const headers = ApiHelper.getHeaders(authToken, contentType);

    return fetch(url, {
      method: 'post',
      mode: 'cors',
      headers,
      body
    });
  };

  //   static put(
  //     url,
  //     body,
  //     contentTypeParam,
  //     token,
  //     isStringify,
  //     withoutAuth,
  //     onProgress
  //   ) {
  //     const authToken = token || ApiHelper.getAuthToken();
  //     const contentType = contentTypeParam || 'application/json';
  //     const finalBody = isStringify ? JSON.stringify(body) : body;

  //     const headers = {
  //       'Content-Type': contentType,
  //       language: ApiHelper.getLanguage()
  //     };
  //     if (!withoutAuth) {
  //       headers.Authorization = ApiHelper.getTokenHeader(authToken);
  //     }

  //     return axiosClient.put(url, finalBody, {
  //       headers,
  //       onUploadProgress: onProgress
  //     });
  //   }

  //   static patch(url, body, contentTypeParam, token, isStringify = true) {
  //     const authToken = token || ApiHelper.getAuthToken();
  //     const contentType = contentTypeParam || 'application/json';
  //     const finalBody = isStringify ? JSON.stringify(body) : body;

  //     const headers = ApiHelper.getHeaders(authToken, contentType);

  //     return axiosClient.patch(url, finalBody, { headers });
  //   }

  static get = (url, config, token) => {
    const authToken = token || ApiHelper.getAuthToken();

    const headers = ApiHelper.getHeaders(authToken);

    return fetch(url, {
      ...config,
      headers
    });
  };

  //   static delete(url, token) {
  //     const authToken = token || ApiHelper.getAuthToken();
  //     const headers = ApiHelper.getHeaders(authToken);
  //     return axiosClient.delete(url, { headers });
  //   }

  static async doRequest(url, type, ...rest) {
    try {
      const response = await ApiHelper[type](url, ...rest);
      const data = await response.json();

      if (response.status > 204) {
        return Promise.reject(data);
      }

      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static getTokenHeader(authToken) {
    return `Bearer ${authToken}`;
  }

  //   static getLanguage() {
  //     return localStorage.getItem(LANGUAGE_NAME) || getBrowserLang();
  //   }

  static getAuthToken() {
    return 'test-token';
    // return localStorage.getItem(TOKEN_NAME_IN_STORE);
  }

  static isAuthenticated = () => ApiHelper.getAuthToken() != null;
}

export default ApiHelper;
