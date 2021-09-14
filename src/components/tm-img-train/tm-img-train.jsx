import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";

const ImagePreview = (props) => {
    const { className, vm } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
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
        <Modal
            title="机器学习 - 图像分类"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    返回
                </Button>,
            ]}
        >
            
        </Modal>
    );
};

ImagePreview.propTypes = {
    className: PropTypes.string,
};

export default ImagePreview;
