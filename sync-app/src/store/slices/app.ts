import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalState = "closed" | "create" | string;

export type ConfigureMediaModalState =
  | "closed"
  | "bakalari-suplovani"
  | "bakalari-plan-akci";

interface ReorderUpdate {
  sceneId: string;
  mediaList: string[];
}

export interface AppState {
  mediaModalState: ModalState;
  deviceModalState: ModalState;
  configureMediaModalState: ConfigureMediaModalState;
  choosingScene: string | null;
  choosingMedia: string | null;
  optimisticReorderUpdate: ReorderUpdate | null;
  previewMediaList: string[];
  userAdministrationOpen: boolean;
}

const initialState: AppState = {
  mediaModalState: "closed",
  deviceModalState: "closed",
  configureMediaModalState: "closed",
  choosingScene: null,
  choosingMedia: null,
  optimisticReorderUpdate: null,
  previewMediaList: [],
  userAdministrationOpen: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setMediaModalState(state, action: PayloadAction<ModalState>) {
      state.mediaModalState = action.payload;
    },
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
    setConfigureMediaModalOpen(
      state,
      action: PayloadAction<ConfigureMediaModalState>
    ) {
      state.configureMediaModalState = action.payload;
    },
    setPreviewMediaList(state, action: PayloadAction<string[]>) {
      state.previewMediaList = action.payload;
    },
    setUserAdministrationOpen(state, action: PayloadAction<boolean>) {
      state.userAdministrationOpen = action.payload;
    },
  },
});

export const {
  setMediaModalState,
  setDeviceModalState,
  setChoosingScene,
  setChoosingMedia,
  setOptimisticReorderUpdate,
  setConfigureMediaModalOpen,
  setPreviewMediaList,
  setUserAdministrationOpen,
} = appSlice.actions;

export default appSlice.reducer;
