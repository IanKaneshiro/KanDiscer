from functools import wraps
from flask_login import current_user


def admin_required(f):
    """
    Checks if the current user is an Admin
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if current_user.is_authenticated and current_user.admin:
            return f(*args, **kwargs)
        else:
            return {"message": "Access forbidden. Admin privileges required."}, 403
    return decorated_function
