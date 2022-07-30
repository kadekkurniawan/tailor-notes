import React, { useMemo, useState } from "react";

import { toast } from "react-toastify";
import { useDebounce } from "react-use";

import {
    ClothingStore,
    useClothingStore,
    Clothing,
} from "../../store/clothing";
import Undobar from "../../components/Undobar";
import { searchListItems } from "../../utils";
import { ClothingListItem } from "../../components/ListItem";
import { useOutletContext } from "react-router-dom";
import Error from "../../components/Error";
import { AnimatePresence } from "framer-motion";

const ClothingsTrashList: React.FC = () => {
    const {
        clothings,
        restoreClothingById,
        undoRestoreClothing,
        deleteClothingFromTrashById,
    } = useClothingStore((state: ClothingStore) => state);

    const handleRestoreClothing = (
        e: React.MouseEvent<HTMLLIElement, MouseEvent>,
        clothingId: string
    ) => {
        e.stopPropagation();

        restoreClothingById(clothingId);
        setIsUndobarOpen(true);
    };

    const querySearch: string = useOutletContext();

    const filteredClothingsTrash: Clothing[] = useMemo(
        () => searchListItems(clothings.trash, "type", querySearch),
        [clothings, querySearch]
    );

    const clothingNotFound =
        querySearch !== "" && filteredClothingsTrash.length === 0
            ? true
            : false;

    const [isUndobarOpen, setIsUndobarOpen] = useState<boolean>(false);

    const handleUndoRestoreClothing = () => {
        undoRestoreClothing();
        setIsUndobarOpen(false);
    };

    useDebounce(() => setIsUndobarOpen(false), 5000, [isUndobarOpen]);

    return (
        <>
            <ul className="grid-column-list mt-6">
                <AnimatePresence>
                    {filteredClothingsTrash.map(
                        (clothing: Clothing, clothingIndex: number) => (
                            <ClothingListItem
                                querySearch={querySearch}
                                clothingIndex={clothingIndex}
                                clothingOptions={
                                    <>
                                        <li
                                            className="text-list-item"
                                            onClick={(e) =>
                                                handleRestoreClothing(
                                                    e,
                                                    clothing.id!
                                                )
                                            }
                                        >
                                            Restore
                                        </li>
                                        <li
                                            className="text-list-item text-red hover:text-dark-red"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                deleteClothingFromTrashById(
                                                    clothing.id!
                                                );
                                            }}
                                        >
                                            Delete forever
                                        </li>
                                    </>
                                }
                                onClickListItem={() =>
                                    toast.info(
                                        "Can't view clothing in trash mode, restore the clothing if you want to view it"
                                    )
                                }
                                clothing={clothing}
                            />
                        )
                    )}
                </AnimatePresence>
            </ul>

            <Error
                open={clothingNotFound}
                title="Clothing not found"
                description={<p>Perhaps you already delete it permanently?</p>}
            />

            <Undobar
                isUndobarOpen={isUndobarOpen}
                message={<p>Clothing restored</p>}
                onClickUndo={handleUndoRestoreClothing}
            />
        </>
    );
};

export default ClothingsTrashList;
