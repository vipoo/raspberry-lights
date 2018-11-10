import childProcess from 'child_process'
import util from 'util'

const {promisify} = util
export const exec = promisify(childProcess.exec)
