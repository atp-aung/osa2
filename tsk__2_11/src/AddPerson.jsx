const Addperson = (props) => {
  return (
    <>
      <form onSubmit={props.submitClick}>
        <div>
          <label htmlFor="name">name: </label>
          <input
            id="name"
            value={props.newName}
            onChange={props.handleNameChange}
            placeholder="Enter name"
          />
        </div>
        <div>
          <label htmlFor="number">number: </label>
          <input
            id="number"
            value={props.newPhone}
            onChange={props.handlePhoneChange}
            placeholder="Enter number"
          />
        </div>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default Addperson;
