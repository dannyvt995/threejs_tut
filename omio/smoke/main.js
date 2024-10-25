function Ca(r) {
    var w = 0;
    return function() {
        return w < r.length ? {
            done: !1,
            value: r[w++]
        } : {
            done: !0
        }
    }
}
function Jc(r) {
    var w = "undefined" != typeof Symbol && Symbol.iterator && r[Symbol.iterator];
    return w ? w.call(r) : {
        next: Ca(r)
    }
}
var ed = "function" == typeof Object.create ? Object.create : function(r) {
    function w() {}
    w.prototype = r;
    return new w
}
  , qe = "function" == typeof Object.defineProperties ? Object.defineProperty : function(r, w, v) {
    if (r == Array.prototype || r == Object.prototype)
        return r;
    r[w] = v.value;
    return r
}
;
function ye(r) {
    r = ["object" == typeof globalThis && globalThis, r, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var w = 0; w < r.length; ++w) {
        var v = r[w];
        if (v && v.Math == Math)
            return v
    }
    throw Error("Cannot find global object");
}
var mg = ye(this);
function ng(r, w) {
    if (w)
        a: {
            var v = mg;
            r = r.split(".");
            for (var H = 0; H < r.length - 1; H++) {
                var na = r[H];
                if (!(na in v))
                    break a;
                v = v[na]
            }
            r = r[r.length - 1];
            H = v[r];
            w = w(H);
            w != H && null != w && qe(v, r, {
                configurable: !0,
                writable: !0,
                value: w
            })
        }
}
var xg;
if ("function" == typeof Object.setPrototypeOf)
    xg = Object.setPrototypeOf;
else {
    var yg;
    a: {
        var zg = {
            a: !0
        }
          , Ag = {};
        try {
            Ag.__proto__ = zg;
            yg = Ag.a;
            break a
        } catch (r) {}
        yg = !1
    }
    xg = yg ? function(r, w) {
        r.__proto__ = w;
        if (r.__proto__ !== w)
            throw new TypeError(r + " is not extensible");
        return r
    }
    : null
}
var Bg = xg;
function Cg(r, w) {
    r.prototype = ed(w.prototype);
    r.prototype.constructor = r;
    if (Bg)
        Bg(r, w);
    else
        for (var v in w)
            if ("prototype" != v)
                if (Object.defineProperties) {
                    var H = Object.getOwnPropertyDescriptor(w, v);
                    H && Object.defineProperty(r, v, H)
                } else
                    r[v] = w[v];
    r.cg = w.prototype
}
ng("Symbol", function(r) {
    function w(ia) {
        if (this instanceof w)
            throw new TypeError("Symbol is not a constructor");
        return new v(H + (ia || "") + "_" + na++,ia)
    }
    function v(ia, vb) {
        this.De = ia;
        qe(this, "description", {
            configurable: !0,
            writable: !0,
            value: vb
        })
    }
    if (r)
        return r;
    v.prototype.toString = function() {
        return this.De
    }
    ;
    var H = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_"
      , na = 0;
    return w
});
ng("Symbol.iterator", function(r) {
    if (r)
        return r;
    r = Symbol("Symbol.iterator");
    for (var w = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), v = 0; v < w.length; v++) {
        var H = mg[w[v]];
        "function" === typeof H && "function" != typeof H.prototype[r] && qe(H.prototype, r, {
            configurable: !0,
            writable: !0,
            value: function() {
                return Zg(Ca(this))
            }
        })
    }
    return r
});
function Zg(r) {
    r = {
        next: r
    };
    r[Symbol.iterator] = function() {
        return this
    }
    ;
    return r
}
function $g(r, w) {
    r instanceof String && (r += "");
    var v = 0
      , H = !1
      , na = {
        next: function() {
            if (!H && v < r.length) {
                var ia = v++;
                return {
                    value: w(ia, r[ia]),
                    done: !1
                }
            }
            H = !0;
            return {
                done: !0,
                value: void 0
            }
        }
    };
    na[Symbol.iterator] = function() {
        return na
    }
    ;
    return na
}
ng("Array.prototype.keys", function(r) {
    return r ? r : function() {
        return $g(this, function(w) {
            return w
        })
    }
});
ng("Object.is", function(r) {
    return r ? r : function(w, v) {
        return w === v ? 0 !== w || 1 / w === 1 / v : w !== w && v !== v
    }
});
ng("Array.prototype.includes", function(r) {
    return r ? r : function(w, v) {
        var H = this;
        H instanceof String && (H = String(H));
        var na = H.length;
        v = v || 0;
        for (0 > v && (v = Math.max(v + na, 0)); v < na; v++) {
            var ia = H[v];
            if (ia === w || Object.is(ia, w))
                return !0
        }
        return !1
    }
});
ng("String.prototype.includes", function(r) {
    return r ? r : function(w, v) {
        if (null == this)
            throw new TypeError("The 'this' value for String.prototype.includes must not be null or undefined");
        if (w instanceof RegExp)
            throw new TypeError("First argument to String.prototype.includes must not be a regular expression");
        return -1 !== (this + "").indexOf(w, v || 0)
    }
});
ng("Array.prototype.values", function(r) {
    return r ? r : function() {
        return $g(this, function(w, v) {
            return v
        })
    }
});
function ah(r, w) {
    return Object.prototype.hasOwnProperty.call(r, w)
}
ng("WeakMap", function(r) {
    function w(B) {
        this.sc = (C += Math.random() + 1).toString();
        if (B) {
            B = Jc(B);
            for (var E; !(E = B.next()).done; )
                E = E.value,
                this.set(E[0], E[1])
        }
    }
    function v() {}
    function H(B) {
        var E = typeof B;
        return "object" === E && null !== B || "function" === E
    }
    function na(B) {
        if (!ah(B, vb)) {
            var E = new v;
            qe(B, vb, {
                value: E
            })
        }
    }
    function ia(B) {
        var E = Object[B];
        E && (Object[B] = function(sa) {
            if (sa instanceof v)
                return sa;
            Object.isExtensible(sa) && na(sa);
            return E(sa)
        }
        )
    }
    if (function() {
        if (!r || !Object.seal)
            return !1;
        try {
            var B = Object.seal({})
              , E = Object.seal({})
              , sa = new r([[B, 2], [E, 3]]);
            if (2 != sa.get(B) || 3 != sa.get(E))
                return !1;
            sa.delete(B);
            sa.set(E, 4);
            return !sa.has(B) && 4 == sa.get(E)
        } catch (Vb) {
            return !1
        }
    }())
        return r;
    var vb = "$jscomp_hidden_" + Math.random();
    ia("freeze");
    ia("preventExtensions");
    ia("seal");
    var C = 0;
    w.prototype.set = function(B, E) {
        if (!H(B))
            throw Error("Invalid WeakMap key");
        na(B);
        if (!ah(B, vb))
            throw Error("WeakMap key fail: " + B);
        B[vb][this.sc] = E;
        return this
    }
    ;
    w.prototype.get = function(B) {
        return H(B) && ah(B, vb) ? B[vb][this.sc] : void 0
    }
    ;
    w.prototype.has = function(B) {
        return H(B) && ah(B, vb) && ah(B[vb], this.sc)
    }
    ;
    w.prototype.delete = function(B) {
        return H(B) && ah(B, vb) && ah(B[vb], this.sc) ? delete B[vb][this.sc] : !1
    }
    ;
    return w
});
ng("Map", function(r) {
    function w() {
        var C = {};
        return C.Fb = C.next = C.head = C
    }
    function v(C, B) {
        var E = C.Cb;
        return Zg(function() {
            if (E) {
                for (; E.head != C.Cb; )
                    E = E.Fb;
                for (; E.next != E.head; )
                    return E = E.next,
                    {
                        done: !1,
                        value: B(E)
                    };
                E = null
            }
            return {
                done: !0,
                value: void 0
            }
        })
    }
    function H(C, B) {
        var E = B && typeof B;
        "object" == E || "function" == E ? ia.has(B) ? E = ia.get(B) : (E = "" + ++vb,
        ia.set(B, E)) : E = "p_" + B;
        var sa = C.lc[E];
        if (sa && ah(C.lc, E))
            for (C = 0; C < sa.length; C++) {
                var Vb = sa[C];
                if (B !== B && Vb.key !== Vb.key || B === Vb.key)
                    return {
                        id: E,
                        list: sa,
                        index: C,
                        Da: Vb
                    }
            }
        return {
            id: E,
            list: sa,
            index: -1,
            Da: void 0
        }
    }
    function na(C) {
        this.lc = {};
        this.Cb = w();
        this.size = 0;
        if (C) {
            C = Jc(C);
            for (var B; !(B = C.next()).done; )
                B = B.value,
                this.set(B[0], B[1])
        }
    }
    if (function() {
        if (!r || "function" != typeof r || !r.prototype.entries || "function" != typeof Object.seal)
            return !1;
        try {
            var C = Object.seal({
                x: 4
            })
              , B = new r(Jc([[C, "s"]]));
            if ("s" != B.get(C) || 1 != B.size || B.get({
                x: 4
            }) || B.set({
                x: 4
            }, "t") != B || 2 != B.size)
                return !1;
            var E = B.entries()
              , sa = E.next();
            if (sa.done || sa.value[0] != C || "s" != sa.value[1])
                return !1;
            sa = E.next();
            return sa.done || 4 != sa.value[0].x || "t" != sa.value[1] || !E.next().done ? !1 : !0
        } catch (Vb) {
            return !1
        }
    }())
        return r;
    var ia = new WeakMap;
    na.prototype.set = function(C, B) {
        C = 0 === C ? 0 : C;
        var E = H(this, C);
        E.list || (E.list = this.lc[E.id] = []);
        E.Da ? E.Da.value = B : (E.Da = {
            next: this.Cb,
            Fb: this.Cb.Fb,
            head: this.Cb,
            key: C,
            value: B
        },
        E.list.push(E.Da),
        this.Cb.Fb.next = E.Da,
        this.Cb.Fb = E.Da,
        this.size++);
        return this
    }
    ;
    na.prototype.delete = function(C) {
        C = H(this, C);
        return C.Da && C.list ? (C.list.splice(C.index, 1),
        C.list.length || delete this.lc[C.id],
        C.Da.Fb.next = C.Da.next,
        C.Da.next.Fb = C.Da.Fb,
        C.Da.head = null,
        this.size--,
        !0) : !1
    }
    ;
    na.prototype.clear = function() {
        this.lc = {};
        this.Cb = this.Cb.Fb = w();
        this.size = 0
    }
    ;
    na.prototype.has = function(C) {
        return !!H(this, C).Da
    }
    ;
    na.prototype.get = function(C) {
        return (C = H(this, C).Da) && C.value
    }
    ;
    na.prototype.entries = function() {
        return v(this, function(C) {
            return [C.key, C.value]
        })
    }
    ;
    na.prototype.keys = function() {
        return v(this, function(C) {
            return C.key
        })
    }
    ;
    na.prototype.values = function() {
        return v(this, function(C) {
            return C.value
        })
    }
    ;
    na.prototype.forEach = function(C, B) {
        for (var E = this.entries(), sa; !(sa = E.next()).done; )
            sa = sa.value,
            C.call(B, sa[1], sa[0], this)
    }
    ;
    na.prototype[Symbol.iterator] = na.prototype.entries;
    var vb = 0;
    return na
});
ng("Set", function(r) {
    function w(v) {
        this.kb = new Map;
        if (v) {
            v = Jc(v);
            for (var H; !(H = v.next()).done; )
                this.add(H.value)
        }
        this.size = this.kb.size
    }
    if (function() {
        if (!r || "function" != typeof r || !r.prototype.entries || "function" != typeof Object.seal)
            return !1;
        try {
            var v = Object.seal({
                x: 4
            })
              , H = new r(Jc([v]));
            if (!H.has(v) || 1 != H.size || H.add(v) != H || 1 != H.size || H.add({
                x: 4
            }) != H || 2 != H.size)
                return !1;
            var na = H.entries()
              , ia = na.next();
            if (ia.done || ia.value[0] != v || ia.value[1] != v)
                return !1;
            ia = na.next();
            return ia.done || ia.value[0] == v || 4 != ia.value[0].x || ia.value[1] != ia.value[0] ? !1 : na.next().done
        } catch (vb) {
            return !1
        }
    }())
        return r;
    w.prototype.add = function(v) {
        v = 0 === v ? 0 : v;
        this.kb.set(v, v);
        this.size = this.kb.size;
        return this
    }
    ;
    w.prototype.delete = function(v) {
        v = this.kb.delete(v);
        this.size = this.kb.size;
        return v
    }
    ;
    w.prototype.clear = function() {
        this.kb.clear();
        this.size = 0
    }
    ;
    w.prototype.has = function(v) {
        return this.kb.has(v)
    }
    ;
    w.prototype.entries = function() {
        return this.kb.entries()
    }
    ;
    w.prototype.values = function() {
        return this.kb.values()
    }
    ;
    w.prototype.keys = w.prototype.values;
    w.prototype[Symbol.iterator] = w.prototype.values;
    w.prototype.forEach = function(v, H) {
        var na = this;
        this.kb.forEach(function(ia) {
            return v.call(H, ia, ia, na)
        })
    }
    ;
    return w
});
(function(r) {
    function w() {
        this.touches = []
    }
    function v(a, b) {
        this.tc = this.Qc = !1;
        this.ce = this.Kb = this.Lb = this.C = this.D = 0;
        this.yc = this.Ed = !1;
        this.ac = this.bc = this.x = this.y = this.mc = this.nc = 0;
        this.id = a;
        this.Of = b
    }
    function H() {
        this.Cd = this.Bd = this.nc = this.mc = this.D = this.C = this.y = this.x = this.Lb = this.Kb = this.bc = this.ac = 0;
        this.Ad = this.qe = this.xd = this.zd = this.pe = this.wd = this.right = this.left = this.te = !1;
        this.ae = 0;
        this.$b = this.rc = !1
    }
    function na() {
        this.re = new Set;
        this.vd = new Set;
        this.Jd = new Set;
        this.be = new Set;
        this.keys = new Jd
    }
    function ia() {}
    function vb(a, b, c, g, f) {
        this.Pc = new H;
        this.touches = new w;
        this.keyboard = g ? new na : null;
        this.Pa = 0;
        this.dd(a, c, b, f)
    }
    function C() {}
    function B() {
        return bd.apply(this, arguments) || this
    }
    function E() {
        return bd.apply(this, arguments) || this
    }
    function sa() {
        return bd.apply(this, arguments) || this
    }
    function Vb() {
        return Zb.apply(this, arguments) || this
    }
    function ze() {
        return ld.apply(this, arguments) || this
    }
    function re(a, b, c) {
        O.xa = !0;
        var g = O.call(this) || this;
        O.xa = !1;
        g.$(a, b, c);
        return g
    }
    function md(a) {
        O.xa = !0;
        var b = O.call(this) || this;
        O.xa = !1;
        b.$(a);
        return b
    }
    function nd(a) {
        O.xa = !0;
        var b = O.call(this) || this;
        O.xa = !1;
        b.$(a);
        return b
    }
    function fd(a, b) {
        O.xa = !0;
        var c = O.call(this) || this;
        O.xa = !1;
        c.$(a, b);
        return c
    }
    function og(a) {
        var b = O.call(this, a) || this;
        b.buffer = new fd(a,34963);
        return b
    }
    function Gc(a, b) {
        O.xa = !0;
        var c = O.call(this) || this;
        O.xa = !1;
        c.$(a, b);
        return c
    }
    function Kd(a, b, c) {
        null == c && (c = 0);
        this.buffer = a;
        a = a.buffer;
        switch (a.m) {
        case 0:
            var g = a.buffer.g;
            break;
        case 1:
            g = a.buffer.g
        }
        this.g = g;
        this.location = b;
        this.ld = c
    }
    function Kc(a) {
        var b = O.call(this, a) || this;
        b.Wc = 33071;
        b.Xc = 33071;
        b.Gb = 9729;
        b.qa = a.createTexture();
        b.ee = new Ld(a,[b],!1);
        return b
    }
    function sc(a) {
        O.xa = !0;
        var b = O.call(this) || this;
        O.xa = !1;
        b.$(a);
        return b
    }
    function se(a, b, c, g, f, d) {
        null == d && (d = 9728);
        null == f && (f = 1);
        this.Vc = 0;
        this.nd = [];
        this.Ia = [[], []];
        this.M = a;
        for (var h = 0; h < f; ) {
            ++h;
            var n = a.createTexture(b, c, g)
              , l = a.createTexture(b, c, g);
            n.Gb = d;
            n.g.bindTexture(3553, n.qa);
            switch (d) {
            case 9728:
                n.g.texParameteri(3553, 10240, 9728);
                n.g.texParameteri(3553, 10241, 9728);
                break;
            case 9729:
                n.g.texParameteri(3553, 10240, 9729),
                n.g.texParameteri(3553, 10241, 9729)
            }
            n.g.bindTexture(3553, null);
            l.Gb = d;
            l.g.bindTexture(3553, l.qa);
            switch (d) {
            case 9728:
                l.g.texParameteri(3553, 10240, 9728);
                l.g.texParameteri(3553, 10241, 9728);
                break;
            case 9729:
                l.g.texParameteri(3553, 10240, 9729),
                l.g.texParameteri(3553, 10241, 9729)
            }
            l.g.bindTexture(3553, null);
            this.Ia[0].push(n);
            this.Ia[1].push(l)
        }
        this.nd.push(new Ld(a.g,this.Ia[0],!0));
        this.nd.push(new Ld(a.g,this.Ia[1],!0))
    }
    function Ae(a, b, c, g, f) {
        this.C = this.D = this.L = this.J = this.K = this.H = 0;
        this.pa = this.oa = this.na = this.ma = 1;
        this.ka = new Md(a,35048);
        this.ba = new Md(b,35048);
        this.ja = new Md(c,35048);
        this.la = new Md(g,35048);
        this.aa = new pg(f,35048)
    }
    function te(a, b) {
        O.xa = !0;
        var c = O.call(this) || this;
        O.xa = !1;
        c.$(a, b);
        return c
    }
    function Dg(a) {
        this.Yf = new Jd;
        this.Qb = a
    }
    function pg(a, b) {
        this.i = !1;
        this.length = 0;
        this.data = new Int32Array(512);
        this.buffer = a;
        this.usage = b;
        this.maxLength = this.data.length
    }
    function Eg() {
        this.gd = new jc(0,0,0);
        this.yd = new jc(0,0,0);
        this.Dd = new Fg(0,0,0,0)
    }
    function V(a) {
        this.zc = [];
        this.Zc = [];
        this.Db = Array(ze.Ca.Te);
        this.Kd = !1;
        new Nd(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
        new Nd(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
        this.$a = new Nd(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
        this.Ja = new Nd(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
        this.Oc = new Nd(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
        this.jc = new jc(0,0,0);
        this.hc = new jc(0,0,0);
        this.ic = new jc(0,0,0);
        this.jd = new jc(0,0,0);
        this.Ob = !1;
        this.kd = new Jd;
        this.canvas = a;
        this.g = a.getContext("webgl2", {
            premultipliedAlpha: !1,
            preserveDrawingBuffer: !0
        });
        this.Hf();
        this.ud();
        this.Xf();
        this.Nc = this.xf();
        this.A = this.Nc.bg;
        this.ye = new md(this.g);
        this.Jc = Math.PI / 3;
        this.fd = 1;
        this.Xb = .1;
        this.Wb = 1E4;
        var b = this.$a
          , c = this.Xb
          , g = this.Wb
          , f = 1 / Math.tan(.5 * this.kc());
        b.U = f / (this.cc / this.Pb);
        b.V = 0;
        b.W = 0;
        b.ca = 0;
        b.X = 0;
        b.Y = f;
        b.Z = 0;
        b.da = 0;
        b.O = 0;
        b.P = 0;
        b.R = -(g + c) / (g - c);
        b.ea = -2 * c * g / (g - c);
        b.fa = 0;
        b.ga = 0;
        b.ha = -1;
        b.ia = 0;
        this.Ob = !1;
        b = this.ic;
        b.x = 0;
        b.y = 0;
        b.z = 1;
        b = this.hc;
        b.x = 0;
        b.y = 0;
        b.z = 0;
        b = this.jc;
        b.x = 0;
        b.y = 1;
        b.z = 0;
        this.screen(a.width, a.height);
        this.Ib = this.Jb = null;
        this.T = this.Ha = !1;
        a = 0;
        for (b = this.Db.length; a < b; )
            this.Db[a++] = new Eg;
        this.wa = 0
    }
    function Ld(a, b, c) {
        var g = O.call(this, a) || this;
        g.Ia = b.slice();
        g.depth = a.createRenderbuffer();
        g.qd = a.createFramebuffer();
        c && g.he();
        return g
    }
    function O(a) {
        O.xa || this.$(a)
    }
    function Md(a, b) {
        this.i = !1;
        this.length = 0;
        this.data = new Float32Array(512);
        this.buffer = a;
        this.usage = b;
        this.maxLength = this.data.length
    }
    function cd(a, b) {
        this.Nb = a;
        this.canvas = b;
        this.resize();
        this.Zb = new Hc(Be(this, this.update),Be(this, this.bb));
        this.frameRate(ue.ad(60))
    }
    function Hc(a, b) {
        this.md = !1;
        this.Bf = !0;
        this.count = 0;
        this.Mb = 16.666666666666668;
        this.update = a;
        this.bb = b
    }
    function Fg(a, b, c, g) {
        this.x = a;
        this.y = b;
        this.z = c;
        this.w = g
    }
    function jc(a, b, c) {
        this.x = a;
        this.y = b;
        this.z = c
    }
    function Nd(a, b, c, g, f, d, h, n, l, x, q, u, D, p, m, y) {
        this.U = a;
        this.V = b;
        this.W = c;
        this.ca = g;
        this.X = f;
        this.Y = d;
        this.Z = h;
        this.da = n;
        this.O = l;
        this.P = x;
        this.R = q;
        this.ea = u;
        this.fa = D;
        this.ga = p;
        this.ha = m;
        this.ia = y
    }
    function od() {}
    function Od() {}
    function qg(a) {
        this.current = 0;
        this.rf = a
    }
    function Jd() {
        this.B = Object.create(null)
    }
    function Ce(a, b, c) {
        b = lb.call(this, String(a), b, c) || this;
        b.value = a;
        return b
    }
    function lb(a, b, c) {
        b = Error.call(this, a);
        this.message = b.message;
        "stack"in b && (this.stack = b.stack);
        this.message = a;
        this.nf = null != c ? c : this
    }
    function dd() {}
    function Lc() {
        return Va.apply(this, arguments) || this
    }
    function Ac() {
        return Va.apply(this, arguments) || this
    }
    function Mc() {
        return Va.apply(this, arguments) || this
    }
    function pc() {
        return Va.apply(this, arguments) || this
    }
    function Nc() {
        return Va.apply(this, arguments) || this
    }
    function Oc() {
        return Va.apply(this, arguments) || this
    }
    function Pc() {
        return Va.apply(this, arguments) || this
    }
    function Bc() {
        return Va.apply(this, arguments) || this
    }
    function Qc() {
        return Va.apply(this, arguments) || this
    }
    function Va() {
        return Zb.apply(this, arguments) || this
    }
    function Zb() {
        return rg.apply(this, arguments) || this
    }
    function tc(a, b, c) {
        this.data = a;
        this.name = b;
        this.type = c
    }
    function rg() {}
    function sg() {
        return ld.apply(this, arguments) || this
    }
    function tg() {
        return ld.apply(this, arguments) || this
    }
    function ld() {}
    function Gg() {
        return bd.apply(this, arguments) || this
    }
    function bd() {}
    function Wb(a, b, c, g) {
        uc.xa = !0;
        var f = uc.call(this) || this;
        uc.xa = !1;
        f.$(a, b, c, g);
        return f
    }
    function uc(a, b, c, g) {
        uc.xa || this.$(a, b, c, g)
    }
    function Pd() {}
    function z() {
        return od.ec(this, "")
    }
    function Be(a, b) {
        if (null == b)
            return null;
        null == b.cd && (b.cd = r.Ld++);
        var c;
        null == a.td ? a.td = {} : c = a.td[b.cd];
        null == c && (c = b.bind(a),
        a.td[b.cd] = c);
        return c
    }
    var Ic = Ic || {}, k;
    Pd.remove = function(a, b) {
        b = a.indexOf(b);
        if (-1 == b)
            return !1;
        a.splice(b, 1);
        return !0
    }
    ;
    Pd.now = function() {
        return Date.now()
    }
    ;
    Pd.v = !0;
    uc.prototype.$ = function(a, b, c, g) {
        null == g && (g = !0);
        null == c && (c = !1);
        null == b && (b = ve.Md);
        this.canvas = a;
        this.Aa = new cd(this,a);
        switch (b.m) {
        case 0:
            this.input = new vb(a,this.Aa,a,c,g);
            break;
        case 1:
            this.input = new vb(a,this.Aa,window.document.documentElement,c,g);
            break;
        case 2:
            this.input = null
        }
        this.pd = -1;
        this.xe();
        this.Aa.sf()
    }
    ;
    uc.prototype.Fd = function() {}
    ;
    uc.prototype.xe = function() {}
    ;
    uc.prototype.update = function() {}
    ;
    uc.prototype.bb = function() {}
    ;
    uc.v = !0;
    Cg(Wb, uc);
    Wb.prototype.$ = function(a, b, c, g) {
        this.Bb = 1;
        this.Ic = new jc(0,0,0);
        this.Ba = new jc(0,0,0);
        this.fc = .08;
        this.Sc = new jc(.5,.5,.5);
        this.Hb = new jc(.5,.5,.5);
        this.ge = 0;
        this.qc = !1;
        this.Cc = this.Dc = this.wc = this.Ga = 0;
        this.Vf = window.document.getElementById("ventilation");
        this.Wf = window.document.getElementById("vorticity");
        this.Tf = window.document.getElementById("power");
        this.Uf = window.document.getElementById("radius");
        uc.prototype.$.call(this, a, b, c, g)
    }
    ;
    Wb.prototype.xe = function() {
        this.Aa.frameRate(ue.ad(60));
        this.input.Pa = 0;
        this.M = new V(this.canvas);
        this.map = this.M.kd;
        var a = Va.ta.sb;
        this.map.B[a.qb.name] = A.u(512);
        this.map.B[a.rb.name] = A.u(64);
        this.map.B[a.ib.name] = A.h(.001953125);
        this.map.B[a.jb.name] = A.h(.015625);
        this.map.B[a.tb.name] = A.Pd(0, 9);
        this.map.B[a.ub.name] = A.Qd(0, 6, 12);
        this.map.B[a.lb.name] = A.u(511);
        this.map.B[a.mb.name] = A.u(63);
        a = this.M;
        a.Jc = Math.PI / 3;
        a.fd = 2;
        a.Xb = .1;
        a.Wb = 1E4;
        var b = a.$a
          , c = a.Xb
          , g = a.Wb
          , f = 1 / Math.tan(.5 * a.kc());
        b.U = f / (a.cc / a.Pb);
        b.V = 0;
        b.W = 0;
        b.ca = 0;
        b.X = 0;
        b.Y = f;
        b.Z = 0;
        b.da = 0;
        b.O = 0;
        b.P = 0;
        b.R = -(g + c) / (g - c);
        b.ea = -2 * c * g / (g - c);
        b.fa = 0;
        b.ga = 0;
        b.ha = -1;
        b.ia = 0;
        this.M.Gf();
        this.M.g.disable(3042);
        this.ud();
        this.If();
        this.Aa.start()
    }
    ;
    Wb.prototype.If = function() {
        this.Ac = new se(this.M,512,512,5126);
        this.Hd = new se(this.M,512,512,5126);
        this.Yb = new se(this.M,512,512,5126);
        this.eb(this.Ac, this.Jf)
    }
    ;
    Wb.prototype.ud = function() {
        this.Jf = this.M.createShader(Qc.ua, Qc.sa);
        this.Vd = this.M.createShader(Bc.ua, Bc.sa);
        this.pf = this.M.createShader(Pc.ua, Pc.sa);
        this.ag = this.M.createShader(Oc.ua, Oc.sa);
        this.wf = this.M.createShader(Nc.ua, Nc.sa);
        this.Uc = this.M.createShader(pc.ua, pc.sa);
        this.qf = this.M.createShader(Mc.ua, Mc.sa);
        this.Qf = this.M.createShader(Ac.ua, Ac.sa);
        this.M.createShader(Lc.ua, Lc.sa)
    }
    ;
    Wb.prototype.Fd = function() {
        this.M.screen(this.Aa.width, this.Aa.height)
    }
    ;
    Wb.prototype.control = function() {
        var a = this.Sc
          , b = this.Hb;
        a.x = b.x;
        a.y = b.y;
        a.z = b.z;
        var c = !1
          , g = !1
          , f = this.input.Pc
          , d = 0
          , h = 0
          , n = 0
          , l = 0;
        f.left && (n = f.mc / this.Aa.width,
        l = f.nc / this.Aa.height,
        d = f.x,
        h = f.y,
        c = 1 == f.ae,
        g = !0);
        if (0 < this.input.touches.touches.length) {
            var x = this.input.touches.touches[0];
            n = x.mc / this.Aa.width;
            l = x.nc / this.Aa.height;
            d = x.x;
            h = x.y;
            c = 1 == x.ce;
            g = x.yc
        }
        d = d / this.Aa.width * 2 - 1;
        h = 1 - h / this.Aa.height * 2;
        g && !this.qc && (this.Cc -= n,
        this.Dc -= l);
        this.wc += this.Cc;
        this.Ga += this.Dc;
        this.Cc *= .9;
        this.Dc *= .9;
        var q = Math.PI;
        this.wc %= 2 * q;
        var u = .45 * q
          , D = .49 * q;
        this.Ga > u && (this.Ga += .5 * (u - this.Ga));
        this.Ga < -u && (this.Ga += .5 * (-u - this.Ga));
        this.Ga = this.Ga > D ? D : this.Ga < -D ? -D : this.Ga;
        this.fc = .08 * this.Uf.valueAsNumber;
        this.Zf();
        this.M.screen(this.Aa.width, this.Aa.height);
        var p = this.M
          , m = this.Ba
          , y = this.Ic;
        p.Ob = !0;
        var ca = p.ic;
        ca.x = m.x;
        ca.y = m.y;
        ca.z = m.z;
        var hb = p.hc;
        hb.x = y.x;
        hb.y = y.y;
        hb.z = y.z;
        var mb = p.jc;
        mb.x = 0;
        mb.y = 1;
        mb.z = 0;
        var ja = p.Ja
          , t = p.ic
          , Qa = p.hc
          , Db = t.x - Qa.x
          , Eb = t.y - Qa.y
          , eb = t.z - Qa.z
          , Wa = Math.sqrt(Db * Db + Eb * Eb + eb * eb);
        0 < Wa && (Wa = 1 / Wa);
        var Fb = Wa
          , Xa = Db * Fb
          , Ya = Eb * Fb
          , nb = eb * Fb
          , Y = p.jc
          , Ma = Y.y * nb - Y.z * Ya
          , N = Y.z * Xa - Y.x * nb
          , Ra = Y.x * Ya - Y.y * Xa
          , Da = Math.sqrt(Ma * Ma + N * N + Ra * Ra);
        0 < Da && (Da = 1 / Da);
        var Za = Da
          , Sa = Ma * Za
          , da = N * Za
          , Ta = Ra * Za
          , ta = Ya * Ta - nb * da
          , ib = nb * Sa - Xa * Ta
          , oa = Xa * da - Ya * Sa;
        ja.U = Sa;
        ja.V = da;
        ja.W = Ta;
        ja.ca = -(Sa * t.x + da * t.y + Ta * t.z);
        ja.X = ta;
        ja.Y = ib;
        ja.Z = oa;
        ja.da = -(ta * t.x + ib * t.y + oa * t.z);
        ja.O = Xa;
        ja.P = Ya;
        ja.R = nb;
        ja.ea = -(Xa * t.x + Ya * t.y + nb * t.z);
        ja.fa = 0;
        ja.ga = 0;
        ja.ha = 0;
        ja.ia = 1;
        var Ua = this.M
          , ea = d
          , pa = h
          , T = Ua.$a
          , L = Ua.Ja
          , P = T.U
          , W = T.V
          , U = T.W
          , Q = T.ca
          , Ea = T.X
          , ua = T.Y
          , pb = T.Z
          , Fa = T.da
          , qb = T.O
          , rb = T.P
          , Na = T.R
          , $a = T.ea
          , Bb = T.fa
          , Cb = T.ga
          , Aa = T.ha
          , wb = T.ia
          , Gb = L.U
          , Z = L.V
          , ab = L.W
          , Ka = L.ca
          , fa = L.X
          , va = L.Y
          , jb = L.Z
          , bb = L.da
          , fb = L.O
          , Sb = L.P
          , wa = L.R
          , Lb = L.ea
          , Ba = L.fa
          , Xb = L.ga
          , M = L.ha
          , R = L.ia
          , I = P * Gb + W * fa + U * fb + Q * Ba
          , xa = P * Z + W * va + U * Sb + Q * Xb
          , J = P * ab + W * jb + U * wa + Q * M
          , aa = P * Ka + W * bb + U * Lb + Q * R
          , ya = Ea * Gb + ua * fa + pb * fb + Fa * Ba
          , za = Ea * Z + ua * va + pb * Sb + Fa * Xb
          , ob = Ea * ab + ua * jb + pb * wa + Fa * M
          , ka = Ea * Ka + ua * bb + pb * Lb + Fa * R
          , Ga = qb * Gb + rb * fa + Na * fb + $a * Ba
          , K = qb * Z + rb * va + Na * Sb + $a * Xb
          , xb = qb * ab + rb * jb + Na * wa + $a * M
          , yb = qb * Ka + rb * bb + Na * Lb + $a * R
          , cb = Bb * Gb + Cb * fa + Aa * fb + wb * Ba
          , Oa = Bb * Z + Cb * va + Aa * Sb + wb * Xb
          , Ha = Bb * ab + Cb * jb + Aa * wa + wb * M
          , ha = Bb * Ka + Cb * bb + Aa * Lb + wb * R
          , X = I * za - xa * ya
          , sb = I * ob - J * ya
          , Ia = I * ka - aa * ya
          , qa = xa * ob - J * za
          , Pa = xa * ka - aa * za
          , la = J * ka - aa * ob
          , zb = Ga * Oa - K * cb
          , tb = Ga * Ha - xb * cb
          , Ab = Ga * ha - yb * cb
          , ma = K * Ha - xb * Oa
          , ba = K * ha - yb * Oa
          , Ja = xb * ha - yb * Ha
          , Hb = za * Ja - ob * ba + ka * ma
          , Ib = ya * Ja - ob * Ab + ka * tb
          , kb = ya * ba - za * Ab + ka * zb
          , Tb = ya * ma - za * tb + ob * zb
          , S = I * Hb - xa * Ib + J * kb - aa * Tb;
        0 != S && (S = 1 / S);
        var ub = -Tb * S * ea + (I * ma - xa * tb + J * zb) * S * pa + -(cb * qa - Oa * sb + Ha * X) * S * 0 + (Ga * qa - K * sb + xb * X) * S
          , Ub = (Hb * S * ea + -(xa * Ja - J * ba + aa * ma) * S * pa + (Oa * la - Ha * Pa + ha * qa) * S * 0 + -(K * la - xb * Pa + yb * qa) * S) / ub
          , La = (-Ib * S * ea + (I * Ja - J * Ab + aa * tb) * S * pa + -(cb * la - Ha * Ia + ha * sb) * S * 0 + (Ga * la - xb * Ia + yb * sb) * S) / ub
          , ra = (kb * S * ea + -(I * ba - xa * Ab + aa * zb) * S * pa + (cb * Pa - Oa * Ia + ha * X) * S * 0 + -(Ga * Pa - K * Ia + yb * X) * S) / ub
          , Mb = this.Hb
          , Nb = this.Bb
          , Ob = 2 * this.fc * this.Bb;
        if (c) {
            var kc = this.Ba
              , lc = (2 * Mb.x - 1) * Nb - kc.x
              , mc = (2 * Mb.y - 1) * Nb - kc.y
              , nc = (2 * Mb.z - 1) * Nb - kc.z
              , vc = this.Ba
              , wc = Ub - vc.x
              , xc = La - vc.y
              , yc = ra - vc.z
              , qc = Math.sqrt(wc * wc + xc * xc + yc * yc);
            0 < qc && (qc = 1 / qc);
            var $b = qc
              , ac = -(lc * wc * $b + mc * xc * $b + nc * yc * $b)
              , oc = ac * ac - (lc * lc + mc * mc + nc * nc - Ob * Ob);
            this.qc = !1;
            0 < oc && 0 < -ac - Math.sqrt(oc) && (this.qc = !0,
            this.ge = Math.sqrt(lc * lc + mc * mc + nc * nc))
        }
        if (g && this.qc) {
            var bc = this.Ba
              , zc = this.Ba
              , Cc = Ub - zc.x
              , Yb = La - zc.y
              , gb = ra - zc.z
              , db = Math.sqrt(Cc * Cc + Yb * Yb + gb * gb);
            0 < db && (db = 1 / db);
            var Jb = db
              , Kb = this.ge
              , rc = this.Hb
              , Rc = this.Bb
              , Sc = new jc(.5 * ((bc.x + Cc * Jb * Kb) / Rc + 1),.5 * ((bc.y + Yb * Jb * Kb) / Rc + 1),.5 * ((bc.z + gb * Jb * Kb) / Rc + 1));
            rc.x = Sc.x;
            rc.y = Sc.y;
            rc.z = Sc.z
        }
        var Tc = this.Hb
          , Uc = this.Hb
          , gd = 1.2 * this.fc
          , pd = 0 + gd
          , qd = 0 + gd
          , rd = 0 + gd
          , sd = Uc.x
          , td = Uc.y
          , ud = Uc.z
          , vd = sd > pd ? sd : pd
          , wd = td > qd ? td : qd
          , xd = ud > rd ? ud : rd
          , hd = 1.2 * this.fc
          , yd = 1 - hd
          , we = 1 - hd
          , xe = 1 - hd;
        Tc.x = vd < yd ? vd : yd;
        Tc.y = wd < we ? wd : we;
        Tc.z = xd < xe ? xd : xe;
        g || (this.qc = !1);
        this.M.Ob = !1
    }
    ;
    Wb.prototype.update = function() {
        30 > this.pd || (this.control(),
        this.eb(this.Yb, this.wf),
        this.map.B[pc.ta.Rc.name] = A.u(0),
        this.eb(this.Yb, this.Uc),
        this.map.B[pc.ta.Rc.name] = A.u(1),
        this.eb(this.Yb, this.Uc),
        this.map.B[pc.ta.Rc.name] = A.u(0),
        this.eb(this.Yb, this.Uc),
        this.map.B[pc.ta.Rc.name] = A.u(1),
        this.eb(this.Yb, this.Uc),
        this.eb(this.Ac, this.qf),
        this.map.B[Bc.ta.forward.name] = A.Sb(!0),
        this.eb(this.Hd, this.Vd),
        this.map.B[Bc.ta.forward.name] = A.Sb(!1),
        this.eb(this.Hd, this.Vd),
        this.eb(this.Ac, this.pf),
        this.eb(this.Ac, this.ag))
    }
    ;
    Wb.prototype.eb = function(a, b) {
        this.Qb(b);
        a.M.Rf(a.nd[a.Vc ^ 1], function() {
            var c = a.M;
            c.Wd();
            a.M.Xd(0, 0);
            a.M.Cf();
            c.de()
        });
        a.Vc ^= 1
    }
    ;
    Wb.prototype.Qb = function(a) {
        var b = Va.ta
          , c = this.map
          , g = b.xb.name
          , f = A.G(this.Ac.sd()[0]);
        c.B[g] = f;
        c = this.map;
        g = b.vb.name;
        f = A.G(this.Hd.sd()[0]);
        c.B[g] = f;
        c = this.map;
        g = b.wb.name;
        f = A.G(this.Yb.sd()[0]);
        c.B[g] = f;
        this.map.B[b.time.name] = A.h(this.pd / 60);
        this.map.B[b.pb.name] = A.h(this.fc);
        this.map.B[b.nb.name] = A.Tb(this.Sc.x, this.Sc.y, this.Sc.z);
        this.map.B[b.hb.name] = A.Tb(this.Hb.x, this.Hb.y, this.Hb.z);
        this.map.B[b.ob.name] = A.h(this.Tf.valueAsNumber);
        this.map.B[b.zb.name] = A.h(.06 * this.Wf.valueAsNumber);
        this.map.B[b.yb.name] = A.h(this.Vf.valueAsNumber);
        this.M.Qb(a)
    }
    ;
    Wb.prototype.Zf = function() {
        var a = this.Ba;
        a.x = 0;
        a.y = 0;
        a.z = 3;
        a = this.wc;
        var b = Math.sin(a)
          , c = Math.cos(a)
          , g = 1 - c
          , f = 0 * g + c
          , d = 0 * g - 0 * b
          , h = 0 * g + 1 * b
          , n = 0 * g + 0 * b
          , l = 1 * g + c
          , x = 0 * g - 0 * b;
        a = 0 * g - 1 * b;
        b = 0 * g + 0 * b;
        var q = 0 * g + c;
        g = this.Ga;
        c = Math.sin(g);
        g = Math.cos(g);
        var u = 1 - g
          , D = 1 * u + g
          , p = 0 * u - 0 * c
          , m = 0 * u + 0 * c
          , y = 0 * u + 0 * c
          , ca = 0 * u + g
          , hb = 0 * u - 1 * c
          , mb = 0 * u - 0 * c
          , ja = 0 * u + 1 * c;
        u = 0 * u + g;
        c = f * D + d * y + h * mb;
        g = f * p + d * ca + h * ja;
        f = f * m + d * hb + h * u;
        d = n * D + l * y + x * mb;
        h = n * p + l * ca + x * ja;
        n = n * m + l * hb + x * u;
        l = a * D + b * y + q * mb;
        x = a * p + b * ca + q * ja;
        a = a * m + b * hb + q * u;
        q = b = this.Ba;
        m = d * q.x + h * q.y + n * q.z;
        hb = l * q.x + x * q.y + a * q.z;
        b.x = c * q.x + g * q.y + f * q.z;
        b.y = m;
        b.z = hb;
        b = this.Ic;
        b.x = 0 * c + -.2 * g + 0 * f;
        b.y = 0 * d + -.2 * h + 0 * n;
        b.z = 0 * l + -.2 * x + 0 * a;
        a = this.Ba;
        b = this.Ic;
        a.x += b.x;
        a.y += b.y;
        a.z += b.z
    }
    ;
    Wb.prototype.Pf = function() {
        var a = this.M
          , b = this.Ba
          , c = this.Ic;
        a.Ob = !0;
        var g = a.ic;
        g.x = b.x;
        g.y = b.y;
        g.z = b.z;
        b = a.hc;
        b.x = c.x;
        b.y = c.y;
        b.z = c.z;
        c = a.jc;
        c.x = 0;
        c.y = 1;
        c.z = 0;
        c = a.Ja;
        b = a.ic;
        var f = a.hc;
        g = b.x - f.x;
        var d = b.y - f.y;
        f = b.z - f.z;
        var h = Math.sqrt(g * g + d * d + f * f);
        0 < h && (h = 1 / h);
        g *= h;
        d *= h;
        f *= h;
        var n = a.jc;
        a = n.y * f - n.z * d;
        h = n.z * g - n.x * f;
        n = n.x * d - n.y * g;
        var l = Math.sqrt(a * a + h * h + n * n);
        0 < l && (l = 1 / l);
        a *= l;
        h *= l;
        n *= l;
        l = d * n - f * h;
        var x = f * a - g * n
          , q = g * h - d * a;
        c.U = a;
        c.V = h;
        c.W = n;
        c.ca = -(a * b.x + h * b.y + n * b.z);
        c.X = l;
        c.Y = x;
        c.Z = q;
        c.da = -(l * b.x + x * b.y + q * b.z);
        c.O = g;
        c.P = d;
        c.R = f;
        c.ea = -(g * b.x + d * b.y + f * b.z);
        c.fa = 0;
        c.ga = 0;
        c.ha = 0;
        c.ia = 1;
        this.map.B[Ac.ta.Ba.name] = A.Tb(this.Ba.x, this.Ba.y, this.Ba.z);
        this.map.B[Ac.ta.Bb.name] = A.h(this.Bb);
        this.Qb(this.Qf);
        this.M.screen(this.Aa.width, this.Aa.height);
        c = this.M;
        c.Wd();
        this.M.Xd(.05, .1);
        b = this.M;
        b.g.enable(3042);
        b.g.blendFuncSeparate(770, 771, 1, 1);
        this.M.box(2 * this.Bb, 2 * this.Bb, 2 * this.Bb);
        this.M.g.disable(3042);
        c.de();
        this.M.Ob = !1
    }
    ;
    Wb.prototype.bb = function() {
        this.Pf()
    }
    ;
    Wb.Lf = function() {
        new Wb(window.document.getElementById("canvas"),null,!1,!1)
    }
    ;
    Wb.v = !0;
    Math.v = !0;
    bd.v = !0;
    Cg(Gg, bd);
    Gg.v = !0;
    ld.v = !0;
    Cg(tg, ld);
    tg.v = !0;
    Cg(sg, ld);
    sg.v = !0;
    rg.v = !0;
    var G = Ic["hgsl.AttributeType"] = {
        Ab: !0,
        za: null,
        h: {
            s: "Float",
            m: 0,
            o: "hgsl.AttributeType",
            toString: z
        },
        u: {
            s: "Int",
            m: 1,
            o: "hgsl.AttributeType",
            toString: z
        },
        dc: {
            s: "UInt",
            m: 2,
            o: "hgsl.AttributeType",
            toString: z
        },
        l: (k = function(a) {
            return {
                m: 3,
                Wa: a,
                o: "hgsl.AttributeType",
                toString: z
            }
        }
        ,
        k.s = "Vec",
        k.F = ["dim"],
        k),
        ra: (k = function(a) {
            return {
                m: 4,
                Wa: a,
                o: "hgsl.AttributeType",
                toString: z
            }
        }
        ,
        k.s = "IVec",
        k.F = ["dim"],
        k),
        bd: (k = function(a) {
            return {
                m: 5,
                Wa: a,
                o: "hgsl.AttributeType",
                toString: z
            }
        }
        ,
        k.s = "UVec",
        k.F = ["dim"],
        k),
        j: (k = function(a, b) {
            return {
                m: 6,
                cols: a,
                rows: b,
                o: "hgsl.AttributeType",
                toString: z
            }
        }
        ,
        k.s = "Mat",
        k.F = ["cols", "rows"],
        k)
    };
    G.za = [G.h, G.u, G.dc, G.l, G.ra, G.bd, G.j];
    var e = Ic["hgsl.UniformType"] = {
        Ab: !0,
        za: null,
        h: {
            s: "Float",
            m: 0,
            o: "hgsl.UniformType",
            toString: z
        },
        u: {
            s: "Int",
            m: 1,
            o: "hgsl.UniformType",
            toString: z
        },
        dc: {
            s: "UInt",
            m: 2,
            o: "hgsl.UniformType",
            toString: z
        },
        Sb: {
            s: "Bool",
            m: 3,
            o: "hgsl.UniformType",
            toString: z
        },
        l: (k = function(a) {
            return {
                m: 4,
                Wa: a,
                o: "hgsl.UniformType",
                toString: z
            }
        }
        ,
        k.s = "Vec",
        k.F = ["dim"],
        k),
        ra: (k = function(a) {
            return {
                m: 5,
                Wa: a,
                o: "hgsl.UniformType",
                toString: z
            }
        }
        ,
        k.s = "IVec",
        k.F = ["dim"],
        k),
        bd: (k = function(a) {
            return {
                m: 6,
                Wa: a,
                o: "hgsl.UniformType",
                toString: z
            }
        }
        ,
        k.s = "UVec",
        k.F = ["dim"],
        k),
        Ge: (k = function(a) {
            return {
                m: 7,
                Wa: a,
                o: "hgsl.UniformType",
                toString: z
            }
        }
        ,
        k.s = "BVec",
        k.F = ["dim"],
        k),
        j: (k = function(a, b) {
            return {
                m: 8,
                cols: a,
                rows: b,
                o: "hgsl.UniformType",
                toString: z
            }
        }
        ,
        k.s = "Mat",
        k.F = ["cols", "rows"],
        k),
        G: (k = function(a) {
            return {
                m: 9,
                type: a,
                o: "hgsl.UniformType",
                toString: z
            }
        }
        ,
        k.s = "Sampler",
        k.F = ["type"],
        k),
        Array: (k = function(a, b) {
            return {
                m: 10,
                type: a,
                size: b,
                o: "hgsl.UniformType",
                toString: z
            }
        }
        ,
        k.s = "Array",
        k.F = ["type", "size"],
        k),
        Ka: {
            s: "Struct",
            m: 11,
            o: "hgsl.UniformType",
            toString: z
        }
    };
    e.za = [e.h, e.u, e.dc, e.Sb, e.l, e.ra, e.bd, e.Ge, e.j, e.G, e.Array, e.Ka];
    var F = Ic["hgsl.SamplerType"] = {
        Ab: !0,
        za: null,
        I: {
            s: "Sampler2D",
            m: 0,
            o: "hgsl.SamplerType",
            toString: z
        },
        Ze: {
            s: "Sampler3D",
            m: 1,
            o: "hgsl.SamplerType",
            toString: z
        },
        $e: {
            s: "SamplerCube",
            m: 2,
            o: "hgsl.SamplerType",
            toString: z
        },
        af: {
            s: "SamplerCubeShadow",
            m: 3,
            o: "hgsl.SamplerType",
            toString: z
        },
        Ye: {
            s: "Sampler2DShadow",
            m: 4,
            o: "hgsl.SamplerType",
            toString: z
        },
        We: {
            s: "Sampler2DArray",
            m: 5,
            o: "hgsl.SamplerType",
            toString: z
        },
        Xe: {
            s: "Sampler2DArrayShadow",
            m: 6,
            o: "hgsl.SamplerType",
            toString: z
        },
        Ne: {
            s: "ISampler2D",
            m: 7,
            o: "hgsl.SamplerType",
            toString: z
        },
        Pe: {
            s: "ISampler3D",
            m: 8,
            o: "hgsl.SamplerType",
            toString: z
        },
        Qe: {
            s: "ISamplerCube",
            m: 9,
            o: "hgsl.SamplerType",
            toString: z
        },
        Oe: {
            s: "ISampler2DArray",
            m: 10,
            o: "hgsl.SamplerType",
            toString: z
        },
        cf: {
            s: "USampler2D",
            m: 11,
            o: "hgsl.SamplerType",
            toString: z
        },
        ef: {
            s: "USampler3D",
            m: 12,
            o: "hgsl.SamplerType",
            toString: z
        },
        ff: {
            s: "USamplerCube",
            m: 13,
            o: "hgsl.SamplerType",
            toString: z
        },
        df: {
            s: "USampler2DArray",
            m: 14,
            o: "hgsl.SamplerType",
            toString: z
        }
    };
    F.za = [F.I, F.Ze, F.$e, F.af, F.Ye, F.We, F.Xe, F.Ne, F.Pe, F.Qe, F.Oe, F.cf, F.ef, F.ff, F.df];
    tc.v = !0;
    Cg(Zb, rg);
    Zb.v = !0;
    Cg(Va, Zb);
    Va.v = !0;
    Cg(Qc, Va);
    Qc.v = !0;
    Cg(Bc, Va);
    Bc.v = !0;
    Cg(Pc, Va);
    Pc.v = !0;
    Cg(Oc, Va);
    Oc.v = !0;
    Cg(Nc, Va);
    Nc.v = !0;
    Cg(pc, Va);
    pc.v = !0;
    Cg(Mc, Va);
    Mc.v = !0;
    Cg(Ac, Va);
    Ac.v = !0;
    Cg(Lc, Va);
    Lc.v = !0;
    dd.Rb = function(a) {
        return od.ec(a, "")
    }
    ;
    dd.v = !0;
    Cg(lb, Error);
    lb.Lc = function(a) {
        return a instanceof lb ? a : a instanceof Error ? new lb(a.message,null,a) : new Ce(a,null,a)
    }
    ;
    lb.fb = function(a) {
        return a instanceof lb ? a.nf : a instanceof Error ? a : new Ce(a)
    }
    ;
    lb.v = !0;
    Cg(Ce, lb);
    Ce.v = !0;
    Jd.v = !0;
    qg.prototype.next = function() {
        return this.rf[this.current++]
    }
    ;
    qg.v = !0;
    Od.get = function(a, b) {
        return a.data[b]
    }
    ;
    Od.iterator = function(a) {
        return new qg(a.data)
    }
    ;
    Od.map = function(a, b) {
        a = a.data;
        for (var c = Array(a.length), g = 0, f = a.length; g < f; ) {
            var d = g++;
            c[d] = b(a[d])
        }
        return c
    }
    ;
    od.ec = function(a, b) {
        if (null == a)
            return "null";
        if (5 <= b.length)
            return "<...>";
        var c = typeof a;
        "function" == c && (a.v || a.Ab) && (c = "object");
        switch (c) {
        case "function":
            return "<function>";
        case "object":
            if (a.o) {
                var g = Ic[a.o].za[a.m];
                c = g.s;
                if (g.F) {
                    b += "\t";
                    var f = []
                      , d = 0;
                    for (g = g.F; d < g.length; ) {
                        var h = g[d];
                        d += 1;
                        f.push(od.ec(a[h], b))
                    }
                    return c + "(" + f.join(",") + ")"
                }
                return c
            }
            if (a instanceof Array) {
                c = "[";
                b += "\t";
                f = 0;
                for (d = a.length; f < d; )
                    g = f++,
                    c += (0 < g ? "," : "") + od.ec(a[g], b);
                return c + "]"
            }
            try {
                f = a.toString
            } catch (n) {
                return "???"
            }
            if (null != f && f != Object.toString && "function" == typeof f && (c = a.toString(),
            "[object Object]" != c))
                return c;
            c = "{\n";
            b += "\t";
            f = null != a.hasOwnProperty;
            d = null;
            for (d in a)
                f && !a.hasOwnProperty(d) || "prototype" == d || "__class__" == d || "__super__" == d || "__interfaces__" == d || "__properties__" == d || (2 != c.length && (c += ", \n"),
                c += b + d + " : " + od.ec(a[d], b));
            b = b.substring(1);
            return c + ("\n" + b + "}");
        case "string":
            return a;
        default:
            return String(a)
        }
    }
    ;
    od.v = !0;
    Nd.v = !0;
    jc.v = !0;
    Fg.v = !0;
    var ue = Ic["pot.core.FrameRate"] = {
        Ab: !0,
        za: null,
        Fe: {
            s: "Auto",
            m: 0,
            o: "pot.core.FrameRate",
            toString: z
        },
        ad: (k = function(a) {
            return {
                m: 1,
                Af: a,
                o: "pot.core.FrameRate",
                toString: z
            }
        }
        ,
        k.s = "Fixed",
        k.F = ["fps"],
        k)
    };
    ue.za = [ue.Fe, ue.ad];
    Hc.prototype.start = function() {
        this.Tc || (this.vc = window.performance.now() - this.Mb,
        this.oc = this.Mb,
        this.Tc = !0,
        window.setTimeout(Be(this, this.loop), 0))
    }
    ;
    Hc.prototype.stop = function() {
        this.Tc && (this.Tc = !1)
    }
    ;
    Hc.prototype.we = function(a) {
        this.Mb = 1E3 / a
    }
    ;
    Hc.prototype.loop = function() {
        if (this.Tc) {
            this.count++;
            if (this.md) {
                if (Hc.Kc)
                    try {
                        this.update(1)
                    } catch (h) {
                        var a = lb.Lc(h);
                        window.alert(dd.Rb(a))
                    }
                else
                    this.update(1);
                a = this.bb;
                if (Hc.Kc)
                    try {
                        a()
                    } catch (h) {
                        a = lb.Lc(h),
                        window.alert(dd.Rb(a))
                    }
                else
                    a()
            } else {
                var b = window.performance.now();
                a = this.Kf + 4 * this.Mb;
                var c = b + 4;
                a = a > c ? a : c;
                !this.Bf || 10 > this.count ? c = 1 : (c = Math.round((a - b) / this.oc),
                c = 1 > c ? 1 : c);
                var g = .01 * this.Mb
                  , f = this.Mb - this.oc;
                g = Math.round((b - this.vc) / (g > f ? g : f));
                c = g < c ? g : c;
                if (0 < c) {
                    g = !1;
                    for (f = 0; f < c; ) {
                        var d = f++;
                        if (Hc.Kc)
                            try {
                                this.update(g ? 1 : (d + 1) / c)
                            } catch (h) {
                                d = lb.Lc(h),
                                window.alert(dd.Rb(d))
                            }
                        else
                            this.update(g ? 1 : (d + 1) / c);
                        d = window.performance.now();
                        this.oc += .5 * (d - b - this.oc);
                        b = d;
                        this.vc += this.Mb;
                        if (g)
                            break;
                        d > a && (g = !0)
                    }
                    a = this.vc;
                    c = 4 * this.Mb;
                    c = b - (4 < c ? c : 4);
                    this.vc = a > c ? a : c;
                    this.Kf = b;
                    a = this.bb;
                    if (Hc.Kc)
                        try {
                            a()
                        } catch (h) {
                            a = lb.Lc(h),
                            window.alert(dd.Rb(a))
                        }
                    else
                        a()
                }
            }
            window.requestAnimationFrame(Be(this, this.loop))
        }
    }
    ;
    Hc.v = !0;
    cd.prototype.frameRate = function(a) {
        switch (a.m) {
        case 0:
            this.Zb.we(60);
            this.Zb.md = !0;
            break;
        case 1:
            this.Zb.we(a.Af),
            this.Zb.md = !1
        }
    }
    ;
    cd.prototype.sf = function() {
        var a = this;
        this.se = new ResizeObserver(function() {
            a.resize() && a.Nb.Fd()
        }
        );
        this.se.observe(this.canvas);
        this.se.observe(window.document.documentElement);
        this.Nb.Fd()
    }
    ;
    cd.prototype.resize = function() {
        var a = this.canvas.clientWidth
          , b = this.canvas.clientHeight
          , c = window.devicePixelRatio;
        return this.width != a || this.height != b || this.Fa != c ? (this.width = a,
        this.height = b,
        this.Fa = c,
        this.canvas.width = this.width * this.Fa + .5 | 0,
        this.canvas.height = this.height * this.Fa + .5 | 0,
        !0) : !1
    }
    ;
    cd.prototype.start = function() {
        this.Zb.start()
    }
    ;
    cd.prototype.stop = function() {
        this.Zb.stop()
    }
    ;
    cd.prototype.update = function(a) {
        this.Nb.pd++;
        null != this.Nb.input && this.Nb.input.update(a);
        this.Nb.update()
    }
    ;
    cd.prototype.bb = function() {
        this.Nb.bb()
    }
    ;
    cd.v = !0;
    var Vc = Ic["pot.graphics.gl.Attribute"] = {
        Ab: !0,
        za: null,
        Sd: (k = function(a) {
            return {
                m: 0,
                location: a,
                o: "pot.graphics.gl.Attribute",
                toString: z
            }
        }
        ,
        k.s = "Position",
        k.F = ["location"],
        k),
        Nd: (k = function(a) {
            return {
                m: 1,
                location: a,
                o: "pot.graphics.gl.Attribute",
                toString: z
            }
        }
        ,
        k.s = "Color",
        k.F = ["location"],
        k),
        Rd: (k = function(a) {
            return {
                m: 2,
                location: a,
                o: "pot.graphics.gl.Attribute",
                toString: z
            }
        }
        ,
        k.s = "Normal",
        k.F = ["location"],
        k),
        Td: (k = function(a) {
            return {
                m: 3,
                location: a,
                o: "pot.graphics.gl.Attribute",
                toString: z
            }
        }
        ,
        k.s = "TexCoord",
        k.F = ["location"],
        k),
        Me: (k = function(a, b, c) {
            return {
                m: 4,
                buffer: a,
                location: b,
                ld: c,
                o: "pot.graphics.gl.Attribute",
                toString: z
            }
        }
        ,
        k.s = "Custom",
        k.F = ["buffer", "location", "divisor"],
        k)
    };
    Vc.za = [Vc.Sd, Vc.Nd, Vc.Rd, Vc.Td, Vc.Me];
    Md.prototype.expand = function() {
        var a = this.data;
        this.data = new Float32Array(this.maxLength <<= 1);
        this.data.set(a)
    }
    ;
    Md.v = !0;
    O.prototype.$ = function(a) {
        this.g = a
    }
    ;
    O.v = !0;
    Cg(Ld, O);
    Ld.prototype.he = function() {
        this.width = this.Ia[0].width;
        this.height = this.Ia[0].height;
        for (var a = this.Ia[0].type, b = 0, c = this.Ia; b < c.length; ) {
            var g = c[b];
            ++b;
            if (g.type != a)
                throw lb.fb("all textures must have the same type");
            if (g.width != this.width || g.height != this.height)
                throw lb.fb("all texture sizes must be the same");
        }
        this.g.bindRenderbuffer(36161, this.depth);
        this.g.renderbufferStorage(36161, 36012, this.width, this.height);
        this.g.bindRenderbuffer(36161, null);
        this.g.bindFramebuffer(36160, this.qd);
        this.g.framebufferRenderbuffer(36160, 36096, 36161, this.depth);
        a = this.Ia;
        for (b = 0; b < a.length; )
            c = a[b++],
            this.g.framebufferTexture2D(36160, 36064 + (b - 1), 3553, c.qa, 0);
        this.g.bindFramebuffer(36160, null)
    }
    ;
    Ld.v = !0;
    V.prototype.Hf = function() {
        this.g.getExtension("OES_texture_float_linear");
        this.g.getExtension("OES_texture_half_float_linear");
        this.g.getExtension("EXT_color_buffer_float");
        this.g.enable(3089);
        this.g.disable(2929);
        this.g.enable(3042);
        this.g.frontFace(2305);
        this.g.cullFace(1029);
        this.g.disable(2884);
        this.g.blendFuncSeparate(770, 771, 1, 1);
        this.g.pixelStorei(37440, !0)
    }
    ;
    V.prototype.Gf = function() {
        this.g.enable(2929);
        this.g.frontFace(2305);
        this.g.cullFace(1029);
        this.g.enable(2884);
        this.Ob = !1;
        this.ve();
        this.Jb = null
    }
    ;
    V.prototype.xf = function() {
        return new te(this.g,[Vc.Sd(), Vc.Nd(), Vc.Rd(), Vc.Td()])
    }
    ;
    V.prototype.ud = function() {
        this.Zd = new sc(this.g);
        this.Zd.compile(Zb.ua, Zb.sa);
        this.$d = new sc(this.g);
        this.$d.compile(Vb.ua, Vb.sa);
        this.hd = null
    }
    ;
    V.prototype.vf = function() {
        return null != this.hd ? this.hd : null != this.Jb ? this.$d : this.Zd
    }
    ;
    V.prototype.screen = function(a, b) {
        this.cc = a;
        this.Pb = b;
        a = this.$a;
        b = this.Xb;
        var c = this.Wb
          , g = 1 / Math.tan(.5 * this.kc());
        a.U = g / (this.cc / this.Pb);
        a.V = 0;
        a.W = 0;
        a.ca = 0;
        a.X = 0;
        a.Y = g;
        a.Z = 0;
        a.da = 0;
        a.O = 0;
        a.P = 0;
        a.R = -(c + b) / (c - b);
        a.ea = -2 * b * c / (c - b);
        a.fa = 0;
        a.ga = 0;
        a.ha = -1;
        a.ia = 0
    }
    ;
    V.prototype.viewport = function(a, b, c, g) {
        if (0 != this.Ha)
            throw Error("cannot change viewport inside a scene");
        this.Kd = !0;
        this.Be = a;
        this.Ce = b;
        this.Ae = c;
        this.$c = g
    }
    ;
    V.prototype.ve = function() {
        if (0 != this.Ha)
            throw Error("cannot change viewport inside a scene");
        this.Kd = !1
    }
    ;
    V.prototype.$f = function() {
        if (null == this.Ib) {
            var a = this.canvas.width;
            var b = this.canvas.height
        } else
            a = this.Ib.width,
            b = this.Ib.height;
        this.Kd ? (this.g.viewport(this.Be, b - this.$c - this.Ce, this.Ae, this.$c),
        this.g.scissor(this.Be, b - this.$c - this.Ce, this.Ae, this.$c)) : (this.g.viewport(0, 0, a, b),
        this.g.scissor(0, 0, a, b))
    }
    ;
    V.prototype.Sf = function() {
        this.le = this.ke = 1;
        this.oe = 0;
        this.ne = 10;
        this.me = 0
    }
    ;
    V.prototype.Wd = function() {
        if (0 != this.Ha)
            throw Error("scene already begun");
        this.Ha = !0;
        var a = this.Oc;
        a.U = 1;
        a.V = 0;
        a.W = 0;
        a.ca = 0;
        a.X = 0;
        a.Y = 1;
        a.Z = 0;
        a.da = 0;
        a.O = 0;
        a.P = 0;
        a.R = 1;
        a.ea = 0;
        a.fa = 0;
        a.ga = 0;
        a.ha = 0;
        a.ia = 1;
        this.wa = 0;
        this.Jb = null;
        a = this.A;
        a.pa = 1;
        a.oa = 1;
        a.na = 1;
        a.ma = 1;
        a = this.A;
        a.C = 0;
        a.D = 0;
        a.L = 0;
        a = this.A;
        a.J = 0;
        a.K = 0;
        this.Sf();
        this.$f();
        if (!this.Ob) {
            a = this.jd;
            var b = .5 * this.Pb
              , c = -this.Pb / (2 * Math.tan(.5 * this.kc()));
            a.x = .5 * this.cc;
            a.y = b;
            a.z = c;
            a = this.Ja;
            var g = b = this.jd;
            c = b.x - g.x;
            g = b.y - g.y;
            var f = b.z - 0
              , d = Math.sqrt(c * c + g * g + f * f);
            0 < d && (d = 1 / d);
            c *= d;
            g *= d;
            f *= d;
            d = -1 * f - -0 * g;
            var h = -0 * c - -0 * f
              , n = -0 * g - -1 * c
              , l = Math.sqrt(d * d + h * h + n * n);
            0 < l && (l = 1 / l);
            d *= l;
            h *= l;
            n *= l;
            l = g * n - f * h;
            var x = f * d - c * n
              , q = c * h - g * d;
            a.U = d;
            a.V = h;
            a.W = n;
            a.ca = -(d * b.x + h * b.y + n * b.z);
            a.X = l;
            a.Y = x;
            a.Z = q;
            a.da = -(l * b.x + x * b.y + q * b.z);
            a.O = c;
            a.P = g;
            a.R = f;
            a.ea = -(c * b.x + g * b.y + f * b.z);
            a.fa = 0;
            a.ga = 0;
            a.ha = 0;
            a.ia = 1
        }
    }
    ;
    V.prototype.de = function() {
        if (1 != this.Ha)
            throw Error("scene already ended");
        this.Ha = !1;
        this.g.flush()
    }
    ;
    V.prototype.Xd = function(a, b) {
        if (1 != this.Ha)
            throw Error("begin scene before clear scene");
        if (null != this.Ib && (5124 == this.Ib.Ia[0].type || 5125 == this.Ib.Ia[0].type))
            throw lb.fb("current render target is integer texture(s); use clearInt or clearUInt");
        this.g.clearColor(0, a, b, 1);
        this.g.clearDepth(1);
        this.g.clear(16640)
    }
    ;
    V.prototype.createShader = function(a, b, c) {
        var g = new sc(this.g);
        g.compile(a, b, c);
        return g
    }
    ;
    V.prototype.Qb = function(a) {
        this.hd = a
    }
    ;
    V.prototype.createTexture = function(a, b, c) {
        null == c && (c = 5121);
        var g = new Kc(this.g);
        g.Ff(a, b, c);
        return g
    }
    ;
    V.prototype.Rf = function(a, b) {
        var c = this.Ib;
        this.ue(a);
        b();
        this.ue(c)
    }
    ;
    V.prototype.ue = function(a) {
        this.Ib = a;
        if (null == a)
            this.g.bindFramebuffer(36160, null),
            this.g.drawBuffers([1029]);
        else {
            this.g.bindFramebuffer(36160, a.qd);
            var b = this.g
              , c = []
              , g = 0;
            for (a = a.Ia.length; g < a; )
                c.push(36064 + g++);
            b.drawBuffers(c)
        }
        this.ve()
    }
    ;
    V.prototype.perspective = function(a, b, c, g) {
        null == g && (g = 1E4);
        null == c && (c = .1);
        null == b && (b = 1);
        null == a && (a = Math.PI / 3);
        this.Jc = a;
        this.fd = b;
        this.Xb = c;
        this.Wb = g;
        a = this.$a;
        b = this.Xb;
        c = this.Wb;
        g = 1 / Math.tan(.5 * this.kc());
        a.U = g / (this.cc / this.Pb);
        a.V = 0;
        a.W = 0;
        a.ca = 0;
        a.X = 0;
        a.Y = g;
        a.Z = 0;
        a.da = 0;
        a.O = 0;
        a.P = 0;
        a.R = -(c + b) / (c - b);
        a.ea = -2 * b * c / (c - b);
        a.fa = 0;
        a.ga = 0;
        a.ha = -1;
        a.ia = 0
    }
    ;
    V.prototype.kc = function() {
        var a = this.cc / this.Pb;
        switch (this.fd) {
        case 0:
            var b = !0;
            break;
        case 1:
            b = !1;
            break;
        case 2:
            b = 1 > a;
            break;
        case 3:
            b = 1 < a
        }
        return b ? 2 * Math.atan(Math.tan(.5 * this.Jc) / a) : this.Jc
    }
    ;
    V.prototype.image = function(a, b, c, g, f, d, h, n, l) {
        var x = this.Jb;
        this.Jb = a;
        var q = 1 / a.width;
        a = 1 / a.height;
        b *= q;
        c *= a;
        g *= q;
        f *= a;
        this.Hc(5);
        q = this.A;
        q.C = 0;
        q.D = 0;
        q.L = -1;
        q = this.A;
        q.J = b;
        q.K = 1 - c;
        if (1 != this.T)
            throw Error("begin shape before vertex");
        q = this.A;
        a = q.ka;
        a.length + 3 > a.maxLength && a.expand();
        a.data[a.length++] = d;
        a.data[a.length++] = h;
        a.data[a.length++] = 0;
        a.i = !0;
        a = q.ba;
        var u = q.pa
          , D = q.oa
          , p = q.na
          , m = q.ma;
        a.length + 4 > a.maxLength && a.expand();
        a.data[a.length++] = u;
        a.data[a.length++] = D;
        a.data[a.length++] = p;
        a.data[a.length++] = m;
        a.i = !0;
        a = q.ja;
        u = q.C;
        D = q.D;
        p = q.L;
        a.length + 3 > a.maxLength && a.expand();
        a.data[a.length++] = u;
        a.data[a.length++] = D;
        a.data[a.length++] = p;
        a.i = !0;
        a = q.la;
        u = q.J;
        D = q.K;
        a.length + 2 > a.maxLength && a.expand();
        a.data[a.length++] = u;
        a.data[a.length++] = D;
        a.i = !0;
        a = q.aa;
        u = q.H;
        a.length + 1 > a.maxLength && a.expand();
        a.data[a.length++] = u;
        a.i = !0;
        q.H++;
        q = this.A;
        q.J = b;
        q.K = 1 - c - f;
        if (1 != this.T)
            throw Error("begin shape before vertex");
        q = this.A;
        a = q.ka;
        a.length + 3 > a.maxLength && a.expand();
        a.data[a.length++] = d;
        a.data[a.length++] = h + l;
        a.data[a.length++] = 0;
        a.i = !0;
        a = q.ba;
        u = q.pa;
        D = q.oa;
        p = q.na;
        m = q.ma;
        a.length + 4 > a.maxLength && a.expand();
        a.data[a.length++] = u;
        a.data[a.length++] = D;
        a.data[a.length++] = p;
        a.data[a.length++] = m;
        a.i = !0;
        a = q.ja;
        u = q.C;
        D = q.D;
        p = q.L;
        a.length + 3 > a.maxLength && a.expand();
        a.data[a.length++] = u;
        a.data[a.length++] = D;
        a.data[a.length++] = p;
        a.i = !0;
        a = q.la;
        u = q.J;
        D = q.K;
        a.length + 2 > a.maxLength && a.expand();
        a.data[a.length++] = u;
        a.data[a.length++] = D;
        a.i = !0;
        a = q.aa;
        u = q.H;
        a.length + 1 > a.maxLength && a.expand();
        a.data[a.length++] = u;
        a.i = !0;
        q.H++;
        q = this.A;
        q.J = b + g;
        q.K = 1 - c;
        if (1 != this.T)
            throw Error("begin shape before vertex");
        q = this.A;
        a = q.ka;
        a.length + 3 > a.maxLength && a.expand();
        a.data[a.length++] = d + n;
        a.data[a.length++] = h;
        a.data[a.length++] = 0;
        a.i = !0;
        a = q.ba;
        u = q.pa;
        D = q.oa;
        p = q.na;
        m = q.ma;
        a.length + 4 > a.maxLength && a.expand();
        a.data[a.length++] = u;
        a.data[a.length++] = D;
        a.data[a.length++] = p;
        a.data[a.length++] = m;
        a.i = !0;
        a = q.ja;
        u = q.C;
        D = q.D;
        p = q.L;
        a.length + 3 > a.maxLength && a.expand();
        a.data[a.length++] = u;
        a.data[a.length++] = D;
        a.data[a.length++] = p;
        a.i = !0;
        a = q.la;
        u = q.J;
        D = q.K;
        a.length + 2 > a.maxLength && a.expand();
        a.data[a.length++] = u;
        a.data[a.length++] = D;
        a.i = !0;
        a = q.aa;
        u = q.H;
        a.length + 1 > a.maxLength && a.expand();
        a.data[a.length++] = u;
        a.i = !0;
        q.H++;
        q = this.A;
        q.J = b + g;
        q.K = 1 - c - f;
        if (1 != this.T)
            throw Error("begin shape before vertex");
        b = this.A;
        c = b.ka;
        c.length + 3 > c.maxLength && c.expand();
        c.data[c.length++] = d + n;
        c.data[c.length++] = h + l;
        c.data[c.length++] = 0;
        c.i = !0;
        d = b.ba;
        h = b.pa;
        n = b.oa;
        l = b.na;
        c = b.ma;
        d.length + 4 > d.maxLength && d.expand();
        d.data[d.length++] = h;
        d.data[d.length++] = n;
        d.data[d.length++] = l;
        d.data[d.length++] = c;
        d.i = !0;
        d = b.ja;
        h = b.C;
        n = b.D;
        l = b.L;
        d.length + 3 > d.maxLength && d.expand();
        d.data[d.length++] = h;
        d.data[d.length++] = n;
        d.data[d.length++] = l;
        d.i = !0;
        d = b.la;
        h = b.J;
        n = b.K;
        d.length + 2 > d.maxLength && d.expand();
        d.data[d.length++] = h;
        d.data[d.length++] = n;
        d.i = !0;
        d = b.aa;
        h = b.H;
        d.length + 1 > d.maxLength && d.expand();
        d.data[d.length++] = h;
        d.i = !0;
        b.H++;
        this.Mc();
        this.Jb = x
    }
    ;
    V.prototype.rect = function(a, b, c, g) {
        this.Hc(5);
        var f = this.A;
        f.C = 0;
        f.D = 0;
        f.L = -1;
        f = this.A;
        f.J = 0;
        f.K = 1;
        if (1 != this.T)
            throw Error("begin shape before vertex");
        f = this.A;
        var d = f.ka;
        d.length + 3 > d.maxLength && d.expand();
        d.data[d.length++] = a;
        d.data[d.length++] = b;
        d.data[d.length++] = 0;
        d.i = !0;
        d = f.ba;
        var h = f.pa
          , n = f.oa
          , l = f.na
          , x = f.ma;
        d.length + 4 > d.maxLength && d.expand();
        d.data[d.length++] = h;
        d.data[d.length++] = n;
        d.data[d.length++] = l;
        d.data[d.length++] = x;
        d.i = !0;
        d = f.ja;
        h = f.C;
        n = f.D;
        l = f.L;
        d.length + 3 > d.maxLength && d.expand();
        d.data[d.length++] = h;
        d.data[d.length++] = n;
        d.data[d.length++] = l;
        d.i = !0;
        d = f.la;
        h = f.J;
        n = f.K;
        d.length + 2 > d.maxLength && d.expand();
        d.data[d.length++] = h;
        d.data[d.length++] = n;
        d.i = !0;
        d = f.aa;
        h = f.H;
        d.length + 1 > d.maxLength && d.expand();
        d.data[d.length++] = h;
        d.i = !0;
        f.H++;
        f = this.A;
        f.J = 0;
        f.K = 0;
        if (1 != this.T)
            throw Error("begin shape before vertex");
        f = this.A;
        d = f.ka;
        d.length + 3 > d.maxLength && d.expand();
        d.data[d.length++] = a;
        d.data[d.length++] = b + g;
        d.data[d.length++] = 0;
        d.i = !0;
        d = f.ba;
        h = f.pa;
        n = f.oa;
        l = f.na;
        x = f.ma;
        d.length + 4 > d.maxLength && d.expand();
        d.data[d.length++] = h;
        d.data[d.length++] = n;
        d.data[d.length++] = l;
        d.data[d.length++] = x;
        d.i = !0;
        d = f.ja;
        h = f.C;
        n = f.D;
        l = f.L;
        d.length + 3 > d.maxLength && d.expand();
        d.data[d.length++] = h;
        d.data[d.length++] = n;
        d.data[d.length++] = l;
        d.i = !0;
        d = f.la;
        h = f.J;
        n = f.K;
        d.length + 2 > d.maxLength && d.expand();
        d.data[d.length++] = h;
        d.data[d.length++] = n;
        d.i = !0;
        d = f.aa;
        h = f.H;
        d.length + 1 > d.maxLength && d.expand();
        d.data[d.length++] = h;
        d.i = !0;
        f.H++;
        f = this.A;
        f.J = 1;
        f.K = 1;
        if (1 != this.T)
            throw Error("begin shape before vertex");
        f = this.A;
        d = f.ka;
        d.length + 3 > d.maxLength && d.expand();
        d.data[d.length++] = a + c;
        d.data[d.length++] = b;
        d.data[d.length++] = 0;
        d.i = !0;
        d = f.ba;
        h = f.pa;
        n = f.oa;
        l = f.na;
        x = f.ma;
        d.length + 4 > d.maxLength && d.expand();
        d.data[d.length++] = h;
        d.data[d.length++] = n;
        d.data[d.length++] = l;
        d.data[d.length++] = x;
        d.i = !0;
        d = f.ja;
        h = f.C;
        n = f.D;
        l = f.L;
        d.length + 3 > d.maxLength && d.expand();
        d.data[d.length++] = h;
        d.data[d.length++] = n;
        d.data[d.length++] = l;
        d.i = !0;
        d = f.la;
        h = f.J;
        n = f.K;
        d.length + 2 > d.maxLength && d.expand();
        d.data[d.length++] = h;
        d.data[d.length++] = n;
        d.i = !0;
        d = f.aa;
        h = f.H;
        d.length + 1 > d.maxLength && d.expand();
        d.data[d.length++] = h;
        d.i = !0;
        f.H++;
        f = this.A;
        f.J = 1;
        f.K = 0;
        if (1 != this.T)
            throw Error("begin shape before vertex");
        f = this.A;
        d = f.ka;
        d.length + 3 > d.maxLength && d.expand();
        d.data[d.length++] = a + c;
        d.data[d.length++] = b + g;
        d.data[d.length++] = 0;
        d.i = !0;
        a = f.ba;
        b = f.pa;
        c = f.oa;
        g = f.na;
        d = f.ma;
        a.length + 4 > a.maxLength && a.expand();
        a.data[a.length++] = b;
        a.data[a.length++] = c;
        a.data[a.length++] = g;
        a.data[a.length++] = d;
        a.i = !0;
        a = f.ja;
        b = f.C;
        c = f.D;
        g = f.L;
        a.length + 3 > a.maxLength && a.expand();
        a.data[a.length++] = b;
        a.data[a.length++] = c;
        a.data[a.length++] = g;
        a.i = !0;
        a = f.la;
        b = f.J;
        c = f.K;
        a.length + 2 > a.maxLength && a.expand();
        a.data[a.length++] = b;
        a.data[a.length++] = c;
        a.i = !0;
        a = f.aa;
        b = f.H;
        a.length + 1 > a.maxLength && a.expand();
        a.data[a.length++] = b;
        a.i = !0;
        f.H++;
        this.Mc()
    }
    ;
    V.prototype.Cf = function() {
        this.Hc(5);
        var a = this.Ja
          , b = a.O
          , c = a.P
          , g = a.R
          , f = this.Oc
          , d = this.A;
        d.C = b * f.U + c * f.X + g * f.O;
        d.D = b * f.V + c * f.Y + g * f.P;
        d.L = b * f.W + c * f.Z + g * f.R;
        var h = this.A;
        h.J = 0;
        h.K = 0;
        var n = this.$a
          , l = this.Ja
          , x = n.U
          , q = n.V
          , u = n.W
          , D = n.ca
          , p = n.X
          , m = n.Y
          , y = n.Z
          , ca = n.da
          , hb = n.O
          , mb = n.P
          , ja = n.R
          , t = n.ea
          , Qa = n.fa
          , Db = n.ga
          , Eb = n.ha
          , eb = n.ia
          , Wa = l.U
          , Fb = l.V
          , Xa = l.W
          , Ya = l.ca
          , nb = l.X
          , Y = l.Y
          , Ma = l.Z
          , N = l.da
          , Ra = l.O
          , Da = l.P
          , Za = l.R
          , Sa = l.ea
          , da = l.fa
          , Ta = l.ga
          , ta = l.ha
          , ib = l.ia
          , oa = x * Wa + q * nb + u * Ra + D * da
          , Ua = x * Fb + q * Y + u * Da + D * Ta
          , ea = x * Xa + q * Ma + u * Za + D * ta
          , pa = x * Ya + q * N + u * Sa + D * ib
          , T = p * Wa + m * nb + y * Ra + ca * da
          , L = p * Fb + m * Y + y * Da + ca * Ta
          , P = p * Xa + m * Ma + y * Za + ca * ta
          , W = p * Ya + m * N + y * Sa + ca * ib
          , U = hb * Wa + mb * nb + ja * Ra + t * da
          , Q = hb * Fb + mb * Y + ja * Da + t * Ta
          , Ea = hb * Xa + mb * Ma + ja * Za + t * ta
          , ua = hb * Ya + mb * N + ja * Sa + t * ib
          , pb = Qa * Wa + Db * nb + Eb * Ra + eb * da
          , Fa = Qa * Fb + Db * Y + Eb * Da + eb * Ta
          , qb = Qa * Xa + Db * Ma + Eb * Za + eb * ta
          , rb = Qa * Ya + Db * N + Eb * Sa + eb * ib
          , Na = oa * L - Ua * T
          , $a = oa * P - ea * T
          , Bb = oa * W - pa * T
          , Cb = Ua * P - ea * L
          , Aa = Ua * W - pa * L
          , wb = ea * W - pa * P
          , Gb = U * Fa - Q * pb
          , Z = U * qb - Ea * pb
          , ab = U * rb - ua * pb
          , Ka = Q * qb - Ea * Fa
          , fa = Q * rb - ua * Fa
          , va = Ea * rb - ua * qb
          , jb = L * va - P * fa + W * Ka
          , bb = T * va - P * ab + W * Z
          , fb = T * fa - L * ab + W * Gb
          , Sb = T * Ka - L * Z + P * Gb
          , wa = oa * jb - Ua * bb + ea * fb - pa * Sb;
        0 != wa && (wa = 1 / wa);
        var Lb = -Sb * wa * -1 + (oa * Ka - Ua * Z + ea * Gb) * wa * -1 + -(pb * Cb - Fa * $a + qb * Na) * wa * 0 + (U * Cb - Q * $a + Ea * Na) * wa
          , Ba = (fb * wa * -1 + -(oa * fa - Ua * ab + pa * Gb) * wa * -1 + (pb * Aa - Fa * Bb + rb * Na) * wa * 0 + -(U * Aa - Q * Bb + ua * Na) * wa) / Lb
          , Xb = Ba;
        null == Ba && (Xb = 0);
        if (1 != this.T)
            throw Error("begin shape before vertex");
        var M = this.A
          , R = M.ka;
        R.length + 3 > R.maxLength && R.expand();
        R.data[R.length++] = (jb * wa * -1 + -(Ua * va - ea * fa + pa * Ka) * wa * -1 + (Fa * wb - qb * Aa + rb * Cb) * wa * 0 + -(Q * wb - Ea * Aa + ua * Cb) * wa) / Lb;
        R.data[R.length++] = (-bb * wa * -1 + (oa * va - ea * ab + pa * Z) * wa * -1 + -(pb * wb - qb * Bb + rb * $a) * wa * 0 + (U * wb - Ea * Bb + ua * $a) * wa) / Lb;
        R.data[R.length++] = Xb;
        R.i = !0;
        var I = M.ba
          , xa = M.pa
          , J = M.oa
          , aa = M.na
          , ya = M.ma;
        I.length + 4 > I.maxLength && I.expand();
        I.data[I.length++] = xa;
        I.data[I.length++] = J;
        I.data[I.length++] = aa;
        I.data[I.length++] = ya;
        I.i = !0;
        var za = M.ja
          , ob = M.C
          , ka = M.D
          , Ga = M.L;
        za.length + 3 > za.maxLength && za.expand();
        za.data[za.length++] = ob;
        za.data[za.length++] = ka;
        za.data[za.length++] = Ga;
        za.i = !0;
        var K = M.la
          , xb = M.J
          , yb = M.K;
        K.length + 2 > K.maxLength && K.expand();
        K.data[K.length++] = xb;
        K.data[K.length++] = yb;
        K.i = !0;
        var cb = M.aa
          , Oa = M.H;
        cb.length + 1 > cb.maxLength && cb.expand();
        cb.data[cb.length++] = Oa;
        cb.i = !0;
        M.H++;
        var Ha = this.A;
        Ha.J = 1;
        Ha.K = 0;
        var ha = this.$a
          , X = this.Ja
          , sb = ha.U
          , Ia = ha.V
          , qa = ha.W
          , Pa = ha.ca
          , la = ha.X
          , zb = ha.Y
          , tb = ha.Z
          , Ab = ha.da
          , ma = ha.O
          , ba = ha.P
          , Ja = ha.R
          , Hb = ha.ea
          , Ib = ha.fa
          , kb = ha.ga
          , Tb = ha.ha
          , S = ha.ia
          , ub = X.U
          , Ub = X.V
          , La = X.W
          , ra = X.ca
          , Mb = X.X
          , Nb = X.Y
          , Ob = X.Z
          , kc = X.da
          , lc = X.O
          , mc = X.P
          , nc = X.R
          , vc = X.ea
          , wc = X.fa
          , xc = X.ga
          , yc = X.ha
          , qc = X.ia
          , $b = sb * ub + Ia * Mb + qa * lc + Pa * wc
          , ac = sb * Ub + Ia * Nb + qa * mc + Pa * xc
          , oc = sb * La + Ia * Ob + qa * nc + Pa * yc
          , bc = sb * ra + Ia * kc + qa * vc + Pa * qc
          , zc = la * ub + zb * Mb + tb * lc + Ab * wc
          , Cc = la * Ub + zb * Nb + tb * mc + Ab * xc
          , Yb = la * La + zb * Ob + tb * nc + Ab * yc
          , gb = la * ra + zb * kc + tb * vc + Ab * qc
          , db = ma * ub + ba * Mb + Ja * lc + Hb * wc
          , Jb = ma * Ub + ba * Nb + Ja * mc + Hb * xc
          , Kb = ma * La + ba * Ob + Ja * nc + Hb * yc
          , rc = ma * ra + ba * kc + Ja * vc + Hb * qc
          , Rc = Ib * ub + kb * Mb + Tb * lc + S * wc
          , Sc = Ib * Ub + kb * Nb + Tb * mc + S * xc
          , Tc = Ib * La + kb * Ob + Tb * nc + S * yc
          , Uc = Ib * ra + kb * kc + Tb * vc + S * qc
          , gd = $b * Cc - ac * zc
          , pd = $b * Yb - oc * zc
          , qd = $b * gb - bc * zc
          , rd = ac * Yb - oc * Cc
          , sd = ac * gb - bc * Cc
          , td = oc * gb - bc * Yb
          , ud = db * Sc - Jb * Rc
          , vd = db * Tc - Kb * Rc
          , wd = db * Uc - rc * Rc
          , xd = Jb * Tc - Kb * Sc
          , hd = Jb * Uc - rc * Sc
          , yd = Kb * Uc - rc * Tc
          , we = Cc * yd - Yb * hd + gb * xd
          , xe = zc * yd - Yb * wd + gb * vd
          , Hg = zc * hd - Cc * wd + gb * ud
          , Ig = zc * xd - Cc * vd + Yb * ud
          , Pb = $b * we - ac * xe + oc * Hg - bc * Ig;
        0 != Pb && (Pb = 1 / Pb);
        var ug = -Ig * Pb + ($b * xd - ac * vd + oc * ud) * Pb * -1 + -(Rc * rd - Sc * pd + Tc * gd) * Pb * 0 + (db * rd - Jb * pd + Kb * gd) * Pb
          , Jg = (Hg * Pb + -($b * hd - ac * wd + bc * ud) * Pb * -1 + (Rc * sd - Sc * qd + Uc * gd) * Pb * 0 + -(db * sd - Jb * qd + rc * gd) * Pb) / ug
          , Kg = Jg;
        null == Jg && (Kg = 0);
        if (1 != this.T)
            throw Error("begin shape before vertex");
        var cc = this.A
          , Wc = cc.ka;
        Wc.length + 3 > Wc.maxLength && Wc.expand();
        Wc.data[Wc.length++] = (we * Pb + -(ac * yd - oc * hd + bc * xd) * Pb * -1 + (Sc * td - Tc * sd + Uc * rd) * Pb * 0 + -(Jb * td - Kb * sd + rc * rd) * Pb) / ug;
        Wc.data[Wc.length++] = (-xe * Pb + ($b * yd - oc * wd + bc * vd) * Pb * -1 + -(Rc * td - Tc * qd + Uc * pd) * Pb * 0 + (db * td - Kb * qd + rc * pd) * Pb) / ug;
        Wc.data[Wc.length++] = Kg;
        Wc.i = !0;
        var Dc = cc.ba
          , bh = cc.pa
          , ch = cc.oa
          , dh = cc.na
          , eh = cc.ma;
        Dc.length + 4 > Dc.maxLength && Dc.expand();
        Dc.data[Dc.length++] = bh;
        Dc.data[Dc.length++] = ch;
        Dc.data[Dc.length++] = dh;
        Dc.data[Dc.length++] = eh;
        Dc.i = !0;
        var Xc = cc.ja
          , fh = cc.C
          , gh = cc.D
          , hh = cc.L;
        Xc.length + 3 > Xc.maxLength && Xc.expand();
        Xc.data[Xc.length++] = fh;
        Xc.data[Xc.length++] = gh;
        Xc.data[Xc.length++] = hh;
        Xc.i = !0;
        var id = cc.la
          , ih = cc.J
          , jh = cc.K;
        id.length + 2 > id.maxLength && id.expand();
        id.data[id.length++] = ih;
        id.data[id.length++] = jh;
        id.i = !0;
        var Qd = cc.aa
          , kh = cc.H;
        Qd.length + 1 > Qd.maxLength && Qd.expand();
        Qd.data[Qd.length++] = kh;
        Qd.i = !0;
        cc.H++;
        var Lg = this.A;
        Lg.J = 0;
        Lg.K = 1;
        var dc = this.$a
          , ec = this.Ja
          , De = dc.U
          , Ee = dc.V
          , Fe = dc.W
          , Ge = dc.ca
          , He = dc.X
          , Ie = dc.Y
          , Je = dc.Z
          , Ke = dc.da
          , Le = dc.O
          , Me = dc.P
          , Ne = dc.R
          , Oe = dc.ea
          , Pe = dc.fa
          , Qe = dc.ga
          , Re = dc.ha
          , Se = dc.ia
          , Te = ec.U
          , Ue = ec.V
          , Ve = ec.W
          , We = ec.ca
          , Xe = ec.X
          , Ye = ec.Y
          , Ze = ec.Z
          , $e = ec.da
          , af = ec.O
          , bf = ec.P
          , cf = ec.R
          , df = ec.ea
          , ef = ec.fa
          , ff = ec.ga
          , gf = ec.ha
          , hf = ec.ia
          , zd = De * Te + Ee * Xe + Fe * af + Ge * ef
          , Ad = De * Ue + Ee * Ye + Fe * bf + Ge * ff
          , Bd = De * Ve + Ee * Ze + Fe * cf + Ge * gf
          , Cd = De * We + Ee * $e + Fe * df + Ge * hf
          , Rd = He * Te + Ie * Xe + Je * af + Ke * ef
          , Sd = He * Ue + Ie * Ye + Je * bf + Ke * ff
          , Td = He * Ve + Ie * Ze + Je * cf + Ke * gf
          , Ud = He * We + Ie * $e + Je * df + Ke * hf
          , Vd = Le * Te + Me * Xe + Ne * af + Oe * ef
          , Wd = Le * Ue + Me * Ye + Ne * bf + Oe * ff
          , Xd = Le * Ve + Me * Ze + Ne * cf + Oe * gf
          , Yd = Le * We + Me * $e + Ne * df + Oe * hf
          , Zd = Pe * Te + Qe * Xe + Re * af + Se * ef
          , $d = Pe * Ue + Qe * Ye + Re * bf + Se * ff
          , ae = Pe * Ve + Qe * Ze + Re * cf + Se * gf
          , be = Pe * We + Qe * $e + Re * df + Se * hf
          , jf = zd * Sd - Ad * Rd
          , kf = zd * Td - Bd * Rd
          , lf = zd * Ud - Cd * Rd
          , mf = Ad * Td - Bd * Sd
          , nf = Ad * Ud - Cd * Sd
          , of = Bd * Ud - Cd * Td
          , pf = Vd * $d - Wd * Zd
          , qf = Vd * ae - Xd * Zd
          , rf = Vd * be - Yd * Zd
          , sf = Wd * ae - Xd * $d
          , tf = Wd * be - Yd * $d
          , uf = Xd * be - Yd * ae
          , Mg = Sd * uf - Td * tf + Ud * sf
          , Ng = Rd * uf - Td * rf + Ud * qf
          , Og = Rd * tf - Sd * rf + Ud * pf
          , Pg = Rd * sf - Sd * qf + Td * pf
          , Qb = zd * Mg - Ad * Ng + Bd * Og - Cd * Pg;
        0 != Qb && (Qb = 1 / Qb);
        var vg = -Pg * Qb * -1 + (zd * sf - Ad * qf + Bd * pf) * Qb + -(Zd * mf - $d * kf + ae * jf) * Qb * 0 + (Vd * mf - Wd * kf + Xd * jf) * Qb
          , Qg = (Og * Qb * -1 + -(zd * tf - Ad * rf + Cd * pf) * Qb + (Zd * nf - $d * lf + be * jf) * Qb * 0 + -(Vd * nf - Wd * lf + Yd * jf) * Qb) / vg
          , Rg = Qg;
        null == Qg && (Rg = 0);
        if (1 != this.T)
            throw Error("begin shape before vertex");
        var fc = this.A
          , Yc = fc.ka;
        Yc.length + 3 > Yc.maxLength && Yc.expand();
        Yc.data[Yc.length++] = (Mg * Qb * -1 + -(Ad * uf - Bd * tf + Cd * sf) * Qb + ($d * of - ae * nf + be * mf) * Qb * 0 + -(Wd * of - Xd * nf + Yd * mf) * Qb) / vg;
        Yc.data[Yc.length++] = (-Ng * Qb * -1 + (zd * uf - Bd * rf + Cd * qf) * Qb + -(Zd * of - ae * lf + be * kf) * Qb * 0 + (Vd * of - Xd * lf + Yd * kf) * Qb) / vg;
        Yc.data[Yc.length++] = Rg;
        Yc.i = !0;
        var Ec = fc.ba
          , lh = fc.pa
          , mh = fc.oa
          , nh = fc.na
          , oh = fc.ma;
        Ec.length + 4 > Ec.maxLength && Ec.expand();
        Ec.data[Ec.length++] = lh;
        Ec.data[Ec.length++] = mh;
        Ec.data[Ec.length++] = nh;
        Ec.data[Ec.length++] = oh;
        Ec.i = !0;
        var Zc = fc.ja
          , ph = fc.C
          , qh = fc.D
          , rh = fc.L;
        Zc.length + 3 > Zc.maxLength && Zc.expand();
        Zc.data[Zc.length++] = ph;
        Zc.data[Zc.length++] = qh;
        Zc.data[Zc.length++] = rh;
        Zc.i = !0;
        var jd = fc.la
          , sh = fc.J
          , th = fc.K;
        jd.length + 2 > jd.maxLength && jd.expand();
        jd.data[jd.length++] = sh;
        jd.data[jd.length++] = th;
        jd.i = !0;
        var ce = fc.aa
          , uh = fc.H;
        ce.length + 1 > ce.maxLength && ce.expand();
        ce.data[ce.length++] = uh;
        ce.i = !0;
        fc.H++;
        var Sg = this.A;
        Sg.J = 1;
        Sg.K = 1;
        var gc = this.$a
          , hc = this.Ja
          , vf = gc.U
          , wf = gc.V
          , xf = gc.W
          , yf = gc.ca
          , zf = gc.X
          , Af = gc.Y
          , Bf = gc.Z
          , Cf = gc.da
          , Df = gc.O
          , Ef = gc.P
          , Ff = gc.R
          , Gf = gc.ea
          , Hf = gc.fa
          , If = gc.ga
          , Jf = gc.ha
          , Kf = gc.ia
          , Lf = hc.U
          , Mf = hc.V
          , Nf = hc.W
          , Of = hc.ca
          , Pf = hc.X
          , Qf = hc.Y
          , Rf = hc.Z
          , Sf = hc.da
          , Tf = hc.O
          , Uf = hc.P
          , Vf = hc.R
          , Wf = hc.ea
          , Xf = hc.fa
          , Yf = hc.ga
          , Zf = hc.ha
          , $f = hc.ia
          , Dd = vf * Lf + wf * Pf + xf * Tf + yf * Xf
          , Ed = vf * Mf + wf * Qf + xf * Uf + yf * Yf
          , Fd = vf * Nf + wf * Rf + xf * Vf + yf * Zf
          , Gd = vf * Of + wf * Sf + xf * Wf + yf * $f
          , de = zf * Lf + Af * Pf + Bf * Tf + Cf * Xf
          , ee = zf * Mf + Af * Qf + Bf * Uf + Cf * Yf
          , fe = zf * Nf + Af * Rf + Bf * Vf + Cf * Zf
          , ge = zf * Of + Af * Sf + Bf * Wf + Cf * $f
          , he = Df * Lf + Ef * Pf + Ff * Tf + Gf * Xf
          , ie = Df * Mf + Ef * Qf + Ff * Uf + Gf * Yf
          , je = Df * Nf + Ef * Rf + Ff * Vf + Gf * Zf
          , ke = Df * Of + Ef * Sf + Ff * Wf + Gf * $f
          , le = Hf * Lf + If * Pf + Jf * Tf + Kf * Xf
          , me = Hf * Mf + If * Qf + Jf * Uf + Kf * Yf
          , ne = Hf * Nf + If * Rf + Jf * Vf + Kf * Zf
          , oe = Hf * Of + If * Sf + Jf * Wf + Kf * $f
          , ag = Dd * ee - Ed * de
          , bg = Dd * fe - Fd * de
          , cg = Dd * ge - Gd * de
          , dg = Ed * fe - Fd * ee
          , eg = Ed * ge - Gd * ee
          , fg = Fd * ge - Gd * fe
          , gg = he * me - ie * le
          , hg = he * ne - je * le
          , ig = he * oe - ke * le
          , jg = ie * ne - je * me
          , kg = ie * oe - ke * me
          , lg = je * oe - ke * ne
          , Tg = ee * lg - fe * kg + ge * jg
          , Ug = de * lg - fe * ig + ge * hg
          , Vg = de * kg - ee * ig + ge * gg
          , Wg = de * jg - ee * hg + fe * gg
          , Rb = Dd * Tg - Ed * Ug + Fd * Vg - Gd * Wg;
        0 != Rb && (Rb = 1 / Rb);
        var wg = -Wg * Rb + (Dd * jg - Ed * hg + Fd * gg) * Rb + -(le * dg - me * bg + ne * ag) * Rb * 0 + (he * dg - ie * bg + je * ag) * Rb
          , Xg = (Vg * Rb + -(Dd * kg - Ed * ig + Gd * gg) * Rb + (le * eg - me * cg + oe * ag) * Rb * 0 + -(he * eg - ie * cg + ke * ag) * Rb) / wg
          , Yg = Xg;
        null == Xg && (Yg = 0);
        if (1 != this.T)
            throw Error("begin shape before vertex");
        var ic = this.A
          , $c = ic.ka;
        $c.length + 3 > $c.maxLength && $c.expand();
        $c.data[$c.length++] = (Tg * Rb + -(Ed * lg - Fd * kg + Gd * jg) * Rb + (me * fg - ne * eg + oe * dg) * Rb * 0 + -(ie * fg - je * eg + ke * dg) * Rb) / wg;
        $c.data[$c.length++] = (-Ug * Rb + (Dd * lg - Fd * ig + Gd * hg) * Rb + -(le * fg - ne * cg + oe * bg) * Rb * 0 + (he * fg - je * cg + ke * bg) * Rb) / wg;
        $c.data[$c.length++] = Yg;
        $c.i = !0;
        var Fc = ic.ba
          , vh = ic.pa
          , wh = ic.oa
          , xh = ic.na
          , yh = ic.ma;
        Fc.length + 4 > Fc.maxLength && Fc.expand();
        Fc.data[Fc.length++] = vh;
        Fc.data[Fc.length++] = wh;
        Fc.data[Fc.length++] = xh;
        Fc.data[Fc.length++] = yh;
        Fc.i = !0;
        var ad = ic.ja
          , zh = ic.C
          , Ah = ic.D
          , Bh = ic.L;
        ad.length + 3 > ad.maxLength && ad.expand();
        ad.data[ad.length++] = zh;
        ad.data[ad.length++] = Ah;
        ad.data[ad.length++] = Bh;
        ad.i = !0;
        var kd = ic.la
          , Ch = ic.J
          , Dh = ic.K;
        kd.length + 2 > kd.maxLength && kd.expand();
        kd.data[kd.length++] = Ch;
        kd.data[kd.length++] = Dh;
        kd.i = !0;
        var pe = ic.aa
          , Eh = ic.H;
        pe.length + 1 > pe.maxLength && pe.expand();
        pe.data[pe.length++] = Eh;
        pe.i = !0;
        ic.H++;
        this.Mc()
    }
    ;
    V.prototype.Xf = function() {
        this.Zc.length = 0;
        this.Zc.push(new jc(0,1,0));
        for (var a = 1; 15 > a; )
            for (var b = a++ / 16 * Math.PI, c = 0; 32 > c; ) {
                var g = c++ / 32 * Math.PI * 2;
                this.Zc.push(new jc(Math.sin(b) * Math.cos(g),Math.cos(b),-Math.sin(b) * Math.sin(g)))
            }
        this.Zc.push(new jc(0,-1,0));
        for (a = this.zc.length = 0; 32 > a; )
            b = a++,
            this.zc.push([0, b + 1, (b + 1) % 32 + 1]),
            this.zc.push([449, 449 - (b + 1), 449 - ((b + 1) % 32 + 1)]);
        for (a = 1; 14 > a; )
            for (b = 1 + 32 * (a++ - 1),
            c = b + 32,
            g = 0; 32 > g; ) {
                var f = g++
                  , d = b + f
                  , h = c + (f + 1) % 32;
                this.zc.push([d, c + f, h]);
                this.zc.push([d, h, b + (f + 1) % 32])
            }
    }
    ;
    V.prototype.box = function(a, b, c) {
        this.Hc(4);
        a *= .5;
        b *= .5;
        c *= .5;
        var g = -a
          , f = -b
          , d = -c;
        if (null != this.Jb) {
            var h = this.A;
            h.C = -1;
            h.D = 0;
            h.L = 0;
            this.Vb(g, f, d, g, f, c, g, b, c, g, b, d);
            h = this.A;
            h.C = 1;
            h.D = 0;
            h.L = 0;
            this.Vb(a, f, d, a, b, d, a, b, c, a, f, c);
            h = this.A;
            h.C = 0;
            h.D = -1;
            h.L = 0;
            this.Vb(g, f, d, a, f, d, a, f, c, g, f, c);
            h = this.A;
            h.C = 0;
            h.D = 1;
            h.L = 0;
            this.Vb(g, b, d, g, b, c, a, b, c, a, b, d);
            h = this.A;
            h.C = 0;
            h.D = 0;
            h.L = -1;
            this.Vb(g, f, d, g, b, d, a, b, d, a, f, d);
            d = this.A;
            d.C = 0;
            d.D = 0;
            d.L = 1;
            this.Vb(g, f, c, a, f, c, a, b, c, g, b, c)
        } else
            h = this.A,
            h.C = -1,
            h.D = 0,
            h.L = 0,
            this.Ub(g, f, d, g, f, c, g, b, c, g, b, d),
            h = this.A,
            h.C = 1,
            h.D = 0,
            h.L = 0,
            this.Ub(a, f, d, a, b, d, a, b, c, a, f, c),
            h = this.A,
            h.C = 0,
            h.D = -1,
            h.L = 0,
            this.Ub(g, f, d, a, f, d, a, f, c, g, f, c),
            h = this.A,
            h.C = 0,
            h.D = 1,
            h.L = 0,
            this.Ub(g, b, d, g, b, c, a, b, c, a, b, d),
            h = this.A,
            h.C = 0,
            h.D = 0,
            h.L = -1,
            this.Ub(g, f, d, g, b, d, a, b, d, a, f, d),
            d = this.A,
            d.C = 0,
            d.D = 0,
            d.L = 1,
            this.Ub(g, f, c, a, f, c, a, b, c, g, b, c);
        this.Mc()
    }
    ;
    V.prototype.Ub = function(a, b, c, g, f, d, h, n, l, x, q, u) {
        var D = c;
        null == c && (D = 0);
        if (1 != this.T)
            throw Error("begin shape before vertex");
        var p = this.A
          , m = p.ka;
        m.length + 3 > m.maxLength && m.expand();
        m.data[m.length++] = a;
        m.data[m.length++] = b;
        m.data[m.length++] = D;
        m.i = !0;
        var y = p.ba
          , ca = p.pa
          , hb = p.oa
          , mb = p.na
          , ja = p.ma;
        y.length + 4 > y.maxLength && y.expand();
        y.data[y.length++] = ca;
        y.data[y.length++] = hb;
        y.data[y.length++] = mb;
        y.data[y.length++] = ja;
        y.i = !0;
        var t = p.ja
          , Qa = p.C
          , Db = p.D
          , Eb = p.L;
        t.length + 3 > t.maxLength && t.expand();
        t.data[t.length++] = Qa;
        t.data[t.length++] = Db;
        t.data[t.length++] = Eb;
        t.i = !0;
        var eb = p.la
          , Wa = p.J
          , Fb = p.K;
        eb.length + 2 > eb.maxLength && eb.expand();
        eb.data[eb.length++] = Wa;
        eb.data[eb.length++] = Fb;
        eb.i = !0;
        var Xa = p.aa
          , Ya = p.H;
        Xa.length + 1 > Xa.maxLength && Xa.expand();
        Xa.data[Xa.length++] = Ya;
        Xa.i = !0;
        p.H++;
        var nb = d;
        null == d && (nb = 0);
        if (1 != this.T)
            throw Error("begin shape before vertex");
        var Y = this.A
          , Ma = Y.ka;
        Ma.length + 3 > Ma.maxLength && Ma.expand();
        Ma.data[Ma.length++] = g;
        Ma.data[Ma.length++] = f;
        Ma.data[Ma.length++] = nb;
        Ma.i = !0;
        var N = Y.ba
          , Ra = Y.pa
          , Da = Y.oa
          , Za = Y.na
          , Sa = Y.ma;
        N.length + 4 > N.maxLength && N.expand();
        N.data[N.length++] = Ra;
        N.data[N.length++] = Da;
        N.data[N.length++] = Za;
        N.data[N.length++] = Sa;
        N.i = !0;
        var da = Y.ja
          , Ta = Y.C
          , ta = Y.D
          , ib = Y.L;
        da.length + 3 > da.maxLength && da.expand();
        da.data[da.length++] = Ta;
        da.data[da.length++] = ta;
        da.data[da.length++] = ib;
        da.i = !0;
        var oa = Y.la
          , Ua = Y.J
          , ea = Y.K;
        oa.length + 2 > oa.maxLength && oa.expand();
        oa.data[oa.length++] = Ua;
        oa.data[oa.length++] = ea;
        oa.i = !0;
        var pa = Y.aa
          , T = Y.H;
        pa.length + 1 > pa.maxLength && pa.expand();
        pa.data[pa.length++] = T;
        pa.i = !0;
        Y.H++;
        var L = l;
        null == l && (L = 0);
        if (1 != this.T)
            throw Error("begin shape before vertex");
        var P = this.A
          , W = P.ka;
        W.length + 3 > W.maxLength && W.expand();
        W.data[W.length++] = h;
        W.data[W.length++] = n;
        W.data[W.length++] = L;
        W.i = !0;
        var U = P.ba
          , Q = P.pa
          , Ea = P.oa
          , ua = P.na
          , pb = P.ma;
        U.length + 4 > U.maxLength && U.expand();
        U.data[U.length++] = Q;
        U.data[U.length++] = Ea;
        U.data[U.length++] = ua;
        U.data[U.length++] = pb;
        U.i = !0;
        var Fa = P.ja
          , qb = P.C
          , rb = P.D
          , Na = P.L;
        Fa.length + 3 > Fa.maxLength && Fa.expand();
        Fa.data[Fa.length++] = qb;
        Fa.data[Fa.length++] = rb;
        Fa.data[Fa.length++] = Na;
        Fa.i = !0;
        var $a = P.la
          , Bb = P.J
          , Cb = P.K;
        $a.length + 2 > $a.maxLength && $a.expand();
        $a.data[$a.length++] = Bb;
        $a.data[$a.length++] = Cb;
        $a.i = !0;
        var Aa = P.aa
          , wb = P.H;
        Aa.length + 1 > Aa.maxLength && Aa.expand();
        Aa.data[Aa.length++] = wb;
        Aa.i = !0;
        P.H++;
        var Gb = c;
        null == c && (Gb = 0);
        if (1 != this.T)
            throw Error("begin shape before vertex");
        var Z = this.A
          , ab = Z.ka;
        ab.length + 3 > ab.maxLength && ab.expand();
        ab.data[ab.length++] = a;
        ab.data[ab.length++] = b;
        ab.data[ab.length++] = Gb;
        ab.i = !0;
        var Ka = Z.ba
          , fa = Z.pa
          , va = Z.oa
          , jb = Z.na
          , bb = Z.ma;
        Ka.length + 4 > Ka.maxLength && Ka.expand();
        Ka.data[Ka.length++] = fa;
        Ka.data[Ka.length++] = va;
        Ka.data[Ka.length++] = jb;
        Ka.data[Ka.length++] = bb;
        Ka.i = !0;
        var fb = Z.ja
          , Sb = Z.C
          , wa = Z.D
          , Lb = Z.L;
        fb.length + 3 > fb.maxLength && fb.expand();
        fb.data[fb.length++] = Sb;
        fb.data[fb.length++] = wa;
        fb.data[fb.length++] = Lb;
        fb.i = !0;
        var Ba = Z.la
          , Xb = Z.J
          , M = Z.K;
        Ba.length + 2 > Ba.maxLength && Ba.expand();
        Ba.data[Ba.length++] = Xb;
        Ba.data[Ba.length++] = M;
        Ba.i = !0;
        var R = Z.aa
          , I = Z.H;
        R.length + 1 > R.maxLength && R.expand();
        R.data[R.length++] = I;
        R.i = !0;
        Z.H++;
        var xa = l;
        null == l && (xa = 0);
        if (1 != this.T)
            throw Error("begin shape before vertex");
        var J = this.A
          , aa = J.ka;
        aa.length + 3 > aa.maxLength && aa.expand();
        aa.data[aa.length++] = h;
        aa.data[aa.length++] = n;
        aa.data[aa.length++] = xa;
        aa.i = !0;
        var ya = J.ba
          , za = J.pa
          , ob = J.oa
          , ka = J.na
          , Ga = J.ma;
        ya.length + 4 > ya.maxLength && ya.expand();
        ya.data[ya.length++] = za;
        ya.data[ya.length++] = ob;
        ya.data[ya.length++] = ka;
        ya.data[ya.length++] = Ga;
        ya.i = !0;
        var K = J.ja
          , xb = J.C
          , yb = J.D
          , cb = J.L;
        K.length + 3 > K.maxLength && K.expand();
        K.data[K.length++] = xb;
        K.data[K.length++] = yb;
        K.data[K.length++] = cb;
        K.i = !0;
        var Oa = J.la
          , Ha = J.J
          , ha = J.K;
        Oa.length + 2 > Oa.maxLength && Oa.expand();
        Oa.data[Oa.length++] = Ha;
        Oa.data[Oa.length++] = ha;
        Oa.i = !0;
        var X = J.aa
          , sb = J.H;
        X.length + 1 > X.maxLength && X.expand();
        X.data[X.length++] = sb;
        X.i = !0;
        J.H++;
        var Ia = u;
        null == u && (Ia = 0);
        if (1 != this.T)
            throw Error("begin shape before vertex");
        var qa = this.A
          , Pa = qa.ka;
        Pa.length + 3 > Pa.maxLength && Pa.expand();
        Pa.data[Pa.length++] = x;
        Pa.data[Pa.length++] = q;
        Pa.data[Pa.length++] = Ia;
        Pa.i = !0;
        var la = qa.ba
          , zb = qa.pa
          , tb = qa.oa
          , Ab = qa.na
          , ma = qa.ma;
        la.length + 4 > la.maxLength && la.expand();
        la.data[la.length++] = zb;
        la.data[la.length++] = tb;
        la.data[la.length++] = Ab;
        la.data[la.length++] = ma;
        la.i = !0;
        var ba = qa.ja
          , Ja = qa.C
          , Hb = qa.D
          , Ib = qa.L;
        ba.length + 3 > ba.maxLength && ba.expand();
        ba.data[ba.length++] = Ja;
        ba.data[ba.length++] = Hb;
        ba.data[ba.length++] = Ib;
        ba.i = !0;
        var kb = qa.la
          , Tb = qa.J
          , S = qa.K;
        kb.length + 2 > kb.maxLength && kb.expand();
        kb.data[kb.length++] = Tb;
        kb.data[kb.length++] = S;
        kb.i = !0;
        var ub = qa.aa
          , Ub = qa.H;
        ub.length + 1 > ub.maxLength && ub.expand();
        ub.data[ub.length++] = Ub;
        ub.i = !0;
        qa.H++
    }
    ;
    V.prototype.Vb = function(a, b, c, g, f, d, h, n, l, x, q, u) {
        var D = this.A;
        D.J = 0;
        D.K = 0;
        var p = c;
        null == c && (p = 0);
        if (1 != this.T)
            throw Error("begin shape before vertex");
        var m = this.A
          , y = m.ka;
        y.length + 3 > y.maxLength && y.expand();
        y.data[y.length++] = a;
        y.data[y.length++] = b;
        y.data[y.length++] = p;
        y.i = !0;
        var ca = m.ba
          , hb = m.pa
          , mb = m.oa
          , ja = m.na
          , t = m.ma;
        ca.length + 4 > ca.maxLength && ca.expand();
        ca.data[ca.length++] = hb;
        ca.data[ca.length++] = mb;
        ca.data[ca.length++] = ja;
        ca.data[ca.length++] = t;
        ca.i = !0;
        var Qa = m.ja
          , Db = m.C
          , Eb = m.D
          , eb = m.L;
        Qa.length + 3 > Qa.maxLength && Qa.expand();
        Qa.data[Qa.length++] = Db;
        Qa.data[Qa.length++] = Eb;
        Qa.data[Qa.length++] = eb;
        Qa.i = !0;
        var Wa = m.la
          , Fb = m.J
          , Xa = m.K;
        Wa.length + 2 > Wa.maxLength && Wa.expand();
        Wa.data[Wa.length++] = Fb;
        Wa.data[Wa.length++] = Xa;
        Wa.i = !0;
        var Ya = m.aa
          , nb = m.H;
        Ya.length + 1 > Ya.maxLength && Ya.expand();
        Ya.data[Ya.length++] = nb;
        Ya.i = !0;
        m.H++;
        var Y = this.A;
        Y.J = 0;
        Y.K = 1;
        var Ma = d;
        null == d && (Ma = 0);
        if (1 != this.T)
            throw Error("begin shape before vertex");
        var N = this.A
          , Ra = N.ka;
        Ra.length + 3 > Ra.maxLength && Ra.expand();
        Ra.data[Ra.length++] = g;
        Ra.data[Ra.length++] = f;
        Ra.data[Ra.length++] = Ma;
        Ra.i = !0;
        var Da = N.ba
          , Za = N.pa
          , Sa = N.oa
          , da = N.na
          , Ta = N.ma;
        Da.length + 4 > Da.maxLength && Da.expand();
        Da.data[Da.length++] = Za;
        Da.data[Da.length++] = Sa;
        Da.data[Da.length++] = da;
        Da.data[Da.length++] = Ta;
        Da.i = !0;
        var ta = N.ja
          , ib = N.C
          , oa = N.D
          , Ua = N.L;
        ta.length + 3 > ta.maxLength && ta.expand();
        ta.data[ta.length++] = ib;
        ta.data[ta.length++] = oa;
        ta.data[ta.length++] = Ua;
        ta.i = !0;
        var ea = N.la
          , pa = N.J
          , T = N.K;
        ea.length + 2 > ea.maxLength && ea.expand();
        ea.data[ea.length++] = pa;
        ea.data[ea.length++] = T;
        ea.i = !0;
        var L = N.aa
          , P = N.H;
        L.length + 1 > L.maxLength && L.expand();
        L.data[L.length++] = P;
        L.i = !0;
        N.H++;
        var W = this.A;
        W.J = 1;
        W.K = 1;
        var U = l;
        null == l && (U = 0);
        if (1 != this.T)
            throw Error("begin shape before vertex");
        var Q = this.A
          , Ea = Q.ka;
        Ea.length + 3 > Ea.maxLength && Ea.expand();
        Ea.data[Ea.length++] = h;
        Ea.data[Ea.length++] = n;
        Ea.data[Ea.length++] = U;
        Ea.i = !0;
        var ua = Q.ba
          , pb = Q.pa
          , Fa = Q.oa
          , qb = Q.na
          , rb = Q.ma;
        ua.length + 4 > ua.maxLength && ua.expand();
        ua.data[ua.length++] = pb;
        ua.data[ua.length++] = Fa;
        ua.data[ua.length++] = qb;
        ua.data[ua.length++] = rb;
        ua.i = !0;
        var Na = Q.ja
          , $a = Q.C
          , Bb = Q.D
          , Cb = Q.L;
        Na.length + 3 > Na.maxLength && Na.expand();
        Na.data[Na.length++] = $a;
        Na.data[Na.length++] = Bb;
        Na.data[Na.length++] = Cb;
        Na.i = !0;
        var Aa = Q.la
          , wb = Q.J
          , Gb = Q.K;
        Aa.length + 2 > Aa.maxLength && Aa.expand();
        Aa.data[Aa.length++] = wb;
        Aa.data[Aa.length++] = Gb;
        Aa.i = !0;
        var Z = Q.aa
          , ab = Q.H;
        Z.length + 1 > Z.maxLength && Z.expand();
        Z.data[Z.length++] = ab;
        Z.i = !0;
        Q.H++;
        var Ka = this.A;
        Ka.J = 0;
        Ka.K = 0;
        var fa = c;
        null == c && (fa = 0);
        if (1 != this.T)
            throw Error("begin shape before vertex");
        var va = this.A
          , jb = va.ka;
        jb.length + 3 > jb.maxLength && jb.expand();
        jb.data[jb.length++] = a;
        jb.data[jb.length++] = b;
        jb.data[jb.length++] = fa;
        jb.i = !0;
        var bb = va.ba
          , fb = va.pa
          , Sb = va.oa
          , wa = va.na
          , Lb = va.ma;
        bb.length + 4 > bb.maxLength && bb.expand();
        bb.data[bb.length++] = fb;
        bb.data[bb.length++] = Sb;
        bb.data[bb.length++] = wa;
        bb.data[bb.length++] = Lb;
        bb.i = !0;
        var Ba = va.ja
          , Xb = va.C
          , M = va.D
          , R = va.L;
        Ba.length + 3 > Ba.maxLength && Ba.expand();
        Ba.data[Ba.length++] = Xb;
        Ba.data[Ba.length++] = M;
        Ba.data[Ba.length++] = R;
        Ba.i = !0;
        var I = va.la
          , xa = va.J
          , J = va.K;
        I.length + 2 > I.maxLength && I.expand();
        I.data[I.length++] = xa;
        I.data[I.length++] = J;
        I.i = !0;
        var aa = va.aa
          , ya = va.H;
        aa.length + 1 > aa.maxLength && aa.expand();
        aa.data[aa.length++] = ya;
        aa.i = !0;
        va.H++;
        var za = this.A;
        za.J = 1;
        za.K = 1;
        var ob = l;
        null == l && (ob = 0);
        if (1 != this.T)
            throw Error("begin shape before vertex");
        var ka = this.A
          , Ga = ka.ka;
        Ga.length + 3 > Ga.maxLength && Ga.expand();
        Ga.data[Ga.length++] = h;
        Ga.data[Ga.length++] = n;
        Ga.data[Ga.length++] = ob;
        Ga.i = !0;
        var K = ka.ba
          , xb = ka.pa
          , yb = ka.oa
          , cb = ka.na
          , Oa = ka.ma;
        K.length + 4 > K.maxLength && K.expand();
        K.data[K.length++] = xb;
        K.data[K.length++] = yb;
        K.data[K.length++] = cb;
        K.data[K.length++] = Oa;
        K.i = !0;
        var Ha = ka.ja
          , ha = ka.C
          , X = ka.D
          , sb = ka.L;
        Ha.length + 3 > Ha.maxLength && Ha.expand();
        Ha.data[Ha.length++] = ha;
        Ha.data[Ha.length++] = X;
        Ha.data[Ha.length++] = sb;
        Ha.i = !0;
        var Ia = ka.la
          , qa = ka.J
          , Pa = ka.K;
        Ia.length + 2 > Ia.maxLength && Ia.expand();
        Ia.data[Ia.length++] = qa;
        Ia.data[Ia.length++] = Pa;
        Ia.i = !0;
        var la = ka.aa
          , zb = ka.H;
        la.length + 1 > la.maxLength && la.expand();
        la.data[la.length++] = zb;
        la.i = !0;
        ka.H++;
        var tb = this.A;
        tb.J = 1;
        tb.K = 0;
        var Ab = u;
        null == u && (Ab = 0);
        if (1 != this.T)
            throw Error("begin shape before vertex");
        var ma = this.A
          , ba = ma.ka;
        ba.length + 3 > ba.maxLength && ba.expand();
        ba.data[ba.length++] = x;
        ba.data[ba.length++] = q;
        ba.data[ba.length++] = Ab;
        ba.i = !0;
        var Ja = ma.ba
          , Hb = ma.pa
          , Ib = ma.oa
          , kb = ma.na
          , Tb = ma.ma;
        Ja.length + 4 > Ja.maxLength && Ja.expand();
        Ja.data[Ja.length++] = Hb;
        Ja.data[Ja.length++] = Ib;
        Ja.data[Ja.length++] = kb;
        Ja.data[Ja.length++] = Tb;
        Ja.i = !0;
        var S = ma.ja
          , ub = ma.C
          , Ub = ma.D
          , La = ma.L;
        S.length + 3 > S.maxLength && S.expand();
        S.data[S.length++] = ub;
        S.data[S.length++] = Ub;
        S.data[S.length++] = La;
        S.i = !0;
        var ra = ma.la
          , Mb = ma.J
          , Nb = ma.K;
        ra.length + 2 > ra.maxLength && ra.expand();
        ra.data[ra.length++] = Mb;
        ra.data[ra.length++] = Nb;
        ra.i = !0;
        var Ob = ma.aa
          , kc = ma.H;
        Ob.length + 1 > Ob.maxLength && Ob.expand();
        Ob.data[Ob.length++] = kc;
        Ob.i = !0;
        ma.H++
    }
    ;
    V.prototype.Ea = function() {
        if (1 != this.Ha)
            throw Error("begin scene before setting lights");
        if (this.wa == this.Db.length)
            throw Error("too many lights");
        var a = this.Db[this.wa++]
          , b = a.gd;
        b.x = .2;
        b.y = .2;
        b.z = .2;
        b = a.Dd;
        b.x = 0;
        b.y = 0;
        b.z = 0;
        b.w = 0;
        a = a.yd;
        a.x = 0;
        a.y = 0;
        a.z = 0;
        var c = this.Ja;
        a = -c.O;
        b = -c.P;
        c = -c.R;
        if (1 != this.Ha)
            throw Error("begin scene before setting lights");
        if (this.wa == this.Db.length)
            throw Error("too many lights");
        var g = this.Db[this.wa++]
          , f = g.gd;
        f.x = .8;
        f.y = .8;
        f.z = .8;
        f = g.Dd;
        f.x = 0;
        f.y = 0;
        f.z = 0;
        f.w = 0;
        g = g.yd;
        f = Math.sqrt(a * a + b * b + c * c);
        0 < f && (f = 1 / f);
        g.x = a * f;
        g.y = b * f;
        g.z = c * f
    }
    ;
    V.prototype.La = function(a) {
        if (1 != this.Ha)
            throw Error("begin scene before setting materials");
        this.ke = a
    }
    ;
    V.prototype.Ma = function(a) {
        if (1 != this.Ha)
            throw Error("begin scene before setting materials");
        this.le = a
    }
    ;
    V.prototype.Ra = function(a) {
        if (1 != this.Ha)
            throw Error("begin scene before setting materials");
        this.oe = a
    }
    ;
    V.prototype.Qa = function(a) {
        if (1 != this.Ha)
            throw Error("begin scene before setting materials");
        this.ne = a
    }
    ;
    V.prototype.Na = function(a) {
        if (1 != this.Ha)
            throw Error("begin scene before setting materials");
        this.me = a
    }
    ;
    V.prototype.index = function(a) {
        if (1 != this.T)
            throw Error("begin shape before index");
        var b = this.A.aa;
        b.length + 1 > b.maxLength && b.expand();
        b.data[b.length++] = a;
        b.i = !0
    }
    ;
    V.prototype.Hc = function(a) {
        if (1 != this.Ha)
            throw Error("begin scene before begin shape");
        if (0 != this.T)
            throw Error("shape already begun");
        this.T = !0;
        this.A.clear();
        this.Nc.mode = a
    }
    ;
    V.prototype.Mc = function() {
        if (1 != this.T)
            throw Error("shape already ended");
        this.T = !1;
        this.A.upload();
        this.Nc.va.Qb = this.vf();
        this.zf(this.Nc)
    }
    ;
    V.prototype.Nf = function() {
        var a = this.kd
          , b = this.Ja
          , c = this.Oc
          , g = b.U
          , f = b.V
          , d = b.W
          , h = b.ca
          , n = b.X
          , l = b.Y
          , x = b.Z
          , q = b.da
          , u = b.O
          , D = b.P
          , p = b.R
          , m = b.ea
          , y = b.fa
          , ca = b.ga
          , hb = b.ha
          , mb = b.ia
          , ja = c.U
          , t = c.V
          , Qa = c.W
          , Db = c.ca
          , Eb = c.X
          , eb = c.Y
          , Wa = c.Z
          , Fb = c.da
          , Xa = c.O
          , Ya = c.P
          , nb = c.R
          , Y = c.ea
          , Ma = c.fa
          , N = c.ga
          , Ra = c.ha
          , Da = c.ia
          , Za = g * ja + f * Eb + d * Xa + h * Ma
          , Sa = g * t + f * eb + d * Ya + h * N
          , da = g * Qa + f * Wa + d * nb + h * Ra
          , Ta = g * Db + f * Fb + d * Y + h * Da
          , ta = n * ja + l * Eb + x * Xa + q * Ma
          , ib = n * t + l * eb + x * Ya + q * N
          , oa = n * Qa + l * Wa + x * nb + q * Ra
          , Ua = n * Db + l * Fb + x * Y + q * Da
          , ea = u * ja + D * Eb + p * Xa + m * Ma
          , pa = u * t + D * eb + p * Ya + m * N
          , T = u * Qa + D * Wa + p * nb + m * Ra
          , L = u * Db + D * Fb + p * Y + m * Da
          , P = y * ja + ca * Eb + hb * Xa + mb * Ma
          , W = y * t + ca * eb + hb * Ya + mb * N
          , U = y * Qa + ca * Wa + hb * nb + mb * Ra
          , Q = y * Db + ca * Fb + hb * Y + mb * Da
          , Ea = Za * ib - Sa * ta
          , ua = Za * oa - da * ta
          , pb = Za * Ua - Ta * ta
          , Fa = Sa * oa - da * ib
          , qb = Sa * Ua - Ta * ib
          , rb = da * Ua - Ta * oa
          , Na = ea * W - pa * P
          , $a = ea * U - T * P
          , Bb = ea * Q - L * P
          , Cb = pa * U - T * W
          , Aa = pa * Q - L * W
          , wb = T * Q - L * U
          , Gb = ib * wb - oa * Aa + Ua * Cb
          , Z = ta * wb - oa * Bb + Ua * $a
          , ab = ta * Aa - ib * Bb + Ua * Na
          , Ka = ta * Cb - ib * $a + oa * Na
          , fa = Za * Gb - Sa * Z + da * ab - Ta * Ka;
        0 != fa && (fa = 1 / fa);
        var va = Gb * fa
          , jb = -(Sa * wb - da * Aa + Ta * Cb) * fa
          , bb = (W * rb - U * qb + Q * Fa) * fa
          , fb = -Z * fa
          , Sb = (Za * wb - da * Bb + Ta * $a) * fa
          , wa = -(P * rb - U * pb + Q * ua) * fa
          , Lb = ab * fa
          , Ba = -(Za * Aa - Sa * Bb + Ta * Na) * fa
          , Xb = (P * qb - W * pb + Q * Ea) * fa
          , M = Zb.ta
          , R = this.Oc;
        a.B[M.ya.model.name] = A.j(4, 4, [R.U, R.X, R.O, R.fa, R.V, R.Y, R.P, R.ga, R.W, R.Z, R.R, R.ha, R.ca, R.da, R.ea, R.ia]);
        var I = this.Ja;
        a.B[M.ya.view.name] = A.j(4, 4, [I.U, I.X, I.O, I.fa, I.V, I.Y, I.P, I.ga, I.W, I.Z, I.R, I.ha, I.ca, I.da, I.ea, I.ia]);
        var xa = this.$a;
        a.B[M.ya.ab.name] = A.j(4, 4, [xa.U, xa.X, xa.O, xa.fa, xa.V, xa.Y, xa.P, xa.ga, xa.W, xa.Z, xa.R, xa.ha, xa.ca, xa.da, xa.ea, xa.ia]);
        var J = this.$a
          , aa = J.U
          , ya = J.V
          , za = J.W
          , ob = J.ca
          , ka = J.X
          , Ga = J.Y
          , K = J.Z
          , xb = J.da
          , yb = J.O
          , cb = J.P
          , Oa = J.R
          , Ha = J.ea
          , ha = J.fa
          , X = J.ga
          , sb = J.ha
          , Ia = J.ia
          , qa = aa * Ga - ya * ka
          , Pa = aa * K - za * ka
          , la = aa * xb - ob * ka
          , zb = ya * K - za * Ga
          , tb = ya * xb - ob * Ga
          , Ab = za * xb - ob * K
          , ma = yb * X - cb * ha
          , ba = yb * sb - Oa * ha
          , Ja = yb * Ia - Ha * ha
          , Hb = cb * sb - Oa * X
          , Ib = cb * Ia - Ha * X
          , kb = Oa * Ia - Ha * sb
          , Tb = Ga * kb - K * Ib + xb * Hb
          , S = ka * kb - K * Ja + xb * ba
          , ub = ka * Ib - Ga * Ja + xb * ma
          , Ub = ka * Hb - Ga * ba + K * ma
          , La = aa * Tb - ya * S + za * ub - ob * Ub;
        0 != La && (La = 1 / La);
        a.B[M.ya.Ya.name] = A.j(4, 4, [Tb * La, -S * La, ub * La, -Ub * La, -(ya * kb - za * Ib + ob * Hb) * La, (aa * kb - za * Ja + ob * ba) * La, -(aa * Ib - ya * Ja + ob * ma) * La, (aa * Hb - ya * ba + za * ma) * La, (X * Ab - sb * tb + Ia * zb) * La, -(ha * Ab - sb * la + Ia * Pa) * La, (ha * tb - X * la + Ia * qa) * La, -(ha * zb - X * Pa + sb * qa) * La, -(cb * Ab - Oa * tb + Ha * zb) * La, (yb * Ab - Oa * la + Ha * Pa) * La, -(yb * tb - cb * la + Ha * qa) * La, (yb * zb - cb * Pa + Oa * qa) * La]);
        a.B[M.ya.Za.name] = A.j(4, 4, [Za, ta, ea, P, Sa, ib, pa, W, da, oa, T, U, Ta, Ua, L, Q]);
        var ra = this.$a
          , Mb = ra.U
          , Nb = ra.V
          , Ob = ra.W
          , kc = ra.ca
          , lc = ra.X
          , mc = ra.Y
          , nc = ra.Z
          , vc = ra.da
          , wc = ra.O
          , xc = ra.P
          , yc = ra.R
          , qc = ra.ea
          , $b = ra.fa
          , ac = ra.ga
          , oc = ra.ha
          , bc = ra.ia;
        a.B[M.ya.transform.name] = A.j(4, 4, [Mb * Za + Nb * ta + Ob * ea + kc * P, lc * Za + mc * ta + nc * ea + vc * P, wc * Za + xc * ta + yc * ea + qc * P, $b * Za + ac * ta + oc * ea + bc * P, Mb * Sa + Nb * ib + Ob * pa + kc * W, lc * Sa + mc * ib + nc * pa + vc * W, wc * Sa + xc * ib + yc * pa + qc * W, $b * Sa + ac * ib + oc * pa + bc * W, Mb * da + Nb * oa + Ob * T + kc * U, lc * da + mc * oa + nc * T + vc * U, wc * da + xc * oa + yc * T + qc * U, $b * da + ac * oa + oc * T + bc * U, Mb * Ta + Nb * Ua + Ob * L + kc * Q, lc * Ta + mc * Ua + nc * L + vc * Q, wc * Ta + xc * Ua + yc * L + qc * Q, $b * Ta + ac * Ua + oc * L + bc * Q]);
        a.B[M.ya.Xa.name] = A.j(4, 4, [va, fb, Lb, -Ka * fa, jb, Sb, Ba, (Za * Cb - Sa * $a + da * Na) * fa, bb, wa, Xb, -(P * Fa - W * ua + U * Ea) * fa, -(pa * rb - T * qb + L * Fa) * fa, (ea * rb - T * pb + L * ua) * fa, -(ea * qb - pa * pb + L * Ea) * fa, (ea * Fa - pa * ua + T * Ea) * fa]);
        a.B[M.ya.S.name] = A.j(3, 3, [va, jb, bb, fb, Sb, wa, Lb, Ba, Xb]);
        a.B[M.va.qa.name] = A.G(this.Jb);
        a.B[M.va.La.name] = A.h(this.ke);
        a.B[M.va.Ma.name] = A.h(this.le);
        a.B[M.va.Ra.name] = A.h(this.oe);
        a.B[M.va.Qa.name] = A.h(this.ne);
        a.B[M.va.Na.name] = A.h(this.me);
        a.B[M.wa.name] = A.u(this.wa);
        for (var zc = 0, Cc = this.wa; zc < Cc; ) {
            var Yb = zc++
              , gb = this.Ja
              , db = this.Db[Yb].Dd;
            a.B[Od.get(M.Ea, Yb).position.name] = A.Ud(gb.U * db.x + gb.V * db.y + gb.W * db.z + gb.ca * db.w, gb.X * db.x + gb.Y * db.y + gb.Z * db.z + gb.da * db.w, gb.O * db.x + gb.P * db.y + gb.R * db.z + gb.ea * db.w, gb.fa * db.x + gb.ga * db.y + gb.ha * db.z + gb.ia * db.w);
            var Jb = this.Ja
              , Kb = this.Db[Yb].yd;
            a.B[Od.get(M.Ea, Yb).S.name] = A.Tb(Jb.U * Kb.x + Jb.V * Kb.y + Jb.W * Kb.z, Jb.X * Kb.x + Jb.Y * Kb.y + Jb.Z * Kb.z, Jb.O * Kb.x + Jb.P * Kb.y + Jb.R * Kb.z);
            var rc = this.Db[Yb].gd;
            a.B[Od.get(M.Ea, Yb).color.name] = A.Tb(rc.x, rc.y, rc.z)
        }
    }
    ;
    V.prototype.zf = function(a) {
        this.Nf();
        a.bb(this.kd)
    }
    ;
    V.v = !0;
    Eg.v = !0;
    pg.prototype.expand = function() {
        var a = this.data;
        this.data = new Int32Array(this.maxLength <<= 1);
        this.data.set(a)
    }
    ;
    pg.v = !0;
    Dg.v = !0;
    Cg(te, O);
    te.prototype.$ = function(a, b) {
        this.va = new Dg;
        this.mode = 4;
        this.yf = [];
        O.prototype.$.call(this, a);
        var c = Zb.attributes;
        this.position = new Kd({
            buffer: Hd.h(new Gc(a,34962)),
            size: 3,
            xc: 0,
            offset: 0
        },c.Ua.location);
        this.color = new Kd({
            buffer: Hd.h(new Gc(a,34962)),
            size: 4,
            xc: 0,
            offset: 0
        },c.Sa.location);
        this.S = new Kd({
            buffer: Hd.h(new Gc(a,34962)),
            size: 3,
            xc: 0,
            offset: 0
        },c.Ta.location);
        this.Gd = new Kd({
            buffer: Hd.h(new Gc(a,34962)),
            size: 2,
            xc: 0,
            offset: 0
        },c.Va.location);
        this.index = new og(a);
        c = this.position.buffer.buffer;
        switch (c.m) {
        case 0:
            throw lb.fb("float buffer expected");
        case 1:
            var g = c.buffer
        }
        c = this.color.buffer.buffer;
        switch (c.m) {
        case 0:
            throw lb.fb("float buffer expected");
        case 1:
            var f = c.buffer
        }
        c = this.S.buffer.buffer;
        switch (c.m) {
        case 0:
            throw lb.fb("float buffer expected");
        case 1:
            var d = c.buffer
        }
        c = this.Gd.buffer.buffer;
        switch (c.m) {
        case 0:
            throw lb.fb("float buffer expected");
        case 1:
            var h = c.buffer
        }
        this.bg = new Ae(g,f,d,h,this.index.buffer);
        g = Array(b.length);
        f = 0;
        for (d = b.length; f < d; ) {
            h = f++;
            c = b[h];
            var n = void 0;
            switch (c.m) {
            case 0:
                c = c.location;
                null != c && (this.position.location = c);
                n = this.position;
                break;
            case 1:
                c = c.location;
                null != c && (this.color.location = c);
                n = this.color;
                break;
            case 2:
                c = c.location;
                null != c && (this.S.location = c);
                n = this.S;
                break;
            case 3:
                c = c.location;
                null != c && (this.Gd.location = c);
                n = this.Gd;
                break;
            case 4:
                n = c.ld,
                c = new Kd(c.buffer,c.location,null == n ? 0 : n),
                this.yf.push(c),
                n = c
            }
            g[h] = n
        }
        this.uc = new re(a,g,this.index)
    }
    ;
    te.prototype.bb = function(a) {
        this.va.Qb.bind([a, this.va.Yf]);
        this.uc.mode = this.mode;
        this.uc.bb()
    }
    ;
    te.v = !0;
    Ae.prototype.clear = function() {
        var a = this.ka;
        a.length = 0;
        a.i = !0;
        a = this.ba;
        a.length = 0;
        a.i = !0;
        a = this.ja;
        a.length = 0;
        a.i = !0;
        a = this.la;
        a.length = 0;
        a.i = !0;
        a = this.aa;
        a.length = 0;
        a.i = !0;
        this.H = 0
    }
    ;
    Ae.prototype.upload = function() {
        var a = this.ka;
        a.i && (a.i = !1,
        a.buffer.upload(new Float32Array(a.data.buffer,0,a.length), a.usage));
        a = this.ba;
        a.i && (a.i = !1,
        a.buffer.upload(new Float32Array(a.data.buffer,0,a.length), a.usage));
        a = this.ja;
        a.i && (a.i = !1,
        a.buffer.upload(new Float32Array(a.data.buffer,0,a.length), a.usage));
        a = this.la;
        a.i && (a.i = !1,
        a.buffer.upload(new Float32Array(a.data.buffer,0,a.length), a.usage));
        a = this.aa;
        a.i && (a.i = !1,
        a.buffer.upload(new Int32Array(a.data.buffer,0,a.length), a.usage))
    }
    ;
    Ae.v = !0;
    se.prototype.sd = function() {
        return this.Ia[this.Vc]
    }
    ;
    se.v = !0;
    Cg(sc, O);
    sc.prototype.$ = function(a) {
        this.Id = new Jd;
        this.Yc = new Jd;
        this.Eb = 0;
        O.prototype.$.call(this, a);
        this.Oa = new nd(a)
    }
    ;
    sc.prototype.Df = function(a) {
        return null != this.getUniformLocation(a)
    }
    ;
    sc.prototype.compile = function(a, b, c) {
        this.Yc.B = Object.create(null);
        this.Id.B = Object.create(null);
        var g = !1;
        this.Oa.compile(a, b, c, function(f) {
            f = f + "\nvertex shader source:\n" + a;
            window.alert(dd.Rb(f));
            r.console.log(f);
            g = !0
        }, function(f) {
            f = f + "\nfragment shader source:\n" + b;
            window.alert(dd.Rb(f));
            r.console.log(f);
            g = !0
        }, function(f) {
            g || window.alert(dd.Rb(f));
            r.console.log(f)
        })
    }
    ;
    sc.prototype.bind = function(a) {
        if (!this.Oa.Yd)
            throw Error("shader is not compiled");
        this.Oa.use();
        this.uf(a)
    }
    ;
    sc.prototype.uf = function(a) {
        for (var b = this.Eb = 0; b < a.length; )
            for (var c = a[b++].B, g = Object.keys(c), f = g.length, d = 0; d < f; ) {
                var h = g[d++]
                  , n = c[h];
                this.Df(h) && this.tf(h, this.getUniformLocation(h), n)
            }
        this.g.activeTexture(33984)
    }
    ;
    sc.prototype.tf = function(a, b, c) {
        var g = this.Id.B[a]
          , f = -1
          , d = -1
          , h = -1;
        switch (c.m) {
        case 0:
            f = 0;
            h = d = 1;
            break;
        case 1:
            f = 0;
            d = 2;
            h = 1;
            break;
        case 2:
            f = 0;
            d = 3;
            h = 1;
            break;
        case 3:
            f = 0;
            d = 4;
            h = 1;
            break;
        case 4:
            h = d = f = 1;
            break;
        case 5:
            f = 1;
            d = 2;
            h = 1;
            break;
        case 6:
            f = 1;
            d = 3;
            h = 1;
            break;
        case 7:
            f = 1;
            d = 4;
            h = 1;
            break;
        case 8:
            f = 2;
            h = d = 1;
            break;
        case 9:
            d = f = 2;
            h = 1;
            break;
        case 10:
            f = 2;
            d = 3;
            h = 1;
            break;
        case 11:
            f = 2;
            d = 4;
            h = 1;
            break;
        case 12:
            h = d = f = 1;
            break;
        case 13:
            f = 1;
            d = 2;
            h = 1;
            break;
        case 14:
            f = 1;
            d = 3;
            h = 1;
            break;
        case 15:
            f = 1;
            d = 4;
            h = 1;
            break;
        case 16:
            f = 0;
            d = c.rows;
            h = c.cols;
            break;
        case 17:
            h = d = f = 1;
            break;
        case 18:
            f = 0;
            d = 1;
            h = c.N.length;
            break;
        case 19:
            var n = c.N;
            f = 0;
            d = n[0].length;
            h = n.length;
            break;
        case 20:
            d = f = 1;
            h = c.N.length;
            break;
        case 21:
            var l = c.N;
            f = 1;
            d = l[0].length;
            h = l.length;
            break;
        case 22:
            f = 2;
            d = 1;
            h = c.N.length;
            break;
        case 23:
            var x = c.N;
            f = 2;
            d = x[0].length;
            h = x.length;
            break;
        case 24:
            d = f = 1;
            h = c.N.length;
            break;
        case 25:
            var q = c.N;
            f = 1;
            d = q[0].length;
            h = q.length;
            break;
        case 26:
            var u = c.cols
              , D = c.rows;
            f = 0;
            d = D;
            h = u * c.N.length;
            if (2 > u || 2 > D || 4 < u || 4 < D)
                throw lb.fb("invalid matrix size: " + u + ", " + D);
            break;
        case 27:
            d = f = 1,
            h = c.ze.length
        }
        var p = null
          , m = null
          , y = null;
        if (null == g)
            var ca = !1;
        else
            switch (g.m) {
            case 0:
                var hb = g.N;
                p = hb;
                ca = 0 == f && d == g.Wa && d * h == hb.length;
                break;
            case 1:
                var mb = g.N;
                m = mb;
                ca = 1 == f && d == g.Wa && d * h == mb.length;
                break;
            case 2:
                var ja = g.N;
                y = ja;
                ca = 2 == f && d == g.Wa && d * h == ja.length
            }
        if (!ca)
            switch (f) {
            case 0:
                p = new Float32Array(d * h);
                g = Id.Ec(d, p);
                break;
            case 1:
                m = new Int32Array(d * h);
                g = Id.Fc(d, m);
                break;
            default:
                y = new Uint32Array(d * h),
                g = Id.Gc(d, y)
            }
        var t = ca;
        switch (c.m) {
        case 0:
            var Qa = c.x;
            t = t && p[0] == Qa;
            p[0] = Qa;
            break;
        case 1:
            var Db = c.x
              , Eb = c.y;
            t = t && p[0] == Db && p[1] == Eb;
            p[0] = Db;
            p[1] = Eb;
            break;
        case 2:
            var eb = c.x
              , Wa = c.y
              , Fb = c.z;
            t = t && p[0] == eb && p[1] == Wa && p[2] == Fb;
            p[0] = eb;
            p[1] = Wa;
            p[2] = Fb;
            break;
        case 3:
            var Xa = c.x
              , Ya = c.y
              , nb = c.z
              , Y = c.w;
            t = t && p[0] == Xa && p[1] == Ya && p[2] == nb && p[3] == Y;
            p[0] = Xa;
            p[1] = Ya;
            p[2] = nb;
            p[3] = Y;
            break;
        case 4:
            var Ma = c.x;
            t = t && m[0] == Ma;
            m[0] = Ma;
            break;
        case 5:
            var N = c.x
              , Ra = c.y;
            t = t && m[0] == N && m[1] == Ra;
            m[0] = N;
            m[1] = Ra;
            break;
        case 6:
            var Da = c.x
              , Za = c.y
              , Sa = c.z;
            t = t && m[0] == Da && m[1] == Za && m[2] == Sa;
            m[0] = Da;
            m[1] = Za;
            m[2] = Sa;
            break;
        case 7:
            var da = c.x
              , Ta = c.y
              , ta = c.z
              , ib = c.w;
            t = t && m[0] == da && m[1] == Ta && m[2] == ta && m[3] == ib;
            m[0] = da;
            m[1] = Ta;
            m[2] = ta;
            m[3] = ib;
            break;
        case 8:
            var oa = c.x;
            t = t && y[0] == oa;
            y[0] = oa;
            break;
        case 9:
            var Ua = c.x
              , ea = c.y;
            t = t && y[0] == Ua && y[1] == ea;
            y[0] = Ua;
            y[1] = ea;
            break;
        case 10:
            var pa = c.x
              , T = c.y
              , L = c.z;
            t = t && y[0] == pa && y[1] == T && y[2] == L;
            y[0] = pa;
            y[1] = T;
            y[2] = L;
            break;
        case 11:
            var P = c.x
              , W = c.y
              , U = c.z
              , Q = c.w;
            t = t && y[0] == P && y[1] == W && y[2] == U && y[3] == Q;
            y[0] = P;
            y[1] = W;
            y[2] = U;
            y[3] = Q;
            break;
        case 12:
            var Ea = c.x;
            t = t && m[0] == (Ea ? 1 : 0);
            m[0] = Ea ? 1 : 0;
            break;
        case 13:
            var ua = c.x
              , pb = c.y;
            t = t && m[0] == (ua ? 1 : 0) && m[1] == (pb ? 1 : 0);
            m[0] = ua ? 1 : 0;
            m[1] = pb ? 1 : 0;
            break;
        case 14:
            var Fa = c.x
              , qb = c.y
              , rb = c.z;
            t = t && m[0] == (Fa ? 1 : 0) && m[1] == (qb ? 1 : 0) && m[2] == (rb ? 1 : 0);
            m[0] = Fa ? 1 : 0;
            m[1] = qb ? 1 : 0;
            m[2] = rb ? 1 : 0;
            break;
        case 15:
            var Na = c.x
              , $a = c.y
              , Bb = c.z
              , Cb = c.w;
            t = t && m[0] == (Na ? 1 : 0) && m[1] == ($a ? 1 : 0) && m[2] == (Bb ? 1 : 0) && m[3] == (Cb ? 1 : 0);
            m[0] = Na ? 1 : 0;
            m[1] = $a ? 1 : 0;
            m[2] = Bb ? 1 : 0;
            m[3] = Cb ? 1 : 0;
            break;
        case 16:
            for (var Aa = c.N, wb = 0; wb < Aa.length; ) {
                var Gb = Aa[wb]
                  , Z = wb++;
                t = t && p[Z] == Gb;
                p[Z] = Gb
            }
            break;
        case 17:
            var ab = c.t;
            t = t && m[0] == this.Eb;
            m[0] = this.Eb;
            this.g.activeTexture(33984 + this.Eb);
            this.g.bindTexture(3553, null == ab ? null : ab.qa);
            this.Eb++;
            break;
        case 18:
            for (var Ka = c.N, fa = 0; fa < Ka.length; ) {
                var va = Ka[fa]
                  , jb = fa++;
                t = t && p[jb] == va;
                p[jb] = va
            }
            break;
        case 19:
            for (var bb = c.N, fb = 0, Sb = 0; Sb < bb.length; ) {
                var wa = bb[Sb];
                ++Sb;
                for (var Lb = 0; Lb < wa.length; ) {
                    var Ba = wa[Lb];
                    ++Lb;
                    t = t && p[fb] == Ba;
                    p[fb] = Ba;
                    ++fb
                }
            }
            break;
        case 20:
            for (var Xb = c.N, M = 0; M < Xb.length; ) {
                var R = Xb[M]
                  , I = M++;
                t = t && m[I] == R;
                m[I] = R
            }
            break;
        case 21:
            for (var xa = c.N, J = 0, aa = 0; aa < xa.length; ) {
                var ya = xa[aa];
                ++aa;
                for (var za = 0; za < ya.length; ) {
                    var ob = ya[za];
                    ++za;
                    t = t && m[J] == ob;
                    m[J] = ob;
                    ++J
                }
            }
            break;
        case 22:
            for (var ka = c.N, Ga = 0; Ga < ka.length; ) {
                var K = ka[Ga]
                  , xb = Ga++;
                t = t && y[xb] == K;
                y[xb] = K
            }
            break;
        case 23:
            for (var yb = c.N, cb = 0, Oa = 0; Oa < yb.length; ) {
                var Ha = yb[Oa];
                ++Oa;
                for (var ha = 0; ha < Ha.length; ) {
                    var X = Ha[ha];
                    ++ha;
                    t = t && y[cb] == X;
                    y[cb] = X;
                    ++cb
                }
            }
            break;
        case 24:
            for (var sb = c.N, Ia = 0; Ia < sb.length; ) {
                var qa = sb[Ia]
                  , Pa = Ia++;
                t = t && m[Pa] == (qa ? 1 : 0);
                m[Pa] = qa ? 1 : 0
            }
            break;
        case 25:
            for (var la = c.N, zb = 0, tb = 0; tb < la.length; ) {
                var Ab = la[tb];
                ++tb;
                for (var ma = 0; ma < Ab.length; ) {
                    var ba = Ab[ma];
                    ++ma;
                    t = t && m[zb] == (ba ? 1 : 0);
                    m[zb] = ba ? 1 : 0;
                    ++zb
                }
            }
            break;
        case 26:
            for (var Ja = c.N, Hb = 0, Ib = 0; Ib < Ja.length; ) {
                var kb = Ja[Ib];
                ++Ib;
                for (var Tb = 0; Tb < kb.length; ) {
                    var S = kb[Tb];
                    ++Tb;
                    t = t && p[Hb] == S;
                    p[Hb] = S;
                    ++Hb
                }
            }
            break;
        case 27:
            for (var ub = c.ze, Ub = 0; Ub < ub.length; ) {
                var La = ub[Ub++]
                  , ra = Ub - 1;
                t = t && m[ra] == this.Eb;
                m[ra] = this.Eb;
                this.g.activeTexture(33984 + this.Eb);
                this.g.bindTexture(3553, La.qa);
                this.Eb++
            }
        }
        if (!t)
            switch (this.Id.B[a] = g,
            c.m) {
            case 16:
                var Mb = c.rows;
                switch (c.cols) {
                case 2:
                    switch (Mb) {
                    case 2:
                        this.g.uniformMatrix2fv(b, !1, p);
                        break;
                    case 3:
                        this.g.uniformMatrix2x3fv(b, !1, p);
                        break;
                    case 4:
                        this.g.uniformMatrix2x4fv(b, !1, p);
                        break;
                    default:
                        this.g.uniformMatrix4fv(b, !1, p)
                    }
                    break;
                case 3:
                    switch (Mb) {
                    case 2:
                        this.g.uniformMatrix3x2fv(b, !1, p);
                        break;
                    case 3:
                        this.g.uniformMatrix3fv(b, !1, p);
                        break;
                    case 4:
                        this.g.uniformMatrix3x4fv(b, !1, p);
                        break;
                    default:
                        this.g.uniformMatrix4fv(b, !1, p)
                    }
                    break;
                case 4:
                    switch (Mb) {
                    case 2:
                        this.g.uniformMatrix4x2fv(b, !1, p);
                        break;
                    case 3:
                        this.g.uniformMatrix4x3fv(b, !1, p);
                        break;
                    default:
                        this.g.uniformMatrix4fv(b, !1, p)
                    }
                    break;
                default:
                    this.g.uniformMatrix4fv(b, !1, p)
                }
                break;
            case 26:
                var Nb = c.rows;
                switch (c.cols) {
                case 2:
                    switch (Nb) {
                    case 2:
                        this.g.uniformMatrix2fv(b, !1, p);
                        break;
                    case 3:
                        this.g.uniformMatrix2x3fv(b, !1, p);
                        break;
                    case 4:
                        this.g.uniformMatrix2x4fv(b, !1, p);
                        break;
                    default:
                        this.g.uniformMatrix4fv(b, !1, p)
                    }
                    break;
                case 3:
                    switch (Nb) {
                    case 2:
                        this.g.uniformMatrix3x2fv(b, !1, p);
                        break;
                    case 3:
                        this.g.uniformMatrix3fv(b, !1, p);
                        break;
                    case 4:
                        this.g.uniformMatrix3x4fv(b, !1, p);
                        break;
                    default:
                        this.g.uniformMatrix4fv(b, !1, p)
                    }
                    break;
                case 4:
                    switch (Nb) {
                    case 2:
                        this.g.uniformMatrix4x2fv(b, !1, p);
                        break;
                    case 3:
                        this.g.uniformMatrix4x3fv(b, !1, p);
                        break;
                    default:
                        this.g.uniformMatrix4fv(b, !1, p)
                    }
                    break;
                default:
                    this.g.uniformMatrix4fv(b, !1, p)
                }
                break;
            default:
                switch (f) {
                case 0:
                    switch (d) {
                    case 1:
                        this.g.uniform1fv(b, p);
                        break;
                    case 2:
                        this.g.uniform2fv(b, p);
                        break;
                    case 3:
                        this.g.uniform3fv(b, p);
                        break;
                    case 4:
                        this.g.uniform4fv(b, p);
                        break;
                    default:
                        this.g.uniform4uiv(b, y)
                    }
                    break;
                case 1:
                    switch (d) {
                    case 1:
                        this.g.uniform1iv(b, m);
                        break;
                    case 2:
                        this.g.uniform2iv(b, m);
                        break;
                    case 3:
                        this.g.uniform3iv(b, m);
                        break;
                    case 4:
                        this.g.uniform4iv(b, m);
                        break;
                    default:
                        this.g.uniform4uiv(b, y)
                    }
                    break;
                case 2:
                    switch (d) {
                    case 1:
                        this.g.uniform1uiv(b, y);
                        break;
                    case 2:
                        this.g.uniform2uiv(b, y);
                        break;
                    case 3:
                        this.g.uniform3uiv(b, y);
                        break;
                    default:
                        this.g.uniform4uiv(b, y)
                    }
                    break;
                default:
                    this.g.uniform4uiv(b, y)
                }
            }
    }
    ;
    sc.prototype.getUniformLocation = function(a) {
        if (Object.prototype.hasOwnProperty.call(this.Yc.B, a))
            return this.Yc.B[a];
        var b = this.Oa.getUniformLocation(a);
        return this.Yc.B[a] = b
    }
    ;
    sc.v = !0;
    var Id = Ic["pot.graphics.gl._Shader.InternalUniformValue"] = {
        Ab: !0,
        za: null,
        Ec: (k = function(a, b) {
            return {
                m: 0,
                Wa: a,
                N: b,
                o: "pot.graphics.gl._Shader.InternalUniformValue",
                toString: z
            }
        }
        ,
        k.s = "Floats",
        k.F = ["dim", "vs"],
        k),
        Fc: (k = function(a, b) {
            return {
                m: 1,
                Wa: a,
                N: b,
                o: "pot.graphics.gl._Shader.InternalUniformValue",
                toString: z
            }
        }
        ,
        k.s = "Ints",
        k.F = ["dim", "vs"],
        k),
        Gc: (k = function(a, b) {
            return {
                m: 2,
                Wa: a,
                N: b,
                o: "pot.graphics.gl._Shader.InternalUniformValue",
                toString: z
            }
        }
        ,
        k.s = "UInts",
        k.F = ["dim", "vs"],
        k)
    };
    Id.za = [Id.Ec, Id.Fc, Id.Gc];
    Cg(Kc, O);
    Kc.prototype.je = function() {
        switch (this.type) {
        case 5121:
            return 32856;
        case 5124:
            return 36226;
        case 5125:
            return 36208;
        case 5126:
            return 34836;
        case 5131:
            return 34842
        }
    }
    ;
    Kc.prototype.od = function() {
        switch (this.type) {
        case 5124:
        case 5125:
            return 36249;
        case 5121:
        case 5126:
        case 5131:
            return 6408
        }
    }
    ;
    Kc.prototype.Ff = function(a, b, c) {
        this.width = a;
        this.height = b;
        this.type = c;
        this.g.bindTexture(3553, this.qa);
        this.g.texImage2D(3553, 0, this.je(), a, b, 0, this.od(), c, null);
        this.g.bindTexture(3553, null);
        switch (c) {
        case 5124:
        case 5125:
            this.Gb = 9728
        }
        this.Gb = a = this.Gb;
        this.g.bindTexture(3553, this.qa);
        switch (a) {
        case 9728:
            this.g.texParameteri(3553, 10240, 9728);
            this.g.texParameteri(3553, 10241, 9728);
            break;
        case 9729:
            this.g.texParameteri(3553, 10240, 9729),
            this.g.texParameteri(3553, 10241, 9729)
        }
        this.g.bindTexture(3553, null);
        a = this.Wc;
        b = this.Xc;
        this.Wc = a;
        this.Xc = b;
        this.g.bindTexture(3553, this.qa);
        this.g.texParameteri(3553, 10242, a);
        this.g.texParameteri(3553, 10243, b);
        this.g.bindTexture(3553, null);
        this.ie()
    }
    ;
    Kc.prototype.load = function(a, b, c) {
        null == c && (c = !0);
        this.width = a.width;
        this.height = a.height;
        this.type = b;
        this.g.pixelStorei(37440, c);
        this.g.bindTexture(3553, this.qa);
        this.g.texImage2D(3553, 0, this.je(), this.od(), b, a.source);
        this.g.bindTexture(3553, null);
        this.g.pixelStorei(37440, !0);
        switch (b) {
        case 5124:
        case 5125:
            this.Gb = 9728
        }
        this.Gb = a = this.Gb;
        this.g.bindTexture(3553, this.qa);
        switch (a) {
        case 9728:
            this.g.texParameteri(3553, 10240, 9728);
            this.g.texParameteri(3553, 10241, 9728);
            break;
        case 9729:
            this.g.texParameteri(3553, 10240, 9729),
            this.g.texParameteri(3553, 10241, 9729)
        }
        this.g.bindTexture(3553, null);
        a = this.Wc;
        b = this.Xc;
        this.Wc = a;
        this.Xc = b;
        this.g.bindTexture(3553, this.qa);
        this.g.texParameteri(3553, 10242, a);
        this.g.texParameteri(3553, 10243, b);
        this.g.bindTexture(3553, null);
        this.ie()
    }
    ;
    Kc.prototype.sync = function() {
        this.g.bindFramebuffer(36160, this.ee.qd);
        var a = this.g
          , b = this.od();
        switch (this.type) {
        case 5121:
            var c = new Uint8Array(4);
            break;
        case 5124:
            c = new Int32Array(4);
            break;
        case 5125:
            c = new Uint32Array(4);
            break;
        case 5126:
            c = new Float32Array(4);
            break;
        case 5131:
            c = new Uint16Array(4)
        }
        a.readPixels(0, 0, 1, 1, b, this.type, c);
        this.g.bindFramebuffer(36160, null)
    }
    ;
    Kc.prototype.ie = function() {
        this.ee.he()
    }
    ;
    Kc.prototype.filter = function(a, b) {
        null == b && (b = !1);
        this.Gb = a;
        this.g.bindTexture(3553, this.qa);
        switch (a) {
        case 9728:
            this.g.texParameteri(3553, 10240, 9728);
            b ? this.g.texParameteri(3553, 10241, 9984) : this.g.texParameteri(3553, 10241, 9728);
            break;
        case 9729:
            this.g.texParameteri(3553, 10240, 9729),
            b ? this.g.texParameteri(3553, 10241, 9987) : this.g.texParameteri(3553, 10241, 9729)
        }
        b && this.g.generateMipmap(3553);
        this.g.bindTexture(3553, null)
    }
    ;
    Kc.v = !0;
    var Hd = Ic["pot.graphics.gl.TypedBuffer"] = {
        Ab: !0,
        za: null,
        u: (k = function(a) {
            return {
                m: 0,
                buffer: a,
                o: "pot.graphics.gl.TypedBuffer",
                toString: z
            }
        }
        ,
        k.s = "Int",
        k.F = ["buffer"],
        k),
        h: (k = function(a) {
            return {
                m: 1,
                buffer: a,
                o: "pot.graphics.gl.TypedBuffer",
                toString: z
            }
        }
        ,
        k.s = "Float",
        k.F = ["buffer"],
        k)
    };
    Hd.za = [Hd.u, Hd.h];
    var A = Ic["pot.graphics.gl.UniformValue"] = {
        Ab: !0,
        za: null,
        h: (k = function(a) {
            return {
                m: 0,
                x: a,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "Float",
        k.F = ["x"],
        k),
        lf: (k = function(a, b) {
            return {
                m: 1,
                x: a,
                y: b,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "Vec2",
        k.F = ["x", "y"],
        k),
        Tb: (k = function(a, b, c) {
            return {
                m: 2,
                x: a,
                y: b,
                z: c,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "Vec3",
        k.F = ["x", "y", "z"],
        k),
        Ud: (k = function(a, b, c, g) {
            return {
                m: 3,
                x: a,
                y: b,
                z: c,
                w: g,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "Vec4",
        k.F = ["x", "y", "z", "w"],
        k),
        u: (k = function(a) {
            return {
                m: 4,
                x: a,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "Int",
        k.F = ["x"],
        k),
        Pd: (k = function(a, b) {
            return {
                m: 5,
                x: a,
                y: b,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "IVec2",
        k.F = ["x", "y"],
        k),
        Qd: (k = function(a, b, c) {
            return {
                m: 6,
                x: a,
                y: b,
                z: c,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "IVec3",
        k.F = ["x", "y", "z"],
        k),
        Re: (k = function(a, b, c, g) {
            return {
                m: 7,
                x: a,
                y: b,
                z: c,
                w: g,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "IVec4",
        k.F = ["x", "y", "z", "w"],
        k),
        dc: (k = function(a) {
            return {
                m: 8,
                x: a,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "UInt",
        k.F = ["x"],
        k),
        gf: (k = function(a, b) {
            return {
                m: 9,
                x: a,
                y: b,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "UVec2",
        k.F = ["x", "y"],
        k),
        hf: (k = function(a, b, c) {
            return {
                m: 10,
                x: a,
                y: b,
                z: c,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "UVec3",
        k.F = ["x", "y", "z"],
        k),
        jf: (k = function(a, b, c, g) {
            return {
                m: 11,
                x: a,
                y: b,
                z: c,
                w: g,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "UVec4",
        k.F = ["x", "y", "z", "w"],
        k),
        Sb: (k = function(a) {
            return {
                m: 12,
                x: a,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "Bool",
        k.F = ["x"],
        k),
        He: (k = function(a, b) {
            return {
                m: 13,
                x: a,
                y: b,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "BVec2",
        k.F = ["x", "y"],
        k),
        Ie: (k = function(a, b, c) {
            return {
                m: 14,
                x: a,
                y: b,
                z: c,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "BVec3",
        k.F = ["x", "y", "z"],
        k),
        Je: (k = function(a, b, c, g) {
            return {
                m: 15,
                x: a,
                y: b,
                z: c,
                w: g,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "BVec4",
        k.F = ["x", "y", "z", "w"],
        k),
        j: (k = function(a, b, c) {
            return {
                m: 16,
                cols: a,
                rows: b,
                N: c,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "Mat",
        k.F = ["cols", "rows", "vs"],
        k),
        G: (k = function(a) {
            return {
                m: 17,
                t: a,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "Sampler",
        k.F = ["t"],
        k),
        Ec: (k = function(a) {
            return {
                m: 18,
                N: a,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "Floats",
        k.F = ["vs"],
        k),
        mf: (k = function(a) {
            return {
                m: 19,
                N: a,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "Vecs",
        k.F = ["vs"],
        k),
        Fc: (k = function(a) {
            return {
                m: 20,
                N: a,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "Ints",
        k.F = ["vs"],
        k),
        Se: (k = function(a) {
            return {
                m: 21,
                N: a,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "IVecs",
        k.F = ["vs"],
        k),
        Gc: (k = function(a) {
            return {
                m: 22,
                N: a,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "UInts",
        k.F = ["vs"],
        k),
        kf: (k = function(a) {
            return {
                m: 23,
                N: a,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "UVecs",
        k.F = ["vs"],
        k),
        Le: (k = function(a) {
            return {
                m: 24,
                N: a,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "Bools",
        k.F = ["vs"],
        k),
        Ke: (k = function(a) {
            return {
                m: 25,
                N: a,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "BVecs",
        k.F = ["vs"],
        k),
        Ue: (k = function(a, b, c) {
            return {
                m: 26,
                cols: a,
                rows: b,
                N: c,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "Mats",
        k.F = ["cols", "rows", "vs"],
        k),
        bf: (k = function(a) {
            return {
                m: 27,
                ze: a,
                o: "pot.graphics.gl.UniformValue",
                toString: z
            }
        }
        ,
        k.s = "Samplers",
        k.F = ["ts"],
        k)
    };
    A.za = [A.h, A.lf, A.Tb, A.Ud, A.u, A.Pd, A.Qd, A.Re, A.dc, A.gf, A.hf, A.jf, A.Sb, A.He, A.Ie, A.Je, A.j, A.G, A.Ec, A.mf, A.Fc, A.Se, A.Gc, A.kf, A.Le, A.Ke, A.Ue, A.bf];
    Kd.v = !0;
    Cg(Gc, O);
    Gc.prototype.$ = function(a, b) {
        this.length = 0;
        O.prototype.$.call(this, a);
        this.kind = b;
        this.buffer = a.createBuffer()
    }
    ;
    Gc.prototype.upload = function(a, b) {
        this.length = a.length;
        this.g.bindBuffer(this.kind, this.buffer);
        this.g.bufferData(this.kind, a, b);
        this.g.bindBuffer(this.kind, null)
    }
    ;
    Gc.prototype.download = function(a, b) {
        this.g.bindBuffer(this.kind, this.buffer);
        this.g.getBufferSubData(this.kind, a * Float32Array.BYTES_PER_ELEMENT, b);
        this.g.bindBuffer(this.kind, null)
    }
    ;
    Gc.prototype.sync = function() {
        this.g.bindBuffer(this.kind, this.buffer);
        this.g.getBufferSubData(this.kind, 0, new Float32Array(1));
        this.g.bindBuffer(this.kind, null)
    }
    ;
    Gc.prototype.vertexAttribPointer = function(a, b, c, g) {
        if (34962 != this.kind)
            throw lb.fb("assertion error");
        this.g.bindBuffer(this.kind, this.buffer);
        this.g.vertexAttribPointer(a, b, 5126, !1, c, g);
        this.g.bindBuffer(this.kind, null)
    }
    ;
    Gc.v = !0;
    Cg(og, O);
    og.v = !0;
    Cg(fd, O);
    fd.prototype.$ = function(a, b) {
        this.length = 0;
        O.prototype.$.call(this, a);
        this.kind = b;
        this.buffer = a.createBuffer()
    }
    ;
    fd.prototype.upload = function(a, b) {
        this.length = a.length;
        this.g.bindBuffer(this.kind, this.buffer);
        this.g.bufferData(this.kind, a, b);
        this.g.bindBuffer(this.kind, null)
    }
    ;
    fd.prototype.download = function(a, b) {
        this.g.bindBuffer(this.kind, this.buffer);
        this.g.getBufferSubData(this.kind, a * Int32Array.BYTES_PER_ELEMENT, b);
        this.g.bindBuffer(this.kind, null)
    }
    ;
    fd.prototype.sync = function() {
        this.g.bindBuffer(this.kind, this.buffer);
        this.g.getBufferSubData(this.kind, 0, new Int32Array(1));
        this.g.bindBuffer(this.kind, null)
    }
    ;
    fd.prototype.vertexAttribPointer = function(a, b, c, g) {
        if (34962 != this.kind)
            throw lb.fb("assertion error");
        this.g.bindBuffer(this.kind, this.buffer);
        this.g.vertexAttribIPointer(a, b, 5124, c, g);
        this.g.bindBuffer(this.kind, null)
    }
    ;
    fd.v = !0;
    Cg(nd, O);
    nd.prototype.$ = function(a) {
        this.Yd = !1;
        O.prototype.$.call(this, a);
        this.Oa = a.createProgram();
        this.Bc = a.createShader(35633);
        this.pc = a.createShader(35632)
    }
    ;
    nd.prototype.compile = function(a, b, c, g, f, d) {
        this.g.shaderSource(this.Bc, a);
        this.g.compileShader(this.Bc);
        this.g.getShaderParameter(this.Bc, 35713) || g(this.g.getShaderInfoLog(this.Bc));
        this.g.shaderSource(this.pc, b);
        this.g.compileShader(this.pc);
        this.g.getShaderParameter(this.pc, 35713) || f(this.g.getShaderInfoLog(this.pc));
        this.g.attachShader(this.Oa, this.Bc);
        this.g.attachShader(this.Oa, this.pc);
        null != c && this.g.transformFeedbackVaryings(this.Oa, c.dg, c.kind);
        this.g.linkProgram(this.Oa);
        this.g.getProgramParameter(this.Oa, 35714) ? this.Yd = !0 : d(this.g.getProgramInfoLog(this.Oa))
    }
    ;
    nd.prototype.use = function() {
        this.g.useProgram(this.Oa)
    }
    ;
    nd.prototype.getUniformLocation = function(a) {
        return this.g.getUniformLocation(this.Oa, a)
    }
    ;
    nd.v = !0;
    Cg(md, O);
    md.prototype.$ = function(a) {
        this.ed = [];
        O.prototype.$.call(this, a);
        this.ye = a.createTransformFeedback()
    }
    ;
    md.prototype.bind = function() {
        this.g.bindTransformFeedback(36386, this.ye)
    }
    ;
    md.prototype.bindBuffer = function(a, b) {
        null == b ? (Pd.remove(this.ed, a),
        this.g.bindBufferBase(35982, a, null)) : (this.ed.includes(a) || this.ed.push(a),
        this.g.bindBufferBase(35982, a, b.buffer))
    }
    ;
    md.prototype.end = function() {
        this.g.disable(35977);
        this.g.endTransformFeedback()
    }
    ;
    md.v = !0;
    Cg(re, O);
    re.prototype.$ = function(a, b, c) {
        this.mode = 4;
        O.prototype.$.call(this, a);
        this.attributes = b.slice();
        this.Ef = c;
        this.uc = a.createVertexArray();
        a.bindVertexArray(this.uc);
        for (var g = 0; g < b.length; ) {
            var f = b[g];
            ++g;
            f.g.enableVertexAttribArray(f.location);
            f.g.vertexAttribDivisor(f.location, f.ld);
            var d = f.buffer.buffer;
            switch (d.m) {
            case 0:
                d.buffer.vertexAttribPointer(f.location, f.buffer.size, f.buffer.xc, f.buffer.offset);
                break;
            case 1:
                d.buffer.vertexAttribPointer(f.location, f.buffer.size, f.buffer.xc, f.buffer.offset)
            }
        }
        c.g.bindBuffer(34963, c.buffer.buffer);
        a.bindVertexArray(null)
    }
    ;
    re.prototype.bb = function() {
        this.g.bindVertexArray(this.uc);
        this.g.drawElements(this.mode, this.Ef.buffer.length, 5125, 0);
        this.g.bindVertexArray(null)
    }
    ;
    re.v = !0;
    Cg(ze, ld);
    ze.v = !0;
    Cg(Vb, Zb);
    Vb.v = !0;
    Cg(sa, bd);
    sa.v = !0;
    Cg(E, bd);
    E.v = !0;
    Cg(B, bd);
    B.v = !0;
    C.fe = function(a) {
        return -1 == C.Ee.indexOf(a) ? null : a
    }
    ;
    vb.prototype.dd = function(a, b, c, g) {
        function f(l) {
            l.cancelable && l.preventDefault();
            l = l.changedTouches;
            for (var x = 0, q = l.length; x < q; ) {
                var u = l[x++]
                  , D = d.rd(u.identifier);
                if (null != D) {
                    var p = u.clientX - b.getBoundingClientRect().left
                      , m = void 0;
                    switch (h.Pa) {
                    case 0:
                        m = a.width / c.Fa / a.clientWidth;
                        break;
                    case 1:
                        m = a.width / a.clientWidth
                    }
                    p *= m;
                    u = u.clientY - b.getBoundingClientRect().top;
                    m = void 0;
                    switch (h.Pa) {
                    case 0:
                        m = a.height / c.Fa / a.clientHeight;
                        break;
                    case 1:
                        m = a.height / a.clientHeight
                    }
                    D.C = p;
                    D.D = u * m;
                    D.tc = !1
                }
            }
        }
        this.Pc.dd(a, b, this, c, g);
        var d = this.touches
          , h = this;
        b.addEventListener("touchstart", function(l) {
            l.cancelable && l.preventDefault();
            l = l.changedTouches;
            for (var x = 0, q = l.length; x < q; ) {
                var u = l[x++]
                  , D = d.rd(u.identifier, !0)
                  , p = u.clientX - b.getBoundingClientRect().left
                  , m = void 0;
                switch (h.Pa) {
                case 0:
                    m = a.width / c.Fa / a.clientWidth;
                    break;
                case 1:
                    m = a.width / a.clientWidth
                }
                p *= m;
                u = u.clientY - b.getBoundingClientRect().top;
                m = void 0;
                switch (h.Pa) {
                case 0:
                    m = a.height / c.Fa / a.clientHeight;
                    break;
                case 1:
                    m = a.height / a.clientHeight
                }
                D.C = p;
                D.D = u * m;
                D.tc = !0;
                D.Qc = !0
            }
        }, {
            passive: !1
        });
        b.addEventListener("touchmove", function(l) {
            l.cancelable && l.preventDefault();
            l = l.changedTouches;
            for (var x = 0, q = l.length; x < q; ) {
                var u = l[x++]
                  , D = d.rd(u.identifier);
                if (null != D) {
                    var p = u.clientX - b.getBoundingClientRect().left
                      , m = void 0;
                    switch (h.Pa) {
                    case 0:
                        m = a.width / c.Fa / a.clientWidth;
                        break;
                    case 1:
                        m = a.width / a.clientWidth
                    }
                    p *= m;
                    u = u.clientY - b.getBoundingClientRect().top;
                    m = void 0;
                    switch (h.Pa) {
                    case 0:
                        m = a.height / c.Fa / a.clientHeight;
                        break;
                    case 1:
                        m = a.height / a.clientHeight
                    }
                    D.C = p;
                    D.D = u * m
                }
            }
        }, {
            passive: !1
        });
        b.addEventListener("touchend", f);
        b.addEventListener("touchcancel", f);
        if (null != this.keyboard) {
            var n = this.keyboard;
            g = window.document.documentElement;
            g.addEventListener("keydown", function(l) {
                var x = C.fe(l.code);
                null != x && (!C.Od.includes(x) && l.cancelable && l.preventDefault(),
                Object.prototype.hasOwnProperty.call(n.keys.B, x) || (n.keys.B[x] = new ia),
                n.vd.add(l.key))
            });
            g.addEventListener("keyup", function(l) {
                var x = C.fe(l.code);
                null != x && (!C.Od.includes(x) && l.cancelable && l.preventDefault(),
                Object.prototype.hasOwnProperty.call(n.keys.B, x) || (n.keys.B[x] = new ia),
                n.keys.B[x].release(),
                n.re.add(l.key))
            });
            window.addEventListener("blur", function() {
                for (var l = n.keys.B, x = Object.keys(l), q = x.length, u = 0; u < q; )
                    l[x[u++]].release()
            })
        }
    }
    ;
    vb.prototype.update = function(a) {
        this.Pc.update(a);
        for (var b = this.touches, c = 0; c < b.touches.length; ) {
            var g = b.touches[c];
            g.update(a);
            g.Ed || g.yc || g.tc ? ++c : Pd.remove(b.touches, g)
        }
        if (null != this.keyboard) {
            a = this.keyboard;
            b = a.keys.B;
            c = Object.keys(b);
            g = c.length;
            for (var f = 0; f < g; )
                b[c[f++]].update();
            a.be.clear();
            a.Jd.clear();
            b = a.vd.values();
            for (c = b.next(); !c.done; )
                g = c.value,
                c = b.next(),
                a.be.add(g);
            b = a.Jd.values();
            for (c = b.next(); !c.done; )
                g = c.value,
                c = b.next(),
                a.Jd.add(g);
            a.vd.clear();
            a.re.clear()
        }
        0 < this.touches.touches.length && (this.Pc.rc = !1)
    }
    ;
    vb.v = !0;
    var ve = Ic["pot.input.InputTarget"] = {
        Ab: !0,
        za: null,
        Md: {
            s: "Canvas",
            m: 0,
            o: "pot.input.InputTarget",
            toString: z
        },
        Document: {
            s: "Document",
            m: 1,
            o: "pot.input.InputTarget",
            toString: z
        },
        Ve: {
            s: "None",
            m: 2,
            o: "pot.input.InputTarget",
            toString: z
        }
    };
    ve.za = [ve.Md, ve.Document, ve.Ve];
    ia.prototype.release = function() {}
    ;
    ia.prototype.update = function() {}
    ;
    ia.v = !0;
    na.v = !0;
    H.prototype.dd = function(a, b, c, g, f) {
        var d = this;
        b.addEventListener("mouseenter", function() {
            return d.$b = !0
        });
        b.addEventListener("mouseleave", function() {
            return d.$b = !1
        });
        b.addEventListener("mousedown", function(h) {
            d.rc = !0;
            d.$b = !0;
            h.cancelable && h.preventDefault();
            switch (h.button) {
            case 0:
                d.wd = !0;
                d.xd = !0;
                break;
            case 1:
                d.pe = !0;
                d.qe = !0;
                break;
            case 2:
                d.zd = !0,
                d.Ad = !0
            }
            var n = h.clientX - a.getBoundingClientRect().left;
            switch (c.Pa) {
            case 0:
                var l = a.width / g.Fa / a.clientWidth;
                break;
            case 1:
                l = a.width / a.clientWidth
            }
            d.C = n * l;
            h = h.clientY - a.getBoundingClientRect().top;
            switch (c.Pa) {
            case 0:
                var x = a.height / g.Fa / a.clientHeight;
                break;
            case 1:
                x = a.height / a.clientHeight
            }
            return d.D = h * x
        });
        b.addEventListener("mouseup", function(h) {
            d.rc = !0;
            d.$b = !0;
            h.cancelable && h.preventDefault();
            switch (h.button) {
            case 0:
                d.wd = !1;
                break;
            case 1:
                d.pe = !1;
                break;
            case 2:
                d.zd = !1
            }
            var n = h.clientX - a.getBoundingClientRect().left;
            switch (c.Pa) {
            case 0:
                var l = a.width / g.Fa / a.clientWidth;
                break;
            case 1:
                l = a.width / a.clientWidth
            }
            d.C = n * l;
            h = h.clientY - a.getBoundingClientRect().top;
            switch (c.Pa) {
            case 0:
                var x = a.height / g.Fa / a.clientHeight;
                break;
            case 1:
                x = a.height / a.clientHeight
            }
            return d.D = h * x
        });
        b.addEventListener("mousemove", function(h) {
            d.rc = !0;
            d.$b = !0;
            var n = h.clientX - a.getBoundingClientRect().left;
            switch (c.Pa) {
            case 0:
                var l = a.width / g.Fa / a.clientWidth;
                break;
            case 1:
                l = a.width / a.clientWidth
            }
            d.C = n * l;
            h = h.clientY - a.getBoundingClientRect().top;
            switch (c.Pa) {
            case 0:
                var x = a.height / g.Fa / a.clientHeight;
                break;
            case 1:
                x = a.height / a.clientHeight
            }
            return d.D = h * x
        });
        f && b.addEventListener("wheel", function(h) {
            switch (h.deltaMode) {
            case 0:
                var n = 1;
                break;
            case 1:
                n = 24;
                break;
            case 2:
                n = 720;
                break;
            default:
                throw lb.fb("invalid wheel delta mode");
            }
            d.Bd += h.deltaX * n;
            d.Cd += h.deltaY * n;
            h.preventDefault()
        }, {
            passive: !1
        });
        b.addEventListener("contextmenu", function(h) {
            d.rc = !0;
            d.$b = !0;
            h.preventDefault()
        });
        b.addEventListener("pointerdown", function(h) {
            b.setPointerCapture(h.pointerId)
        });
        b.addEventListener("pointerup", function(h) {
            b.releasePointerCapture(h.pointerId)
        })
    }
    ;
    H.prototype.update = function(a) {
        this.ac = this.x;
        this.bc = this.y;
        this.x = this.Kb + a * (this.C - this.Kb);
        this.y = this.Lb + a * (this.D - this.Lb);
        this.mc = this.x - this.ac;
        this.nc = this.y - this.bc;
        this.te = this.left;
        this.left = this.wd || this.xd;
        this.right = this.zd || this.Ad;
        this.Ad = this.qe = this.xd = !1;
        this.ae = (this.left ? 1 : 0) - (this.te ? 1 : 0);
        this.Cd = this.Bd = 0;
        1 == a && (this.Kb = this.x,
        this.Lb = this.y)
    }
    ;
    H.v = !0;
    v.prototype.move = function(a, b) {
        this.C = a;
        this.D = b
    }
    ;
    v.prototype.end = function(a, b) {
        this.C = a;
        this.D = b;
        this.tc = !1
    }
    ;
    v.prototype.update = function(a) {
        this.Qc ? (this.ac = this.C,
        this.bc = this.D,
        this.Kb = this.C,
        this.Lb = this.D) : (this.ac = this.x,
        this.bc = this.y);
        this.x = this.Kb + a * (this.C - this.Kb);
        this.y = this.Lb + a * (this.D - this.Lb);
        this.mc = this.x - this.ac;
        this.nc = this.y - this.bc;
        this.Ed = this.yc;
        this.yc = this.tc || this.Qc;
        this.Qc = !1;
        this.ce = (this.yc ? 1 : 0) - (this.Ed ? 1 : 0);
        1 == a && (this.Kb = this.x,
        this.Lb = this.y)
    }
    ;
    v.v = !0;
    w.prototype.rd = function(a, b) {
        null == b && (b = !1);
        for (var c = 0, g = this.touches; c < g.length; ) {
            var f = g[c];
            ++c;
            if (f.Of == a)
                return f
        }
        return b ? this.Mf(a) : null
    }
    ;
    w.prototype.Mf = function(a) {
        for (var b = 0; ; ) {
            for (var c = b, g = 0, f = this.touches; g < f.length; )
                f[g++].id == b && ++b;
            if (c == b)
                break
        }
        a = new v(b,a);
        this.touches.push(a);
        return a
    }
    ;
    w.v = !0;
    r.Ld |= 0;
    "undefined" != typeof performance && "function" == typeof performance.now && (Pd.now = performance.now.bind(performance));
    String.v = !0;
    Array.v = !0;
    uc.xa = !1;
    tg.Ca = {};
    sg.Ca = {};
    Zb.Ca = {};
    Zb.ta = function() {
        for (var a = {
            transform: {
                name: "matrix.transform",
                type: e.j(4, 4)
            },
            model: {
                name: "matrix.model",
                type: e.j(4, 4)
            },
            view: {
                name: "matrix.view",
                type: e.j(4, 4)
            },
            ab: {
                name: "matrix.projection",
                type: e.j(4, 4)
            },
            Ya: {
                name: "matrix.invProjection",
                type: e.j(4, 4)
            },
            Za: {
                name: "matrix.modelView",
                type: e.j(4, 4)
            },
            Xa: {
                name: "matrix.invModelView",
                type: e.j(4, 4)
            },
            S: {
                name: "matrix.normal",
                type: e.j(3, 3)
            }
        }, b = {
            La: {
                name: "material.ambient",
                type: e.h
            },
            Ma: {
                name: "material.diffuse",
                type: e.h
            },
            Ra: {
                name: "material.specular",
                type: e.h
            },
            Qa: {
                name: "material.shininess",
                type: e.h
            },
            Na: {
                name: "material.emission",
                type: e.h
            },
            qa: {
                name: "material.texture",
                type: e.G(F.I)
            }
        }, c = {
            name: "numLights",
            type: e.u
        }, g = [], f = 0; 16 > f; ) {
            var d = "lights[" + f++ + "]";
            g.push({
                position: {
                    name: d + ".position",
                    type: e.l(4)
                },
                color: {
                    name: d + ".color",
                    type: e.l(3)
                },
                S: {
                    name: d + ".normal",
                    type: e.l(3)
                }
            })
        }
        return {
            ya: a,
            va: b,
            wa: c,
            Ea: new tc(g,"lights",e.Ka)
        }
    }(this);
    Zb.attributes = {
        Ua: {
            name: "aPosition",
            type: G.l(4),
            location: 0
        },
        Sa: {
            name: "aColor",
            type: G.l(4),
            location: 1
        },
        Ta: {
            name: "aNormal",
            type: G.l(3),
            location: 2
        },
        Va: {
            name: "aTexCoord",
            type: G.l(2),
            location: 3
        }
    };
    Zb.ua = "#version 300 es\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\n\nlayout(location = 0) in vec4 aPosition;\nlayout(location = 1) in vec4 aColor;\nlayout(location = 2) in vec3 aNormal;\nlayout(location = 3) in vec2 aTexCoord;\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nout vec4 vColor;\nout vec3 vPosition;\nout vec3 vNormal;\nout vec2 vTexCoord;\n\nvoid main() {\n\tgl_Position = matrix.transform * aPosition;\n\tgl_PointSize = 1.0;\n\tvColor = aColor;\n\tvPosition = (matrix.modelView * aPosition).xyz;\n\tvNormal = matrix.normal * aNormal;\n\tvTexCoord = aTexCoord;\n}";
    Zb.sa = "#version 300 es\nprecision highp int;\nprecision highp float;\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\n\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nin vec4 vColor;\nin vec3 vPosition;\nin vec3 vNormal;\nin vec2 vTexCoord;\nlayout(location = 0) out vec4 oColor;\n\nvec4 computeBaseColor() {\n\treturn vColor;\n}\n\nvec3 safeNormalize(vec3 v) {\n\treturn dot(v, v) > 0.0 ? normalize(v) : vec3(0);\n}\n\nvec3 ambientLight(vec3 lightColor, vec3 color) {\n\treturn lightColor * color * material.ambient;\n}\n\nvec3 directionalLight(vec3 lightColor, vec3 lightDirection, vec3 eye, vec3 normal, vec3 color) {\n\tfloat ldot = max(-dot(lightDirection, normal), 0.0);\n\tvec3 res = lightColor * color * ldot * material.diffuse;\n\tif (dot(normal, eye) < 0.0) {\n\t\tvec3 reflEye = eye - 2.0 * normal * dot(eye, normal);\n\t\tfloat rdot = max(-dot(reflEye, lightDirection), 0.0);\n\t\tres += lightColor * pow(rdot, material.shininess) * material.specular;\n\t}\n\treturn res;\n}\n\nvoid main() {\n\tvec4 baseColor = computeBaseColor();\n\tif (baseColor.w == 0.0) {\n\t\tdiscard;\n\t}\n\tif (numLights == 0) {\n\t\toColor = baseColor;\n\t\treturn;\n\t}\n\tvec3 eye = safeNormalize(vPosition);\n\tvec3 n = safeNormalize(vNormal);\n\tif (!gl_FrontFacing) {\n\t\tn = -n;\n\t}\n\tvec3 color = baseColor.xyz;\n\tvec3 total = color * material.emission;\n\tfor (int i = 0; i < numLights; i++) {\n\t\tStruct2 light = lights[i];\n\t\tvec4 lp = light.position;\n\t\tvec3 lc = light.color;\n\t\tvec3 ln = light.normal;\n\t\tbool amb = lp.w == 0.0 && dot(ln, ln) == 0.0;\n\t\tif (amb) {\n\t\t\ttotal += ambientLight(lc, color);\n\t\t}\n\t\telse {\n\t\t\tbool dir = lp.w == 0.0;\n\t\t\tif (!dir) {\n\t\t\t\tln = safeNormalize(vPosition - lp.xyz);\n\t\t\t}\n\t\t\tfloat ldot = max(-dot(ln, n), 0.0);\n\t\t\ttotal += directionalLight(lc, ln, eye, n, color);\n\t\t}\n\t}\n\toColor = vec4(total, baseColor.w);\n}";
    Zb.source = {
        gb: "#version 300 es\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\n\nlayout(location = 0) in vec4 aPosition;\nlayout(location = 1) in vec4 aColor;\nlayout(location = 2) in vec3 aNormal;\nlayout(location = 3) in vec2 aTexCoord;\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nout vec4 vColor;\nout vec3 vPosition;\nout vec3 vNormal;\nout vec2 vTexCoord;\n\nvoid main() {\n\tgl_Position = matrix.transform * aPosition;\n\tgl_PointSize = 1.0;\n\tvColor = aColor;\n\tvPosition = (matrix.modelView * aPosition).xyz;\n\tvNormal = matrix.normal * aNormal;\n\tvTexCoord = aTexCoord;\n}",
        cb: "#version 300 es\nprecision highp int;\nprecision highp float;\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\n\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nin vec4 vColor;\nin vec3 vPosition;\nin vec3 vNormal;\nin vec2 vTexCoord;\nlayout(location = 0) out vec4 oColor;\n\nvec4 computeBaseColor() {\n\treturn vColor;\n}\n\nvec3 safeNormalize(vec3 v) {\n\treturn dot(v, v) > 0.0 ? normalize(v) : vec3(0);\n}\n\nvec3 ambientLight(vec3 lightColor, vec3 color) {\n\treturn lightColor * color * material.ambient;\n}\n\nvec3 directionalLight(vec3 lightColor, vec3 lightDirection, vec3 eye, vec3 normal, vec3 color) {\n\tfloat ldot = max(-dot(lightDirection, normal), 0.0);\n\tvec3 res = lightColor * color * ldot * material.diffuse;\n\tif (dot(normal, eye) < 0.0) {\n\t\tvec3 reflEye = eye - 2.0 * normal * dot(eye, normal);\n\t\tfloat rdot = max(-dot(reflEye, lightDirection), 0.0);\n\t\tres += lightColor * pow(rdot, material.shininess) * material.specular;\n\t}\n\treturn res;\n}\n\nvoid main() {\n\tvec4 baseColor = computeBaseColor();\n\tif (baseColor.w == 0.0) {\n\t\tdiscard;\n\t}\n\tif (numLights == 0) {\n\t\toColor = baseColor;\n\t\treturn;\n\t}\n\tvec3 eye = safeNormalize(vPosition);\n\tvec3 n = safeNormalize(vNormal);\n\tif (!gl_FrontFacing) {\n\t\tn = -n;\n\t}\n\tvec3 color = baseColor.xyz;\n\tvec3 total = color * material.emission;\n\tfor (int i = 0; i < numLights; i++) {\n\t\tStruct2 light = lights[i];\n\t\tvec4 lp = light.position;\n\t\tvec3 lc = light.color;\n\t\tvec3 ln = light.normal;\n\t\tbool amb = lp.w == 0.0 && dot(ln, ln) == 0.0;\n\t\tif (amb) {\n\t\t\ttotal += ambientLight(lc, color);\n\t\t}\n\t\telse {\n\t\t\tbool dir = lp.w == 0.0;\n\t\t\tif (!dir) {\n\t\t\t\tln = safeNormalize(vPosition - lp.xyz);\n\t\t\t}\n\t\t\tfloat ldot = max(-dot(ln, n), 0.0);\n\t\t\ttotal += directionalLight(lc, ln, eye, n, color);\n\t\t}\n\t}\n\toColor = vec4(total, baseColor.w);\n}"
    };
    Va.Ca = {};
    Va.ta = function() {
        for (var a = {
            transform: {
                name: "matrix.transform",
                type: e.j(4, 4)
            },
            model: {
                name: "matrix.model",
                type: e.j(4, 4)
            },
            view: {
                name: "matrix.view",
                type: e.j(4, 4)
            },
            ab: {
                name: "matrix.projection",
                type: e.j(4, 4)
            },
            Ya: {
                name: "matrix.invProjection",
                type: e.j(4, 4)
            },
            Za: {
                name: "matrix.modelView",
                type: e.j(4, 4)
            },
            Xa: {
                name: "matrix.invModelView",
                type: e.j(4, 4)
            },
            S: {
                name: "matrix.normal",
                type: e.j(3, 3)
            }
        }, b = {
            La: {
                name: "material.ambient",
                type: e.h
            },
            Ma: {
                name: "material.diffuse",
                type: e.h
            },
            Ra: {
                name: "material.specular",
                type: e.h
            },
            Qa: {
                name: "material.shininess",
                type: e.h
            },
            Na: {
                name: "material.emission",
                type: e.h
            },
            qa: {
                name: "material.texture",
                type: e.G(F.I)
            }
        }, c = {
            name: "numLights",
            type: e.u
        }, g = [], f = 0; 16 > f; ) {
            var d = "lights[" + f++ + "]";
            g.push({
                position: {
                    name: d + ".position",
                    type: e.l(4)
                },
                color: {
                    name: d + ".color",
                    type: e.l(3)
                },
                S: {
                    name: d + ".normal",
                    type: e.l(3)
                }
            })
        }
        return {
            ya: a,
            va: b,
            wa: c,
            Ea: new tc(g,"lights",e.Ka),
            sb: {
                qb: {
                    name: "resInfo.res2",
                    type: e.u
                },
                rb: {
                    name: "resInfo.res3",
                    type: e.u
                },
                ib: {
                    name: "resInfo.invRes2",
                    type: e.h
                },
                jb: {
                    name: "resInfo.invRes3",
                    type: e.h
                },
                tb: {
                    name: "resInfo.shift2",
                    type: e.ra(2)
                },
                ub: {
                    name: "resInfo.shift3",
                    type: e.ra(3)
                },
                lb: {
                    name: "resInfo.mask2",
                    type: e.u
                },
                mb: {
                    name: "resInfo.mask3",
                    type: e.u
                }
            },
            xb: {
                name: "texVelVof",
                type: e.G(F.I)
            },
            wb: {
                name: "texDivPrsWgt",
                type: e.G(F.I)
            },
            vb: {
                name: "texAdvectTmp",
                type: e.G(F.I)
            },
            pb: {
                name: "radius",
                type: e.h
            },
            hb: {
                name: "center",
                type: e.l(3)
            },
            nb: {
                name: "pcenter",
                type: e.l(3)
            },
            ob: {
                name: "power",
                type: e.h
            },
            yb: {
                name: "ventilation",
                type: e.h
            },
            zb: {
                name: "vorticity",
                type: e.h
            },
            time: {
                name: "time",
                type: e.h
            }
        }
    }(this);
    Va.attributes = {
        Ua: {
            name: "aPosition",
            type: G.l(4),
            location: 0
        },
        Sa: {
            name: "aColor",
            type: G.l(4),
            location: 1
        },
        Ta: {
            name: "aNormal",
            type: G.l(3),
            location: 2
        },
        Va: {
            name: "aTexCoord",
            type: G.l(2),
            location: 3
        }
    };
    Va.ua = "#version 300 es\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nlayout(location = 0) in vec4 aPosition;\nlayout(location = 1) in vec4 aColor;\nlayout(location = 2) in vec3 aNormal;\nlayout(location = 3) in vec2 aTexCoord;\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nout vec4 vColor;\nout vec3 vPosition;\nout vec3 vNormal;\nout vec2 vTexCoord;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nvoid main() {\n\tgl_Position = matrix.transform * aPosition;\n\tvTexCoord = aTexCoord;\n}";
    Va.sa = "#version 300 es\nprecision highp int;\nprecision highp float;\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nin vec4 vColor;\nin vec3 vPosition;\nin vec3 vNormal;\nin vec2 vTexCoord;\nlayout(location = 0) out vec4 oColor;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nivec3 uvToIndex3D(Struct3 resInfo, vec2 uv) {\n\tivec2 tmp = ivec2(uv * float(resInfo.res2)) << resInfo.shift2;\n\tint index = tmp.x | tmp.y;\n\treturn ivec3(index) >> resInfo.shift3 & resInfo.mask3;\n}\n\nvoid main() {\n\ti3d = uvToIndex3D(resInfo, vTexCoord);\n\tp = (vec3(i3d) + 0.5) * resInfo.invRes3;\n}";
    Va.source = {
        gb: "#version 300 es\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nlayout(location = 0) in vec4 aPosition;\nlayout(location = 1) in vec4 aColor;\nlayout(location = 2) in vec3 aNormal;\nlayout(location = 3) in vec2 aTexCoord;\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nout vec4 vColor;\nout vec3 vPosition;\nout vec3 vNormal;\nout vec2 vTexCoord;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nvoid main() {\n\tgl_Position = matrix.transform * aPosition;\n\tvTexCoord = aTexCoord;\n}",
        cb: "#version 300 es\nprecision highp int;\nprecision highp float;\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nin vec4 vColor;\nin vec3 vPosition;\nin vec3 vNormal;\nin vec2 vTexCoord;\nlayout(location = 0) out vec4 oColor;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nivec3 uvToIndex3D(Struct3 resInfo, vec2 uv) {\n\tivec2 tmp = ivec2(uv * float(resInfo.res2)) << resInfo.shift2;\n\tint index = tmp.x | tmp.y;\n\treturn ivec3(index) >> resInfo.shift3 & resInfo.mask3;\n}\n\nvoid main() {\n\ti3d = uvToIndex3D(resInfo, vTexCoord);\n\tp = (vec3(i3d) + 0.5) * resInfo.invRes3;\n}"
    };
    Qc.Ca = {};
    Qc.ta = function() {
        for (var a = {
            transform: {
                name: "matrix.transform",
                type: e.j(4, 4)
            },
            model: {
                name: "matrix.model",
                type: e.j(4, 4)
            },
            view: {
                name: "matrix.view",
                type: e.j(4, 4)
            },
            ab: {
                name: "matrix.projection",
                type: e.j(4, 4)
            },
            Ya: {
                name: "matrix.invProjection",
                type: e.j(4, 4)
            },
            Za: {
                name: "matrix.modelView",
                type: e.j(4, 4)
            },
            Xa: {
                name: "matrix.invModelView",
                type: e.j(4, 4)
            },
            S: {
                name: "matrix.normal",
                type: e.j(3, 3)
            }
        }, b = {
            La: {
                name: "material.ambient",
                type: e.h
            },
            Ma: {
                name: "material.diffuse",
                type: e.h
            },
            Ra: {
                name: "material.specular",
                type: e.h
            },
            Qa: {
                name: "material.shininess",
                type: e.h
            },
            Na: {
                name: "material.emission",
                type: e.h
            },
            qa: {
                name: "material.texture",
                type: e.G(F.I)
            }
        }, c = {
            name: "numLights",
            type: e.u
        }, g = [], f = 0; 16 > f; ) {
            var d = "lights[" + f++ + "]";
            g.push({
                position: {
                    name: d + ".position",
                    type: e.l(4)
                },
                color: {
                    name: d + ".color",
                    type: e.l(3)
                },
                S: {
                    name: d + ".normal",
                    type: e.l(3)
                }
            })
        }
        return {
            ya: a,
            va: b,
            wa: c,
            Ea: new tc(g,"lights",e.Ka),
            sb: {
                qb: {
                    name: "resInfo.res2",
                    type: e.u
                },
                rb: {
                    name: "resInfo.res3",
                    type: e.u
                },
                ib: {
                    name: "resInfo.invRes2",
                    type: e.h
                },
                jb: {
                    name: "resInfo.invRes3",
                    type: e.h
                },
                tb: {
                    name: "resInfo.shift2",
                    type: e.ra(2)
                },
                ub: {
                    name: "resInfo.shift3",
                    type: e.ra(3)
                },
                lb: {
                    name: "resInfo.mask2",
                    type: e.u
                },
                mb: {
                    name: "resInfo.mask3",
                    type: e.u
                }
            },
            xb: {
                name: "texVelVof",
                type: e.G(F.I)
            },
            wb: {
                name: "texDivPrsWgt",
                type: e.G(F.I)
            },
            vb: {
                name: "texAdvectTmp",
                type: e.G(F.I)
            },
            pb: {
                name: "radius",
                type: e.h
            },
            hb: {
                name: "center",
                type: e.l(3)
            },
            nb: {
                name: "pcenter",
                type: e.l(3)
            },
            ob: {
                name: "power",
                type: e.h
            },
            yb: {
                name: "ventilation",
                type: e.h
            },
            zb: {
                name: "vorticity",
                type: e.h
            },
            time: {
                name: "time",
                type: e.h
            }
        }
    }(this);
    Qc.attributes = {
        Ua: {
            name: "aPosition",
            type: G.l(4),
            location: 0
        },
        Sa: {
            name: "aColor",
            type: G.l(4),
            location: 1
        },
        Ta: {
            name: "aNormal",
            type: G.l(3),
            location: 2
        },
        Va: {
            name: "aTexCoord",
            type: G.l(2),
            location: 3
        }
    };
    Qc.ua = "#version 300 es\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nlayout(location = 0) in vec4 aPosition;\nlayout(location = 1) in vec4 aColor;\nlayout(location = 2) in vec3 aNormal;\nlayout(location = 3) in vec2 aTexCoord;\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nout vec4 vColor;\nout vec3 vPosition;\nout vec3 vNormal;\nout vec2 vTexCoord;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nvoid main() {\n\tgl_Position = matrix.transform * aPosition;\n\tvTexCoord = aTexCoord;\n}";
    Qc.sa = "#version 300 es\nprecision highp int;\nprecision highp float;\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nin vec4 vColor;\nin vec3 vPosition;\nin vec3 vNormal;\nin vec2 vTexCoord;\nlayout(location = 0) out vec4 oColor;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nivec3 uvToIndex3D(Struct3 resInfo, vec2 uv) {\n\tivec2 tmp = ivec2(uv * float(resInfo.res2)) << resInfo.shift2;\n\tint index = tmp.x | tmp.y;\n\treturn ivec3(index) >> resInfo.shift3 & resInfo.mask3;\n}\n\nvoid hg_fragment_1() {\n\ti3d = uvToIndex3D(resInfo, vTexCoord);\n\tp = (vec3(i3d) + 0.5) * resInfo.invRes3;\n}\n\nvoid main() {\n\thg_fragment_1();\n\toColor = vec4(0);\n}";
    Qc.source = {
        gb: "#version 300 es\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nlayout(location = 0) in vec4 aPosition;\nlayout(location = 1) in vec4 aColor;\nlayout(location = 2) in vec3 aNormal;\nlayout(location = 3) in vec2 aTexCoord;\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nout vec4 vColor;\nout vec3 vPosition;\nout vec3 vNormal;\nout vec2 vTexCoord;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nvoid main() {\n\tgl_Position = matrix.transform * aPosition;\n\tvTexCoord = aTexCoord;\n}",
        cb: "#version 300 es\nprecision highp int;\nprecision highp float;\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nin vec4 vColor;\nin vec3 vPosition;\nin vec3 vNormal;\nin vec2 vTexCoord;\nlayout(location = 0) out vec4 oColor;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nivec3 uvToIndex3D(Struct3 resInfo, vec2 uv) {\n\tivec2 tmp = ivec2(uv * float(resInfo.res2)) << resInfo.shift2;\n\tint index = tmp.x | tmp.y;\n\treturn ivec3(index) >> resInfo.shift3 & resInfo.mask3;\n}\n\nvoid hg_fragment_1() {\n\ti3d = uvToIndex3D(resInfo, vTexCoord);\n\tp = (vec3(i3d) + 0.5) * resInfo.invRes3;\n}\n\nvoid main() {\n\thg_fragment_1();\n\toColor = vec4(0);\n}"
    };
    Bc.Ca = {};
    Bc.ta = function() {
        for (var a = {
            transform: {
                name: "matrix.transform",
                type: e.j(4, 4)
            },
            model: {
                name: "matrix.model",
                type: e.j(4, 4)
            },
            view: {
                name: "matrix.view",
                type: e.j(4, 4)
            },
            ab: {
                name: "matrix.projection",
                type: e.j(4, 4)
            },
            Ya: {
                name: "matrix.invProjection",
                type: e.j(4, 4)
            },
            Za: {
                name: "matrix.modelView",
                type: e.j(4, 4)
            },
            Xa: {
                name: "matrix.invModelView",
                type: e.j(4, 4)
            },
            S: {
                name: "matrix.normal",
                type: e.j(3, 3)
            }
        }, b = {
            La: {
                name: "material.ambient",
                type: e.h
            },
            Ma: {
                name: "material.diffuse",
                type: e.h
            },
            Ra: {
                name: "material.specular",
                type: e.h
            },
            Qa: {
                name: "material.shininess",
                type: e.h
            },
            Na: {
                name: "material.emission",
                type: e.h
            },
            qa: {
                name: "material.texture",
                type: e.G(F.I)
            }
        }, c = {
            name: "numLights",
            type: e.u
        }, g = [], f = 0; 16 > f; ) {
            var d = "lights[" + f++ + "]";
            g.push({
                position: {
                    name: d + ".position",
                    type: e.l(4)
                },
                color: {
                    name: d + ".color",
                    type: e.l(3)
                },
                S: {
                    name: d + ".normal",
                    type: e.l(3)
                }
            })
        }
        return {
            ya: a,
            va: b,
            wa: c,
            Ea: new tc(g,"lights",e.Ka),
            sb: {
                qb: {
                    name: "resInfo.res2",
                    type: e.u
                },
                rb: {
                    name: "resInfo.res3",
                    type: e.u
                },
                ib: {
                    name: "resInfo.invRes2",
                    type: e.h
                },
                jb: {
                    name: "resInfo.invRes3",
                    type: e.h
                },
                tb: {
                    name: "resInfo.shift2",
                    type: e.ra(2)
                },
                ub: {
                    name: "resInfo.shift3",
                    type: e.ra(3)
                },
                lb: {
                    name: "resInfo.mask2",
                    type: e.u
                },
                mb: {
                    name: "resInfo.mask3",
                    type: e.u
                }
            },
            xb: {
                name: "texVelVof",
                type: e.G(F.I)
            },
            wb: {
                name: "texDivPrsWgt",
                type: e.G(F.I)
            },
            vb: {
                name: "texAdvectTmp",
                type: e.G(F.I)
            },
            pb: {
                name: "radius",
                type: e.h
            },
            hb: {
                name: "center",
                type: e.l(3)
            },
            nb: {
                name: "pcenter",
                type: e.l(3)
            },
            ob: {
                name: "power",
                type: e.h
            },
            yb: {
                name: "ventilation",
                type: e.h
            },
            zb: {
                name: "vorticity",
                type: e.h
            },
            time: {
                name: "time",
                type: e.h
            },
            forward: {
                name: "forward",
                type: e.Sb
            }
        }
    }(this);
    Bc.attributes = {
        Ua: {
            name: "aPosition",
            type: G.l(4),
            location: 0
        },
        Sa: {
            name: "aColor",
            type: G.l(4),
            location: 1
        },
        Ta: {
            name: "aNormal",
            type: G.l(3),
            location: 2
        },
        Va: {
            name: "aTexCoord",
            type: G.l(2),
            location: 3
        }
    };
    Bc.ua = "#version 300 es\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nlayout(location = 0) in vec4 aPosition;\nlayout(location = 1) in vec4 aColor;\nlayout(location = 2) in vec3 aNormal;\nlayout(location = 3) in vec2 aTexCoord;\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nout vec4 vColor;\nout vec3 vPosition;\nout vec3 vNormal;\nout vec2 vTexCoord;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\nuniform bool forward;\n\nvoid main() {\n\tgl_Position = matrix.transform * aPosition;\n\tvTexCoord = aTexCoord;\n}";
    Bc.sa = "#version 300 es\nprecision highp int;\nprecision highp float;\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nin vec4 vColor;\nin vec3 vPosition;\nin vec3 vNormal;\nin vec2 vTexCoord;\nlayout(location = 0) out vec4 oColor;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\nuniform bool forward;\n\nivec3 uvToIndex3D(Struct3 resInfo, vec2 uv) {\n\tivec2 tmp = ivec2(uv * float(resInfo.res2)) << resInfo.shift2;\n\tint index = tmp.x | tmp.y;\n\treturn ivec3(index) >> resInfo.shift3 & resInfo.mask3;\n}\n\nvoid hg_fragment_1() {\n\ti3d = uvToIndex3D(resInfo, vTexCoord);\n\tp = (vec3(i3d) + 0.5) * resInfo.invRes3;\n}\n\nivec2 index3DTo2D(Struct3 resInfo, ivec3 i3d) {\n\tivec3 tmp = (i3d & resInfo.mask3) << resInfo.shift3;\n\tint index = tmp.x | tmp.y | tmp.z;\n\treturn ivec2(index) >> resInfo.shift2 & resInfo.mask2;\n}\n\nvec4 fetch3D(Struct3 resInfo, sampler2D tex, ivec3 i3d) {\n\treturn texelFetch(tex, index3DTo2D(resInfo, i3d), 0);\n}\n\nvec4 trilinear(Struct3 resInfo, sampler2D tex, vec3 p) {\n\tvec3 f3d = p * float(resInfo.res3) - 0.5;\n\tvec3 fr = fract(f3d);\n\tivec3 i1 = ivec3(floor(f3d)) & resInfo.mask3;\n\tivec3 i2 = (i1 + 1) & resInfo.mask3;\n\tvec4 txyz = fetch3D(resInfo, tex, ivec3(i1.x, i1.y, i1.z));\n\tvec4 txyZ = fetch3D(resInfo, tex, ivec3(i1.x, i1.y, i2.z));\n\tvec4 txYz = fetch3D(resInfo, tex, ivec3(i1.x, i2.y, i1.z));\n\tvec4 txYZ = fetch3D(resInfo, tex, ivec3(i1.x, i2.y, i2.z));\n\tvec4 tXyz = fetch3D(resInfo, tex, ivec3(i2.x, i1.y, i1.z));\n\tvec4 tXyZ = fetch3D(resInfo, tex, ivec3(i2.x, i1.y, i2.z));\n\tvec4 tXYz = fetch3D(resInfo, tex, ivec3(i2.x, i2.y, i1.z));\n\tvec4 tXYZ = fetch3D(resInfo, tex, ivec3(i2.x, i2.y, i2.z));\n\tvec4 txy = mix(txyz, txyZ, fr.z);\n\tvec4 txY = mix(txYz, txYZ, fr.z);\n\tvec4 tXy = mix(tXyz, tXyZ, fr.z);\n\tvec4 tXY = mix(tXYz, tXYZ, fr.z);\n\tvec4 tx = mix(txy, txY, fr.y);\n\tvec4 tX = mix(tXy, tXY, fr.y);\n\treturn mix(tx, tX, fr.x);\n}\n\nvec4 advect(Struct3 resInfo, sampler2D velTex, sampler2D tex, vec2 uv, float velScale) {\n\tivec3 i3d = uvToIndex3D(resInfo, uv);\n\tvec3 vel = texture(velTex, uv).xyz;\n\tvec3 p = (vec3(i3d) + 0.5 - vel * velScale) * resInfo.invRes3;\n\treturn trilinear(resInfo, tex, p);\n}\n\nvoid main() {\n\thg_fragment_1();\n\tif (forward) {\n\t\toColor = advect(resInfo, texVelVof, texVelVof, vTexCoord, 1.0);\n\t}\n\telse {\n\t\toColor = advect(resInfo, texVelVof, texAdvectTmp, vTexCoord, -1.0);\n\t}\n}";
    Bc.source = {
        gb: "#version 300 es\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nlayout(location = 0) in vec4 aPosition;\nlayout(location = 1) in vec4 aColor;\nlayout(location = 2) in vec3 aNormal;\nlayout(location = 3) in vec2 aTexCoord;\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nout vec4 vColor;\nout vec3 vPosition;\nout vec3 vNormal;\nout vec2 vTexCoord;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\nuniform bool forward;\n\nvoid main() {\n\tgl_Position = matrix.transform * aPosition;\n\tvTexCoord = aTexCoord;\n}",
        cb: "#version 300 es\nprecision highp int;\nprecision highp float;\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nin vec4 vColor;\nin vec3 vPosition;\nin vec3 vNormal;\nin vec2 vTexCoord;\nlayout(location = 0) out vec4 oColor;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\nuniform bool forward;\n\nivec3 uvToIndex3D(Struct3 resInfo, vec2 uv) {\n\tivec2 tmp = ivec2(uv * float(resInfo.res2)) << resInfo.shift2;\n\tint index = tmp.x | tmp.y;\n\treturn ivec3(index) >> resInfo.shift3 & resInfo.mask3;\n}\n\nvoid hg_fragment_1() {\n\ti3d = uvToIndex3D(resInfo, vTexCoord);\n\tp = (vec3(i3d) + 0.5) * resInfo.invRes3;\n}\n\nivec2 index3DTo2D(Struct3 resInfo, ivec3 i3d) {\n\tivec3 tmp = (i3d & resInfo.mask3) << resInfo.shift3;\n\tint index = tmp.x | tmp.y | tmp.z;\n\treturn ivec2(index) >> resInfo.shift2 & resInfo.mask2;\n}\n\nvec4 fetch3D(Struct3 resInfo, sampler2D tex, ivec3 i3d) {\n\treturn texelFetch(tex, index3DTo2D(resInfo, i3d), 0);\n}\n\nvec4 trilinear(Struct3 resInfo, sampler2D tex, vec3 p) {\n\tvec3 f3d = p * float(resInfo.res3) - 0.5;\n\tvec3 fr = fract(f3d);\n\tivec3 i1 = ivec3(floor(f3d)) & resInfo.mask3;\n\tivec3 i2 = (i1 + 1) & resInfo.mask3;\n\tvec4 txyz = fetch3D(resInfo, tex, ivec3(i1.x, i1.y, i1.z));\n\tvec4 txyZ = fetch3D(resInfo, tex, ivec3(i1.x, i1.y, i2.z));\n\tvec4 txYz = fetch3D(resInfo, tex, ivec3(i1.x, i2.y, i1.z));\n\tvec4 txYZ = fetch3D(resInfo, tex, ivec3(i1.x, i2.y, i2.z));\n\tvec4 tXyz = fetch3D(resInfo, tex, ivec3(i2.x, i1.y, i1.z));\n\tvec4 tXyZ = fetch3D(resInfo, tex, ivec3(i2.x, i1.y, i2.z));\n\tvec4 tXYz = fetch3D(resInfo, tex, ivec3(i2.x, i2.y, i1.z));\n\tvec4 tXYZ = fetch3D(resInfo, tex, ivec3(i2.x, i2.y, i2.z));\n\tvec4 txy = mix(txyz, txyZ, fr.z);\n\tvec4 txY = mix(txYz, txYZ, fr.z);\n\tvec4 tXy = mix(tXyz, tXyZ, fr.z);\n\tvec4 tXY = mix(tXYz, tXYZ, fr.z);\n\tvec4 tx = mix(txy, txY, fr.y);\n\tvec4 tX = mix(tXy, tXY, fr.y);\n\treturn mix(tx, tX, fr.x);\n}\n\nvec4 advect(Struct3 resInfo, sampler2D velTex, sampler2D tex, vec2 uv, float velScale) {\n\tivec3 i3d = uvToIndex3D(resInfo, uv);\n\tvec3 vel = texture(velTex, uv).xyz;\n\tvec3 p = (vec3(i3d) + 0.5 - vel * velScale) * resInfo.invRes3;\n\treturn trilinear(resInfo, tex, p);\n}\n\nvoid main() {\n\thg_fragment_1();\n\tif (forward) {\n\t\toColor = advect(resInfo, texVelVof, texVelVof, vTexCoord, 1.0);\n\t}\n\telse {\n\t\toColor = advect(resInfo, texVelVof, texAdvectTmp, vTexCoord, -1.0);\n\t}\n}"
    };
    Pc.Ca = {};
    Pc.ta = function() {
        for (var a = {
            transform: {
                name: "matrix.transform",
                type: e.j(4, 4)
            },
            model: {
                name: "matrix.model",
                type: e.j(4, 4)
            },
            view: {
                name: "matrix.view",
                type: e.j(4, 4)
            },
            ab: {
                name: "matrix.projection",
                type: e.j(4, 4)
            },
            Ya: {
                name: "matrix.invProjection",
                type: e.j(4, 4)
            },
            Za: {
                name: "matrix.modelView",
                type: e.j(4, 4)
            },
            Xa: {
                name: "matrix.invModelView",
                type: e.j(4, 4)
            },
            S: {
                name: "matrix.normal",
                type: e.j(3, 3)
            }
        }, b = {
            La: {
                name: "material.ambient",
                type: e.h
            },
            Ma: {
                name: "material.diffuse",
                type: e.h
            },
            Ra: {
                name: "material.specular",
                type: e.h
            },
            Qa: {
                name: "material.shininess",
                type: e.h
            },
            Na: {
                name: "material.emission",
                type: e.h
            },
            qa: {
                name: "material.texture",
                type: e.G(F.I)
            }
        }, c = {
            name: "numLights",
            type: e.u
        }, g = [], f = 0; 16 > f; ) {
            var d = "lights[" + f++ + "]";
            g.push({
                position: {
                    name: d + ".position",
                    type: e.l(4)
                },
                color: {
                    name: d + ".color",
                    type: e.l(3)
                },
                S: {
                    name: d + ".normal",
                    type: e.l(3)
                }
            })
        }
        return {
            ya: a,
            va: b,
            wa: c,
            Ea: new tc(g,"lights",e.Ka),
            sb: {
                qb: {
                    name: "resInfo.res2",
                    type: e.u
                },
                rb: {
                    name: "resInfo.res3",
                    type: e.u
                },
                ib: {
                    name: "resInfo.invRes2",
                    type: e.h
                },
                jb: {
                    name: "resInfo.invRes3",
                    type: e.h
                },
                tb: {
                    name: "resInfo.shift2",
                    type: e.ra(2)
                },
                ub: {
                    name: "resInfo.shift3",
                    type: e.ra(3)
                },
                lb: {
                    name: "resInfo.mask2",
                    type: e.u
                },
                mb: {
                    name: "resInfo.mask3",
                    type: e.u
                }
            },
            xb: {
                name: "texVelVof",
                type: e.G(F.I)
            },
            wb: {
                name: "texDivPrsWgt",
                type: e.G(F.I)
            },
            vb: {
                name: "texAdvectTmp",
                type: e.G(F.I)
            },
            pb: {
                name: "radius",
                type: e.h
            },
            hb: {
                name: "center",
                type: e.l(3)
            },
            nb: {
                name: "pcenter",
                type: e.l(3)
            },
            ob: {
                name: "power",
                type: e.h
            },
            yb: {
                name: "ventilation",
                type: e.h
            },
            zb: {
                name: "vorticity",
                type: e.h
            },
            time: {
                name: "time",
                type: e.h
            }
        }
    }(this);
    Pc.attributes = {
        Ua: {
            name: "aPosition",
            type: G.l(4),
            location: 0
        },
        Sa: {
            name: "aColor",
            type: G.l(4),
            location: 1
        },
        Ta: {
            name: "aNormal",
            type: G.l(3),
            location: 2
        },
        Va: {
            name: "aTexCoord",
            type: G.l(2),
            location: 3
        }
    };
    Pc.ua = "#version 300 es\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nlayout(location = 0) in vec4 aPosition;\nlayout(location = 1) in vec4 aColor;\nlayout(location = 2) in vec3 aNormal;\nlayout(location = 3) in vec2 aTexCoord;\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nout vec4 vColor;\nout vec3 vPosition;\nout vec3 vNormal;\nout vec2 vTexCoord;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nvoid main() {\n\tgl_Position = matrix.transform * aPosition;\n\tvTexCoord = aTexCoord;\n}";
    Pc.sa = "#version 300 es\nprecision highp int;\nprecision highp float;\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nin vec4 vColor;\nin vec3 vPosition;\nin vec3 vNormal;\nin vec2 vTexCoord;\nlayout(location = 0) out vec4 oColor;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nivec3 uvToIndex3D(Struct3 resInfo, vec2 uv) {\n\tivec2 tmp = ivec2(uv * float(resInfo.res2)) << resInfo.shift2;\n\tint index = tmp.x | tmp.y;\n\treturn ivec3(index) >> resInfo.shift3 & resInfo.mask3;\n}\n\nvoid hg_fragment_1() {\n\ti3d = uvToIndex3D(resInfo, vTexCoord);\n\tp = (vec3(i3d) + 0.5) * resInfo.invRes3;\n}\n\nivec2 index3DTo2D(Struct3 resInfo, ivec3 i3d) {\n\tivec3 tmp = (i3d & resInfo.mask3) << resInfo.shift3;\n\tint index = tmp.x | tmp.y | tmp.z;\n\treturn ivec2(index) >> resInfo.shift2 & resInfo.mask2;\n}\n\nvec4 fetch3D(Struct3 resInfo, sampler2D tex, ivec3 i3d) {\n\treturn texelFetch(tex, index3DTo2D(resInfo, i3d), 0);\n}\n\nvec4 trilinear(Struct3 resInfo, sampler2D tex, vec3 p) {\n\tvec3 f3d = p * float(resInfo.res3) - 0.5;\n\tvec3 fr = fract(f3d);\n\tivec3 i1 = ivec3(floor(f3d)) & resInfo.mask3;\n\tivec3 i2 = (i1 + 1) & resInfo.mask3;\n\tvec4 txyz = fetch3D(resInfo, tex, ivec3(i1.x, i1.y, i1.z));\n\tvec4 txyZ = fetch3D(resInfo, tex, ivec3(i1.x, i1.y, i2.z));\n\tvec4 txYz = fetch3D(resInfo, tex, ivec3(i1.x, i2.y, i1.z));\n\tvec4 txYZ = fetch3D(resInfo, tex, ivec3(i1.x, i2.y, i2.z));\n\tvec4 tXyz = fetch3D(resInfo, tex, ivec3(i2.x, i1.y, i1.z));\n\tvec4 tXyZ = fetch3D(resInfo, tex, ivec3(i2.x, i1.y, i2.z));\n\tvec4 tXYz = fetch3D(resInfo, tex, ivec3(i2.x, i2.y, i1.z));\n\tvec4 tXYZ = fetch3D(resInfo, tex, ivec3(i2.x, i2.y, i2.z));\n\tvec4 txy = mix(txyz, txyZ, fr.z);\n\tvec4 txY = mix(txYz, txYZ, fr.z);\n\tvec4 tXy = mix(tXyz, tXyZ, fr.z);\n\tvec4 tXY = mix(tXYz, tXYZ, fr.z);\n\tvec4 tx = mix(txy, txY, fr.y);\n\tvec4 tX = mix(tXy, tXY, fr.y);\n\treturn mix(tx, tX, fr.x);\n}\n\nvec4 advect(Struct3 resInfo, sampler2D velTex, sampler2D tex, vec2 uv, float velScale) {\n\tivec3 i3d = uvToIndex3D(resInfo, uv);\n\tvec3 vel = texture(velTex, uv).xyz;\n\tvec3 p = (vec3(i3d) + 0.5 - vel * velScale) * resInfo.invRes3;\n\treturn trilinear(resInfo, tex, p);\n}\n\nvec4 advectMacCormack(Struct3 resInfo, sampler2D velTex, sampler2D tex1, sampler2D tex2, vec2 uv, vec4 mask) {\n\tvec4 v1 = texture(tex1, uv);\n\tvec4 v2 = texture(tex2, uv);\n\tvec4 error = 0.5 * (v2 - v1);\n\treturn advect(resInfo, velTex, tex1, uv, 1.0) - error * mask;\n}\n\nvoid main() {\n\thg_fragment_1();\n\tvec2 uv = vTexCoord;\n\tbool isWall = any(lessThan(min(p, 1.0 - p), vec3(2.0 * resInfo.invRes3)));\n\tvec4 mask = vec4(0, 0, 0, float(isWall));\n\tvec4 res = advectMacCormack(resInfo, texVelVof, texVelVof, texAdvectTmp, uv, mask);\n\tres.w = clamp(res.w, 0.0, 1.0);\n\tres *= vec4(1, 1, 1, 0.995);\n\tif (!isWall) {\n\t\tvec3 p1 = pcenter;\n\t\tvec3 p2 = center;\n\t\tvec3 diff = p2 - p1;\n\t\tfloat diff2 = dot(diff, diff);\n\t\tvec3 nearest;\n\t\tif (diff2 == 0.0) {\n\t\t\tnearest = p2;\n\t\t}\n\t\telse {\n\t\t\tfloat t = dot(p - p1, diff);\n\t\t\tt = clamp(t, 0.0, diff2) / diff2;\n\t\t\tnearest = mix(p1, p2, t);\n\t\t}\n\t\tfloat l = length(nearest - p);\n\t\tvec3 vel = (p2 - p1) * float(resInfo.res3) * 0.5;\n\t\tif (l < radius) {\n\t\t\tfloat ang = time * 2.0;\n\t\t\tfloat ang2 = time * 1.7;\n\t\t\tres.xyz = (vec3(0, 1.0 * (sin(ang2) * 0.5 + 1.0), 0) + vec3(cos(ang), 0, sin(ang)) * 0.4) * power;\n\t\t\tres.w = 1.0;\n\t\t}\n\t\tif (l < radius * 1.2) {\n\t\t\tres.xyz += vel;\n\t\t}\n\t\tres.y -= res.w * clamp((p.y - 0.3) * 0.1, 0.0, 0.1);\n\t}\n\tvec2 flow = 0.5 * ventilation * (p.y - 0.5) * normalize(0.5 - p.xz);\n\tif (any(lessThan(min(p.xz, 1.0 - p.xz), vec2(resInfo.invRes3)))) {\n\t\tres.xz = flow;\n\t}\n\toColor = res;\n}";
    Pc.source = {
        gb: "#version 300 es\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nlayout(location = 0) in vec4 aPosition;\nlayout(location = 1) in vec4 aColor;\nlayout(location = 2) in vec3 aNormal;\nlayout(location = 3) in vec2 aTexCoord;\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nout vec4 vColor;\nout vec3 vPosition;\nout vec3 vNormal;\nout vec2 vTexCoord;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nvoid main() {\n\tgl_Position = matrix.transform * aPosition;\n\tvTexCoord = aTexCoord;\n}",
        cb: "#version 300 es\nprecision highp int;\nprecision highp float;\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nin vec4 vColor;\nin vec3 vPosition;\nin vec3 vNormal;\nin vec2 vTexCoord;\nlayout(location = 0) out vec4 oColor;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nivec3 uvToIndex3D(Struct3 resInfo, vec2 uv) {\n\tivec2 tmp = ivec2(uv * float(resInfo.res2)) << resInfo.shift2;\n\tint index = tmp.x | tmp.y;\n\treturn ivec3(index) >> resInfo.shift3 & resInfo.mask3;\n}\n\nvoid hg_fragment_1() {\n\ti3d = uvToIndex3D(resInfo, vTexCoord);\n\tp = (vec3(i3d) + 0.5) * resInfo.invRes3;\n}\n\nivec2 index3DTo2D(Struct3 resInfo, ivec3 i3d) {\n\tivec3 tmp = (i3d & resInfo.mask3) << resInfo.shift3;\n\tint index = tmp.x | tmp.y | tmp.z;\n\treturn ivec2(index) >> resInfo.shift2 & resInfo.mask2;\n}\n\nvec4 fetch3D(Struct3 resInfo, sampler2D tex, ivec3 i3d) {\n\treturn texelFetch(tex, index3DTo2D(resInfo, i3d), 0);\n}\n\nvec4 trilinear(Struct3 resInfo, sampler2D tex, vec3 p) {\n\tvec3 f3d = p * float(resInfo.res3) - 0.5;\n\tvec3 fr = fract(f3d);\n\tivec3 i1 = ivec3(floor(f3d)) & resInfo.mask3;\n\tivec3 i2 = (i1 + 1) & resInfo.mask3;\n\tvec4 txyz = fetch3D(resInfo, tex, ivec3(i1.x, i1.y, i1.z));\n\tvec4 txyZ = fetch3D(resInfo, tex, ivec3(i1.x, i1.y, i2.z));\n\tvec4 txYz = fetch3D(resInfo, tex, ivec3(i1.x, i2.y, i1.z));\n\tvec4 txYZ = fetch3D(resInfo, tex, ivec3(i1.x, i2.y, i2.z));\n\tvec4 tXyz = fetch3D(resInfo, tex, ivec3(i2.x, i1.y, i1.z));\n\tvec4 tXyZ = fetch3D(resInfo, tex, ivec3(i2.x, i1.y, i2.z));\n\tvec4 tXYz = fetch3D(resInfo, tex, ivec3(i2.x, i2.y, i1.z));\n\tvec4 tXYZ = fetch3D(resInfo, tex, ivec3(i2.x, i2.y, i2.z));\n\tvec4 txy = mix(txyz, txyZ, fr.z);\n\tvec4 txY = mix(txYz, txYZ, fr.z);\n\tvec4 tXy = mix(tXyz, tXyZ, fr.z);\n\tvec4 tXY = mix(tXYz, tXYZ, fr.z);\n\tvec4 tx = mix(txy, txY, fr.y);\n\tvec4 tX = mix(tXy, tXY, fr.y);\n\treturn mix(tx, tX, fr.x);\n}\n\nvec4 advect(Struct3 resInfo, sampler2D velTex, sampler2D tex, vec2 uv, float velScale) {\n\tivec3 i3d = uvToIndex3D(resInfo, uv);\n\tvec3 vel = texture(velTex, uv).xyz;\n\tvec3 p = (vec3(i3d) + 0.5 - vel * velScale) * resInfo.invRes3;\n\treturn trilinear(resInfo, tex, p);\n}\n\nvec4 advectMacCormack(Struct3 resInfo, sampler2D velTex, sampler2D tex1, sampler2D tex2, vec2 uv, vec4 mask) {\n\tvec4 v1 = texture(tex1, uv);\n\tvec4 v2 = texture(tex2, uv);\n\tvec4 error = 0.5 * (v2 - v1);\n\treturn advect(resInfo, velTex, tex1, uv, 1.0) - error * mask;\n}\n\nvoid main() {\n\thg_fragment_1();\n\tvec2 uv = vTexCoord;\n\tbool isWall = any(lessThan(min(p, 1.0 - p), vec3(2.0 * resInfo.invRes3)));\n\tvec4 mask = vec4(0, 0, 0, float(isWall));\n\tvec4 res = advectMacCormack(resInfo, texVelVof, texVelVof, texAdvectTmp, uv, mask);\n\tres.w = clamp(res.w, 0.0, 1.0);\n\tres *= vec4(1, 1, 1, 0.995);\n\tif (!isWall) {\n\t\tvec3 p1 = pcenter;\n\t\tvec3 p2 = center;\n\t\tvec3 diff = p2 - p1;\n\t\tfloat diff2 = dot(diff, diff);\n\t\tvec3 nearest;\n\t\tif (diff2 == 0.0) {\n\t\t\tnearest = p2;\n\t\t}\n\t\telse {\n\t\t\tfloat t = dot(p - p1, diff);\n\t\t\tt = clamp(t, 0.0, diff2) / diff2;\n\t\t\tnearest = mix(p1, p2, t);\n\t\t}\n\t\tfloat l = length(nearest - p);\n\t\tvec3 vel = (p2 - p1) * float(resInfo.res3) * 0.5;\n\t\tif (l < radius) {\n\t\t\tfloat ang = time * 2.0;\n\t\t\tfloat ang2 = time * 1.7;\n\t\t\tres.xyz = (vec3(0, 1.0 * (sin(ang2) * 0.5 + 1.0), 0) + vec3(cos(ang), 0, sin(ang)) * 0.4) * power;\n\t\t\tres.w = 1.0;\n\t\t}\n\t\tif (l < radius * 1.2) {\n\t\t\tres.xyz += vel;\n\t\t}\n\t\tres.y -= res.w * clamp((p.y - 0.3) * 0.1, 0.0, 0.1);\n\t}\n\tvec2 flow = 0.5 * ventilation * (p.y - 0.5) * normalize(0.5 - p.xz);\n\tif (any(lessThan(min(p.xz, 1.0 - p.xz), vec2(resInfo.invRes3)))) {\n\t\tres.xz = flow;\n\t}\n\toColor = res;\n}"
    };
    Oc.Ca = {};
    Oc.ta = function() {
        for (var a = {
            transform: {
                name: "matrix.transform",
                type: e.j(4, 4)
            },
            model: {
                name: "matrix.model",
                type: e.j(4, 4)
            },
            view: {
                name: "matrix.view",
                type: e.j(4, 4)
            },
            ab: {
                name: "matrix.projection",
                type: e.j(4, 4)
            },
            Ya: {
                name: "matrix.invProjection",
                type: e.j(4, 4)
            },
            Za: {
                name: "matrix.modelView",
                type: e.j(4, 4)
            },
            Xa: {
                name: "matrix.invModelView",
                type: e.j(4, 4)
            },
            S: {
                name: "matrix.normal",
                type: e.j(3, 3)
            }
        }, b = {
            La: {
                name: "material.ambient",
                type: e.h
            },
            Ma: {
                name: "material.diffuse",
                type: e.h
            },
            Ra: {
                name: "material.specular",
                type: e.h
            },
            Qa: {
                name: "material.shininess",
                type: e.h
            },
            Na: {
                name: "material.emission",
                type: e.h
            },
            qa: {
                name: "material.texture",
                type: e.G(F.I)
            }
        }, c = {
            name: "numLights",
            type: e.u
        }, g = [], f = 0; 16 > f; ) {
            var d = "lights[" + f++ + "]";
            g.push({
                position: {
                    name: d + ".position",
                    type: e.l(4)
                },
                color: {
                    name: d + ".color",
                    type: e.l(3)
                },
                S: {
                    name: d + ".normal",
                    type: e.l(3)
                }
            })
        }
        return {
            ya: a,
            va: b,
            wa: c,
            Ea: new tc(g,"lights",e.Ka),
            sb: {
                qb: {
                    name: "resInfo.res2",
                    type: e.u
                },
                rb: {
                    name: "resInfo.res3",
                    type: e.u
                },
                ib: {
                    name: "resInfo.invRes2",
                    type: e.h
                },
                jb: {
                    name: "resInfo.invRes3",
                    type: e.h
                },
                tb: {
                    name: "resInfo.shift2",
                    type: e.ra(2)
                },
                ub: {
                    name: "resInfo.shift3",
                    type: e.ra(3)
                },
                lb: {
                    name: "resInfo.mask2",
                    type: e.u
                },
                mb: {
                    name: "resInfo.mask3",
                    type: e.u
                }
            },
            xb: {
                name: "texVelVof",
                type: e.G(F.I)
            },
            wb: {
                name: "texDivPrsWgt",
                type: e.G(F.I)
            },
            vb: {
                name: "texAdvectTmp",
                type: e.G(F.I)
            },
            pb: {
                name: "radius",
                type: e.h
            },
            hb: {
                name: "center",
                type: e.l(3)
            },
            nb: {
                name: "pcenter",
                type: e.l(3)
            },
            ob: {
                name: "power",
                type: e.h
            },
            yb: {
                name: "ventilation",
                type: e.h
            },
            zb: {
                name: "vorticity",
                type: e.h
            },
            time: {
                name: "time",
                type: e.h
            }
        }
    }(this);
    Oc.attributes = {
        Ua: {
            name: "aPosition",
            type: G.l(4),
            location: 0
        },
        Sa: {
            name: "aColor",
            type: G.l(4),
            location: 1
        },
        Ta: {
            name: "aNormal",
            type: G.l(3),
            location: 2
        },
        Va: {
            name: "aTexCoord",
            type: G.l(2),
            location: 3
        }
    };
    Oc.ua = "#version 300 es\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nlayout(location = 0) in vec4 aPosition;\nlayout(location = 1) in vec4 aColor;\nlayout(location = 2) in vec3 aNormal;\nlayout(location = 3) in vec2 aTexCoord;\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nout vec4 vColor;\nout vec3 vPosition;\nout vec3 vNormal;\nout vec2 vTexCoord;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nvoid main() {\n\tgl_Position = matrix.transform * aPosition;\n\tvTexCoord = aTexCoord;\n}";
    Oc.sa = "#version 300 es\nprecision highp int;\nprecision highp float;\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nin vec4 vColor;\nin vec3 vPosition;\nin vec3 vNormal;\nin vec2 vTexCoord;\nlayout(location = 0) out vec4 oColor;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nivec3 uvToIndex3D(Struct3 resInfo, vec2 uv) {\n\tivec2 tmp = ivec2(uv * float(resInfo.res2)) << resInfo.shift2;\n\tint index = tmp.x | tmp.y;\n\treturn ivec3(index) >> resInfo.shift3 & resInfo.mask3;\n}\n\nvoid hg_fragment_1() {\n\ti3d = uvToIndex3D(resInfo, vTexCoord);\n\tp = (vec3(i3d) + 0.5) * resInfo.invRes3;\n}\n\nivec2 index3DTo2D(Struct3 resInfo, ivec3 i3d) {\n\tivec3 tmp = (i3d & resInfo.mask3) << resInfo.shift3;\n\tint index = tmp.x | tmp.y | tmp.z;\n\treturn ivec2(index) >> resInfo.shift2 & resInfo.mask2;\n}\n\nvec4 fetch3D(Struct3 resInfo, sampler2D tex, ivec3 i3d) {\n\treturn texelFetch(tex, index3DTo2D(resInfo, i3d), 0);\n}\n\nvec3 curl(ivec3 i3d) {\n\tvec3 x1 = fetch3D(resInfo, texVelVof, i3d - ivec3(1, 0, 0)).xyz;\n\tvec3 x2 = fetch3D(resInfo, texVelVof, i3d + ivec3(1, 0, 0)).xyz;\n\tvec3 y1 = fetch3D(resInfo, texVelVof, i3d - ivec3(0, 1, 0)).xyz;\n\tvec3 y2 = fetch3D(resInfo, texVelVof, i3d + ivec3(0, 1, 0)).xyz;\n\tvec3 z1 = fetch3D(resInfo, texVelVof, i3d - ivec3(0, 0, 1)).xyz;\n\tvec3 z2 = fetch3D(resInfo, texVelVof, i3d + ivec3(0, 0, 1)).xyz;\n\treturn 0.5 * vec3((y2.z - y1.z) - (z2.y - z1.y), (z2.x - z1.x) - (x2.z - x1.z), (x2.y - x1.y) - (y2.x - y1.x));\n}\n\nvec3 safeNormalize(vec3 v) {\n\tfloat l2 = dot(v, v);\n\treturn l2 == 0.0 ? vec3(0) : v * inversesqrt(l2);\n}\n\nvec3 curlDir(ivec3 i3d) {\n\tfloat x1 = length(curl(i3d - ivec3(1, 0, 0)));\n\tfloat x2 = length(curl(i3d + ivec3(1, 0, 0)));\n\tfloat y1 = length(curl(i3d - ivec3(0, 1, 0)));\n\tfloat y2 = length(curl(i3d + ivec3(0, 1, 0)));\n\tfloat z1 = length(curl(i3d - ivec3(0, 0, 1)));\n\tfloat z2 = length(curl(i3d + ivec3(0, 0, 1)));\n\treturn safeNormalize(vec3(x2 - x1, y2 - y1, z2 - z1));\n}\n\nvoid main() {\n\thg_fragment_1();\n\tvec4 res = texture(texVelVof, vTexCoord);\n\tif (any(greaterThan(abs(p * 2.0 - 1.0), vec3(0.95)))) {\n\t\toColor = res;\n\t\treturn;\n\t}\n\tres.xyz += vorticity * cross(curlDir(i3d), curl(i3d));\n\toColor = res;\n}";
    Oc.source = {
        gb: "#version 300 es\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nlayout(location = 0) in vec4 aPosition;\nlayout(location = 1) in vec4 aColor;\nlayout(location = 2) in vec3 aNormal;\nlayout(location = 3) in vec2 aTexCoord;\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nout vec4 vColor;\nout vec3 vPosition;\nout vec3 vNormal;\nout vec2 vTexCoord;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nvoid main() {\n\tgl_Position = matrix.transform * aPosition;\n\tvTexCoord = aTexCoord;\n}",
        cb: "#version 300 es\nprecision highp int;\nprecision highp float;\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nin vec4 vColor;\nin vec3 vPosition;\nin vec3 vNormal;\nin vec2 vTexCoord;\nlayout(location = 0) out vec4 oColor;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nivec3 uvToIndex3D(Struct3 resInfo, vec2 uv) {\n\tivec2 tmp = ivec2(uv * float(resInfo.res2)) << resInfo.shift2;\n\tint index = tmp.x | tmp.y;\n\treturn ivec3(index) >> resInfo.shift3 & resInfo.mask3;\n}\n\nvoid hg_fragment_1() {\n\ti3d = uvToIndex3D(resInfo, vTexCoord);\n\tp = (vec3(i3d) + 0.5) * resInfo.invRes3;\n}\n\nivec2 index3DTo2D(Struct3 resInfo, ivec3 i3d) {\n\tivec3 tmp = (i3d & resInfo.mask3) << resInfo.shift3;\n\tint index = tmp.x | tmp.y | tmp.z;\n\treturn ivec2(index) >> resInfo.shift2 & resInfo.mask2;\n}\n\nvec4 fetch3D(Struct3 resInfo, sampler2D tex, ivec3 i3d) {\n\treturn texelFetch(tex, index3DTo2D(resInfo, i3d), 0);\n}\n\nvec3 curl(ivec3 i3d) {\n\tvec3 x1 = fetch3D(resInfo, texVelVof, i3d - ivec3(1, 0, 0)).xyz;\n\tvec3 x2 = fetch3D(resInfo, texVelVof, i3d + ivec3(1, 0, 0)).xyz;\n\tvec3 y1 = fetch3D(resInfo, texVelVof, i3d - ivec3(0, 1, 0)).xyz;\n\tvec3 y2 = fetch3D(resInfo, texVelVof, i3d + ivec3(0, 1, 0)).xyz;\n\tvec3 z1 = fetch3D(resInfo, texVelVof, i3d - ivec3(0, 0, 1)).xyz;\n\tvec3 z2 = fetch3D(resInfo, texVelVof, i3d + ivec3(0, 0, 1)).xyz;\n\treturn 0.5 * vec3((y2.z - y1.z) - (z2.y - z1.y), (z2.x - z1.x) - (x2.z - x1.z), (x2.y - x1.y) - (y2.x - y1.x));\n}\n\nvec3 safeNormalize(vec3 v) {\n\tfloat l2 = dot(v, v);\n\treturn l2 == 0.0 ? vec3(0) : v * inversesqrt(l2);\n}\n\nvec3 curlDir(ivec3 i3d) {\n\tfloat x1 = length(curl(i3d - ivec3(1, 0, 0)));\n\tfloat x2 = length(curl(i3d + ivec3(1, 0, 0)));\n\tfloat y1 = length(curl(i3d - ivec3(0, 1, 0)));\n\tfloat y2 = length(curl(i3d + ivec3(0, 1, 0)));\n\tfloat z1 = length(curl(i3d - ivec3(0, 0, 1)));\n\tfloat z2 = length(curl(i3d + ivec3(0, 0, 1)));\n\treturn safeNormalize(vec3(x2 - x1, y2 - y1, z2 - z1));\n}\n\nvoid main() {\n\thg_fragment_1();\n\tvec4 res = texture(texVelVof, vTexCoord);\n\tif (any(greaterThan(abs(p * 2.0 - 1.0), vec3(0.95)))) {\n\t\toColor = res;\n\t\treturn;\n\t}\n\tres.xyz += vorticity * cross(curlDir(i3d), curl(i3d));\n\toColor = res;\n}"
    };
    Nc.Ca = {};
    Nc.ta = function() {
        for (var a = {
            transform: {
                name: "matrix.transform",
                type: e.j(4, 4)
            },
            model: {
                name: "matrix.model",
                type: e.j(4, 4)
            },
            view: {
                name: "matrix.view",
                type: e.j(4, 4)
            },
            ab: {
                name: "matrix.projection",
                type: e.j(4, 4)
            },
            Ya: {
                name: "matrix.invProjection",
                type: e.j(4, 4)
            },
            Za: {
                name: "matrix.modelView",
                type: e.j(4, 4)
            },
            Xa: {
                name: "matrix.invModelView",
                type: e.j(4, 4)
            },
            S: {
                name: "matrix.normal",
                type: e.j(3, 3)
            }
        }, b = {
            La: {
                name: "material.ambient",
                type: e.h
            },
            Ma: {
                name: "material.diffuse",
                type: e.h
            },
            Ra: {
                name: "material.specular",
                type: e.h
            },
            Qa: {
                name: "material.shininess",
                type: e.h
            },
            Na: {
                name: "material.emission",
                type: e.h
            },
            qa: {
                name: "material.texture",
                type: e.G(F.I)
            }
        }, c = {
            name: "numLights",
            type: e.u
        }, g = [], f = 0; 16 > f; ) {
            var d = "lights[" + f++ + "]";
            g.push({
                position: {
                    name: d + ".position",
                    type: e.l(4)
                },
                color: {
                    name: d + ".color",
                    type: e.l(3)
                },
                S: {
                    name: d + ".normal",
                    type: e.l(3)
                }
            })
        }
        return {
            ya: a,
            va: b,
            wa: c,
            Ea: new tc(g,"lights",e.Ka),
            sb: {
                qb: {
                    name: "resInfo.res2",
                    type: e.u
                },
                rb: {
                    name: "resInfo.res3",
                    type: e.u
                },
                ib: {
                    name: "resInfo.invRes2",
                    type: e.h
                },
                jb: {
                    name: "resInfo.invRes3",
                    type: e.h
                },
                tb: {
                    name: "resInfo.shift2",
                    type: e.ra(2)
                },
                ub: {
                    name: "resInfo.shift3",
                    type: e.ra(3)
                },
                lb: {
                    name: "resInfo.mask2",
                    type: e.u
                },
                mb: {
                    name: "resInfo.mask3",
                    type: e.u
                }
            },
            xb: {
                name: "texVelVof",
                type: e.G(F.I)
            },
            wb: {
                name: "texDivPrsWgt",
                type: e.G(F.I)
            },
            vb: {
                name: "texAdvectTmp",
                type: e.G(F.I)
            },
            pb: {
                name: "radius",
                type: e.h
            },
            hb: {
                name: "center",
                type: e.l(3)
            },
            nb: {
                name: "pcenter",
                type: e.l(3)
            },
            ob: {
                name: "power",
                type: e.h
            },
            yb: {
                name: "ventilation",
                type: e.h
            },
            zb: {
                name: "vorticity",
                type: e.h
            },
            time: {
                name: "time",
                type: e.h
            }
        }
    }(this);
    Nc.attributes = {
        Ua: {
            name: "aPosition",
            type: G.l(4),
            location: 0
        },
        Sa: {
            name: "aColor",
            type: G.l(4),
            location: 1
        },
        Ta: {
            name: "aNormal",
            type: G.l(3),
            location: 2
        },
        Va: {
            name: "aTexCoord",
            type: G.l(2),
            location: 3
        }
    };
    Nc.ua = "#version 300 es\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nlayout(location = 0) in vec4 aPosition;\nlayout(location = 1) in vec4 aColor;\nlayout(location = 2) in vec3 aNormal;\nlayout(location = 3) in vec2 aTexCoord;\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nout vec4 vColor;\nout vec3 vPosition;\nout vec3 vNormal;\nout vec2 vTexCoord;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nvoid main() {\n\tgl_Position = matrix.transform * aPosition;\n\tvTexCoord = aTexCoord;\n}";
    Nc.sa = "#version 300 es\nprecision highp int;\nprecision highp float;\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nin vec4 vColor;\nin vec3 vPosition;\nin vec3 vNormal;\nin vec2 vTexCoord;\nlayout(location = 0) out vec4 oColor;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nivec3 uvToIndex3D(Struct3 resInfo, vec2 uv) {\n\tivec2 tmp = ivec2(uv * float(resInfo.res2)) << resInfo.shift2;\n\tint index = tmp.x | tmp.y;\n\treturn ivec3(index) >> resInfo.shift3 & resInfo.mask3;\n}\n\nvoid hg_fragment_1() {\n\ti3d = uvToIndex3D(resInfo, vTexCoord);\n\tp = (vec3(i3d) + 0.5) * resInfo.invRes3;\n}\n\nivec2 index3DTo2D(Struct3 resInfo, ivec3 i3d) {\n\tivec3 tmp = (i3d & resInfo.mask3) << resInfo.shift3;\n\tint index = tmp.x | tmp.y | tmp.z;\n\treturn ivec2(index) >> resInfo.shift2 & resInfo.mask2;\n}\n\nvec4 fetch3D(Struct3 resInfo, sampler2D tex, ivec3 i3d) {\n\treturn texelFetch(tex, index3DTo2D(resInfo, i3d), 0);\n}\n\nvoid main() {\n\thg_fragment_1();\n\tfloat prs = texture(texDivPrsWgt, vTexCoord).y * 0.9;\n\tfloat div = 0.0;\n\tdiv -= fetch3D(resInfo, texVelVof, i3d - ivec3(1, 0, 0)).x;\n\tdiv += fetch3D(resInfo, texVelVof, i3d + ivec3(1, 0, 0)).x;\n\tdiv -= fetch3D(resInfo, texVelVof, i3d - ivec3(0, 1, 0)).y;\n\tdiv += fetch3D(resInfo, texVelVof, i3d + ivec3(0, 1, 0)).y;\n\tdiv -= fetch3D(resInfo, texVelVof, i3d - ivec3(0, 0, 1)).z;\n\tdiv += fetch3D(resInfo, texVelVof, i3d + ivec3(0, 0, 1)).z;\n\tfloat weight = any(lessThan(min(p, 1.0 - p), vec3(resInfo.invRes3))) ? 0.0 : 1.0;\n\toColor = vec4(div, prs, weight, 1);\n}";
    Nc.source = {
        gb: "#version 300 es\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nlayout(location = 0) in vec4 aPosition;\nlayout(location = 1) in vec4 aColor;\nlayout(location = 2) in vec3 aNormal;\nlayout(location = 3) in vec2 aTexCoord;\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nout vec4 vColor;\nout vec3 vPosition;\nout vec3 vNormal;\nout vec2 vTexCoord;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nvoid main() {\n\tgl_Position = matrix.transform * aPosition;\n\tvTexCoord = aTexCoord;\n}",
        cb: "#version 300 es\nprecision highp int;\nprecision highp float;\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nin vec4 vColor;\nin vec3 vPosition;\nin vec3 vNormal;\nin vec2 vTexCoord;\nlayout(location = 0) out vec4 oColor;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nivec3 uvToIndex3D(Struct3 resInfo, vec2 uv) {\n\tivec2 tmp = ivec2(uv * float(resInfo.res2)) << resInfo.shift2;\n\tint index = tmp.x | tmp.y;\n\treturn ivec3(index) >> resInfo.shift3 & resInfo.mask3;\n}\n\nvoid hg_fragment_1() {\n\ti3d = uvToIndex3D(resInfo, vTexCoord);\n\tp = (vec3(i3d) + 0.5) * resInfo.invRes3;\n}\n\nivec2 index3DTo2D(Struct3 resInfo, ivec3 i3d) {\n\tivec3 tmp = (i3d & resInfo.mask3) << resInfo.shift3;\n\tint index = tmp.x | tmp.y | tmp.z;\n\treturn ivec2(index) >> resInfo.shift2 & resInfo.mask2;\n}\n\nvec4 fetch3D(Struct3 resInfo, sampler2D tex, ivec3 i3d) {\n\treturn texelFetch(tex, index3DTo2D(resInfo, i3d), 0);\n}\n\nvoid main() {\n\thg_fragment_1();\n\tfloat prs = texture(texDivPrsWgt, vTexCoord).y * 0.9;\n\tfloat div = 0.0;\n\tdiv -= fetch3D(resInfo, texVelVof, i3d - ivec3(1, 0, 0)).x;\n\tdiv += fetch3D(resInfo, texVelVof, i3d + ivec3(1, 0, 0)).x;\n\tdiv -= fetch3D(resInfo, texVelVof, i3d - ivec3(0, 1, 0)).y;\n\tdiv += fetch3D(resInfo, texVelVof, i3d + ivec3(0, 1, 0)).y;\n\tdiv -= fetch3D(resInfo, texVelVof, i3d - ivec3(0, 0, 1)).z;\n\tdiv += fetch3D(resInfo, texVelVof, i3d + ivec3(0, 0, 1)).z;\n\tfloat weight = any(lessThan(min(p, 1.0 - p), vec3(resInfo.invRes3))) ? 0.0 : 1.0;\n\toColor = vec4(div, prs, weight, 1);\n}"
    };
    pc.Ca = {};
    pc.ta = function() {
        for (var a = {
            transform: {
                name: "matrix.transform",
                type: e.j(4, 4)
            },
            model: {
                name: "matrix.model",
                type: e.j(4, 4)
            },
            view: {
                name: "matrix.view",
                type: e.j(4, 4)
            },
            ab: {
                name: "matrix.projection",
                type: e.j(4, 4)
            },
            Ya: {
                name: "matrix.invProjection",
                type: e.j(4, 4)
            },
            Za: {
                name: "matrix.modelView",
                type: e.j(4, 4)
            },
            Xa: {
                name: "matrix.invModelView",
                type: e.j(4, 4)
            },
            S: {
                name: "matrix.normal",
                type: e.j(3, 3)
            }
        }, b = {
            La: {
                name: "material.ambient",
                type: e.h
            },
            Ma: {
                name: "material.diffuse",
                type: e.h
            },
            Ra: {
                name: "material.specular",
                type: e.h
            },
            Qa: {
                name: "material.shininess",
                type: e.h
            },
            Na: {
                name: "material.emission",
                type: e.h
            },
            qa: {
                name: "material.texture",
                type: e.G(F.I)
            }
        }, c = {
            name: "numLights",
            type: e.u
        }, g = [], f = 0; 16 > f; ) {
            var d = "lights[" + f++ + "]";
            g.push({
                position: {
                    name: d + ".position",
                    type: e.l(4)
                },
                color: {
                    name: d + ".color",
                    type: e.l(3)
                },
                S: {
                    name: d + ".normal",
                    type: e.l(3)
                }
            })
        }
        return {
            ya: a,
            va: b,
            wa: c,
            Ea: new tc(g,"lights",e.Ka),
            sb: {
                qb: {
                    name: "resInfo.res2",
                    type: e.u
                },
                rb: {
                    name: "resInfo.res3",
                    type: e.u
                },
                ib: {
                    name: "resInfo.invRes2",
                    type: e.h
                },
                jb: {
                    name: "resInfo.invRes3",
                    type: e.h
                },
                tb: {
                    name: "resInfo.shift2",
                    type: e.ra(2)
                },
                ub: {
                    name: "resInfo.shift3",
                    type: e.ra(3)
                },
                lb: {
                    name: "resInfo.mask2",
                    type: e.u
                },
                mb: {
                    name: "resInfo.mask3",
                    type: e.u
                }
            },
            xb: {
                name: "texVelVof",
                type: e.G(F.I)
            },
            wb: {
                name: "texDivPrsWgt",
                type: e.G(F.I)
            },
            vb: {
                name: "texAdvectTmp",
                type: e.G(F.I)
            },
            pb: {
                name: "radius",
                type: e.h
            },
            hb: {
                name: "center",
                type: e.l(3)
            },
            nb: {
                name: "pcenter",
                type: e.l(3)
            },
            ob: {
                name: "power",
                type: e.h
            },
            yb: {
                name: "ventilation",
                type: e.h
            },
            zb: {
                name: "vorticity",
                type: e.h
            },
            time: {
                name: "time",
                type: e.h
            },
            Rc: {
                name: "parity",
                type: e.u
            }
        }
    }(this);
    pc.attributes = {
        Ua: {
            name: "aPosition",
            type: G.l(4),
            location: 0
        },
        Sa: {
            name: "aColor",
            type: G.l(4),
            location: 1
        },
        Ta: {
            name: "aNormal",
            type: G.l(3),
            location: 2
        },
        Va: {
            name: "aTexCoord",
            type: G.l(2),
            location: 3
        }
    };
    pc.ua = "#version 300 es\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nlayout(location = 0) in vec4 aPosition;\nlayout(location = 1) in vec4 aColor;\nlayout(location = 2) in vec3 aNormal;\nlayout(location = 3) in vec2 aTexCoord;\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nout vec4 vColor;\nout vec3 vPosition;\nout vec3 vNormal;\nout vec2 vTexCoord;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\nuniform int parity;\n\nvoid main() {\n\tgl_Position = matrix.transform * aPosition;\n\tvTexCoord = aTexCoord;\n}";
    pc.sa = "#version 300 es\nprecision highp int;\nprecision highp float;\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nin vec4 vColor;\nin vec3 vPosition;\nin vec3 vNormal;\nin vec2 vTexCoord;\nlayout(location = 0) out vec4 oColor;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\nuniform int parity;\n\nivec3 uvToIndex3D(Struct3 resInfo, vec2 uv) {\n\tivec2 tmp = ivec2(uv * float(resInfo.res2)) << resInfo.shift2;\n\tint index = tmp.x | tmp.y;\n\treturn ivec3(index) >> resInfo.shift3 & resInfo.mask3;\n}\n\nvoid hg_fragment_1() {\n\ti3d = uvToIndex3D(resInfo, vTexCoord);\n\tp = (vec3(i3d) + 0.5) * resInfo.invRes3;\n}\n\nivec2 index3DTo2D(Struct3 resInfo, ivec3 i3d) {\n\tivec3 tmp = (i3d & resInfo.mask3) << resInfo.shift3;\n\tint index = tmp.x | tmp.y | tmp.z;\n\treturn ivec2(index) >> resInfo.shift2 & resInfo.mask2;\n}\n\nvec4 fetch3D(Struct3 resInfo, sampler2D tex, ivec3 i3d) {\n\treturn texelFetch(tex, index3DTo2D(resInfo, i3d), 0);\n}\n\nvoid main() {\n\thg_fragment_1();\n\tif (((i3d.x ^ i3d.y ^ i3d.z ^ parity) & 1) == 0) {\n\t\toColor = texture(texDivPrsWgt, vTexCoord);\n\t}\n\telse {\n\t\tvec4 res = texture(texDivPrsWgt, vTexCoord);\n\t\tvec2 nd = vec2(-res.x, 0);\n\t\tvec2 pw;\n\t\tpw = fetch3D(resInfo, texDivPrsWgt, i3d - ivec3(1, 0, 0)).yz;\n\t\tnd += vec2(pw.x * pw.y, pw.y);\n\t\tpw = fetch3D(resInfo, texDivPrsWgt, i3d + ivec3(1, 0, 0)).yz;\n\t\tnd += vec2(pw.x * pw.y, pw.y);\n\t\tpw = fetch3D(resInfo, texDivPrsWgt, i3d - ivec3(0, 1, 0)).yz;\n\t\tnd += vec2(pw.x * pw.y, pw.y);\n\t\tpw = fetch3D(resInfo, texDivPrsWgt, i3d + ivec3(0, 1, 0)).yz;\n\t\tnd += vec2(pw.x * pw.y, pw.y);\n\t\tpw = fetch3D(resInfo, texDivPrsWgt, i3d - ivec3(0, 0, 1)).yz;\n\t\tnd += vec2(pw.x * pw.y, pw.y);\n\t\tpw = fetch3D(resInfo, texDivPrsWgt, i3d + ivec3(0, 0, 1)).yz;\n\t\tnd += vec2(pw.x * pw.y, pw.y);\n\t\tnd.y = max(1.0, nd.y);\n\t\tfloat np = nd.x / nd.y;\n\t\tfloat delta = np - res.y;\n\t\tres.y += delta * 1.3;\n\t\toColor = res;\n\t}\n}";
    pc.source = {
        gb: "#version 300 es\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nlayout(location = 0) in vec4 aPosition;\nlayout(location = 1) in vec4 aColor;\nlayout(location = 2) in vec3 aNormal;\nlayout(location = 3) in vec2 aTexCoord;\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nout vec4 vColor;\nout vec3 vPosition;\nout vec3 vNormal;\nout vec2 vTexCoord;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\nuniform int parity;\n\nvoid main() {\n\tgl_Position = matrix.transform * aPosition;\n\tvTexCoord = aTexCoord;\n}",
        cb: "#version 300 es\nprecision highp int;\nprecision highp float;\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nin vec4 vColor;\nin vec3 vPosition;\nin vec3 vNormal;\nin vec2 vTexCoord;\nlayout(location = 0) out vec4 oColor;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\nuniform int parity;\n\nivec3 uvToIndex3D(Struct3 resInfo, vec2 uv) {\n\tivec2 tmp = ivec2(uv * float(resInfo.res2)) << resInfo.shift2;\n\tint index = tmp.x | tmp.y;\n\treturn ivec3(index) >> resInfo.shift3 & resInfo.mask3;\n}\n\nvoid hg_fragment_1() {\n\ti3d = uvToIndex3D(resInfo, vTexCoord);\n\tp = (vec3(i3d) + 0.5) * resInfo.invRes3;\n}\n\nivec2 index3DTo2D(Struct3 resInfo, ivec3 i3d) {\n\tivec3 tmp = (i3d & resInfo.mask3) << resInfo.shift3;\n\tint index = tmp.x | tmp.y | tmp.z;\n\treturn ivec2(index) >> resInfo.shift2 & resInfo.mask2;\n}\n\nvec4 fetch3D(Struct3 resInfo, sampler2D tex, ivec3 i3d) {\n\treturn texelFetch(tex, index3DTo2D(resInfo, i3d), 0);\n}\n\nvoid main() {\n\thg_fragment_1();\n\tif (((i3d.x ^ i3d.y ^ i3d.z ^ parity) & 1) == 0) {\n\t\toColor = texture(texDivPrsWgt, vTexCoord);\n\t}\n\telse {\n\t\tvec4 res = texture(texDivPrsWgt, vTexCoord);\n\t\tvec2 nd = vec2(-res.x, 0);\n\t\tvec2 pw;\n\t\tpw = fetch3D(resInfo, texDivPrsWgt, i3d - ivec3(1, 0, 0)).yz;\n\t\tnd += vec2(pw.x * pw.y, pw.y);\n\t\tpw = fetch3D(resInfo, texDivPrsWgt, i3d + ivec3(1, 0, 0)).yz;\n\t\tnd += vec2(pw.x * pw.y, pw.y);\n\t\tpw = fetch3D(resInfo, texDivPrsWgt, i3d - ivec3(0, 1, 0)).yz;\n\t\tnd += vec2(pw.x * pw.y, pw.y);\n\t\tpw = fetch3D(resInfo, texDivPrsWgt, i3d + ivec3(0, 1, 0)).yz;\n\t\tnd += vec2(pw.x * pw.y, pw.y);\n\t\tpw = fetch3D(resInfo, texDivPrsWgt, i3d - ivec3(0, 0, 1)).yz;\n\t\tnd += vec2(pw.x * pw.y, pw.y);\n\t\tpw = fetch3D(resInfo, texDivPrsWgt, i3d + ivec3(0, 0, 1)).yz;\n\t\tnd += vec2(pw.x * pw.y, pw.y);\n\t\tnd.y = max(1.0, nd.y);\n\t\tfloat np = nd.x / nd.y;\n\t\tfloat delta = np - res.y;\n\t\tres.y += delta * 1.3;\n\t\toColor = res;\n\t}\n}"
    };
    Mc.Ca = {};
    Mc.ta = function() {
        for (var a = {
            transform: {
                name: "matrix.transform",
                type: e.j(4, 4)
            },
            model: {
                name: "matrix.model",
                type: e.j(4, 4)
            },
            view: {
                name: "matrix.view",
                type: e.j(4, 4)
            },
            ab: {
                name: "matrix.projection",
                type: e.j(4, 4)
            },
            Ya: {
                name: "matrix.invProjection",
                type: e.j(4, 4)
            },
            Za: {
                name: "matrix.modelView",
                type: e.j(4, 4)
            },
            Xa: {
                name: "matrix.invModelView",
                type: e.j(4, 4)
            },
            S: {
                name: "matrix.normal",
                type: e.j(3, 3)
            }
        }, b = {
            La: {
                name: "material.ambient",
                type: e.h
            },
            Ma: {
                name: "material.diffuse",
                type: e.h
            },
            Ra: {
                name: "material.specular",
                type: e.h
            },
            Qa: {
                name: "material.shininess",
                type: e.h
            },
            Na: {
                name: "material.emission",
                type: e.h
            },
            qa: {
                name: "material.texture",
                type: e.G(F.I)
            }
        }, c = {
            name: "numLights",
            type: e.u
        }, g = [], f = 0; 16 > f; ) {
            var d = "lights[" + f++ + "]";
            g.push({
                position: {
                    name: d + ".position",
                    type: e.l(4)
                },
                color: {
                    name: d + ".color",
                    type: e.l(3)
                },
                S: {
                    name: d + ".normal",
                    type: e.l(3)
                }
            })
        }
        return {
            ya: a,
            va: b,
            wa: c,
            Ea: new tc(g,"lights",e.Ka),
            sb: {
                qb: {
                    name: "resInfo.res2",
                    type: e.u
                },
                rb: {
                    name: "resInfo.res3",
                    type: e.u
                },
                ib: {
                    name: "resInfo.invRes2",
                    type: e.h
                },
                jb: {
                    name: "resInfo.invRes3",
                    type: e.h
                },
                tb: {
                    name: "resInfo.shift2",
                    type: e.ra(2)
                },
                ub: {
                    name: "resInfo.shift3",
                    type: e.ra(3)
                },
                lb: {
                    name: "resInfo.mask2",
                    type: e.u
                },
                mb: {
                    name: "resInfo.mask3",
                    type: e.u
                }
            },
            xb: {
                name: "texVelVof",
                type: e.G(F.I)
            },
            wb: {
                name: "texDivPrsWgt",
                type: e.G(F.I)
            },
            vb: {
                name: "texAdvectTmp",
                type: e.G(F.I)
            },
            pb: {
                name: "radius",
                type: e.h
            },
            hb: {
                name: "center",
                type: e.l(3)
            },
            nb: {
                name: "pcenter",
                type: e.l(3)
            },
            ob: {
                name: "power",
                type: e.h
            },
            yb: {
                name: "ventilation",
                type: e.h
            },
            zb: {
                name: "vorticity",
                type: e.h
            },
            time: {
                name: "time",
                type: e.h
            }
        }
    }(this);
    Mc.attributes = {
        Ua: {
            name: "aPosition",
            type: G.l(4),
            location: 0
        },
        Sa: {
            name: "aColor",
            type: G.l(4),
            location: 1
        },
        Ta: {
            name: "aNormal",
            type: G.l(3),
            location: 2
        },
        Va: {
            name: "aTexCoord",
            type: G.l(2),
            location: 3
        }
    };
    Mc.ua = "#version 300 es\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nlayout(location = 0) in vec4 aPosition;\nlayout(location = 1) in vec4 aColor;\nlayout(location = 2) in vec3 aNormal;\nlayout(location = 3) in vec2 aTexCoord;\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nout vec4 vColor;\nout vec3 vPosition;\nout vec3 vNormal;\nout vec2 vTexCoord;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nvoid main() {\n\tgl_Position = matrix.transform * aPosition;\n\tvTexCoord = aTexCoord;\n}";
    Mc.sa = "#version 300 es\nprecision highp int;\nprecision highp float;\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nin vec4 vColor;\nin vec3 vPosition;\nin vec3 vNormal;\nin vec2 vTexCoord;\nlayout(location = 0) out vec4 oColor;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nivec3 uvToIndex3D(Struct3 resInfo, vec2 uv) {\n\tivec2 tmp = ivec2(uv * float(resInfo.res2)) << resInfo.shift2;\n\tint index = tmp.x | tmp.y;\n\treturn ivec3(index) >> resInfo.shift3 & resInfo.mask3;\n}\n\nvoid hg_fragment_1() {\n\ti3d = uvToIndex3D(resInfo, vTexCoord);\n\tp = (vec3(i3d) + 0.5) * resInfo.invRes3;\n}\n\nivec2 index3DTo2D(Struct3 resInfo, ivec3 i3d) {\n\tivec3 tmp = (i3d & resInfo.mask3) << resInfo.shift3;\n\tint index = tmp.x | tmp.y | tmp.z;\n\treturn ivec2(index) >> resInfo.shift2 & resInfo.mask2;\n}\n\nvec4 fetch3D(Struct3 resInfo, sampler2D tex, ivec3 i3d) {\n\treturn texelFetch(tex, index3DTo2D(resInfo, i3d), 0);\n}\n\nfloat pressureAt(float orig, ivec3 i3d) {\n\tvec2 pw = fetch3D(resInfo, texDivPrsWgt, i3d).yz;\n\treturn mix(orig, pw.x, pw.y);\n}\n\nvoid main() {\n\thg_fragment_1();\n\tvec2 pw = texture(texDivPrsWgt, vTexCoord).yz;\n\tvec4 res = texture(texVelVof, vTexCoord);\n\tif (pw.y == 0.0) {\n\t\tres.w = 0.0;\n\t}\n\telse {\n\t\tfloat p = pw.x;\n\t\tvec3 delta = -0.5 * vec3(pressureAt(p, i3d + ivec3(1, 0, 0)) - pressureAt(p, i3d - ivec3(1, 0, 0)), pressureAt(p, i3d + ivec3(0, 1, 0)) - pressureAt(p, i3d - ivec3(0, 1, 0)), pressureAt(p, i3d + ivec3(0, 0, 1)) - pressureAt(p, i3d - ivec3(0, 0, 1)));\n\t\tres.xyz += delta;\n\t}\n\toColor = res;\n}";
    Mc.source = {
        gb: "#version 300 es\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nlayout(location = 0) in vec4 aPosition;\nlayout(location = 1) in vec4 aColor;\nlayout(location = 2) in vec3 aNormal;\nlayout(location = 3) in vec2 aTexCoord;\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nout vec4 vColor;\nout vec3 vPosition;\nout vec3 vNormal;\nout vec2 vTexCoord;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nvoid main() {\n\tgl_Position = matrix.transform * aPosition;\n\tvTexCoord = aTexCoord;\n}",
        cb: "#version 300 es\nprecision highp int;\nprecision highp float;\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nin vec4 vColor;\nin vec3 vPosition;\nin vec3 vNormal;\nin vec2 vTexCoord;\nlayout(location = 0) out vec4 oColor;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nivec3 uvToIndex3D(Struct3 resInfo, vec2 uv) {\n\tivec2 tmp = ivec2(uv * float(resInfo.res2)) << resInfo.shift2;\n\tint index = tmp.x | tmp.y;\n\treturn ivec3(index) >> resInfo.shift3 & resInfo.mask3;\n}\n\nvoid hg_fragment_1() {\n\ti3d = uvToIndex3D(resInfo, vTexCoord);\n\tp = (vec3(i3d) + 0.5) * resInfo.invRes3;\n}\n\nivec2 index3DTo2D(Struct3 resInfo, ivec3 i3d) {\n\tivec3 tmp = (i3d & resInfo.mask3) << resInfo.shift3;\n\tint index = tmp.x | tmp.y | tmp.z;\n\treturn ivec2(index) >> resInfo.shift2 & resInfo.mask2;\n}\n\nvec4 fetch3D(Struct3 resInfo, sampler2D tex, ivec3 i3d) {\n\treturn texelFetch(tex, index3DTo2D(resInfo, i3d), 0);\n}\n\nfloat pressureAt(float orig, ivec3 i3d) {\n\tvec2 pw = fetch3D(resInfo, texDivPrsWgt, i3d).yz;\n\treturn mix(orig, pw.x, pw.y);\n}\n\nvoid main() {\n\thg_fragment_1();\n\tvec2 pw = texture(texDivPrsWgt, vTexCoord).yz;\n\tvec4 res = texture(texVelVof, vTexCoord);\n\tif (pw.y == 0.0) {\n\t\tres.w = 0.0;\n\t}\n\telse {\n\t\tfloat p = pw.x;\n\t\tvec3 delta = -0.5 * vec3(pressureAt(p, i3d + ivec3(1, 0, 0)) - pressureAt(p, i3d - ivec3(1, 0, 0)), pressureAt(p, i3d + ivec3(0, 1, 0)) - pressureAt(p, i3d - ivec3(0, 1, 0)), pressureAt(p, i3d + ivec3(0, 0, 1)) - pressureAt(p, i3d - ivec3(0, 0, 1)));\n\t\tres.xyz += delta;\n\t}\n\toColor = res;\n}"
    };
    Ac.Ca = {};
    Ac.ta = function() {
        for (var a = {
            transform: {
                name: "matrix.transform",
                type: e.j(4, 4)
            },
            model: {
                name: "matrix.model",
                type: e.j(4, 4)
            },
            view: {
                name: "matrix.view",
                type: e.j(4, 4)
            },
            ab: {
                name: "matrix.projection",
                type: e.j(4, 4)
            },
            Ya: {
                name: "matrix.invProjection",
                type: e.j(4, 4)
            },
            Za: {
                name: "matrix.modelView",
                type: e.j(4, 4)
            },
            Xa: {
                name: "matrix.invModelView",
                type: e.j(4, 4)
            },
            S: {
                name: "matrix.normal",
                type: e.j(3, 3)
            }
        }, b = {
            La: {
                name: "material.ambient",
                type: e.h
            },
            Ma: {
                name: "material.diffuse",
                type: e.h
            },
            Ra: {
                name: "material.specular",
                type: e.h
            },
            Qa: {
                name: "material.shininess",
                type: e.h
            },
            Na: {
                name: "material.emission",
                type: e.h
            },
            qa: {
                name: "material.texture",
                type: e.G(F.I)
            }
        }, c = {
            name: "numLights",
            type: e.u
        }, g = [], f = 0; 16 > f; ) {
            var d = "lights[" + f++ + "]";
            g.push({
                position: {
                    name: d + ".position",
                    type: e.l(4)
                },
                color: {
                    name: d + ".color",
                    type: e.l(3)
                },
                S: {
                    name: d + ".normal",
                    type: e.l(3)
                }
            })
        }
        return {
            ya: a,
            va: b,
            wa: c,
            Ea: new tc(g,"lights",e.Ka),
            sb: {
                qb: {
                    name: "resInfo.res2",
                    type: e.u
                },
                rb: {
                    name: "resInfo.res3",
                    type: e.u
                },
                ib: {
                    name: "resInfo.invRes2",
                    type: e.h
                },
                jb: {
                    name: "resInfo.invRes3",
                    type: e.h
                },
                tb: {
                    name: "resInfo.shift2",
                    type: e.ra(2)
                },
                ub: {
                    name: "resInfo.shift3",
                    type: e.ra(3)
                },
                lb: {
                    name: "resInfo.mask2",
                    type: e.u
                },
                mb: {
                    name: "resInfo.mask3",
                    type: e.u
                }
            },
            xb: {
                name: "texVelVof",
                type: e.G(F.I)
            },
            wb: {
                name: "texDivPrsWgt",
                type: e.G(F.I)
            },
            vb: {
                name: "texAdvectTmp",
                type: e.G(F.I)
            },
            pb: {
                name: "radius",
                type: e.h
            },
            hb: {
                name: "center",
                type: e.l(3)
            },
            nb: {
                name: "pcenter",
                type: e.l(3)
            },
            ob: {
                name: "power",
                type: e.h
            },
            yb: {
                name: "ventilation",
                type: e.h
            },
            zb: {
                name: "vorticity",
                type: e.h
            },
            time: {
                name: "time",
                type: e.h
            },
            Ba: {
                name: "camPos",
                type: e.l(3)
            },
            Bb: {
                name: "halfExtent",
                type: e.h
            }
        }
    }(this);
    Ac.attributes = {
        Ua: {
            name: "aPosition",
            type: G.l(4),
            location: 0
        },
        Sa: {
            name: "aColor",
            type: G.l(4),
            location: 1
        },
        Ta: {
            name: "aNormal",
            type: G.l(3),
            location: 2
        },
        Va: {
            name: "aTexCoord",
            type: G.l(2),
            location: 3
        }
    };
    Ac.ua = "#version 300 es\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nlayout(location = 0) in vec4 aPosition;\nlayout(location = 1) in vec4 aColor;\nlayout(location = 2) in vec3 aNormal;\nlayout(location = 3) in vec2 aTexCoord;\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nout vec4 vColor;\nout vec3 vPosition;\nout vec3 vNormal;\nout vec2 vTexCoord;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\nuniform vec3 camPos;\nuniform float halfExtent;\n\nvoid main() {\n\tgl_Position = matrix.transform * aPosition;\n\tvPosition = (matrix.model * aPosition).xyz;\n}";
    Ac.sa = "#version 300 es\nprecision highp int;\nprecision highp float;\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nin vec4 vColor;\nin vec3 vPosition;\nin vec3 vNormal;\nin vec2 vTexCoord;\nlayout(location = 0) out vec4 oColor;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\nuniform vec3 camPos;\nuniform float halfExtent;\n\nbool outOfBounds(vec3 p) {\n\treturn any(greaterThan(abs(p) - halfExtent, vec3(0)));\n}\n\nvec3 worldToLocal(vec3 p) {\n\treturn (p + halfExtent) / (2.0 * halfExtent);\n}\n\nivec2 index3DTo2D(Struct3 resInfo, ivec3 i3d) {\n\tivec3 tmp = (i3d & resInfo.mask3) << resInfo.shift3;\n\tint index = tmp.x | tmp.y | tmp.z;\n\treturn ivec2(index) >> resInfo.shift2 & resInfo.mask2;\n}\n\nvec4 fetch3D(Struct3 resInfo, sampler2D tex, ivec3 i3d) {\n\treturn texelFetch(tex, index3DTo2D(resInfo, i3d), 0);\n}\n\nvec4 trilinear(Struct3 resInfo, sampler2D tex, vec3 p) {\n\tvec3 f3d = p * float(resInfo.res3) - 0.5;\n\tvec3 fr = fract(f3d);\n\tivec3 i1 = ivec3(floor(f3d)) & resInfo.mask3;\n\tivec3 i2 = (i1 + 1) & resInfo.mask3;\n\tvec4 txyz = fetch3D(resInfo, tex, ivec3(i1.x, i1.y, i1.z));\n\tvec4 txyZ = fetch3D(resInfo, tex, ivec3(i1.x, i1.y, i2.z));\n\tvec4 txYz = fetch3D(resInfo, tex, ivec3(i1.x, i2.y, i1.z));\n\tvec4 txYZ = fetch3D(resInfo, tex, ivec3(i1.x, i2.y, i2.z));\n\tvec4 tXyz = fetch3D(resInfo, tex, ivec3(i2.x, i1.y, i1.z));\n\tvec4 tXyZ = fetch3D(resInfo, tex, ivec3(i2.x, i1.y, i2.z));\n\tvec4 tXYz = fetch3D(resInfo, tex, ivec3(i2.x, i2.y, i1.z));\n\tvec4 tXYZ = fetch3D(resInfo, tex, ivec3(i2.x, i2.y, i2.z));\n\tvec4 txy = mix(txyz, txyZ, fr.z);\n\tvec4 txY = mix(txYz, txYZ, fr.z);\n\tvec4 tXy = mix(tXyz, tXyZ, fr.z);\n\tvec4 tXY = mix(tXYz, tXYZ, fr.z);\n\tvec4 tx = mix(txy, txY, fr.y);\n\tvec4 tX = mix(tXy, tXY, fr.y);\n\treturn mix(tx, tX, fr.x);\n}\n\nvoid main() {\n\tvec3 p = vPosition;\n\tvec3 dir = normalize(p - camPos);\n\tp += dir * 0.1 * fract(sin(dot(p + fract(time), vec3(619.394, 487.196, 543.913))) * 47921.637);\n\tfloat alpha = 0.0;\n\tfor (int i = 0; i < 1000; i++) {\n\t\tif (outOfBounds(p)) {\n\t\t\tbreak;\n\t\t}\n\t\tvec3 local = worldToLocal(p);\n\t\tfloat dens = trilinear(resInfo, texVelVof, local).w;\n\t\tfloat depth = radius * 1.5 - length(local - center);\n\t\tif (depth > 0.0) {\n\t\t\tdens += depth * 20.0;\n\t\t}\n\t\talpha += dens * 0.2;\n\t\tp += dir * 0.1;\n\t}\n\tfloat ex = 1.0 + max(0.0, alpha - 1.0) * 0.5;\n\talpha = min(1.0, alpha);\n\toColor = vec4(vec3(0.8, 0.9, 1) * ex, alpha);\n}";
    Ac.source = {
        gb: "#version 300 es\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nlayout(location = 0) in vec4 aPosition;\nlayout(location = 1) in vec4 aColor;\nlayout(location = 2) in vec3 aNormal;\nlayout(location = 3) in vec2 aTexCoord;\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nout vec4 vColor;\nout vec3 vPosition;\nout vec3 vNormal;\nout vec2 vTexCoord;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\nuniform vec3 camPos;\nuniform float halfExtent;\n\nvoid main() {\n\tgl_Position = matrix.transform * aPosition;\n\tvPosition = (matrix.model * aPosition).xyz;\n}",
        cb: "#version 300 es\nprecision highp int;\nprecision highp float;\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nin vec4 vColor;\nin vec3 vPosition;\nin vec3 vNormal;\nin vec2 vTexCoord;\nlayout(location = 0) out vec4 oColor;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\nuniform vec3 camPos;\nuniform float halfExtent;\n\nbool outOfBounds(vec3 p) {\n\treturn any(greaterThan(abs(p) - halfExtent, vec3(0)));\n}\n\nvec3 worldToLocal(vec3 p) {\n\treturn (p + halfExtent) / (2.0 * halfExtent);\n}\n\nivec2 index3DTo2D(Struct3 resInfo, ivec3 i3d) {\n\tivec3 tmp = (i3d & resInfo.mask3) << resInfo.shift3;\n\tint index = tmp.x | tmp.y | tmp.z;\n\treturn ivec2(index) >> resInfo.shift2 & resInfo.mask2;\n}\n\nvec4 fetch3D(Struct3 resInfo, sampler2D tex, ivec3 i3d) {\n\treturn texelFetch(tex, index3DTo2D(resInfo, i3d), 0);\n}\n\nvec4 trilinear(Struct3 resInfo, sampler2D tex, vec3 p) {\n\tvec3 f3d = p * float(resInfo.res3) - 0.5;\n\tvec3 fr = fract(f3d);\n\tivec3 i1 = ivec3(floor(f3d)) & resInfo.mask3;\n\tivec3 i2 = (i1 + 1) & resInfo.mask3;\n\tvec4 txyz = fetch3D(resInfo, tex, ivec3(i1.x, i1.y, i1.z));\n\tvec4 txyZ = fetch3D(resInfo, tex, ivec3(i1.x, i1.y, i2.z));\n\tvec4 txYz = fetch3D(resInfo, tex, ivec3(i1.x, i2.y, i1.z));\n\tvec4 txYZ = fetch3D(resInfo, tex, ivec3(i1.x, i2.y, i2.z));\n\tvec4 tXyz = fetch3D(resInfo, tex, ivec3(i2.x, i1.y, i1.z));\n\tvec4 tXyZ = fetch3D(resInfo, tex, ivec3(i2.x, i1.y, i2.z));\n\tvec4 tXYz = fetch3D(resInfo, tex, ivec3(i2.x, i2.y, i1.z));\n\tvec4 tXYZ = fetch3D(resInfo, tex, ivec3(i2.x, i2.y, i2.z));\n\tvec4 txy = mix(txyz, txyZ, fr.z);\n\tvec4 txY = mix(txYz, txYZ, fr.z);\n\tvec4 tXy = mix(tXyz, tXyZ, fr.z);\n\tvec4 tXY = mix(tXYz, tXYZ, fr.z);\n\tvec4 tx = mix(txy, txY, fr.y);\n\tvec4 tX = mix(tXy, tXY, fr.y);\n\treturn mix(tx, tX, fr.x);\n}\n\nvoid main() {\n\tvec3 p = vPosition;\n\tvec3 dir = normalize(p - camPos);\n\tp += dir * 0.1 * fract(sin(dot(p + fract(time), vec3(619.394, 487.196, 543.913))) * 47921.637);\n\tfloat alpha = 0.0;\n\tfor (int i = 0; i < 1000; i++) {\n\t\tif (outOfBounds(p)) {\n\t\t\tbreak;\n\t\t}\n\t\tvec3 local = worldToLocal(p);\n\t\tfloat dens = trilinear(resInfo, texVelVof, local).w;\n\t\tfloat depth = radius * 1.5 - length(local - center);\n\t\tif (depth > 0.0) {\n\t\t\tdens += depth * 20.0;\n\t\t}\n\t\talpha += dens * 0.2;\n\t\tp += dir * 0.1;\n\t}\n\tfloat ex = 1.0 + max(0.0, alpha - 1.0) * 0.5;\n\talpha = min(1.0, alpha);\n\toColor = vec4(vec3(0.8, 0.9, 1) * ex, alpha);\n}"
    };
    Lc.Ca = {};
    Lc.ta = function() {
        for (var a = {
            transform: {
                name: "matrix.transform",
                type: e.j(4, 4)
            },
            model: {
                name: "matrix.model",
                type: e.j(4, 4)
            },
            view: {
                name: "matrix.view",
                type: e.j(4, 4)
            },
            ab: {
                name: "matrix.projection",
                type: e.j(4, 4)
            },
            Ya: {
                name: "matrix.invProjection",
                type: e.j(4, 4)
            },
            Za: {
                name: "matrix.modelView",
                type: e.j(4, 4)
            },
            Xa: {
                name: "matrix.invModelView",
                type: e.j(4, 4)
            },
            S: {
                name: "matrix.normal",
                type: e.j(3, 3)
            }
        }, b = {
            La: {
                name: "material.ambient",
                type: e.h
            },
            Ma: {
                name: "material.diffuse",
                type: e.h
            },
            Ra: {
                name: "material.specular",
                type: e.h
            },
            Qa: {
                name: "material.shininess",
                type: e.h
            },
            Na: {
                name: "material.emission",
                type: e.h
            },
            qa: {
                name: "material.texture",
                type: e.G(F.I)
            }
        }, c = {
            name: "numLights",
            type: e.u
        }, g = [], f = 0; 16 > f; ) {
            var d = "lights[" + f++ + "]";
            g.push({
                position: {
                    name: d + ".position",
                    type: e.l(4)
                },
                color: {
                    name: d + ".color",
                    type: e.l(3)
                },
                S: {
                    name: d + ".normal",
                    type: e.l(3)
                }
            })
        }
        return {
            ya: a,
            va: b,
            wa: c,
            Ea: new tc(g,"lights",e.Ka),
            sb: {
                qb: {
                    name: "resInfo.res2",
                    type: e.u
                },
                rb: {
                    name: "resInfo.res3",
                    type: e.u
                },
                ib: {
                    name: "resInfo.invRes2",
                    type: e.h
                },
                jb: {
                    name: "resInfo.invRes3",
                    type: e.h
                },
                tb: {
                    name: "resInfo.shift2",
                    type: e.ra(2)
                },
                ub: {
                    name: "resInfo.shift3",
                    type: e.ra(3)
                },
                lb: {
                    name: "resInfo.mask2",
                    type: e.u
                },
                mb: {
                    name: "resInfo.mask3",
                    type: e.u
                }
            },
            xb: {
                name: "texVelVof",
                type: e.G(F.I)
            },
            wb: {
                name: "texDivPrsWgt",
                type: e.G(F.I)
            },
            vb: {
                name: "texAdvectTmp",
                type: e.G(F.I)
            },
            pb: {
                name: "radius",
                type: e.h
            },
            hb: {
                name: "center",
                type: e.l(3)
            },
            nb: {
                name: "pcenter",
                type: e.l(3)
            },
            ob: {
                name: "power",
                type: e.h
            },
            yb: {
                name: "ventilation",
                type: e.h
            },
            zb: {
                name: "vorticity",
                type: e.h
            },
            time: {
                name: "time",
                type: e.h
            }
        }
    }(this);
    Lc.attributes = {
        Ua: {
            name: "aPosition",
            type: G.l(4),
            location: 0
        },
        Sa: {
            name: "aColor",
            type: G.l(4),
            location: 1
        },
        Ta: {
            name: "aNormal",
            type: G.l(3),
            location: 2
        },
        Va: {
            name: "aTexCoord",
            type: G.l(2),
            location: 3
        }
    };
    Lc.ua = "#version 300 es\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nlayout(location = 0) in vec4 aPosition;\nlayout(location = 1) in vec4 aColor;\nlayout(location = 2) in vec3 aNormal;\nlayout(location = 3) in vec2 aTexCoord;\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nout vec4 vColor;\nout vec3 vPosition;\nout vec3 vNormal;\nout vec2 vTexCoord;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nvoid main() {\n\tgl_Position = matrix.transform * aPosition;\n\tvTexCoord = aTexCoord;\n}";
    Lc.sa = "#version 300 es\nprecision highp int;\nprecision highp float;\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nin vec4 vColor;\nin vec3 vPosition;\nin vec3 vNormal;\nin vec2 vTexCoord;\nlayout(location = 0) out vec4 oColor;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nivec3 uvToIndex3D(Struct3 resInfo, vec2 uv) {\n\tivec2 tmp = ivec2(uv * float(resInfo.res2)) << resInfo.shift2;\n\tint index = tmp.x | tmp.y;\n\treturn ivec3(index) >> resInfo.shift3 & resInfo.mask3;\n}\n\nvec2 transformUV(vec2 uv) {\n\tivec3 i3d = uvToIndex3D(resInfo, uv);\n\tint unitX = i3d.z / 8;\n\tint unitY = i3d.z % 8;\n\tivec2 i2d = ivec2(i3d.x + unitX * resInfo.res3, i3d.y + unitY * resInfo.res3);\n\treturn (vec2(i2d) + 0.5) * resInfo.invRes2;\n}\n\nvoid main() {\n\tvec2 uv = vTexCoord;\n\tuv *= 2.0;\n\tif (uv.y > 1.0) {\n\t\tif (uv.x < 1.0) {\n\t\t\toColor = vec4(texture(texVelVof, transformUV(fract(uv))).xyz * 0.5 + 0.5, 1);\n\t\t}\n\t\telse {\n\t\t\toColor = vec4(texture(texVelVof, transformUV(fract(uv))).www, 1);\n\t\t}\n\t}\n\telse {\n\t\tif (uv.x < 1.0) {\n\t\t\toColor = vec4(texture(texDivPrsWgt, transformUV(fract(uv))).xxx + 0.5, 1);\n\t\t}\n\t\telse {\n\t\t\toColor = vec4(texture(texDivPrsWgt, transformUV(fract(uv))).yyy + 0.5, 1);\n\t\t}\n\t}\n}";
    Lc.source = {
        gb: "#version 300 es\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nlayout(location = 0) in vec4 aPosition;\nlayout(location = 1) in vec4 aColor;\nlayout(location = 2) in vec3 aNormal;\nlayout(location = 3) in vec2 aTexCoord;\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nout vec4 vColor;\nout vec3 vPosition;\nout vec3 vNormal;\nout vec2 vTexCoord;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nvoid main() {\n\tgl_Position = matrix.transform * aPosition;\n\tvTexCoord = aTexCoord;\n}",
        cb: "#version 300 es\nprecision highp int;\nprecision highp float;\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\nstruct Struct3 {\n\tint res2;\n\tint res3;\n\tfloat invRes2;\n\tfloat invRes3;\n\tivec2 shift2;\n\tivec3 shift3;\n\tint mask2;\n\tint mask3;\n};\n\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nin vec4 vColor;\nin vec3 vPosition;\nin vec3 vNormal;\nin vec2 vTexCoord;\nlayout(location = 0) out vec4 oColor;\nuniform Struct3 resInfo;\nuniform sampler2D texVelVof;\nuniform sampler2D texDivPrsWgt;\nuniform sampler2D texAdvectTmp;\nuniform float radius;\nuniform vec3 center;\nuniform vec3 pcenter;\nuniform float power;\nuniform float ventilation;\nuniform float vorticity;\nuniform float time;\nivec3 i3d;\nvec3 p;\n\nivec3 uvToIndex3D(Struct3 resInfo, vec2 uv) {\n\tivec2 tmp = ivec2(uv * float(resInfo.res2)) << resInfo.shift2;\n\tint index = tmp.x | tmp.y;\n\treturn ivec3(index) >> resInfo.shift3 & resInfo.mask3;\n}\n\nvec2 transformUV(vec2 uv) {\n\tivec3 i3d = uvToIndex3D(resInfo, uv);\n\tint unitX = i3d.z / 8;\n\tint unitY = i3d.z % 8;\n\tivec2 i2d = ivec2(i3d.x + unitX * resInfo.res3, i3d.y + unitY * resInfo.res3);\n\treturn (vec2(i2d) + 0.5) * resInfo.invRes2;\n}\n\nvoid main() {\n\tvec2 uv = vTexCoord;\n\tuv *= 2.0;\n\tif (uv.y > 1.0) {\n\t\tif (uv.x < 1.0) {\n\t\t\toColor = vec4(texture(texVelVof, transformUV(fract(uv))).xyz * 0.5 + 0.5, 1);\n\t\t}\n\t\telse {\n\t\t\toColor = vec4(texture(texVelVof, transformUV(fract(uv))).www, 1);\n\t\t}\n\t}\n\telse {\n\t\tif (uv.x < 1.0) {\n\t\t\toColor = vec4(texture(texDivPrsWgt, transformUV(fract(uv))).xxx + 0.5, 1);\n\t\t}\n\t\telse {\n\t\t\toColor = vec4(texture(texDivPrsWgt, transformUV(fract(uv))).yyy + 0.5, 1);\n\t\t}\n\t}\n}"
    };
    Hc.Kc = !1;
    O.xa = !1;
    sc.id = 0;
    ze.Ca = {
        Te: 16
    };
    Vb.Ca = {};
    Vb.ta = function() {
        for (var a = {
            transform: {
                name: "matrix.transform",
                type: e.j(4, 4)
            },
            model: {
                name: "matrix.model",
                type: e.j(4, 4)
            },
            view: {
                name: "matrix.view",
                type: e.j(4, 4)
            },
            ab: {
                name: "matrix.projection",
                type: e.j(4, 4)
            },
            Ya: {
                name: "matrix.invProjection",
                type: e.j(4, 4)
            },
            Za: {
                name: "matrix.modelView",
                type: e.j(4, 4)
            },
            Xa: {
                name: "matrix.invModelView",
                type: e.j(4, 4)
            },
            S: {
                name: "matrix.normal",
                type: e.j(3, 3)
            }
        }, b = {
            La: {
                name: "material.ambient",
                type: e.h
            },
            Ma: {
                name: "material.diffuse",
                type: e.h
            },
            Ra: {
                name: "material.specular",
                type: e.h
            },
            Qa: {
                name: "material.shininess",
                type: e.h
            },
            Na: {
                name: "material.emission",
                type: e.h
            },
            qa: {
                name: "material.texture",
                type: e.G(F.I)
            }
        }, c = {
            name: "numLights",
            type: e.u
        }, g = [], f = 0; 16 > f; ) {
            var d = "lights[" + f++ + "]";
            g.push({
                position: {
                    name: d + ".position",
                    type: e.l(4)
                },
                color: {
                    name: d + ".color",
                    type: e.l(3)
                },
                S: {
                    name: d + ".normal",
                    type: e.l(3)
                }
            })
        }
        return {
            ya: a,
            va: b,
            wa: c,
            Ea: new tc(g,"lights",e.Ka)
        }
    }(this);
    Vb.attributes = {
        Ua: {
            name: "aPosition",
            type: G.l(4),
            location: 0
        },
        Sa: {
            name: "aColor",
            type: G.l(4),
            location: 1
        },
        Ta: {
            name: "aNormal",
            type: G.l(3),
            location: 2
        },
        Va: {
            name: "aTexCoord",
            type: G.l(2),
            location: 3
        }
    };
    Vb.ua = "#version 300 es\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\n\nlayout(location = 0) in vec4 aPosition;\nlayout(location = 1) in vec4 aColor;\nlayout(location = 2) in vec3 aNormal;\nlayout(location = 3) in vec2 aTexCoord;\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nout vec4 vColor;\nout vec3 vPosition;\nout vec3 vNormal;\nout vec2 vTexCoord;\n\nvoid main() {\n\tgl_Position = matrix.transform * aPosition;\n\tgl_PointSize = 1.0;\n\tvColor = aColor;\n\tvPosition = (matrix.modelView * aPosition).xyz;\n\tvNormal = matrix.normal * aNormal;\n\tvTexCoord = aTexCoord;\n}";
    Vb.sa = "#version 300 es\nprecision highp int;\nprecision highp float;\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\n\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nin vec4 vColor;\nin vec3 vPosition;\nin vec3 vNormal;\nin vec2 vTexCoord;\nlayout(location = 0) out vec4 oColor;\n\nvec4 computeBaseColor() {\n\treturn texture(material.texture, vTexCoord) * vColor;\n}\n\nvec3 safeNormalize(vec3 v) {\n\treturn dot(v, v) > 0.0 ? normalize(v) : vec3(0);\n}\n\nvec3 ambientLight(vec3 lightColor, vec3 color) {\n\treturn lightColor * color * material.ambient;\n}\n\nvec3 directionalLight(vec3 lightColor, vec3 lightDirection, vec3 eye, vec3 normal, vec3 color) {\n\tfloat ldot = max(-dot(lightDirection, normal), 0.0);\n\tvec3 res = lightColor * color * ldot * material.diffuse;\n\tif (dot(normal, eye) < 0.0) {\n\t\tvec3 reflEye = eye - 2.0 * normal * dot(eye, normal);\n\t\tfloat rdot = max(-dot(reflEye, lightDirection), 0.0);\n\t\tres += lightColor * pow(rdot, material.shininess) * material.specular;\n\t}\n\treturn res;\n}\n\nvoid main() {\n\tvec4 baseColor = computeBaseColor();\n\tif (baseColor.w == 0.0) {\n\t\tdiscard;\n\t}\n\tif (numLights == 0) {\n\t\toColor = baseColor;\n\t\treturn;\n\t}\n\tvec3 eye = safeNormalize(vPosition);\n\tvec3 n = safeNormalize(vNormal);\n\tif (!gl_FrontFacing) {\n\t\tn = -n;\n\t}\n\tvec3 color = baseColor.xyz;\n\tvec3 total = color * material.emission;\n\tfor (int i = 0; i < numLights; i++) {\n\t\tStruct2 light = lights[i];\n\t\tvec4 lp = light.position;\n\t\tvec3 lc = light.color;\n\t\tvec3 ln = light.normal;\n\t\tbool amb = lp.w == 0.0 && dot(ln, ln) == 0.0;\n\t\tif (amb) {\n\t\t\ttotal += ambientLight(lc, color);\n\t\t}\n\t\telse {\n\t\t\tbool dir = lp.w == 0.0;\n\t\t\tif (!dir) {\n\t\t\t\tln = safeNormalize(vPosition - lp.xyz);\n\t\t\t}\n\t\t\tfloat ldot = max(-dot(ln, n), 0.0);\n\t\t\ttotal += directionalLight(lc, ln, eye, n, color);\n\t\t}\n\t}\n\toColor = vec4(total, baseColor.w);\n}";
    Vb.source = {
        gb: "#version 300 es\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\n\nlayout(location = 0) in vec4 aPosition;\nlayout(location = 1) in vec4 aColor;\nlayout(location = 2) in vec3 aNormal;\nlayout(location = 3) in vec2 aTexCoord;\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nout vec4 vColor;\nout vec3 vPosition;\nout vec3 vNormal;\nout vec2 vTexCoord;\n\nvoid main() {\n\tgl_Position = matrix.transform * aPosition;\n\tgl_PointSize = 1.0;\n\tvColor = aColor;\n\tvPosition = (matrix.modelView * aPosition).xyz;\n\tvNormal = matrix.normal * aNormal;\n\tvTexCoord = aTexCoord;\n}",
        cb: "#version 300 es\nprecision highp int;\nprecision highp float;\nprecision highp sampler2D;\nprecision highp sampler3D;\nprecision highp samplerCube;\nprecision highp samplerCubeShadow;\nprecision highp sampler2DShadow;\nprecision highp sampler2DArray;\nprecision highp sampler2DArrayShadow;\nprecision highp isampler2D;\nprecision highp isampler3D;\nprecision highp isamplerCube;\nprecision highp isampler2DArray;\nprecision highp usampler2D;\nprecision highp usampler3D;\nprecision highp usamplerCube;\nprecision highp usampler2DArray;\n\nstruct Struct0 {\n\tmat4 transform;\n\tmat4 model;\n\tmat4 view;\n\tmat4 projection;\n\tmat4 invProjection;\n\tmat4 modelView;\n\tmat4 invModelView;\n\tmat3 normal;\n};\nstruct Struct1 {\n\tfloat ambient;\n\tfloat diffuse;\n\tfloat specular;\n\tfloat shininess;\n\tfloat emission;\n\tsampler2D texture;\n};\nstruct Struct2 {\n\tvec4 position;\n\tvec3 color;\n\tvec3 normal;\n};\n\nuniform Struct0 matrix;\nuniform Struct1 material;\nuniform int numLights;\nuniform Struct2 lights[16];\nin vec4 vColor;\nin vec3 vPosition;\nin vec3 vNormal;\nin vec2 vTexCoord;\nlayout(location = 0) out vec4 oColor;\n\nvec4 computeBaseColor() {\n\treturn texture(material.texture, vTexCoord) * vColor;\n}\n\nvec3 safeNormalize(vec3 v) {\n\treturn dot(v, v) > 0.0 ? normalize(v) : vec3(0);\n}\n\nvec3 ambientLight(vec3 lightColor, vec3 color) {\n\treturn lightColor * color * material.ambient;\n}\n\nvec3 directionalLight(vec3 lightColor, vec3 lightDirection, vec3 eye, vec3 normal, vec3 color) {\n\tfloat ldot = max(-dot(lightDirection, normal), 0.0);\n\tvec3 res = lightColor * color * ldot * material.diffuse;\n\tif (dot(normal, eye) < 0.0) {\n\t\tvec3 reflEye = eye - 2.0 * normal * dot(eye, normal);\n\t\tfloat rdot = max(-dot(reflEye, lightDirection), 0.0);\n\t\tres += lightColor * pow(rdot, material.shininess) * material.specular;\n\t}\n\treturn res;\n}\n\nvoid main() {\n\tvec4 baseColor = computeBaseColor();\n\tif (baseColor.w == 0.0) {\n\t\tdiscard;\n\t}\n\tif (numLights == 0) {\n\t\toColor = baseColor;\n\t\treturn;\n\t}\n\tvec3 eye = safeNormalize(vPosition);\n\tvec3 n = safeNormalize(vNormal);\n\tif (!gl_FrontFacing) {\n\t\tn = -n;\n\t}\n\tvec3 color = baseColor.xyz;\n\tvec3 total = color * material.emission;\n\tfor (int i = 0; i < numLights; i++) {\n\t\tStruct2 light = lights[i];\n\t\tvec4 lp = light.position;\n\t\tvec3 lc = light.color;\n\t\tvec3 ln = light.normal;\n\t\tbool amb = lp.w == 0.0 && dot(ln, ln) == 0.0;\n\t\tif (amb) {\n\t\t\ttotal += ambientLight(lc, color);\n\t\t}\n\t\telse {\n\t\t\tbool dir = lp.w == 0.0;\n\t\t\tif (!dir) {\n\t\t\t\tln = safeNormalize(vPosition - lp.xyz);\n\t\t\t}\n\t\t\tfloat ldot = max(-dot(ln, n), 0.0);\n\t\t\ttotal += directionalLight(lc, ln, eye, n, color);\n\t\t}\n\t}\n\toColor = vec4(total, baseColor.w);\n}"
    };
    C.Od = "F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12".split(" ");
    C.Ee = "Escape Digit0 Digit1 Digit2 Digit3 Digit4 Digit5 Digit6 Digit7 Digit8 Digit9 Minus Equal Backspace Tab KeyQ KeyW KeyE KeyR KeyT KeyY KeyU KeyI KeyO KeyP BracketLeft BracketRight Enter ControlLeft KeyA KeyS KeyD KeyF KeyG KeyH KeyJ KeyK KeyL Semicolon Quote Backquote ShiftLeft Backslash KeyZ KeyX KeyC KeyV KeyB KeyN KeyM Comma Period Slash ShiftRight NumpadMultiply AltLeft Space CapsLock F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 Numpad7 Numpad8 Numpad9 NumpadSubtract Numpad4 Numpad5 Numpad6 NumpadAdd Numpad1 Numpad2 Numpad3 Numpad0 NumpadDecimal IntlBackslash F11 F12 IntlYen NumpadEnter ControlRight NumpadDivide PrintScreen AltRight NumLock Home ArrowUp PageUp ArrowLeft ArrowRight End ArrowDown PageDown Insert Delete ContextMenu".split(" ");
    Wb.Lf()
}
)("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this);
