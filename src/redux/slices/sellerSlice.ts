import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure for Seller data
interface Seller {
    id: string; // Make sure id is a string
    name: string;
    contactNumber: string;
    whatsappNumber: string;
    email: string;
    address: string;
    profileImage?: string;
}

// Define the initial state with an empty sellers array
interface SellerState {
    sellers: Seller[];
}

const initialState: SellerState = {
    sellers: [],
};

const sellerSlice = createSlice({
    name: "seller",
    initialState,
    reducers: {
        addSeller: (state, action: PayloadAction<Seller>) => {
            state.sellers.push(action.payload);
        },
        updateSeller: (state, action: PayloadAction<Seller>) => {
            const index = state.sellers.findIndex(seller => seller.id === action.payload.id);
            if (index !== -1) {
                state.sellers[index] = action.payload;
            }
        },
        deleteSeller: (state, action: PayloadAction<string>) => { // Update to PayloadAction<string>
            state.sellers = state.sellers.filter(seller => seller.id !== action.payload);
        }
    }
});

// Export actions to use them in components
export const { addSeller, updateSeller, deleteSeller } = sellerSlice.actions;

// Export reducer to add to the store
export default sellerSlice.reducer;
