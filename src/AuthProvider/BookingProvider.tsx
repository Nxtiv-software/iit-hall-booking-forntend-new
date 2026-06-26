import { createContext, useContext, useReducer, useEffect } from "react";

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
  preferredbuilding?: string;
  preferredroom?: string;
  alternateroom?: string;
}

interface Form4Data {
  soundSystem?: boolean;
  iitBranding?: boolean;
  projector?: boolean;
  wifiCredentials?: boolean;
  tablesChairSetup?: boolean;
  zoomPackage?: boolean;
  podium?: boolean;
  additionalNotes?: string;
}

interface Form5Data {
  agreement1?: boolean;
  agreement2?: boolean;
  agreement3?: boolean;
  eventProposal?: File | null;
}

interface BookingState {
  currentPage: number;
  form1Data: Form1Data;
  form2Data: Form2Data;
  form3Data: Form3Data;
  form4Data: Form4Data;
  form5Data: Form5Data;
  totalPages: number;
}

type BookingAction =
  | { type: "NEXT_PAGE" }
  | { type: "PREV_PAGE" }
  | { type: "GO_TO_PAGE"; payload: number }
  | { type: "UPDATE_FORM1"; payload: Form1Data }
  | { type: "UPDATE_FORM2"; payload: Form2Data }
  | { type: "UPDATE_FORM3"; payload: Form3Data }
  | { type: "UPDATE_FORM4"; payload: Form4Data }
  | { type: "UPDATE_FORM5"; payload: Form5Data }
  | { type: "RESET_BOOKING" };

interface BookingContextType {
  state: BookingState;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  updateForm1: (data: Form1Data) => void;
  updateForm2: (data: Form2Data) => void;
  updateForm3: (data: Form3Data) => void;
  updateForm4: (data: Form4Data) => void;
  updateForm5: (data: Form5Data) => void;
  resetBooking: () => void;
}

const initialState: BookingState = {
  currentPage: 1,
  form1Data: {},
  form2Data: {},
  form3Data: {},
  form4Data: {},
  form5Data: {},
  totalPages: 5, // Adjust based on number of forms
};

// Helper function to load state from localStorage
const loadStateFromLocalStorage = (): BookingState => {
  try {
    const savedState = localStorage.getItem("bookingState");
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
  }
  return initialState;
};

// Helper function to save state to localStorage
const saveStateToLocalStorage = (state: BookingState) => {
  try {
    localStorage.setItem("bookingState", JSON.stringify(state));
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case "NEXT_PAGE":
      return {
        ...state,
        // currentPage: Math.min(state.currentPage + 1, state.totalPages),
        currentPage: state.currentPage + 1
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
    case "UPDATE_FORM4":
      return {
        ...state,
        form4Data: { ...state.form4Data, ...action.payload },
      };
    case "UPDATE_FORM5":
      return {
        ...state,
        form5Data: { ...state.form5Data, ...action.payload },
      };
    case "RESET_BOOKING":
      return initialState;
    default:
      return state;
  }
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState, loadStateFromLocalStorage);

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveStateToLocalStorage(state);
  }, [state]);

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

  const updateForm4 = (data: Form4Data) => {
    dispatch({ type: "UPDATE_FORM4", payload: data });
  };

  const updateForm5 = (data: Form5Data) => {
    dispatch({ type: "UPDATE_FORM5", payload: data });
  };

  const resetBooking = () => {
    dispatch({ type: "RESET_BOOKING" });
    localStorage.removeItem("bookingState"); // Clear localStorage on reset
  };

  const value: BookingContextType = {
    state,
    nextPage,
    prevPage,
    goToPage,
    updateForm1,
    updateForm2,
    updateForm3,
    updateForm4,
    updateForm5,
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
