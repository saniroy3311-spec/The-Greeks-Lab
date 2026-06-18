with open('templates/dashboard.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Print the style rules for overlays
import re
style_block = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
if style_block:
    css = style_block.group(1)
    rules = re.findall(r'(\.[a-zA-Z0-9_\-\.\s,:#]+?\{.*?\})', css, re.DOTALL)
    print("Overlay Rules:")
    for r in rules:
        if 'overlays-container' in r or 'overlay-card' in r or 'sig' in r or 'echoes-card' in r:
            print(r.strip())
            print("-" * 40)
else:
    print("Style block not found.")
