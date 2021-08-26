//初始化字符串的
import keyMirror from 'keymirror'

//定义用户登录状态
const UserState = keyMirror({
    //未登录状态
    NOT_LOGINED: null,
    //已登录状态
    LOGINED: null
})

const UserStateOB = Object.keys(UserState)

//初始化用户状态
const initState = {
    error: null,
    userData: null,
    loginState: UserState.NOT_LOGINED
}

//获取用户登录状态
const getLoginState = loginState => loginState === UserState.LOGINED

//定义一个reducer
const reducer = function(state=initState, action) {
    //暂时未实现任何操作，返回state就行
    return state
}

//将所写的全部暴露出去
export {
    reducer as default,
    initState as userStateInitState,
    UserState,
    UserStateOB,
    getLoginState
}
