import create from "zustand";
import { persist, devtools } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

import { removeListItem, replaceListItem } from "../../helpers";
import { Clothing, ClothingStore } from "./index";

const initialClothings: Clothing[] = [
    {
        type: "T-shirt",
        id: uuidv4(),
        sizings: [
            { measuredPart: "belly", size: "", id: uuidv4() },
            { measuredPart: "neck", size: "", id: uuidv4() },
            { measuredPart: "arm", size: "", id: uuidv4() },
            { measuredPart: "chest", size: "", id: uuidv4() },
        ],
    },
    {
        type: "Dress shirt",
        id: uuidv4(),
        sizings: [
            { measuredPart: "Neck Around", size: "", id: uuidv4() },
            { measuredPart: "Sleeve Length", size: "", id: uuidv4() },
            { measuredPart: "Shoulder Width", size: "", id: uuidv4() },
            { measuredPart: "Chest Around", size: "", id: uuidv4() },
            { measuredPart: "Waist Around", size: "", id: uuidv4() },
            { measuredPart: "Shirt Length", size: "", id: uuidv4() },
            { measuredPart: "Bicep Around", size: "", id: uuidv4() },
            { measuredPart: "Wrist Around", size: "", id: uuidv4() },
        ],
    },
];

const clothingStore = (set: any, get: any): ClothingStore => ({
    clothings: {
        data: initialClothings,
        trash: [],
    },
    modifyClothingProperties: (
        clothing: Clothing,
        clothingProperties: Object
    ) => {
        set((state: ClothingStore) => ({
            clothings: {
                ...state.clothings,
                data: replaceListItem(state.clothings.data, clothing.id!, {
                    ...clothing,
                    ...clothingProperties,
                    lastModified: new Date(),
                }) as Clothing[],
            },
        }));
    },
    addClothing: (clothing: Clothing) => {
        set((state: ClothingStore) => ({
            clothings: {
                ...state.clothings,
                data: [clothing, ...state.clothings.data],
            },
        }));
    },
    removeClothingById: (clothingId: string) => {
        const selectedClothing: Clothing = get().clothings.data.find(
            (clothing: Clothing) => clothing.id === clothingId
        );

        set((state: ClothingStore) => ({
            clothings: {
                trash: [selectedClothing, ...state.clothings.trash],
                data: removeListItem(
                    state.clothings.data,
                    selectedClothing.id!
                ) as Clothing[],
            },
        }));
    },
    undoRemoveClothing: () => {
        const previouslyRemovedClothing: Clothing = get().clothings.trash.at(0);

        set((state: ClothingStore) => ({
            clothings: {
                data: [previouslyRemovedClothing, ...state.clothings.data],
                trash: removeListItem(
                    state.clothings.trash,
                    previouslyRemovedClothing.id!
                ) as Clothing[],
            },
        }));
    },
    restoreClothingById: (clothingId: string) => {
        const selectedClothing: Clothing = get().clothings.trash.find(
            (clothing: Clothing) => clothing.id === clothingId
        );

        set((state: ClothingStore) => ({
            clothings: {
                data: [selectedClothing, ...state.clothings.data],
                trash: removeListItem(
                    state.clothings.trash,
                    selectedClothing.id!
                ) as Clothing[],
            },
        }));
    },
    undoRestoreClothing: () => {
        const previouslyRestoredClothing: Clothing = get().clothings.data.at(0);

        set((state: ClothingStore) => ({
            clothings: {
                trash: [previouslyRestoredClothing, ...state.clothings.trash],
                data: removeListItem(
                    state.clothings.data,
                    previouslyRestoredClothing.id!
                ) as Clothing[],
            },
        }));
    },
    deleteClothingTrashById: (clothingId: string) => {
        set((state: ClothingStore) => ({
            clothings: {
                ...state.clothings,
                trash: removeListItem(
                    state.clothings.trash,
                    clothingId
                ) as Clothing[],
            },
        }));
    },
    deleteAllClothingsTrash: () => {
        set((state: ClothingStore) => ({
            clothings: {
                ...state.clothings,
                trash: [] as Clothing[],
            },
        }));
    },
});

const useClothingStore = create(
    devtools(persist(clothingStore, { name: "clothing" }))
);

export default useClothingStore;
