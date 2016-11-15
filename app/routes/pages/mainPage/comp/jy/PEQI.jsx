import React from 'react';
import {connect} from 'react-redux';
import styles from './PEQI.scss';
import Table from '../tkgl/data_table.jsx';
import mod from '../../../../../../config/Model'
var actions = require('redux/actions');
let comps = require('./data');
let ssg2=mod.Model.ens;
let arr3=[];
(function(){
    for(let x in ssg2){
        arr3.push(ssg2[x].name);
    }}());
arr3.splice(-2,2);
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {
        let {buttonAction, inputOnChange, onFocus} = this.props;
        let comp = comps.peqi.sele;
        return (
            <div className={styles.powerBox}>
                <div className={styles.inquireBox}>
                    <div className={styles.seleBox} key='0'>
                        <span>年度</span>
                        <select>
                            {comp.yearD.map((value, key)=> {
                                    return (
                                    <option value={value} key={key}>{value}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className={styles.seleBox} key='1'>
                        <span>场站</span>
                        <select>
                            {arr3.map((value, key)=> {
                                return (
                                    <option value={value} key={key}>{value}</option>
                                )
                            })
                            }
                        </select>
                    </div>
                    <div className={styles.btnBox} key='2'>
                        <div>单位：万kWh</div>
                    </div>
                </div>
                <Table></Table>
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
        }
        ,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
