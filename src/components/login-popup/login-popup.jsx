import Modal from "../../containers/modal.jsx";
import styles from "./login-popup.css";
import React from "react";
import PropTypes from "prop-types";
import Box from "../box/box.jsx";
import connect from "react-redux/es/connect/connect";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import Button from "../button/button.jsx";
import { closeLoginModal } from "../../reducers/modals";
import request from "../../public/request"
import {loginSuccess, loginError} from "../../reducers/user-state"

class LoginPopup extends React.Component {
    loginServer(account, password) {
      const url = '/api/user/login'
      const data = {
        userName: account,
        password: password
      }
      const _this = this
      request({url,data,method:"POST"}).then(res => {
        if(res.code == 200) {
          console.log('login success', res.data)
          _this.props.loginSuccess(res.data)
          _this.props.onCancel()
        } else {
          console.log('login failure', res.message)
          _this.props.loginError(res.message)
          alert("账号或密码错误！")
        }
      }).catch(err => ({ err }))
    }

    getAccountAndPasswod() {
      const {account, password} = this.refs;
      if(account.value !== '' & password.value !== '') {
        this.loginServer(account.value, password.value)
      } else {
        alert('账号或密码不能为空！')
      }
    };

    render() {
        return (
            <Modal
                className={styles.modalContent}
                conyentLabel={this.props.title}
                id="login-popup"
                onRequestClose={this.props.onCancel}
            >
                <Box>
                    <input
                        ref="account"
                        className={styles.minInput}
                        name="account"
                        placeholder="账号"
                        type="text"
                    />
                    <br />

                    <input
                        ref="password"
                        className={styles.minInput}
                        name="password"
                        placeholder="密码"
                        type="password"
                    />
                    <br />

                    <Button
                        className={classNames(
                            styles.btnSubmit,
                            styles.submitLoginButton
                        )}
                        // onClick={this.props.submitLogin}
                        onClick={this.getAccountAndPasswod.bind(this)}
                    >
                        <FormattedMessage
                            defaultMessage="登录"
                            description="Label for submit login"
                            id="gui.menuBar.loginButton"
                        />
                    </Button>
                </Box>
            </Modal>
        );
    }
}

LoginPopup.propTypes = {
    title: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    submitLogin: PropTypes.func,
};

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => ({
    onCancel: () => dispatch(closeLoginModal()),
    loginSuccess: data => dispatch(loginSuccess(data)),
    loginError: err => dispatch(loginError(err)),
    submitLogin: () => {},
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPopup);
