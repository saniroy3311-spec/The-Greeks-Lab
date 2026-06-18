import os

def main():
    file_path = 'templates/dashboard.html'
    if not os.path.exists(file_path):
        print("Error: templates/dashboard.html not found.")
        return
        
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # Define targets and replacements
    target_indicators = '<button class="top-btn" id="indicators-toggle-btn" onclick="toggleIndicatorsDropdown(event)"><span class="icon">📊</span> Indicators</button>'
    replacement_indicators = """<button class="top-btn" id="indicators-toggle-btn" onclick="toggleIndicatorsDropdown(event)">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" style="vertical-align: middle; margin-right: 4px;"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
      Indicators
    </button>"""

    target_settings = '<button class="top-btn" onclick="openSettingsModal()"><span class="icon">⚙️</span> Settings</button>'
    replacement_settings = """<button class="top-btn" onclick="openSettingsModal()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" style="vertical-align: middle; margin-right: 4px;"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
      Settings
    </button>"""

    target_alerts = '<button class="top-btn" onclick="openAlertsModal()"><span class="icon">🔔</span> Alerts</button>'
    replacement_alerts = """<button class="top-btn" onclick="openAlertsModal()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" style="vertical-align: middle; margin-right: 4px;"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
      Alerts
    </button>"""

    # Apply replacements
    if target_indicators in html:
        html = html.replace(target_indicators, replacement_indicators)
        print("Replaced Indicators emoji with SVG.")
    else:
        print("Warning: Indicators target not found.")

    if target_settings in html:
        html = html.replace(target_settings, replacement_settings)
        print("Replaced Settings emoji with SVG.")
    else:
        print("Warning: Settings target not found.")

    if target_alerts in html:
        html = html.replace(target_alerts, replacement_alerts)
        print("Replaced Alerts emoji with SVG.")
    else:
        print("Warning: Alerts target not found.")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
        
    print("SVG replacement completed.")

if __name__ == '__main__':
    main()
