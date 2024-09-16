import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
}
const initialState: HabitState = {
  habits: [],
};
export const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (
      state,
      action: PayloadAction<{ name: string; frequency: "daily" | "weekly" }>
    ) => {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: action.payload.name,
        frequency: action.payload.frequency,
        completedDates: [],
        createdAt: new Date().toISOString(),
      };
      state.habits.push(newHabit);
    },
    toggleHabit: (
      state,
      action: PayloadAction<{ id: string; date: string }>
    ) => {
      const habit = state.habits.find(
        (habit) => habit.id === action.payload.id
      );
      if (habit) {
        const index = habit.completedDates.indexOf(action.payload.date);
        if (index === -1) {
          habit.completedDates.push(action.payload.date);
        } else {
          habit.completedDates.splice(index, 1);
        }
      }
    },
    removeHabit:(state,action:PayloadAction<{id:string}>)=>{
      state.habits = state.habits.filter(h=>h.id !== action.payload.id);
},
 
}});

export const { addHabit, toggleHabit,removeHabit } = habitSlice.actions;
export default habitSlice.reducer;
