describe("Befunge", function() {
  var interpret = require("../");
  it("works", function() {
    expect(interpret('>987v>.v\nv456<  :\n>321 ^ _@')).toEqual("123456789");
  });

  it("say hello", function() {
    expect(interpret('>25*"!dlroW olleH":v\n                v:,_@\n                >  ^ ')).toEqual("Hello World!\n");
  });

  it("solve factorial", function() {
    expect(interpret('48-56-62-58-49-45-58-118-32-118-32-42-95-36-46-64-32-10-32-32-94-32-32-32-32-95-36-62-92-58-94'.split('-').map(function(item) {return String.fromCharCode(item);}).join(''))).toEqual("40320");
  });

  it("quine", function() {
    expect(interpret('01->1# +# :# 0# g# ,# :# 5# 8# *# 4# +# -# _@').charCodeAt()).toEqual(48);
  });

  it("random", function() {
    expect(interpret('v@.<\n >1^\n>?<^\n >2^')).not.toEqual("");
  });

  it("sieve", function() {
    expect(interpret('50-62-58-51-103-34-32-34-45-33-118-92-32-32-103-51-48-32-32-32-32-32-32-32-32-32-32-60-10-32-124-33-96-34-38-34-58-43-49-95-58-46-58-48-51-112-62-48-51-103-43-58-34-38-34-96-124-10-32-64-32-32-32-32-32-32-32-32-32-32-32-32-32-32-32-94-32-32-112-51-92-34-32-34-58-60-10-50-32-50-51-52-53-54-55-56-57-48-49-50-51-52-53-54-55-56-57-48-49-50-51-52-53-54-55-56-57-48-49-50-51-52-53-54-55-56'.split('-').map(function(item) {return String.fromCharCode(item);}).join(''))).toEqual("23571113171923293137");
  });
});
