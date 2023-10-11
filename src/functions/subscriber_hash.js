const md5 = require('md5');

module.exports = function hash(args){
    const email = args.inputs.data.url.split('=')[1].toLowerCase();
    return `${md5(email)}`;
}