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

class SpinalRelationLstPtr extends _BaseSpinalRelation.default {
  /**
   * Constructor for the SpinalRelationLstPtr class.
   * @param {String} name Name of the relation
   */
  constructor(name) {
    super(name);
    this.add_attr({
      children: new globalType.Lst()
    });
  }
  /**
   * Retrieves all the ids of the children of the relation and return them inside an array.
   * @return {Array<String>} Array containing all the children ids of the relation
   */


  getChildrenIds() {
    const res = [];

    for (let i = 0; i < this.children.length; i++) {
      res.push(this.children[i].getId().get());
    }

    return res;
  }
  /**
   * Return all the children of the relation.
   * @return {Promise<Array<SpinalNode>>} The children of the relation
   */


  getChildren() {
    const promises = [];

    for (let i = 0; i < this.children.length; i++) {
      let ptr = this.children[i];
      promises.push(ptr.load());
    }

    return Promise.all(promises);
  }
  /**
   * Return all the children of the relation associated to a certain context.
   * @return {Promise<Array<SpinalNode>>} The children of the relation
   */


  getChildrenInContext(context) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const promises = [];
      let children;

      for (let i = 0; i < _this.children.length; i++) {
        let ptr = _this.children[i];
        promises.push(ptr.load());
      }

      children = yield Promise.all(promises);
      return children.filter(child => child.belongsToContext(context));
    })();
  }
  /**
   * Returns the type of the relation.
   * @return {Number} Type of the relation
   */


  getType() {
    return _SpinalRelationFactory.SPINAL_RELATION_LST_PTR_TYPE;
  }
  /**
   * Adds a child to the relation.
   * @param {SpinalNode | Model} node Node or model to add
   * @return {Promise<SpinalNode>} Promise containing the node that was added
   */


  addChild(node) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (!(node instanceof globalType.Model)) {
        throw new Error("Cannot add a child witch is not an instance of SpinalNode or Model.");
      } else if (!(node instanceof _SpinalNode.default)) {
        node = new _SpinalNode.default(undefined, undefined, node);
      }

      if (_this2.getChildrenIds().includes(node.getId().get())) {
        throw new Error("Cannot add a child twice to the same relation.");
      }

      node._addParent(_this2);

      _this2.children.push(new _SpinalNodePointer.default(node));

      return node;
    })();
  }
  /**
   * Removes a child from the relation.
   * @param {SpinalNode} node Child to remove
   * @return {Promise<nothing>} An empty promise
   */


  removeChild(node) {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].getId() === node.getId()) {
        this.children.splice(i, 1);
      }
    }

    node._removeParent(this);

    return Promise.resolve();
  }

}

_spinalCoreConnectorjs.default.register_models([SpinalRelationLstPtr]);

var _default = SpinalRelationLstPtr;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25Mc3RQdHIuanMiXSwibmFtZXMiOlsiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlNwaW5hbFJlbGF0aW9uTHN0UHRyIiwiQmFzZVNwaW5hbFJlbGF0aW9uIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiYWRkX2F0dHIiLCJjaGlsZHJlbiIsIkxzdCIsImdldENoaWxkcmVuSWRzIiwicmVzIiwiaSIsImxlbmd0aCIsInB1c2giLCJnZXRJZCIsImdldCIsImdldENoaWxkcmVuIiwicHJvbWlzZXMiLCJwdHIiLCJsb2FkIiwiUHJvbWlzZSIsImFsbCIsImdldENoaWxkcmVuSW5Db250ZXh0IiwiY29udGV4dCIsImZpbHRlciIsImNoaWxkIiwiYmVsb25nc1RvQ29udGV4dCIsImdldFR5cGUiLCJTUElOQUxfUkVMQVRJT05fTFNUX1BUUl9UWVBFIiwiYWRkQ2hpbGQiLCJub2RlIiwiTW9kZWwiLCJFcnJvciIsIlNwaW5hbE5vZGUiLCJ1bmRlZmluZWQiLCJpbmNsdWRlcyIsIl9hZGRQYXJlbnQiLCJTcGluYWxOb2RlUG9pbnRlciIsInJlbW92ZUNoaWxkIiwic3BsaWNlIiwiX3JlbW92ZVBhcmVudCIsInJlc29sdmUiLCJzcGluYWxDb3JlIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBdUJBOztBQUNBOztBQUdBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLE1BQU1BLFVBQVUsR0FBRyxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsTUFBNUQ7O0FBRUEsTUFBTUUsb0JBQU4sU0FBbUNDLDJCQUFuQyxDQUFzRDtBQUNwRDs7OztBQUlBQyxFQUFBQSxXQUFXLENBQUNDLElBQUQsRUFBTztBQUNoQixVQUFNQSxJQUFOO0FBQ0EsU0FBS0MsUUFBTCxDQUFjO0FBQ1pDLE1BQUFBLFFBQVEsRUFBRSxJQUFJUixVQUFVLENBQUNTLEdBQWY7QUFE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QUFjSyxNQUFsQyxFQUEwQ0QsQ0FBQyxFQUEzQyxFQUErQztBQUM3QyxVQUFJLEtBQUtKLFFBQUwsQ0FBY0ksQ0FBZCxFQUFpQkcsS0FBakIsT0FBNkJnQixJQUFJLENBQUNoQixLQUFMLEVBQWpDLEVBQStDO0FBQzdDLGFBQUtQLFFBQUwsQ0FBY2dDLE1BQWQsQ0FBcUI1QixDQUFyQixFQUF3QixDQUF4QjtBQUNEO0FBQ0Y7O0FBQ0RtQixJQUFBQSxJQUFJLENBQUNVLGFBQUwsQ0FBbUIsSUFBbkI7O0FBQ0EsV0FBT3BCLE9BQU8sQ0FBQ3FCLE9BQVIsRUFBUDtBQUNEOztBQW5HbUQ7O0FBc0d0REMsK0JBQVdDLGVBQVgsQ0FBMkIsQ0FBQ3pDLG9CQUFELENBQTNCOztlQUNlQSxvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5pbXBvcnQgQmFzZVNwaW5hbFJlbGF0aW9uIGZyb20gXCIuL0Jhc2VTcGluYWxSZWxhdGlvblwiO1xuaW1wb3J0IHtcbiAgU1BJTkFMX1JFTEFUSU9OX0xTVF9QVFJfVFlQRVxufSBmcm9tIFwiLi9TcGluYWxSZWxhdGlvbkZhY3RvcnlcIjtcbmltcG9ydCBTcGluYWxOb2RlIGZyb20gXCIuLi9Ob2Rlcy9TcGluYWxOb2RlXCI7XG5pbXBvcnQgU3BpbmFsTm9kZVBvaW50ZXIgZnJvbSBcIi4uL1NwaW5hbE5vZGVQb2ludGVyXCI7XG5pbXBvcnQgc3BpbmFsQ29yZSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIjtcblxuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5cbmNsYXNzIFNwaW5hbFJlbGF0aW9uTHN0UHRyIGV4dGVuZHMgQmFzZVNwaW5hbFJlbGF0aW9uIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgU3BpbmFsUmVsYXRpb25Mc3RQdHIgY2xhc3MuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgc3VwZXIobmFtZSk7XG4gICAgdGhpcy5hZGRfYXR0cih7XG4gICAgICBjaGlsZHJlbjogbmV3IGdsb2JhbFR5cGUuTHN0KClcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYWxsIHRoZSBpZHMgb2YgdGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvbiBhbmQgcmV0dXJuIHRoZW0gaW5zaWRlIGFuIGFycmF5LlxuICAgKiBAcmV0dXJuIHtBcnJheTxTdHJpbmc+fSBBcnJheSBjb250YWluaW5nIGFsbCB0aGUgY2hpbGRyZW4gaWRzIG9mIHRoZSByZWxhdGlvblxuICAgKi9cbiAgZ2V0Q2hpbGRyZW5JZHMoKSB7XG4gICAgY29uc3QgcmVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXMucHVzaCh0aGlzLmNoaWxkcmVuW2ldLmdldElkKCkuZ2V0KCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbGwgdGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvbi5cbiAgICogQHJldHVybiB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGdldENoaWxkcmVuKCkge1xuICAgIGNvbnN0IHByb21pc2VzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBwdHIgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgcHJvbWlzZXMucHVzaChwdHIubG9hZCgpKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24gYXNzb2NpYXRlZCB0byBhIGNlcnRhaW4gY29udGV4dC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGFzeW5jIGdldENoaWxkcmVuSW5Db250ZXh0KGNvbnRleHQpIHtcbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICAgIGxldCBjaGlsZHJlbjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHB0ciA9IHRoaXMuY2hpbGRyZW5baV07XG5cbiAgICAgIHByb21pc2VzLnB1c2gocHRyLmxvYWQoKSk7XG4gICAgfVxuXG4gICAgY2hpbGRyZW4gPSBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgcmV0dXJuIGNoaWxkcmVuLmZpbHRlcihjaGlsZCA9PiBjaGlsZC5iZWxvbmdzVG9Db250ZXh0KGNvbnRleHQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB0eXBlIG9mIHRoZSByZWxhdGlvbi5cbiAgICogQHJldHVybiB7TnVtYmVyfSBUeXBlIG9mIHRoZSByZWxhdGlvblxuICAgKi9cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gU1BJTkFMX1JFTEFUSU9OX0xTVF9QVFJfVFlQRTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2hpbGQgdG8gdGhlIHJlbGF0aW9uLlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGUgfCBNb2RlbH0gbm9kZSBOb2RlIG9yIG1vZGVsIHRvIGFkZFxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFNwaW5hbE5vZGU+fSBQcm9taXNlIGNvbnRhaW5pbmcgdGhlIG5vZGUgdGhhdCB3YXMgYWRkZWRcbiAgICovXG4gIGFzeW5jIGFkZENoaWxkKG5vZGUpIHtcbiAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgZ2xvYmFsVHlwZS5Nb2RlbCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJDYW5ub3QgYWRkIGEgY2hpbGQgd2l0Y2ggaXMgbm90IGFuIGluc3RhbmNlIG9mIFNwaW5hbE5vZGUgb3IgTW9kZWwuXCJcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICghKG5vZGUgaW5zdGFuY2VvZiBTcGluYWxOb2RlKSkge1xuICAgICAgbm9kZSA9IG5ldyBTcGluYWxOb2RlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBub2RlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZ2V0Q2hpbGRyZW5JZHMoKS5pbmNsdWRlcyhub2RlLmdldElkKCkuZ2V0KCkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYWRkIGEgY2hpbGQgdHdpY2UgdG8gdGhlIHNhbWUgcmVsYXRpb24uXCIpO1xuICAgIH1cblxuICAgIG5vZGUuX2FkZFBhcmVudCh0aGlzKTtcbiAgICB0aGlzLmNoaWxkcmVuLnB1c2gobmV3IFNwaW5hbE5vZGVQb2ludGVyKG5vZGUpKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgY2hpbGQgZnJvbSB0aGUgcmVsYXRpb24uXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZX0gbm9kZSBDaGlsZCB0byByZW1vdmVcbiAgICogQHJldHVybiB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICAgKi9cbiAgcmVtb3ZlQ2hpbGQobm9kZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuY2hpbGRyZW5baV0uZ2V0SWQoKSA9PT0gbm9kZS5nZXRJZCgpKSB7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGksIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBub2RlLl9yZW1vdmVQYXJlbnQodGhpcyk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxSZWxhdGlvbkxzdFB0cl0pO1xuZXhwb3J0IGRlZmF1bHQgU3BpbmFsUmVsYXRpb25Mc3RQdHI7XG4iXX0=