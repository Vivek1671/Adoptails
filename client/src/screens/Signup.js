import { StyleSheet, Text, View,Image, TextInput, Linking, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Logo from '../../assets/IMG-20231019-WA0020.jpg'
import { button1 } from '../common/button'
import { errormessage, formgroup, head1, head2, input, input2, label, link, link2 } from '../common/formcss'

const Signup = ({navigation}) => {

const [fdata, setFdate]=useState({
  name: '',
  email: '',
  password: '',
  cpassword: '',
  dob: '',
  phone:'',
  address: '',
})

const [errormsg, setErrormsg] = useState(null);

const Sendtobackend =()=>{
  // console.log(fdata);
  if(fdata.name == '' || fdata.email == '' || fdata.password == '' || fdata.cpassword == '' || fdata.dob =='' || fdata.address == '' || fdata.phone == ''){
    setErrormsg('All fields are required');
    return;
  }
  else{
    if(fdata.password != fdata.cpassword){
      setErrormsg('Password and Confirm Password must be same');
      return;
    }
    else{
      fetch('https://adoptails-server.onrender.com/signup',{
        method:'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify(fdata)
      })
      .then(res=>res.json()).then(
        data=>{
          // console.log(data);
          if(data.error){
            setErrormsg(data.error);
          }
            else{
              alert('Account Created Successfully');
              navigation.navigate('Login');
          }
        }
      )
    }
  }
}

  return (
    <View style={styles.container}>
          <Image style={styles.logoimg} source={Logo} />
      <View style={styles.container1}>
        <View style={styles.s1}>
          
        </View>
       <ScrollView style={styles.s2}>
          <Text style={head1}>Create a New Account</Text>
          <Text style={link2}>Already Registered? <Text style={link}
          onPress={()=>navigation.navigate('Login')}>
          Login here
        </Text></Text>
        {
          errormsg ? <Text style={errormessage}>{errormsg}</Text> : null
        }
        <View style={formgroup}>
          <Text style={label}>Name</Text>
          <TextInput style={input} placeholder='Enter your name' 
          placeholderTextColor="black"
          onPressIn={()=> setErrormsg(null)}
            onChangeText={(text) => setFdate({...fdata, name: text})}
          />
        </View>
        <View style={formgroup}>
          <Text style={label}>Email</Text>
          <TextInput style={input} placeholder='Enter your Email'
          placeholderTextColor="black"
          onPressIn={()=> setErrormsg(null)}
            onChangeText={(text) => setFdate({...fdata, email: text})}
          />
        </View>
        <View style={formgroup}>
          <Text style={label}>Phone</Text>
          <TextInput style={input} placeholder='Enter your Mobile Number'
          placeholderTextColor="black"
          onPressIn={()=> setErrormsg(null)}
            onChangeText={(number) => setFdate({...fdata, phone: number})}
          />
          </View>
        <View style={formgroup}>
          <Text style={label}>Dob</Text>
          <TextInput style={input} placeholder='Enter your Date of Birth'
          placeholderTextColor="black"
          onPressIn={()=> setErrormsg(null)}
            onChangeText={(text) => setFdate({...fdata, dob: text})}
          />
        </View>
        <View style={formgroup}>
          <Text style={label}>Password</Text>
          <TextInput style={input} placeholder='Enter your Password'
          placeholderTextColor="black"
          secureTextEntry={true}
          onPressIn={()=> setErrormsg(null)}
            onChangeText={(text) => setFdate({...fdata, password: text})}
          />
        </View>
        <View style={formgroup}>
          <Text style={label}>Confirm Password</Text>
          <TextInput style={input} placeholder='Confirm your Password'
          placeholderTextColor="black"
          secureTextEntry={true}
          onPressIn={()=> setErrormsg(null)}
            onChangeText={(text) => setFdate({...fdata, cpassword: text})}
          />
        </View>
        <View style={formgroup}>
          <Text style={label}>Address</Text>
          <TextInput style={input2} placeholder='Enter your Address'
          placeholderTextColor="black"
          onPressIn={()=> setErrormsg(null)}
            onChangeText={(text) => setFdate({...fdata, address: text})}
          />
        </View>
        
        <Text style={button1} onPress={()=>{
          Sendtobackend();
        }}>Signup</Text>
        <Text></Text>
      </ScrollView>
      </View>
    </View>
  )
}

export default Signup

const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%',
    display:'flex',
  },
  logoimg:{
    position:'absolute',
    top:-100,
    resizeMode:"contain",
    width:'100%',
    // height:'100%',
  },
  container1:{
    display:'flex ',
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    height:'100%',
  },
  s1:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    height:'15%',

  },
  s2:{
    display:'flex',
    backgroundColor:'#FFF',
    width:'100%',
    height:'90%',
    borderTopLeftRadius:50,
    borderTopRightRadius:50,
    padding:10,
  },
  forgot:{
    display:'flex',
    alignItems:'flex-end',
    marginVertical:5,
    marginHorizontal:10,
  }
})