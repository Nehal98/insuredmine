const os = require('os');
const { exec } = require('child_process');

setInterval(() => {
  const load = os.loadavg()[0]; 
  console.log(("Background Monitoring is working..."))
  if (load > 0.7) {
    console.log('CPU usage high, restarting server...');
    exec('pm2 restart all'); // or `process.exit(1)`
  }
}, 10000);
