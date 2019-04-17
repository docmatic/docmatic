#!/usr/bin/env node
require('dotenv').config()

const path = require('path')
const args = require('args')

const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')

const app = express()

app.use(helmet())
app.use(morgan('combined'))

args.option('plugins', 'comma separated plugin list')
args.option('port', 'server port the application listens to')

const flags = args.parse(process.argv)

const plugins = pluginNamesFromArgs(flags.plugins)

const decoratedApp = require(path.join('..', 'index.js'))({ app, plugins })

const port = flags.port || process.env.PORT

if (!port) {
  throw new Error('DocmaticServerError', 'no port provided')
}

decoratedApp.listen(port, () => {
  console.log(`docmatic is provided at port ${port}`)
})

function pluginNamesFromArgs (plugins) {
  return flags.plugins ? flags.plugins.split(',') : []
}
