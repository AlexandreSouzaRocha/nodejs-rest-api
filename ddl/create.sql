CREATE SCHEMA developers AUTHORIZATION developer_user;
CREATE TYPE developers.status_t AS ENUM('PENDING', 'APPROVED', 'DISAPPROVED');
CREATE TABLE developers.candidate (
    id VARCHAR (64) NOT NULL PRIMARY KEY,
    candidate_name VARCHAR(128) NOT NULL,
    birth_date TIMESTAMP (4) WITHOUT TIME ZONE NOT NULL,
    cpf VARCHAR (32) NOT NULL,
    mother_name VARCHAR (128) NOT NULL,
    father_name VARCHAR (128) NOT NULL,
    neighborhood VARCHAR (128) NOT NULL,
    address VARCHAR (128) NOT NULL,
    zip_code VARCHAR (8) NOT NULL,
    country VARCHAR (128) NOT NULL,
    mobile_number VARCHAR (11) NOT NULL,
    phone_number VARCHAR (11) NOT NULL,
    candidate_status VARCHAR (32) NOT NULL,
    enrollment_date TIMESTAMP (4) WITHOUT TIME ZONE NOT NULL,
    updated_date TIMESTAMP (4) WITHOUT TIME ZONE NULL,
    UNIQUE(cpf),
    UNIQUE(id)
) WITH (OIDS = false) TABLESPACE pg_default;
CREATE TABLE developers.github_profile (
    id VARCHAR (64) NOT NULL PRIMARY KEY,
    fk_candidate_id VARCHAR(64) NOT NULL,
    profile_name VARCHAR(128) NOT NULL,
    profile_url VARCHAR(128) NOT NULL,
    biography VARCHAR(128) NOT NULL,
    profile_avatar_url VARCHAR (128) NULL,
    email VARCHAR(128) NOT NULL,
    repositories_url VARCHAR (128) NULL,
    UNIQUE(id),
    UNIQUE(email),
    UNIQUE(email, fk_candidate_id)
) WITH (OIDS = false) TABLESPACE pg_default;
ALTER TABLE developers.github_profile
ADD CONSTRAINT GITHUB_PROFILE_FK_CANDIDATE_ID FOREIGN KEY (FK_CANDIDATE_ID) REFERENCES developers.candidate(ID);