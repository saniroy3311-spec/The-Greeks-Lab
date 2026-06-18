import os

def main():
    file_path = 'templates/dashboard.html'
    if not os.path.exists(file_path):
        print("Error: templates/dashboard.html not found.")
        return
        
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Remove the inline checkboxes HTML from the Scalper Tab header
    old_checkboxes = """          <div class="indicator-toggles inline-row" id="scalper-indicator-toggles">
            <label><input type="checkbox" data-indicator="volume"> Volume</label>
            <label><input type="checkbox" data-indicator="ema9" checked> EMA 9</label>
            <label><input type="checkbox" data-indicator="ema15" checked> EMA 15</label>
            <label><input type="checkbox" data-indicator="vwap"> VWAP</label>
            <label><input type="checkbox" data-indicator="stochastic"> Stoch</label>
            <label><input type="checkbox" data-indicator="obv"> OBV</label>
            <label><input type="checkbox" data-indicator="cvd"> CVD</label>
            <label><input type="checkbox" data-indicator="bollinger"> BBands</label>
            <label><input type="checkbox" data-indicator="rsi"> RSI</label>
            <label><input type="checkbox" data-indicator="macd"> MACD</label>
          </div>"""
          
    if old_checkboxes in html:
        html = html.replace(old_checkboxes, "")
        print("Removed scalper-indicator-toggles HTML container.")
    else:
        # Check alternative formatting with spaces
        old_checkboxes_alt = """          <div class="indicator-toggles inline-row" id="scalper-indicator-toggles">
            <label><input type="checkbox" data-indicator="volume"> Volume</label>
            <label><input type="checkbox" data-indicator="ema9" checked> EMA 9</label>
            <label><input type="checkbox" data-indicator="ema15" checked> EMA 15</label>
            <label><input type="checkbox" data-indicator="vwap"> VWAP</label>
            <label><input type="checkbox" data-indicator="stochastic"> Stoch</label>
            <label><input type="checkbox" data-indicator="obv"> OBV</label>
            <label><input type="checkbox" data-indicator="cvd"> CVD</label>
            <label><input type="checkbox" data-indicator="bollinger"> BBands</label>
            <label><input type="checkbox" data-indicator="rsi"> RSI</label>
            <label><input type="checkbox" data-indicator="macd"> MACD</label>
          </div>"""
        # Let's use regex to find and remove <div class="indicator-toggles inline-row" id="scalper-indicator-toggles"> ... </div>
        pattern = r'\s*<div class="indicator-toggles inline-row" id="scalper-indicator-toggles">.*?</div>'
        html, count = re.subn(pattern, "", html, flags=re.DOTALL)
        if count > 0:
            print(f"Removed scalper-indicator-toggles HTML using regex (count: {count}).")
        else:
            print("Warning: Could not find scalper-indicator-toggles HTML block.")

    # 2. Update getActiveIndicators function to check if input is already an array
    old_func = """function getActiveIndicators(togglesContainerId) {
  const container = $(togglesContainerId);
  if (!container) return [];
  const checkedInputs = container.querySelectorAll('input[type="checkbox"]:checked');
  return Array.from(checkedInputs).map(input => input.getAttribute('data-indicator'));
}"""

    new_func = """function getActiveIndicators(togglesContainerId) {
  if (Array.isArray(togglesContainerId)) {
    return togglesContainerId;
  }
  const container = $(togglesContainerId);
  if (!container) return [];
  const checkedInputs = container.querySelectorAll('input[type="checkbox"]:checked');
  return Array.from(checkedInputs).map(input => input.getAttribute('data-indicator'));
}"""

    if old_func in html:
        html = html.replace(old_func, new_func)
        print("Updated getActiveIndicators function code.")
    else:
        print("Warning: Could not find exact getActiveIndicators function block.")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
        
    print("Redundant indicators checkboxes removed successfully.")

if __name__ == '__main__':
    import re
    main()
