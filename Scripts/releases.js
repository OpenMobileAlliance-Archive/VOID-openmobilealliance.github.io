$(document).ready(function() {
    var $notes = $('.release-note-phase');

    function setNoteWrapperHeight() {
        $notes.each(function (key, value) {
            $(this).parent().css('min-height', $(this).height());
        });
    }

    setNoteWrapperHeight();

    $(window).on("resize", setNoteWrapperHeight);
});