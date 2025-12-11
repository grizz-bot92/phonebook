const Contacts = ({ name, number, deleteContact, id }) =>{
    return(
        <li>{name} {number} <button onClick={() => deleteContact(id)}>delete</button></li>
    )
}

export default Contacts