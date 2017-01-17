$(document).ready(function () {
    
});



function DisplayXML(xmlFile) {
    var nm;
    $.ajax({
        type: "GET",
        async: false,
        url: "/DDF.xml",
        dataType: "xml",
        success: function (xmlDoc) {
            var $xml = $(xmlDoc);
            var $items = $xml.find('Item');

            $items.each(function () {
                var urn = $(this).find('URN').text();
                var objectID = $(this).find('ObjectID').text();
                var ddfURL = $(this).find('DDF').text();
                var source = $(this).find('Source').text();
                var tsURL = $(this).find('TS').text();
                var name = $(this).find('Name').text();
                var description = $(this).find('Description').text();
                $("#LwM2MObjects_tbl").find('tbody').append(
                    '<tr>' +
                        '<td style="width: 143px">' +
                            urn +
                        '</td>' +
                        '<td>' +
                            '<a href="' + ddfURL + '" title="download xml file">' + objectID + '</a>' +
                        '</td>' +
                        '<td>' +
                            '<a href="http://devtoolkit.openmobilealliance.org/OEditor/LWMOView?url=' + encodeURIComponent(ddfURL) + '" title="call the Editor">' + objectID + '</a>' +
                        '</td>' + 
                        '<td>' +
                            '<!-- Link not available yet -->' +
                            '<a>' + '-' + '</a>'+
                        '</td>' +
                        '<td style="width: 136px">' +
                            '<a href="' + tsURL + '" title="download document">' + name + '</a>' +
                        '</td>' +
                        '<td>' +
                            '<p>' + description + '</p>' +
                        '</td>' +
                    '</tr>'
                );
            });
        }
    });
}