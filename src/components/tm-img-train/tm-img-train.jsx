import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Modal, Button, Input } from "antd";

import "./tm-img-train.css";

const ImagePreview = (props) => {
    const { className, vm } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [sampleList, setSampleList] = useState([]);
    const [modelResult, setModelResult] = useState(1);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const start = (number) => {
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
    };

    useEffect(() => {
        console.log("机器学习图像分类窗口初始化");
        vm.runtime.on("start_img_train", start);
        // start(10);
    }, []);

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
                                    <video className="video"></video>
                                </section>
                                <div>
                                    <svg>
                                        <text></text>
                                    </svg>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="learning-container">
                        <div className="learning-section">
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
                                                <canvas
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
                                            <Button className="learn-btn">
                                                学 习
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                            <div
                                id="wiresLeft"
                                class="wires wires-left"
                            ></div>
                            <div
                                id="wiresRight"
                                class="wires wires-right"
                            ></div>
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
