import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';
import { AuthProvider } from './src/context/AuthContext';
import { ProductProvider } from './src/context/ProductsContext';

const AppState = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    // AuthProvider es quien gobierna todo la aplicacion
    <AuthProvider>
      <ProductProvider>
      {children}
      </ProductProvider>
    </AuthProvider>
  )
}

export const App = () => {
  return (<NavigationContainer>
    <AppState>
      <Navigator />
    </AppState>
  </NavigationContainer>)
};
