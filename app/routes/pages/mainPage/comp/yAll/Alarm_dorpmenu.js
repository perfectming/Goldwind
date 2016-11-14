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
                valueName:'告警内容',
                content: '可输入关键字',
                id: 'input7',
                width:120
            },
            {
                type: 'input',
                valueName:'备注',
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
            
        ],
        chart:[

        ],
        table:[

        ]
    }
};
