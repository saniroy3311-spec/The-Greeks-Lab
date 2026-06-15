#!/usr/bin/env bash
# vps_bootstrap.sh
# Run ONCE on an Ubuntu 22.04+ VPS as root.
# SAFE for shared VPS — does NOT touch existing nginx sites, firewall rules,
# or any other services. Only adds Kronos alongside what's already running.
#
# Usage:
#   curl -sO https://raw.githubusercontent.com/saniroy3311-spec/Kronos-ai-Sani/main/vps_bootstrap.sh
#   chmod +x vps_bootstrap.sh
#   sudo bash vps_bootstrap.sh YOUR_GITHUB_REPO_URL
#
# Example:
#   sudo bash vps_bootstrap.sh https://github.com/saniroy3311-spec/Kronos-ai-Sani

set -e

REPO_URL=${1:?"Usage: sudo bash vps_bootstrap.sh <GITHUB_REPO_URL>"}
APP_DIR="/opt/kronos"
SERVICE_USER="kronos"

echo ""
echo "============================================"
echo " Kronos VPS Bootstrap (shared-VPS safe)"
echo " Repo : $REPO_URL"
echo "============================================"
echo ""

# ── 1. System packages (install only what's missing, won't affect existing) ──
echo "[1/6] Installing system packages..."
apt-get update -qq
apt-get install -y -qq python3 python3-pip python3-venv git nginx curl

# ── 2. App user ──────────────────────────────────────────────────────────────
echo "[2/6] Creating system user: $SERVICE_USER"
id "$SERVICE_USER" &>/dev/null || useradd --system --shell /bin/bash --home-dir "$APP_DIR" --create-home "$SERVICE_USER"

# ── 3. Clone repo ───────────────────────────────────────────────────────────
echo "[3/6] Cloning repo into $APP_DIR..."
if [ -d "$APP_DIR/.git" ]; then
    echo "  Repo already exists, pulling latest..."
    git -C "$APP_DIR" pull origin main
else
    git clone "$REPO_URL" "$APP_DIR"
fi
chown -R "$SERVICE_USER":"$SERVICE_USER" "$APP_DIR"

# ── 4. Python virtual env + dependencies ─────────────────────────────────────
echo "[4/6] Creating Python venv and installing requirements..."
sudo -u "$SERVICE_USER" bash -c "
    cd $APP_DIR
    python3 -m venv venv
    venv/bin/pip install --quiet --upgrade pip
    venv/bin/pip install --quiet -r requirements.txt
"
echo "  Python env ready (torch + yfinance + flask installed)"

# ── 5. systemd service (kronos only — does not touch other services) ─────────
echo "[5/6] Installing systemd service..."
cp "$APP_DIR/kronos.service" /etc/systemd/system/kronos.service
sed -i "s|User=kronos|User=$SERVICE_USER|g" /etc/systemd/system/kronos.service
systemctl daemon-reload
systemctl enable kronos
systemctl restart kronos
echo "  Service started. Status:"
systemctl is-active kronos && echo "  kronos is RUNNING" || echo "  WARNING: kronos failed to start — check: journalctl -u kronos -n 50"

# ── 6. Nginx — ADD Kronos site (does NOT remove default or existing sites) ───
echo "[6/6] Adding Kronos nginx config (existing sites untouched)..."
cp "$APP_DIR/nginx.conf" /etc/nginx/sites-available/kronos

# Symlink only if not already present
ln -sf /etc/nginx/sites-available/kronos /etc/nginx/sites-enabled/kronos

# Test config before reloading (safety check)
if nginx -t 2>/dev/null; then
    systemctl reload nginx
    echo "  Nginx reloaded — Kronos added on port 8081"
else
    echo "  WARNING: nginx config test failed. Your existing sites are untouched."
    echo "  Fix manually: nginx -t  →  systemctl reload nginx"
fi

# ── Firewall — only ADD rules, never force-enable ────────────────────────────
if command -v ufw &>/dev/null && ufw status | grep -q "active"; then
    echo "  Firewall is active — adding port 8081 rule..."
    ufw allow 8081/tcp
else
    echo "  Firewall not active or ufw not found — skipping (no changes made)"
fi

echo ""
echo "============================================"
echo " Bootstrap complete!"
echo ""
echo " Dashboard:  http://YOUR_VPS_IP:8081"
echo " API check:  http://YOUR_VPS_IP:8081/api/health"
echo " Logs:       journalctl -u kronos -f"
echo " Restart:    sudo systemctl restart kronos"
echo ""
echo " ⚠  Existing nginx sites, firewall, and"
echo "    other services were NOT modified."
echo ""
echo " Next: set GitHub Secrets then push to main"
echo "  VPS_HOST    = YOUR_VPS_IP"
echo "  VPS_USER    = root"
echo "  VPS_SSH_KEY = your private SSH key"
echo "  VPS_PORT    = 22"
echo "============================================"
