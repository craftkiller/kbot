#!/usr/bin/env node

var bot = require('ircbot')
  , merge = require('object-merge').merge
  , options = merge({
      host: 'irc.example.com'
    , port: 6667
    , secure: false
    , name: 'kbot'
    , channels: []
    , plugins: {}
    }, require('./config'))
  , kbot
  , r
  ;

process.on('uncaughtException', function(err) {
  console.log('Uncaught Exception: ' + err);
});

kbot = new bot(options.host, options.name, {
  port: options.port
, userName: options.name
, realName: options.name
, debug: false
, secure: options.secure
, channels: options.channel
});

for (plugin in options.plugins) {
  kbot.loadPlugin(plugin, options.plugins[plugin]);
}
