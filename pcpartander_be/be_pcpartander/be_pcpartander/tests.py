import unittest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from pyramid import testing
from be_pcpartander.models import Base, Product, UserProfile  # Ganti dengan model sebenarnya


class BaseTest(unittest.TestCase):
    def setUp(self):
        # Inisialisasi konfigurasi untuk database PostgreSQL
        self.config = testing.setUp(settings={
            'sqlalchemy.url': 'postgresql://postgres:123456789@localhost/testing_andre',
        })
        self.config.include('be_pcpartander.models')  # Ganti dengan modul model sebenarnya
        settings = self.config.get_settings()

        # Set up engine dan session
        engine = create_engine(settings['sqlalchemy.url'])
        Session = sessionmaker(bind=engine)
        self.session = Session()

        # Buat database di memori untuk pengujian
        Base.metadata.create_all(engine)

    def tearDown(self):
        # Hapus data setelah pengujian selesai
        self.session.close()
        Base.metadata.drop_all(self.session.bind)

    def init_database(self):
        # Inisialisasi data awal untuk pengujian jika perlu
        pass


class TestProductView(BaseTest):

    def setUp(self):
        super().setUp()
        # Reset database untuk memastikan tidak ada data yang mengganggu pengujian
        self.session.query(Product).delete()
        self.session.commit()

    def test_add_product(self):
        # Menambahkan produk
        product = Product(title="Product A", description="A description", price=100, quantity=10)
        self.session.add(product)
        self.session.flush()  # Menyimpan perubahan sementara sebelum commit
        self.session.commit()  # Memastikan perubahan di commit

        # Memastikan ada produk yang ditambahkan
        products = self.session.query(Product).all()
        self.assertEqual(len(products), 1)  # Memastikan hanya ada 1 produk setelah penambahan

    def test_delete_product(self):
        # Menambahkan produk
        product = Product(title="Product A", description="A description", price=100, quantity=10)
        self.session.add(product)
        self.session.flush()  # Menyimpan perubahan sementara sebelum commit
        self.session.commit()  # Memastikan perubahan di commit

        # Menghapus produk
        self.session.delete(product)
        self.session.commit()  # Commit perubahan untuk menghapus data

        # Memastikan produk terhapus
        products = self.session.query(Product).all()
        self.assertEqual(len(products), 0)  # Memastikan tidak ada produk setelah penghapusan

    def test_get_products(self):
        # Menambahkan produk
        product1 = Product(title="Product A", description="A description", price=100, quantity=10)
        product2 = Product(title="Product B", description="Another description", price=150, quantity=5)
        self.session.add_all([product1, product2])
        self.session.commit()

        # Mengecek jumlah produk
        products = self.session.query(Product).all()
        self.assertEqual(len(products), 2)  # Memastikan ada 2 produk yang ditambahkan

    def test_update_product(self):
        # Menambahkan produk
        product = Product(title="Product A", description="A description", price=100, quantity=10)
        self.session.add(product)
        self.session.flush()  # Menyimpan perubahan sementara sebelum commit
        self.session.commit()  # Memastikan perubahan di commit

        # Update produk
        product.price = 120
        self.session.commit()  # Commit perubahan setelah update

        # Memastikan harga produk terupdate
        updated_product = self.session.query(Product).filter_by(title="Product A").first()
        self.assertEqual(updated_product.price, 120)  # Memastikan harga produk berubah menjadi 120



class TestUserProfileView(BaseTest):

    def test_add_user_profile(self):
        # Menambahkan profil pengguna
        user_profile = UserProfile(nama="John Doe", nomor="08123456789", email="john@example.com", foto="image.jpg")
        self.session.add(user_profile)
        self.session.flush()  # Menyimpan perubahan di session
        self.session.commit()  # Memastikan perubahan di commit

        # Memastikan ada profil pengguna yang ditambahkan
        user_profiles = self.session.query(UserProfile).all()
        self.assertEqual(len(user_profiles), 1)  # Memastikan ada 1 profil pengguna

    def test_get_user_profiles(self):
        # Menambahkan profil pengguna
        user_profile1 = UserProfile(nama="John Doe", nomor="08123456789", email="john@example.com", foto="image1.jpg")
        user_profile2 = UserProfile(nama="Jane Doe", nomor="08123456790", email="jane@example.com", foto="image2.jpg")
        self.session.add_all([user_profile1, user_profile2])
        self.session.commit()

        # Mengecek jumlah profil pengguna
        user_profiles = self.session.query(UserProfile).all()
        self.assertEqual(len(user_profiles), 2)  # Memastikan ada 2 profil pengguna

    def test_delete_user_profile(self):
        # Menambahkan profil pengguna
        user_profile = UserProfile(nama="John Doe", nomor="08123456789", email="john@example.com", foto="image.jpg")
        self.session.add(user_profile)
        self.session.flush()  # Menyimpan perubahan di session
        self.session.commit()  # Memastikan perubahan di commit

        # Menghapus profil pengguna
        self.session.delete(user_profile)
        self.session.commit()  # Commit perubahan

        # Memastikan profil pengguna terhapus
        user_profiles = self.session.query(UserProfile).all()
        self.assertEqual(len(user_profiles), 0)  # Memastikan tidak ada profil pengguna


if __name__ == '__main__':
    unittest.main()
