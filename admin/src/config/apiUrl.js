const ipUrl = 'http://localhost:7001/admin/'

const servicePath = {
    checkLogin: ipUrl + 'checkOpenId', //检查用户名密码是否正确
    getTypeInfo: ipUrl + 'getTypeInfo', //获取文章类型信息
    addArticle: ipUrl + 'addArticle',    //添加文章,
    updateArticle: ipUrl + 'updateArticle', //修改文章
    getArticleList: ipUrl + 'getArticleList', //文章列表
    delArticle: ipUrl + 'delArticle/', //删除文章
    getArticleById: ipUrl + 'getArticleById/' //根据ID获取文章详情
}

export default servicePath