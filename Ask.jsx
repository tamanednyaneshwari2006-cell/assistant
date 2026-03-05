import { useState } from "react";
import axios from "axios";
import { MessageCircle } from "lucide-react";

function Ask() {

  const [question,setQuestion]=useState("");
  const [answer,setAnswer]=useState("");
  const [page,setPage]=useState(null);

  const askAI = async ()=>{

    const res = await axios.post(
      "http://127.0.0.1:8000/ask",
      {question:question}
    );

    setAnswer(res.data.answer);
    
    setPage(res.data.page);
  };

  return(

    <div className="card">

      <h2><MessageCircle/> Ask Question</h2>

      <input
        placeholder="Ask from your notes..."
        value={question}
        onChange={(e)=>setQuestion(e.target.value)}
      />

      <button onClick={askAI}>
        Ask AI
      </button>

      {answer && (
        <div className="answer">
          <p>{answer}</p>
          <p>Page: {page}</p>
        </div>
      )}

    </div>
  );
}

export default Ask;