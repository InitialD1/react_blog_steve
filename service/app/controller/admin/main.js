const { Controller } = require('egg');
class MainController extends Controller {
    async index() {
        this.ctx.body = 'hi api'
    }
    //判断用户名密码是否正确
    async checkLogin() {
        let body = this.ctx.request.body
        let userName = body.userName
        let passWord = body.passWord
        const sql = `select userName from admin_user where userName = '${userName}' and passWord = '${passWord}'`
        const result = await this.app.mysql.query(sql)
        if (result.length > 0) {
            let openId = new Date().getTime()
            this.ctx.session.openId = openId
            this.ctx.body = { 'data': '登录成功', 'openId': openId }
        } else {
            this.ctx.body = { 'data': '登录失败' }
        }
    }

    //后台文章分类信息
    async getTypeInfo() {
        const resType = await this.app.mysql.select('type')
        this.ctx.body = { data: resType }
    }

    //添加文章
    async addArticle() {
        let tmpArticle = this.ctx.request.body
        const result = await this.app.mysql.insert('article', tmpArticle)
        const insertSuccess = result.affectedRows === 1;
        const insertId = result.insertId
        console.log('res.insertId', result.insertId)
        this.ctx.body = {
            isSuccess: insertSuccess,
            insertId: insertId
        }
    }

    //修改文章
    async updateArticle() {
        let tmpArticle = this.ctx.request.body
        const result = this.app.mysql.update('article', tmpArticle)
        // 判断更新成功
        const updateSuccess = result.affectedRows === 1;
        console.log(updateSuccess)
        this.ctx.body = {
            isSuccess: updateSuccess
        }
    }

    //获得文章列表
    async getArticleList() {
        let sql = 'select article.id as id, article.type_id as type_id, article_content as context, '
            + 'title, introduce, addTime, view_count, '
            + "FROM_UNIXTIME((UNIX_TIMESTAMP(article.addTime)), '%Y-%m-%d %H:%i:%S') as addTime, "
            + 'type.typeName as typeName, type.id as typeId '
            + 'from article LEFT JOIN type on article.type_id = type.id '
            + 'order by article.id desc';
        const resList = await this.app.mysql.query(sql)
        this.ctx.body = {
            list: resList
        }
    }

    //删除文章
    async delArticle()  {
        const id = this.ctx.params.id
        const res = await this.app.mysql.delete('article',{'id': id})
        this.ctx.body = {data: res}
    }

    //根据文章ID得到文章详情，用于修改文章
    async getArticleById() {
        const id = this.ctx.params.id

        let sql = 'select article.id as id, article.type_id as type_id, article_content as content, '
            + 'title, introduce, view_count, '
            + "FROM_UNIXTIME((UNIX_TIMESTAMP(article.addTime)), '%Y-%m-%d %H:%i:%S') as addTime, "
            + 'type.typeName as typeName, type.id as typeId '
            + 'from article LEFT JOIN type on article.type_id = type.id '
            + 'where article.id=' + id;
        const res = await this.app.mysql.query(sql)
        this.ctx.body = {data: res}
    }
    
}
module.exports = MainController;