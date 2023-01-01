class Logger {

  write(str) {
    process.stdout.write(str + '\n')
  }
}

export default Logger
