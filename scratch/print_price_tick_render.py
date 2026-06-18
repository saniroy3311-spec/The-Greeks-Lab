with open('static/candl-charts.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Locate index 129345 and print 1000 characters before and after
start = 129000
end = 130000
snippet = js_content[start:end]
safe_snippet = snippet.encode('ascii', errors='replace').decode('ascii')
print(safe_snippet)
