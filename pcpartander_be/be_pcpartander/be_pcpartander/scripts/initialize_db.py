import argparse
import sys
from datetime import date

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from .. import models


def setup_models(dbsession):
    """
    Add initial model objects.
    """
    # Tambahkan data awal untuk Mahasiswa
    mahasiswa1 = models.Mahasiswa(
        nim='12345',
        nama='Budi Santoso',
        jurusan='Teknik Informatika',
        tanggal_lahir=date(2000, 5, 15),
        alamat='Jl. Merdeka No. 123, Bandung'
    )
    mahasiswa2 = models.Mahasiswa(
        nim='54321',
        nama='Siti Aminah',
        jurusan='Sistem Informasi',
        tanggal_lahir=date(2001, 8, 22),
        alamat='Jl. Mawar No. 45, Jakarta'
    )
    dbsession.add(mahasiswa1)
    dbsession.add(mahasiswa2)


def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)

    try:
        dbsession = env['request'].dbsession
        with dbsession.begin():
            setup_models(dbsession)

    except OperationalError:
        print('''Pyramid is having a problem using your SQL database.

Your database should be up and running before you
initialize your project. Make sure your database server
is running and your connection string in development.ini
is correctly configured.
''')

    finally:
        env['closer']()



if __name__ == '__main__':
    main()