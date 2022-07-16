import React from "react";

import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import NotePage from "./NotePage";
import SelectClothingPage from "./SelectClothingPage";
import PageNotFound from "./PageNotFound";
import ClothingPage from "./ClothingPage";
import TrashPage, { NotesTrashList, ClothingsTrashList } from "./TrashPage";
import SettingsPage from "./SettingsPage";
import FeedbackPage from "./FeedbackPage";

const Pages: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/note">
                <Route path=":noteId" element={<NotePage />} />
            </Route>
            <Route path="/select-clothing" element={<SelectClothingPage />} />
            <Route path="/clothing">
                <Route path=":clothingId" element={<ClothingPage />} />
            </Route>
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/trash" element={<TrashPage />}>
                <Route path="notes" element={<NotesTrashList />} />
                <Route path="clothings" element={<ClothingsTrashList />} />
            </Route>
            <Route path="/give-feedback" element={<FeedbackPage />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default Pages;
