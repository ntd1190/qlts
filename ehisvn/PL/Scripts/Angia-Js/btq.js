function NavClick(e, i, t) {
    $(".sub-nav li a, .nav li a, .overlay-menu").click(function () {
        $(window).width() <= 1100 && (e = 0, i = 0, t = 0, $(".navigation").css({
            width: 0
        }), $(".sub-nav, .sub-list").css({
            height: 0
        }), $(".right").hide(), $(".nav-click, .nav-option, .sub-click").removeClass("active"), $(".overlay-menu").css({
            display: "none"
        }))
    }), $(".nav-click").bind("click", function () {
        return 1 == i ? ($(".right").hide(), i = 0, $(".nav-option").removeClass("active")) : 1 == t && ($(".sub-nav, .sub-list").css({
            height: 0
        }), t = 0, $(".sub-click").removeClass("active")), 1 == e ? (e = 0, $(".navigation").css({
            width: 0
        }), $(".nav-click").removeClass("active"), $(".overlay-menu").css({
            display: "none"
        })) : (e = 1, $(".navigation").css({
            width: 200
        }), $(".nav-click").addClass("active"), $(".overlay-menu").css({
            display: "block"
        })), !1
    }), $(".nav-option").bind("click", function () {
        return 1 == e ? ($(".navigation").css({
            width: 0
        }), e = 0, $(".nav-click").removeClass("active")) : 1 == t && ($(".sub-nav, .sub-list").css({
            height: 0
        }), t = 0, $(".sub-click").removeClass("active")), 1 == i ? (i = 0, $(".right").hide(), $(".nav-option").removeClass("active"), $(".overlay-menu").css({
            display: "none"
        })) : (i = 1, $(".right").show(), $(".nav-option").addClass("active"), $(".overlay-menu").css({
            display: "block"
        })), !1
    }), $(".sub-click").bind("click", function () {
        return 1 == e ? ($(".navigation").css({
            width: 0
        }), e = 0, $(".nav-click").removeClass("active")) : 1 == i && ($(".right").hide(), i = 0, $(".nav-option").removeClass("active")), 1 == t ? (t = 0, $(".sub-click").removeClass("active"), $(".sub-nav, .sub-list").css({
            height: 0
        }), $(".overlay-menu").css({
            display: "none"
        })) : (t = 1, $(".sub-click").addClass("active"), $(".sub-nav, .sub-list").css({
            height: 300
        }), $(".overlay-menu").css({
            display: "block"
        })), !1
    })
}

function changeUrl(e, i, t, l, n, a, s) {
    //if (void 0 !== window.history.pushState) {
    //    var r = document.URL;
    //    r != e && window.history.pushState({
    //        path: e,
    //        dataName: n,
    //        title: i,
    //        keyword: l,
    //        description: t,
    //        titleog: a,
    //        descriptionog: s
    //    }, "", e)
    //}
    //"" != i && ($("#hdtitle").html(i), $('meta[property="og:description"]').remove(), $("#hdtitle").after('<meta property="og:description" content="' + s + '">'), $('meta[property="og:title"]').remove(), $("#hdtitle").after('<meta property="og:title" content="' + a + '">'), $('meta[property="og:url"]').remove(), $("#hdtitle").after('<meta property="og:url" content="' + e + '">'), $("meta[name=keywords]").remove(), $("#hdtitle").after('<meta name="keywords" content="' + l + '">'), $("meta[name=description]").remove(), $("#hdtitle").after('<meta name="description" content="' + t + '">')), $("#changlanguage_redirect").val(e)
}

function execSearch() {
    var e = $("#qsearch").val(),
        i = $("#href_search").val(),
        t = $("#defaultvalue").val();
    if (e == t) return !1;
    if ("" != e) {
        var l = i + "?qsearch=" + encodeURIComponent(e);
        return window.location = l, !1
    }
}

function Search() {
    $(".search").bind("click", function () {
        1 == show ? ($(".search-form").css({
            width: 0
        }), $(".search").removeClass("active"), show = 0, execSearch()) : ($(".search-form").css({
            width: 220
        }), $(".search").addClass("active"), document.getElementById("search").reset(), show = 1)
    }), $("#qsearch").keydown(function (e) {
        13 == e.keyCode && execSearch()
    })
}

function NewsClick(e) {
    1 == News && ($(".list-icon").click(function () {
        return $(".news-right").css({
            left: 0,
            right: "auto"
        }), $(".list-close").css({
            display: "block"
        }), $(".list-icon").css({
            display: "none"
        }), e = 1, !1
    }), $(".list-close").click(function () {
        return $(".list-close").css({
            display: "none"
        }), $(".list-icon").css({
            display: "block"
        }), $(".news-right").css({
            left: -256,
            right: "auto"
        }), e = 0, !1
    }))
}

function NewsLoad(e) {
    $(".colum-box-news").append('<div class="loadicon" style="display:block"></div>'), $.ajax({
        url: e,
        cache: !1,
        success: function (e) {
            if ($(".news-tab").append(e), $(".news-tab .detail-news").length > 1 && $(".news-tab .detail-news").last().remove(), $(".news-tab").animate({
                opacity: 1
            }, 600, "linear", function () {
                    ResizeWindows(), $(window).width() > 1100 ? $(".scrollD").length ? setTimeout(ScrollNiceD, 100) : setTimeout(ScrollNiceE, 100) : (shownews = 0, NewsClick(shownews), $(".news-list li").length > 1 && setTimeout(ScrollList, 100))
            }), $(".loadicon").fadeOut(300, "linear", function () {
                    $(".loadicon").remove()
            }), $(window).width() > 1100)
                if (0 == $(".news-list li .link-page.current").length) $(".news-list li .link-page").first().addClass("current"), $(".news-nav li:first-child a").trigger("click");
                else {
                    var i = $(".news-list ul li").index($(".news-list ul li div.current").parent());
                    $(".news-nav li:nth-child(0" + [i + 1] + ") a").trigger("click")
                }
        }
    })
}

function LoadContent(e) {
    $(".recruitment-box").append('<div class="loadicon" style="display:block"></div>'), $.ajax({
        url: e,
        cache: !1,
        success: function (e) {
            $(".load-page").prepend(e), $(".sub-nav li:last-child().current a").css({
                "pointer-events": "auto",
                cursor: "pointer"
            }), $(".load-page").fadeIn(500, "linear", function () {
                setTimeout(ScrollNiceF, 100), $(".recruitment-download").fadeIn(300, "linear"), $(".loadicon").fadeOut(300, "linear", function () {
                    $(".loadicon").remove()
                })
            }), $(".back").click(function () {
                ScrollNiceHide(), $(".sub-nav li:last-child().current a").css({
                    "pointer-events": "none",
                    cursor: "default"
                }), $(".recruitment-download").fadeOut(300, "linear"), $(".load-page").fadeOut(500, "linear", function () {
                    $(".detail-recruitment").remove(), $(".content-recruitment-list").fadeIn(500, "linear", function () {
                        setTimeout(ScrollNiceF, 100)
                    })
                });
                var e = $(this).attr("data-href"),
                    i = $(this).attr("data-title"),
                    t = $(this).attr("data-keyword"),
                    l = $(this).attr("data-description");
                return changeUrl(e, i, l, t, "", "", ""), !1
            }), $(".sub-nav li:last-child().current a").click(function (e) {
                return $(".sub-nav li:last-child().current a").css({
                    "pointer-events": "none",
                    cursor: "default"
                }), e.preventDefault(), $(".back").trigger("click"), !1
            })
        }
    })
}


function VideoLoad(e) {
    var html = "<div class='close-video'></div><div class='video-wrap'><iframe width='100%' height='100%' src='" + e + "' frameborder='0' allowfullscreen=''></iframe></div>";
    $(".allvideo").append(html), $(".allvideo").css({
        width: "100%",
        display: "block"
    }), $(".overlay-video").fadeIn(500, "linear");
    var t = document.getElementById("angia-video"),
        l = $("#angia-video").length;
    $(".close-video").click(function () {
        $(".close-video").fadeOut(300, "linear"), $(".overlay-video").fadeOut(500, "linear", function () {
            $(".allvideo").css({
                width: 0,
                display: "none"
            });
            $(".allvideo").empty();
            $("html, body, .container").removeClass("no-scroll");
        })
    })
}
function AlbumLoad(i) {
    $.post("/ViewProduct/GetAlbum", { id: i }, function () {
    }).success(function (data, status) {
        $(".all-album").append(data),
        $(".album-load").fadeIn(800, "linear", function () {
            $(".loadicon").fadeOut(300, "linear", function () {
                $(".loadicon").remove();
            });
        }),
        $(".close-album").click(function () {
            return $(".all-album").fadeOut(500, "linear", function () {
                $(".album-load").remove();
            }), $(".overlay-album").animate({
                top: "0%"
            }, 600, "easeOutExpo", function () {
                $(".overlay-album").css({
                    display: "none"
                })
            }), $("html, body, .container").removeClass("no-scroll"), !1
        })
    });
}

function FadePic() {
    if ($(".slide-full").length) {
        var e = $(".slide-full").attr("data-time"),
            i = $(".bg").length;
        i > 1 ? $(".next-prev").fadeIn(500, "linear") : $(".next-prev").fadeOut(100, "linear"), i > 1 ? $(".slide-full").BTQSlider({
            autoPlay: e,
            singleItem: !0,
            transitionStyle: "fade",
            mouseDrag: !1,
            slideSpeed: 1e3,
            paginationSpeed: 1e3,
            afterAction: function () {
                this.$BTQItems.removeClass("active"), $(".bg .slogan").animate({
                    opacity: 0
                }, 200, "linear"), this.$BTQItems.eq(this.currentItem).addClass("active"), $(".active .bg").find(".slogan").stop().animate({
                    opacity: 1
                }, 500, "linear")
            }
        }) : $(".slide-full").BTQSlider({
            autoPlay: !1,
            singleItem: !0,
            mouseDrag: !1,
            slideSpeed: 1e3,
            paginationSpeed: 1e3,
            afterAction: function () {
                this.$BTQItems.removeClass("active"), $(".bg .slogan").animate({
                    opacity: 0
                }, 200, "linear"), this.$BTQItems.eq(this.currentItem).addClass("active"), $(".bg.active").find(".slogan").stop().animate({
                    opacity: 1
                }, 500, "linear")
            }
        }), $(".nextslide").click(function () {
            $(".slide-full").trigger("BTQ.next")
        }), $(".prevslide").click(function () {
            $(".slide-full").trigger("BTQ.prev")
        })
    }
    $(".bg-page").stop().animate({
        opacity: 1
    }, 600, "linear"), $(".home-content").delay(600).animate({
        opacity: 1
    }, 500, "linear"), $(".recruitment-box-pic").each(function (e, i) {
        var t = "fade";
        isIE && 9 == version && (t = !1), $(i).BTQSlider({
            autoPlay: 4e3,
            singleItem: !0,
            transitionStyle: t,
            navigation: !1,
            pagination: !0
        })
    })
}

function FocusText() {
    var e = "Họ Và Tên (*) HỌ VÀ TÊN (*) HỌ TÊN (*) Họ Tên (*)  Địa Chỉ (*) ĐỊA CHỈ (*) Điện Thoại (*) ĐIỆN THOẠI (*) Email (*) Yêu Cầu (*) YÊU CẦU (*) Request (*) REQUEST (*) Full Name (*) FULL NAME (*)  Address (*) ADDRESS (*) Phone (*) PHONE (*) EMAIL (*) User Name Password Công Ty Company Search... Tìm nhanh... Other Khác",
        i = "";
    $("input").focus(function () {
        i = $(this).val(), e.indexOf(i) >= 0 && $(this).val("")
    }), $("input").focusout(function () {
        "" == $(this).val() && $(this).val(i)
    });
    var t = "";
    $("textarea").focus(function () {
        t = $(this).val(), ("Ý Kiến (*)" == t || "Comments (*)" == t || "Nội Dung (*)" == t || "Content (*)" == t) && $(this).val("")
    }).focusout(function () {
        "" == $(this).val() && $(this).val(t)
    })
}

function ScrollNiceA() {
    $(window).width() <= 1100 ? ($(".scrollA").getNiceScroll().remove(), $(".scrollA").css({
        "overflow-x": "visible",
        "overflow-y": "visible"
    })) : ($(".select .scrollA").css({
        "overflow-x": "hidden",
        "overflow-y": "hidden"
    }), $(".select .scrollA").getNiceScroll().show(), $(".select .scrollA").niceScroll({
        touchbehavior: !0,
        horizrailenabled: !1,
        cursordragontouch: !0,
        grabcursorenabled: !1
    }), $(".select .scrollA").animate({
        scrollTop: "0px"
    }))
}

function ScrollNiceB() {
    $(window).width() <= 1100 ? ($(".scrollB").getNiceScroll().remove(), $(".scrollB").css({
        "overflow-x": "visible",
        "overflow-y": "visible"
    })) : ($(".scrollB").getNiceScroll().show(), $(".scrollB").niceScroll({
        touchbehavior: !0,
        horizrailenabled: !1,
        cursordragontouch: !0,
        grabcursorenabled: !1
    }), $(".scrollB").animate({
        scrollTop: "0px"
    }))
}

function ScrollNiceC() {
    $(window).width() <= 1100 ? ($(".scrollC").getNiceScroll().remove(), $(".scrollC").css({
        "overflow-x": "visible",
        "overflow-y": "visible"
    })) : ($(".scrollC").getNiceScroll().show(), $(".scrollC").niceScroll({
        touchbehavior: !0,
        horizrailenabled: !1,
        cursordragontouch: !0,
        grabcursorenabled: !1
    }), $(".scrollC").animate({
        scrollTop: "0px"
    }))
}

function ScrollNiceD() {
    $(window).width() <= 1100 ? ($(".scrollD").getNiceScroll().remove(), $(".scrollD").css({
        "overflow-x": "visible",
        "overflow-y": "visible"
    })) : ($(".scrollD").getNiceScroll().show(), $(".scrollD").niceScroll({
        touchbehavior: !0,
        horizrailenabled: !1,
        cursordragontouch: !0,
        grabcursorenabled: !1
    }), $(".scrollD").animate({
        scrollTop: "0px"
    }))
}

function ScrollNiceE() {
    $(window).width() <= 1100 ? ($(".scrollE").getNiceScroll().remove(), $(".scrollE").css({
        "overflow-x": "visible",
        "overflow-y": "visible"
    })) : ($(".scrollE").getNiceScroll().show(), $(".scrollE").niceScroll({
        touchbehavior: !0,
        horizrailenabled: !1,
        cursordragontouch: !0,
        grabcursorenabled: !1
    }), $(".scrollE").animate({
        scrollTop: "0px"
    }))
}

function ScrollNiceF() {
    if ($(window).width() <= 1100) {
        if ($(".scrollF").getNiceScroll().remove(), $(".scrollF").css({
                "overflow-x": "visible",
                "overflow-y": "visible"
        }), $(".detail-recruitment").length) {
            var e = $(".detail-recruitment").offset().top;
            $("html, body").stop().animate({
                scrollTop: e
            }, 600, "easeInOutExpo")
        }
    } else if ($(".scrollF").getNiceScroll().show(), $(".scrollF").niceScroll({
            touchbehavior: !0,
            horizrailenabled: !1,
            cursordragontouch: !0,
            grabcursorenabled: !1
    }), $(".detail-recruitment").length) {
        var e = $(".detail-recruitment").offset().top;
        $(".scrollF").animate({
            scrollTop: e - 90
        })
    } else $(".scrollF").animate({
        scrollTop: "0px"
    })
}

function ScrollNiceG() {
    $(window).width() <= 1100 ? ($(".scrollG").getNiceScroll().remove(), $(".scrollG").css({
        "overflow-x": "visible",
        "overflow-y": "visible"
    })) : ($(".scrollG").getNiceScroll().show(), $(".scrollG").niceScroll({
        touchbehavior: !0,
        horizrailenabled: !1,
        cursordragontouch: !0,
        grabcursorenabled: !1
    }), $(".scrollG").animate({
        scrollTop: "0px"
    }))
}

function ScrollList() {
    $(".scroll-list").css({
        "overflow-x": "hidden",
        "overflow-y": "auto",
        "-webkit-overflow-scrolling": "touch"
    })
}

function ScrollNiceHide() {
    $(".scrollA, .scrollB, .scrollC, .scrollD, .scrollE, .scrollF, .scrollG").getNiceScroll().remove()
}

function LinkPage() {
    $(".language li a, .nav li a, .more-detail, a.details, .go-back a, .go-back-top a, a.view-details:not(.player-video)").click(function (e) {
        e.preventDefault(), linkLocation = $(this).attr("href"), ScrollNiceHide(), $(".line").css({
            width: 0
        });
        var i = $(".bg-page, .overlay-menu"),
            t = $(".container");
        return $(i).animate({
            opacity: 0
        }, 300, "linear"), $(t).animate({
            opacity: 0
        }, 500, "linear", function () {
            window.location = linkLocation
        }), !1
    })
}
function ContentLoad() {
    function e(e) {
        if ("all" == e) {
            for ($(".news-box").css({
                display: "none"
            }), $(".news-slide").css({
                opacity: 1
            }), i = 0; i < timeouts.length; i++) clearTimeout(timeouts[i]);
            timeouts = [], $(".news-box").each(function (e) {
                var i = $(this);
                timeouts.push(setTimeout(function () {
                    $(i).css({
                        display: "inline-block"
                    })
                }, 200 * (e + 1))), timeouts.push(setTimeout(function () {
                    $(i).css({
                        opacity: 1
                    })
                }, 250 * (e + 1)))
            }), $(".loadicon").fadeOut(200, "linear", function () {
                $(".loadicon").remove()
            }), setTimeout(function () {
                ScrollNiceF()
            }, 800)
        } else {
            for ($(".news-box").css({
                display: "none"
            }), $(".news-slide").css({
                opacity: 1
            }), i = 0; i < timeouts.length; i++) clearTimeout(timeouts[i]);
            timeouts = [], $('.news-box[data-post= "' + e + '"]').each(function (e) {
                var i = $(this);
                timeouts.push(setTimeout(function () {
                    $(i).css({
                        display: "inline-block"
                    })
                }, 200 * (e + 1))), timeouts.push(setTimeout(function () {
                    $(i).css({
                        opacity: 1
                    })
                }, 250 * (e + 1)))
            }), $(".loadicon").fadeOut(200, "linear", function () {
                $(".loadicon").remove()
            }), setTimeout(function () {
                ScrollNiceF()
            }, 800)
        }
    }
    if (ResizeWindows(), LinkPage(), Search(), FocusText(), Animation(), FadePic(), Option(), $("#home-page").length) {
        //$(".nav li:nth-child(1)").addClass("current");
        var t = window.location.hash;
        t = t.slice(1), $(".popup-pics img").length > 0 && ($(".popup-pics").append('<div class="close-popup"><span class="hover"></span></div>'), $(".overlay-dark").fadeIn(500, "linear", function () {
            $(".popup-pics").fadeIn(500, "linear"), $("body").removeClass("first-time")
        }), $(".close-popup, .overlay-dark").click(function () {
            return $(".popup-pics, .overlay-dark").fadeOut(500, "linear", function () {
                $(".close-pics").remove()
            }), !1
        }))
    }
    $("#about-page").length && ($(".nav li:nth-child(2)").addClass("current"), $(window).width() > 1100 ? $(".sub-nav ul li.current").length ? $(".sub-nav ul li.current a").trigger("click") : $(".sub-nav li:first-child a").trigger("click") : ResizeWindows()), $("#projects-page").length && ($(".sub-nav li").length > 1 ? $(".next-prev-2").fadeIn(100, "linear") : $(".next-prev-2").fadeOut(100, "linear"), $(".project-box .img-top img").click(function () {
        $(this).parent().parent().find("a").trigger("click")
    }), $(".project-box .img-box img").click(function () {
        $(this).parent().parent().parent().find("a").trigger("click")
    }), $(window).width() > 1100 ? $(".sub-nav ul li.current").length ? $(".sub-nav ul li.current a").trigger("click") : $(".sub-nav li:first-child a").trigger("click") : ResizeWindows()), $("#project-details-page").length && ($(".nav li.current a").css({
        "pointer-events": "auto",
        cursor: "pointer"
    }), $(".slide-nav li").length > 1 ? $(".next-prev-3").fadeIn(100, "linear") : $(".next-prev-3").fadeOut(100, "linear"), $(".box-slide img, .box-pic img, .box-left img, .box-right img").click(function () {
        $(".project-contact .website").length && $(".project-contact .website a")[0].click()
    }), $(".slide-nav li a").click(function (e) {
        e.preventDefault();
        var i = $(".house-detail").length,
            t = $(".house-detail").width() + 100;
        $(".box-house").width(i * t), $(".slide-nav li").removeClass("current"), $(".house-detail").removeClass("active"), $(this).parent().addClass("current");
        var l = $(this).attr("data-target");
        detectBut();
        var n = $(".house-detail").offset().left,
            a = $('.box-house .house-detail[data-pos= "' + l + '"]').offset().left;
        return $(".box-house").stop().animate({
            left: n - a
        }, "slow", function () {
            $('.house-detail[data-pos= "' + l + '"]').addClass("active")
        }), !1
    }),
    //$(".nextslide").click(function () {
    //    $(".slide-full").trigger("BTQ.next")
    //}), $(".prevslide").click(function () {
    //    $(".slide-full").trigger("BTQ.prev")
    //}),
    $(".prev").click(function () {
        if ($(".slide-nav li.current").prev().find("a").length <= 0) {
            return $(".slide-nav li.current").parent().find("a").last().trigger("click");
        } else {
            return $(".slide-nav li.current").prev().find("a").trigger("click");
        }
    }),
    $(".next").click(function () {
        if ($(".slide-nav li.current").next().find("a").length <= 0) {
            return $(".slide-nav li.current").parent().find("a").first().trigger("click");
        } else {
            return $(".slide-nav li.current").next().find("a").trigger("click");
        }
    }),
    $(".slide-nav li:first-child a").trigger("click"),
    $(".news-list li .link-page a").click(function (e) {
        e.preventDefault(), $(".news-list li .link-page").removeClass("current"), $(this).parent().addClass("current");
        var i = ($(this).attr("data-details"), $(this).attr("href"));
        if ($(window).width() > 1100) {
            var t = $(this).attr("href"),
                l = $(this).attr("data-title"),
                n = $(this).attr("data-keyword"),
                a = $(this).attr("data-description"),
                s = $(this).attr("data-name");
            changeUrl(t, l, a, n, s, "", "")
        }
        return $(".news-tab").stop().animate({
            opacity: 0
        }, 600, "linear", function () {
            ScrollNiceHide(), $(".news-tab  .detail-news").remove(), NewsLoad(i)
        }), !1
    }), $(window).width() > 1100 ? ($(".news-list li .link-page.current").length ? $(".news-list li .link-page.current").find("a").trigger("click") : $(".news-list li:first-child .link-page:first-child").find("a").trigger("click"), $(".sub-nav ul li.current").length ? $(".sub-nav ul li.current a").trigger("click") : $(".sub-nav li:first-child a").trigger("click")) : ($(".news-list li:first-child .link-page").find("a").trigger("click"), ResizeWindows())), $("#news-page").length && ($(".news-img img").click(function () {
        $(this).parent().parent().find("a").trigger("click")
    }),
    $(".sub-list li a").click(function (i) {
        if (i.preventDefault(), $(window).width() <= 1100) $(".overlay-menu").trigger("click"), $("html, body").animate({
            scrollTop: 0
        }, "fast");
        else {
            var t = $(this).attr("href"),
                l = $(this).attr("data-title"),
                n = $(this).attr("data-keyword"),
                a = $(this).attr("data-description"),
                s = $(this).attr("data-name");
            changeUrl(t, l, a, n, s, "", ""), $(".scrollF").animate({
                scrollTop: "0px"
            })
        }
        $(".news-all").append('<div class="loadicon" style="display:block"></div>'), $(".scrollE").animate({
            scrollTop: "0px"
        }), $(".sub-list li").removeClass("current"), $(this).parent().addClass("current"), ScrollNiceHide(), $(".news-slide").stop().animate({
            opacity: 0
        }, 600, "linear", function () {
            $(".news-box").css({
                opacity: 0,
                display: "none"
            })
        });
        var r = $(this).attr("data-target");
        return setTimeout(function () {
            e(r)
        }, 1e3), !1
    }), $(".sub-list li").length > 0 ? $(".sub-list li.current").length ? $(".sub-list li.current a").trigger("click") : $(".sub-list li:first-child a").trigger("click") : $(".news-box").each(function (e) {
        var i = $(this);
        setTimeout(function () {
            $(i).css({
                opacity: 1
            })
        }, 50 * (e + 1))
    })),
    $("#news-details-page").length && ($(".nav li.current a").css({
        "pointer-events": "auto",
        cursor: "pointer"
    }),
    //$(".news-list li .link-page a").click(function (e) {
    //    e.preventDefault(), $(".news-list li .link-page").removeClass("current"), $(this).parent().addClass("current");
    //    var i = ($(this).attr("data-details"), $(this).attr("href")),
    //        i = $(this).attr("data-href"),
    //        t = $(this).attr("href"),
    //        l = $(this).attr("data-title"),
    //        n = $(this).attr("data-keyword"),
    //        a = $(this).attr("data-description"),
    //        s = $(this).attr("data-name");
    //    return changeUrl(t, l, a, n, s, "", ""), $(".news-tab").stop().animate({
    //        opacity: 0
    //    }, 600, "linear", function () {
    //        ScrollNiceHide(), $(".news-tab  .detail-news").remove(), NewsLoad(i)
    //    }), !1
    //}),
    $(".news-list li .link-page.current").length ? $(".news-list li .link-page.current").find("a").trigger("click") : $(".news-list li:first-child .link-page:first-child").find("a").trigger("click")), $("#search-page").length && $(".news-tab").animate({
        opacity: 1
    }, 600, "linear", function () {
        ResizeWindows(), $(window).width() > 1100 ? $(".scrollD").length ? setTimeout(ScrollNiceD, 100) : setTimeout(ScrollNiceE, 100) : (shownews = 0, NewsClick(shownews), $(".news-list li").length > 1 && setTimeout(ScrollList, 100))
    }),
    $("#recruitment-page").length && ($(".nav li.current a").css({
        "pointer-events": "auto",
        cursor: "pointer"
    }), $(".link-career a").click(function (e) {
        e.preventDefault(), ScrollNiceHide();
        var i = $(this).attr("href"),
            t = ($(this).attr("data-href"), $(this).attr("data-name"), $(this).attr("href")),
            l = $(this).attr("data-title"),
            n = $(this).attr("data-keyword"),
            a = $(this).attr("data-description"),
            s = $(this).attr("data-name");
        return changeUrl(t, l, a, n, s, "", ""), $(".content-recruitment-list").fadeOut(500, "linear", function () {
            LoadContent(i)
        }), !1
    }), $(".people-inner li").click(function (e) {
        e.preventDefault();
        var i = $(this).find(".people").innerHeight(),
            t = $(this).find(".people-details").innerHeight(),
            l = $(".people-inner li.st-open").index(),
            n = $(this).index();
        return $(".people-inner li").hasClass("st-open") && ($(".people-inner li.st-open .people-details").fadeOut(600), $(".people-inner li.st-open").css({
            height: 0
        }), $(".people-inner li.st-open").removeClass("st-open").animate({
            height: 0
        }, 600, "easeInOutExpo")), l != n && ($(this).find(".people-details").fadeIn(600), $(this).addClass("st-open").animate({
            height: i + t
        }, 600, "easeInOutExpo"), $(window).width() > 1100 ? setTimeout(function () {
            $(".scrollF").getNiceScroll().doScrollPos(0, $(".st-open").position().top + $(".recruitment-box-pic").innerHeight() + 70)
        }, 300) : setTimeout(function () {
            var e = $(".st-open").offset().top;
            $("html, body").stop().animate({
                scrollTop: e
            }, 600, "easeInOutExpo")
        }, 300)), !1
    }), $(".col-working li a").click(function (e) {
        e.preventDefault();
        var i = $(this).attr("data-open"),
            t = $(this).attr("data-id");
        return $(".sub-nav li a[data-open = " + i + "]").trigger("click"), setTimeout(function () {
            $(".people-inner li[data-id=" + t + "]").trigger("click")
        }, 800), !1
    }), $(".load-page, .scrollF, .colum-box").mouseenter(function () {
        CheckBut()
    }), $(window).width() > 1100 ? ($(".sub-nav ul li.current").length ? $(".sub-nav ul li.current a").trigger("click") : $(".sub-nav li:first-child a").trigger("click"), $(".link-career .recruitment-current.current").length && $(".link-career .recruitment-current.current").trigger("click")) : ResizeWindows()), $("#contact-page").length && initialize()
}

$(".colum-box.active").find(".illustrator").addClass("fadeinup"), $(".colum-box.active").find(".about-box").addClass("select"), $(".scrollA, .scrollB,  .scrollC,  .scrollD,  .scrollE, .scrollF").length && setTimeout(function () {
    ScrollNiceA(), ScrollNiceB(), ScrollNiceC(), ScrollNiceD(), ScrollNiceE(), ScrollNiceF()
}, 100);
function Animation() {
    $(".sub-nav li a").click(function (e) {
        if (e.preventDefault(), $(".sub-nav li a").css({
                "pointer-events": "auto",
            cursor: "pointer"
        }),
            $(window).width() > 1100) {
            var i = $(".colum-box").length,
                t = $(".colum-box").width() + 100;
            $(".box-content").width(i * t), $(".sub-nav li").removeClass("current"), $(".colum-box").removeClass("active"), $(".about-box").removeClass("select"), $(".illustrator").removeClass("fadeinup"), $(this).parent().addClass("current"), $(".sub-nav li.current a").css({
                "pointer-events": "none",
                cursor: "default"
            });
            var l = $(this).attr("data-open");
            $('.colum-box[id= "' + l + '"]').addClass("active");
            $(this).attr("href"), $(this).attr("data-name");
            if ($(".active .news-right .link-page.current").length > 0) {
                var n = ($(".active .news-right .link-page.current a").attr("data-details"), $(".active .news-right .link-page.current a").attr("href")),
                    a = $(".active .news-right .link-page.current a").attr("data-title"),
                    s = $(".active .news-right .link-page.current a").attr("data-keyword"),
                    r = $(".active .news-right .link-page.current a").attr("data-description"),
                    o = $(".active .news-right .link-page.current a").attr("data-name");
                changeUrl(n, a, r, s, o, "", "")
            } else {
                var n = ($(this).attr("data-name"), $(this).attr("href")),
                    a = $(this).attr("data-title"),
                    s = $(this).attr("data-keyword"),
                    r = $(this).attr("data-description"),
                    o = $(this).attr("data-name");
                changeUrl(n, a, r, s, o, "", "")
            }
            detectBut();
            var c = $(".box-content").offset().left,
                d = $('.box-content .colum-box[id= "' + l + '"]').offset().left;
            $(".box-content").stop().animate({
                left: c - d
            }, 600, "easeInOutExpo", function () {
                $(".colum-box.active").find(".illustrator").addClass("fadeinup"), $(".colum-box.active").find(".about-box").addClass("select"), $(".scrollA, .scrollB,  .scrollC,  .scrollD,  .scrollE, .scrollF").length && setTimeout(function () {
                    ScrollNiceA(), ScrollNiceB(), ScrollNiceC(), ScrollNiceD(), ScrollNiceE(), ScrollNiceF()
                }, 100)
            })
        } else {
            $(".sub-nav li").removeClass("current"), $(".colum-box").removeClass("active"), $(this).parent().addClass("current");
            var l = $(this).attr("data-open"),
                u = $('.box-content .colum-box[id= "' + l + '"]').offset().top;
            $("html, body").stop().animate({
                scrollTop: u
            }, 600, "easeInOutExpo", function () {
                $('.colum-box[id= "' + l + '"]').addClass("active")
            })
        }
        return !1
    }), $("#projects-page, #news-page").length && $(".container").mousewheel(function (e, i) {
        return $(window).width() > 1100 ? i > 0 ? ($(".sub-nav li.current").prev().find("a").trigger("click"), !1) : ($(".sub-nav li.current").next().find("a").trigger("click"), !1) : void 0
    }), $(".prevslide").click(function () {
        return $(".sub-nav li.current").prev().find("a").trigger("click"), !1
    }), $(".nextslide").click(function () {
        return $(".sub-nav li.current").next().find("a").trigger("click"), !1
    })
}

function Option() {
    $(".all-link li a").on("click, mouseenter", function (e) {
        e.preventDefault(), $(".news-home, .video-home, .number-home").fadeOut(50, "linear");
        var i = $(this).attr("data-name");
        return $(".all-link li").removeClass("current"), $(this).parent().addClass("current"), $('div[data-post= "' + i + '"]').fadeIn(600, "linear", function () { }), !1
    }), $(".news-home, .video-home, .number-home, .number-home .block").mouseleave(function () {
        $(window).width() > 1100 && ($(".news-home, .video-home, .number-home").fadeOut(300, "linear"), $(".all-link li").removeClass("current"))
    }), $(".comment, .hidden-footer").mouseenter(function () {
        $(window).width() > 1100 && ($(".news-home, .video-home, .number-home").fadeOut(300, "linear"), $(".all-link li").removeClass("current"))
    }), $("a.player, a.player-video").click(function (e) {
        e.preventDefault(), $(this).parent().addClass("viewvideo"), $("html, body, .container").addClass("no-scroll"), $(window).width() <= 1100 && $(".overlay-dark").css({
            overflow: "hidden",
            width: $(window).width()
        });
        var i = $(this).attr("data-href");
        return VideoLoad(i), !1
    }), $(".view-album").click(function (e) {
        e.preventDefault();
        var i = $(this).attr("data-href");
        return $("html, body, .container").addClass("no-scroll"), $(".all-album").append('<div class="loadicon" style="display:block"></div>'), $(".all-album").fadeIn(100, "linear"),
            $(".overlay-album").css({
                display: "block"
            }), $(".overlay-album").animate({
                top: "0%"
            }, 800, "easeOutExpo", function () {
                AlbumLoad(i)
            }), !1
    }), $(".news-nav li a").click(function () {
        var e = $(".news-list li").length,
            i = $(".news-list li").width() + 5;
        $(".news-list ul").width(e * i), $(".news-list ul").css({
            height: 335
        }), $("span.start").css({
            opacity: 0
        }), $(".news-nav li").removeClass("current"), $(".news-list li").removeClass("active"), $(this).parent().addClass("current");
        var t = $(this).attr("data-list");
        $('.news-list li[data-number= "' + t + '"]').addClass("active");
        var l = t,
            n = $(".news-list ul").offset().left,
            a = $('.news-list li[data-number= "' + t + '"]').offset().left;
        return detectBut(), $("span.start").text(l), 10 > e ? $("span.end").text("0" + e) : $("span.end").text(e), $(".news-list ul").stop().animate({
            left: n - a
        }, 300, "linear"), !1
    }), $(".prev-slide").click(function () {
        return $(".news-nav li.current").prev().find("a").trigger("click"), !1
    }), $(".next-slide").click(function () {
        return $(".news-nav li.current").next().find("a").trigger("click"), !1
    }),
    $(".zoom").click(function () {
        var e = $(this).parent().find("div[style*='left: 0px'].bee-img").find("img").attr("src");
        $(window).width() <= 1100 && ($("html, body").animate({
            scrollTop: 0
        }, "slow"), $("body").css({
            overflow: "hidden"
        }), View = 1, ResizeWindows()), $(".all-pics").css({
            display: "block"
        }), $(".all-pics").append('<div class="full"></div>'), $(".full").css({
            width: $(window).width(),
            height: $(window).height()
        }), $(".overlay-dark").fadeIn(300, "linear");
        //var e = '';
        //if ($(this).parent().find(".bee-img").css('left') === "0px") {
        //     e = $(this).parent().find("img").attr("src");
        //}

        return $("body").append('<div class="loadicon" style="display:block"></div>'), $("body").append('<div class="close-pics" style="display:block"></div>'), $(".all-pics").children().append('<img src ="' + e + '" alt="pic" />'), $(".full img").load(function () {
            $(".full").delay(300).fadeIn(400, "linear", function () {
                $(".all-pics").css({
                    width: "100%"
                });
                var e = $(".full img").width(),
                    i = $(".full img").height(),
                    t = $(window).height(),
                    l = $(window).width();
                $(window).width() > 1100 && (l > e ? $(".full img").css({
                    "margin-left": l / 2 - e / 2
                }) : $(".full img").css({
                    "margin-left": 0
                }), t > i ? $(".full img").css({
                    "margin-top": t / 2 - i / 2
                }) : $(".full img").css({
                    "margin-top": 0
                }), isTouchDevice && isChrome ? ($(".full").getNiceScroll().show(), $(".full").niceScroll({
                    touchbehavior: !1,
                    usetransition: !0,
                    hwacceleration: !0,
                    grabcursorenabled: !0
                }), $(".full").animate({
                    scrollTop: "0px"
                })) : ($(".full").getNiceScroll().show(), $(".full").niceScroll({
                    touchbehavior: !0,
                    usetransition: !0,
                    hwacceleration: !0,
                    grabcursorenabled: !0
                }), $(".full").animate({
                    scrollTop: "0px"
                }))), $(".full img").css({
                    opacity: 1
                }), $(".loadicon").remove()
            })
        }), $(".close-pics, .overlay-dark").click(function () {
            $(window).width() > 1100 ? $(".full").getNiceScroll().remove() : (View = 0, ResizeWindows(), $("body").css({
                "overflow-x": "hidden",
                "overflow-y": "auto"
            })), $(".full, .close-pics").fadeOut(300, "linear"), $(".overlay-dark").fadeOut(300, "linear", function () {
                $(".all-pics .full").remove(), $(".close-pics").remove(), $(".all-pics").css({
                    width: 0,
                    display: "none"
                })
            })
        }), !1
    })
}

function CheckBut() {
    var e = $("#file-field").val();
    "" == e ? $("a.send").fadeOut(300, "linear") : $("a.send").fadeIn(300, "linear")
}

function detectBut() {
    $(".sub-nav li:first-child").hasClass("current") ? $(".prevslide").addClass("disable") : $(".prevslide").removeClass("disable"), $(".sub-nav li:last-child").hasClass("current") ? $(".nextslide").addClass("disable") : $(".nextslide").removeClass("disable"),
    //  $(".slide-nav li:first-child").hasClass("current") ? $(".prev").addClass("disable") : $(".prev").removeClass("disable"), $(".slide-nav li:last-child").hasClass("current") ? $(".next").addClass("disable") : $(".next").removeClass("disable"),
    $(".news-nav li:first-child").hasClass("current") ? $(".prev-slide").addClass("disable") : $(".prev-slide").removeClass("disable"), $(".news-nav li:last-child").hasClass("current") ? $(".next-slide").addClass("disable") : $(".next-slide").removeClass("disable"), $("span.start").css({
        opacity: 1
    })
}

function Touch() {
    if ($(window).width() > 1100) {
        $(".content-page")
    } else {
        var e = $(".box-house");
        $(e).swipe({
            swipeLeft: function () {
                $(window).width() < 1100 && $(".slide-nav li.current").next().find("a").trigger("click")
            },
            swipeRight: function () {
                $(window).width() < 1100 && $(".slide-nav li.current").prev().find("a").trigger("click")
            },
            threshold: 0,
            fingers: "all"
        })
    }
    if ($(".box-slide").length && $(window).width() > 1100) {
        var i = $(".box-slide img").width(),
            t = $(".box-slide").width();
        i > t + 50 && $(".go-right, .go-left").css({
            display: "block"
        }), $(window).width() > 1100 && ($(".go-left").mouseover(function () {
            return $(".box-slide img").stop().animate({
                left: 0
            }, 3500, "easeOutExpo"), !1
        }), $(".go-right").mouseover(function () {
            return $(".box-slide img").stop().animate({
                left: t - i
            }, 3500, "easeOutExpo"), !1
        }), $(".go-right, .go-left").mouseleave(function () {
            return $(".box-slide img").stop(), !1
        }))
    }
}

function LocationHash() {
    var e = window.location.hash;
    if (e = e.slice(1), 0 == Details && $("#project-details-page").length) {
        Details = 1, $(".link-page a[data-details='" + e + "']").trigger("click");
        var i = $(".link-page.current").parent().parent().parent().parent().parent().parent().parent().attr("id");
        $(i).hasClass("active") || $(".sub-nav li a[data-open='" + i + "']").trigger("click")
    } else $(".link-page a[data-details='" + e + "']").trigger("click");
    $(".sub-nav li a[data-name='" + e + "']").trigger("click")
} ! function (e) {
    var i = {
        on: e.fn.on,
        bind: e.fn.bind
    };
    e.each(i, function (t) {
        e.fn[t] = function () {
            var e, l = [].slice.call(arguments),
                n = l.pop(),
                a = l.pop();
            return l.push(function () {
                var i = this,
                    t = arguments;
                clearTimeout(e), e = setTimeout(function () {
                    a.apply(i, [].slice.call(t))
                }, n)
            }), i[t].apply(this, isNaN(n) ? arguments : l)
        }
    })
}(jQuery);
var Click, News, shownews, show, Scroll, Menu = 0,
    Menu2 = 0,
    Menu3 = 0,
    Details = 0,
    timeouts = [];
$(document).ready(function () {
    $(document).bind("scroll", function () {
        var e = $(document).scrollTop(),
            i = $(".bg-page").height();
        $(window).width() <= 1100 && 1 == Scroll && (e > 50 ? $(".scroll-down").fadeOut(500, "linear") : $(".scroll-down").fadeIn(500, "linear"), e > i ? ($(".logo").css({
            display: "none"
        }), $(".nav-click, .sub-click, .nav-option").css({
            opacity: .5
        }), $("#project-details-page").length || $(".list-icon, .news-right").addClass("fix")) : ($(".logo").css({
            display: "block"
        }), $(".nav-click, .sub-click, .nav-option").css({
            opacity: 1
        }), $("#project-details-page").length || $(".list-icon, .news-right").removeClass("fix")), $(".colum-box").each(function () {
            var t = $(this).offset().top - i,
                l = t + $(this).outerHeight();
            e >= t && l >= e && ($(".sub-nav li").removeClass("current"), $(".colum-box").removeClass("active"), $(this).addClass("active"), $(".sub-nav li").find('a[data-open="' + $(this).attr("id") + '"]').parent().addClass("current"))
        }))
    }), $(".go-top").click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, "fast")
    }),
    $(window).width() <= 1100 && ($("html, body").animate({
        scrollTop: 0
    }, "fast"),
    NavClick(Menu, Menu2, Menu3)),
    $("#browser-hide").length && document.getElementById("upload").reset(), $("#browser-hide").mouseenter(function () {
        return $(this).parent().find(".browser-button").css({
            opacity: .5
        }), !1
    }), $("#browser-hide").mouseleave(function () {
        return $(this).parent().find(".browser-button").css({
            opacity: 1
        }), !1
    }), $("a.send").click(function () {
        document.getElementById("upload").reset()
    }), Done()
}), $(window).resize(function () {
    ScrollNiceHide(), ResizeWindows(), $(".box-slide").length && $(".box-slide img").css({
        left: 0
    }), $(".overlay-menu").css({
        display: "none"
    }), $(".nav-option, .nav-click, .sub-click").removeClass("active"), $(".go-top").css({
        display: "none"
    }), $(".bottom-left a").removeClass("current"), 1 == shownews ? $(".list-close").trigger("click") : NewsClick()
}), $(window).on("resize", function () {
    if ($(window).width() > 1100) {
        if (Open = 1, $("#about-page, #projects-page,  #project-details-page, #news-page, #recruitment-page").length)
            if ($(".colum-box, .box-slide").removeClass("active"), $(".about-box").removeClass("select"), $(".sub-nav li").hasClass("current") ? $(".sub-nav li.current a").trigger("click") : $(".sub-nav li:first-child a").trigger("click"),
                // $(".slide-nav li").hasClass("current") ? $(".slide-nav li.current a").trigger("click") : $(".slide-nav li:first-child a").trigger("click"),
                0 == $(".news-list li .link-page.current").length) $(".news-list li .link-page").first().addClass("current"), $(".news-nav li:first-child a").trigger("click");
            else {
                var e = $(".news-list ul li").index($(".news-list ul li div.current").parent());
                $(".news-nav li:nth-child(0" + [e + 1] + ") a").trigger("click")
            }
        if ($("#news-details-page").length)
            if (0 == $(".news-list li .link-page.current").length) $(".news-list li .link-page").first().addClass("current"), $(".news-nav li:first-child a").trigger("click");
            else {
                var e = $(".news-list ul li").index($(".news-list ul li div.current").parent());
                $(".news-nav li:nth-child(0" + [e + 1] + ") a").trigger("click")
            }
        $(".scrollA, .scrollB,  .scrollC,  .scrollD,  .scrollE,  .scrollF,  .scrollG").length && (ScrollNiceA(), ScrollNiceB(), ScrollNiceC(), ScrollNiceD(), ScrollNiceE(), ScrollNiceF(), ScrollNiceG()), ResizeWindows()
    } else $(".sub-nav li, .slide-nav li").removeClass("current"), $(".slide-nav li:first-child").addClass("current"), DoneLoad = 1, Open = 0, NavClick(Menu, Menu2, Menu3), ResizeWindows(), 0 == $(".news-list li .link-page.current").length && $(".news-list li .link-page").first().find("a").trigger("click"), $(".news-list li").length > 1 && setTimeout(ScrollList, 100);
    $("#contact-page").length && initialize()
}, 150), $(window).bind("popstate", function (e) {
    e.preventDefault(), LinkPage();
    var i = $(".httpserver").text();
    if (null !== e.originalEvent.state) {
        ScrollNiceHide();
        var t = e.originalEvent.state.path,
            l = e.originalEvent.state.dataName,
            n = e.originalEvent.state.title,
            a = e.originalEvent.state.description,
            s = e.originalEvent.state.keyword,
            r = document.URL;
        changeUrl(t, n, a, s, l, "", "");
        var o = t.replace(i, ""),
            c = o.split("/");
        $("#about-page").length && $(".sub-nav li a").each(function (e, i) {
            $(i).attr("href") == t && $(i).trigger("click")
        }), $("#recruitment-page").length && ("" != c[2] && void 0 != c[2] ? $(".sub-nav li a").each(function (e, l) {
            $(l).attr("href") == i + c[0] + "/" + c[1] + ".html" && $(l).trigger("click"), $(".recruitment-current").each(function (e, i) {
                $(i).attr("href") == t && $(i).trigger("click")
            })
        }) : "" != c[1] && void 0 != c[1] && ($(".detail-recruitment").length && $(".back").trigger("click"), $(".sub-nav li a").each(function (e, i) {
            $(i).attr("href") == t && $(i).trigger("click")
        }))), $("#projects-page").length && $(".sub-nav li a").each(function (e, i) {
            $(i).attr("href") == t && $(i).trigger("click")
        }), $("#project-details-page").length && ("" != c[3] && void 0 != c[3] ? $(".sub-nav li a").each(function (e, l) {
            $(l).attr("href") == i + c[0] + "/" + c[1] + "/" + c[2] + ".html" && $(l).trigger("click"), $(".link-page a").each(function (e, i) {
                $(i).attr("href") == t && $(i).trigger("click")
            })
        }) : "" != c[2] && void 0 != c[2] && $(".sub-nav li a").each(function (e, i) {
            $(i).attr("href") == t && $(i).trigger("click")
        })), $("#news-page").length && $(".sub-list li a").each(function (e, i) {
            $(i).attr("href") == t && $(i).trigger("click")
        }), $("#news-details-page").length && $(".link-page a").each(function (e, i) {
            $(i).attr("href") == t && $(i).trigger("click")
        })
    } else {
        var r = document.URL;
        $("#news-details-page").length && $(".link-page a").each(function (e, i) {
            $(i).attr("href") == r && $(i).trigger("click")
        })
    }
}), window.onorientationchange = ResizeWindows;