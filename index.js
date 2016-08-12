Array.prototype.zpop = function() {
  return (this.pop()) || 0;
};

function interpret(code) {
  var output = [];
  var stack = [];

  code = code.split('\n').map(function(line) { return line.split(''); });

  var moveRight = function(row, col) { return [row, ++col]; };
  var moveLeft = function(row, col) { return [row, --col]; };
  var moveDown = function(row, col) { return [++row, col]; };
  var moveUp = function(row, col) { return [--row, col]; };
  var move = moveRight;

  var program = {
    "0": function() { stack.push(0); },
    "1": function() { stack.push(1); },
    "2": function() { stack.push(2); },
    "3": function() { stack.push(3); },
    "4": function() { stack.push(4); },
    "5": function() { stack.push(5); },
    "6": function() { stack.push(6); },
    "7": function() { stack.push(7); },
    "8": function() { stack.push(8); },
    "9": function() { stack.push(9); },
    "+": function() { stack.push(stack.zpop() + stack.zpop()); },
    "-": function() { stack.push((-1*stack.zpop()) + stack.zpop()); },
    "*": function() { stack.push((stack.zpop() * stack.zpop())); },
    "/": function() { stack.push(stack.zpop() / stack.zpop()); },
    "%": function() { stack.push(stack.zpop() % stack.zpop()); },
    "!": function() { (!stack.zpop()) ? stack.push(1) : stack.push(0) },
    ">": function() { move = moveRight; },
    "<": function() { move = moveLeft; },
    "^": function() { move = moveUp; },
    "v": function() { move = moveDown; },
    "?": function() { move = [moveUp,moveRight,moveLeft,moveDown][Math.round((Math.random()*3))]; },
    "_": function() { move = (!stack.zpop()) ? moveRight : moveLeft; },
    "|": function() { move = moveUp; if (!stack.zpop()) { move = moveDown; } },
    '"': function() {
      [row, col] = move(row,col);
      var d = code[row][col];
      while(d != "\"") {
        stack.push(d.charCodeAt());
        [row, col] = move(row, col);
        d = code[row][col];
      }
    },
    ":": function() { var d = stack.slice(-1)[0]; if (!d) { d = 0; } stack.push(d); },
    '\\': function() { [stack.zpop(), stack.zpop()].map(function(item) { stack.push(item); return item; }); },
    "$": function() { stack.zpop(); },
    ".": function() { output.push(stack.zpop().toString()); },
    ",": function() { output.push(String.fromCharCode(stack.zpop())); },
    "#": function() { [row, col] = move(row, col); },
    "@": function() { return false; },
    " ": function() {},
    "p": function() {
      var x = stack.zpop();
      var y = stack.zpop();
      var v = stack.zpop();

      code[x][y] = String.fromCharCode(v);
    },
    "g": function() {
      var x = stack.zpop();
      var y = stack.zpop();

      stack.push(code[x][y].charCodeAt());
    },
    "`": function() {
      var a = stack.zpop();
      var b = stack.zpop();

      if (b > a) {
        stack.push(1);
      } else {
        stack.push(0);
      }
    },
  };

  var row = 0,
      col = 0;

  while (program[code[row][col]]() !== false) {
    [row, col] = move(row, col);
  }

  return output.join('');
}


module.exports = interpret;
