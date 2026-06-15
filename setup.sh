#!/usr/bin/env bash
# One-time VPS setup for Kronos Live Dashboard
set -e

echo "==> Creating virtual environment"
python3 -m venv venv
source venv/bin/activate

echo "==> Upgrading pip"
pip install --upgrade pip

echo "==> Installing requirements (this downloads PyTorch, takes a few minutes)"
pip install -r requirements.txt

echo ""
echo "==> Setup complete."
echo ""
echo "To start the dashboard:"
echo "    source venv/bin/activate"
echo "    python server.py"
echo ""
echo "Then open:  http://YOUR_VPS_IP:8080"
echo ""
echo "The first run downloads the Kronos model from HuggingFace (~100MB)."
