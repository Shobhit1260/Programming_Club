import {createSlice} from "@reduxjs/toolkit";
const initialState={
    isEdit:false,
}
export const eventSlice= createSlice({
   name:'event',
   initialState,
   reducers:{
    toggleEdit:(state)=>{state.isEdit = !state.isEdit;},
    setEditTrue:(state)=>{state.isEdit=true;},
    setEditFalse:(state)=>{state.isEdit=false;},
   }
})

export const { toggleEdit,setEditTrue,setEditFalse}=eventSlice.actions;
export default eventSlice.reducer;