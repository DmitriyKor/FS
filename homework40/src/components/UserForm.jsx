import { useState, useEffect, useRef } from 'react';

export function UserForm() {
    //   const [user, setUser] = useState(null)

    const nameRef = useRef("");
    const emailRef = useRef("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            body: JSON.stringify({
                name: nameRef.current.value,
                email: emailRef.current.value,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    }

    return (
        <form className="reg-form" onSubmit={handleSubmit}>
            <label >Name
                <input type="text" name="name" ref={nameRef} />
            </label>
            <label>email
                <input type="email" name="email" ref={emailRef} />
            </label>
            <button type="submit">Send</button>
        </form>
    )
}