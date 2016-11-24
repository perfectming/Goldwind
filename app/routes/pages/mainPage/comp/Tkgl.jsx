import React from 'react';
import {connect} from 'react-redux';
import styles from  './Tkgl.scss';
import Column from './tkgl/Column.jsx';
import Table from './tkgl/table.jsx';
let tabaleData = require('../../../../../config/RegulationData');
let model=require('../../../../../config/RegulationModel');
let obj=require('../../../../../config/MatrixData');
let data=tabaleData.ModelData;
let mode=model.Model.ens;
let nam=['AVC','AGC','PlanActPower','TActPower'];
let header=['场站名称', '有功自动控制','无功自动控制','计划值','出力'];

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {
        let {openAGC,closeAGC} = this.props;
        let arr1 = [];
        let arr2 = [];
        let obj_wfd = obj.ModelData[8888801].WFDevsStatus;
        let obj_pvd = obj.ModelData[8888802].PVDevsStatus;

        for(let x in obj_wfd){
            arr1.push(x)
        }
        for(let m in obj_pvd){
            arr2.push(m)
        }
        return (
            <div className={styles.tkglBox}>
                <button onClick={openAGC} className={styles.agc}>AGC调节</button>
                    <div className={styles.tableBox} id="AGC">
                        <div className={styles.tableHeaderBox}>
                            {
                                header.map((value, key)=> {
                                    return (
                                        <div className={styles.tableHeaderItem}
                                             style={{width:1000/header.length}} key={key}>{value}</div>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.tableContentBox}>
                            {
                                arr1.map((value, key)=> {
                                    return (
                                        <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                            <div className={styles.tableContentItem}
                                                 style={{width:1000/header.length}}
                                                 key={key} onClick={()=>changepage2(value,key)}>{mode[value]['name']}</div>
                                            {
                                                nam.map((valueC, keyC)=> {
                                                    if(keyC<2){
                                                        return (
                                                            <div className={styles.tableContentItem}
                                                                 style={{width:1000/header.length}}
                                                                 key={keyC}><div className={data[value][valueC]=='#669999'?styles.succ:styles.defa}></div></div>
                                                        )
                                                    }
                                                    else{
                                                        return (
                                                            <div className={styles.tableContentItem}
                                                                 style={{width:1000/header.length}}
                                                                 key={keyC}>{data[value][valueC]*10%1==0?data[value][valueC]:(data[value][valueC]/1).toFixed(2)}</div>
                                                        )}
                                                })
                                            }
                                        </div>
                                    )
                                })}
                            {arr2.map((value, key)=> {
                                return (
                                    <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                        <div className={styles.tableContentItem}
                                             style={{width:1000/header.length}}
                                             key={key} onClick={()=>changepage3(value,key)}>{mode[value]['name']}</div>
                                        {
                                            nam.map((valueC, keyC)=> {
                                                if(keyC<2){
                                                    return (
                                                        <div className={styles.tableContentItem}
                                                             style={{width:1000/header.length}}
                                                             key={keyC}><div className={data[value][valueC]=='#669999'?styles.succ:styles.defa}></div></div>
                                                    )
                                                }
                                                else{
                                                    return (
                                                        <div className={styles.tableContentItem}
                                                             style={{width:1000/header.length}}
                                                             key={keyC}>{data[value][valueC]*10%1==0?data[value][valueC]:(data[value][valueC]/1).toFixed(2)}</div>
                                                    )}
                                            })
                                        }
                                    </div>
                                )
                            })
                            }
                        </div>
                        <button onClick={closeAGC}>确定</button>
                    </div>
                <div className={styles.upBox}>
                    <Column></Column>
                </div>
                <div className={styles.downBox}>
                    <Table></Table>
                </div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            var obj = {
                test:''
            }
        },
        openAGC: () => {
            document.getElementById('AGC').style.display='block'
        },
        closeAGC: () => {
            document.getElementById('AGC').style.display='none'
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
