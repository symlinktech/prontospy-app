"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Conversion {
  constructor(credentials, options) {
    this.creds = credentials;
    this.options = options;
  }

  voice(message_id, delivered, timestamp, callback) {
    return this.submit("voice", message_id, delivered, timestamp, callback);
  }

  sms(message_id, delivered, timestamp, callback) {
    return this.submit("sms", message_id, delivered, timestamp, callback);
  }

  submit(type, message_id, delivered, timestamp, callback) {
    return this.options.api.postUseQueryString("/conversions/" + type, {
      "message-id": message_id,
      delivered,
      timestamp
    }, this.options.api._addLimitedAccessMessageToErrors(callback, 402));
  }

}

var _default = Conversion;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Db252ZXJzaW9uLmpzIl0sIm5hbWVzIjpbIkNvbnZlcnNpb24iLCJjb25zdHJ1Y3RvciIsImNyZWRlbnRpYWxzIiwib3B0aW9ucyIsImNyZWRzIiwidm9pY2UiLCJtZXNzYWdlX2lkIiwiZGVsaXZlcmVkIiwidGltZXN0YW1wIiwiY2FsbGJhY2siLCJzdWJtaXQiLCJzbXMiLCJ0eXBlIiwiYXBpIiwicG9zdFVzZVF1ZXJ5U3RyaW5nIiwiX2FkZExpbWl0ZWRBY2Nlc3NNZXNzYWdlVG9FcnJvcnMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUEsTUFBTUEsVUFBTixDQUFpQjtBQUNmQyxFQUFBQSxXQUFXLENBQUNDLFdBQUQsRUFBY0MsT0FBZCxFQUF1QjtBQUNoQyxTQUFLQyxLQUFMLEdBQWFGLFdBQWI7QUFDQSxTQUFLQyxPQUFMLEdBQWVBLE9BQWY7QUFDRDs7QUFFREUsRUFBQUEsS0FBSyxDQUFDQyxVQUFELEVBQWFDLFNBQWIsRUFBd0JDLFNBQXhCLEVBQW1DQyxRQUFuQyxFQUE2QztBQUNoRCxXQUFPLEtBQUtDLE1BQUwsQ0FBWSxPQUFaLEVBQXFCSixVQUFyQixFQUFpQ0MsU0FBakMsRUFBNENDLFNBQTVDLEVBQXVEQyxRQUF2RCxDQUFQO0FBQ0Q7O0FBRURFLEVBQUFBLEdBQUcsQ0FBQ0wsVUFBRCxFQUFhQyxTQUFiLEVBQXdCQyxTQUF4QixFQUFtQ0MsUUFBbkMsRUFBNkM7QUFDOUMsV0FBTyxLQUFLQyxNQUFMLENBQVksS0FBWixFQUFtQkosVUFBbkIsRUFBK0JDLFNBQS9CLEVBQTBDQyxTQUExQyxFQUFxREMsUUFBckQsQ0FBUDtBQUNEOztBQUVEQyxFQUFBQSxNQUFNLENBQUNFLElBQUQsRUFBT04sVUFBUCxFQUFtQkMsU0FBbkIsRUFBOEJDLFNBQTlCLEVBQXlDQyxRQUF6QyxFQUFtRDtBQUN2RCxXQUFPLEtBQUtOLE9BQUwsQ0FBYVUsR0FBYixDQUFpQkMsa0JBQWpCLENBQ0wsa0JBQWtCRixJQURiLEVBRUw7QUFBRSxvQkFBY04sVUFBaEI7QUFBNEJDLE1BQUFBLFNBQTVCO0FBQXVDQyxNQUFBQTtBQUF2QyxLQUZLLEVBR0wsS0FBS0wsT0FBTCxDQUFhVSxHQUFiLENBQWlCRSxnQ0FBakIsQ0FBa0ROLFFBQWxELEVBQTRELEdBQTVELENBSEssQ0FBUDtBQUtEOztBQXBCYzs7ZUF1QkZULFUiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuY2xhc3MgQ29udmVyc2lvbiB7XG4gIGNvbnN0cnVjdG9yKGNyZWRlbnRpYWxzLCBvcHRpb25zKSB7XG4gICAgdGhpcy5jcmVkcyA9IGNyZWRlbnRpYWxzO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICB2b2ljZShtZXNzYWdlX2lkLCBkZWxpdmVyZWQsIHRpbWVzdGFtcCwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5zdWJtaXQoXCJ2b2ljZVwiLCBtZXNzYWdlX2lkLCBkZWxpdmVyZWQsIHRpbWVzdGFtcCwgY2FsbGJhY2spO1xuICB9XG5cbiAgc21zKG1lc3NhZ2VfaWQsIGRlbGl2ZXJlZCwgdGltZXN0YW1wLCBjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLnN1Ym1pdChcInNtc1wiLCBtZXNzYWdlX2lkLCBkZWxpdmVyZWQsIHRpbWVzdGFtcCwgY2FsbGJhY2spO1xuICB9XG5cbiAgc3VibWl0KHR5cGUsIG1lc3NhZ2VfaWQsIGRlbGl2ZXJlZCwgdGltZXN0YW1wLCBjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYXBpLnBvc3RVc2VRdWVyeVN0cmluZyhcbiAgICAgIFwiL2NvbnZlcnNpb25zL1wiICsgdHlwZSxcbiAgICAgIHsgXCJtZXNzYWdlLWlkXCI6IG1lc3NhZ2VfaWQsIGRlbGl2ZXJlZCwgdGltZXN0YW1wIH0sXG4gICAgICB0aGlzLm9wdGlvbnMuYXBpLl9hZGRMaW1pdGVkQWNjZXNzTWVzc2FnZVRvRXJyb3JzKGNhbGxiYWNrLCA0MDIpXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb252ZXJzaW9uO1xuIl19