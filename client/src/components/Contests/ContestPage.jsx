
import * as React from 'react';
import Filter from "./Filter";


export default function ContestPage() {
    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="w-11/12 mx-auto">

            <Filter />
        </div>
    )
}