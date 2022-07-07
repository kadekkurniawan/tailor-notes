import React, { useState, useMemo } from "react";

import { NavigateFunction, useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useDebounce } from "react-use";

import {
    useClothingStore,
    Clothing,
    ClothingStore,
    useSewingInfoStore,
    SewingInfoStore,
    useMeasurementTypeStore,
    MeasurementTypeStore,
} from "../../store/clothing";
import { useNoteStore, Note, NoteStore } from "../../store/note";
import { ClothingListItem } from "../../components/ListItem";
import Icon from "../../components/Icon";
import { NavbarWithInputSearch } from "../../components/Navbar";
import { searchListItems } from "../../helpers";
import Undobar from "../../components/Undobar";

const SelectClothingPage: React.FC = () => {
    const navigate: NavigateFunction = useNavigate();

    const { clothings, addClothing, removeClothingById, undoRemoveClothing } =
        useClothingStore((state: ClothingStore) => state);
    const measurementType = useMeasurementTypeStore(
        (state: MeasurementTypeStore) => state.measurementType
    );
    const sewingInfo = useSewingInfoStore(
        (state: SewingInfoStore) => state.sewingInfo
    );

    const addNote = useNoteStore((state: NoteStore) => state.addNote);

    const [isUndobarOpen, setIsUndobarOpen] = useState<boolean>(false);

    const [querySearch, setQuerySeacrh] = useState<string>("");

    const handleAddNote = (clothing: Clothing) => {
        const newNote: Note = {
            customerName: "",
            clothing: {
                type: clothing.type,
                sizings: clothing.sizings,
                measurementType,
                sewingInfo,
            },
            id: uuidv4(),
            deadline: "",
            lastModified: new Date(),
            extraNote: "",
        };

        addNote(newNote);

        navigate(`/note/${newNote.id}`);
    };

    const handleViewClothing = (
        e: React.MouseEvent<HTMLLIElement, MouseEvent>,
        clothingId: string
    ) => {
        e.stopPropagation();
        navigate(`/clothing/${clothingId}`);
    };

    const handleRemoveClothing = (
        e: React.MouseEvent<HTMLLIElement, MouseEvent>,
        clothingId: string
    ) => {
        e.stopPropagation();
        removeClothingById(clothingId);

        setTimeout(() => setIsUndobarOpen(true), 500);
    };

    const filteredClothings: Clothing[] = useMemo(
        () => searchListItems(clothings.data, "type", querySearch),
        [clothings, querySearch]
    );

    useDebounce(() => setIsUndobarOpen(false), 5000, [isUndobarOpen]);

    return (
        <>
            <NavbarWithInputSearch
                onChangeInputSearch={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setQuerySeacrh(e.target.value)
                }
                mainButton="arrow_back"
                inputSearchPlaceholder="Search clothings.."
                onClickMainButton={() => navigate("/")}
            />

            <main className="mt-20">
                <div className="container">
                    <div className="sticky center-children top-16 bg-slate-900 py-2 ">
                        <h1 className="text-lg text-center font-semibold lg:text-xl text-slate-400 font-serif">
                            Select what type of clothing you want to sew
                        </h1>
                    </div>

                    <ul className="mt-6 grid-column-list">
                        {filteredClothings?.map((clothing: Clothing) => (
                            <ClothingListItem
                                key={clothing.id}
                                clothing={clothing}
                                onClickListItem={() => handleAddNote(clothing)}
                                clothingOptions={
                                    <>
                                        <li
                                            className="text-list-item"
                                            onClick={(e) =>
                                                handleViewClothing(
                                                    e,
                                                    clothing.id!
                                                )
                                            }
                                        >
                                            Edit
                                        </li>
                                        <li
                                            className="text-list-item text-red hover:text-dark-red"
                                            onClick={(e) =>
                                                handleRemoveClothing(
                                                    e,
                                                    clothing.id!
                                                )
                                            }
                                        >
                                            Remove
                                        </li>
                                    </>
                                }
                            />
                        ))}

                        <li className="small-padding hover:bg-slate-700 slate-700-border h-12 bg-slate-800 rounded-lg">
                            <Link
                                className="center-children-using-flex-box h-full"
                                to="/clothing/creating-a-new-clothing"
                            >
                                <Icon type="add" className="text-teal" />
                                <p>Clothing</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </main>

            {isUndobarOpen && (
                <Undobar
                    message={
                        <p>
                            Clothing Moved to{" "}
                            <Link to="/trash/clothings">trash</Link>
                        </p>
                    }
                    onClickUndo={() => {
                        undoRemoveClothing();
                        setIsUndobarOpen(false);
                    }}
                />
            )}
        </>
    );
};

export default SelectClothingPage;
