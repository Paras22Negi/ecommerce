import {
    FETCH_PRODUCT_DETAIL_FAILURE,
    FETCH_PRODUCT_DETAIL_REQUEST,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
} from "./actionType";

const initialState = {
  loading: false, // typo fixed: loding → loading
  product: [],
  error: "",
  productDetail: {},
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };

    case FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case FETCH_PRODUCT_DETAIL_REQUEST:
        return {
          ...state,
          loading: true,
        };
        case FETCH_PRODUCT_DETAIL_SUCCESS:
            return {
              ...state,
              loading: false,
              productDetail: action.payload,
            };
case FETCH_PRODUCT_DETAIL_FAILURE:  
return{
    ...state,
    loading:false,
    error:action.payload
}

    default:
      return state; // 👈 must always return state if no action matches
  }
};
