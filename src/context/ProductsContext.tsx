import  React, { useEffect } from 'react';
import { createContext, useState } from "react";
import { ImagePickerResponse } from 'react-native-image-picker';
import cafeApi, { cafeFetch } from '../api/cafeApi';
import { Producto, ProductsResponse } from "../interfaces/appInterfaces";

type ProductsContextProps = {
    products: Producto[];
    loadProducts: () => Promise<void>;
    addProduct: (categoryId: string, productName: string) => Promise<Producto>;
    updateProduct: (categoryId: string, productName: string, productId: string) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    loadProductById: (id: string) => Promise<Producto>;
    uploadImage: (data: any, id: string) => Promise<void>; //TODO: Cambiar any
}

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductProvider = ({ children }: any) => {

    const [products, setProducts] = useState<Producto[]>([]);

    useEffect(() => {
        loadProducts();
    }, []);
    

    
    const loadProducts = async() => {
        const resp = await cafeApi.get<ProductsResponse>('/productos?limite=50');
        setProducts([...resp.data.productos]);
       
    }
    const addProduct =async (categoryId: string, productName: string):Promise<Producto> => {
       const resp = await cafeApi.post<Producto>('/productos',{
           nombre:productName,
           categoria:categoryId
       });
       setProducts([...products,resp.data]);

       return resp.data;
       
    }
    const updateProduct =async (categoryId: string, productName: string, productId: string) => {
        const resp = await cafeApi.put<Producto>(`/productos/${productId}`,{
            nombre:productName,
            categoria:categoryId
        });
        setProducts(products.map(prod=>{
            return (prod._id===productId)
                    ?resp.data
                    : prod;
        }));
    }
    const deleteProduct = async(id: string) => {

    }

    const loadProductById=async (id: string):Promise<Producto> => {
        const resp = await cafeApi.get<Producto>(`/productos/${id}`);
       return resp.data;
    }

    //TODO: Cambiar el any por ImagePickerResponse
    const uploadImage =async (data: ImagePickerResponse, productoId: string) => {
        const fileToUpload={
            uri:data.assets![0].uri,
            type:data.assets![0].type,
            name:data.assets![0].fileName
        }
        console.log({fileToUpload});
        //Form data para subir en el api
        const formData = new FormData();
        formData.append('archivo',fileToUpload);
        console.log(formData.getParts());

        try{
        //TODO: Verificar que paso
        // const resp = await cafeApi.put(`/uploads/productos/${productoId}`,formData);
        // console.log({resp});

        const resp = await cafeFetch(`uploads/productos/${ productoId }`, 'PUT', 'multipart/form-data', formData)
        .then(resp => resp.json());
        }catch(e:any){
            console.log(e.response?.data?.msg);
        }
    }


    return (

        <ProductsContext.Provider value={{
            products,
            loadProducts,
            addProduct,
            updateProduct,
            deleteProduct,
            loadProductById,
            uploadImage
        }}>
            {children}
        </ProductsContext.Provider>
    )
}