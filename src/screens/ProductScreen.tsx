import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { useCategories } from '../hooks/useCategories';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> { };

export const ProductScreen = ({ navigation, route }: Props) => {

  const { id, name = '' } = route.params;

  const { categories, isLoading } = useCategories();
  const [selectedLanguage, setSelectedLanguage] = useState();

  useEffect(() => {
    navigation.setOptions({
      title: name
    })
  }, []);


  return <View style={styles.container}>
    <ScrollView>
      <Text style={styles.label}>Nombre del producto</Text>
      <TextInput
        placeholder='Producto'
        style={styles.textInput}
      //TODO: value, onChangeText
      />
      {/*Picker / Selector*/}
      {
        isLoading ?
          (
          <ActivityIndicator color='#5856D6' size={25} />
          ) :
          (
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }>
              {categories.map(c => (
                <Picker.Item label={c.nombre}
                  value={c._id}
                  key={c._id}
                />
              ))}

            </Picker>
          )
      }




      <Text style={styles.label}>Categoía: </Text>

      <Button

        title='Guardar'
        onPress={() => { }}
        color="#5856d6"
      />

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
        <Button

          title='Cámara'
          onPress={() => { }}
          color="#5856d6"
        />
        <View style={{ width: 10 }}></View>
        <Button

          title='Galería'
          onPress={() => { }}
          color="#5856d6"
        />
      </View>

    </ScrollView>
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20
  },
  label: {
    fontSize: 18
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 45,
    marginTop: 5,
    marginBottom: 15
  }
})