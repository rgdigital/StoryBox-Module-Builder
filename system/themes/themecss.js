module.exports = Object.create(null);
module.exports['default'] = function() {
    "undefined" != typeof document && function(e, t) {
        var n = e.createElement("style");
        if (e.getElementsByTagName("head")[0].appendChild(n), n.styleSheet) n.styleSheet.disabled || (n.styleSheet.cssText = t);
        else try {
            n.innerHTML = t
        } catch (e) {
            n.innerText = t
        }
    }(document, "@import url(\"https://fonts.googleapis.com/css?family=Montserrat:400,700\");body{font-family:'Montserrat'}");
}
module.exports['gsma'] = function() {
    "undefined" != typeof document && function(e, t) {
        var n = e.createElement("style");
        if (e.getElementsByTagName("head")[0].appendChild(n), n.styleSheet) n.styleSheet.disabled || (n.styleSheet.cssText = t);
        else try {
            n.innerHTML = t
        } catch (e) {
            n.innerText = t
        }
    }(document, "\nbody{background:red}");
}