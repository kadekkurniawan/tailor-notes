import React, { useMemo, useState } from "react";

import { toast } from "react-toastify";
import { searchListItems } from "../../helpers";

import {
    ClothingStore,
    useClothingStore,
    Clothing,
} from "../../store/clothing";
import Undobar from "../../components/Undobar";
import { ClothingListItem } from "../../components/ListItem";
import { useDebounce } from "react-use";

interface ClothingsTrashListProps {
    querySearch?: string;
}

const ClothingsTrashList: React.FC<ClothingsTrashListProps> = ({
    querySearch,
}) => {
    const {
        clothings,
        restoreClothingById,
        undoRestoreClothing,
        deleteClothingTrashById,
    } = useClothingStore((state: ClothingStore) => state);

    const filteredClothingsTrash: Clothing[] = useMemo(
        () =>
            searchListItems(
                clothings.trash,
                "type",
                querySearch!
            ) as Clothing[],
        [querySearch]
    );

    const [isUndobarOpen, setIsUndobarOpen] = useState<boolean>(false);

    useDebounce(() => setIsUndobarOpen(false), 5000, [isUndobarOpen]);

    return (
        <>
            <main>
                <div>
                    <ul>
                        {filteredClothingsTrash.map((clothing: Clothing) => (
                            <ClothingListItem
                                clothingOptions={
                                    <>
                                        <li
                                            onClick={() => {
                                                restoreClothingById(
                                                    clothing.id!
                                                );
                                                setIsUndobarOpen(true);
                                            }}
                                        >
                                            Restore
                                        </li>
                                        <li
                                            onClick={() =>
                                                deleteClothingTrashById(
                                                    clothing.id!
                                                )
                                            }
                                        >
                                            Delete forever
                                        </li>
                                    </>
                                }
                                onClickListItem={() =>
                                    toast.info(
                                        "You can't view note on trash, restore the note if you want to view it"
                                    )
                                }
                                clothing={clothing}
                            />
                        ))}
                    </ul>
                </div>
            </main>

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
