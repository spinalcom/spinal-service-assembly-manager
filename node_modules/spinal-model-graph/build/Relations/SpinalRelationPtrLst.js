"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseSpinalRelation = _interopRequireDefault(require("./BaseSpinalRelation"));

var _SpinalRelationFactory = require("./SpinalRelationFactory");

var _SpinalNode = _interopRequireDefault(require("../Nodes/SpinalNode"));

var _SpinalNodePointer = _interopRequireDefault(require("../SpinalNodePointer"));

var _spinalCoreConnectorjs = _interopRequireDefault(require("spinal-core-connectorjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const globalType = typeof window === "undefined" ? global : window;

class SpinalRelationPtrLst extends _BaseSpinalRelation.default {
  /**
   * Constructor for the SpinalRelationPtrLst class.
   * @param {String} name Name of the relation
   */
  constructor(name) {
    super(name);
    this.add_attr({
      children: new _SpinalNodePointer.default(new globalType.Lst())
    });
    this.children.info.add_attr("ids", new globalType.Lst());
  }
  /**
   * Retrieves all the ids of the children of the relation and return them inside an array.
   * @return {Array<String>} Array containing all the children ids of the relation
   */


  getChildrenIds() {
    const idLst = this.children.info.ids;
    let ids = [];

    for (let i = 0; i < idLst.length; i++) {
      ids.push(idLst[i].get());
    }

    return ids;
  }
  /**
   * Return all the children of the relation.
   * @return {Promise<Array<SpinalNode>>} The children of the relation
   */


  getChildren() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const childrenLst = yield _this.children.load();
      let children = [];

      for (let i = 0; i < childrenLst.length; i++) {
        children.push(childrenLst[i]);
      }

      return children;
    })();
  }
  /**
   * Return all the children of the relation associated to a certain context.
   * @param {SpinalContext} context Context to use for the search
   * @return {Promise<Array<SpinalNode>>} The children associated to the context
   */


  getChildrenInContext(context) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const childrenLst = yield _this2.children.load();
      let children = [];

      for (let i = 0; i < childrenLst.length; i++) {
        let child = childrenLst[i];

        if (child.belongsToContext(context)) {
          children.push(child);
        }
      }

      return children;
    })();
  }
  /**
   * Returns the type of the relation.
   * @return {Number} Type of the relation
   */


  getType() {
    return _SpinalRelationFactory.SPINAL_RELATION_PTR_LST_TYPE;
  }
  /**
   * Adds a child to the relation.
   * @param {SpinalNode | Model} node Node or model to add
   * @return {Promise<SpinalNode>} Promise containing the node that was added
   */


  addChild(node) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      if (!(node instanceof globalType.Model)) {
        throw new Error("Cannot add a child witch is not an instance of SpinalNode or Model.");
      } else if (!(node instanceof _SpinalNode.default)) {
        node = new _SpinalNode.default(undefined, undefined, node);
      }

      if (_this3.getChildrenIds().includes(node.getId().get())) {
        throw new Error("Cannot add a child twice to the same relation.");
      }

      _this3.children.info.ids.push(node.getId());

      node._addParent(_this3);

      yield _this3.children.load().then(children => {
        children.push(node);
      });
      return node;
    })();
  }
  /**
   * Removes a child from the relation.
   * @param {SpinalNode} node Child to remove
   * @return {Promise<nothing>} An empty promise
   */


  removeChild(node) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const childrenLst = yield _this4.children.load();
      childrenLst.remove(node);

      _this4.children.info.ids.remove(node.getId());

      node._removeParent(_this4);
    })();
  }

}

_spinalCoreConnectorjs.default.register_models([SpinalRelationPtrLst]);

var _default = SpinalRelationPtrLst;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25QdHJMc3QuanMiXSwibmFtZXMiOlsiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlNwaW5hbFJlbGF0aW9uUHRyTHN0IiwiQmFzZVNwaW5hbFJlbGF0aW9uIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiYWRkX2F0dHIiLCJjaGlsZHJlbiIsIlNwaW5hbE5vZGVQb2ludGVyIiwiTHN0IiwiaW5mbyIsImdldENoaWxkcmVuSWRzIiwiaWRMc3QiLCJpZHMiLCJpIiwibGVuZ3RoIiwicHVzaCIsImdldCIsImdldENoaWxkcmVuIiwiY2hpbGRyZW5Mc3QiLCJsb2FkIiwiZ2V0Q2hpbGRyZW5JbkNvbnRleHQiLCJjb250ZXh0IiwiY2hpbGQiLCJiZWxvbmdzVG9Db250ZXh0IiwiZ2V0VHlwZSIsIlNQSU5BTF9SRUxBVElPTl9QVFJfTFNUX1RZUEUiLCJhZGRDaGlsZCIsIm5vZGUiLCJNb2RlbCIsIkVycm9yIiwiU3BpbmFsTm9kZSIsInVuZGVmaW5lZCIsImluY2x1ZGVzIiwiZ2V0SWQiLCJfYWRkUGFyZW50IiwidGhlbiIsInJlbW92ZUNoaWxkIiwicmVtb3ZlIiwiX3JlbW92ZVBhcmVudCIsInNwaW5hbENvcmUiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF1QkE7O0FBQ0E7O0FBR0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUEsTUFBTUEsVUFBVSxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUE1RDs7QUFFQSxNQUFNRSxvQkFBTixTQUFtQ0MsMkJBQW5DLENBQXNEO0FBQ3BEOzs7O0FBSUFDLEVBQUFBLFdBQVcsQ0FBQ0MsSUFBRCxFQUFPO0FBQ2hCLFVBQU1BLElBQU47QUFDQSxTQUFLQyxRQUFMLENBQWM7QUFDWkMsTUFBQUEsUUFBUSxFQUFFLElBQUlDLDBCQUFKLENBQXNCLElBQUlULFVBQVUsQ0FBQ1UsR0FBZixF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N0IsUUFBRCxJQUFjO0FBQzVDQSxRQUFBQSxRQUFRLENBQUNTLElBQVQsQ0FBY1ksSUFBZDtBQUNELE9BRkssQ0FBTjtBQUdBLGFBQU9BLElBQVA7QUFqQm1CO0FBa0JwQjtBQUVEOzs7Ozs7O0FBS01TLEVBQUFBLFdBQU4sQ0FBa0JULElBQWxCLEVBQXdCO0FBQUE7O0FBQUE7QUFDdEIsWUFBTVQsV0FBVyxTQUFTLE1BQUksQ0FBQ1osUUFBTCxDQUFjYSxJQUFkLEVBQTFCO0FBRUFELE1BQUFBLFdBQVcsQ0FBQ21CLE1BQVosQ0FBbUJWLElBQW5COztBQUNBLE1BQUEsTUFBSSxDQUFDckIsUUFBTCxDQUFjRyxJQUFkLENBQW1CRyxHQUFuQixDQUF1QnlCLE1BQXZCLENBQThCVixJQUFJLENBQUNNLEtBQUwsRUFBOUI7O0FBQ0FOLE1BQUFBLElBQUksQ0FBQ1csYUFBTCxDQUFtQixNQUFuQjtBQUxzQjtBQU12Qjs7QUF6R21EOztBQTRHdERDLCtCQUFXQyxlQUFYLENBQTJCLENBQUN2QyxvQkFBRCxDQUEzQjs7ZUFDZUEsb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTggU3BpbmFsQ29tIC0gd3d3LnNwaW5hbGNvbS5jb21cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBTcGluYWxDb3JlLlxuICpcbiAqIFBsZWFzZSByZWFkIGFsbCBvZiB0aGUgZm9sbG93aW5nIHRlcm1zIGFuZCBjb25kaXRpb25zXG4gKiBvZiB0aGUgRnJlZSBTb2Z0d2FyZSBsaWNlbnNlIEFncmVlbWVudCAoXCJBZ3JlZW1lbnRcIilcbiAqIGNhcmVmdWxseS5cbiAqXG4gKiBUaGlzIEFncmVlbWVudCBpcyBhIGxlZ2FsbHkgYmluZGluZyBjb250cmFjdCBiZXR3ZWVuXG4gKiB0aGUgTGljZW5zZWUgKGFzIGRlZmluZWQgYmVsb3cpIGFuZCBTcGluYWxDb20gdGhhdFxuICogc2V0cyBmb3J0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgdGhhdCBnb3Zlcm4geW91clxuICogdXNlIG9mIHRoZSBQcm9ncmFtLiBCeSBpbnN0YWxsaW5nIGFuZC9vciB1c2luZyB0aGVcbiAqIFByb2dyYW0sIHlvdSBhZ3JlZSB0byBhYmlkZSBieSBhbGwgdGhlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucyBzdGF0ZWQgb3IgcmVmZXJlbmNlZCBoZXJlaW4uXG4gKlxuICogSWYgeW91IGRvIG5vdCBhZ3JlZSB0byBhYmlkZSBieSB0aGVzZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMsIGRvIG5vdCBkZW1vbnN0cmF0ZSB5b3VyIGFjY2VwdGFuY2UgYW5kIGRvXG4gKiBub3QgaW5zdGFsbCBvciB1c2UgdGhlIFByb2dyYW0uXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFsb25nXG4gKiB3aXRoIHRoaXMgZmlsZS4gSWYgbm90LCBzZWVcbiAqIDxodHRwOi8vcmVzb3VyY2VzLnNwaW5hbGNvbS5jb20vbGljZW5zZXMucGRmPi5cbiAqL1xuaW1wb3J0IEJhc2VTcGluYWxSZWxhdGlvbiBmcm9tIFwiLi9CYXNlU3BpbmFsUmVsYXRpb25cIjtcbmltcG9ydCB7XG4gIFNQSU5BTF9SRUxBVElPTl9QVFJfTFNUX1RZUEVcbn0gZnJvbSBcIi4vU3BpbmFsUmVsYXRpb25GYWN0b3J5XCI7XG5pbXBvcnQgU3BpbmFsTm9kZSBmcm9tIFwiLi4vTm9kZXMvU3BpbmFsTm9kZVwiO1xuaW1wb3J0IFNwaW5hbE5vZGVQb2ludGVyIGZyb20gXCIuLi9TcGluYWxOb2RlUG9pbnRlclwiO1xuaW1wb3J0IHNwaW5hbENvcmUgZnJvbSBcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzXCI7XG5cbmNvbnN0IGdsb2JhbFR5cGUgPSB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogd2luZG93O1xuXG5jbGFzcyBTcGluYWxSZWxhdGlvblB0ckxzdCBleHRlbmRzIEJhc2VTcGluYWxSZWxhdGlvbiB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFNwaW5hbFJlbGF0aW9uUHRyTHN0IGNsYXNzLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHN1cGVyKG5hbWUpO1xuICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgY2hpbGRyZW46IG5ldyBTcGluYWxOb2RlUG9pbnRlcihuZXcgZ2xvYmFsVHlwZS5Mc3QoKSlcbiAgICB9KTtcblxuICAgIHRoaXMuY2hpbGRyZW4uaW5mby5hZGRfYXR0cihcImlkc1wiLCBuZXcgZ2xvYmFsVHlwZS5Mc3QoKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIGFsbCB0aGUgaWRzIG9mIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24gYW5kIHJldHVybiB0aGVtIGluc2lkZSBhbiBhcnJheS5cbiAgICogQHJldHVybiB7QXJyYXk8U3RyaW5nPn0gQXJyYXkgY29udGFpbmluZyBhbGwgdGhlIGNoaWxkcmVuIGlkcyBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGdldENoaWxkcmVuSWRzKCkge1xuICAgIGNvbnN0IGlkTHN0ID0gdGhpcy5jaGlsZHJlbi5pbmZvLmlkcztcbiAgICBsZXQgaWRzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlkTHN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZHMucHVzaChpZExzdFtpXS5nZXQoKSk7XG4gICAgfVxuICAgIHJldHVybiBpZHM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGFsbCB0aGUgY2hpbGRyZW4gb2YgdGhlIHJlbGF0aW9uLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPEFycmF5PFNwaW5hbE5vZGU+Pn0gVGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvblxuICAgKi9cbiAgYXN5bmMgZ2V0Q2hpbGRyZW4oKSB7XG4gICAgY29uc3QgY2hpbGRyZW5Mc3QgPSBhd2FpdCB0aGlzLmNoaWxkcmVuLmxvYWQoKTtcbiAgICBsZXQgY2hpbGRyZW4gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW5Mc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGRyZW5Mc3RbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGFsbCB0aGUgY2hpbGRyZW4gb2YgdGhlIHJlbGF0aW9uIGFzc29jaWF0ZWQgdG8gYSBjZXJ0YWluIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7U3BpbmFsQ29udGV4dH0gY29udGV4dCBDb250ZXh0IHRvIHVzZSBmb3IgdGhlIHNlYXJjaFxuICAgKiBAcmV0dXJuIHtQcm9taXNlPEFycmF5PFNwaW5hbE5vZGU+Pn0gVGhlIGNoaWxkcmVuIGFzc29jaWF0ZWQgdG8gdGhlIGNvbnRleHRcbiAgICovXG4gIGFzeW5jIGdldENoaWxkcmVuSW5Db250ZXh0KGNvbnRleHQpIHtcbiAgICBjb25zdCBjaGlsZHJlbkxzdCA9IGF3YWl0IHRoaXMuY2hpbGRyZW4ubG9hZCgpO1xuICAgIGxldCBjaGlsZHJlbiA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbkxzdC5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGNoaWxkID0gY2hpbGRyZW5Mc3RbaV07XG5cbiAgICAgIGlmIChjaGlsZC5iZWxvbmdzVG9Db250ZXh0KGNvbnRleHQpKSB7XG4gICAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdHlwZSBvZiB0aGUgcmVsYXRpb24uXG4gICAqIEByZXR1cm4ge051bWJlcn0gVHlwZSBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIFNQSU5BTF9SRUxBVElPTl9QVFJfTFNUX1RZUEU7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNoaWxkIHRvIHRoZSByZWxhdGlvbi5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlIHwgTW9kZWx9IG5vZGUgTm9kZSBvciBtb2RlbCB0byBhZGRcbiAgICogQHJldHVybiB7UHJvbWlzZTxTcGluYWxOb2RlPn0gUHJvbWlzZSBjb250YWluaW5nIHRoZSBub2RlIHRoYXQgd2FzIGFkZGVkXG4gICAqL1xuICBhc3luYyBhZGRDaGlsZChub2RlKSB7XG4gICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIGdsb2JhbFR5cGUuTW9kZWwpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiQ2Fubm90IGFkZCBhIGNoaWxkIHdpdGNoIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBTcGluYWxOb2RlIG9yIE1vZGVsLlwiXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoIShub2RlIGluc3RhbmNlb2YgU3BpbmFsTm9kZSkpIHtcbiAgICAgIG5vZGUgPSBuZXcgU3BpbmFsTm9kZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgbm9kZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmdldENoaWxkcmVuSWRzKCkuaW5jbHVkZXMobm9kZS5nZXRJZCgpLmdldCgpKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGFkZCBhIGNoaWxkIHR3aWNlIHRvIHRoZSBzYW1lIHJlbGF0aW9uLlwiKTtcbiAgICB9XG5cbiAgICB0aGlzLmNoaWxkcmVuLmluZm8uaWRzLnB1c2gobm9kZS5nZXRJZCgpKTtcbiAgICBub2RlLl9hZGRQYXJlbnQodGhpcyk7XG4gICAgYXdhaXQgdGhpcy5jaGlsZHJlbi5sb2FkKCkudGhlbigoY2hpbGRyZW4pID0+IHtcbiAgICAgIGNoaWxkcmVuLnB1c2gobm9kZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNoaWxkIGZyb20gdGhlIHJlbGF0aW9uLlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGV9IG5vZGUgQ2hpbGQgdG8gcmVtb3ZlXG4gICAqIEByZXR1cm4ge1Byb21pc2U8bm90aGluZz59IEFuIGVtcHR5IHByb21pc2VcbiAgICovXG4gIGFzeW5jIHJlbW92ZUNoaWxkKG5vZGUpIHtcbiAgICBjb25zdCBjaGlsZHJlbkxzdCA9IGF3YWl0IHRoaXMuY2hpbGRyZW4ubG9hZCgpO1xuXG4gICAgY2hpbGRyZW5Mc3QucmVtb3ZlKG5vZGUpO1xuICAgIHRoaXMuY2hpbGRyZW4uaW5mby5pZHMucmVtb3ZlKG5vZGUuZ2V0SWQoKSk7XG4gICAgbm9kZS5fcmVtb3ZlUGFyZW50KHRoaXMpO1xuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxSZWxhdGlvblB0ckxzdF0pO1xuZXhwb3J0IGRlZmF1bHQgU3BpbmFsUmVsYXRpb25QdHJMc3Q7XG4iXX0=