import * as sqlite from "sqlite3";

export const db: sqlite.Database = new sqlite.Database(
  "./emp_database.db",
  (err: Error | null) => {
    if (err) {
      console.error("Erro opening database " + err.message);
    } else {
      db.run(
        "CREATE TABLE employees( \
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
          name NVARCHAR(20)  NOT NULL,\
          age INTEGER NOT NULL\
      )",
        (err) => {
          if (err) {
            console.log("Table already exists.");
            return;
          }
        }
      );
    }
  }
);
