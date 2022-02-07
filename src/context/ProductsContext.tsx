import  React, { useEffect } from 'react';
import { createContext, useState } from "react";
import cafeApi from '../api/cafeApi';
import { Producto, ProductsResponse } from "../interfaces/appInterfaces";

type ProductsContextProps = {
    products: Producto[];
    loadProducts: () => Promise<void>;
    addProduct: (categoryId: string, productName: string) => Promise<void>;
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
    const addProduct =async (categoryId: string, productName: string) => {
        console.log('addProuct');
        console.log({categoryId,productName});
    }
    const updateProduct =async (categoryId: string, productName: string, productId: string) => {
        console.log('updateProuct');
        console.log({categoryId,productName,productId});
    }
    const deleteProduct = async(id: string) => {

    }

    const loadProductById=async (id: string):Promise<Producto> => {
        const resp = await cafeApi.get<Producto>(`/productos/${id}`);
       return resp.data;
    }

    //TODO: Cambiar el any
    const uploadImage =async (data: any, id: string) => {

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