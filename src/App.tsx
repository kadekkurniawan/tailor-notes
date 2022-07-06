import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Pages from "./pages";

const App: React.FC = () => {
    return (
        <div className="bg-slate-900 min-h-screen p-0.5 w-screen">
            <Pages />
            <ToastContainer newestOnTop={true} theme="dark" />
        </div>
    );
};

export default App;
