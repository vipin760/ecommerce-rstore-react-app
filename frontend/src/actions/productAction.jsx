import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, } from "../constants/productContants";
import axios from 'axios'

export const getProduct =()=> async (dispatch) =>{
    try {
        dispatch({type: ALL_PRODUCT_REQUEST});
        const { data } = await axios.get("http://localhost:3000/api/product")
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload:error.response.data.message
        })
    }
}

export const getProductDetails=(id)=> async(dispatch)=>{
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST})
        const { data } = await axios.get(`http://localhost:3000/api/product/${id}`)
        dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:PRODUCT_DETAILS_FAIL,payload:error.response.data.message})
    }
}



export const clearErrors =() => async (dispatch) => {
    dispatch({ type:CLEAR_ERRORS})
}