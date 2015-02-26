var koa = require('koa.io');

var app = koa();

// middleware for koa
app.use(function*() {
});


// middleware for scoket.io's connect and disconnect
app.io.use(function* (next) {
  // on connect
  yield* next;
  // on disconnect
});

// router for socket event
app.io.route('new message', function* () {
  // we tell the client to execute 'new message'
  var message = this.args[0];
  this.broadcast.emit('new message', message);
});


if (!module.parent) app.listen(process.env.PORT || 4000);