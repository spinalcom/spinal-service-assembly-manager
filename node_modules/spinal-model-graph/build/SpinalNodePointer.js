"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _spinalCoreConnectorjs = _interopRequireDefault(require("spinal-core-connectorjs"));

var _SpinalNode = _interopRequireDefault(require("./Nodes/SpinalNode"));

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
/**
 * Wrapper over SpinalNodePointer containing some information about the pointed element
 */

class SpinalNodePointer extends globalType.Model {
  /**
   * Constructor for the SpinalNodePointer class.
   * @param {SpinalNode | Model} element Element to wich the SpinalNodePointer will point
   */
  constructor(element) {
    super();
    this.add_attr({
      ptr: new globalType.Ptr(),
      info: {}
    });

    if (typeof element !== "undefined") {
      this.setElement(element);
    }
  }

  load() {
    if (this.ptr instanceof globalType.Ptr && this.ptr.data.value !== 0 && typeof FileSystem._objects[this.ptr.data.value] !== "undefined") {
      return Promise.resolve(FileSystem._objects[this.ptr.data.value]);
    } else {
      return new Promise(resolve => {
        this.ptr.load(resolve);
      });
    }
  }
  /**
   * Sets pointer to point to an element.
   * @param {SpinalNode | Model} element
   */


  setElement(element) {
    if (element instanceof _SpinalNode.default) {
      this.info.mod_attr("pointedId", element.getId());
      this.info.mod_attr("pointedType", element.getType());
    }

    this.ptr.set(element);
  }
  /**
   * Unsets the pointer.
   */


  unset() {
    this.info.rem_attr("pointedId");
    this.info.rem_attr("pointedType");
    this.ptr.set(0);
  }
  /**
   * Returns the id of the pointed element.
   * @return {Str} Id of the pointed element
   */


  getId() {
    return this.info.pointedId;
  }
  /**
   * This function returns the type of the pointed element.
   * @return {Str} Type of the pointed element
   */


  getType() {
    return this.info.pointedType;
  }

}

_spinalCoreConnectorjs.default.register_models([SpinalNodePointer]);

var _default = SpinalNodePointer;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxOb2RlUG9pbnRlci5qcyJdLCJuYW1lcyI6WyJnbG9iYWxUeXBlIiwid2luZG93IiwiZ2xvYmFsIiwiU3BpbmFsTm9kZVBvaW50ZXIiLCJNb2RlbCIsImNvbnN0cnVjdG9yIiwiZWxlbWVudCIsImFkZF9hdHRyIiwicHRyIiwiUHRyIiwiaW5mbyIsInNldEVsZW1lbnQiLCJsb2FkIiwiZGF0YSIsInZhbHVlIiwiRmlsZVN5c3RlbSIsIl9vYmplY3RzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJTcGluYWxOb2RlIiwibW9kX2F0dHIiLCJnZXRJZCIsImdldFR5cGUiLCJzZXQiLCJ1bnNldCIsInJlbV9hdHRyIiwicG9pbnRlZElkIiwicG9pbnRlZFR5cGUiLCJzcGluYWxDb3JlIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBdUJBOztBQUNBOzs7O0FBeEJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxNQUFNQSxVQUFVLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixHQUFnQ0MsTUFBaEMsR0FBeUNELE1BQTVEO0FBRUE7Ozs7QUFHQSxNQUFNRSxpQkFBTixTQUFnQ0gsVUFBVSxDQUFDSSxLQUEzQyxDQUFpRDtBQUMvQzs7OztBQUlBQyxFQUFBQSxXQUFXLENBQUNDLE9BQUQsRUFBVTtBQUNuQjtBQUVBLFNBQUtDLFFBQUwsQ0FBYztBQUNaQyxNQUFBQSxHQUFHLEVBQUUsSUFBSVIsVUFBVSxDQUFDUyxHQUFmLEVBRE87QUFFWkMsTUFBQUEsSUFBSSxFQUFFO0FBRk0sS0FBZDs7QUFLQSxRQUFJLE9BQU9KLE9BQVAsS0FBbUIsV0FBdkIsRUFBb0M7QUFDbEMsV0FBS0ssVUFBTCxDQUFnQkwsT0FBaEI7QUFDRDtBQUNGOztBQUVETSxFQUFBQSxJQUFJLEdBQUc7QUFDTCxRQUNFLEtBQUtKLEdBQUwsWUFBb0JSLFVBQVUsQ0FBQ1MsR0FBL0IsSUFDQSxLQUFLRCxHQUFMLENBQVNLLElBQVQsQ0FBY0MsS0FBZCxLQUF3QixDQUR4QixJQUVBLE9BQU9DLFVBQVUsQ0FBQ0MsUUFBWCxDQUFvQixLQUFLUixHQUFMLENBQVNLLElBQVQsQ0FBY0MsS0FBbEMsQ0FBUCxLQUFvRCxXQUh0RCxFQUlFO0FBQ0EsYUFBT0csT0FBTyxDQUFDQyxPQUFSLENBQWdCSCxVQUFVLENBQUNDLFFBQVgsQ0FBb0IsS0FBS1IsR0FBTCxDQUFTSyxJQUFULENBQWNDLEtBQWxDLENBQWhCLENBQVA7QUFDRCxLQU5ELE1BTU87QUFDTCxhQUFPLElBQUlHLE9BQUosQ0FBWUMsT0FBTyxJQUFJO0FBQzVCLGFBQUtWLEdBQUwsQ0FBU0ksSUFBVCxDQUFjTSxPQUFkO0FBQ0QsT0FGTSxDQUFQO0FBR0Q7QUFDRjtBQUVEOzs7Ozs7QUFJQVAsRUFBQUEsVUFBVSxDQUFDTCxPQUFELEVBQVU7QUFDbEIsUUFBSUEsT0FBTyxZQUFZYSxtQkFBdkIsRUFBbUM7QUFDakMsV0FBS1QsSUFBTCxDQUFVVSxRQUFWLENBQW1CLFdBQW5CLEVBQWdDZCxPQUFPLENBQUNlLEtBQVIsRUFBaEM7QUFDQSxXQUFLWCxJQUFMLENBQVVVLFFBQVYsQ0FBbUIsYUFBbkIsRUFBa0NkLE9BQU8sQ0FBQ2dCLE9BQVIsRUFBbEM7QUFDRDs7QUFDRCxTQUFLZCxHQUFMLENBQVNlLEdBQVQsQ0FBYWpCLE9BQWI7QUFDRDtBQUVEOzs7OztBQUdBa0IsRUFBQUEsS0FBSyxHQUFHO0FBQ04sU0FBS2QsSUFBTCxDQUFVZSxRQUFWLENBQW1CLFdBQW5CO0FBQ0EsU0FBS2YsSUFBTCxDQUFVZSxRQUFWLENBQW1CLGFBQW5CO0FBQ0EsU0FBS2pCLEdBQUwsQ0FBU2UsR0FBVCxDQUFhLENBQWI7QUFDRDtBQUVEOzs7Ozs7QUFJQUYsRUFBQUEsS0FBSyxHQUFHO0FBQ04sV0FBTyxLQUFLWCxJQUFMLENBQVVnQixTQUFqQjtBQUNEO0FBRUQ7Ozs7OztBQUlBSixFQUFBQSxPQUFPLEdBQUc7QUFDUixXQUFPLEtBQUtaLElBQUwsQ0FBVWlCLFdBQWpCO0FBQ0Q7O0FBbkU4Qzs7QUFzRWpEQywrQkFBV0MsZUFBWCxDQUEyQixDQUFDMUIsaUJBQUQsQ0FBM0I7O2VBQ2VBLGlCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4IFNwaW5hbENvbSAtIHd3dy5zcGluYWxjb20uY29tXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgU3BpbmFsQ29yZS5cbiAqXG4gKiBQbGVhc2UgcmVhZCBhbGwgb2YgdGhlIGZvbGxvd2luZyB0ZXJtcyBhbmQgY29uZGl0aW9uc1xuICogb2YgdGhlIEZyZWUgU29mdHdhcmUgbGljZW5zZSBBZ3JlZW1lbnQgKFwiQWdyZWVtZW50XCIpXG4gKiBjYXJlZnVsbHkuXG4gKlxuICogVGhpcyBBZ3JlZW1lbnQgaXMgYSBsZWdhbGx5IGJpbmRpbmcgY29udHJhY3QgYmV0d2VlblxuICogdGhlIExpY2Vuc2VlIChhcyBkZWZpbmVkIGJlbG93KSBhbmQgU3BpbmFsQ29tIHRoYXRcbiAqIHNldHMgZm9ydGggdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zIHRoYXQgZ292ZXJuIHlvdXJcbiAqIHVzZSBvZiB0aGUgUHJvZ3JhbS4gQnkgaW5zdGFsbGluZyBhbmQvb3IgdXNpbmcgdGhlXG4gKiBQcm9ncmFtLCB5b3UgYWdyZWUgdG8gYWJpZGUgYnkgYWxsIHRoZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMgc3RhdGVkIG9yIHJlZmVyZW5jZWQgaGVyZWluLlxuICpcbiAqIElmIHlvdSBkbyBub3QgYWdyZWUgdG8gYWJpZGUgYnkgdGhlc2UgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zLCBkbyBub3QgZGVtb25zdHJhdGUgeW91ciBhY2NlcHRhbmNlIGFuZCBkb1xuICogbm90IGluc3RhbGwgb3IgdXNlIHRoZSBQcm9ncmFtLlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbG9uZ1xuICogd2l0aCB0aGlzIGZpbGUuIElmIG5vdCwgc2VlXG4gKiA8aHR0cDovL3Jlc291cmNlcy5zcGluYWxjb20uY29tL2xpY2Vuc2VzLnBkZj4uXG4gKi9cbmltcG9ydCBzcGluYWxDb3JlIGZyb20gXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc1wiO1xuaW1wb3J0IFNwaW5hbE5vZGUgZnJvbSBcIi4vTm9kZXMvU3BpbmFsTm9kZVwiO1xuXG5jb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcblxuLyoqXG4gKiBXcmFwcGVyIG92ZXIgU3BpbmFsTm9kZVBvaW50ZXIgY29udGFpbmluZyBzb21lIGluZm9ybWF0aW9uIGFib3V0IHRoZSBwb2ludGVkIGVsZW1lbnRcbiAqL1xuY2xhc3MgU3BpbmFsTm9kZVBvaW50ZXIgZXh0ZW5kcyBnbG9iYWxUeXBlLk1vZGVsIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgU3BpbmFsTm9kZVBvaW50ZXIgY2xhc3MuXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBlbGVtZW50IEVsZW1lbnQgdG8gd2ljaCB0aGUgU3BpbmFsTm9kZVBvaW50ZXIgd2lsbCBwb2ludFxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgIHB0cjogbmV3IGdsb2JhbFR5cGUuUHRyKCksXG4gICAgICBpbmZvOiB7fVxuICAgIH0pO1xuXG4gICAgaWYgKHR5cGVvZiBlbGVtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLnNldEVsZW1lbnQoZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgbG9hZCgpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnB0ciBpbnN0YW5jZW9mIGdsb2JhbFR5cGUuUHRyICYmXG4gICAgICB0aGlzLnB0ci5kYXRhLnZhbHVlICE9PSAwICYmXG4gICAgICB0eXBlb2YgRmlsZVN5c3RlbS5fb2JqZWN0c1t0aGlzLnB0ci5kYXRhLnZhbHVlXSAhPT0gXCJ1bmRlZmluZWRcIlxuICAgICkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShGaWxlU3lzdGVtLl9vYmplY3RzW3RoaXMucHRyLmRhdGEudmFsdWVdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICB0aGlzLnB0ci5sb2FkKHJlc29sdmUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgcG9pbnRlciB0byBwb2ludCB0byBhbiBlbGVtZW50LlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGUgfCBNb2RlbH0gZWxlbWVudFxuICAgKi9cbiAgc2V0RWxlbWVudChlbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBTcGluYWxOb2RlKSB7XG4gICAgICB0aGlzLmluZm8ubW9kX2F0dHIoXCJwb2ludGVkSWRcIiwgZWxlbWVudC5nZXRJZCgpKTtcbiAgICAgIHRoaXMuaW5mby5tb2RfYXR0cihcInBvaW50ZWRUeXBlXCIsIGVsZW1lbnQuZ2V0VHlwZSgpKTtcbiAgICB9XG4gICAgdGhpcy5wdHIuc2V0KGVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVuc2V0cyB0aGUgcG9pbnRlci5cbiAgICovXG4gIHVuc2V0KCkge1xuICAgIHRoaXMuaW5mby5yZW1fYXR0cihcInBvaW50ZWRJZFwiKTtcbiAgICB0aGlzLmluZm8ucmVtX2F0dHIoXCJwb2ludGVkVHlwZVwiKTtcbiAgICB0aGlzLnB0ci5zZXQoMCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaWQgb2YgdGhlIHBvaW50ZWQgZWxlbWVudC5cbiAgICogQHJldHVybiB7U3RyfSBJZCBvZiB0aGUgcG9pbnRlZCBlbGVtZW50XG4gICAqL1xuICBnZXRJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmZvLnBvaW50ZWRJZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHR5cGUgb2YgdGhlIHBvaW50ZWQgZWxlbWVudC5cbiAgICogQHJldHVybiB7U3RyfSBUeXBlIG9mIHRoZSBwb2ludGVkIGVsZW1lbnRcbiAgICovXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5mby5wb2ludGVkVHlwZTtcbiAgfVxufVxuXG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbU3BpbmFsTm9kZVBvaW50ZXJdKTtcbmV4cG9ydCBkZWZhdWx0IFNwaW5hbE5vZGVQb2ludGVyO1xuIl19