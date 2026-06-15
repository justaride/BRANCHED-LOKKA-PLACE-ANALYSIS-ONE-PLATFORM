-- Årshjul: stedsaktivitet på Grünerløkka. Idempotent (kjøres trygt flere ganger).
CREATE TABLE IF NOT EXISTS arshjul_hendelse (
  id             text PRIMARY KEY,
  ar             integer NOT NULL,
  tittel         text NOT NULL,
  start_dato     date NOT NULL,
  slutt_dato     date,
  kategori       text NOT NULL,
  status         text NOT NULL DEFAULT 'planlagt',
  beskrivelse    text,
  lenke          text,
  ansvarlig      text,
  sted           text,
  tenant         text,
  opprettet      timestamptz NOT NULL DEFAULT now(),
  sist_oppdatert timestamptz NOT NULL DEFAULT now(),
  sist_endret_av text
);

CREATE INDEX IF NOT EXISTS arshjul_hendelse_ar_idx ON arshjul_hendelse (ar);

CREATE INDEX IF NOT EXISTS arshjul_hendelse_start_idx ON arshjul_hendelse (start_dato);
