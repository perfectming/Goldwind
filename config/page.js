module.exports = {
    header: [
        {
            name: '驾驶舱',
            iconNormal: require('../app/routes/pages/mainPage/img/comp/jsc.png'),
            iconActive: require('../app/routes/pages/mainPage/img/comp/jsc_active.png'),
            subPage: [{
                name:'驾驶舱',
                page:[
                    {
                        name:'驾驶舱',
                        page:'cockpit',
                        
                    }]
            }],
        },{
            name: '实时监控',
            iconNormal: require('../app/routes/pages/mainPage/img/comp/ssjk.png'),
            iconActive: require('../app/routes/pages/mainPage/img/comp/ssjk_active.png'),
            subPage: [{
                name:'监控看板',
                iconNormal: require('../app/routes/pages/mainPage/img/comp/jsc.png'),
                iconActive: require('../app/routes/pages/mainPage/img/comp/jsc_active.png'),
                page:[
                     {
                        name:'监控看板1',
                        page:'monitorkb',
                    },{
                        name:'监控看板2',
                        page:'',
                    },{
                        name:'监控看板3',
                        page:'',
                    }]
            },{
                name:'运行监视',
                iconNormal: require('../app/routes/pages/mainPage/img/comp/yy.png'),
                iconActive: require('../app/routes/pages/mainPage/img/comp/yy_active.png'),
                page:[
                    {
                        name:'运行概览',
                        page:'super',
                    },{
                        name:'地理分布',
                        page:'distribution',
                    },{
                        name:'风机光伏矩阵',
                        page:'fan',
                    },{
                        name:'升压站矩阵',
                        page:'booster',
                    },{
                        name:'调控概览',
                        page:'tkgl',
                    },{
                        name:'集合预报',
                        page:'power',
                    }]
            },{
                name:'故障告警',
                iconNormal: require('../app/routes/pages/mainPage/img/comp/gj.png'),
                iconActive: require('../app/routes/pages/mainPage/img/comp/gj_active.png'),
                page:[
                     {
                        name:'报警查询',
                        page:'alarm',
                    },{
                        name:'报警提醒设置',
                        page:'AS',
                    }]
            },{
                name:'批量控制',
                iconNormal: require('../app/routes/pages/mainPage/img/comp/pl.png'),
                iconActive: require('../app/routes/pages/mainPage/img/comp/pl_active.png'),
                
            },{
                name:'业务报表',
                iconNormal: require('../app/routes/pages/mainPage/img/comp/yw.png'),
                iconActive: require('../app/routes/pages/mainPage/img/comp/yw_active.png'),
                page:[
                    {
                        name:'发电量报表',
                        page:'ywbb',
                    }]
            },{
                name:'数据管理',
                iconNormal: require('../app/routes/pages/mainPage/img/comp/sj.png'),
                iconActive: require('../app/routes/pages/mainPage/img/comp/sj_active.png'),
                page:[
                    {
                        name:'计划电量录入',
                        page:'PEQI',
                    }]
            }],
        },{
            name: '健康管理',
            iconNormal: require('../app/routes/pages/mainPage/img/comp/jkgl.png'),
            iconActive: require('../app/routes/pages/mainPage/img/comp/jkgl_active.png'),
            subPage: [{
                name:'健康总览',
                iconNormal: require('../app/routes/pages/mainPage/img/comp/jkzl.png'),
                iconActive: require('../app/routes/pages/mainPage/img/comp/jkzl_active.png'),
                page:[
                     {
                        name:'总览',
                        page:'health_main',
                    }]
            },{
                name:'预警处理',
                iconNormal: require('../app/routes/pages/mainPage/img/comp/yjcl.png'),
                iconActive: require('../app/routes/pages/mainPage/img/comp/yjcl_active.png'),
                page:[
                    {
                        name:'预警处理',
                        page:'yujing',
                    },{
                        name:'历史查询',
                        page:'history_list',
                    },{
                        name:'订阅管理',
                        page:'subscribe',
                    },{
                        name:'报告',
                        page:'manaport',
                    }]
            }],
        },{
            name: '资产管理',
            iconNormal: require('../app/routes/pages/mainPage/img/comp/zcgl.png'),
            iconActive: require('../app/routes/pages/mainPage/img/comp/zcgl_active.png'),
            subPage: [{
                name:'',
                page:[
                    {
                        name:'',
                        page:'',
                    },{
                        name:'',
                        page:'',
                    },{
                        name:'',
                        page:'',
                    }]
            },{
                name:'',
                page:[
                        
                        {
                        name:'',
                        page:'',
                    },{
                        name:'',
                        page:'',
                    },{
                        name:'',
                        page:'',
                    }]
            },{
                name:'',
                page:[
                    {
                        name:'',
                        page:'',
                    },{
                        name:'',
                        page:'',
                    },{
                        name:'',
                        page:'',
                    }]
            }],
        },{
            name: '业务智能',
            iconNormal: require('../app/routes/pages/mainPage/img/comp/ywfx.png'),
            iconActive: require('../app/routes/pages/mainPage/img/comp/ywfx_active.png'),
            subPage: [{
                name:'经营仪表盘',
                iconNormal: require('../app/routes/pages/mainPage/img/comp/ybp.png'),
                iconActive: require('../app/routes/pages/mainPage/img/comp/ybp1.png'),
                page:[
                    {
                        name:'集团',
                        page:'group',
                    },{
                        name:'区域',
                        page:'area',
                    },{
                        name:'风场',
                        page:'windpage',
                    }]
            },{
                name:'KPI指标',
                iconNormal: require('../app/routes/pages/mainPage/img/comp/kizb.png'),
                iconActive: require('../app/routes/pages/mainPage/img/comp/kizb1.png'),
                page:[
                    {
                        name:'PBA分析',
                        page:'groupKBA',
                    },{
                        name:'损失电量分析',
                        page:'loseElectric',
                    },{
                        name:'可靠性分析',
                        page:'reliability',
                    },{
                        name:'Top10故障损失分析',
                        page:'topTen',
                    }]
            },{
                name:'报表分析',
                iconNormal: require('../app/routes/pages/mainPage/img/comp/bbfx.png'),
                iconActive: require('../app/routes/pages/mainPage/img/comp/bbfx1.png'),
                page:[
                     {
                        name:'',
                        page:'',
                    }]
            },{
                name:'分析工具',
                iconNormal: require('../app/routes/pages/mainPage/img/comp/fxgj.png'),
                iconActive: require('../app/routes/pages/mainPage/img/comp/fxgj1.png'),
                page:[
                     {
                        name:'',
                        page:'',
                    }]
            },{
                name:'数据填报',
                iconNormal: require('../app/routes/pages/mainPage/img/comp/sjtb.png'),
                iconActive: require('../app/routes/pages/mainPage/img/comp/sjtb1.png'),
                page:[
                     {
                        name:'阶段上网电量',
                        page:'peqii',
                    },{
                        name:'成本录入',
                        page:'input_cost',
                    }]
            }],
        },{
            name: '综合查询',
            iconNormal: require('../app/routes/pages/mainPage/img/comp/zhfx.png'),
            iconActive: require('../app/routes/pages/mainPage/img/comp/zhfx_active.png'),
            subPage: [{
                name:'',
                page:[
                     {
                        name:'',
                        page:'',
                    }]
            }],
        },{
            name: '系统管理',
            iconNormal: require('../app/routes/pages/mainPage/img/comp/xtgl.png'),
            iconActive: require('../app/routes/pages/mainPage/img/comp/xtgl_active.png'),
            subPage: [{
                name:'角色管理',
                page:[
                    {
                        name:'角色管理',
                        page:'ms',
                    }]
            },{
                name:'用户管理',
                page:[
                    {
                        name:'用户管理',
                        page:'amm',
                    }]
            }],
        },
    ]
};
