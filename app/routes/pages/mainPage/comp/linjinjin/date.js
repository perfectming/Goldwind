module.exports = {
   
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
        num:[12,11,9],
        color:['#00e3ab', '#00a07c','#008272'  ],
        title:'正常',
        name:['正常发电','天气停机','调度限功率'],
    },{

        num:[1,3,2,0],
        color:['#f7cc5b', '#f7be2a','#ff8d32' ,'#d34900' ],
        title:'维护',
        name:['风机维护','告警','技术待命','其他'],
    },{
        num:[2,1,0,0],
        color:['#fe7162', '#fc3736','#f00000','#bd0000'  ],
        title:'故障',
        name:['电网故障','故障停机','通讯中断','就地停机'],
    },{
        num:[1,0,0],
        color:['#0097c0', '#0080e8','#0066a0'  ],
        title:'增效',
        name:['降级','降额','暴风策略'],
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
         {
            name:'70m层风速',
            num:13.3,
            unit:'m/s'
        },
          {
            name:'50m层风速',
            num:14.0,
            unit:'m/s'
        },
          {
            name:'30m层风速',
            num:8.8,
            unit:'m/s'
        },
          {
            name:'10m层风速',
            num:9.5,
            unit:'m/s'
        },
          {
            name:'70m层风向',
            num:.4,
            unit:'°'
        },
          {
            name:'50m层风向',
            num:2.1,
            unit:'°'
        },
         {
            name:'30m层风向',
            num:353.7,
            unit:'°'
        },
         {
            name:'10m层风向',
            num:356.8,
            unit:'°'
        },
        

    ]


  
    
};
