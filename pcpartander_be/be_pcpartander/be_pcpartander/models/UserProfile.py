from sqlalchemy import Column, Integer, String, Text
from be_pcpartander.models import Base

class UserProfile(Base):
    __tablename__ = 'user_profiles'

    id = Column(Integer, primary_key=True)
    nama = Column(String(255), nullable=False)
    nomor = Column(String(20), nullable=False)
    email = Column(String(255), nullable=False)
    foto = Column(Text)
