import React              from 'react'
import {Redirect, Route}  from 'react-router-dom'
import {withAppContainer} from '../withAppContainer'

const PrivateRoute = ({children, appContainer, path}) => {

    if (appContainer.getUserRepository().isLoggedIn) {
        return <Route path={path} component={() => children}/>
    }

    return <Redirect to={'/login'}/>
}

export default withAppContainer(PrivateRoute)