with open('static/candl-charts.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

import re

# Search for any references to timer, countdown, seconds, remaining time
print("=== SEARCH FOR TIMER IN JS ===")
for match in re.finditer(r'timer|countdown|remaining|duration|minutes|seconds', js_content, re.IGNORECASE):
    snippet = js_content[max(0, match.start() - 100):min(len(js_content), match.end() + 100)]
    print(f"Index {match.start()}:\n{snippet.strip()}\n{'-'*40}")
