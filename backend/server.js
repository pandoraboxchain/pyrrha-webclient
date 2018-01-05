var connect = require('connect');

var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname + '/..', {'index': 'html/index.html'})).listen(8081, function(){
    console.log('Server running on 8081...');
});
