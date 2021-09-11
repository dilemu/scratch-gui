import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Modal, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {handleFileUpload, costumeUpload} from '../../lib/file-uploader.js';

const UploadModal = (props) => {
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
        console.log("上传窗口：" + uuid);
    };

    useEffect(() => {
        console.log("上传窗口初始化");
        vm.runtime.on("start_upload_file", start);
        vm.runtime.on("add_stage", handleBackdropUpload)
        vm.runtime.on("add_costume", handleCostumeUpload)
    }, []);

    const uploadProps = {
        name: "file",
        beforeUpload: (file) => {
            vm.runtime.emit(uuid, file);
            handleCancel();
            return false;
        },
        showUploadList: false,
    };

    const handleBackdropUpload = (file)=>{
        const storage = vm.runtime.storage;
        handleFileUpload({files: [file]}, (buffer, fileType, fileName, fileIndex, fileCount) => {
            costumeUpload(buffer, fileType, storage, vmCostumes => {
                vmCostumes.forEach((costume, i) => {
                    costume.name = `${fileName}${i ? i + 1 : ''}`;
                });
                handleNewBackdrop(vmCostumes).then(() => {
                    console.log(`更换背景成功`);
                });
            }, err => console.log(err));
        }, err => console.log(err));
    }

    const handleCostumeUpload = (file) => {
        const storage = vm.runtime.storage;
        handleFileUpload({files: [file]}, (buffer, fileType, fileName, fileIndex, fileCount) => {
            costumeUpload(buffer, fileType, storage, vmCostumes => {
                vmCostumes.forEach((costume, i) => {
                    costume.name = `${fileName}${i ? i + 1 : ''}`;
                });
                handleNewCostume(vmCostumes).then(() => {
                    console.log(`更换角色成功`);
                });
            }, err => console.log(err));
        }, err => console.log(err));
    }

    const handleNewBackdrop = (backdrops_, shouldActivateTab = true) => {
        const backdrops = Array.isArray(backdrops_) ? backdrops_ : [backdrops_];
        return Promise.all(backdrops.map(backdrop =>
            vm.addBackdrop(backdrop.md5, backdrop)
        )).then(() => {
            // if (shouldActivateTab) {
            //     return this.props.onActivateTab(0);
            // }
        });
    }

    const handleNewCostume = (costume, fromCostumeLibrary, targetId) => {
        const costumes = Array.isArray(costume) ? costume : [costume];

        return Promise.all(costumes.map(c => {
            if (fromCostumeLibrary) {
                return vm.addCostumeFromLibrary(c.md5, c);
            }
            // If targetId is falsy, VM should default it to editingTarget.id
            // However, targetId should be provided to prevent #5876,
            // if making new costume takes a while
            return vm.addCostume(c.md5, c, targetId);
        }));
    }

    return (
        <Modal
            title="上传"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    返回
                </Button>,
            ]}
        >
            <Upload {...uploadProps}>
                <Button type="primary" icon={<UploadOutlined />}>
                    点击上传
                </Button>
                <img id="foo" />
            </Upload>
        </Modal>
    );
};

UploadModal.propTypes = {
    className: PropTypes.string,
};

export default UploadModal;
