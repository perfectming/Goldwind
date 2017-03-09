import React from 'react';//风机数据列表
import {connect} from 'react-redux';
import css from  './fanDataList.scss';
import icon0 from '../../../../img/comp/icon0.png';
import icon1 from '../../../../img/comp/icon1.png';
import icon2 from '../../../../img/comp/icon2.png';
import icon3 from '../../../../img/comp/icon3.png';
import icon4 from '../../../../img/comp/icon4.png';
import icon5 from '../../../../img/comp/icon5.png';
let mobdNum = require('../../../urlData.js');
let mobdZero = mobdNum.mobdZero/1;
let mobdOne = mobdNum.mobdOne/1;
let mobdTwo = mobdNum.mobdTwo/1;
let arr=['Wtid','wtne','DayEgy','ActPwr','WindSpeed','WTStateCode'];//设置表格每列属性
var actions = require('redux/actions');
let database = require('./../../../../../../../../config/data');
import _ from 'lodash';
let data=database.fanDataList;
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {changeType,fanDataType='all',valuepage,fModel,fData,next,previous,page=1,skinStyle} = this.props;
        let obj_wfd = fData.ModelData[mobdOne].WFDevsStatus;
        var run=0;
        var fau=0;
        var offL=0;
        var stand=0;
        var haul=0;
        var elec=0;
        let dataLow={
            run:[],fau:[],offL:[],stand:[],elec:[],haul:[]
        };
        dataLow.all=obj_wfd[valuepage];
        obj_wfd[valuepage].map((value,key)=>{
            switch (value.WTStateCode){
                case "Online":case "Alarm":
                    dataLow.run.push(value);
                    run++;
                break;
                case "Fault":
                    dataLow.fau.push(value);
                    fau++;
                    break;
                case "DisComForPre":case "DisComForPlc":case "Unknown":
                dataLow.offL.push(value);
                    offL++;
                break;
                case "Offline":case "ProtoectStop":case "LimitPowStop":
                dataLow.stand.push(value);
                    stand++;
                break;
                case "LimitPow":
                    dataLow.elec.push(value);
                    elec++;
                break;
                default:
                    dataLow.haul.push(value);
                    haul++;
                    break;
            }
        });//筛选不同状态风机数量
        return (
            <div className={skinStyle==1?css.toBoxBlue:skinStyle==2?css.toBoxWhite:css.toBox}>
                <div className={css.leftBox}>
                    <div className={css.tableBox}>
                        <div className={css.tableHeaderBox}>
                            {
                                data.header.map((value, key)=> {
                                    return (
                                        <div className={css.tableHeaderItem}
                                             style={{width:(100/data.header.length)+"%"}} key={key}>{value}</div>
                                    )
                                })
                            }
                        </div>
                        <div className={css.tableContentBox}>
                            {
                                dataLow[fanDataType].map((value, key)=> {
                                    if(38*(page-1)<=key&&key<(38*(page-1)+19)){
                                        return (
                                            <div className={key%2===0? css.tableContentLine : css.tableContentLine1} key={key}>
                                                {
                                                    arr.map((valueC, keyC)=> {
                                                        if(keyC==5){
                                                            switch (value[valueC]){
                                                                case "Online":case "Alarm":
                                                                    return (
                                                                        <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                             key={keyC}><div className={css.icon0}></div></div>
                                                                    );
                                                                    break;
                                                                case "Fault":
                                                                    return (
                                                                        <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                             key={keyC}><div className={css.icon1}></div></div>
                                                                    );
                                                                    break;
                                                                case "DisComForPre":case "DisComForPlc":case "Unknown":
                                                                    return (
                                                                        <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                             key={keyC}><div className={css.icon2}></div></div>
                                                                    );
                                                                    break;
                                                                case "Offline":case "ProtoectStop":case "LimitPowStop":
                                                                    return (
                                                                        <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                             key={keyC}><div className={css.icon3}></div></div>
                                                                    );
                                                                    break;
                                                                case "LimitPow":
                                                                    return (
                                                                        <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                             key={keyC}><div className={css.icon5}></div></div>
                                                                    );
                                                                    break;
                                                                default:
                                                                    return (
                                                                        <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                             key={keyC}><div className={css.icon4}></div></div>
                                                                    );
                                                                    break;
                                                            }//设置不同状态风机样式
                                                        }else{
                                                            return (
                                                                <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                     key={keyC}>{value[valueC]?value[valueC]:'--'}</div>
                                                            );
                                                        }
                                                    })
                                                }
                                            </div>
                                        )}
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className={css.rightBox}>
                    <div className={css.tableBox}>
                        <div className={css.tableHeaderBox}>
                            {
                                data.header.map((value, key)=> {
                                    return (
                                        <div className={css.tableHeaderItem}
                                             style={{width:(100/data.header.length)+"%"}} key={key}>{value}</div>
                                    )
                                })
                            }
                        </div>
                        <div className={css.tableContentBox}>
                            {
                                dataLow[fanDataType].map((value, key)=> {
                                    if(key>=(page*38-19)&&key<(page*38)){
                                        return (
                                            <div className={key%2===0? css.tableContentLine : css.tableContentLine1} key={key}>
                                                {
                                                    arr.map((valueC, keyC)=> {
                                                        if(keyC==5){
                                                            switch (value[valueC]){
                                                                case "Online":case "Alarm":
                                                                return (
                                                                    <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                         key={keyC}><div className={css.icon0}></div></div>
                                                                );
                                                                break;
                                                                case "Fault":
                                                                    return (
                                                                        <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                             key={keyC}><div className={css.icon1}></div></div>
                                                                    );
                                                                    break;
                                                                case "DisComForPre":case "DisComForPlc":case "Unknown":
                                                                return (
                                                                    <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                         key={keyC}><div className={css.icon2}></div></div>
                                                                );
                                                                break;
                                                                case "Offline":case "ProtoectStop":case "LimitPowStop":
                                                                return (
                                                                    <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                         key={keyC}><div className={css.icon3}></div></div>
                                                                );
                                                                break;
                                                                case "LimitPow":
                                                                    return (
                                                                        <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                             key={keyC}><div className={css.icon5}></div></div>
                                                                    );
                                                                    break;
                                                                default:
                                                                    return (
                                                                        <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                             key={keyC}><div className={css.icon4}></div></div>
                                                                    );
                                                                    break;
                                                            }
                                                        }else{
                                                            return (
                                                                <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                     key={keyC}>{value[valueC]?value[valueC]:'--'}</div>
                                                            );
                                                        }
                                                    })
                                                }
                                            </div>
                                        )}
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className={css.btnClass}>
                    <span onClick={()=>{changeType('all')}} className={css.all}>全部</span>
                    <span onClick={()=>{changeType('run')}} className={css.run}><img src={icon0}/>运行 &nbsp;{run}</span>
                    <span onClick={()=>{changeType('fau')}} className={css.fau}><img src={icon1}/>故障 &nbsp;{fau}</span>
                    <span onClick={()=>{changeType('offL')}} className={css.offL}><img src={icon3}/>离线 &nbsp;{offL}</span>
                    <span onClick={()=>{changeType('stand')}} className={css.stand}><img src={icon4}/>待机 &nbsp;{stand}</span>
                    <span onClick={()=>{changeType('haul')}} className={css.haul}><img src={icon2}/>检修 &nbsp;{haul}</span>
                    <span onClick={()=>{changeType('elec')}} className={css.elec}><img src={icon5}/>限电 &nbsp;{elec}</span>
                    <a className={css.btnP} onClick={()=>previous(page)}>上一页</a>
                    <span className={css.txt}>{page}/{Math.ceil(dataLow[fanDataType].length/38)}</span>
                    <a className={css.btnP} onClick={()=>next(page,dataLow[fanDataType].length)}>下一页</a>
                </div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        page: state.vars.page1,
        valuepage : state.vars.valuepage,
        fModel : state.vars.fModel,
        fData : state.vars.fData,
        fanDataType : state.vars.fanDataType,
        skinStyle: state.vars.skinStyle

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            dispatch(actions.setVars('fanDataType', 'all'));
            var obj = {
                test:''
            }
        },
        previous:(page)=>{/*上一页方法*/
            page>1 ? page--:page;
            dispatch(actions.setVars('page1', page));
        },
        next:(page,i)=>{/*下一页方法*/
            (page<(i/38)) ? page++:page;
            dispatch(actions.setVars('page1', page));

        },
        changeType:(k)=>{
            dispatch(actions.setVars('fanDataType', k));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
