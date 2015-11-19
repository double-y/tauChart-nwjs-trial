var DBFDataFileParser;

DBFDataFileParser = (function() {
  function DBFDataFileParser(path_string) {
    var Parser;
    this.path_string = path_string;
    Parser = require('node-dbf');
    this.dbpParser = new Parser(this.path_string);
  }

  return DBFDataFileParser;

})();
