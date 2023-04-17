/*!
 * jQuery Upload File Plugin
 * version: 3.1.2
 * @requires jQuery v1.5 or later & form plugin
 * Copyright (c) 2013 Ravishanker Kusuma
 * http://hayageek.com/
 */
(function(b) {
    if (b.fn.ajaxForm == undefined) {}
    var a = {};
    a.fileapi = b("<input type='file'/>").get(0).files !== undefined;
    a.formdata = window.FormData !== undefined;
    b.fn.uploadFile = function(t) {
        var r = b.extend({
            url: "",
            method: "POST",
            enctype: "multipart/form-data",
            formData: null,
            returnType: null,
            allowedTypes: "*",
            fileName: "file",
            formData: {},
            dynamicFormData: function() {
                return {}
            },
            maxFileSize: -1,
            maxFileCount: -1,
            multiple: true,
            dragDrop: true,
            autoSubmit: true,
            showCancel: true,
            showAbort: true,
            showDone: true,
            showDelete: false,
            showError: true,
            showStatusAfterSuccess: true,
            showStatusAfterError: true,
            showFileCounter: true,
            fileCounterStyle: "). ",
            showProgress: false,
            onSelect: function(s) {
                return true
            },
            onSubmit: function(s, u) {},
            onSuccess: function(u, s, v) {},
            onError: function(v, s, u) {},
            deleteCallback: false,
            afterUploadAll: false,
            uploadButtonClass: "upload",
            dragDropStr: "",
            abortStr: "Abort",
            cancelStr: "Cancel",
            deletelStr: "Delete",
            doneStr: "Done",
            multiDragErrorStr: "Multiple File Drag &amp; Drop is not allowed.",
            extErrorStr: "",
            sizeErrorStr: "",
            uploadErrorStr: "Upload is not allowed",
            maxFileCountErrorStr: ""
        }, t);
        this.fileCounter = 1;
        this.selectedFiles = 0;
        this.fCounter = 0;
        this.sCounter = 0;
        this.tCounter = 0;
        var d = "upload-" + (new Date().getTime());
        this.formGroup = d;
        this.hide();
        this.errorLog = b("<div></div>");
        this.after(this.errorLog);
        this.responses = [];
        if (!a.formdata) {
            r.dragDrop = false
        }
        if (!a.formdata) {
            r.multiple = false
        }
        var m = this;
        var e = b("<div>" + b(this).html() + "</div>");
        b(e).addClass(r.uploadButtonClass);
        (function k() {
            if (b.fn.ajaxForm) {
                if (r.dragDrop) {
                    var s = b('<div class="ajax-upload-dragdrop" style="vertical-align:top;"></div>');
                    b(m).before(s);
                    b(s).append(e);
                    b(s).prepend(b(r.dragDropStr));
                    f(m, r, s)
                } else {
                    b(m).before(e)
                }
                q(m, d, r, e)
            } else {
                window.setTimeout(k, 10)
            }
        })();
        this.startUpload = function() {
            b("." + this.formGroup).each(function(u, s) {
                if (b(this).is("form")) {
                    b(this).submit()
                }
            })
        };
        this.stopUpload = function() {
            b(".upload-red").each(function(u, s) {
                if (b(this).hasClass(m.formGroup)) {
                    b(this).click()
                }
            })
        };
        this.getResponses = function() {
            return this.responses
        };
        var g = false;

        function j() {
            if (r.afterUploadAll && !g) {
                g = true;
                (function s() {
                    if (m.sCounter != 0 && (m.sCounter + m.fCounter == m.tCounter)) {
                        r.afterUploadAll(m);
                        g = false
                    } else {
                        window.setTimeout(s, 100)
                    }
                })()
            }
        }

        function f(w, u, v) {
            v.on("dragenter", function(s) {
                s.stopPropagation();
                s.preventDefault();
                b(this).css("border", "2px dashed #ddd")
            });
            v.on("dragover", function(s) {
                s.stopPropagation();
                s.preventDefault()
            });
            v.on("drop", function(x) {
                b(this).css("border", "2px dashed #ddd");
                x.preventDefault();
                w.errorLog.html("");
                var s = x.originalEvent.dataTransfer.files;
                if (!u.multiple && s.length > 1) {
                    if (u.showError) {
                        b("<div class='um-error-block'>" + u.multiDragErrorStr + "</div>").appendTo(w.errorLog)
                    }
                    return
                }
                if (u.onSelect(s) == false) {
                    return
                }
                l(u, w, s)
            });
            b(document).on("dragenter", function(s) {
                s.stopPropagation();
                s.preventDefault()
            });
            b(document).on("dragover", function(s) {
                s.stopPropagation();
                s.preventDefault();
                v.css("border", "2px dashed #ddd")
            });
            b(document).on("drop", function(s) {
                s.stopPropagation();
                s.preventDefault();
                v.css("border", "2px dashed #ddd")
            })
        }

        function i(s) {
            var v = "";
            var u = s / 1024;
            if (parseInt(u) > 1024) {
                var w = u / 1024;
                v = w.toFixed(2) + " MB"
            } else {
                v = u.toFixed(2) + " KB"
            }
            return v
        }

        function o(x) {
            var y = [];
            if (jQuery.type(x) == "string") {
                y = x.split("&")
            } else {
                y = b.param(x).split("&")
            }
            var u = y.length;
            var s = [];
            var w, v;
            for (w = 0; w < u; w++) {
                y[w] = y[w].replace(/\+/g, " ");
                v = y[w].split("=");
                s.push([decodeURIComponent(v[0]), decodeURIComponent(v[1])])
            }
            return s
        }

        function l(H, B, u) {
            for (var C = 0; C < u.length; C++) {
                if (!c(B, H, u[C].name)) {
                    if (H.showError) {
                        b("<div class='um-error-block'>" + H.extErrorStr + "</div>").appendTo(B.errorLog)
                    }
                    continue
                }
                if (H.maxFileSize != -1 && u[C].size > H.maxFileSize) {
                    if (H.showError) {
                        b("<div class='um-error-block'>" + H.sizeErrorStr + "</div>").appendTo(B.errorLog)
                    }
                    continue
                }
                if (H.maxFileCount != -1 && B.selectedFiles >= H.maxFileCount) {
                    if (H.showError) {
                        b("<div class='um-error-block'>" + H.maxFileCountErrorStr + "</div>").appendTo(B.errorLog)
                    }
                    continue
                }
                B.selectedFiles++;
                var D = H;
                var w = new FormData();
                var A = H.fileName.replace("[]", "");
                w.append(A, u[C]);
                var y = H.formData;
                if (y) {
                    var F = o(y);
                    for (var z = 0; z < F.length; z++) {
                        if (F[z]) {
                            w.append(F[z][0], F[z][1])
                        }
                    }
                }
                D.fileData = w;
                var E = new p(B, H);
                var G = "";
                if (H.showFileCounter) {
                    G = B.fileCounter + H.fileCounterStyle + u[C].name
                } else {
                    G = u[C].name
                } /*E.filename.html(G);*/
                var v = b("<form style='display:block; position:absolute;left: 150px;' class='" + B.formGroup + "' method='" + H.method + "' action='" + H.url + "' enctype='" + H.enctype + "'></form>");
                v.appendTo("body");
                var x = [];
                x.push(u[C].name);
                n(v, D, E, x, B);
                B.fileCounter++
            }
        }

        function c(w, v, y) {
            var x = v.allowedTypes.toLowerCase().split(",");
            var u = y.split(".").pop().toLowerCase();
            if (v.allowedTypes != "*" && jQuery.inArray(u, x) < 0) {
                return false
            }
            return true
        }

        function h(u, w) {
            if (u.showFileCounter) {
                var v = b(".upload-filename").length;
                w.fileCounter = v + 1;
                b(".upload-filename").each(function(A, y) {
                    var s = b(this).html().split(u.fileCounterStyle);
                    var x = parseInt(s[0]) - 1;
                    var z = v + u.fileCounterStyle + s[1];
                    b(this).html(z);
                    v--
                })
            }
        }

        function q(y, B, D, u) {
            var A = "ajax-upload-id-" + (new Date().getTime());
            var w = b("<form method='" + D.method + "' action='" + D.url + "' enctype='" + D.enctype + "'></form>");
            var v = "<input type='file' id='" + A + "' name='" + D.fileName + "'/>";
            if (D.multiple) {
                if (D.fileName.indexOf("[]") != D.fileName.length - 2) {
                    D.fileName += "[]"
                }
                v = "<input type='file' id='" + A + "' name='" + D.fileName + "' multiple/>"
            }
            var z = b(v).appendTo(w);
            z.change(function() {
                y.errorLog.html("");
                var K = D.allowedTypes.toLowerCase().split(",");
                var G = [];
                if (this.files) {
                    for (H = 0; H < this.files.length; H++) {
                        G.push(this.files[H].name)
                    }
                    if (D.onSelect(this.files) == false) {
                        return
                    }
                } else {
                    var I = b(this).val();
                    var F = [];
                    G.push(I);
                    if (!c(y, D, I)) {
                        if (D.showError) {
                            b("<div class='um-error-block'>" + D.extErrorStr + "</div>").appendTo(y.errorLog)
                        }
                        return
                    }
                    F.push({
                        name: I,
                        size: "NA"
                    });
                    if (D.onSelect(F) == false) {
                        return
                    }
                }
                h(D, y);
                u.unbind("click");
                w.hide();
                q(y, B, D, u);
                w.addClass(B);
                if (a.fileapi && a.formdata) {
                    w.removeClass(B);
                    var J = this.files;
                    l(D, y, J)
                } else {
                    var E = "";
                    for (var H = 0; H < G.length; H++) {
                        if (D.showFileCounter) {
                            E += y.fileCounter + D.fileCounterStyle + G[H] + "<br>"
                        } else {
                            E += G[H] + "<br>"
                        }
                        y.fileCounter++
                    }
                    if (D.maxFileCount != -1 && (y.selectedFiles + G.length) > D.maxFileCount) {
                        if (D.showError) {
                            b("<div class='um-error-block'>" + D.maxFileCountErrorStr + "</div>").appendTo(y.errorLog)
                        }
                        return
                    }
                    y.selectedFiles += G.length;
                    var s = new p(y, D);
                    s.filename.html(E);
                    n(w, D, s, G, y)
                }
            });
            w.css({
                margin: 0,
                padding: 0
            });
            var C = b(u).width() + 10;
            if (C == 10) {
                C = 120
            }
            var x = u.height() + 10;
            if (x == 10) {
                x = 35
            }
            u.css({
                position: "relative",
                overflow: "hidden",
                cursor: "default"
            });
            z.css({
                position: "absolute",
                cursor: "pointer",
                top: "0px",
                width: '100%',
                height: '34px',
                left: "0px",
                "z-index": "100",
                opacity: "0.0",
                filter: "alpha(opacity=0)",
                "-ms-filter": "alpha(opacity=0)",
                "-khtml-opacity": "0.0",
                "-moz-opacity": "0.0"
            });
            w.appendTo(u)
        }

        function p(v, u) {
            this.statusbar = b("<div class='upload-statusbar'></div>"); /*this.filename=b("<div class='upload-filename'></div>").appendTo(this.statusbar);*/
            this.progressDiv = b("<div class='upload-progress'>").appendTo(this.statusbar).hide();
            this.progressbar = b("<div class='upload-bar " + v.formGroup + "'></div>").appendTo(this.progressDiv);
            this.abort = b("<div class='upload-red " + v.formGroup + "'>" + u.abortStr + "</div>").appendTo(this.statusbar).hide();
            this.cancel = b("<div class='upload-red'>" + u.cancelStr + "</div>").appendTo(this.statusbar).hide();
            this.done = b("<div class='upload-green'>" + u.doneStr + "</div>").appendTo(this.statusbar).hide();
            this.del = b("<div class='upload-red'>" + u.deletelStr + "</div>").appendTo(this.statusbar).hide();
            v.errorLog.after(this.statusbar);
            return this
        }

        function n(z, y, u, w, A) {
            var x = null;
            var v = {
                cache: false,
                contentType: false,
                processData: false,
                forceSync: false,
                data: y.formData,
                formData: y.fileData,
                dataType: y.returnType,
                beforeSubmit: function(F, C, E) {
                    if (y.onSubmit.call(this, w) != false) {
                        var B = y.dynamicFormData();
                        if (B) {
                            var s = o(B);
                            if (s) {
                                for (var D = 0; D < s.length; D++) {
                                    if (s[D]) {
                                        if (y.fileData != undefined) {
                                            E.formData.append(s[D][0], s[D][1])
                                        } else {
                                            E.data[s[D][0]] = s[D][1]
                                        }
                                    }
                                }
                            }
                        }
                        A.tCounter += w.length;
                        j();
                        return true
                    }
                    u.statusbar.append("<div class='um-error-block'>" + y.uploadErrorStr + "</div>");
                    u.cancel.show();
                    z.remove();
                    u.cancel.click(function() {
                        u.statusbar.remove()
                    });
                    return false
                },
                beforeSend: function(B, s) {
                    u.progressDiv.show();
                    u.cancel.hide();
                    u.done.hide();
                    if (y.showAbort) {
                        u.abort.show();
                        u.abort.click(function() {
                            B.abort();
                            A.selectedFiles -= w.length
                        })
                    }
                    if (!a.formdata) {
                        u.progressbar.width("5%")
                    } else {
                        u.progressbar.width("1%")
                    }
                },
                uploadProgress: function(E, s, D, C) {
                    if (C > 98) {
                        C = 98
                    }
                    var B = C + "%";
                    if (C > 1) {
                        u.progressbar.width(B)
                    }
                    if (y.showProgress) {
                        u.progressbar.html(B);
                        u.progressbar.css("text-align", "center")
                    }
                },
                success: function(B, s, C) {
                    A.responses.push(B);
                    u.progressbar.width("100%");
                    if (y.showProgress) {
                        u.progressbar.html("100%");
                        u.progressbar.css("text-align", "center")
                    }
                    u.abort.hide();
                    y.onSuccess.call(this, w, B, C);
                    if (y.showStatusAfterSuccess) {
                        if (y.showDone) {
                            u.done.show();
                            u.done.click(function() {
                                u.statusbar.hide("slow");
                                u.statusbar.remove()
                            })
                        } else {
                            u.done.hide()
                        }
                        if (y.showDelete) {
                            u.del.show();
                            u.del.click(function() {
                                u.statusbar.hide().remove();
                                if (y.deleteCallback) {
                                    y.deleteCallback.call(this, B, u)
                                }
                                A.selectedFiles -= w.length;
                                h(y, A)
                            })
                        } else {
                            u.del.hide()
                        }
                    } else {
                        u.statusbar.hide("slow");
                        u.statusbar.remove()
                    }
                    z.remove();
                    A.sCounter += w.length
                },
                error: function(C, s, B) {
                    u.abort.hide();
                    if (C.statusText == "abort") {
                        u.statusbar.hide("slow").remove();
                        h(y, A)
                    } else {
                        y.onError.call(this, w, s, B);
                        if (y.showStatusAfterError) {
                            u.progressDiv.hide();
                            u.statusbar.append("<span class='um-error-block'>ERROR: " + B + "</span>")
                        } else {
                            u.statusbar.hide();
                            u.statusbar.remove()
                        }
                        A.selectedFiles -= w.length
                    }
                    z.remove();
                    A.fCounter += w.length
                }
            };
            if (y.autoSubmit) {
                z.ajaxSubmit(v)
            } else {
                if (y.showCancel) {
                    u.cancel.show();
                    u.cancel.click(function() {
                        z.remove();
                        u.statusbar.remove();
                        A.selectedFiles -= w.length;
                        h(y, A)
                    })
                }
                z.ajaxForm(v)
            }
        }
        return this
    }
}(jQuery));