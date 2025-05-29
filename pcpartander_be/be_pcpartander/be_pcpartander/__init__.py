from pyramid.config import Configurator
from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker, scoped_session
from .models import Base

DBSession = scoped_session(sessionmaker())

def main(global_config, **settings):
    config = Configurator(settings=settings)
    config.include('pyramid_jinja2')

    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine

    # Attach session ke request sebagai property 'dbsession'
    def dbsession_factory(request):
        return DBSession()

    config.add_request_method(dbsession_factory, 'dbsession', reify=True)
    config.add_static_view(name='static', path='be_pcpartander:static')


    config.add_route('home', '/')
    config.add_route('products', '/products')
    config.add_route('product', '/products/{id}')
    config.add_route('user_profiles', '/user_profiles')  # Untuk daftar dan tambah
    config.add_route('user_profile', '/user_profile/{id}')  # Untuk update dan delete
    config.add_tween('be_pcpartander.cors.cors_tween_factory')
    config.scan('be_pcpartander.views')

    return config.make_wsgi_app()
