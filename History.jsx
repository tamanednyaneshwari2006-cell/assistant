import { useState } from "react";
import axios from "axios";
import { History } from "lucide-react";

function HistoryPage(){

  const [records,setRecords]=useState([]);

  const loadHistory = async ()=>{

    const res = await axios.get(
      "http://127.0.0.1:8000/history"
    );

    setRecords(res.data);
  };

  return(

    <div className="card">

      <h2><History/> Question History</h2>

      <button onClick={loadHistory}>
        Load History
      </button>

      {records.map((item,index)=>(
        <div key={index} className="history-item">

          <p><b>Q:</b> {item.question}</p>
          <p><b>A:</b> {item.answer}</p>

        </div>
      ))}

    </div>
  );
}

export default HistoryPage;