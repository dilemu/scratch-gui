import React from 'react';
import {FormattedMessage} from 'react-intl';
import classNames from 'classnames';
import styles from './loader.css';
import PropTypes from 'prop-types';

import topBlock from './top-block.svg';
import middleBlock from './middle-block.svg';
import bottomBlock from './bottom-block.svg';
import Xiaodi from './xiaodi.png';
const messages = [
    {
        message: (
            <FormattedMessage
                defaultMessage="Creating blocks …"
                description="One of the loading messages"
                id="gui.loader.message1"
            />
        ),
        weight: 50
    },
    {
        message: (
            <FormattedMessage
                defaultMessage="Loading sprites …"
                description="One of the loading messages"
                id="gui.loader.message2"
            />
        ),
        weight: 50
    },
    {
        message: (
            <FormattedMessage
                defaultMessage="Loading sounds …"
                description="One of the loading messages"
                id="gui.loader.message3"
            />
        ),
        weight: 50
    },
    {
        message: (
            <FormattedMessage
                defaultMessage="Loading extensions …"
                description="One of the loading messages"
                id="gui.loader.message4"
            />
        ),
        weight: 50
    },
    {
        message: (
            <FormattedMessage
                defaultMessage="Creating blocks …"
                description="One of the loading messages"
                id="gui.loader.message1"
            />
        ),
        weight: 20
    },
    {
        message: (
            <FormattedMessage
                defaultMessage="Herding cats …"
                description="One of the loading messages"
                id="gui.loader.message5"
            />
        ),
        weight: 1
    },
    {
        message: (
            <FormattedMessage
                defaultMessage="Transmitting nanos …"
                description="One of the loading messages"
                id="gui.loader.message6"
            />
        ),
        weight: 1
    },
    {
        message: (
            <FormattedMessage
                defaultMessage="Inflating gobos …"
                description="One of the loading messages"
                id="gui.loader.message7"
            />
        ),
        weight: 1
    },
    {
        message: (
            <FormattedMessage
                defaultMessage="Preparing emojis …"
                description="One of the loading messages"
                id="gui.loader.message8"
            />
        ),
        weight: 1
    }
];
const mainMessages = {
    'gui.loader.headline': (
        <FormattedMessage
            defaultMessage="Loading Project"
            description="Main loading message"
            id="gui.loader.headline"
        />
    ),
    'gui.loader.creating': (
        <FormattedMessage
            defaultMessage="Creating Project"
            description="Main creating message"
            id="gui.loader.creating"
        />
    )
};

class LoaderComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            messageNumber: this.chooseRandomMessage(),
            processing: 0
        };
    }
    componentDidMount () {
        // Start an interval to choose a new message every 5 seconds
        this.intervalId = setInterval(() => {
            this.setState({messageNumber: this.chooseRandomMessage()});
        }, 5000);
        // this.processId = setInterval(() => {
        //     if(this.state.processing < 100) this.setState({processing: this.state.processing + 2})
        // }, 100)
    }
    componentWillUnmount () {
        clearInterval(this.intervalId);
    }
    chooseRandomMessage () {
        let messageNumber;
        const sum = messages.reduce((acc, m) => acc + m.weight, 0);
        let rand = sum * Math.random();
        for (let i = 0; i < messages.length; i++) {
            rand -= messages[i].weight;
            if (rand <= 0) {
                messageNumber = i;
                break;
            }
        }
        return messageNumber;
    }
    render () {
        return (
            <div
                className={classNames(styles.background, {
                    [styles.fullscreen]: this.props.isFullScreen,
                })}
                style={{
                    background:
                        'url("data:image/png;base64,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") no-repeat 0 0',
                }}
            >
                <div className={styles.container}>
                    <div className={styles.xiaodi}>
                        <img
                            src="data:image/png;base64,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"
                            alt="xiaodi"
                        />
                    </div>
                    <div className={styles.processBar}>
                        <div className={styles.processContent}></div>
                    </div>
                </div>
                {/* <div className={styles.container}>
                    <div className={styles.blockAnimation}>
                        <img
                            className={styles.topBlock}
                            src={topBlock}
                        />
                        <img
                            className={styles.middleBlock}
                            src={middleBlock}
                        />
                        <img
                            className={styles.bottomBlock}
                            src={bottomBlock}
                        />
                    </div>
                    <div className={styles.title}>
                        {mainMessages[this.props.messageId]}
                    </div>
                    <div className={styles.messageContainerOuter}>
                        <div
                            className={styles.messageContainerInner}
                            style={{transform: `translate(0, -${this.state.messageNumber * 25}px)`}}
                        >
                            {messages.map((m, i) => (
                                <div
                                    className={styles.message}
                                    key={i}
                                >
                                    {m.message}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
             */}
            </div>
        );
    }
}

LoaderComponent.propTypes = {
    isFullScreen: PropTypes.bool,
    messageId: PropTypes.string
};
LoaderComponent.defaultProps = {
    isFullScreen: false,
    messageId: 'gui.loader.headline'
};

export default LoaderComponent;
