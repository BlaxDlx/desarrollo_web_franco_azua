from sqlalchemy import create_engine, Column, Integer, BigInteger, String, ForeignKey, DateTime, Enum
from sqlalchemy.orm import sessionmaker, declarative_base, relationship, joinedload

DB_NAME = 'tarea2'
DB_USERNAME = 'cc5002'
DB_PASSWORD = 'programacionweb'
DB_HOST = 'localhost'
DB_PORT = 3306
DB_CHARSET = 'utf8'

DATABASE_URL = f'mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}?charset={DB_CHARSET}'

engine = create_engine(DATABASE_URL, echo=False, future =True)
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

# --- Models ---

class Region(Base):
    __tablename__ = 'region'

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    nombre = Column(String(200), nullable=False)

    comunas = relationship("Comuna", back_populates="region") 

class Comuna(Base):
    __tablename__ = 'comuna'

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    nombre = Column(String(200), nullable=False)
    region_id = Column(Integer,ForeignKey('region.id') ,nullable=False)

    region = relationship("Region", back_populates="comunas")
    actividades = relationship("Actividad", back_populates="comuna")

class Actividad(Base):
    __tablename__ = 'actividad'

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    comuna_id = Column(Integer, ForeignKey('comuna.id'), nullable=False)
    sector = Column(String(100), nullable=True)
    nombre = Column(String(200), nullable=False)
    email = Column(String(100), nullable=False)
    celular = Column(String(15), nullable=True)
    dia_hora_inicio = Column(DateTime, nullable=False)
    dia_hora_termino = Column(DateTime, nullable=True)
    descripcion = Column(String(500), nullable=True)

    comuna = relationship("Comuna", back_populates="actividades")
    fotos = relationship("Foto", back_populates="actividad")
    contactos = relationship("ContactarPor", back_populates="actividad")
    tema = relationship("ActividadTema", back_populates="actividad", uselist=False)

    @property
    def hora_inicio(self):
        return self.dia_hora_inicio.strftime('%Y-%m-%d %H:%M')
    @property
    def hora_termino(self):
        return self.dia_hora_termino.strftime('%Y-%m-%d %H:%M') if self.dia_hora_termino else ""

class Foto(Base):
    __tablename__ = 'foto'

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    ruta_archivo = Column(String(300), nullable=False)
    nombre_archivo = Column(String(300), nullable=False)
    actividad_id = Column(Integer, ForeignKey('actividad.id'), nullable=False)

    actividad = relationship("Actividad", back_populates="fotos")

class ContactarPor(Base):
    __tablename__ = 'contactar_por'

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    nombre = Column(Enum('whatsapp', 'telegram', 'X', 'instagram', 'tiktok', 'otra'), nullable=False)
    identificador = Column(String(150), nullable=False)
    actividad_id = Column(Integer, ForeignKey('actividad.id'), nullable=False)

    actividad = relationship("Actividad", back_populates="contactos")

class ActividadTema(Base):
    __tablename__ = 'actividad_tema'

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    tema = Column(Enum('música', 'deporte', 'ciencias', 'religión', 'política', 'tecnología', 'juegos', 'baile', 'comida', 'otro'), nullable=False)
    glosa_otro = Column(String(15), nullable=True)
    actividad_id = Column(Integer, ForeignKey('actividad.id'), nullable=False)

    actividad = relationship("Actividad", back_populates="tema")

# --- Database Functions ---

# Get registers from the database (en proceso)

def get_todas_las_actividades():
    session = SessionLocal()
    actividades = session.query(Actividad)\
        .options(joinedload(Actividad.comuna), joinedload(Actividad.fotos), joinedload(Actividad.tema), joinedload(Actividad.contactos))\
        .all()
    session.close()
    return actividades

def get_ultimas_actividades(limit):
    session = SessionLocal()
    # Get the last 'limit' activities added to the database
    actividades = session.query(Actividad)\
        .options(joinedload(Actividad.comuna), joinedload(Actividad.fotos), joinedload(Actividad.tema), joinedload(Actividad.contactos))\
        .order_by(Actividad.id.desc()).limit(limit).all()
    session.close()
    return actividades

# Create new registers in the database
def create_actividad(id,comuna_id, sector, nombre, email, celular, dia_hora_inicio, dia_hora_termino, descripcion):
    session = SessionLocal()
    actividad = Actividad(id=id, comuna_id=comuna_id, sector=sector, nombre=nombre, email=email,
                          celular=celular, dia_hora_inicio=dia_hora_inicio,
                          dia_hora_termino=dia_hora_termino, descripcion=descripcion)
    session.add(actividad)
    session.commit()
    session.close()
    return actividad

def create_actividad_tema(actividad_id, tema, glosa_otro):
    session = SessionLocal()
    actividad_tema = ActividadTema(actividad_id=actividad_id, tema=tema, glosa_otro=glosa_otro)
    session.add(actividad_tema)
    session.commit()
    session.close()
    return actividad_tema

def create_contactar_por(actividad_id, nombre, identificador):
    session = SessionLocal()
    contactar_por = ContactarPor(actividad_id=actividad_id, nombre=nombre, identificador=identificador)
    session.add(contactar_por)
    session.commit()
    session.close()
    return contactar_por

# No aparece en el modelo una tabla llamada 'archivo', por lo que se asume que se refiere a 'foto'
def create_foto(actividad_id, ruta_archivo, nombre_archivo):
    session = SessionLocal()
    foto = Foto(actividad_id=actividad_id, ruta_archivo=ruta_archivo, nombre_archivo=nombre_archivo)
    session.add(foto)
    session.commit()
    session.close()
    return foto