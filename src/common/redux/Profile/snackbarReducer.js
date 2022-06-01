export const SET_SNACKBAR='snachbar';


const initialState={
  isOpen:false,
  SnackBType:"success",
  msg:""
}


// eslint-disable-next-line import/no-anonymous-default-export
const snackbarReducer= (state=initialState,action) => {
   switch (action.type) {
     case SET_SNACKBAR:
       const {isOpen,SnackBType,msg}=action;
       return {
         ...state,
         isOpen,
         SnackBType,
         msg
       }
     default:
       return state;
   }
}
export const setSnackBar=(isOpen,SnackBType='success',msg='')=>({
  type:SET_SNACKBAR,
  isOpen,
  SnackBType,
  msg
})


export default snackbarReducer;
