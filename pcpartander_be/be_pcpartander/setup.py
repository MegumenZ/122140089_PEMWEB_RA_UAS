from setuptools import setup, find_packages

setup(
    name='be_pcpartander',
    version='0.1',
    packages=find_packages(),
    install_requires=[
        'pyramid',
        'waitress',
        'psycopg2-binary',
        'SQLAlchemy',
    ],
    entry_points={
        'paste.app_factory': [
            'main = be_pcpartander:main',
        ],
    },
)
