import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { button2 } from '../common/button'
import petlogo from '../../assets/peakpx.jpg'
import { FontAwesome } from '@expo/vector-icons';
// import {Ionicon} from

const MainScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
    <Image style={styles.logoimg} source={petlogo}></Image>
      <Text style={styles.head}>Find <Text style={{color:'gold'}}>Your Dream</Text></Text>
      <Text></Text>
      <Text style={styles.head}>Pet With Us</Text>
      <Text style={styles.head1}>Join and discover best pets in your nearest location.</Text>
      <Text style={button2}
      onPress={()=>navigation.navigate('Welcome')}
      >  Get Started</Text>
      <FontAwesome name="paw" size={22} color="orangered" style={styles.searchIcon} />
  
    </View>
  )
}

export default MainScreen

const styles = StyleSheet.create({
    container:{
        height:'100%',
        width:'100%',
        // backgroundColor:"purple",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    head:{
        color:'white',
        fontSize:53,
        top:-135,
        fontWeight:'bold',
        textAlign:'justify',
        fontFamily:'serif'
    },
    head1:{
        color:'white',
        textAlign:'center',
        top:-60,
        fontSize:22,
    },
    logoimg:{
        position:'absolute',
        // top:0,
        width:'100%',
        height:'100%',
      },
      searchIcon: {
        top:'17.2%',
        marginRight: 30,
        marginLeft: '-21%',
      },
})