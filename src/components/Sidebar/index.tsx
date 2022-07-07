import React, { useRef } from "react";

import { Link, useLocation } from "react-router-dom";
import { useClickAway } from "react-use";

import Icon from "../../components/Icon";
import logo from "../../images/logo.png";

interface SidebarProps {
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ setIsSidebarOpen }) => {
    const location = useLocation();

    const sidebarRef = useRef(null);

    const sidebarMenus = [
        {
            id: 0,
            label: "Notes",
            icon: "notes",
            path: "/",
        },
        {
            id: 1,
            label: "Feedback",
            icon: "feedback",
            path: "/give-feedback",
        },
        {
            id: 2,
            label: "Settings",
            icon: "settings",
            path: "/settings",
        },
        {
            id: 3,
            label: "Trash",
            icon: "delete",
            path: "/trash/notes",
        },
    ];

    useClickAway(sidebarRef, () => setIsSidebarOpen(false));

    return (
        <div className="z-50 fixed top-0 left-0 h-screen backdrop-blur w-screen">
            <aside
                ref={sidebarRef}
                className="bg-slate-900 relative overflow-y-auto h-full w-72 shadow-xl"
            >
                <header className="aspect-square center-children">
                    <img className="w-1/3" src={logo} alt="logo" />
                </header>

                <div>
                    <ul>
                        {sidebarMenus.map((menu) => (
                            <li key={menu.id}>
                                <Link
                                    to={menu.path}
                                    className={`${
                                        menu.path === location.pathname &&
                                        "bg-slate-800"
                                    } group transition small-padding flex items-center gap-4 hover:border-b hover:border-t hover:border-solid hover:border-slate-800`}
                                >
                                    <Icon
                                        type={menu.icon}
                                        className={`${
                                            menu.path === location.pathname &&
                                            "text-teal"
                                        } text-lg transition group-hover:text-xl group-hover:text-teal`}
                                    />
                                    <span className="semibold-text">
                                        {menu.label}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <footer className="absolute bottom-0 left-0 w-full border-solid small-padding border-t border-slate-800">
                    <div className="flex justify-center flex-wrap ">
                        <a className="text-fuchsia social-media-icon" href="">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a
                            className="text-slate-100 social-media-icon"
                            href="https://github.com/Esa-Kurniawan"
                        >
                            <i className="fa-brands fa-github"></i>
                        </a>
                        <a className="text-blue-400 social-media-icon" href="">
                            <i className="fa-brands fa-linkedin"></i>
                        </a>
                        <a className="text-blue-500 social-media-icon" href="">
                            <i className="fa-brands fa-facebook"></i>
                        </a>
                    </div>
                </footer>
            </aside>
        </div>
    );
};

export default Sidebar;
