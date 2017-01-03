import React from 'react';
import {connect} from 'react-redux';
var $ =require('jquery');
var actions = require('redux/actions');
import add from '../../../img/comp/jsc.png';


let i=1;     
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
   

    render() {
         let {userMessage,jaj,arr=[0]} = this.props;
         console.log(arr)
            
        return (
            <div style={{color:'#fff',fontSize:'22px'}} >
               功能：暂不开发656556
               <button onClick={()=>jaj(userMessage)}>获取数据</button>
               {
                arr.map((value,key)=>{
                    return(
                    <span key={key}>
                     <img src={require('../../../img/comp/jsc.png')}/>
                     <b>{value}</b>
                     </span>
                     )
                })
               }
              
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        userMessage:state.objs.userMessage,
        arr:state.lists.arr
 
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

        init: () => {
          dispatch(actions.setLists('arr', [0]));
          
        },
        jaj:(userMessage)=>{ 
            // if(i<10){
            //    dispatch(actions.appendLists('arr', i));
            //    i++; 
            // }else{
            //      dispatch(actions.removeItem('arr', i));
            //      i--;
            // }
            dispatch(actions.updateListItem('arr', i));
            i++;


            
        // console.log(userMessage.data.tlist[0].smallpicture)  
        
        
        }
       
    
       
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
