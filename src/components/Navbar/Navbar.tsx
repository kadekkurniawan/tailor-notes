import React from "react";
import Icon from "../Icon";

interface NavbarProps {
    onClickMainButton: () => void;
    mainButton: string;
    pageName: string;
    rightSide?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({
    onClickMainButton,
    mainButton,
    pageName,
    rightSide,
}) => {
    return (
        <nav className="navbar-container">
            <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                    <button className="button-icon" onClick={onClickMainButton}>
                        <Icon type={mainButton} />
                    </button>
                    <h2>{pageName}</h2>
                </div>
                {rightSide}
            </div>
        </nav>
    );
};

export default Navbar;
