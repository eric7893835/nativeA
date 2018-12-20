import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
export default class LeftMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <View style={styles.leftNav}>
                <Text style={styles.title}>星座运势</Text>
                <View style={styles.conItem}>
                    <Text style={[styles.iconStyle, {fontSize: 20}]}>&#xe60b;</Text>
                    <TouchableHighlight onPress={()=>{this.props.changeShowByLeftMenu({name:"白羊座",time:"03.21—04.19",imgIndex:3})}}>
                        <Text style={styles.constellationName}>白羊座 03.21—04.19</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.conItem}>
                    <Text style={[styles.iconStyle, {fontSize: 20}]}>&#xe60a;</Text>
                    <TouchableHighlight onPress={()=>{this.props.changeShowByLeftMenu({name:"金牛座",time:"04.20—05.20",imgIndex:4})}}>
                        <Text style={styles.constellationName}>金牛座 04.20—05.20</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.conItem}>
                    <Text style={[styles.iconStyle, {fontSize: 20}]}>&#xe607;</Text>
                    <TouchableHighlight onPress={()=>{this.props.changeShowByLeftMenu({name:"双子座",time:"05.21—06.21",imgIndex:5})}}>
                        <Text style={styles.constellationName}>双子座 05.21—06.21</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.conItem}>
                    <Text style={[styles.iconStyle, {fontSize: 20}]}>&#xe605;</Text>
                    <TouchableHighlight onPress={()=>{this.props.changeShowByLeftMenu({name:"巨蟹座",time:"06.22—07.22",imgIndex:6})}}>
                        <Text style={styles.constellationName}>巨蟹座 06.22—07.22</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.conItem}>
                    <Text style={[styles.iconStyle, {fontSize: 20}]}>&#xe604;</Text>
                    <TouchableHighlight onPress={()=>{this.props.changeShowByLeftMenu({name:"狮子座",time:"07.23—08.22",imgIndex:7})}}>
                        <Text style={styles.constellationName}>狮子座 07.23—08.22</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.conItem}>
                    <Text style={[styles.iconStyle, {fontSize: 20}]}>&#xe609;</Text>
                    <TouchableHighlight onPress={()=>{this.props.changeShowByLeftMenu({name:"处女座",time:"08.23—09.22",imgIndex:8})}}>
                        <Text style={styles.constellationName}>处女座 08.23—09.22</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.conItem}>
                    <Text style={[styles.iconStyle, {fontSize: 20}]}>&#xe60c;</Text>
                    <TouchableHighlight onPress={()=>{this.props.changeShowByLeftMenu({name:"天秤座",time:"09.23—10.23",imgIndex:9})}}>
                        <Text style={styles.constellationName}>天秤座 09.23—10.23</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.conItem}>
                    <Text style={[styles.iconStyle, {fontSize: 20}]}>&#xe60e;</Text>
                    <TouchableHighlight onPress={()=>{this.props.changeShowByLeftMenu({name:"天蝎座",time:"10.24—11.22",imgIndex:10})}}>
                        <Text style={styles.constellationName}>天蝎座 10.24—11.22</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.conItem}>
                    <Text style={[styles.iconStyle, {fontSize: 20}]}>&#xe606;</Text>
                    <TouchableHighlight onPress={()=>{this.props.changeShowByLeftMenu({name:"射手座",time:"11.23—12.21",imgIndex:11})}}>
                        <Text style={styles.constellationName}>射手座 11.23—12.21</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.conItem}>
                    <Text style={[styles.iconStyle, {fontSize: 20}]}>&#xe608;</Text>
                    <TouchableHighlight onPress={()=>{this.props.changeShowByLeftMenu({name:"魔羯座",time:"12.22—01.19",imgIndex:0})}}>
                        <Text style={styles.constellationName}>魔羯座 12.22—01.19</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.conItem}>
                    <Text style={[styles.iconStyle, {fontSize: 20}]}>&#xe60d;</Text>
                    <TouchableHighlight onPress={()=>{this.props.changeShowByLeftMenu({name:"水瓶座",time:"01.20—02.18",imgIndex:1})}}>
                        <Text style={styles.constellationName}>水瓶座 01.20—02.18</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.conItem}>
                    <Text style={[styles.iconStyle, {fontSize: 20}]}>&#xe603;</Text>
                    <TouchableHighlight onPress={()=>{this.props.changeShowByLeftMenu({name:"双鱼座",time:"02.19—03.02",imgIndex:2})}}>
                        <Text style={styles.constellationName}>双鱼座 02.19—03.02</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    leftNav: {
        flex:1,
        backgroundColor: "#000"
    },
    title:{
        height: 45,
        lineHeight:45,
        borderColor:"#999",
        borderBottomWidth: 0.5,
        textAlign:"center",
        fontSize:16,
        fontWeight:"bold",
        color:"#999"
    },
    conItem:{
        borderBottomWidth:0.5,
        borderColor:"#999",
        height:35,
        flexDirection:"row",
        alignItems:"center",
        paddingLeft:5
    },
    iconStyle:{
        fontFamily: 'iconfont',
        fontSize: 14,
        color:"#999"
    },
    constellationName:{
        marginLeft:5,
        color:"#999",
    }

});
