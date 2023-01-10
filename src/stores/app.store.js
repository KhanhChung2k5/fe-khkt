import { createStore } from "./store";
export const AppStore = createStore({
  material: {
    typeChemical: "",
    groupName: "",
    chemical: "",
    typeSpectrum: "",
    parentPath: [],
  },
  document: { url: "" },
  contentUrl: "",
});

export const useAppStore = AppStore.useStore;
