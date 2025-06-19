import { useState, useEffect } from 'react';

export function ControlledUserViewer() {
    const [value, setValue] = useState("");
    const [user, setUser] = useState({id:0, name:'default name', email:'ff@gmail.com'});

    useEffect(() => { 
        fetch('https://jsonplaceholder.typicode.com/users/'+value)
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
        .then((json) => {console.log(json); setUser(json)})
        .catch((error) => {
            console.log('error')
        });
    }, [value]) 

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    return <>
        <form>
            <label>Enter user's number
                <input type="text" value={value} onChange={handleChange}></input>
            </label>
        </form>
        <div>
            <p>User's ID: {user.id}</p>
            <p>User name: {user.name}</p>
            <p>User's email: {user.email}</p>
        </div>
    </>
}
