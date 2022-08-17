import React from 'react'
import 'antd/dist/antd.min.css'
import { Input, Form, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../static/css/Login.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import { useNavigate } from "react-router-dom";

function Login() {
    let navigate = useNavigate();
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        let dataProps = {
            'userName': values.username,
            'passWord': values.password
        }
        axios({
            method: 'post',
            url: servicePath.checkLogin,
            header: { 'Access-Control-Allow-Origin': 'http://127.0.0.1:3000' },
            data: dataProps,
            withCredentials: true
        }).then(
            res => {
                console.log('请求成功，登录成功了吗： ', res.data.data)
                if (res.data.data === "登录成功") {
                    console.log('res.data.openId = ', res.data.openId)
                    localStorage.setItem('openId', res.data.openId)
                    navigate('/index')
                } else {
                    message.error('密码错误')
                }
            }
        )    
    }

    return (
        <div className='login-div'>
            <Form
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                     </Button>
       
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login