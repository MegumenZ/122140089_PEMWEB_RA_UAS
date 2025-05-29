def includeme(config):
    config.add_route('produk_list', '/api/produk')
    config.add_route('produk_detail', '/api/produk/{id}')