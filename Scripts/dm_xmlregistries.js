$(document).ready(function () {
    
});



function DisplayXML(ddfXMLFileURL, commonXMLFileUrl) {
    $.ajax({
        type: "GET",
        async: false,
        url: ddfXMLFileURL,
        dataType: "xml",
        success: function (xmlDoc) {
            var $xml = $(xmlDoc);
            var $items = $xml.find('Item');

            $items.each(function () {
                var source = $(this).find('Source').text();
                var mo_id = $(this).find('MOIdentifier').text();
                var mo_index = $(this).find('MOIndex').text();
                var subgroup = $(this).find('SubGroup').text();
                var owner = $(this).find('Owner').text();
                var version = $(this).find('Ver').text();
                var ddf = $(this).find('DDF').text();
                var spec = $(this).find('TS').text();
                var description = $(this).find('Description').text();

                if (source.replace(/\s/g, '') === "" || source === "0") {
                    var $tableselected = $("#thirdpartyobjects_tbl");
                } else if (source > 0) {
                    var $tableselected = $("#publicobjects_tbl");
                }
                
                $tableselected.find('tbody').append(
                    '<tr>' +
                        '<td style="width: 143px">' +
                            mo_id +
                        '</td>' +
                        '<td>' +
                            mo_index +
                        '</td>' +
                        '<td>' +
                            subgroup +
                        '</td>' + 
                        '<td>' +
                            owner +
                        '</td>' +
                        '<td>' +
                            version +
                        '</td>' +
                        '<td>' +
                            ((ddf) ? '<a href="' + ddf + '" title="download document">' + ddf + '</a>' : '&nbsp;') +
                        '</td>' +
                        '<td>' +
                            ((spec) ? '<a href="' + spec + '" title="download document">' + spec + '</a>' : '&nbsp;') +
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