import ApiHelper from '../helpers/ApiHelper';
import { API_CREATE_FIELD, HTTP_METHODS } from '../constants';

export const createFieldApi = async data => {
    const result = await ApiHelper.doRequest(API_CREATE_FIELD, HTTP_METHODS.POST, data);
    return result;
};

export const deleteFieldApi = async data => {
    const result = await ApiHelper.doRequest(API_CREATE_FIELD, HTTP_METHODS.POST, data);
    return result;
};