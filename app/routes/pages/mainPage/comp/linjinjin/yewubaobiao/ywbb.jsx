import React from 'react';
import {connect} from 'react-redux';
import styles from './ywbb.scss';
let type = require('./ywbb_date');
let btype = type.comps.from;
var actions = require('redux/actions');
let $=require('jquery');

let Component = React.createClass({
    componentWillMount() {
        this.props.init();
    },
     buttonAction (){
        // 获取select 选择的内容
        var sType = this.refs.selectType0.value;
        
    },
   

    render() {
         let {changeselect,select_list} = this.props;
        return (
            <div className={styles.faultBox}>
                <div className={styles.search_tit}>

                    {
                        btype.map((value, key,valueName)=> {
                            if (value.type === 'date') {
                                return (
                                    <div className={styles.dateBox} key={key}>
                                        <span>发生时间</span><input ref="startTime" placeholder={value.content} type={value.type} style={{width:value.width}}/>
                                        <span>结束时间</span><input ref="endTime" placeholder={value.content} type={value.type} style={{width:value.width}}/>
                                    </div>
                                )
                            } else  if (value.type === 'input') {
                                return (
                                    <div className={styles.inputBox} key={key}>
                                        <span>{btype[key].valueName}</span>
                                        <input ref={'textContent'+key} placeholder={value.content}
                                               onChange={(e)=>inputOnChange(e.target.value, value.id)}
                                               onFocus={()=>onFocus} style={{width:value.width}}/>
                                    </div>
                                )
                            }else if (value.type === 'select') {
                                return (
                                    <div className={styles.seleBox} key={key}>
                                        <span>{btype[key].valueName}</span>
                                        <select ref={'selectType'+key} onChange={()=>changeselect(value.select)} id='selectop'>
                                            {value.select.map((value, key)=> {
                        
                                                return (
                                                    <option value={key} key={key}>{value.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                )
                            } else if (value.type === 'button') {
                                return (
                                    <div className={styles.btnBox} key={key}>
                                        <button onClick={this.buttonAction}>{value.title}</button>
                                    </div>
                                )
                            }
                        })
                    }

                </div>
                <div className={styles.leftlist}>
                    {
                      select_list !== undefined && select_list.arr.map((valueC,keyC)=>{
                        return(
                            <div key={keyC} className={styles.place}>
                            <a className={styles.ca}>{valueC.name}</a>
                            {
                                valueC.arr.map((valueD,keyD)=>{
                                    return(
                                        <div className={styles.placename} key={keyD}>
                                            <a className={styles.da}>{valueD.name}</a>
                                        </div>
                                        )
                                })
                            }
                            </div>
                            )
                      })
                        
                    }
                </div>
                <div className={styles.righttable}></div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        select_list:state.vars.select_list,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            dispatch(actions.setVars('select_list', btype[0].select[0]));
            var obj = {
                test:''
            }
        },
         inputOnChange:(value,id)=>{
           console.log(value,id)
        },
        changeselect:(value)=>{
            dispatch(actions.setVars('select_list', value[$('#selectop').val()]));
        }
       
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
