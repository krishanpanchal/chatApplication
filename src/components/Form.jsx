import { useState, useEffect } from 'react';
import '../index.css';

function Form() {
  const [customerNumber, setCustomerNumber] = useState('CS101');
  const [reason, setReason] = useState('');
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [allSupportData, setAllSupportData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('supportDataArray')) || [];
    setAllSupportData(storedData);
  }, []);

  const handleCustomerSubmit = () => {
    if (reason && query) {
      const newEntry = { customerNumber, reason, query, response: '' };

      const updatedSupportData = [...allSupportData, newEntry];
      localStorage.setItem('supportDataArray', JSON.stringify(updatedSupportData));

      setAllSupportData(updatedSupportData);
      setReason('');
      setQuery('');
    } else {
      alert('Please fill all the fields.');
    }
  };

  const handleResponseSubmit = (index) => {
    if (response) {
      const updatedSupportData = [...allSupportData];
      updatedSupportData[index].response = response;
      localStorage.setItem('supportDataArray', JSON.stringify(updatedSupportData));

      setAllSupportData(updatedSupportData);
      setResponse('');
      alert('Response submitted successfully!');
    } else {
      alert('Please enter a response.');
    }
  };

  return (
    <div className="container">
      <h1>Form</h1>

      <div className="section">
        <select
          value={customerNumber}
          onChange={(e) => setCustomerNumber(e.target.value)}
          className="input"
        >
          <option>Select Customer No.</option>
          <option value="CS101">CS101</option>
          <option value="CS102">CS102</option>
          <option value="CS103">CS103</option>
        </select>

        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason:"
          className="input"
        />

        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter query:"
          className="input"
        />

        <button onClick={handleCustomerSubmit} className="button">
          Submit Query
        </button>
      </div>

      <div className="section">
        <h3>Chat</h3>
        {allSupportData.length === 0 ? (
          <p>No queries submitted yet.</p>
        ) : (
          allSupportData.map((entry, index) => (
            <div key={index} className="support-entry">
              <p><strong>Customer Number:</strong> {entry.customerNumber}</p>
              <p><strong>Reason:</strong> {entry.reason}</p>
              <p><strong>Query:</strong> {entry.query}</p>
              <p><strong>Response:</strong> {entry.response || 'No response yet'}</p>

              <label>Response</label>
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Enter response here"
                className="input"
              />

              <button onClick={() => handleResponseSubmit(index)} className="button">
                Submit Response
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Form;