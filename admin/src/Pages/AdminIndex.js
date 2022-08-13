import { Routes, Route, useNavigate } from 'react-router-dom'
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
const { Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('工作台', '1', <PieChartOutlined />),
    getItem('添加文章', '2', <DesktopOutlined />),
    getItem('文章管理', 'sub1', <UserOutlined />, [
        getItem('添加文章', 'addArticle'),
        getItem('文章列表', 'articleList')
    ]),
    getItem('留言管理', '9', <FileOutlined />),
];

const AdminIndex = () => {
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);

    const handleClickArticle = (e) => {
        console.log(e.key)
        if (e.key == 'articleList'){
            navigate('/index/list')
        }else {
            navigate('/index/add')
        }
    }
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} 
                    onClick={handleClickArticle}
                />
            </Sider>
            <Layout className="site-layout">
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
                        <Breadcrumb.Item>工作台</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}
                    >
                        <div>
                            <Routes>
                                <Route path="" element={<AddArticle />} />
                                <Route path="add/" element={<AddArticle />} />
                                <Route path="add/:id" element={<AddArticle />} />
                                <Route path="list/" element={<ArticleList />} />
                            </Routes>
                        </div>
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©2022 Created by SteveWen
          </Footer>
            </Layout>
        </Layout>
    );
};

export default AdminIndex;