import { useState } from 'react';

export function ControlledSearchForm() {

    const MSG_NOT_ENOUGH = 'Enter at least 4 letters';
    const MSG_ENOUGH = 'Can search now';

    const [value, setValue] = useState("");
    const [message, setMessage] = useState(MSG_NOT_ENOUGH);
    const [buttonEnable, setButtonEnable] = useState(false);

    const handleChange = (e) => {
        setValue(e.target.value);
        if (e.target.value.length > 3) {
            setMessage(MSG_ENOUGH);
            setButtonEnable(true);
        }
        else {
            setMessage(MSG_NOT_ENOUGH);
            setButtonEnable(false);
        }
    }

    return (
        <>
            <form className="controlled-search-form">
                <label>Enter text
                    <input type="text" name="search" value={value} onChange={handleChange} />
                </label>
                <button type="button" disabled={!buttonEnable}>Search</button>
            </form>
            <p>{message}</p>
        </>
    )
}