import React from "react";

import Error from "../../components/Error";

const PageNotFound: React.FC = () => {
    return <Error title="Error 404" description={<p>Page not found</p>} />;
};

export default PageNotFound;
