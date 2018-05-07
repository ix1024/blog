export default {
    toast: function (msg) {
        if (typeof msg === 'string') {
            alert('提示：\n' + msg);
        }

    },
    splitTags: function (tags) {
        var _s = String.fromCharCode(31);
        tags = tags || '';
        tags = tags.replace(/\,/ig, _s);
        tags = tags.replace(/\，/ig, _s);
        tags = tags.split(_s);
        return tags;
    },

    removeArr: function (arr) {

        arr = arr || [];
        var temp = [];

        for (var i = 0; i < arr.length; i++) {
            var status = false;
            for (var j = 0; j < temp.length; j++) {
                if (arr[i] === temp[j]) {
                    status = true;
                    break;
                }
            }
            if (!status) {
                temp.push(arr[i]);
            }
        }

        return temp;

    },

    slice: function (str, length, symbol) {
        var result = '',
            sym = symbol || '...';

        if (!str || typeof str !== 'string' || !length) {
            result = str;
        } else {
            if (str.length < length) {
                sym = '';
            }
            result = str.slice(0, length) + sym;
        }

        return result;
    },

    strimHtml: function (str) {
        var reg = /<(?:.|\s)*?>/ig;
        return str.replace(reg, '');
    }
}