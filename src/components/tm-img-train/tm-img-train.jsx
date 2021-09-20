import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState, useEffect, useRef, createRef } from "react";
import { Button, Input } from "antd";
const tf = require("@tensorflow/tfjs");
const mobilenetModule = require("./mobilenet.js");
const knnClassifier = require("@tensorflow-models/knn-classifier");

import "./tm-img-train.css";

const sectionHeight = 176;
const TOPK = 10;

const ImagePreview = (props) => {
    const { className, vm } = props;
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [sampleList, setSampleList] = useState([]);
    const [deviceList, setDeviceList] = useState([]);
    const [deviceId, setDeviceId] = useState("");
    const [modelResult, setModelResult] = useState(1);
    const [curveHeight, setCurveHeight] = useState(500);
    const [lineStart, setLineStart] = useState(500);
    const [mobilenet, setMobilenet] = useState({});
    const [scrollTop, setScrollTop] = useState(0);
    const buttonTimer = createRef();
    const videoCanvas = useRef();
    const myVideo = useRef();
    const canvasCtx = useRef();
    const learningSectionRef = useRef();
    let training = -1;

    const classifier = knnClassifier.create();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
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

    const start = (number) => {
        number = number || 3;
        showModal();
        let newSampleList = [];
        for (let i = 0; i < number; i++) {
            newSampleList.push({
                list: [],
                className: "分类" + i,
                confidence: 0,
            });
        }
        setSampleList(newSampleList);
        setCurveHeight(sectionHeight * number + 16 * (number - 1));
        mobilenetModule.load().then((res) => {
            setMobilenet(res);
            startTimer();
        });
    };

    const scrollSection = (e) => {
        const scrollTop = e.target.scrollTop;
        setLineStart(scrollTop + e.target.offsetHeight / 2);
        setScrollTop(scrollTop);
    };

    const trainSimple = (index, e) => {
        training = index;
        const canvasCtx = videoCanvas.current.getContext("2d");
        canvasCtx.drawImage(
            myVideo.current,
            0,
            0,
            videoCanvas.current.width,
            videoCanvas.current.height
        );
        let data = canvasCtx.getImageData(
            0,
            0,
            videoCanvas.current.width,
            videoCanvas.current.height
        );
        const currentList = sampleList[index].list;
        currentList.push(data);
        const listCtx = document
            .getElementById(`list_${index}`)
            .getContext("2d");
        let cols = 0;
        let rows = 0;
        for (let index = 0; index < currentList.length; index += 1) {
            listCtx.putImageData(
                currentList[index],
                cols * (114 / 3),
                rows * (114 / 3),
                0,
                0,
                114 / 3,
                114 / 3
            );
            if (cols === 2) {
                rows += 1;
                cols = 0;
            } else {
                cols += 1;
            }
        }
        // const img = tf.fromPixels(myVideo.current);
        // const logits = mobilenet.infer(img, "conv_preds");
        // classifier.addExample(logits, index);
    };

    const stopTrain = () => {
        training = -1;
    };

    const animate = async () => {
        // Get image data from video element
        const image = tf.fromPixels(myVideo.current);

        let logits;
        // 'conv_preds' is the logits activation of MobileNet.
        const infer = () => mobilenet.infer(image, "conv_preds");

        // Train class if one of the buttons is held down
        if (training != -1) {
            logits = infer();

            // Add current image to classifier
            classifier.addExample(logits, training);
        }

        const numClasses = classifier.getNumClasses();
        if (numClasses > 0) {
            // If classes have been added run predict
            logits = infer();
            const res = await classifier.predictClass(logits, TOPK);

            for (let i = 0; i < sampleList.length; i++) {
                // The number of examples for each class
                const exampleCount = classifier.getClassExampleCount();

                // Make the predicted class bold
                if (res.classIndex == i) {
                    console.log(res.classIndex);
                } else {
                    // this.infoTexts[i].style.fontWeight = "normal";
                }

                // Update info text
                if (exampleCount[i] > 0) {
                    console.log(exampleCount[i]);
                }
            }
        }

        // Dispose image when done
        image.dispose();
        if (logits != null) {
            logits.dispose();
        }
        buttonTimer.current = requestAnimationFrame(animate);
    };

    const startTimer = () => {
        if (buttonTimer.current) {
            stopTimer();
        }
        buttonTimer.current = requestAnimationFrame(animate);
    };

    const stopTimer = () => {
        cancelAnimationFrame(buttonTimer.current);
    };

    // setInterval(animate, 1000)

    useEffect(() => {
        findDevice();
        startVideo();
        console.log("机器学习图像分类窗口初始化");
        vm.runtime.on("start_img_train", start);
        start(5);
    }, []);

    useEffect(() => {
        setDeviceId(deviceList.length && deviceList[0].key);
    }, [deviceList]);

    useEffect(() => {
        setLineStart(learningSectionRef.current.offsetHeight / 2);
    }, [learningSectionRef.current]);

    return (
        <>
            <section className={isModalVisible ? "tm-page visible" : "tm-page"}>
                <button className="tm-close" onClick={hideModal}>
                    <i className="anticon anticon-close">
                        <svg
                            viewBox="64 64 896 896"
                            className=""
                            data-icon="close"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                        </svg>
                    </i>
                </button>
                <header className="tm-header">
                    <h1 className="tm-title">模型训练</h1>
                </header>
                <section className="teachable-container">
                    <div className="input-container">
                        <div className="input-section">
                            <section className="video-container">
                                <section className="video-wrap">
                                    <video
                                        ref={myVideo}
                                        autoPlay="autoplay"
                                        className="video"
                                        width="480"
                                        height="360"
                                    ></video>
                                    <canvas
                                        ref={videoCanvas}
                                        style={{
                                            position: "absolute",
                                            left: 0,
                                            right: 0,
                                            width: "100%",
                                            height: "100%",
                                            zIndex: 0,
                                        }}
                                    ></canvas>
                                </section>
                            </section>
                        </div>
                    </div>
                    <div className="learning-container">
                        <div
                            className="learning-section"
                            onScroll={scrollSection}
                            ref={learningSectionRef}
                        >
                            {sampleList.map((item, index) => {
                                return (
                                    <div
                                        className="learning-class-section "
                                        key={index}
                                    >
                                        <div className="sample-section">
                                            <div className="sample-count-wrapper">
                                                <span className="sample-count">
                                                    {item.list.length}
                                                </span>
                                                样本
                                            </div>
                                            <div className="sample-wrapper">
                                                <a className="reset-link">
                                                    重置
                                                </a>
                                                <img
                                                    className="close"
                                                    src="https://ext-cdn.makeblock.com/extlist/prod/extract/1301047349606486000/0368be00-7926-4a6e-9558-71cf99ff2bfe/tm/imgs/close.svg"
                                                ></img>
                                                <canvas
                                                    id={`list_${index}`}
                                                    className="canvas"
                                                    width="114"
                                                    height="114"
                                                ></canvas>
                                            </div>
                                        </div>
                                        <div className="learn-section">
                                            <Input
                                                className="input-text"
                                                placeholder={item.className}
                                                type="text"
                                            />
                                            <div className="confidence">
                                                <span className="text"></span>
                                                <span className="bar"></span>
                                            </div>
                                            <Button
                                                className="learn-btn"
                                                onMouseDown={trainSimple.bind(
                                                    this,
                                                    index
                                                )}
                                                onMouseUp={stopTrain}
                                                data-index={index}
                                            >
                                                学 习
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                            <div
                                id="wiresLeft"
                                className="wires wires-left"
                                style={{ height: curveHeight + "px" }}
                            >
                                <svg width="134" height={curveHeight}>
                                    {sampleList.map((item, index) => {
                                        return (
                                            <path
                                                d={`M0,${lineStart} C107.72549019607843,${
                                                    211 + scrollTop
                                                } 0,${
                                                    sectionHeight / 2 +
                                                    index * (sectionHeight + 16)
                                                } 134,${
                                                    sectionHeight / 2 +
                                                    index * (sectionHeight + 16)
                                                }`}
                                                stroke="#ccc"
                                                strokeWidth="1.5px"
                                                _stroke="40a9ff"
                                                fill="none"
                                                key={index}
                                            ></path>
                                        );
                                    })}
                                </svg>
                            </div>
                            <div
                                id="wiresRight"
                                className="wires wires-right"
                                style={{ height: curveHeight + "px" }}
                            >
                                <svg width="134" height={curveHeight}>
                                    {sampleList.map((item, index) => {
                                        return (
                                            <path
                                                d={`M0,${
                                                    sectionHeight / 2 +
                                                    index * (sectionHeight + 16)
                                                } C107.72549019607843,${
                                                    sectionHeight / 2 +
                                                    index * (sectionHeight + 16)
                                                } 0,${lineStart} 134,${lineStart}`}
                                                stroke="#ccc"
                                                strokeWidth="1.5px"
                                                _stroke="40a9ff"
                                                fill="none"
                                                key={index}
                                            ></path>
                                        );
                                    })}
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="output-container">
                        <div className="output-section">
                            <h2>结果</h2>
                            <div>{modelResult}</div>
                        </div>
                    </div>
                </section>
                <footer className="tm-footer">
                    <Button className="tm-footer-btn tm-footer-btn-new">
                        新建模型
                    </Button>
                    <span className="tm-footer-btn">
                        <Button>使用模型</Button>
                    </span>
                </footer>
            </section>
        </>
    );
};

ImagePreview.propTypes = {
    className: PropTypes.string,
};

export default ImagePreview;
