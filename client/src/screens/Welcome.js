import { StyleSheet, Text, View, Image,button} from 'react-native'
import React from 'react'
// import Logo from '../../assets/background-1.jpg'
import logo_img from '../../assets/Logo_pet.png'
import { button1 } from '../common/button'

const Welcome = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* <Image style={styles.logoimg} source={Logo} /> */}
      {/* <Text style={styles.head}>Welcome</Text> */}
      <View style={styles.container1}>
      <Image style={styles.logoimg2} source={logo_img} />
<Text></Text>
{/* <Text></Text>
      <Text style={styles.head1}>Welcome</Text>
      <Text style={styles.head}>To</Text>
      <Text style={styles.head}>Pet's World</Text> */}
<Text></Text>
      <Text style={styles.button}
      onPress={()=>navigation.navigate('User')}
      >USER</Text>
      <Text style={styles.button}
      onPress={()=>navigation.navigate('AdminLogin')}
      >ADMIN</Text>
      </View>
      
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container:{
    width:"100%",
    height:"100%",
    backgroundColor:"white"
  },
  // logoimg:{
  //   position:'absolute',
  //   top:0,
  //   width:'100%',
  //   height:'100%',
  //   resizeMode:'cover',
  //   // resizeMode:'stretch',
  // },
  // head:{
  //   color:'white',
  //   fontSize:45,
  //   marginVertical:8,
  //   fontWeight:'bold',
  //   textAlign:'center',
  //   fontFamily:'serif',
  // },
  logoimg2:{
    position:'absolute',
    top:'-20%',
    // top:100,
    width:'123%',
    resizeMode:'center',
    height:'100%',
  },
  button:{
    backgroundColor:'#0a7e8c',
    color:'white',
    padding:10,
    borderRadius:50,
    // borderLeftColor:'red',
    top:'10%',
    minWidth:160,
    textAlign:'center',
    marginTop:10,
    fontWeight:'bold',
    fontSize:22,
},
  // head1:{
  //   color:'white',
  //   top:-20,
  //   fontSize:65,
  //   fontWeight:'bold',
  //   textAlign:'center',
  // },
  container1:{
    marginTop:75,
    display:'flex ',
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    height:'100%',
  }
})