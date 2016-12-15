
////单例获取数据
var TY = {};
///是否跨域
TY.crossDomain = false;
TY.dataUrl = "http://54.223.200.134/System/data.aspx";
TY.TT = { startTime: 0, checkTime: 0, timeOutlength: 1000 * 5 };//
TY.Zip = false;
//sdata:发送的数据,asyn:异步方法,flag:是否强制发送而不监测活动线程,lock:是否锁定
TY.sendData = function (sdata, asyn, flag,lock)
{
    if (flag == null) flag = false;
    if (TY.TT.thread == null || flag)
    {
        var set = {
            url: TY.dataUrl,
            async: true,
            data: sdata + "&crossDomain=" + TY.crossDomain + "&Zip=" + TY.Zip,

            type: "post",
            dataType: "text",
            timeout: TY.TT.timeOutlength,
            complete: function (XMLHttpRequest, status)
            {
                if (status == 'timeout')
                {
                    ajax.abort();
                    TY.TT.timeOut = true;
                    clearTimeout(TY.TT.thread);
                    TY.TT.thread = null;
                    if (TY.ajaxTimeOut != null)
                    {
                        TY.ajaxTimeOut(sdata, asyn);
                    }
                }
                XMLHttpRequest = null;
                delete XMLHttpRequest;
            },
            success: function (data, state)
            {
                if (TY.crossDomain == true && TY.Zip == true)
                {
                    TY.execAsyn(data.re, sdata, asyn, lock);
                }
                else
                {
                    TY.execAsyn(data, sdata, asyn, lock);
                }
            },
            error: function (a, b, c)
            {
                if (b !== "timeout")
                {
                    TY.setInfo(a.responseText + ":" + b + ":" + c, 0, lock);
                }
            },
            beforeSend: function (XMLHttpRequest) { }
        };
        if (TY.crossDomain)
        {
            set.type = "get";
            set.dataType = "jsonp";
            set.jsonp = "callback";
            set.jsonpCallback = "testCall";
        }
        $(".sdata").text(set.url + "?" + set.data);
        var ajax = $.ajax(set);
        if (!flag)
        {
            TY.TT.startTime = (new Date()).getTime();
            TY.setInfo("发送请求... ...", 2, lock);
            //TY.setInfo(" ", 2, lock);
        }
    }
    //$(".sdata").text(TY.dataUrl+"?"+sdata + "&crossDomain=" + TY.crossDomain);
}

TY.ajaxTimeOut = function (sdata, asyn)
{
    $(".info").text("");
    var ct = $("<div><a class='retry' href='#'>重试</a> <a class='giveup' href='#'>放弃</a></div>");
    ct.appendTo($(".info"));
    $(".retry").click(function ()
    {
        return function ()
        {
            TY.TT.thread = null;
            TY.sendData(sdata, asyn);
        }
    }());
    $(".giveup").click(function ()
    {
        return function ()
        {
            TY.TT.thread = null;
            TY.setInfo();
        }
    }());
}
//function testCall () { };
function testCall(obj)
{

};
TY.initBase = function (data)
{
    if (window.Base == null)
    {
        window.Base = {};
    }
    if (window.Base.$TZ == null)
    {
        window.Base.$TZ = data.tz;
    }
}
//执行异步方法、格式化数据,fun:远程方法
TY.execAsyn = function (data, sdata, asyn, lock)
{
    if (typeof (data) == "string")
    {
        //alert(JSON.stringify(data));
        if (TY.Zip == true)
        {
            eval("data=" + utf8to16(zip_inflate(base64decode(data))));
        }
        else
        {
            eval("data=" + data);
        }
    }
    TY.initBase(data);
    if (data.error == null)
    {
        if (data.init == 1)
        {
            TY.setInfo(data.info,1, lock);
            asyn(data.data.cli.dps, data.time);
        }
        else
        {
            TY.setInfo(data.info, 2, lock);
            setTimeout(function () {
                TY.sendData(sdata, asyn, true);
                TY.Monitor.f = 0;
            }, 1000);
        }
    }
    else
    {
        TY.writeError(data.error);
    }
}


//设置任务执行过程提示信息，msg:消息,flag:标志,2：等待，0:执行失败，1:执行成功，3:超时
TY.setInfo = function (msg, flag, lock)
{
    try
    {
        if (TY.TT.thread != null)
        {
            clearTimeout(TY.TT.thread);
            TY.TT.thread = null;
        }
        if (msg != null)
        {
            if ((flag == 2 || flag == null) && msg!="")
            {
                var st = new Date();
                function setmsg()
                {
                    var et = new Date();
                    var wt = (et.getTime() - st.getTime()) / 1000;
                    if (wt > 0)
                    {
                        TY.writeInfo(msg, flag, lock,wt);
                    }
                    else
                    {
                        TY.writeInfo(msg, flag, lock,wt)
                    }
                    TY.TT.thread = setTimeout(setmsg, 100);
                }
                TY.TT.thread = setTimeout(setmsg, 0);
            }
            else
            {
                TY.writeInfo(msg, flag, lock,0);
            }
        }
        else
        {
            TY.writeInfo("", flag, lock,0);
        }
    }
    catch (e)
    {
        alert(e.message);
    }
}

//输出消息
TY.writeInfo = function (msg, flag, lock,wt)
{
    var str = "";
    if (msg != "") str = msg + "  " + wt + "s";
    $(".info").text(str);
}
TY.writeError = function (error)
{
    window.status = msg;
    $(".error").text("error:"+error.msg+" 故障号:"+error.code);
}

//获取模型。modelkey:模板key,enid:实体id,scid:订单id,asyn:异步方法,enkey:订单格式,layout:是否需要布局文件
TY.getModel = function (modelkey, enid, scid, asyn, enkey,layout)
{
    var arg = [];
    arg[0] = "mdid=Model";
    arg[1] = "ScId=" + scid;
    arg[2] = "EnId=" + enid;
    if (enkey == null)
    {
        arg[3] = "EnKey=DataOrder";//
    }
    else
    {
        arg[3] = "EnKey="+enkey;//
    }
    arg[4] = "PkId=";
    arg[5] = "ModelKey=" + modelkey;
    arg[6] = "dhs=UISys";
    if (layout == null)
    {
        arg[7] = "layout=0";
    }
    else
    {
        arg[7] = "layout="+layout;
    }
    TY.sendData(arg.join("&"), asyn);

};
//获取模型对应的实时数据。scid:订单id,enid:实体id,asyn:异步方法
TY.getRtData = function (scid, enid, asyn)
{
    var arg = [];
    arg[0] = "mdid=ModelData";
    arg[1] = "scid=" + scid + "_" + enid + "_";
    arg[2] = "dhs=UISys";
    TY.sendData(arg.join("&"), asyn,true,false);
}
//获取数据点模型,modelkey:模板key,enid:实体id,mdid:数据点id,asyn:异步方法,enkey:订单格式
TY.getItemModel = function (modelkey, enid, mdid, asyn, enkey)
{
    var arg = [];
    arg[0] = "mdid=ItemModel";
    arg[1] = "ScId=" + mdid;
    arg[2] = "EnId=" + enid;
    if (enkey == null)
    {
        arg[3] = "EnKey=DataOrder";//
    }
    else
    {
        arg[3] = "EnKey=" + enkey;//
    }
    arg[4] = "PkId=";
    arg[5] = "ModelKey=" + modelkey;
    arg[6] = "dhs=UISys";
    TY.sendData(arg.join("&"), asyn);
}
//获取历史对比数据。enid:实体id串,mdid:数据点id串, starttime:开始时间, endtime:截至时间,asyn:异步方法
TY.getData = function (enid, mdid, starttime, endtime, asyn)
{
    var arg = [];
    arg[0] = "enid=" + enid;
    arg[1] = "mdid=" + mdid;
    arg[2] = "starttime=" + starttime;
    arg[3] = "endtime=" + endtime;
    TY.sendData(arg.join("&"), asyn);
}
//获取任意参数结构的数据,mdid:数据点id,arg:json结构的其他参数,asyn:异步方法
TY.getAnyData = function (arg, asyn)
{
    var as = [0], i =0;
    for (var k in arg)
    {
        as[i] = k + "=" + arg[k];
        i++;
    }
    TY.sendData(as.join("&"), asyn);
}

//临时解决订单的状态保持问题
TY.keepModel = function (modelkey, enid, scid, enkey, layout)
{
    TY.getModel(modelkey, enid, scid, function () { }, enkey, layout);
}

//监控模式抽象,sst:开始的服务器时间,lst:最后的服务器时间
TY.Monitor = { timespan: 1000, thread: null, sst: 0, lst: 0 ,f:0};
TY.MonitorIns = {};
//TY.Monitor.getData = function ()
//{
//    for (var o in TY.Monitor.Orders)
//    {

//    }
//}
TY.Ajax = function (args)
{
    var t = function ()
    {
        TY.getModel(args.events.mk, args.events.enid, args.events.scid, function (rdata, time)
        {
            if (TY.Monitor.sst == 0)
            {
                TY.Monitor.sst = Number(time);
            }
            TY.Monitor.lst = Number(time);
            if (rdata != null && rdata.error != null)
            {
                TY.writeError(rdata.error);
            }
            else if (rdata.Model != null && rdata.Model.error != null)
            {
                TY.writeError(rdata.Model.error);
            }
            else
            {
                TY.Monitor.f = 1;
                TY.initMonitorModel(rdata.Model.dis, args.events.ens);

                if (args.events.sync)
                {
                    args.events.sync(rdata.Model.dis, time);
                }
                
                TY.Monitor.start(function ()
                {
                    if (TY.Monitor.f == 1)
                    {
                        TY.getRtData(args.events.scid, args.events.enid, function (rdata, time)
                        {
                            TY.Monitor.lst = Number(time);
                            TY.brushMonitorModel(rdata, time, args.events.ens);
                            if (args.events.watch)
                            {
                                args.events.watch(rdata.ModelData, time);
                            }
                        });
                    }
                    else
                    {
                        TY.getModel(args.events.mk, args.events.enid, args.events.scid, function (rdata,time)
                        {
                            if (rdata != null && rdata.error != null)
                            {
                                TY.writeError(rdata.error);
                            }
                            else if (rdata.Model != null && rdata.Model.error != null)
                            {
                                TY.writeError(rdata.Model.error);
                            }
                            else
                            {
                                TY.Monitor.f = 1;
                            }
                        }, "Screen", 1);
                    }
                });
                
            }
            if (TY.Monitor.f == 0)
            {
                TY.Monitor.start(t);
            }
        }, "Screen", 1);
    };
    t();
}
TY.Monitor.start = function (event)
{
    function run()
    {
        var st = new Date().getTime();
        event();
        var et=new Date().getTime();
        var weit = TY.Monitor.timespan - (et - st);
        if (weit < 0) weit = 0;
        TY.Monitor.thread = setTimeout(run, weit);
    }
    run();
}

TY.initMonitorModel = function (dis,ens)
{
    for (var e in ens)
    {
        for (var d in ens[e])
        {
            for (var id in ens[e][d].es)
            {
                for (var a in ens[e][d].es[id])
                {
                    var md = {};
                    for (var k in dis[d])
                    {
                        md[k] = dis[d][k];
                    }
                    var ik = a;
                    for (var k in ens[e][d].es[id][a])
                    {
                        if (k != "key")
                        {
                            md[k] = ens[e][d].es[id][a][k];
                        }
                        else
                        {
                            ik = ens[e][d].es[id][a][k];
                        }
                    }
                    ens[e][d].es[id][a] = new UI.HRens[a](md, ik, $("#" + id));
                }
            }
        }
    }
    return ens;
}
TY.brushMonitorModel = function (rdata, time,ens)
{
    var data = rdata.ModelData;
    
    var v = "..";
    for (var e in ens)
    {
        for (var d in ens[e])
        {
            if (ens[e][d].value != null)
            {
                v = ens[e][d].value;
            }
            if (data[e] != null)
            {
                if (data[e][d] != null)
                {
                    v = data[e][d];
                }
            }
            if (ens[e][d] != null)
            {
                if (v != ens[e][d].value)
                {
                    clearTimeout(ens[e][d].brush);
                    ens[e][d].brush = setTimeout(function ()
                    {
                        var eid = e, did = d, vv = v;
                        return function ()
                        {
                            if (ens[eid] != null)
                            {
                                for (var id in ens[eid][did].es)
                                {
                                    for (var a in ens[eid][did].es[id])
                                    {
                                        ens[eid][did].es[id][a].update(vv);
                                    }
                                }
                            }
                        }
                    }(), 0);
                    ens[e][d].value = v;
                }
            }
        }
    }
}









/* utf.js - UTF-8 <=> UTF-16 convertion
*
* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
* Version: 1.0
* LastModified: Dec 25 1999
* This library is free.  You can redistribute it and/or modify it.
*/

/*
* Interfaces:
* utf8 = utf16to8(utf16);
* utf16 = utf16to8(utf8);
*/

function utf16to8(str)
{
    var out, i, len, c;

    out = "";
    len = str.length;
    for (i = 0; i < len; i++)
    {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F))
        {
            out += str.charAt(i);
        } else if (c > 0x07FF)
        {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else
        {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}

function utf8to16(str)
{
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = str.length;
    i = 0;
    while (i < len)
    {
        c = str.charCodeAt(i++);
        switch (c >> 4)
        {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                // 0xxxxxxx
                out += str.charAt(i - 1);
                break;
            case 12: case 13:
                // 110x xxxx   10xx xxxx
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x0F) << 12) |
                                           ((char2 & 0x3F) << 6) |
                                           ((char3 & 0x3F) << 0));
                break;
        }
    }

    return out;
}

/* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
* Version: 1.0
* LastModified: Dec 25 1999
* This library is free.  You can redistribute it and/or modify it.
*/

/*
* Interfaces:
* b64 = base64encode(data);
* data = base64decode(b64);
*/


var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64encode(str)
{
    var out, i, len;
    var c1, c2, c3;

    len = str.length;
    i = 0;
    out = "";
    while (i < len)
    {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len)
        {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len)
        {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}

function base64decode(str)
{
    var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while (i < len)
    {
        /* c1 */
        do
        {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c1 == -1);
        if (c1 == -1)
            break;

        /* c2 */
        do
        {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c2 == -1);
        if (c2 == -1)
            break;

        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

        /* c3 */
        do
        {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return out;
            c3 = base64DecodeChars[c3];
        } while (i < len && c3 == -1);
        if (c3 == -1)
            break;

        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

        /* c4 */
        do
        {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return out;
            c4 = base64DecodeChars[c4];
        } while (i < len && c4 == -1);
        if (c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}
//input base64 encode
function strdecode(str)
{
    return utf8to16(base64decode(str));
}
//document.write(strdecode('5L2g5aW9Iee+juWlsyE='));
function strencode(str)
{
    return base64encode(utf16to8(str));
}

/* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
* Version: 1.0.0.1
* LastModified: Dec 25 1999
*/

/* Interface:
* data = zip_inflate(src);
*/

/* constant parameters */
var zip_WSIZE = 32768;  // Sliding Window size
var zip_STORED_BLOCK = 0;
var zip_STATIC_TREES = 1;
var zip_DYN_TREES = 2;

/* for inflate */
var zip_lbits = 9;      // bits in base literal/length lookup table
var zip_dbits = 6;      // bits in base distance lookup table
var zip_INBUFSIZ = 32768; // Input buffer size
var zip_INBUF_EXTRA = 64; // Extra buffer

/* variables (inflate) */
var zip_slide;
var zip_wp;         // current position in slide
var zip_fixed_tl = null; // inflate static
var zip_fixed_td;   // inflate static
var zip_fixed_bl, fixed_bd; // inflate static
var zip_bit_buf;    // bit buffer
var zip_bit_len;    // bits in bit buffer
var zip_method;
var zip_eof;
var zip_copy_leng;
var zip_copy_dist;
var zip_tl, zip_td; // literal/length and distance decoder tables
var zip_bl, zip_bd; // number of bits decoded by tl and td

var zip_inflate_data;
var zip_inflate_pos;


/* constant tables (inflate) */
var zip_MASK_BITS = new Array(
    0x0000,
    0x0001, 0x0003, 0x0007, 0x000f, 0x001f, 0x003f, 0x007f, 0x00ff,
    0x01ff, 0x03ff, 0x07ff, 0x0fff, 0x1fff, 0x3fff, 0x7fff, 0xffff);
// Tables for deflate from PKZIP's appnote.txt.
var zip_cplens = new Array( // Copy lengths for literal codes 257..285
    3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
    35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0);
/* note: see note #13 above about the 258 in this list. */
var zip_cplext = new Array( // Extra bits for literal codes 257..285
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2,
    3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99); // 99==invalid
var zip_cpdist = new Array( // Copy offsets for distance codes 0..29
    1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
    257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
    8193, 12289, 16385, 24577);
var zip_cpdext = new Array( // Extra bits for distance codes
    0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6,
    7, 7, 8, 8, 9, 9, 10, 10, 11, 11,
    12, 12, 13, 13);
var zip_border = new Array(  // Order of the bit length code lengths
    16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15);
/* objects (inflate) */

function zip_HuftList()
{
    this.next = null;
    this.list = null;
}

function zip_HuftNode()
{
    this.e = 0; // number of extra bits or operation
    this.b = 0; // number of bits in this code or subcode

    // union
    this.n = 0; // literal, length base, or distance base
    this.t = null; // (zip_HuftNode) pointer to next level of table
}

function zip_HuftBuild(b, // code lengths in bits (all assumed <= BMAX)
               n, // number of codes (assumed <= N_MAX)
               s, // number of simple-valued codes (0..s-1)
               d, // list of base values for non-simple codes
               e, // list of extra bits for non-simple codes
               mm   // maximum lookup bits
           )
{
    this.BMAX = 16;   // maximum bit length of any code
    this.N_MAX = 288; // maximum number of codes in any set
    this.status = 0; // 0: success, 1: incomplete table, 2: bad input
    this.root = null; // (zip_HuftList) starting table
    this.m = 0;     // maximum lookup bits, returns actual

    /* Given a list of code lengths and a maximum table size, make a set of
    tables to decode that set of codes. Return zero on success, one if
    the given code set is incomplete (the tables are still built in this
    case), two if the input is invalid (all zero length codes or an
    oversubscribed set of lengths), and three if not enough memory.
    The code with value 256 is special, and the tables are constructed
    so that no bits beyond that code are fetched when that code is
    decoded. */
    {
        var a;      // counter for codes of length k
        var c = new Array(this.BMAX + 1); // bit length count table
        var el;         // length of EOB code (value 256)
        var f;      // i repeats in table every f entries
        var g;      // maximum code length
        var h;      // table level
        var i;      // counter, current code
        var j;      // counter
        var k;      // number of bits in current code
        var lx = new Array(this.BMAX + 1); // stack of bits per table
        var p;      // pointer into c[], b[], or v[]
        var pidx;   // index of p
        var q;      // (zip_HuftNode) points to current table
        var r = new zip_HuftNode(); // table entry for structure assignment
        var u = new Array(this.BMAX); // zip_HuftNode[BMAX][]  table stack
        var v = new Array(this.N_MAX); // values in order of bit length
        var w;
        var x = new Array(this.BMAX + 1); // bit offsets, then code stack
        var xp;         // pointer into x or c
        var y;      // number of dummy codes added
        var z;      // number of entries in current table
        var o;
        var tail;   // (zip_HuftList)

        tail = this.root = null;
        for (i = 0; i < c.length; i++)
            c[i] = 0;
        for (i = 0; i < lx.length; i++)
            lx[i] = 0;
        for (i = 0; i < u.length; i++)
            u[i] = null;
        for (i = 0; i < v.length; i++)
            v[i] = 0;
        for (i = 0; i < x.length; i++)
            x[i] = 0;

        // Generate counts for each bit length
        el = n > 256 ? b[256] : this.BMAX; // set length of EOB code, if any
        p = b; pidx = 0;
        i = n;
        do
        {
            c[p[pidx]]++; // assume all entries <= BMAX
            pidx++;
        } while (--i > 0);
        if (c[0] == n)
        {   // null input--all zero length codes
            this.root = null;
            this.m = 0;
            this.status = 0;
            return;
        }

        // Find minimum and maximum length, bound *m by those
        for (j = 1; j <= this.BMAX; j++)
            if (c[j] != 0)
            break;
        k = j;      // minimum code length
        if (mm < j)
            mm = j;
        for (i = this.BMAX; i != 0; i--)
            if (c[i] != 0)
            break;
        g = i;      // maximum code length
        if (mm > i)
            mm = i;

        // Adjust last length count to fill out codes, if needed
        for (y = 1 << j; j < i; j++, y <<= 1)
            if ((y -= c[j]) < 0)
        {
            this.status = 2; // bad input: more codes than bits
            this.m = mm;
            return;
        }
        if ((y -= c[i]) < 0)
        {
            this.status = 2;
            this.m = mm;
            return;
        }
        c[i] += y;

        // Generate starting offsets into the value table for each length
        x[1] = j = 0;
        p = c;
        pidx = 1;
        xp = 2;
        while (--i > 0)     // note that i == g from above
            x[xp++] = (j += p[pidx++]);

        // Make a table of values in order of bit lengths
        p = b; pidx = 0;
        i = 0;
        do
        {
            if ((j = p[pidx++]) != 0)
                v[x[j]++] = i;
        } while (++i < n);
        n = x[g];       // set n to length of v

        // Generate the Huffman codes and for each, make the table entries
        x[0] = i = 0;   // first Huffman code is zero
        p = v; pidx = 0;    // grab values in bit order
        h = -1;         // no tables yet--level -1
        w = lx[0] = 0;  // no bits decoded yet
        q = null;       // ditto
        z = 0;      // ditto

        // go through the bit lengths (k already is bits in shortest code)
        for (; k <= g; k++)
        {
            a = c[k];
            while (a-- > 0)
            {
                // here i is the Huffman code of length k bits for value p[pidx]
                // make tables up to required level
                while (k > w + lx[1 + h])
                {
                    w += lx[1 + h]; // add bits already decoded
                    h++;

                    // compute minimum size table less than or equal to *m bits
                    z = (z = g - w) > mm ? mm : z; // upper limit
                    if ((f = 1 << (j = k - w)) > a + 1)
                    { // try a k-w bit table
                        // too few codes for k-w bit table
                        f -= a + 1; // deduct codes from patterns left
                        xp = k;
                        while (++j < z)
                        { // try smaller tables up to z bits
                            if ((f <<= 1) <= c[++xp])
                                break; // enough codes to use up j bits
                            f -= c[xp]; // else deduct codes from patterns
                        }
                    }
                    if (w + j > el && w < el)
                        j = el - w; // make EOB code end at table
                    z = 1 << j; // table entries for j-bit table
                    lx[1 + h] = j; // set table size in stack

                    // allocate and link in new table
                    q = new Array(z);
                    for (o = 0; o < z; o++)
                    {
                        q[o] = new zip_HuftNode();
                    }

                    if (tail == null)
                        tail = this.root = new zip_HuftList();
                    else
                        tail = tail.next = new zip_HuftList();
                    tail.next = null;
                    tail.list = q;
                    u[h] = q; // table starts after link

                    /* connect to last table, if there is one */
                    if (h > 0)
                    {
                        x[h] = i;   // save pattern for backing up
                        r.b = lx[h]; // bits to dump before this table
                        r.e = 16 + j; // bits in this table
                        r.t = q;    // pointer to this table
                        j = (i & ((1 << w) - 1)) >> (w - lx[h]);
                        u[h - 1][j].e = r.e;
                        u[h - 1][j].b = r.b;
                        u[h - 1][j].n = r.n;
                        u[h - 1][j].t = r.t;
                    }
                }

                // set up table entry in r
                r.b = k - w;
                if (pidx >= n)
                    r.e = 99;   // out of values--invalid code
                else if (p[pidx] < s)
                {
                    r.e = (p[pidx] < 256 ? 16 : 15); // 256 is end-of-block code
                    r.n = p[pidx++]; // simple code is just the value
                } else
                {
                    r.e = e[p[pidx] - s]; // non-simple--look up in lists
                    r.n = d[p[pidx++] - s];
                }

                // fill code-like entries with r //
                f = 1 << (k - w);
                for (j = i >> w; j < z; j += f)
                {
                    q[j].e = r.e;
                    q[j].b = r.b;
                    q[j].n = r.n;
                    q[j].t = r.t;
                }

                // backwards increment the k-bit code i
                for (j = 1 << (k - 1); (i & j) != 0; j >>= 1)
                    i ^= j;
                i ^= j;

                // backup over finished tables
                while ((i & ((1 << w) - 1)) != x[h])
                {
                    w -= lx[h];     // don't need to update q
                    h--;
                }
            }
        }

        /* return actual size of base table */
        this.m = lx[1];

        /* Return true (1) if we were given an incomplete table */
        this.status = ((y != 0 && g != 1) ? 1 : 0);
    } /* end of constructor */
}


/* routines (inflate) */

function zip_GET_BYTE()
{
    if (zip_inflate_data.length == zip_inflate_pos)
        return -1;
    return zip_inflate_data.charCodeAt(zip_inflate_pos++) & 0xff;
}

function zip_NEEDBITS(n)
{
    while (zip_bit_len < n)
    {
        zip_bit_buf |= zip_GET_BYTE() << zip_bit_len;
        zip_bit_len += 8;
    }
}

function zip_GETBITS(n)
{
    return zip_bit_buf & zip_MASK_BITS[n];
}

function zip_DUMPBITS(n)
{
    zip_bit_buf >>= n;
    zip_bit_len -= n;
}

function zip_inflate_codes(buff, off, size)
{
    /* inflate (decompress) the codes in a deflated (compressed) block.
    Return an error code or zero if it all goes ok. */
    var e;  // table entry flag/number of extra bits
    var t;  // (zip_HuftNode) pointer to table entry
    var n;

    if (size == 0)
        return 0;

    // inflate the coded data
    n = 0;
    for (; ; )
    {           // do until end of block
        zip_NEEDBITS(zip_bl);
        t = zip_tl.list[zip_GETBITS(zip_bl)];
        e = t.e;
        while (e > 16)
        {
            if (e == 99)
                return -1;
            zip_DUMPBITS(t.b);
            e -= 16;
            zip_NEEDBITS(e);
            t = t.t[zip_GETBITS(e)];
            e = t.e;
        }
        zip_DUMPBITS(t.b);

        if (e == 16)
        {       // then it's a literal
            zip_wp &= zip_WSIZE - 1;
            buff[off + n++] = zip_slide[zip_wp++] = t.n;
            if (n == size)
                return size;
            continue;
        }

        // exit if end of block
        if (e == 15)
            break;

        // it's an EOB or a length

        // get length of block to copy
        zip_NEEDBITS(e);
        zip_copy_leng = t.n + zip_GETBITS(e);
        zip_DUMPBITS(e);

        // decode distance of block to copy
        zip_NEEDBITS(zip_bd);
        t = zip_td.list[zip_GETBITS(zip_bd)];
        e = t.e;

        while (e > 16)
        {
            if (e == 99)
                return -1;
            zip_DUMPBITS(t.b);
            e -= 16;
            zip_NEEDBITS(e);
            t = t.t[zip_GETBITS(e)];
            e = t.e;
        }
        zip_DUMPBITS(t.b);
        zip_NEEDBITS(e);
        zip_copy_dist = zip_wp - t.n - zip_GETBITS(e);
        zip_DUMPBITS(e);

        // do the copy
        while (zip_copy_leng > 0 && n < size)
        {
            zip_copy_leng--;
            zip_copy_dist &= zip_WSIZE - 1;
            zip_wp &= zip_WSIZE - 1;
            buff[off + n++] = zip_slide[zip_wp++]
        = zip_slide[zip_copy_dist++];
        }

        if (n == size)
            return size;
    }

    zip_method = -1; // done
    return n;
}

function zip_inflate_stored(buff, off, size)
{
    /* "decompress" an inflated type 0 (stored) block. */
    var n;

    // go to byte boundary
    n = zip_bit_len & 7;
    zip_DUMPBITS(n);

    // get the length and its complement
    zip_NEEDBITS(16);
    n = zip_GETBITS(16);
    zip_DUMPBITS(16);
    zip_NEEDBITS(16);
    if (n != ((~zip_bit_buf) & 0xffff))
        return -1;      // error in compressed data
    zip_DUMPBITS(16);

    // read and output the compressed data
    zip_copy_leng = n;

    n = 0;
    while (zip_copy_leng > 0 && n < size)
    {
        zip_copy_leng--;
        zip_wp &= zip_WSIZE - 1;
        zip_NEEDBITS(8);
        buff[off + n++] = zip_slide[zip_wp++] =
        zip_GETBITS(8);
        zip_DUMPBITS(8);
    }

    if (zip_copy_leng == 0)
        zip_method = -1; // done
    return n;
}

function zip_inflate_fixed(buff, off, size)
{
    /* decompress an inflated type 1 (fixed Huffman codes) block.  We should
    either replace this with a custom decoder, or at least precompute the
    Huffman tables. */

    // if first time, set up tables for fixed blocks
    if (zip_fixed_tl == null)
    {
        var i;      // temporary variable
        var l = new Array(288); // length list for huft_build
        var h; // zip_HuftBuild

        // literal table
        for (i = 0; i < 144; i++)
            l[i] = 8;
        for (; i < 256; i++)
            l[i] = 9;
        for (; i < 280; i++)
            l[i] = 7;
        for (; i < 288; i++)    // make a complete, but wrong code set
            l[i] = 8;
        zip_fixed_bl = 7;

        h = new zip_HuftBuild(l, 288, 257, zip_cplens, zip_cplext,
                  zip_fixed_bl);
        if (h.status != 0)
        {
            alert("HufBuild error: " + h.status);
            return -1;
        }
        zip_fixed_tl = h.root;
        zip_fixed_bl = h.m;

        // distance table
        for (i = 0; i < 30; i++)    // make an incomplete code set
            l[i] = 5;
        zip_fixed_bd = 5;

        h = new zip_HuftBuild(l, 30, 0, zip_cpdist, zip_cpdext, zip_fixed_bd);
        if (h.status > 1)
        {
            zip_fixed_tl = null;
            alert("HufBuild error: " + h.status);
            return -1;
        }
        zip_fixed_td = h.root;
        zip_fixed_bd = h.m;
    }

    zip_tl = zip_fixed_tl;
    zip_td = zip_fixed_td;
    zip_bl = zip_fixed_bl;
    zip_bd = zip_fixed_bd;
    return zip_inflate_codes(buff, off, size);
}

function zip_inflate_dynamic(buff, off, size)
{
    // decompress an inflated type 2 (dynamic Huffman codes) block.
    var i;  // temporary variables
    var j;
    var l;  // last length
    var n;  // number of lengths to get
    var t;  // (zip_HuftNode) literal/length code table
    var nb;     // number of bit length codes
    var nl;     // number of literal/length codes
    var nd;     // number of distance codes
    var ll = new Array(286 + 30); // literal/length and distance code lengths
    var h;  // (zip_HuftBuild)

    for (i = 0; i < ll.length; i++)
        ll[i] = 0;

    // read in table lengths
    zip_NEEDBITS(5);
    nl = 257 + zip_GETBITS(5); // number of literal/length codes
    zip_DUMPBITS(5);
    zip_NEEDBITS(5);
    nd = 1 + zip_GETBITS(5); // number of distance codes
    zip_DUMPBITS(5);
    zip_NEEDBITS(4);
    nb = 4 + zip_GETBITS(4); // number of bit length codes
    zip_DUMPBITS(4);
    if (nl > 286 || nd > 30)
        return -1;  // bad lengths

    // read in bit-length-code lengths
    for (j = 0; j < nb; j++)
    {
        zip_NEEDBITS(3);
        ll[zip_border[j]] = zip_GETBITS(3);
        zip_DUMPBITS(3);
    }
    for (; j < 19; j++)
        ll[zip_border[j]] = 0;

    // build decoding table for trees--single level, 7 bit lookup
    zip_bl = 7;
    h = new zip_HuftBuild(ll, 19, 19, null, null, zip_bl);
    if (h.status != 0)
        return -1; // incomplete code set

    zip_tl = h.root;
    zip_bl = h.m;

    // read in literal and distance code lengths
    n = nl + nd;
    i = l = 0;
    while (i < n)
    {
        zip_NEEDBITS(zip_bl);
        t = zip_tl.list[zip_GETBITS(zip_bl)];
        j = t.b;
        zip_DUMPBITS(j);
        j = t.n;
        if (j < 16)     // length of code in bits (0..15)
            ll[i++] = l = j; // save last length in l
        else if (j == 16)
        {   // repeat last length 3 to 6 times
            zip_NEEDBITS(2);
            j = 3 + zip_GETBITS(2);
            zip_DUMPBITS(2);
            if (i + j > n)
                return -1;
            while (j-- > 0)
                ll[i++] = l;
        } else if (j == 17)
        {   // 3 to 10 zero length codes
            zip_NEEDBITS(3);
            j = 3 + zip_GETBITS(3);
            zip_DUMPBITS(3);
            if (i + j > n)
                return -1;
            while (j-- > 0)
                ll[i++] = 0;
            l = 0;
        } else
        {       // j == 18: 11 to 138 zero length codes
            zip_NEEDBITS(7);
            j = 11 + zip_GETBITS(7);
            zip_DUMPBITS(7);
            if (i + j > n)
                return -1;
            while (j-- > 0)
                ll[i++] = 0;
            l = 0;
        }
    }

    // build the decoding tables for literal/length and distance codes
    zip_bl = zip_lbits;
    h = new zip_HuftBuild(ll, nl, 257, zip_cplens, zip_cplext, zip_bl);
    if (zip_bl == 0)    // no literals or lengths
        h.status = 1;
    if (h.status != 0)
    {
        if (h.status == 1)
            ; // **incomplete literal tree**
        return -1;  // incomplete code set
    }
    zip_tl = h.root;
    zip_bl = h.m;

    for (i = 0; i < nd; i++)
        ll[i] = ll[i + nl];
    zip_bd = zip_dbits;
    h = new zip_HuftBuild(ll, nd, 0, zip_cpdist, zip_cpdext, zip_bd);
    zip_td = h.root;
    zip_bd = h.m;

    if (zip_bd == 0 && nl > 257)
    {   // lengths but no distances
        // **incomplete distance tree**
        return -1;
    }

    if (h.status == 1)
    {
        ; // **incomplete distance tree**
    }
    if (h.status != 0)
        return -1;

    // decompress until an end-of-block code
    return zip_inflate_codes(buff, off, size);
}

function zip_inflate_start()
{
    var i;

    if (zip_slide == null)
        zip_slide = new Array(2 * zip_WSIZE);
    zip_wp = 0;
    zip_bit_buf = 0;
    zip_bit_len = 0;
    zip_method = -1;
    zip_eof = false;
    zip_copy_leng = zip_copy_dist = 0;
    zip_tl = null;
}

function zip_inflate_internal(buff, off, size)
{
    // decompress an inflated entry
    var n, i;

    n = 0;
    while (n < size)
    {
        if (zip_eof && zip_method == -1)
            return n;

        if (zip_copy_leng > 0)
        {
            if (zip_method != zip_STORED_BLOCK)
            {
                // STATIC_TREES or DYN_TREES
                while (zip_copy_leng > 0 && n < size)
                {
                    zip_copy_leng--;
                    zip_copy_dist &= zip_WSIZE - 1;
                    zip_wp &= zip_WSIZE - 1;
                    buff[off + n++] = zip_slide[zip_wp++] =
            zip_slide[zip_copy_dist++];
                }
            } else
            {
                while (zip_copy_leng > 0 && n < size)
                {
                    zip_copy_leng--;
                    zip_wp &= zip_WSIZE - 1;
                    zip_NEEDBITS(8);
                    buff[off + n++] = zip_slide[zip_wp++] = zip_GETBITS(8);
                    zip_DUMPBITS(8);
                }
                if (zip_copy_leng == 0)
                    zip_method = -1; // done
            }
            if (n == size)
                return n;
        }

        if (zip_method == -1)
        {
            if (zip_eof)
                break;

            // read in last block bit
            zip_NEEDBITS(1);
            if (zip_GETBITS(1) != 0)
                zip_eof = true;
            zip_DUMPBITS(1);

            // read in block type
            zip_NEEDBITS(2);
            zip_method = zip_GETBITS(2);
            zip_DUMPBITS(2);
            zip_tl = null;
            zip_copy_leng = 0;
        }

        switch (zip_method)
        {
            case 0: // zip_STORED_BLOCK
                i = zip_inflate_stored(buff, off + n, size - n);
                break;

            case 1: // zip_STATIC_TREES
                if (zip_tl != null)
                    i = zip_inflate_codes(buff, off + n, size - n);
                else
                    i = zip_inflate_fixed(buff, off + n, size - n);
                break;

            case 2: // zip_DYN_TREES
                if (zip_tl != null)
                    i = zip_inflate_codes(buff, off + n, size - n);
                else
                    i = zip_inflate_dynamic(buff, off + n, size - n);
                break;

            default: // error
                i = -1;
                break;
        }

        if (i == -1)
        {
            if (zip_eof)
                return 0;
            return -1;
        }
        n += i;
    }
    return n;
}

function zip_inflate(str)
{
    var out, buff,temp;
    var i, j,k;

    zip_inflate_start();
    zip_inflate_data = str;
    zip_inflate_pos = 0;
    k = 0;
    temp = [];
    
    buff = new Array(1024);
    out = "";
    while ((i = zip_inflate_internal(buff, 0, buff.length)) > 0)
    {
        for (j = 0; j < i; j++)
        {
            //out += String.fromCharCode(buff[j]);
            temp[k] = String.fromCharCode(buff[j]);
            k++;
        }
    }
    zip_inflate_data = null; // G.C.
    return temp.join("");
}