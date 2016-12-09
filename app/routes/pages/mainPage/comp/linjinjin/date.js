module.exports = {

    wt_title:[
        "WTCount",
        "Capacity",
        "DayPostGridEgyAt",
        "MonthPostGridEgyAt",
        "YearPostGridEgyAt",
        "sdfsd",
        "WindSpeed_DevAverValue",
        "TActPower",
        'asd',
    ],
    wt_name:[
         "装机台数",
        "装机容量",
        "当日上网电量",
        "当月上网电量",
        "当年上网电量",
        "当年上网电量完成率",
        "瞬时风速",
        "瞬时功率",
        "当年累计等效利用小时",
        "当月时间可利用率",
        
    ],
      wt_unit:[
         "台",
        "mw",
        "万kWh",
        "万kWh",
        "万kWh",
        "%",
        "m/s",
        "kw",
        "h",
        "%",
        
    ],
    wt_status:[
         "RunCount_SOAM",
        "FaultCount",
        "RepairCount",
        "OfflineCount",
        "WFStandbyCount",
        "WFLIMCount",
        
    ],
    wt_stat:[
        "PVONL",
        "PVFLT",
        "PVOFL",
    ],
    mapitem:[
        {
            name:'图例',
            url:require('../../img/comp/zz.png'),
        },
        {
            name:'风电场',
            url:require('../../img/comp/fc_icon.png'),
        },
        {
            name:'光伏场',
            url:require('../../img/comp/gfc_icon.png'),
        },
        {
            name:'变电站',
            url:require('../../img/comp/fdc_icon.png'),
        },
        {
            name:'流向',
            url:require('../../img/comp/lx_icon.png'),
        },
        {
            name:'信息',
            url:require('../../img/comp/info_icon.png'),
        },
    ],
   
    xtext:['一月', '二月','三月','四月','五月','六月','七月'],
    height:[350],
    duixiang:[
            {
                type:'spline',
                name: "计划电量",
                data: [200, 240,  220, 260, 205, 230, 210],
                color:'#856ffe',
                marker: {
                        enabled: true                     
                    }
            },{
                type:'spline',
                name: "实际电量",
                data: [180, 220,  210, 270, 215, 220, 240],
                marker: {
                        enabled: true                     
                    }
            }
    ],
    arr:[
        {
            'name':'装机台数',
            'num':'40',
            'unit':'台'
        },

         {
            'name':'装机容量',
            'num':'24,264,72',
            'unit':'MW'
        },
         {
            'name':'当日上网电量',
            'num':'24,265,72',
            'unit':'kW'
        },
         {
            'name':'当月上网电量',
            'num':'235,551',
            'unit':'kW'
        },
         {
            'name':'当年上网电量',
            'num':'4,265,725',
            'unit':'kW'
        },
         {
            'name':'当年上网电量完成率',
           'num':'87.6',
            'unit':'%'
        },
         {
            'name':'顺时风速',
            'num':'15.65',
            'unit':'m/s'
        },
         {
            'name':'顺时功率',
            'num':'169.53',
            'unit':'kW'
        },
         {
            'name':'当年累计等效利用小时',
            'num':'719',
            'unit':'h'
        },
         {
            'name':'当月时间可利用率',
            'num':'65',
            'unit':'%'
        }



    ],
    pie:[
        {
        num:39,
        color:'#0f0',
        title:'正常',
    },
    {

       num:39,
        color:'#f00',
        title:'故障',
    },{
        num:39,
        color:'#fbd500',
        title:'检修',
    },{
        num:39,
        color:'#929396',
        title:'离线',
    },{
        num:39,
        color:'#328def',
        title:'待机',
    },{
        num:39,
        color:'#dddcdc',
        title:'限电',
    }

],

    
    cft:[
        {
            name:'大气温度',
            num:4.5,
            unit:'℃'
        },
         {
            name:'大气压力',
            num:102.1,
            unit:'KPa'
        },
         {
            name:'相对湿度',
            num:69.9,
            unit:'%'
        },
    ],

    cft1:[
       
         {
            name:'70m层风速',
            num:13.3,
            unit:'m/s'
        },
         {
            name:'70m层风向',
            num:.4,
            unit:'°'
        },
          {
            name:'50m层风速',
            num:14.0,
            unit:'m/s'
        },
         {
            name:'50m层风向',
            num:2.1,
            unit:'°'
        },
          {
            name:'30m层风速',
            num:8.8,
            unit:'m/s'
        },
          {
            name:'30m层风向',
            num:353.7,
            unit:'°'
        },
          {
            name:'10m层风速',
            num:9.5,
            unit:'m/s'
        },
         
         {
            name:'10m层风向',
            num:356.8,
            unit:'°'
        },
        

    ],


   //驾驶舱数据
   jscnum:{

     month:{
         high:270,
         pointWidth: 15,
         categories:['1月份','2月份','3月份','4月份','5月份','6月份','7月份','8月份','9月份','10月份','11月份','12月份'],
          yAxis: [{
               labels: {
                offset: 0,
                x:-5,
                style: {
                    color: '#fff'
                }
            },
            max: 45000,
            gridLineWidth: 0,
            title: {
                align: 'high',
                offset: 0,
                text: '(MW)',
                rotation: 0,
                y: -10,
                style: {
                    color: '#fff',
                    top:0,
                    right:0,
                }
            }
        }, { //第二个Y轴，序号为1
            title: {
                align: 'high',
                offset: 0,
                text: '(m/s)',
                rotation: 0,
                y: -10,
                style: {
                    color: '#fff',
                    top:0,
                    right:0,
                }

            },
            max:30,
            min:0,
            gridLineWidth: 0,
            labels: {
                x:5,
                style: {
                    color: '#fff'
                }
            },
            opposite: true
            }], 

             series: [{ //第二个Y轴的数据
            name: '月实际发电量',
            color: '#33BAC0',
            type: 'column',
         
            data:  [35000,50000,43000,45000,42000,35000,46000,48000,48000,46000,50000,47000],
            
        }, { //第一个Y轴的数据
            name: '月计划发电量',
            color: '#70C080',
            type: 'column',
             
            data: [30000,36000,38000,35000,32000,29000,26000,38000,38000,36000,40000,37000],
            
        },
        { //第一个Y轴的数据
            name: '完成率',
            color: '#2ff4fb',
            type: 'line',
            yAxis: 1,//坐标轴序号
            data:[26,29,27,28,26,24,28,26,26,25,24,29],
            
        }]  
     },

     money:{
         high:270,
         pointWidth: 15,
         categories:['1月份','2月份','3月份','4月份','5月份','6月份','7月份','8月份','9月份','10月份','11月份','12月份'],
          yAxis: [{
               labels: {
                offset: 0,
                x:-5,
                style: {
                    color: '#fff'
                }
            },
            max: 45000,
            gridLineWidth: 0,
            title: {
                align: 'high',
                offset: 0,
                text: '(MW)',
                rotation: 0,
                y: -10,
                style: {
                    color: '#fff',
                    top:0,
                    right:0,
                }
            }
        }, { //第二个Y轴，序号为1
            title: {
                align: 'high',
                offset: 0,
                text: '(%)',
                rotation: 0,
                y: -10,
                style: {
                    color: '#fff',
                    top:0,
                    right:0,
                }

            },
            max:30,
            min:0,
            gridLineWidth: 0,
            labels: {
                x:5,
                style: {
                    color: '#fff'
                }
            },
            opposite: true
            }], 

             series: [{ //第二个Y轴的数据
            name: '成本',
            color: '#33BAC0',
            type: 'column',
         
            data:  [35000,50000,43000,45000,42000,35000,46000,48000,48000,46000,50000,47000],
            
        }, { //第一个Y轴的数据
            name: '收入',
            color: '#70C080',
            type: 'column',
             
            data: [30000,36000,38000,35000,32000,29000,26000,38000,38000,36000,40000,37000],
            
        },
        { //第一个Y轴的数据
            name: '收益率',
            color: '#2ff4fb',
            type: 'line',
            yAxis: 1,//坐标轴序号
            data:[26,29,27,28,26,24,28,26,26,25,24,29],
            
        }]  
     },

     hour:{
         high:235,
         pointWidth: 30,
         categories:['华冉','大连胡','阜新穆雷','穆雷照壁山','奇台比六合','小草湖'],
          yAxis: [{
               labels: {
                offset: 0,
                x:-5,
                style: {
                    color: '#fff'
                }
            },
            gridLineWidth: 0,
            title: {
                align: 'high',
                offset: 0,
                text: '(MW)',
                rotation: 0,
                y: -10,
                style: {
                    color: '#fff',
                    top:0,
                    right:0,
                }
            }
        }], 

             series: [{ //第二个Y轴的数据
            name: '场站等效利用小时数',
            color: '#70C080',
            type: 'column',
         
            data:  [20437,21805,24247,25271,27383,29653],
            
        }],
     },

      mtbf:{
         high:235,
         pointWidth: 30,
         categories:['华冉','大连胡','阜新穆雷','穆雷照壁山','奇台比六合','小草湖'],
          yAxis: [{
               labels: {
                offset: 0,
                x:-5,
                style: {
                    color: '#fff'
                }
            },
            gridLineWidth: 0,
            title: {
                align: 'high',
                offset: 0,
                text: '(MW)',
                rotation: 0,
                y: -10,
                style: {
                    color: '#fff',
                    top:0,
                    right:0,
                }
            }
        }], 

             series: [{ //第二个Y轴的数据
            name: '场站MTBF',
            color: '#70C080',
            type: 'column',
         
            data:  [20437,21805,24247,25271,27383,29653],
            
        }],
     },

      elect:{
         high:220,
         pointWidth: 30,
          yAxis: [{
               labels: {
                offset: 0,
                x:-5,
                style: {
                    color: '#fff'
                }
            },
            gridLineWidth: 0,
            title: {
                align: 'high',
                offset: 0,
                text: '(MW)',
                rotation: 0,
                y: -10,
                style: {
                    color: '#fff',
                    top:0,
                    right:0,
                }
            }
        }], 

             series: [{ //第二个Y轴的数据
            name: '故障类型占比',
            
            type: 'pie',
         
            data: [['故障',1],['维护',2],['限功率',1],['非设备原因',6]]
            
        }],
     },













   }
  
    
};
