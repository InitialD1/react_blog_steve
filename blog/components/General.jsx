import React, { useState, useEffect } from 'react'
import { Col, Row } from 'antd';
import axios from 'axios'
import servicePath from '../config/apiUrl'
import styles from './General.module.css'
export default function General() {
    const [articleCnt, setArticleCnt] = useState(0)
    const [typeCnt, setTypeCnt] = useState(0)
    useEffect(() => {
        getGeneralCnt()
    },[])
    function getGeneralCnt() {
        axios({
            method: 'get',
            url: servicePath.getGeneralCnt
        }).then((res) => {
            const data = res.data.data[0]
            setArticleCnt(data.article_cnt)
            setTypeCnt(data.type_cnt)
        })
    } 
    return (
        <div className={styles.Genelal_div}>
            <Row >
                <Col  span={12}>
                    <div className={styles.cntDiv}>
                        文章 <a className={styles.red}>{articleCnt}</a>
                    </div>
                </Col>
                <Col span={12}>
                    <div className={styles.cntDiv}>
                        分类 <a className={styles.red}>{typeCnt}</a>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
