import React, { Component } from 'react'
import Head from 'next/head'
import { Row, Col, Affix, Breadcrumb } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import ReactMarkdown from 'react-markdown'
import MarkdownNavbar from 'markdown-navbar';
// The default style of markdown-navbar should be imported additionally
import 'markdown-navbar/dist/navbar.css';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import { CalendarOutlined, FolderViewOutlined, FireOutlined } from '@ant-design/icons'
import Tocify from '../components/tocify.tsx'
const renderer = new marked.Renderer();
const tocify = new Tocify()
renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
};
marked.setOptions({
    renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: true,
    smartLists: true,
    smartypants: true,
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }

});

export default class Detailed extends Component {
    static async getInitialProps(ctx) {
        console.log(ctx.query.id)
        let id = ctx.query.id
        const response = await fetch('http://127.0.0.1:7001/default/getArticleById/' + id)
        console.log(response.status)
        console.log(response.statusText)
        const json = await response.json();
        console.log(json.data[0])
        return { md: json.data[0] }
        // return await promise
    }

    constructor(props) {
        super(props);
        this.state = {
            markdown: '\n# P01:课程介绍和环境搭建\n' +
                '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
                '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
                '**这是加粗的文字**\n\n' +
                '*这是倾斜的文字*`\n\n' +
                '***这是斜体加粗的文字***\n\n' +
                '~~这是加删除线的文字~~ \n\n' +
                '\`console.log(111)\` \n\n' +
                '# p02:来个Hello World 初始Vue3.0\n' +
                '> aaaaaaaaa\n' +
                '>> bbbbbbbbb\n' +
                '>>> cccccccccc\n' +
                '***\n\n\n' +
                '# p03:Vue3.0基础知识讲解\n' +
                '> aaaaaaaaa\n' +
                '>> bbbbbbbbb\n' +
                '>>> cccccccccc\n\n' +
                '# p04:Vue3.0基础知识讲解\n' +
                '> aaaaaaaaa\n' +
                '>> bbbbbbbbb\n' +
                '>>> cccccccccc\n\n' +
                '#5 p05:Vue3.0基础知识讲解\n' +
                '> aaaaaaaaa\n' +
                '>> bbbbbbbbb\n' +
                '>>> cccccccccc\n\n' +
                '# p06:Vue3.0基础知识讲解\n' +
                '> aaaaaaaaa\n' +
                '>> bbbbbbbbb\n' +
                '>>> cccccccccc\n\n' +
                '# p07:Vue3.0基础知识讲解\n' +
                '> aaaaaaaaa\n' +
                '>> bbbbbbbbb\n' +
                '>>> cccccccccc\n\n' +
                '``` var a=11; ```'
        };
    }



    html = marked(this.props.md.context)


    render() {
        return (
            <div>
                <Head>
                    <title>博客详情页</title>
                </Head>
                <Header />
                <Row className="comm-main" type="flex" justify="center">
                    <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                        <div>
                            <div className="bread-div">
                                <Breadcrumb>
                                    <Breadcrumb.Item>
                                        <a href="/"></a>首页
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        视频列表
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        xxxxxxx
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <div>
                                <div className="list-icon center">
                                    <span><CalendarOutlined />2022-5-28</span>
                                    <span><FolderViewOutlined />视频教程</span>
                                    <span><FireOutlined />8898人</span>
                                </div>
                                <div className="detailed-content">
                                    <div dangerouslySetInnerHTML={{ __html: this.html}}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                        <Author />
                        <Advert />
                        <Affix offsetTop={6}>
                            <div className="detailed-nav comm-box">
                                <div className="nav-title">文章目录</div>
                                <div className="toc-list">
                                    {tocify && tocify.render()}
                                </div>
                            </div>
                        </Affix>

                    </Col>
                </Row>
                <Footer />
            </div>
        )
    }
}
