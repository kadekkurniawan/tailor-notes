import React from "react";

import { InputWithBottomBorder } from "../../components/Input";
import Icon from "../../components/Icon";
import { ButtonPrimary } from "../../components/Button";

interface ClothingNavbarProps {
    clothingType: string;
    onChangeClothingType: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClickSave: () => void;
    onClickBack: () => void;
}

const ClothingNavbar: React.FC<ClothingNavbarProps> = ({
    clothingType,
    onChangeClothingType,
    onClickSave,
    onClickBack,
}) => {
    return (
        <nav className="navbar-container">
            <div className="flex items-center justify-between">
                <div className="flex gap-3 max-w-xs px-2 w-2/3 items-center">
                    <button className="button-icon" onClick={onClickBack}>
                        <Icon type="arrow_back" />
                    </button>

                    <InputWithBottomBorder
                        autoFocus={clothingType === ""}
                        value={clothingType}
                        placeholder="Clothing type..."
                        onChange={onChangeClothingType}
                    />
                </div>

                <ButtonPrimary onClick={onClickSave} text="Save" />
            </div>
        </nav>
    );
};

export default ClothingNavbar;
