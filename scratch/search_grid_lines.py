with open('static/candl-charts.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

import re

# Find any rendering of horizontal lines, price tags, or grid lines
print("=== AXIS OR PRICE GRID LINES ===")
for match in re.finditer(r'priceToY|y-axis|grid|guide|stroke', js_content, re.IGNORECASE):
    snippet = js_content[max(0, match.start() - 80):min(len(js_content), match.end() + 80)]
    if '0' in snippet or 'Y' in snippet or 'axis' in snippet:
        # filter to interesting lines
        if any(w in snippet for w in ['dash', 'setLineDash', 'stroke', 'lineTo', 'beginPath']):
            print(f"Line {js_content.count(chr(10), 0, match.start()) + 1}: {snippet.strip()}\n{'-'*40}")
