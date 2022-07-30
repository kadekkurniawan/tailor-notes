import React, { useState } from "react";

import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import { NavbarWithInputSearch } from "../../components/Navbar";
import NotesTrashList from "./NotesTrashList";
import ClothingsTrashList from "./ClothingsTrashList";

const TrashsPage: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const [querySearch, setQuerySearch] = useState("");

    const location = useLocation();

    return (
        <>
            <NavbarWithInputSearch
                onChangeInputSearch={(e) => setQuerySearch(e.target.value)}
                mainButton="menu"
                inputSearchPlaceholder="Search trash..."
                onClickMainButton={() => setIsSidebarOpen(true)}
            />

            <Sidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            <main className="mt-24">
                <div className="container">
                    <nav className="sticky top-16 flex divide-x divide-slate-700">
                        <div className={`grow `}>
                            <Link
                                className={`py-3 semibold-text center-children border-solid border-b ${
                                    location.pathname === "/trash/notes"
                                        ? "border-teal"
                                        : "border-slate-700"
                                }`}
                                to="/trash/notes"
                            >
                                Notes
                            </Link>
                        </div>
                        <div className={`grow `}>
                            <Link
                                className={`py-3 semibold-text center-children border-solid border-b ${
                                    location.pathname === "/trash/clothings"
                                        ? "border-teal"
                                        : "border-slate-700"
                                }`}
                                to="/trash/clothings"
                            >
                                Clothings
                            </Link>
                        </div>
                    </nav>

                    <Outlet context={querySearch} />
                </div>
            </main>
        </>
    );
};

export default TrashsPage;

export { ClothingsTrashList, NotesTrashList };
