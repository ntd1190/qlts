$(document).ready(function () {
    function showhidetagEn() {
        if ($("#checktext_En").val() !== "") {
            $("#Enticle_En").show();
            $("#Pagetitle_En").show();
            $("#Contents_En").show();
            $("#Metades_En").show();
        } else {
            $("#Enticle_En").hide();
            $("#Pagetitle_En").hide();
            $("#Contents_En").hide();
            $("#Metades_En").hide();
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

    loadwarningEn("input_MetaDescription_En", 160, "Metades_Ennote");
    loadwarningEn("input_MetaTitle_En", 70, "metatitlenote");


    $("#input_MetaDescription_En").keyup(function() {
        loadwarningEn("input_MetaDescription_En", 160, "Metades_Ennote");
    });

    $("#input_MetaTitle_En").keyup(function() {
        loadwarningEn("input_MetaTitle_En", 70, "metatitlenote");
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
                    if (itest=== arrcheck.length) {
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

        var title = $("#input_Title_En").val();
        var textcheck = $("#checktext_En").val();
        var pagetitleEn = $("#input_Title_En").val();
        //var content = $("#Content_En").val();
        var text = $('#Content_En').html($("#Content_En").val()).text();//get text
        var content = decodeHtmlEntities(text);
        var metadesEn = $("#input_MetaDescription_En").val();

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
            $('#EnticleCheck_En').children().remove();
            acticleHtml += '<b style="color:#006621">Yes (' + ichecktitle + ')</b>';
            $('#EnticleCheck_En').append(acticleHtml);
        } else {
            $('#EnticleCheck_En').children().remove();
            acticleHtml += '<b  style="color:#ff0000">No</b>';
            $('#EnticleCheck_En').append(acticleHtml);
        }

        var pagetitleEnHtml = '';
        if (icheckPagetitleEn > 0) {
            $('#PagetitleCheck_En').children().remove();
            pagetitleEnHtml += '<b style="color:#006621">Yes (' + icheckPagetitleEn + ')</b>';
            $('#PagetitleCheck_En').append(pagetitleEnHtml);
        } else {
            $('#PagetitleCheck_En').children().remove();
            pagetitleEnHtml += '<b  style="color:#ff0000">No</b>';
            $('#PagetitleCheck_En').append(pagetitleEnHtml);
        }

        var contentHtml = '';
        if (icheckcontent > 0) {
            $('#ContentCheck_En').children().remove();
            contentHtml += '<b style="color:#006621">Yes (' + icheckcontent + ')</b>';
            $('#ContentCheck_En').append(contentHtml);
        } else {
            $('#ContentCheck_En').children().remove();
            contentHtml += '<b  style="color:#ff0000">No</b>';
            $('#ContentCheck_En').append(contentHtml);
        }

        var metadesEnHtml = '';
        if (icheckMetadesEn > 0) {
            $('#MetadesCheck_En').children().remove();
            metadesEnHtml += '<b style="color:#006621">Yes (' + icheckMetadesEn + ')</b>';
            $('#MetadesCheck_En').append(metadesEnHtml);
        } else {
            $('#MetadesCheck_En').children().remove();
            metadesEnHtml += '<b  style="color:#ff0000">No</b>';
            $('#MetadesCheck_En').append(metadesEnHtml);
        }
    }

    $("#checktext_En").change(function() {
        showhidetagEn();
        showresultEn();
    });

    $("#Content_En").change(function() {
        showhidetagEn();
        showresultEn();
    });

    $("#input_Title_En").change(function() {
        showhidetagEn();
        showresultEn();
        $("#titlepreview_En").children().remove();
        $("#input_MetaTitle_En").val($("#input_Title_En").val());
        var metatileseoHtml = '<span>' + $("#input_Title_En").val() + '</span>';
        $("#titlepreview_En").append(metatileseoHtml);

        var url = $("#input_Title_En").val();
        url = url.replace(/[" "]/g, '-');
        $("#pageurl_En").children().remove();
        metatileseoHtml = '<h5 style="color:#006621;font-size: 12px;">' + window.location.host + '/' + url + '</h5>';
        $("#pageurl_En").append(metatileseoHtml);
    });

    $("#input_MetaDescription_En").change(function() {
        showhidetagEn();
        showresultEn();
        if ($("#input_MetaDescription_En").val() !== "") {
            $("#descriptionpreview_En").children().remove();
            var destileseoHtml = '<h5 style="font-size: 12px;">' + $("#input_MetaDescription_En").val() + '</h5>';
            $("#descriptionpreview_En").append(destileseoHtml);
        } else {
            $("#descriptionpreview_En").children().remove();
        }

    });

    $("#input_MetaTitle_En").change(function() {
        var metatileseoHtml;
        if ($("#input_MetaTitle_En").val() !== "") {
            $("#titlepreview_En").children().remove();
            metatileseoHtml = '<span>' + $("#input_MetaTitle_En").val() + '</span>';
            $("#titlepreview_En").append(metatileseoHtml);

            var url = $("#input_Title_En").val();
            url = url.replace(/[" "]/g, '-');
            $("#pageurl_En").children().remove();
            metatileseoHtml = '<h5 style="color:#006621;font-size: 12px;">' + window.location.host + '/' + url + '</h5>';
            $("#pageurl_En").append(metatileseoHtml);
        } else {
            $("#titlepreview_En").children().remove();
            $("#input_MetaTitle_En").attr('placeholder', $("#input_Title_En").val());
            metatileseoHtml = '<span>' + $("#input_Title_En").val() + '</span>';
            $("#titlepreview_En").append(metatileseoHtml);

            $("#pageurl_En").children().remove();
            metatileseoHtml = '<h5 style="color:#006621;font-size:12px;">' + window.location.host + '</h5>';
            $("#pageurl_En").append(metatileseoHtml);
        }
    });



})