import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalState = "closed" | "create" | string;

interface ReorderUpdate {
  sceneId: string;
  mediaList: string[];
}

export interface AppState {
  mediaModalState: ModalState;
  configureMediaModalOpen: null | "bakalari-suplovani" | "bakalari-plan-akci";
  choosingScene: string | null;
  choosingMedia: string | null;
  optimisticReorderUpdate: ReorderUpdate | null;
  previewMediaList: string[];
}

const initialState: AppState = {
  mediaModalState: "closed",
  choosingScene: null,
  choosingMedia: null,
  optimisticReorderUpdate: null,
  configureMediaModalOpen: null,
  previewMediaList: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setMediaModalState(state, action: PayloadAction<ModalState>) {
      state.mediaModalState = action.payload;
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
    setPreviewMediaList(state, action: PayloadAction<string[]>) {
      state.previewMediaList = action.payload;
    },
  },
});

export const {
  setMediaModalState,
  setChoosingScene,
  setChoosingMedia,
  setOptimisticReorderUpdate,
  setConfigureMediaModalOpen,
  setPreviewMediaList,
} = appSlice.actions;

export default appSlice.reducer;
