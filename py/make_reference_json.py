import csv


def load_csv(path):
    csv_array = []
    with open(path, mode="r", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            csv_array.append(row)
    return csv_array


def dictlist_to_reference_json(dictlist):
    reference = {}
    idmemo = {}
    for dict in dictlist:
        surface = dict["surface"]
        id = dict["id"]
        original = dict["original"]
        if surface not in idmemo:
            reference[surface] = []
            idmemo[surface] = []
        if id not in idmemo[surface]:
            reference[surface].append(original)
            idmemo[surface].append(id)
    return reference


def main():
    import argparse
    import json

    parser = argparse.ArgumentParser()
    parser.add_argument("csv_path", type=str)
    parser.add_argument("output_path", type=str, nargs="?", default="output.json")
    args = parser.parse_args()

    dictlist = load_csv(args.csv_path)
    reference = dictlist_to_reference_json(dictlist)
    with open(args.output_path, "w", encoding="utf-8") as file:
        json.dump(reference, file, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    main()
