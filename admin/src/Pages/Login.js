import React, { useState, createContext } from 'react'
import 'antd/dist/antd.min.css'
import { Card, Input, Button, Spin, message } from 'antd'
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import '../static/css/Login.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import AdminIndex from './AdminIndex';
import { useNavigate } from "react-router-dom";

function Login() {
    let navigate = useNavigate();

    const [userName, setUserName] = useState('')
    const [passWord, setPassWord] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const checkLogin = () => {
        setIsLoading(true)
        if (!userName) {
            message.error('用户名不能为空');
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
        } else if (!passWord) {
            message.error('密码不能为空')
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
        }
        let dataProps = {
            'userName': userName,
            'passWord': passWord
        }
        axios({
            method: 'post',
            url: servicePath.checkLogin,
            data: dataProps,
            withCredentials: true
        }).then(
            res => {
                console.log('请求成功，登录成功了吗： ',res.data.data)
                setIsLoading(false)
                if (res.data.data==="登录成功"){
                    console.log('res.data.openId = ', res.data.openId)
                    localStorage.setItem('openId',res.data.openId)
                    navigate('/index')
                }else {
                    message.error('密码错误')
                }
            }
        )

        setTimeout(() => {
            setIsLoading(false)
        }, 1000)



    }
    return (
        <div className='login-div'>
            <Spin tip="Loading" spinning={isLoading}>
                <Card title="SteveWen Blog System">
                    <Input id="userName" size="large"
                        placeholder="Enter your UserName"
                        prefix={<UserOutlined />}
                        onChange={(e) => { setUserName(e.target.value) }}
                    >
                    </Input>
                    <br /><br />
                    <Input.Password id="passWord" size="large"
                        placeholder="Enter your PassWord"
                        prefix={<KeyOutlined />}
                        onChange={(e) => { setPassWord(e.target.value) }}
                    />
                    <br /><br />
                    <Button type="primary" size="large" block onClick={checkLogin} >Login in</Button>
                </Card>
            </Spin>
        </div>
    )
}

export default Login