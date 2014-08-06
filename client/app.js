/**
 * App Routes
 */

var router = require('transit');

router('/', function(ctx, next){
  console.log('hi home');
});

router.listen('/');
router.start();