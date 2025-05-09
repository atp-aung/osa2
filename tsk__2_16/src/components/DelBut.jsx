const DelBut = (props) => {
  return <button onClick={() => props.delOp(props.id)}>delete</button>;
};

export default DelBut;
