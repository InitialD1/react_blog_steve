'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    const result = await this.app.mysql.get('blog_content', {});
    console.log(result)
    ctx.body = result;
  }

  async getArticleList() {
    let sql = 'select article.id as id, article.type_id as type_id, article_content as context, '
      + 'title, introduce, view_count, '
      + "FROM_UNIXTIME((UNIX_TIMESTAMP(article.addTime)), '%Y-%m-%d %H:%i:%S') as addTime, "
      + 'type.typeName as typeName, type.id as typeId '
      + 'from article LEFT JOIN type on article.type_id = type.id';
    const results = await this.app.mysql.query(sql);
    this.ctx.body = results
  }

  async getArticleById() {
    //先配置路由的动态传值，然后再接收值
    let id = this.ctx.params.id
    let sql = 'select article.id as id, article.type_id as type_id, article_content, '
      + 'title ,introduce, view_count, '
      + "FROM_UNIXTIME((UNIX_TIMESTAMP(article.addTime)), '%Y-%m-%d %H:%i:%S') as addTime, "
      + 'type.typeName as typeName, type.id as typeId '
      + 'from article LEFT JOIN type on article.type_id = type.id '
      + 'WHERE article.id = ' + id;
    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results }
  }

  //得到类别名称和编号
  async getTypeInfo() {
    console.log('getTypeInfo=========>>>>>>>>>>>')
    let sql = 'select type.id as Id from type'
    const results = await this.app.mysql.select('type')
    console.log(results)
    this.ctx.body = { data: results }
  }

  //根据类别ID获得文章列表
  async getListById() {
    console.log('this.ctx.params===>', this.ctx.params.id)
    let id = this.ctx.params.id
    let sql = 'select article.id as id, article.type_id as type_id, article_content, '
      + 'title ,introduce, view_count, '
      + "FROM_UNIXTIME((UNIX_TIMESTAMP(article.addTime)), '%Y-%m-%d %H:%i:%S') as addTime, "
      + 'type.typeName as typeName, type.id as typeId '
      + 'from article LEFT JOIN type on article.type_id = type.id '
      + 'WHERE type.id = ' + 1;
    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results }
  }
  //获取文章的大概信息
  async getGeneralCnt() {
    let sql = 'SELECT (SELECT COUNT(article.id) FROM article) article_cnt, (SELECT COUNT(type.id) FROM type) type_cnt';
    const res = await this.app.mysql.query(sql)
    console.log(res)
    this.ctx.body = { data: res }
  }
}

module.exports = HomeController;
