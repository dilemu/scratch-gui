import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Modal, Select } from "antd";
import request from "../../public/request";

const { Option } = Select;

const ChooseCityComponent = (props) => {
    const { className, vm } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [cityList, setCityList] = useState([]);
    const [city, setCity] = useState({});
    const [uuid, setUuid] = useState(Math.random());

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        vm.runtime.emit(uuid, city);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const start = (uuid) => {
        showModal();
        setUuid(uuid);
        console.log(uuid);
    };

    const onSearch = (input) => {
        fetchCityList(input);
    };

    const onSelect = (value) => {
        setCity(cityList.find(elem => elem.value === value));
    };

    const fetchCityList = (query) => {
        if (!query) return;
        const url = "/api/weather/city";
        request({ url, data: { location: query }, method: "POST" })
            .then((res) => {
                if (res.code == 0) {
                    console.log("城市列表获取成功", res.data);
                    const list = [];
                    res.data.forEach((elem) => {
                        list.push({ label: elem.name, value: elem.id, tz: elem.tz });
                    });
                    setCityList(list);
                } else {
                    setCityList([]);
                    console.log("城市列表获取失败", res.message);
                }
            })
            .catch((err) => ({ err }));
    };

    useEffect(() => {
        console.log("选择城市初始化");
        vm.runtime.on("start_choose_city", start);
    }, []);

    return (
        <>
            <Modal
                title="选择城市"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Select
                    style={{ width: 200 }}
                    showSearch
                    autoClearSearchValue={false}
                    filterOption={false}
                    placeholder="城市名称"
                    onChange={onSelect}
                    onSearch={onSearch}
                    options={cityList}
                ></Select>
            </Modal>
        </>
    );
};

ChooseCityComponent.propTypes = {
    className: PropTypes.string,
};

export default ChooseCityComponent;
