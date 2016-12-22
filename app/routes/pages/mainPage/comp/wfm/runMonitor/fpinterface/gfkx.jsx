import React from 'react';
import {connect} from 'react-redux';
import styles from './gfkx.scss';
var actions = require('redux/actions');




let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
       let{ flag=true, changpage, fcpage }=this.props;
        return (
         
                <div className={styles.mainbox} >
                    <div className={styles.centerbox}>
                        <span className={styles.sname}>箱变1</span>
                        <span className={styles.sname} style={{top:'370px',left:'369px'}}>JZGF01</span>
                        <span className={styles.sname} style={{top:'675px',left:'369px'}}>JZGF02</span>
                        <span className={styles.sname} style={{top:'200px',left:'616px',width:'110px'}}>1区汇流箱12路1<p><span>la</span><a>A</a><b>589.37</b></p></span>
                        <span className={styles.sname} style={{top:'200px',left:'763px',width:'110px'}}>1区汇流箱12路1<p><span>la</span><a>A</a><b>589.37</b></p></span>
                        <span className={styles.sname} style={{top:'200px',left:'910px',width:'110px'}}>1区汇流箱12路1<p><span>la</span><a>A</a><b>589.37</b></p></span>
                        <span className={styles.sname} style={{top:'200px',left:'1057px',width:'110px'}}>1区汇流箱12路1<p><span>la</span><a>A</a><b>589.37</b></p></span>
                        <span className={styles.sname} style={{top:'200px',left:'1204px',width:'110px'}}>1区汇流箱12路1<p><span>la</span><a>A</a><b>589.37</b></p></span>

                        <span className={styles.sname} style={{top:'355px',left:'616px',width:'110px'}}>1区汇流箱12路1<p><span>la</span><a>A</a><b>589.37</b></p></span>
                        <span className={styles.sname} style={{top:'355px',left:'763px',width:'110px'}}>1区汇流箱12路1<p><span>la</span><a>A</a><b>589.37</b></p></span>
                        <span className={styles.sname} style={{top:'355px',left:'910px',width:'110px'}}>1区汇流箱12路1<p><span>la</span><a>A</a><b>589.37</b></p></span>
                        <span className={styles.sname} style={{top:'355px',left:'1057px',width:'110px'}}>1区汇流箱12路1<p><span>la</span><a>A</a><b>589.37</b></p></span>

                        <span className={styles.sname} style={{top:'575px',left:'616px',width:'110px'}}>1区汇流箱12路1<p><span>la</span><a>A</a><b>589.37</b></p></span>
                        <span className={styles.sname} style={{top:'575px',left:'763px',width:'110px'}}>1区汇流箱12路1<p><span>la</span><a>A</a><b>589.37</b></p></span>
                        <span className={styles.sname} style={{top:'575px',left:'910px',width:'110px'}}>1区汇流箱12路1<p><span>la</span><a>A</a><b>589.37</b></p></span>
                        <span className={styles.sname} style={{top:'575px',left:'1057px',width:'110px'}}>1区汇流箱12路1<p><span>la</span><a>A</a><b>589.37</b></p></span>
                        <span className={styles.sname} style={{top:'575px',left:'1204px',width:'110px'}}>1区汇流箱12路1<p><span>la</span><a>A</a><b>589.37</b></p></span>

                        <span className={styles.sname} style={{top:'727px',left:'616px',width:'110px'}}>1区汇流箱12路1<p><span>la</span><a>A</a><b>589.37</b></p></span>
                        <span className={styles.sname} style={{top:'727px',left:'763px',width:'110px'}}>1区汇流箱12路1<p><span>la</span><a>A</a><b>589.37</b></p></span>
                        <span className={styles.sname} style={{top:'727px',left:'910px',width:'110px'}}>1区汇流箱12路1<p><span>la</span><a>A</a><b>589.37</b></p></span>
                        <span className={styles.sname} style={{top:'727px',left:'1057px',width:'110px'}}>1区汇流箱12路1<p><span>la</span><a>A</a><b>589.37</b></p></span>

                        <div className={styles.infobox}>
                            <p><span>la</span><a>A</a><b>589.37</b></p>
                            <p><span>P</span><a>kw</a><b>281.64</b></p>
                            <p><span>Q</span><a>kvar</a><b>-148.00</b></p>
                            <p><span>DG</span><a>kWh</a><b>259.64</b></p>
                        </div>
                        <div className={styles.infobox} style={{top:'555px'}}>
                            <p><span>la</span><a>A</a><b>589.37</b></p>
                            <p><span>P</span><a>kw</a><b>281.64</b></p>
                            <p><span>Q</span><a>kvar</a><b>-148.00</b></p>
                            <p><span>DG</span><a>kWh</a><b>259.64</b></p>
                        </div>
                    </div>
                </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {


    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: (flag) => {
            var obj = {
                test:'',
                }

        },
    
   
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
