import React from 'react';
import Swal from 'sweetalert2';
import { Form, Input, Button, Icon, Select } from 'antd';
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import '../css/login.css';

const { Option } = Select;

class Register extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    
    const { form, history, restartGame } = this.props;
    restartGame()
    form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        const { registerAcc } = this.props;
        Promise.resolve(
          registerAcc(
            values.Username,
            values.Password,
            values.gmail,
            values.gender,
            values.avatar
          )
        ).then(() => {
          const{state}  = this.props;
          if (state.error.status === '200') {
            Swal.fire({
              type: 'success',
              title: 'Register succeed',
              confirmButtonText: 'LOGIN'
            }).then(result => {
              if (result.value) {
                history.push('/login');
              }
            });
          } else {
            Swal.fire({
              type: 'error',
              title: 'Account already exists for your email address',
            });
          }
        });
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const {state} = this.props;
    const {pending} = state
    
    return (
      <div className="shadow-lg mt-5 p-5 register">
        <h3 className="h3">REGISTER</h3>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('Username', {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('Password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input.Password
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('gmail', {
              rules: [{ required: true, message: 'Please input your gmail!' }]
            })(
              <Input
                type="email"
                prefix={
                  <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="gmail"
              />
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('gender', {
              rules: [{ required: true, message: 'Please input your gender!' }]
            })(
              <Select
                placeholder="Select a gender"
                prefix={
                  <Icon type="man" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
              >
                <Option value="male">male</Option>
                <Option value="female">female</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('avatar', {
              rules: [
                { required: true, message: 'Please input link your avatar!' }
              ]
            })(
              <Input
                prefix={
                  <Icon
                    type="file-image"
                    style={{ color: 'rgba(0,0,0,.25)' }}
                  />
                }
                placeholder="link avatar"
              />
            )}
          </Form.Item>
          {pending ? (
              <div
                style={{                  
                  background: 'white',
                  
                  width: '100%',
                  height: '100%',
                  opacity: '60%',
                  zIndex:1
                }}
              >
                <Icon type="loading" style={{ fontSize: 24 }} />
                
              </div>
            ) : (
              ''
            )}


          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Form.create()(withRouter(Register));
