const Message = ({ message, errorMessage }) => {
  if (message === null) {
    return null;
  }

  return (
    <p className={errorMessage ? "warning-message" : "message"}>{message}</p>
  );

  // if (errorMessage) {
  //   return <p className="warning-message">{message}</p>;
  // } else {
  //   return <p className="message">{message}</p>;
  // }
};

export default Message;
