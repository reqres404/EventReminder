import React, { useState } from 'react';
import axios from 'axios';

const UploadData = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('uploadfile', file);

      await axios.post('http://localhost:4000/api/populatedb', formData);

      console.log('File imported successfully.');
      // Perform any additional actions or show a success message

    } catch (error) {
      console.error('Error importing file:', error);
      // Handle the error or show an error message
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="file" name="uploadfile"  onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadData;
