import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalState = "closed" | "create" | string;

interface ReorderUpdate {
  sceneId: string;
  mediaList: string[];
}

export interface AppState {
  deviceModalState: ModalState;
  choosingScene: string | null;
  choosingMedia: string | null;
  optimisticReorderUpdate: ReorderUpdate | null;
}

const initialState: AppState = {
  deviceModalState: "closed",
  choosingScene: null,
  choosingMedia: null,
  optimisticReorderUpdate: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDeviceModalState(state, action: PayloadAction<ModalState>) {
      state.deviceModalState = action.payload;
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
  },
});

export const {
  setDeviceModalState,
  setChoosingScene,
  setChoosingMedia,
  setOptimisticReorderUpdate,
} = appSlice.actions;

export default appSlice.reducer;
