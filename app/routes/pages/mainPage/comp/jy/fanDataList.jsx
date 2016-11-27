import React from 'react';
import {connect} from 'react-redux';
import css from  './fanDataList.scss';
import icon0 from '../../img/comp/icon0.png';
import icon1 from '../../img/comp/icon1.png';
import icon2 from '../../img/comp/icon2.png';
import icon3 from '../../img/comp/icon3.png';
import icon4 from '../../img/comp/icon4.png';
var actions = require('redux/actions');
let database = require('./data');
import _ from 'lodash';
let data=database.fanDataList;

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
        let {next,previous,page=1} = this.props;
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
                                    if(38*(page-1)<=key&&key<(38*(page-1)+19)){
                                        return (
                                            <div className={key%2===0? css.tableContentLine : css.tableContentLine1} key={key}>
                                                {
                                                    value.map((valueC, keyC)=> {
                                                        if(keyC==5){
                                                            switch (valueC){
                                                                case 5:
                                                                    return (
                                                                        <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                             key={keyC}><div className={css.icon0}></div></div>
                                                                    );
                                                                case 1:
                                                                    return (
                                                                        <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                             key={keyC}><div className={css.icon1}></div></div>
                                                                    );
                                                                    break;
                                                                case 2:
                                                                    return (
                                                                        <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                             key={keyC}><div className={css.icon2}></div></div>
                                                                    );
                                                                    break;
                                                                case 3:
                                                                    return (
                                                                        <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                             key={keyC}><div className={css.icon3}></div></div>
                                                                    );
                                                                    break;
                                                                case 4:
                                                                    return (
                                                                        <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                             key={keyC}><div className={css.icon4}></div></div>
                                                                    );
                                                                    break;
                                                            }
                                                        }else{
                                                            return (
                                                                <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                     key={keyC}>{valueC}</div>
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
                                data.content.map((value, key)=> {
                                    if(key>=(page*38-19)&&key<(page*38)){
                                        return (
                                            <div className={key%2===0? css.tableContentLine1 : css.tableContentLine} key={key}>
                                                {
                                                    value.map((valueC, keyC)=> {
                                                        if(keyC==5){
                                                            switch (valueC){
                                                                case 5:
                                                                    return (
                                                                        <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                             key={keyC}><div className={css.icon0}></div></div>
                                                                    );
                                                                    break;
                                                                case 1:
                                                                    return (
                                                                        <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                             key={keyC}><div className={css.icon1}></div></div>
                                                                    );
                                                                    break;
                                                                case 2:
                                                                    return (
                                                                        <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                             key={keyC}><div className={css.icon2}></div></div>
                                                                    );
                                                                    break;
                                                                case 3:
                                                                    return (
                                                                        <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                             key={keyC}><div className={css.icon3}></div></div>
                                                                    );
                                                                    break;
                                                                case 4:
                                                                    return (
                                                                        <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                             key={keyC}><div className={css.icon4}></div></div>
                                                                    );
                                                                    break;
                                                            }
                                                        }else{
                                                            return (
                                                                <div className={css.tableContentItem} style={{width:(100/data.header.length)+"%"}}
                                                                     key={keyC}>{valueC}</div>
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
                    <span className={css.stand}><img src={icon4}/>待机 &nbsp; {stand}</span>
                    <span className={css.haul}><img src={icon2}/>检修 &nbsp; {haul}</span>
                    <a className={css.btnP} onClick={()=>next(page)}>下一页</a>
                    <span className={css.txt}>{page}/{Math.ceil(data.content.length/38)}</span>
                    <a className={css.btnP} onClick={()=>previous(page)}>上一页</a>

                </div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        page: state.vars.page1,
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
        next:(page)=>{
            (page<(data.content.length/38)) ? page++:page;
            dispatch(actions.setVars('page1', page));

        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
