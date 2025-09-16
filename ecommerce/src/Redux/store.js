import { productReducer } from "./product/reducer"
import { configureStore } from "@reduxjs/toolkit"


const store = configureStore ( {
    reducer:{
        productState:productReducer
    }
})

export default  store;