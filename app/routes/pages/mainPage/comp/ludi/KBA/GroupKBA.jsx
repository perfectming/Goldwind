import React from 'react';
import {connect} from 'react-redux';
import styles from './GroupKBAstyle.scss';
import PBAdata from './TimeSelect-data';
import TimeSelect from './TimeSelect.jsx';
import TableF from './TableF.jsx';
import TableS from './TableS.jsx';
import TableT from './TableT.jsx';


var actions = require('redux/actions');

let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    
	render() {
		return(
			<div className={styles.gbaBox}>
				<TimeSelect></TimeSelect>
				<div className={styles.content}>
					<div className={`${styles.area} ${styles.boxShadow}`}>
						<div className={styles.img}><a>logo</a></div>
						<TableF></TableF>
					</div>
					<div className={`${styles.wind} ${styles.boxShadow}`}>
						<div className={styles.img}><a>图片</a></div>
						<TableS></TableS>
					</div>
					<div className={`${styles.fan} ${styles.boxShadow}`}>
						<div className={styles.img}><a>图片</a></div>
						<TableT></TableT>
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
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);