import React, { Component } from 'react'
import Head from 'next/head'
import { Row, Col, List, Space, Breadcrumb } from 'antd'
import {
    CalendarTwoTone,
    FolderTwoTone,
    FireTwoTone
} from '@ant-design/icons';

import Header from '../components/header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import servicePath from '../config/apiUrl'
import Link from 'next/link'
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }

});

export default class ListPage extends Component {

    static async getInitialProps(ctx) {
        let id = ctx.query.id
        console.log('ctx.query.id', id)
        const res = await fetch(servicePath.getListById + id)
        const json = await res.json()
        console.log('listjson=======>', json)
        return { mylist: json.data }
    }
    render() {
        return (
            <div>
                <Head>
                    <title>List</title>
                </Head>
                <Header />
                <Row className="comm-main" justify="center" >
                    <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                        <div className="bread-div">
                            <Breadcrumb>
                                <Breadcrumb.Item>
                                    <a href="/">首页</a>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <List
                            header={<div>最新日志</div>}
                            itemLayout="vertical"
                            dataSource={this.props.mylist}
                            renderItem={item => (
                                <List.Item>
                                    <div className="list-title">
                                        <Link
                                            href={{
                                                pathname: 'detailed',
                                                query: { id: item.id }
                                            }}
                                        >
                                            {item.title}
                                        </Link>
                                    </div>
                                    <div className="list-icon">
                                        <span><CalendarTwoTone />{item.addTime}</span>
                                        <span><FolderTwoTone />{item.typeName}</span>
                                        <span><FireTwoTone />{item.view_count}</span>
                                    </div>
                                    <div className="list-context"
                                        dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                                    >
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                        <Author />
                     
                    </Col>
                </Row>
                <Footer />
            </div>
        )
    }
}
