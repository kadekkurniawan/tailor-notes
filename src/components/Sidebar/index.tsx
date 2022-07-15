import React, { useRef } from "react";

import { useClickAway } from "react-use";
import { AnimatePresence, motion } from "framer-motion";

import logo from "../../images/logo.png";
import MenuListItem from "./MenuListItem";

interface SidebarProps {
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isSidebarOpen: boolean;
}

export interface SidebarMenu {
    id: number;
    label: string;
    icon: string;
    path: string;
}

const Sidebar: React.FC<SidebarProps> = ({
    isSidebarOpen,
    setIsSidebarOpen,
}) => {
    const sidebarRef = useRef(null);

    const sidebarMenus: SidebarMenu[] = [
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

    const sidebarVariants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "-100vw" },
    };

    const menusContainerVariants = {
        open: {
            transition: { staggerChildren: 0.07, delayChildren: 0.2 },
        },
        closed: {
            transition: { staggerChildren: 0.05, staggerDirection: -1 },
        },
    };

    useClickAway(sidebarRef, () => setIsSidebarOpen(false));

    return (
        <AnimatePresence>
            {isSidebarOpen && (
                <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={sidebarVariants}
                    className="z-50 fixed top-0 left-0 h-screen backdrop-blur w-screen"
                >
                    <aside
                        ref={sidebarRef}
                        className="bg-slate-900 relative overflow-y-auto h-full w-72 shadow-xl"
                    >
                        <header className="aspect-square center-children">
                            <img className="w-1/3" src={logo} alt="logo" />
                        </header>

                        <div>
                            <motion.ul variants={menusContainerVariants}>
                                {sidebarMenus.map((menu) => (
                                    <MenuListItem key={menu.id} menu={menu} />
                                ))}
                            </motion.ul>
                        </div>

                        <footer className="absolute bottom-0 left-0 w-full border-solid small-padding border-t border-slate-800">
                            <div className="flex justify-center flex-wrap ">
                                <a
                                    className="text-fuchsia social-media-icon"
                                    href=""
                                >
                                    <i className="fa-brands fa-instagram"></i>
                                </a>
                                <a
                                    className="text-slate-100 social-media-icon"
                                    href="https://github.com/Esa-Kurniawan"
                                >
                                    <i className="fa-brands fa-github"></i>
                                </a>
                                <a
                                    className="text-blue-400 social-media-icon"
                                    href=""
                                >
                                    <i className="fa-brands fa-linkedin"></i>
                                </a>
                                <a
                                    className="text-blue-500 social-media-icon"
                                    href=""
                                >
                                    <i className="fa-brands fa-facebook"></i>
                                </a>
                            </div>
                        </footer>
                    </aside>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Sidebar;
