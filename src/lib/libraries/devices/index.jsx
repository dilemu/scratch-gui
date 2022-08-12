import React from 'react';
import {FormattedMessage} from 'react-intl';
import defaultsDeep from 'lodash.defaultsdeep';
import log from '../../log';
import {DeviceType} from '../../device';


import arduinoBaseToolBox from './baseToolbox/arduino';
import microbitBaseToolBox from './baseToolbox/microbit';

import unselectDeviceIconURL from './unselectDevice/unselectDevice.png';

import arduinoUnoIconURL from './arduinoUno/arduinoUno.png';
import arduinoUnoConnectionIconURLL from './arduinoUno/arduinoUno-illustration.svg';
import arduinoUnoConnectionSmallIconURL from './arduinoUno/arduinoUno-small.svg';

import arduinoNanoIconURL from './arduinoNano/arduinoNano.png';
import arduinoNanoConnectionIconURLL from './arduinoNano/arduinoNano-illustration.svg';
import arduinoNanoConnectionSmallIconURL from './arduinoNano/arduinoNano-small.svg';

import arduinoLeonardoIconURL from './arduinoLeonardo/arduinoLeonardo.png';
import arduinoLeonardoConnectionIconURLL from './arduinoLeonardo/arduinoLeonardo-illustration.svg';
import arduinoLeonardoConnectionSmallIconURL from './arduinoLeonardo/arduinoLeonardo-small.svg';

import arduinoMega2560IconURL from './arduinoMega2560/arduinoMega2560.png';
import arduinoMega2560ConnectionIconURLL from './arduinoMega2560/arduinoMega2560-illustration.svg';
import arduinoMega2560ConnectionSmallIconURL from './arduinoMega2560/arduinoMega2560-small.svg';

import microbitIconURL from './microbit/microbit.png';
import microbitConnectionIconURLL from './microbit/microbit-illustration.svg';
import microbitConnectionSmallIconURL from './microbit/microbit-small.svg';

import microbitV2IconURL from './microbitV2/microbitV2.png';
import microbitV2ConnectionIconURLL from './microbitV2/microbitV2-illustration.svg';
import microbitV2ConnectionSmallIconURL from './microbitV2/microbitV2-small.svg';

import esp32IconURL from './esp32/esp32.png';
import esp32ConnectionIconURLL from './esp32/esp32-illustration.svg';
import esp32ConnectionSmallIconURL from './esp32/esp32-small.svg';

import esp8266IconURL from './esp8266/esp8266.png';
import esp8266ConnectionIconURL from './esp8266/esp8266-illustration.svg';
import esp8266ConnectionSmallIconURL from './esp8266/esp8266-small.svg';

import makeymakeyIconURL from './makeymakey/makeymakey.png';
import makeymakeyConnectionIconURL from './makeymakey/makeymakey-illustration.svg';
import makeymakeyConnectionSmallIconURL from './makeymakey/makeymakey-small.svg';

import dileban from './dileban/dileban.png';
import zhiquban from './zhiquban/zhiquban.png';
import zhangkongban from './zhangkongban/zhangkongban.png';
import changwanban from './changwanban/changwanban.png'

const deviceData = [
    /**
     * Unselect the deivce back to pure scratch mode
     */
    {
        name: (
            <FormattedMessage
                defaultMessage="Unselect device"
                description="Name for the unselect device"
                id="gui.device.unselectDevice.name"
            />
        ),
        deviceId: 'unselectDevice',
        iconURL: unselectDeviceIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Unselect the device, return to pure realtime programming mode."
                description="Description for the unselect device"
                id="gui.device.unselectDevice.description"
            />
        ),
        featured: true,
        hide: false,
        programMode: ['realtime'],
        programLanguage: ['block'],
        tags: ['mpu']
    },
    {
        name: '迪乐板',
        deviceId: 'arduinoNano',
        manufactor: 'arduino.cc',
        learnMore: 'https://store.arduino.cc/usa/arduino-nano',
        type: DeviceType.arduino,
        iconURL: dileban,
        description: "Arduino Nano 主控板控制的设备",
        featured: true,
        disabled: false,
        bluetoothRequired: false,
        serialportRequired: true,
        defaultBaudRate: '9600',
        internetConnectionRequired: false,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        // connectionIconURL: arduinoNanoConnectionIconURLL,
        // connectionSmallIconURL: arduinoNanoConnectionSmallIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their device."
                id="gui.device.arduinoNano.connectingMessage"
            />
        ),
        baseToolBoxXml: arduinoBaseToolBox,
        programMode: ['realtime', 'upload'],
        programLanguage: ['block', 'c', 'cpp'],
        tags: ['mpu'],
        helpLink: 'https://store.arduino.cc/usa/arduino-nano'
    },
    {
        name: '畅玩版',
        deviceId: 'changwanban',
        manufactor: 'arduino.cc',
        learnMore: 'https://store.arduino.cc/usa/arduino-nano',
        type: DeviceType.arduino,
        iconURL: changwanban,
        description: "以Arduino UNO为架构的的入门编程主控板",
        featured: true,
        disabled: true,
        bluetoothRequired: false,
        serialportRequired: true,
        defaultBaudRate: '9600',
        internetConnectionRequired: false,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: arduinoNanoConnectionIconURLL,
        connectionSmallIconURL: arduinoNanoConnectionSmallIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their device."
                id="gui.device.arduinoNano.connectingMessage"
            />
        ),
        baseToolBoxXml: arduinoBaseToolBox,
        programMode: ['realtime', 'upload'],
        programLanguage: ['block', 'c', 'cpp'],
        tags: ['mpu'],
        helpLink: 'https://store.arduino.cc/usa/arduino-nano'
    },
    {
        name: '智趣板',
        deviceId: 'zhiquban',
        manufactor: 'arduino.cc',
        learnMore: 'https://store.arduino.cc/usa/arduino-nano',
        type: DeviceType.arduino,
        iconURL: zhiquban,
        description:"基于 ESP32 的多功能智慧主控",
        featured: true,
        disabled: true,
        bluetoothRequired: false,
        serialportRequired: true,
        defaultBaudRate: '9600',
        internetConnectionRequired: false,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: arduinoNanoConnectionIconURLL,
        connectionSmallIconURL: arduinoNanoConnectionSmallIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their device."
                id="gui.device.arduinoNano.connectingMessage"
            />
        ),
        baseToolBoxXml: arduinoBaseToolBox,
        programMode: ['realtime', 'upload'],
        programLanguage: ['block', 'c', 'cpp'],
        tags: ['mpu'],
        helpLink: 'https://store.arduino.cc/usa/arduino-nano'
    },
    {
        name: '掌控板',
        deviceId: 'zhangkongban',
        manufactor: 'arduino.cc',
        learnMore: 'https://store.arduino.cc/usa/arduino-nano',
        type: DeviceType.arduino,
        iconURL: zhangkongban,
        description: "基于ESP32的主控板",
        featured: true,
        disabled: true,
        bluetoothRequired: false,
        serialportRequired: true,
        defaultBaudRate: '9600',
        internetConnectionRequired: false,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: arduinoNanoConnectionIconURLL,
        connectionSmallIconURL: arduinoNanoConnectionSmallIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their device."
                id="gui.device.arduinoNano.connectingMessage"
            />
        ),
        baseToolBoxXml: arduinoBaseToolBox,
        programMode: ['realtime', 'upload'],
        programLanguage: ['block', 'c', 'cpp'],
        tags: ['mpu'],
        helpLink: 'https://store.arduino.cc/usa/arduino-nano'
    },
    {
        name: 'Arduino Uno',
        deviceId: 'arduinoUno',
        manufactor: 'arduino.cc',
        learnMore: 'https://store.arduino.cc/usa/arduino-uno-rev3',
        type: DeviceType.arduino,
        iconURL: arduinoUnoIconURL,
        description: (
            <FormattedMessage
                defaultMessage="A great board to get started with electronics and coding."
                description="Description for the Arduino Uno device"
                id="gui.device.arduinoUno.description"
            />
        ),
        featured: true,
        disabled: true,
        bluetoothRequired: false,
        serialportRequired: true,
        defaultBaudRate: '9600',
        internetConnectionRequired: false,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: arduinoUnoConnectionIconURLL,
        connectionSmallIconURL: arduinoUnoConnectionSmallIconURL,
        connectingMessage: "Arduino UNO 主控板控制的设备",
        baseToolBoxXml: arduinoBaseToolBox,
        programMode: ['realtime', 'upload'],
        programLanguage: ['block', 'c', 'cpp'],
        tags: ['mpu'],
        helpLink: 'https://store.arduino.cc/usa/arduino-uno-rev3'
    },
    {
        name: 'Micro:bit',
        deviceId: 'microbit',
        manufactor: 'microbit.org',
        learnMore: 'https://microbit.org/',
        type: DeviceType.microbit,
        iconURL: microbitIconURL,
        description: "把作品链接到实体世界",
        featured: true,
        disabled: true,
        bluetoothRequired: false,
        serialportRequired: true,
        defaultBaudRate: '115200',
        internetConnectionRequired: false,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        // connectionIconURL: microbitConnectionIconURLL,
        // connectionSmallIconURL: microbitConnectionSmallIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their device."
                id="gui.device.microbit.connectingMessage"
            />
        ),
        baseToolBoxXml: microbitBaseToolBox,
        programMode: ['upload'],
        programLanguage: ['block', 'microPython'],
        tags: ['microPython'],
        helpLink: 'https://microbit.org/get-started/first-steps/introduction/',
        tags: ['mpu'],
    },
    
    // {
    //     name: 'Arduino Mega 2560',
    //     deviceId: 'arduinoMega2560',
    //     manufactor: 'arduino.cc',
    //     learnMore: 'https://store.arduino.cc/usa/mega-2560-r3',
    //     type: DeviceType.arduino,
    //     iconURL: arduinoMega2560IconURL,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="The 8-bit board with 54 digital pins, 16 analog inputs, and 4 serial ports."
    //             description="Description for the Arduino Mega 2560 device"
    //             id="gui.device.arduinoMega2560.description"
    //         />
    //     ),
    //     featured: true,
    //     disabled: false,
    //     bluetoothRequired: false,
    //     serialportRequired: true,
    //     defaultBaudRate: '9600',
    //     internetConnectionRequired: false,
    //     launchPeripheralConnectionFlow: true,
    //     useAutoScan: false,
    //     connectionIconURL: arduinoMega2560ConnectionIconURLL,
    //     connectionSmallIconURL: arduinoMega2560ConnectionSmallIconURL,
    //     connectingMessage: (
    //         <FormattedMessage
    //             defaultMessage="Connecting"
    //             description="Message to help people connect to their device."
    //             id="gui.device.arduinoMega2560.connectingMessage"
    //         />
    //     ),
    //     baseToolBoxXml: arduinoBaseToolBox,
    //     programMode: ['realtime', 'upload'],
    //     programLanguage: ['block', 'c', 'cpp'],
    //     tags: ['arduino'],
    //     helpLink: 'https://store.arduino.cc/usa/mega-2560-r3'
    // },
    // {
    //     name: 'ESP32',
    //     deviceId: 'arduinoEsp32',
    //     manufactor: 'espressif',
    //     learnMore: 'https://www.espressif.com/',
    //     type: DeviceType.arduino,
    //     iconURL: esp32IconURL,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="Wi-Fi & Bluetooth control board with rich functions."
    //             description="Description for the esp32 device"
    //             id="gui.device.esp32.description"
    //         />
    //     ),
    //     featured: true,
    //     disabled: false,
    //     bluetoothRequired: false,
    //     serialportRequired: true,
    //     defaultBaudRate: '76800',
    //     internetConnectionRequired: false,
    //     launchPeripheralConnectionFlow: true,
    //     useAutoScan: false,
    //     connectionIconURL: esp32ConnectionIconURLL,
    //     connectionSmallIconURL: esp32ConnectionSmallIconURL,
    //     connectingMessage: (
    //         <FormattedMessage
    //             defaultMessage="Connecting"
    //             description="Message to help people connect to their esp32."
    //             id="gui.device.esp32.connectingMessage"
    //         />
    //     ),
    //     baseToolBoxXml: arduinoBaseToolBox,
    //     programMode: ['upload'],
    //     programLanguage: ['block', 'c', 'cpp'],
    //     tags: ['arduino'],
    //     helpLink: 'https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32/hw-reference/esp32/get-started-devkitc.html'
    // },
    // {
    //     name: 'ESP8266',
    //     deviceId: 'arduinoEsp8266',
    //     manufactor: 'espressif',
    //     learnMore: 'https://www.espressif.com/',
    //     type: DeviceType.arduino,
    //     iconURL: esp8266IconURL,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="Low-cost Wi-Fi SOC control board."
    //             description="Description for the esp8266 device"
    //             id="gui.device.esp8266.description"
    //         />
    //     ),
    //     featured: true,
    //     disabled: false,
    //     bluetoothRequired: false,
    //     serialportRequired: true,
    //     defaultBaudRate: '76800',
    //     internetConnectionRequired: false,
    //     launchPeripheralConnectionFlow: true,
    //     useAutoScan: false,
    //     connectionIconURL: esp8266ConnectionIconURL,
    //     connectionSmallIconURL: esp8266ConnectionSmallIconURL,
    //     connectingMessage: (
    //         <FormattedMessage
    //             defaultMessage="Connecting"
    //             description="Message to help people connect to their device."
    //             id="gui.device.esp8266.connectingMessage"
    //         />
    //     ),
    //     baseToolBoxXml: arduinoBaseToolBox,
    //     programMode: ['upload'],
    //     programLanguage: ['block', 'c', 'cpp'],
    //     tags: ['arduino'],
    //     helpLink: 'https://arduino-esp8266.readthedocs.io/en/3.0.0/index.html'
    // },
    
    // {
    //     name: 'Micro:bit V2',
    //     deviceId: 'microbitV2',
    //     manufactor: 'microbit.org',
    //     learnMore: 'https://microbit.org/',
    //     type: DeviceType.microbit,
    //     iconURL: microbitV2IconURL,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="Upgraded processor, built-In speaker and microphone, touch sensitive logo."
    //             description="Description for the micro:bit V2 device"
    //             id="gui.device.microbitV2.description"
    //         />
    //     ),
    //     featured: true,
    //     disabled: false,
    //     bluetoothRequired: false,
    //     serialportRequired: true,
    //     defaultBaudRate: '115200',
    //     internetConnectionRequired: false,
    //     launchPeripheralConnectionFlow: true,
    //     useAutoScan: false,
    //     connectionIconURL: microbitV2ConnectionIconURLL,
    //     connectionSmallIconURL: microbitV2ConnectionSmallIconURL,
    //     connectingMessage: (
    //         <FormattedMessage
    //             defaultMessage="Connecting"
    //             description="Message to help people connect to their device."
    //             id="gui.device.microbitV2.connectingMessage"
    //         />
    //     ),
    //     baseToolBoxXml: microbitBaseToolBox,
    //     programMode: ['upload'],
    //     programLanguage: ['block', 'microPython'],
    //     tags: ['microPython'],
    //     helpLink: 'https://microbit.org/get-started/first-steps/introduction/'
    // },
    {
        name: 'Makey Makey',
        deviceId: 'makeyMakey',
        manufactor: 'makeymakey.com',
        learnMore: 'https://makeymakey.com/',
        type: DeviceType.arduino,
        iconURL: makeymakeyIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Make anything into a key."
                description="Description for the Makey Makey device"
                id="gui.device.makeymakey.description"
            />
        ),
        featured: true,
        disabled: false,
        bluetoothRequired: false,
        serialportRequired: true,
        defaultBaudRate: '115200',
        internetConnectionRequired: false,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: makeymakeyConnectionIconURL,
        connectionSmallIconURL: makeymakeyConnectionSmallIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their device."
                id="gui.device.makeyMakey.connectingMessage"
            />
        ),
        baseToolBoxXml: arduinoBaseToolBox,
        programMode: ['upload'],
        programLanguage: ['block', 'c', 'cpp'],
        tags: ['arduino'],
        helpLink: 'https://makeymakey.com'
    },
    /**
     * For those parent devices that exist in VM but are not displayed in GUI
     */
    {
        deviceId: 'arduinoUnoUltra',
        type: DeviceType.arduino,
        featured: true,
        disabled: false,
        hide: true,
        baseToolBoxXml: arduinoBaseToolBox
    }
];

/**
 * To get real device id. eg: the third party id like ironKit_arduinoUno.
 * @param {string} deviceId - the id of the device.
 * @return {string} deviceId - the real device id.
 */
const analysisRealDeviceId = deviceId => {
    if (deviceId){
        // if the id contain '_' use the string afer the '_'.
        if (deviceId.indexOf('_') !== -1) {
            deviceId = deviceId.split('_')[1];
        }
    }
    return deviceId;
};

/**
 * Make device data from the input data. If it is a buid-in device, return the buid-in
 * data. If it is a third party device, find it's parent device, and overwrite its attributes
 * with the input data.
 * @param {string} deviceList - the list of devices.
 * @return {string} fullData - processed data of devices.
 */
const makeDeviceLibrary = (deviceList = null) => {
    let regeneratedDeviceData = [];

    if (deviceList) {
        deviceList.forEach(dev => {
            // Check if this is a build-in device.
            const matchedDevice = deviceData.find(item => dev.deviceId === item.deviceId);
            if (matchedDevice) {
                matchedDevice.isLoaded = dev.isLoaded;
                return regeneratedDeviceData.push(matchedDevice);
            }

            // This is a third party device. Try to parse it's parent deivce.
            const realDeviceId = analysisRealDeviceId(dev.deviceId);
            if (realDeviceId) {
                const parentDevice = deviceData.find(item => realDeviceId === item.deviceId);
                if (parentDevice) {
                    parentDevice.isLoaded = dev.isLoaded;
                    return regeneratedDeviceData.push(defaultsDeep({}, dev, {hide: false}, parentDevice));
                }
            }
            log.warn('Cannot find this device or it\'s parent device :', dev.deviceId);
            return null;
        });

        // regeneratedDeviceData.unshift(deviceData[0]); // add unselect deive in the head.
    } else {
        regeneratedDeviceData = deviceData;
    }

    return regeneratedDeviceData;
};

export {
    deviceData as default,
    makeDeviceLibrary
};
