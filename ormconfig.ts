const ORMConfig = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "graphql_database",
    entities: [
        "dist/**/*.entity{.ts,.js}"
    ],
    synchronize: true
}

export = ORMConfig