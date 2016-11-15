module.exports = {
   
    xtext:['一月', '二月','三月','四月','五月','六月','七月'],
    height:[350],
    duixiang:[
            {
                type:'spline',
                name: "计划电量",
                data: [200, 240,  220, 260, 205, 230, 210],
                color:'#856ffe',
                marker: {
                        enabled: true                     
                    }
            },{
                type:'spline',
                name: "实际电量",
                data: [180, 220,  210, 270, 215, 220, 240],
                marker: {
                        enabled: true                     
                    }
            }
    ],
  
    
};
