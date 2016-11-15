module.exports = {
    comps:{
        from:[
            
            {
                type: 'chcekBox',
                content: '这是一个确认框',
                id: 'input3',
                title: '这是一个确认框'
            },
            {
                type: 'select',
                content: '这是一个下拉选择框',
                id: 'input3',
                select: [
                    '风电场01',
                    '风电场02',
                    '风电场03',
                    '风电场04',
                    '风电场05',
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
                type: 'chcekBox',
                content: '这是一个button333',
                id: 'input3',
                title: '这是一个确认框'
            },
           
            {
                type: 'textarea',
                content: '这是一个文本区域',
                id: 'input3',
                rows: 1,
                cols: 30,
            }
        ],
        chart:[

        ],
        table:[

        ]
    }
};
