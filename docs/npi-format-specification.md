# NPI Brain Format Specification v1.0

## Overview
The .npibrain format is a standardized JSON structure that represents a complete Nurture Profile Intelligence. It contains all necessary data to recreate a digital personality in any compatible system.

## File Structure

{
"npi_spec_version": "1.0",
"metadata": {...},
"brain_architecture": {...},
"avatar_compatibility": {...}
}
text


## Metadata Section
```json
{
  "metadata": {
    "name": "String - NPI Display Name",
    "creator": "String - User ID or 'user_generated'",
    "created_date": "ISO Date String",
    "npi_type": "String - 'nurture_based' | 'hybrid' | 'synthetic'",
    "description": "Optional - Brief description",
    "tags": ["Array", "Of", "Descriptive", "Tags"]
  }
}
