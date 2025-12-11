import { useEffect, useState } from 'react'
import Contacts from './components/Contacts'
import Filter from './components/Filter'
import Person from './components/Person'
import personUpdate from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    personUpdate
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  }, [])
  
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
      personUpdate
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }

  }

  const handleDelete = (id) => {
    const contact = persons.find(c => c.id === id)
    personUpdate
      .delete(contact).then(
        confirm('Delete ${persons.name}')
        )
        .catch(error => {
          alert('contact already deleted')
        
      })
      setPersons(persons.filter(p => p.id !== id))
  }

  const handleNameChange = (event) =>{ 
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
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
          <Contacts key={person.id} name={person.name} number={person.number} deleteContact={handleDelete}/>
        )}
      </ul>
    </div>
  )
}

export default App