module.exports = {
    header: [
        {
            name: '发电量报表',
            page: 'ywbb',
            rightpagge:[
            	{
            		tabname:'发电量统计',
            		rpage:'ywbb'
            	},
                {
                    tabname:'电能表码表',
                    rpage:'Electric_table'
                },
                {
                    tabname:'完成率统计',
                    rpage:'Completion'//此功能接口需要重新开发，月、年的完成率。
                }
               

            ],
           
        
        },
        {
            name: '损失电量报表',
            page: 'lose_detail',
            rightpagge:[
            	  {
                    tabname:'损失电量明细',
                    rpage:'lose_detail'//暂不开发
                },
                 {
                    tabname:'损失电量分类统计',
                    rpage:'loseelectric_statistics'
                }

            ]
        
        },
         {
            name: '可靠性报表',
            page: 'PowerCurveStatistics',
            rightpagge:[
                  {
                    tabname:'功率曲线一致性统计',
                    rpage:'PowerCurveStatistics'
                },
                 {
                    tabname:'可利用率统计',
                    rpage:'AvailableStatistics'
                }

            ]
        
        },
         {
            name: '状态统计报表',
            page: 'StateStatistics',
            rightpagge:[
                  {
                    tabname:'设备状态统计',
                    rpage:'StateStatistics'
                },
                 {
                    tabname:'设备状态查询',
                    rpage:'stateCheck'
                },
                 {
                    tabname:'设备运行模式字查询',
                    rpage:'runCheck'
                },
                 {
                    tabname:'设备运行模式字统计',
                    rpage:'runCount'
                }

            ]
        
        },
         {
            name: '功率曲线报表',
            page: 'powerCurve',
            rightpagge:[
                  {
                    tabname:'风频统计',
                    rpage:'powerCurve'
                },
                 {
                    tabname:'风玫瑰统计',
                    rpage:'lose_detail'//暂不开发
                },
                 {
                    tabname:'功率曲线统计',
                    rpage:'powerCount'
                },
                 {
                    tabname:'功率曲线对比',
                    rpage:'compareCurve'
                },


            ]
        
        },
         {
            name: '故障报表',
            page: 'FaultReport',
            rightpagge:[
                {
                    tabname:'故障明细统计',
                    rpage:'FaultReport'
                },
                {
                    tabname:'故障汇总',
                    rpage:'lose_detail'//接口待开发，蒋重义考虑需求；
                },
                {
                    tabname:'故障处理时长统计',
                    rpage:'lose_detail'//暂不开发
                },
                {
                    tabname:'故障分类统计',
                    rpage:'FaultClass'
                }

            ]
        
        },
         {
            name: '功率调控报表',
            page: 'PowerControl',
            rightpagge:[
                  {
                    tabname:'AGC调控效果报表',
                    rpage:'lose_detail'//暂不开发，功能需求数据库待确定
                },
                {
                    tabname:'AVC调控效果报表',
                    rpage:'lose_detail'//暂不开发，功能需求数据库待确定
                }

            ]
        
        },
         {
            name: '集合预报报表',
            page: 'CombinedForecasting',
            rightpagge:[
                  {
                    tabname:'短期预测',
                    rpage:''
                },
                {
                    tabname:'超短期预测',
                    rpage:''
                }

            ]
        
        },
         {
            name: '告警报表',
            page: 'StationAlert',
            rightpagge:[
                  {
                    tabname:'升压站告警查询',
                    rpage:'StationAlert'
                },
                 {
                    tabname:'AGC/ AVC告警查询',
                    rpage:'ACAlert'
                },
                 {
                    tabname:'功率预测告警查询',
                    rpage:'PowerAlert'
                }

            ]
        
        },


    ]
};
