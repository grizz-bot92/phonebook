const Filter = ({filterText, handleFilter}) => {
    return (
        <div>
            Filter: <input
                value={filterText}
                onChange={handleFilter}
            />
        </div>
    )
}
        
export default Filter