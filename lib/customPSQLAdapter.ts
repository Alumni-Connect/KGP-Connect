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
      const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [parseInt(id as string)]);
      const user = rows[0];
      if (user) {
        // Ensure id is returned as a string for NextAuth compatibility
        return { ...user, id: user.id.toString() };
      }
      return null;
    },
    async getUserByEmail(email) {
      const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
      const user = rows[0];
      if (user) {
        // Ensure id is returned as a string for NextAuth compatibility
        return { ...user, id: user.id.toString() };
      }
      return null;
    },
    async getUserByAccount(providerAccountId) {
      const { rows } = await pool.query(`
        SELECT u.* FROM users u JOIN accounts a ON u.id = a."userId"
        WHERE a."provider" = $1 AND a."providerAccountId" = $2`,
        [providerAccountId.provider, providerAccountId.providerAccountId]
      );
      const user = rows[0];
      if (user) {
        // Ensure id is returned as a string for NextAuth compatibility
        return { ...user, id: user.id.toString() };
      }
      return null;
    },

    // Override createUser to handle integer IDs
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
          user.role || 'STUDENT', // Default role
          user.isVerified || false, // Default verification status
          user.hasRegistered || false, // Default registration status
        ]
      );
      const newUser = rows[0];
      if (newUser) {
        // Ensure id is returned as a string for NextAuth compatibility
        return { ...newUser, id: newUser.id.toString() };
      }
      return null;
    },
  };
}