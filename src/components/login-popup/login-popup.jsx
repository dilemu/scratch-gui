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
import { Modal as ReactModal, Tabs, Form, Input, Button, Row, Col, Checkbox } from 'antd';
import Logo from "./logo.png";
import UserIcon from "./account.svg";
import PwdIcon from "./password.svg";
import VM from 'delightmom-scratch-vm';

const { TabPane } = Tabs;

class LoginPopup extends React.Component {
  loginFormRef = React.createRef();
  registryFormRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      type: 'account',
      tabIndex: "login",
      countDown: 0,
      captchaStatus: false,
      countDownFull: 60
    }
  }
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

  registryServer(mobile, password, code) {}

  getAccountAndPasswod() {
    const { account, password } = this.refs;
    if (account.value !== '' & password.value !== '') {
      this.loginServer(account.value, password.value)
    } else {
      alert('账号或密码不能为空！')
    }
  };

  onTabSwitch(key) {
    this.setState({
      tabIndex: key
    })
  }

  switchLoginType() {
    const {type } = this.state;
    if (type === "phone") {
      this.setState({
        type: "account"
      })
    }
    if (type === "account") {
      this.setState({
        type: "phone"
      })
    }
  }

  onFinish(values) {
    this.loginServer(values.account, values.password)
    console.log(values);
  };

  onRegistryFinish(values) {
    this.registryServer(values.mobile, values.password, values.code)
    console.log(values);
  };

  async getCode(form) {
    const mobileValidateResult = await form.current.validateFields(["mobile"]);
    if (!mobileValidateResult) return;
    const url = '/api/user/getCode';
    const data = {
      mobile: form.current.mobile
    }
    if(!this.state.captchaStatus && this.state.countDown === 0) {
      request({ url, data, method: "POST" }).then(res => {
        if (res.code == 0) {
          console.log('get captcha success', res.data)
          this.setState({
            captchaStatus: true,
            countDown: this.state.countDownFull
          })
          const _this = this;
          const countDownEvent = setInterval(() => {
            if (_this.state.countDown > 1) {
              _this.setState({
                captchaStatus: true,
                countDown: --_this.state.countDown
              })
            } else {
              _this.setState({
                captchaStatus: false,
                countDown: 0
              })
              clearInterval(countDownEvent);
            }
          }, 1000)
        } else {
          console.log('get captcha failure', res.message)
          alert("验证码获取失败！")
        }
      }).catch(err => {
        console.log('get captcha failure', err)
        alert("验证码获取失败！")
      })
    }
  }

  render() {
    const { tabIndex, type, captchaStatus, countDown } = this.state
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
            <Tabs defaultActiveKey={tabIndex} centered onChange={this.onTabSwitch.bind(this)}>
              <TabPane tab="登录" key="login">
                <Form
                  name="normal_login"
                  className="login-form"
                  ref={this.loginFormRef}
                  onFinish={this.onFinish.bind(this)}
                // initialValues={{ remember: true }}
                // onFinish={onFinish}
                >
                  {
                    type === "account" ? <><Form.Item
                      name="account"
                      rules={[{ required: true, message: '请输入账户名' }]}
                      className={styles.inputItem}
                    >
                      <Input prefix={<img src={UserIcon} />} placeholder="账户" size="large" />
                    </Form.Item>
                      <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                        className={styles.inputItem}
                      >
                        <Input.Password
                          prefix={<img src={PwdIcon} />}
                          type="password"
                          placeholder="密码"
                          size="large"
                        />
                      </Form.Item></> : null
                  }
                  {
                    type === "phone" ? <><Form.Item
                      name="mobile"
                      rules={[{ required: true, message: '请输入手机号' }, {
                        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请输入正确的手机号'
                      }]}
                      className={styles.inputItem}
                    >
                      <Input placeholder="账户" size="large" />
                    </Form.Item>
                      <Form.Item
                        name="code"
                        rules={[{ required: true, message: '请输入验证码' }]}
                        className={styles.inputItem}
                      >
                        <Row gutter={8} justify="space-between">
                          <Col span={16}>
                            <Input
                              placeholder="验证码"
                              size="large"
                            />
                          </Col>
                          <Col span={7}>
                            <span className={styles.captchaBtn} onClick={this.getCode.bind(this, this.loginFormRef)}>{captchaStatus ? `${countDown}秒后重发` : "获取验证码"}</span>
                          </Col>
                        </Row>
                      </Form.Item></> : null
                  }
                  <Form.Item style={{ marginBottom: "15px" }}>
                    <div className={styles.extraLine}>
                      {type === "phone" ? <a className={styles.captchaLink} onClick={this.switchLoginType.bind(this)}>密码登录</a> : null}
                      {type === "account" ? <a className={styles.captchaLink} onClick={this.switchLoginType.bind(this)}>手机验证码登录</a> : null}
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
              <TabPane tab="注册" key="registry">
                <Form
                  name="normal_login"
                  className="login-form"
                  ref={this.registryFormRef}
                // initialValues={{ remember: true }}
                  onFinish={this.onRegistryFinish.bind(this)}
                >
                  <Form.Item
                    name="mobile"
                    rules={[{ required: true, message: '请输入手机号' }]}
                    className={styles.inputItem}
                  >
                    <Input placeholder="手机号" size="large" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                    className={styles.inputItem}
                  >
                    <Input.Password
                      prefix={<img src={PwdIcon} />}
                      type="password"
                      placeholder="8~20位密码，字母/数字/符号至少2种"
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item
                    name="code"
                    rules={[{ required: true, message: '请输入验证码' }]}
                    className={styles.inputItem}
                  >
                    <Row gutter={8} justify="space-between">
                      <Col span={16}>
                        <Input
                          placeholder="验证码"
                          size="large"
                        />
                      </Col>
                      <Col span={7}>
                        <span className={styles.captchaBtn} onClick={this.getCode.bind(this, this.registryFormRef)}>{captchaStatus ? `${countDown}秒后重发` : "获取验证码"}</span>
                      </Col>
                    </Row>
                  </Form.Item>
                  <Form.Item name="agreement"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value ? Promise.resolve() : Promise.reject(new Error('请勾选同意用户协议')),
                      },
                    ]}
                     style={{ marginBottom: "15px" }}>
                    <Checkbox>
                      我已阅读并同意 <a href="#">《用户协议》</a>
                    </Checkbox>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" className={styles.loginButton}>
                      注册
                    </Button>
                  </Form.Item>
                </Form>
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
