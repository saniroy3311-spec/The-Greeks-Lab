import re
import os

def main():
    print("Starting GreeksLab Redesign compilation...")
    
    file_path = 'templates/dashboard.html'
    if not os.path.exists(file_path):
        print("Error: templates/dashboard.html not found.")
        return
        
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()
        
    # --- 1. REPLACE THE ENTIRE STYLE BLOCK ---
    style_start = html.find('<style>')
    style_end = html.find('</style>')
    if style_start == -1 or style_end == -1:
        print("Error: Could not locate <style> tags.")
        return
        
    new_style = """<style>
  :root {
    --bg: #F5F6F8;
    --chart-bg: #FFFFFF;
    --surface: #FFFFFF;
    --border: #E0E3EB;
    --text: #111827;
    --muted: #9CA3AF;
    --up: #26a69a;
    --down: #ef5350;
    --flat: #70757a;
    --pred: #ef9f27;
    --blue: #2962FF;
    --shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    --card-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  body.dark-theme {
    --bg: #0b1220;
    --chart-bg: #131a2e;
    --surface: #131a2e;
    --border: #22293f;
    --text: #ffffff;
    --muted: #848e9c;
    --up: #26a69a;
    --down: #ef5350;
    --flat: #848e9c;
    --pred: #ef9f27;
    --blue: #2962FF;
    --shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background: var(--bg);
    color: var(--text);
    margin: 0;
    padding: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  /* Google fonts pre-imports will be loaded in head */

  /* Tabular numbers formatting */
  .tnum, td, .stat .v, .sig-dir, .sig-sub span, .echoes-stat .val, 
  #countdown-overlay-live, #countdown-overlay-scalper, .overlay-stat .v {
    font-family: 'JetBrains Mono', monospace;
    font-feature-settings: "tnum", "kern";
  }

  /* Top Navigation Bar */
  .candl-topbar {
    height: 52px;
    display: flex;
    align-items: center;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 0 16px;
    gap: 12px;
    font-size: 13px;
    z-index: 100;
    flex-shrink: 0;
  }
  .divider {
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
  .logo-icon {
    font-size: 16px;
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
    overflow-x: auto;
    scrollbar-width: none;
  }
  .timeframe-buttons::-webkit-scrollbar {
    display: none;
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
    background: rgba(0, 0, 0, 0.05);
  }
  body.dark-theme .tf-btn:hover {
    background: rgba(255, 255, 255, 0.05);
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
    background: rgba(0, 0, 0, 0.05);
  }
  body.dark-theme .top-btn:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  .top-btn-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--text);
    padding: 6px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .top-btn-icon:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  body.dark-theme .top-btn-icon:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  .right-section {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .live-status-indicator {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: var(--muted);
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
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }

  /* Tab Container (Underline-only active styling) */
  .tab-container {
    display: flex;
    gap: 24px;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 0 16px;
    height: 40px;
    align-items: stretch;
    flex-shrink: 0;
  }
  .tab-btn {
    background: transparent;
    border: none;
    color: var(--muted);
    padding: 0 4px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
  }
  .tab-btn:hover {
    color: var(--text);
  }
  .tab-btn.active {
    color: var(--blue);
    border-bottom-color: var(--blue);
  }
  .tab-content {
    display: none;
    flex: 1;
    position: relative;
    overflow: hidden;
  }
  .tab-content.active {
    display: flex;
    flex-direction: column;
  }

  /* Workspace layout & Viewport wrappers */
  .chart-card, .scalper-chart-card {
    background: var(--chart-bg);
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .chart-head, .scalper-chart-head {
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    border-bottom: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    flex-shrink: 0;
  }
  .chart-head .t, .scalper-chart-head .t {
    font-size: 12px;
    font-weight: 600;
  }
  .legend, .scalper-legend {
    display: flex;
    gap: 12px;
    font-size: 11px;
    color: var(--muted);
  }
  .swatch, .scalper-swatch {
    display: inline-block;
    width: 10px;
    height: 3px;
    vertical-align: middle;
    margin-right: 4px;
    border-radius: 1px;
  }
  .chart-viewport-wrapper {
    position: relative;
    flex: 1;
    width: 100%;
    overflow: hidden;
  }
  #chart, #tv-chart {
    width: 100%;
    height: 100%;
  }

  /* Side Drawing Toolbar */
  .drawing-toolbar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 36px;
    z-index: 20;
    display: flex;
    flex-direction: column;
    gap: 2px;
    background: var(--surface);
    border-right: 1px solid var(--border);
    padding: 6px 0;
    box-shadow: 2px 0 6px rgba(0, 0, 0, 0.02);
  }
  body.dark-theme .drawing-toolbar {
    box-shadow: 2px 0 6px rgba(0, 0, 0, 0.2);
  }
  .drawing-toolbar button {
    width: 36px;
    height: 32px;
    background: transparent;
    border: none;
    color: var(--text);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
    opacity: 0.8;
  }
  .drawing-toolbar button svg {
    width: 16px;
    height: 16px;
  }
  .drawing-toolbar button:hover {
    background: rgba(0, 0, 0, 0.05);
    opacity: 1;
  }
  body.dark-theme .drawing-toolbar button:hover {
    background: rgba(255, 255, 255, 0.08);
  }
  .drawing-toolbar button.active {
    background: var(--blue);
    color: #ffffff !important;
    opacity: 1;
  }
  .drawing-toolbar button.active svg {
    stroke: #ffffff;
  }

  /* Floating Overlay cards (Bloomberg/TradingView HUD Style) */
  .chart-overlays-container {
    position: absolute;
    top: 12px;
    left: 48px;
    z-index: 15;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 320px;
    max-height: calc(100% - 24px);
    overflow-y: auto;
    pointer-events: none;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    scrollbar-width: none;
  }
  .chart-overlays-container::-webkit-scrollbar {
    display: none;
  }
  .chart-overlays-container.collapsed {
    transform: translateX(-332px);
  }
  .chart-overlays-container * {
    pointer-events: auto;
  }
  
  /* Collapse Toggle Tab on overlays */
  .overlays-collapse-btn {
    position: absolute;
    right: -24px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 38px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-left: none;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 2px 0 8px rgba(0,0,0,0.05);
    color: var(--muted);
    transition: color 0.2s;
    z-index: 5;
  }
  .overlays-collapse-btn:hover {
    color: var(--text);
  }
  .chart-overlays-container.collapsed .overlays-collapse-btn svg {
    transform: rotate(180deg);
  }
  .overlays-collapse-btn svg {
    width: 14px;
    height: 14px;
    transition: transform 0.3s;
  }

  .overlay-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 14px;
    box-shadow: var(--card-shadow);
  }
  body.dark-theme .overlay-card {
    background: rgba(19, 26, 46, 0.95);
  }
  .overlay-card-header {
    border-bottom: 1px solid var(--border);
    padding-bottom: 6px;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .card-title {
    font-size: 10px;
    font-weight: 700;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Signal Panel Overlay */
  .signal {
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-left: 4px solid var(--flat);
  }
  .signal.up { border-left-color: var(--up); }
  .signal.down { border-left-color: var(--down); }
  .signal.flat { border-left-color: var(--flat); }
  
  .sig-flex-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .sig-label {
    font-size: 9px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: .5px;
    margin-bottom: 2px;
  }
  .sig-dir {
    font-size: 26px;
    font-weight: 700;
    line-height: 1.1;
  }
  .signal.up .sig-dir { color: var(--up); }
  .signal.down .sig-dir { color: var(--down); }
  .signal.flat .sig-dir { color: var(--flat); }
  
  .sig-sub {
    font-size: 12px;
    color: var(--muted);
    margin-top: 4px;
  }
  .sig-action {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.1;
  }

  /* Echoes Panel Overlay */
  .echoes-card {
    border-left: 4px solid var(--flat);
  }
  .echoes-card.bullish { border-left-color: var(--up); }
  .echoes-card.bearish { border-left-color: var(--down); }
  .echoes-card.neutral { border-left-color: var(--flat); }

  .echoes-status {
    font-size: 18px;
    font-weight: 700;
    line-height: 1.1;
  }
  .echoes-card.bullish .echoes-status { color: var(--up); }
  .echoes-card.bearish .echoes-status { color: var(--down); }
  
  .echoes-stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
    font-size: 11px;
    color: var(--muted);
    margin-top: 8px;
  }
  .echoes-stat {
    display: flex;
    flex-direction: column;
  }
  .echoes-stat .val {
    font-weight: 600;
    color: var(--text);
  }
  .echoes-stat .val.text-up { color: var(--up); }
  .echoes-stat .val.text-down { color: var(--down); }
  
  .echoes-sparkline-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-top: 8px;
    border-top: 1px solid var(--border);
    padding-top: 8px;
  }
  #echoes-sparkline {
    background: rgba(0, 0, 0, 0.03);
    border-radius: 4px;
    border: 1px solid var(--border);
  }
  body.dark-theme #echoes-sparkline {
    background: rgba(0, 0, 0, 0.25);
  }
  .sparkline-label {
    font-size: 9px;
    color: var(--muted);
    text-align: right;
    line-height: 1.2;
  }

  /* Stats Overlay */
  .stats-card .overlay-card-body {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
  .overlay-stat {
    display: flex;
    flex-direction: column;
  }
  .overlay-stat .k {
    font-size: 9px;
    color: var(--muted);
    text-transform: uppercase;
  }
  .overlay-stat .v {
    font-size: 13px;
    font-weight: 600;
  }

  /* Scalper Overlay state badges */
  .state-badges-card .overlay-card-body {
    padding-top: 4px;
  }
  .scalper-badges-panel {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .scalper-badge {
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 600;
    color: var(--muted);
    background: transparent;
    border: 1px solid var(--border);
    transition: all 0.2s ease;
    opacity: 0.5;
  }
  .scalper-badge.active {
    opacity: 1;
  }
  #badge-awaiting.active { color: #fff; background: #475569; border-color: #475569; }
  #badge-long-trig.active { color: #fff; background: #eab308; border-color: #eab308; }
  #badge-short-trig.active { color: #fff; background: #f97316; border-color: #f97316; }
  #badge-pos-long.active { color: #fff; background: #10b981; border-color: #10b981; }
  #badge-pos-short.active { color: #fff; background: #ef4444; border-color: #ef4444; }

  .scalper-trade-info-card {
    border-left: 4px solid var(--blue);
  }
  #scalper-info-text {
    font-size: 11px;
    line-height: 1.3;
  }

  /* Indicator Toggles Inline Row */
  .indicator-toggles.inline-row {
    display: flex;
    gap: 8px;
    font-size: 11px;
    align-items: center;
  }
  .indicator-toggles.inline-row label {
    display: flex;
    align-items: center;
    gap: 2px;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.03);
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid var(--border);
    transition: all 0.2s;
    user-select: none;
  }
  body.dark-theme .indicator-toggles.inline-row label {
    background: rgba(255, 255, 255, 0.03);
  }
  .indicator-toggles.inline-row label:hover {
    background: rgba(0, 0, 0, 0.06);
  }
  body.dark-theme .indicator-toggles.inline-row label:hover {
    background: rgba(255, 255, 255, 0.06);
  }
  .indicator-toggles.inline-row input[type="checkbox"] {
    accent-color: var(--blue);
    cursor: pointer;
  }

  /* Below-Chart Tables styling */
  .alerts-card, .scalper-logs-card {
    background: var(--surface);
    display: flex;
    flex-direction: column;
  }
  .alerts-head, .scalper-logs-head {
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }
  .alerts-head .t, .scalper-logs-head .t {
    font-size: 12px;
    font-weight: 600;
  }
  .alerts-table-wrapper, .scalper-table-wrapper {
    flex: 1;
    overflow-y: auto;
  }
  .alerts-table, .scalper-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
    text-align: left;
  }
  .alerts-table th, .scalper-table th {
    color: var(--muted);
    font-weight: 600;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 8px 12px;
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    background: var(--surface);
    z-index: 5;
  }
  .alerts-table td, .scalper-table td {
    padding: 8px 12px;
    border-bottom: 1px solid var(--border);
  }
  .alerts-table tr:nth-child(even), .scalper-table tr:nth-child(even) {
    background: rgba(0, 0, 0, 0.015);
  }
  body.dark-theme .alerts-table tr:nth-child(even),
  body.dark-theme .scalper-table tr:nth-child(even) {
    background: rgba(255, 255, 255, 0.015);
  }
  .alerts-table tr:hover, .scalper-table tr:hover {
    background: rgba(41, 98, 255, 0.04) !important;
  }
  .alerts-table tr:last-child td, .scalper-table tr:last-child td {
    border-bottom: none;
  }

  /* Table styling components */
  .tr-long {
    color: var(--up) !important;
    font-weight: 700;
  }
  .tr-short {
    color: var(--down) !important;
    font-weight: 700;
  }
  .badge-result {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
  }
  .badge-profit {
    background: rgba(38, 166, 154, 0.12);
    color: var(--up) !important;
  }
  .badge-loss {
    background: rgba(239, 83, 80, 0.12);
    color: var(--down) !important;
  }
  
  .alert-badge {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
  }
  .alert-badge.active {
    background: rgba(41, 98, 255, 0.12);
    color: var(--blue) !important;
  }
  .alert-badge.triggered {
    background: rgba(112, 117, 122, 0.12);
    color: var(--muted) !important;
  }
  .delete-alert-btn {
    background: transparent;
    border: none;
    color: var(--down);
    cursor: pointer;
    font-size: 12px;
    transition: transform 0.2s;
  }
  .delete-alert-btn:hover {
    transform: scale(1.2);
  }

  /* Slide-Down Indicators Panel */
  .indicators-dropdown-panel {
    position: absolute;
    top: 52px;
    right: 16px;
    width: 320px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    box-shadow: var(--shadow);
    z-index: 1000;
    padding: 16px;
    display: none;
    max-height: 80vh;
    overflow-y: auto;
    animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .indicators-dropdown-panel.active {
    display: block;
  }
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Modals Overlay */
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
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
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
    background: rgba(0, 0, 0, 0.03);
  }
  body.dark-theme .indicator-item:hover {
    background: rgba(255, 255, 255, 0.04);
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
    background: rgba(0, 0, 0, 0.04);
    color: var(--muted);
    border: 1px solid var(--border);
  }
  body.dark-theme .indicator-badge {
    background: rgba(255, 255, 255, 0.06);
  }
  
  /* Settings section */
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
    background-color: rgba(0, 0, 0, 0.05);
    transition: .3s;
    border: 1px solid var(--border);
  }
  body.dark-theme .slider {
    background-color: rgba(255, 255, 255, 0.1);
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
    background: rgba(0, 0, 0, 0.04);
    color: var(--text);
    border: 1px solid var(--border);
  }
  body.dark-theme .btn-secondary {
    background: rgba(255, 255, 255, 0.06);
  }
  .btn-secondary:hover {
    background: rgba(0, 0, 0, 0.08);
  }
  body.dark-theme .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  .btn-full {
    width: 100%;
    margin-top: 10px;
  }

  .footer {
    height: 22px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 10px;
    color: var(--muted);
    padding: 0 16px;
    border-top: 1px solid var(--border);
    background: var(--surface);
    flex-shrink: 0;
  }
  .err {
    background: rgba(239, 83, 80, 0.15);
    border: 1px solid var(--down);
    color: var(--down);
    padding: 10px 14px;
    font-size: 13px;
    z-index: 10;
    flex-shrink: 0;
    display: none;
  }

  #countdown-overlay-live, #countdown-overlay-scalper {
    position: absolute;
    right: 16px;
    top: 8px;
    z-index: 10;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid var(--border);
    color: var(--text);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: bold;
    pointer-events: none;
    box-shadow: var(--shadow);
    display: none;
  }
  body.dark-theme #countdown-overlay-live,
  body.dark-theme #countdown-overlay-scalper {
    background: rgba(19, 26, 46, 0.9);
  }

  /* View Mode Height Calculations */
  body.view-fullscreen .tab-content {
    display: none;
    height: calc(100vh - 92px);
    overflow: hidden;
  }
  body.view-fullscreen .tab-content.active {
    display: flex;
    flex-direction: column;
  }
  body.view-fullscreen .chart-card,
  body.view-fullscreen .scalper-chart-card {
    flex: 1;
    height: 100%;
    border-radius: 0;
    border: none;
    padding: 0;
    display: flex;
    flex-direction: column;
  }
  body.view-fullscreen .chart-viewport-wrapper {
    flex: 1;
    height: 100% !important;
  }
  body.view-fullscreen .alerts-card,
  body.view-fullscreen .scalper-logs-card {
    display: none !important;
  }

  body.view-split .tab-content {
    display: none;
    height: calc(100vh - 92px);
    overflow: hidden;
  }
  body.view-split .tab-content.active {
    display: flex;
    flex-direction: column;
  }
  body.view-split .chart-card,
  body.view-split .scalper-chart-card {
    height: 60vh;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid var(--border);
    padding: 0;
    display: flex;
    flex-direction: column;
  }
  body.view-split .chart-viewport-wrapper {
    flex: 1;
  }
  body.view-split .alerts-card,
  body.view-split .scalper-logs-card {
    height: calc(40vh - 92px);
    margin-top: 0;
    border-radius: 0;
    border: none;
    overflow-y: auto;
    background: var(--bg);
  }

  body.view-compact .tab-content {
    display: none;
    height: calc(100vh - 92px);
    overflow: hidden;
  }
  body.view-compact .tab-content.active {
    display: flex;
    flex-direction: column;
  }
  body.view-compact .chart-card,
  body.view-compact .scalper-chart-card {
    height: 45vh;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid var(--border);
    padding: 0;
    display: flex;
    flex-direction: column;
  }
  body.view-compact .chart-viewport-wrapper {
    flex: 1;
  }
  body.view-compact .alerts-card,
  body.view-compact .scalper-logs-card {
    height: calc(55vh - 92px);
    margin-top: 0;
    border-radius: 0;
    border: none;
    overflow-y: auto;
    background: var(--bg);
  }

  .view-mode-buttons {
    display: flex;
    gap: 4px;
    background: rgba(0, 0, 0, 0.03);
    padding: 2px;
    border-radius: 6px;
    border: 1px solid var(--border);
  }
  body.dark-theme .view-mode-buttons {
    background: rgba(255, 255, 255, 0.03);
  }
  .view-mode-btn {
    background: transparent;
    border: none;
    color: var(--muted);
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    transition: all 0.15s;
  }
  .view-mode-btn:hover {
    color: var(--text);
  }
  .view-mode-btn.active {
    background: var(--surface);
    color: var(--text);
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }
  body.dark-theme .view-mode-btn.active {
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  }

  /* Mobile HUD strip & bottom sheet drawer */
  .mobile-hud-strip {
    display: none;
  }
  .mobile-bottom-sheet {
    display: none;
  }

  @media (max-width: 768px) {
    body {
      overflow: auto;
      height: auto;
    }
    .candl-topbar {
      flex-direction: column;
      height: auto;
      padding: 8px 12px;
      gap: 8px;
      align-items: stretch;
    }
    .right-section {
      margin-left: 0;
      justify-content: space-between;
      width: 100%;
    }
    .timeframe-buttons {
      width: 100%;
      justify-content: flex-start;
      padding-bottom: 4px;
    }
    .tab-content {
      height: auto !important;
      overflow: visible !important;
    }
    body.view-fullscreen .tab-content,
    body.view-split .tab-content,
    body.view-compact .tab-content {
      height: auto !important;
    }
    .chart-card, .scalper-chart-card {
      height: 400px !important;
      border-bottom: 1px solid var(--border);
    }
    .alerts-card, .scalper-logs-card {
      height: auto !important;
      display: block !important;
      margin-top: 12px;
    }
    .mobile-hud-strip {
      display: flex;
      position: absolute;
      bottom: 8px;
      left: 8px;
      right: 8px;
      height: 44px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      z-index: 100;
      align-items: center;
      justify-content: space-between;
      padding: 0 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      cursor: pointer;
    }
    body.dark-theme .mobile-hud-strip {
      background: rgba(19, 26, 46, 0.95);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    .hud-item {
      display: flex;
      flex-direction: column;
      font-size: 10px;
    }
    .hud-item .lbl {
      color: var(--muted);
      font-size: 8px;
      text-transform: uppercase;
    }
    .hud-item .val {
      font-weight: 700;
      color: var(--text);
    }
    .mobile-bottom-sheet {
      display: flex;
      flex-direction: column;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--surface);
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
      border-top: 1px solid var(--border);
      box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.15);
      z-index: 2000;
      max-height: 80vh;
      transform: translateY(100%);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .mobile-bottom-sheet.active {
      transform: translateY(0);
    }
    .sheet-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-bottom: 1px solid var(--border);
      position: relative;
    }
    .drag-handle {
      position: absolute;
      top: 6px;
      left: 50%;
      transform: translateX(-50%);
      width: 36px;
      height: 4px;
      background: var(--border);
      border-radius: 2px;
    }
    .sheet-title {
      font-weight: 600;
      font-size: 14px;
    }
    .sheet-close-btn {
      background: transparent;
      border: none;
      color: var(--muted);
      font-size: 16px;
      cursor: pointer;
    }
    .sheet-body {
      padding: 16px;
      overflow-y: auto;
      flex: 1;
    }
    .mobile-sheet-content-wrapper {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .mobile-sheet-content-wrapper .overlay-card {
      width: 100% !important;
      position: static !important;
      box-shadow: none !important;
      opacity: 1 !important;
      border: 1px solid var(--border) !important;
      background: var(--surface) !important;
    }
  }
</style>"""

    html = html[:style_start] + new_style + html[style_end + len('</style>'):]

    # --- 1.1 ADD GOOGLE FONTS LINK ---
    head_start = html.find('<head>')
    if head_start != -1:
        font_link = """\n<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">"""
        html = html[:head_start + len('<head>')] + font_link + html[head_start + len('<head>'):]

    # --- 2. REPLACE THE MODALS AND TOPBAR PORTION ---
    # Find the start of Modals Overlay Library
    modals_start = html.find('<!-- Modals Overlay Library -->')
    # Find the end of topbar (which ends before <div class="err")
    topbar_end = html.find('<div class="err" id="err"></div>')
    
    if modals_start == -1 or topbar_end == -1:
        print("Error: Could not locate modals library or topbar block.")
        return
        
    new_modals_and_topbar = """<!-- Modals Overlay Library -->
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

  <div class="candl-topbar">
    <div class="logo-section">
      <span class="logo-icon" style="color: #2962FF; font-weight: 800; font-size: 18px; margin-right: 4px;">Δ</span>
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
    <button class="top-btn" id="indicators-toggle-btn" onclick="toggleIndicatorsDropdown(event)"><span class="icon">📊</span> Indicators</button>
    <button class="top-btn" onclick="openSettingsModal()"><span class="icon">⚙️</span> Settings</button>
    <button class="top-btn" onclick="openAlertsModal()"><span class="icon">🔔</span> Alerts</button>
    
    <div class="right-section">
      <div class="view-mode-buttons">
        <button class="view-mode-btn active" data-mode="split" onclick="setViewMode('split')">Split</button>
        <button class="view-mode-btn" data-mode="fullscreen" onclick="setViewMode('fullscreen')">Full</button>
        <button class="view-mode-btn" data-mode="compact" onclick="setViewMode('compact')">Compact</button>
      </div>
      <div class="divider"></div>
      <button class="top-btn-icon" onclick="resetActiveChartView()" title="Reset View">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M16 3h5v5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M8 21H3v-5"></path></svg>
      </button>
      <button class="top-btn-icon" onclick="toggleFullscreen()" title="Toggle Fullscreen">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M8 3H5a2 2 0 0 0-2 2v3m18-5h-3a2 2 0 0 0-2 2v3m-8 13H5a2 2 0 0 1-2-2v-3m18 5h-3a2 2 0 0 1-2-2v-3"></path></svg>
      </button>
      <button class="top-btn-icon" id="global-theme-toggle" onclick="toggleTheme()" title="Toggle Theme">🌙</button>
      <div class="live-status-indicator">
        <span class="dot active" id="dot"></span>
        <span id="status">Loading…</span>
      </div>
    </div>
  </div>

  <!-- Slide-Down Indicators Panel -->
  <div class="indicators-dropdown-panel" id="indicators-dropdown">
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

  """
  
    html = html[:modals_start] + new_modals_and_topbar + html[topbar_end:]

    # --- 3. REPLACE TAB 1 CONTENT ---
    tab1_start = html.find('<!-- Tab 1: Live Forecast (Existing Content) -->')
    tab2_start = html.find('<!-- Tab 2: EMA/Kronos Scalper -->')
    
    if tab1_start == -1 or tab2_start == -1:
        print("Error: Could not locate Tab 1 markers.")
        return
        
    new_tab1 = """<!-- Tab 1: Live Forecast (Existing Content) -->
  <div id="tab-live-signal" class="tab-content active">
    <div class="chart-card">
      <div class="chart-head">
        <div class="t">Oracle Probability Cone + AI Forecasts</div>
        <div class="legend">
          <span><span class="swatch" style="background:var(--up)"></span>Actual candles</span>
          <span><span class="swatch" style="background:var(--pred)"></span>AI prediction</span>
          <span><span class="swatch" style="background:#2962FF"></span>Oracle median</span>
        </div>
      </div>
      
      <div class="chart-viewport-wrapper">
        <!-- Side Drawing Toolbar with SVGs -->
        <div class="drawing-toolbar" id="live-drawing-toolbar">
          <button class="tool-btn active" data-tool="select" title="Cursor (Select)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/></svg>
          </button>
          <button class="tool-btn" data-tool="trendline" title="Trend Line">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><circle cx="18" cy="6" r="2" fill="currentColor"/><circle cx="6" cy="18" r="2" fill="currentColor"/></svg>
          </button>
          <button class="tool-btn" data-tool="fib" title="Fibonacci Levels">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="10" x2="20" y2="10"/><line x1="4" y1="14" x2="20" y2="14"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
          </button>
          <button class="tool-btn" data-tool="elliottimpulse" title="Elliott Impulse Wave">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20l3-14 4 10 5-12 4 10 2-3"/></svg>
          </button>
          <button class="tool-btn" data-tool="elliottcorrection" title="Elliott Correction Wave">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6l6 12 6-8 6 8"/></svg>
          </button>
          <button class="tool-btn" data-tool="brush" title="Freehand Brush">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4Z"/></svg>
          </button>
          <button class="tool-btn" data-tool="rect" title="Rectangle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
          </button>
          <button class="tool-btn" data-tool="longpos" title="Long Position">
            <svg viewBox="0 0 24 24" fill="none" stroke="#26a69a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3" fill="#26a69a"/></svg>
          </button>
          <button class="tool-btn" data-tool="shortpos" title="Short Position">
            <svg viewBox="0 0 24 24" fill="none" stroke="#ef5350" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3" fill="#ef5350"/></svg>
          </button>
          <button class="tool-btn tool-btn-magnet" id="live-magnet-btn" onclick="toggleMagnetSnap()" title="Magnet Snap (Snap to OHLC)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 11V6a5 5 0 00-10 0v5"/><path d="M7 11H5v3a4 4 0 008 0v-3h-2"/><path d="M15 11h-2v3a4 4 0 008 0v-3h-2"/></svg>
          </button>
          <button class="tool-btn" id="live-undo-btn" onclick="undoDrawings('live')" title="Undo (Ctrl+Z)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"/></svg>
          </button>
          <button class="tool-btn" id="live-redo-btn" onclick="redoDrawings('live')" title="Redo (Ctrl+Y)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 019-9 9 9 0 016 2.3l3 2.7"/></svg>
          </button>
          <button class="tool-btn" id="live-clear-drawings" title="Clear Drawings">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
          </button>
        </div>
        
        <!-- Floating Overlays Container -->
        <div class="chart-overlays-container" id="live-overlays">
          <button class="overlays-collapse-btn" onclick="toggleOverlaysCollapse()" title="Collapse Overlays">
            <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          <!-- Kronos Signal Card -->
          <div class="overlay-card signal flat" id="sig">
            <div class="overlay-card-header">
              <span class="card-title">KRONOS FORECAST</span>
            </div>
            <div class="sig-flex-row">
              <div>
                <div class="sig-label">Direction</div>
                <div class="sig-dir" id="dir">—</div>
                <div class="sig-sub">Conf: <span id="conf">—</span></div>
              </div>
              <div class="right">
                <div class="sig-label">Action</div>
                <div class="sig-action" id="act">—</div>
                <div class="sig-sub" id="bias">—</div>
              </div>
            </div>
          </div>
          
          <!-- Echoes Confirmation Card -->
          <div class="overlay-card echoes-card flat" id="echoes-card">
            <div class="overlay-card-header">
              <span class="card-title">ECHOES CONFIRMATION</span>
            </div>
            <div>
              <div class="sig-label">Echoes Status</div>
              <div class="echoes-status" id="echoes-status">Scanning…</div>
            </div>
            <div class="echoes-stats-row">
              <div class="echoes-stat"><span class="lbl">Median</span> <span id="echoes-median" class="val">—</span></div>
              <div class="echoes-stat"><span class="lbl">Best</span> <span id="echoes-best" class="val text-up">—</span></div>
              <div class="echoes-stat"><span class="lbl">Worst</span> <span id="echoes-worst" class="val text-down">—</span></div>
            </div>
            <div class="echoes-sparkline-container">
              <canvas id="echoes-sparkline" width="160" height="35"></canvas>
              <div class="sparkline-label">Query &<br>matches</div>
            </div>
          </div>
          
          <!-- Forecast Metrics Card -->
          <div class="overlay-card stats-card" id="stats-card">
            <div class="overlay-card-header">
              <span class="card-title">FORECAST METRICS</span>
            </div>
            <div class="overlay-card-body">
              <div class="overlay-stat"><span class="k">Current</span><span class="v" id="s-cur">—</span></div>
              <div class="overlay-stat"><span class="k">Predicted (5b)</span><span class="v" id="s-p5">—</span></div>
              <div class="overlay-stat"><span class="k">Predicted (end)</span><span class="v" id="s-pn">—</span></div>
              <div class="overlay-stat"><span class="k">Expected move</span><span class="v" id="s-mv">—</span></div>
            </div>
          </div>
        </div>

        <!-- Live Chart Canvas -->
        <div id="chart"></div>
        
        <div id="countdown-overlay-live">00:00</div>
      </div>
    </div>

    <!-- Price Alerts Manager Card -->
    <div class="alerts-card" id="alerts-card">
      <div class="alerts-head">
        <div class="t">Active Price Alerts</div>
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
    </div>
  </div>
  """
  
    html = html[:tab1_start] + new_tab1 + html[tab2_start:]

    # --- 4. REPLACE TAB 2 CONTENT ---
    # Refresh index because length changed
    tab2_start = html.find('<!-- Tab 2: EMA/Kronos Scalper -->')
    footer_start = html.find('  <div class="footer">')
    
    if tab2_start == -1 or footer_start == -1:
        print("Error: Could not locate Tab 2 markers.")
        return
        
    new_tab2 = """<!-- Tab 2: EMA/Kronos Scalper -->
  <div id="tab-scalper" class="tab-content">
    <div class="scalper-chart-card">
      <div class="scalper-chart-head">
        <div class="t">9/15 EMA Scalper</div>
        <div class="indicator-toggles inline-row" id="scalper-indicator-toggles">
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
        </div>
        <div class="scalper-legend">
          <span><span class="scalper-swatch" style="background:#26a69a"></span>Candles</span>
          <span><span class="scalper-swatch" style="background:#2962FF"></span>9 EMA</span>
          <span><span class="scalper-swatch" style="background:#FF6D00"></span>15 EMA</span>
        </div>
      </div>
      
      <div class="chart-viewport-wrapper">
        <!-- Side Drawing Toolbar with SVGs -->
        <div class="drawing-toolbar" id="scalper-drawing-toolbar">
          <button class="tool-btn active" data-tool="select" title="Cursor (Select)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/></svg>
          </button>
          <button class="tool-btn" data-tool="trendline" title="Trend Line">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><circle cx="18" cy="6" r="2" fill="currentColor"/><circle cx="6" cy="18" r="2" fill="currentColor"/></svg>
          </button>
          <button class="tool-btn" data-tool="fib" title="Fibonacci Levels">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="10" x2="20" y2="10"/><line x1="4" y1="14" x2="20" y2="14"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
          </button>
          <button class="tool-btn" data-tool="elliottimpulse" title="Elliott Impulse Wave">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20l3-14 4 10 5-12 4 10 2-3"/></svg>
          </button>
          <button class="tool-btn" data-tool="elliottcorrection" title="Elliott Correction Wave">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6l6 12 6-8 6 8"/></svg>
          </button>
          <button class="tool-btn" data-tool="brush" title="Freehand Brush">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4Z"/></svg>
          </button>
          <button class="tool-btn" data-tool="rect" title="Rectangle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
          </button>
          <button class="tool-btn" data-tool="longpos" title="Long Position">
            <svg viewBox="0 0 24 24" fill="none" stroke="#26a69a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3" fill="#26a69a"/></svg>
          </button>
          <button class="tool-btn" data-tool="shortpos" title="Short Position">
            <svg viewBox="0 0 24 24" fill="none" stroke="#ef5350" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3" fill="#ef5350"/></svg>
          </button>
          <button class="tool-btn tool-btn-magnet" id="scalper-magnet-btn" onclick="toggleMagnetSnap()" title="Magnet Snap (Snap to OHLC)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 11V6a5 5 0 00-10 0v5"/><path d="M7 11H5v3a4 4 0 008 0v-3h-2"/><path d="M15 11h-2v3a4 4 0 008 0v-3h-2"/></svg>
          </button>
          <button class="tool-btn" id="scalper-undo-btn" onclick="undoDrawings('scalper')" title="Undo (Ctrl+Z)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"/></svg>
          </button>
          <button class="tool-btn" id="scalper-redo-btn" onclick="redoDrawings('scalper')" title="Redo (Ctrl+Y)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 019-9 9 9 0 016 2.3l3 2.7"/></svg>
          </button>
          <button class="tool-btn" id="scalper-clear-drawings" title="Clear Drawings">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
          </button>
        </div>
        
        <!-- Floating Overlays Container for Scalper -->
        <div class="chart-overlays-container" id="scalper-overlays">
          <button class="overlays-collapse-btn" onclick="toggleOverlaysCollapse()" title="Collapse Overlays">
            <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          <!-- State Badges Overlay Card -->
          <div class="overlay-card state-badges-card">
            <div class="overlay-card-header">
              <span class="card-title">EMA SCALPER STATE</span>
            </div>
            <div class="scalper-badges-panel">
              <span id="badge-awaiting" class="scalper-badge active">Awaiting Setup</span>
              <span id="badge-long-trig" class="scalper-badge">Long Trigger Formed</span>
              <span id="badge-short-trig" class="scalper-badge">Short Trigger Formed</span>
              <span id="badge-pos-long" class="scalper-badge">In Position: Long</span>
              <span id="badge-pos-short" class="scalper-badge">In Position: Short</span>
            </div>
          </div>
          
          <!-- Active Trade Info Overlay Card -->
          <div class="overlay-card scalper-trade-info-card" id="scalper-info-bar" style="display: none;">
            <div class="overlay-card-header">
              <span class="card-title">ACTIVE POSITION</span>
            </div>
            <div id="scalper-info-text"></div>
          </div>
        </div>

        <!-- Scalper Chart Canvas -->
        <div id="tv-chart" style="width: 100%; height: 100%;"></div>
        
        <div id="scalper-target-box" style="position: absolute; display: none; background: rgba(38, 166, 154, 0.08); pointer-events: none; border-top: 1px solid rgba(38, 166, 154, 0.4); border-bottom: 1px solid rgba(38, 166, 154, 0.4); z-index: 5;"></div>
        <div id="scalper-stop-box" style="position: absolute; display: none; background: rgba(239, 83, 80, 0.08); pointer-events: none; border-top: 1px solid rgba(239, 83, 80, 0.4); border-bottom: 1px solid rgba(239, 83, 80, 0.4); z-index: 5;"></div>
        <div id="countdown-overlay-scalper">00:00</div>
      </div>
    </div>

    <!-- Trade Logs Section -->
    <div class="scalper-logs-card">
      <div class="scalper-logs-head">
        <div class="t">Trade Logs</div>
      </div>
      <div class="scalper-table-wrapper">
        <table class="scalper-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Entry Time</th>
              <th>Entry Price</th>
              <th>Exit Time</th>
              <th>Exit Price</th>
              <th>Points</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody id="scalper-logs-body">
            <tr>
              <td colspan="7" style="text-align: center; color: var(--muted); padding: 20px;">No trades executed yet</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  """
  
    html = html[:tab2_start] + new_tab2 + html[footer_start:]

    # --- 5. INJECT MOBILE ELEMENTS BEFORE THE END OF BODY ---
    body_end = html.find('</body>')
    if body_end != -1:
        mobile_html = """
  <!-- Mobile HUD Strip -->
  <div class="mobile-hud-strip" onclick="openMobileSheet()">
    <div class="hud-item">
      <span class="lbl">SIGNAL</span>
      <span class="val" id="mobile-hud-signal">—</span>
    </div>
    <div class="hud-item">
      <span class="lbl">CONFIDENCE</span>
      <span class="val" id="mobile-hud-conf">—</span>
    </div>
    <div class="hud-item">
      <span class="lbl">ECHOES</span>
      <span class="val" id="mobile-hud-echoes">—</span>
    </div>
    <div class="hud-item">
      <span class="lbl">PRICE</span>
      <span class="val" id="mobile-hud-price">—</span>
    </div>
    <div class="hud-chevron">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="18 15 12 9 6 15"></polyline></svg>
    </div>
  </div>

  <!-- Mobile Bottom Sheet Drawer -->
  <div id="mobile-bottom-sheet" class="mobile-bottom-sheet">
    <div class="sheet-header">
      <div class="drag-handle"></div>
      <span class="sheet-title">Forecast Details</span>
      <button class="sheet-close-btn" onclick="closeMobileSheet()">✕</button>
    </div>
    <div class="sheet-body" id="mobile-sheet-content">
      <!-- Cloned content is placed here dynamically -->
    </div>
  </div>
"""
        html = html[:body_end] + mobile_html + html[body_end:]

    # --- 6. UPDATE AND INJECT JAVASCRIPT LOGIC ---
    # Find activeTab declaration to inject our window/viewMode/collapse variables
    active_tab_pos = html.find("let activeTab = 'live-signal';")
    if active_tab_pos != -1:
        js_vars = """let activeTab = 'live-signal';
window.lastEchoScan = null;
"""
        html = html[:active_tab_pos] + js_vars + html[active_tab_pos + len("let activeTab = 'live-signal';"):]
        
    # We will locate drawEchoesSparkline block and replace it
    sparkline_func_start = html.find("function drawEchoesSparkline(echoScan) {")
    # Find next block start, e.g. function initLiveChart
    init_chart_pos = html.find("function initLiveChart() {")
    
    if sparkline_func_start != -1 and init_chart_pos != -1:
        new_sparkline_func = """function drawEchoesSparkline(echoScan) {
  window.lastEchoScan = echoScan;
  const canvas = $('echoes-sparkline');
  if (canvas) drawEchoesSparklineOnCanvas(canvas, echoScan);
  
  const mobileCanvas = document.querySelector('#mobile-sheet-content #echoes-sparkline');
  if (mobileCanvas) drawEchoesSparklineOnCanvas(mobileCanvas, echoScan);
}

function drawEchoesSparklineOnCanvas(canvas, echoScan) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  
  const query = echoScan.queryClosePct;
  const len = query.length + echoScan.horizon;
  
  let minVal = Math.min(...query);
  let maxVal = Math.max(...query);
  
  echoScan.results.forEach(res => {
    if (res.aftermathPct) {
      res.aftermathPct.forEach(pct => {
        const val = query[query.length - 1] + pct;
        if (val < minVal) minVal = val;
        if (val > maxVal) maxVal = val;
      });
    }
  });
  
  const valRange = (maxVal - minVal) || 1;
  const pad = valRange * 0.1;
  minVal -= pad;
  maxVal += pad;
  
  const scaleX = w / (len - 1);
  const scaleY = h / (maxVal - minVal);
  
  const getX = (idx) => idx * scaleX;
  const getY = (val) => h - (val - minVal) * scaleY;
  
  echoScan.results.forEach(res => {
    if (!res.aftermathPct) return;
    ctx.beginPath();
    const endingPct = res.aftermathPct[res.aftermathPct.length - 1];
    ctx.strokeStyle = endingPct > 0 ? 'rgba(38, 166, 154, 0.25)' : 'rgba(239, 83, 80, 0.25)';
    ctx.lineWidth = 1;
    
    const startX = getX(query.length - 1);
    const startY = getY(query[query.length - 1]);
    ctx.moveTo(startX, startY);
    
    res.aftermathPct.forEach((pct, offsetIdx) => {
      const x = getX(query.length - 1 + offsetIdx + 1);
      const val = query[query.length - 1] + pct;
      ctx.lineTo(x, getY(val));
    });
    ctx.stroke();
  });
  
  ctx.beginPath();
  ctx.strokeStyle = '#ef9f27';
  ctx.lineWidth = 2;
  query.forEach((val, idx) => {
    if (idx === 0) ctx.moveTo(getX(idx), getY(val));
    else ctx.lineTo(getX(idx), getY(val));
  });
  ctx.stroke();
}
"""
        html = html[:sparkline_func_start] + new_sparkline_func + html[init_chart_pos:]

    # Locate applySavedTheme and toggleTheme to replace them with dark-theme override version
    theme_func_start = html.find("function toggleTheme() {")
    settings_load_pos = html.find("function loadChartSettings(engine) {")
    if theme_func_start != -1 and settings_load_pos != -1:
        new_theme_funcs = """function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-theme');
  const theme = isDark ? 'dark' : 'light';
  localStorage.setItem('greeks_theme', theme);
  $('global-theme-toggle').textContent = isDark ? '🌙' : '☀️';
  
  if (liveChartEngine) liveChartEngine.setTheme(theme);
  if (scalperChartEngine) scalperChartEngine.setTheme(theme);
}
window.toggleTheme = toggleTheme;

function applySavedTheme() {
  const savedTheme = localStorage.getItem('greeks_theme') || 'light';
  const isDark = savedTheme === 'dark';
  if (isDark) {
    document.body.classList.add('dark-theme');
    $('global-theme-toggle').textContent = '🌙';
  } else {
    document.body.classList.remove('dark-theme');
    $('global-theme-toggle').textContent = '☀️';
  }
}
"""
        html = html[:theme_func_start] + new_theme_funcs + html[settings_load_pos:]

    # Inject ViewMode, OverlaysCollapse, IndicatorsDropdown, MobileSheet functions before "applySavedTheme();"
    theme_apply_pos = html.find("applySavedTheme();")
    if theme_apply_pos != -1:
        helper_funcs = """
// View Mode Toggling
function setViewMode(mode) {
  document.body.classList.remove('view-fullscreen', 'view-split', 'view-compact');
  document.body.classList.add('view-' + mode);
  localStorage.setItem('greeks_view_mode', mode);
  
  document.querySelectorAll('.view-mode-btn').forEach(btn => {
    if (btn.getAttribute('data-mode') === mode) btn.classList.add('active');
    else btn.classList.remove('active');
  });
  
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
    updateShadedBoxes();
  }, 100);
}
window.setViewMode = setViewMode;

function applySavedViewMode() {
  const mode = localStorage.getItem('greeks_view_mode') || 'split';
  setViewMode(mode);
}

// Overlays Collapse Toggling
function toggleOverlaysCollapse() {
  const cLive = $('live-overlays');
  const cScalper = $('scalper-overlays');
  let isCollapsed = false;
  if (cLive) isCollapsed = cLive.classList.toggle('collapsed');
  if (cScalper) cScalper.classList.toggle('collapsed', isCollapsed);
  localStorage.setItem('greeks_overlays_collapsed', isCollapsed ? 'true' : 'false');
}
window.toggleOverlaysCollapse = toggleOverlaysCollapse;

function applyOverlaysCollapse() {
  const collapsed = localStorage.getItem('greeks_overlays_collapsed') === 'true';
  const cLive = $('live-overlays');
  const cScalper = $('scalper-overlays');
  if (cLive && collapsed) cLive.classList.add('collapsed');
  if (cScalper && collapsed) cScalper.classList.add('collapsed');
}

// Indicators dropdown toggle
function toggleIndicatorsDropdown(event) {
  if (event) event.stopPropagation();
  const dropdown = $('indicators-dropdown');
  if (dropdown) {
    const active = dropdown.classList.toggle('active');
    if (active) {
      renderIndicatorsModalList();
    }
  }
}
window.toggleIndicatorsDropdown = toggleIndicatorsDropdown;

// Close indicators dropdown when clicking outside
window.addEventListener('click', (e) => {
  const dropdown = $('indicators-dropdown');
  const btn = $('indicators-toggle-btn');
  if (dropdown && dropdown.classList.contains('active') && !dropdown.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
    dropdown.classList.remove('active');
  }
});

// Mobile Bottom Sheet
function openMobileSheet() {
  const sheet = $('mobile-bottom-sheet');
  const content = $('mobile-sheet-content');
  if (sheet && content) {
    if (activeTab === 'live-signal') {
      const sigHtml = $('sig') ? $('sig').outerHTML : '';
      const echoesHtml = $('echoes-card') ? $('echoes-card').outerHTML : '';
      const statsHtml = $('stats-card') ? $('stats-card').outerHTML : '';
      content.innerHTML = `
        <div class="mobile-sheet-content-wrapper">
          ${sigHtml}
          ${echoesHtml}
          ${statsHtml}
        </div>
      `;
      const mobileCanvas = content.querySelector('#echoes-sparkline');
      if (mobileCanvas && window.lastEchoScan) {
        drawEchoesSparklineOnCanvas(mobileCanvas, window.lastEchoScan);
      }
    } else {
      const stateHtml = document.querySelector('#tab-scalper .state-badges-card') ? document.querySelector('#tab-scalper .state-badges-card').outerHTML : '';
      const tradeHtml = document.querySelector('#tab-scalper .scalper-trade-info-card') ? document.querySelector('#tab-scalper .scalper-trade-info-card').outerHTML : '';
      content.innerHTML = `
        <div class="mobile-sheet-content-wrapper">
          ${stateHtml}
          ${tradeHtml}
        </div>
      `;
    }
    sheet.classList.add('active');
  }
}
window.openMobileSheet = openMobileSheet;

function closeMobileSheet() {
  const sheet = $('mobile-bottom-sheet');
  if (sheet) sheet.classList.remove('active');
}
window.closeMobileSheet = closeMobileSheet;

"""
        html = html[:theme_apply_pos] + helper_funcs + html[theme_apply_pos:]

    # Inject viewMode / overlaysCollapse load calls inside load execution block
    theme_apply_pos = html.find("applySavedTheme();")
    if theme_apply_pos != -1:
        # Re-find post injection
        apply_calls = "applySavedTheme();\n  applySavedViewMode();\n  applyOverlaysCollapse();\n"
        html = html.replace("applySavedTheme();", apply_calls, 1)

    # In checkAlerts or load, make sure the mobile HUD strip elements update as well
    # In load() inside Tab 1, we can add updates for mobile-hud signals
    load_sig_pos = html.find("const klass = d.direction ===")
    if load_sig_pos != -1:
        hud_update = """// Sync mobile HUD strip
    if ($('mobile-hud-signal')) $('mobile-hud-signal').textContent = d.direction;
    if ($('mobile-hud-conf')) $('mobile-hud-conf').textContent = d.confidence + '%';
    if ($('mobile-hud-price')) $('mobile-hud-price').textContent = fmt(d.current);
    
    """
        html = html[:load_sig_pos] + hud_update + html[load_sig_pos:]
        
    # In drawEchoesSparkline, add updates for mobile-hud echoes
    spark_status_pos = html.find("$('echoes-status').textContent = statusText;")
    if spark_status_pos != -1:
        hud_echo_update = """$('echoes-status').textContent = statusText;
      if ($('mobile-hud-echoes')) $('mobile-hud-echoes').textContent = statusText;"""
        html = html.replace("$('echoes-status').textContent = statusText;", hud_echo_update, 1)

    # Make sure we read theme class correctly inside initLiveChart & initScalperChart
    html = html.replace(
        "theme: document.body.classList.contains('light-theme') ? 'light' : 'dark',",
        "theme: document.body.classList.contains('dark-theme') ? 'dark' : 'light',",
        2
    )

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
        
    print("Dashboard Redesign compiled successfully.")

if __name__ == '__main__':
    main()
