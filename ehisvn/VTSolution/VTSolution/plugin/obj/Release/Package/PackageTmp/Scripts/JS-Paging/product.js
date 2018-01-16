
$(document).ready(function () {

    //how much items per page to show
   
});

function pageMaker(pageNumber, id, idnav) {

    var show_per_page = pageNumber;
    //getting the amount of elements inside content div
    var number_of_items = $(id).children().size();
    //calculate the number of pages we are going to have
    var number_of_pages = Math.ceil(number_of_items / show_per_page);
    //set the value of our hidden input fields

    var navigation_html = '';

    navigation_html += '<li class="previous_link">';
    navigation_html += '<a href="javascript:previous(\'' + idnav + '\',\'' + id + '\',\'' + number_of_pages + '\');">&laquo;</a>';
    navigation_html += '</li>';
    var current_link = 0;
    while (number_of_pages > current_link) {
        navigation_html += '<li class="page_link" id="id' + current_link + id + '">';
        navigation_html += '<a href="javascript:go_to_page(' + current_link + ',\'' + idnav + '\',\'' + id + '\',\'' + number_of_pages + '\')" longdesc="' + current_link + '">' + (current_link + 1) + '</a>';
        current_link++;
        navigation_html += '</li>';
    }
    navigation_html += '<li>';
    navigation_html += '<a class="next_link" href="javascript:next(\'' + idnav + '\',\'' + id + '\',\'' + number_of_pages + '\');">&raquo;</a>';
    navigation_html += '</li>';
    navigation_html += "<li class='hidden'><input type='hidden' class='current_page' /></li>";
    navigation_html += "<li class='hidden'><input type='hidden' class='show_per_page' /></li>";
    $(idnav).html(navigation_html);
    $(idnav + ' .current_page').val(0);
    $(idnav + ' .show_per_page').val(show_per_page);

    //add active class to the first page link
    $(idnav + ' .page_link:first').addClass('active');

    //hide all the elements inside content div
    $(id).children().css('display', 'none');
    //and show the first n (show_per_page) elements
    $(id).children().slice(0, show_per_page).css('display', 'block');
    var page_number = 0;
    for (var i = 0; i <= number_of_pages; i++) {
        page_number = document.getElementById("id" + i + id);
        $(page_number).addClass("hidden");
    }
    for (var i = 0; i < 5; i++) {
        page_number = document.getElementById("id" + i + id);
        $(page_number).removeClass("hidden");
    }
}
function previous(idnav, id, number_of_pages) {

    new_page = parseInt($(idnav + ' .current_page').val()) - 1;
    //if there is an item before the current active link run the function
    if ($('.active').prev('.page_link').length == true) {
        go_to_page(new_page, idnav, id, number_of_pages);
    }

}

function next(idnav, id, number_of_pages) {
    new_page = parseInt($(idnav + ' .current_page').val()) + 1;
    //if there is an item after the current active link run the function
    if ($('.active').next('.page_link').length == true) {
        go_to_page(new_page, idnav, id, number_of_pages);
    }

}

function go_to_page(page_num, idnav, id, number_of_pages) {
    //get the number of items shown per page
    var show_per_page = parseInt($(idnav + ' .show_per_page').val());

    //get the element number where to start the slice from
    var start_from = page_num * show_per_page;

    //get the element number where to end the slice
    var end_on = start_from + show_per_page;

    var activate_id = page_num;
    var get_box = document.getElementById("id" + page_num + id);
    var page_number = 0;
    for (var i = 0; i < number_of_pages; i++) {
        page_number = document.getElementById("id" + i + id);
        $(page_number).addClass("hidden");
    }
    if (page_num < 2) {
        for (var i = 0; i < 5; i++) {
            page_number = document.getElementById("id" + i + id);
            $(page_number).removeClass("hidden");
        }
    }
    else if (page_num > number_of_pages - 3) {
        for (var i = number_of_pages - 5; i < number_of_pages; i++) {
            page_number = document.getElementById("id" + i + id);
            $(page_number).removeClass("hidden");
        }
    } else {
        for (var i = page_num - 2; i < page_num + 3; i++) {
            page_number = document.getElementById("id" + i + id);
            $(page_number).removeClass("hidden");
        }
    }
    //hide all children elements of content div, get specific items and show them
    $(id).children().css('display', 'none').slice(start_from, end_on).css('display', 'block');

    /*get the page link that has longdesc attribute of the current page and add active class to it
    and remove that class from previously active page link*/
    $(idnav).find('li.active').removeClass("active");
    $(get_box).addClass("active");


    //update the current page input field
    $(idnav + ' .current_page').val(page_num);
}
function mainload() {

    var show_per_page = 9;
    //getting the amount of elements inside content div
    var number_of_items = $('#product-list').children().size();
    //calculate the number of pages we are going to have
    var number_of_pages = Math.ceil(number_of_items / show_per_page);

    //set the value of our hidden input fields
    $('#current_page').val(0);
    $('#show_per_page').val(show_per_page);

    var navigation_html = '';

    navigation_html += '<li class="previous_link">';
    navigation_html += '<a href="javascript:previous();">&laquo;</a>';
    navigation_html += '</li>';
    var current_link = 0;
    while (number_of_pages > current_link) {
        navigation_html += '<li class="page_link" id="id' + current_link + '">';
        navigation_html += '<a href="javascript:go_to_page(' + current_link + ')" longdesc="' + current_link + '">' + (current_link + 1) + '</a>';
        current_link++;
        navigation_html += '</li>';
    }
    navigation_html += '<li>';
    navigation_html += '<a class="next_link" href="javascript:next();">&raquo;</a>';
    navigation_html += '</li>';

    $('#page_navigation').html(navigation_html);

    //add active class to the first page link
    $('#page_navigation .page_link:first').addClass('active');

    //hide all the elements inside content div
    $('#product-list').children().css('display', 'none');

    //and show the first n (show_per_page) elements
    $('#product-list').children().slice(0, show_per_page).css('display', 'block');
}
function previous() {

    new_page = parseInt($('#current_page').val()) - 1;
    //if there is an item before the current active link run the function
    if ($('.active').prev('.page_link').length == true) {
        go_to_page(new_page);
    }

}

function next() {
    new_page = parseInt($('#current_page').val()) + 1;
    //if there is an item after the current active link run the function
    if ($('.active').next('.page_link').length == true) {
        go_to_page(new_page);
    }

}

function go_to_page(page_num) {
    //get the number of items shown per page
    var show_per_page = parseInt($('#show_per_page').val());

    //get the element number where to start the slice from
    start_from = page_num * show_per_page;

    //get the element number where to end the slice
    end_on = start_from + show_per_page;

    activate_id = page_num;
    var get_box = document.getElementById("id" + page_num);
    //hide all children elements of content div, get specific items and show them
    $('#product-list').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');

    /*get the page link that has longdesc attribute of the current page and add active class to it
    and remove that class from previously active page link*/
    $("#page_navigation").find('li.active').removeClass("active");
    $(get_box).addClass("active");


    //update the current page input field
    $('#current_page').val(page_num);
}