import create from "zustand";
import { persist, devtools } from "zustand/middleware";

import { MeasurementTypeStore } from "./index";

const measurementTypeStore = (set: any): MeasurementTypeStore => ({
    measurementType: "cm",
    measurementOptions: ["cm", "inches"],
    changeMeasurementType: (measurementType: string) => {
        set((state: MeasurementTypeStore) => ({
            measurementType,
        }));
    },
});

const useMeasurementTypeStore = create(
    devtools(persist(measurementTypeStore, { name: "clothingMeasurementType" }))
);

export default useMeasurementTypeStore;
