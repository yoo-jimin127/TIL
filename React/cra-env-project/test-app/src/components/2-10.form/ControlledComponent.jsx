import React, {useState} from 'react'

export default function ControlledComponent() {
    const [name, setName] = useState('');
    const [essay, setEssay] = useState('Please write an essay about your favorite DOM element.');
    const [flavor, setFlavor] = useState("coconut");

    function handleChange(event) {
        const name= event.target.name;
        if (name === 'name') {
            setName(event.target.value);
        }
        if (name === 'essay') {
            setEssay(event.target.value);
        }
        if (name === 'flavor') {
            setFlavor(event.target.value);
        }
        setName(event.target.value);
    }

    // function handleEssayChange(event) {
    //     setEssay(event.target.value)
    // }

    // function handleFlavorChange(event) {
    //     setFlavor(event.target.value);
    // }

    function handleSubmit(event) {
        alert(`name: ${name}, essay: ${essay}`);
        event.preventDefault();
    }

  return (
    <form onSubmit={handleSubmit}>
        <label>
            Name:
            <input name="name" type="text" value={name} onChange={handleChange} />
        </label>
        <br />
        <br />
        <label>
            Essay:
            <textarea name="essay" value={essay} onChange={handleChange} />
        </label>
        <br />
        <br />
        <label>
            Pick your favorite flavor:
            <textarea name="flabor" value={flavor} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
    </form>
  )
}
