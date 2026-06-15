# Deployment Instructions
## GitHub → Auto-deploy to VPS → Live Dashboard

Follow these steps **in order**. You only do the VPS setup once.
After that, every `git push` to `main` automatically redeploys.

---

## What you need before starting

| Item | Where to get it |
|------|-----------------|
| A VPS (Ubuntu 22.04) | DigitalOcean, Hetzner, AWS, Vultr — any will do |
| VPS IP address | Your VPS provider dashboard |
| SSH access to your VPS | You should already have this |
| A GitHub account | github.com |

---

## Step 1 — Create the GitHub repository

1. Go to **github.com** → click the **+** button → **New repository**
2. Name it `kronos` (or anything you like)
3. Set it to **Private** (recommended — your trading tool)
4. Do **not** add a README or .gitignore (you already have these)
5. Click **Create repository**
6. GitHub shows you a page with the repo URL — copy it, e.g.:
   `https://github.com/saniroy3311-spec/Kronos-ai-Sani.git`

---

## Step 2 — Push your code to GitHub

On your local machine, inside the `kronos_live` folder:

```bash
cd kronos_live

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/saniroy3311-spec/Kronos-ai-Sani.git
git push -u origin main
```

You should see all files appear on GitHub.

---

## Step 3 — Generate an SSH key for GitHub Actions

GitHub Actions needs an SSH key to log into your VPS.
Run this on your **local machine** (not the VPS):

```bash
ssh-keygen -t ed25519 -C "kronos-deploy" -f ~/.ssh/kronos_deploy -N ""
```

This creates two files:
- `~/.ssh/kronos_deploy`      ← **private key** (goes to GitHub secret)
- `~/.ssh/kronos_deploy.pub`  ← **public key** (goes to VPS)

---

## Step 4 — Add the public key to your VPS

Copy the public key to your VPS so GitHub can SSH in:

```bash
ssh-copy-id -i ~/.ssh/kronos_deploy.pub root@YOUR_VPS_IP
```

Or manually — paste the content of `kronos_deploy.pub` into this file on the VPS:
```
~/.ssh/authorized_keys
```

Test it works:
```bash
ssh -i ~/.ssh/kronos_deploy root@YOUR_VPS_IP "echo connected"
```

You should see `connected` with no password prompt.

---

## Step 5 — Add secrets to GitHub

Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
→ click **New repository secret** for each one:

| Secret name   | Value                                              |
|---------------|----------------------------------------------------|
| `VPS_HOST`    | Your VPS IP address, e.g. `123.456.78.90`          |
| `VPS_USER`    | `root` (or your VPS username)                      |
| `VPS_SSH_KEY` | Paste the **entire** private key file contents     |
| `VPS_PORT`    | `22`                                               |

To get the private key contents:
```bash
cat ~/.ssh/kronos_deploy
```
Copy everything including `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END...`.

---

## Step 6 — Run the bootstrap script on your VPS (one time only)

SSH into your VPS:
```bash
ssh root@YOUR_VPS_IP
```

Then run the bootstrap script — it installs everything:
```bash
curl -sO https://raw.githubusercontent.com/saniroy3311-spec/Kronos-ai-Sani/main/vps_bootstrap.sh
chmod +x vps_bootstrap.sh
sudo bash vps_bootstrap.sh https://github.com/saniroy3311-spec/Kronos-ai-Sani.git YOUR_VPS_IP
```

This takes about 5–10 minutes. It will:
- Create a `kronos` system user
- Clone your repo to `/opt/kronos`
- Create a Python virtual environment
- Install all requirements (PyTorch, Flask, yfinance, etc.)
- Install and start the `kronos` systemd service (keeps it running 24/7)
- Configure Nginx as a reverse proxy
- Open the firewall on ports 80 and 443

When it finishes you will see:
```
Bootstrap complete!
Dashboard:  http://YOUR_VPS_IP
API check:  http://YOUR_VPS_IP/api/health
```

Open that URL in your browser. You should see the live dashboard.

**Note:** The first time Kronos starts it downloads the model from HuggingFace
(~100 MB). Give it 2–3 minutes to load. Check progress with:
```bash
journalctl -u kronos -f
```

---

## Step 7 — Test the auto-deploy

Make a small change to any file locally, then push:

```bash
# on your local machine inside kronos_live/
echo "# tested" >> README.md
git add .
git commit -m "Test auto-deploy"
git push
```

Then go to GitHub → your repo → **Actions** tab.
You will see a workflow run. It takes about 10–15 seconds.
When it turns green → the VPS has the new code and has restarted.

From now on, every `git push origin main` auto-deploys.

---

## How the auto-deploy works (what GitHub Actions does)

```
You push to main
       ↓
GitHub Actions runner starts
       ↓
SSH into YOUR_VPS_IP as VPS_USER
       ↓
cd /opt/kronos && git pull origin main
       ↓
sudo systemctl restart kronos
       ↓
Dashboard is live with new code
```

The workflow file is at `.github/workflows/deploy.yml` — you can read it there.

---

## Useful commands on the VPS

```bash
# Watch live logs
journalctl -u kronos -f

# Restart the server manually
sudo systemctl restart kronos

# Check if it's running
sudo systemctl status kronos

# Stop it
sudo systemctl stop kronos

# See the last 50 log lines
journalctl -u kronos -n 50
```

---

## Optional: Free HTTPS with Let's Encrypt

If you have a domain name pointing to your VPS, run this once for free HTTPS:

```bash
apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com
```

Your dashboard is then at `https://yourdomain.com` with auto-renewing SSL.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Dashboard not loading | `journalctl -u kronos -n 50` — look for errors |
| "Permission denied" in GitHub Actions | Check VPS_SSH_KEY is the full private key |
| Nginx 502 Bad Gateway | `systemctl status kronos` — the app may still be starting |
| Model not loading | First run takes 2–3 min to download from HuggingFace |
| yfinance no data | Check market hours — NSE is open 9:15am–3:30pm IST weekdays |
| Port 8080 blocked | Nginx proxies on port 80 — you don't need 8080 open externally |

---

## File map — what each file does

```
kronos_live/
├── .github/
│   └── workflows/
│       └── deploy.yml        ← GitHub Actions: auto-deploy on push
├── model/                    ← Kronos model code (do not edit)
├── templates/
│   └── dashboard.html        ← The live candlestick dashboard
├── server.py                 ← Flask app: data + Kronos + API + dashboard
├── strategy.py               ← EMA + Kronos filter (your trading logic)
├── predict_csv.py            ← Offline: test on a CSV file
├── requirements.txt          ← Python dependencies
├── vps_bootstrap.sh          ← One-time VPS setup script
├── kronos.service            ← Systemd service (keeps it running 24/7)
├── nginx.conf                ← Nginx reverse proxy config
├── GUIDE.md                  ← Simple guide: how it works + live trading use
└── DEPLOY.md                 ← This file
```
