/**
 * App Routes
 */

var router = require('transit');

var view = require('./examples/example-view');

router('/', function(ctx, next){
  view.appendTo(document.body);
});

router.listen('/');
router.start();