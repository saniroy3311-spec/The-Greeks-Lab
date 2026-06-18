import re

with open('static/candl-charts.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Search for drawing of dashed lines
print("=== DASHED LINES IN JS ===")
for match in re.finditer(r'setLineDash|dashed|dash', js_content, re.IGNORECASE):
    start = max(0, match.start() - 100)
    end = min(len(js_content), match.end() + 100)
    print(f"Index {match.start()}:\n{js_content[start:end]}\n{'-'*50}")

# Search for CVD or volume indicator definitions
print("=== INDICATOR DEFINITIONS ===")
for match in re.finditer(r'volume|CVD|stochastic|macd|rsi', js_content, re.IGNORECASE):
    start = max(0, match.start() - 100)
    end = min(len(js_content), match.end() + 100)
    # Print if it looks like a definition or rendering logic
    snippet = js_content[start:end]
    if 'id:' in snippet or 'label:' in snippet or 'compute' in snippet or 'draw' in snippet:
        print(f"Indicator logic at {match.start()}:\n{snippet}\n{'-'*50}")
