import React              from 'react'
import {Redirect, Route}  from 'react-router-dom'
import {withAppContainer} from '../withAppContainer'

const PublicRoute = ({children, appContainer, path}) => {

    if (!appContainer.getUserRepository().isLoggedIn) {
        return <Route path={path} component={() => children}/>
    }

    return <Redirect to={'/board'}/>
}

export default withAppContainer(PublicRoute)