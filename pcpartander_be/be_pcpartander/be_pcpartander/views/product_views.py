from pyramid.view import view_config
from pyramid.response import Response
from be_pcpartander.models import Product

@view_config(route_name='products', request_method='GET', renderer='json')
def list_products(request):
    session = request.dbsession
    products = session.query(Product).all()
    return [
        dict(id=p.id, title=p.title, description=p.description, price=p.price, quantity=p.quantity)
        for p in products
    ]

@view_config(route_name='products', request_method='POST', renderer='json')
def add_product(request):
    session = request.dbsession
    data = request.json_body
    product = Product(
        title=data.get('title'),
        description=data.get('description'),
        price=data.get('price'),
        quantity=data.get('quantity'),
    )
    session.add(product)
    session.commit()
    return dict(id=product.id, title=product.title, description=product.description, price=product.price, quantity=product.quantity)

@view_config(route_name='product', request_method='PUT', renderer='json')
def update_product(request):
    session = request.dbsession
    product_id = int(request.matchdict['id'])
    data = request.json_body
    product = session.query(Product).filter_by(id=product_id).first()
    if not product:
        return Response(json_body={"error": "Product not found"}, status=404)
    product.title = data.get('title', product.title)
    product.description = data.get('description', product.description)
    product.price = data.get('price', product.price)
    product.quantity = data.get('quantity', product.quantity)
    session.commit()
    return dict(id=product.id, title=product.title, description=product.description, price=product.price, quantity=product.quantity)

@view_config(route_name='product', request_method='DELETE', renderer='json')
def delete_product(request):
    session = request.dbsession
    product_id = int(request.matchdict['id'])
    product = session.query(Product).filter_by(id=product_id).first()
    if not product:
        return Response(json_body={"error": "Product not found"}, status=404)
    session.delete(product)
    session.commit()
    return {"message": "Product deleted"}
