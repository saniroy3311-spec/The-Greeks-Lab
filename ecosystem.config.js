module.exports = {
  apps: [{
    name: "kronos-dashboard",
    script: "server.py",
    interpreter: "./venv/bin/python",
    cwd: __dirname,
    autorestart: true,
    max_restarts: 10,
    env: {
      KRONOS_MODEL: "NeoQuasar/Kronos-small",
      KRONOS_DEVICE: "cpu",
      KRONOS_PORT: "8080",
      KRONOS_PRED_LEN: "24",
      KRONOS_CACHE: "60"
    }
  }]
};
