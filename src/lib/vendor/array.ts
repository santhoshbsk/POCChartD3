//extension methods

if (typeof Array !== 'undefined') {

  if (typeof Array.prototype['where'] !== 'function') {
    Array.prototype['where'] = function (predicate) {
      var arr = new Array();
      for (var i = 0; i < this.length; i++) {
        if (predicate(this[i])) {
          arr.push(this[i]);
        }
      }
      return arr;
    };
  }

  if (typeof Array.prototype['select'] !== 'function') {
    Array.prototype['select'] = function (action) {
      var arr = new Array();
      for (var i = 0; i < this.length; i++) {
        arr.push(action(this[i]));
      }
      return arr;
    };
  }


}

