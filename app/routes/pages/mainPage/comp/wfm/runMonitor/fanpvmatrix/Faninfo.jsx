import React from 'react';
import {connect} from 'react-redux';
import styles from './Faninfo.scss';
import Login from '../../../../../../../components/common/Loading.jsx';
import Title from '../../super/Title.jsx';
import Pwschart from './allinfo/Pwschart.jsx';
import Pwschart2 from './allinfo/Pwschart2.jsx';
var actions = require('redux/actions');
var $ = require('jquery');


			// function setData(rdata, time) {
   //              //var date = new Date();
   //              //date.setTime(time);
   //              // $(".info").text(time + ":" + JSON.stringify(rdata));
   //              // console.log(TY);
   //              // console.log(JSON.stringify(rdata));
   //              //$(".info").text(JSON.stringify(rdata));
   //          }


                //获取模型，适用于综合指标界面的初始化
                    //          此参数固定          “”文档中指定的
                // TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", "652113028", "WTDetail", setData, "Screen", 0);

// console.log(WNACTemp);
// console.log(fmvalue);
let times;
let Component = React.createClass({
	componentWillMount() {     // 页面加载前执行的方法
		let {value} = this.props;
        this.props.toinfopage(value);

    },
   componentWillUnmount() {
       clearInterval(times)  // 页面离开前执行的方法
    },
    componentDidMount() {
    	let {value} = this.props;
        this.props.init(value);	// 页面加载时执行的方法
    },
	render() {

		let {value,fanid,infofmodel,infofdata,tobujian,faninfobool = false,skinStyle} = this.props;
		// console.log(value)
	if(faninfobool){
		let val = value.Wtid;
		// console.log(infofmodel);
		let sp = infofmodel.Model.ens[val].sp;
		let PPVplace = infofmodel.Model.dis["WTGS.PPV.Ra.F32.A"].place;
		let PPVcoeff = infofmodel.Model.dis["WTGS.PPV.Ra.F32.A"].coeff;
		let PPVunit = infofmodel.Model.dis["WTGS.PPV.Ra.F32.A"].unit;
		let ACunit = infofmodel.Model.dis["WTGS.AC.Ra.F32.A"].unit;

		let Hzplace = infofmodel.Model.dis["WTGS.HZ.Ra.F32"].place;
		let Hzcoeff = infofmodel.Model.dis["WTGS.HZ.Ra.F32"].coeff;
		let Hzunit = infofmodel.Model.dis["WTGS.HZ.Ra.F32"].unit;

		let EgyAtplace = infofmodel.Model.dis["DayEgyAt"].place;
		let EgyAtcoeff = infofmodel.Model.dis["DayEgyAt"].coeff;
		let EgyAtunit = infofmodel.Model.dis["DayEgyAt"].unit;
		// if(infofmodel.Model == undefined){
		// 	alert('数据获取失败，请重新登录');
		// }else if(infofdata.ModelData == undefined){
		// 	alert('数据获取失败，请重新登录');
		// }
		// console.log(1,infofmodel);
		// console.log(2,infofdata);

		let fmvalue = infofdata.ModelData[val];
			// console.log(value.Wtid);
			// console.log(fmvalue["WROT.Spd.Ra.F32"]);
		// let qwer = "WTGS.PPV.Ra.F32.A";
		let Value = [];
		let  fdv = fmvalue["DevStatusQuery"];

		if(fdv.Value == undefined){
			fdv[Value] = Value
		}
		// console.log(3,fmvalue);
		let WTURTemp = Math.ceil(fmvalue["WTUR.Temp.Ra.F32"]);
		let WNACTemp = Math.ceil(fmvalue["WNAC.Temp.Ra.F32"]);
		let WGENTemp = Math.ceil(fmvalue["WGEN.Temp.Ra.F32.1"]);

		// console.log(WGENTemp);
		let WTGShz = Math.ceil(fmvalue["WTGS.HZ.Ra.F32"]);


		let WTSpd = Number(fmvalue["WTUR.WSpd.Ra.F32"]);
		let WTPwr = Math.ceil(fmvalue["WTUR.PwrAt.Ra.F32"]);
		let WROTSpd = Math.ceil(fmvalue["WROT.Spd.Ra.F32"]);
		let WGENSpd = Math.ceil(fmvalue["WGEN.Spd.Ra.F32"]);

			setTimeout(function(){
				if(WTGShz <=44){
        		WTGShz = 0;
	        	}else if(WTGShz >= 61){
	        		WTGShz = 180;
	        	}else{
	        		WTGShz = WTGShz*3;
	        	}

	        	$("#hzpoint").animate({ textIndent: 0 }, {
	        		duration: 1000,
					step: function(now,fx) {
	 				$(this).css('transform-origin','93% 50%');
					$(this).css('transform','rotate('+WTGShz+'deg)');
					},
	        	}, 1000 )


	        	if(WTSpd>=30){
	        		WTSpd = 30;
	        	}
	        	$("#wspoint").animate({ textIndent: 0 }, {
					step: function(now,fx) {
	 				$(this).css('transform-origin','93% 50%');
					$(this).css('transform','rotate('+WTSpd*6+'deg)');
					},
					duration:'slow'
	        	}, 2000);
	        	if(WTPwr>=1800){
	        		WTPwr = 180;
	        	}else if(WTPwr <= 0){
	        		WTPwr = 0;
	        	}
	        	$("#pwratpoint").animate({ textIndent: 0 }, {
					step: function(now,fx) {
	 				$(this).css('transform-origin','93% 50%');
					$(this).css('transform','rotate('+WTPwr/10+'deg)');
					},
	        	},1000)
	        	if(WROTSpd>=180){
	        		WROTSpd = 180;
	        	}
	        	$("#rspdpoint").animate({ textIndent: 0 }, {
					step: function(now,fx) {
	 				$(this).css('transform-origin','93% 50%');
					$(this).css('transform','rotate('+WROTSpd+'deg)');
					},
	        	},1000)
	        	if(WGENSpd>=30){
	        		WGENSpd = 30;
	        	}
	        	$("#gspdpoint").animate({ textIndent: 0 }, {
					step: function(now,fx) {
	 				$(this).css('transform-origin','93% 50%');
					$(this).css('transform','rotate('+WGENSpd*6+'deg)');
					},
	        	},1000)

	        	// $("#WGENtemp").animate({
	        	// 	height:WNACTemp+50,
	        	// 	duration: "slow",
	        	// }, 1000 )
				if(WTURTemp>=150){
	        		WTURTemp = 150;
	        	}

	        	if(WNACTemp>=150){
	        		WNACTemp = 150;
	        	}
	        	if(WGENTemp>=150){
	        		WGENTemp = 150;
	        	}
				$("#WTURTemp").animate({
	        		height:(WTURTemp+32)*3.2,
	        		duration: "slow",
	        	}, 1000 )
				$("#WNACTemp").animate({
	        		height:WNACTemp+100,
	        		duration: "slow",
	        	}, 1000 )
	        	$("#WGENTemp").animate({
	        		height:WGENTemp*0.7+100,
	        		duration: "slow",
	        	}, 1000 )

	        }, )


		let x;
		let code = value.WTStateCode;
		switch(code)
			{
				case "DisComForPre":
					x = "离线";
					break;
				case "DisComForPlc":
					x = "离线";
					break;
				case "Unknown":
					x = "离线";
					break;
				case "Online":
					x = "正常发电";
					break;
				case "LimitPow":
					x = "限功率";
					break;
				case "Alarm":
					x = "告警";
					break;
				case "Fault":
					x = "故障停机";
					break;
				case "Offline":
					x = "待机";
					break;
				case "ProtoectStop":
					x = "待机";
					break;
				case "LimitPowStop":
					x = "待机";
					break;
				default:
					x = "暂无状态";
					break;
			}
		// console.log(code);
		// this.props.init(value,fanid,infofmodel,infofdata);
		return (
			<div className={skinStyle==1?styles.bodyBoxBlue:skinStyle==2?styles.bodyBoxWhite:styles.bodyBox}>
				<div className={styles.fanidbox}>
					<div>风机名称：{value.Wtname}</div>
					<div>风机型号：{sp}</div>
					<div>运行状态：{x}</div>
					<div>首次并网日期：</div>
				</div>
				<div className={`${styles.infoBox} ${styles.infofL}`}>
					<div className={`${styles.infoBox1} ${styles.infofL}`}>
						<Title title={['Grid frequency参数']}></Title>
						<div className={`${styles.hzBoxt} ${styles.infofL11}`}>
							<div className={`${styles.hzBoxtA} ${styles.hzBoxtall}`}>
								<div>A相</div>
								<div><span>{(Number(fmvalue["WTGS.PPV.Ra.F32.A"])*PPVcoeff).toFixed(PPVplace)}</span><span className={styles.hzunit}>{PPVunit}</span></div>
								<div><span>{(Number(fmvalue["WTGS.AC.Ra.F32.A"])*PPVcoeff).toFixed(PPVplace)}</span><span className={styles.hzunit}>{ACunit}</span></div>
							</div>
							<div className={`${styles.hzBoxtB} ${styles.hzBoxtall}`}>
								<div>B相</div>
								<div><span>{(Number(fmvalue["WTGS.PPV.Ra.F32.B"])*PPVcoeff).toFixed(PPVplace)}</span><span className={styles.hzunit}>{PPVunit}</span></div>
								<div><span>{(Number(fmvalue["WTGS.AC.Ra.F32.B"])*PPVcoeff).toFixed(PPVplace)}</span><span className={styles.hzunit}>{ACunit}</span></div>
							</div>
							<div className={`${styles.hzBoxtC} ${styles.hzBoxtall}`}>
								<div>C相</div>
								<div><span>{(Number(fmvalue["WTGS.PPV.Ra.F32.C"])*PPVcoeff).toFixed(PPVplace)}</span><span className={styles.hzunit}>{PPVunit}</span></div>
								<div><span>{(Number(fmvalue["WTGS.AC.Ra.F32.C"])*PPVcoeff).toFixed(PPVplace)}</span><span className={styles.hzunit}>{ACunit}</span></div>
							</div>

						</div>
						<div className={`${styles.hzBoxb} ${styles.infofL111111}`}>
							<div className={`${styles.Boxbdial} ${styles.infofL111111}`}>
								<div id="hzpoint" className={styles.hzBoxbdial}></div>
								<p>电网频率</p>
								<div className={styles.hz}><span>{(Number(fmvalue["WTGS.HZ.Ra.F32"])*Hzcoeff).toFixed(Hzplace)}</span><span>{Hzunit}</span></div>
							</div>
							<div className={`${styles.hzfactor} ${styles.infofL111111}`}>
								<div>功率因数</div>
								<div>{(Number(fmvalue["WTGS.PF.Ra.F32"])*Hzcoeff).toFixed(Hzplace)}</div>

							</div>
						</div>
					</div>
					<div className={`${styles.infoBox2} ${styles.infofL}`}>
						<Title title={['Impeller and enerator参数']}></Title>
						<div id="wsBox" className={`${styles.wsbox1} ${styles.dialbox}`}>
							<div className={styles.boxtitle}><p>风速</p></div>
							<div className={styles.wsdialbox}>
								<div id="wspoint" className={styles.wsipbox}>

								</div>
							</div>
							<div className={styles.pwratbox}><span>{Number(fmvalue["WTUR.WSpd.Ra.F32"]).toFixed(2)}</span><span>m/s</span></div>
						</div>
						<div className={`${styles.wsbox2} ${styles.dialbox}`}>
							<div className={styles.boxtitle}><p>有功功率</p></div>
							<div className={styles.wsdialbox}>
								<div className={styles.cardnum}>x100</div>
								<div id="pwratpoint" className={styles.wsipbox}>

								</div>
							</div>
							<div className={styles.pwratbox}><span>{Number(fmvalue["WTUR.PwrAt.Ra.F32"]).toFixed(2)}</span><span>kW</span></div>
						</div>
						<div className={`${styles.wsbox3} ${styles.dialbox}`}>
							<div className={styles.boxtitle}><p>叶轮转速</p></div>
							<div className={styles.wsdialbox}>
								<div id="rspdpoint" className={styles.wsipbox}>

								</div>
							</div>
							<div className={styles.pwratbox}><span>{fmvalue["WROT.Spd.Ra.F32"] == undefined ? '--' : (Number(fmvalue["WROT.Spd.Ra.F32"]).toFixed(2))}</span><span>rpm</span></div>
						</div>
						<div className={`${styles.wsbox4} ${styles.dialbox}`}>
							<div className={styles.boxtitle}><p>发电机转速</p></div>
							<div className={styles.wsdialbox}>

								<div id="gspdpoint" className={styles.wsipbox}>

								</div>
							</div>
							<div className={styles.pwratbox}><span>{Number(fmvalue["WGEN.Spd.Ra.F32"]).toFixed(2)}</span><span>rpm</span></div>
						</div>

					</div>
					<div className={`${styles.infoBox3} ${styles.infofL}`}>
						<Title title={['风机温度']}></Title>
						<div className={`${styles.WTURTemp} ${styles.fanTemp}`}>
							<div><span>{Math.ceil(fmvalue["WTUR.Temp.Ra.F32"])}</span><span>℃</span></div>
							<div className={styles.WTURTempbox}>
									<div id="WTURTemp" className={(WTURTemp >= 150) ? styles.high : styles.nomal}></div>
									<div className={(WTURTemp >= 150) ? styles.high : styles.nomal}></div>
							</div>
							<div>环境</div>
						</div>
						<div className={`${styles.WNACTemp} ${styles.fanTemp}`}>
							<div><span>{Math.ceil(fmvalue["WNAC.Temp.Ra.F32"])}</span><span>℃</span></div>
							<div className={styles.WNACTempbox}>
									<div id="WNACTemp" className={(WNACTemp >= 150) ? styles.high : styles.nomal}></div>
									<div className={(WNACTemp >= 150) ? styles.high : styles.nomal}></div>
							</div>
							<div>机舱</div>
						</div>

						
						<div className={`${styles.WGENTemp} ${styles.fanTemp}`}>
							<div><span>{Math.ceil(fmvalue["WGEN.Temp.Ra.F32.1"])}</span><span>℃</span></div>
							<div className={styles.WGENTempbox}>
									<div id="WGENTemp" className={(WGENTemp >= 150) ? styles.high : styles.nomal}></div>
									<div className={(WGENTemp >= 150) ? styles.high : styles.nomal}></div>
							</div>
							<div>发电机</div>
						</div>
					</div>
					<div className={`${styles.infoBox4} ${styles.infofL}`}>
						<Title title={['当日功率与风速实时曲线']}></Title>
						<div className={`${styles.box4Cahrt} ${styles.infofL000}`}>
							<Pwschart className={styles.box4Cahrt1} data = {infofdata} value = {val} lettercolor={skinStyle==2?"#555555":"#FFFFFF"}></Pwschart>
						</div>
					</div>
					<div className={`${styles.infoBox5} ${styles.infofL}`}>
						<Title title={['风功率曲线']}></Title>
						<div className={`${styles.box5Cahrt} ${styles.infofL000}`}>
							<Pwschart2 className={styles.box4Cahrt1} data = {infofdata} value = {val} lettercolor={skinStyle==2?"#555555":"#FFFFFF"}></Pwschart2>
						</div>
					</div>
					<div className={`${styles.infoBox6} ${styles.infofL}`}>
						<Title></Title>

						<div className={styles.titlebox}><span>状态字</span><span>风机状态</span><span>状态时长(分钟)</span></div>
						<div className={styles.statusquery}>
							{

								fdv.Value.map((value, key)=>{
									return (
											<div key={key} className={`${key%2===0 ? styles.nomalbox : styles.bgbox} ${styles.statusquerybox}`}>
												<span>{value.rectime}</span>
												<span>{value.wtstatus}</span>
												<span>{value.timelength}</span>
											</div>
										)
								})
							}
						</div>
					</div>
					<div className={`${styles.infoBox7} ${styles.infofL}`}>
						<Title></Title>
						<div className={styles.titlebox}><span>风机报警时间</span><span>报警描述</span><span>等级</span><span>报警类型</span><span>报警码</span></div>
						<div className={styles.statusquery}>
							{
								fmvalue.DevStatusQuery.Value!=undefined && fmvalue.DevStatusQuery.Value.map((value, key)=>{
									return (
											<div key={key} className={`${key%2===0 ? styles.nomalbox : styles.bgbox} ${styles.statusquerybox}`}>
												<span>{value.StatusDate}</span>
												<span>{value.StatusDescr}</span>
												<span>{value.StatusTime}</span>
												<span>{value.StatusTime}</span>
												<span>{value.StatusTime}</span>
											</div>
										)
								})
							}
						</div>
					</div>
				</div>
				<div className={`${styles.fanrightbox} ${styles.infofL}`}>
					<Title title={['状态统计']}></Title>
					<div className={styles.fanaction}>
						<div className={styles.parts} onClick = {()=> tobujian(val)}></div>
						<div className={styles.actionbox}>
							<div>启动</div>
							<div>停机</div>
							<div>复位</div>
							<div>测试</div>
						</div>
					</div>
					<div className={styles.action1box}>
						<div className={styles.fandatabox}>
							<span>日发电量</span>
							<span className={styles.numbox}><span>{(Number(fmvalue["DayEgyAt"])*EgyAtcoeff).toFixed(EgyAtplace)}</span><span>{EgyAtunit}</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>月发电量</span>
							<span className={styles.numbox}><span>{(Number(fmvalue["MonthEgyAt"])*EgyAtcoeff).toFixed(EgyAtplace)}</span><span>{EgyAtunit}</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>年发电量</span>
							<span className={styles.numbox}><span>{(Number(fmvalue["YearEgyAt"])*EgyAtcoeff).toFixed(EgyAtplace)}</span><span>{EgyAtunit}</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>累计发电量</span>
							<span className={styles.numbox}><span>{(Number(fmvalue["TotalEgyAt"])*EgyAtcoeff).toFixed(EgyAtplace)}</span><span>{EgyAtunit}</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>无功功率</span>
							<span className={styles.numbox}><span>{Number(fmvalue["WTUR.PwrReact.Ra.F32"]).toFixed(2)}</span><span>kVar</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>偏航位置</span>
							<span className={styles.numbox}><span>{Number(fmvalue["WYAW.Posi.Ra.F32"]).toFixed(2)}</span><span>°</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>对风角度</span>
							<span className={styles.numbox}><span>{Number(fmvalue["WYAW.Wdir.Ra.F32"]).toFixed(2)}</span><span>°</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>1号变桨桨距角</span>
							<span className={styles.numbox}><span>{Number(fmvalue["WTPS.Ang.Ra.F32.blade1"]).toFixed(2)}</span><span>°</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>2号变桨桨距角</span>
							<span className={styles.numbox}><span>{Number(fmvalue["WTPS.Ang.Ra.F32.blade2"]).toFixed(2)}</span><span>°</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>3号变桨桨距角</span>
							<span className={styles.numbox}><span>{Number(fmvalue["WTPS.Ang.Ra.F32.blade3"]).toFixed(2)}</span><span>°</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>1号变桨柜体温度</span>
							<span className={styles.numbox}><span>{Number(fmvalue["WTPS.Temp.Ra.F32.Pbox1"]).toFixed(2)}</span><span>℃</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>2号变桨柜体温度</span>
							<span className={styles.numbox}><span>{Number(fmvalue["WTPS.Temp.Ra.F32.Pbox2"]).toFixed(2)}</span><span>℃</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>3号变桨柜体温度</span>
							<span className={styles.numbox}><span>{Number(fmvalue["WTPS.Temp.Ra.F32.Pbox3"]).toFixed(2)}</span><span>℃</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>1号变桨逆变器温度</span>
							<span className={styles.numbox}><span>{Number(fmvalue["WTPS.Temp.Ra.F32.inverter3"]).toFixed(2)}</span><span>℃</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>2号变桨逆变器温度</span>
							<span className={styles.numbox}><span>{Number(fmvalue["WTPS.Temp.Ra.F32.inverter3"]).toFixed(2)}</span><span>℃</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>3号变桨逆变器温度</span>
							<span className={styles.numbox}><span>{Number(fmvalue["WTPS.Temp.Ra.F32.inverter3"]).toFixed(2)}</span><span>℃</span></span>
						</div>
					</div>
				</div>
			</div>
		)
	}else{
        return (
            <Login></Login>
        )
    }
	}
});




const mapStateToProps = (state) => {
    return {
        value : state.vars.value,
        fanid : state.vars.valueid,
        infofmodel : state.vars.infofmodel,
        infofdata : state.vars.infofdata,
        faninfobool : state.vars.faninfobool,
        skinStyle: state.vars.skinStyle
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	toinfopage: (value,faninfobool) => {
                    TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", value.Wtid, "WTDetail", setData3, "Screen", 0);
                    function setData3(infofModel){
                    	// console.log(1,infofModel);
                    	if(!infofModel.Model){
                    		TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", value.Wtid, "WTDetail", setData3, "Screen", 0);
                    	}else{
                    		dispatch(actions.setVars('infofmodel', infofModel));
	                        // console.log(0,infofModel);
                            // console.log(1,infofModel);
	                                TY.getRtData("WTDetail", value.Wtid, setData5)
	                                function setData5(infofData){
	                                    // console.log(11,infofData);
	                                    // console.log(value.Wtid)
	                                    // console.log(infofData.ModelData[value.Wtid]["WTUR.Temp.Ra.F32"])
	                                    let d = infofData.ModelData[value.Wtid];
	                                    if(d == undefined || d["DevCurDayPowerCurve"] == undefined || d["CurDayWindSpeedCurve_Device"] == undefined || d["DevStatusQuery"] == undefined){
	                                    	//console.log(value,setData5)
	                                    	TY.getRtData("WTDetail", value.Wtid, setData5)
	                                    }else{
	                                    	dispatch(actions.setVars('infofdata', infofData));
		                                        dispatch(actions.setVars('faninfobool', true));
		                                    
	                                    }
	                                    
	                                }
                    	}
                        



                    }
                     // }, 3000)

        	// console.log(value)


        },


        init: (value) => {
        	times = setInterval(function(){
                function setData4(rdata){
	            	dispatch(actions.setVars('infofdata', rdata));
	            	// console.log(1,rdata);
                }
                TY.getRtData("WTDetail", value.Wtid, setData4)        
           	}, 3000) 
//   $.ajax({
//    type: 'post',    
//    url:'http://54.223.200.134/System/data.aspx?mdid=Model&ScId=2015032011&EnId=654208001&EnKey=Screen&PkId=&ModelKey=6C5002D3-1566-414a-8834-5077940C78E1&dhs=UISys&AspxAutoDetectCookieSupport=1',    
//    data:{name:'xuyuanming'},    
//    dataType:"json",

//    timeout:3000,    

//    success:function(data){    
//        console.log(data.data);    
//    },    

// });
				// function jsonp(data){console.log(data)};
// 				$.jsonp({  
//    url:'http://10.9.0.9:8081/gwbi/elec/getPower',  
//    data:{rel:13},  
//    callbackParameter:"callback",  
//    timeout:3000,  
//    dataFilter:function(json){  
//     console.log("jsonp.filter:"+json.name);  
//     json.name = "测试123435";  
// return json;  
// },  
//    success:function(json,textStatus,xOptions){  
//        console.log("jsonp.success:"+json.name);  
//    },  
//    error:function(xOptions,textStatus){  
//     console.log("jsonp.error:"+textStatus+", rel="+xOptions.data.rel);  
//    }  
// });  




        },
        tobujian:(val)=>{
        	dispatch(actions.setVars('fan_page', 'fanpart'));
        	dispatch(actions.setVars('Wtid', val));
        	dispatch(actions.setVars('befor_page3', 'faninfo'));
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
