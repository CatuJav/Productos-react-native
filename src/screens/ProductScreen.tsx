import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { ProductsContext } from '../context/ProductsContext';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> { };

export const ProductScreen = ({ navigation, route }: Props) => {

  const { id='', name = '' } = route.params;

  const { categories, isLoading } = useCategories();
  const { loadProductById, addProduct,updateProduct} = useContext(ProductsContext);

  //Para usar un formulario
  const { _id, nombre, categoriaId, img, form, onChange, setFormValue } = useForm({
    _id: id,
    categoriaId: '',
    nombre: name,
    img: ''
  });




  useEffect(() => {
    navigation.setOptions({
      title: (nombre)?nombre:'Sin nombre del producto'
    })
  }, [nombre]);


  useEffect(() => {
    loadProduct()
  }, []);


  const loadProduct = async () => {
    if (id.length === 0) {
      return;
    }
    const product = await loadProductById(id);
    setFormValue({
      _id: id,
      categoriaId: product.categoria._id,
      img: product.img || '',
      nombre: product.nombre
    })
  }

  //Saber si se debe actualizar o crear segun el lengt del id
  const saveOrUpdate=()=>{
    if (id.length>0) {
      updateProduct(categoriaId,nombre,id);
    }else{
   
      const tempCategoriaId=categoriaId|| categories[0]._id
      addProduct(tempCategoriaId,nombre);
    }
  }

  return <View style={styles.container}>
    <ScrollView>
      <Text style={styles.label}>Nombre del producto</Text>
      <TextInput
        placeholder='Producto'
        style={styles.textInput}
        //TODO: value, onChangeText
        value={nombre}
        onChangeText={(value) => onChange(value, 'nombre')}
      />
      {/*Picker / Selector*/}
      {
        isLoading ?
          (
            <ActivityIndicator color='#5856D6' size={25} />
          ) :
          (
            <Picker
              selectedValue={categoriaId}
              onValueChange={(itemValue) => { onChange(itemValue, 'categoriaId') }
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

        title='Guardasr'
        onPress={() => saveOrUpdate()}
        color="#5856d6"
      />

      { 
        (id.length>0)&&(

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
        )

      }
      {
        (img.length > 0) &&
        <Image
          source={{
            uri: img
          }}
          style={{
            marginTop:20,
            width: '100%',
            height: 300,
            borderRadius:15
          }}

        />
      }

      {/* TODO: Mostrar imagen temporal */}
    </ScrollView>
  </View>
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