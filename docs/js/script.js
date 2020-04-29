
var html = document.getElementById("html");
var code = document.getElementById("code").contentWindow.document;

function compile() {
    code.open();
    code.writeln(
      "<div style='height: 100%;' class='denali-default-theme flex align-items-center justify-content-center flex-column'>" +
      html.value +
      "</div>" +
      "<style>" +
      "@import url('css/denali.css'); @import url('css/denali-dark-theme.css'); body {background: transparent}</style>"
    );
    code.close();
}

document.body.addEventListener("keyup", compile);

compile();

function copyCode() {
  html.select();
  html.setSelectionRange(0, 99999);
  document.execCommand("copy");
}