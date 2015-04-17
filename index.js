
var path = require('path');
var koa = require('koa');
var serve = require('koa-static');
var router = require('koa-router');
var render = require('koa-ejs');
var app = koa();

var routes = require('./routes');

app.use(serve(__dirname + '/public'));

console.log(path.join(__dirname, 'public'));

render(app, {
  root: path.join(__dirname, 'public'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true,
  locals: {},
  filters: {}
});


app.use(router(app));
app.get('/', routes.weekly);

app.on('error', function(err){
  console.log('error', err)
});


if (!module.parent) app.listen(process.env.PORT || 4000);