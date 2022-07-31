import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'delightmom-scratch-vm';

import analytics from '../lib/analytics';

import {compose} from 'redux';
import {connect} from 'react-redux';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import extensionLibraryContent from '../lib/libraries/extensions/index.jsx';
import { makeDeviceLibrary } from '../lib/libraries/devices/index.jsx';
import { setDeviceData } from '../reducers/device-data';

import LibraryComponent from '../components/library/library.jsx';
import extensionIcon from '../components/action-menu/icon--sprite.svg';
import deviceIcon from '../components/action-menu/icon--sprite.svg';

const messages = defineMessages({
    extensionTitle: {
        defaultMessage: 'Choose an Extension',
        description: 'Heading for the extension library',
        id: 'gui.extensionLibrary.chooseAnExtension'
    },
    extensionUrl: {
        defaultMessage: 'Enter the URL of the extension',
        description: 'Prompt for unoffical extension url',
        id: 'gui.extensionLibrary.extensionUrl'
    },
    filterPlaceholder: {
        id: 'gui.library.filterPlaceholder',
        defaultMessage: 'Search',
        description: 'Placeholder text for library search field'
    },
    allTag: {
        id: 'gui.library.allTag',
        defaultMessage: 'All',
        description: 'Label for library tag to revert to all items after filtering by tag.'
    },
    networkTag: {
        id: 'gui.library.network',
        defaultMessage: '网络服务',
        description: 'Label for library tag to revert to all items after filtering by tag.'
    },
    sensorTag: {
        id: 'gui.library.sensor',
        defaultMessage: '传感器',
        description: 'Label for library tag to revert to all items after filtering by tag.'
    },
    motionTag: {
        id: 'gui.library.motion',
        defaultMessage: '执行器',
        description: 'Label for library tag to revert to all items after filtering by tag.'
    },
    displayTag: {
        id: 'gui.library.display',
        defaultMessage: '显示器',
        description: 'Label for library tag to revert to all items after filtering by tag.'
    },
    baseModuleTag: {
        id: 'gui.library.baseModuleTag',
        defaultMessage: '功能模块',
        description: 'Label for library tag to revert to all items after filtering by tag.'
    },
    mpuTag: {
        id: 'gui.library.mpu',
        defaultMessage: '主控板',
        description: 'Label for library tag to revert to all items after filtering by tag.'
    },
    communicationTag: {
        id: 'gui.library.communication',
        defaultMessage: '通信模块',
        description: 'Label for library tag to revert to all items after filtering by tag.'
    }
});

const ALL_TAG = { tag: 'all', intlLabel: messages.allTag };
const NETWORK_TAG = { tag: 'network', intlLabel: messages.networkTag, isRealtimeMode: true };
const SENSOR_TAG = { tag: 'sensor', intlLabel: messages.sensorTag };
const BASEMODULE_TAG = { tag: 'basemodule', intlLabel: messages.baseModuleTag, isRealtimeMode: true };
const MPU_TAG = { tag: 'mpu', intlLabel: messages.mpuTag }
const MOTION_TAG = { tag: 'motion', intlLabel: messages.motionTag }
const DISPLAY_TAG = { tag: 'display', intlLabel: messages.displayTag };
const COMMUNICATION_TAG = { tag: 'communication', intlLabel: messages.communicationTag };
const tagListPrefix = [BASEMODULE_TAG, MPU_TAG, NETWORK_TAG, SENSOR_TAG, MOTION_TAG, DISPLAY_TAG, COMMUNICATION_TAG];


class ExtensionLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'updateDeviceExtensions',
            'handleItemSelect',
            'requestLoadDevice'
        ]);
        this.state = {
            deviceExtensions: []
        };
    }

    componentDidMount () {
        if (this.props.isRealtimeMode === false) {
            this.updateDeviceExtensions();
        }
        this.props.vm.extensionManager.getDeviceList().then(data => {
            this.props.onSetDeviceData(makeDeviceLibrary(data));
        })
            .catch(() => {
                this.props.onSetDeviceData(makeDeviceLibrary());
            });
    }

    updateDeviceExtensions () {
        this.props.vm.extensionManager.getDeviceExtensionsList()
            .then(data => {
                if (data) {
                    this.setState({deviceExtensions: data});
                }
            });
    }

    requestLoadDevice(device) {
        const id = device.deviceId;
        const deviceType = device.type;
        const pnpidList = device.pnpidList;
        const deviceExtensions = device.deviceExtensions;

        if (id && !device.disabled) {
            if (this.props.vm.extensionManager.isDeviceLoaded(id)) {
                this.props.onDeviceSelected(id);
            } else {
                this.props.vm.extensionManager.loadDeviceURL(id, deviceType, pnpidList).then(() => {
                    this.props.vm.extensionManager.getDeviceExtensionsList().then(() => {
                        // TODO: Add a event for install device extension
                        // the large extensions will take many times to load
                        // A loading interface should be launched.
                        this.props.vm.installDeviceExtensions(deviceExtensions);
                    });
                    this.props.onDeviceSelected(id);
                    analytics.event({
                        category: 'devices',
                        action: 'select device',
                        label: id
                    });
                });
            }
        }
    }

    handleItemSelect (item) {
        const id = item.extensionId;
        if (item.deviceId) {
            this.requestLoadDevice(item);
        } else {
            if (this.props.isRealtimeMode) {
                let url = item.extensionURL ? item.extensionURL : id;
                if (!item.disabled && !id) {
                    // eslint-disable-next-line no-alert
                    url = prompt(this.props.intl.formatMessage(messages.extensionUrl));
                }
                if (id && !item.disabled) {
                    if (this.props.vm.extensionManager.isExtensionLoaded(url)) {
                        this.props.onCategorySelected(id);
                    } else {
                        this.props.vm.extensionManager.loadExtensionURL(url).then(() => {
                            this.props.onCategorySelected(id);
                            analytics.event({
                                category: 'extensions',
                                action: 'select extension',
                                label: id
                            });
                        });
                    }
                }
            } else if (id && !item.disabled) {
                if (this.props.vm.extensionManager.isDeviceExtensionLoaded(id)) {
                    this.props.vm.extensionManager.unloadDeviceExtension(id).then(() => {
                        this.updateDeviceExtensions();
                    });
                } else {
                    this.props.vm.extensionManager.loadDeviceExtension(id).then(() => {
                        this.updateDeviceExtensions();
                        analytics.event({
                            category: 'extensions',
                            action: 'select device extension',
                            label: id
                        });
                    })
                        .catch(err => {
                            // TODO add a alet device extension load failed. and change the state to bar to failed state
                            console.error(`err = ${err}`); // eslint-disable-line no-console
                        });
                }
            }
        }
    }
    render () {
        const device = this.props.deviceData.find(dev => dev.deviceId === this.props.deviceId);
        const deviceLibraryThumbnailData = this.props.deviceData.map(device => ({
            rawURL: device.iconURL || deviceIcon,
            ...device
        }));
        let builtinLibraryThumbnailData = [];
        if(device) {
            builtinLibraryThumbnailData = this.props.isRealtimeMode ? extensionLibraryContent.filter(extension => !extension.supportDevice || (extension.supportDevice || []).includes(this.props.deviceId)).map(extension => ({
                rawURL: extension.iconURL || extensionIcon,
                ...extension
            })) : [];
        } else {
            builtinLibraryThumbnailData = this.props.isRealtimeMode ? extensionLibraryContent.filter(extension => !extension.supportDevice).map(extension => ({
                rawURL: extension.iconURL || extensionIcon,
                ...extension
            })) : [];
        }
        const deviceExtensionLibraryThumbnailData = this.state.deviceExtensions.filter(
            extension => extension.supportDevice.includes(this.props.deviceId) ||
                extension.supportDevice.includes(device.deviceExtensionsCompatible))
            .map(extension => ({
                rawURL: extension.iconURL || extensionIcon,
                ...extension
            }))
            .sort((a, b) => {
                if ((b.isLoaded !== true) && (a.isLoaded === true)) return -1;
                return 1;
            });
        const fullExtensionData = [...deviceLibraryThumbnailData, ...builtinLibraryThumbnailData, ...deviceExtensionLibraryThumbnailData]

        return (
            <LibraryComponent
                autoClose={this.props.isRealtimeMode}
                isRealtimeMode={this.props.isRealtimeMode}
                data={fullExtensionData}
                filterable
                // tags={this.props.isRealtimeMode ? [] : tagListPrefix}
                tags={tagListPrefix}
                defaultTag={this.props.isRealtimeMode ? 'all' : 'all'}
                id="extensionLibrary"
                isUnloadble={!this.props.isRealtimeMode}
                title={this.props.intl.formatMessage(messages.extensionTitle)}
                visible={this.props.visible}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

ExtensionLibrary.propTypes = {
    deviceData: PropTypes.instanceOf(Array).isRequired,
    deviceId: PropTypes.string,
    intl: intlShape.isRequired,
    isRealtimeMode: PropTypes.bool,
    onCategorySelected: PropTypes.func,
    onRequestClose: PropTypes.func,
    visible: PropTypes.bool,
    onSetDeviceData: PropTypes.func.isRequired,
    onDeviceSelected: PropTypes.func,
    vm: PropTypes.instanceOf(VM).isRequired // eslint-disable-line react/no-unused-prop-types
};

const mapStateToProps = state => ({
    deviceData: state.scratchGui.deviceData.deviceData,
    deviceId: state.scratchGui.device.deviceId,
    isRealtimeMode: state.scratchGui.programMode.isRealtimeMode
});

const mapDispatchToProps = dispatch => ({
    onSetDeviceData: data => dispatch(setDeviceData(data))
});

export default compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(ExtensionLibrary);
