import React, {useState}  from 'react'
import {withAppContainer} from '../../withAppContainer'
import {Link}             from 'react-router-dom'

const Login = ({appContainer}) => {
    const [username, setUsername] = useState(null)
    const [error, setError]       = useState(null)

    const login = async () => {
        if (!username) {
            return
        }
        const userRepo = appContainer.getUserRepository()
        const result   = await userRepo.login(username)
        if (result.error) {
            setError(result.error)
        }
    }

    const onChange = (e) => {
        setUsername(e.target.value)
    }

    return (
        <div className={'auth'}>
            <input type="text" onChange={onChange}/>
            <button onClick={login}>Login</button>
            <Link to={'/register'}> or Register</Link>
            {error && <div style={{color: 'red'}}>{error}</div>}
        </div>
    )
}

export default withAppContainer(Login)