import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Modal, Button, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';

const UploadModal = props => {
    const { className, vm } = props;
    const [uuid, setUuid] = useState(Math.random());
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        vm.runtime.emit(uuid, null);
        setIsModalVisible(false);
    };

    const start = (uuid) => {
        showModal();
        setUuid(uuid);
        console.log('上传窗口：'+uuid);
    };

    useEffect(() => {
        console.log("上传窗口初始化");
        vm.runtime.on("start_upload_file", start);
    }, []);

    const uploadProps = {
        name: "file",
        beforeUpload: file => {
            vm.runtime.emit(uuid, file);
            handleCancel()
            return false
        },
        showUploadList: false
    };

    return (
        <Modal
            title="上传"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>返回</Button>
            ]}
        >
            <Upload {...uploadProps}>
                <Button type="primary" icon={<UploadOutlined />}>点击上传</Button>
            </Upload>
        </Modal>
    );
};

UploadModal.propTypes = {
    className: PropTypes.string,
};


export default UploadModal;
