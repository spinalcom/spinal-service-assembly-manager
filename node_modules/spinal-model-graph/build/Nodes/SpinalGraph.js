"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SpinalNode = _interopRequireDefault(require("./SpinalNode"));

var _spinalCoreConnectorjs = _interopRequireDefault(require("spinal-core-connectorjs"));

var _SpinalRelationFactory = require("../Relations/SpinalRelationFactory");

var _Utilities = require("../Utilities");

var _SpinalContext = _interopRequireDefault(require("./SpinalContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const globalType = typeof window === "undefined" ? global : window;
const HAS_CONTEXT_RELATION_NAME = "hasContext";

class SpinalGraph extends _SpinalNode.default {
  /**
   * Constructor for the SpinalGraph class.
   * @param {String} name Name of the graph, usually unused
   * @param {String} type Type of the graph, usually unused
   * @param {SpinalNode | Model} element Element of the graph, usually unused
   */
  constructor(name = "undefined", type = "SpinalGraph", element = new globalType.Model()) {
    super(name, type, element);
    this.info.id.set((0, _Utilities.guid)(this.constructor.name));
  }
  /**
   * Adds a context to the graph.
   * @param {SpinalContext} context Context to be added
   * @return {Promise<nothing>} An empty promise
   */


  addContext(context) {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (context instanceof _SpinalContext.default) {
        return _this.addChild(context, HAS_CONTEXT_RELATION_NAME, _SpinalRelationFactory.SPINAL_RELATION_TYPE);
      } else {
        throw new Error("Cannot add an element which is not a context");
      }
    })();
  }
  /**
   * Searches for a context using its name.
   * @param {String} name Name of the context
   * @return {SpinalContext | undefined} The wanted context or undefined
   */


  getContext(name) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      let children = yield _this2.getChildren([HAS_CONTEXT_RELATION_NAME]);
      return children.find(child => child.info.name.get() === name);
    })();
  }
  /**
   * Empty override of the SpinalNode method.
   * @return {Promise<nothing>} An empty promise
   */


  removeFromGraph() {
    return _asyncToGenerator(function* () {})();
  }

}

_spinalCoreConnectorjs.default.register_models([SpinalGraph]);

var _default = SpinalGraph;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Ob2Rlcy9TcGluYWxHcmFwaC5qcyJdLCJuYW1lcyI6WyJnbG9iYWxUeXBlIiwid2luZG93IiwiZ2xvYmFsIiwiSEFTX0NPTlRFWFRfUkVMQVRJT05fTkFNRSIsIlNwaW5hbEdyYXBoIiwiU3BpbmFsTm9kZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsInR5cGUiLCJlbGVtZW50IiwiTW9kZWwiLCJpbmZvIiwiaWQiLCJzZXQiLCJhZGRDb250ZXh0IiwiY29udGV4dCIsIlNwaW5hbENvbnRleHQiLCJhZGRDaGlsZCIsIlNQSU5BTF9SRUxBVElPTl9UWVBFIiwiRXJyb3IiLCJnZXRDb250ZXh0IiwiY2hpbGRyZW4iLCJnZXRDaGlsZHJlbiIsImZpbmQiLCJjaGlsZCIsImdldCIsInJlbW92ZUZyb21HcmFwaCIsInNwaW5hbENvcmUiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF1QkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUEsTUFBTUEsVUFBVSxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUE1RDtBQUNBLE1BQU1FLHlCQUF5QixHQUFHLFlBQWxDOztBQUVBLE1BQU1DLFdBQU4sU0FBMEJDLG1CQUExQixDQUFxQztBQUNuQzs7Ozs7O0FBTUFDLEVBQUFBLFdBQVcsQ0FBQ0MsSUFBSSxHQUFHLFdBQVIsRUFBcUJDLElBQUksR0FBRyxhQUE1QixFQUEyQ0MsT0FBTyxHQUFHLElBQUlULFVBQVUsQ0FDM0VVLEtBRDZELEVBQXJELEVBQ0Q7QUFDUixVQUFNSCxJQUFOLEVBQVlDLElBQVosRUFBa0JDLE9BQWxCO0FBRUEsU0FBS0UsSUFBTCxDQUFVQyxFQUFWLENBQWFDLEdBQWIsQ0FBaUIscUJBQUssS0FBS1AsV0FBTCxDQUFpQkMsSUFBdEIsQ0FBakI7QUFDRDtBQUVEOzs7Ozs7O0FBS01PLEVBQUFBLFVBQU4sQ0FBaUJDLE9BQWpCLEVBQTBCO0FBQUE7O0FBQUE7QUFDeEIsVUFBSUEsT0FBTyxZQUFZQyxzQkFBdkIsRUFBc0M7QUFDcEMsZUFBTyxLQUFJLENBQUNDLFFBQUwsQ0FBY0YsT0FBZCxFQUF1QloseUJBQXZCLEVBQWtEZSwyQ0FBbEQsQ0FBUDtBQUNELE9BRkQsTUFFTztBQUNMLGNBQU0sSUFBSUMsS0FBSixDQUFVLDhDQUFWLENBQU47QUFDRDtBQUx1QjtBQU16QjtBQUVEOzs7Ozs7O0FBS01DLEVBQUFBLFVBQU4sQ0FBaUJiLElBQWpCLEVBQXVCO0FBQUE7O0FBQUE7QUFDckIsVUFBSWMsUUFBUSxTQUFTLE1BQUksQ0FBQ0MsV0FBTCxDQUFpQixDQUFDbkIseUJBQUQsQ0FBakIsQ0FBckI7QUFFQSxhQUFPa0IsUUFBUSxDQUFDRSxJQUFULENBQWNDLEtBQUssSUFBSUEsS0FBSyxDQUFDYixJQUFOLENBQVdKLElBQVgsQ0FBZ0JrQixHQUFoQixPQUEwQmxCLElBQWpELENBQVA7QUFIcUI7QUFJdEI7QUFFRDs7Ozs7O0FBSU1tQixFQUFBQSxlQUFOLEdBQXdCO0FBQUE7QUFFdkI7O0FBNUNrQzs7QUErQ3JDQywrQkFBV0MsZUFBWCxDQUEyQixDQUFDeEIsV0FBRCxDQUEzQjs7ZUFDZUEsVyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5pbXBvcnQgU3BpbmFsTm9kZSBmcm9tIFwiLi9TcGluYWxOb2RlXCI7XG5pbXBvcnQgc3BpbmFsQ29yZSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIjtcbmltcG9ydCB7U1BJTkFMX1JFTEFUSU9OX1RZUEV9IGZyb20gXCIuLi9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25GYWN0b3J5XCI7XG5pbXBvcnQge2d1aWR9IGZyb20gXCIuLi9VdGlsaXRpZXNcIjtcbmltcG9ydCBTcGluYWxDb250ZXh0IGZyb20gXCIuL1NwaW5hbENvbnRleHRcIjtcblxuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5jb25zdCBIQVNfQ09OVEVYVF9SRUxBVElPTl9OQU1FID0gXCJoYXNDb250ZXh0XCI7XG5cbmNsYXNzIFNwaW5hbEdyYXBoIGV4dGVuZHMgU3BpbmFsTm9kZSB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFNwaW5hbEdyYXBoIGNsYXNzLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBOYW1lIG9mIHRoZSBncmFwaCwgdXN1YWxseSB1bnVzZWRcbiAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgVHlwZSBvZiB0aGUgZ3JhcGgsIHVzdWFsbHkgdW51c2VkXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBlbGVtZW50IEVsZW1lbnQgb2YgdGhlIGdyYXBoLCB1c3VhbGx5IHVudXNlZFxuICAgKi9cbiAgY29uc3RydWN0b3IobmFtZSA9IFwidW5kZWZpbmVkXCIsIHR5cGUgPSBcIlNwaW5hbEdyYXBoXCIsIGVsZW1lbnQgPSBuZXcgZ2xvYmFsVHlwZVxuICAgIC5Nb2RlbCkge1xuICAgIHN1cGVyKG5hbWUsIHR5cGUsIGVsZW1lbnQpO1xuXG4gICAgdGhpcy5pbmZvLmlkLnNldChndWlkKHRoaXMuY29uc3RydWN0b3IubmFtZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjb250ZXh0IHRvIHRoZSBncmFwaC5cbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IENvbnRleHQgdG8gYmUgYWRkZWRcbiAgICogQHJldHVybiB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICAgKi9cbiAgYXN5bmMgYWRkQ29udGV4dChjb250ZXh0KSB7XG4gICAgaWYgKGNvbnRleHQgaW5zdGFuY2VvZiBTcGluYWxDb250ZXh0KSB7XG4gICAgICByZXR1cm4gdGhpcy5hZGRDaGlsZChjb250ZXh0LCBIQVNfQ09OVEVYVF9SRUxBVElPTl9OQU1FLCBTUElOQUxfUkVMQVRJT05fVFlQRSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBhZGQgYW4gZWxlbWVudCB3aGljaCBpcyBub3QgYSBjb250ZXh0XCIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2hlcyBmb3IgYSBjb250ZXh0IHVzaW5nIGl0cyBuYW1lLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBOYW1lIG9mIHRoZSBjb250ZXh0XG4gICAqIEByZXR1cm4ge1NwaW5hbENvbnRleHQgfCB1bmRlZmluZWR9IFRoZSB3YW50ZWQgY29udGV4dCBvciB1bmRlZmluZWRcbiAgICovXG4gIGFzeW5jIGdldENvbnRleHQobmFtZSkge1xuICAgIGxldCBjaGlsZHJlbiA9IGF3YWl0IHRoaXMuZ2V0Q2hpbGRyZW4oW0hBU19DT05URVhUX1JFTEFUSU9OX05BTUVdKTtcblxuICAgIHJldHVybiBjaGlsZHJlbi5maW5kKGNoaWxkID0+IGNoaWxkLmluZm8ubmFtZS5nZXQoKSA9PT0gbmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogRW1wdHkgb3ZlcnJpZGUgb2YgdGhlIFNwaW5hbE5vZGUgbWV0aG9kLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAqL1xuICBhc3luYyByZW1vdmVGcm9tR3JhcGgoKSB7XG5cbiAgfVxufVxuXG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbU3BpbmFsR3JhcGhdKTtcbmV4cG9ydCBkZWZhdWx0IFNwaW5hbEdyYXBoO1xuIl19