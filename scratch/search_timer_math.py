with open('static/candl-charts.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

import re

print("=== SEARCH FOR % 60 OR PATTERNS IN JS ===")
# Find any math calculations with 60 or time formatting
pattern = re.compile(r'%\s*60|60\s*\*|60\s*//|/\s*60|:\s*|pad|padStart', re.IGNORECASE)
for match in pattern.finditer(js_content):
    start = max(0, match.start() - 60)
    end = min(len(js_content), match.end() + 60)
    snippet = js_content[start:end]
    safe_snippet = snippet.encode('ascii', errors='replace').decode('ascii')
    # Filter to snippets containing division/modulo or timer related words
    if any(w in safe_snippet for w in ['60', 'time', 'date', 'min', 'sec', 'hour']):
        print(f"Index {match.start()} (Line {js_content.count(chr(10), 0, match.start()) + 1}):\n{safe_snippet}\n{'-'*40}")
