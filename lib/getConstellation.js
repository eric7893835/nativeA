import React, {Component} from 'react';

function getAstro(v_month, v_day) {
    v_month = parseInt(v_month, 10)
    v_day = parseInt(v_day, 10);

    if ((v_month == 12 && v_day >= 22)
        || (v_month == 1 && v_day <= 20)) {
        return {name:'魔羯座',time:'12.22—01.19',imgName:'Capricornus',imgIndex:0};
    }
    else if ((v_month == 1 && v_day >= 21)
        || (v_month == 2 && v_day <= 19)) {
        return {name:'水瓶座',time:'01.20—02.18',imgName:'aquarius',imgIndex:1};
    }
    else if ((v_month == 2 && v_day >= 20)
        || (v_month == 3 && v_day <= 20)) {
        return {name:'双鱼座',time:'02.19—03.02',imgName:'Pisces',imgIndex:2};
    }
    else if ((v_month == 3 && v_day >= 21)
        || (v_month == 4 && v_day <= 20)) {
        return {name:'白羊座',time:'03.21—04.19',imgName:'Aries',imgIndex:3};
    }
    else if ((v_month == 4 && v_day >= 21)
        || (v_month == 5 && v_day <= 21)) {
        return {name:'金牛座',time:'04.20—05.20',imgName:'Taurus',imgIndex:4};
    }
    else if ((v_month == 5 && v_day >= 22)
        || (v_month == 6 && v_day <= 21)) {
        return {name:'双子座',time:'05.21—06.21',imgName:'Gemini',imgIndex:5};
    }
    else if ((v_month == 6 && v_day >= 22)
        || (v_month == 7 && v_day <= 22)) {
        return {name:'巨蟹座',time:'06.22—07.22',imgName:'Cancer',imgIndex:6};
    }
    else if ((v_month == 7 && v_day >= 23)
        || (v_month == 8 && v_day <= 23)) {
        return {name:'狮子座',time:'07.23—08.22',imgName:'Leo',imgIndex:7};
    }
    else if ((v_month == 8 && v_day >= 24)
        || (v_month == 9 && v_day <= 23)) {
        return {name:'处女座',time:'08.23—09.22',imgName:'virgo',imgIndex:8};
    }
    else if ((v_month == 9 && v_day >= 24)
        || (v_month == 10 && v_day <= 23)) {
        return {name:'天秤座',time:'09.23—10.23',imgName:'libra',imgIndex:9};
    }
    else if ((v_month == 10 && v_day >= 24)
        || (v_month == 11 && v_day <= 22)) {
        return {name:'天蝎座',time:'10.24—11.22',imgName:'scorpio',imgIndex:10};
    }
    else if ((v_month == 11 && v_day >= 23)
        || (v_month == 12 && v_day <= 21)) {
        return {name:'射手座',time:'11.23—12.21',imgName:'sagittarius',imgIndex:11};
    }
    return "";
}

export {getAstro}
