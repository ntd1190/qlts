window.location.href = '/QLKDMAIN/#!/NhanVien/list';
build();
function build() {
    var $overlay = document.getElementsByClassName('overlay')[0];
    var counter = 0;
    var interval = setInterval(function () {
        counter++;
        if (counter == 11) {
            clearInterval(interval);
            done();
        }
        else $overlay.textContent = "Loading " + counter*10 + '%...'
    }, 500);
};
function done() {
    var $overlay = document.getElementsByClassName('overlay')[0];
    setTimeout(function () {
        $overlay.style.opacity = 1;
        var animate = setInterval(function () {
            if ($overlay.style.opacity == 0) {
                clearInterval(animate);
                $overlay.remove();
             
            } else {
                $overlay.style.opacity -= 0.1;
            }
        }, 65);
    }, 1000);
};
