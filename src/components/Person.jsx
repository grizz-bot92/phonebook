const Person = ({newName, handleNameChange}) => {
    return(
        <div>
            Name: <input required
                value={newName}
                onChange={handleNameChange}   
            />
        </div>
    )
}

export default Person