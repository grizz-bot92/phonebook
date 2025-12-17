import { useEffect, useState } from 'react'
import Contacts from './components/Contacts'
import Filter from './components/Filter'
import Person from './components/Person'
import personUpdate from './services/persons'
import Notification from './components/Notification'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)


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
      name: newName,
      number: newNumber,
    }
    
    const existingContact = persons.find(person => person.name === personObject.name)
    
    if(!existingContact){
      personUpdate
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))            
          setErrorMessage(`Added ${personObject.name}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        return
    }
    
    if(existingContact.number === personObject.number){
      setErrorMessage(
        `${personObject.name} is already added to the phone book`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }
    
    const confirmation = confirm(`${existingContact.name} is already added to the phonebook, replace the old number with a new one?`)
    if(!confirmation) return

    const updatedContact  = { ...existingContact, number: personObject.number }

    personUpdate
      .update(existingContact.id, updatedContact).then(returnedContact =>{
        setPersons(prev => 
          prev.map(p => (p.id === existingContact.id ? returnedContact : p))
        )
        setErrorMessage(`${updatedContact.name}'s number has been updated`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setErrorMessage(`${updatedContact.name} was already deleted from server`)
        personUpdate.getAll().then(updatedContacts => {
          setPersons(updatedContacts)
        })

      })

  }


  const handleDelete = (id) => {
    const contact = persons.find(c => c.id === id)
    const confirmation = confirm(`Delete ${contact.name}`)

    if(confirmation){
      personUpdate
        .deleteContact(contact.id)
        .then(() =>
          setPersons(prevPersons => prevPersons.filter(p => p.id !== id))
      ).catch(error => {
        console.log(error)
      }) 
    }
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
      <Notification message={errorMessage}/>
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
          <Contacts 
            key={person.id} 
            name={person.name} 
            number={person.number}
            id={person.id} 
            deleteContact={handleDelete}
          />
        )}
      </ul>
    </div>
  )
}

export default App