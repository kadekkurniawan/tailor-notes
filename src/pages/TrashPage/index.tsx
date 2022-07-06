import React, { useState } from "react";

import { Link, Outlet } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import { NavbarWithInputSearch } from "../../components/Navbar";
import NotesTrashList from "./NotesTrashList";
import ClothingsTrashList from "./ClothingsTrashList";
import { ClothingStore, useClothingStore } from "../../store/clothing";
import { NoteStore, useNoteStore } from "../../store/note";

const TrashsPage: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const [querySearch, setQuerySearch] = useState("");

    const clothings = useClothingStore(
        (state: ClothingStore) => state.clothings
    );
    const notes = useNoteStore((state: NoteStore) => state.notes);

    return (
        <>
            <NavbarWithInputSearch
                onChangeInputSearch={(e) => setQuerySearch(e.target.value)}
                mainButton="menu"
                onClickMainButton={() => setIsSidebarOpen(true)}
            />

            {isSidebarOpen && <Sidebar setIsSidebarOpen={setIsSidebarOpen} />}

            <main>
                <div className="container">
                    <nav className="sticky top-16 flex divide-x divide-slate-700">
                        <Link
                            to="/trash/notes"
                            className="grow border-b-2 border-indigo-500 border-solid py-2 font-sans font-medium text-slate-400"
                        >
                            {notes.trash.length > 0 ? "Notes" : "Note"}
                        </Link>
                        <Link
                            to="/trash/clothes"
                            className="grow border-b-2 border-indigo-500 border-solid py-2 font-sans font-medium text-slate-400"
                        >
                            {clothings.trash.length > 0
                                ? "Clothings"
                                : "Clothing"}
                        </Link>
                    </nav>

                    <Outlet />
                </div>
            </main>
        </>
    );
};

export default TrashsPage;

export { ClothingsTrashList, NotesTrashList };
