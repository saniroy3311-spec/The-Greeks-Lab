#!/usr/bin/env bash
# vps_bootstrap.sh
# Run ONCE on a fresh Ubuntu 22.04 VPS as root.
# Sets up: system user, git clone, python venv, systemd service, nginx, firewall.
#
# Usage:
#   curl -sO https://raw.githubusercontent.com/saniroy3311-spec/Kronos-ai-Sani/main/vps_bootstrap.sh
#   chmod +x vps_bootstrap.sh
#   sudo bash vps_bootstrap.sh YOUR_GITHUB_REPO_URL YOUR_DOMAIN_OR_IP
#
# Example:
#   sudo bash vps_bootstrap.sh https://github.com/saniroy3311-spec/Kronos-ai-Sani 192.168.1.100

set -e

REPO_URL=${1:?"Usage: sudo bash vps_bootstrap.sh <GITHUB_REPO_URL> <DOMAIN_OR_IP>"}
DOMAIN=${2:?"Usage: sudo bash vps_bootstrap.sh <GITHUB_REPO_URL> <DOMAIN_OR_IP>"}
APP_DIR="/opt/kronos"
SERVICE_USER="kronos"

echo ""
echo "============================================"
echo " Kronos VPS Bootstrap"
echo " Repo : $REPO_URL"
echo " Host : $DOMAIN"
echo "============================================"
echo ""

# ── 1. System packages ─────────────────────────────────────────────────────
echo "[1/7] Installing system packages..."
apt-get update -qq
apt-get install -y -qq python3 python3-pip python3-venv git nginx ufw curl

# ── 2. App user ────────────────────────────────────────────────────────────
echo "[2/7] Creating system user: $SERVICE_USER"
id "$SERVICE_USER" &>/dev/null || useradd --system --shell /bin/bash --home-dir "$APP_DIR" --create-home "$SERVICE_USER"

# ── 3. Clone repo ──────────────────────────────────────────────────────────
echo "[3/7] Cloning repo into $APP_DIR..."
if [ -d "$APP_DIR/.git" ]; then
    echo "  Repo already exists, pulling latest..."
    git -C "$APP_DIR" pull origin main
else
    git clone "$REPO_URL" "$APP_DIR"
fi
chown -R "$SERVICE_USER":"$SERVICE_USER" "$APP_DIR"

# ── 4. Python virtual env + dependencies ───────────────────────────────────
echo "[4/7] Creating Python venv and installing requirements..."
sudo -u "$SERVICE_USER" bash -c "
    cd $APP_DIR
    python3 -m venv venv
    venv/bin/pip install --quiet --upgrade pip
    venv/bin/pip install --quiet -r requirements.txt
"
echo "  Python env ready (torch + yfinance + flask installed)"

# ── 5. systemd service ─────────────────────────────────────────────────────
echo "[5/7] Installing systemd service..."
cp "$APP_DIR/kronos.service" /etc/systemd/system/kronos.service
sed -i "s|User=kronos|User=$SERVICE_USER|g" /etc/systemd/system/kronos.service
systemctl daemon-reload
systemctl enable kronos
systemctl restart kronos
echo "  Service started. Status:"
systemctl is-active kronos && echo "  kronos is RUNNING" || echo "  WARNING: kronos failed to start — check: journalctl -u kronos -n 50"

# ── 6. Nginx reverse proxy ─────────────────────────────────────────────────
echo "[6/7] Configuring nginx..."
cp "$APP_DIR/nginx.conf" /etc/nginx/sites-available/kronos
sed -i "s|YOUR_DOMAIN_OR_IP|$DOMAIN|g" /etc/nginx/sites-available/kronos
ln -sf /etc/nginx/sites-available/kronos /etc/nginx/sites-enabled/kronos
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
echo "  Nginx configured for $DOMAIN"

# ── 7. Firewall ────────────────────────────────────────────────────────────
echo "[7/7] Opening firewall ports (22, 80, 443)..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo ""
echo "============================================"
echo " Bootstrap complete!"
echo ""
echo " Dashboard:  http://$DOMAIN"
echo " API check:  http://$DOMAIN/api/health"
echo " Logs:       journalctl -u kronos -f"
echo " Restart:    sudo systemctl restart kronos"
echo ""
echo " Next: set GitHub Secrets then push to main"
echo "  VPS_HOST    = $DOMAIN"
echo "  VPS_USER    = $SERVICE_USER  (or root)"
echo "  VPS_SSH_KEY = your private SSH key"
echo "  VPS_PORT    = 22"
echo "============================================"
