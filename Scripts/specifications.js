$(document).ready(function() {
    var $notes = $('.release-note-phase');

    // Allow the .release-note-phase div to float to the right and set the height of the parent container appropriately.
    // As well as allowing for the vertical-alignment: center to work by setting the full height of the container, then
    // creating the "bottom" CSS element (a set height is needed for that to work)
    function setNoteWrapperHeight() {
        $notes.each(function (key, value) {
            $(this).parent().css('min-height', $(this).height());
            $(this).parent().css('line-height', $(this).height() + 'px');
            $(this).css('line-height', 'normal');
            $(this).css('height', $(this).height());
            $(this).css('bottom', '0');
        });
    }

    setNoteWrapperHeight();

    $(window).on("resize", setNoteWrapperHeight);
});