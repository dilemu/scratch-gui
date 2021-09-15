import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import './tm-img-train.css'

const ImagePreview = (props) => {
    const { className, vm } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const start = (base64) => {
        showModal();
    };

    useEffect(() => {
        console.log("机器学习图像分类窗口初始化");
        vm.runtime.on("start_img_train", start);
    }, []);

    return (
        <>
            <section className={isModalVisible ? "tm-page visible": "tm-page"}>
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
                        <div className="input-section"></div>
                    </div>
                    <div className="learning-container">
                        <div className="learning-section">
                            <div className="learning-class-section ">
                                <div className="sample-section">
                                    <div
                                        className="sample-count-wrapper"
                                        style={{color: 'rgb(183, 235, 143)'}}
                                    >
                                        <span className="sample-count">3</span>样本
                                    </div>
                                    <div className="sample-wrapper">
                                        <a className="reset-link">重置</a>
                                        <img
                                            className="close"
                                            src="https://ext-cdn.makeblock.com/extlist/prod/extract/1301047349606486000/0368be00-7926-4a6e-9558-71cf99ff2bfe/tm/imgs/close.svg"
                                        />
                                        <canvas
                                            className="canvas"
                                            width="114"
                                            height="114"
                                        ></canvas>
                                    </div>
                                </div>
                                <div className="learn-section">
                                    <input
                                        className="ant-input input-text"
                                        placeholder="分类1"
                                        type="text"
                                        value=""
                                        style={{color: 'rgb(183, 235, 143)'}}
                                    />
                                    <div className="confidence">
                                        <span className="text">30.0%</span>
                                        <span
                                            className="bar"
                                            style={{backgroundColor: "rgb(221, 221, 221)", width: "30%"}}
                                        ></span>
                                    </div>
                                    <button
                                        type="button"
                                        className="ant-btn learn-btn"
                                        style={{color: "rgb(183, 235, 143)", borderColor: "rgb(183, 235, 143)",backgroundColor: "rgb(183, 235, 143) "}}
                                    >
                                        <span>学 习</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </>
        /* <Modal
            title="机器学习 - 图像分类"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    返回
                </Button>,
            ]}
        >
            
        </Modal> */
    );
};

ImagePreview.propTypes = {
    className: PropTypes.string,
};

export default ImagePreview;
