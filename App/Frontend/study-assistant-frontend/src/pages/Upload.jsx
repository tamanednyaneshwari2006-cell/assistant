import { useState } from "react";
import axios from "axios";
import { UploadCloud } from "lucide-react";

function Upload() {

  const [file, setFile] = useState(null);

  const uploadPDF = async () => {

    const formData = new FormData();
    formData.append("file", file);

    await axios.post("http://127.0.0.1:8000/upload", formData);

    alert("PDF Uploaded Successfully");
  };

  return (

    <div className="card">

      <h2><UploadCloud/> Upload PDF Notes</h2>

      <input
        type="file"
        onChange={(e)=>setFile(e.target.files[0])}
      />

      <button onClick={uploadPDF}>
        Upload
      </button>

    </div>
  );
}

export default Upload;