import ApiHelper from '../helpers/ApiHelper';
import { API_CREATE_FIELD, HTTP_METHODS, API_DELETE_FIELD } from '../constants';

export const createFieldApi = async data => {
  const result = await ApiHelper.doRequest(
    API_CREATE_FIELD,
    HTTP_METHODS.POST,
    data
  );
  return result;
};

export const deleteFieldApi = async (id) => {
  const result = await ApiHelper.doRequest(
    `${API_DELETE_FIELD}/${id}`,
    HTTP_METHODS.DELETE
  );
  return result;
};
