// Polyfills
import 'es6-object-assign/auto';
import 'core-js/fn/array/includes';
import 'core-js/fn/promise/finally';
import 'intl'; // For Safari 9

import React from 'react';
import ReactDOM from 'react-dom';

import analytics, {initialAnalytics} from '../lib/analytics';
import AppStateHOC from '../lib/app-state-hoc.jsx';
import BrowserModalComponent from '../components/browser-modal/browser-modal.jsx';
import supportedBrowser from '../lib/supported-browser';

import styles from './index.css';

initialAnalytics();
// Register "base" page view
analytics.pageview('/');

const appTarget = document.createElement('div');
appTarget.className = styles.app;
document.body.appendChild(appTarget);

if (supportedBrowser()) {
    // require needed here to avoid importing unsupported browser-crashing code
    // at the top level
    require('./render-gui.jsx').default(appTarget);

} else {
    BrowserModalComponent.setAppElement(appTarget);
    const WrappedBrowserModalComponent = AppStateHOC(BrowserModalComponent, true /* localesOnly */);
    const handleBack = () => {};
    // eslint-disable-next-line react/jsx-no-bind
    ReactDOM.render(<WrappedBrowserModalComponent onBack={handleBack} />, appTarget);
}

// //在此判断浏览器是否支持
// //实例化虚拟机会导致不受支持的浏览器出错，先判断浏览器是否支持Scratch
// if (supportedBrowser()) {
//     //获取session
//     const {requestSession} = require('../lib/session');
//     new Promise((resolve, reject) => {
//         requestSession(resolve, reject);
//     }).then(session => {
//         if (typeof session === 'undefined'){ return runScratch({}); }

//         return runScratch(session);
//     }, err => {
//         return runScratch({});
//     });

// } else {
//     alert("抱歉，浏览器不支持。我们建议您使用Chrome内核的浏览器！");
// }



// function runScratch(session) {
//     if (process.env.NODE_ENV === 'production' && typeof window === 'object') {
//         window.onbeforeunload = () => true;//在即将离开当前页面(刷新或关闭)时执行 JavaScript
//     }

//     GUI.setAppElement(appTarget);
//     const WrappedGui = compose(AppStateHOC,HashParserHOC)(GUI);
//     /**
//         _session=：用户的登录信息，在app-state-hoc.jsx中使用即可，不需要继续后传
//      */
//     ReactDOM.render(<WrappedGui _session={session}  />, appTarget);        
// };