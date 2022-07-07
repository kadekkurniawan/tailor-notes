import React, { useState } from "react";

import { Link, Outlet, useLocation } from "react-router-dom";

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

    const location = useLocation();

    const notes = useNoteStore((state: NoteStore) => state.notes);

    return (
        <>
            <NavbarWithInputSearch
                onChangeInputSearch={(e) => setQuerySearch(e.target.value)}
                mainButton="menu"
                inputSearchPlaceholder="Search trash..."
                onClickMainButton={() => setIsSidebarOpen(true)}
            />

            {isSidebarOpen && <Sidebar setIsSidebarOpen={setIsSidebarOpen} />}

            <main className="mt-72">
                <div className="container">
                    <nav className="sticky top-16 flex divide-x divide-slate-700">
                        <Link
                            to="/trash/notes"
                            className={`grow py-3 border-solid border-b semibold-text center-children ${
                                location.pathname === "/trash/notes"
                                    ? " border-teal"
                                    : "border-slate-700"
                            }`}
                        >
                            {notes.trash.length > 0 ? "Notes" : "Note"}
                        </Link>

                        <Link
                            className={`grow py-3 semibold-text center-children ${
                                location.pathname === "/trash/clothings"
                                    ? "border border-slate-100"
                                    : ""
                            }`}
                            to="/trash/clothings"
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
