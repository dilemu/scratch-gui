import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState, useEffect, createRef, useRef } from "react";
import Recorder from "recorder-core";
import "recorder-core/src/extensions/wavesurfer.view";
import "recorder-core/src/engine/pcm";
import Draggable from "react-draggable";
const tf = require("@tensorflow/tfjs");
const mobilenetModule = require("../tm-img-train/mobilenet.js");

import "./web-cam.css";

const TOPK = 10;

const WebCamComponent = (props) => {
    const { className, vm } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalHide, setIsModalHide] = useState(false);
    const [type, setType] = useState([]);
    const [uuid, setUuid] = useState(Math.random());
    const [bounds, setBounds] = useState(null);
    const [countDown, setCountDown] = useState(0);
    const intervalRef = useRef(null);
    const videoCanvas = useRef();
    const myVideo = useRef();
    const draggleRef = createRef();
    const audioRec = useRef();
    const canvasCtx = useRef();
    const predictTimer = useRef();
    const mobilenet = useRef();
    const [capture, setCapture] = useState("");
    const [deviceList, setDeviceList] = useState([]);
    const [deviceId, setDeviceId] = useState("");
    const [countDownAnimation, setCountDownAnimation] = useState(0);
    const [predictResult, setPredictResult] = useState({});
    const imageClassifierList = useRef([]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
    };

    const handleHide = () => {
        setIsModalHide(!isModalHide);
    };

    const handleCancel = () => {
        vm.runtime.emit(uuid, null);
        hideModal();
    };

    const start = (options) => {
        ClearCountdownTimeout();
        vm.runtime.emit(uuid, null);
        showModal();
        const { uuid: newUuid, type, countDown, duration } = options;
        setUuid(newUuid);
        setType(type);
        startVideo(options);
        if (countDown) {
            setTimeout(() => {
                startTimeout(countDown);
            }, 100);
        }
    };

    const onDraggableStart = (event, uiData) => {
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
        canvasCtx.current = videoCanvas.current.getContext("2d");
    };

    const startVideo = (options) => {
        const { duration, uuid, type } = options;
        if (!Recorder.IsOpen()) {
            let wave;
            audioRec.current = Recorder({
                type: "pcm",
                play: false,
                sampleRate: 16000,
                audioTrackSet: {
                    autoGainControl: true,
                    echoCancellation: true,
                    noiseSuppression: true,
                },
                onProcess: function (
                    buffers,
                    powerLevel,
                    bufferDuration,
                    bufferSampleRate
                ) {
                    wave.input(
                        buffers[buffers.length - 1],
                        powerLevel,
                        bufferSampleRate
                    ); //输入音频数据，更新显示波形
                },
            });
            audioRec.current.open(function () {
                wave = Recorder.WaveSurferView({
                    elem: "#myAudio",
                    position: -1,
                    duration: 3000,
                    linear: [0, "#BAE7FF", 1, "#BAE7FF"],
                });
                audioRec.current.start();
                if (duration) {
                    let durationMs = parseInt(duration) * 1000;
                    audioRec.current.start();
                    setTimeout(() => {
                        audioRec.current.stop((blob) => {
                            getAudio(uuid, blob);
                        });
                    }, durationMs);
                }
            });
        } else {
            if (duration) {
                let durationMs = parseInt(duration) * 1000;
                audioRec.current.start();
                setTimeout(() => {
                    audioRec.current.stop((blob) => {
                        getAudio(uuid, blob);
                    });
                }, durationMs);
            }
        }
        navigator.mediaDevices
            .getUserMedia({
                audio: false,
                video: {
                    deviceId,
                },
            })
            .then((stream) => {
                myVideo.current.srcObject = stream;
                myVideo.current.onloadedmetadata = () => {
                    videoCanvas.current.width = myVideo.current.width;
                    videoCanvas.current.height = myVideo.current.height;
                    canvasFrame();
                };
                if (type === "tm") {
                    initializeMobilenet();
                }
            })
            .catch((err) => {
                // 捕获错误
                console.log(err);
            });
    };

    const initializeMobilenet = async () => {
        if (!mobilenet.current) {
            const res = await mobilenetModule.load();
            mobilenet.current = res;
            predictTimer.current = requestAnimationFrame(animate);
        } else {
            predictTimer.current = requestAnimationFrame(animate);
        }
    };

    const getCanvasBase64 = () => {
        return videoCanvas.current.toDataURL("image/jpeg", 1);
    };

    const getAudio = (uuid, blob) => {
        vm.runtime.emit(uuid, blob);
    };

    const getPhoto = () => {
        setCapture(getCanvasBase64());
        vm.runtime.emit(uuid, dataURLToBlob(getCanvasBase64()));
    };

    const clearPhoto = () => {
        setCapture("");
    };

    const canvasFrame = () => {
        canvasCtx.current.drawImage(
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
        clearPhoto();
        clearTimeout(intervalRef.current);
        setCountDownAnimation(0);
        setTimeout(() => {
            setCountDown(count);
            setCountDownAnimation(count);
        });
    };

    const ClearCountdownTimeout = () => {
        clearTimeout(intervalRef.current);
        setCountDownAnimation(0);
        setCountDown(0);
    };

    const animate = () => {
        console.log('web cam animate')
        // Get image data from video element
        const image = tf.fromPixels(myVideo.current);

        let logits;
        // 'conv_preds' is the logits activation of MobileNet.
        const infer = () => mobilenet.current.infer(image, "conv_preds");
        const numClasses = window.imageClassifier.getNumClasses();
        if (numClasses > 0) {
            // If classes have been added run predict
            logits = infer();
            window.imageClassifier.predictClass(logits, TOPK).then((res) => {
                setPredictResult({
                    index: res.classIndex,
                    confidence: res.confidences[res.classIndex],
                    className: window.imgClassNameList[res.classIndex],
                });
                const _imageClassifierList = [];
                for (let i = 0; i < window.imgClassNameList.length; i++) {
                    _imageClassifierList.push({
                        className: window.imgClassNameList[i],
                        confidence: res.confidences[i],
                    });
                    imageClassifierList.current = _imageClassifierList;
                }
            });
        } else {
            setPredictResult({});
        }

        // Dispose image when done
        image.dispose();
        if (logits != null) {
            logits.dispose();
        }
        predictTimer.current = requestAnimationFrame(animate);
    };

    const imgPredictResult = (name) => {
        // const result = imageClassifierList.current.length && imageClassifierList.current.find(className => className === name);
        vm.runtime.emit("img_predict_result", imageClassifierList.current);
    };

    useEffect(() => {
        setDeviceId(deviceList.length && deviceList[0].key);
    }, [deviceList]);

    useEffect(() => {
        if (isModalVisible) return;
        else {
            const tracks =
                myVideo.current &&
                myVideo.current.srcObject &&
                myVideo.current.srcObject.getTracks();
            tracks &&
                tracks.forEach((t) => {
                    t.stop();
                });
            audioRec.current && audioRec.current.close();
            cancelAnimationFrame(predictTimer.current);
        }
    }, [isModalVisible]);

    useEffect(() => {
        findDevice();
        vm.runtime.on("start_web_cam", start);
        vm.runtime.on("start_img_predict_result", imgPredictResult);
        vm.runtime.on("start_img_predict", start);
    }, []);

    useEffect(() => {
        intervalRef.current = setTimeout(() => {
            if (countDown && countDown > 0) {
                setCountDown((pre) => pre - 1);
            } else {
                getPhoto();
                setCountDownAnimation(0);
            }
        }, 1000);
    }, [countDown]);

    return (
        <Draggable
            bounds={bounds}
            onDraggableStart={(event, uiData) =>
                onDraggableStart(event, uiData)
            }
        >
            <section
                className="webrtc-window"
                style={{ display: isModalVisible ? "block" : "none" }}
                ref={draggleRef}
            >
                <header className="webrtc-header">
                    <h2 className="title">多媒体窗口</h2>
                    <span className="actions">
                        <button className="webrtc-btn">
                            <i
                                className="cssicon cssicon-down"
                                onClick={handleHide}
                            ></i>
                        </button>{" "}
                        <button className="webrtc-btn">
                            <i
                                className="cssicon cssicon-close"
                                onClick={handleCancel}
                            ></i>
                        </button>
                    </span>
                </header>{" "}
                <section
                    className="webrtc-main"
                    style={{ display: isModalHide ? "none" : "block" }}
                >
                    <section className="webrtc-content webrtc-webcam">
                        <section className="webrtc-device-list"></section>
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
                                    src={capture}
                                    className="preview-img"
                                    style={{
                                        opacity:
                                            type === "tm" ? "0" : "inherit",
                                    }}
                                />
                            </span>
                            <span></span>
                            <video
                                ref={myVideo}
                                id="myVideo"
                                autoPlay="autoplay"
                                width="480"
                                height="360"
                                mute
                            ></video>
                            <canvas
                                ref={videoCanvas}
                                width="480"
                                height="360"
                            ></canvas>
                        </section>
                        <span
                            className="tm-result"
                            style={{
                                display: type === "tm" ? "block" : "none",
                            }}
                        >
                            <span className="predict-result">
                                {Object.keys(predictResult).length
                                    ? `${predictResult.className}（${(
                                          predictResult.confidence * 100
                                      ).toFixed(2)}）`
                                    : ""}
                            </span>
                            <span
                                className="predict-process"
                                style={{
                                    width: `${predictResult.confidence * 100}%`,
                                }}
                            ></span>
                        </span>
                    </section>
                    <section className="webrtc-content webrtc-recorder">
                        <section className="webrtc-device-list">
                            <select onChange={deviceChange}>
                                {deviceList.map((device, index) => {
                                    return (
                                        <option value={device.key} key={index}>
                                            {device.value}
                                        </option>
                                    );
                                })}
                            </select>
                        </section>{" "}
                        <section
                            className="recorder-content"
                            id="myAudio"
                        ></section>
                    </section>
                </section>
            </section>
        </Draggable>
    );
};

WebCamComponent.propTypes = {
    className: PropTypes.string,
};

function dataURLToBlob(dataurl) {
    var arr = dataurl.split(",");
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

export default WebCamComponent;
