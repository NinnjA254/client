import "./SearchBar.css";

export default function SearchBar({ filter, setFilter, displayAllFilters }) { //displayAllFilters prop determines if the statusFilter controller will display
  function handleSelectChange(e) {
    setFilter((prev) => {
      return { ...prev, statusFilter: e.target.value };
    });
  }
  return (
    <div id="search-bar">
      <input id = 'search-bar-input'
        value={filter.idFilter}
        onChange={(e) =>
          setFilter((prev) => {
            if (e.target.value.length <= 24) return { ...prev, idFilter: e.target.value }; 
            else return prev;
          })
        }
        type="text"
        placeholder="Find Order by Id..."
      />

      {displayAllFilters && <select id = 'search-bar-select' value={filter.statusFilter} onChange={handleSelectChange}>
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Fulfilled">Fulfilled</option>
      </select>}
    </div>
  );
}
