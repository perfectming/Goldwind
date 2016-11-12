module.exports = {
    data:{
      title:[
            ['场站一',0,1],
            ['场站二',1,1],
            ['场站三',1,0],
            ['场站四',0,0]
        ],
        math:[
            ['1-1','1-2','1-3'],
            ['2-1','2-2','2-3'],
            ['3-1','3-2','3-3'],
            ['4-1','4-2','4-3']
        ],
        all:[
            {
                color:'#1fe005',
                text:'运行',
                num:54,
                url: require('../app/routes/pages/mainPage/img/comp/icon0.png')
           },
            {
                color:'#ff0000',
                text:'故障',
                num:54,
                url:  require('../app/routes/pages/mainPage/img/comp/icon1.png')
           },
            {
                color:'#fbd500',
                text:'检修',
                num:0,
                url:  require('../app/routes/pages/mainPage/img/comp/icon2.png')
           },
            {
                color:'#929396',
                text:'离线',
                num:3,
                url:  require('../app/routes/pages/mainPage/img/comp/icon3.png')
           },
            {
                color:'#2189ff',
                text:'待机',
                num:4,
                url:  require('../app/routes/pages/mainPage/img/comp/icon4.png')
           },
            {
                color:'#dddcdc',
                text:'限电',
                num:0,
                url:  require('../app/routes/pages/mainPage/img/comp/icon5.png')
           },
            ],
        all1:[
           {
                color:'#1fe005',
                text:'运行',
                num:54,
                url: require('../app/routes/pages/mainPage/img/comp/icon0.png')
           },
            {
                color:'#ff0000',
                text:'故障',
                num:54,
                url:  require('../app/routes/pages/mainPage/img/comp/icon1.png')
           },
            {
                color:'#929396',
                text:'离线',
                num:3,
                url:  require('../app/routes/pages/mainPage/img/comp/icon3.png')
           }
            ]
    }
};