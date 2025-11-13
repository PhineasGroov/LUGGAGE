from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime, Table, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.sql import func
from sqlalchemy.orm import declarative_base

Base = declarative_base()

#Association table for many-to-many relationship between users and roles
