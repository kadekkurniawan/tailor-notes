import React, { useMemo, useState } from "react";

import { toast } from "react-toastify";
import { useDebounce } from "react-use";

import { NoteListItem } from "../../components/ListItem";
import Undobar from "../../components/Undobar";
import { searchListItems } from "../../helpers";
import { useQuerySearch } from ".";
import { useNoteStore, NoteStore, Note } from "../../store/note";
import { AnimatePresence } from "framer-motion";

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

    useDebounce(() => setIsUndobarOpen(false), 5000, [isUndobarOpen]);

    return (
        <>
            <ul className="grid-column-list mt-6">
                <AnimatePresence>
                    {filteredNotesTrash.map((note: Note) => (
                        <NoteListItem
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
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteNoteFromTrashById(note.id);
                                        }}
                                    >
                                        Delete Forever
                                    </li>
                                </>
                            }
                        />
                    ))}
                </AnimatePresence>
            </ul>

            {isUndobarOpen && (
                <Undobar
                    message={<p>Note restored</p>}
                    onClickUndo={() => undoRestoreNote()}
                />
            )}
        </>
    );
};

export default NotesTrashList;
