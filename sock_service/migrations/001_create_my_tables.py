steps = [
    [
    """
    CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(1000) NOT NULL,
    last_name VARCHAR(1000) NOT NULL,
    username VARCHAR(1000) NOT NULL,
    password VARCHAR(1000) NOT NULL,
    password_confirmation VARCHAR(1000) NOT NULL,
    email VARCHAR(1000) NOT NULL,
    address TEXT NOT NULL,
    sockstar_points INT NOT NULL,
    total_pairings INT NOT NULL,
    profile_pic VARCHAR(1000) NOT NULL,
    verified BOOLEAN NOT NULL,
    type VARCHAR(1000) NOT NULL
    );
    """,
    """
    DROP TABLE users;
    """
    ],
[
    """
    CREATE TABLE socks (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT REFERENCES users(id) NOT NULL,
    photo VARCHAR(1000) NOT NULL,
    condition INT NOT NULL,
    color VARCHAR(1000) NOT NULL,
    pattern VARCHAR(1000) NOT NULL,
    size VARCHAR(1000) NOT NULL,
    type VARCHAR(1000) NOT NULL,
    fabric VARCHAR(1000) NOT NULL,
    style VARCHAR(1000) NOT NULL,
    brand VARCHAR(1000) NOT NULL,
    gift BOOLEAN
    );
    """,
    """
    DROP TABLE socks;
    """
    ],
    [
    """
    CREATE TABLE matches (
    id SERIAL PRIMARY KEY NOT NULL,
    gift_sock INT REFERENCES socks(id) NOT NULL,
    receive_sock INT REFERENCES socks(id) NOT NULL,
    match_status BOOLEAN
    );
    """,
    """
    DROP TABLE matches;
    """
    ],
    [
    """
    CREATE TABLE verifications (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT REFERENCES users(id) NOT NULL,
    license VARCHAR(1000) NOT NULL,
    verification_status VARCHAR(1000) NOT NULL
    );
    """,
    """
    DROP TABLE verifications;
    """
    ]
]