import React from 'react';
import {connect} from 'react-redux';
import css from  './fanDataList.scss'
var actions = require('redux/actions');
let database = require('./data');
let data=database.fanDataList;
var page=1;
var run=0;
var fau=0;
var offL=0;
var stand=0;
var haul=0;
for(let i=0;i<data.content.length;i++){
    switch ((data.content[i][5])%5){
        case 0:
            run++;
            break;
        case 1:
            fau++;
            break;
        case 2:
            offL++;
            break;
        case 3:
            stand++;
            break;
        case 4:
            haul++;
            break;
    }
}
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
        let {next,previous} = this.props;
        return (
            <div className={css.toBox}>
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
                                data.content.map((value, key)=> {
                                    if(13*(page-1)<=key&&key<page*13){
                                    return (
                                        <div className={key%2===0? css.tableContentLine : css.tableContentLine1} key={key}>
                                            {
                                                value.map((valueC, keyC)=> {
                                                        return (
                                                            <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                 key={keyC}>{valueC}</div>
                                                        );
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
                                data.content.map((value, key)=> {
                                    if(key>=page*13&&key<page*26){
                                    return (
                                        <div className={key%2===0? css.tableContentLine1 : css.tableContentLine} key={key}>
                                            {
                                                value.map((valueC, keyC)=> {
                                                        return (
                                                            <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                 key={keyC}>{valueC}</div>
                                                        );
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
                    <button className={css.run}>运行 &nbsp; {run}</button>
                    <button className={css.fau}>故障 &nbsp; {fau}</button>
                    <button className={css.offL}>离线 &nbsp; {offL}</button>
                    <button className={css.stand}>待机 &nbsp; {stand}</button>
                    <button className={css.haul}>检修 &nbsp; {haul}</button>
                    <button className={css.btnP} onClick={previous}>上一页</button><span className={css.txt}>{page}/{Math.ceil(data.content.length/26)}</span>
                    <button className={css.btnP} onClick={next}>下一页</button>
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
        previous:()=>{
            page>1 ? page--:page;
        },
        next:()=>{
            (page<(data.content.length/26)) ? page++:page;
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
