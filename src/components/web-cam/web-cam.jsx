import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState, useEffect, createRef, useRef } from "react";
import { Modal } from "antd";
import VideoRecorder from "react-video-recorder";
import Draggable from "react-draggable";
import request from "../../public/request";
import "./web-cam.css";

const ChooseCityComponent = (props) => {
    const { className, vm } = props;
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [cityList, setCityList] = useState([]);
    const [city, setCity] = useState({});
    const [uuid, setUuid] = useState(Math.random());
    const [bounds, setBounds] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [countDown, setCountDown] = useState(0);
    const intervalRef = useRef(null);
    const videoCanvas = useRef();
    const myVideo = useRef();
    const draggleRef = createRef();
    const [canvasCtx, setCanvasCtx] = useState("");
    const [capture, setCapture] = useState();
    const [deviceList, setDeviceList] = useState([]);
    const [deviceId, setDeviceId] = useState("");

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        vm.runtime.emit(uuid, city);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const start = (uuid) => {
        showModal();
        setUuid(uuid);
        console.log(uuid);
    };

    const onStart = (event, uiData) => {
        const { clientWidth, clientHeight } = window?.document?.documentElement;
        const targetRect = draggleRef?.current?.getBoundingClientRect();
        setBounds({
            left: -targetRect?.left + uiData?.x,
            right: clientWidth - (targetRect?.right - uiData?.x),
            top: -targetRect?.top + uiData?.y,
            bottom: clientHeight - (targetRect?.bottom - uiData?.y),
        });
    };

    const findDevice = () => {
        let exArray = [];
        setCanvasCtx(videoCanvas?.current?.getContext("2d"));
        //web rtc 调用摄像头(兼容性写法(谷歌、火狐、ie))
        navigator.getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;
        //遍历摄像头
        navigator.mediaDevices.enumerateDevices().then(function (sourceInfos) {
            for (var i = 0; i < sourceInfos.length; ++i) {
                // if (sourceInfos[i].kind == "videoinput") {
                exArray.push({
                    key: sourceInfos[i].deviceId,
                    value: sourceInfos[i].label,
                });
                // }
            }
            setDeviceList(exArray);
        });
    };

    const startVideo = () => {
        navigator.mediaDevices
            .getUserMedia({
                audio: true,
                video: {
                    deviceId,
                },
            })
            .then((stream) => {
              window.stream = stream;
              myVideo.current.srcObject = stream;
              myVideo.current.onloadedmetadata = () => {
                  myVideo.current.width = myVideo.current.offsetWidth;
                  myVideo.current.height = myVideo.current.offsetHeight;
                  videoCanvas.current.width = myVideo.current.width;
                  videoCanvas.current.height = myVideo.current.height;
                  canvasFrame();
              };
            })
            .catch((err) => {
                // 捕获错误
                console.log;
            });
    };

    const getCanvasBase64 = () => {
        return videoCanvas.current.toDataURL("image/jpeg", 1);
    };

    const canvasFrame = () => {
        canvasCtx.drawImage(
            myVideo.current,
            0,
            0,
            videoCanvas.current.width,
            videoCanvas.current.height
        );

        requestAnimationFrame(canvasFrame);
    };

    const deviceChange = (e) => {
        setDeviceId(e.target.value);
    };

    useEffect(() => {
        // console.log("选择城市初始化");
        // vm.runtime.on("start_choose_city", start);
        findDevice();
        setCountDown(10);
    }, [myVideo]);

    useEffect(() => {
        setDeviceId(deviceList.length && deviceList[0].key);
    }, [deviceList]);

    useEffect(() => {
        // console.log("选择城市初始化");
        // vm.runtime.on("start_choose_city", start);
        window.stream && window.stream.getTracks().forEach((track) => {
                track.stop();
            });
        startVideo();
    }, [deviceId]);

    // 组件卸载时清除计时器
    useEffect(() => {
        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);

    useEffect(() => {
        if (countDown === 59) {
            intervalRef.current = setInterval(() => {
                changeCount((preCount) => preCount - 1);
            }, 1000);
        } else if (countDown === 0) {
            clearInterval(intervalRef.current);
        }
    }, [countDown]);

    return (
        <Draggable
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
        >
            <section className="webrtc-window">
                <header className="webrtc-header">
                    <h2 className="title">RECOGNITION</h2>
                    <span className="actions">
                        <button className="webrtc-btn">
                            <i className="cssicon cssicon-down "></i>
                        </button>{" "}
                        <button className="webrtc-btn">
                            <i className="cssicon cssicon-close"></i>
                        </button>
                    </span>
                </header>{" "}
                <section className="webrtc-main">
                    <section className="webrtc-content webrtc-webcam">
                        <section className="webrtc-device-list"></section>{" "}
                        <section className="video-content">
                            <span
                                className="countdown-contanier"
                                style={{ animationIterationCount: 0 }}
                            >
                                {countDown}
                            </span>
                            <span className="preview-container ">
                                <span className="mask"></span>{" "}
                                <img
                                    alt="capture preview"
                                    src={capture}
                                    className="preview-img"
                                />
                            </span>{" "}
                            <span></span>
                            <video
                                ref={myVideo}
                                id="myVideo"
                                autoPlay="autoplay"
                                width="280"
                            ></video>
                            <canvas
                                ref={videoCanvas}
                                // style="background-color: transparent; display: block; max-width: 100%; max-height: 100%;"
                                width="480"
                                height="360"
                            ></canvas>
                        </section>
                    </section>{" "}
                    <section className="webrtc-content webrtc-recorder">
                        <section className="webrtc-device-list">
                            <select onChange={deviceChange}>
                                {deviceList.map((device) => {
                                    return (
                                        <option value={device.key}>
                                            {device.value}
                                        </option>
                                    );
                                })}
                            </select>
                        </section>{" "}
                        <section className="recorder-content">
                            <span></span>
                            <canvas
                                // style="background-color: transparent; display: block; max-width: 100%; max-height: 100%;"
                                width="272"
                                height="64"
                            ></canvas>
                        </section>
                    </section>
                </section>
            </section>
        </Draggable>
    );
};

ChooseCityComponent.propTypes = {
    className: PropTypes.string,
};

export default ChooseCityComponent;
