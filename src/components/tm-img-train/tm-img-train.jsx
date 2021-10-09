import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState, useEffect, useRef, createRef } from "react";
import {
    Button,
    Input,
    Modal,
    Row,
    Col,
    InputNumber,
    Slider,
    Tooltip,
} from "antd";
const tf = require("@tensorflow/tfjs");
const mobilenetModule = require("./mobilenet.js");
const knnClassifier = require("@tensorflow-models/knn-classifier");
import VMScratchBlocks from "../../lib/blocks";

import "./tm-img-train.css";

const sectionHeight = 176;
const TOPK = 10;
const classifier = knnClassifier.create();
window.imageClassifier = classifier;

const ImagePreview = (props) => {
    const { className, vm } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [sampleList, setSampleList] = useState([]);
    const [sampleNameList, setSampleNameList] = useState([]);
    const [deviceList, setDeviceList] = useState([]);
    const [deviceId, setDeviceId] = useState("");
    const [modelResult, setModelResult] = useState({});
    const [curveHeight, setCurveHeight] = useState(500);
    const [lineStart, setLineStart] = useState(500);
    const [scrollTop, setScrollTop] = useState(0);
    const [loading, setLoading] = useState(false);
    const [newVisible, setNewVisible] = useState(false);
    const [newModelNum, setNewModelNum] = useState(3);
    const [numClasses, setNumClasses] = useState(0);
    const buttonTimer = createRef();
    const mobilenet = useRef();
    const sampleListRef = useRef(sampleList);
    const videoCanvas = useRef();
    const myVideo = useRef();
    const canvasCtx = useRef();
    const learningSectionRef = useRef();
    const training = useRef(-1);
    const isClear = useRef(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
    };

    const showNewModel = () => {
        setNewModelNum(3);
        setNewVisible(true);
    };

    const hideNewModel = () => {
        setNewVisible(false);
    };

    const newModel = () => {
        start(newModelNum, true);
        hideNewModel();
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
                };
            })
            .catch((err) => {
                // 捕获错误
                console.log(err);
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

    const start = (number, newFlag) => {
        const numClasses = classifier.getNumClasses();
        startVideo();
        showModal();
        if (numClasses) {
            if (newFlag) {
                document.querySelectorAll('[id^="list_"]').forEach(item => item.getContext("2d").clearRect(0, 0, 114, 114))
                number = number || 3;
                initializeSample(number);
                initializeMobilenet();
                startTimer();
                classifier.clearAllClasses();
            } else return;
        } else {
            number = number || 3;
            initializeSample(number);
            initializeMobilenet();
            startTimer();
        }
    };

    const initializeMobilenet = async () => {
        if (!mobilenet.current) {
            setLoading(true);
            const res = await mobilenetModule.load();
            mobilenet.current = res;
            setLoading(false);
        }
    };

    const initializeSample = (number) => {
        let newSampleList = [];
        let newSampleNameList = [];
        for (let i = 0; i < number; i++) {
            newSampleList.push({
                list: [],
                className: "分类" + (i + 1),
                confidence: 0,
            });
            newSampleNameList.push("分类" + (i + 1));
        }
        setSampleList(newSampleList);
        setSampleNameList(newSampleNameList);
        window.imgClassNameList = newSampleNameList;
        sampleListRef.current = newSampleList;
        setCurveHeight(sectionHeight * number + 16 * (number - 1));
    };

    const scrollSection = (e) => {
        const scrollTop = e.target.scrollTop;
        setLineStart(scrollTop + learningSectionRef.current.offsetHeight / 2);
        setScrollTop(scrollTop);
    };

    const trainSimple = (index, e) => {
        training.current = index;
    };

    const stopTrain = () => {
        training.current = -1;
    };

    const animate = () => {
        try {
            // Get image data from video element
            const image = tf.fromPixels(myVideo.current);

            let logits;
            // 'conv_preds' is the logits activation of MobileNet.
            const infer = () => mobilenet.current.infer(image, "conv_preds");

            // Train class if one of the buttons is held down
            if (training.current != -1) {
                logits = infer();
                const _canvasCtx = videoCanvas.current.getContext("2d");
                _canvasCtx.drawImage(myVideo.current, 0, 0, 114 / 3, 114 / 3);
                let data = _canvasCtx.getImageData(
                    0,
                    0,
                    114,
                    114
                    // videoCanvas.current.width,
                    // videoCanvas.current.height
                );
                const currentList =
                    sampleListRef.current[training.current].list;
                if (isClear.current) {
                    const listCtx = document
                        .getElementById(`list_${training.current}`)
                        .getContext("2d");
                    listCtx.clearRect(0, 0, 114, 114);
                    sampleListRef.current[training.current].list = new Array();
                    sampleListRef.current[training.current].confidence = 0;
                    classifier.clearClass(training.current);
                } else {
                    currentList.push(data);
                    classifier.addExample(logits, training.current); // Add current image to classifier
                    // 绘制样本区域
                    const listCtx = document
                        .getElementById(`list_${training.current}`)
                        .getContext("2d");
                    let cols = 0;
                    let rows = 0;
                    for (
                        let index = 0;
                        index < currentList.length;
                        index += 1
                    ) {
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
                }
                setSampleList((prev) => sampleListRef.current);
            }

            const numClasses = classifier.getNumClasses();
            setNumClasses(numClasses);
            if (numClasses > 0) {
                // If classes have been added run predict
                logits = infer();
                classifier.predictClass(logits, TOPK).then((res) => {
                    setModelResult({
                        index: res.classIndex,
                        confidence: res.confidences[res.classIndex],
                        className:
                            sampleListRef.current[res.classIndex].className,
                    });
                    for (let i = 0; i < sampleListRef.current.length; i++) {
                        sampleListRef.current[i].confidence =
                            res.confidences[i];
                        setSampleList(() => sampleListRef.current);
                        // Make the predicted class bold
                        if (res.classIndex == i) {
                        } else {
                            // this.infoTexts[i].style.fontWeight = "normal";
                        }
                    }
                });
            } else {
                setModelResult({});
            }

            // Dispose image when done
            image.dispose();
            if (logits != null) {
                logits.dispose();
            }
            buttonTimer.current = requestAnimationFrame(animate);
        } catch (error) {
            console.log("animate error:", error);
            buttonTimer.current = requestAnimationFrame(animate);
        }
    };

    const startTimer = () => {
        if (buttonTimer.current) {
            stopTimer();
        }
        buttonTimer.current = requestAnimationFrame(animate);
        setLineStart(
            learningSectionRef.current.scrollTop +
                learningSectionRef.current.offsetHeight / 2
        );
    };

    const stopTimer = () => {
        cancelAnimationFrame(buttonTimer.current);
    };

    const changeClassName = (index, e) => {
        const { value } = e.target;
        sampleListRef.current[index].className = value;
        setSampleList(sampleListRef.current);
        sampleNameList[index] = value;
        setSampleNameList(sampleNameList);
        window.imgClassNameList = sampleNameList;
    };

    const resetClass = (index) => {
        training.current = index;
        isClear.current = true;
        setTimeout(() => {
            training.current = -1;
            isClear.current = false;
        });
    };

    const useModel = () => {
        if (numClasses !== sampleList.length) return;
        vm.runtime.emit("use_model", sampleNameList);
        hideModal();
    };

    useEffect(() => {
        findDevice();
        console.log("机器学习图像分类窗口初始化");
        vm.runtime.on("start_img_train", start);
        // start(3);
        window.onresize = () =>
            setLineStart(
                learningSectionRef.current.scrollTop +
                    learningSectionRef.current.offsetHeight / 2
            );
    }, []);

    useEffect(() => {
        // if (!mobilenet.current) return;
        // buttonTimer.current = requestAnimationFrame(animate);
        // return () => cancelAnimationFrame(buttonTimer.current);
    }, []);

    // 关媒体调用
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
        }
    }, [isModalVisible]);

    useEffect(() => {
        setDeviceId(deviceList.length && deviceList[0].key);
    }, [deviceList]);

    useEffect(() => {
        setLineStart(
            learningSectionRef.current.scrollTop +
                learningSectionRef.current.offsetHeight / 2
        );
    }, [learningSectionRef.current]);

    return (
        <>
            <section className={isModalVisible ? "tm-page visible" : "tm-page"}>
                {loading ? (
                    <div className="no-device-mask">
                        <i
                            className="anticon anticon-loading"
                            style={{ fontSize: "2rem" }}
                        >
                            <svg
                                viewBox="0 0 1024 1024"
                                className="anticon-spin"
                                data-icon="loading"
                                width="1em"
                                height="1em"
                                fill="currentColor"
                            >
                                <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
                            </svg>
                        </i>
                        <br />
                        <p>模型资源加载中……</p>
                    </div>
                ) : null}
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
                                        mute
                                    ></video>
                                    <canvas
                                        ref={videoCanvas}
                                        style={{
                                            position: "absolute",
                                            left: 0,
                                            right: 0,
                                            width: "100%",
                                            height: "100%",
                                            zIndex: -1,
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
                                            <div
                                                className="sample-wrapper"
                                                onClick={resetClass.bind(
                                                    this,
                                                    index
                                                )}
                                            >
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
                                                value={sampleNameList[index]}
                                                // value={item.className}
                                                type="text"
                                                onChange={changeClassName.bind(
                                                    this,
                                                    index
                                                )}
                                            />
                                            <div className="confidence">
                                                <span className="text">
                                                    {item.confidence
                                                        ? `${(
                                                              item.confidence *
                                                              100
                                                          ).toFixed(2)}%`
                                                        : ""}
                                                </span>
                                                <span
                                                    className="bar"
                                                    style={{
                                                        backgroundColor:
                                                            "rgb(149, 222, 100)",
                                                        width: `${
                                                            item.confidence *
                                                            100
                                                        }%`,
                                                    }}
                                                ></span>
                                            </div>
                                            <Button
                                                className="learn-btn"
                                                onTouchStart={trainSimple.bind(
                                                    this,
                                                    index
                                                )}
                                                onMouseDown={trainSimple.bind(
                                                    this,
                                                    index
                                                )}
                                                onMouseUp={stopTrain}
                                                onTouchEnd={stopTrain}
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
                                                d={`M0,${lineStart} C107.72549019607843,${lineStart} 0,${
                                                    sectionHeight / 2 +
                                                    index * (sectionHeight + 16)
                                                } 134,${
                                                    sectionHeight / 2 +
                                                    index * (sectionHeight + 16)
                                                }`}
                                                stroke={
                                                    training.current == index
                                                        ? `#b7eb8f`
                                                        : `#ccc`
                                                }
                                                strokeWidth="1.5px"
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
                                                stroke={
                                                    modelResult.index == index
                                                        ? `#b7eb8f`
                                                        : `#ccc`
                                                }
                                                strokeWidth="1.5px"
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
                            <div>{modelResult.className}</div>
                        </div>
                    </div>
                </section>
                <footer className="tm-footer">
                    <Button
                        className="tm-footer-btn tm-footer-btn-new"
                        onClick={showNewModel}
                    >
                        新建模型
                    </Button>
                    <Tooltip
                        title={
                            numClasses !== sampleList.length
                                ? "所有分类训练后才可以使用模型"
                                : ""
                        }
                        className="tm-footer-btn"
                        style={{
                            cursor:
                                numClasses !== sampleList.length
                                    ? "not-allowed"
                                    : "pointer",
                        }}
                    >
                        <Button
                            onClick={useModel}
                            disabled={numClasses !== sampleList.length}
                        >
                            使用模型
                        </Button>
                    </Tooltip>
                </footer>
            </section>
            <Modal
                title="新建模型"
                visible={newVisible}
                onCancel={hideNewModel}
                onOk={newModel}
                width={400}
            >
                <p>模型分类数量：</p>
                <Slider
                    min={1}
                    max={20}
                    onChange={(v) => {
                        setNewModelNum(v);
                    }}
                    value={typeof newModelNum === "number" ? newModelNum : 0}
                />
                <InputNumber
                    min={1}
                    max={20}
                    value={newModelNum}
                    onChange={(v) => {
                        setNewModelNum(v);
                    }}
                />

                {/* <Row>
                    <Col span={12}>
                        <Slider
                            min={1}
                            max={20}
                            onChange={() => {}}
                            value={
                                typeof newModelNum === "number" ? newModelNum : 0
                            }
                        />
                    </Col>
                    <Col span={4}>
                        <InputNumber
                            min={1}
                            max={20}
                            value={newModelNum}
                            onChange={() => {}}
                        />
                    </Col>
                </Row> */}
            </Modal>
        </>
    );
};

ImagePreview.propTypes = {
    className: PropTypes.string,
};

export default ImagePreview;
