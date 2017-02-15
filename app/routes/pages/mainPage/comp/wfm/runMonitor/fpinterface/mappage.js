module.exports = {
    header: [
        {
            name: '风场1',
            page: 'fcone',
            rightpagge:[
                {
                    tabname:'逆变室',
                    rpage:'nbs'
                },
            	{
            		tabname:'风机矩阵',
            		rpage:'fanmatrix'
            	},
            	{
            		tabname:'数据列表',
            		rpage:'sjlb'
            	},
            	{
            		tabname:'测风塔',
            		rpage:'cft'
            	},
            	{
            		tabname:'升压站监视',
            		rpage:'syzjs'
            	}

            ],
           
        
        },
        {
            name: '风场2',
            page: 'fcone',
            rightpagge:[
                {
                    tabname:'逆变室',
                    rpage:'nbs1'
                },
                {
                    tabname:'光伏矩阵',
                    rpage:'pvmatrix'
                },
                {
                    tabname:'数据列表',
                    rpage:'sjlb1'
                },
                {
                    tabname:'测光塔',
                    rpage:'cgt'
                },
                {
                    tabname:'升压站监视',
                    rpage:'syzjs'
                }

            ]
        
        },
     
    ]
};
