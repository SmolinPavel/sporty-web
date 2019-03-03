import ApiHelper from '../helpers/ApiHelper';
import { API_USERS_REGISTER, API_USERS_LOGIN, HTTP_METHODS } from '../constants';

export const registerApi = async data => {
    const result = await ApiHelper.doRequest(API_USERS_REGISTER, HTTP_METHODS.POST, data);
    return result;
};

export const loginApi = async data => {
    return ApiHelper.doRequest(API_USERS_LOGIN, HTTP_METHODS.POST, data);
};