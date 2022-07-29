import React, { useMemo, useState } from "react";

import { toast } from "react-toastify";
import { useDebounce } from "react-use";

import { NoteListItem } from "../../components/ListItem";
import Undobar from "../../components/Undobar";
import { searchListItems } from "../../utils";
import { useQuerySearch } from ".";
import { useNoteStore, NoteStore, Note } from "../../store/note";
import { AnimatePresence } from "framer-motion";
import Error from "../../components/Error";

interface NotesTrashListProps {
    querySearch?: string;
}

const NotesTrashList: React.FC<NotesTrashListProps> = ({ querySearch }) => {
    const { notes, restoreNoteById, undoRestoreNote, deleteNoteFromTrashById } =
        useNoteStore((state: NoteStore) => state);

    const [isUndobarOpen, setIsUndobarOpen] = useState<boolean>(false);

    const handleRestoreNote = (
        e: React.MouseEvent<HTMLLIElement, MouseEvent>,
        noteId: string
    ) => {
        e.stopPropagation();

        restoreNoteById(noteId);
        setIsUndobarOpen(true);
    };

    const quarySearch = useQuerySearch();

    const filteredNotesTrash = useMemo(
        () => searchListItems(notes.trash, "customerName", quarySearch),
        [notes, quarySearch]
    );

    const handleDeleteNote = (
        e: React.MouseEvent<HTMLLIElement, MouseEvent>,
        noteId: string
    ) => {
        e.stopPropagation();
        deleteNoteFromTrashById(noteId);
    };

    const isNoteFound =
        quarySearch !== "" && filteredNotesTrash.length === 0 ? true : false;

    useDebounce(() => setIsUndobarOpen(false), 5000, [isUndobarOpen]);

    return (
        <>
            <ul className="grid-column-list mt-6">
                <AnimatePresence>
                    {filteredNotesTrash.map((note: Note, noteIndex: number) => (
                        <NoteListItem
                            noteIndex={noteIndex}
                            key={note.id}
                            note={note}
                            onClickListItem={() =>
                                toast.info(
                                    "Can't view note in trash, restore the note if you want to view it"
                                )
                            }
                            noteOptions={
                                <>
                                    <li
                                        className="text-list-item"
                                        onClick={(e) =>
                                            handleRestoreNote(e, note.id)
                                        }
                                    >
                                        Restore
                                    </li>
                                    <li
                                        className="text-list-item text-red hover:text-dark-red"
                                        onClick={(e) =>
                                            handleDeleteNote(e, note.id)
                                        }
                                    >
                                        Delete Forever
                                    </li>
                                </>
                            }
                        />
                    ))}
                </AnimatePresence>
            </ul>

            <Error
                open={isNoteFound}
                title="Note not found"
                description={<p>Perhaps you already delete it permanently?</p>}
            />

            <Undobar
                isUndobarOpen={isUndobarOpen}
                message={<p>Note restored</p>}
                onClickUndo={() => undoRestoreNote()}
            />
        </>
    );
};

export default NotesTrashList;
