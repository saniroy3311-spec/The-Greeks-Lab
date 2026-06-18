with open('static/candl-charts.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

import re

# Search for calls to Ti
print("=== CALLS TO Ti IN JS ===")
for match in re.finditer(r'\bTi\b', js_content):
    start = max(0, match.start() - 100)
    end = min(len(js_content), match.end() + 100)
    print(f"Index {match.start()}:\n{js_content[start:end]}\n{'-'*50}")
