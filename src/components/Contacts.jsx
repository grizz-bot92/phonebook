const Contacts = ({ name, number, deleteContact }) =>{
    return(
        <li>{name} {number} <button onClick={()=> deleteContact}>delete</button></li>
    )
}

export default Contacts