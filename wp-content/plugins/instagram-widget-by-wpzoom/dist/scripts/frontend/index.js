! function(t) {
    var e = {};

    function i(n) {
        if (e[n]) return e[n].exports;
        var o = e[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(o.exports, o, o.exports, i), o.l = !0, o.exports
    }
    i.m = t, i.c = e, i.d = function(t, e, n) {
        i.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: n
        })
    }, i.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, i.t = function(t, e) {
        if (1 & e && (t = i(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (i.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var o in t) i.d(n, o, function(e) {
                return t[e]
            }.bind(null, o));
        return n
    }, i.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return i.d(e, "a", e), e
    }, i.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, i.p = "", i(i.s = 11)
}({
    11: function(t, e) {
        function i(t) {
            return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        var n;
        (n = jQuery)(window).on("load", (function() {
            var t = !1;

            function e() {
                t || (t = !0, (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(t) {
                    window.setTimeout(t, 1e3 / 60)
                })(o))
            }

            function o() {
                n(".zoom-instagram-widget__items").zoomInstagramWidget(), t = !1
            }
            n.fn.zoomLoadAsyncImages = function() {
                return n(this).each((function() {
                    var t = n(this),
                        e = t.data("image-width"),
                        i = t.data("image-resolution"),
                        o = t.find("li").filter((function() {
                            return n(this).data("media-id")
                        })).map((function() {
                            return {
                                "media-id": n(this).attr("data-media-id"),
                                nonce: n(this).attr("data-nonce"),
                                "regenerate-thumbnails": n(this)[0].hasAttribute("data-regenerate-thumbnails")
                            }
                        }));
                    o.length && function n(o) {
                        if (0 != o.length) {
                            var a = o.shift();
                            wp.ajax.post("wpzoom_instagram_get_image_async", {
                                "media-id": a["media-id"],
                                nonce: a.nonce,
                                "image-resolution": i,
                                "image-width": e,
                                "regenerate-thumbnails": a["regenerate-thumbnails"]
                            }).done((function(e) {
                                t.find('li[data-media-id="' + a["media-id"] + '"] .zoom-instagram-link').css("background-image", "url(" + e.image_src + ")")
                            })).fail((function() {})).always((function() {
                                n(o)
                            }))
                        }
                    }(o.toArray())
                }))
            }, n.fn.zoomLightbox = function() {
                return n(this).each((function() {
                    var t = n(this).closest(".widget").find(".wpz-insta-lightbox-wrapper > .swiper-container");
                    if (t.length > 0) {
                        var e = t.find(".image-wrapper > .swiper-container");
                        new Swiper(t.get(0), {
                            direction: "horizontal",
                            loop: !1,
                            spaceBetween: 20,
                            autoHeight: !0,
                            watchOverflow: !0,
                            navigation: {
                                nextEl: t.find("> .swiper-button-next").get(0),
                                prevEl: t.find("> .swiper-button-prev").get(0)
                            },
                            keyboard: {
                                enabled: !0,
                                onlyInViewport: !0
                            }
                        }), e.each((function() {
                            new Swiper(n(this).get(0), {
                                direction: "horizontal",
                                loop: !1,
                                spaceBetween: 20,
                                nested: !0,
                                watchOverflow: !0,
                                pagination: {
                                    el: n(this).find("> .swiper-pagination").get(0),
                                    type: "bullets",
                                    clickable: !0,
                                    hideOnClick: !1
                                },
                                navigation: {
                                    nextEl: n(this).find("> .swiper-button-next").get(0),
                                    prevEl: n(this).find("> .swiper-button-prev").get(0)
                                },
                                keyboard: {
                                    enabled: !0,
                                    onlyInViewport: !0
                                }
                            })
                        })), n(this).find(".zoom-instagram-link").magnificPopup({
                            items: {
                                type: "inline",
                                src: n(this).closest(".widget").find(".wpz-insta-lightbox-wrapper")
                            },
                            closeBtnInside: !1,
                            mainClass: "wpzoom-lightbox",
                            midClick: !0,
                            callbacks: {
                                open: function() {
                                    var t = n.magnificPopup.instance.st.el,
                                        e = this.content.find("> .swiper-container").get(0).swiper;
                                    "object" === i(e) && e.slideTo(this.content.find('> .swiper-container > .swiper-wrapper > .swiper-slide[data-uid="' + t.data("mfp-src") + '"]').index())
                                }
                            }
                        }), n(this).find(".zoom-instagram-link").addClass("magnific-active")
                    }
                }))
            }, n.fn.zoomInstagramWidget = function() {
                return n(this).each((function() {
                    var t, e, i = n(this),
                        o = i.data("images-per-row"),
                        a = i.data("image-width"),
                        r = i.data("image-spacing"),
                        s = i.data("image-lazy-loading"),
                        d = i.width();
                    d / a < o ? (t = o, e = Math.floor((d - 1 - (o - 1) * r) / o)) : (t = Math.floor((d - 1) / a), e = Math.floor((d - 1 - (t - 1) * r) / t)), i.find("li").each((function(e) {
                        var i = ++e;
                        i % t == 1 ? n(this).css("clear", "left") : n(this).css("clear", "none"), i % t == 0 ? n(this).css("margin-right", "0") : (n(this).css("margin-right", r + "px"), n(this).css("margin-bottom", r + "px"))
                    })), i.find("a.zoom-instagram-link").css({
                        width: e,
                        height: e
                    }), s && i.find("a.zoom-instagram-link").lazy(), i.removeClass("zoom-instagram-widget__items--no-js")
                }))
            }, n(window).on("resize orientationchange", e), e(), n(".zoom-instagram-widget__items").zoomLoadAsyncImages(), n('.zoom-instagram-widget__items[data-lightbox="1"]').zoomLightbox();
            var a = _.debounce((function() {
                n(".zoom-instagram-widget__items").length && (n(".zoom-instagram-widget__items").zoomInstagramWidget(), n(".zoom-instagram-widget__items").zoomLoadAsyncImages())
            }), 1500);
            n(document).on("panels_setup_preview", a)
        }))
    }
});