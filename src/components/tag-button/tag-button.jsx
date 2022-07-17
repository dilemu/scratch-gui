import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';

import Button from '../button/button.jsx';

import styles from './tag-button.css';

const TagButtonComponent = ({
    active,
    iconClassName,
    className,
    tag, // eslint-disable-line no-unused-vars
    intlLabel,
    disabled,
    ...props
}) => (
    <Button
        className={classNames(
            styles.tagButton,
            className, {
                [styles.active]: active
            }, {
                [styles.disabled]: disabled
            }
        )}
        iconClassName={classNames(
            styles.tagButtonIcon,
            iconClassName
        )}
        disabled={disabled}
        {...props}
    >
        <FormattedMessage {...intlLabel} />
    </Button>
);

TagButtonComponent.propTypes = {
    ...Button.propTypes,
    active: PropTypes.bool,
    intlLabel: PropTypes.shape({
        defaultMessage: PropTypes.string,
        description: PropTypes.string,
        id: PropTypes.string
    }).isRequired,
    tag: PropTypes.string.isRequired
};

TagButtonComponent.defaultProps = {
    active: false
};

export default TagButtonComponent;
