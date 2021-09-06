import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState, useEffect, createRef, useRef } from "react";
import { Modal } from "antd";
import VideoRecorder from "react-video-recorder";
import Draggable from "react-draggable";
import request from "../../public/request";
import "./web-cam.css";

const WebCamComponent = (props) => {
    const { className, vm } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalHide, setIsModalHide] = useState(false);
    const [type, setType] = useState([]);
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
    const [countDownAnimation, setCountDownAnimation] = useState(0);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleHide = () => {
        setIsModalHide(!isModalHide)
    }

    const handleCancel = () => {
        vm.runtime.emit(uuid, null);
        setIsModalVisible(false);
    };

    const start = (options) => {
        ClearTimeout()
        vm.runtime.emit(uuid, null);
        const { uuid: newUuid, type, countDown } = options;
        showModal();
        setTimeout(() => {
            findDevice();
        })
        setUuid(newUuid);
        setType(type)
        if (countDown) {
            setTimeout(() => {
                startTimeout(countDown);
            }, 100)
        }
    };

    const onStart = (event, uiData) => {
        const { clientWidth, clientHeight } = window.document.documentElement;
        const targetRect = draggleRef.current.getBoundingClientRect();
        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };

    const findDevice = () => {
        let exArray = [];
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
        setCanvasCtx(videoCanvas.current.getContext("2d"));
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
                    videoCanvas.current.width = myVideo.current.width;
                    videoCanvas.current.height = myVideo.current.height;
                    canvasFrame();
                };
            })
            .catch((err) => {
                // 捕获错误
                console.log(err);
            });
    };

    const getCanvasBase64 = () => {
        return videoCanvas.current.toDataURL("image/jpeg", 1);
    };
    
    const getPhoto = () => {
        setCapture(getCanvasBase64())
        vm.runtime.emit(uuid, dataURLToBlob(getCanvasBase64()));
    }

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

    const startTimeout = (count) => {
        clearTimeout(intervalRef.current);
        setCountDownAnimation(0);
        setTimeout(() => {
            setCountDown(count);
            setCountDownAnimation(count);
        });
    };

    const ClearTimeout = () => {
        clearTimeout(intervalRef.current);
        setCountDownAnimation(0);
        setCountDown(0);
    };

    // useEffect(() => {
    //     findDevice();
    // }, [myVideo]);

    useEffect(() => {
        setDeviceId(deviceList.length && deviceList[0].key);
    }, [deviceList]);

    useEffect(() => {
        window.stream &&
            window.stream.getTracks().forEach((track) => {
                track.stop();
            });
        startVideo();
    }, [deviceId]);

    useEffect(() => {
        vm.runtime.on("start_web_cam", start);
    }, []);

    useEffect(() => {
        intervalRef.current = setTimeout(() => {
            if (countDown > 0) {
                setCountDown((pre) => pre - 1);
            } else {
                getPhoto()
                setCountDownAnimation(0)
            }
        }, 1000);
    }, [countDown]);

    return (
        <Draggable
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
        >
            <section className="webrtc-window" style={{display: isModalVisible?'block':'none'}} ref={draggleRef}>
                <header className="webrtc-header">
                    <h2 className="title">RECOGNITION</h2>
                    <span className="actions">
                        <button className="webrtc-btn">
                            <i className="cssicon cssicon-down"  onClick={handleHide}></i>
                        </button>{" "}
                        <button className="webrtc-btn">
                            <i className="cssicon cssicon-close" onClick={handleCancel}></i>
                        </button>
                    </span>
                </header>{" "}
                <section className="webrtc-main" style={{display: isModalHide?'none':'block'}}>
                    <section className="webrtc-content webrtc-webcam">
                        <section className="webrtc-device-list"></section>{" "}
                        <section className="video-content">
                            <span
                                className={`countdown-contanier ${
                                    countDownAnimation ? "animate" : ""
                                }`}
                                style={{
                                    animationIterationCount: countDownAnimation,
                                }}
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
                                height="210"
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

WebCamComponent.propTypes = {
    className: PropTypes.string,
};

function dataURLToBlob(dataurl){
	var arr = dataurl.split(',');
	var mime = arr[0].match(/:(.*?);/)[1];
	var bstr = atob(arr[1]);
	var n = bstr.length;
	var u8arr = new Uint8Array(n);
	while(n--){
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], {type:mime});
}

export default WebCamComponent;
