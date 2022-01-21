import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { AuthContext } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import { loginStyles } from '../theme/loginTheme';

interface Props extends StackScreenProps<any,any>{

}

//Las props exrtienden para poder la navegacion
export const LoginScreen = ({navigation}:Props) => {

  const {sigIn}=useContext(AuthContext);  

  const {email,password,onChange}=useForm({
    email:'',
    password:''
  });

  const onLogin=()=>{
    //console.log({email,password})
    //Para ocultar el teclado al hacer clic en login
    Keyboard.dismiss();
    sigIn({correo:email,password});
  }

  return <>
    {/* Background */}
    <Background />

    <KeyboardAvoidingView
      style={{flex:1}}
      behavior={(Platform.OS=='ios'?'padding':'height')}
    >

    {/* Keyboard avoid view  evita que el teclado esconda los fields*/}
    <View style={loginStyles.formContainer}>
      <WhiteLogo />

      <Text style={loginStyles.title}>Login</Text>
      <Text style={loginStyles.label}>Email</Text>
      <TextInput
        placeholder='Ingrese su email'
        placeholderTextColor="rgba(255,255,255,0.4)"
        keyboardType='email-address'
        underlineColorAndroid='white'
        style={loginStyles.inputField}
        selectionColor='white'
        //TODO: change

        onChangeText={(value)=>onChange(value,'email')}
        value={email}
        onSubmitEditing={onLogin}


        autoCapitalize='none'
        autoCorrect={false}
      />
      <Text style={loginStyles.label}>Contraseña</Text>
      <TextInput
        placeholder='******'
        placeholderTextColor="rgba(255,255,255,0.4)"
        
        underlineColorAndroid='white'
        style={loginStyles.inputField}
        selectionColor='white'
        secureTextEntry={true}
        
        //TODO: change
        onChangeText={(value)=>onChange(value,'password')}
        value={password}
        onSubmitEditing={onLogin}

        autoCapitalize='none'
        autoCorrect={false}
      />

      {/* Boton login */}
      <View style={loginStyles.buttonContainer}>
        <TouchableOpacity
          style={loginStyles.button}
          onPress={onLogin}
        >
          <Text style={loginStyles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Crear una nueva cuenta */}
      <View style={loginStyles.newUserContainer}>
        <TouchableOpacity activeOpacity={0.8}
          onPress={()=>navigation.replace('RegisterScreen')}
        >

          <Text style={loginStyles.buttonText}>Nueva cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
    </KeyboardAvoidingView>
  </>;
};
