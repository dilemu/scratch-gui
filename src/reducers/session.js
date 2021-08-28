import Cache from "cache-lib"
const SET_SESSION = 'session/SET_SESSION';
const CLEAR_SESSION = 'session/CLEAR_SESSION'
const localStorage = new Cache('localStorage')
const sessionStorage = new Cache('sessionStorage')
//登录状态
const initialState = {
    userid: 0,
    username: '',
    nickname: '',
    avatar: ''
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;

    switch (action.type) {
    case SET_SESSION:
        sessionStorage.set('userData', action.session, {type: 'd', delay: 1})
        return Object.assign({}, state, action.session);
    case CLEAR_SESSION:
        sessionStorage.remove('userData')
        return initialState;    
    }
    return state;
};
const setSession = session => ({type: SET_SESSION, session: session});
const clearSession = () => ({type: CLEAR_SESSION, session: initialState})

export {
    reducer as default,
    initialState as initializedSession,
    setSession,
    clearSession
};
