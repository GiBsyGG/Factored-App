from sqlalchemy import Column, Integer, String, Text
from app.config.database import Base

class EmployeeModel(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    position = Column(String, nullable=False)
    avatar_url = Column(String, nullable=True)
    _skills = Column(Text, nullable=False)  # Store skills as a comma-separated string for simplicity (skill:level,skill:level,...)
    @property
    def skills(self):
        return {skill.split(":")[0]: int(skill.split(":")[1]) for skill in self._skills.split(",")}
    @skills.setter
    def skills(self, skills_dict: dict[str, int]):
        self._skills = ",".join([f"{skill}:{level}" for skill, level in skills_dict.items()])