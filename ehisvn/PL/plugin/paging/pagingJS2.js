
$(document).ready(function () {

    //how much items per page to show
    var show_per_page = 10;
    //getting the amount of elements inside content div
    var number_of_items = $('#newslist1').children().size();
    //calculate the number of pages we are going to have
    var number_of_pages = Math.ceil(number_of_items / show_per_page);

    //set the value of our hidden input fields
    $('#current_page1').val(0);
    $('#show_per_page1').val(show_per_page);

    var navigation_html = '';

    navigation_html += '<li class="previous_link">';
    navigation_html += '<a href="javascript:previous()1;">&laquo;</a>';
    navigation_html += '</li>';
    var current_link = 0;
    while (number_of_pages > current_link) {
        navigation_html += '<li class="page_link1" id="id' + current_link + '">';
        navigation_html += '<a href="javascript:go_to_page1(' + current_link + ')" longdesc="' + current_link + '">' + (current_link + 1) + '</a>';
        current_link++;
        navigation_html += '</li>';
    }
    navigation_html += '<li>';
    navigation_html += '<a class="next_link1" href="javascript:next1();">&raquo;</a>';
    navigation_html += '</li>';

    $('#page_navigation1').html(navigation_html);

    //add active1 class to the first page link
    $('#page_navigation1 .page_link1:first').addClass('active1');

    //hide all the elements inside content div
    $('#newslist1').children().css('display', 'none');

    //and show the first n (show_per_page) elements
    $('#newslist1').children().slice(0, show_per_page).css('display', 'block');

});

function previous1() {

    new_page = parseInt($('#current_page1').val()) - 1;
    //if there is an item before the current active1 link run the function
    if ($('.active1').prev('.page_link1').length == true) {
        go_to_page1(new_page);
    }

}

function next1() {
    new_page = parseInt($('#current_page1').val()) + 1;
    //if there is an item after the current active1 link run the function
    if ($('.active1').next('.page_link1').length == true) {
        go_to_page1(new_page);
    }

}

function go_to_page1(page_num) {
    //get the number of items shown per page
    var show_per_page = parseInt($('#show_per_page1').val());

    //get the element number where to start the slice from
    start_from = page_num * show_per_page;

    //get the element number where to end the slice
    end_on = start_from + show_per_page;

    activate_id = page_num;
    var get_box = document.getElementById("id" + page_num);
    //hide all children elements of content div, get specific items and show them
    $('#newslist1').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');

    /*get the page link that has longdesc attribute of the current page and add active1 class to it
    and remove that class from previously active1 page link*/
    $("#page_navigation1").find('li.active1').removeClass("active1");
    $(get_box).addClass("active1");


    //update the current page input field
    $('#current_page1').val(page_num);
}