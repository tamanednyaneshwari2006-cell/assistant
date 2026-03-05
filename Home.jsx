import { BookOpen } from "lucide-react";

function Home() {
  return (
    <div className="card center">

      <BookOpen size={60} />

      <h1>AI Student Study Assistant</h1>

      <p>
        Upload your study notes and ask questions.
        AI will answer based on your PDF.
      </p>

    </div>
  );
}

export default Home;