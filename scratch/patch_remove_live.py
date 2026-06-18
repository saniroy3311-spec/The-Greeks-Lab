import os

def main():
    file_path = 'templates/dashboard.html'
    if not os.path.exists(file_path):
        print("Error: templates/dashboard.html not found.")
        return
        
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Remove the live status indicator HTML container
    old_indicator = """      <div class="live-status-indicator">
        <span class="dot active" id="dot"></span>
        <span id="status">Loading…</span>
      </div>"""
      
    if old_indicator in html:
        html = html.replace(old_indicator, "")
        print("Removed live-status-indicator HTML container.")
    else:
        # Try a slightly different spacing variant
        old_indicator_alt = """      <div class="live-status-indicator">
        <span class="dot active" id="dot"></span>
        <span id="status">Loading...</span>
      </div>"""
        if old_indicator_alt in html:
            html = html.replace(old_indicator_alt, "")
            print("Removed live-status-indicator HTML container (alt spacing).")
        else:
            print("Warning: Could not find exact live-status-indicator HTML block.")

    # 2. Make JS status updates safe by checking if $('status') exists
    html = html.replace("$('status').textContent =", "if ($('status')) $('status').textContent =")
    print("Safeguarded JS $('status') updates.")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
        
    print("Patch completed successfully.")

if __name__ == '__main__':
    main()
