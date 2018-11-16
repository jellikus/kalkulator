const esperInst = esper({});

function outf(text) {
  var mypre = document.getElementById("output");
  mypre.innerHTML = mypre.innerHTML + text;
}
function builtinRead(x) {
  if (
    Sk.builtinFiles === undefined ||
    Sk.builtinFiles["files"][x] === undefined
  )
    throw "File not found: '" + x + "'";
  return Sk.builtinFiles["files"][x];
}
Sk.configure({
  output(text) {
    if (text.trim() === "") {
      return;
    }
    let ve = document.getElementById("vysledek");
    ve.innerText = text;
  },
  read(x) {
    if (
      Sk.builtinFiles === undefined ||
      Sk.builtinFiles["files"][x] === undefined
    )
      throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
  }
});

function solveExpression() {
  let vyraz = document.getElementById("vyraz").value;
  switch (document.getElementById("langsel").value) {
    case "esperjs":
      let vysledek = esperInst.eval(vyraz).then(
        res => {
          document.getElementById("vysledek").innerText = res.native;
        },
        err => {}
      );
      break;
    case "skulpt":
      Sk.misceval
        .asyncToPromise(function() {
          return Sk.importMainWithBody(
            "<stdin>",
            false,
            `print(${vyraz})`,
            true
          );
        })
        .then(
          function(mod) {
            console.log("success");
          },
          function(err) {
            console.log(err.toString());
          }
        );
      break;
    default:
      alert("LOLWUT");
  }
}

var input = document.getElementById("vyraz");

input.addEventListener("keyup", function(event) {
  event.preventDefault();
  solveExpression();
});
