export const USERS_TABLE = "users";
export const GROUPS_TABLE = "groups";
export const BILLS_TABLE = "bills";
export const ACCOUNTS_TABLE = "accounts";

const sqlCreatTableUsers =`
CREATE TABLE IF NOT EXISTS ${USERS_TABLE} (
    id int NOT NULL AUTO_INCREMENT,
    full_name varchar(256) COLLATE utf8_unicode_ci NOT NULL,
    password varchar(45) COLLATE utf8_unicode_ci NOT NULL,
    email varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
    reg_timestamp timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY email_UNIQUE (email)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
`;

const sqlCreatTableGroups = `
CREATE TABLE IF NOT EXISTS ${GROUPS_TABLE}(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(256) NOT NULL,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
`;

const sqlCreatTableBills = `
CREATE TABLE IF NOT EXISTS ${BILLS_TABLE} (
    id int NOT NULL AUTO_INCREMENT,
    group_id int NOT NULL,
    amount decimal(10,2) DEFAULT NULL,
    description text COLLATE utf8_unicode_ci,
    PRIMARY KEY (id),
    KEY group_id_idx (group_id),
    CONSTRAINT group_id FOREIGN KEY (group_id) REFERENCES groups (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
`;

const sqlCreatTableAccounts = `
CREATE TABLE E IF NOT EXISTS ${ACCOUNTS_TABLE} (
    id int NOT NULL AUTO_INCREMENT,
    group2_id int NOT NULL,
    user_id int NOT NULL,
    PRIMARY KEY (id),
    KEY group_id_idx (group2_id),
    KEY user_id_idx (user_id),
    CONSTRAINT group2_id FOREIGN KEY (group2_id) REFERENCES groups (id),
    CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
`;


export const creatTableUsers = async (connection) => {
    await connection.query (sqlCreatTableUsers);
}

export const creatTableGroups= async (connection) => {
    await connection.query (sqlCreatTableGroups);
}

export const creatTableBills = async (connection) => {
    await connection.query (sqlCreatTableBills);
}

export const creatTableAccounts = async (connection) => {
    await connection.query (sqlCreatTableAccounts);
}
