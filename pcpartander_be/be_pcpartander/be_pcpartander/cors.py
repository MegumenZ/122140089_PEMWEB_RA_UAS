from pyramid.response import Response

def cors_policy_factory(request, response):
    response.headers.update({
        'Access-Control-Allow-Origin': 'http://localhost:5173',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    })

def cors_tween_factory(handler, registry):
    def cors_tween(request):
        if request.method == 'OPTIONS':
            response = Response()
            cors_policy_factory(request, response)
            return response

        response = handler(request)
        cors_policy_factory(request, response)
        return response
    return cors_tween
