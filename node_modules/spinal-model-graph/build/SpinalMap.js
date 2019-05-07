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

class SpinalMap extends globalType.Model {
  /**
   * Constructor for the SpinalMap class.
   */
  constructor() {
    super();
  }
  /**
   * Sets the value corresponding to the key.
   * @param {String} key Key to the value
   * @param {*} value New value
   */


  setElement(key, value) {
    this.rem_attr(key);
    const attribute = {};
    attribute[key] = value;
    this.add_attr(attribute);
  }
  /**
   * Returns the value associated to the key, or undefined if there is none.
   * @param {String} key Key to the value
   * @returns {*} Value corresponding to the key
   */


  getElement(key) {
    return this[key];
  }
  /**
   * Returns a boolean asserting whether a value has been associated to the key or not.
   * @param key Key
   * @returns {Boolean} Return true if the key exists
   */


  has(key) {
    return this._attribute_names.includes(key);
  }
  /**
   * Returns a boolean asserting whether the map contains any key.
   * @returns {Boolean} Return true if the map contains at least one key
   */


  hasKey() {
    return this._attribute_names.length > 0;
  }
  /**
   * Returns an array that contains the keys for each element in the map in insertion order.
   * @returns {Array<String>} Array containing all the keys in the map
   */


  keys() {
    return this._attribute_names;
  }
  /**
   * Deletes an element.
   * @param key Key of the element
   */


  delete(key) {
    this.rem_attr(key);
  }
  /**
   * Deletes all elements.
   */


  clear() {
    let keys = this.keys();

    while (keys[0]) {
      this.delete(keys[0]);
    }
  }
  /**
   * Applies a function to each of the values in the map.
   * @param {function} fun Funcion to apply
   */


  forEach(fun) {
    for (let i = 0; i < this._attribute_names.length; i++) {
      let name = this._attribute_names[i];
      fun(this[name]);
    }
  }
  /**
   * Function to iterate over the map object.
   */


  *[Symbol.iterator]() {
    const keys = this.keys();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        let key = _step.value;
        yield this[key];
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

_spinalCoreConnectorjs.default.register_models([SpinalMap]);

var _default = SpinalMap;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxNYXAuanMiXSwibmFtZXMiOlsiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlNwaW5hbE1hcCIsIk1vZGVsIiwiY29uc3RydWN0b3IiLCJzZXRFbGVtZW50Iiwia2V5IiwidmFsdWUiLCJyZW1fYXR0ciIsImF0dHJpYnV0ZSIsImFkZF9hdHRyIiwiZ2V0RWxlbWVudCIsImhhcyIsIl9hdHRyaWJ1dGVfbmFtZXMiLCJpbmNsdWRlcyIsImhhc0tleSIsImxlbmd0aCIsImtleXMiLCJkZWxldGUiLCJjbGVhciIsImZvckVhY2giLCJmdW4iLCJpIiwibmFtZSIsIlN5bWJvbCIsIml0ZXJhdG9yIiwic3BpbmFsQ29yZSIsInJlZ2lzdGVyX21vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQXVCQTs7OztBQXZCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsTUFBTUEsVUFBVSxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUE1RDs7QUFFQSxNQUFNRSxTQUFOLFNBQXdCSCxVQUFVLENBQUNJLEtBQW5DLENBQXlDO0FBQ3ZDOzs7QUFHQUMsRUFBQUEsV0FBVyxHQUFHO0FBQ1o7QUFDRDtBQUVEOzs7Ozs7O0FBS0FDLEVBQUFBLFVBQVUsQ0FBQ0MsR0FBRCxFQUFNQyxLQUFOLEVBQWE7QUFDckIsU0FBS0MsUUFBTCxDQUFjRixHQUFkO0FBQ0EsVUFBTUcsU0FBUyxHQUFHLEVBQWxCO0FBQ0FBLElBQUFBLFNBQVMsQ0FBQ0gsR0FBRCxDQUFULEdBQWlCQyxLQUFqQjtBQUVBLFNBQUtHLFFBQUwsQ0FBY0QsU0FBZDtBQUNEO0FBRUQ7Ozs7Ozs7QUFLQUUsRUFBQUEsVUFBVSxDQUFDTCxHQUFELEVBQU07QUFDZCxXQUFPLEtBQUtBLEdBQUwsQ0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7QUFLQU0sRUFBQUEsR0FBRyxDQUFDTixHQUFELEVBQU07QUFDUCxXQUFPLEtBQUtPLGdCQUFMLENBQXNCQyxRQUF0QixDQUErQlIsR0FBL0IsQ0FBUDtBQUNEO0FBRUQ7Ozs7OztBQUlBUyxFQUFBQSxNQUFNLEdBQUc7QUFDUCxXQUFPLEtBQUtGLGdCQUFMLENBQXNCRyxNQUF0QixHQUErQixDQUF0QztBQUNEO0FBRUQ7Ozs7OztBQUlBQyxFQUFBQSxJQUFJLEdBQUc7QUFDTCxXQUFPLEtBQUtKLGdCQUFaO0FBQ0Q7QUFFRDs7Ozs7O0FBSUFLLEVBQUFBLE1BQU0sQ0FBQ1osR0FBRCxFQUFNO0FBQ1YsU0FBS0UsUUFBTCxDQUFjRixHQUFkO0FBQ0Q7QUFFRDs7Ozs7QUFHQWEsRUFBQUEsS0FBSyxHQUFHO0FBQ04sUUFBSUYsSUFBSSxHQUFHLEtBQUtBLElBQUwsRUFBWDs7QUFFQSxXQUFPQSxJQUFJLENBQUMsQ0FBRCxDQUFYLEVBQWdCO0FBQ2QsV0FBS0MsTUFBTCxDQUFZRCxJQUFJLENBQUMsQ0FBRCxDQUFoQjtBQUNEO0FBQ0Y7QUFFRDs7Ozs7O0FBSUFHLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBRCxFQUFNO0FBQ1gsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtULGdCQUFMLENBQXNCRyxNQUExQyxFQUFrRE0sQ0FBQyxFQUFuRCxFQUF1RDtBQUNyRCxVQUFJQyxJQUFJLEdBQUcsS0FBS1YsZ0JBQUwsQ0FBc0JTLENBQXRCLENBQVg7QUFDQUQsTUFBQUEsR0FBRyxDQUFDLEtBQUtFLElBQUwsQ0FBRCxDQUFIO0FBQ0Q7QUFDRjtBQUVEOzs7OztBQUdBLElBQUVDLE1BQU0sQ0FBQ0MsUUFBVCxJQUFxQjtBQUNuQixVQUFNUixJQUFJLEdBQUcsS0FBS0EsSUFBTCxFQUFiO0FBRG1CO0FBQUE7QUFBQTs7QUFBQTtBQUduQiwyQkFBZ0JBLElBQWhCLDhIQUFzQjtBQUFBLFlBQWJYLEdBQWE7QUFDcEIsY0FBTSxLQUFLQSxHQUFMLENBQU47QUFDRDtBQUxrQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTXBCOztBQTlGc0M7O0FBaUd6Q29CLCtCQUFXQyxlQUFYLENBQTJCLENBQUN6QixTQUFELENBQTNCOztlQUNlQSxTIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4IFNwaW5hbENvbSAtIHd3dy5zcGluYWxjb20uY29tXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgU3BpbmFsQ29yZS5cbiAqXG4gKiBQbGVhc2UgcmVhZCBhbGwgb2YgdGhlIGZvbGxvd2luZyB0ZXJtcyBhbmQgY29uZGl0aW9uc1xuICogb2YgdGhlIEZyZWUgU29mdHdhcmUgbGljZW5zZSBBZ3JlZW1lbnQgKFwiQWdyZWVtZW50XCIpXG4gKiBjYXJlZnVsbHkuXG4gKlxuICogVGhpcyBBZ3JlZW1lbnQgaXMgYSBsZWdhbGx5IGJpbmRpbmcgY29udHJhY3QgYmV0d2VlblxuICogdGhlIExpY2Vuc2VlIChhcyBkZWZpbmVkIGJlbG93KSBhbmQgU3BpbmFsQ29tIHRoYXRcbiAqIHNldHMgZm9ydGggdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zIHRoYXQgZ292ZXJuIHlvdXJcbiAqIHVzZSBvZiB0aGUgUHJvZ3JhbS4gQnkgaW5zdGFsbGluZyBhbmQvb3IgdXNpbmcgdGhlXG4gKiBQcm9ncmFtLCB5b3UgYWdyZWUgdG8gYWJpZGUgYnkgYWxsIHRoZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMgc3RhdGVkIG9yIHJlZmVyZW5jZWQgaGVyZWluLlxuICpcbiAqIElmIHlvdSBkbyBub3QgYWdyZWUgdG8gYWJpZGUgYnkgdGhlc2UgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zLCBkbyBub3QgZGVtb25zdHJhdGUgeW91ciBhY2NlcHRhbmNlIGFuZCBkb1xuICogbm90IGluc3RhbGwgb3IgdXNlIHRoZSBQcm9ncmFtLlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbG9uZ1xuICogd2l0aCB0aGlzIGZpbGUuIElmIG5vdCwgc2VlXG4gKiA8aHR0cDovL3Jlc291cmNlcy5zcGluYWxjb20uY29tL2xpY2Vuc2VzLnBkZj4uXG4gKi9cbmltcG9ydCBzcGluYWxDb3JlIGZyb20gXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc1wiO1xuXG5jb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcblxuY2xhc3MgU3BpbmFsTWFwIGV4dGVuZHMgZ2xvYmFsVHlwZS5Nb2RlbCB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFNwaW5hbE1hcCBjbGFzcy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdmFsdWUgY29ycmVzcG9uZGluZyB0byB0aGUga2V5LlxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IEtleSB0byB0aGUgdmFsdWVcbiAgICogQHBhcmFtIHsqfSB2YWx1ZSBOZXcgdmFsdWVcbiAgICovXG4gIHNldEVsZW1lbnQoa2V5LCB2YWx1ZSkge1xuICAgIHRoaXMucmVtX2F0dHIoa2V5KTtcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSB7fTtcbiAgICBhdHRyaWJ1dGVba2V5XSA9IHZhbHVlO1xuXG4gICAgdGhpcy5hZGRfYXR0cihhdHRyaWJ1dGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIGFzc29jaWF0ZWQgdG8gdGhlIGtleSwgb3IgdW5kZWZpbmVkIGlmIHRoZXJlIGlzIG5vbmUuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgS2V5IHRvIHRoZSB2YWx1ZVxuICAgKiBAcmV0dXJucyB7Kn0gVmFsdWUgY29ycmVzcG9uZGluZyB0byB0aGUga2V5XG4gICAqL1xuICBnZXRFbGVtZW50KGtleSkge1xuICAgIHJldHVybiB0aGlzW2tleV07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGJvb2xlYW4gYXNzZXJ0aW5nIHdoZXRoZXIgYSB2YWx1ZSBoYXMgYmVlbiBhc3NvY2lhdGVkIHRvIHRoZSBrZXkgb3Igbm90LlxuICAgKiBAcGFyYW0ga2V5IEtleVxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJuIHRydWUgaWYgdGhlIGtleSBleGlzdHNcbiAgICovXG4gIGhhcyhrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5fYXR0cmlidXRlX25hbWVzLmluY2x1ZGVzKGtleSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGJvb2xlYW4gYXNzZXJ0aW5nIHdoZXRoZXIgdGhlIG1hcCBjb250YWlucyBhbnkga2V5LlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJuIHRydWUgaWYgdGhlIG1hcCBjb250YWlucyBhdCBsZWFzdCBvbmUga2V5XG4gICAqL1xuICBoYXNLZXkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dHJpYnV0ZV9uYW1lcy5sZW5ndGggPiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gYXJyYXkgdGhhdCBjb250YWlucyB0aGUga2V5cyBmb3IgZWFjaCBlbGVtZW50IGluIHRoZSBtYXAgaW4gaW5zZXJ0aW9uIG9yZGVyLlxuICAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gQXJyYXkgY29udGFpbmluZyBhbGwgdGhlIGtleXMgaW4gdGhlIG1hcFxuICAgKi9cbiAga2V5cygpIHtcbiAgICByZXR1cm4gdGhpcy5fYXR0cmlidXRlX25hbWVzO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYW4gZWxlbWVudC5cbiAgICogQHBhcmFtIGtleSBLZXkgb2YgdGhlIGVsZW1lbnRcbiAgICovXG4gIGRlbGV0ZShrZXkpIHtcbiAgICB0aGlzLnJlbV9hdHRyKGtleSk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBhbGwgZWxlbWVudHMuXG4gICAqL1xuICBjbGVhcigpIHtcbiAgICBsZXQga2V5cyA9IHRoaXMua2V5cygpO1xuXG4gICAgd2hpbGUgKGtleXNbMF0pIHtcbiAgICAgIHRoaXMuZGVsZXRlKGtleXNbMF0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIGEgZnVuY3Rpb24gdG8gZWFjaCBvZiB0aGUgdmFsdWVzIGluIHRoZSBtYXAuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1biBGdW5jaW9uIHRvIGFwcGx5XG4gICAqL1xuICBmb3JFYWNoKGZ1bikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fYXR0cmlidXRlX25hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgbmFtZSA9IHRoaXMuX2F0dHJpYnV0ZV9uYW1lc1tpXTtcbiAgICAgIGZ1bih0aGlzW25hbWVdKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gdG8gaXRlcmF0ZSBvdmVyIHRoZSBtYXAgb2JqZWN0LlxuICAgKi9cbiAgKltTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgIGNvbnN0IGtleXMgPSB0aGlzLmtleXMoKTtcblxuICAgIGZvciAobGV0IGtleSBvZiBrZXlzKSB7XG4gICAgICB5aWVsZCB0aGlzW2tleV07XG4gICAgfVxuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxNYXBdKTtcbmV4cG9ydCBkZWZhdWx0IFNwaW5hbE1hcDtcbiJdfQ==