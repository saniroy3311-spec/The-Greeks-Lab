import os
import re

def main():
    file_path = 'templates/dashboard.html'
    if not os.path.exists(file_path):
        print("Error: templates/dashboard.html not found.")
        return
        
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Update CSS height calculations from 92px to 52px (since tab bar is removed)
    html = html.replace('height: calc(100vh - 92px);', 'height: calc(100vh - 52px);')
    print("Updated vertical height calculations in CSS.")

    # 2. Define sidebar CSS styles and inject them before </style>
    sidebar_css = """
  /* Sidebar Slide-Out Drawer Panel */
  .sidebar-drawer {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 260px;
    background: var(--surface);
    border-right: 1px solid var(--border);
    box-shadow: 4px 0 16px rgba(0, 0, 0, 0.04);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    transform: translateX(-260px);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  body.dark-theme .sidebar-drawer {
    box-shadow: 4px 0 16px rgba(0, 0, 0, 0.3);
  }
  .sidebar-drawer.active {
    transform: translateX(0);
  }
  .sidebar-header {
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    border-bottom: 1px solid var(--border);
  }
  .sidebar-close-btn {
    background: transparent;
    border: none;
    color: var(--muted);
    font-size: 16px;
    cursor: pointer;
    padding: 4px;
    transition: color 0.2s;
  }
  .sidebar-close-btn:hover {
    color: var(--text);
  }
  .sidebar-content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .sidebar-section-title {
    font-size: 10px;
    font-weight: 700;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .sidebar-menu-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .sidebar-menu-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 12px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: var(--text);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
  }
  .sidebar-menu-item:hover {
    background: rgba(0, 0, 0, 0.03);
  }
  body.dark-theme .sidebar-menu-item:hover {
    background: rgba(255, 255, 255, 0.04);
  }
  .sidebar-menu-item.active {
    background: rgba(41, 98, 255, 0.08);
    color: var(--blue);
    font-weight: 600;
  }
  .sidebar-menu-item.active svg {
    stroke: var(--blue);
  }
"""
  
    style_end = html.find('</style>')
    if style_end != -1:
        html = html[:style_end] + sidebar_css + html[style_end:]
        print("Injected sidebar CSS styles.")

    # 3. Add hamburger menu button to topbar
    topbar_logo_part = """  <div class="candl-topbar">
    <div class="logo-section">"""
    
    new_topbar_logo_part = """  <div class="candl-topbar">
    <button class="top-btn-icon" id="hamburger-menu-btn" onclick="toggleSidebarDrawer(event)" title="Menu" style="margin-right: 4px;">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
    </button>
    <div class="logo-section">"""
    
    if topbar_logo_part in html:
        html = html.replace(topbar_logo_part, new_topbar_logo_part, 1)
        print("Added hamburger button to top navigation bar.")
    else:
        print("Warning: Could not locate topbar logo section.")

    # 4. Remove the old tab container container
    tab_container_pattern = r'\s*<!-- Tab Buttons -->\s*<div class="tab-container">.*?</div>'
    html, count = re.subn(tab_container_pattern, "", html, flags=re.DOTALL)
    if count > 0:
        print("Removed old tab-container buttons markup.")
    else:
        print("Warning: Could not find old tab container markup.")

    # 5. Insert Sidebar HTML Drawer right after <body>
    body_pos = html.find('<body>')
    if body_pos != -1:
        sidebar_html = """
  <!-- Sidebar Slide Drawer -->
  <div id="sidebar-drawer" class="sidebar-drawer">
    <div class="sidebar-header">
      <div class="logo-section">
        <span class="logo-icon" style="color: #2962FF; font-weight: 800; font-size: 18px; margin-right: 4px;">Δ</span>
        <span class="logo-text">GreeksLab</span>
      </div>
      <button class="sidebar-close-btn" onclick="toggleSidebarDrawer(event)">✕</button>
    </div>
    <div class="sidebar-content">
      <div class="sidebar-section-title">Workspaces</div>
      <div class="sidebar-menu-list">
        <button class="sidebar-menu-item active" id="menu-live-signal" onclick="handleMenuSwitchTab('live-signal')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" style="margin-right: 8px; vertical-align: middle;"><path d="M2 12h20"></path><path d="M20 12v8H4v-8"></path><path d="M4 12V4h16v8"></path></svg>
          <span style="vertical-align: middle;">Live Forecast</span>
        </button>
        <button class="sidebar-menu-item" id="menu-scalper" onclick="handleMenuSwitchTab('scalper')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" style="margin-right: 8px; vertical-align: middle;"><path d="M3 3v18h18"></path><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path></svg>
          <span style="vertical-align: middle;">EMA/Kronos Scalper</span>
        </button>
      </div>
    </div>
  </div>
"""
        html = html[:body_pos + len('<body>')] + sidebar_html + html[body_pos + len('<body>'):]
        print("Injected sidebar HTML structure.")

    # 6. Update switchTab function to sync sidebar active state
    old_switch_tab = """function switchTab(tabId) {
  activeTab = tabId;
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  
  document.getElementById('tab-' + tabId).classList.add('active');
  const btn = document.querySelector(`button[onclick="switchTab('${tabId}')"]`);
  if (btn) btn.classList.add('active');"""

    new_switch_tab = """function switchTab(tabId) {
  activeTab = tabId;
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  
  document.getElementById('tab-' + tabId).classList.add('active');
  const btn = document.querySelector(`button[onclick="switchTab('${tabId}')"]`);
  if (btn) btn.classList.add('active');
  
  // Sync sidebar menu states
  const menuBtnLive = $('menu-live-signal');
  const menuBtnScalper = $('menu-scalper');
  if (menuBtnLive && menuBtnScalper) {
    if (tabId === 'live-signal') {
      menuBtnLive.classList.add('active');
      menuBtnScalper.classList.remove('active');
    } else {
      menuBtnScalper.classList.add('active');
      menuBtnLive.classList.remove('active');
    }
  }"""

    if old_switch_tab in html:
        html = html.replace(old_switch_tab, new_switch_tab)
        print("Updated switchTab JS logic to sync active state.")
    else:
        print("Warning: Could not find switchTab JS block.")

    # 7. Add sidebar drawer JS helper functions before window load hooks
    close_mobile_pos = html.find("function closeMobileSheet() {")
    if close_mobile_pos != -1:
        # Find the end of closeMobileSheet to insert after
        close_sheet_end = html.find("}", close_mobile_pos)
        if close_sheet_end != -1:
            js_helpers = """

// Sidebar Drawer Control
function toggleSidebarDrawer(event) {
  if (event) event.stopPropagation();
  const drawer = $('sidebar-drawer');
  if (drawer) {
    drawer.classList.toggle('active');
  }
}
window.toggleSidebarDrawer = toggleSidebarDrawer;

function handleMenuSwitchTab(tabId) {
  switchTab(tabId);
  const drawer = $('sidebar-drawer');
  if (drawer) drawer.classList.remove('active');
}
window.handleMenuSwitchTab = handleMenuSwitchTab;

// Close sidebar drawer when clicking outside
window.addEventListener('click', (e) => {
  const drawer = $('sidebar-drawer');
  const btn = $('hamburger-menu-btn');
  if (drawer && drawer.classList.contains('active') && !drawer.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
    drawer.classList.remove('active');
  }
});
"""
            html = html[:close_sheet_end + 1] + js_helpers + html[close_sheet_end + 1:]
            print("Injected sidebar JS helper functions.")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
        
    print("Sidebar drawer patch compiled successfully.")

if __name__ == '__main__':
    main()
