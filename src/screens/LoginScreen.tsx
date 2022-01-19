import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';

export const LoginScreen = () => {
  return <>
    {/* Background */}
    <Background />

    {/* Keyboard avoid view */}
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
        //TODO: change
        autoCapitalize='none'
        autoCorrect={false}
      />

      {/* Boton login */}
      <View style={loginStyles.buttonContainer}>
        <TouchableOpacity
          style={loginStyles.button}
        >
          <Text style={loginStyles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Crear una nueva cuenta */}
      <View style={loginStyles.newUserContainer}>
        <TouchableOpacity activeOpacity={0.8}
          onPress={() => console.log('press')}
        >

          <Text style={loginStyles.buttonText}>Nueva cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
  </>;
};
