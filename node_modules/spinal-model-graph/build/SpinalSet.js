"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _spinalCoreConnectorjs = _interopRequireDefault(require("spinal-core-connectorjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright 2018 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */
const globalType = typeof window === "undefined" ? global : window;

class SpinalSet extends globalType.Model {
  /**
   * Constructor for the SpinalSet class.
   */
  constructor() {
    super();
  }
  /**
   * Appends a new element with the given value to the set.
   * @param {String} value Value to store in the set
   */


  add(value) {
    this.mod_attr(value, 0);
  }
  /**
   * Returns a boolean asserting whether the value is in the set or not.
   * @param {String} value Value
   * @returns {Boolean} Return true if the value exists
   */


  has(value) {
    return this.hasOwnProperty(value);
  }
  /**
   * Returns an array that contains all the values of the set.
   * @returns {Array<String>} Array containing all the values in the set
   */


  values() {
    return this._attribute_names;
  }
  /**
   * Deletes an element.
   * @param {String} value Value to delete
   */


  delete(value) {
    this.rem_attr(value);
  }
  /**
   * Deletes all values in the set.
   */


  clear() {
    let values = this.values();

    while (values[0]) {
      this.delete(values[0]);
    }
  }
  /**
   * Returns the number of values in the set.
   * @return {Number} Number of values in the set
   */


  size() {
    return this._attribute_names.length;
  }
  /**
   * Applies a function to each of the values in the set.
   * @param {function} fun Funcion to apply
   */


  forEach(fun) {
    for (let i = 0; i < this._attribute_names.length; i++) {
      let value = this._attribute_names[i];
      fun(value);
    }
  }
  /**
   * Function to iterate over the set object.
   */


  *[Symbol.iterator]() {
    let values = this._attribute_names;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        let value = _step.value;
        yield value;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

}

_spinalCoreConnectorjs.default.register_models([SpinalSet]);

var _default = SpinalSet;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxTZXQuanMiXSwibmFtZXMiOlsiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlNwaW5hbFNldCIsIk1vZGVsIiwiY29uc3RydWN0b3IiLCJhZGQiLCJ2YWx1ZSIsIm1vZF9hdHRyIiwiaGFzIiwiaGFzT3duUHJvcGVydHkiLCJ2YWx1ZXMiLCJfYXR0cmlidXRlX25hbWVzIiwiZGVsZXRlIiwicmVtX2F0dHIiLCJjbGVhciIsInNpemUiLCJsZW5ndGgiLCJmb3JFYWNoIiwiZnVuIiwiaSIsIlN5bWJvbCIsIml0ZXJhdG9yIiwic3BpbmFsQ29yZSIsInJlZ2lzdGVyX21vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQXVCQTs7OztBQXZCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsTUFBTUEsVUFBVSxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUE1RDs7QUFFQSxNQUFNRSxTQUFOLFNBQXdCSCxVQUFVLENBQUNJLEtBQW5DLENBQXlDO0FBQ3ZDOzs7QUFHQUMsRUFBQUEsV0FBVyxHQUFHO0FBQ1o7QUFDRDtBQUVEOzs7Ozs7QUFJQUMsRUFBQUEsR0FBRyxDQUFDQyxLQUFELEVBQVE7QUFDVCxTQUFLQyxRQUFMLENBQWNELEtBQWQsRUFBcUIsQ0FBckI7QUFDRDtBQUVEOzs7Ozs7O0FBS0FFLEVBQUFBLEdBQUcsQ0FBQ0YsS0FBRCxFQUFRO0FBQ1QsV0FBTyxLQUFLRyxjQUFMLENBQW9CSCxLQUFwQixDQUFQO0FBQ0Q7QUFFRDs7Ozs7O0FBSUFJLEVBQUFBLE1BQU0sR0FBRztBQUNQLFdBQU8sS0FBS0MsZ0JBQVo7QUFDRDtBQUVEOzs7Ozs7QUFJQUMsRUFBQUEsTUFBTSxDQUFDTixLQUFELEVBQVE7QUFDWixTQUFLTyxRQUFMLENBQWNQLEtBQWQ7QUFDRDtBQUVEOzs7OztBQUdBUSxFQUFBQSxLQUFLLEdBQUc7QUFDTixRQUFJSixNQUFNLEdBQUcsS0FBS0EsTUFBTCxFQUFiOztBQUVBLFdBQU9BLE1BQU0sQ0FBQyxDQUFELENBQWIsRUFBa0I7QUFDaEIsV0FBS0UsTUFBTCxDQUFZRixNQUFNLENBQUMsQ0FBRCxDQUFsQjtBQUNEO0FBQ0Y7QUFFRDs7Ozs7O0FBSUFLLEVBQUFBLElBQUksR0FBRztBQUNMLFdBQU8sS0FBS0osZ0JBQUwsQ0FBc0JLLE1BQTdCO0FBQ0Q7QUFFRDs7Ozs7O0FBSUFDLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBRCxFQUFNO0FBQ1gsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtSLGdCQUFMLENBQXNCSyxNQUExQyxFQUFrREcsQ0FBQyxFQUFuRCxFQUF1RDtBQUNyRCxVQUFJYixLQUFLLEdBQUcsS0FBS0ssZ0JBQUwsQ0FBc0JRLENBQXRCLENBQVo7QUFDQUQsTUFBQUEsR0FBRyxDQUFDWixLQUFELENBQUg7QUFDRDtBQUNGO0FBRUQ7Ozs7O0FBR0EsSUFBRWMsTUFBTSxDQUFDQyxRQUFULElBQXFCO0FBQ25CLFFBQUlYLE1BQU0sR0FBRyxLQUFLQyxnQkFBbEI7QUFEbUI7QUFBQTtBQUFBOztBQUFBO0FBR25CLDJCQUFrQkQsTUFBbEIsOEhBQTBCO0FBQUEsWUFBakJKLEtBQWlCO0FBQ3hCLGNBQU1BLEtBQU47QUFDRDtBQUxrQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTXBCOztBQWhGc0M7O0FBbUZ6Q2dCLCtCQUFXQyxlQUFYLENBQTJCLENBQUNyQixTQUFELENBQTNCOztlQUNlQSxTIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4IFNwaW5hbENvbSAtIHd3dy5zcGluYWxjb20uY29tXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgU3BpbmFsQ29yZS5cbiAqXG4gKiBQbGVhc2UgcmVhZCBhbGwgb2YgdGhlIGZvbGxvd2luZyB0ZXJtcyBhbmQgY29uZGl0aW9uc1xuICogb2YgdGhlIEZyZWUgU29mdHdhcmUgbGljZW5zZSBBZ3JlZW1lbnQgKFwiQWdyZWVtZW50XCIpXG4gKiBjYXJlZnVsbHkuXG4gKlxuICogVGhpcyBBZ3JlZW1lbnQgaXMgYSBsZWdhbGx5IGJpbmRpbmcgY29udHJhY3QgYmV0d2VlblxuICogdGhlIExpY2Vuc2VlIChhcyBkZWZpbmVkIGJlbG93KSBhbmQgU3BpbmFsQ29tIHRoYXRcbiAqIHNldHMgZm9ydGggdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zIHRoYXQgZ292ZXJuIHlvdXJcbiAqIHVzZSBvZiB0aGUgUHJvZ3JhbS4gQnkgaW5zdGFsbGluZyBhbmQvb3IgdXNpbmcgdGhlXG4gKiBQcm9ncmFtLCB5b3UgYWdyZWUgdG8gYWJpZGUgYnkgYWxsIHRoZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMgc3RhdGVkIG9yIHJlZmVyZW5jZWQgaGVyZWluLlxuICpcbiAqIElmIHlvdSBkbyBub3QgYWdyZWUgdG8gYWJpZGUgYnkgdGhlc2UgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zLCBkbyBub3QgZGVtb25zdHJhdGUgeW91ciBhY2NlcHRhbmNlIGFuZCBkb1xuICogbm90IGluc3RhbGwgb3IgdXNlIHRoZSBQcm9ncmFtLlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbG9uZ1xuICogd2l0aCB0aGlzIGZpbGUuIElmIG5vdCwgc2VlXG4gKiA8aHR0cDovL3Jlc291cmNlcy5zcGluYWxjb20uY29tL2xpY2Vuc2VzLnBkZj4uXG4gKi9cbmltcG9ydCBzcGluYWxDb3JlIGZyb20gXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc1wiO1xuXG5jb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcblxuY2xhc3MgU3BpbmFsU2V0IGV4dGVuZHMgZ2xvYmFsVHlwZS5Nb2RlbCB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFNwaW5hbFNldCBjbGFzcy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogQXBwZW5kcyBhIG5ldyBlbGVtZW50IHdpdGggdGhlIGdpdmVuIHZhbHVlIHRvIHRoZSBzZXQuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBWYWx1ZSB0byBzdG9yZSBpbiB0aGUgc2V0XG4gICAqL1xuICBhZGQodmFsdWUpIHtcbiAgICB0aGlzLm1vZF9hdHRyKHZhbHVlLCAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgYm9vbGVhbiBhc3NlcnRpbmcgd2hldGhlciB0aGUgdmFsdWUgaXMgaW4gdGhlIHNldCBvciBub3QuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBWYWx1ZVxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIGV4aXN0c1xuICAgKi9cbiAgaGFzKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzT3duUHJvcGVydHkodmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gYXJyYXkgdGhhdCBjb250YWlucyBhbGwgdGhlIHZhbHVlcyBvZiB0aGUgc2V0LlxuICAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gQXJyYXkgY29udGFpbmluZyBhbGwgdGhlIHZhbHVlcyBpbiB0aGUgc2V0XG4gICAqL1xuICB2YWx1ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dHJpYnV0ZV9uYW1lcztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGVzIGFuIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBWYWx1ZSB0byBkZWxldGVcbiAgICovXG4gIGRlbGV0ZSh2YWx1ZSkge1xuICAgIHRoaXMucmVtX2F0dHIodmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYWxsIHZhbHVlcyBpbiB0aGUgc2V0LlxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgbGV0IHZhbHVlcyA9IHRoaXMudmFsdWVzKCk7XG5cbiAgICB3aGlsZSAodmFsdWVzWzBdKSB7XG4gICAgICB0aGlzLmRlbGV0ZSh2YWx1ZXNbMF0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgdmFsdWVzIGluIHRoZSBzZXQuXG4gICAqIEByZXR1cm4ge051bWJlcn0gTnVtYmVyIG9mIHZhbHVlcyBpbiB0aGUgc2V0XG4gICAqL1xuICBzaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9hdHRyaWJ1dGVfbmFtZXMubGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgYSBmdW5jdGlvbiB0byBlYWNoIG9mIHRoZSB2YWx1ZXMgaW4gdGhlIHNldC5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuIEZ1bmNpb24gdG8gYXBwbHlcbiAgICovXG4gIGZvckVhY2goZnVuKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9hdHRyaWJ1dGVfbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCB2YWx1ZSA9IHRoaXMuX2F0dHJpYnV0ZV9uYW1lc1tpXTtcbiAgICAgIGZ1bih2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRvIGl0ZXJhdGUgb3ZlciB0aGUgc2V0IG9iamVjdC5cbiAgICovXG4gICpbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICBsZXQgdmFsdWVzID0gdGhpcy5fYXR0cmlidXRlX25hbWVzO1xuXG4gICAgZm9yIChsZXQgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICB5aWVsZCB2YWx1ZTtcbiAgICB9XG4gIH1cbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW1NwaW5hbFNldF0pO1xuZXhwb3J0IGRlZmF1bHQgU3BpbmFsU2V0O1xuIl19