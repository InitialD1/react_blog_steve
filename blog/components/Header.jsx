import React, { useState, useEffect } from 'react'
import { Space, Row, Col, Menu } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { Icon } from '@ant-design/compatible';
import styles from './Header.module.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import { useRouter } from 'next/router'

const Header = () => {
    const router = useRouter()
    const [navArr, setNavArr] = useState([])

    function axiosData() {
        console.log(`time===>`, new Date().getTime())
        axios.get(servicePath.getTypeInfo).then(res => {
            setNavArr(res.data.data)
        })
    }
    useEffect(() => {
        axiosData()
    },[])

    const handleClick = (e) => {
        if (e.key == 0) {
            router.push('/')
        } else {
            router.push('/list?id=' + e.key)
        }
    }
    return (
        <div>
            <div className={styles.header}>
                <Row justify="center">
                    <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                        <span className={styles.header_logo}>SteveWen&apos;s Blog</span>
                    </Col>
                    <Col xs={0} sm={0} md={14} lg={8} xl={12}>
                        <div className={styles.header_menu}>
                        <Menu mode="horizontal" onClick={handleClick} className={styles.header_menu}>
                            <Menu.Item key="0" className={styles.header_menu_item}>
                                <Space>
                                    <HomeOutlined />
                                        首页
                                </Space>

                            </Menu.Item>
                            {
                                navArr.map(item => {
                                    return (
                                        <Menu.Item key={item.id}>
                                            <Space>
                                                <Icon type={item.icon}></Icon>
                                                {item.typeName}
                                            </Space>
                                        </Menu.Item>)
                                })
                            }
                        </Menu>
                        </div>
                        
                    </Col>
                </Row>
            </div>
        </div>
    )

}

export default Header