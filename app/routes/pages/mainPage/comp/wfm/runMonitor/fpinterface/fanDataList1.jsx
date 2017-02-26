import React from 'react';//电场数据列表
import {connect} from 'react-redux';
import css from  './fanDataList.scss';
import icon0 from '../../../../img/comp/icon0.png';
import icon1 from '../../../../img/comp/icon1.png';
import icon2 from '../../../../img/comp/icon2.png';
import icon3 from '../../../../img/comp/icon3.png';
import icon4 from '../../../../img/comp/icon4.png';
let arr=['Wtid','dayElec','ActPwr','WTStateCode'];
var actions = require('redux/actions');
let database = require('./../../../../../../../../config/data');
import _ from 'lodash';
let data=database.fanDataList;
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {valuepage1,zhzb,fModel,fData,next,previous,page=1,skinStyle} = this.props;
        let model_ens = zhzb.Model.ens;
        let obj_pvd = fData.ModelData[8888802].PVDevsStatus;
        // console.log(obj_pvd);
        var run=0;
        var fau=0;
        var offL=0;
        var stand=0;
        var haul=0;
        for (let i=0;i<obj_pvd[valuepage1].length;i++){
            switch (obj_pvd[valuepage1][i].WTStateCode){
                case "Online":case "LimitPow":case "Alarm":
                run++;
                break;
                case "Fault":
                    fau++;
                    break;
                case "DisComForPre":case "DisComForPlc":case "Unknown":
                offL++;
                break;
                case "Offline":case "ProtoectStop":case "LimitPowStop":
                stand++;
                break;
                default:
                    haul++;
                    break;
            }
        }
        return (
            <div className={skinStyle==1?css.toBoxBlue:skinStyle==2?css.toBoxWhite:css.toBox}>
                <div className={css.leftBox}>
                    <div className={css.tableBox}>
                        <div className={css.tableHeaderBox}>
                            {
                                data.header1.map((value, key)=> {
                                    if(key==3){
                                        return (
                                            <div className={css.tableHeaderItem}
                                                 style={{width:(100/data.header1.length)+"%"}} key={key}>辐照度[W/m<sup>2</sup>]</div>
                                        )
                                    }else {
                                        return (
                                            <div className={css.tableHeaderItem}
                                                 style={{width: (100 / data.header1.length) + "%"}}
                                                 key={key}>{value}</div>
                                        )
                                    }
                                })
                            }
                        </div>
                        <div className={css.tableContentBox}>
                            {
                                obj_pvd[valuepage1].map((value, key)=> {
                                    if(38*(page-1)<=key&&key<(38*(page-1)+19)){
                                        return (
                                            <div className={key%2===0? css.tableContentLine : css.tableContentLine1} key={key}>
                                                {
                                                    arr.map((valueC, keyC)=> {
                                                        if(keyC==3){
                                                            switch (value[valueC]){
                                                                case "Online":case "LimitPow":case "Alarm":
                                                                return (
                                                                    <div className={css.tableContentItem} style={{width:(100/data.header1.length)+"%"}}
                                                                         key={keyC}><div className={css.icon0}></div></div>
                                                                );
                                                                break;
                                                                case "Fault":
                                                                    return (
                                                                        <div className={css.tableContentItem} style={{width:(100/data.header1.length)+"%"}}
                                                                             key={keyC}><div className={css.icon1}></div></div>
                                                                    );
                                                                    break;
                                                                case "DisComForPre":case "DisComForPlc":case "Unknown":
                                                                return (
                                                                    <div className={css.tableContentItem} style={{width:(100/data.header1.length)+"%"}}
                                                                         key={keyC}><div className={css.icon2}></div></div>
                                                                );
                                                                break;
                                                                case "Offline":case "ProtoectStop":case "LimitPowStop":
                                                                return (
                                                                    <div className={css.tableContentItem} style={{width:(100/data.header1.length)+"%"}}
                                                                         key={keyC}><div className={css.icon3}></div></div>
                                                                );
                                                                break;
                                                                default:
                                                                    return (
                                                                        <div className={css.tableContentItem} style={{width:(100/data.header1.length)+"%"}}
                                                                             key={keyC}><div className={css.icon4}></div></div>
                                                                    );
                                                                    break;
                                                            }
                                                        }else{
                                                            return (
                                                                <div className={css.tableContentItem} style={{width:(100/data.header1.length)+"%"}}
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
                                data.header1.map((value, key)=> {
                                    return (
                                        <div className={css.tableHeaderItem}
                                             style={{width:(100/data.header1.length)+"%"}} key={key}>{value}</div>
                                    )
                                })
                            }
                        </div>
                        <div className={css.tableContentBox}>
                            {
                                obj_pvd[valuepage1].map((value, key)=> {
                                    if(key>=(page*38-19)&&key<(page*38)){
                                        return (
                                            <div className={key%2===0? css.tableContentLine : css.tableContentLine1} key={key}>
                                                {
                                                    arr.map((valueC, keyC)=> {
                                                        if(keyC==3){
                                                            switch (value[valueC]){
                                                                case "Online":case "LimitPow":case "Alarm":
                                                                return (
                                                                    <div className={css.tableContentItem} style={{width:(100/data.header1.length)+"%"}}
                                                                         key={keyC}><div className={css.icon0}></div></div>
                                                                );
                                                                break;
                                                                case "Fault":
                                                                    return (
                                                                        <div className={css.tableContentItem} style={{width:(100/data.header1.length)+"%"}}
                                                                             key={keyC}><div className={css.icon1}></div></div>
                                                                    );
                                                                    break;
                                                                case "DisComForPre":case "DisComForPlc":case "Unknown":
                                                                return (
                                                                    <div className={css.tableContentItem} style={{width:(100/data.header1.length)+"%"}}
                                                                         key={keyC}><div className={css.icon2}></div></div>
                                                                );
                                                                break;
                                                                case "Offline":case "ProtoectStop":case "LimitPowStop":
                                                                return (
                                                                    <div className={css.tableContentItem} style={{width:(100/data.header1.length)+"%"}}
                                                                         key={keyC}><div className={css.icon3}></div></div>
                                                                );
                                                                break;
                                                                default:
                                                                    return (
                                                                        <div className={css.tableContentItem} style={{width:(100/data.header1.length)+"%"}}
                                                                             key={keyC}><div className={css.icon4}></div></div>
                                                                    );
                                                                    break;
                                                            }
                                                        }else{
                                                            return (
                                                                <div className={css.tableContentItem} style={{width:(100/data.header1.length)+"%"}}
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
                    <span className={css.run}><img src={icon0}/>运行 &nbsp; {run}</span>
                    <span className={css.fau}><img src={icon1}/>故障 &nbsp; {fau}</span>
                    <span className={css.offL}><img src={icon3}/>离线 &nbsp; {offL}</span>
                    <a className={css.btnP} onClick={()=>next(page,obj_pvd[valuepage1].length)}>下一页</a>
                    <span className={css.txt}>{page}/{Math.ceil(obj_pvd[valuepage1].length/38)}</span>
                    <a className={css.btnP} onClick={()=>previous(page)}>上一页</a>

                </div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        page: state.vars.page1,
        valuepage1 : state.vars.valuepage1,
        zhzb : state.vars.zhzb,
        fModel : state.vars.fModel,
        fData : state.vars.fData,
        skinStyle: state.vars.skinStyle

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            var obj = {
                test:''
            }
        },
        previous:(page)=>{
            page>1 ? page--:page;
            dispatch(actions.setVars('page1', page));
        },
        next:(page,i)=>{
            (page<(i/38)) ? page++:page;
            dispatch(actions.setVars('page1', page));

        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
