import React from 'react';
import {connect} from 'react-redux';
import styles from './navleft.scss';
import name from '../linjinjin/date';
import Pie2 from './pie2.jsx';
var actions = require('redux/actions');
let arr=name.arr;
let pie=name.pie;
let sum =[];

(function(){
  
    for(let i=0;i<pie.length;i++){
        let number=0;
        for(let j=0; j<pie[i].num.length;j++){
            number+=pie[i].num[j];

        }
        sum.push(number);
    }
   
}());



let Component = React.createClass({
    componentWillMount() {

    },

    render() {

   
       
        return (
          <div className={styles.navbox}>
                     <div className={styles.tit}>
                        <div className={styles.elect}>电场概况</div> 
                     </div>
                    {
                         arr.map((value, key)=> {
                                return (
                                    <div className={key%2===0? styles.tabdiv : styles.tabdiv1} key={key}>
                                        <div className={styles.leftname}>{arr[key].name}</div>
                                        <div className={styles.leftnum}>
                                            <a>{arr[key].unit}</a>
                                            <span className={styles.tabnum}>{arr[key].num}</span>
                                        </div>
                                    </div>
                                )
                            })
                    }  
                    <div className={styles.tit}>
                        <div className={styles.elect}>状态统计</div> 
                    </div>

                    {
                        pie.map((value,key)=>{
                            return(
                    <div className={styles.chartbox}  key={key}>
                        <div className={styles.pie}>
                            <Pie2 color={value.color} num={value.num}></Pie2>
                            <div className={styles.allnum}>{sum[key]}</div>
                        </div>
                        <div className={styles.pietext}>
                            <p>{value.title}</p>
                            {
                            value.color.map((valueC,keyC)=>{
                                return(
                             <div className={styles.infobox} key={keyC}>
                                <span className={styles.block} style={{background:valueC}}></span>
                                <span className={styles.contect}>{value.name[keyC]}</span>
                                <span className={styles.numx}>{value.num[keyC]}</span>
                             </div>
                             )
                        })
                        }
                            
                        </div>
                    </div> 
                        )
                    }) 
                }
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
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
