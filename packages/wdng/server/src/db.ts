import pg from "pg"

const { Pool } = pg

// Database connection pool
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // For development, you can also use individual env vars:
  // host: process.env.POSTGRES_HOST || 'localhost',
  // port: parseInt(process.env.POSTGRES_PORT || '5432'),
  // database: process.env.POSTGRES_DB || 'wdng',
  // user: process.env.POSTGRES_USER || 'postgres',
  // password: process.env.POSTGRES_PASSWORD,
})

export interface RsvpSubmission {
  guests: string
  email: string
  attending: boolean
  ride_to_venue: boolean
  ride_from_venue: boolean
  requirements?: string
  ip_address?: string
  user_agent?: string
}

export async function saveRsvp(submission: RsvpSubmission): Promise<void> {
  await pool.query(
    `INSERT INTO rsvp_submissions
      (guests, email, attending, ride_to_venue, ride_from_venue, requirements, ip_address, user_agent)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      submission.guests,
      submission.email,
      submission.attending,
      submission.ride_to_venue,
      submission.ride_from_venue,
      submission.requirements || null,
      submission.ip_address || null,
      submission.user_agent || null,
    ],
  )
}
