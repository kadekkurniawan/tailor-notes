import React from "react";

import { NavigateFunction, useNavigate } from "react-router-dom";

import { Navbar } from "../../components/Navbar";
import FeedbackForm from "./FeedbackForm";

const FeedbackPage: React.FC = () => {
    const navigate: NavigateFunction = useNavigate();

    return (
        <>
            <Navbar
                mainButton="arrow-left"
                onClickMainButton={() => navigate("/")}
                pageName="Feedback"
            />

            <FeedbackForm />
        </>
    );
};

export default FeedbackPage;
