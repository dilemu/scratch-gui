function miniFetch(resolve, reject, uri, params){
  var opts = {
      headers:{
          'Accept':'application/json,text/plain,*/*',/* 格式限制：json、文本、其他格式 */
          'Content-Type':'application/x-www-form-urlencoded'/* 请求内容类型 */
      },
      method:'post'
  }
  if (params){
      if (params.headers) {opts['headers'] =  Object.assign(opts['headers'], params.headers)}
      if (params.method) {opts["method"] = params.method}
      if (params.body)   {opts["body"] = params.body}
  }

  fetch(uri, opts)
  .then(response=>{
      var body = response.json();
      if(response.status == 200){
          return resolve(body);
      }
      return reject(body)
  })
  .catch(err=>reject(err))
};
//登录一：首页打开Scratch时，自动获取一次用户登录信息
module.exports.requestSession = (resolve, reject) => (
  miniFetch(resolve, reject, '/user/getSession')
);
//登录二：提交账号、密码进行登录
module.exports.requestLogin = (resolve, reject, data) => (
  miniFetch(resolve, reject, '/user/login', {body:data})
);
//退出：提交账号，退出登录状态
module.exports.requestLogout = (resolve, reject, data) => (
  miniFetch(resolve, reject, '/user/logout', {body:data})
);

//获取项目源代码
module.exports.requestProject = (resolve, reject, projectId) => (
  miniFetch(resolve, reject, `/scratch/project/${projectId}`)
);
//保存标题
module.exports.requestSaveProjectTitle = (resolve, reject, projectId, projectTitle) => {
  miniFetch(resolve, reject, '/scratch/saveProjcetTitle', {body:`id=${projectId}&title=${projectTitle}`})
};
//保存缩略图
module.exports.requestSaveProjectThumbnail = (resolve, reject, projectId, thumbnailBlob) => {
  miniFetch(resolve, reject, `/scratch/thumbnail/${projectId}`, {body:thumbnailBlob, headers:{'Content-Type': 'image/png'}})
};
//保存分享
module.exports.requestShareProject = (resolve, reject, projectId) => {
  miniFetch(resolve, reject, `/scratch/shareProject/${projectId}`)
};