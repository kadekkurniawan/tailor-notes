import create from "zustand";
import { persist, devtools } from "zustand/middleware";

import { removeListItem, replaceListItem } from "../../utils";
import { Note, NoteStore } from "./index";

const noteStore = (set: any, get: any): NoteStore => ({
    notes: {
        data: [],
        trash: [],
    },
    modifyNoteProperties: (note: Note, noteProperties: Object) => {
        set((state: NoteStore) => ({
            notes: {
                ...state.notes,
                data: replaceListItem(state.notes.data, note.id, {
                    ...note,
                    ...noteProperties,
                    lastModified: new Date(),
                }) as Note[],
            },
        }));
    },
    addNote: (note: Note) => {
        set((state: NoteStore) => ({
            notes: {
                ...state.notes,
                data: [note, ...state.notes.data],
            },
        }));
    },
    removeNoteById: (noteId: string) => {
        const selectedNote: Note = get().notes.data.find(
            (note: Note) => note.id === noteId
        );

        set((state: NoteStore) => ({
            notes: {
                trash: [selectedNote, ...state.notes.trash],
                data: removeListItem(
                    state.notes.data,
                    selectedNote.id
                ) as Note[],
            },
        }));
    },
    undoRemoveNote: () => {
        const previouslyRemovedNote: Note = get().notes.trash.at(0);

        set((state: NoteStore) => ({
            notes: {
                data: [previouslyRemovedNote, ...state.notes.data],
                trash: removeListItem(
                    state.notes.trash,
                    previouslyRemovedNote.id
                ) as Note[],
            },
        }));
    },
    restoreNoteById: (noteId: string) => {
        const selectedNote: Note = get().notes.trash.find(
            (note: Note) => note.id === noteId
        );

        set((state: NoteStore) => ({
            notes: {
                data: [selectedNote, ...state.notes.data],
                trash: removeListItem(
                    state.notes.trash,
                    selectedNote.id
                ) as Note[],
            },
        }));
    },
    undoRestoreNote: () => {
        const previouslyRestoredNote: Note = get().notes.data.at(0);

        set((state: NoteStore) => ({
            notes: {
                trash: [previouslyRestoredNote, ...state.notes.trash],
                data: removeListItem(
                    state.notes.data,
                    previouslyRestoredNote.id
                ) as Note[],
            },
        }));
    },
    deleteNoteFromTrashById: (noteId: string) => {
        set((state: NoteStore) => ({
            notes: {
                ...state.notes,
                trash: removeListItem(state.notes.trash, noteId) as Note[],
            },
        }));
    },
    deleteAllNotesFromTrash: () => {
        set((state: NoteStore) => ({
            notes: {
                ...state.notes,
                trash: [] as Note[],
            },
        }));
    },
});

const useNoteStore = create(devtools(persist(noteStore, { name: "note" })));

export default useNoteStore;
