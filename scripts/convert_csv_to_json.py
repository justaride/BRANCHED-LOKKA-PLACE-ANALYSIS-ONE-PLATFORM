#!/usr/bin/env python3
import csv
import json
import os
from pathlib import Path

# Define source and destination directories
source_dir = Path("/Users/gabrielboen/Downloads/LØKKA PROJECTS UPDATED AND BACKUPS FOLDER/Nedre Thorvald Meyers Gate")
dest_base = Path("/Users/gabrielboen/Downloads/lokka-gardeierforening-platform/src/data/main-board/nedre-thorvald-meyers-gate")

# Mapping of CSV files to their categories and output filenames
file_mappings = {
    "Aldersfordeling DEMOGRAFI.csv": ("demografi", "aldersfordeling.json"),
    "Antall hus (besøkende) BESØKENDE.csv": ("besokende", "antall-hus.json"),
    "Antall hus DEMOGRAFI.csv": ("demografi", "antall-hus.json"),
    "Antall husholdninger DEMOGRAFI.csv": ("demografi", "antall-husholdninger.json"),
    "Årlig vekst KORTHANDEL.csv": ("korthandel", "arlig-vekst.json"),
    "Besøk per time i tidsperioden (daglig gjennomsnitt) BEVEGELSE.csv": ("bevegelse", "besok-per-time.json"),
    "Besøk per ukedag i tidsperioden (daglig gjennomsnitt) BEVEGELSE.csv": ("bevegelse", "besok-per-ukedag.json"),
    "Bevegelsesmønster (gjennomsnittlig daglige besøk) BEVEGELSE.csv": ("bevegelse", "bevegelsesmonster.json"),
    "Demografi over tid DEMOGRAFI.csv": ("demografi", "demografi-over-tid.json"),
    "Husholdningstypefordeling (besøkende) BESØKENDE.csv": ("besokende", "husholdningstypefordeling.json"),
    "Hvem er de besøkende? (Besøkendes demografi) BESØKENDE.csv": ("besokende", "besokende-demografi.json"),
    "Indeksert vekst (indeks = 100) KORTHANDEL.csv": ("korthandel", "indeksert-vekst.json"),
    "Inntektsfordeling (besøkende) BESØKENDE.csv": ("besokende", "inntektsfordeling.json"),
    "Inntektsfordeling DEMOGRAFI.csv": ("demografi", "inntektsfordeling.json"),
    "Kjeder vs. uavhengige konsepter KONKURRANSEBILDET.csv": ("konkurransebilde", "kjeder-vs-uavhengige.json"),
    "Konseptmiks KONKURRANSEBILDET.csv": ("konkurransebilde", "konseptmiks.json"),
    "Korthandel i valgt tidsrom KORTHANDEL.csv": ("korthandel", "korthandel-tidsrom.json"),
    "Korthandel per ukedag KORTHANDEL.csv": ("korthandel", "korthandel-per-ukedag.json"),
    "Medianinntekt per husholdningstype (besøkende) BESØKENDE.csv": ("besokende", "medianinntekt-per-husholdningstype.json"),
    "Medianinntekt per husholdningstype DEMOGRAFI.csv": ("demografi", "medianinntekt-per-husholdningstype.json"),
    "Over- og underandel vs. kommune KONKURRANSEBILDET.csv": ("konkurransebilde", "over-underandel-vs-kommune.json"),
    "Topp 20 land besøkende til området (i %) INTERNASJONALT BESØKENDE.csv": ("internasjonalt", "topp-20-land.json"),
    "Utvikling per år KONKURRANSEBILDET.csv": ("konkurransebilde", "utvikling-per-ar.json"),
}

def convert_csv_to_json(csv_path):
    """Convert CSV file to JSON structure, handling Norwegian characters properly."""
    data = []

    with open(csv_path, 'r', encoding='utf-8-sig') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # Convert numeric strings to numbers where possible
            converted_row = {}
            for key, value in row.items():
                # Try to convert to float, otherwise keep as string
                try:
                    # Handle empty values
                    if value == '' or value is None:
                        converted_row[key] = None
                    else:
                        # Try converting to number
                        if '.' in value or ',' in value:
                            converted_row[key] = float(value)
                        else:
                            try:
                                converted_row[key] = int(value)
                            except ValueError:
                                converted_row[key] = value
                except (ValueError, AttributeError):
                    converted_row[key] = value
            data.append(converted_row)

    return data

def main():
    converted_files = []
    skipped_files = []

    for csv_filename, (category, json_filename) in file_mappings.items():
        csv_path = source_dir / csv_filename
        json_path = dest_base / category / json_filename

        if not csv_path.exists():
            skipped_files.append(f"{csv_filename} (not found)")
            continue

        try:
            # Convert CSV to JSON
            data = convert_csv_to_json(csv_path)

            # Write JSON file
            with open(json_path, 'w', encoding='utf-8') as jsonfile:
                json.dump(data, jsonfile, ensure_ascii=False, indent=2)

            converted_files.append({
                'source': csv_filename,
                'destination': str(json_path.relative_to(Path("/Users/gabrielboen/Downloads/lokka-gardeierforening-platform"))),
                'records': len(data)
            })

            print(f"✓ Converted: {csv_filename} -> {category}/{json_filename} ({len(data)} records)")

        except Exception as e:
            skipped_files.append(f"{csv_filename} (error: {str(e)})")
            print(f"✗ Failed: {csv_filename} - {str(e)}")

    # Print summary
    print("\n" + "="*80)
    print("CONVERSION SUMMARY")
    print("="*80)
    print(f"\nTotal files processed: {len(converted_files) + len(skipped_files)}")
    print(f"Successfully converted: {len(converted_files)}")
    print(f"Skipped/Failed: {len(skipped_files)}")

    if converted_files:
        print("\nCONVERTED FILES:")
        for file_info in converted_files:
            print(f"  • {file_info['source']}")
            print(f"    → {file_info['destination']}")
            print(f"    ({file_info['records']} records)")

    if skipped_files:
        print("\nSKIPPED/FAILED FILES:")
        for file in skipped_files:
            print(f"  • {file}")

    # Save summary to JSON
    summary_path = dest_base / "conversion-summary.json"
    with open(summary_path, 'w', encoding='utf-8') as f:
        json.dump({
            'total_files': len(converted_files) + len(skipped_files),
            'converted': len(converted_files),
            'skipped': len(skipped_files),
            'files': converted_files,
            'skipped_files': skipped_files
        }, f, ensure_ascii=False, indent=2)

    print(f"\nSummary saved to: {summary_path.relative_to(Path('/Users/gabrielboen/Downloads/lokka-gardeierforening-platform'))}")

if __name__ == "__main__":
    main()
