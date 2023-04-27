steps = [
    [
        """
        CREATE TABLE users (
        id SERIAL PRIMARY KEY NOT NULL,
        first_name VARCHAR(1000) NOT NULL,
        last_name VARCHAR(1000) NOT NULL,
        username VARCHAR(1000) UNIQUE NOT NULL,
        hashed_password VARCHAR(2000) NOT NULL,
        email VARCHAR(1000) UNIQUE NOT NULL,
        address TEXT NOT NULL,
        sockstar_points INT NOT NULL,
        total_pairings INT NOT NULL,
        profile_pic VARCHAR(1000) NOT NULL,
        verified BOOLEAN NOT NULL,
        type VARCHAR(1000) NOT NULL,
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
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
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        photo VARCHAR(1000) NOT NULL,
        color VARCHAR(1000) NOT NULL,
        pattern VARCHAR(1000) NOT NULL,
        size VARCHAR(1000) NOT NULL,
        type VARCHAR(1000) NOT NULL,
        fabric VARCHAR(1000) NOT NULL,
        style VARCHAR(1000) NOT NULL,
        brand VARCHAR(1000) NOT NULL,
        gift BOOLEAN,
        match_status VARCHAR(100) NOT NULL,
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
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
        requesting_user INT REFERENCES users(id) ON DELETE CASCADE,
        approving_user INT REFERENCES users(id) ON DELETE CASCADE,
        gift_sock INT REFERENCES socks(id) NOT NULL,
        receive_sock INT REFERENCES socks(id) NOT NULL,
        match_status BOOLEAN,
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
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
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        license VARCHAR(1000) NOT NULL,
        verification_status VARCHAR(1000) NOT NULL,
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        );
        """,
        """
        DROP TABLE verifications;
        """
    ]
]
