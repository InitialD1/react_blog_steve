import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List } from 'antd'
import {
  CalendarTwoTone,
  FolderTwoTone,
  FireTwoTone
} from '@ant-design/icons';
import Header from '../components/header'
import Author from '../components/Author'
import General from '../components/General'
import Footer from '../components/Footer'
import servicePath from '../config/apiUrl'
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

export default class Home extends Component {
  static async getInitialProps(ctx) {
    const res = await fetch(servicePath.getArticleList)
    const json = await res.json()
    return { mylist: json }
  }
  render() {
    return (
      <div>
        <Head>
          <title>Home</title>
        </Head>
        <Header />
        <Row className="comm-main" justify="center" >
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
            <List
              itemLayout="vertical"
              dataSource={this.props.mylist}
              split={false}
              renderItem={item => (
                <List.Item>
                  <div className="list-item">
                    <div className="list-title">
                      <Link
                        href={{
                          pathname: '/detailed',
                          query: { id: item.id },
                        }}
                      >
                        <a>{item.title}</a>
                      </Link>

                    </div>
                    <div className="list-icon">
                      <span><CalendarTwoTone />{item.addTime}</span>
                      <span><FolderTwoTone />{item.typeName}</span>
                      <span><FireTwoTone />{item.view_count}</span>
                    </div>
                    <div className="list-context"
                      dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}>
                    </div>
                  </div>

                </List.Item>
              )}
            />
          </Col>
          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
            <Author />
            <General />
          </Col>
        </Row>
        <Footer />

      </div>
    )
  }
}
