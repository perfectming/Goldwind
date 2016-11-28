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
        "顺时风速",
        "顺时功率",
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
         "ONL",
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



  
    
};
