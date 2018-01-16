$(document).ready(function () {
    showhidetag();
    loadwarning("input_MetaDescription", 160, "metadesnote");
    loadwarning("input_MetaTitle", 70, "metatitlenote");


    $("#input_MetaDescription").keyup(function () {
        loadwarning("input_MetaDescription", 160, "metadesnote");
    })

    $("#input_MetaTitle").keyup(function () {
        loadwarning("input_MetaTitle", 70, "metatitlenote");
    })


    $("#checktext").change(function () {
        showhidetag();
        showresult();
    })

    $("#Content").change(function () {
        showhidetag();
        showresult();
    })

    $("#input_Title").change(function () {
        showhidetag();
        showresult();
        $("#titlepreview").children().remove();
        $("#input_MetaTitle").val($("#input_Title").val());
        var metatileseo_html = '<span>' + $("#input_Title").val() + '</span>';
        $("#titlepreview").append(metatileseo_html);

        var url = $("#input_Title").val();
        url = url.replace(/[" "]/g, '-');
        $("#pageurl").children().remove();
        var metatileseo_html = '<h5 style="color:#006621;font-size: 12px;">' + window.location.host+'/'+ url + '</h5>';
        $("#pageurl").append(metatileseo_html);
    })

    $("#input_MetaDescription").change(function () {
        showhidetag();
        showresult();
        if ($("#input_MetaDescription").val() != "") {
            $("#descriptionpreview").children().remove();
            var destileseo_html = '<h5 style="font-size: 12px;">' + $("#input_MetaDescription").val() + '</h5>';
            $("#descriptionpreview").append(destileseo_html);
        } else {
            $("#descriptionpreview").children().remove();
        }
        
    })

    $("#input_MetaTitle").change(function () {
        if ($("#input_MetaTitle").val() != "") {
            $("#titlepreview").children().remove();
            var metatileseo_html = '<span>' + $("#input_MetaTitle").val() + '</span>';
            $("#titlepreview").append(metatileseo_html);

            var url = $("#input_Title").val();
            url = url.replace(/[" "]/g, '-');
            $("#pageurl").children().remove();
            var metatileseo_html = '<h5 style="color:#006621;font-size: 12px;">' + window.location.host + '/' + url + '</h5>';
            $("#pageurl").append(metatileseo_html);
        } else {
            $("#titlepreview").children().remove();
            $("#input_MetaTitle").attr('placeholder', $("#input_Title").val());
            var metatileseo_html = '<span>' + $("#input_Title").val() + '</span>';
            $("#titlepreview").append(metatileseo_html);

            $("#pageurl").children().remove();
            var metatileseo_html = '<h5 style="color:#006621;font-size:12px;">' + window.location.host + '</h5>';
            $("#pageurl").append(metatileseo_html);
        }
    })



    //FUNCTION LOADWARNING 
    function loadwarning(id, lengthmeta, idaddhtml) {
        var html = '';
        if ($("#" + id).val() != "") {
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

    //Show-hide keyword tag
    function showhidetag() {
        if ($("#checktext").val() != "") {
            $("#Article").show();
            $("#Pagetitle").show();
            $("#Contents").show();
            $("#Metades").show();
        } else {
            $("#Article").hide();
            $("#Pagetitle").hide();
            $("#Contents").hide();
            $("#Metades").hide();
        }
    }

    //FUNCTION DECODE HTML TAG => TEXT
    function decodeHTMLEntities(str) {
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

    //
    function showresult() {

        var title = $("#input_Title").val();
        var textcheck = $("#checktext").val();
        var pagetitle = $("#input_Title").val();
        //var content = $("#Content").val();
        var text = $('#Content').html($("#Content").val()).text();//get text
        var content = decodeHTMLEntities(text);
        var metades = $("#input_MetaDescription").val();

        //pass string into array
        var arrtitle = splitstring(title);
        var arrtextcheck = splitstring(textcheck);
        var arrpagetitle = splitstring(pagetitle);
        var arrcontent = splitstring(content);
        var arrmetades = splitstring(metades);


        var ichecktitle = comparearray(arrtextcheck, arrtitle);
        var icheckpagetitle = comparearray(arrtextcheck, arrpagetitle);
        var icheckcontent = comparearray(arrtextcheck, arrcontent);
        var icheckmetades = comparearray(arrtextcheck, arrmetades);

        var acticle_html = '';
        if (ichecktitle > 0) {
            $('#ArticleCheck').children().remove();
            acticle_html += '<b style="color:#006621">Yes (' + ichecktitle + ')</b>';
            $('#ArticleCheck').append(acticle_html);
        } else {
            $('#ArticleCheck').children().remove();
            acticle_html += '<b  style="color:#ff0000">No</b>';
            $('#ArticleCheck').append(acticle_html);
        }

        var pagetitle_html = '';
        if (icheckpagetitle > 0) {
            $('#PagetitleCheck').children().remove();
            pagetitle_html += '<b style="color:#006621">Yes (' + icheckpagetitle + ')</b>';
            $('#PagetitleCheck').append(pagetitle_html);
        } else {
            $('#PagetitleCheck').children().remove();
            pagetitle_html += '<b  style="color:#ff0000">No</b>';
            $('#PagetitleCheck').append(pagetitle_html);
        }

        var content_html = '';
        if (icheckcontent > 0) {
            $('#ContentCheck').children().remove();
            content_html += '<b style="color:#006621">Yes (' + icheckcontent + ')</b>';
            $('#ContentCheck').append(content_html);
        } else {
            $('#ContentCheck').children().remove();
            content_html += '<b  style="color:#ff0000">No</b>';
            $('#ContentCheck').append(content_html);
        }

        var metades_html = '';
        if (icheckmetades > 0) {
            $('#MetadesCheck').children().remove();
            metades_html += '<b style="color:#006621">Yes (' + icheckmetades + ')</b>';
            $('#MetadesCheck').append(metades_html);
        } else {
            $('#MetadesCheck').children().remove();
            metades_html += '<b  style="color:#ff0000">No</b>';
            $('#MetadesCheck').append(metades_html);
        }
    }

    //FUNCTION COMPARE ARRAY
    function comparearray(arrcheck, arrsource) {
        var itest = 0;
        var inumber = 0;
        for (var i = 0; i < arrsource.length; i++) {
            for (var j = 0; j < arrcheck.length; j++) {
                if (arrcheck[j].toString() == arrsource[i].toString()) {
                    itest++;
                    if (itest == arrcheck.length) {
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

    //FUNCTION SPLIT STRING -> INTO ARRAY
    function splitstring(sstring) {
        var icount = 0;
        var arr = [];
        while (sstring != "") {

            var sub = sstring.split(" ", 1);
            if (sub != "") {
                if (sub.toString().match(/[+-.,!@#$%^&*();\/|<>"'\[\]\\\?:\{\}~`]/g)) {
                    sub = sub.toString().replace(/[+-.,!@#$%^&*();\/|<>"'\[\]\\\?:\{\}~`]/g, '');
                }
                arr[icount] = sub.toString();
                icount++;
            }
            sstring = sstring.substring(sub.toString().length + 1, sstring.length)
        }
        
        return arr;
    }
})