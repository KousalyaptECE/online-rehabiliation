! function(e) {
    var t = {};

    function l(n) {
        if (t[n]) return t[n].exports;
        var r = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(r.exports, r, r.exports, l), r.l = !0, r.exports
    }
    l.m = e, l.c = t, l.d = function(e, t, n) {
        l.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }, l.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, l.t = function(e, t) {
        if (1 & t && (e = l(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (l.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var r in e) l.d(n, r, function(t) {
                return e[t]
            }.bind(null, r));
        return n
    }, l.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return l.d(t, "a", t), t
    }, l.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, l.p = "", l(l.s = 8)
}({
    8: function(e, t, l) {
        "use strict";
        l.r(t);
        l(9);
        ! function() {
            var e = document.querySelector(".wp-block-llms-lite-lms-progress-tracker"),
                t = e ? e.querySelector(".llms-lite-lms-btn--complete") : null,
                l = e ? e.querySelector(".llms-lite-lms-btn--incomplete") : null,
                n = e ? e.querySelector(".llms-lite-lms-msg--complete") : null,
                r = e ? e.querySelector(".llms-lite-lms-msg--incomplete") : null;

            function o() {
                var t = e ? e.dataset.postId : null;
                return t ? "llms-lite-lms-".concat(t) : null
            }

            function u() {
                window.localStorage.getItem(o()) ? (r.style.display = "none", t.style.display = "none", n.style.display = null, l.style.display = null) : (r.style.display = null, t.style.display = null, n.style.display = "none", l.style.display = "none")
            }
            e && (u(), e.classList.add("ready"), t.querySelector("a").addEventListener("click", (function() {
                window.localStorage.setItem(o(), Date.now() / 1e3), u()
            })), l.querySelector("a").addEventListener("click", (function() {
                window.localStorage.removeItem(o()), u()
            })))
        }()
    },
    9: function(e, t, l) {}
});