import React, { ChangeEvent } from "react";
import { InputWithIconAtLeftSide } from "../Input";
import Icon from "../Icon";

interface NavbarWithSearchProps {
    mainButton: string;
    onClickMainButton: () => void;
    onChangeInputSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    rightSide?: React.ReactNode;
    inputSearchPlaceholder?: string;
}

const NavbarWithInputSearch: React.FC<NavbarWithSearchProps> = ({
    mainButton,
    onClickMainButton,
    onChangeInputSearch,
    rightSide,
    inputSearchPlaceholder,
}) => {
    return (
        <nav className="navbar-container">
            <div className="flex justify-between gap-4 items-center">
                <div className="flex gap-3 items-center w-full max-w-xl ">
                    <button className="button-icon" onClick={onClickMainButton}>
                        <Icon type={mainButton} />
                    </button>

                    <InputWithIconAtLeftSide
                        icon="search"
                        placeholder={inputSearchPlaceholder}
                        onChange={onChangeInputSearch}
                    />
                </div>

                {rightSide}
            </div>
        </nav>
    );
};

export default NavbarWithInputSearch;
