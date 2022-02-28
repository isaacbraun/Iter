export const Colors = {
    background: "#fff",
    text: "#6F7371",
    blue: "#487CE1",
    green: "#1EA66D",
    red: "red",
    purple: "purple",
}

export function getLatLng(lat, lng) {
    return {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.06,
        longitudeDelta: 0.04,
    }
};

export const level_1_airports = {
    ZGGG : "Guangzhou Baiyun International Airport",
    KATL : "Hartsfield-Jackson Atlanta International Airport",
    // ZUUU : "Chengdu Shuangliu International Airport",
    KDFW : "Dallas/Fort Worth International Airport",
    ZBAA : "Beijing Capital International Airport",
    KDEN : "Denver International Airport",
    ZSSS : "Shanghai Hongqiao International Airport",
    RJTT : "Tokyo Haneda Airport",
    KORD : "O'Hare International Airport",
    KLAX : "Los Angeles International Airport",
    VIDP : "ndira Gandhi International Airport",
    OMDB : "Dubai International Airport",
    LTFM : "Istanbul Airport",
    MMMX : "Mexico City International Airport",
    // VVTS : "Tan Son Nhat International Airport",
    KMCO : "Orlando International Airport",
    SBGR : "São Paulo/Guarulhos International Airport",
    KSEA : "Seattle-Tacoma International Airport",
    UUEE : "Sheremetyevo International Airport",
    EDDF : "Frankfurt Airport",
    LEMD : "Madrid Barajas Airport",
    KJFK : "John F. Kennedy International Airport",
};

export const level_2_airports = {
    ZGGG : "Guangzhou Baiyun International Airport",
    KATL : "Hartsfield-Jackson Atlanta International Airport",
    ZUUU : "Chengdu Shuangliu International Airport",
    KDFW : "Dallas/Fort Worth International Airport",
    ZBAA : "Beijing Capital International Airport",
    KDEN : "Denver International Airport",
    ZPPP : "Kunming Changshui International Airport",
    ZSSS : "Shanghai Hongqiao International Airport",
    ZLXY : "Xi'an Xianyang International Airport",
    RJTT : "Tokyo Haneda Airport",
    KORD : "O'Hare International Airport",
    KLAX : "Los Angeles International Airport",
    VIDP : "ndira Gandhi International Airport",
    KCLT : "Charlotte Douglas International Airport",
    OMDB : "Dubai International Airport",
    LTFM : "Istanbul Airport",
    LFPG : "Charles de Gaulle Airport",
    EGLL : "Heathrow Airport",
    MMMX : "Mexico City International Airport",
    KPHX : "Phoenix Sky Harbor International Airport",
    VVTS : "Tan Son Nhat International Airport",
    KMCO : "Orlando International Airport",
    ZHCC : "Zhengzhou Xinzheng International Airport",
    RKPC : "Jeju International Airport",
    SBGR : "São Paulo/Guarulhos International Airport",
    KSEA : "Seattle-Tacoma International Airport",
    ZSNJ : "Nanjing Lukou International Airport",
    UUEE : "Sheremetyevo International Airport",
    ZGHA : "Changsha Huanghua International Airport",
    EDDF : "Frankfurt Airport",
    KIAH : "George Bush Intercontinental Airport",
    RKSS : "Gimpo International Airport",
    LEMD : "Madrid Barajas Airport",
    ZSAM : "Xiamen Gaoqi International Airport",
    VTBS : "Suvarnabhumi Airport",
    KJFK : "John F. Kennedy International Airport",
    KFLL : "Fort Lauderdale-Hollywood International Airport",
    KSFO : "San Francisco International Airport",
    // UUDD : "Moscow Domodedovo Airport",
    ZBAD : "Beijing Daxing International Airport"
};

export const level_3_airports = {
    ZGGG : "Guangzhou Baiyun International Airport",
    KATL : "Hartsfield-Jackson Atlanta International Airport",
    ZUUU : "Chengdu Shuangliu International Airport",
    KDFW : "Dallas/Fort Worth International Airport",
    ZGSZ : "Shenzhen Bao'an International Airport",
    // ZUCK : "Chongqing Jiangbei International Airport",
    ZBAA : "Beijing Capital International Airport",
    KDEN : "Denver International Airport",
    ZPPP : "Kunming Changshui International Airport",
    ZSSS : "Shanghai Hongqiao International Airport",
    ZLXY : "Xi'an Xianyang International Airport",
    RJTT : "Tokyo Haneda Airport",
    KORD : "O'Hare International Airport",
    // ZSPD : "Shanghai Pudong International Airport",
    KLAX : "Los Angeles International Airport",
    VIDP : "ndira Gandhi International Airport",
    // ZSHC : "Hangzhou Xiaoshan International Airport",
    KCLT : "Charlotte Douglas International Airport",
    OMDB : "Dubai International Airport",
    LTFM : "Istanbul Airport",
    LFPG : "Charles de Gaulle Airport",
    EGLL : "Heathrow Airport",
    MMMX : "Mexico City International Airport",
    KPHX : "Phoenix Sky Harbor International Airport",
    VVTS : "Tan Son Nhat International Airport",
    KMCO : "Orlando International Airport",
    ZHCC : "Zhengzhou Xinzheng International Airport",
    RKPC : "Jeju International Airport",
    EHAM : "Amsterdam Airport Schiphol",
    SBGR : "São Paulo/Guarulhos International Airport",
    KSEA : "Seattle-Tacoma International Airport",
    ZSNJ : "Nanjing Lukou International Airport",
    UUEE : "Sheremetyevo International Airport",
    ZGHA : "Changsha Huanghua International Airport",
    EDDF : "Frankfurt Airport",
    // KMIA : "Miami International Airport",
    KIAH : "George Bush Intercontinental Airport",
    RKSS : "Gimpo International Airport",
    LEMD : "Madrid Barajas Airport",
    ZSAM : "Xiamen Gaoqi International Airport",
    VTBS : "Suvarnabhumi Airport",
    KJFK : "John F. Kennedy International Airport",
    ZUGY : "Guiyang Longdongbao International Airport",
    ZJHK : "Haikou Meilan International Airport",
    KFLL : "Fort Lauderdale-Hollywood International Airport",
    KSFO : "San Francisco International Airport",
    ZBAD : "Beijing Daxing International Airport"
};

export const imageList = {
    "-DZ" : require('../assets/weather/-DZ.png'),
    "-DZRA" : require('../assets/weather/-DZRA.png'),
    "-FZDZ" : require('../assets/weather/-FZDZ.png'),
    "-FZDZ" : require('../assets/weather/-FZDZ.png'),
    "-GR" : require('../assets/weather/-GR.png'),
    "-RA" : require('../assets/weather/-RA.png'),
    "-RASN" : require('../assets/weather/-RASN.png'),
    "-SHRA" : require('../assets/weather/-SHRA.png'),
    "-SHRASN" : require('../assets/weather/-SHRASN.png'),
    "-SHSN" : require('../assets/weather/-SHSN.png'),
    "-SN" : require('../assets/weather/-SN.png'),
    "+DZ" : require('../assets/weather/+DZ.png'),
    "+FZDZ" : require('../assets/weather/+FZDZ.png'),
    "+FZRA" : require('../assets/weather/+FZRA.png'),
    "+RA" : require('../assets/weather/+RA.png'),
    "+RASN" : require('../assets/weather/+RASN.png'),
    "+SHRA" : require('../assets/weather/+SHRA.png'),
    "+SHRASN" : require('../assets/weather/+SHRASN.png'),
    "+SHSN" : require('../assets/weather/+SHSN.png'),
    '+SN' : require('../assets/weather/+SN.png'),
    '+SS' : require('../assets/weather/+SS.png'),
    '+TSRA' : require('../assets/weather/+TSRA.png'),
    'BCFG' : require('../assets/weather/BCFG.png'),
    'BLDU' : require('../assets/weather/BLDU.png'),
    'BLSA' : require('../assets/weather/BLSA.png'),
    'BLSN' : require('../assets/weather/BLSN.png'),
    'BR' : require('../assets/weather/BR.png'),
    'DRSN' : require('../assets/weather/DRSN.png'),
    'DU' : require('../assets/weather/DU.png'),
    'DZ' : require('../assets/weather/DZ.png'),
    'DZRA' : require('../assets/weather/DZRA.png'),
    'FC' : require('../assets/weather/FC.png'),
    'FG' : require('../assets/weather/FG.png'),
    'FU' : require('../assets/weather/FU.png'),
    'FZDZ' : require('../assets/weather/FZDZ.png'),
    'FZFG' : require('../assets/weather/FZFG.png'),
    'FZRA' : require('../assets/weather/FZRA.png'),
    'GR' : require('../assets/weather/GR.png'),
    'HZ' : require('../assets/weather/HZ.png'),
    'IC' : require('../assets/weather/IC.png'),
    'MIFG' : require('../assets/weather/MIFG.png'),
    'PE' : require('../assets/weather/PE.png'),
    'PL' : require('../assets/weather/PL.png'),
    'PO' : require('../assets/weather/PO.png'),
    'PRFG' : require('../assets/weather/PRFG.png'),
    'RA' : require('../assets/weather/RA.png'),
    'RASN' : require('../assets/weather/RASN.png'),
    'SA' : require('../assets/weather/SA.png'),
    'SG' : require('../assets/weather/SG.png'),
    'SHRA' : require('../assets/weather/SHRA.png'),
    'SHRASN' : require('../assets/weather/SHRASN.png'),
    'SN' : require('../assets/weather/SN.png'),
    'SQ' : require('../assets/weather/SQ.png'),
    'SS' : require('../assets/weather/SS.png'),
    'TS' : require('../assets/weather/TS.png'),
    'TSGR' : require('../assets/weather/TSGR.png'),
    'TSRA' : require('../assets/weather/TSRA.png'),
    'VA' : require('../assets/weather/VA.png'),
    'VCFG' : require('../assets/weather/VCFG.png'),
    'VCSH' : require('../assets/weather/VCSH.png'),
    'VCSS' : require('../assets/weather/VCSS.png'),
    'VCTS' : require('../assets/weather/VCTS.png'),
    'VIRGA' : require('../assets/weather/VIRGA.png'),
};

export const barbList = {
    5 : {

    },
    10 : {
        right: 10,
    },
    15 : {
        bottom: 5,
    },
    20 : {
        bottom: 5,
        right: 10,
    },
    25 : {
        bottom: 10,
    },
    30 : {
        bottom: 10,
        right: 10,
    },
    35 : {
        bottom: 15,
    },
    40 : {
        bottom: 15,
        right: 20,
    },
    45 : {
        bottom: 20,
    },
    50 : {
        bottom: 15,
        right: 20,
    },
    55 : {
        bottom: 15,
        right: 20,
    },
    60 : {
        bottom: 15,
        right: 20,
    },
    65 : {
        bottom: 15,
        right: 20,
    },
};