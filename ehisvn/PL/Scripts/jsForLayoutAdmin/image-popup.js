
var INSERT_AVATAR = 1, INSERT_FCK = 2;

function OpenPopup(option) {
   

    $('input#option').val(option);
    if (option == INSERT_FCK) {
        $('.media-menu > .media-menu-item:last-child').css('display', 'block');
    }

    if (option == INSERT_AVATAR) {
        $('.media-menu > .media-menu-item:last-child').css('display', 'none');
    }

    $('.media-menu .media-menu-item').removeClass('active');
    $('.media-router .media-menu-item').removeClass('active');
    $('.media-menu .media-menu-item:first').addClass('active');
    var select = $('.media-menu .active').attr('href');

    $(select).css('display', 'block');
    $('#upload-url').css('display', 'none');
    $('.media-frame-router').css('display', 'block');
    $('.media-frame-title').html("<h1>Insert Media</h1>");

    $('.media-router .media-menu-item:first').addClass('active');

    var id = $('.media-router .active').attr('href');
    $(id).css('display', 'block');
    if (id == "#attachments-browser") {
        LoadImage();
    }

    $('.media-toolbar-primary .btn-insert').click(function () {
        var test = $('.media-menu .active').attr('href');
        var data = "";
        var alt = "";
        if (test == "#library") {
            data = $('#media-sidebar #url-link').val();
            alt += $('#media-sidebar #title-link').val();

        } else {
            data = $('.embed-url #url-link').val();
            alt += $('#alignment').val();
        }
        var op = $('input#option').val();
        var insert = "";
        if (op == INSERT_AVATAR) {
            var area = $('input#option').attr('data-value');
            var multi = $('input#multi').val();
            $('#fileName-' + area).val(data);
            var filename = $('.area-' + area).attr('data-name');
            if (multi == "true") {
                $('.data-img').each(function () {
                    insert += '<div class="avatar-upload-container">' +
                        '<div class="avatar-upload-wrapper">' +
                        '<div class="avatar-upload-inner">' +
                        '<input type="hidden" value="' + $(this).val() + '" name="' + filename + '"/>' +
                        '<img src="' + $(this).val() + '" />' +
                        '</div>' +
                        '<a class="checked" href="#">' +
                        '<span class="glyphicon glyphicon-remove rm-checked"></span>' +
                        '</a>' +
                        '</div>' +
                        '</div>';
                });
            } else {
                var vl = $('.att.selected .data-img').val();
                if (vl != null) {
                    insert += '<div class="avatar-upload-container">' +
                     '<div class="avatar-upload-wrapper">' +
                     '<div class="avatar-upload-inner">' +
                     '<input type="hidden" value="' + vl + '" name="' + filename + '"/>' +
                     '<img src="' + vl + '" />' +
                     '</div>' +
                     '<a class="checked" href="#">' +
                     '<span class="glyphicon glyphicon-remove rm-checked"></span>' +
                     '</a>' +
                     '</div>' +
                     '</div>';
                }

            }


            if (insert.length > 0) {
                if (multi == "true") {
                    $('.area-' + area).prepend(insert);
                } else {
                    $('.area-' + area).html(insert);
                }

                $('input#option').attr('data-value', "");
                $('.media-message').css('display', 'none');
                $('#imgPopup').modal('hide');
            } else {
                $('.media-message').css('display', 'block');
            }


        }
        if (option == INSERT_FCK) {

            $('.data-img').each(function () {
                insert += '<p><img src="' + $(this).val() + '"/></p>';
            });
            if (insert.length > 0) {
                tinymce.activeEditor.selection.setContent(insert);
                $('.media-message').css('display', 'none');
                $('#imgPopup').modal('hide');
            } else {
                $('.media-message').css('display', 'block');
            }

        }

    });

}
function LoadImage() {
    $.ajax({
        url: '/Admin/Media/GetImagePopup',
        type: 'Post',
        dataType: 'json',
        success: function (data) {
            var images = data.Images;
            var count = data.Count;
            var input = '<input type="hidden" id="count" value="' + count + '" />';
            $('#image-container').append(input);
            var html = '';
            for (var i = 0; i < images.length; i++) {
                html += '<li class="attachment" id="' + images[i].Id + '">' +
                    '<div class="attachment-preview">' +
                    '<div class="thumbnails">' +
                    '<div class="centered">' +
                    '<img src="' + images[i].Thumbnail + '" data-url="' + images[i].Url + '" alt="' + images[i].Title + '"/>' +
                    '</div>' +
                    '</div>' +
                    '<a class="checked" href="#">' +
                    '<span class="glyphicon glyphicon-ok i-checked"></span>' +
                    '</a>' +
                     '</div>' +
                    '</li>';
            };

            $('.attachments-view').html(html);

            $('.attachments-view').on('click', '.attachment', function (e) {
                var id;
                var img;
                var url;
                var title;
                var dt;
                var multi = $('input#multi').val();
                if (e.ctrlKey && multi == "true") {
                    id = $(this).attr('id');
                    if ($(this).hasClass('save')) {
                        $(this).removeClass('save');
                        removeActtachment(id);
                    } else {
                        $(this).addClass('save');
                        img = $(this).find('img').attr('src');
                        dt = $(this).find('img').attr('data-url');
                        newActtachment(id, img, dt);
                    }
                    if (!$(this).hasClass('selected')) {
                        if ($(this).hasClass('save')) {
                            $('.attachment').removeClass('selected');
                            $('.att').removeClass('selected');
                            $(this).addClass('selected');
                            $("#att" + id).addClass('selected');
                            url = $(this).find('img').attr('data-url');
                            title = $(this).find('img').attr('alt');
                            $("#url-link").val(url);
                            $("#title-link").val(title);
                        };
                    }
                    else {
                        $(this).removeClass('selected');
                        $("#att" + id).addClass('selected');
                        $("#url-link").val("");
                        $("#title-link").val("");
                    }
                } else {
                    id = $(this).attr('id');
                    if (!$(this).hasClass('selected')) {
                        $('.attachment').removeClass('selected');
                        $('.att').removeClass('selected');
                        $(this).addClass('selected');
                        $("#att" + id).addClass('selected');

                        img = $(this).find('img').attr('src');
                        dt = $(this).find('img').attr('data-url');
                        if (!$(this).hasClass('save')) {
                            clearAttachment();
                            newActtachment(id, img, dt);
                            $("#att" + id).addClass('selected');
                        }
                        url = $(this).find('img').attr('data-url');
                        title = $(this).find('img').attr('alt');
                        $("#url-link").val(url);
                        $("#title-link").val(title);
                        if (!$(this).hasClass('save')) {
                            $('.attachment').removeClass('save');
                            $(this).addClass('save');

                        };
                    } else {
                        clearAttachment();
                        $(this).removeClass('selected');
                        $(this).removeClass('save');
                        $("#att" + id).addClass('selected');
                        $("#url-link").val("");
                        $("#title-link").val("");

                    }

                }

            });

            function newActtachment(id, src, dt) {
                var htmla = '<li class="att" id="att' + id + '">' +
                    '<div class="att-preview">' +
                    '<div class="att-thumbnail">' +
                    '<div class="att-centered">' +
                    '<input type="hidden" class="data-img" value="' + dt + '"/>' +
                    '<img src="' + src + '" />' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</li>';
                $('#list-att').append(htmla);
            }
            function removeActtachment(id) {
                $('#list-att li#att' + id).remove();
            }
            function clearAttachment() {
                $('#list-att').html('');
            }
        }
    });
}

$('.avatar-upload-area').on('click', '.avatar-upload-container .checked', function () {
    $(this).parent().parent().remove();
});

//$('.avatar-upload-area').on('click', '.avatar-upload-container', function () {
//    if ($(this).hasClass('selected')) {
//        $(this).removeClass('selected');
//    } else {
//        $('.avatar-upload-container').removeClass('selected');
//        $(this).addClass('selected');
//    }
//});


$('.btn-insert-media').click(function () {
    
    $.get('/Admin/Media/OpenPopup/', function (data) {
        var html = "";
        var container = $('#image-container');
        var inputm = '<input type=hidden id="multi" value="true"/>';
        if (!container.is(':visible')) {
            html += '<div id="image-container">' +
                inputm + data +
               '<div>';
            $("body").append(html);

        } else {
            html += inputm + data;
            container.html(html);
        }


        $('#imgPopup').modal('show');
        OpenPopup(INSERT_FCK);
    });

});
$('.btn-insert-avatar').click(function () {
  
    var area = $(this).attr('data-value');
    var multi = $(this).attr('multi');
    $.get('/Admin/Media/OpenPopup/', function (data) {
        var html = "";
        var container = $('#image-container');
        var input = '<input type="hidden" id="option" data-value="' + area + '"/>';
        var inputm = '<input type=hidden id="multi" value="' + multi + '"/>';
        if (!container.is(':visible')) {
            html += '<div id="image-container">' +
                inputm + input + data +
                '<div>';
            $("body").append(html);
        } else {
            html += inputm + input + data;
            container.html(html);
        }
        $('#imgPopup').modal('show');
        OpenPopup(INSERT_AVATAR);
    });


});
