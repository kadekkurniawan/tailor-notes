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

            <main className="mt-24">
                <div className="container">
                    {/* remve this text when feedback form are ready (it's worked) */}
                    <p>Sent me feedback at esakurniawan866@gmail.com</p>
                    <FeedbackForm />
                </div>
            </main>
        </>
    );
};

export default FeedbackPage;
