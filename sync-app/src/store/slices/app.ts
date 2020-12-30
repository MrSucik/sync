import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReorderUpdate {
  sceneId: string;
  mediaList: string[];
}

export interface AppState {
  addMediaModalOpen: boolean;
  configureMediaModalOpen: null | "bakalari-suplovani" | "bakalari-plan-akci";
  choosingScene: string | null;
  choosingMedia: string | null;
  optimisticReorderUpdate: ReorderUpdate | null;
}

const initialState: AppState = {
  addMediaModalOpen: false,
  choosingScene: null,
  choosingMedia: null,
  optimisticReorderUpdate: null,
  configureMediaModalOpen: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAddMediaModalOpen(state, action: PayloadAction<boolean>) {
      state.addMediaModalOpen = action.payload;
    },
    setChoosingScene(state, action: PayloadAction<string | null>) {
      state.choosingScene = action.payload;
    },
    setChoosingMedia(state, action: PayloadAction<string | null>) {
      state.choosingMedia = action.payload;
    },
    setOptimisticReorderUpdate(
      state,
      action: PayloadAction<ReorderUpdate | null>
    ) {
      state.optimisticReorderUpdate = action.payload;
    },
    setConfigureMediaModalOpen(
      state,
      action: PayloadAction<null | "bakalari-suplovani" | "bakalari-plan-akci">
    ) {
      state.configureMediaModalOpen = action.payload;
    },
  },
});

export const {
  setAddMediaModalOpen,
  setChoosingScene,
  setChoosingMedia,
  setOptimisticReorderUpdate,
  setConfigureMediaModalOpen,
} = appSlice.actions;

export default appSlice.reducer;
