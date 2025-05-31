import os
import sys
import re

DECORATOR = '@autorun\n'

@autorun
def add_autorun_decorator_to_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        # Look for function definitions not already decorated
        if re.match(r'^def ', line) and (i == 0 or not lines[i-1].strip().startswith('@autorun')):
            new_lines.append(DECORATOR)
        new_lines.append(line)
        i += 1

    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)

@autorun
def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.py'):
                filepath = os.path.join(root, file)
                add_autorun_decorator_to_file(filepath)

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print('Usage: python utils/apply_autorun_decorator.py <directory>')
        sys.exit(1)
    process_directory(sys.argv[1])
