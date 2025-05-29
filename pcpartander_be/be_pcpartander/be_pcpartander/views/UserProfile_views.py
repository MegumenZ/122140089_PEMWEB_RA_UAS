from pyramid.view import view_config
from pyramid.response import Response
from be_pcpartander.models import UserProfile

# Mendapatkan seluruh data user profile
@view_config(route_name='user_profiles', request_method='GET', renderer='json')
def list_user_profiles(request):
    session = request.dbsession
    profiles = session.query(UserProfile).all()
    return [
        dict(id=p.id, nama=p.nama, nomor=p.nomor, email=p.email, foto=p.foto)
        for p in profiles
    ]

# Menambahkan user profile baru
@view_config(route_name='user_profiles', request_method='POST', renderer='json')
def add_user_profile(request):
    session = request.dbsession
    data = request.json_body
    user_profile = UserProfile(
        nama=data.get('nama'),
        nomor=data.get('nomor'),
        email=data.get('email'),
        foto=data.get('foto'),  # Menyimpan foto sebagai base64
    )
    session.add(user_profile)
    session.commit()
    return dict(id=user_profile.id, nama=user_profile.nama, nomor=user_profile.nomor, email=user_profile.email, foto=user_profile.foto)

# Memperbarui data user profile
@view_config(route_name='user_profile', request_method='PUT', renderer='json')
def update_user_profile(request):
    session = request.dbsession
    profile_id = int(request.matchdict['id'])
    data = request.json_body
    user_profile = session.query(UserProfile).filter_by(id=profile_id).first()
    if not user_profile:
        return Response(json_body={"error": "User profile not found"}, status=404)
    user_profile.nama = data.get('nama', user_profile.nama)
    user_profile.nomor = data.get('nomor', user_profile.nomor)
    user_profile.email = data.get('email', user_profile.email)
    user_profile.foto = data.get('foto', user_profile.foto)
    session.commit()
    return dict(id=user_profile.id, nama=user_profile.nama, nomor=user_profile.nomor, email=user_profile.email, foto=user_profile.foto)

# Menghapus data user profile
@view_config(route_name='user_profile', request_method='DELETE', renderer='json')
def delete_user_profile(request):
    session = request.dbsession
    profile_id = int(request.matchdict['id'])
    user_profile = session.query(UserProfile).filter_by(id=profile_id).first()
    if not user_profile:
        return Response(json_body={"error": "User profile not found"}, status=404)
    session.delete(user_profile)
    session.commit()
    return {"message": "User profile deleted"}
