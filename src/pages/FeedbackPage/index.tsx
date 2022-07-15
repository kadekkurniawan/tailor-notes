import React from "react";

import { NavigateFunction, useNavigate } from "react-router-dom";

import { Navbar } from "../../components/Navbar";
import FeedbackForm from "./FeedbackForm";

const FeedbackPage: React.FC = () => {
    const navigate: NavigateFunction = useNavigate();

    return (
        <>
            <Navbar
                mainButton="arrow_back"
                onClickMainButton={() => navigate("/")}
                pageName="Feedback"
            />

            <p className="mt-20">
                Sent me feedback at esakurniawan866@gmail.com
            </p>

            <FeedbackForm />
        </>
    );
};

export default FeedbackPage;
