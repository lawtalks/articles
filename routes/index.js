
var fs = require('fs');
var path = require('path');

module.exports.weekly = function *(){
  var docs = ['rdgz', 'sfdt', 'flfg', 'zbsc', 'ywfz'];
  var title = ['热点关注', '司法动态', '法律法规', '资本市场', '域外法制'];
  var weekly = {contents:[]};

  for (var i in docs) {
    var filename = path.join(__dirname, '../public/docs/' + docs[i] + '.md');
    var string = yield readFile(filename);
    var list = string.split(/\n\s*\n?/);
    weekly.contents.push({ title: title[i], id:docs[i], paragraphs: [] });
    for (var j = 0; j < list.length; j++) {
      if (list[j] === '' || list[j] == title[i]) continue;
      weekly.contents[i].paragraphs.push({
        title: list[j],
        content: list[j+1]
      });
      j++;
    }
  }

  console.log(weekly.contents)

  yield this.render('weekly', weekly);
  // this.body = weekly
}




function readFile (filename) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filename, 'utf-8',function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}