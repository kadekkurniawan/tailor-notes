import useClothingStore from "./clothingStore";
import useSewingInfoStore from "./sewingInfoStore";
import useMeasurementTypeStore from "./measurementTypeStore";

export interface Sizing {
    measuredPart: string;
    size: string;
    id: string;
}

export interface Clothing {
    type: string;
    sizings: Sizing[];
    id?: string;
    measurementType?: string;
    sewingInfo?: string;
}

export type ClothingStore = {
    clothings: {
        data: Clothing[];
        trash: Clothing[];
    };
    modifyClothingProperties: (
        clothing: Clothing,
        clothingProperties: Object
    ) => void;
    addClothing: (clothing: Clothing) => void;
    removeClothingById: (clothingId: string) => void;
    undoRemoveClothing: () => void;
    restoreClothingById: (clothingId: string) => void;
    undoRestoreClothing: () => void;
    deleteClothingTrashById: (clothingId: string) => void;
    deleteAllClothingsTrash: () => void;
};

export type SewingInfoStore = {
    sewingInfo: string;
    sewingOptions: string[];
    changeSewingInfo: (sewingInfo: string) => void;
    addSewingOption: (sewingOption: string) => void;
};

export type MeasurementTypeStore = {
    measurementType: string;
    measurementOptions: string[];
    changeMeasurementType: (measurementType: string) => void;
};

export { useClothingStore, useSewingInfoStore, useMeasurementTypeStore };
