import React from "react";
import { FormattedMessage } from "react-intl";

import musicIconURL from "./music/music.png";
import musicInsetIconURL from "./music/music-small.svg";

import penIconURL from "./pen/pen.png";
import penInsetIconURL from "./pen/pen-small.svg";

import videoSensingIconURL from "./videoSensing/video-sensing.png";
import videoSensingInsetIconURL from "./videoSensing/video-sensing-small.svg";

import text2speechIconURL from "./text2speech/text2speech.png";
import text2speechInsetIconURL from "./text2speech/text2speech-small.svg";

import translateIconURL from "./translate/translate.png";
import translateInsetIconURL from "./translate/translate-small.png";

import makeymakeyIconURL from "./makeymakey/makeymakey.png";
import makeymakeyInsetIconURL from "./makeymakey/makeymakey-small.svg";

import helloworldImage from "./hello_world/ppsm_log_head_tiny.png";
import imageRecognition from "./imageRecognition/imageRecognition.png";
import imageRecognitionInsert from "./imageRecognition/imageRecognitionInsert.png";

import diVoice from "./diVoice/diVoice.png";
import diVoiceInsert from "./diVoice/diVoiceInsert.png";

import diMachineLeaning from "./diMachineLeaning/diMachineLeaning.png";
import diMachineLeaningInsert from "./diMachineLeaning/diMachineLeaningInsert.png";

import diBodyRecognition from "./diBodyRecognition/diBodyRecognition.png";
import diBodyRecognitionInsert from "./diBodyRecognition/diBodyRecognitionInsert.png";

import diImageProcessing from "./diImageProcessing/diImageProcessing.png";
import diImageProcessingInsert from "./diImageProcessing/diImageProcessingInsert.png";

import diIntelligentData from "./diIntelligentData/diIntelligentData.png";
import diIntelligentDataInsert from "./diIntelligentData/diIntelligentDataInsert.png";

import diTextRecognition from "./diTextRecognition/diTextRecognition.png";
import diTextRecognitionInsert from "./diTextRecognition/diTextRecognitionInsert.png";

import diWordProcessing from "./diWordProcessing/diWordProcessing.png";
import diWordProcessingInsert from "./diWordProcessing/diWordProcessingInsert.png";


import arduinonanoSingleButtonLarge from "./arduinoNano/singleButton/large.png";
import arduinonanoSingleButtonSmall from "./arduinoNano/singleButton/small.png";
import arduinoNanoLEDButtonLarge from "./arduinoNano/ledButton/large.png";
import arduinoNanoLEDButtonSmall from "./arduinoNano/ledButton/small.png";
import arduinoNanoPassiveBuzzerLarge from "./arduinoNano/passiveBuzzer/large.png";
import arduinoNanoPassiveBuzzerSmall from "./arduinoNano/passiveBuzzer/small.png";
import arduinoNanoFanControlLarge from "./arduinoNano/fanControl/large.png";
import arduinoNanoFanControlSmall from "./arduinoNano/fanControl/small.png";
import arduinoNanoRedAndGreenLedLarge from "./arduinoNano/redAndGreenLed/large.png";
import arduinoNanoRedAndGreenLedSmall from "./arduinoNano/redAndGreenLed/small.png";
import arduinoNanoWhiteLEDLarge from "./arduinoNano/whiteLED/large.png";
import arduinoNanoWhiteLEDSmall from "./arduinoNano/whiteLED/small.png";
import arduinoNanoFDCDLarge from "./arduinoNano/fourDigitClockDisplay/large.png";
import arduinoNanoFDCDSmall from "./arduinoNano/fourDigitClockDisplay/small.png";
import arduinoNanoLightSensorLarge from "./arduinoNano/lightSensor/large.png";
import arduinoNanoLightSensorSmall from "./arduinoNano/lightSensor/small.png";
import arduinoNanoDHTLarge from "./arduinoNano/DHT/large.png";
import arduinoNanoDHTSmall from "./arduinoNano/DHT/small.png";
import arduinoNanoUltrasonicLarge from "./arduinoNano/ultrasonic/large.png";
import arduinoNanoUltrasonicSmall from "./arduinoNano/ultrasonic/small.png";
import arduinoNanoVoiceSensorLarge from "./arduinoNano/voiceSensor/large.png";
import arduinoNanoVoiceSensorSmall from "./arduinoNano/voiceSensor/small.png";
import arduinoNanoTouchSensorLarge from "./arduinoNano/touch/large.png";
import arduinoNanoTouchSensorSmall from "./arduinoNano/touch/small.png";
import arduinoNanoTouchLarge from "./arduinoNano/touch/large.png";
import arduinoNanoTouchSmall from "./arduinoNano/touch/small.png";
import arduinoNanoMotorLarge from "./arduinoNano/motor/large.png";
import arduinoNanoMotorSmall from "./arduinoNano/motor/small.png";
import arduinoNanoServoLarge from "./arduinoNano/servo/large.png";
import arduinoNanoServoSmall from "./arduinoNano/servo/small.png";
import arduinoNanoRGBLEDLarge from "./arduinonano/RGBLED/large.png";
import arduinoNanoRGBLEDSmall from "./arduinonano/RGBLED/small.png";

// import arduinonanoUltrasonic from "./arduinoNano/ultrasonic/ultrasonic.png";

// import ev3IconURL from './ev3/ev3.png';
// import ev3InsetIconURL from './ev3/ev3-small.svg';
// import ev3ConnectionIconURL from './ev3/ev3-hub-illustration.svg';
// import ev3ConnectionSmallIconURL from './ev3/ev3-small.svg';

// import wedo2IconURL from './wedo2/wedo.png'; // TODO: Rename file names to match variable/prop names?
// import wedo2InsetIconURL from './wedo2/wedo-small.svg';
// import wedo2ConnectionIconURL from './wedo2/wedo-illustration.svg';
// import wedo2ConnectionSmallIconURL from './wedo2/wedo-small.svg';
// import wedo2ConnectionTipIconURL from './wedo2/wedo-button-illustration.svg';

// import boostIconURL from './boost/boost.png';
// import boostInsetIconURL from './boost/boost-small.svg';
// import boostConnectionIconURL from './boost/boost-illustration.svg';
// import boostConnectionSmallIconURL from './boost/boost-small.svg';
// import boostConnectionTipIconURL from './boost/boost-button-illustration.svg';

// import gdxforIconURL from './gdxfor/gdxfor.png';
// import gdxforInsetIconURL from './gdxfor/gdxfor-small.svg';
// import gdxforConnectionIconURL from './gdxfor/gdxfor-illustration.svg';
// import gdxforConnectionSmallIconURL from './gdxfor/gdxfor-small.svg';

export default [
    {
        name: (
            <FormattedMessage
                defaultMessage="语音交互"
                description="Voice recognition name"
                id="gui.extension.di_voice.name"
            />
        ),
        extensionId: "diVoice",
        
        iconURL: diVoice,
        insetIconURL: diVoiceInsert,
        description: (
            <FormattedMessage
                defaultMessage="实现语音识别、语音合成等功能。"
                description="Voice recognition description"
                id="gui.extension.di_voice.description"
            />
        ),
        featured: true,
        internetConnectionRequired: true,
        tags: ["network"],
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="文本识别"
                description="Text recognition name"
                id="gui.extension.diTextRecognition.name"
            />
        ),
        extensionId: "diTextRecognition",
        
        iconURL: diTextRecognition,
        insetIconURL: diTextRecognitionInsert,
        description: (
            <FormattedMessage
                defaultMessage="实现图片文字、二维码、条形码、车牌等信息识别提取。"
                description="Text recognition description"
                id="gui.extension.diTextRecognition.description"
            />
        ),
        featured: true,
        internetConnectionRequired: true,
        tags: ["network"],
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="图像处理"
                description="Image Processing name"
                id="gui.extension.diImageProcessing.name"
            />
        ),
        extensionId: "diImageProcessing",
        
        iconURL: diImageProcessing,
        insetIconURL: diImageProcessingInsert,
        description: (
            <FormattedMessage
                defaultMessage="实现图像风格转换、人像动漫化、背景分割等功能。"
                description="Image Processing description"
                id="gui.extension.diImageProcessing.description"
            />
        ),
        featured: true,
        internetConnectionRequired: true,
        tags: ["network"],
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="图像识别"
                description="Image recognition name"
                id="gui.extension.image_recognition.name"
            />
        ),
        extensionId: "imageRecognition",
        
        iconURL: imageRecognition,
        insetIconURL: imageRecognitionInsert,
        description: (
            <FormattedMessage
                defaultMessage="精准识别超过十万种物体和场景。"
                description="Image recognition description"
                id="gui.extension.image_recognition.description"
            />
        ),
        featured: true,
        internetConnectionRequired: true,
        tags: ["network"],
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="人体识别"
                description="Body Recognition name"
                id="gui.extension.diBodyRecognition.name"
            />
        ),
        extensionId: "diBodyRecognition",
        
        iconURL: diBodyRecognition,
        insetIconURL: diBodyRecognitionInsert,
        description: (
            <FormattedMessage
                defaultMessage="准确识别图像中的人体相关信息，实现人流量统计、属性识别、手势识别等功能。"
                description="Body Recognition description"
                id="gui.extension.diBodyRecognition.description"
            />
        ),
        featured: true,
        internetConnectionRequired: true,
        tags: ["network"],
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="自然语言处理"
                description="Intelligent Word Processing name"
                id="gui.extension.diWordProcessing.name"
            />
        ),
        extensionId: "diWordProcessing",
        
        iconURL: diWordProcessing,
        insetIconURL: diWordProcessingInsert,
        description: (
            <FormattedMessage
                defaultMessage="实现文本纠错、情感倾向分析、评论观点抽取、地址识别等功能。"
                description="Intelligent Word Processing description"
                id="gui.extension.diWordProcessing.description"
            />
        ),
        featured: true,
        internetConnectionRequired: true,
        tags: ["network"],
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="机器学习"
                description="Voice recognition name"
                id="gui.extension.diMachineLeaning.name"
            />
        ),
        extensionId: "diMachineLeaning",
        
        iconURL: diMachineLeaning,
        insetIconURL: diMachineLeaningInsert,
        description: (
            <FormattedMessage
                defaultMessage="通过可视化界面方式，进行图像机器学习的训练。"
                description="Voice recognition description"
                id="gui.extension.diMachineLeaning.description"
            />
        ),
        featured: true,
        internetConnectionRequired: true,
        tags: ["network"],
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="智能天气"
                description="Intelligent data name"
                id="gui.extension.diIntelligentData.name"
            />
        ),
        extensionId: "diIntelligentData",
        
        iconURL: diIntelligentData,
        insetIconURL: diIntelligentDataInsert,
        description: (
            <FormattedMessage
                defaultMessage="获取某个城市的温度、湿度等天气信息。"
                description="Intelligent data description"
                id="gui.extension.diIntelligentData.description"
            />
        ),
        featured: true,
        internetConnectionRequired: true,
        tags: ["network"],
    },
    {
        name: "单按钮模块",
        extensionId: "ArduinoNanoSingleButton",
        description: "按下输出高电平，松开输出低电平",
        tags: ["sensor"],
        iconURL: arduinonanoSingleButtonLarge,
        insetIconURL: arduinonanoSingleButtonSmall,
        featured: true,
        learnMore: 'https://delightmom.feishu.cn/wiki/wikcnhqwqhoCmU63nBBztYpCI1f',
        supportDevice: ['arduinoNano'],
    }, 
    {
        name: "指示灯按钮",
        extensionId: "ArduinoNanoLEDButton",
        description: "按钮触发，LED高电平点亮",
        tags: ["sensor", "display"],
        iconURL: arduinoNanoLEDButtonLarge,
        insetIconURL: arduinoNanoLEDButtonSmall,
        featured: true,
        learnMore: 'https://delightmom.feishu.cn/wiki/wikcnf4TqFnl7jfI8e8reaXXMmd',
        supportDevice: ['arduinoNano'],
    },
    {
        name: "无源蜂鸣器",
        extensionId: "ArduinoNanoPassiveBuzzer",
        description: "可通过音调和节拍控制无源声音输出；可通过频率和使劲按控制有源声音输出",
        tags: ["motion"],
        iconURL: arduinoNanoPassiveBuzzerLarge,
        insetIconURL: arduinoNanoPassiveBuzzerSmall,
        featured: true,
        learnMore: 'https://delightmom.feishu.cn/wiki/wikcnIrDbtnK2p7hGzTswiDL5sg',
        supportDevice: ['arduinoNano'],
    },
    {
        name: "轴流式风扇",
        extensionId: "ArduinoNanoFanControl",
        description: "可控制速度和正反转的风扇",
        tags: ["motion"],
        iconURL: arduinoNanoFanControlLarge,
        insetIconURL: arduinoNanoFanControlSmall,
        featured: true,
        learnMore: 'https://delightmom.feishu.cn/wiki/wikcnebdkrxjxl5B2KvHotreMjg',
        supportDevice: ['arduinoNano'],
    },
    {
        name: "全彩灯模块",
        extensionId: "ArduinoNanoRGBLED",
        description: "WS2812 RGB灯（1~10灯珠皆可）",
        tags: ["display"],
        iconURL: arduinoNanoRGBLEDLarge,
        insetIconURL: arduinoNanoRGBLEDSmall,
        featured: true,
        learnMore: 'https://delightmom.feishu.cn/wiki/wikcnj9y71Xex3uX4q2K4vpwYWg',
        supportDevice: ['arduinoNano'],
    },
    {
        name: "红绿双色灯",
        extensionId: "ArduinoNanRedAndGreenLED",
        description: "可控制单路点亮和双路点亮的双色LED",
        tags: ["display"],
        iconURL: arduinoNanoRedAndGreenLedLarge,
        insetIconURL: arduinoNanoRedAndGreenLedSmall,
        featured: true,
        learnMore: 'https://delightmom.feishu.cn/wiki/wikcnp5dOegxSi7TFVoOtzTJwaf',
        supportDevice: ['arduinoNano'],
    },
    {
        name: "纯白单色灯",
        extensionId: "ArduinoNanoLED",
        description: "可控制单路点亮的白色LED",
        tags: ["display"],
        iconURL: arduinoNanoWhiteLEDLarge,
        insetIconURL: arduinoNanoWhiteLEDSmall,
        featured: true,
        learnMore: 'https://delightmom.feishu.cn/wiki/wikcnr7xNPpSdegS2BjJURayMqg',
        supportDevice: ['arduinoNano'],
    },
    {
        name: "四位时钟数码管",
        extensionId: "ArduinoFourDigitClockDisplay",
        description: "显示模块，IIC接口",
        tags: ["display"],
        iconURL: arduinoNanoFDCDLarge,
        insetIconURL: arduinoNanoFDCDSmall,
        featured: true,
        learnMore: 'https://delightmom.feishu.cn/wiki/wikcnslxL3crkE1Y1w4NfeVko4P',
        supportDevice: ['arduinoNano'],
    },
    {
        name: "光敏传感器",
        extensionId: "ArduinoNanoLightSensor",
        description: "可测量环境光强度",
        tags: ["sensor"],
        iconURL: arduinoNanoLightSensorLarge,
        insetIconURL: arduinoNanoLightSensorSmall,
        featured: true,
        learnMore: 'https://delightmom.feishu.cn/wiki/wikcnkaxBCnViHdCaa3mYehpIOc',
        supportDevice: ['arduinoNano'],
    },
    {
        name: "温湿度传感器",
        extensionId: "ArduinoNanoDHT",
        description: "可测量环境温度、湿度",
        tags: ["sensor"],
        iconURL: arduinoNanoDHTLarge,
        insetIconURL: arduinoNanoDHTSmall,
        featured: true,
        learnMore: 'https://delightmom.feishu.cn/wiki/wikcnVCDjeL2JI908g1kR6bYO7e',
        supportDevice: ['arduinoNano'],
    },
    {
        name: "超声波传感器",
        extensionId: "ArduinoNanoUltrasonic",
        description: "模拟双探头超声波测距",
        tags: ["sensor"],
        iconURL: arduinoNanoUltrasonicLarge,
        insetIconURL: arduinoNanoUltrasonicSmall,
        featured: true,
        learnMore: 'https://delightmom.feishu.cn/wiki/wikcnVehVOEfQY5piSN6wYD2xBg',
        supportDevice: ['arduinoNano'],
    },
    {
        name: "声音传感器",
        extensionId: "ArduinoNanoVoiceSensor",
        description: "测量环境中声音强度",
        tags: ["sensor"],
        iconURL: arduinoNanoVoiceSensorLarge,
        insetIconURL: arduinoNanoVoiceSensorSmall,
        featured: true,
        learnMore: 'https://delightmom.feishu.cn/wiki/wikcn4hRsYgIeGVLVxm6ptzg67g',
        supportDevice: ['arduinoNano'],
    },
    {
        name: "触摸传感器",
        extensionId: "ArduinoNanoTouch",
        description: "触摸开关、可感应人体、金属",
        tags: ["sensor"],
        iconURL: arduinoNanoTouchSensorLarge,
        insetIconURL: arduinoNanoTouchSensorSmall,
        featured: true,
        learnMore: 'https://delightmom.feishu.cn/wiki/wikcnRtdkEpMgBZAF4OZnXd5hgd',
        supportDevice: ['arduinoNano'],
    },
    {
        name: "乐高兼容电机",
        extensionId: "ArduinoNanoMotor",
        description: "可控制正反转和调速的电机",
        tags: ["motion"],
        iconURL: arduinoNanoMotorLarge,
        insetIconURL: arduinoNanoMotorSmall,
        featured: true,
        learnMore: 'https://delightmom.feishu.cn/wiki/wikcnlp8DdF70HOdtmzgmbsPBvg',
        supportDevice: ['arduinoNano'],
    },
    {
        name: "乐高舵机（180°）",
        extensionId: "ArduinoNanoServo",
        description: "可在0~180°间转动到指定角度位置",
        tags: ["motion"],
        iconURL: arduinoNanoServoLarge,
        insetIconURL: arduinoNanoServoSmall,
        featured: true,
        learnMore: 'https://delightmom.feishu.cn/wiki/wikcntT58gizMr2M30uoqnpwEsy',
        supportDevice: ['arduinoNano'],
    },
    
    
    // {
    //     name: (
    //         <FormattedMessage
    //             defaultMessage="speech2text"
    //             description="Name for the Text to Speech extension"
    //             id="gui.extension.speech2text.name"
    //         />
    //     ),
    //     extensionId: "speech2text",
    //     collaborator: "Amazon Web Services",
    //     iconURL: text2speechIconURL,
    //     insetIconURL: text2speechInsetIconURL,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="Make your projects talk."
    //             description="Description for the Text to speech extension"
    //             id="gui.extension.speech2text.description"
    //         />
    //     ),
    //     featured: true,
    //     internetConnectionRequired: true,
    // },
    {
        name: (
            <FormattedMessage
                defaultMessage="Music"
                description="Name for the 'Music' extension"
                id="gui.extension.music.name"
            />
        ),
        extensionId: "music",
        iconURL: musicIconURL,
        insetIconURL: musicInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Play instruments and drums."
                description="Description for the 'Music' extension"
                id="gui.extension.music.description"
            />
        ),
        featured: true,
        tags: ["basemodule"]
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Pen"
                description="Name for the 'Pen' extension"
                id="gui.extension.pen.name"
            />
        ),
        extensionId: "pen",
        iconURL: penIconURL,
        insetIconURL: penInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Draw with your sprites."
                description="Description for the 'Pen' extension"
                id="gui.extension.pen.description"
            />
        ),
        featured: true,
        tags: ["basemodule"]
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Video Sensing"
                description="Name for the 'Video Sensing' extension"
                id="gui.extension.videosensing.name"
            />
        ),
        extensionId: "videoSensing",
        iconURL: videoSensingIconURL,
        insetIconURL: videoSensingInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Sense motion with the camera."
                description="Description for the 'Video Sensing' extension"
                id="gui.extension.videosensing.description"
            />
        ),
        featured: true,
        tags: ["basemodule"]
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Text to Speech"
                description="Name for the Text to Speech extension"
                id="gui.extension.text2speech.name"
            />
        ),
        extensionId: "text2speech",
        // collaborator: "Amazon Web Services",
        iconURL: text2speechIconURL,
        insetIconURL: text2speechInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Make your projects talk."
                description="Description for the Text to speech extension"
                id="gui.extension.text2speech.description"
            />
        ),
        featured: true,
        // internetConnectionRequired: true,
        tags: ["basemodule"]
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Translate"
                description="Name for the Translate extension"
                id="gui.extension.translate.name"
            />
        ),
        extensionId: "translate",
        // collaborator: "Google",
        iconURL: translateIconURL,
        insetIconURL: translateInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Translate text into many languages."
                description="Description for the Translate extension"
                id="gui.extension.translate.description"
            />
        ),
        featured: true,
        // internetConnectionRequired: true,
        tags: ["basemodule"]
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Makey Makey"
                description="Name for the Makey Makey extension"
                id="gui.extension.makeymakey.name"
            />
        ),
        extensionId: "makeymakey",
        // collaborator: "JoyLabz",
        iconURL: makeymakeyIconURL,
        insetIconURL: makeymakeyInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Make anything into a key."
                description="Description for the 'Makey Makey' extension"
                id="gui.extension.makeymakey.description"
            />
        ),
        featured: true,
        tags: ["basemodule"]
    },
    // {
    //     name: (
    //         <FormattedMessage
    //             defaultMessage="speech2text"
    //             description="Name for the Hello World extension"
    //             id="gui.extension.helloWorld.name"
    //         />
    //     ),
    //     extensionId: "speech2text",
    //     
    //     iconURL: helloworldImage,
    //     insetIconURL: helloworldImage,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="Make anything into a key."
    //             description="Description for the 'Hello World' extension"
    //             id="gui.extension.helloWorld.description"
    //         />
    //     ),
    //     featured: true,
    // },
    // {
    //     name: "LEGO MINDSTORMS EV3",
    //     extensionId: "ev3",
    //     collaborator: "LEGO",
    //     iconURL: ev3IconURL,
    //     insetIconURL: ev3InsetIconURL,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="Build interactive robots and more."
    //             description="Description for the 'LEGO MINDSTORMS EV3' extension"
    //             id="gui.extension.ev3.description"
    //         />
    //     ),
    //     featured: true,
    //     disabled: false,
    //     bluetoothRequired: true,
    //     internetConnectionRequired: true,
    //     launchPeripheralConnectionFlow: true,
    //     useAutoScan: false,
    //     connectionIconURL: ev3ConnectionIconURL,
    //     connectionSmallIconURL: ev3ConnectionSmallIconURL,
    //     connectingMessage: (
    //         <FormattedMessage
    //             defaultMessage="Connecting. Make sure the pin on your EV3 is set to 1234."
    //             description="Message to help people connect to their EV3. Must note the PIN should be 1234."
    //             id="gui.extension.ev3.connectingMessage"
    //         />
    //     ),
    //     helpLink: "https://scratch.mit.edu/ev3",
    // },
    // {
    //     name: "LEGO BOOST",
    //     extensionId: "boost",
    //     collaborator: "LEGO",
    //     iconURL: boostIconURL,
    //     insetIconURL: boostInsetIconURL,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="Bring robotic creations to life."
    //             description="Description for the 'LEGO BOOST' extension"
    //             id="gui.extension.boost.description"
    //         />
    //     ),
    //     featured: true,
    //     disabled: false,
    //     bluetoothRequired: true,
    //     internetConnectionRequired: true,
    //     launchPeripheralConnectionFlow: true,
    //     useAutoScan: true,
    //     connectionIconURL: boostConnectionIconURL,
    //     connectionSmallIconURL: boostConnectionSmallIconURL,
    //     connectionTipIconURL: boostConnectionTipIconURL,
    //     connectingMessage: (
    //         <FormattedMessage
    //             defaultMessage="Connecting"
    //             description="Message to help people connect to their BOOST."
    //             id="gui.extension.boost.connectingMessage"
    //         />
    //     ),
    //     helpLink: "https://scratch.mit.edu/boost",
    // },
    // {
    //     name: "LEGO Education WeDo 2.0",
    //     extensionId: "wedo2",
    //     collaborator: "LEGO",
    //     iconURL: wedo2IconURL,
    //     insetIconURL: wedo2InsetIconURL,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="Build with motors and sensors."
    //             description="Description for the 'LEGO WeDo 2.0' extension"
    //             id="gui.extension.wedo2.description"
    //         />
    //     ),
    //     featured: true,
    //     disabled: false,
    //     bluetoothRequired: true,
    //     internetConnectionRequired: true,
    //     launchPeripheralConnectionFlow: true,
    //     useAutoScan: true,
    //     connectionIconURL: wedo2ConnectionIconURL,
    //     connectionSmallIconURL: wedo2ConnectionSmallIconURL,
    //     connectionTipIconURL: wedo2ConnectionTipIconURL,
    //     connectingMessage: (
    //         <FormattedMessage
    //             defaultMessage="Connecting"
    //             description="Message to help people connect to their WeDo."
    //             id="gui.extension.wedo2.connectingMessage"
    //         />
    //     ),
    //     helpLink: "https://scratch.mit.edu/wedo",
    // },
    // {
    //     name: "Go Direct Force & Acceleration",
    //     extensionId: "gdxfor",
    //     collaborator: "Vernier",
    //     iconURL: gdxforIconURL,
    //     insetIconURL: gdxforInsetIconURL,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="Sense push, pull, motion, and spin."
    //             description="Description for the Vernier Go Direct Force and Acceleration sensor extension"
    //             id="gui.extension.gdxfor.description"
    //         />
    //     ),
    //     featured: true,
    //     disabled: false,
    //     bluetoothRequired: true,
    //     internetConnectionRequired: true,
    //     launchPeripheralConnectionFlow: true,
    //     useAutoScan: false,
    //     connectionIconURL: gdxforConnectionIconURL,
    //     connectionSmallIconURL: gdxforConnectionSmallIconURL,
    //     connectingMessage: (
    //         <FormattedMessage
    //             defaultMessage="Connecting"
    //             description="Message to help people connect to their force and acceleration sensor."
    //             id="gui.extension.gdxfor.connectingMessage"
    //         />
    //     ),
    //     helpLink: "https://scratch.mit.edu/vernier",
    // },
];
