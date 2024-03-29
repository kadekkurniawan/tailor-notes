import React, { useMemo, useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import { useDebounce } from "react-use";
import { AnimatePresence } from "framer-motion";

import { searchListItems } from "../../utils";
import { NoteListItem } from "../../components/ListItem";
import { useNoteStore, Note, NoteStore } from "../../store/note";
import Icon from "../../components/Icon";
import Sidebar from "../../components/Sidebar";
import { NavbarWithInputSearch } from "../../components/Navbar";
import Undobar from "../../components/Undobar";
import Error from "../../components/Error";

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const { notes, removeNoteById, undoRemoveNote } = useNoteStore(
        (state: NoteStore) => state
    );

    const [querySearch, setQuerySearch] = useState<string>("");

    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const [isUndobarOpen, setIsUndobarOpen] = useState<any>(false);

    const handleRemoveNote = (
        e: React.MouseEvent<HTMLLIElement, MouseEvent>,
        noteId: string
    ) => {
        e.stopPropagation();
        removeNoteById(noteId);
        setIsUndobarOpen(true);
    };

    const filteredNotes: Note[] = useMemo(
        () => searchListItems(notes.data, "customerName", querySearch),
        [querySearch, notes]
    );

    const noteNotFound =
        querySearch !== "" && filteredNotes.length === 0 ? true : false;

    useDebounce(() => setIsUndobarOpen(false), 5000, [isUndobarOpen]);

    return (
        <>
            <NavbarWithInputSearch
                onClickMainButton={() => setIsSidebarOpen(true)}
                mainButton="menu"
                inputSearchPlaceholder="Search notes..."
                rightSide={
                    <Link
                        className="hidden h-11 bg-slate-800 rounded-md slate-700-border aspect-square lg:center-children"
                        to="/select-clothing"
                    >
                        <Icon type="add" className="text-teal text-4xl" />
                    </Link>
                }
                onChangeInputSearch={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setQuerySearch(e.target.value)
                }
            />

            <Sidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            <main className="mt-20 lg:mt-24 mb-4 ">
                <div className="container">
                    <ul className="grid-column-list">
                        <AnimatePresence>
                            {filteredNotes.map(
                                (note: Note, noteIndex: number) => (
                                    <NoteListItem
                                        querySearch={querySearch}
                                        noteIndex={noteIndex}
                                        key={note.id}
                                        note={note}
                                        onClickListItem={() =>
                                            navigate(`/note/${note.id}`)
                                        }
                                        noteOptions={
                                            <>
                                                <li
                                                    className="text-list-item text-red hover:text-dark-red"
                                                    onClick={(e) =>
                                                        handleRemoveNote(
                                                            e,
                                                            note.id
                                                        )
                                                    }
                                                >
                                                    Remove
                                                </li>
                                            </>
                                        }
                                    />
                                )
                            )}
                        </AnimatePresence>
                    </ul>
                    <Error
                        open={noteNotFound}
                        title="Note not found"
                        description={
                            <p>
                                Perhaps you already remove it?. if yes check the{" "}
                                <Link
                                    to="/trash/notes"
                                    className="underline text-blue-500"
                                >
                                    trash page
                                </Link>{" "}
                                then
                            </p>
                        }
                    />
                </div>
            </main>

            <Undobar
                isUndobarOpen={isUndobarOpen}
                message={
                    <p>
                        Note moved to <Link to="/trash/notes">trash</Link>
                    </p>
                }
                onClickUndo={() => {
                    undoRemoveNote();
                    setIsUndobarOpen(false);
                }}
            />

            <div
                className={`fixed lg:hidden bottom-6 right-6 ${
                    isUndobarOpen && "bottom-20"
                }`}
            >
                <Link
                    to="/select-clothing"
                    className="center-children bg-slate-800 aspect-square h-12 rounded-md slate-700-border"
                >
                    <Icon className="text-teal text-4xl" type="add" />
                </Link>
            </div>
        </>
    );
};

export default HomePage;
