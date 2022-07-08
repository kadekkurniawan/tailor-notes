import React from "react";

import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

import Icon from "../../components/Icon";
import { SidebarMenu } from ".";

interface MenuItemProps {
    menu: SidebarMenu;
}

const MenuListItem: React.FC<MenuItemProps> = ({ menu }) => {
    const location = useLocation();

    const menuVariants = {
        open: {
            x: 0,
            opacity: 1,
            transition: {
                x: { stiffness: 1000, velocity: 1000 },
            },
        },
        closed: {
            x: "-50%",
            opacity: 0,
            transition: {
                x: { stiffness: 1000 },
            },
        },
    };

    return (
        <motion.li variants={menuVariants}>
            <Link
                to={menu.path}
                className={`${
                    menu.path === location.pathname && "bg-slate-800"
                } group transition small-padding flex items-center gap-4 hover:border-b hover:border-t hover:border-solid hover:border-slate-800`}
            >
                <Icon
                    type={menu.icon}
                    className={`${
                        menu.path === location.pathname && "text-teal"
                    } text-lg transition group-hover:text-xl group-hover:text-teal`}
                />
                <span className="semibold-text">{menu.label}</span>
            </Link>
        </motion.li>
    );
};

export default MenuListItem;
