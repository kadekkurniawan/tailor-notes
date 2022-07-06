import create from "zustand";
import { persist, devtools } from "zustand/middleware";

import { SewingInfoStore } from "./index";

const sewingInfoStore = (set: any): SewingInfoStore => ({
    sewingInfo: "Make a new clothes",
    sewingOptions: [
        "Make a new clothing",
        "Shrink exsisting clothing",
        "Grown existing clothing",
    ],
    changeSewingInfo: (sewingInfo: string) => {
        set(() => ({
            sewingInfo,
        }));
    },
    addSewingOption: (sewingOption: string) => {
        set((state: SewingInfoStore) => ({
            sewingOptions: [sewingOption, ...state.sewingOptions],
        }));
    },
});

const useSewingInfoStore = create(
    devtools(persist(sewingInfoStore, { name: "sewingInfo" }))
);

export default useSewingInfoStore;
