module.exports = {
  apps : [{
    name   : "Kgp adda app",
    script: 'npm',
    args: ['run', 'dev', '--', '--port=3001'],
    max_memory_restart : '2G',
    time : true,
    shutdown_with_message : true,
    max_restarts : 10,
    restart_delay: 4000,
    log_file: "./logfile.txt"
  }]
}
