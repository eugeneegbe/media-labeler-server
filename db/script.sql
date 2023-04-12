CREATE TABLE user(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username text NOT NULL UNIQUE
);

CREATE TABLE gender(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username text,
    filename text NOT NULL,
    clarity BOOLEAN,
    identity_type text,
    depict_accuracy text,
    subject_relevance text,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE culture(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username text,
    filename text NOT NULL,
    region text,
    familiarity text,
    subject_relevance text,
    region_alt text,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE cloth(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username text,
    filename text NOT NULL,
    region text,
    region_alt text,
    accuracy text,
    representation text,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);