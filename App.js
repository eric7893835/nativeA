/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    ScrollView,
    AppRegistry,
    TouchableHighlight
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {getAstro} from './lib/getConstellation'; //获取星座时间名称，下标的
import SideMenu from 'react-native-side-menu'; //滑动菜单
import LeftMenu from './module/LeftMenu'; //左边菜单

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
    // 构造
    constructor(props) {
        super(props);

        var date = new Date();
        var month = date.getMonth()+1;
        var day = date.getDate();

        var resultInfo = getAstro(month,day);

        // 初始状态
        this.state = {
            name:resultInfo.name,
            time:resultInfo.time,
            imgName:resultInfo.imgName,
            imgIndex:resultInfo.imgIndex,
            selectIndex:0,
            isOpen:false,
            todayData:{},
            weekDayData:{},
            monthDayData:{},
            yearDayData:{}
        };

        this.SelectMenuItemCallBack = this.SelectMenuItemCallBack.bind(this);
        this.changeShowByLeftMenu = this.changeShowByLeftMenu.bind(this);
        this.loadDataByNameAndType = this.loadDataByNameAndType.bind(this);
    }

    handleSelect (index,value){
        this.setState({
            selectIndex: index
            }
        );
        var type = {
            "0":"today",
            "1":"week",
            "2":"month",
            "3":"year"
        }[index];

        this.loadDataByNameAndType(this.state.name,type);
    }

    componentWillMount() {
        var url = 'http://web.juhe.cn:8080/constellation/getAll?consName='+this.state.name+'&type=today&key=77a874cb3784d0256eab62c702de668d';
        fetch(url, {
            method: 'get',
            mode: "cors"
        }).then((response) => {
                return response.json();
            })
            .then((responseData) => {       // 获取到的数据处理
                this.setState({
                    todayData:responseData
                });
            })
            .catch((error) => { // 错误处理
                console.warn("error",error);
            })
    }

    //传递给子组件的props
    changeShowByLeftMenu(data){
        var _this = this;
        this.setState({
            name:data.name,
            time:data.time,
            imgIndex:data.imgIndex,
        },function(){
            var type = {
                "0":"today",
                "1":"week",
                "2":"month",
                "3":"year"
            }[_this.state.selectIndex];
            _this.loadDataByNameAndType(_this.state.name,type);
        });
    }

    //点击侧边栏的按钮，回调此函数，关闭menu
    SelectMenuItemCallBack(){
        this.setState({
            isOpen:!this.state.isOpen,
        })
    }

    loadDataByNameAndType(name,type){
        var url = 'http://web.juhe.cn:8080/constellation/getAll?consName='+name+'&type='+type+'&key=77a874cb3784d0256eab62c702de668d';
        var labelValue = {
            "today":"todayData",
            "week":"weekDayData",
            "month":"monthDayData",
            "year":"yearDayData"
        }[type];

        fetch(url, {
            method: 'get',
            mode: "cors"
        }).then((response) => {
            return response.json();
        }).then((responseData) => {       // 获取到的数据处理
            this.setState({
                [labelValue]:responseData
            });
        }).catch((error) => { // 错误处理
            console.warn("error",error);
        })
    }
    static defaultProps = {
        arr:[
            require('./imgs/Capricornus.png'),
            require('./imgs/aquarius.png'),
            require('./imgs/Pisces.png'),
            require('./imgs/Aries.png'),
            require('./imgs/Taurus.png'),
            require('./imgs/Gemini.png'),
            require('./imgs/Cancer.png'),
            require('./imgs/Leo.png'),
            require('./imgs/virgo.png'),
            require('./imgs/libra.png'),
            require('./imgs/scorpio.png'),
            require('./imgs/sagittarius.png')
        ]
    }
    render() {
        return (
            <SideMenu
                menu={<LeftMenu changeShowByLeftMenu={this.changeShowByLeftMenu}/>}
                menuPosition={'left'}//侧边栏是左边还是右边
                openMenuOffset={180}//侧边栏的宽度
                edgeHitWidth={200}//手指拖动可以打开侧边栏的距离（距离侧边栏）
                isOpen={this.state.isOpen}
                onChange={(isOpen)=>{
                    this.setState({
                        isOpen:isOpen,
                    })
                }}
            >
                <View style={{ flex: 1 }}>
                    <ImageBackground
                        source={require('./imgs/bg.png')} style={styles.bgWrap} resizeMode='cover'>
                        <View style={styles.headerWrap}>
                            <View style={styles.headerItem}>
                                <TouchableHighlight onPress={this.SelectMenuItemCallBack}>
                                    <Text style={[styles.iconStyle, {fontSize: 20}]}>&#xe622;</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.headerItem}>
                                <Text style={styles.textCenter}>星座运势</Text>
                            </View>
                            <View style={styles.headerItem}>
                                <Text style={[styles.iconStyle, {fontSize: 20}, styles.textRight]}>&#xe600;</Text>
                            </View>
                        </View>
                        <ScrollView>
                            {/*主要内容*/}
                            <View style={styles.mainWrap}>
                                <View style={styles.picWrap}>
                                    {/*<Image source={require('./imgs/virgo.png')} style={styles.vBox}/>*/}
                                    <Image source={this.props.arr[this.state.imgIndex]} style={styles.vBox}/>
                                </View>
                                <View style={styles.nameBox}>
                                    <Text style={styles.name}>{this.state.name}</Text>
                                </View>
                                <View style={styles.timeBox}>
                                    <Text style={styles.time}>{this.state.time}</Text>
                                </View>
                                {/*下拉框*/}
                            </View>
                            <View style={styles.dropdownWrap}>
                                <ModalDropdown defaultValue='今日运势' textStyle={styles.textStyle} dropdownStyle={styles.dropdownStyle} dropdownTextStyle={[{textAlign:'center',fontSize:15}]} options={['今日运势','本周运势','本月运势','今年运势']} onSelect={this.handleSelect.bind(this)}/>
                            </View>
                            {
                                this.state.selectIndex == 0 ? <View style={styles.dayWrap}>
                                    <View style={styles.dayIndexWrap}>
                                        <View style={styles.dayIndex}>
                                            <Text style={styles.indexText}>综合指数:{this.state.todayData.all}</Text>
                                            <Text style={styles.indexText}>健康指数:{this.state.todayData.health}</Text>
                                        </View>
                                        <View  style={styles.dayIndex}>
                                            <Text style={styles.indexText}>爱情指数:{this.state.todayData.love}</Text>
                                            <Text style={styles.indexText}>财运指数:{this.state.todayData.money}</Text>
                                        </View>
                                        <View  style={styles.dayIndex}>
                                            <Text style={styles.indexText}>工作指数:{this.state.todayData.work}</Text>
                                            <Text style={styles.indexText}>幸运数字:{this.state.todayData.number}</Text>
                                        </View>
                                        <View  style={styles.dayIndex}>
                                            <Text style={styles.indexText}>速配星座:{this.state.todayData.QFriend}</Text>
                                            <Text style={styles.indexText}>幸运颜色:{this.state.todayData.color}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.descWrap}>
                                        <Text style={styles.subTitle}>今日概述</Text>
                                        <Text style={styles.desc}>
                                            {this.state.todayData.summary}
                                        </Text>
                                    </View>
                                </View> : this.state.selectIndex == 1 ? <View style={styles.weekWrap}>
                                    <View style={styles.descWrap}>
                                        <Text style={styles.subTitle}>健康</Text>
                                        <Text style={styles.desc}>
                                            {this.state.weekDayData.health || "需要等几天才有详细的信息哦(#^.^#)"}
                                        </Text>
                                        <Text style={styles.subTitle}>求职</Text>
                                        <Text style={styles.desc}>
                                            {this.state.weekDayData.job || "需要等几天才有详细的信息哦(#^.^#)"}
                                        </Text>
                                        <Text style={styles.subTitle}>恋情</Text>
                                        <Text style={styles.desc}>
                                            {this.state.weekDayData.love || "需要等几天才有详细的信息哦(#^.^#)"}
                                        </Text>
                                        <Text style={styles.subTitle}>财运</Text>
                                        <Text style={styles.desc}>
                                            {this.state.weekDayData.money || "需要等几天才有详细的信息哦(#^.^#)"}
                                        </Text>
                                        <Text style={styles.subTitle}>工作</Text>
                                        <Text style={styles.desc}>
                                            {this.state.weekDayData.work || "需要等几天才有详细的信息哦(#^.^#)"}
                                        </Text>
                                    </View>
                                </View> : this.state.selectIndex == 2 ? <View style={styles.monthWrap}>
                                    <View style={styles.descWrap}>
                                        <Text style={styles.subTitle}>综合运势</Text>
                                        <Text style={styles.desc}>
                                            {this.state.monthDayData.all || "需要等几天才有详细的信息哦(#^.^#)"}
                                        </Text>
                                        <Text style={styles.subTitle}>爱情运势</Text>
                                        <Text style={styles.desc}>
                                            {this.state.monthDayData.love || "需要等几天才有详细的信息哦(#^.^#)" }
                                        </Text>
                                        <Text style={styles.subTitle}>财运运势</Text>
                                        <Text style={styles.desc}>
                                            {this.state.monthDayData.money || "需要等几天才有详细的信息哦(#^.^#)"}
                                        </Text>
                                        <Text style={styles.subTitle}>工作运势</Text>
                                        <Text style={styles.desc}>
                                            {this.state.monthDayData.work || "需要等几天才有详细的信息哦(#^.^#)"}
                                        </Text>
                                    </View>
                                </View> : this.state.selectIndex == 3 ? <View style={styles.yearWrap}>
                                    <View style={styles.descWrap}>
                                        <Text style={styles.subTitle}>概述</Text>
                                        <Text style={styles.desc}>
                                            {this.state.yearDayData.mima && this.state.yearDayData.mima.info}
                                        </Text>
                                        {
                                            this.state.yearDayData.mima && this.state.yearDayData.mima.text && this.state.yearDayData.mima.text.length >=1 &&this.state.yearDayData.mima.text.map(function(data,index){
                                                return (
                                                    <Text style={styles.desc} key={index}>
                                                        {data}
                                                    </Text>
                                                )
                                            })
                                        }
                                        <Text style={styles.subTitle}>事业运</Text>
                                        {
                                            this.state.yearDayData.career && this.state.yearDayData.career.length>=1 && this.state.yearDayData.career.map(function(data,index){
                                                return (
                                                    <Text style={styles.desc} key={index}>
                                                        {data}
                                                    </Text>
                                                )
                                            })
                                        }
                                        <Text style={styles.subTitle}>感情运</Text>
                                        {
                                            this.state.yearDayData.love && this.state.yearDayData.love.length>=1 && this.state.yearDayData.love.map(function(data,index){
                                                return (
                                                    <Text style={styles.desc} key={index}>
                                                        {data}
                                                    </Text>
                                                )
                                            })
                                        }
                                        <Text style={styles.subTitle}>财运</Text>
                                        {
                                            this.state.yearDayData.finance && this.state.yearDayData.finance.length>=1 && this.state.yearDayData.finance.map(function(data,index){
                                                return (
                                                    <Text style={styles.desc} key={index}>
                                                        {data}
                                                    </Text>
                                                )
                                            })
                                        }
                                    </View>
                                </View> : null
                            }
                        </ScrollView>
                    </ImageBackground>
                </View>
            </SideMenu>
        );
    }
}

const styles = StyleSheet.create({
    bgWrap: {
        flex:1,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerWrap: {
        height: 45,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#d6d7da',
        flexDirection: 'row',
    },
    headerItem: {
        flex: 1,
        justifyContent: 'space-between'
    },
    mainWrap: {
        height:262,
        alignItems: 'center'
    },
    picWrap: {
        marginTop: 20,
        height: 180,
        width: 180,
        borderColor: '#5B5D5E',
        borderWidth: 1,
        borderRadius: 90,
        alignItems: 'center',
        justifyContent: 'center'
    },
    vBox: {
        height: 170,
        width: 170,
        borderRadius: 85,
    },
    nameBox: {
        marginTop: 15,
    },
    name: {
        fontSize: 18
    },
    timeBox: {
        marginTop: 2
    },
    time: {
        fontSize: 10
    },
    dropdownWrap:{
        paddingLeft:25
    },
    textStyle:{
        height:30,
        width:108,
        textAlign:'center',
        lineHeight:30,
        borderRadius:5,
        backgroundColor:'#fff',
        borderWidth:0.5,
        fontSize:15,
        borderColor:'#ccc',
    },
    dropdownStyle:{
        width:108
    },
    iconStyle: {
        fontFamily: 'iconfont',
        fontSize: 16
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    textCenter: {
        textAlign: 'center',
        fontSize:16,
        fontWeight:"bold"
    },
    textRight: {
        textAlign: 'right'
    },
    dayWrap:{
        flex:1,
        marginTop:10,
        paddingLeft:25,
        paddingRight:25
    },
    dayIndex:{
        flexDirection: 'row',
        borderBottomWidth:0.5,
        borderColor:"#000",
        height:30
    },
    indexText:{
        flex:1,
        lineHeight:30,
    },
    descWrap:{
        marginTop:10,
    },
    subTitle:{
        fontSize:14,
        marginBottom:5,
        fontWeight:"bold"
    },
    desc:{
        lineHeight:20,
        marginBottom:3,
    },
    weekWrap:{
        flex:1,
        marginTop:10,
        paddingLeft:25,
        paddingRight:25
    },
    monthWrap:{
        flex:1,
        marginTop:10,
        paddingLeft:25,
        paddingRight:25
    },
    yearWrap:{
        flex:1,
        marginTop:10,
        paddingLeft:25,
        paddingRight:25
    }
});
