// redux/slices/categorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase"; // adjust the path accordingly

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
  const querySnapshot = await getDocs(collection(db, "categories"));
  const categories = [];
  querySnapshot.forEach((doc) => {
    categories.push({ id: doc.id, ...doc.data() });
  });
  console.log("categories",categories);
  
  return categories;
});

// Create category async thunk
export const createCategory = createAsyncThunk("categories/createCategory", async (newCategory) => {
  const docRef = await addDoc(collection(db, "categories"), newCategory);
  return { id: docRef.id, ...newCategory } // returning the new category with the generated ID
});
export const editCategory = createAsyncThunk(
  "categories/editCategory",
  async ({ id, modifiedCategory }) => {
    const docRef = doc(db, "categories", id); // Correct reference to the specific document
    await updateDoc(docRef, modifiedCategory); 
    return { id:docRef.id, ...modifiedCategory }; // Return id and updated category data
  }
);


const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create category
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload); // Add the new category to the state
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Edit category
      .addCase(editCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.loading = false;
        const { id, ...updatedCategory } = action.payload;
        const index = state.categories.findIndex((category) => category.id === id);
        if (index !== -1) {
          state.categories[index] = { ...state.categories[index], ...updatedCategory };
        }
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
