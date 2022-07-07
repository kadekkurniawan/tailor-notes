import useNoteStore from "./noteStore";
import { Clothing } from "../clothing";

export interface Note {
    customerName: string;
    clothing: Clothing;
    deadline: string;
    lastModified: Date;
    id: string;
    extraNote: string;
}

export type NoteStore = {
    notes: {
        data: Note[];
        trash: Note[];
    };
    modifyNoteProperties: (note: Note, noteProperties: any) => void;
    addNote: (note: Note) => void;
    removeNoteById: (noteId: string) => void;
    undoRemoveNote: () => void;
    restoreNoteById: (noteId: string) => void;
    undoRestoreNote: () => void;
    deleteNoteFromTrashById: (noteId: string) => void;
    deleteAllNotesFromTrash: () => void;
};

export { useNoteStore };
