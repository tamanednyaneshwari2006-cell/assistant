from sqlalchemy import Column, Integer, String, Text
from database import Base

class PDFDocument(Base):
    __tablename__ = "pdf_documents"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String)
    page_number = Column(Integer)
    content = Column(Text)


class QuestionHistory(Base):
    __tablename__ = "question_history"

    id = Column(Integer, primary_key=True, index=True)
    question = Column(Text)
    answer = Column(Text)