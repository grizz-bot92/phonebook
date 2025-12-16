const Person = ({name, handleNameChange}) => {
    return(
        <div>
            Name: <input required
                value={name}
                onChange={handleNameChange}   
            />
        </div>
    )
}

export default Person