module.exports = {
    comps:{
        from:[

            {
                type: 'select',
                content: '这是一个下拉选择框',
                id: 'input3',
                valueName:'告警级别',
                select: [
                    '全部',
                    '提示',
                    '警告',
                    '故障',
                ]
            },
            {
                type: 'select',
                content: '这是一个下拉选择框',
                id: 'input4',
                valueName:'设备类型',
                select: [
                    '全部',
                    'GM/85-2500',
                    'GM/87-1500',
                    'GM/85-2500',
                    'GM/85-2500',
                ]
            },
            {
                type: 'select',
                content: '这是一个下拉选择框',
                id: 'input5',
                valueName:'确认',
                select: [
                    '全部',
                    '是',
                    '否',
                ]
            },
            {
                type: 'select',
                content: '这是一个下拉选择框',
                id: 'input6',
                valueName:'确认人',
                select: [
                    '全部',
                    '刘琦',
                    '王鹏',
                    '张三',
                    '李四',
                ]
            },
            {
                type: 'date',
                content: '这是一个时间选择框',
                id: 'date',
                width: 120,
                height:30,
            },
            {
                type: 'input',
                valueName:'用户名',
                content: '可输入关键字',
                id: 'input7',
                width:120
            },
            {
                type: 'input',
                valueName:'描述',
                content: '可输入关键字',
                id: 'input8',
                width:120
            },
            {
                type: 'button',
                content: '这是一个button',
                id: 'button',
                title: '查询',
            },
            {
                type: 'chcekBox',
                content: '这是一个确认框',
                id: 'input3',
                title: '这是一个确认框'
            },

        ],
        chart:[

        ],
        table:[

        ]
    },
    ammData:{

        header:[
            '用户编号',
            '用户名',
            '用户别名',
            '密码',
            '电话号码',
            '邮箱',
            '登录类型',
            '加密狗码',
            '备注',
            '角色'


        ],
        content:[
            [12,13,14,15,16,17,18,19,18,19],
            [22,23,24,25,26,27,28,29,18,19],
            [32,33,34,35,36,37,38,39,18,19],
            [42,43,44,45,46,47,48,49,18,19],
            [52,53,54,55,56,57,58,59,18,19],
            [62,63,64,65,66,67,68,69,18,19],
            [72,73,74,75,76,77,78,79,18,19],
            [82,83,84,85,86,87,88,89,18,19],
            [92,93,94,95,96,9,18,197,98,99],
            [102,103,104,105,106,1,18,1907,108,109],
            [102,103,105,106,14,105,106,107,108,109],
        ],
    },
    msData:{
        from:[

            {
                type: 'select',
                content: '这是一个下拉选择框',
                id: 'input3',
                valueName:'告警级别',
                select: [
                    '全部',
                    '提示',
                    '警告',
                    '故障',
                ]
            },
            {
                type: 'select',
                content: '这是一个下拉选择框',
                id: 'input4',
                valueName:'设备类型',
                select: [
                    '全部',
                    'GM/85-2500',
                    'GM/87-1500',
                    'GM/85-2500',
                    'GM/85-2500',
                ]
            },
            {
                type: 'select',
                content: '这是一个下拉选择框',
                id: 'input5',
                valueName:'确认',
                select: [
                    '全部',
                    '是',
                    '否',
                ]
            },
            {
                type: 'select',
                content: '这是一个下拉选择框',
                id: 'input6',
                valueName:'确认人',
                select: [
                    '全部',
                    '刘琦',
                    '王鹏',
                    '张三',
                    '李四',
                ]
            },
            {
                type: 'date',
                content: '这是一个时间选择框',
                id: 'date',
                width: 120,
                height:30,
            },
            {
                type: 'input',
                valueName:'角色名',
                content: '可输入关键字',
                id: 'input7',
                width:120
            },
            {
                type: 'input',
                valueName:'描述',
                content: '可输入关键字',
                id: 'input8',
                width:120
            },
            {
                type: 'button',
                content: '这是一个button',
                id: 'button',
                title: '查询',
            },
            {
                type: 'chcekBox',
                content: '这是一个确认框',
                id: 'input3',
                title: '这是一个确认框'
            },

        ],
        header:[
            '角色编号',
            '角色名称',
            '描述',
            '角色菜单',
            '中央监控',
        ],
        content:[
            [12,13,14,15,16,],
            [22,23,24,25,26,],
            [32,33,34,35,36,],
            [42,43,44,45,46,],
            [52,53,54,55,56,],
            [62,63,64,65,66,],
            [72,73,74,75,76,],
            [82,83,84,85,86,],
            [92,93,94,95,96,],
            [102,103,104,105,106,],
        ],
        aids:{
            header:['菜单','权限类型'],
            content:[
                ['系统',1],
                ['参数设置',1],
                ['同步本地数据库',1],
                ['用户管理',0],
                ['测试预警声音',1],
                ['退出',1],
                ['',0],
                ['数据查询',1],
                ['静态数据查询',1],
                ['当前版本分析',1],
                ['历史状态查询',0],
                ['历史故障查询',1],
                ['',0],
                ['实时数据查询',0],
                ['十分钟数据查询',1],
                ['日数据查询',1],
                ['电场数据查询',0],
                ['风电场出力查询分析',1],
            ],
        },
        center: {
            header: ['设备','查询权','控制权','监控权'],
            content: [
                ['Uilk FA01', 1, 0],
                ['Uilk FA01', 1, 0],
                ['Uilk FA01', 1, 0],
                ['Uilk FA01', 1, 0],
                ['Uilk FA01', 1, 0],
                ['Uilk FA01', 1, 0],
                ['Uilk FA01', 1, 0],
                ['Uilk FA01', 1, 0],
                ['Uilk FA01', 1, 0],
                ['Uilk FA01', 1, 0],
                ['Uilk FA01', 1, 0],
                ['Uilk FA01', 1, 0],
                ['Uilk FA01', 1, 0],
                ['Uilk FA01', 1, 0],
                ['Uilk FA01', 1, 0],
                ['Uilk FA01', 1, 0],
                ['Uilk FA01', 1, 0],
                ['Uilk FA01', 1, 0],
            ]
        },
        centerChoose:[
            '华北区',
            '华北区',
            '华北区',
            '华北区',
            '华北区',
            '华北区',
            '华北区',
            '华北区',
            '华北区',
            '华北区',
            '华北区',
            '华北区',
        ],
        powerCount:[
            '吉林国华一期风电场',
            '吉林国华一期风电场',
            '吉林国华一期风电场',
            '吉林国华一期风电场',
            '吉林国华一期风电场',
            '吉林国华一期风电场',
            '吉林国华一期风电场',
        ]

    }
};
