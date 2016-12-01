window.ApiDomian = 'http://211.90.87.226:8080/sphm';

$(function () {
	$(".grid input[type='checkbox']").on('click',function(event){
		if($(this).get(0).checked == true){
			$(this).parent().parent().addClass("active");
		}else{
			$(this).parent().parent().removeClass("active");
		}
		event.stopPropagation();
	})

	
	$(".dialog a.close").click(function () {
		$(this).parent().parent().hide();
	})
	$(".dialog .cancle").click(function () {
		$('#'+$(this).attr('for')).hide();
	})
})

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return "";
}

function LoginPage(callback) {
    $.ajax({
        type: "post",
        url: window.ApiDomian + "/account_login.do?userId=123&leveltype=123",
        cache: false,
        dataType:'jsonp',
        success: function (json) {
            if (json.state == 1) {
                if (callback != undefined)
                    callback();
            }
        },
        error: function () {
            alert('登陆失败');
        }
    });
}


function CmsUpload(sender) {

    
    LoginPage(function () {
        $.ajax({
            type: "GET",
            url: window.ApiDomian + "/report/list.json",
            dataType: "jsonp",
            success: function (json) {
                alert(1)
            }
        });
        return;
        $("#uploadForm").ajaxSubmit({
            type: 'post',
            url: window.ApiDomian + "/report/upload.json",
            beforeSerialize: function () {
                if (!sender.value.toUpperCase().match(/.JPG|.GIF|.PNG|.BMP/i)) {
                    alert('图片格式无效，请上传.JPG|.GIF|.PNG|.BMP格式的图片！');
                    return false;
                }
            },
            success: function (json) {
                alert(JSON.stringify(json))
            },
            error: function (XmlHttpRequest, textStatus, errorThrown) {
                console.log(XmlHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });

        //var formData = new FormData();
        //formData.append('file', $('#file')[0].files[0]);
        //$.ajax({
        //    url: window.ApiDomian + "/report/upload.json",
        //    type: 'POST',
        //    cache: false,
        //    data: formData,
        //    dataType: 'jsonp',
        //    processData: false,
        //    contentType: false
        //}).done(function (json) {
        //    alert(JSON.stringify(json))
        //}, 'json').fail(function () {
        //    alert(1);
        //});

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