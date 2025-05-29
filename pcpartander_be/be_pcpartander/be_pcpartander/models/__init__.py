from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker
import zope.sqlalchemy
from .base import Base  # pastikan Base diimport dengan benar
from .products import Product
from .mymodel import MyModel
from .UserProfile import UserProfile  # pastikan UserProfile diimport dengan benar

# Setup session factory
def get_engine(settings, prefix='sqlalchemy.'):
    return engine_from_config(settings, prefix)

def get_session_factory(engine):
    factory = sessionmaker()
    factory.configure(bind=engine)
    return factory

def get_tm_session(session_factory, transaction_manager):
    dbsession = session_factory()
    zope.sqlalchemy.register(dbsession, transaction_manager=transaction_manager)
    return dbsession

def includeme(config):
    settings = config.get_settings()
    engine = get_engine(settings)
    session_factory = get_session_factory(engine)
    config.registry['dbsession_factory'] = session_factory

    def get_request_dbsession(request):
        if hasattr(request, 'tm'):
            return get_tm_session(session_factory, request.tm)
        else:
            return session_factory()

    config.add_request_method(get_request_dbsession, 'dbsession', reify=True)
