/**
 * 封装fetch请求
 */
 
// 全局路径
const commonUrl = 'http://139.196.77.69:60002'
export const parseJSON = function (response) {
    return response.json();
};
export const checkStatus = function (response) {
    if (response.status >= 200 && response.status < 500){
        return response;
    }
    const error = new Error(response.statusText)
    error.response = response
    throw error;
};
// eslint-disable-next-line require-jsdoc
export default function request (options = {}) {
    const {data, url} = options
    options = {...options}
    // 跨域
    options.mode = 'cors'
    delete options.url
    if (data) {
        delete options.data
        options.body = JSON.stringify(data);
    }
    options.headers = Object.assign({}, {
        'Content-Type': 'application/json'
    }, options.headers)
    return fetch(commonUrl + url, options, {credentials: 'include'})
        .then(checkStatus)
        .then(parseJSON)
        .catch(err => ({err}));
}
