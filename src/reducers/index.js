import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import contentReducer from "./contentReducer";
import errorReducer from "./errorReducer";
export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    cart: cartReducer,
    content: contentReducer,
});