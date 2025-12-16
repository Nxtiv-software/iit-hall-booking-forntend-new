import { createContext, useContext, useReducer, ReactNode } from "react";

// Define types for form data
interface Form1Data {
  societyname?: string;
  eventtype?: string;
  excoposition?: string;
  eventtitle?: string;
  participants?: string;
  excomembername?: string;
  description?: string;
}

interface Form2Data {
  // Add Form 2 fields here
  [key: string]: any;
}

interface Form3Data {
  // Add Form 3 fields here
  [key: string]: any;
}

interface BookingState {
  currentPage: number;
  form1Data: Form1Data;
  form2Data: Form2Data;
  form3Data: Form3Data;
  totalPages: number;
}

type BookingAction =
  | { type: "NEXT_PAGE" }
  | { type: "PREV_PAGE" }
  | { type: "GO_TO_PAGE"; payload: number }
  | { type: "UPDATE_FORM1"; payload: Form1Data }
  | { type: "UPDATE_FORM2"; payload: Form2Data }
  | { type: "UPDATE_FORM3"; payload: Form3Data }
  | { type: "RESET_BOOKING" };

interface BookingContextType {
  state: BookingState;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  updateForm1: (data: Form1Data) => void;
  updateForm2: (data: Form2Data) => void;
  updateForm3: (data: Form3Data) => void;
  resetBooking: () => void;
}

const initialState: BookingState = {
  currentPage: 1,
  form1Data: {},
  form2Data: {},
  form3Data: {},
  totalPages: 3, // Adjust based on number of forms
};

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case "NEXT_PAGE":
      return {
        ...state,
        currentPage: Math.min(state.currentPage + 1, state.totalPages),
      };
    case "PREV_PAGE":
      return {
        ...state,
        currentPage: Math.max(state.currentPage - 1, 1),
      };
    case "GO_TO_PAGE":
      return {
        ...state,
        currentPage: Math.max(1, Math.min(action.payload, state.totalPages)),
      };
    case "UPDATE_FORM1":
      return {
        ...state,
        form1Data: { ...state.form1Data, ...action.payload },
      };
    case "UPDATE_FORM2":
      return {
        ...state,
        form2Data: { ...state.form2Data, ...action.payload },
      };
    case "UPDATE_FORM3":
      return {
        ...state,
        form3Data: { ...state.form3Data, ...action.payload },
      };
    case "RESET_BOOKING":
      return initialState;
    default:
      return state;
  }
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [{currentPage}, dispatch] = useReducer(bookingReducer, initialState);

  const nextPage = () => {
    dispatch({ type: "NEXT_PAGE" });
  };

  const prevPage = () => {
    dispatch({ type: "PREV_PAGE" });
  };

  const goToPage = (page: number) => {
    dispatch({ type: "GO_TO_PAGE", payload: page });
  };

  const updateForm1 = (data: Form1Data) => {
    dispatch({ type: "UPDATE_FORM1", payload: data });
  };

  const updateForm2 = (data: Form2Data) => {
    dispatch({ type: "UPDATE_FORM2", payload: data });
  };

  const updateForm3 = (data: Form3Data) => {
    dispatch({ type: "UPDATE_FORM3", payload: data });
  };

  const resetBooking = () => {
    dispatch({ type: "RESET_BOOKING" });
  };

  const value: BookingContextType = {
    currentPage,
    nextPage,
    prevPage,
    goToPage,
    updateForm1,
    updateForm2,
    updateForm3,
    resetBooking,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
