import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ProductsContext } from '../context/ProductsContext';
import { ProductsStackParams } from '../navigator/ProductsNavigator';

interface Props extends StackScreenProps<ProductsStackParams,'ProductsScreen'>{};

export const ProductsScreen = ({navigation}:Props) => {

    const { products, loadProducts}=useContext(ProductsContext)

    useEffect(() => {
        navigation.setOptions({
            headerRight:()=>(
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        marginRight:10
                    }}
                    onPress={()=>navigation.navigate('ProductScreen',{
                        id:undefined,
                        name:'Nuevo Producto'
                    })}
                >
                    <Text>Agregar</Text>
                </TouchableOpacity>
            )
        })
    }, []);
    

    //TODO: Pull to refresh
  return <View style={{
      flex:1,
      marginHorizontal:10
  }}>
      <FlatList
        data={products}
        keyExtractor={(p)=>p._id}
        renderItem={({item})=>(
           <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>navigation.navigate('ProductScreen',{
                id:item._id,
                name:item.nombre
            })}
           >
                <Text style={styles.productName}>{item.nombre}</Text>
           </TouchableOpacity>
        )}
        ItemSeparatorComponent={()=>(<View style={styles.itemSeparator}></View>)}
      />
  </View>;
};

const styles=StyleSheet.create({
    productName:{
        fontSize:20,
        
    },
    itemSeparator:{
        borderBottomWidth:5,
        marginVertical:5,
        borderBottomColor:'rgba(0,0,0,0.1)'
    }
})