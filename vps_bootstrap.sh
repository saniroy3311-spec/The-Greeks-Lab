#!/usr/bin/env bash
# vps_bootstrap.sh
# Run ONCE on an Ubuntu 22.04+ VPS as root.
# SAFE for shared VPS — does NOT touch existing nginx sites, firewall rules,
# or any other services. Only adds Kronos alongside what's already running.
#
# Usage:
#   sudo bash vps_bootstrap.sh <GITHUB_REPO_URL>
#
# Example:
#   sudo bash vps_bootstrap.sh https://github.com/saniroy3311-spec/Kronos-ai-Sani.git

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

# ── 1. System packages ──────────────────────────────────────────────────────
echo "[1/5] Installing system packages..."
apt-get update -qq
apt-get install -y -qq python3 python3-pip python3-venv git curl

# ── 2. App user ──────────────────────────────────────────────────────────────
echo "[2/5] Creating system user: $SERVICE_USER"
id "$SERVICE_USER" &>/dev/null || useradd --system --shell /bin/bash --home-dir "$APP_DIR" --create-home "$SERVICE_USER"

# ── 3. Clone repo ───────────────────────────────────────────────────────────
echo "[3/5] Cloning repo into $APP_DIR..."
if [ -d "$APP_DIR/.git" ]; then
    echo "  Repo already exists, pulling latest..."
    git -C "$APP_DIR" pull origin main
else
    git clone "$REPO_URL" "$APP_DIR"
fi
chown -R "$SERVICE_USER":"$SERVICE_USER" "$APP_DIR"

# ── 4. Python virtual env + dependencies ─────────────────────────────────────
echo "[4/5] Creating Python venv and installing requirements..."
sudo -u "$SERVICE_USER" bash -c "
    cd $APP_DIR
    python3 -m venv venv
    venv/bin/pip install --quiet --upgrade pip
    venv/bin/pip install --quiet -r requirements.txt
"
echo "  Python env ready (torch + yfinance + flask installed)"

# ── 5. systemd service (kronos only — does not touch other services) ─────────
echo "[5/5] Installing systemd service..."
cp "$APP_DIR/kronos.service" /etc/systemd/system/kronos.service
sed -i "s|User=kronos|User=$SERVICE_USER|g" /etc/systemd/system/kronos.service
systemctl daemon-reload
systemctl enable kronos
systemctl restart kronos
echo "  Service started. Status:"
systemctl is-active kronos && echo "  kronos is RUNNING" || echo "  WARNING: kronos failed to start — check: journalctl -u kronos -n 50"

# ── Firewall — only ADD rule if ufw is active ────────────────────────────────
if command -v ufw &>/dev/null && ufw status | grep -q "active"; then
    echo "  Firewall is active — adding port 8082 rule..."
    ufw allow 8082/tcp
else
    echo "  Firewall not active — skipping (no changes made)"
fi

echo ""
echo "============================================"
echo " Bootstrap complete!"
echo ""
echo " Dashboard:  http://YOUR_VPS_IP:8082"
echo " API check:  http://YOUR_VPS_IP:8082/api/health"
echo " Logs:       journalctl -u kronos -f"
echo " Restart:    sudo systemctl restart kronos"
echo ""
echo " Existing services were NOT modified."
echo " Kronos runs on port 8082."
echo "============================================"
