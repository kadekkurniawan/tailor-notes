import React, { useMemo, useState } from "react";

import { toast } from "react-toastify";
import { useDebounce } from "react-use";

import { NoteListItem } from "../../components/ListItem";
import Undobar from "../../components/Undobar";
import { searchListItems } from "../../helpers";
import { useNoteStore, NoteStore, Note } from "../../store/note";

interface NotesTrashListProps {
    querySearch?: string;
}

const NotesTrashList: React.FC<NotesTrashListProps> = ({ querySearch }) => {
    const { notes, restoreNoteById, undoRestoreNote, deleteNoteTrashById } =
        useNoteStore((state: NoteStore) => state);

    const [isUndobarOpen, setIsUndobarOpen] = useState<boolean>(false);

    useDebounce(() => setIsUndobarOpen(false), 5000, [isUndobarOpen]);

    const filteredNotesTrash: Note[] = useMemo(
        () =>
            searchListItems(
                notes.trash,
                "customerName",
                querySearch!
            ) as Note[],
        [querySearch]
    );

    return (
        <>
            <ul>
                {filteredNotesTrash.map((note: Note) => (
                    <NoteListItem
                        note={note}
                        onClickListItem={() =>
                            toast.info(
                                "You can't view note on trash, restore the note if you want to view it"
                            )
                        }
                        noteOptions={
                            <>
                                <li onClick={() => restoreNoteById(note.id)}>
                                    Restore
                                </li>
                                <li
                                    onClick={() => deleteNoteTrashById(note.id)}
                                >
                                    Delete Forever
                                </li>
                            </>
                        }
                    />
                ))}
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
