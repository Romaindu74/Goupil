const Zlib = require('zlib');

exports.User = class {
    constructor(websocket, id) {
        this.websocket = websocket;
        this.id        = id;
    }

    on_message (data) {
        try {
            var buffer_decoded = Zlib.inflateSync(data);

            var encode_session = "";
            for (var i = 0; i < buffer_decoded.length; i++) {
                encode_session += String.fromCharCode(buffer_decoded[i]);
            }
        } catch (e) {
            var encode_session = data;
        }

        if (!encode_session || encode_session == '') {
            this.send('error', { type: 1001 });

            return Log.error(`Le client "${this.id}" a envoyé des données illisibles :(`);
        }

        if (this.key) {
            try {
                var decrypted = AES.decrypt(encode_session, this.key).toString(CryptoJS.enc.Utf8);
            } catch (e) {
                var decrypted = encode_session;
            }
        } else {
            var decrypted = encode_session;
        }

        if (decrypted == '') {
            var decrypted = encode_session;
        }

        try {
            var json = JSON.parse(decrypted);
        } catch (e) {
            try {
                var json = JSON.parse(data);
            } catch (e) {
                this.send('error', { type: 1001 });

                return Log.error(`Le message du client "${this.id}" n'a pas pu être décodé.`);
            }
        }

        return json;
    }

    send(event, data, encoding) { return this.fs(JSON.stringify({event: event, data: data}), encoding)}
    
    fs(data, encoding = false) {
        try {
            var data = typeof data == 'string' ? data : JSON.stringify(data);
        } catch {
            if (typeof data != 'string') {
                return Log.error(`Des données corrompues ont failli être envoyées au client "${this.id}".`);
            }
        }

        if (encoding && this.key) {
            try {
                var encrypted = AES.encrypt(data, this.key).toString();
            } catch (e) {
                return Log.error(`Le message ${data} n'a pas pu ếtre encodé.`);
            }
        } else {
            var encrypted = data;
        }

        try {
            var buffer_encoded = Zlib.deflateSync(new Uint8Array(encrypted.split('').map(function(x){return x.charCodeAt(0)})));
        } catch (e) {
            return Log.error(`Le message ${data} n'a pas pu être encodé. Ce message était destiné au client "${this.id}".`);
        }

        try {
            this.websocket.send(data);

            return true;
        } catch (e) {
            return Log.error(`Le message ${data} n'a pas réussi à être envoyé au client "${this.id}".`);
        }
    }
}