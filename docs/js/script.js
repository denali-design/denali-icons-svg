(function() {
  var html = document.getElementById('html');
  var renderElm = document.createElement('div');

  function parseUrl() {
    var params = Qs.parse(document.location.search, { ignoreQueryPrefix: true });
    if(params.src) {
      var decompressed = LZString.decompressFromEncodedURIComponent(params.src);
      html.value = decompressed;
    }
  }

  function initPreview() {
    var previewElm = document.querySelector('#preview-container').contentWindow.document;

    var styleElm = document.createElement('style');
    styleElm.innerHTML = '@import url("css/denali.css"); @import url("css/denali-dark-theme.css"); body {background: transparent}';
    previewElm.querySelector('head').appendChild(styleElm);

    renderElm.id = 'render-container';
    renderElm.className = 'denali-default-theme flex align-items-center justify-content-center flex-column';
    renderElm.style = 'height: 100%';
    previewElm.querySelector('body').appendChild(renderElm);
  
    document.body.addEventListener('keyup', updatePreview);
  }

  function updatePreview() {
    renderElm.innerHTML = html.value; 
  }

  function copyCode() {
    html.select();
    html.setSelectionRange(0, 99999);
    document.execCommand('copy');
  }

  function initShareLink() {
    var btn = document.querySelector('#share-link');
    var clipboard = new ClipboardJS(btn, {
      text: function(trigger) {
        var url = new URL(document.location);
        url.search = 'src=' + LZString.compressToEncodedURIComponent(html.value);
        return url;
      }
    });
  }

  parseUrl();
  initPreview();
  updatePreview();
  initShareLink();
})();
