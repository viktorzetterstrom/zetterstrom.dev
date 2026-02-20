CREATE TABLE IF NOT EXISTS rsvp_submissions (
  id SERIAL PRIMARY KEY,
  guests TEXT NOT NULL,
  email TEXT NOT NULL,
  attending BOOLEAN NOT NULL DEFAULT true,
  ride_to_venue BOOLEAN NOT NULL DEFAULT false,
  ride_from_venue BOOLEAN NOT NULL DEFAULT false,
  requirements TEXT,
  submitted_at TIMESTAMP NOT NULL DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT
);
