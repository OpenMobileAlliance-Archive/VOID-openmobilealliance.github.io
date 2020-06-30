/* exported getRepositoryInfo */
function getRepositoryInfo(owner, repo, setSelectedOption) {
  const releasesUrl = `https://api.github.com/repos/${owner}/${repo}/releases`;
  const branchesUrl = `https://api.github.com/repos/${owner}/${repo}/branches`;

  // Get the release urls
  $.ajax({
    type: 'GET',
    async: false,
    url: releasesUrl,
    dataType: 'json',
    success(releases) {
      releases.forEach((release) => {
        const tagName = release.tag_name;
        const tagFullName = release.name;

        const branchUrl = `https://raw.githubusercontent.com/OpenMobileAlliance/ignore-lwm2m-registry/${tagName}`;

        const $branchSelector = $('#branch-selector-dd');

        $branchSelector.append($('<option/>').val(branchUrl).text(`Release - ${tagFullName}`));
      });
    },
  });

  // Get the branch urls
  $.ajax({
    type: 'GET',
    async: false,
    url: branchesUrl,
    dataType: 'json',
    success(branches) {
      branches.forEach((branch) => {
        const branchName = branch.name;

        const branchUrl = `https://raw.githubusercontent.com/OpenMobileAlliance/ignore-lwm2m-registry/${branchName}`;

        const $branchSelector = $('#branch-selector-dd');

        $branchSelector.append($('<option/>').val(branchUrl).text(branchName));
      });

      setSelectedOption();
    },
  });
}
