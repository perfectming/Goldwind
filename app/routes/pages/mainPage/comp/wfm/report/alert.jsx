import React from 'react';
import {connect} from 'react-redux';
import styles from './alert.scss';
var $ =require('jquery');
var actions = require('redux/actions');
let obj={
    name:'sd',
    name1:'sd1',
    name2:'sd2',
    name3:'sd3',
    name4:'sd4',
    name5:'sd5',
    name6:'sd6',
}
let arr=[1,2,3,4,5,6]

//console.log(obj.length)







let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },


    render() {
      
        return (
            <div className={styles.faultBox}>
 
            
                <div className={styles.search_tit}>
                56454545
                </div>
                <div className={styles.leftlist}>
                </div>
                 <div className={styles.righttable}>
                    <div className={styles.tablebox}>
                      <table id="tb_1" cellSpacing="0" cellPadding="2" className={styles.tablebox}>   
                        <tbody>   
                          <tr className={styles.oneline}>   
                            <td>用户编号</td>   
                            <td>试用时间</td><td>转正时间</td><td>性别</td><td>姓名拼音</td>   
                            <td>生日时间</td><td>民族</td><td>身高</td>   
                          </tr>   
                          <tr>   
                            <td>2000001</td>   
                            <td>1997-3-13</td><td>1997-3-13</td><td>1</td><td>WZJ</td>   
                            <td>1965-3-13</td><td>汉</td><td>171</td>   
                          </tr>   
                          <tr>   
                            <td>2000045</td>   
                            <td>2001-2-15</td><td>2001-3-15</td><td>0</td><td>WY</td>   
                            <td>1978-8-5</td><td>汉</td><td>162</td>   
                          </tr>   
                          <tr>   
                            <td>2000046</td>   
                            <td>2001-2-23</td><td>2001-3-23</td><td>0</td><td>LQ</td>   
                            <td>2001-2-23</td><td>汉</td><td>171</td>   
                          </tr>   
                        </tbody>   
                      </table>  

                    </div>
                 </div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

        init: () => {
                   var tTD; //用来存储当前更改宽度的Table Cell,避免快速移动鼠标的问题   
var table = document.getElementById("tb_1");   
for (var j = 0; j < table.rows[0].cells.length; j++) {   
table.rows[0].cells[j].onmousedown = function () {   
//记录单元格   
tTD = this;   
if (event.offsetX > tTD.offsetWidth - 10) {   
tTD.mouseDown = true;   
tTD.oldX = event.x;   
tTD.oldWidth = tTD.offsetWidth;   
}   
//记录Table宽度   
//table = tTD; while (table.tagName != ‘TABLE') table = table.parentElement;   
//tTD.tableWidth = table.offsetWidth;   
};   
table.rows[0].cells[j].onmouseup = function () {   
//结束宽度调整   
if (tTD == undefined) tTD = this;   
tTD.mouseDown = false;   
tTD.style.cursor = 'default';   
};   
table.rows[0].cells[j].onmousemove = function () {   
//更改鼠标样式   
if (event.offsetX > this.offsetWidth - 10)   
this.style.cursor = 'col-resize';   
else   
this.style.cursor = 'default';   
//取出暂存的Table Cell   
if (tTD == undefined) tTD = this;   
//调整宽度   
if (tTD.mouseDown != null && tTD.mouseDown == true) {   
tTD.style.cursor = 'default';   
if (tTD.oldWidth + (event.x - tTD.oldX)>0)   
tTD.width = tTD.oldWidth + (event.x - tTD.oldX);   
//调整列宽   
tTD.style.width = tTD.width;   
tTD.style.cursor = 'col-resize';   
//调整该列中的每个Cell   
table = tTD; while (table.tagName != 'TABLE') table = table.parentElement;   
for (j = 0; j < table.rows.length; j++) {   
table.rows[j].cells[tTD.cellIndex].width = tTD.width;   
}   
//调整整个表   
//table.width = tTD.tableWidth + (tTD.offsetWidth – tTD.oldWidth);   
//table.style.width = table.width;   
}   
};   
} 

        }
     
       
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
