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
  previewMediaList: string[];
}

const initialState: AppState = {
  deviceModalState: "closed",
  choosingScene: null,
  choosingMedia: null,
  optimisticReorderUpdate: null,
  previewMediaList: [],
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
    setPreviewMediaList(state, action: PayloadAction<string[]>) {
      state.previewMediaList = action.payload;
    },
  },
});

export const {
  setDeviceModalState,
  setChoosingScene,
  setChoosingMedia,
  setOptimisticReorderUpdate,
  setPreviewMediaList,
} = appSlice.actions;

export default appSlice.reducer;
