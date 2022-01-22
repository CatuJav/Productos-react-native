import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { WhiteLogo } from '../components/WhiteLogo';
import { AuthContext } from '../context/AuthContext';

import { useForm } from '../hooks/useForm';
import { loginStyles } from '../theme/loginTheme';


interface Props extends StackScreenProps<any,any>{

}
export const RegisterScreen = ({navigation}:Props) => {
    const {sigUp,removeError,errorMessage}=useContext(AuthContext)
    const {email,password,name,onChange}=useForm({
        email:'',
        password:'',
        name:''
      });
    
      useEffect(() => {
        if(errorMessage.length===0) return;
      
        Alert.alert('Registro incorrecto',errorMessage,[
          {
            text:'Ok',
            onPress:()=>removeError()
          },
        ]);
      }, [errorMessage]);
     
     
      const onRegister=()=>{
        console.log({email,password,name})
        //Para ocultar el teclado al hacer clic en login
        Keyboard.dismiss();
        sigUp({
          correo:email,
          nombre:name,
          password
        })
      }

    return <>
    
    <KeyboardAvoidingView
      style={{flex:1, backgroundColor:'#5856D6'}}
      behavior={(Platform.OS=='ios'?'padding':'height')}
    >

    {/* Keyboard avoid view  evita que el teclado esconda los fields*/}
    <View style={loginStyles.formContainer}>
      <WhiteLogo />

      <Text style={loginStyles.title}>Registro</Text>

      <Text style={loginStyles.label}>Nombre</Text>
      <TextInput
        placeholder='Ingrese su nombre'
        placeholderTextColor="rgba(255,255,255,0.4)"
        
        underlineColorAndroid='white'
        style={loginStyles.inputField}
        selectionColor='white'
        //TODO: change

        onChangeText={(value)=>onChange(value,'name')}
        value={name}
        onSubmitEditing={onRegister}


        autoCapitalize='words'
        autoCorrect={false}
      />

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
        onSubmitEditing={onRegister}


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
        onSubmitEditing={onRegister}

        autoCapitalize='none'
        autoCorrect={false}
      />

      {/* Boton login */}
      <View style={loginStyles.buttonContainer}>
        <TouchableOpacity
          style={loginStyles.button}
          onPress={onRegister}
        >
          <Text style={loginStyles.buttonText}>Crear cuenta</Text>
        </TouchableOpacity>
      </View>

      {/* Crear una nueva cuenta */}
     <TouchableOpacity
        onPress={()=>navigation.replace('LoginScreen')}
        activeOpacity={0.8}
        style={loginStyles.buttonReturn}
     >
         <Text style={loginStyles.buttonText}>Login</Text>
     </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
  </>;
};
