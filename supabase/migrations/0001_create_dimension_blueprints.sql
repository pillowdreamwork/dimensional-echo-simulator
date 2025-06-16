-- supabase/migrations/0001_create_dimension_blueprints.sql

-- Enable pgcrypto extension if not already enabled, for gen_random_uuid()
-- CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Table: dimension_blueprints
CREATE TABLE dimension_blueprints (
    dimension_uid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_uid UUID NOT NULL, -- Consider FOREIGN KEY (creator_uid) REFERENCES users(user_uid) if a users table exists
    dimension_name TEXT NOT NULL,
    blueprint_json JSONB NOT NULL,
    version_number INTEGER NOT NULL DEFAULT 1,
    creation_timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_modified_timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
    is_active_in_multiverse BOOLEAN NOT NULL DEFAULT FALSE,
    is_published_to_library BOOLEAN NOT NULL DEFAULT FALSE,
    base_stability_score NUMERIC(5,2), -- e.g., 0.00 to 999.99
    dominant_glyph_uids UUID[],
    description_text TEXT,
    tags TEXT[]
);

-- Comments on columns
COMMENT ON COLUMN dimension_blueprints.dimension_uid IS 'Unique identifier for the dimension blueprint.';
COMMENT ON COLUMN dimension_blueprints.creator_uid IS 'UID of the user who created this dimension blueprint.';
COMMENT ON COLUMN dimension_blueprints.dimension_name IS 'User-defined name for the dimension.';
COMMENT ON COLUMN dimension_blueprints.blueprint_json IS 'Comprehensive JSONB object storing the detailed definition of the dimension. This includes CoreIdentity, SpatioTemporalFabric, MaterialityProfile, EnergySystems, InteractionLaws, SentiencePotential, StabilityFactors, AestheticProfile, initial EntitySeedings, etc.';
COMMENT ON COLUMN dimension_blueprints.version_number IS 'Version of this dimension blueprint, incremented on significant changes.';
COMMENT ON COLUMN dimension_blueprints.creation_timestamp IS 'Timestamp of when this blueprint was initially created.';
COMMENT ON COLUMN dimension_blueprints.last_modified_timestamp IS 'Timestamp of when this blueprint was last modified.';
COMMENT ON COLUMN dimension_blueprints.is_active_in_multiverse IS 'Flag indicating if this dimension is currently active and simulated in the multiverse.';
COMMENT ON COLUMN dimension_blueprints.is_published_to_library IS 'Flag indicating if this blueprint is shared in the public library.';
COMMENT ON COLUMN dimension_blueprints.base_stability_score IS 'A calculated or user-defined score representing the inherent stability of the dimension.';
COMMENT ON COLUMN dimension_blueprints.dominant_glyph_uids IS 'Array of Glyphs UIDs that are central to this dimension''s concept, for quick filtering.';
COMMENT ON COLUMN dimension_blueprints.description_text IS 'A short textual description for quick display, potentially extracted from blueprint_json or user-supplied.';
COMMENT ON COLUMN dimension_blueprints.tags IS 'Array of searchable tags or keywords associated with this dimension blueprint.';

-- Indexes for efficient searching
CREATE INDEX idx_gin_dominant_glyph_uids ON dimension_blueprints USING GIN (dominant_glyph_uids);
CREATE INDEX idx_gin_tags ON dimension_blueprints USING GIN (tags);
CREATE INDEX idx_dimension_blueprints_creator_uid ON dimension_blueprints (creator_uid);
CREATE INDEX idx_dimension_blueprints_is_active ON dimension_blueprints (is_active_in_multiverse);
CREATE INDEX idx_dimension_blueprints_is_published ON dimension_blueprints (is_published_to_library);


-- Trigger function to update last_modified_timestamp
CREATE OR REPLACE FUNCTION update_modified_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_modified_timestamp = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to call the function before update
CREATE TRIGGER trigger_update_dimension_blueprints_modtime
BEFORE UPDATE ON dimension_blueprints
FOR EACH ROW
EXECUTE FUNCTION update_modified_timestamp();

-- Note: If using Supabase, ensure the 'pgcrypto' extension is enabled in your database settings
-- for gen_random_uuid() to work, or use the alternative uuid_generate_v4() from "uuid-ossp" if preferred.
-- Supabase typically enables pgcrypto by default on new projects.
