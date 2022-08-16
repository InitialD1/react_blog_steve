import React, { useState, useEffect } from 'react';
import { marked } from 'marked'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import '../static/css/AddArticle.css'
import TextArea from 'antd/lib/input/TextArea';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const { Option } = Select;
marked.setOptions({
    renderer: new marked.Renderer(),
    langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
});

const AddArticle = (props) => {
    const {id} = useParams() //接收useNavigate传过来的值
    const navigate = useNavigate()
    
    const [articleId, setArticleId] = useState(0) //文章的Id，如果是0说明是新增加的，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('') //文章标题
    const [articleMd, setArticleMd] = useState('') //markdown的编辑内容
    const [articleHtml, setArticleHtml] = useState('预览内容') //html内容
    const [introduceMd, setIntroduceMd] = useState('') //markdown的编辑内容
    const [introduceHtml, setIntroduceHtml] = useState('等待编辑')
    const [showDate, setShowDate] = useState() //发布日期
    const [updateDate, setUpdateDate] = useState('')//修改日志的日期
    const [typeInfo, setTypeInfo] = useState([]) //文章类别信息
    const [selectedType, setSelectedType] = useState(1) //选择的文章类别

    //从中台获取文章类型信息
    const getTypeInfo = () => {
        axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            header: { 'Access-Control-Allow-Origin': '*' },
            withCredentials: false
        }).then(
            res => {
                console.log('中台获取文章类型信息 res.data.data', res.data.data)
                if (res.data.data == "没有登录") {
                    localStorage.removeItem('openId')
                    navigate('/')
                } else {
                    setTypeInfo(res.data.data)
                }
            }
        ).catch((error) => {
            console.log('从中台获取文章类型失败，原因是', error)
        }).then(
            console.log('getTypeInfo finished')
        )
    }

    useEffect(() => {
        getTypeInfo()
        const tmpId = id
        if(tmpId) {
            setArticleId(tmpId)
            getArticleById(tmpId)
        }
    }, [id])

    const changeArticleMd = (e) => {
        setArticleMd(e.target.value)
        let html = marked(articleMd)
        setArticleHtml(html)
    }
    const changeintroduceMd = (e) => {
        setIntroduceMd(e.target.value)
        let html = marked(introduceMd)
        setIntroduceHtml(html)
    }

    //选择文章类型
    const selectTypeHandler = (value) => {
        setSelectedType(value)
    }

    //保存文章信息
    const saveArticle = () => {

        if (!selectedType) {
            message.error('必须选择文章类别')
        } else if (!articleTitle) {
            message.error('文章标题不能为空')
        } else if (!articleMd) {
            message.error('文章内容不能为空')
        } else if (!introduceMd) {
            message.error('文章简介不能为空')
        } else if (!showDate) {
            message.error('发布日期不能为空')
        } else {
            message.success('检验通过')
            let dataProps = {}
            dataProps.type_id = selectedType
            dataProps.title = articleTitle
            dataProps.introduce = introduceMd
            dataProps.article_content = articleMd
            //let dateText = showDate.replace('-','/')
            //dataProps.addTime = `${(new Date(dateText).getTime())/1000}`
            dataProps.addTime = showDate
    
    
            if (articleId == 0) {
                console.log('dataProps=: ' + dataProps)
                dataProps.view_count = Math.ceil(Math.random() * 100) + 1000
                axios({
                    method: 'post',
                    url: servicePath.addArticle,
                    data: dataProps,
                    withCredentials: false
                }).then(
                    res => {
                        setArticleId(res.data.insertId)
                        if (res.data.isSuccess) {
                            message.success('文章保存成功')
                        } else {
                            message.error('文章保存失败')
                        }
                    }
                )
            } else {
                dataProps.id = articleId
                axios({
                    method: 'post',
                    url: servicePath.updateArticle,
                    header: { 'Access-Control-Allow-Origin': '*' },
                    data: dataProps,
                    withCredentials: false
                }).then(res => {
                    if (!res.data.isSuccess) {
                        message.success('文章保存成功')
                    } else {
                        message.error('文章保存失败')
                    }
                })
            }
        }
    }

    const getArticleById = (id) => {
        axios({
            method: 'get',
            url: servicePath.getArticleById + id,
            header:{ 'Access-Control-Allow-Origin':'*' }
        }).then(
            res => {
                let articleInfo = res.data.data[0]
                console.log(articleInfo)
                setArticleTitle(articleInfo.title)
                setArticleMd(articleInfo.content)
                let html = marked(articleInfo.content)
                setArticleHtml(html)
                setIntroduceMd(articleInfo.introduce)
                let introhtml = marked(articleInfo.introduce)
                setIntroduceHtml(introhtml)
                setShowDate(articleInfo.addTime)
                setSelectedType(articleInfo.typeId)
            }
        )
    }


    return (
        <div>
            <Row gutter={16}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input
                                placeholder="博客标题" value={articleTitle} size="large" onChange={(e) => setArticleTitle(e.target.value)}>
                            </Input>

                        </Col>
                        <Col span={4}>
                            <Select defaultValue={selectedType} onChange={selectTypeHandler} size="large" >
                                {typeInfo.map((item, index) => {
                                    return (
                                        <Option key={index} value={item.id}>{item.typeName}</Option>
                                    )
                                })}
                            </Select>


                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea className="markdown-content" rows={35}
                                placeholder="文章内容"
                                value={articleMd}
                                onChange={changeArticleMd}
                            >

                            </TextArea>

                        </Col>
                        <Col span={12}>
                            <div className="show-html"
                                dangerouslySetInnerHTML={{ __html: articleHtml }}
                            >
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large">暂存按钮</Button>
                            <Button style={{ margin: 5 }}
                                size="large" type="primary"
                                onClick={saveArticle}
                            >发布按钮</Button>
                        </Col>
                        <Col span={24}>
                            <textarea
                                rows={4}
                                onChange={changeintroduceMd}
                                value={introduceMd}
                                placeholder="文章简介"
                            ></textarea>
                            <div className="introduce-html"
                                dangerouslySetInnerHTML={{ __html: introduceHtml }}
                            ></div>
                        </Col>

                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    placeholder="发布日期"
                                    size="large"
                                    onChange={(date, dateString) => setShowDate(dateString)}
                                >
                                </DatePicker>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default AddArticle