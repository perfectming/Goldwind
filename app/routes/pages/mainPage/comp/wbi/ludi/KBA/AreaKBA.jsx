import React from 'react';
import {connect} from 'react-redux';
import styles from './AreaKBAstyle.scss';
import PBAdata from './TimeSelect-data';
import TimeSelect from './TimeSelect.jsx';
import TableFour from './TableFour.jsx';

var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    
	render() {
		let data=PBAdata;
		return(
			<div className={styles.gbaBox}>
				<TimeSelect></TimeSelect>
				<div className={styles.content}>
					
					<div className={`${styles.wind} ${styles.boxShadow}`}>
						<div className={styles.img}><a>图片</a></div>
						<TableFour Xname={data.data[1].wind} name={data.data[0].name[0]} should={data.data[0].should} g={data.data[0].g} w={data.data[0].w} x={data.data[0].x} q={data.data[0].q} l={data.data[0].l}></TableFour>
					</div>
					<div className={`${styles.fan} ${styles.boxShadow}`}>
						<div className={styles.img}><a>图片</a></div>
						<TableFour Xname={data.data[1].fan} name={data.data[0].name[1]} should={data.data[0].should} g={data.data[0].g} w={data.data[0].w} x={data.data[0].x} q={data.data[0].q} l={data.data[0].l}></TableFour>
					</div>
				</div>
			</div>
		)
		
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

