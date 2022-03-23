/**
 * @fileoverview gRPC-Web generated client stub for api.gamebox
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.api = {};
proto.api.gamebox = require('./gameboxapi_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.api.gamebox.GameboxApiClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.api.gamebox.GameboxApiPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ListStatusTypeRequest,
 *   !proto.api.gamebox.ListStatusTypeResponse>}
 */
const methodDescriptor_GameboxApi_ListStatusType = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/ListStatusType',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ListStatusTypeRequest,
  proto.api.gamebox.ListStatusTypeResponse,
  /**
   * @param {!proto.api.gamebox.ListStatusTypeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ListStatusTypeResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ListStatusTypeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ListStatusTypeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ListStatusTypeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.listStatusType =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListStatusType',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListStatusType,
      callback);
};


/**
 * @param {!proto.api.gamebox.ListStatusTypeRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ListStatusTypeResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.listStatusType =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListStatusType',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListStatusType);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ListWinTypeRequest,
 *   !proto.api.gamebox.ListWinTypeResponse>}
 */
const methodDescriptor_GameboxApi_ListWinType = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/ListWinType',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ListWinTypeRequest,
  proto.api.gamebox.ListWinTypeResponse,
  /**
   * @param {!proto.api.gamebox.ListWinTypeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ListWinTypeResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ListWinTypeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ListWinTypeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ListWinTypeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.listWinType =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListWinType',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListWinType,
      callback);
};


/**
 * @param {!proto.api.gamebox.ListWinTypeRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ListWinTypeResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.listWinType =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListWinType',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListWinType);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ListTimezonesRequest,
 *   !proto.api.gamebox.ListTimezonesResponse>}
 */
const methodDescriptor_GameboxApi_ListTimezones = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/ListTimezones',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ListTimezonesRequest,
  proto.api.gamebox.ListTimezonesResponse,
  /**
   * @param {!proto.api.gamebox.ListTimezonesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ListTimezonesResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ListTimezonesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ListTimezonesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ListTimezonesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.listTimezones =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListTimezones',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListTimezones,
      callback);
};


/**
 * @param {!proto.api.gamebox.ListTimezonesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ListTimezonesResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.listTimezones =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListTimezones',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListTimezones);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.SignInRequest,
 *   !proto.api.gamebox.SignInResponse>}
 */
const methodDescriptor_GameboxApi_SignIn = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/SignIn',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.SignInRequest,
  proto.api.gamebox.SignInResponse,
  /**
   * @param {!proto.api.gamebox.SignInRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.SignInResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.SignInRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.SignInResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.SignInResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.signIn =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/SignIn',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_SignIn,
      callback);
};


/**
 * @param {!proto.api.gamebox.SignInRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.SignInResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.signIn =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/SignIn',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_SignIn);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.AddUserRequest,
 *   !proto.api.gamebox.AddUserResponse>}
 */
const methodDescriptor_GameboxApi_AddUser = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/AddUser',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.AddUserRequest,
  proto.api.gamebox.AddUserResponse,
  /**
   * @param {!proto.api.gamebox.AddUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.AddUserResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.AddUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.AddUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.AddUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.addUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/AddUser',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_AddUser,
      callback);
};


/**
 * @param {!proto.api.gamebox.AddUserRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.AddUserResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.addUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/AddUser',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_AddUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.UpdateMsgTokenRequest,
 *   !proto.api.gamebox.UpdateMsgTokenResponse>}
 */
const methodDescriptor_GameboxApi_UpdateMsgToken = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/UpdateMsgToken',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.UpdateMsgTokenRequest,
  proto.api.gamebox.UpdateMsgTokenResponse,
  /**
   * @param {!proto.api.gamebox.UpdateMsgTokenRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.UpdateMsgTokenResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.UpdateMsgTokenRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.UpdateMsgTokenResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.UpdateMsgTokenResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.updateMsgToken =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/UpdateMsgToken',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_UpdateMsgToken,
      callback);
};


/**
 * @param {!proto.api.gamebox.UpdateMsgTokenRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.UpdateMsgTokenResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.updateMsgToken =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/UpdateMsgToken',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_UpdateMsgToken);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.UpdateSocialLinkFBRequest,
 *   !proto.api.gamebox.UpdateSocialLinkFBResponse>}
 */
const methodDescriptor_GameboxApi_UpdateSocialLinkFB = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/UpdateSocialLinkFB',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.UpdateSocialLinkFBRequest,
  proto.api.gamebox.UpdateSocialLinkFBResponse,
  /**
   * @param {!proto.api.gamebox.UpdateSocialLinkFBRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.UpdateSocialLinkFBResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.UpdateSocialLinkFBRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.UpdateSocialLinkFBResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.UpdateSocialLinkFBResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.updateSocialLinkFB =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/UpdateSocialLinkFB',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_UpdateSocialLinkFB,
      callback);
};


/**
 * @param {!proto.api.gamebox.UpdateSocialLinkFBRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.UpdateSocialLinkFBResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.updateSocialLinkFB =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/UpdateSocialLinkFB',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_UpdateSocialLinkFB);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.UpdateSocialLinkGoogleRequest,
 *   !proto.api.gamebox.UpdateSocialLinkGoogleResponse>}
 */
const methodDescriptor_GameboxApi_UpdateSocialLinkGoogle = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/UpdateSocialLinkGoogle',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.UpdateSocialLinkGoogleRequest,
  proto.api.gamebox.UpdateSocialLinkGoogleResponse,
  /**
   * @param {!proto.api.gamebox.UpdateSocialLinkGoogleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.UpdateSocialLinkGoogleResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.UpdateSocialLinkGoogleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.UpdateSocialLinkGoogleResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.UpdateSocialLinkGoogleResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.updateSocialLinkGoogle =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/UpdateSocialLinkGoogle',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_UpdateSocialLinkGoogle,
      callback);
};


/**
 * @param {!proto.api.gamebox.UpdateSocialLinkGoogleRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.UpdateSocialLinkGoogleResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.updateSocialLinkGoogle =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/UpdateSocialLinkGoogle',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_UpdateSocialLinkGoogle);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.UpdateAddressRequest,
 *   !proto.api.gamebox.UpdateAddressResponse>}
 */
const methodDescriptor_GameboxApi_UpdateAddress = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/UpdateAddress',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.UpdateAddressRequest,
  proto.api.gamebox.UpdateAddressResponse,
  /**
   * @param {!proto.api.gamebox.UpdateAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.UpdateAddressResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.UpdateAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.UpdateAddressResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.UpdateAddressResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.updateAddress =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/UpdateAddress',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_UpdateAddress,
      callback);
};


/**
 * @param {!proto.api.gamebox.UpdateAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.UpdateAddressResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.updateAddress =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/UpdateAddress',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_UpdateAddress);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.UpdateUserSettingsRequest,
 *   !proto.api.gamebox.UpdateUserSettingsResponse>}
 */
const methodDescriptor_GameboxApi_UpdateUserSettings = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/UpdateUserSettings',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.UpdateUserSettingsRequest,
  proto.api.gamebox.UpdateUserSettingsResponse,
  /**
   * @param {!proto.api.gamebox.UpdateUserSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.UpdateUserSettingsResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.UpdateUserSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.UpdateUserSettingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.UpdateUserSettingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.updateUserSettings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/UpdateUserSettings',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_UpdateUserSettings,
      callback);
};


/**
 * @param {!proto.api.gamebox.UpdateUserSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.UpdateUserSettingsResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.updateUserSettings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/UpdateUserSettings',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_UpdateUserSettings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ChangePasswordRequest,
 *   !proto.api.gamebox.ChangePasswordResponse>}
 */
const methodDescriptor_GameboxApi_ChangePassword = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/ChangePassword',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ChangePasswordRequest,
  proto.api.gamebox.ChangePasswordResponse,
  /**
   * @param {!proto.api.gamebox.ChangePasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ChangePasswordResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ChangePasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ChangePasswordResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ChangePasswordResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.changePassword =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ChangePassword',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ChangePassword,
      callback);
};


/**
 * @param {!proto.api.gamebox.ChangePasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ChangePasswordResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.changePassword =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ChangePassword',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ChangePassword);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.GetPlayerRequest,
 *   !proto.api.gamebox.GetPlayerResponse>}
 */
const methodDescriptor_GameboxApi_GetPlayer = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/GetPlayer',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.GetPlayerRequest,
  proto.api.gamebox.GetPlayerResponse,
  /**
   * @param {!proto.api.gamebox.GetPlayerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.GetPlayerResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.GetPlayerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.GetPlayerResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.GetPlayerResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.getPlayer =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetPlayer',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetPlayer,
      callback);
};


/**
 * @param {!proto.api.gamebox.GetPlayerRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.GetPlayerResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.getPlayer =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetPlayer',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetPlayer);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.GetConfigRequest,
 *   !proto.api.gamebox.GetConfigResponse>}
 */
const methodDescriptor_GameboxApi_GetConfig = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/GetConfig',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.GetConfigRequest,
  proto.api.gamebox.GetConfigResponse,
  /**
   * @param {!proto.api.gamebox.GetConfigRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.GetConfigResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.GetConfigRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.GetConfigResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.GetConfigResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.getConfig =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetConfig',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetConfig,
      callback);
};


/**
 * @param {!proto.api.gamebox.GetConfigRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.GetConfigResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.getConfig =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetConfig',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetConfig);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ListSpinnerRuleRequest,
 *   !proto.api.gamebox.ListSpinnerRuleResponse>}
 */
const methodDescriptor_GameboxApi_ListSpinnerRule = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/ListSpinnerRule',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ListSpinnerRuleRequest,
  proto.api.gamebox.ListSpinnerRuleResponse,
  /**
   * @param {!proto.api.gamebox.ListSpinnerRuleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ListSpinnerRuleResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ListSpinnerRuleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ListSpinnerRuleResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ListSpinnerRuleResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.listSpinnerRule =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListSpinnerRule',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListSpinnerRule,
      callback);
};


/**
 * @param {!proto.api.gamebox.ListSpinnerRuleRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ListSpinnerRuleResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.listSpinnerRule =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListSpinnerRule',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListSpinnerRule);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ListGameLeaderRuleRequest,
 *   !proto.api.gamebox.ListGameLeaderRuleResponse>}
 */
const methodDescriptor_GameboxApi_ListGameLeaderRule = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/ListGameLeaderRule',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ListGameLeaderRuleRequest,
  proto.api.gamebox.ListGameLeaderRuleResponse,
  /**
   * @param {!proto.api.gamebox.ListGameLeaderRuleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ListGameLeaderRuleResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ListGameLeaderRuleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ListGameLeaderRuleResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ListGameLeaderRuleResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.listGameLeaderRule =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListGameLeaderRule',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListGameLeaderRule,
      callback);
};


/**
 * @param {!proto.api.gamebox.ListGameLeaderRuleRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ListGameLeaderRuleResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.listGameLeaderRule =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListGameLeaderRule',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListGameLeaderRule);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ListGameRequest,
 *   !proto.api.gamebox.ListGameResponse>}
 */
const methodDescriptor_GameboxApi_ListGame = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/ListGame',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ListGameRequest,
  proto.api.gamebox.ListGameResponse,
  /**
   * @param {!proto.api.gamebox.ListGameRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ListGameResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ListGameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ListGameResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ListGameResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.listGame =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListGame',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListGame,
      callback);
};


/**
 * @param {!proto.api.gamebox.ListGameRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ListGameResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.listGame =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListGame',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListGame);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.GetGameCodeRequest,
 *   !proto.api.gamebox.GetGameCodeResponse>}
 */
const methodDescriptor_GameboxApi_GetGameCode = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/GetGameCode',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.GetGameCodeRequest,
  proto.api.gamebox.GetGameCodeResponse,
  /**
   * @param {!proto.api.gamebox.GetGameCodeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.GetGameCodeResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.GetGameCodeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.GetGameCodeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.GetGameCodeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.getGameCode =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetGameCode',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetGameCode,
      callback);
};


/**
 * @param {!proto.api.gamebox.GetGameCodeRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.GetGameCodeResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.getGameCode =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetGameCode',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetGameCode);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.GetGameDetailRequest,
 *   !proto.api.gamebox.GetGameDetailResponse>}
 */
const methodDescriptor_GameboxApi_GetGameDetail = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/GetGameDetail',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.GetGameDetailRequest,
  proto.api.gamebox.GetGameDetailResponse,
  /**
   * @param {!proto.api.gamebox.GetGameDetailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.GetGameDetailResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.GetGameDetailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.GetGameDetailResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.GetGameDetailResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.getGameDetail =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetGameDetail',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetGameDetail,
      callback);
};


/**
 * @param {!proto.api.gamebox.GetGameDetailRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.GetGameDetailResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.getGameDetail =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetGameDetail',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetGameDetail);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.GetSpinAvailableRequest,
 *   !proto.api.gamebox.GetSpinAvailableResponse>}
 */
const methodDescriptor_GameboxApi_GetSpinAvailable = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/GetSpinAvailable',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.GetSpinAvailableRequest,
  proto.api.gamebox.GetSpinAvailableResponse,
  /**
   * @param {!proto.api.gamebox.GetSpinAvailableRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.GetSpinAvailableResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.GetSpinAvailableRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.GetSpinAvailableResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.GetSpinAvailableResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.getSpinAvailable =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetSpinAvailable',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetSpinAvailable,
      callback);
};


/**
 * @param {!proto.api.gamebox.GetSpinAvailableRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.GetSpinAvailableResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.getSpinAvailable =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetSpinAvailable',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetSpinAvailable);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.LogSExtraRequest,
 *   !proto.api.gamebox.LogSExtraResponse>}
 */
const methodDescriptor_GameboxApi_LogSExtra = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/LogSExtra',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.LogSExtraRequest,
  proto.api.gamebox.LogSExtraResponse,
  /**
   * @param {!proto.api.gamebox.LogSExtraRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.LogSExtraResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.LogSExtraRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.LogSExtraResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.LogSExtraResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.logSExtra =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/LogSExtra',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_LogSExtra,
      callback);
};


/**
 * @param {!proto.api.gamebox.LogSExtraRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.LogSExtraResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.logSExtra =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/LogSExtra',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_LogSExtra);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.LogSEnterRequest,
 *   !proto.api.gamebox.LogSEnterResponse>}
 */
const methodDescriptor_GameboxApi_LogSEnter = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/LogSEnter',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.LogSEnterRequest,
  proto.api.gamebox.LogSEnterResponse,
  /**
   * @param {!proto.api.gamebox.LogSEnterRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.LogSEnterResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.LogSEnterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.LogSEnterResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.LogSEnterResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.logSEnter =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/LogSEnter',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_LogSEnter,
      callback);
};


/**
 * @param {!proto.api.gamebox.LogSEnterRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.LogSEnterResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.logSEnter =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/LogSEnter',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_LogSEnter);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.LogSLeaveRequest,
 *   !proto.api.gamebox.LogSLeaveResponse>}
 */
const methodDescriptor_GameboxApi_LogSLeave = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/LogSLeave',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.LogSLeaveRequest,
  proto.api.gamebox.LogSLeaveResponse,
  /**
   * @param {!proto.api.gamebox.LogSLeaveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.LogSLeaveResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.LogSLeaveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.LogSLeaveResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.LogSLeaveResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.logSLeave =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/LogSLeave',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_LogSLeave,
      callback);
};


/**
 * @param {!proto.api.gamebox.LogSLeaveRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.LogSLeaveResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.logSLeave =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/LogSLeave',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_LogSLeave);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.LogGEnterRequest,
 *   !proto.api.gamebox.LogGEnterResponse>}
 */
const methodDescriptor_GameboxApi_LogGEnter = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/LogGEnter',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.LogGEnterRequest,
  proto.api.gamebox.LogGEnterResponse,
  /**
   * @param {!proto.api.gamebox.LogGEnterRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.LogGEnterResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.LogGEnterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.LogGEnterResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.LogGEnterResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.logGEnter =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/LogGEnter',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_LogGEnter,
      callback);
};


/**
 * @param {!proto.api.gamebox.LogGEnterRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.LogGEnterResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.logGEnter =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/LogGEnter',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_LogGEnter);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.LogGLeaveRequest,
 *   !proto.api.gamebox.LogGLeaveResponse>}
 */
const methodDescriptor_GameboxApi_LogGLeave = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/LogGLeave',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.LogGLeaveRequest,
  proto.api.gamebox.LogGLeaveResponse,
  /**
   * @param {!proto.api.gamebox.LogGLeaveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.LogGLeaveResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.LogGLeaveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.LogGLeaveResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.LogGLeaveResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.logGLeave =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/LogGLeave',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_LogGLeave,
      callback);
};


/**
 * @param {!proto.api.gamebox.LogGLeaveRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.LogGLeaveResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.logGLeave =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/LogGLeave',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_LogGLeave);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ListLogGRequest,
 *   !proto.api.gamebox.ListLogGResponse>}
 */
const methodDescriptor_GameboxApi_ListLogG = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/ListLogG',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ListLogGRequest,
  proto.api.gamebox.ListLogGResponse,
  /**
   * @param {!proto.api.gamebox.ListLogGRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ListLogGResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ListLogGRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ListLogGResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ListLogGResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.listLogG =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListLogG',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListLogG,
      callback);
};


/**
 * @param {!proto.api.gamebox.ListLogGRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ListLogGResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.listLogG =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListLogG',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListLogG);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ListLogPrizePoolRequest,
 *   !proto.api.gamebox.ListLogPrizePoolResponse>}
 */
const methodDescriptor_GameboxApi_ListLogPrizePool = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/ListLogPrizePool',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ListLogPrizePoolRequest,
  proto.api.gamebox.ListLogPrizePoolResponse,
  /**
   * @param {!proto.api.gamebox.ListLogPrizePoolRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ListLogPrizePoolResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ListLogPrizePoolRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ListLogPrizePoolResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ListLogPrizePoolResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.listLogPrizePool =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListLogPrizePool',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListLogPrizePool,
      callback);
};


/**
 * @param {!proto.api.gamebox.ListLogPrizePoolRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ListLogPrizePoolResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.listLogPrizePool =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListLogPrizePool',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListLogPrizePool);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ListLeaderboardRequest,
 *   !proto.api.gamebox.ListLeaderboardResponse>}
 */
const methodDescriptor_GameboxApi_ListLeaderboard = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/ListLeaderboard',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ListLeaderboardRequest,
  proto.api.gamebox.ListLeaderboardResponse,
  /**
   * @param {!proto.api.gamebox.ListLeaderboardRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ListLeaderboardResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ListLeaderboardRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ListLeaderboardResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ListLeaderboardResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.listLeaderboard =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListLeaderboard',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListLeaderboard,
      callback);
};


/**
 * @param {!proto.api.gamebox.ListLeaderboardRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ListLeaderboardResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.listLeaderboard =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListLeaderboard',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListLeaderboard);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ListLeaderboardHistoryRequest,
 *   !proto.api.gamebox.ListLeaderboardHistoryResponse>}
 */
const methodDescriptor_GameboxApi_ListLeaderboardHistory = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/ListLeaderboardHistory',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ListLeaderboardHistoryRequest,
  proto.api.gamebox.ListLeaderboardHistoryResponse,
  /**
   * @param {!proto.api.gamebox.ListLeaderboardHistoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ListLeaderboardHistoryResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ListLeaderboardHistoryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ListLeaderboardHistoryResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ListLeaderboardHistoryResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.listLeaderboardHistory =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListLeaderboardHistory',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListLeaderboardHistory,
      callback);
};


/**
 * @param {!proto.api.gamebox.ListLeaderboardHistoryRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ListLeaderboardHistoryResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.listLeaderboardHistory =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListLeaderboardHistory',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListLeaderboardHistory);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ListPlayerHighscoreRequest,
 *   !proto.api.gamebox.ListPlayerHighscoreResponse>}
 */
const methodDescriptor_GameboxApi_ListPlayerHighscore = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/ListPlayerHighscore',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ListPlayerHighscoreRequest,
  proto.api.gamebox.ListPlayerHighscoreResponse,
  /**
   * @param {!proto.api.gamebox.ListPlayerHighscoreRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ListPlayerHighscoreResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ListPlayerHighscoreRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ListPlayerHighscoreResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ListPlayerHighscoreResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.listPlayerHighscore =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListPlayerHighscore',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListPlayerHighscore,
      callback);
};


/**
 * @param {!proto.api.gamebox.ListPlayerHighscoreRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ListPlayerHighscoreResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.listPlayerHighscore =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListPlayerHighscore',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListPlayerHighscore);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.GetCurrentPlayerRankRequest,
 *   !proto.api.gamebox.GetCurrentPlayerRankResponse>}
 */
const methodDescriptor_GameboxApi_GetCurrentPlayerRank = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/GetCurrentPlayerRank',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.GetCurrentPlayerRankRequest,
  proto.api.gamebox.GetCurrentPlayerRankResponse,
  /**
   * @param {!proto.api.gamebox.GetCurrentPlayerRankRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.GetCurrentPlayerRankResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.GetCurrentPlayerRankRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.GetCurrentPlayerRankResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.GetCurrentPlayerRankResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.getCurrentPlayerRank =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetCurrentPlayerRank',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetCurrentPlayerRank,
      callback);
};


/**
 * @param {!proto.api.gamebox.GetCurrentPlayerRankRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.GetCurrentPlayerRankResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.getCurrentPlayerRank =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetCurrentPlayerRank',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetCurrentPlayerRank);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.AddInviteRequest,
 *   !proto.api.gamebox.AddInviteResponse>}
 */
const methodDescriptor_GameboxApi_AddInvite = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/AddInvite',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.AddInviteRequest,
  proto.api.gamebox.AddInviteResponse,
  /**
   * @param {!proto.api.gamebox.AddInviteRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.AddInviteResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.AddInviteRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.AddInviteResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.AddInviteResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.addInvite =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/AddInvite',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_AddInvite,
      callback);
};


/**
 * @param {!proto.api.gamebox.AddInviteRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.AddInviteResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.addInvite =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/AddInvite',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_AddInvite);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ListInvitedByRequest,
 *   !proto.api.gamebox.ListInvitedByResponse>}
 */
const methodDescriptor_GameboxApi_ListInvitedBy = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/ListInvitedBy',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ListInvitedByRequest,
  proto.api.gamebox.ListInvitedByResponse,
  /**
   * @param {!proto.api.gamebox.ListInvitedByRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ListInvitedByResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ListInvitedByRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ListInvitedByResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ListInvitedByResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.listInvitedBy =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListInvitedBy',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListInvitedBy,
      callback);
};


/**
 * @param {!proto.api.gamebox.ListInvitedByRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ListInvitedByResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.listInvitedBy =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListInvitedBy',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListInvitedBy);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ListItemRequest,
 *   !proto.api.gamebox.ListItemResponse>}
 */
const methodDescriptor_GameboxApi_ListItem = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/ListItem',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ListItemRequest,
  proto.api.gamebox.ListItemResponse,
  /**
   * @param {!proto.api.gamebox.ListItemRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ListItemResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ListItemRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ListItemResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ListItemResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.listItem =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListItem',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListItem,
      callback);
};


/**
 * @param {!proto.api.gamebox.ListItemRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ListItemResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.listItem =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListItem',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListItem);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.GetItemCountRequest,
 *   !proto.api.gamebox.GetItemCountResponse>}
 */
const methodDescriptor_GameboxApi_GetItemCount = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/GetItemCount',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.GetItemCountRequest,
  proto.api.gamebox.GetItemCountResponse,
  /**
   * @param {!proto.api.gamebox.GetItemCountRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.GetItemCountResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.GetItemCountRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.GetItemCountResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.GetItemCountResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.getItemCount =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetItemCount',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetItemCount,
      callback);
};


/**
 * @param {!proto.api.gamebox.GetItemCountRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.GetItemCountResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.getItemCount =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetItemCount',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetItemCount);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ListItemTypeRequest,
 *   !proto.api.gamebox.ListItemTypeResponse>}
 */
const methodDescriptor_GameboxApi_ListItemType = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/ListItemType',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ListItemTypeRequest,
  proto.api.gamebox.ListItemTypeResponse,
  /**
   * @param {!proto.api.gamebox.ListItemTypeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ListItemTypeResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ListItemTypeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ListItemTypeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ListItemTypeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.listItemType =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListItemType',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListItemType,
      callback);
};


/**
 * @param {!proto.api.gamebox.ListItemTypeRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ListItemTypeResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.listItemType =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListItemType',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListItemType);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.GetPrizeTicketPoolRequest,
 *   !proto.api.gamebox.GetPrizeTicketPoolResponse>}
 */
const methodDescriptor_GameboxApi_GetPrizeTicketPool = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/GetPrizeTicketPool',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.GetPrizeTicketPoolRequest,
  proto.api.gamebox.GetPrizeTicketPoolResponse,
  /**
   * @param {!proto.api.gamebox.GetPrizeTicketPoolRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.GetPrizeTicketPoolResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.GetPrizeTicketPoolRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.GetPrizeTicketPoolResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.GetPrizeTicketPoolResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.getPrizeTicketPool =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetPrizeTicketPool',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetPrizeTicketPool,
      callback);
};


/**
 * @param {!proto.api.gamebox.GetPrizeTicketPoolRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.GetPrizeTicketPoolResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.getPrizeTicketPool =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetPrizeTicketPool',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetPrizeTicketPool);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.GetPrizeTicketsCollectedRequest,
 *   !proto.api.gamebox.GetPrizeTicketsCollectedResponse>}
 */
const methodDescriptor_GameboxApi_GetPrizeTicketsCollected = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/GetPrizeTicketsCollected',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.GetPrizeTicketsCollectedRequest,
  proto.api.gamebox.GetPrizeTicketsCollectedResponse,
  /**
   * @param {!proto.api.gamebox.GetPrizeTicketsCollectedRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.GetPrizeTicketsCollectedResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.GetPrizeTicketsCollectedRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.GetPrizeTicketsCollectedResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.GetPrizeTicketsCollectedResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.getPrizeTicketsCollected =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetPrizeTicketsCollected',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetPrizeTicketsCollected,
      callback);
};


/**
 * @param {!proto.api.gamebox.GetPrizeTicketsCollectedRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.GetPrizeTicketsCollectedResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.getPrizeTicketsCollected =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetPrizeTicketsCollected',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetPrizeTicketsCollected);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ListPrizeRequest,
 *   !proto.api.gamebox.ListPrizeResponse>}
 */
const methodDescriptor_GameboxApi_ListPrize = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/ListPrize',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ListPrizeRequest,
  proto.api.gamebox.ListPrizeResponse,
  /**
   * @param {!proto.api.gamebox.ListPrizeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ListPrizeResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ListPrizeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ListPrizeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ListPrizeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.listPrize =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListPrize',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListPrize,
      callback);
};


/**
 * @param {!proto.api.gamebox.ListPrizeRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ListPrizeResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.listPrize =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListPrize',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListPrize);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.GetPrizeDetailRequest,
 *   !proto.api.gamebox.GetPrizeDetailResponse>}
 */
const methodDescriptor_GameboxApi_GetPrizeDetail = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/GetPrizeDetail',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.GetPrizeDetailRequest,
  proto.api.gamebox.GetPrizeDetailResponse,
  /**
   * @param {!proto.api.gamebox.GetPrizeDetailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.GetPrizeDetailResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.GetPrizeDetailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.GetPrizeDetailResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.GetPrizeDetailResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.getPrizeDetail =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetPrizeDetail',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetPrizeDetail,
      callback);
};


/**
 * @param {!proto.api.gamebox.GetPrizeDetailRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.GetPrizeDetailResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.getPrizeDetail =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetPrizeDetail',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetPrizeDetail);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.GetTotalTicketsSinceRequest,
 *   !proto.api.gamebox.GetTotalTicketsSinceResponse>}
 */
const methodDescriptor_GameboxApi_GetTotalTicketsSince = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/GetTotalTicketsSince',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.GetTotalTicketsSinceRequest,
  proto.api.gamebox.GetTotalTicketsSinceResponse,
  /**
   * @param {!proto.api.gamebox.GetTotalTicketsSinceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.GetTotalTicketsSinceResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.GetTotalTicketsSinceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.GetTotalTicketsSinceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.GetTotalTicketsSinceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.getTotalTicketsSince =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetTotalTicketsSince',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetTotalTicketsSince,
      callback);
};


/**
 * @param {!proto.api.gamebox.GetTotalTicketsSinceRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.GetTotalTicketsSinceResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.getTotalTicketsSince =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetTotalTicketsSince',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetTotalTicketsSince);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ListRankRequest,
 *   !proto.api.gamebox.ListRankResponse>}
 */
const methodDescriptor_GameboxApi_ListRank = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/ListRank',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ListRankRequest,
  proto.api.gamebox.ListRankResponse,
  /**
   * @param {!proto.api.gamebox.ListRankRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ListRankResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ListRankRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ListRankResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ListRankResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.listRank =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListRank',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListRank,
      callback);
};


/**
 * @param {!proto.api.gamebox.ListRankRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ListRankResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.listRank =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListRank',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListRank);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.BuyRequest,
 *   !proto.api.gamebox.BuyResponse>}
 */
const methodDescriptor_GameboxApi_Buy = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/Buy',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.BuyRequest,
  proto.api.gamebox.BuyResponse,
  /**
   * @param {!proto.api.gamebox.BuyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.BuyResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.BuyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.BuyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.BuyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.buy =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/Buy',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_Buy,
      callback);
};


/**
 * @param {!proto.api.gamebox.BuyRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.BuyResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.buy =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/Buy',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_Buy);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ListBuyRequest,
 *   !proto.api.gamebox.ListBuyResponse>}
 */
const methodDescriptor_GameboxApi_ListBuy = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/ListBuy',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ListBuyRequest,
  proto.api.gamebox.ListBuyResponse,
  /**
   * @param {!proto.api.gamebox.ListBuyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ListBuyResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ListBuyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ListBuyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ListBuyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.listBuy =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListBuy',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListBuy,
      callback);
};


/**
 * @param {!proto.api.gamebox.ListBuyRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ListBuyResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.listBuy =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListBuy',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListBuy);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.GetActiveSubscriptionRequest,
 *   !proto.api.gamebox.GetActiveSubscriptionResponse>}
 */
const methodDescriptor_GameboxApi_GetActiveSubscription = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/GetActiveSubscription',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.GetActiveSubscriptionRequest,
  proto.api.gamebox.GetActiveSubscriptionResponse,
  /**
   * @param {!proto.api.gamebox.GetActiveSubscriptionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.GetActiveSubscriptionResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.GetActiveSubscriptionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.GetActiveSubscriptionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.GetActiveSubscriptionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.getActiveSubscription =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetActiveSubscription',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetActiveSubscription,
      callback);
};


/**
 * @param {!proto.api.gamebox.GetActiveSubscriptionRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.GetActiveSubscriptionResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.getActiveSubscription =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetActiveSubscription',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetActiveSubscription);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.CancelRequest,
 *   !proto.api.gamebox.CancelResponse>}
 */
const methodDescriptor_GameboxApi_Cancel = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/Cancel',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.CancelRequest,
  proto.api.gamebox.CancelResponse,
  /**
   * @param {!proto.api.gamebox.CancelRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.CancelResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.CancelRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.CancelResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.CancelResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.cancel =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/Cancel',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_Cancel,
      callback);
};


/**
 * @param {!proto.api.gamebox.CancelRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.CancelResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.cancel =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/Cancel',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_Cancel);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ActivateRequest,
 *   !proto.api.gamebox.ActivateResponse>}
 */
const methodDescriptor_GameboxApi_Activate = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/Activate',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ActivateRequest,
  proto.api.gamebox.ActivateResponse,
  /**
   * @param {!proto.api.gamebox.ActivateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ActivateResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ActivateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ActivateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ActivateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.activate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/Activate',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_Activate,
      callback);
};


/**
 * @param {!proto.api.gamebox.ActivateRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ActivateResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.activate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/Activate',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_Activate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ListSubscriptionRequest,
 *   !proto.api.gamebox.ListSubscriptionResponse>}
 */
const methodDescriptor_GameboxApi_ListSubscription = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/ListSubscription',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ListSubscriptionRequest,
  proto.api.gamebox.ListSubscriptionResponse,
  /**
   * @param {!proto.api.gamebox.ListSubscriptionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ListSubscriptionResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ListSubscriptionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ListSubscriptionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ListSubscriptionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.listSubscription =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListSubscription',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListSubscription,
      callback);
};


/**
 * @param {!proto.api.gamebox.ListSubscriptionRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ListSubscriptionResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.listSubscription =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListSubscription',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListSubscription);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.GetSubscriptionCountRequest,
 *   !proto.api.gamebox.GetSubscriptionCountResponse>}
 */
const methodDescriptor_GameboxApi_GetSubscriptionCount = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/GetSubscriptionCount',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.GetSubscriptionCountRequest,
  proto.api.gamebox.GetSubscriptionCountResponse,
  /**
   * @param {!proto.api.gamebox.GetSubscriptionCountRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.GetSubscriptionCountResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.GetSubscriptionCountRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.GetSubscriptionCountResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.GetSubscriptionCountResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.getSubscriptionCount =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetSubscriptionCount',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetSubscriptionCount,
      callback);
};


/**
 * @param {!proto.api.gamebox.GetSubscriptionCountRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.GetSubscriptionCountResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.getSubscriptionCount =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetSubscriptionCount',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetSubscriptionCount);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ListSubscriptionTypeRequest,
 *   !proto.api.gamebox.ListSubscriptionTypeResponse>}
 */
const methodDescriptor_GameboxApi_ListSubscriptionType = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/ListSubscriptionType',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ListSubscriptionTypeRequest,
  proto.api.gamebox.ListSubscriptionTypeResponse,
  /**
   * @param {!proto.api.gamebox.ListSubscriptionTypeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ListSubscriptionTypeResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ListSubscriptionTypeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ListSubscriptionTypeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ListSubscriptionTypeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.listSubscriptionType =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListSubscriptionType',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListSubscriptionType,
      callback);
};


/**
 * @param {!proto.api.gamebox.ListSubscriptionTypeRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ListSubscriptionTypeResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.listSubscriptionType =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListSubscriptionType',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListSubscriptionType);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ListWinnerRequest,
 *   !proto.api.gamebox.ListWinnerResponse>}
 */
const methodDescriptor_GameboxApi_ListWinner = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/ListWinner',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ListWinnerRequest,
  proto.api.gamebox.ListWinnerResponse,
  /**
   * @param {!proto.api.gamebox.ListWinnerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ListWinnerResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ListWinnerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ListWinnerResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ListWinnerResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.listWinner =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListWinner',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListWinner,
      callback);
};


/**
 * @param {!proto.api.gamebox.ListWinnerRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ListWinnerResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.listWinner =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListWinner',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListWinner);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ListWinnerRecentRequest,
 *   !proto.api.gamebox.ListWinnerRecentResponse>}
 */
const methodDescriptor_GameboxApi_ListWinnerRecent = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/ListWinnerRecent',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ListWinnerRecentRequest,
  proto.api.gamebox.ListWinnerRecentResponse,
  /**
   * @param {!proto.api.gamebox.ListWinnerRecentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ListWinnerRecentResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ListWinnerRecentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ListWinnerRecentResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ListWinnerRecentResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.listWinnerRecent =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListWinnerRecent',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListWinnerRecent,
      callback);
};


/**
 * @param {!proto.api.gamebox.ListWinnerRecentRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ListWinnerRecentResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.listWinnerRecent =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListWinnerRecent',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListWinnerRecent);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ListWinnerUnclaimedRequest,
 *   !proto.api.gamebox.ListWinnerUnclaimedResponse>}
 */
const methodDescriptor_GameboxApi_ListWinnerUnclaimed = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/ListWinnerUnclaimed',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ListWinnerUnclaimedRequest,
  proto.api.gamebox.ListWinnerUnclaimedResponse,
  /**
   * @param {!proto.api.gamebox.ListWinnerUnclaimedRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ListWinnerUnclaimedResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ListWinnerUnclaimedRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ListWinnerUnclaimedResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ListWinnerUnclaimedResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.listWinnerUnclaimed =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListWinnerUnclaimed',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListWinnerUnclaimed,
      callback);
};


/**
 * @param {!proto.api.gamebox.ListWinnerUnclaimedRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ListWinnerUnclaimedResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.listWinnerUnclaimed =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListWinnerUnclaimed',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListWinnerUnclaimed);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ListWinnerClaimedRequest,
 *   !proto.api.gamebox.ListWinnerClaimedResponse>}
 */
const methodDescriptor_GameboxApi_ListWinnerClaimed = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/ListWinnerClaimed',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ListWinnerClaimedRequest,
  proto.api.gamebox.ListWinnerClaimedResponse,
  /**
   * @param {!proto.api.gamebox.ListWinnerClaimedRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ListWinnerClaimedResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ListWinnerClaimedRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ListWinnerClaimedResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ListWinnerClaimedResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.listWinnerClaimed =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListWinnerClaimed',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListWinnerClaimed,
      callback);
};


/**
 * @param {!proto.api.gamebox.ListWinnerClaimedRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ListWinnerClaimedResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.listWinnerClaimed =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListWinnerClaimed',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListWinnerClaimed);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ClaimWinnerRequest,
 *   !proto.api.gamebox.ClaimWinnerResponse>}
 */
const methodDescriptor_GameboxApi_ClaimWinner = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/ClaimWinner',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ClaimWinnerRequest,
  proto.api.gamebox.ClaimWinnerResponse,
  /**
   * @param {!proto.api.gamebox.ClaimWinnerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ClaimWinnerResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ClaimWinnerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ClaimWinnerResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ClaimWinnerResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.claimWinner =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ClaimWinner',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ClaimWinner,
      callback);
};


/**
 * @param {!proto.api.gamebox.ClaimWinnerRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ClaimWinnerResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.claimWinner =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ClaimWinner',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ClaimWinner);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ClaimPrizeRequest,
 *   !proto.api.gamebox.ClaimPrizeResponse>}
 */
const methodDescriptor_GameboxApi_ClaimPrize = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/ClaimPrize',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ClaimPrizeRequest,
  proto.api.gamebox.ClaimPrizeResponse,
  /**
   * @param {!proto.api.gamebox.ClaimPrizeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ClaimPrizeResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ClaimPrizeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ClaimPrizeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ClaimPrizeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.claimPrize =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ClaimPrize',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ClaimPrize,
      callback);
};


/**
 * @param {!proto.api.gamebox.ClaimPrizeRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ClaimPrizeResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.claimPrize =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ClaimPrize',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ClaimPrize);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.ListNotificationRequest,
 *   !proto.api.gamebox.ListNotificationResponse>}
 */
const methodDescriptor_GameboxApi_ListNotification = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/ListNotification',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.ListNotificationRequest,
  proto.api.gamebox.ListNotificationResponse,
  /**
   * @param {!proto.api.gamebox.ListNotificationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.ListNotificationResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.ListNotificationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.ListNotificationResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.ListNotificationResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.listNotification =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListNotification',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListNotification,
      callback);
};


/**
 * @param {!proto.api.gamebox.ListNotificationRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.ListNotificationResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.listNotification =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/ListNotification',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_ListNotification);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.gamebox.GetNotificationNoRequest,
 *   !proto.api.gamebox.GetNotificationNoResponse>}
 */
const methodDescriptor_GameboxApi_GetNotificationNo = new grpc.web.MethodDescriptor(
  '/api.gamebox.GameboxApi/GetNotificationNo',
  grpc.web.MethodType.UNARY,
  proto.api.gamebox.GetNotificationNoRequest,
  proto.api.gamebox.GetNotificationNoResponse,
  /**
   * @param {!proto.api.gamebox.GetNotificationNoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.gamebox.GetNotificationNoResponse.deserializeBinary
);


/**
 * @param {!proto.api.gamebox.GetNotificationNoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.gamebox.GetNotificationNoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.gamebox.GetNotificationNoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.gamebox.GameboxApiClient.prototype.getNotificationNo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetNotificationNo',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetNotificationNo,
      callback);
};


/**
 * @param {!proto.api.gamebox.GetNotificationNoRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.gamebox.GetNotificationNoResponse>}
 *     Promise that resolves to the response
 */
proto.api.gamebox.GameboxApiPromiseClient.prototype.getNotificationNo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.gamebox.GameboxApi/GetNotificationNo',
      request,
      metadata || {},
      methodDescriptor_GameboxApi_GetNotificationNo);
};


module.exports = proto.api.gamebox;

