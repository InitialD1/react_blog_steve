import React, { Component } from 'react'
import { Avatar, Image, Divider } from 'antd'
import { GithubFilled, QqCircleFilled, WechatFilled } from '@ant-design/icons'
import styles from './Author.module.css'
//"author-div comm-box"
export default class Author extends Component {
    render() {
        return (
            <div className={styles.author_div}>
                <div><Avatar size={100}

                    src="https://assets.leetcode-cn.com/aliyun-lc-upload/users/dvbbs/avatar_1628129763.png?x-oss-process=image%2Fformat%2Cwebp"


                /></div>
                <div className={styles.author_introduction}>
                    SteveWen
                    <Divider>社交账号</Divider>
                    <Avatar size={28} icon={<GithubFilled />} className={styles.account}></Avatar>
                    <Avatar size={28} icon={<QqCircleFilled />} className={styles.account}></Avatar>
                    <Avatar size={28} icon={<WechatFilled />} className={styles.account}></Avatar>
                </div>
            </div>
        )
    }
}
