import axios from "axios"
import { FETCH_PRODUCT_DETAIL_FAILURE, FETCH_PRODUCT_DETAIL_REQUEST, FETCH_PRODUCT_DETAIL_SUCCESS, FETCH_PRODUCT_FAILURE, FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS } from "./actionType"

export const fetchProduct = () =>async(dispatch)=>{
    dispatch({type:FETCH_PRODUCT_REQUEST})
try{
    const res = await axios.get("https://dummyjson.com/products")
    dispatch({type:FETCH_PRODUCT_SUCCESS,payload:res.data.products})
    
}catch(error){
    dispatch({type:FETCH_PRODUCT_FAILURE,payload:error.message})    

}
}

export const fetchProductDetail = (id)=>async(dispatch)=>{
    dispatch({type:FETCH_PRODUCT_DETAIL_REQUEST})  
try{
    const res = await axios.get(`https://dummyjson.com/products/${id}`);
    dispatch({type:FETCH_PRODUCT_DETAIL_SUCCESS,payload:res.data})

} catch (error){
    dispatch({type:FETCH_PRODUCT_DETAIL_FAILURE,payload:error.message})
}
}
