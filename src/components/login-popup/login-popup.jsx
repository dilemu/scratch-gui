import Modal from "../../containers/modal.jsx";
import styles from "./login-popup.css";
import React from "react";
import PropTypes from "prop-types";
import Box from "../box/box.jsx";
import connect from "react-redux/es/connect/connect";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
// import Button from "../button/button.jsx";
import { closeLoginModal } from "../../reducers/modals";
import request from "../../public/request"
import { setSession } from "../../reducers/session"
import { Modal as ReactModal, Tabs, Form, Input, Button, Icon } from 'antd';
import Logo from "./logo.png";
import UserIcon from "./account.svg";
import PwdIcon from "./password.svg";
import VM from 'delightmom-scratch-vm';

const { TabPane } = Tabs;

class LoginPopup extends React.Component {
  loginServer(account, password) {
    const url = '/api/user/login'
    const data = {
      userName: account,
      password: password
    }
    const _this = this
    request({ url, data, method: "POST" }).then(res => {
      if (res.code == 0) {
        console.log('login success', res.data)
        _this.props.setSession({
          userid: res.data.login,
          username: res.data.login,
          nickname: res.data.login,
          avatar: res.data.login.avatar,
          token: res.data.token
        })
        _this.props.vm.runtime.emit('LOGIN', res.data);
        _this.props.onCancel()
      } else {
        console.log('login failure', res.message)
        _this.props.setSession({})
        _this.props.vm.runtime.emit('LOGOUT');
        alert("账号或密码错误！")
      }
    }).catch(err => ({ err }))
  }

  getAccountAndPasswod() {
    const { account, password } = this.refs;
    if (account.value !== '' & password.value !== '') {
      this.loginServer(account.value, password.value)
    } else {
      alert('账号或密码不能为空！')
    }
  };

  render() {
    return (
      <>
        <ReactModal
          // title={this.props.title}
          id="login-popup"
          onCancel={this.props.onCancel}
          visible={this.props.showLogin}
          width={400}
          footer={false}>
          <div className={styles.logo}>
            <img src={Logo} className={styles.logoImg} />
          </div>
          <div className={styles.content}>
            <Tabs defaultActiveKey="1" centered>
              <TabPane tab="登录" key="1">
                <Form
                  name="normal_login"
                  className="login-form"
                  // initialValues={{ remember: true }}
                  // onFinish={onFinish}
                >
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入账户名' }]}
                    className={styles.inputItem}
                  >
                    <Input prefix={<img src={UserIcon} />} placeholder="账户" size="large"/>
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                    className={styles.inputItem}
                  >
                    <Input
                      prefix={<img src={PwdIcon} />}
                      type="password"
                      placeholder="密码"
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item style={{ marginBottom: "15px"}}>
                    <div className={styles.extraLine}>
                      <a className={styles.captchaLink}>手机验证码登录</a>
                      <a className={styles.forgetLink} href="#">忘记密码</a>
                    </div>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" className={styles.loginButton}>
                      登录
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
              <TabPane tab="注册" key="2">
                Content of Tab Pane 2
              </TabPane>
            </Tabs>
          </div>
        </ReactModal>
      </>
    );
  }
}

LoginPopup.propTypes = {
  title: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  vm: PropTypes.instanceOf(VM).isRequired,
  showLogin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => ({
  onCancel: () => dispatch(closeLoginModal()),
  setSession: session => dispatch(setSession(session)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPopup);
