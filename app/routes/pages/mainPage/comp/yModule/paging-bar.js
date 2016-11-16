 import React, { Component } from 'react'
   import Immutable from 'immutable'
   import _ from 'lodash'
  /* ================================================================================
  6  * React GrxPagingBar 通用分页组件
  7  * author: 天真的好蓝啊
  8  * ================================================================================ */
   class GrxPagingBar extends Component {
      render() {
        var pagingOptions = {
            showNumber: 5,
            firstText: "<<",
          firstTitle: "第一页",
            prevText: "<",
             prevTitle: "上一页",
          beforeTitle: "前",
              afterTitle: "后",
             pagingTitle: "页",
            nextText: ">",
             nextTitle: "下一页",
             lastText: ">>",
             lastTitle: "最后一页",
            classNames: "grx-pagingbar pull-right",
         }
         
         $.extend(pagingOptions, this.props.pagingOptions)
  
          return (
              <div className={pagingOptions.classNames} >
                  <GrxPagingFirst {...pagingOptions} {...this.props} />
                  <GrxPagingBeforeAfter isBefore="true" {...pagingOptions} {...this.props} />
                  <GrxPagingList {...pagingOptions} {...this.props} />
                  <GrxPagingBeforeAfter isBefore="false" {...pagingOptions} {...this.props} />
                  <GrxPagingLast {...pagingOptions} {...this.props} />
                  <GrxPagingInfo {...this.props} />
              </div>
          )
      }
  }
  
  /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 43  * 分页条头组件
 44  * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
  class GrxPagingFirst extends Component {
      render() {
         var ids = []
          let paging = this.props.items.get('Paging')
          let current = paging.get('PagingIndex')
          let pagingIndex = current - 1
  
         if(paging.get('PagingIndex') != 1){
              ids.push(1)
          }
  
        let html = ids.map(
             (v,i) => 
            <span>
                <GrxPagingNumber title={this.props.firstTitle} text={this.props.firstText} pagingIndex={1} {...this.props}/>
                 <GrxPagingNumber title={this.props.prevTitle} text={this.props.prevText} pagingIndex={pagingIndex} {...this.props}/>
            </span>
          )
         
          return (
              <span className="grx-pagingbar-fl">
                 {html}
             </span>
          )
      }
  }

  /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 73  * 分页条前后页组件
 74  * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
 class GrxPagingBeforeAfter extends Component {
     render() {
          var ids = []
          let isBefore = this.props.isBefore == "true" ? true : false
          let paging = this.props.items.get('Paging')
          let pagingCount = paging.get('PagingCount')
          let current = paging.get('PagingIndex')
          
         let pagingIndex = isBefore ? current - this.props.showNumber : current + this.props.showNumber
          let title = (isBefore ? this.props.beforeTitle : this.props.afterTitle) + (this.props.showNumber + 1) + this.props.pagingTitle
         if(isBefore && current > this.props.showNumber + 1){
             ids.push(1)
          }else if(!isBefore && current < pagingCount - this.props.showNumber){
             ids.push(1)
          }
  
         var html = ids.map(
             (v,i) => <a href="###" onClick={this.props.actions.pagingAction.bind(this, pagingIndex)} title={title}>..</a>
         )
 
          return (
             <span>
                 {html}
             </span>
         )
     }
 }
 /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
105  * 分页条页码列表组件
106  * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
 class GrxPagingList extends Component {
     render(){
         let paging = this.props.items.get('Paging')
        let count = paging.get('PagingCount')
         let current = paging.get('PagingIndex')
         let start = current - this.props.showNumber
         let end = current + this.props.showNumber
 
         var pageIndexs = new Array();
         for(var i = start; i < end; i ++) {
             if( i == current){
                 pageIndexs.push(i)
             }else if(i > 0 & i <= count) {
                 pageIndexs.push(i)
             }
        }
 
         var pagingList = pageIndexs.map(
             (v,i) => 
             current == v ? 
             count > 1 ? <span className="grx-pagingbar-current">{v}</span> : ""
             : 
            <GrxPagingNumber pagingIndex={v} {...this.props} />
         )
 
         return(
             <span>
                 {pagingList}
             </span>
         )
     }
 }
 
 /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
141  * 分页条尾部组件
142  * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
 class GrxPagingLast extends Component {
     render() {
         var ids = []
         let paging = this.props.items.get('Paging')
         let pagingCount = paging.get('PagingCount')
         let current = paging.get('PagingIndex')
        let pagingIndex = current + 1
 
         if(paging.get('PagingIndex') < paging.get('PagingCount')){
             ids.push(1)
         }
 
         let html = ids.map(
             (v,i) => 
             <span>
                 <GrxPagingNumber title={this.props.nextTitle} text={this.props.nextText} pagingIndex={pagingIndex} {...this.props}/>
                 <GrxPagingNumber title={this.props.lastTitle} text={this.props.lastText} pagingIndex={pagingCount} {...this.props} />
             </span>
         )
 
         return (
             <span className="grx-pagingbar-fl">
                 {html}
             </span>
         )
     }
 }
 
 /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
172  * 分页页码组件
173  * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
 class GrxPagingNumber extends Component {
     render(){
         let pagingIndex = this.props.pagingIndex
         let title = "第"+ pagingIndex + this.props.pagingTitle
        let text = pagingIndex
 
         if(this.props.title){
             title = this.props.title
         }
 
         if(this.props.text){
             text = this.props.text
         }
         return(
             <a href="###" onClick={this.props.actions.pagingAction.bind(this, pagingIndex)} title={title}> {text} </a>
         )
     }
 }
 
 /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
195  * 分页条信息组件
196  * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
 class GrxPagingInfo extends Component {
     render() {
         let paging = this.props.items.get('Paging')
         let pagingIndex = paging.get('PagingIndex')
         let pagingCount = paging.get('PagingCount')
         let totalRecord = paging.get('TotalRecord')
         return (
             <span className="grx-pagingbar-info">第{pagingIndex}/{pagingCount}页,共{totalRecord}条数据</span>
        )
     }
 }
 
 /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
210  * 从此模块导出分页条组件
211  * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
 export default GrxPagingBar