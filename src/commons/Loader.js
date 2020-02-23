import React from 'react';

export const Loader = ({loading, children}) => {
    if (loading) {
        return <div>Loading ...</div>;
    }

    return children;
};