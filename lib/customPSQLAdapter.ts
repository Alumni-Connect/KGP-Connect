// lib/custom-adapter.ts

import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "pg";
import { Adapter } from "next-auth/adapters";


export function CustomPostgresAdapter(pool: Pool): Adapter {
  const adapter = PostgresAdapter(pool);

  return {
    // Spread the original adapter to inherit all its methods
    ...adapter,
    
    // Override the methods that retrieve user data
    async getUser(id) {
      const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
      return rows[0] || null;
    },
    async getUserByEmail(email) {
      const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
      return rows[0] || null;
    },
    async getUserByAccount(providerAccountId) {
      const { rows } = await pool.query(`
        SELECT u.* FROM users u JOIN accounts a ON u.id = a."userId"
        WHERE a."provider" = $1 AND a."providerAccountId" = $2`,
        [providerAccountId.provider, providerAccountId.providerAccountId]
      );
      return rows[0] || null;
    },

    // OPTIONAL: You can also override createUser to be more efficient
    // The `RETURNING *` clause returns the entire new user row at once.
    async createUser(user) {
      const { rows } = await pool.query(
        `
        INSERT INTO users (name, email, "emailVerified", image, role, "isVerified", "hasRegistered") 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *
        `,
        [
          user.name,
          user.email,
          user.emailVerified,
          user.image,
          user.role, // Your custom field
          user.isVerified, // Your custom field
          user.hasRegistered, // Your custom field
        ]
      );
      return rows[0];
    },
  };
}