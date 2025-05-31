import os
import sys
import re

# Import autorun from the same directory
from autorun import autorun

DECORATOR = '@autorun\n'

@autorun
def add_autorun_decorator_to_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Ensure the import for autorun exists
    if not any('from autorun import autorun' in line for line in lines):
        # Insert after any __future__ imports or at the top
        insert_at = 0
        for i, line in enumerate(lines):
            if line.startswith('from __future__'):
                insert_at = i + 1
        lines.insert(insert_at, 'from autorun import autorun\n')

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
    for root, dirs, files in os.walk(directory):
        # Skip hidden and cache directories
        dirs[:] = [d for d in dirs if not d.startswith('.') and not d.endswith('_cache')]
        for file in files:
            if file.endswith('.py') and not file.startswith('.'):
                filepath = os.path.join(root, file)
                add_autorun_decorator_to_file(filepath)

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print('Usage: python utils/apply_autorun_decorator.py <directory>')
        sys.exit(1)
    process_directory(sys.argv[1])
