with open('static/candl-charts.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

import re

# Search for any references to timer, countdown, seconds, remaining time in the entire file
print("=== SEARCH FOR TIMER/COUNTDOWN IN JS (SAFE PRINT) ===")
pattern = re.compile(r'timer|countdown|remaining|duration|minutes|seconds', re.IGNORECASE)
for match in pattern.finditer(js_content):
    start = max(0, match.start() - 100)
    end = min(len(js_content), match.end() + 100)
    snippet = js_content[start:end]
    # Safe print to avoid Windows CP1252 print errors
    safe_snippet = snippet.encode('ascii', errors='replace').decode('ascii')
    print(f"Index {match.start()} (Line {js_content.count(chr(10), 0, match.start()) + 1}):\n{safe_snippet}\n{'-'*50}")
