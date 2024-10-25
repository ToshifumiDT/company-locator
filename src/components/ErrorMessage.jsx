import '../App.css';

function ErrorMessage({ message }) {
    return (
       // Container for displaying the message
      <div className="error-message">
        {/* Display the message */}
        <p>{message}</p>
      </div>
    );
  }
  
  export default ErrorMessage;
  