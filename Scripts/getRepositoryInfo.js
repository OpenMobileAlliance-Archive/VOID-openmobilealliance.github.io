/* exported getRepositoryInfo */
function getRepositoryInfo(owner, repo, setSelectedOption) {
  const { githubAuth } = window.localStorage;

  let githubCreds;
  if (githubAuth) {
    try {
      githubCreds = JSON.parse(githubAuth);
    } catch {}
  }

  const auth = githubCreds && btoa(`${githubCreds.username}:${githubCreds.userAccessToken}`);

  const releasesUrl = `https://api.github.com/repos/${owner}/${repo}/releases`;
  const branchesUrl = `https://api.github.com/repos/${owner}/${repo}/branches`;

  const handleError = (request, textStatus, errorThrow) => {
    const rateLimit = request.getResponseHeader('X-RateLimit-Limit');
    const rateLimitRemaining = request.getResponseHeader('X-RateLimit-Remaining');
    const rateLimitResetTime = request.getResponseHeader('X-RateLimit-Reset');

    const errorMessage = request.responseJSON?.message || errorThrow?.message || errorThrow;

    let rateLimitWillResetAt;
    if (rateLimitResetTime) rateLimitWillResetAt = new Date(rateLimitResetTime * 1000);

    const $errorSelector = $('#errors');
    // Clear the errors so only show one at a time
    $errorSelector.html('');
    const $branchSelector = $('#branch-selector-dd');

    $branchSelector.append($('<option/>').val('').text('Error retrieving data'));

    $errorSelector.append(`${errorMessage}<br/>`);

    if (rateLimitRemaining === '0' && rateLimitWillResetAt)
      $errorSelector.append(`Github API Rate Limit Exceeded.<br/>This will reset at ${rateLimitWillResetAt.toString()}<br/>`);
  };

  const headers = auth && { Authorization: `Basic ${auth}` };

  // Get the release urls
  $.ajax({
    type: 'GET',
    async: false,
    url: releasesUrl,
    headers,
    dataType: 'json',
    success(releaseData, releaseTextStatus, releaseRequest) {
      $('#github-info').html(
        `You have ${releaseRequest.getResponseHeader('X-RateLimit-Remaining')} github API requests remaining. Resets at ${new Date(
          releaseRequest.getResponseHeader('X-RateLimit-Reset') * 1000
        ).toString()}<br/>`
      );
      const releases = releaseData;

      releases.forEach((release) => {
        const tagName = release.tag_name;
        const tagFullName = release.name;

        const branchUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${tagName}`;

        const $branchSelector = $('#branch-selector-dd');

        $branchSelector.append(
          $('<option/>')
            .val(JSON.stringify({ tagName, url: branchUrl }))
            .text(`Release - ${tagFullName}`)
        );
      });

      // Get the branch urls
      $.get({
        type: 'GET',
        async: false,
        url: branchesUrl,
        headers,
        dataType: 'json',
        success(branchesData, branchesTextStatus, branchesRequest) {
          $('#github-info').html(
            `You have ${branchesRequest.getResponseHeader('X-RateLimit-Remaining')} github API requests remaining. Resets at ${new Date(
              branchesRequest.getResponseHeader('X-RateLimit-Reset') * 1000
            ).toString()}<br/>`
          );

          const branches = branchesData;

          branches.forEach((branch) => {
            const branchName = branch.name;

            const branchUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branchName}`;

            const $branchSelector = $('#branch-selector-dd');

            $branchSelector.append(
              $('<option/>')
                .val(JSON.stringify({ branchName, url: branchUrl }))
                .text(`Branch - ${branchName}`)
            );
          });

          setSelectedOption();
        },
        error(request, textStatus, errorThrow) {
          handleError(request, textStatus, errorThrow);
        },
      });
    },
    error(request, textStatus, errorThrow) {
      handleError(request, textStatus, errorThrow);
    },
  });
}
