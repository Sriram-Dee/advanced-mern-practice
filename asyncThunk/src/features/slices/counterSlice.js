import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
}

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: { 
        increment:{
            reducer(state) {
                state.value += 1
            }
        },
        decrement: {
            reducer(state) {
                if (state.value > 0) state.value -= 1
            }
        }
    }
})
export const selectCount = (state) => state.counter.value
export const { increment, decrement } = counterSlice.actions
export default counterSlice.reducer