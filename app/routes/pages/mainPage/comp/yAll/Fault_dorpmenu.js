module.exports = {
    comps:{
        from:[
            
            {
                type: 'select',
                content: '这是一个下拉选择框',
                id: 'input3',
                valueName:'故障主题',
                select: [
                    '风机',
                    '光伏',
                    '升压站',
                    '其他',
                ]
            },
            {
                type: 'select',
                content: '这是一个下拉选择框',
                id: 'input4',
                valueName:'故障等级',
                select: [
                    '一级',
                    '二级',
                    '三级',
                    '四级',
                    '五级',
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
                type: 'button',
                content: '这是一个button',
                id: 'button',
                title: '查询',
            },
            {
                type: 'button',
                content: '这是一个button',
                id: 'button',
                title: '显示/隐藏',
            },
            {
                type: 'button',
                content: '这是一个button',
                id: 'button',
                title: '导出Excel',
            },
            
        ],
        chart:[

        ],
        table:[

        ]
    }
};
