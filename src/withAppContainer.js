import React, {createContext, useContext} from 'react'

export const AppContainerCtx = createContext({})

export const withAppContainer = (Component) => {

    return (props) => {
        return <Component {...props} {...useContext(AppContainerCtx)}/>
    }
}
