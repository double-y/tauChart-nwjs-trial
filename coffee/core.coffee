Parser = require('node-dbf');

class DataFileManager
  constructor: (@path_string) ->
    @dbpParser = new Parser(@path_string)
