var $jxToc = jQuery.noConflict();

function initAccToc() {
    $jxToc("#daftar-isi .judul-list").hide();
    $jxToc("#daftar-isi  .judul-label").css("cursor", "pointer");
    $jxToc("#daftar-isi .judul-list:first").show();
    $jxToc("#daftar-isi .judul-label:first").addClass("headactive");
    $jxToc("#daftar-isi .judul-label").click(function () {
        if (accToc) {
            var a = $jxToc(this).next();
            if ((a.is(".judul-list")) && (a.is(":visible"))) {
                $jxToc(this).next().slideToggle("normal");
                $jxToc(this).toggleClass("headactive");
                return false
            }
            if ((a.is(".judul-list")) && (!a.is(":visible"))) {
                $jxToc("#daftar-isi  .judul-list:visible").slideUp("normal");
                $jxToc("#daftar-isi  .judul-label").removeClass("headactive");
                a.slideDown("normal");
                $jxToc(this).addClass("headactive");
                return false
            }
        } else {
            $jxToc(this).next().slideToggle("normal");
            $jxToc(this).toggleClass("headactive")
        }
    })
}
$jxToc(document).ready(function () {
    initAccToc()
})