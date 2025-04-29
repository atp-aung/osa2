const SearchFrm = (props) => {
  return (
    <>
      <label htmlFor="filter">filter shown with: </label>
      <input id="filter" onChange={props.filterOp} value={props.filterInput} />
    </>
  );
};

export default SearchFrm;
