import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'antd/dist/antd.css';
import '../css/login.css';
 import Facebook from "../component/Facebook";


class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const { form, history } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { logAccount } = this.props;
        Promise.resolve(logAccount(values.Username, values.Password)).then(
          () => {
            const tokens = localStorage.token;
            if (tokens === undefined) {
              Swal.fire({
                type : 'error',
                title: 'Account or password not found!!!',
                text: 'Try again!!!'
              });
            
            } else {
              history.push('/home');
            
            }
          }
        );
      }
    });
   
  };

  render() {
    const { form } = this.props;    
    const { getFieldDecorator } = form;
    return (
      <div className="shadow-lg m-5 p-5 Container">
        <h3 className="h3">LOGIN</h3>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('Username', {
              rules: [
                { required: true, message: 'Please input your email!' }
              ]
            })(
              <Input type="email"
                prefix={
                  <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Email"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('Password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}

            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        <div className="App">
        <Facebook />
        <br />
        <br />
      </div>
      </div>
      
    );
  }
}
export default Form.create()(withRouter(Login));
