const SearchFrm = (props) => {
  return (
    <>
      <label htmlFor="filter">filter shown with: </label>
      <input id="filter" onChange={props.filterOp} />
    </>
  );
};

export default SearchFrm;
