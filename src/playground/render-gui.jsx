import React from "react";
import ReactDOM from "react-dom";
import { compose } from "redux";
import { Form, Input, Button, Checkbox } from "antd";

import AppStateHOC from "../lib/app-state-hoc.jsx";
import GUI from "../containers/gui.jsx";
import HashParserHOC from "../lib/hash-parser-hoc.jsx";
import log from "../lib/log.js";
import {setSession} from "../reducers/session"

const onClickLogo = () => {
    window.location = "https://openblockcc.github.io/wiki/";
};

const onClickCheckUpdate = () => {
    log("User click check update");
};

const onClickUpgrade = () => {
    log("User click upgrade");
};

const onClickClearCache = () => {
    log("User click clear cahce");
};

const onClickInstallDriver = () => {
    log("User click install driver");
};

const handleTelemetryModalCancel = () => {
    log("User canceled telemetry modal");
};

const handleTelemetryModalOptIn = () => {
    log("User opted into telemetry");
};

const handleTelemetryModalOptOut = () => {
    log("User opted out of telemetry");
};

const renderLogin = () => {
    const onFinish = (values) => {
        setSession(values)
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="用户名"
                name="user"
                rules={[
                    { required: true, message: "请输入用户名" },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[
                    { required: true, message: "请输入密码" },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    登录
                </Button>
            </Form.Item>
        </Form>
    );
};

/*
 * Render the GUI playground. This is a separate function because importing anything
 * that instantiates the VM causes unsupported browsers to crash
 * {object} appTarget - the DOM element to render to
 */
export default (appTarget) => {
    GUI.setAppElement(appTarget);

    // note that redux's 'compose' function is just being used as a general utility to make
    // the hierarchy of HOC constructor calls clearer here; it has nothing to do with redux's
    // ability to compose reducers.
    const WrappedGui = compose(AppStateHOC, HashParserHOC)(GUI);

    // TODO a hack for testing the backpack, allow backpack host to be set by url param
    const backpackHostMatches = window.location.href.match(
        /[?&]backpack_host=([^&]*)&?/
    );
    const backpackHost = backpackHostMatches ? backpackHostMatches[1] : null;

    const scratchDesktopMatches = window.location.href.match(
        /[?&]isScratchDesktop=([^&]+)/
    );
    let simulateScratchDesktop;
    if (scratchDesktopMatches) {
        try {
            // parse 'true' into `true`, 'false' into `false`, etc.
            simulateScratchDesktop = JSON.parse(scratchDesktopMatches[1]);
        } catch {
            // it's not JSON so just use the string
            // note that a typo like "falsy" will be treated as true
            simulateScratchDesktop = scratchDesktopMatches[1];
        }
    }

    if (process.env.NODE_ENV === "production" && typeof window === "object") {
        // Warn before navigating away
        window.onbeforeunload = () => true;
    }

    ReactDOM.render(
        // important: this is checking whether `simulateScratchDesktop` is truthy, not just defined!
        simulateScratchDesktop ? (
            <WrappedGui
                canEditTitle
                isScratchDesktop
                showTelemetryModal
                canSave={false}
                onTelemetryModalCancel={handleTelemetryModalCancel}
                onTelemetryModalOptIn={handleTelemetryModalOptIn}
                onTelemetryModalOptOut={handleTelemetryModalOptOut}
                onClickCheckUpdate={onClickCheckUpdate}
                onClickUpgrade={onClickUpgrade}
                onClickClearCache={onClickClearCache}
                onClickInstallDriver={onClickInstallDriver}
            />
        ) : (
            <WrappedGui
                canEditTitle
                backpackVisible
                showComingSoon
                backpackHost={backpackHost}
                canSave={false}
                onClickLogo={onClickLogo}
                renderLogin={renderLogin}
            />
        ),
        appTarget
    );
};
