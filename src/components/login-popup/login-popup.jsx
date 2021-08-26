import Modal from '../../containers/modal.jsx';
import styles from './login-popup.css';
import React from 'react';
import PropTypes from 'prop-types';
import Box from '../box/box.jsx';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import Button from '../button/button.jsx';
import {closeLoginModal} from '../../reducers/modals';

class LoginPopup extends React.Component {

    render () {
      return (
        <Modal
          className = {styles.modalContent}
          conyentLabel={this.props.title}
          id="login-popup"
          onRequestClose={this.props.onCancel}
        >
          <Box>
            <input
              className={styles.minInput}
              name="account"
              placeholder="账号"
              type="text"
            /><br />
            
            <input
              className={styles.minInput}
              name="password"
              placeholder="密码"
              type="password"
            /><br />

            <Button
              className={classNames(
                styles.btnSubmit,
                styles.submitLoginButton
              )}
              onClick={this.props.submitLogin}
            >
              <FormattedMessage
                defaultMessage="登录"
                description="Label for submit login"
                id="gui.menuBar.loginButton"
              />
            </Button>
          </Box>
        </Modal>
      )
    }
}

LoginPopup.propTypes = {
    title: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    submitLogin: PropTypes.func
}

const mapStateToProps = state => ({state:state})

const mapDispatchToProps = dispatch => ({
    onCancel: () => dispatch(closeLoginModal()),
    submitLogin: () => {}
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginPopup);
