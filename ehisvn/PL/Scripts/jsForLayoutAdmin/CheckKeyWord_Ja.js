$(document).ready(function () {
    function showhidetagEn() {
        if ($("#checktext_Ja").val() !== "") {
            $("#Article_Ja").show();
            $("#Pagetitle_Ja").show();
            $("#Contents_Ja").show();
            $("#Metades_Ja").show();
        } else {
            $("#Article_Ja").hide();
            $("#Pagetitle_Ja").hide();
            $("#Contents_Ja").hide();
            $("#Metades_Ja").hide();
        }
    }

    showhidetagEn();

    function loadwarningEn(id, lengthmeta, idaddhtml) {
        var html = "";
        if ($("#" + id).val() !== "") {
            $("#" + idaddhtml).children().remove();
            lengthmeta = lengthmeta - $("#" + id).val().trim().length;
            if (lengthmeta > 0) {
                html = '<a style="color:#0094ff">';
            } else {
                html = '<a style="color:#ff0000">';
            }
            html += '<b>' + lengthmeta + '</b></a>';
            $("#" + idaddhtml).append(html);
        } else {
            html = '<a style="color:#0094ff">';
            $("#" + idaddhtml).children().remove();
            html += '<b>' + lengthmeta + '</b></a>';
            $("#" + idaddhtml).append(html);
        }
    }

    loadwarningEn("input_MetaDescription_Ja", 160, "Metades_Janote");
    loadwarningEn("input_MetaTitle_Ja", 70, "metatitlenote");


    $("#input_MetaDescription_Ja").keyup(function () {
        loadwarningEn("input_MetaDescription_Ja", 160, "Metades_Janote");
    });

    $("#input_MetaTitle_Ja").keyup(function () {
        loadwarningEn("input_MetaTitle_Ja", 70, "metatitlenote");
    });

    function decodeHtmlEntities(str) {
        var element = document.createElement('div');
        if (str && typeof str === 'string') {
            // strip script/html tags
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = '';
        }

        return str;
    }

    function splitstring(sstring) {
        var icount = 0;
        var arr = [];
        while (sstring !== "") {

            var sub = sstring.split(" ", 1);
            if (sub !== "") {
                if (sub.toString().match(/[+-.,!@#$%^&*();\/|<>"'\[\]\\\?:\{\}~`]/g)) {
                    sub = sub.toString().replace(/[+-.,!@#$%^&*();\/|<>"'\[\]\\\?:\{\}~`]/g, '');
                }
                arr[icount] = sub.toString();
                icount++;
            }
            sstring = sstring.substring(sub.toString().length + 1, sstring.length);
        }

        return arr;
    }

    function comparearray(arrcheck, arrsource) {
        var itest = 0;
        var inumber = 0;
        for (var i = 0; i < arrsource.length; i++) {
            for (var j = 0; j < arrcheck.length; j++) {
                if (arrcheck[j].toString() === arrsource[i].toString()) {
                    itest++;
                    if (itest === arrcheck.length) {
                        inumber++;
                        if (arrcheck.length < arrsource.length - i) {
                            itest = 0;
                            break;
                        }
                    }
                    i++;
                } else {
                    break;
                }
            }
        }
        return inumber;
    }

    function showresultEn() {

        var title = $("#input_Title_Ja").val();
        var textcheck = $("#checktext_Ja").val();
        var pagetitleEn = $("#input_Title_Ja").val();
        //var content = $("#Content_Ja").val();
        var text = $('#Content_Ja').html($("#Content_Ja").val()).text();//get text
        var content = decodeHtmlEntities(text);
        var metadesEn = $("#input_MetaDescription_Ja").val();

        //pass string into array
        var arrtitle = splitstring(title);
        var arrtextcheck = splitstring(textcheck);
        var arrPagetitleEn = splitstring(pagetitleEn);
        var arrcontent = splitstring(content);
        var arrMetadesEn = splitstring(metadesEn);


        var ichecktitle = comparearray(arrtextcheck, arrtitle);
        var icheckPagetitleEn = comparearray(arrtextcheck, arrPagetitleEn);
        var icheckcontent = comparearray(arrtextcheck, arrcontent);
        var icheckMetadesEn = comparearray(arrtextcheck, arrMetadesEn);

        var acticleHtml = '';
        if (ichecktitle > 0) {
            $('#ArticleCheck_Ja').children().remove();
            acticleHtml += '<b style="color:#006621">Yes (' + ichecktitle + ')</b>';
            $('#ArticleCheck_Ja').append(acticleHtml);
        } else {
            $('#ArticleCheck_Ja').children().remove();
            acticleHtml += '<b  style="color:#ff0000">No</b>';
            $('#ArticleCheck_Ja').append(acticleHtml);
        }

        var pagetitleEnHtml = '';
        if (icheckPagetitleEn > 0) {
            $('#PagetitleCheck_Ja').children().remove();
            pagetitleEnHtml += '<b style="color:#006621">Yes (' + icheckPagetitleEn + ')</b>';
            $('#PagetitleCheck_Ja').append(pagetitleEnHtml);
        } else {
            $('#PagetitleCheck_Ja').children().remove();
            pagetitleEnHtml += '<b  style="color:#ff0000">No</b>';
            $('#PagetitleCheck_Ja').append(pagetitleEnHtml);
        }

        var contentHtml = '';
        if (icheckcontent > 0) {
            $('#ContentCheck_Ja').children().remove();
            contentHtml += '<b style="color:#006621">Yes (' + icheckcontent + ')</b>';
            $('#ContentCheck_Ja').append(contentHtml);
        } else {
            $('#ContentCheck_Ja').children().remove();
            contentHtml += '<b  style="color:#ff0000">No</b>';
            $('#ContentCheck_Ja').append(contentHtml);
        }

        var metadesEnHtml = '';
        if (icheckMetadesEn > 0) {
            $('#MetadesCheck_Ja').children().remove();
            metadesEnHtml += '<b style="color:#006621">Yes (' + icheckMetadesEn + ')</b>';
            $('#MetadesCheck_Ja').append(metadesEnHtml);
        } else {
            $('#MetadesCheck_Ja').children().remove();
            metadesEnHtml += '<b  style="color:#ff0000">No</b>';
            $('#MetadesCheck_Ja').append(metadesEnHtml);
        }
    }

    $("#checktext_Ja").change(function () {
        showhidetagEn();
        showresultEn();
    });

    $("#Content_Ja").change(function () {
        showhidetagEn();
        showresultEn();
    });

    $("#input_Title_Ja").change(function () {
        showhidetagEn();
        showresultEn();
        $("#titlepreview_Ja").children().remove();
        $("#input_MetaTitle_Ja").val($("#input_Title_Ja").val());
        var metatileseoHtml = '<span>' + $("#input_Title_Ja").val() + '</span>';
        $("#titlepreview_Ja").append(metatileseoHtml);

        var url = $("#input_Title_Ja").val();
        url = url.replace(/[" "]/g, '-');
        $("#pageurl_Ja").children().remove();
        metatileseoHtml = '<h5 style="color:#006621;font-size: 12px;">' + window.location.host + '/' + url + '</h5>';
        $("#pageurl_Ja").append(metatileseoHtml);
    });

    $("#input_MetaDescription_Ja").change(function () {
        showhidetagEn();
        showresultEn();
        if ($("#input_MetaDescription_Ja").val() !== "") {
            $("#descriptionpreview_Ja").children().remove();
            var destileseoHtml = '<h5 style="font-size: 12px;">' + $("#input_MetaDescription_Ja").val() + '</h5>';
            $("#descriptionpreview_Ja").append(destileseoHtml);
        } else {
            $("#descriptionpreview_Ja").children().remove();
        }

    });

    $("#input_MetaTitle_Ja").change(function () {
        var metatileseoHtml;
        if ($("#input_MetaTitle_Ja").val() !== "") {
            $("#titlepreview_Ja").children().remove();
            metatileseoHtml = '<span>' + $("#input_MetaTitle_Ja").val() + '</span>';
            $("#titlepreview_Ja").append(metatileseoHtml);

            var url = $("#input_Title_Ja").val();
            url = url.replace(/[" "]/g, '-');
            $("#pageurl_Ja").children().remove();
            metatileseoHtml = '<h5 style="color:#006621;font-size: 12px;">' + window.location.host + '/' + url + '</h5>';
            $("#pageurl_Ja").append(metatileseoHtml);
        } else {
            $("#titlepreview_Ja").children().remove();
            $("#input_MetaTitle_Ja").attr('placeholder', $("#input_Title_Ja").val());
            metatileseoHtml = '<span>' + $("#input_Title_Ja").val() + '</span>';
            $("#titlepreview_Ja").append(metatileseoHtml);

            $("#pageurl_Ja").children().remove();
            metatileseoHtml = '<h5 style="color:#006621;font-size:12px;">' + window.location.host + '</h5>';
            $("#pageurl_Ja").append(metatileseoHtml);
        }
    });



})