

def hash_password(password):
    """Hashes the given password using bcrypt."""
    return bcrypt.generate_password_hash(password).decode('utf-8')

def check_password(password, hashed_password):
    """Checks if the given password matches the hashed password."""
    return bcrypt.check_password_hash(hashed_password, password)