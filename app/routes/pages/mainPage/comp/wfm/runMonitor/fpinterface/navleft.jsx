import React from 'react';
import {connect} from 'react-redux';
import styles from './navleft.scss';
import name from './date';
import Pie2 from './pie2.jsx';
var actions = require('redux/actions');
let wttitle=require('./date');

let Component = React.createClass({

    componentDidMount() {
        this.props.init();
    },

    render() {
        
    let{fc_info='150801',choose,choose1,leftm,leftd,skinStyle}=this.props;

let date=leftd.ModelData;
let datem=leftm.Model.dis;
let namestatus=wttitle.wt_status;
let namestat=wttitle.wt_stat;
let title=wttitle.wt_title;
let wtname=wttitle.wt_name;
let wtcolor=wttitle.pie;
let wtcolor1=wttitle.pie1;
let array2=[];
let arrayJy=[];
let point=[];
let uint=wttitle.wt_unit;
var d = new Date();
let str=d.getDate();
(function(){
 
     // console.log(date)

     // for(let abs in datem){ 
     //    console.log(datem.abs)
        // if(datem.name){
        //     point.push(datem.nam)
            
        // }else{
        //     point.push('空')
        // }  console.log(point)
        // console.log(point)
    // }
    
  
  for(let key in date){
    if(date[key].WTCount!='0' && date[key].InverterCount=='0'){ //开始遍历风场数据
        let array=[];arrayJy.push(key);
    for(let i=0;i<title.length;i++){ //遍历数据字段title
        if(i==5){
           array.push(((date[key].YearPostGridEgyAt/date[key].YearPlanTotEgyAt)*100).toFixed(1)+'%') //当年上网电量完成率
        }
         
         if(i==7){
           array.push((date[key].YearEgyAt/date[key].Capacity).toFixed(1)+'h') //年累计利用小时
           array.push((((date[key].MonthEgyAt/date[key].Capacity)/str*24)*100).toFixed(2)+'%') //当月时间可利用率
        }

        array.push(date[key][title[i]]) //获取每一个key值得对应字段数组

    }
    array2.push(array) //获取全部风场的对应字段数据
    } 
}
}());
        if (!date[fc_info]){date[fc_info]=1}
        return (
          <div className={skinStyle==1?styles.navboxBlue:skinStyle==2?styles.navboxWhite:styles.navbox}>
                     <div className={styles.tit}>
                        <div className={styles.elect}>电场概况</div>
                     </div>
                    {    
                        
                         wtname.map((value, key)=> {
                             if(key==0){
                                 return (
                                     <div className={key%2===0? styles.tabdiv : styles.tabdiv1} key={key}>
                                         <div className={styles.leftname}>{wtname[key]}</div>
                                         <div className={styles.leftnum}>
                                             <a>{uint[key]}</a>
                                             <span className={styles.tabnum}>{arrayJy.indexOf(fc_info)!==-1?date[fc_info][title[key]]:(date[fc_info] && date[fc_info]["InverterCount"])}</span>
                                         </div>
                                     </div>
                                 )
                             }
                             if(key==1){
                                 return (
                                     <div className={key%2===0? styles.tabdiv : styles.tabdiv1} key={key}>
                                        <div className={styles.leftname}>{wtname[key]}</div>
                                        <div className={styles.leftnum}>
                                            <a>{uint[key]}</a>
                                            
                                            <span className={styles.tabnum}>{date[fc_info]?((date[fc_info][title[key]]/1000).toFixed(2)):'--'}</span>
                                        </div>
                                    </div>
                                 )
                             }
                            if(key==5){      
                                return (
                                    <div className={key%2===0? styles.tabdiv : styles.tabdiv1} key={key}>
                                        <div className={styles.leftname}>{wtname[key]}</div>
                                        <div className={styles.leftnum}>
                                            <a>{uint[key]}</a>
                                            <span className={styles.tabnum}>{((date[fc_info].YearPostGridEgyAt/date[fc_info].YearPlanTotEgyAt)*100).toFixed(1)}</span>
                                        </div>
                                    </div>
                                )
                            }
                             if(key==6){
                                 return (
                                     <div className={key%2===0? styles.tabdiv : styles.tabdiv1} key={key}>
                                         <div className={styles.leftname}>{arrayJy.indexOf(fc_info)!==-1 ? wtname[key]:'辐照度'}</div>
                                         <div className={styles.leftnum}>
                                             <a>{arrayJy.indexOf(fc_info)==-1?'W㎡':uint[key]}</a>

                                             <span className={styles.tabnum}>{arrayJy.indexOf(fc_info)!==-1 ? (date[fc_info][title[key]]=='null'? '--' : Number(date[fc_info][title[key]]).toFixed(2) ) : ( (date[fc_info]["PVTSI_Aver"]/1).toFixed(2)=='NaN'? '--' :(date[fc_info]["PVTSI_Aver"]/1).toFixed(2))}</span>
                                         </div>
                                     </div>
                                 )
                             }
                              if(key==7){
                                 return (
                                    <div className={key%2===0? styles.tabdiv : styles.tabdiv1} key={key}>
                                        <div className={styles.leftname}>{wtname[key]}</div>
                                        <div className={styles.leftnum}>
                                            <a>{uint[key]}</a>
                                            
                                            <span className={styles.tabnum}>{date[fc_info][title[key]]==''? '--' : (date[fc_info][title[key]]/1000).toFixed(2) }</span>
                                        </div>
                                    </div>
                                 )
                             }
                             if(key==8){
                                return (
                                    <div className={key%2===0? styles.tabdiv : styles.tabdiv1} key={key}>
                                        <div className={styles.leftname}>{wtname[key]}</div>
                                        <div className={styles.leftnum}>
                                            <a>{uint[key]}</a>
                                            <span className={styles.tabnum}>{(date[fc_info].YearEgyAt/date[fc_info].Capacity).toFixed(1)}</span>
                                        </div>
                                    </div>
                                )
                            }
                             if(key==9){      
                                return (
                                    <div className={key%2===0? styles.tabdiv : styles.tabdiv1} key={key}>
                                        <div className={styles.leftname}>{wtname[key]}</div>
                                        <div className={styles.leftnum}>
                                            <a>{uint[key]}</a>
                                            <span className={styles.tabnum}>{((1-(date[fc_info].WFMonthFaultTime/date[fc_info].WFMonthOutOkTime))*100).toFixed(2)=='NaN' ? '--' : ((1-(date[fc_info].WFMonthFaultTime/date[fc_info].WFMonthOutOkTime))*100).toFixed(2)}</span>
                                        </div>
                                    </div>
                                )
                            }
                                return (
                                    <div className={key%2===0? styles.tabdiv : styles.tabdiv1} key={key}>
                                        <div className={styles.leftname}>{wtname[key]}</div>
                                        <div className={styles.leftnum}>
                                            <a>{uint[key]}</a>
                                            
                                            <span className={styles.tabnum}>{date[fc_info][title[key]]}</span>
                                        </div>
                                    </div>
                                )
                            })
                       
                    }  
      
                    <div className={styles.tit}>
                        <div className={styles.elect}>状态统计</div> 
                    </div>
                  
                   
                    <div className={styles.chartbox}>
                          {
                              arrayJy.indexOf(fc_info)==-1?
                                  namestat.map((value,key)=>{
                                      return(
                                          <div className={styles.pie} key={key} onClick = {()=>choose1(value)}>
                                              <Pie2 num={wtcolor1[key].color}></Pie2>
                                              <div className={styles.allnum}><p>{date[fc_info][namestat[key]]}</p><p>{wtcolor1[key].title}</p></div>
                                          </div>
                                      )

                                  }):
                            namestatus.map((value,key)=>{
                                return(
                                <div className={styles.pie} key={key} onClick = {()=>choose(value)}>
                                    <Pie2 num={wtcolor[key].color}></Pie2>
                                    <div className={styles.allnum}><p>{date[fc_info][namestatus[key]]}</p><p>{wtcolor[key].title}</p></div>
                                </div>
                                )
                            })

                           }

                    </div>         
        </div>
        );
    }
});
const mapStateToProps = (state) => {
    return {
       fc_info:state.vars.fc_info,
       leftm:state.vars.leftm,
       leftd:state.vars.leftd,
        skinStyle: state.vars.skinStyle
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

        init: () => {
           
        },
        choose: (value) => {
            //console.log(value)
            dispatch(actions.setVars('choosefans', value));
            dispatch(actions.setVars('numpage', 'choosefan'));
            dispatch(actions.setVars('actbtn', 0));
        },
        choose1: (value) => {
            dispatch(actions.setVars('choosefans1', value));
            dispatch(actions.setVars('numpage', 'choosepv'));
            dispatch(actions.setVars('actbtn', 0));
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);


 
