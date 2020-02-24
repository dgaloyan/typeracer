import React from 'react'

export const Loader = ({loading, children}) => {
    if (loading) {
        return <div style={{margin: '0 auto', fontSize: 32}}>Loading ...</div>
    }

    return children
}