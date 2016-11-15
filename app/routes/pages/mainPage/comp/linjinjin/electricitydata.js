module.exports = {
   
    xtext:['一月', '二月','三月','四月','五月','六月','七月'],
    height:[450],
    duixiang:[
            {
                type:'column',
                name: "场内受累",
                color:'#07a3ff',
                data: [30, 20,  30, 20, 40, 20, 50],
                marker: {
                        enabled: true                     
                    }
            }
            ,{
                type:'column',
                name: "场外受累",
                color:'#3bf182',
                data: [10, 20,  10, 10, 15, 20, 10],
                marker: {
                        enabled: true                     
                    }
            },
             {
                type:'column',
                name: "故障",
                color:'#ddcde6',
                data: [20, 20,  30, 40, 30, 10, 20],
                marker: {
                        enabled: true                     
                    }
            },
            {
                type:'column',
                name: "定检技改",
                color:'#856ffe',
                data: [30, 30,  40, 30, 50, 20, 30],
                marker: {
                        enabled: true                     
                    }
            },
            {
                type:'column',
                name: "其它",
                color:'#f7b552',
                data: [20, 10,  30, 22, 40, 10, 30],
                marker: {
                        enabled: true                     
                    }
            },
            {
                type:'spline',
                name: "日实际发电量",
                data: [200, 240,  220, 260, 205, 230, 210],
                color:'#31f3fb',
                marker: {
                        enabled: true                     
                    }
            },{
                type:'spline',
                name: "日理论发电量",
                color:'#fb8071',
                data: [180, 220,  210, 270, 215, 220, 240],
                marker: {
                        enabled: true                     
                    }
            }

    ],
  
    
};
