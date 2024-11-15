import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure for Buyer data
interface Buyer {
    id: string; // Make sure id is a string
    name: string;
    contactNumber: string;
    whatsappNumber: string;
    email: string;
    address: string;
    profileImage?: string;
}

// Define the initial state with an empty buyers array
interface BuyerState {
    buyers: Buyer[];
}

const initialState: BuyerState = {
    buyers: [],
};

const buyerSlice = createSlice({
    name: "buyer",
    initialState,
    reducers: {
        addBuyer: (state, action: PayloadAction<Buyer>) => {
            state.buyers.push(action.payload);
        },
        updateBuyer: (state, action: PayloadAction<Buyer>) => {
            const index = state.buyers.findIndex(buyer => buyer.id === action.payload.id);
            if (index !== -1) {
                state.buyers[index] = action.payload;
            }
        },
        deleteBuyer: (state, action: PayloadAction<string>) => { // Update to PayloadAction<string>
            state.buyers = state.buyers.filter(buyer => buyer.id !== action.payload);
        }
    }
});

// Export actions to use them in components
export const { addBuyer, updateBuyer, deleteBuyer } = buyerSlice.actions;

// Export reducer to add to the store
export default buyerSlice.reducer;
