import APPLICATION_DATA from '../data/application.data';
import axios from 'axios';

const createAxiosInstance = (
  path,
  params,
  method
) => {
  let options = {
    baseURL: path,
    method: method,
    timeout: APPLICATION_DATA.DefaultTimeout,
    headers: {}
  };

  return axios.create(options);
};

export const post = async (route, params) => {
  let path = getServerPath();
  path += route;
  const instance = createAxiosInstance(path, params, post);

  return instance.post(path, params).catch((error) => {
    return { data: { status: -1 } };
  });
};

export const get = async (route) => {
  let path = getServerPath();
  path += route;
  const instance = createAxiosInstance(path, null, 'get');
  return instance.get(path).catch((error) => {
    return { data: { status: -1 } };
  });
};

/**
 * Returns server URL based
 * @returns {string}
 */
function getServerPath() {
  let path = '';
  if (APPLICATION_DATA.Localhost) {
    path = APPLICATION_DATA.StagingServer.Server;
  } else {
    path = APPLICATION_DATA.ProductionServer.Server;
  }
  return path;
}
