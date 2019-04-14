
module.exports.CustomError = class extends Error {
  constructor(name='', message='', ...params) {
    super(...params)
    this.name = name
    this.message = message
  }
}