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
    shieldTag: {
        id: 'gui.library.shieldTag',
        defaultMessage: 'Shield',
        description: 'Shield tag to filter all shield libraries.'
    },
    actuatorTag: {
        id: 'gui.library.actuatorTag',
        defaultMessage: 'Actuator',
        description: 'Actuator tag to filter all actuator libraries.'
    },
    sensorTag: {
        id: 'gui.library.sensorTag',
        defaultMessage: 'Sensor',
        description: 'Sensor tag to filter all sensor libraries.'
    },
    displayTag: {
        id: 'gui.library.displayTag',
        defaultMessage: 'Display',
        description: 'Display tag to filter all display libraries.'
    },
    communicationTag: {
        id: 'gui.library.communicationTag',
        defaultMessage: 'Communication',
        description: 'Communication tag to filter all communication libraries.'
    },
    otherTag: {
        id: 'gui.library.otherTag',
        defaultMessage: 'Other',
        description: 'Other tag to filter all other libraries.'
    }
});

const SHIELD_TAG = {tag: 'shield', intlLabel: messages.shieldTag};
const ACTUATOR_TAG = {tag: 'actuator', intlLabel: messages.actuatorTag};
const SENSOR_TAG = {tag: 'sensor', intlLabel: messages.sensorTag};
const DISPLAY_TAG = {tag: 'display', intlLabel: messages.displayTag};
const COMMUNICATION_TAG = {tag: 'communication', intlLabel: messages.communicationTag};
const OTHER_TAG = {tag: 'other', intlLabel: messages.otherTag};
const tagListPrefix = [SHIELD_TAG, ACTUATOR_TAG, SENSOR_TAG, DISPLAY_TAG, COMMUNICATION_TAG, OTHER_TAG];

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
        const builtinLibraryThumbnailData = this.props.isRealtimeMode? extensionLibraryContent.map(extension => ({
            rawURL: extension.iconURL || extensionIcon,
            ...extension
        })): [];
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
                tags={[]}
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
