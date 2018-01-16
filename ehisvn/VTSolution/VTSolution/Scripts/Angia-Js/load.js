function initialize() {
    function t() {
        marker.setAnimation(null)
    }

    function e() {
        t();
        var e = document.createElement("div");
        e.innerHTML = "<div class='infobox'><img src='" + l + "' width='380px' height='132px' alt='Angia-investment' >" + s + "</div>";
        var i = {
                content: e,
                disableAutoPan: !0,
                maxWidth: 400,
                pixelOffset: new google.maps.Size(-150, -200),
                boxStyle: {
                    background: "transparent",
                    opacity: 1,
                    width: "400px"
                },
                closeBoxMargin: "10px 0 0 60px",
                closeBoxzIndex: "99999",
                closeBoxPosition: "absolute",
                closeBoxURL: o + "default/images/close_s.png",
                infoBoxClearance: new google.maps.Size(1, 1),
                isHidden: !1,
                pane: "floatPane",
                enableEventPropagation: !0
            },
            a = new InfoBox(i);
        a.open(g, marker)
    }
    var i = $(".httpserver").text(),
        o = $(".httptemplate").text(),
        s = $(".infobox-desc").text(),
        a = $(".infobox-location-lat").text(),
        n = $(".infobox-location-lng").text(),
        l = $(".infobox-image").text(),
        h = $(".infobox-googlemap").text(),
        c = [{
            stylers: [{
                hue: "#00619e"
            }, {
                saturation: -20
            }]
        }, {
            featureType: "road",
            elementType: "geometry",
            stylers: [{
                lightness: 100
            }, {
                visibility: "simplified"
            }]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [{
                visibility: "on"
            }]
        }],
        r = new google.maps.StyledMapType(c, {
            name: "Styled Map"
        }),
        d = {
            center: new google.maps.LatLng(a, n),
            zoom: 17,
            scrollwheel: !1,
            draggable: !0,
            draggingCursor: "move",
            noclear: !0,
            disableDefaultUI: !0,
            disableDoubleClickZoom: !0,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, "map_style"],
                position: google.maps.ControlPosition.TOP_RIGHT
            }
        },
        g = new google.maps.Map(document.getElementById("map-canvas"), d);
    g.mapTypes.set("map_style", r), g.setMapTypeId("map_style");
    var p = i + "pictures/logo-map.png";
    marker = new google.maps.Marker({
        map: g,
        draggable: !1,
        animation: google.maps.Animation.DROP,
        zIndex: -1,
        height: "170px",
        width: "150px",
        position: new google.maps.LatLng(a, n),
        icon: p
    });
    var w = h;
    $(window).width() > 1100 ? google.maps.event.addListener(marker, "click", e) : google.maps.event.addListener(marker, "click", function() {
        window.open(w, "_blank")
    }), ZoomControl(g)
}

function ZoomControl(t) {
    $(".zoom-control a").click(function() {
        var e = t.getZoom();
        switch ($(this).attr("id")) {
            case "zoom-in":
                t.setZoom(++e);
                break;
            case "zoom-out":
                t.setZoom(--e)
        }
        return !1
    })
}

function ResizeWindows() {
    var t, e, i = $(window).height() > $(window).width(),
        o = ($(window).height() <= $(window).width(), $(".bg img, .color-bg img")),
        s = $(window).width(),
        a = $(window).height(),
        n = a / s,
        l = 787 / 1440;
    if (n > l ? (e = a, t = a / l) : (e = s * l, t = s), s > 1100 ? ($(o).css({
            width: t,
            height: e,
            left: (s - t) / 2,
            top: "auto",
            bottom: 0
        }), $(".slide-full, .bg, .bg-page").css({
            width: s,
            height: a
        })) : 350 > s ? ($(o).css({
            width: s + 200,
            height: (s + 200) * l,
            left: -100,
            top: 0,
            bottom: "auto"
        }), $(".slide-full, .bg, .bg-page").css({
            width: s,
            height: (s + 200) * l
        })) : ($(o).css({
            width: s,
            height: s * l,
            left: 0,
            top: 0,
            bottom: "auto"
        }), $(".slide-full, .bg, .bg-page").css({
            width: s,
            height: s * l
        })), $(".album-load").length && ($(".album-center").css({
            height: a,
            width: s
        }), $(".album-pic-center").css({
            height: a,
            width: s
        })), $(".full").css({
            width: s,
            height: a
        }), $(".news-text p em").each(function(t, e) {
            1 == $(e).parent().contents().length ? $(e).parent().css({
                "margin-top": "-10px"
            }) : $(e).parent().css({
                "margin-top": "0px"
            })
        }), 1100 >= s) {
        News = 1, shownews = 0, Scroll = 1, Click = 1, $(".nav-click, .nav-option, .sub-click").css({
            display: "block",
            opacity: 1
        }), $(".navigation").css({
            width: 0
        }), $(".sub-nav, .sub-list").css({
            height: 0
        }), 890 > s ? $(".stage ul li .title-stage h6 p span").css({
            display: "none"
        }) : $(".stage ul li .title-stage h6 p span").css({
            display: "inline-block"
        }), $(".navigation, .sub-nav").addClass("animation"), $(".right").css({
            display: "none"
        }), $(".center, .bottom, .bg-page").addClass("clearfix"), $(".illustrator").removeClass("fadeinup"), $(".scroll-down").css({
            top: a - 66
        }), $(".top").css({
            top: 0
        }), $(".number-home, .news-home, .video-home").css({
            display: "block"
        }), $(".scrollA, .scrollB, .scrollC, .scrollD, .scrollE, .scrollF, .scrollG").getNiceScroll().remove(), $(".scrollA, .scrollB, .scrollC, .scrollD, .scrollE, .scrollF, .scrollG").css({
            height: "auto",
            width: "100%",
            position: "relative",
            overflow: "visible",
            left: "auto",
            top: "auto",
            "float": "left"
        }), $(".content-page").css({
            width: s,
            height: "auto"
        }), $(".box-content").css({
            height: "auto",
            width: s,
            left: "auto"
        }), $(".colum-box, .colum-box.project, .colum-box-news, .colum-box-news-details").css({
            height: "auto",
            width: s,
            "max-width": "inherit",
            top: 0,
            left: 0
        }), $(".about-box").css({
            height: "auto",
            width: s,
            "max-width": "inherit",
            top: "auto",
            left: "auto"
        }), $(".pro-detail-box, .pro-detail-box.news-full, .recruitment-box, .news-all").css({
            height: "auto",
            width: s,
            "max-width": "inherit",
            top: 0,
            left: 0,
            right: "auto"
        }), $(".box-house").css({
            height: "auto",
            left: 0
        }), $(".house-detail").css({
            width: s,
            height: "auto"
        }), $(".pic-library").css({
            height: "auto"
        }), $(".content-page").css({
            "min-height": a
        }), i ? ($(".house-pic").css({
            height: s - 100,
            'text-align': "center"
        }), $(".house-pic img").css({
            height: "auto",
            margin: "0",
            width: "90%"
        })) : ($(".house-pic").css({
            height: s / 2,
            'text-align': "center"
        }), $(".house-pic img").css({
            height: "auto",
            margin: "0",
            width: "70%",
            
        }));
        var h = $(".house-detail").length,
            c = $(".house-detail").width() + 100;
        $(".box-house").width(h * c), $(".link-page").length < 2 ? $(".list-icon").css({
            display: "none"
        }) : $(".list-icon").css({
            display: "block"
        });
        var r = $(".link-page").length,
            d = $(".link-page").height() + 2;
        $(".news-right").height(r * d), $(".news-list, .news-list li").css({
            height: "100%"
        }), $(".news-list ul").css({
            width: 250,
            left: 0,
            height: "auto"
        }), $(".list-close, .news-nav").css({
            display: "none"
        }), $(".news-right").css({
            left: -256,
            right: "auto",
            height: 340
        }), $(".news-right").addClass("animation"), $("#news-details-page").length || $("#search-page").length ? $(".news-right").css({
            top: 10
        }) : $(".news-right").css({
            top: 55
        }), $(".googlemap").css({
            width: s,
            height: 450
        }), $("#map-canvas").css({
            width: s,
            height: 450
        });
        var g = $(document).innerHeight();
        $(document).scrollTop();
        $(".overlay-dark, .overlay-album").css({
            width: s,
            height: g
        }), g > a + 100 ? $(".scroll-down").css({
            display: "block",
            opacity: 1
        }) : $(".scroll-down").css({
            display: "none",
            opacity: 0
        }), $(".overlay-menu, .overlay-dark").css({
            width: s,
            height: g
        }), $(".recruitment-box-pic").css({
            width: "100%",
            height: "auto"
        })
    } else if (s > 1100) {
        News = 0, Scroll = 0, Click = 0, $(".nav-click, .nav-option, .sub-click").css({
            display: "none",
            opacity: 0
        }), $(".navigation").css({
            width: "100%"
        }), $(".navigation, .sub-nav").removeClass("animation"), $(".scroll-down").css({
            display: "none",
            opacity: 0
        }), $(".right, .logo").css({
            display: "block"
        }), $(".slide-full, .bg, .bg-page").css({
            width: s,
            height: a
        }), $(".center, .bottom, .bg-page").removeClass("clearfix"), $(".top").css({
            top: 0
        }), $(".sub-nav, .sub-list").css({
            height: 390
        }), $(".number-home, .news-home, .video-home").css({
            display: "none"
        }), $(".overlay-dark, .overlay-album").css({
            width: s,
            height: a
        }), $(".scrollA, .scrollB, .scrollC, .scrollD, .scrollE, .scrollF, .scrollG").css({
            position: "absolute",
            overflow: "hidden",
            "float": "none"
        }), $(".overlay-menu").css({
            width: 0,
            height: 0
        }), $(".shadow").css({
            width: s,
            height: a - 100
        }), $(".content-page").css({
            height: a - 100,
            width: s
        }), $(".box-content").css({
            height: a - 100
        }), $(".colum-box").css({
            height: a - 100,
            width: s
        }), $(".scroll-list").getNiceScroll().remove(), $(".scroll-list").css({
            overflow: "hidden"
        }), $(".stage ul li .title-stage h6 p span").css({
            display: "inline-block"
        });
        var r = $(".link-page").length,
            d = $(".link-page").height() + 2,
            p = $(".news-list li").length,
            w = $(".news-list li").width() + 5;
        $(".news-list, .news-list li").height(r * d), $(".news-right").height(r * d) + 80, $(".news-list ul").width(p * w), $(".news-list ul").css({
            height: 335
        }), $(".news-list li").length <= 1 ? $(".news-nav").css({
            display: "none"
        }) : $(".news-nav").css({
            display: "block",
            top: $(".news-list").height() + 2
        }), $(".list-icon, .list-close").css({
            display: "none"
        }), $(".news-right").removeClass("animation"), $(".news-right").css({
            top: 50
        }), a > 700 ? ($(".pro-detail-box").css({
            height: a - 255,
            width: s - 270,
            "max-width": 1500,
            top: 40
        }), $(".scrollB").css({
            height: a - 255,
            width: "35%",
            left: "65%",
            top: 0
        }), $(".scrollC").css({
            height: a - 270,
            width: "100%",
            left: 0,
            top: 0
        })) : ($(".pro-detail-box").css({
            height: a - 220,
            width: s - 270,
            "max-width": 1500,
            top: 20
        }), $(".scrollB").css({
            height: a - 220,
            width: "35%",
            left: "65%",
            top: 0
        }), $(".scrollC").css({
            height: a - 210,
            width: "100%",
            left: 0,
            top: 0
        })), s > 1500 ? ($(".about-box").css({
            height: a - 180,
            width: s - 280,
            "max-width": 1050,
            top: 40,
            left: s / 2 - $(".about-box").width() / 2 + 25
        }), $(".bg-white").css({
            height: a,
            width: s - 280,
            "max-width": 1050,
            top: 0,
            left: s / 2 - $(".about-box").width() / 2 + 25
        })) : ($(".about-box").css({
            height: a - 140,
            width: s - 280,
            "max-width": 1050,
            top: 20,
            left: 280
        }), $(".bg-white").css({
            height: a,
            width: s - 280,
            "max-width": 1050,
            top: 0,
            left: 280
        })), $(".scrollA").css({
            height: a - 200,
            left: 0,
            top: 50
        }), 1600 >= s ? ($(".pro-detail-box").css({
            left: 270,
            right: "auto"
        }), $(".pro-detail-box.news-full").css({
            height: a - 180,
            width: s - 270,
            "max-width": 1500,
            top: 0,
            left: 270,
            right: "auto"
        }), $(".colum-box-news-details").css({
            height: a - 100,
            width: s - 200,
            "max-width": 1452,
            top: 0,
            left: 2
        }), $(".recruitment-box, .news-all").css({
            height: a - 100,
            width: s - 320,
            "max-width": 1200,
            top: 0,
            left: 270
        })) : ($(".pro-detail-box").css({
            left: "auto",
            right: 20
        }), $(".pro-detail-box.news-full").css({
            height: a - 180,
            width: s - 270,
            "max-width": 1500,
            top: 0,
            left: "auto",
            right: 20
        }), $(".colum-box-news-details").css({
            height: a - 100,
            width: s - 200,
            "max-width": 1452,
            top: 0,
            left: s / 2 - $(".colum-box-news-details").width() / 2
        }), $(".recruitment-box, .news-all").css({
            height: a - 100,
            width: s - 320,
            "max-width": 1200,
            top: 0,
            left: s / 2 - $(".recruitment-box, .news-all").width() / 2 + 50
        })), $(".box-house").css({
            height: $(".pro-detail-box").height(),
            left: 0
        }), $(".house-detail").css({
            height: $(".pro-detail-box").height(),
            width: $(".pro-detail-box").width()
        }), $(".house-pic").css({
            height: $(".pro-detail-box").height()
        }), $(".pic-library").css({
            height: $(".pro-detail-box").height() / 2 + 50
        }),
        $("#news-details-page").length ? ($(".colum-box-news").css({
            height: "100%",
            width: $(".colum-box-news-details").width() - 252,
            "max-width": 1202,
            right: 0,
            left: "auto"
        }), $(".news-right").css({
            right: "auto",
            left: 3
        })) : $("#project-details-page").length && ($(".colum-box-news").css({
            height: "100%",
            width: $(".pro-detail-box").width() - 252,
            "max-width": 1202,
            right: "auto",
            left: 0
        }), $(".news-right").css({
            right: "auto",
            left: $(".colum-box-news").width() + 2
        })), $(".scrollD").css({
            height: a - 180,
            width: $(".pro-detail-box").width() - 252,
            "max-width": 1202,
            left: 0,
            top: 0
        }), $(".scrollE").css({
            height: a - 100,
            width: $(".colum-box-news-details").width() - 252,
            left: 0,
            top: 0
        }), $(".scrollF").css({
            height: a - 100,
            width: $(".recruitment-box, .news-all").width(),
            left: 0,
            top: 0
        }), $(".scrollG").css({
            height: a - 180,
            width: $(".recruitment-box").width(),
            left: 0,
            top: 0
        }), a / s > .6 ? ($(".house-pic").css({
                "text-align":"center"
            }),$(".house-pic img").css({
            height: "80%",
            margin: "10% 0",
            width: "100%"
        }), $(".about-box.full-size").css({
            left: s / 2 - $(".about-box").width() / 2 - 100
        })) : ($(".house-pic").css({
            "text-align":"center"
        }),$(".house-pic img").css({
            height: "auto",
            margin: "auto",
            width: "auto"
        }));
        var m = $(".colum-box").length,
            u = $(".colum-box").width() + 100;
        $(".box-content").width(m * u);
        var h = $(".house-detail").length,
            c = $(".house-detail").width() + 100;
        $(".box-house").width(h * c), $("#search-page").length && ($(".news-right").css({
            display: "none"
        }), $(".colum-box-news-details").css({
            height: a - 100,
            width: s - 270,
            "max-width": 1050,
            top: 0,
            left: s / 2 - ($(".colum-box-news-details").width() / 2 - 70)
        }), $(".scrollE").css({
            height: a - 100,
            width: $(".colum-box-news-details").width(),
            left: 0,
            top: 0
        }));
        var f = $(".full img").width(),
            b = $(".full img").height();
        s > f ? $(".full img").css({
            "margin-left": s / 2 - f / 2
        }) : $(".full img").css({
            "margin-left": 0
        }), a > b ? $(".full img").css({
            "margin-top": a / 2 - b / 2
        }) : $(".full img").css({
            "margin-top": 0
        }), s / a > .6 && ($(o).css({
            width: t,
            height: e,
            left: (s - t) / 2,
            top: "auto",
            bottom: 0
        }), $(".slide-full, .bg, .bg-page").css({
            width: s,
            height: a
        }), $(".bg").css({
            overflow: "hidden"
        })), $(".googlemap").css({
            width: s,
            height: a
        }), $("#map-canvas").css({
            width: s + 600,
            height: a
        }), $(".recruitment-box-pic").css({
            width: "100%",
            height: "auto"
        })
    }
}

function Done() {
    DoneLoad = 1, ResizeWindows(), ContentLoad(), $(".center, .bottom").stop().animate({
        opacity: 1
    }, 500, "linear");
}
var isTouchDevice = "ontouchstart" in window || "onmsgesturechange" in window,
    isDesktop = 0 == $(window).width() || isTouchDevice ? !1 : !0,
    isTouchIE = -1 != navigator.userAgent.toLowerCase().indexOf("msie") && navigator.msMaxTouchPoints > 0,
    isIE11 = !!window.MSStream,
    isiPad = -1 != navigator.userAgent.indexOf("iPad"),
    isiPhone = -1 != navigator.userAgent.indexOf("iPhone"),
    isiPod = -1 != navigator.userAgent.indexOf("iPod"),
    isAndroid = -1 != navigator.userAgent.indexOf("Android"),
    isIE = -1 != navigator.userAgent.toLowerCase().indexOf("msie") && 0 != $(window).width(),
    isChrome = navigator.userAgent.toLowerCase().indexOf("chrome") > -1,
    isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1,
    isSafari = navigator.userAgent.toLowerCase().indexOf("safari") > -1,
    IEMobile = "-ms-user-select" in document.documentElement.style && navigator.userAgent.match(/IEMobile\/10\.0/),
    match = navigator.userAgent.match("MSIE (.)"),
    version = match && match.length > 1 ? match[1] : "unknown",
    DoneLoad = 0,
    View = 0,
    hostname = location.hostname;
$(document).ready(function() {
        $("body").queryLoader({
            barColor: "#a70e13",
            percentage: !0,
            barHeight: 2,
            completeAnimation: "grow",
            minimumTime: 100
        })
    }),
    function(t) {
        Array.prototype.indexOf || (Array.prototype.indexOf = function(t) {
            var e = this.length >>> 0,
                i = Number(arguments[1]) || 0;
            for (i = 0 > i ? Math.ceil(i) : Math.floor(i), 0 > i && (i += e); e > i; i++)
                if (i in this && this[i] === t) return i;
            return -1
        });
        var e = (t(window).height(), t(window).width(), new Array),
            i = 0,
            o = !1,
            s = "",
            a = "",
            n = "",
            l = "",
            h = 0,
            c = 0,
            r = {
                onComplete: function() {
                    t("#qLoverlay").remove(), t("body .item-load").remove()
                },
                backgroundColor: "#a19173",
                barColor: "#a19173",
                barHeight: 1,
                percentage: !0,
                deepSearch: !0,
                completeAnimation: "fade",
                minimumTime: 500,
                onLoadComplete: function() {
                    if ("grow" == r.completeAnimation) {
                        var e = 100,
                            i = new Date;
                        i.getTime() - c < r.minimumTime && (e = r.minimumTime - (i.getTime() - c)), t(".line").stop().animate({
                            width: "100%"
                        }, e, function() {
                            t("#qLoverlay").fadeOut(200, function() {
                                r.onComplete(), Touch()
                            })
                        })
                    }
                }
            },
            d = function() {
                var t = new Date;
                c = t.getTime(), g(), u()
            },
            g = function() {
                s = t('<div class="item-load"></div>').appendTo("body").css({
                    display: "none",
                    width: 0,
                    height: 0,
                    overflow: "hidden"
                });
                for (var i = 0; e.length > i; i++) t.ajax({
                    url: e[i],
                    type: "HEAD",
                    success: function() {
                        o || (h++, p(this.url))
                    }
                })
            },
            p = function(e) {
                t("<img />").attr("src", e).bind("load", function() {
                    w()
                }).appendTo(s)
            },
            w = function() {
                i++;
                var e = i / h * 100;
                t(n).stop().animate({
                    width: e + "%",
                    minWidth: e + "%"
                }, 200), 1 == r.percentage && t(l).text(Math.ceil(e) + "%"), i == h && m()
            },
            m = function() {
                t(s).remove(), r.onLoadComplete(), o = !0
            },
            u = function() {
                a = t('<div id="qLoverlay"></div>').css({
                    width: "100%",
                    height: "3px",
                    position: "absolute",
                    zIndex: 1500,
                    top: 0,
                    left: 0
                }).appendTo("body"), n = t('<div id="qLbar"></div>').css({
                    height: r.barHeight + "px",
                    backgroundColor: r.barColor,
                    width: "0%",
                    position: "absolute",
                    top: "0px"
                }).appendTo(a), 1 == r.percentage && (l = t('<div id="qLpercentage"></div>').text("0%").css({
                    height: "120px",
                    width: "120px",
                    position: "absolute",
                    fontSize: "0px",
                    top: "50%",
                    left: "50%",
                    marginTop: "60px",
                    textAlign: "center",
                    marginLeft: "-60px",
                    color: "#fff"
                }).appendTo(a))
            },
            $ = function(i) {
                var o = "";
                if ("none" != t(i).css("background-image")) var o = t(i).css("background-image");
                else if ("undefined" != typeof t(i).attr("src") && "img" == i.nodeName.toLowerCase()) var o = t(i).attr("src");
                if (-1 == o.indexOf("gradient")) {
                    o = o.replace(/url\(\"/g, ""), o = o.replace(/url\(/g, ""), o = o.replace(/\"\)/g, ""), o = o.replace(/\)/g, "");
                    for (var s = o.split(", "), a = 0; a < s.length; a++)
                        if (s[a].length > 0 && -1 == e.indexOf(s[a])) {
                            var n = "";
                            e.push(s[a] + n)
                        }
                }
            };
        t.fn.queryLoader = function(e) {
            return e && t.extend(r, e), this.each(function() {
                $(this), 1 == r.deepSearch && t(this).find("*:not(script)").each(function() {
                    $(this)
                })
            }), d(), this
        }
    }(jQuery);