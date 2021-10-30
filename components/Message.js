const Message = ({ message, level }) => {
  return (
    <>
      <div className={`message ${level}`}>{message}</div>
      <style jsx>{`
        .message {
          font-size: 3em;
          padding: 0.5em;
          margin: 0.5em 0;
          text-align: center;
        }
        .success {
          background-color: lightgreen;
          color: green;
        }
        .warning {
          background-color: bisque;
          color: darkorange;
        }
        .danger {
          background-color: lightpink;
          color: red;
        }
      `}</style>
    </>
  );
};

export default Message;
