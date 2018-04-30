const bcrypt = require("bcrypt");

class Encode {

    static async getHash(value) {
        const quantityCaracterSalt = 10;
        return await bcrypt.hash(value, quantityCaracterSalt);
    }

    static async compare(valueHash, valuePlainText) {
        return await bcrypt.compare(valuePlainText, valueHash);
    }
}

module.exports = Encode;