import React from 'react';
import {connect} from 'react-redux';
import styles from './ProjectSta.scss';
import Column from './column.jsx';
import PieOne from './PieOne.jsx';
let Component = React.createClass({
 
    componentDidMount() {
        this.props.init();
    },
    render() {
       
        let{}=this.props;
        return (
           
          <div className={styles.box}>
          {//header
          }
               <div className={styles.header}>
                  项目统计
               </div>
           {//header 结束
          }
          {//搜索框
          }
               <div className={styles.searchbox}>
                  不会
                </div>
           {//搜索框结束
          }
           {//柱形图
           }
           <div className={styles.column}>
            <Column  height={421} text={123}
                company={["普华","亿力","国电通","智芯","飞华","国电科","新电源","启明星","网能","吉奥","亿榕","普逊","继远","亿电力","埃森哲"]} 
                companyData={[90,80,30,45,20,40,60,70,10,60,80,30,60,80,10]}></Column>
            </div>
            {//饼形图1
          }
          <div className={styles.column}>
            <PieOne></PieOne>
          </div>
          </div>
         
       

        );
    }
});



const mapStateToProps = (state) => {
    return {
    	  
        width:state.vars.width1,
     
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
      
        init: () => {
            var obj = {
                test:''
            }
        }
        ,
        backtop:(befor_pagee,befor_page2)=>{
            dispatch(actions.setVars('showPage',befor_pagee));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
