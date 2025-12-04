import { useState } from 'react'
import Contacts from './components/Contacts'
import Filter from './components/Filter'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  const contactsToShow = filterText === "" ? 
      persons: 
      persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase()))

  
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: String(persons.length + 1),
      name: newName,
      number: newNumber,
    }
    if(
      persons.some(person => person.name === personObject.name) &&
      persons.some(person => person.number === personObject.number)
    ){
      window.alert(`${personObject.name} is already added to the phone book`)
    }
     else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }

  }

  const handleNameChange = (event) =>{ 
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) =>{
    setFilterText(event.target.value)
  }


  return(
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterText={filterText}
        handleFilter={handleFilter}
        />
      <h2>Add New</h2>
      <form onSubmit={addPerson}>
        <Person 
          name={newName}
          handleNameChange={handleNameChange}
        />
        <div>
          Number: <input required
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {contactsToShow.map(person =>
          <Contacts key={person.id} name={person.name} number={person.number}/>
        )}
      </ul>
    </div>
  )
}

export default App