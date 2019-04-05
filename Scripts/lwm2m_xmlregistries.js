function DisplayXML(ddfXMLFileURL, reservedXMLFileUrl, commonXMLFileUrl) {
    // Load the DDF.xml data and fill in the OMA Objects, 3rd Party Objects and Individuals Objects tables
    $.ajax({
        type: "GET",
        async: false,
        url: ddfXMLFileURL,
        dataType: "xml",
        success: function (xmlDoc) {
            var $xml = $(xmlDoc);
            var $items = $xml.find('Item');

            $items.each(function () {
                var urn = $(this).find('URN').text();
                var objectID = $(this).find('ObjectID').text();
                var ddfLink = $(this).find('DDFLink').text();
                var ddfURL = $(this).find('DDF').text();
                var source = $(this).find('Source').text();
                var tsLink = $(this).find('TSLink').text();
                var tsURL = $(this).find('TS').text();
                var name = $(this).find('Name').text();
                var owner = $(this).find('Owner').text();
                var vortoLink = $(this).find('Vorto').text();
                var description = $(this).find('Description').text();

                if (source.replace(/\s/g,'') === "" || source === "0") {
                    var $tableselected = $("#omaobjects_tbl");
                } else if (source === "1") {
                    var $tableselected = $("#thirdpartyobjects_tbl");
                } else if (source === "2") {
                    var $tableselected = $("#publicobjects_tbl");
                }

                $tableselected.find('tbody').append(
                    '<tr>' +
                    // URN / Version
                        '<td style="width: 143px">' +
                            urn +
                        '</td>' +
                    // ObjectID / xml
                        '<td>' +
                            ((ddfLink > 0) ? '<a href="' + ddfURL + '" title="download xml file">' + objectID + '</a>' : objectID) +
                        '</td>' +
                    // LwM2M Editor
                        '<td>' +
                            ((ddfLink > 0) ? '<a href="http://devtoolkit.openmobilealliance.org/OEditor/LWMOView?url=' + encodeURIComponent(ddfURL) + '" title="call the Editor">' + objectID + '</a>' : objectID) +
                        '</td>' + 
                        '<td style="width:15%">' +
                            name +
                        '</td>' +
                    // TS & Vorto links
                        '<td style="width:10%; text-align: center">' +
                            ((tsLink > 0) ? '<a href="' + tsURL + '" title="download document">' + '<img src="../../Images/Windows_download.gif" alt="Download TS"></img>' + '</a>' : '-') +
                        '</td>' + 
                        '<td style="width:10%; text-align: center">' +
                            ((vortoLink) ? '<a href ="' + vortoLink + '" target="_blank">' + '<img src="http://vorto.eclipse.org/favicon.ico" alt="Vorto Link"></img>' + '</a>' : '-') +
                        '</td>' +
                        ((source === "1" || source === "2") ? '<td>' + owner + '</td>' : '') +
                        '<td>' +
                            '<p>' + description + '</p>' +
                        '</td>' +
                    '</tr>'
                );
            });
        }
    });

// Load the reserved.xml data and fill in the reserved objects table    
    $.ajax({
        type: "GET",
        async: false,
        url: reservedXMLFileUrl,
        dataType: "xml",
        success: function (xmlDoc) {
            var $xml = $(xmlDoc);
            var $items = $xml.find('Item');

            $items.each(function () {                
                var objectIDStartRange = $(this).find('ObjectIDStartRange').text();
                var objectIDEndRange = $(this).find('ObjectIDEndRange').text();
                var company = $(this).find('Company').text();

                var $tableselected = $('#reservedobjects_tbl');
                
                var objectIDRange = objectIDStartRange + ' - ' + objectIDEndRange;
                if (objectIDStartRange === objectIDEndRange || !objectIDEndRange) {
                    objectIDRange = objectIDStartRange;
                }

                $tableselected.find('tbody').append(
                    '<tr>' +
                        '<td>' +
                            objectIDRange +
                        '</td>' +
                        '<td>' +
                            company +
                        '</td>' +                        
                    '</tr>'
                );
            });
        }
    });

// Load the common.xml data and fill in the common objects table    
    $.ajax({
        type: "GET",
        async: false,
        url: commonXMLFileUrl,
        dataType: "xml",
        success: function (xmlDoc) {
            var $xml = $(xmlDoc);
            var $items = $xml.find('Item');

            $items.each(function () {
                var resourceID = $(this).attr('ID');
                var resourceName = $(this).find('Name').text();
                var accessType = $(this).find('Operations').text();
                var multipleInstance = $(this).find('MultipleInstances').text();
                var mandatory = $(this).find('Mandatory').text();
                var type = $(this).find('Type').text();
                var range = $(this).find('RangeEnumeration').text();
                var units = $(this).find('Units').text();
                var submitter = $(this).find('Submitter').text();
                var description = $(this).find('Description').text();
                var tsURL = $(this).find('TS').text();
                var tsLink = $(this).find('TSLink').text();

                var $tableselected = $('#commonobjects_tbl');

                $tableselected.find('tbody').append(
                    '<tr>' +
                        '<td>' +
                            resourceID +
                        '</td>' +
                        '<td>' +
                            ((tsLink > 0) ? '<a href="' + tsURL + '">' + resourceName + '</a>' : resourceName) +
                        '</td>' +
                        '<td>' +
                             accessType +
                        '</td>' +
                        // https://helpdesk.openmobilealliance.org/browse/OPEN-1694
                        // Removed for ticket request
                        //'<td>' +
                        //    ((multipleInstance) ? multipleInstance : '-') +
                        //'</td>' +
                        //'<td>' +
                        //    ((mandatory) ? mandatory : '-') +
                        //'</td>' +
                        '<td>' +
                             type +
                        '</td>' +
                        '<td>' +
                             ((range) ? range : '-') +
                        '</td>' +
                        '<td>' +
                             ((units) ? units : '-') +
                        '</td>' +
                        '<td>' +
                             ((submitter) ? submitter : '-') +
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
