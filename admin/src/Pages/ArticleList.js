import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import '../static/css/ArticleList.css'
import { List, Row, Col, Modal, message, Button } from 'antd'
import axios from 'axios'
import servicePath from "../config/apiUrl"
const { confirm } = Modal;

const ArticleList = (props) => {
    const navigate = useNavigate()
    const [list, setList] = useState([])
    
    useEffect(() => {
        getList()
    })

    //得到文章列表
    const getList = () => {
        axios({
            method: 'get',
            url: servicePath.getArticleList,
            withCredentials:true,
            header:{ 'Access-Control-Allow-Origin':'*' }
        }).then(
            res => {
                setList(res.data.list)
            }
        )
    }
    
    const delArticle = (id) => {
        confirm({
          title: '确定要删除这篇博客文章嘛?',
          icon: <ExclamationCircleOutlined />,
          content: '如果你点击了确定按钮，这篇文章将会被永久删除',
      
          onOk() {
            axios({
                method: 'get',
                url: servicePath.delArticle+id,
                withCredentials: false
            }).then(res => {
                message.success("文章删除成功")
                getList()
            })
          },
      
          onCancel() {
            message.success("没有任何改变")
          },
        });
      };

    const updateArticle = ((id, checked) => {
        navigate('/index/add/' + id)
    })
    return (
        <List
            header={
                <Row>
                    <Col span={8}>
                        <b>标题</b>
                    </Col>
                    <Col span={3}>
                        <b>类别</b>
                    </Col>
                    <Col span={3}>
                        <b>发布时间</b>
                    </Col>
                    <Col span={3}>
                        <b>集数</b>
                    </Col>
                    <Col span={3}>
                        <b>浏览量</b>
                    </Col>
                    <Col span={4}>
                        <b>操作</b>
                    </Col>
                </Row>
            }
            bordered
            dataSource={list}
            renderItem={(item) => (
                <List.Item>
                    <Row className="list-div">
                        <Col span={8}>
                            {item.title}
                        </Col>
                        <Col span={3}>
                            {item.typeName}
                        </Col>
                        <Col span={3}>
                            {item.addTime}
                        </Col>
                        <Col span={3}>
                            共<span>{item.part_count}集</span>
                        </Col>
                        <Col span={3}>
                            {item.view_count}
                        </Col>
                        <Col span={4}>
                            <Button type="primary" onClick={() => updateArticle(item.id)}>修改</Button>
                            <Button onClick={() => delArticle(item.id)}>删除</Button>
                        </Col>
                    </Row>
                </List.Item>
            )}
        />
    )
}
export default ArticleList