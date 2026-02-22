import { useState } from 'react'

const LoginForm = ({ userLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUserLogin = (event) => {
        event.preventDefault()
        userLogin({ username, password })
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleUserLogin}>
                <div>
                    username
                    <input
                        value={username}
                        data-testid="username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        data-testid="password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm
