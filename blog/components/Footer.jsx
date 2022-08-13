import React, { Component } from 'react'
import styles from './Footer.module.css'
export default class Footer extends Component{
    render() {
        return (
            <div className={styles.footer_div}>
                <div>系统由 React+Node+Ant Design驱动</div>
                <div>www.SteveWen.com</div>
            </div>
        )
    }
}