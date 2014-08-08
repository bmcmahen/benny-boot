/**
 * Generate preloaded doc object
 * 
 * @param  {String} key  
 * @param  {Array} docs 
 * @return {Object}      
 */


function generate(key, docs){
  var code = renderObject(key, docs);
  var script = '<script>' + code + '</script>';
  return script;
}

/**
 * Create a string to attach to the template
 * which will inject our javascript upon loading.
 * 
 * @param  {Object} obj 
 * @return {String}     
 */

function includeScripts(obj){

  var buf = []
  for (var key in obj) {
    var doc = obj[key];
    if (typeof doc === 'String'){
      buf.push(renderString(key, doc));
    } else {
      buf.push(renderObject(key, doc));
    }
  }

  var js = buf.join('\n');
  return '<script>'+ js +'</script>';
}

/**
 * Render a variable assignment string.
 * 
 * @param  {String} name 
 * @param  {Object|String} val  
 * @return {String}      
 */

function renderString(name, val){
  return name + ' = ' + val + ';'
}

/**
 * Render an object as a string
 * 
 * @param  {String} name 
 * @param  {Object} val  
 * @return {String}      
 */

function renderObject(name, val){
  var encoded = encodeURIComponent(JSON.stringify(val));
  return val 
    ? renderString(name, 'JSON.parse(decodeURIComponent("'+ encoded +'"))')
    : renderString(name, 'null') ;
}

module.exports = generate;
