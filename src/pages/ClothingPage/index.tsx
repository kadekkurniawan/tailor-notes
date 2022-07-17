import React, { useState } from "react";

import { useParams, useNavigate, NavigateFunction } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useBeforeUnload } from "react-use";

import {
    Clothing,
    useClothingStore,
    ClothingStore,
    Sizing,
} from "../../store/clothing";
import { findListItem, removeListItem } from "../../utils";
import ClothingNavbar from "./ClothingNavbar";
import SizingForm from "./SizingForm";
import SizingListItem from "./SizingListItem";
import { AnimatePresence } from "framer-motion";

const ClothingPage: React.FC = () => {
    const { clothingId } = useParams();

    const navigate: NavigateFunction = useNavigate();

    const { clothings, modifyClothingProperties, addClothing } =
        useClothingStore((state: ClothingStore) => state);

    const isCreatingANewClothing: boolean =
        clothingId === "creating-a-new-clothing" ? true : false;

    const clothing: Clothing = isCreatingANewClothing
        ? { type: "", sizings: [], id: uuidv4() }
        : findListItem(clothings.data, clothingId!);

    const [modifiedClothing, setModifiedClothing] =
        useState<Clothing>(clothing);

    const handleDeleteSizing = (sizingId: string) => {
        const updatedSizingsArray = removeListItem(
            modifiedClothing.sizings,
            sizingId
        );

        setModifiedClothing({
            ...modifiedClothing,
            sizings: updatedSizingsArray,
        });
    };

    const [measuredPart, setMeasuredPart] = useState<string>("");

    const handleAddSizing = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (measuredPart === "") {
            toast.info("Enter a text please");
            return;
        }

        const newSizing: Sizing = {
            measuredPart,
            size: "",
            id: uuidv4(),
        };

        setModifiedClothing({
            ...modifiedClothing,
            sizings: [newSizing, ...modifiedClothing.sizings],
        });

        setMeasuredPart("");
    };

    const handleSaveModifiedClothing = () => {
        if (isCreatingANewClothing) {
            addClothing(modifiedClothing);
            toast.success("Successfully added");
        } else {
            modifyClothingProperties(clothing, {
                ...modifiedClothing,
            });
            toast.success("Successfullly edited");
        }

        navigate("/select-clothing");
    };

    const handleChangeClothingType = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const updatedModifiedClothing = {
            ...modifiedClothing,
            type: e.target.value,
        };
        setModifiedClothing(updatedModifiedClothing);
    };

    const isClothingBeingModified =
        clothing === modifiedClothing ? false : true;

    useBeforeUnload(
        isClothingBeingModified,
        "You have unsaved changes, do you want to leave?"
    );

    return (
        <>
            <ClothingNavbar
                onClickBack={() => navigate("/select-clothing")}
                onClickSave={handleSaveModifiedClothing}
                onChangeClothingType={handleChangeClothingType}
                clothingType={modifiedClothing.type}
            />

            <main className="mt-20 lg:mt-24">
                <div className="container">
                    <ul className="grid-column-list">
                        <AnimatePresence>
                            {modifiedClothing.sizings.map(
                                (sizing: Sizing, sizingIndex: number) => (
                                    <SizingListItem
                                        key={sizing.id}
                                        onClickDelete={() =>
                                            handleDeleteSizing(sizing.id)
                                        }
                                        sizing={sizing}
                                        sizingIndex={sizingIndex}
                                    />
                                )
                            )}
                        </AnimatePresence>
                    </ul>
                </div>
            </main>

            <SizingForm
                onSubmit={handleAddSizing}
                setMeasuredPart={setMeasuredPart}
                measuredPart={measuredPart}
            />
        </>
    );
};

export default ClothingPage;
