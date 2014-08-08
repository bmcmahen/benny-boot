#!/usr/bin/env node

var program = require('commander');
var Duo = require('duo');
var myth = require('myth');
var minify = require('minify');
var path = require('path');
var write = require('fs').writeFileSync;
var sane = require('sane');
var async = require('async');
var clc = require('cli-color');
var react = require('react-tools');

var errorColor = clc.red.bold;
var successColor = clc.green; 

var clientRoot = path.join(__dirname, 'client');
var out = path.join(__dirname, 'public');


/**
 * Options
 */

program
  .option('-w, --watch', 'watch & build client files', clientRoot)
  .option('-p, --production', 'build resources for production environment')
  .option('-b, --build', 'build components & resources')
  .parse(process.argv);


function create(){
  return Duo(clientRoot);
}

/**
 * Watch app
 */

if (program.watch) {
  console.log(clc.blue('Watching for changes...'));
  var watcher = sane(clientRoot, ['**/*.{js,css,html,jsx}']);
  watcher.on('change', function(file){
    return path.extname(file) === '.css'
      ? buildStyles()
      : buildScripts();
  });
}

/**
 * Build
 */

if (program.build) {
  async.parallel([buildScripts, buildStyles], function(err){
    if (err) throw err;
    process.exit();
  });
}

/**
 * Build scripts/templates
 * 
 * @param  {Function} fn callback
 */

function buildScripts(fn){
  create().entry('app.js')
    .assets('../public')
    .run(function(err, src){
      if (err) {
        if (fn) return fn(err);
        return console.error(errorColor(err));
      }
      write(out + '/app.js', src);
      var len = Buffer.byteLength(src);
      console.log(successColor('Scripts built:', len / 1024 | 0, 'kb'));
      if (fn) fn(err);
    });
}

/**
 * Build styles/images/fonts
 * 
 * @param  {Function} fn callback
 */

function buildStyles(fn){
  create().entry('app.css')
    .development(true)
    .assets('../public')
    .run(function(err, src){
      if (err) {
        if (fn) return fn(err);
        return console.error(errorColor(err));
      }

      // attempt to run myth, but don't crash if it
      // messes up.
      try {
        src = myth(src);
      } catch(err) {
        console.error(err);
      }

      write(out + '/app.css', src);
      var len = Buffer.byteLength(src);
      console.log(successColor('Styles built:', len / 1024 | 0, 'kb'));
      if (fn) fn(err);
    });
}

/**
 * JSX complilation plugin for react
 * @param  {Object} opts 
 */

function jsx(opts){
  opts = opts || {};
  var JS_COMMENTS_REGEX = /(?:\/\*(?:[\s\S]*?)\*\/)|(?:\/\/(?:.*)$)/gm;
  return function jsx(file, duo){
    console.log('running!', file.type);
    if (file.type !== 'jsx') return;
    var commentMatches = file.src.match(JS_COMMENTS_REGEX);
    var hasJsxComment = commentMatches && (commentMatches[0].indexOf('/**') !== -1 && commentMatches[0].indexOf('@jsx') !== -1);
    if (!hasJsxComment) {
      file.src = '/** @jsx React.DOM */\n' + file.src;
    }
    file.src = react.transform(file.src, opts);
    file.type = 'js';
  }
}