module.exports = {
    "Model": {
    "svg": "",
        "ens": {
        "652113028": {
            "name": "E3-28",
                "pid": "652113",
                "pname": "小草湖三期",
                "sp": "1500",
                "cis": "652113028",
                "ent": "Device",
                "det": "WindTurbine",
                "pk": "WT",
                "sk": "2015111914",
                "di": "652113028",
                "dt": "WindTurbine",
                "pr": "1467",
                "ct": "1",
                "pre": "652113027",
                "next": "652113029",
                "la": "0",
                "lo": "0",
                "le": "10"
        }
    },
    "enids": [
        652113028
    ],
        "pks": {
        "pack_WTUR": {
            "id": "pack_WTUR",
                "name": "主要信息",
                "selected": true
        },
        "pack_WTPS": {
            "id": "pack_WTPS",
                "name": "变桨系统"
        },
        "pack_WCNV": {
            "id": "pack_WCNV",
                "name": "变流系统"
        },
        "pack_WYAW": {
            "id": "pack_WYAW",
                "name": "偏航信息"
        },
        "pack_WNAC": {
            "id": "pack_WNAC",
                "name": "机舱"
        },
        "pack_WROT": {
            "id": "pack_WROT",
                "name": "叶轮"
        },
        "pack_WGEN": {
            "id": "pack_WGEN",
                "name": "发电机"
        },
        "pack_WTCS": {
            "id": "pack_WTCS",
                "name": "冷却系统"
        },
        "pack_WTRF": {
            "id": "pack_WTRF",
                "name": "变压器"
        },
        "pack_WTGS": {
            "id": "pack_WTGS",
                "name": "电网信息"
        },
        "pack_WTBT": {
            "id": "pack_WTBT",
                "name": "箱变"
        }
    },
    "prs": {
        "1467": {
            "pks": {},
            "ods": {
                "0_1": {
                    "Type": "0",
                        "Flag": "1",
                        "IsSc": "0",
                        "Descr": "复位",
                        "Param": "",
                        "Des": {}
                },
                "0_2": {
                    "Type": "0",
                        "Flag": "2",
                        "IsSc": "0",
                        "Descr": "启动",
                        "Param": "",
                        "Des": {}
                },
                "0_3": {
                    "Type": "0",
                        "Flag": "3",
                        "IsSc": "0",
                        "Descr": "停止",
                        "Param": "停机原因：",
                        "Des": {
                        "101": "雷电引起的停机",
                            "102": "叶片结冰引起的停机",
                            "103": "扇区管理停机",
                            "104": "雷电停机",
                            "105": "融冰停机",
                            "106": "高湿度停机",
                            "107": "风机通讯中断",
                            "108": "电网通讯中断",
                            "109": "业主要求停机",
                            "110": "安全理由紧急停机",
                            "111": "运营商要求升级停机",
                            "112": "蝙蝠或鸟类迁徙停机",
                            "113": "电场配套设施故障停机",
                            "114": "技术改造停机",
                            "115": "整改停机",
                            "116": "检查停机",
                            "117": "调查停机",
                            "118": "零件或材料等待停机",
                            "119": "业主或运营方误操作停机",
                            "120": "基于合同条款,供应商停止维修停机",
                            "121": "非供应商责任的停机",
                            "122": "闪电,电感应导致停机",
                            "123": "业主,第三方或不可抗力导致停机",
                            "200": "限功率停机"
                    }
                },
                "0_4": {
                    "Type": "0",
                        "Flag": "4",
                        "IsSc": "0",
                        "Descr": "左偏航",
                        "Param": "",
                        "Des": {}
                },
                "0_5": {
                    "Type": "0",
                        "Flag": "5",
                        "IsSc": "0",
                        "Descr": "右偏航",
                        "Param": "",
                        "Des": {}
                },
                "0_6": {
                    "Type": "0",
                        "Flag": "6",
                        "IsSc": "0",
                        "Descr": "停止偏航",
                        "Param": "",
                        "Des": {}
                },
                "0_7": {
                    "Type": "0",
                        "Flag": "7",
                        "IsSc": "0",
                        "Descr": "复位自动启动次数",
                        "Param": "",
                        "Des": {}
                },
                "1_2": {
                    "Type": "1",
                        "Flag": "2",
                        "IsSc": "0",
                        "Descr": "无功给定",
                        "Param": "无功给定值：,控制速度：",
                        "Des": {}
                },
                "1_4": {
                    "Type": "1",
                        "Flag": "4",
                        "IsSc": "0",
                        "Descr": "取消无功",
                        "Param": "",
                        "Des": {}
                },
                "0_100": {
                    "Type": "0",
                        "Flag": "100",
                        "IsSc": "0",
                        "Descr": "锁定控制",
                        "Param": "",
                        "Des": {}
                },
                "0_101": {
                    "Type": "0",
                        "Flag": "101",
                        "IsSc": "0",
                        "Descr": "解除锁定",
                        "Param": "",
                        "Des": {}
                },
                "1_7": {
                    "Type": "1",
                        "Flag": "7",
                        "IsSc": "0",
                        "Descr": "具体值限功率控制",
                        "Param": "限制具体值：,控制速度：",
                        "Des": {}
                },
                "1_8": {
                    "Type": "1",
                        "Flag": "8",
                        "IsSc": "0",
                        "Descr": "具体值取消限功率",
                        "Param": "",
                        "Des": {}
                }
            },
            "pkscs": {},
            "nms": {
                "WTUR.PwrAt.Ra.F32": {
                    "min": "0",
                        "max": "1700"
                }
            }
        }
    },
    "encs": {},
    "cpw": "false",
        "dis": {
        "WTUR.WSpd.Ra.F32": {
            "name": "风速",
                "sn": "",
                "max": "25",
                "min": "0",
                "unit": "m/s",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WTUR.WSpd.Ra.F32",
                "coeff": "1",
                "sort": "1",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WTUR.PwrAt.Ra.F32": {
            "name": "变流器有功功率",
                "sn": "",
                "max": "1700",
                "min": "0",
                "unit": "kW",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WTUR.PwrAt.Ra.F32",
                "coeff": "1",
                "sort": "10",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WTGS.PPV.Ra.F32.A": {
            "name": "网侧A相电压",
                "sn": "",
                "max": "500",
                "min": "0",
                "unit": "VAC",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WTGS.PPV.Ra.F32.A",
                "coeff": "1",
                "sort": "-1",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WTGS.PPV.Ra.F32.B": {
            "name": "网侧B相电压",
                "sn": "",
                "max": "500",
                "min": "0",
                "unit": "VAC",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WTGS.PPV.Ra.F32.B",
                "coeff": "1",
                "sort": "-1",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WTGS.PPV.Ra.F32.C": {
            "name": "网侧C相电压",
                "sn": "",
                "max": "500",
                "min": "0",
                "unit": "VAC",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WTGS.PPV.Ra.F32.C",
                "coeff": "1",
                "sort": "-1",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WTGS.AC.Ra.F32.A": {
            "name": "网侧A相电流",
                "sn": "",
                "max": "1800",
                "min": "0",
                "unit": "A",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WTGS.AC.Ra.F32.A",
                "coeff": "1",
                "sort": "-1",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WTGS.AC.Ra.F32.B": {
            "name": "网侧B相电流",
                "sn": "",
                "max": "1800",
                "min": "0",
                "unit": "A",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WTGS.AC.Ra.F32.B",
                "coeff": "1",
                "sort": "-1",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WTGS.AC.Ra.F32.C": {
            "name": "网侧C相电流",
                "sn": "",
                "max": "1800",
                "min": "0",
                "unit": "A",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WTGS.AC.Ra.F32.C",
                "coeff": "1",
                "sort": "-1",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WTGS.HZ.Ra.F32": {
            "name": "网侧频率",
                "sn": "",
                "max": "61",
                "min": "47.5",
                "unit": "Hz",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WTGS.HZ.Ra.F32",
                "coeff": "1",
                "sort": "125",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WTGS.PF.Ra.F32": {
            "name": "功率因数",
                "sn": "",
                "max": "1.5",
                "min": "-1.5",
                "unit": "",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WTGS.PF.Ra.F32",
                "coeff": "1",
                "sort": "540",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WROT.Spd.Ra.F32": {
            "name": "叶轮转速",
                "sn": "",
                "max": "50",
                "min": "0",
                "unit": "rpm",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WROT.Spd.Ra.F32",
                "coeff": "1",
                "sort": "",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WGEN.Spd.Ra.F32": {
            "name": "发电机转速瞬时值",
                "sn": "",
                "max": "22",
                "min": "0",
                "unit": "rpm",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WGEN.Spd.Ra.F32",
                "coeff": "1",
                "sort": "235",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WTUR.Wdir.Ra.F32": {
            "name": "风向角",
                "sn": "",
                "max": "360",
                "min": "-360",
                "unit": "°",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WTUR.Wdir.Ra.F32",
                "coeff": "1",
                "sort": "110",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WTUR.PwrReact.Ra.F32": {
            "name": "变流器无功功率",
                "sn": "",
                "max": "600",
                "min": "-600",
                "unit": "kVar",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WTUR.PwrReact.Ra.F32",
                "coeff": "1",
                "sort": "-1",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WYAW.Wdir.Ra.F32": {
            "name": "对风角度",
                "sn": "",
                "max": "180",
                "min": "-180",
                "unit": "°",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WYAW.Wdir.Ra.F32",
                "coeff": "1",
                "sort": "500",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WYAW.Posi.Ra.F32": {
            "name": "偏航位置",
                "sn": "",
                "max": "800",
                "min": "-800",
                "unit": "°",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WYAW.Posi.Ra.F32",
                "coeff": "1",
                "sort": "515",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WTPS.Temp.Ra.F32.Pbox1": {
            "name": "1#变桨柜体温度",
                "sn": "",
                "max": "200",
                "min": "-60",
                "unit": "°C",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WTPS.Temp.Ra.F32.Pbox1",
                "coeff": "1",
                "sort": "425",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WTPS.Temp.Ra.F32.Pbox2": {
            "name": "2#变桨柜体温度",
                "sn": "",
                "max": "200",
                "min": "-60",
                "unit": "°C",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WTPS.Temp.Ra.F32.Pbox2",
                "coeff": "1",
                "sort": "430",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WTPS.Temp.Ra.F32.Pbox3": {
            "name": "3#变桨柜体温度",
                "sn": "",
                "max": "200",
                "min": "-60",
                "unit": "°C",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WTPS.Temp.Ra.F32.Pbox3",
                "coeff": "1",
                "sort": "435",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WTPS.Ang.Ra.F32.blade1": {
            "name": "1#变桨桨距角",
                "sn": "",
                "max": "90",
                "min": "0",
                "unit": "°",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WTPS.Ang.Ra.F32.blade1",
                "coeff": "1",
                "sort": "-1",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WTPS.Ang.Ra.F32.blade2": {
            "name": "2#变桨桨距角",
                "sn": "",
                "max": "90",
                "min": "0",
                "unit": "°",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WTPS.Ang.Ra.F32.blade2",
                "coeff": "1",
                "sort": "-1",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WTPS.Ang.Ra.F32.blade3": {
            "name": "3#变桨桨距角",
                "sn": "",
                "max": "90",
                "min": "0",
                "unit": "°",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WTPS.Ang.Ra.F32.blade3",
                "coeff": "1",
                "sort": "-1",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WTPS.Temp.Ra.F32.gen1": {
            "name": "1#变桨电机温度",
                "sn": "",
                "max": "200",
                "min": "-60",
                "unit": "°C",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WTPS.Temp.Ra.F32.gen1",
                "coeff": "1",
                "sort": "395",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WTPS.Temp.Ra.F32.gen2": {
            "name": "2#变桨电机温度",
                "sn": "",
                "max": "200",
                "min": "-60",
                "unit": "°C",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WTPS.Temp.Ra.F32.gen2",
                "coeff": "1",
                "sort": "400",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WTPS.Temp.Ra.F32.gen3": {
            "name": "3#变桨电机温度",
                "sn": "",
                "max": "200",
                "min": "-60",
                "unit": "°C",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WTPS.Temp.Ra.F32.gen3",
                "coeff": "1",
                "sort": "405",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WTPS.Temp.Ra.F32.inverter1": {
            "name": "1#变桨逆变器温度",
                "sn": "",
                "max": "200",
                "min": "-60",
                "unit": "°C",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WTPS.Temp.Ra.F32.inverter1",
                "coeff": "1",
                "sort": "410",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WTPS.Temp.Ra.F32.inverter2": {
            "name": "2#变桨逆变器温度",
                "sn": "",
                "max": "200",
                "min": "-60",
                "unit": "°C",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WTPS.Temp.Ra.F32.inverter2",
                "coeff": "1",
                "sort": "415",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WTPS.Temp.Ra.F32.inverter3": {
            "name": "3#变桨逆变器温度",
                "sn": "",
                "max": "200",
                "min": "-60",
                "unit": "°C",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WTPS.Temp.Ra.F32.inverter3",
                "coeff": "1",
                "sort": "420",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WTUR.Temp.Ra.F32": {
            "name": "环境温度",
                "sn": "",
                "max": "60",
                "min": "-60",
                "unit": "°C",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WTUR.Temp.Ra.F32",
                "coeff": "1",
                "sort": "30",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WNAC.Temp.Ra.F32": {
            "name": "机舱温度",
                "sn": "",
                "max": "60",
                "min": "-60",
                "unit": "°C",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WNAC.Temp.Ra.F32",
                "coeff": "1",
                "sort": "255",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "WGEN.Temp.Ra.F32.1": {
            "name": "发电机温度1",
                "sn": "",
                "max": "120",
                "min": "-40",
                "unit": "°C",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "System.Decimal",
                "pk": "PP",
                "df": "",
                "path": "WGEN.Temp.Ra.F32.1",
                "coeff": "1",
                "sort": "180",
                "color": "",
                "ps": [
                "0",
                ""
            ]
        },
        "DayEgyAt": {
            "name": "日发电量",
                "sn": "",
                "max": "",
                "min": "",
                "unit": "万kWh",
                "trgop": "",
                "place": "1",
                "ce": "0",
                "type": "",
                "pk": "",
                "df": "",
                "path": "",
                "coeff": "0.0001",
                "sort": "",
                "color": "",
                "ps": []
        },
        "MonthEgyAt": {
            "name": "月发电量",
                "sn": "",
                "max": "",
                "min": "",
                "unit": "万kWh",
                "trgop": "",
                "place": "1",
                "ce": "0",
                "type": "",
                "pk": "",
                "df": "",
                "path": "",
                "coeff": "0.0001",
                "sort": "",
                "color": "",
                "ps": []
        },
        "YearEgyAt": {
            "name": "年发电量",
                "sn": "",
                "max": "",
                "min": "",
                "unit": "万kWh",
                "trgop": "",
                "place": "1",
                "ce": "0",
                "type": "",
                "pk": "",
                "df": "",
                "path": "",
                "coeff": "0.0001",
                "sort": "",
                "color": "",
                "ps": []
        },
        "TotalEgyAt": {
            "name": "总发电量",
                "sn": "",
                "max": "",
                "min": "",
                "unit": "万kWh",
                "trgop": "",
                "place": "1",
                "ce": "0",
                "type": "",
                "pk": "",
                "df": "",
                "path": "",
                "coeff": "0.0001",
                "sort": "",
                "color": "",
                "ps": []
        },
        "CurDayPowerCurve": {
            "name": "当日24小时功率曲线",
                "sn": "",
                "max": "",
                "min": "",
                "unit": "kW",
                "trgop": "",
                "place": "2",
                "ce": "0",
                "type": "",
                "pk": "",
                "df": "",
                "path": "",
                "coeff": "1",
                "sort": "",
                "color": "",
                "ps": []
        },
        "CurDayWindSpeedCurve_Device": {
            "name": "设备当日风速曲线(0点起)",
                "sn": "",
                "max": "",
                "min": "",
                "unit": "m/s",
                "trgop": "",
                "place": "0",
                "ce": "0",
                "type": "",
                "pk": "",
                "df": "",
                "path": "",
                "coeff": "1",
                "sort": "",
                "color": "",
                "ps": []
        },
        "WTDeviceFault": {
            "name": "设备故障",
                "sn": "",
                "max": "",
                "min": "",
                "unit": "",
                "trgop": "",
                "place": "0",
                "ce": "0",
                "type": "",
                "pk": "",
                "df": "",
                "path": "",
                "coeff": "1",
                "sort": "",
                "color": "",
                "ps": []
        },
        "DevStatusQuery": {
            "name": "设备状态查询",
                "sn": "",
                "max": "",
                "min": "",
                "unit": "",
                "trgop": "",
                "place": "0",
                "ce": "0",
                "type": "",
                "pk": "",
                "df": "",
                "path": "",
                "coeff": "1",
                "sort": "",
                "color": "",
                "ps": []
        },
        "StatusCode": {
            "name": "",
                "sn": "",
                "max": "",
                "min": "",
                "unit": "",
                "trgop": "",
                "place": "0",
                "ce": "0",
                "type": "",
                "pk": "",
                "df": "",
                "path": "",
                "coeff": "1",
                "sort": "",
                "color": "",
                "ps": []
        }
    },
    "lgs": {
        "datapoint": "数据点",
            "transpose": "行列互换",
            "cgs": "列分组数:",
            "initdevice": "初始化设备数据...",
            "Psdive": "请从设备树选择设备!",
            "Gdbsd": "正在根据设备获取信息点...",
            "baseon": "基于",
            "protocol": "协议",
            "OK": "确  定"
    },
    "cus": {
        "bgrepeat": "no-repeat",
            "bgattachment": "fixed",
            "bgcolor": "#000"
    },
    "mks": {
        "29501122-F6AE-1BDB-4227-FE92794A7145": {
            "Widths": {},
            "Fixes": {},
            "Orders": {}
        }
    },
    "pas": {},
    "guid": ""
}
}