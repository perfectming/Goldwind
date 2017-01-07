module.exports = {
    header: [
        {
            name: '发电量报表',
            page: 'ywbb',
            rightpagge:[
            	{
            		tabname:'发电量统计用例规划',
            		rpage:'ywbb'
            	},
                {
                    tabname:'电能表码表用例规划',
                    rpage:'Electric_table'
                },
                {
                    tabname:'完成率统计用例规划',
                    rpage:'Completion'//此功能接口需要重新开发，月、年的完成率。
                }
               

            ],
           
        
        },
        {
            name: '损失电量报表',
            page: 'lose_detail',
            rightpagge:[
            	  {
                    tabname:'损失电量明细用例规划',
                    rpage:'lose_detail'//暂不开发
                },
                 {
                    tabname:'损失电量分类统计用例规划',
                    rpage:'loseelectric_statistics'
                }

            ]
        
        },
         {
            name: '可靠性报表',
            page: 'PowerCurveStatistics',
            rightpagge:[
                  {
                    tabname:'功率曲线一致性统计用例规划',
                    rpage:'PowerCurveStatistics'
                },
                 {
                    tabname:'可利用率统计用例规划',
                    rpage:'AvailableStatistics'
                }

            ]
        
        },
         {
            name: '状态统计报表',
            page: 'StateStatistics',
            rightpagge:[
                  {
                    tabname:'设备状态统计用例规划',
                    rpage:'StateStatistics'
                },
                 {
                    tabname:'设备状态查询用例规划',
                    rpage:'stateCheck'
                },
                 {
                    tabname:'设备运行模式字查询用例规划',
                    rpage:'runCheck'
                },
                 {
                    tabname:'设备运行模式字统计用例规划',
                    rpage:'runCount'
                }

            ]
        
        },
         {
            name: '功率曲线报表',
            page: 'powerCurve',
            rightpagge:[
                  {
                    tabname:'风频统计用例规划',
                    rpage:'powerCurve'
                },
                 {
                    tabname:'风玫瑰统计用例规划',
                    rpage:'lose_detail'//暂不开发
                },
                 {
                    tabname:'功率曲线统计用例规划',
                    rpage:'powerCount'
                },
                 {
                    tabname:'功率曲线对比用例规划',
                    rpage:'compareCurve'
                },


            ]
        
        },
         {
            name: '故障报表',
            page: 'FaultReport',
            rightpagge:[
                {
                    tabname:'故障明细统计用例规划',
                    rpage:'FaultReport'
                },
                {
                    tabname:'故障汇总用例规划',
                    rpage:'lose_detail'//接口待开发，蒋重义考虑需求；
                },
                {
                    tabname:'故障处理时长统计用例规划',
                    rpage:'lose_detail'//暂不开发
                },
                {
                    tabname:'故障分类统计用例规划',
                    rpage:'FaultClass'
                }

            ]
        
        },
         {
            name: '功率调控报表',
            page: 'PowerControl',
            rightpagge:[
                  {
                    tabname:'AGC调控效果报表用例规范',
                    rpage:'lose_detail'//暂不开发，功能需求数据库待确定
                },
                {
                    tabname:'AVC调控效果报表用例规范',
                    rpage:'lose_detail'//暂不开发，功能需求数据库待确定
                }

            ]
        
        },
         {
            name: '集合预报报表',
            page: 'CombinedForecasting',
            rightpagge:[
                  {
                    tabname:'短期预测用例规约',
                    rpage:''
                },
                {
                    tabname:'超短期预测用例规约',
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
                    rpage:''
                },
                 {
                    tabname:'功率预测告警查询',
                    rpage:''
                }

            ]
        
        },


    ]
};
