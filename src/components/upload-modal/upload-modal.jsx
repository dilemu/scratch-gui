import React, { useState } from "react";
import { Modal, Button, Upload, UploadOutlined } from "antd";

const UploadModal = props => {
    const [isModalVisible, setIsModalVisible] = useState(true);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const props = {
        name: "file",
        onChange(info) {
            if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <Modal
            title="上传"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
        </Modal>
    );
};

export default UploadModal;
