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

import arduinonanoUltrasonic from "./arduinonano/ultrasonic/ultrasonic.png";

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
        collaborator: "PPSS",
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
        collaborator: "PPSS",
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
        collaborator: "PPSS",
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
        collaborator: "PPSS",
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
        collaborator: "PPSS",
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
        collaborator: "PPSS",
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
        collaborator: "PPSS",
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
        collaborator: "PPSS",
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
        name: "超声波传感器",
        extensionId: "ArduinoNanoUltrasonic",
        collaborator: "PPSS",
        description: "超声波传感器",
        tags: ["sensor"],
        iconURL: arduinonanoUltrasonic,
        insetIconURL: arduinonanoUltrasonic
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
        collaborator: "Amazon Web Services",
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
        internetConnectionRequired: true,
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
        collaborator: "Google",
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
        internetConnectionRequired: true,
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
        collaborator: "JoyLabz",
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
    //     collaborator: "PPSS",
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
