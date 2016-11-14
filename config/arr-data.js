let modeldata = require('../../../../../config/MatrixData');

 var arr1 = [];
 var arr2 = [];
 var obj = modeldata;
    var ssg = obj.ModelData[8888801].WFDevsStatus;
 module.exports = function demo1(){
   
    
    console.log(ssg)
    for(var x in ssg){
        arr1.push(ssg[x])
        for(var y in ssg[x]){
            arr2.push(ssg[x][y])
        }
    }
}
demo1();
    console.log(arr1);
arr1.map((valueZ, keyZ)=> {
    console.log(valueZ[keyZ].Wtname)
})