import re

def main():
    with open('templates/dashboard.html.bak', 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Update css root variables
    old_root = """  :root {
    --bg: #0e1116; --surface: #161b22; --border: #262d36;
    --text: #e6edf3; --muted: #8b949e;
    --up: #1d9e75; --down: #d85a30; --flat: #8b949e;
    --pred: #ef9f27; --blue: #378add;
  }"""
    
    new_root = """  :root {
    --bg: #0b1220;
    --surface: #131a2e;
    --border: #22293f;
    --text: #ffffff;
    --muted: #848e9c;
    --up: #26a69a;
    --down: #ef5350;
    --flat: #848e9c;
    --pred: #ef9f27;
    --blue: #2962FF;
  }
  body.light-theme {
    --bg: #ffffff;
    --surface: #f8f9fa;
    --border: #e0e3eb;
    --text: #131722;
    --muted: #70757a;
    --up: #26a69a;
    --down: #ef5350;
    --flat: #70757a;
    --pred: #ef9f27;
    --blue: #2962FF;
  }"""
    
    html = html.replace(old_root, new_root)

    # 2. Append additional CSS before </style>
    additional_css = """
  /* Modal styling */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
  .modal-overlay.active {
    opacity: 1;
    pointer-events: auto;
  }
  .modal-content {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    width: 90%;
    max-width: 450px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    transform: translateY(20px);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    max-height: 85vh;
  }
  .modal-overlay.active .modal-content {
    transform: translateY(0);
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 18px;
    border-bottom: 1px solid var(--border);
  }
  .modal-header h3 {
    font-size: 15px;
    font-weight: 600;
    margin: 0;
  }
  .close-btn {
    background: transparent;
    border: none;
    color: var(--muted);
    font-size: 16px;
    cursor: pointer;
    padding: 4px;
    line-height: 1;
    transition: color 0.2s;
  }
  .close-btn:hover {
    color: var(--text);
  }
  .modal-body {
    padding: 18px;
    overflow-y: auto;
  }
  
  /* Indicators Modal styling */
  .indicator-search-box {
    margin-bottom: 14px;
  }
  .form-input {
    width: 100%;
    padding: 8px 12px;
    border-radius: 6px;
    background: var(--bg);
    border: 1px solid var(--border);
    color: var(--text);
    outline: none;
    font-size: 13px;
  }
  .form-input:focus {
    border-color: var(--blue);
  }
  .indicator-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .indicator-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 10px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s;
    user-select: none;
  }
  .indicator-item:hover {
    background: rgba(255, 255, 255, 0.04);
  }
  body.light-theme .indicator-item:hover {
    background: rgba(0, 0, 0, 0.03);
  }
  .indicator-item-left {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
  }
  .indicator-badge {
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.06);
    color: var(--muted);
    border: 1px solid var(--border);
  }
  body.light-theme .indicator-badge {
    background: rgba(0, 0, 0, 0.04);
  }
  
  /* Settings Switch toggle styling */
  .settings-section {
    margin-bottom: 20px;
  }
  .settings-section h4 {
    font-size: 11px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 10px;
    letter-spacing: 0.5px;
  }
  .settings-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    font-size: 13px;
  }
  .color-picker-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .color-picker-wrapper input[type="color"] {
    border: none;
    outline: none;
    width: 26px;
    height: 26px;
    background: transparent;
    cursor: pointer;
  }
  .color-hex {
    font-family: monospace;
    font-size: 12px;
    color: var(--muted);
    text-transform: uppercase;
  }
  .switch {
    position: relative;
    display: inline-block;
    width: 38px;
    height: 20px;
  }
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.1);
    transition: .3s;
    border: 1px solid var(--border);
  }
  body.light-theme .slider {
    background-color: rgba(0, 0, 0, 0.05);
  }
  .slider:before {
    position: absolute;
    content: "";
    height: 14px;
    width: 14px;
    left: 2px;
    bottom: 2px;
    background-color: var(--text);
    transition: .3s;
  }
  input:checked + .slider {
    background-color: var(--blue);
    border-color: var(--blue);
  }
  input:checked + .slider:before {
    transform: translateX(18px);
    background-color: #ffffff;
  }
  .slider.round {
    border-radius: 20px;
  }
  .slider.round:before {
    border-radius: 50%;
  }
  
  /* Alerts Modal tabs & controls */
  .alert-type-tabs {
    display: flex;
    border-radius: 6px;
    background: var(--bg);
    border: 1px solid var(--border);
    overflow: hidden;
  }
  .alert-tab-btn {
    flex: 1;
    background: transparent;
    border: none;
    color: var(--muted);
    padding: 8px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.2s;
  }
  .alert-tab-btn.active {
    background: var(--blue);
    color: #ffffff;
  }
  .form-select {
    width: 100%;
    padding: 8px 12px;
    border-radius: 6px;
    background: var(--bg);
    border: 1px solid var(--border);
    color: var(--text);
    outline: none;
    font-size: 13px;
    cursor: pointer;
  }
  .input-unit-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .width-60 {
    width: 60px !important;
  }
  .unit-label {
    color: var(--muted);
    font-size: 12px;
  }
  .button-group {
    display: flex;
    gap: 8px;
  }
  .btn {
    flex: 1;
    padding: 10px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
    text-align: center;
  }
  .btn-primary {
    background: var(--blue);
    color: #ffffff;
  }
  .btn-primary:hover {
    background: #1b4cd6;
  }
  .btn-secondary {
    background: rgba(255, 255, 255, 0.06);
    color: var(--text);
    border: 1px solid var(--border);
  }
  body.light-theme .btn-secondary {
    background: rgba(0, 0, 0, 0.04);
  }
  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  body.light-theme .btn-secondary:hover {
    background: rgba(0, 0, 0, 0.08);
  }
  .btn-full {
    width: 100%;
    margin-top: 10px;
  }
  
  /* Topbar styling */
  .candl-topbar {
    display: flex;
    align-items: center;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 6px 12px;
    margin-bottom: 16px;
    gap: 8px;
    font-size: 13px;
    flex-wrap: wrap;
  }
  .candl-topbar .divider {
    width: 1px;
    height: 20px;
    background: var(--border);
  }
  .logo-section {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 700;
    font-size: 15px;
    color: var(--text);
  }
  .search-select {
    background: transparent;
    border: none;
    color: var(--text);
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
    outline: none;
    padding: 4px 8px;
  }
  .search-select option {
    background: var(--surface);
    color: var(--text);
  }
  .timeframe-buttons {
    display: flex;
    gap: 4px;
  }
  .tf-btn {
    background: transparent;
    border: none;
    color: var(--muted);
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
  }
  .tf-btn:hover {
    color: var(--text);
    background: rgba(255, 255, 255, 0.05);
  }
  body.light-theme .tf-btn:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  .tf-btn.active {
    background: var(--blue);
    color: #ffffff !important;
  }
  .top-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: transparent;
    border: none;
    color: var(--text);
    padding: 6px 10px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
  }
  .top-btn:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  body.light-theme .top-btn:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  .top-btn-icon {
    background: transparent;
    border: none;
    color: var(--text);
    padding: 6px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    transition: all 0.2s;
  }
  .top-btn-icon:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  body.light-theme .top-btn-icon:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  .right-section {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .live-status-indicator {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: var(--muted);
    margin-left: 8px;
  }
  .live-status-indicator .dot {
    width: 6px;
    height: 6px;
    background: #555;
    border-radius: 50%;
  }
  .live-status-indicator .dot.active {
    background: var(--up);
    box-shadow: 0 0 8px var(--up);
    animation: pulse 2s infinite;
  }
  
  .mt-12 { margin-top: 12px; }
  .mt-16 { margin-top: 16px; }
"""
    html = html.replace('</style>', additional_css + '\n</style>')

    # 3. Replace the top bar with new unified topbar HTML
    old_topbar = """  <div class="topbar">
    <div class="title">The Greeks</div>
    <div class="controls">
      <select id="symbol">
        <option value="NIFTY">Nifty 50</option>
        <option value="BANKNIFTY">Bank Nifty</option>
        <option value="BTC">Bitcoin (BTC)</option>
        <option value="GOLD">Gold (GC=F)</option>
      </select>
      <select id="tf">
        <option value="1m">1 min</option>
        <option value="3m">3 min</option>
        <option value="5m" selected>5 min</option>
        <option value="15m">15 min</option>
        <option value="30m">30 min</option>
        <option value="1h">1 hour</option>
        <option value="1d">1 day</option>
      </select>
      <select id="chart-type">
        <option value="candles" selected>Candles</option>
        <option value="hollow">Hollow Candles</option>
        <option value="heikin">Heikin Ashi</option>
        <option value="renko">Renko</option>
        <option value="volcandles">Volume Candles</option>
        <option value="bars">Bars</option>
        <option value="line">Line</option>
        <option value="area">Area</option>
      </select>
    </div>
    <div class="live"><span class="dot" id="dot"></span><span id="status">Loading…</span></div>
  </div>"""

    new_topbar = """  <div class="candl-topbar">
    <div class="logo-section">
      <span class="logo-icon">🧪</span>
      <span class="logo-text">GreeksLab</span>
    </div>
    <div class="divider"></div>
    <div class="symbol-search-container">
      <select id="symbol" class="search-select">
        <option value="NIFTY">Nifty 50</option>
        <option value="BANKNIFTY">Bank Nifty</option>
        <option value="BTC">Bitcoin (BTC)</option>
        <option value="GOLD">Gold (GC=F)</option>
      </select>
    </div>
    <div class="divider"></div>
    <div class="timeframe-buttons" id="timeframe-container">
      <button class="tf-btn" data-tf="1m" onclick="setTimeframe('1m')">1m</button>
      <button class="tf-btn" data-tf="3m" onclick="setTimeframe('3m')">3m</button>
      <button class="tf-btn active" data-tf="5m" onclick="setTimeframe('5m')">5m</button>
      <button class="tf-btn" data-tf="15m" onclick="setTimeframe('15m')">15m</button>
      <button class="tf-btn" data-tf="30m" onclick="setTimeframe('30m')">30m</button>
      <button class="tf-btn" data-tf="1h" onclick="setTimeframe('1h')">1h</button>
      <button class="tf-btn" data-tf="1d" onclick="setTimeframe('1d')">1d</button>
    </div>
    <input type="hidden" id="tf" value="5m">
    <div class="divider"></div>
    <select id="chart-type" class="search-select">
      <option value="candles">Candles</option>
      <option value="hollow">Hollow Candles</option>
      <option value="heikin">Heikin Ashi</option>
      <option value="renko">Renko</option>
      <option value="volcandles">Volume Candles</option>
      <option value="bars">Bars</option>
      <option value="line">Line</option>
      <option value="area">Area</option>
    </select>
    <div class="divider"></div>
    <button class="top-btn" onclick="toggleModal('indicators-modal', true)"><span class="icon">📊</span> Indicators</button>
    <button class="top-btn" onclick="openSettingsModal()"><span class="icon">⚙️</span> Settings</button>
    <button class="top-btn" onclick="openAlertsModal()"><span class="icon">🔔</span> Alerts</button>
    
    <div class="right-section">
      <button class="top-btn-icon" onclick="resetActiveChartView()" title="Reset View">↩️</button>
      <button class="top-btn-icon" onclick="toggleFullscreen()" title="Toggle Fullscreen">🎦</button>
      <button class="top-btn-icon" id="global-theme-toggle" onclick="toggleTheme()" title="Toggle Theme">🌙</button>
      <div class="live-status-indicator">
        <span class="dot active" id="dot"></span>
        <span id="status">Loading…</span>
      </div>
    </div>
  </div>"""

    html = html.replace(old_topbar, new_topbar)

    # 4. Insert Modal HTML right after <body>
    modals_html = """
  <!-- Modals Overlay Library -->
  <!-- Indicators Modal -->
  <div id="indicators-modal" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Indicators</h3>
        <button class="close-btn" onclick="toggleModal('indicators-modal', false)">✕</button>
      </div>
      <div class="modal-body">
        <div class="indicator-search-box">
          <input type="text" id="indicator-search" class="form-input" placeholder="Search indicators..." oninput="filterIndicators()">
        </div>
        <div class="indicator-list" id="indicator-list-container">
          <!-- Dynamically populated indicator list -->
        </div>
        <div class="active-indicators-section" style="margin-top: 14px; border-top: 1px solid var(--border); padding-top: 10px;">
          <h4 style="font-size: 11px; text-transform: uppercase; color: var(--muted); margin-bottom: 6px;">On Chart</h4>
          <div id="active-indicators-list" style="display: flex; flex-direction: column; gap: 6px; font-size: 12px; color: var(--text);">
            <!-- Active indicator pills -->
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Settings Modal -->
  <div id="settings-modal" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Settings</h3>
        <button class="close-btn" onclick="toggleModal('settings-modal', false)">✕</button>
      </div>
      <div class="modal-body">
        <div class="settings-section">
          <h4>Appearance</h4>
          <div class="settings-row">
            <label>Up Color</label>
            <div class="color-picker-wrapper">
              <input type="color" id="settings-up-color" value="#26a69a">
              <span class="color-hex" id="settings-up-hex">#26A69A</span>
            </div>
          </div>
          <div class="settings-row">
            <label>Down Color</label>
            <div class="color-picker-wrapper">
              <input type="color" id="settings-down-color" value="#ef5350">
              <span class="color-hex" id="settings-down-hex">#EF5350</span>
            </div>
          </div>
          <div class="settings-row">
            <label>Grid lines</label>
            <label class="switch">
              <input type="checkbox" id="settings-grid">
              <span class="slider round"></span>
            </label>
          </div>
          <div class="settings-row">
            <label>Crosshair</label>
            <label class="switch">
              <input type="checkbox" id="settings-crosshair" checked>
              <span class="slider round"></span>
            </label>
          </div>
        </div>
        <div class="settings-section">
          <h4>Behavior</h4>
          <div class="settings-row">
            <label>Alert sound</label>
            <label class="switch">
              <input type="checkbox" id="settings-sound" checked>
              <span class="slider round"></span>
            </label>
          </div>
          <div class="settings-row">
            <label>Magnet snap</label>
            <label class="switch">
              <input type="checkbox" id="settings-magnet">
              <span class="slider round"></span>
            </label>
          </div>
        </div>
        <button class="btn btn-secondary btn-full" onclick="resetSettingsToDefault()">Reset to defaults</button>
      </div>
    </div>
  </div>

  <!-- Alerts Modal -->
  <div id="alerts-modal" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h3 id="alerts-modal-title">Create Alert</h3>
        <button class="close-btn" onclick="toggleModal('alerts-modal', false)">✕</button>
      </div>
      <div class="modal-body">
        <div class="alert-type-tabs">
          <button class="alert-tab-btn active" id="alert-tab-above" onclick="setAlertCondition('above')">Above</button>
          <button class="alert-tab-btn" id="alert-tab-below" onclick="setAlertCondition('below')">Below</button>
        </div>
        <div class="settings-row mt-12">
          <label>Price</label>
          <input type="number" id="alert-price-input" step="0.01" class="form-input">
        </div>
        <div class="settings-row">
          <label>Note (optional)</label>
          <input type="text" id="alert-note-input" placeholder="Crossing level..." class="form-input">
        </div>
        <div class="settings-row">
          <label>Play sound on alert</label>
          <label class="switch">
            <input type="checkbox" id="alert-sound-active" checked>
            <span class="slider round"></span>
          </label>
        </div>
        <div class="settings-row">
          <label>Tune</label>
          <select id="alert-tune-select-modal" class="form-select">
            <option value="0">Classic beep</option>
            <option value="1">Chime</option>
            <option value="2">Ping</option>
            <option value="3">Rising Alert</option>
            <option value="4">Falling Alert</option>
            <option value="5">Pulse</option>
            <option value="6">Marimba</option>
          </select>
        </div>
        <div class="settings-row">
          <label>Duration</label>
          <div class="input-unit-group">
            <input type="number" id="alert-duration-modal" value="2" min="1" max="10" class="form-input width-60">
            <span class="unit-label">sec</span>
          </div>
        </div>
        <div class="button-group mt-16">
          <button class="btn btn-secondary" onclick="previewAlertSound()">Preview</button>
          <button class="btn btn-primary" onclick="submitAlertModal()">Create alert</button>
        </div>
      </div>
    </div>
  </div>
"""
    html = html.replace('<body>', '<body>\n' + modals_html)

    # 5. Remove indicator checkboxes under both charts
    old_indicators_live = """      <div class="indicator-toggles" id="live-indicator-toggles">
        <label><input type="checkbox" data-indicator="volume" checked> Volume</label>
        <label><input type="checkbox" data-indicator="ema9" checked> EMA 9</label>
        <label><input type="checkbox" data-indicator="ema15" checked> EMA 15</label>
        <label><input type="checkbox" data-indicator="vwap"> VWAP</label>
        <label><input type="checkbox" data-indicator="stochastic"> Stochastic</label>
        <label><input type="checkbox" data-indicator="obv"> OBV</label>
        <label><input type="checkbox" data-indicator="cvd"> CVD</label>
        <label><input type="checkbox" data-indicator="bollinger"> Bollinger Bands</label>
        <label><input type="checkbox" data-indicator="rsi"> RSI</label>
        <label><input type="checkbox" data-indicator="macd"> MACD</label>
      </div>"""
    
    old_indicators_scalper = """      <div class="indicator-toggles" id="scalper-indicator-toggles">
        <label><input type="checkbox" data-indicator="volume" checked> Volume</label>
        <label><input type="checkbox" data-indicator="ema9" checked> EMA 9</label>
        <label><input type="checkbox" data-indicator="ema15" checked> EMA 15</label>
        <label><input type="checkbox" data-indicator="vwap"> VWAP</label>
        <label><input type="checkbox" data-indicator="stochastic"> Stochastic</label>
        <label><input type="checkbox" data-indicator="obv"> OBV</label>
        <label><input type="checkbox" data-indicator="cvd"> CVD</label>
        <label><input type="checkbox" data-indicator="bollinger"> Bollinger Bands</label>
        <label><input type="checkbox" data-indicator="rsi"> RSI</label>
        <label><input type="checkbox" data-indicator="macd"> MACD</label>
      </div>"""
    
    html = html.replace(old_indicators_live, '')
    html = html.replace(old_indicators_scalper, '')

    # 6. Update toolbars to include magnet snap, undo, redo
    old_live_toolbar = """        <div class="drawing-toolbar" id="live-drawing-toolbar">
          <button class="tool-btn active" data-tool="select" title="Cursor (Select)"><span class="icon">🖱️</span></button>
          <button class="tool-btn" data-tool="trendline" title="Trend Line"><span class="icon">📈</span></button>
          <button class="tool-btn" data-tool="fib" title="Fibonacci Levels"><span class="icon">🧬</span></button>
          <button class="tool-btn" data-tool="elliottimpulse" title="Elliott Impulse Wave"><span class="icon">🌊</span></button>
          <button class="tool-btn" data-tool="elliottcorrection" title="Elliott Correction Wave"><span class="icon">📉</span></button>
          <button class="tool-btn" data-tool="brush" title="Freehand Brush"><span class="icon">🖌️</span></button>
          <button class="tool-btn" data-tool="rect" title="Rectangle"><span class="icon">⬛</span></button>
          <button class="tool-btn" data-tool="longpos" title="Long Position"><span class="icon">🟢</span></button>
          <button class="tool-btn" data-tool="shortpos" title="Short Position"><span class="icon">🔴</span></button>
          <button class="tool-btn" id="live-clear-drawings" title="Clear Drawings"><span class="icon">🗑️</span></button>
        </div>"""
    
    new_live_toolbar = """        <div class="drawing-toolbar" id="live-drawing-toolbar">
          <button class="tool-btn active" data-tool="select" title="Cursor (Select)"><span class="icon">🖱️</span></button>
          <button class="tool-btn" data-tool="trendline" title="Trend Line"><span class="icon">📈</span></button>
          <button class="tool-btn" data-tool="fib" title="Fibonacci Levels"><span class="icon">🧬</span></button>
          <button class="tool-btn" data-tool="elliottimpulse" title="Elliott Impulse Wave"><span class="icon">🌊</span></button>
          <button class="tool-btn" data-tool="elliottcorrection" title="Elliott Correction Wave"><span class="icon">📉</span></button>
          <button class="tool-btn" data-tool="brush" title="Freehand Brush"><span class="icon">🖌️</span></button>
          <button class="tool-btn" data-tool="rect" title="Rectangle"><span class="icon">⬛</span></button>
          <button class="tool-btn" data-tool="longpos" title="Long Position"><span class="icon">🟢</span></button>
          <button class="tool-btn" data-tool="shortpos" title="Short Position"><span class="icon">🔴</span></button>
          <button class="tool-btn tool-btn-magnet" id="live-magnet-btn" onclick="toggleMagnetSnap()" title="Magnet Snap (Snap to OHLC)"><span class="icon">🧲</span></button>
          <button class="tool-btn" id="live-undo-btn" onclick="undoDrawings('live')" title="Undo (Ctrl+Z)"><span class="icon">↩️</span></button>
          <button class="tool-btn" id="live-redo-btn" onclick="redoDrawings('live')" title="Redo (Ctrl+Y)"><span class="icon">↪️</span></button>
          <button class="tool-btn" id="live-clear-drawings" title="Clear Drawings"><span class="icon">🗑️</span></button>
        </div>"""
    
    old_scalper_toolbar = """        <div class="drawing-toolbar light" id="scalper-drawing-toolbar">
          <button class="tool-btn active" data-tool="select" title="Cursor (Select)"><span class="icon">🖱️</span></button>
          <button class="tool-btn" data-tool="trendline" title="Trend Line"><span class="icon">📈</span></button>
          <button class="tool-btn" data-tool="fib" title="Fibonacci Levels"><span class="icon">🧬</span></button>
          <button class="tool-btn" data-tool="elliottimpulse" title="Elliott Impulse Wave"><span class="icon">🌊</span></button>
          <button class="tool-btn" data-tool="elliottcorrection" title="Elliott Correction Wave"><span class="icon">📉</span></button>
          <button class="tool-btn" data-tool="brush" title="Freehand Brush"><span class="icon">🖌️</span></button>
          <button class="tool-btn" data-tool="rect" title="Rectangle"><span class="icon">⬛</span></button>
          <button class="tool-btn" data-tool="longpos" title="Long Position"><span class="icon">🟢</span></button>
          <button class="tool-btn" data-tool="shortpos" title="Short Position"><span class="icon">🔴</span></button>
          <button class="tool-btn" id="scalper-clear-drawings" title="Clear Drawings"><span class="icon">🗑️</span></button>
        </div>"""
    
    new_scalper_toolbar = """        <div class="drawing-toolbar" id="scalper-drawing-toolbar">
          <button class="tool-btn active" data-tool="select" title="Cursor (Select)"><span class="icon">🖱️</span></button>
          <button class="tool-btn" data-tool="trendline" title="Trend Line"><span class="icon">📈</span></button>
          <button class="tool-btn" data-tool="fib" title="Fibonacci Levels"><span class="icon">🧬</span></button>
          <button class="tool-btn" data-tool="elliottimpulse" title="Elliott Impulse Wave"><span class="icon">🌊</span></button>
          <button class="tool-btn" data-tool="elliottcorrection" title="Elliott Correction Wave"><span class="icon">📉</span></button>
          <button class="tool-btn" data-tool="brush" title="Freehand Brush"><span class="icon">🖌️</span></button>
          <button class="tool-btn" data-tool="rect" title="Rectangle"><span class="icon">⬛</span></button>
          <button class="tool-btn" data-tool="longpos" title="Long Position"><span class="icon">🟢</span></button>
          <button class="tool-btn" data-tool="shortpos" title="Short Position"><span class="icon">🔴</span></button>
          <button class="tool-btn tool-btn-magnet" id="scalper-magnet-btn" onclick="toggleMagnetSnap()" title="Magnet Snap (Snap to OHLC)"><span class="icon">🧲</span></button>
          <button class="tool-btn" id="scalper-undo-btn" onclick="undoDrawings('scalper')" title="Undo (Ctrl+Z)"><span class="icon">↩️</span></button>
          <button class="tool-btn" id="scalper-redo-btn" onclick="redoDrawings('scalper')" title="Redo (Ctrl+Y)"><span class="icon">↪️</span></button>
          <button class="tool-btn" id="scalper-clear-drawings" title="Clear Drawings"><span class="icon">🗑️</span></button>
        </div>"""
    
    html = html.replace(old_live_toolbar, new_live_toolbar)
    html = html.replace(old_scalper_toolbar, new_scalper_toolbar)

    # 7. Remove the redundant Alerts Manager Card at the bottom since we now have the modal overlay and top-level trigger
    old_alerts_card = """    <!-- Alerts Manager Card -->
    <div class="alerts-card" id="alerts-card">
      <div class="alerts-head">
        <div class="t">Price Alerts Manager</div>
        <div class="audio-settings">
          <label><input type="checkbox" id="alert-sound-toggle" checked> Sound Alerts</label>
          <select id="alert-tune-select">
            <option value="0">Classic Beep</option>
            <option value="1">Chime</option>
            <option value="2">Ping</option>
            <option value="3">Rising Alert</option>
            <option value="4">Falling Alert</option>
            <option value="5">Pulse</option>
            <option value="6">Marimba</option>
          </select>
          <select id="alert-dur-select">
            <option value="1">1 sec</option>
            <option value="2" selected>2 sec</option>
            <option value="3">3 sec</option>
            <option value="5">5 sec</option>
          </select>
        </div>
      </div>
      <div class="alerts-table-wrapper">
        <table class="alerts-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Condition</th>
              <th>Level</th>
              <th>Message</th>
              <th>Created</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="alerts-table-body">
            <tr>
              <td colspan="7" style="text-align: center; color: var(--muted); padding: 16px;">Right-click on the chart to set an alert.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>"""

    # We will keep the alerts table inside the modal or we can keep it as a clean collapsible log at the bottom.
    # Actually, keeping the alerts manager as a clean table but removing the redundant tune settings from it is better.
    # Let's replace the alerts head to remove the duplicate tune inputs:
    new_alerts_head = """    <!-- Alerts Manager Card -->
    <div class="alerts-card" id="alerts-card">
      <div class="alerts-head">
        <div class="t">Active Price Alerts</div>
      </div>"""
    
    html = html.replace(old_alerts_card, new_alerts_head + """
      <div class="alerts-table-wrapper">
        <table class="alerts-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Condition</th>
              <th>Level</th>
              <th>Message</th>
              <th>Created</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="alerts-table-body">
            <tr>
              <td colspan="7" style="text-align: center; color: var(--muted); padding: 16px;">Right-click on the chart to set an alert.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>""")

    # 8. Inject our updated JavaScript logic inside <script type="module">
    # Let's see: we want to insert our variables and modal functions right after `let activeCandleOpenTime = null;`
    js_vars = """
let liveActiveIndicators = ['volume', 'ema9', 'ema15'];
let scalperActiveIndicators = ['volume', 'ema9', 'ema15'];

const drawingsHistory = {
  live: { undoStack: [], redoStack: [], current: [] },
  scalper: { undoStack: [], redoStack: [], current: [] }
};

let isHistoryAction = false;
let currentAlertCondition = 'above';

const ALL_INDICATORS = [
  { id: 'volume', label: 'Volume', placement: 'pane' },
  { id: 'ema9', label: 'EMA 9', placement: 'overlay' },
  { id: 'ema15', label: 'EMA 15', placement: 'overlay' },
  { id: 'vwap', label: 'VWAP', placement: 'overlay' },
  { id: 'stochastic', label: 'Stochastic Oscillator', placement: 'pane' },
  { id: 'obv', label: 'On-Balance Volume', placement: 'pane' },
  { id: 'cvd', label: 'Cumulative Volume Delta', placement: 'pane' },
  { id: 'bollinger', label: 'Bollinger Bands', placement: 'overlay' },
  { id: 'rsi', label: 'Relative Strength Index', placement: 'pane' },
  { id: 'macd', label: 'MACD', placement: 'pane' }
];
"""
    html = html.replace('let activeCandleOpenTime = null;', 'let activeCandleOpenTime = null;\n' + js_vars)

    # Replace updateChartIndicators call references to use activeIndicators array
    html = html.replace("updateChartIndicators(liveChartEngine, liveCandles, 'live-indicator-toggles');", "updateChartIndicators(liveChartEngine, liveCandles, liveActiveIndicators);")
    html = html.replace("updateChartIndicators(scalperChartEngine, scalperCandles, 'scalper-indicator-toggles');", "updateChartIndicators(scalperChartEngine, scalperCandles, scalperActiveIndicators);")
    html = html.replace("updateChartIndicators(scalperChartEngine, scalperCandles, 'scalper-indicator-toggles')", "updateChartIndicators(scalperChartEngine, scalperCandles, scalperActiveIndicators)")
    html = html.replace("updateChartIndicators(liveChartEngine, liveCandles, 'live-indicator-toggles')", "updateChartIndicators(liveChartEngine, liveCandles, liveActiveIndicators)")

    # Inject the core functions before startup bootstrapping (e.g. before `loadAlerts();`)
    core_functions = """
// -------------------------------------------------------------
// CandlLabs UI Helper Functions
// -------------------------------------------------------------
function setTimeframe(tfVal) {
  $('tf').value = tfVal;
  document.querySelectorAll('.tf-btn').forEach(btn => {
    if (btn.getAttribute('data-tf') === tfVal) btn.classList.add('active');
    else btn.classList.remove('active');
  });
  $('tf').dispatchEvent(new Event('change'));
}
window.setTimeframe = setTimeframe;

function toggleModal(id, show) {
  const modal = $(id);
  if (modal) {
    if (show) {
      modal.classList.add('active');
      if (id === 'indicators-modal') renderIndicatorsModalList();
    } else {
      modal.classList.remove('active');
    }
  }
}
window.toggleModal = toggleModal;

// Close modals when clicking overlay background
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

// Theme Handling
function toggleTheme() {
  const isLight = document.body.classList.toggle('light-theme');
  const theme = isLight ? 'light' : 'dark';
  localStorage.setItem('greeks_theme', theme);
  $('global-theme-toggle').textContent = isLight ? '☀️' : '🌙';
  
  if (liveChartEngine) liveChartEngine.setTheme(theme);
  if (scalperChartEngine) scalperChartEngine.setTheme(theme);
}
window.toggleTheme = toggleTheme;

function applySavedTheme() {
  const savedTheme = localStorage.getItem('greeks_theme') || 'dark';
  const isLight = savedTheme === 'light';
  if (isLight) {
    document.body.classList.add('light-theme');
    $('global-theme-toggle').textContent = '☀️';
  } else {
    document.body.classList.remove('light-theme');
    $('global-theme-toggle').textContent = '🌙';
  }
}

// Chart Settings Handling
function loadChartSettings(engine) {
  if (!engine) return;
  const upColor = localStorage.getItem('greeks_up_color') || '#26a69a';
  const downColor = localStorage.getItem('greeks_down_color') || '#ef5350';
  const gridVisible = localStorage.getItem('greeks_grid') === 'true';
  const crosshairVisible = localStorage.getItem('greeks_crosshair') !== 'false';
  
  engine.setSettings({
    upColor: upColor,
    downColor: downColor,
    gridVisible: gridVisible,
    crosshairVisible: crosshairVisible
  });
  
  const magnetEnabled = localStorage.getItem('greeks_magnet') === 'true';
  engine.setMagnet(magnetEnabled);
}

function openSettingsModal() {
  const upColor = localStorage.getItem('greeks_up_color') || '#26a69a';
  const downColor = localStorage.getItem('greeks_down_color') || '#ef5350';
  const gridVisible = localStorage.getItem('greeks_grid') === 'true';
  const crosshairVisible = localStorage.getItem('greeks_crosshair') !== 'false';
  const alertSound = localStorage.getItem('greeks_sound') !== 'false';
  const magnetEnabled = localStorage.getItem('greeks_magnet') === 'true';
  
  $('settings-up-color').value = upColor;
  $('settings-up-hex').textContent = upColor.toUpperCase();
  $('settings-down-color').value = downColor;
  $('settings-down-hex').textContent = downColor.toUpperCase();
  
  $('settings-grid').checked = gridVisible;
  $('settings-crosshair').checked = crosshairVisible;
  $('settings-sound').checked = alertSound;
  $('settings-magnet').checked = magnetEnabled;
  
  toggleModal('settings-modal', true);
}
window.openSettingsModal = openSettingsModal;

function resetSettingsToDefault() {
  localStorage.setItem('greeks_up_color', '#26a69a');
  localStorage.setItem('greeks_down_color', '#ef5350');
  localStorage.setItem('greeks_grid', 'false');
  localStorage.setItem('greeks_crosshair', 'true');
  localStorage.setItem('greeks_sound', 'true');
  localStorage.setItem('greeks_magnet', 'false');
  
  if (liveChartEngine) loadChartSettings(liveChartEngine);
  if (scalperChartEngine) loadChartSettings(scalperChartEngine);
  
  openSettingsModal(); // Refresh view
}
window.resetSettingsToDefault = resetSettingsToDefault;

// Bind inputs on change
$('settings-up-color').addEventListener('input', (e) => {
  const val = e.target.value;
  $('settings-up-hex').textContent = val.toUpperCase();
  localStorage.setItem('greeks_up_color', val);
  if (liveChartEngine) loadChartSettings(liveChartEngine);
  if (scalperChartEngine) loadChartSettings(scalperChartEngine);
});
$('settings-down-color').addEventListener('input', (e) => {
  const val = e.target.value;
  $('settings-down-hex').textContent = val.toUpperCase();
  localStorage.setItem('greeks_down_color', val);
  if (liveChartEngine) loadChartSettings(liveChartEngine);
  if (scalperChartEngine) loadChartSettings(scalperChartEngine);
});
['settings-grid', 'settings-crosshair', 'settings-sound', 'settings-magnet'].forEach(id => {
  $(id).addEventListener('change', (e) => {
    const key = id.replace('settings-', 'greeks_');
    localStorage.setItem(key, e.target.checked ? 'true' : 'false');
    
    if (id === 'settings-magnet') {
      const enabled = e.target.checked;
      if (liveChartEngine) liveChartEngine.setMagnet(enabled);
      if (scalperChartEngine) scalperChartEngine.setMagnet(enabled);
      
      document.querySelectorAll('.tool-btn-magnet').forEach(btn => {
        if (enabled) btn.classList.add('active');
        else btn.classList.remove('active');
      });
    } else {
      if (liveChartEngine) loadChartSettings(liveChartEngine);
      if (scalperChartEngine) loadChartSettings(scalperChartEngine);
    }
  });
});

function toggleMagnetSnap() {
  const enabled = localStorage.getItem('greeks_magnet') !== 'true';
  localStorage.setItem('greeks_magnet', enabled ? 'true' : 'false');
  
  if (liveChartEngine) liveChartEngine.setMagnet(enabled);
  if (scalperChartEngine) scalperChartEngine.setMagnet(enabled);
  
  document.querySelectorAll('.tool-btn-magnet').forEach(btn => {
    if (enabled) btn.classList.add('active');
    else btn.classList.remove('active');
  });
}
window.toggleMagnetSnap = toggleMagnetSnap;

// Reset view on active tab
function resetActiveChartView() {
  const engine = activeTab === 'live-signal' ? liveChartEngine : scalperChartEngine;
  if (engine) engine.resetView();
}
window.resetActiveChartView = resetActiveChartView;

// Fullscreen Handling
function toggleFullscreen() {
  const elem = document.documentElement;
  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch(err => {
      console.error(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}
window.toggleFullscreen = toggleFullscreen;

// Indicators Modal Logic
function renderIndicatorsModalList() {
  const container = $('indicator-list-container');
  if (!container) return;
  
  const activeList = activeTab === 'live-signal' ? liveActiveIndicators : scalperActiveIndicators;
  const searchVal = ($('indicator-search')?.value || '').toLowerCase();
  
  const filtered = ALL_INDICATORS.filter(ind => ind.label.toLowerCase().includes(searchVal));
  
  container.innerHTML = filtered.map(ind => {
    const isChecked = activeList.includes(ind.id);
    return `
      <div class="indicator-item" onclick="toggleIndicatorInModal('${ind.id}')">
        <div class="indicator-item-left">
          <input type="checkbox" id="ind-chk-${ind.id}" ${isChecked ? 'checked' : ''} onclick="event.stopPropagation(); toggleIndicatorInModal('${ind.id}')">
          <span>${ind.label}</span>
        </div>
        <span class="indicator-badge">${ind.placement}</span>
      </div>
    `;
  }).join('');
  
  // Render ON CHART section
  const onChartContainer = $('active-indicators-list');
  if (onChartContainer) {
    if (activeList.length === 0) {
      onChartContainer.innerHTML = '<div style="color: var(--muted); font-style: italic;">No active indicators — add one from the library above.</div>';
    } else {
      onChartContainer.innerHTML = activeList.map(id => {
        const ind = ALL_INDICATORS.find(i => i.id === id);
        const label = ind ? ind.label : (id === 'ema9' ? 'EMA 9' : (id === 'ema15' ? 'EMA 15' : id));
        return `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 4px 8px; background: rgba(255, 255, 255, 0.03); border-radius: 4px; border: 1px solid var(--border);">
            <span>${label}</span>
            <span style="cursor: pointer; color: var(--down);" onclick="toggleIndicatorInModal('${id}')">✕</span>
          </div>
        `;
      }).join('');
    }
  }
}
window.renderIndicatorsModalList = renderIndicatorsModalList;

function filterIndicators() {
  renderIndicatorsModalList();
}
window.filterIndicators = filterIndicators;

function toggleIndicatorInModal(id) {
  const activeList = activeTab === 'live-signal' ? liveActiveIndicators : scalperActiveIndicators;
  const index = activeList.indexOf(id);
  if (index > -1) {
    activeList.splice(index, 1);
  } else {
    activeList.push(id);
  }
  
  const engine = activeTab === 'live-signal' ? liveChartEngine : scalperChartEngine;
  const candles = activeTab === 'live-signal' ? liveCandles : scalperCandles;
  if (engine) {
    updateChartIndicators(engine, candles, activeList);
  }
  
  localStorage.setItem(`greeks_active_indicators_${activeTab}`, JSON.stringify(activeList));
  renderIndicatorsModalList();
}
window.toggleIndicatorInModal = toggleIndicatorInModal;

// Drawings History Engine
function pushDrawingsState(tabId, drawings) {
  if (isHistoryAction) return;
  const history = drawingsHistory[tabId];
  const stateToPush = JSON.parse(JSON.stringify(drawings));
  if (JSON.stringify(history.current) === JSON.stringify(stateToPush)) return;
  
  history.undoStack.push(JSON.parse(JSON.stringify(history.current)));
  if (history.undoStack.length > 50) history.undoStack.shift();
  history.redoStack = [];
  history.current = stateToPush;
  updateUndoRedoButtonsState(tabId);
}

function undoDrawings(tabId) {
  const history = drawingsHistory[tabId];
  if (history.undoStack.length === 0) return;
  
  isHistoryAction = true;
  const previous = history.undoStack.pop();
  history.redoStack.push(JSON.parse(JSON.stringify(history.current)));
  history.current = previous;
  
  const engine = tabId === 'live' ? liveChartEngine : scalperChartEngine;
  if (engine) {
    engine.setDrawings(previous);
    localStorage.setItem(getDrawingsKey(tabId), JSON.stringify(previous));
  }
  updateUndoRedoButtonsState(tabId);
  isHistoryAction = false;
}
window.undoDrawings = undoDrawings;

function redoDrawings(tabId) {
  const history = drawingsHistory[tabId];
  if (history.redoStack.length === 0) return;
  
  isHistoryAction = true;
  const next = history.redoStack.pop();
  history.undoStack.push(JSON.parse(JSON.stringify(history.current)));
  history.current = next;
  
  const engine = tabId === 'live' ? liveChartEngine : scalperChartEngine;
  if (engine) {
    engine.setDrawings(next);
    localStorage.setItem(getDrawingsKey(tabId), JSON.stringify(next));
  }
  updateUndoRedoButtonsState(tabId);
  isHistoryAction = false;
}
window.redoDrawings = redoDrawings;

function updateUndoRedoButtonsState(tabId) {
  const history = drawingsHistory[tabId];
  const undoBtn = $(`${tabId}-undo-btn`);
  const redoBtn = $(`${tabId}-redo-btn`);
  if (undoBtn) undoBtn.style.opacity = history.undoStack.length > 0 ? '1' : '0.4';
  if (redoBtn) redoBtn.style.opacity = history.redoStack.length > 0 ? '1' : '0.4';
}

// Alerts Modal Handling
function openAlertsModal(priceValue) {
  const sym = $('symbol').value;
  $('alerts-modal-title').textContent = `Alerts ${sym}`;
  
  if (priceValue !== undefined && priceValue !== null) {
    $('alert-price-input').value = priceValue.toFixed(2);
    if (lastClosePrice !== null) {
      setAlertCondition(priceValue >= lastClosePrice ? 'above' : 'below');
    }
  } else {
    $('alert-price-input').value = lastClosePrice !== null ? lastClosePrice.toFixed(2) : '';
    setAlertCondition('above');
  }
  $('alert-note-input').value = '';
  
  $('alert-sound-active').checked = localStorage.getItem('greeks_sound') !== 'false';
  $('alert-tune-select-modal').value = localStorage.getItem('greeks_tune') || '0';
  $('alert-duration-modal').value = localStorage.getItem('greeks_dur') || '2';
  
  toggleModal('alerts-modal', true);
}
window.openAlertsModal = openAlertsModal;

function setAlertCondition(condition) {
  currentAlertCondition = condition;
  if (condition === 'above') {
    $('alert-tab-above').classList.add('active');
    $('alert-tab-below').classList.remove('active');
  } else {
    $('alert-tab-below').classList.add('active');
    $('alert-tab-above').classList.remove('active');
  }
}
window.setAlertCondition = setAlertCondition;

function previewAlertSound() {
  const tuneId = parseInt($('alert-tune-select-modal').value);
  const durSec = parseInt($('alert-duration-modal').value);
  playTune(tuneId, durSec);
}
window.previewAlertSound = previewAlertSound;

function submitAlertModal() {
  const price = parseFloat($('alert-price-input').value);
  if (isNaN(price)) {
    alert('Please enter a valid price.');
    return;
  }
  const sym = $('symbol').value;
  const msg = $('alert-note-input').value.trim() || 'Crossing level';
  
  const newAlert = {
    id: 'alert_' + Date.now(),
    symbol: sym,
    price: price,
    condition: currentAlertCondition,
    message: msg,
    createdAt: Date.now(),
    triggered: false
  };
  
  clientAlerts.push(newAlert);
  saveAlerts();
  renderAlertsTable();
  updateChartAlerts();
  
  localStorage.setItem('greeks_sound', $('alert-sound-active').checked ? 'true' : 'false');
  localStorage.setItem('greeks_tune', $('alert-tune-select-modal').value);
  localStorage.setItem('greeks_dur', $('alert-duration-modal').value);
  
  toggleModal('alerts-modal', false);
}
window.submitAlertModal = submitAlertModal;
"""
    html = html.replace('loadAlerts();', core_functions + '\n\n  applySavedTheme();\n  loadAlerts();')

    # Update initialization of active indicators in load and loadScalper
    html = html.replace("updateChartIndicators(liveChartEngine, liveCandles, 'live-indicator-toggles');", "updateChartIndicators(liveChartEngine, liveCandles, liveActiveIndicators);")
    html = html.replace("updateChartIndicators(scalperChartEngine, scalperCandles, 'scalper-indicator-toggles');", "updateChartIndicators(scalperChartEngine, scalperCandles, scalperActiveIndicators);")

    # In initLiveChart, update call loadChartSettings, set theme on build
    live_init_repl = """  liveChartEngine = createChartEngine(container, {
    theme: document.body.classList.contains('light-theme') ? 'light' : 'dark',
    pricePrecision: 2,
    chartType: 'candles',
    onActiveToolChange: (tool) => {
      const toolbar = $('live-drawing-toolbar');
      if (!toolbar) return;
      toolbar.querySelectorAll('button[data-tool]').forEach(b => {
        const btnTool = b.getAttribute('data-tool');
        if ((tool === null && btnTool === 'select') || btnTool === tool) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
    },
    onDrawingsChange: (drawings) => {
      localStorage.setItem(getDrawingsKey('live'), JSON.stringify(drawings));
      pushDrawingsState('live', drawings);
    },
    onContextMenu: (info) => {
      openAlertsModal(info.price);
    },"""
    
    html = re.sub(r'liveChartEngine\s*=\s*createChartEngine\(container,\s*\{[^}]*theme:\s*\'dark\',[^}]*onContextMenu:\s*\(info\)\s*=>\s*\{[^}]*\}', live_init_repl, html, flags=re.S)

    # In initScalperChart, update call loadChartSettings, set theme on build
    scalper_init_repl = """  scalperChartEngine = createChartEngine(container, {
    theme: document.body.classList.contains('light-theme') ? 'light' : 'dark',
    pricePrecision: 2,
    chartType: 'candles',
    onActiveToolChange: (tool) => {
      const toolbar = $('scalper-drawing-toolbar');
      if (!toolbar) return;
      toolbar.querySelectorAll('button[data-tool]').forEach(b => {
        const btnTool = b.getAttribute('data-tool');
        if ((tool === null && btnTool === 'select') || btnTool === tool) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
    },
    onDrawingsChange: (drawings) => {
      localStorage.setItem(getDrawingsKey('scalper'), JSON.stringify(drawings));
      pushDrawingsState('scalper', drawings);
    }
  });"""
  
    html = re.sub(r'scalperChartEngine\s*=\s*createChartEngine\(container,\s*\{[^}]*theme:\s*\'light\',[^}]*onDrawingsChange:\s*\(drawings\)\s*=>\s*\{[^}]*\}[\s\n]*\}\);', scalper_init_repl, html, flags=re.S)

    # Inject settings loading into engine initializations
    html = html.replace("setupDrawingsStorage(liveChartEngine, 'live');", "setupDrawingsStorage(liveChartEngine, 'live');\n    loadChartSettings(liveChartEngine);")
    html = html.replace("setupDrawingsStorage(scalperChartEngine, 'scalper');", "setupDrawingsStorage(scalperChartEngine, 'scalper');\n    loadChartSettings(scalperChartEngine);")

    # Update checkAlerts tune & duration parameters
    html = html.replace("const soundOn = $('alert-sound-toggle').checked;\n    const tuneId = parseInt($('alert-tune-select').value);\n    const durSec = parseInt($('alert-dur-select').value);", 
                        "const soundOn = localStorage.getItem('greeks_sound') !== 'false';\n    const tuneId = parseInt(localStorage.getItem('greeks_tune') || '0');\n    const durSec = parseInt(localStorage.getItem('greeks_dur') || '2');")

    # Add load settings to loadDrawings call
    old_load_drawings = """function loadDrawings(engine, tabId) {
  const key = getDrawingsKey(tabId);
  const saved = localStorage.getItem(key);
  if (saved && engine) {
    try {
      engine.setDrawings(JSON.parse(saved));
    } catch (e) {
      console.error("Error loading drawings:", e);
      engine.clearDrawings();
    }
  } else if (engine) {
    engine.clearDrawings();
  }
}"""

    new_load_drawings = """function loadDrawings(engine, tabId) {
  const key = getDrawingsKey(tabId);
  const saved = localStorage.getItem(key);
  let drawingsList = [];
  if (saved && engine) {
    try {
      drawingsList = JSON.parse(saved);
      engine.setDrawings(drawingsList);
    } catch (e) {
      console.error("Error loading drawings:", e);
      engine.clearDrawings();
    }
  } else if (engine) {
    engine.clearDrawings();
  }
  drawingsHistory[tabId].current = drawingsList;
  drawingsHistory[tabId].undoStack = [];
  drawingsHistory[tabId].redoStack = [];
  updateUndoRedoButtonsState(tabId);
  loadChartSettings(engine);
}"""
    html = html.replace(old_load_drawings, new_load_drawings)

    # 9. Load indicators on start
    indicator_bootstrap = """
  // Load active indicators from localStorage
  const savedLiveInds = localStorage.getItem('greeks_active_indicators_live-signal');
  if (savedLiveInds) {
    liveActiveIndicators = JSON.parse(savedLiveInds);
  }
  const savedScalperInds = localStorage.getItem('greeks_active_indicators_scalper');
  if (savedScalperInds) {
    scalperActiveIndicators = JSON.parse(savedScalperInds);
  }
"""
    html = html.replace('loadAlerts();', indicator_bootstrap + '\n  loadAlerts();')

    # Save output
    with open('templates/dashboard.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Dashboard refactoring completed successfully!")

if __name__ == '__main__':
    main()
