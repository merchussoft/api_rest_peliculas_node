const scpSsh = require('./ConnectSsh');

exports.listFiles = async () => {
    return (await scpSsh).list(process.env.REMOTE_PATH_SSH );
}

exports.saveFiles = async () => {

}

exports.deleteFiles = async () => {

}
