var DataFileManager, Parser;

Parser = require('node-dbf');

DataFileManager = (function() {
  function DataFileManager(path_string) {
    this.path_string = path_string;
    this.dbpParser = new Parser(this.path_string);
  }

  return DataFileManager;

})();
