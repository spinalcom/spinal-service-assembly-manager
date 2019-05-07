"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.guid = guid;

require("spinal-core-connectorjs");

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
 * Generates a random number and returns in a string.
 * @returns {String} Random number in a string
 */

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}
/**
 * Creates a unique id based on a name.
 * @param {String} name Name from wich the id is generated
 * @return {String} Generated id
 */


function guid(name) {
  return name + "-" + s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4() + "-" + Date.now().toString(16);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9VdGlsaXRpZXMuanMiXSwibmFtZXMiOlsiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsInM0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9TdHJpbmciLCJzdWJzdHJpbmciLCJndWlkIiwibmFtZSIsIkRhdGUiLCJub3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF1QkE7O0FBdkJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSxNQUFNQSxVQUFVLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixHQUFnQ0MsTUFBaEMsR0FBeUNELE1BQTVEO0FBRUE7Ozs7O0FBSUEsU0FBU0UsRUFBVCxHQUFjO0FBQ1osU0FBT0MsSUFBSSxDQUFDQyxLQUFMLENBQVcsQ0FBQyxJQUFJRCxJQUFJLENBQUNFLE1BQUwsRUFBTCxJQUFzQixPQUFqQyxFQUNKQyxRQURJLENBQ0ssRUFETCxFQUVKQyxTQUZJLENBRU0sQ0FGTixDQUFQO0FBR0Q7QUFFRDs7Ozs7OztBQUtBLFNBQVNDLElBQVQsQ0FBY0MsSUFBZCxFQUFvQjtBQUNsQixTQUNFQSxJQUFJLEdBQUcsR0FBUCxHQUFhUCxFQUFFLEVBQWYsR0FBb0JBLEVBQUUsRUFBdEIsR0FBMkIsR0FBM0IsR0FBaUNBLEVBQUUsRUFBbkMsR0FBd0MsR0FBeEMsR0FBOENBLEVBQUUsRUFBaEQsR0FBcUQsR0FBckQsR0FDQUEsRUFBRSxFQURGLEdBQ08sR0FEUCxHQUNhQSxFQUFFLEVBRGYsR0FDb0JBLEVBQUUsRUFEdEIsR0FDMkJBLEVBQUUsRUFEN0IsR0FDa0MsR0FEbEMsR0FDd0NRLElBQUksQ0FBQ0MsR0FBTCxHQUFXTCxRQUFYLENBQW9CLEVBQXBCLENBRjFDO0FBSUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTggU3BpbmFsQ29tIC0gd3d3LnNwaW5hbGNvbS5jb21cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBTcGluYWxDb3JlLlxuICpcbiAqIFBsZWFzZSByZWFkIGFsbCBvZiB0aGUgZm9sbG93aW5nIHRlcm1zIGFuZCBjb25kaXRpb25zXG4gKiBvZiB0aGUgRnJlZSBTb2Z0d2FyZSBsaWNlbnNlIEFncmVlbWVudCAoXCJBZ3JlZW1lbnRcIilcbiAqIGNhcmVmdWxseS5cbiAqXG4gKiBUaGlzIEFncmVlbWVudCBpcyBhIGxlZ2FsbHkgYmluZGluZyBjb250cmFjdCBiZXR3ZWVuXG4gKiB0aGUgTGljZW5zZWUgKGFzIGRlZmluZWQgYmVsb3cpIGFuZCBTcGluYWxDb20gdGhhdFxuICogc2V0cyBmb3J0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgdGhhdCBnb3Zlcm4geW91clxuICogdXNlIG9mIHRoZSBQcm9ncmFtLiBCeSBpbnN0YWxsaW5nIGFuZC9vciB1c2luZyB0aGVcbiAqIFByb2dyYW0sIHlvdSBhZ3JlZSB0byBhYmlkZSBieSBhbGwgdGhlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucyBzdGF0ZWQgb3IgcmVmZXJlbmNlZCBoZXJlaW4uXG4gKlxuICogSWYgeW91IGRvIG5vdCBhZ3JlZSB0byBhYmlkZSBieSB0aGVzZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMsIGRvIG5vdCBkZW1vbnN0cmF0ZSB5b3VyIGFjY2VwdGFuY2UgYW5kIGRvXG4gKiBub3QgaW5zdGFsbCBvciB1c2UgdGhlIFByb2dyYW0uXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFsb25nXG4gKiB3aXRoIHRoaXMgZmlsZS4gSWYgbm90LCBzZWVcbiAqIDxodHRwOi8vcmVzb3VyY2VzLnNwaW5hbGNvbS5jb20vbGljZW5zZXMucGRmPi5cbiAqL1xuaW1wb3J0IFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIjtcblxuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcmFuZG9tIG51bWJlciBhbmQgcmV0dXJucyBpbiBhIHN0cmluZy5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJhbmRvbSBudW1iZXIgaW4gYSBzdHJpbmdcbiAqL1xuZnVuY3Rpb24gczQoKSB7XG4gIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxuICAgIC50b1N0cmluZygxNilcbiAgICAuc3Vic3RyaW5nKDEpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB1bmlxdWUgaWQgYmFzZWQgb24gYSBuYW1lLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgTmFtZSBmcm9tIHdpY2ggdGhlIGlkIGlzIGdlbmVyYXRlZFxuICogQHJldHVybiB7U3RyaW5nfSBHZW5lcmF0ZWQgaWRcbiAqL1xuZnVuY3Rpb24gZ3VpZChuYW1lKSB7XG4gIHJldHVybiAoXG4gICAgbmFtZSArIFwiLVwiICsgczQoKSArIHM0KCkgKyBcIi1cIiArIHM0KCkgKyBcIi1cIiArIHM0KCkgKyBcIi1cIiArXG4gICAgczQoKSArIFwiLVwiICsgczQoKSArIHM0KCkgKyBzNCgpICsgXCItXCIgKyBEYXRlLm5vdygpLnRvU3RyaW5nKDE2KVxuICApO1xufVxuXG5leHBvcnQge1xuICBndWlkXG59O1xuIl19