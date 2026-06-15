-- Årshjul: legg til gjentakelse (RFC 5545 RRULE, f.eks. "FREQ=WEEKLY").
-- Idempotent (kjøres trygt flere ganger).
ALTER TABLE arshjul_hendelse ADD COLUMN IF NOT EXISTS gjentakelse text;
