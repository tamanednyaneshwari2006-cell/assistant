from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import SessionLocal, engine, Base
from models import PDFDocument, QuestionHistory

import fitz  
import pytesseract
from langchain.chains import RetrievalQA
from langchain.docstore.document import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS


Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

vectorstore = None  


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    global vectorstore
    pdf_bytes = await file.read()
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")

    db = SessionLocal()
    db.query(PDFDocument).delete()  
    db.commit()

    documents = []

    for i, page in enumerate(doc):
        pix = page.get_pixmap()
        text = pytesseract.image_to_string(pix.pil_tobytes())

        db.add(PDFDocument(filename=file.filename, page_number=i+1, content=text))
        documents.append(Document(page_content=text, metadata={"page": i+1}))

    db.commit()
    db.close()

    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
    docs = splitter.split_documents(documents)

    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    vectorstore = FAISS.from_documents(docs, embeddings)

    return {"message": "PDF processed and indexed successfully"}


class Question(BaseModel):
    question: str


@app.post("/ask")
async def ask_question(query: Question):
    global vectorstore
    if vectorstore is None:
        return {"error": "Upload a PDF first."}

    llm = None 
    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})
    qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever, return_source_documents=True)

    result = qa_chain({"query": query.question})
    answer = result["result"]
    page_number = result["source_documents"][0].metadata.get("page") if result["source_documents"] else None

    db = SessionLocal()
    db.add(QuestionHistory(question=query.question, answer=answer))
    db.commit()
    db.close()

    return {"answer": answer, "page": page_number}


@app.get("/history")
def get_history():
    db = SessionLocal()
    records = db.query(QuestionHistory).all()
    db.close()
    return records