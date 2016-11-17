import React from 'react';
import {connect} from 'react-redux';
import css from  './Tkgl.scss'
var actions = require('redux/actions');
let database = require('./data');
let data=database.fanDataList.content;
var page=1;
let run=0;
let fau=0;
let offL=0;
let stand=0;
let haul=0;
for(let i=0;i<data.length;i++){
    switch (data[i][4]%5){
        case 0:
            run++;
            return;
        case 1:
            fau++;
            return;
        case 2:
            offL++;
            return;
        case 3:
            stand++;
            return;
        case 4:
            haul++;
            return;
    }
}console.log(page,run,fau,offL,stand,haul);
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        return (
            <div className={css.tkglBox}>
                <button onClick={page>1?page--:page}>上一页</button>{page}/{Math.ceil(data.length/26)}
                <button onClick={page<data.length/26?page++:page}>下一页</button>
                <div className={css.leftBox}>
                    <div className={styles.tableBox}>
                        <div className={styles.tableHeaderBox}>
                            {
                                data.fanDataList.header.map((value, key)=> {
                                    return (
                                        <div className={styles.tableHeaderItem}
                                             style={{width:(100/data.fanDataList.header.length)+"%"}} key={key}>{value}</div>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.tableContentBox}>
                            {
                                data.map((value, key)=> {
                                    if(key<page*13){
                                    return (
                                        <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                            {
                                                value.map((valueC, keyC)=> {
                                                    if(keyC==value.length-1){
                                                        return (
                                                            <input className={styles.tableContentItem}
                                                                   style={{width:(100/data.fanDataList.header.length)+"%"}}
                                                                   key={keyC} contentEditable="true"
                                                                   onChange={(e)=>changeTableItem(e.target.value,table,key,keyC)}
                                                                   value={valueC}/>
                                                        )
                                                    }else{
                                                        return (
                                                            <div className={styles.tableContentItem} style={{width:(100/data.fanDataList.header.length)+"%"}}
                                                                 key={keyC}>{valueC}</div>
                                                        );}
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
                    <div className={styles.tableBox}>
                        <div className={styles.tableHeaderBox}>
                            {
                                data.fanDataList.header.map((value, key)=> {
                                    return (
                                        <div className={styles.tableHeaderItem}
                                             style={{width:(100/data.fanDataList.header.length)+"%"}} key={key}>{value}</div>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.tableContentBox}>
                            {
                                data.map((value, key)=> {
                                    if(key>=page*13&&key<page*26){
                                    return (
                                        <div className={key%2===0? styles.tableContentLine : styles.tableContentLine1} key={key}>
                                            {
                                                value.map((valueC, keyC)=> {
                                                    if(keyC==value.length-1){
                                                        return (
                                                            <input className={styles.tableContentItem}
                                                                   style={{width:(100/data.fanDataList.header.length)+"%"}}
                                                                   key={keyC} contentEditable="true"
                                                                   onChange={(e)=>changeTableItem(e.target.value,table,key,keyC)}
                                                                   value={valueC}/>
                                                        )
                                                    }else{
                                                        return (
                                                            <div className={styles.tableContentItem} style={{width:(100/data.fanDataList.header.length)+"%"}}
                                                                 key={keyC}>{valueC}</div>
                                                        );}
                                                })
                                            }
                                        </div>
                                    )}
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.btnClass}>
                    <button>运行</button>
                    <button>故障</button>
                    <button>离线</button>
                    <button>待机</button>
                    <button>检修</button></div>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
