import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts: [],
        filter: ""
    },

    reducers: {
        add(state, action) {
            state.contacts.push(action.payload)
        },
        remove(state, action) {
            return {...state, contacts: state.contacts.filter(contact => contact.id !== action.payload)}
        },
        setFilter(state, action) {
            state.filter = action.payload
        }
    }
})

const persistConfig = {
    key: 'contacts',
        storage,
        blacklist: ['filter']
}

export const contactsReducer = persistReducer(
    persistConfig,
    contactsSlice.reducer
);

export const { add, remove, setFilter } = contactsSlice.actions

// Selectors
export const getContacts = state => state.contacts.contacts;
export const getFilter = state => state.contacts.filter;