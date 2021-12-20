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
  constructor(props) {
    super(props);
    this.state = {
      type: 'account',
      tabIndex: "login",
      countDown: 0,
      captchaStatus: false,
      countDownFull: 60,
      userAgreementVisible: false,
    }
    this.loginFormRef = React.createRef();
    this.registryFormRef = React.createRef();
  }
  loginServer(account, code) {
    const url = '/api/user/login'
    const data = {
      account,
      code,
      type: this.state.type
    }
    const _this = this
    request({ url, data, method: "POST" }).then(res => {
      if (res.code == 0) {
        console.log('login success', res.data)
        _this.props.setSession({
          userid: res.data.username,
          username: res.data.username,
          nickname: res.data.username,
          avatar: res.data.avatar,
          token: res.data.token
        })
        _this.props.vm.runtime.emit('LOGIN', res.data);
        _this.props.onCancel()
      } else {
        console.log('login failure', res.message)
        _this.props.setSession({})
        _this.props.vm.runtime.emit('LOGOUT');
        alert(res.message)
      }
    }).catch(err => ({ err }))
  }

  registryServer(mobile, password, code) {
    const url = '/api/user/register'
    const data = {
      mobile,
      password,
      code
    }
    const _this = this
    request({ url, data, method: "POST" }).then(res => {
      if (res.code == 0) {
        console.log('registry success', res.data)
        alert("注册成功!")
        _this.setState({
          tabIndex: "registry"
        })
      } else {
        console.log('register failure', res.message)
        alert(res.message)
      }
    }).catch(err => ({ err }))
  }

  onTabSwitch(key) {
    this.setState({
      tabIndex: key
    })
  }

  switchLoginType() {
    const { type } = this.state;
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

  onLoginFinish(values) {
    this.loginServer(values.account, values.code)
    console.log(values);
  };

  onRegistryFinish(values) {
    this.registryServer(values.account, values.password, values.code)
    console.log(values);
  };

  async getCode(form) {
    const mobileValidateResult = await form.current.validateFields(["account"]);
    if (!mobileValidateResult) return;
    const url = '/api/user/getCode';
    const data = {
      mobile: form.current.getFieldValue("account")
    }
    if (!this.state.captchaStatus && this.state.countDown === 0) {
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

  openUserAgreement() {
    this.setState({
      userAgreementVisible: true,
    })
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
            <Tabs defaultActiveKey={tabIndex} activeKey={tabIndex} centered onChange={this.onTabSwitch.bind(this)}>
              <TabPane tab="登录" key="login">
                <Form
                  name="normal_login"
                  className="login-form"
                  ref={this.loginFormRef}
                  onFinish={this.onLoginFinish.bind(this)}
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
                        name="code"
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
                      name="account"
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
                    name="account"
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
                      我已阅读并同意 <a href="#" onClick={this.openUserAgreement.bind(this)}>《用户协议》</a>
                      <ReactModal
                        // title={this.props.title}
                        id="user-agreement"
                        title="迪乐姆教师成长平台用户使用协议"
                        onCancel={() => this.setState({ userAgreementVisible: false })}
                        visible={this.state.userAgreementVisible}
                        width="600"
                        footer={false}>
                        <p> 欢迎您使用迪乐姆教师成长平台服务（下称：本服务）请您仔细阅下方条款，若您对本协议的任何条款存有异议，您可以第一时间选择不进入迪乐姆教师成长平台。
                          当您勾选迪乐姆教师成长平台用户使用协议并注册成功，在进入迪乐姆教师成长平台后上发布的任何内容均意味着您（即用户）完全接受本协议项下的全部条款。
                          在注册界面注册时，《用户协议》”处打勾“✓”并按照流程成功进入迪乐姆教师成长平台网，即表示您已充分阅读、理解并接受本协议项下的全部内容，并与迪乐姆教师成长平台达成本协议。
                          迪乐姆教师成长平台有权随时对本协议进行修改，用户在登录使用前如果不同意本协议的修改，可以放弃使用或访问本网站，如果用户选择在本协议变更后继续访问或使用本网站，则视为用户已经接受本协议的修改。</p>
                        <h3>使用规则</h3>
                        <p>1. 用户登录成功后，迪乐姆教师成长平台将给予每个用户一个可以发布课程、发布文章或视频的个人中心，用户应当对帐号所进行的所有活动和事件负法律责任。
                          2. 用户须对在迪乐姆教师成长平台的信息的真实性、合法性、有效性承担全部责任，用户不得冒充他人；不得利用他人的名义发布任何信息；不得恶意使用帐号导致其他用户误认；否则迪乐姆教师成长平台有权立即停止提供服务，收回其帐号并由用户独自承担由此而产生的一切法律责任。
                          3. 用户不应将其帐号转让或出借予他人使用。如用户发现其帐号遭他人非法使用，应立即通知迪乐姆教师成长平台官方。因黑客行为或用户的保管疏忽导致帐号遭他人非法使用，迪乐姆教师成长平台不承担任何责任。
                          4. 用户必须同意接受迪乐姆教师成长平台通过消息中心或其他方式向用户发送平台通知或其他相关商业信息。
                          5. 用户理解，迪乐姆教师成长平台需要定期或不定期地对提供网络服务的平台或相关的设备进行检修或者维护，如因此类情况而造成网络服务在合理时间内的中断，迪乐姆教师成长平台无需为此承担任何责任，但应尽可能事先进行通告。
                          6. 用户同意保障和维护迪乐姆教师成长平台及其他用户的利益，如因用户违反有关法律、法规或本协议项下的任何条款而给迪乐姆教师成长平台或任何其他第三方造成损失，用户同意承担由此造成的损害赔偿责任。</p>
                        <h3>用户行为</h3>
                        <p>1. 用户应遵守中华人民共和国相关法律法规，并同意对以任何方式使用用户账号而使用本服务的任何行为及其结果承担全部责任。如用户的行为违反国家法律，用户将依法承担全部法律责任；如涉嫌构成犯罪，司法机关将追究用户的刑事责任，迪乐姆教师成长平台将严格按照法律规定的义务及司法机关的要求进行配合。同时，如果迪乐姆教师成长平台有理由认为用户的任何行为，包括但不限于用户的任何言论或其它行为违反或可能违反国家法律法规的任何规定，迪乐姆教师成长平台可在任何时候不经任何事先通知终止向用户提供服务。
                          2. 用户应遵守所有与迪乐姆教师成长平台服务有关的网络协议、规定和程序。
                          3. 用户同意将不会利用迪乐姆教师成长平台制作、上载、复制、发布、传播或者转载如下内容：
                          反对宪法所确定的基本原则的；
                          危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；
                          损害国家荣誉和利益的；
                          煽动民族仇恨、民族歧视，破坏民族团结的；
                          侮辱、滥用英烈形象，否定英烈事迹，美化粉饰侵略战争行为的；
                          破坏国家宗教政策，宣扬邪教和封建迷信的；
                          散布谣言，扰乱社会秩序，破坏社会稳定的；
                          散布淫秽、赌博、暴力、凶杀、自残、恐怖或者教唆犯罪的；
                          侮辱或者诽谤他人，侵害他人合法权益（如名誉权、肖像权等）的；
                          侵害他人知识产权、商业秘密等合法权利的；
                          虚构事实、隐瞒真相以误导、欺骗他人的；
                          发布、传送、传播广告信息及垃圾信息的；
                          其他法律法规禁止的行为。
                          4. 不得侵犯其他任何第三方的专利权、著作权、商标权、名誉权或其他任何合法权益。
                          5. 如用户在使用网络服务时违反任何上述规定，迪乐姆教师成长平台或其授权的人有权要求用户改正或直接采取一切必要的措施（包括但不限于更改或删除用户发布的内容等、暂停或终止用户使用网络服务的权利）以减轻用户不当行为造成的影响。</p>
                        <h3>知识产权</h3>
                        <p>1. 用户在迪乐姆教师成长平台发表的全部原创内容（包括但不仅限于作品、文章、评论、音频和视频），著作权均归用户本人所有，任何商业用途均须联系原作者。临摹作品、转载作品原版权归原作者所有。
                          2. 迪乐姆教师成长平台提供的网络服务中包含的版面设计、排版方式、文本、标识、图片、图形等均受著作权、商标权及其它法律保护，未经相关权利人（含迪乐姆教师成长平台及其他原始权利人）同意，上述内容均不得在任何平台被直接或间接发布、使用、出于发布或使用目的的改写或再发行，或被用于其他任何商业目的。
                          3. 为了促进知识的分享和传播，用户将其在迪乐姆教师成长平台所属平台上发表的全部内容，授予迪乐姆教师成长平台免费的、不可撤销的、非独家使用许可，迪乐姆教师成长平台有权将该内容用于迪乐姆教师成长平台各种形态的产品和服务上，包括但不限于网站以及发表的应用或其他互联网产品。
                          4. 第三方若出于非商业目的，将用户在迪乐姆教师成长平台上发表的内容转载在迪乐姆教师成长平台之外的地方，应当在作品的正文开头的显著位置注明原作者姓名（或原作者在迪乐姆教师成长平台所属平台上使用的帐号名称），给出原始链接，注明「发表于迪乐姆教师成长平台」，并不得对作品进行修改演绎。若需要对作品进行修改，或用于商业目的，第三方应当联系用户获得单独授权，按照用户规定的方式使用该内容。
                          5. 在迪乐姆教师成长平台所属平台上传或发表的内容，用户应保证其为著作权人或已取得合法授权，并且该内容不会侵犯任何第三方的合法权益。如果第三方提出关于著作权的异议，迪乐姆教师成长平台有权根据实际情况删除相关的内容，且有权追究用户的法律责任。给迪乐姆教师成长平台或任何第三方造成损失的，用户应负责全额赔偿。
                          6. 如果任何第三方侵犯了迪乐姆教师成长平台用户相关权利，用户同意授权迪乐姆教师成长平台或其指定的代理人代表迪乐姆教师成长平台自身或用户对该第三方提出警告、投诉、发起行政执法、诉讼、进行上诉，或谈判和解，并且用户同意在迪乐姆教师成长平台认为必要的情况下参与共同维权。
                          7. 迪乐姆教师成长平台有权但无义务对用户发布的内容进行审核，有权根据相关证据结合《侵权责任法》、《信息网络传播权保护条例》等法律法规对侵权信息进行处理。
                          8. 迪乐姆教师成长平台为提供网络服务而使用的任何软件（包括但不限于软件中所含的任何图象、照片、动画、录像、录音、音乐、文字和附加程序、随附的帮助材料）的一切权利均属于该软件的著作权人，未经该软件的著作权人许可，用户不得对该软件进行反向工程、反向编译或反汇编。</p>
                        <h3>1. 保护用户个人信息安全既是法律要求，也是迪乐姆教师成长平台长期坚持的一项基本原则。迪乐姆教师成长平台保证不对外公开或向第三方提供单个用户的注册资料及用户在使用迪乐姆教师成长平台服务时存储在网站的非公开内容，但下列情况除外：
                          事先获得用户的明确授权；
                          根据有关的法律法规要求；
                          按照相关政府主管部门的要求；
                          为维护社会公众的利益；
                          为维护网站的合法权益。
                          2. 迪乐姆教师成长平台可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意承担与迪乐姆教师成长平台同等的保护用户隐私的责任，则网站有权将用户的注册资料等提供给该第三方。
                          3. 在不透露单个用户隐私资料的前提下，迪乐姆教师成长平台有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。
                          4. 您使用或继续使用我们的服务，即意味着同意我们按照迪乐姆教师成长平台《隐私政策》收集、使用、储存和分享您的相关信息。详情请参见迪乐姆教师成长平台《隐私政策》</h3>
                        <h3>免责声明</h3>
                        <p>1. 用户明确同意其使用迪乐姆教师成长平台服务所存在的风险将完全由其自己承担；因其使用迪乐姆教师成长平台服务而产生的一切后果也由其自己承担，迪乐姆教师成长平台对用户不承担任何责任。
                          2. 迪乐姆教师成长平台不担保网络服务一定能满足用户的要求，也不担保网络服务不会中断，对网络服务的及时性、安全性、准确性也都不作担保。
                          3. 迪乐姆教师成长平台不保证为向用户提供便利而设置的外部链接的准确性和完整性，同时，对于该等外部链接指向的不由迪乐姆教师成长平台实际控制的任何网页上的内容，网站不承担任何责任。
                          4. 对于因不可抗力或不能控制的原因造成的网络服务中断或其它缺陷，迪乐姆教师成长平台不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。
                          5. 用户同意，对于迪乐姆教师成长平台向用户提供的下列产品或者服务的质量缺陷本身及其引发的任何损失，迪乐姆教师成长平台无需承担任何责任：
                          向用户免费提供的各项网络服务；
                          向用户赠送的任何产品或者服务；
                          向收费网络服务用户附赠的各种产品或者服务。</p>
                        <h3>协议修改</h3>
                        <p>1. 根据互联网的发展和有关法律、法规及规范性文件的变化，或者因业务发展需要，迪乐姆教师成长平台有权对本协议的条款作出修改或变更，一旦本协议的内容发生变动，迪乐姆教师成长平台将会直接在网站上公布修改之后的协议内容，该公布行为视为迪乐姆教师成长平台已经通知用户修改内容。迪乐姆教师成长平台也可采用电子邮件或私信的传送方式，提示用户协议条款的修改、服务变更、或其它重要事项。
                          2. 如果不同意迪乐姆教师成长平台对本协议相关条款所做的修改，用户有权停止使用网络服务。如果用户继续使用网络服务，则视为用户接受迪乐姆教师成长平台对本协议相关条款所做的修改。
                          3. 本协议项下迪乐姆教师成长平台对于用户所有的通知均可通过网页公告、电子邮件、手机短信或常规的信件传送等方式进行；该等通知于发送之日视为已送达收件人。
                          4. 用户对于迪乐姆教师成长平台的通知应当通过网站对外正式公布的通信地址、传真号码、电子邮件地址等联系信息进行送达。</p>
                        <h3>其他规定</h3>
                        <p>1. 如双方就本协议内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，任何一方均可向迪乐姆教师成长平台所在地的人民法院提起诉讼。
                          2. 本协议构成双方对本协议之约定事项及其他有关事宜的完整协议，除本协议规定的之外，未赋予本协议各方其他权利。
                          3. 如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。
                          4. 本协议中的标题仅为方便而设，在解释本协议时应被忽略。</p>
                        <h3>隐私政策</h3>
                        <p>
                          迪乐姆教师成长平台网（以下简称“迪乐姆教师成长平台”）非常重视对您的个人隐私保护，有时候我们需要某些信息才能为您提供您请求的服务，本隐私政策（以下简称“本政策”）解释了这些情况下的数据收集和使用情况。
                          本政策适用于迪乐姆教师成长平台的所有相关服务，随着迪乐姆教师成长平台服务范围的扩大，隐私政策的内容可由迪乐姆教师成长平台随时更新，且毋须另行通知。更新后的隐私政策一旦在网页上公布即有效代替原来的隐私政策。
                          在使用迪乐姆教师成长平台各项服务前，请您务必仔细阅读并透彻理解本政策，并做出您认为适当的选择。一旦您开始使用迪乐姆教师成长平台的各项服务，即表示您已充分理解并同意本政策。需要提醒您注意，本隐私政策仅适用于我们所收集的信息，不适用于通过我们的服务而接入的第三方服务（包括任何第三方网站）收集的信息以及通过在我们服务中进行广告服务的其他公司或机构所收集的信息。
                          我们根据合法、正当、必要的原则，仅收集实现产品功能所必要的信息。
                          1. 您在使用我们服务时主动提供的信息：
                          您通过微信开放平台登录迪乐姆教师成长平台账号时所使用的账户名称、头像、手机号码和邮箱地址及其他账号资料信息等。
                          2. 您通过我们的客服或参加我们举办的活动时所提交的信息：
                          您参与我们线上活动时填写的调查问卷中可能包含您的姓名、电话、家庭地址等信息。我们的部分服务可能需要您提供特定的个人敏感信息来实现特定功能。若您选择不提供该类信息，则可能无法正常使用服务中的特定功能，但不影响您使用服务中的其他功能。
                          若您主动提供您的个人敏感信息，即表示您同意我们按本政策所述目的和方式来处理您的个人敏感信息。
                          您可以使用第三方帐号（如微信）登录迪乐姆教师成长平台。此时您可选择授权迪乐姆教师成长平台在符合相关法律和法规规定的前提下读取您在该第三方平台上登记、公布、记录的公开信息（包括但不限于昵称、头像、关注用户列表等）。对于我们要求但第三方无法提供的个人信息，我们仍可以要求您补充提供。
                        </p>
                        <p></p>
                      </ReactModal>
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
