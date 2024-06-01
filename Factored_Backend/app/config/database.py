import os
from sqlalchemy import create_engine
from sqlalchemy.orm.session import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Name and path of the SQLite database file
sqlite_file_name = '../database.sqlite'

base_dir = os.path.dirname(os.path.realpath(__file__))

# URL format for the SQLite database and connection
database_url = f'sqlite:///{os.path.join(base_dir, sqlite_file_name)}'

engine = create_engine(database_url, echo=True)

# Session to connect to the database
Session = sessionmaker(bind=engine)

# Base to database models manipulation
Base = declarative_base()