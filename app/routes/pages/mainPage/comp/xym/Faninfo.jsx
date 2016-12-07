import React from 'react';
import {connect} from 'react-redux';
import styles from './Faninfo.scss';
import Header from '../linjinjin/header';
import Title from '../super/Title.jsx';
import Pwschart from './allinfo/Pwschart.jsx';
import Pwschart2 from './allinfo/Pwschart2.jsx';
var actions = require('redux/actions');
var $ = require('jquery');

let modelvalue = require('../../../../../../config/WTDetailData.js');

let fmvalue = modelvalue.ModelData[652113028];
	// console.log(value.Wtid);
// let qwer = "WTGS.PPV.Ra.F32.A";
// console.log(fmvalue["WTUR.WSpd.Ra.F32"]);
let WTURTemp = Math.ceil(fmvalue["WTUR.Temp.Ra.F32"]);
let WNACTemp = Math.ceil(fmvalue["WNAC.Temp.Ra.F32"]);
let WGENTemp = Math.ceil(fmvalue["WGEN.Temp.Ra.F32.1"]);

// console.log(WGENTemp);
let WTGShz = Math.ceil(fmvalue["WTGS.HZ.Ra.F32"]);


let WTSpd = Number(fmvalue["WTUR.WSpd.Ra.F32"]);
let WTPwr = Math.ceil(fmvalue["WTUR.PwrAt.Ra.F32"]);
let WROTSpd = Math.ceil(fmvalue["WROT.Spd.Ra.F32"]);
let WGENSpd = Math.ceil(fmvalue["WGEN.Spd.Ra.F32"]);
			function setData(rdata, time) {
                //var date = new Date();
                //date.setTime(time);
                // $(".info").text(time + ":" + JSON.stringify(rdata));
                // console.log(TY);
                // console.log(JSON.stringify(rdata));
                //$(".info").text(JSON.stringify(rdata));
            }

          
                //获取模型，适用于综合指标界面的初始化
                    //          此参数固定          “”文档中指定的
                // TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", "652113028", "WTDetail", setData, "Screen", 0);

// console.log(WNACTemp);
// console.log(fmvalue);
let Component = React.createClass({
	componentDidMount() {
		this.props.init();
	},

	render() {
		let {value,fanid,tobujian} = this.props;
		let val = value.Wtid;

		// console.log(fmvalue.StatusCode);
		function setData(rdata, time) {
                //var date = new Date();
                //date.setTime(time);
                // $(".info").text(time + ":" + JSON.stringify(rdata));
                // console.log(TY);
                var data = JSON.stringify(rdata);
                // console.log(data);
                
                //$(".info").text(JSON.stringify(rdata));
            }
           function setData1(rdata, time) {
                //var date = new Date();
                //date.setTime(time);
                // $(".info").text(time + ":" + JSON.stringify(rdata));
                // console.log(TY);
                // var data = JSON.stringify(rdata);
                // console.log(rdata.ModelData);
                
                //$(".info").text(JSON.stringify(rdata));
            }
          
                //获取模型，适用于综合指标界面的初始化
                    //          此参数固定          “”文档中指定的
                // TY.getModel("6C5002D3-1566-414a-8834-5077940C78E1", val, "WTDetail", setData, "Screen", 0);

                // TY.getRtData("WTDetail", val, setData1);
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
					x = "正常发电";
					break;
				case "Alarm":
					x = "正常发电";
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
					x = "维护";
					break;
			}
		// console.log(code);
		return (
			<div className={styles.bodyBox}>
				<div className={styles.fanidbox}>
					<div>风机名称：{value.Wtname}</div>
					<div>风机型号：{value.Wtid}</div>
					<div>运行状态：{x}</div>
					<div>首次并网日期：{value.Wtname}</div>
				</div>
				<div className={`${styles.infoBox} ${styles.infofL}`}>
					<div className={`${styles.infoBox1} ${styles.infofL}`}>
						<Title></Title>
						<div className={`${styles.hzBoxt} ${styles.infofL11}`}>
							<div className={`${styles.hzBoxtA} ${styles.hzBoxtall}`}>
								<div>A相</div>
								<div><span>{Number(fmvalue["WTGS.PPV.Ra.F32.A"]).toFixed(2)}</span><span className={styles.hzunit}>V</span></div>
								<div><span>{Number(fmvalue["WTGS.AC.Ra.F32.A"]).toFixed(2)}</span><span className={styles.hzunit}>A</span></div>
							</div>
							<div className={`${styles.hzBoxtB} ${styles.hzBoxtall}`}>
								<div>B相</div>
								<div><span>{Number(fmvalue["WTGS.PPV.Ra.F32.B"]).toFixed(2)}</span><span className={styles.hzunit}>V</span></div>
								<div><span>{Number(fmvalue["WTGS.AC.Ra.F32.B"]).toFixed(2)}</span><span className={styles.hzunit}>A</span></div>
							</div>
							<div className={`${styles.hzBoxtC} ${styles.hzBoxtall}`}>
								<div>C相</div>
								<div><span>{Number(fmvalue["WTGS.PPV.Ra.F32.C"]).toFixed(2)}</span><span className={styles.hzunit}>V</span></div>
								<div><span>{Number(fmvalue["WTGS.AC.Ra.F32.C"]).toFixed(2)}</span><span className={styles.hzunit}>A</span></div>
							</div>
							
						</div>
						<div className={`${styles.hzBoxb} ${styles.infofL111111}`}>
							<div className={`${styles.Boxbdial} ${styles.infofL111111}`}>
								<div id="hzpoint" className={styles.hzBoxbdial}></div>
								<p>电网频率</p>
								<div className={styles.hz}><span>{Math.ceil(fmvalue["WTGS.HZ.Ra.F32"])}</span><span>Hz</span></div>
							</div>
							<div className={`${styles.hzfactor} ${styles.infofL111111}`}>
								<div>功率因数</div>
								<div>{Number(fmvalue["WTGS.PF.Ra.F32"]).toFixed(1)}</div>
								
							</div>
						</div>	
					</div>
					<div className={`${styles.infoBox2} ${styles.infofL}`}>
						<Title></Title>
						<div id="wsBox" className={`${styles.wsbox1} ${styles.dialbox}`}>
							<div className={styles.boxtitle}><p>风速</p></div>
							<div className={styles.wsdialbox}>
								<div id="wspoint" className={styles.wsipbox}>

								</div>
							</div>
							<div className={styles.pwratbox}><span>{Number(fmvalue["WTUR.WSpd.Ra.F32"]).toFixed(1)}</span><span>m/s</span></div>
						</div>
						<div className={`${styles.wsbox2} ${styles.dialbox}`}>
							<div className={styles.boxtitle}><p>有功功率</p></div>
							<div className={styles.wsdialbox}>
								<div className={styles.cardnum}>x100</div>
								<div id="pwratpoint" className={styles.wsipbox}>
								
								</div>
							</div>
							<div className={styles.pwratbox}><span>{Math.ceil(fmvalue["WTUR.PwrAt.Ra.F32"])}</span><span>kW</span></div>
						</div>
						<div className={`${styles.wsbox3} ${styles.dialbox}`}>
							<div className={styles.boxtitle}><p>叶轮转速</p></div>
							<div className={styles.wsdialbox}>
								<div id="rspdpoint" className={styles.wsipbox}>

								</div>
							</div>
							<div className={styles.pwratbox}><span>{Math.ceil(fmvalue["WROT.Spd.Ra.F32"])}</span><span>rpm</span></div>
						</div>
						<div className={`${styles.wsbox4} ${styles.dialbox}`}>
							<div className={styles.boxtitle}><p>发电机转速</p></div>
							<div className={styles.wsdialbox}>
								
								<div id="gspdpoint" className={styles.wsipbox}>

								</div>
							</div>
							<div className={styles.pwratbox}><span>{Math.ceil(fmvalue["WGEN.Spd.Ra.F32"])}</span><span>rpm</span></div>
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

						<div className={`${styles.WTURTemp} ${styles.fanTemp}`}>
							<div><span>0</span><span>℃</span></div>
							<div className={styles.WTURTempbox}>
									<div></div>
									<div></div>
							</div>
							<div>齿轮箱</div>
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
							<Pwschart className={styles.box4Cahrt1}></Pwschart>
						</div>
					</div>
					<div className={`${styles.infoBox5} ${styles.infofL}`}>
						<Title title={['风功率曲线']}></Title>
						<div className={`${styles.box5Cahrt} ${styles.infofL000}`}>
							<Pwschart2 className={styles.box4Cahrt1}></Pwschart2>
						</div>
					</div>
					<div className={`${styles.infoBox6} ${styles.infofL}`}>
						<Title></Title>
						
						<div className={styles.titlebox}><span>风机描述</span><span>风机状态</span><span>状态时长(min)</span></div>
						<div className={styles.statusquery}>
							{
								fmvalue.DevStatusQuery.Value.map((value, key)=>{
									return (
											<div key={key} className={`${key%2===0 ? styles.nomalbox : styles.bgbox} ${styles.statusquerybox}`}>
												<span>{(value.StatusDate).slice(0,-4)}</span>
												<span>{value.StatusDescr}</span>
												<span>{value.StatusTime}</span>
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
								fmvalue.DevStatusQuery.Value.map((value, key)=>{
									return (
											<div key={key} className={`${key%2===0 ? styles.nomalbox : styles.bgbox} ${styles.statusquerybox}`}>
												<span>{(value.StatusDate).slice(0,-4)}</span>
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
					<div className={`${styles.fanaction} ${styles.infofL11111111}`} onClick = {()=> tobujian()}>
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
							<span className={styles.numbox}><span>{Math.ceil(fmvalue["DayEgyAt"])}</span><span>万kWh</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>月发电量</span>
							<span className={styles.numbox}><span>{Math.ceil(fmvalue["MonthEgyAt"])}</span><span>万kWh</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>年发电量</span>
							<span className={styles.numbox}><span>{Math.ceil(fmvalue["YearEgyAt"])}</span><span>万kWh</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>累计发电量</span>
							<span className={styles.numbox}><span>{Math.ceil(fmvalue["TotalEgyAt"])}</span><span>万kWh</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>无功功率</span>
							<span className={styles.numbox}><span>{Number(fmvalue["WTUR.PwrReact.Ra.F32"]).toFixed(1)}</span><span>kVar</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>偏航位置</span>
							<span className={styles.numbox}><span>{Number(fmvalue["WYAW.Posi.Ra.F32"]).toFixed(1)}</span><span>°</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>对风角度</span>
							<span className={styles.numbox}><span>{Number(fmvalue["WYAW.Wdir.Ra.F32"]).toFixed(1)}</span><span>°</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>叶片1角度</span>
							<span className={styles.numbox}><span>{Number(fmvalue["WTPS.Ang.Ra.F32.blade1"]).toFixed(1)}</span><span>°</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>叶片2角度</span>
							<span className={styles.numbox}><span>{Number(fmvalue["WTPS.Ang.Ra.F32.blade2"]).toFixed(1)}</span><span>°</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>叶片3角度</span>
							<span className={styles.numbox}><span>{Number(fmvalue["WTPS.Ang.Ra.F32.blade3"]).toFixed(1)}</span><span>°</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>1号变桨柜体温度</span>
							<span className={styles.numbox}><span>{Number(fmvalue["WTPS.Temp.Ra.F32.Pbox1"]).toFixed(1)}</span><span>℃</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>2号变桨柜体温度</span>
							<span className={styles.numbox}><span>{Number(fmvalue["WTPS.Temp.Ra.F32.Pbox2"]).toFixed(1)}</span><span>℃</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>3号变桨柜体温度</span>
							<span className={styles.numbox}><span>{Number(fmvalue["WTPS.Temp.Ra.F32.Pbox3"]).toFixed(1)}</span><span>℃</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>1号变桨逆变器温度</span>
							<span className={styles.numbox}><span>{Number(fmvalue["WTPS.Temp.Ra.F32.inverter3"]).toFixed(1)}</span><span>℃</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>2号变桨逆变器温度</span>
							<span className={styles.numbox}><span>{Number(fmvalue["WTPS.Temp.Ra.F32.inverter3"]).toFixed(1)}</span><span>℃</span></span>
						</div>
						<div className={styles.fandatabox}>
							<span>3号变桨逆变器温度</span>
							<span className={styles.numbox}><span>{Number(fmvalue["WTPS.Temp.Ra.F32.inverter3"]).toFixed(1)}</span><span>℃</span></span>
						</div>	
					</div>
				</div>
			</div>
		)
	}
});




const mapStateToProps = (state) => {
    return {
        value : state.vars.value,
        fanid : state.vars.valueid,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        	if(WTGShz <=45){
        		WTGShz = 45;
        	}else if(WTGShz >= 56){
        		WTGShz = (56-45)*15;
        	}else{
        		WTGShz = (WTGShz-45)*15;
        	}
        	$("#hzpoint").animate({ textIndent: 0 }, { 
        		duration: 1000,
				step: function(now,fx) {
 				$(this).css('transform-origin','90% 50%'); 
				$(this).css('transform','rotate('+WTGShz+'deg)'); 
				},
        	}, 1000 )
        	
        	var WTSpd = 45;
        	if(WTSpd>=30){
        		WTSpd = 30;
        	}
        	$("#wspoint").animate({ textIndent: 0 }, { 
				step: function(now,fx) {
 				$(this).css('transform-origin','90% 50%'); 
				$(this).css('transform','rotate('+WTSpd*6+'deg)'); 
				}, 
				duration:'slow'
        	}, 2000);
        	if(WTPwr>=180){
        		WTPwr = 180;
        	}
        	$("#pwratpoint").animate({ textIndent: 0 }, { 
				step: function(now,fx) {
 				$(this).css('transform-origin','90% 50%'); 
				$(this).css('transform','rotate('+WTPwr+'deg)'); 
				}, 
        	},1000)
        	if(WROTSpd>=180){
        		WROTSpd = 180;
        	}
        	$("#rspdpoint").animate({ textIndent: 0 }, { 
				step: function(now,fx) {
 				$(this).css('transform-origin','90% 50%'); 
				$(this).css('transform','rotate('+WROTSpd+'deg)'); 
				}, 
        	},1000)
        	if(WGENSpd>=30){
        		WGENSpd = 30;
        	}
        	$("#gspdpoint").animate({ textIndent: 0 }, { 
				step: function(now,fx) {
 				$(this).css('transform-origin','90% 50%'); 
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
        		height:(WTURTemp+30)*3.2,
        		duration: "slow",
        	}, 1000 )		
			$("#WNACTemp").animate({ 
        		height:WNACTemp+50,
        		duration: "slow",
        	}, 1000 )
        	$("#WGENTemp").animate({ 
        		height:WGENTemp+50,
        		duration: "slow",
        	}, 1000 )
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
        tobujian:()=>{
        	dispatch(actions.setVars('fan_page', 'fanobj'));

        }
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
