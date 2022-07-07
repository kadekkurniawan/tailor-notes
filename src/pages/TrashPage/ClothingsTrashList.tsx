import React, { useMemo, useState } from "react";

import { toast } from "react-toastify";
import { useDebounce } from "react-use";

import {
    ClothingStore,
    useClothingStore,
    Clothing,
} from "../../store/clothing";
import Undobar from "../../components/Undobar";
import { searchListItems } from "../../helpers";
import { ClothingListItem } from "../../components/ListItem";
import { useQuerySearch } from ".";

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

    const querySearch = useQuerySearch();

    const filteredClothingsTrash: Clothing[] = useMemo(
        () => searchListItems(clothings.trash, "type", querySearch),
        [clothings, querySearch]
    );

    const [isUndobarOpen, setIsUndobarOpen] = useState<boolean>(false);

    useDebounce(() => setIsUndobarOpen(false), 5000, [isUndobarOpen]);

    return (
        <>
            <ul className="grid-column-list mt-6">
                {filteredClothingsTrash.map((clothing: Clothing) => (
                    <ClothingListItem
                        clothingOptions={
                            <>
                                <li
                                    className="text-list-item"
                                    onClick={(e) =>
                                        handleRestoreClothing(e, clothing.id!)
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
                ))}
            </ul>

            {isUndobarOpen && (
                <Undobar
                    message={<p>Clothing restored</p>}
                    onClickUndo={undoRestoreClothing}
                />
            )}
        </>
    );
};

export default ClothingsTrashList;
