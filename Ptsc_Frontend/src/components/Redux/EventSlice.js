import {createSlice} from "@reduxjs/toolkit";

const initialState={
    editingEventId:null,
}
export const eventSlice= createSlice({
   name:'event',
   initialState,
   reducers:{
    setEditingEventId:(state,action)=>{state.editingEventId = action.payload;},
    clearEditingEventId:(state)=>{state.editingEventId=null;}
   }
})

export const { setEditingEventId,clearEditingEventId}=eventSlice.actions;
export default eventSlice.reducer;