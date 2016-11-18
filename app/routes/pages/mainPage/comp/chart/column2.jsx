import React from 'react';
import {connect} from 'react-redux';
var actions = require('redux/actions');
var ReactHighstock = require('react-highcharts');


let Component = React.createClass({
    componentWillMount() {
    },

    render() {
        let configPie = {
            chart: {
                height:300,
                type: 'column', //2.设置图表类型
               backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
                plotBorderWidth: 0,
                borderWidth: 0,
                plotShadow: false,
                marginTop:50,

            },
          title: {
                text: ''
            },
            xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        min: 10 //3.设置显示个数
    },
    
   
    //4.设置滚动条可用
      scrollbar: {
        enabled: true
         },
       
    series: [{
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4,29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
                name:'测试1'
    },{
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4,29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
                name:'测试2',
    }]
        };
        return (
            <ReactHighstock config={configPie}/>
        );
    }
});


const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        },
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
