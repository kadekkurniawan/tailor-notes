import React from "react";

import {
    useParams,
    useNavigate,
    NavigateFunction,
    Link,
} from "react-router-dom";
import { useMeasure, usePageLeave } from "react-use";

import { Sizing, Clothing } from "../../store/clothing";
import { useNoteStore, NoteStore, Note } from "../../store/note";
import SizingListItem from "./SizingListItem";
import NoteNavbar from "./NoteNavbar";
import Error from "../../components/Error";
import { findListItem, replaceListItem } from "../../helpers";
import Label from "../../components/Label";

const NotePage: React.FC = () => {
    const navigate: NavigateFunction = useNavigate();
    const { noteId } = useParams();

    const { notes, modifyNoteProperties } = useNoteStore(
        (state: NoteStore) => state
    );
    const currentNote: Note = findListItem(notes.data, noteId!);

    const modifyClothingProperties = (clothingProperties: any) => {
        const modifiedClothing: Clothing = {
            ...currentNote.clothing,
            ...clothingProperties,
        } as Clothing;

        modifyNoteProperties(currentNote, {
            clothing: modifiedClothing,
        });
    };

    const handleModifySize = (newSize: string, sizing: Sizing) => {
        const updatedSizingsArray: Sizing[] = replaceListItem(
            currentNote.clothing.sizings,
            sizing.id,
            {
                ...sizing,
                size: newSize,
            }
        ) as Sizing[];

        modifyClothingProperties({
            sizings: updatedSizingsArray,
        });
    };

    const [navbarRef, { height }] = useMeasure();

    if (currentNote === undefined)
        return (
            <Error
                title="Note Not Found"
                description={
                    <p>
                        maybe you already remove it?. If yes check on{" "}
                        <Link to="/trash/notes">trash page</Link>
                        then
                    </p>
                }
            />
        );

    return (
        <>
            <NoteNavbar
                ref={navbarRef}
                modifyClothingProperties={modifyClothingProperties}
                onClickBack={() => navigate("/")}
                modifyNoteProperties={modifyNoteProperties}
                note={currentNote}
            />

            <main style={{ margin: `${height + 40}px 0 16px` }}>
                <div className="container ">
                    <ul className="grid-column-list">
                        {currentNote.clothing.sizings.map((sizing: Sizing) => (
                            <SizingListItem
                                key={sizing.id}
                                measurementType={
                                    currentNote.clothing.measurementType!
                                }
                                sizing={sizing}
                                onChangeSize={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => handleModifySize(e.target.value, sizing)}
                            />
                        ))}
                        <li className="md:col-span-full flex flex-col gap-0.5">
                            <Label
                                htmlFor="extra-note"
                                text="An extra note"
                                className="label"
                            />
                            <textarea
                                placeholder="You can write anything related to this records here..."
                                className="medium-input bg-slate-900 h-52"
                                id="extra-note"
                                value={currentNote.extraNote}
                                onChange={(e) =>
                                    modifyNoteProperties(currentNote, {
                                        extraNote: e.target.value,
                                    })
                                }
                            />
                        </li>
                    </ul>
                </div>
            </main>
        </>
    );
};

export default NotePage;
