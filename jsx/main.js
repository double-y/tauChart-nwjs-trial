'use strict'

var React = require('react');
var ReactDom = require('react-dom');

var App = React.createClass({
  render: function(){
    return (
      <DataContainer/>
    )
  }
});

var DataContainer = React.createClass({
    getInitialState: function(){
        return {
            chartType: 'scatterplot',
            xLabel: '',
            yLabel: '',
            data: []
        }
    },
    setData: function(data, xLabel, yLabel){
        this.setState({data: data, xLabel: xLabel, yLabel: yLabel});
    },
    render: function(){
        if(this.refs.chart){this.refs.chart}
        if(this.state.data.length > 0){
            return (
                <SampleChart
                    ref="chart"
                    data={this.state.data}
                    chartType={this.state.chartType}
                    xLabel={this.state.xLabel}
                    yLabel={this.state.yLabel}/>
            )
        }else{
            return (
                <div>
                    <p>please input data</p>
                    <FileInput setData={this.setData}/>
                </div>)
        }
    }
});

var SampleChart = React.createClass({
  showChart: function(dom){
      var chartConfig = {
          type: this.props.chartType,
          x: this.props.xLabel,
          y: this.props.yLabel,
          color: 'cylinders',

          plugins: [
              //tauCharts.api.plugins.get('tooltip')({fields:["name", "year", "economy (mpg)", "power (hp)"]}),
              tauCharts.api.plugins.get('trendline')(),
              tauCharts.api.plugins.get('legend')()
          ],

          data: this.props.data
      }
    this._chart = new tauCharts.Chart(chartConfig);
    this._chart.renderTo(dom);
      this._chartDom = dom;
  },
  render: function(){
    var self = this;
    return (
      <div id='sample_chrart' ref={function(dom){self.showChart(dom)}}></div>
    );
  }
});

var FileInput = React.createClass({
    changeListener: function(event){

    },
  addInputListener: function(dom){
      var _this = this;
      function changeListener(evt) {
          evt.preventDefault();

          var dataFileManager = new DBFDataFileParser(this.value);

          var fields = [];
          var records = [];

          dataFileManager.dbpParser.on('header', function(head){
              fields = head.fields;
          });

          dataFileManager.dbpParser.on('record', function(record){
              records.push(record);
          });

          dataFileManager.dbpParser.on('end', function(){
              _this.props.setData(records, fields[68].name, fields[106].name);
          });

          dataFileManager.dbpParser.parse();
      }
      if(dom!=null) dom.addEventListener("change", changeListener, false);
  },
  render: function(){
    var self = this;
    return (<input ref={function(dom){self.addInputListener(dom);}} type='file'/>);
  }
});

ReactDom.render(<App/>, document.getElementById('app'));

module.exports= App;
