import React, {useState}  from 'react'
import {useHistory}       from 'react-router'
import {withAppContainer} from '../../withAppContainer'

const Register = ({appContainer}) => {

    const [username, setUsername] = useState(null)
    const [error, setError]       = useState(null)
    const history                 = useHistory()

    const register = async () => {
        if (!username) {
            return
        }
        const result = await appContainer.getUserRepository().register(username)
        if (result.error) {
            setError(result.error)
            return
        }
        history.push('/login')

    }

    const onChange = (e) => {
        setUsername(e.target.value)
    }

    return (
        <div>
            <input type="text" onChange={onChange}/>
            <button onClick={register}>Register</button>
            {error && <div style={{color: 'red'}}>{error}</div>}
        </div>
    )
}

export default withAppContainer(Register)