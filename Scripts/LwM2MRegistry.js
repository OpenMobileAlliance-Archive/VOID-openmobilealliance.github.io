$(document).ready(function () {
    // Wrap the contents of the last td in a div to remove overflow
    $('.descriptive-table').find('td:last-child').wrapInner('<div class="expandable" />');

    // Check that there is overflow happening and make the item expandable if it is
    $('div.expandable').each(function (index, item) {
        makeExpandable(item);
    });

    // On collapsible, collapse the item on click
    $(document).on('click', 'a.collapser', function() {
        var $this = $(this);

        $this.siblings('div.expandable').animate({
            height: $this.siblings('div.expandable').data('originalHeight')
        }, 700, function () {
            createExpanderClickEvent($(this).parent());
            $this.closest('td').toggleClass('expander');
        });

        $this.siblings('div.expandable').find('div.expanderOverlay').show();

        $this.siblings('a.expander').show();

        $this.hide();
    });
});

// Create all the elements for the expandable <div> elements
function makeExpandable(item) {
    if (item.clientHeight < item.scrollHeight) {
        // div is overflowing the td element, so fade and display ---more---
        var $item = $(item);

        item.parentNode.className += ' expander';

        // Add ---more--- link
        var moreElement = document.createElement('a');
        moreElement.text = '---more---';
        moreElement.className += ' expander';
        $item.parent().append($(moreElement));

        var lessElement = document.createElement('a');
        lessElement.text = '---less---';
        lessElement.className += ' collapser';
        lessElement.hidden = true;
        $item.parent().append($(lessElement));

        // Create faded overlay for the expander element
        var fadeOverlay = document.createElement('div');
        fadeOverlay.className += ' expanderOverlay';

        $item.append($(fadeOverlay));

        // On expandable items, expand the item on click
        createExpanderClickEvent($item.parent());
    }
}

// Turn on the click event for the <td> element
function createExpanderClickEvent(item) {
    $(item).on('click', function () {
        var $this = $(this);
        $this.off('click');
        
        var originalHeight = $this.find('div.expandable').height();
        $this.find('div.expandable').data('originalHeight', originalHeight);

        // Turn off click events while animating
        $this.css('pointer-events', 'none');

        $this.find('div.expandable').animate({
            height: $this.find('div.expandable')[0].scrollHeight
        }, 700, function () {
            // Turn click events back on after animating
            $this.css('pointer-events', 'auto');
            $this.find('a.collapser').show();

            $this.find('a.expander').hide();

            $this.toggleClass('expander');
        });

        $this.find('div.expanderOverlay').hide();
    });
}