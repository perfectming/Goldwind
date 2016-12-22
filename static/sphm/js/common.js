window.ApiDomian = 'http://211.90.87.226:8080/sphm';
window.JFApiDomian = 'http://211.90.87.226:8180/alarmClientInterface';


// window.ApiDomian = 'http://10.68.4.9:8080/alarmClientInterface';
// window.JFApiDomian = 'http://10.68.4.9:8080/alarmClientInterface';


var userId = '10';
var areaId = '201612121721151';
function getLastDay(year, month) {
    var new_year = year;    //取当前的年份  
    var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）  
    if (month > 12)            //如果当前大于12月，则年份转到下一年  
    {
        new_month -= 12;        //月份减  
        new_year++;            //年份增  
    }
    var new_date = new Date(new_year, new_month, 1);                //取当年当月中的第一天  
    return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();//获取当月最后一天日期  
}
$(function () {
	$(".dialog a.close").click(function () {
		$(this).parent().parent().hide();
	})
	$(".dialog .cancle").click(function () {
		$('#'+$(this).attr('for')).hide();
	})
})

function bindRowBgColor() {
    $(".grid input[type='checkbox'],.grid input[type='radio']").on('click', function (event) {
        if ($(this).get(0).checked == true) {
            $(this).parent().parent().addClass("active");
        } else {
            $(this).parent().parent().removeClass("active");
        }
        event.stopPropagation();
    })
    $(".grid tr").on('click', function (event) {
        if ($(this).find("input[type='checkbox']").length > 0){
            if ($(this).find("input[type='checkbox']").get(0).checked == false) {
                $(this).addClass("active");
                $(this).find("input[type='checkbox']").get(0).checked = true;
            } else {
                $(this).removeClass("active");
                $(this).find("input[type='checkbox']").get(0).checked = false;
            }
        }
        if ($(this).find("input[type='radio']").length > 0) {
            $(this).find("input[type='radio']").get(0).checked = true;
            $(this).addClass("active").siblings().removeClass("active");
        }
    })

    $(".grid tr").on('mouseover', function (event) {
        $(this).addClass("active");
    })
    $(".grid tr").on('mouseout', function (event) {
        if ($(this).find("input[type='checkbox']").length > 0) {
            if ($(this).find("input[type='checkbox']").get(0).checked == false)
                $(this).removeClass("active");
        }
        else if ($(this).find("input[type='radio']").length > 0) {
            if ($(this).find("input[type='radio']").get(0).checked == false)
                $(this).removeClass("active");
        }
        else
            $(this).removeClass("active");
    })
}


function bindRowBgColorByTarget(target) {
    $("#"+target+".grid input[type='checkbox'],.grid input[type='radio']").on('click', function (event) {
        if ($(this).get(0).checked == true) {
            $(this).parent().parent().addClass("active");
        } else {
            $(this).parent().parent().removeClass("active");
        }
        event.stopPropagation();
    })
    $("#"+target+".grid tr").on('click', function (event) {
        if ($(this).find("input[type='checkbox']").length > 0){
            if ($(this).find("input[type='checkbox']").get(0).checked == false) {
                $(this).addClass("active");
                $(this).find("input[type='checkbox']").get(0).checked = true;
            } else {
                $(this).removeClass("active");
                $(this).find("input[type='checkbox']").get(0).checked = false;
            }
        }
        if ($(this).find("input[type='radio']").length > 0) {
            $(this).find("input[type='radio']").get(0).checked = true;
            $(this).addClass("active").siblings().removeClass("active");
        }
    })

    $("#"+target+".grid tr").on('mouseover', function (event) {
        $(this).addClass("active");
    })
    $("#"+target+".grid tr").on('mouseout', function (event) {
        if ($(this).find("input[type='checkbox']").length > 0) {
            if ($(this).find("input[type='checkbox']").get(0).checked == false)
                $(this).removeClass("active");
        }
        else if ($(this).find("input[type='radio']").length > 0) {
            if ($(this).find("input[type='radio']").get(0).checked == false)
                $(this).removeClass("active");
        }
        else
            $(this).removeClass("active");
    })
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return "";
}

function LoginPage(callback) {
    $.ajax({
        type: "post",
        url: window.ApiDomian + "/account_login.do?userId=" + userId + "&leveltype=2",
        cache: false,
        dataType:'jsonp',
        success: function (json) {
            if (json.state == 1) {
                if (callback != undefined)
                    callback();
            }
            else {
                document.write('登陆失败');
            }
        },
        error: function () {
            alert('登陆失败');
        }
    });
}

function LoginJFPage(callback) {
    $.ajax({
        type: "post",
        url: window.JFApiDomian + "/account_login.do?userId=" + userId + "&leveltype=2",
        cache: false,
        dataType: 'jsonp',
        success: function (json) {
            if (json.state == 1) {
                if (callback != undefined)
                    callback();
            }
            else {
                document.write('登陆失败');
            }
        },
        error: function () {
            alert('登陆失败');
        }
    });
}


function CmsUpload(sender) {
    var uploadLayer = layer.msg('文件上传中...', { icon: 16, shade: 0.01, time: 999999 });
    $("#uploadForm").ajaxSubmit({
        type: 'post',
        url: window.ApiDomian + "/report/upload.json",
        beforeSerialize: function () { },
        complete: function () {
            layer.close(uploadLayer);
        },
        success: function (json) {
            if (json.state == 1) {
                $("#hidfile").val(json.data.filePath);
                alert('文件上传成功。');
            }
            else
                alert('文件上传失败。');
        },
        error: function (XmlHttpRequest, textStatus, errorThrown) {
            console.log(XmlHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

//得到字符总数  
function getChars(str) {
    var i = 0;
    var c = 0.0;
    var unicode = 0;
    var len = 0;

    if (str == null || str == "") {
        return 0;
    }
    len = str.length;
    for (i = 0; i < len; i++) {
        unicode = str.charCodeAt(i);
        if (unicode < 127) { //判断是单字符还是双字符  
            c += 1;
        } else {  //chinese  
            c += 2;
        }
    }
    return c;
}

function sb_strlen(str) {
    return getChars(str);
}
//截取字符  
function sb_substr(str, startp, endp) {
    if (sb_strlen(str) <= endp)
        return str;
    var i = 0; c = 0; unicode = 0; rstr = '';
    var len = str.length;
    var sblen = sb_strlen(str);

    if (startp < 0) {
        startp = sblen + startp;
    }

    if (endp < 1) {
        endp = sblen + endp;// - ((str.charCodeAt(len-1) < 127) ? 1 : 2);  
    }
    // 寻找起点  
    for (i = 0; i < len; i++) {
        if (c >= startp) {
            break;
        }
        var unicode = str.charCodeAt(i);
        if (unicode < 127) {
            c += 1;
        } else {
            c += 2;
        }
    }

    // 开始取  
    for (i = i; i < len; i++) {
        var unicode = str.charCodeAt(i);
        if (unicode < 127) {
            c += 1;
        } else {
            c += 2;
        }
        rstr += str.charAt(i);

        if (c >= endp) {
            break;
        }
    }

    return rstr+"...";
}
function getDay() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    return year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (date < 10 ? '0' + date : date);
}

function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期 
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期 
    var d = dd.getDate();
    return y + "-" + (m < 10 ? ('0' + m) : m) + "-" + (d < 10 ? ('0' + d) : d);
}
function GetYear() {
    var dd = new Date();
    return dd.getFullYear();
}
function GetMonth() {
    var dd = new Date();
    var m = dd.getMonth() + 1;

    return (m < 10 ? ('0' + m) : m);
}

function CreateWorkID(wtId) {
    var dd = new Date();
    var month = dd.getMonth() + 1;
    var date = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
    var hh = dd.getHours() < 10 ? '0' + dd.getHours() : dd.getHours();
    var mm = dd.getMinutes() < 10 ? '0' + dd.getMinutes() : dd.getMinutes();
    var ss = dd.getSeconds() < 10 ? '0' + dd.getSeconds() : dd.getSeconds();
    return '' + dd.getFullYear() + (month < 10 ? '0' + month : month) + date + hh + mm + ss + "_" + wtId + "_" + randomNum();
}

function randomNum() {
    var Num = "";
    for (var i = 0; i < 4; i++) {
        Num += Math.floor(Math.random() * 10);
    }

    return Num;
}

function getLocalTime(nS) {
    var dd = new Date(parseInt(nS) * 1000)
    var month = dd.getMonth() + 1;
    var date = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
    var hh = dd.getHours() < 10 ? '0' + dd.getHours() : dd.getHours();
    var mm = dd.getMinutes() < 10 ? '0' + dd.getMinutes() : dd.getMinutes();
    return dd.getFullYear() + "-" + month + "-" + date + " " + hh + ":" + mm;
}

function getjfLocalTime(nS) {
    nS = '"' + nS + '"';

    return getLocalTime(nS.substr(1, nS.length - 5));
}


function GetAllUrl(url) {
    if(url.indexOf('?') > -1)
        return url + "&userId=" + userId;
    else
        return url + "?userId=" + userId;
}

function GetChartMaxValue(seriesData){
	var data = 0;

	for(var i = 0; i < seriesData.length;i++){
		if(seriesData[i].areaAlarmCount > data)
			data= seriesData[i].areaAlarmCount;
	}


	if(data <= 100)
		return 100;

	data = data+'';
	var str = '';
	for(var i = 0; i < data.length;i++){
		if(i == data.length-2){
			if( i == 0)
				str += data[i]+'.';
			else
				str += '.'+data[i];
		}
		else
			str += data[i];
	}

	var back = Math.ceil(parseFloat(str));
	return parseInt(back+'00')
}