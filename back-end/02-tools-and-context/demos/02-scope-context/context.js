
// Global Scope: fn x,
// fn x Scope: var y,


function x(z) {
  var y = 25;
  z = 25;
}

y = 15;

x();

var a = function b() {

}