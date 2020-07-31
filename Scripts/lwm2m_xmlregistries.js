/* exported DisplayXML */
function DisplayXML(branchOrReleaseTagName, ddfXMLFileURL, reservedXMLFileUrl, commonXMLFileUrl) {
  // Load the DDF.xml data and fill in the OMA Objects, 3rd Party Objects and Individuals Objects tables

  // Get the working path of the repository for the relevant DDF
  // var urlPath = ddfXMLFileURL.substring(0, ddfXMLFileURL.lastIndexOf('/')) + "/";
  let urlPath = '';
  const urlPathArray = ddfXMLFileURL.split('/');
  if (urlPathArray[0].startsWith('http')) {
    for (let i = 0; i < urlPathArray.length - 2; i += 1) {
      urlPath += urlPathArray[i];
      urlPath += '/';
    }
  } else {
    throw new Error('Path for DDF.xml is wrong. It should be a full web URL beginning with HTTP or HTTPS');
  }

  // Clear the tables
  const $tableselectedArray = [$('#omaobjects_tbl'), $('#thirdpartyobjects_tbl'), $('#publicobjects_tbl')];

  // Clear the tables
  $tableselectedArray.forEach(($table) => {
    $table.find('tbody').replaceWith('<tbody><tr><td>...Loading</td></tr></tbody>');
  });

  $.ajax({
    type: 'GET',
    async: false,
    url: ddfXMLFileURL,
    dataType: 'xml',
    success(xmlDoc) {
      const $xml = $(xmlDoc);
      const $items = $xml.find('Item');

      // Clear the tables
      let $tableselected = $('#omaobjects_tbl');
      $tableselected.find('tbody').replaceWith('<tbody></tbody>');
      $tableselected = $('#thirdpartyobjects_tbl');
      $tableselected.find('tbody').replaceWith('<tbody></tbody>');
      $tableselected = $('#publicobjects_tbl');
      $tableselected.find('tbody').replaceWith('<tbody></tbody>');

      $items.each(function () {
        const urn = $(this).find('URN').text();
        const objectID = $(this).find('ObjectID').text();
        const ddfLink = $(this).find('DDFLink').text();
        // var ddfURL = location.protocol + '//' + window.location.href.substring(0, window.location.href.lastIndexOf('/')) + '/lwm2m-registry/' + $(this).find('DDF').text();
        let ddfURL = $(this).find('DDF').text();
        const tsLink = $(this).find('TSLink').text();
        const tsURL = $(this).find('TS').text();
        const name = $(this).find('Name').text();
        const owner = $(this).find('Owner').text();
        const description = $(this).find('Description').text();

        const splitURN = urn.split(':');
        const urnSource = splitURN[3];

        const ddfUrlParts = ddfURL.split('/');
        if (ddfUrlParts.length === 1) {
          ddfURL = `${branchOrReleaseTagName}/${ddfURL}`;
        } else if (ddfUrlParts[0] === 'snapshots') {
          ddfURL = `${branchOrReleaseTagName}/${ddfURL}`;
        }

        if (!urnSource || urnSource === 'oma') {
          // OMA Objects
          $tableselected = $('#omaobjects_tbl');
          ddfURL = urlPath + ddfURL;
        } else if (urnSource === 'ext') {
          $tableselected = $('#thirdpartyobjects_tbl');
          ddfURL = urlPath + ddfURL;
        } else if (urnSource === 'x') {
          $tableselected = $('#publicobjects_tbl');
          ddfURL = urlPath + ddfURL;
        }

        $tableselected.find('tbody').append(
          `<tr>
            <!-- // URN / Versiona-->
            <td style="width: 143px">
          ${urn}</td>
            <!-- // ObjectID / xml -->
            <td>${ddfLink > 0 ? `<a href="${ddfURL}" title="download xml file">${objectID}</a>` : objectID}</td>
            <!-- // LwM2M Editor -->
            <td>${
              ddfLink > 0
                ? `<a href="http://devtoolkit.openmobilealliance.org/OEditor/LWMOView?url=${encodeURIComponent(
                    ddfURL
                  )}" title="call the Editor">${objectID}</a>`
                : objectID
            }</td> +
            <td style="width:15%">${name}</td>
            <!-- // TS & Vorto links -->
            <td style="width:10%; text-align: center">${
              tsLink > 0
                ? `<a href="${tsURL}" title="download document">
                  <img src="../../Images/Windows_download.gif" alt="Download TS"></img>
                  </a>`
                : '-'
            }</td>${urnSource === 'ext' || urnSource === 'x' ? `<td>${owner}</td>` : ''}<td>
            <p>${description}</p>
            </td>
            </tr>`
        );
      });
    },
    error(request, textStatus, errorThrown) {
      console.debug('request', request);
      console.debug('textStatus', textStatus);
      console.debug('errorThrown', errorThrown);
      handleError(request, textStatus, `Unable to load DDF:\n${errorThrown}`);
      // $('#errors').append(`Unable to load DDF:\n${JSON.stringify(err)}`);

      for (let i = 0; i < $tableselectedArray.length; i += 1) {
        $tableselectedArray[i].find('tbody').replaceWith('<tbody></tbody>');
        $tableselectedArray[i].find('tbody').append(
          `<tr>
            <!-- URN / Version -->
            <td style="width: 143px">
            Error: Unable to load document ${ddfXMLFileURL}</td>
            <!-- // ObjectID / xml -->
            <td>
            Error: Unable to load document: ${ddfXMLFileURL}</td>
            <!-- // LwM2M Editor -->
            <td>
            Error: Unable to load document: ${ddfXMLFileURL}</td>
            <td style="width:15%">
            Error: Unable to load document: ${ddfXMLFileURL}</td>
            <!-- // TS & Vorto links -->
            <td style="width:10%; text-align: center">
            Error: Unable to load document: ${ddfXMLFileURL}</td>
            <td>
            Error: Unable to load document: ${ddfXMLFileURL}</td>
            </tr>`
        );
      }
    },
  });

  // Load the reserved.xml data and fill in the reserved objects table
  $.ajax({
    type: 'GET',
    async: false,
    url: reservedXMLFileUrl,
    dataType: 'xml',
    success(xmlDoc) {
      const $xml = $(xmlDoc);
      const $items = $xml.find('Item');

      const $tableselected = $('#reservedobjects_tbl');
      $tableselected.find('tbody').replaceWith('<tbody></tbody>');

      $items.each(function () {
        const objectIDStartRange = $(this).find('ObjectIDStartRange').text();
        const objectIDEndRange = $(this).find('ObjectIDEndRange').text();
        const company = $(this).find('Company').text();

        let objectIDRange = `${objectIDStartRange} - ${objectIDEndRange}`;
        if (objectIDStartRange === objectIDEndRange || !objectIDEndRange) {
          objectIDRange = objectIDStartRange;
        }

        $tableselected.find('tbody').append(`<tr><td>${objectIDRange}</td><td>${company}</td></tr>`);
      });
    },
    error(request, textStatus, errorThrown) {
      handleError(request, textStatus, `Unable to load reserved XML:\n${errorThrown}`);
      // $('#errors').append(`Unable to load reserved XML:\n${JSON.stringify(err)}`);
    },
  });

  // Load the common.xml data and fill in the common objects table
  $.ajax({
    type: 'GET',
    async: false,
    url: commonXMLFileUrl,
    dataType: 'xml',
    success(xmlDoc) {
      const $xml = $(xmlDoc);
      const $items = $xml.find('Item');

      const $tableselected = $('#commonobjects_tbl');
      $tableselected.find('tbody').replaceWith('<tbody></tbody>');

      $items.each(function () {
        const resourceID = $(this).attr('ID');
        const resourceName = $(this).find('Name').text();
        const accessType = $(this).find('Operations').text();
        const multipleInstance = $(this).find('MultipleInstances').text();
        const mandatory = $(this).find('Mandatory').text();
        const type = $(this).find('Type').text();
        const range = $(this).find('RangeEnumeration').text();
        const units = $(this).find('Units').text();
        const submitter = $(this).find('Submitter').text();
        const description = $(this).find('Description').text();
        const tsURL = $(this).find('TS').text();
        const tsLink = $(this).find('TSLink').text();

        $tableselected.find('tbody').append(
          `<tr><td>${resourceID}</td>
            <td>${tsLink > 0 ? `<a href="${tsURL}">${resourceName}</a>` : resourceName}</td>
            <td>${accessType}</td>
            <td>${type}</td>
            <td>${range || '-'}</td>
            <td>${units || '-'}</td>
            <td>${submitter || '-'}</td>
            <td>
            <p>${description}</p>
            </td>
            </tr>`
          // `<tr><td>${resourceID}</td>
          // <td>${tsLink > 0 ? `<a href="${tsURL}">${resourceName}</a>` : resourceName}</td>
          // <td>${accessType}</td>
          // // https://helpdesk.openmobilealliance.org/browse/OPEN-1694
          // // Removed for ticket request
          // // '<td>' +
          // //    ((multipleInstance) ? multipleInstance : '-') +
          // // '</td>' +
          // // '<td>' +
          // //    ((mandatory) ? mandatory : '-') +
          // // '</td>' +
          // <td>${type}</td>
          // <td>${range || '-'}</td>
          // <td>${units || '-'}</td>
          // <td>${submitter || '-'}</td>
          // <td>
          // <p>${description}</p>
          // </td>
          // </tr>`
        );
      });
    },
    error(request, textStatus, errorThrown) {
      handleError(request, textStatus, `Unable to load common object XML:\n${errorThrown}`);

      // $('#errors').append(`Unable to load common object XML:\n${JSON.stringify(errorThrown)}`);

      const $tableselected = $('#commonobjects_tbl');
      $tableselected.find('tbody').replaceWith('<tbody></tbody>');
      $tableselected.find('tbody').append(
        `<tr><td>Error: Unable to load document: ${commonXMLFileUrl}</td>
          <td>
          Error: Unable to load document: ${commonXMLFileUrl}</td>
          <td>
          Error: Unable to load document: ${commonXMLFileUrl}</td>
          <td>
          Error: Unable to load document: ${commonXMLFileUrl}</td>
          <td>
          Error: Unable to load document: ${commonXMLFileUrl}</td>
          <td>
          Error: Unable to load document: ${commonXMLFileUrl}</td>
          <td>
          Error: Unable to load document: ${commonXMLFileUrl}</td>
          <td>
          Error: Unable to load document: ${commonXMLFileUrl}</td>
          </tr>`
        // `<tr><td>Error: Unable to load document: ${commonXMLFileUrl}</td>
        // <td>
        // Error: Unable to load document: ${commonXMLFileUrl}</td>
        // <td>
        // Error: Unable to load document: ${commonXMLFileUrl}</td>
        // // https://helpdesk.openmobilealliance.org/browse/OPEN-1694
        // // Removed for ticket request
        // // '<td>' +
        // //    ((multipleInstance) ? multipleInstance : '-') +
        // // '</td>' +
        // // '<td>' +
        // //    ((mandatory) ? mandatory : '-') +
        // // '</td>' +
        // <td>
        // Error: Unable to load document: ${commonXMLFileUrl}</td>
        // <td>
        // Error: Unable to load document: ${commonXMLFileUrl}</td>
        // <td>
        // Error: Unable to load document: ${commonXMLFileUrl}</td>
        // <td>
        // Error: Unable to load document: ${commonXMLFileUrl}</td>
        // <td>
        // Error: Unable to load document: ${commonXMLFileUrl}</td>
        // </tr>`
      );
    },
  });
}
