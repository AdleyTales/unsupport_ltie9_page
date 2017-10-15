var DD_belatedPNG = {
    ns: "DD_belatedPNG", imgSize: {}, delay: 10, nodesFixed: 0, createVmlNameSpace: function () {
        document.namespaces && !document.namespaces[this.ns] && document.namespaces.add(this.ns, "urn:schemas-microsoft-com:vml")
    }, createVmlStyleSheet: function () {
        var a, b;
        a = document.createElement("style"), a.setAttribute("media", "screen"), document.documentElement.firstChild.insertBefore(a, document.documentElement.firstChild.firstChild), a.styleSheet && (a = a.styleSheet, a.addRule(this.ns + "\\:*", "{behavior:url(#default#VML)}"), a.addRule(this.ns + "\\:shape", "position:absolute;"), a.addRule("img." + this.ns + "_sizeFinder", "behavior:none; border:none; position:absolute; z-index:-1; top:-10000px; visibility:hidden;"), this.screenStyleSheet = a, b = document.createElement("style"), b.setAttribute("media", "print"), document.documentElement.firstChild.insertBefore(b, document.documentElement.firstChild.firstChild), b = b.styleSheet, b.addRule(this.ns + "\\:*", "{display: none !important;}"), b.addRule("img." + this.ns + "_sizeFinder", "{display: none !important;}"))
    }, readPropertyChange: function () {
        var a, b, c;
        if (a = event.srcElement, a.vmlInitiated) {
            if ((-1 != event.propertyName.search("background") || -1 != event.propertyName.search("border")) && DD_belatedPNG.applyVML(a), "style.display" == event.propertyName) {
                b = "none" == a.currentStyle.display ? "none" : "block";
                for (c in a.vml) a.vml.hasOwnProperty(c) && (a.vml[c].shape.style.display = b)
            }
            -1 != event.propertyName.search("filter") && DD_belatedPNG.vmlOpacity(a)
        }
    }, vmlOpacity: function (a) {
        if (-1 != a.currentStyle.filter.search("lpha")) {
            var b = a.currentStyle.filter;
            b = parseInt(b.substring(b.lastIndexOf("=") + 1, b.lastIndexOf(")")), 10) / 100, a.vml.color.shape.style.filter = a.currentStyle.filter, a.vml.image.fill.opacity = b
        }
    }, handlePseudoHover: function (a) {
        setTimeout(function () {
            DD_belatedPNG.applyVML(a)
        }, 1)
    }, fix: function (a) {
        if (this.screenStyleSheet) {
            var b, c;
            for (b = a.split(","), c = 0; c < b.length; c++) this.screenStyleSheet.addRule(b[c], "behavior:expression(DD_belatedPNG.fixPng(this))")
        }
    }, applyVML: function (a) {
        a.runtimeStyle.cssText = "", this.vmlFill(a), this.vmlOffsets(a), this.vmlOpacity(a), a.isImg && this.copyImageBorders(a)
    }, attachHandlers: function (a) {
        var b, c, d, e, f, g;
        if (b = this, c = {resize: "vmlOffsets", move: "vmlOffsets"}, "A" == a.nodeName) {
            e = {
                mouseleave: "handlePseudoHover",
                mouseenter: "handlePseudoHover",
                focus: "handlePseudoHover",
                blur: "handlePseudoHover"
            };
            for (f in e) e.hasOwnProperty(f) && (c[f] = e[f])
        }
        for (g in c) c.hasOwnProperty(g) && (d = function () {
            b[c[g]](a)
        }, a.attachEvent("on" + g, d));
        a.attachEvent("onpropertychange", this.readPropertyChange)
    }, giveLayout: function (a) {
        a.style.zoom = 1, "static" == a.currentStyle.position && (a.style.position = "relative")
    }, copyImageBorders: function (a) {
        var b, c;
        b = {borderStyle: !0, borderWidth: !0, borderColor: !0};
        for (c in b) b.hasOwnProperty(c) && (a.vml.color.shape.style[c] = a.currentStyle[c])
    }, vmlFill: function (a) {
        if (a.currentStyle) {
            var b, c, d, e, f, g;
            b = a.currentStyle;
            for (e in a.vml) a.vml.hasOwnProperty(e) && (a.vml[e].shape.style.zIndex = b.zIndex);
            a.runtimeStyle.backgroundColor = "", a.runtimeStyle.backgroundImage = "", c = !0, ("none" != b.backgroundImage || a.isImg) && (a.isImg ? a.vmlBg = a.src : (a.vmlBg = b.backgroundImage, a.vmlBg = a.vmlBg.substr(5, a.vmlBg.lastIndexOf('")') - 5)), d = this, d.imgSize[a.vmlBg] || (f = document.createElement("img"), d.imgSize[a.vmlBg] = f, f.className = d.ns + "_sizeFinder", f.runtimeStyle.cssText = "behavior:none; position:absolute; left:-10000px; top:-10000px; border:none; margin:0; padding:0;", g = function () {
                this.width = this.offsetWidth, this.height = this.offsetHeight, d.vmlOffsets(a)
            }, f.attachEvent("onload", g), f.src = a.vmlBg, f.removeAttribute("width"), f.removeAttribute("height"), document.body.insertBefore(f, document.body.firstChild)), a.vml.image.fill.src = a.vmlBg, c = !1), a.vml.image.fill.on = !c, a.vml.image.fill.color = "none", a.vml.color.shape.style.backgroundColor = b.backgroundColor, a.runtimeStyle.backgroundImage = "none", a.runtimeStyle.backgroundColor = "transparent"
        }
    }, vmlOffsets: function (a) {
        var b, c, d, e, f, g, h, i, j, k, l;
        if (b = a.currentStyle, c = {
                W: a.clientWidth + 1,
                H: a.clientHeight + 1,
                w: this.imgSize[a.vmlBg].width,
                h: this.imgSize[a.vmlBg].height,
                L: a.offsetLeft,
                T: a.offsetTop,
                bLW: a.clientLeft,
                bTW: a.clientTop
            }, d = c.L + c.bLW == 1 ? 1 : 0, e = function (a, b, c, d, e, f) {
                a.coordsize = d + "," + e, a.coordorigin = f + "," + f, a.path = "m0,0l" + d + ",0l" + d + "," + e + "l0," + e + " xe", a.style.width = d + "px", a.style.height = e + "px", a.style.left = b + "px", a.style.top = c + "px"
            }, e(a.vml.color.shape, c.L + (a.isImg ? 0 : c.bLW), c.T + (a.isImg ? 0 : c.bTW), c.W - 1, c.H - 1, 0), e(a.vml.image.shape, c.L + c.bLW, c.T + c.bTW, c.W, c.H, 1), f = {
                X: 0,
                Y: 0
            }, a.isImg) f.X = parseInt(b.paddingLeft, 10) + 1, f.Y = parseInt(b.paddingTop, 10) + 1; else for (j in f) f.hasOwnProperty(j) && this.figurePercentage(f, c, j, b["backgroundPosition" + j]);
        a.vml.image.fill.position = f.X / c.W + "," + f.Y / c.H, g = b.backgroundRepeat, h = {
            T: 1,
            R: c.W + d,
            B: c.H,
            L: 1 + d
        }, i = {X: {b1: "L", b2: "R", d: "W"}, Y: {b1: "T", b2: "B", d: "H"}}, "repeat" != g || a.isImg ? (k = {
            T: f.Y,
            R: f.X + c.w,
            B: f.Y + c.h,
            L: f.X
        }, -1 != g.search("repeat-") && (l = g.split("repeat-")[1].toUpperCase(), k[i[l].b1] = 1, k[i[l].b2] = c[i[l].d]), k.B > c.H && (k.B = c.H), a.vml.image.shape.style.clip = "rect(" + k.T + "px " + (k.R + d) + "px " + k.B + "px " + (k.L + d) + "px)") : a.vml.image.shape.style.clip = "rect(" + h.T + "px " + h.R + "px " + h.B + "px " + h.L + "px)"
    }, figurePercentage: function (a, b, c, d) {
        var e, f;
        switch (f = !0, e = "X" == c, d) {
            case"left":
            case"top":
                a[c] = 0;
                break;
            case"center":
                a[c] = .5;
                break;
            case"right":
            case"bottom":
                a[c] = 1;
                break;
            default:
                -1 != d.search("%") ? a[c] = parseInt(d, 10) / 100 : f = !1
        }
        return a[c] = Math.ceil(f ? b[e ? "W" : "H"] * a[c] - b[e ? "w" : "h"] * a[c] : parseInt(d, 10)), a[c] % 2 === 0 && a[c]++, a[c]
    }, fixPng: function (a) {
        a.style.behavior = "none";
        var b, c, d, e, f;
        if ("BODY" != a.nodeName && "TD" != a.nodeName && "TR" != a.nodeName) {
            if (a.isImg = !1, "IMG" == a.nodeName) {
                if (-1 == a.src.toLowerCase().search(/\.png$/)) return;
                a.isImg = !0, a.style.visibility = "hidden"
            } else if (-1 == a.currentStyle.backgroundImage.toLowerCase().search(".png")) return;
            b = DD_belatedPNG, a.vml = {color: {}, image: {}}, c = {shape: {}, fill: {}};
            for (e in a.vml) if (a.vml.hasOwnProperty(e)) {
                for (f in c) c.hasOwnProperty(f) && (d = b.ns + ":" + f, a.vml[e][f] = document.createElement(d));
                a.vml[e].shape.stroked = !1, a.vml[e].shape.appendChild(a.vml[e].fill), a.parentNode.insertBefore(a.vml[e].shape, a)
            }
            a.vml.image.shape.fillcolor = "none", a.vml.image.fill.type = "tile", a.vml.color.fill.on = !1, b.attachHandlers(a), b.giveLayout(a), b.giveLayout(a.offsetParent), a.vmlInitiated = !0, b.applyVML(a)
        }
    }
};
try {
    document.execCommand("BackgroundImageCache", !1, !0)
} catch (r) {
}
DD_belatedPNG.createVmlNameSpace(), DD_belatedPNG.createVmlStyleSheet();