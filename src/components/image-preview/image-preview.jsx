import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";

const ImagePreview = (props) => {
    const { className, vm } = props;
    const [uuid, setUuid] = useState(Math.random());
    const [imageSrc, setImageSrc] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setImageSrc("");
    };

    const start = (base64) => {
        setImageSrc("");
        if (base64) {
            let myBlob = dataURLtoBlob(base64);
            let myUrl = URL.createObjectURL(myBlob);
            setImageSrc(myUrl);
        }
        showModal();
        console.log("图片预览窗口：");
    };

    const dataURLtoBlob = (dataurl) => {
        let arr = dataurl.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };

    const downloadFile = () => {
        let a = document.createElement("a");
        a.setAttribute("href", imageSrc);
        a.setAttribute("download", "保存图片.png");
        a.setAttribute("target", "_blank");
        let clickEvent = document.createEvent("MouseEvents");
        clickEvent.initEvent("click", true, true);
        a.dispatchEvent(clickEvent);
    };

    useEffect(() => {
        console.log("上传窗口初始化");
        vm.runtime.on("start_img_preview", start);
    }, []);

    return (
        <Modal
            title="图片预览"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    返回
                </Button>,
                <Button key="confirm" type="primary" onClick={downloadFile}>
                    保存图片
                </Button>,
            ]}
        >
            <img id="foo" src={imageSrc} />
        </Modal>
    );
};

ImagePreview.propTypes = {
    className: PropTypes.string,
};

export default ImagePreview;
