/**
 * @fileoverview gRPC-Web generated client stub for api.esm
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
proto.api.esm = require('./esmapi_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.api.esm.EsmApiClient =
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
proto.api.esm.EsmApiPromiseClient =
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
 *   !proto.api.esm.ListStatusTypeRequest,
 *   !proto.api.esm.ListStatusTypeResponse>}
 */
const methodDescriptor_EsmApi_ListStatusType = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/ListStatusType',
  grpc.web.MethodType.UNARY,
  proto.api.esm.ListStatusTypeRequest,
  proto.api.esm.ListStatusTypeResponse,
  /**
   * @param {!proto.api.esm.ListStatusTypeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.ListStatusTypeResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.ListStatusTypeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.ListStatusTypeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.ListStatusTypeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.listStatusType =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/ListStatusType',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListStatusType,
      callback);
};


/**
 * @param {!proto.api.esm.ListStatusTypeRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.ListStatusTypeResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.listStatusType =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/ListStatusType',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListStatusType);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.ListWinTypeRequest,
 *   !proto.api.esm.ListWinTypeResponse>}
 */
const methodDescriptor_EsmApi_ListWinType = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/ListWinType',
  grpc.web.MethodType.UNARY,
  proto.api.esm.ListWinTypeRequest,
  proto.api.esm.ListWinTypeResponse,
  /**
   * @param {!proto.api.esm.ListWinTypeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.ListWinTypeResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.ListWinTypeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.ListWinTypeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.ListWinTypeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.listWinType =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/ListWinType',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListWinType,
      callback);
};


/**
 * @param {!proto.api.esm.ListWinTypeRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.ListWinTypeResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.listWinType =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/ListWinType',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListWinType);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.ListTimezonesRequest,
 *   !proto.api.esm.ListTimezonesResponse>}
 */
const methodDescriptor_EsmApi_ListTimezones = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/ListTimezones',
  grpc.web.MethodType.UNARY,
  proto.api.esm.ListTimezonesRequest,
  proto.api.esm.ListTimezonesResponse,
  /**
   * @param {!proto.api.esm.ListTimezonesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.ListTimezonesResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.ListTimezonesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.ListTimezonesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.ListTimezonesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.listTimezones =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/ListTimezones',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListTimezones,
      callback);
};


/**
 * @param {!proto.api.esm.ListTimezonesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.ListTimezonesResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.listTimezones =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/ListTimezones',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListTimezones);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.SignInRequest,
 *   !proto.api.esm.SignInResponse>}
 */
const methodDescriptor_EsmApi_SignIn = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/SignIn',
  grpc.web.MethodType.UNARY,
  proto.api.esm.SignInRequest,
  proto.api.esm.SignInResponse,
  /**
   * @param {!proto.api.esm.SignInRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.SignInResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.SignInRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.SignInResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.SignInResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.signIn =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/SignIn',
      request,
      metadata || {},
      methodDescriptor_EsmApi_SignIn,
      callback);
};


/**
 * @param {!proto.api.esm.SignInRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.SignInResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.signIn =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/SignIn',
      request,
      metadata || {},
      methodDescriptor_EsmApi_SignIn);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.AddUserRequest,
 *   !proto.api.esm.AddUserResponse>}
 */
const methodDescriptor_EsmApi_AddUser = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/AddUser',
  grpc.web.MethodType.UNARY,
  proto.api.esm.AddUserRequest,
  proto.api.esm.AddUserResponse,
  /**
   * @param {!proto.api.esm.AddUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.AddUserResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.AddUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.AddUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.AddUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.addUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/AddUser',
      request,
      metadata || {},
      methodDescriptor_EsmApi_AddUser,
      callback);
};


/**
 * @param {!proto.api.esm.AddUserRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.AddUserResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.addUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/AddUser',
      request,
      metadata || {},
      methodDescriptor_EsmApi_AddUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.UpdateMsgTokenRequest,
 *   !proto.api.esm.UpdateMsgTokenResponse>}
 */
const methodDescriptor_EsmApi_UpdateMsgToken = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/UpdateMsgToken',
  grpc.web.MethodType.UNARY,
  proto.api.esm.UpdateMsgTokenRequest,
  proto.api.esm.UpdateMsgTokenResponse,
  /**
   * @param {!proto.api.esm.UpdateMsgTokenRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.UpdateMsgTokenResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.UpdateMsgTokenRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.UpdateMsgTokenResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.UpdateMsgTokenResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.updateMsgToken =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/UpdateMsgToken',
      request,
      metadata || {},
      methodDescriptor_EsmApi_UpdateMsgToken,
      callback);
};


/**
 * @param {!proto.api.esm.UpdateMsgTokenRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.UpdateMsgTokenResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.updateMsgToken =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/UpdateMsgToken',
      request,
      metadata || {},
      methodDescriptor_EsmApi_UpdateMsgToken);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.UpdateSocialLinkFBRequest,
 *   !proto.api.esm.UpdateSocialLinkFBResponse>}
 */
const methodDescriptor_EsmApi_UpdateSocialLinkFB = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/UpdateSocialLinkFB',
  grpc.web.MethodType.UNARY,
  proto.api.esm.UpdateSocialLinkFBRequest,
  proto.api.esm.UpdateSocialLinkFBResponse,
  /**
   * @param {!proto.api.esm.UpdateSocialLinkFBRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.UpdateSocialLinkFBResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.UpdateSocialLinkFBRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.UpdateSocialLinkFBResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.UpdateSocialLinkFBResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.updateSocialLinkFB =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/UpdateSocialLinkFB',
      request,
      metadata || {},
      methodDescriptor_EsmApi_UpdateSocialLinkFB,
      callback);
};


/**
 * @param {!proto.api.esm.UpdateSocialLinkFBRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.UpdateSocialLinkFBResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.updateSocialLinkFB =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/UpdateSocialLinkFB',
      request,
      metadata || {},
      methodDescriptor_EsmApi_UpdateSocialLinkFB);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.UpdateSocialLinkGoogleRequest,
 *   !proto.api.esm.UpdateSocialLinkGoogleResponse>}
 */
const methodDescriptor_EsmApi_UpdateSocialLinkGoogle = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/UpdateSocialLinkGoogle',
  grpc.web.MethodType.UNARY,
  proto.api.esm.UpdateSocialLinkGoogleRequest,
  proto.api.esm.UpdateSocialLinkGoogleResponse,
  /**
   * @param {!proto.api.esm.UpdateSocialLinkGoogleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.UpdateSocialLinkGoogleResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.UpdateSocialLinkGoogleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.UpdateSocialLinkGoogleResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.UpdateSocialLinkGoogleResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.updateSocialLinkGoogle =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/UpdateSocialLinkGoogle',
      request,
      metadata || {},
      methodDescriptor_EsmApi_UpdateSocialLinkGoogle,
      callback);
};


/**
 * @param {!proto.api.esm.UpdateSocialLinkGoogleRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.UpdateSocialLinkGoogleResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.updateSocialLinkGoogle =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/UpdateSocialLinkGoogle',
      request,
      metadata || {},
      methodDescriptor_EsmApi_UpdateSocialLinkGoogle);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.UpdateAddressRequest,
 *   !proto.api.esm.UpdateAddressResponse>}
 */
const methodDescriptor_EsmApi_UpdateAddress = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/UpdateAddress',
  grpc.web.MethodType.UNARY,
  proto.api.esm.UpdateAddressRequest,
  proto.api.esm.UpdateAddressResponse,
  /**
   * @param {!proto.api.esm.UpdateAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.UpdateAddressResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.UpdateAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.UpdateAddressResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.UpdateAddressResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.updateAddress =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/UpdateAddress',
      request,
      metadata || {},
      methodDescriptor_EsmApi_UpdateAddress,
      callback);
};


/**
 * @param {!proto.api.esm.UpdateAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.UpdateAddressResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.updateAddress =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/UpdateAddress',
      request,
      metadata || {},
      methodDescriptor_EsmApi_UpdateAddress);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.UpdateUserSettingsRequest,
 *   !proto.api.esm.UpdateUserSettingsResponse>}
 */
const methodDescriptor_EsmApi_UpdateUserSettings = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/UpdateUserSettings',
  grpc.web.MethodType.UNARY,
  proto.api.esm.UpdateUserSettingsRequest,
  proto.api.esm.UpdateUserSettingsResponse,
  /**
   * @param {!proto.api.esm.UpdateUserSettingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.UpdateUserSettingsResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.UpdateUserSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.UpdateUserSettingsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.UpdateUserSettingsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.updateUserSettings =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/UpdateUserSettings',
      request,
      metadata || {},
      methodDescriptor_EsmApi_UpdateUserSettings,
      callback);
};


/**
 * @param {!proto.api.esm.UpdateUserSettingsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.UpdateUserSettingsResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.updateUserSettings =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/UpdateUserSettings',
      request,
      metadata || {},
      methodDescriptor_EsmApi_UpdateUserSettings);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.ChangePasswordRequest,
 *   !proto.api.esm.ChangePasswordResponse>}
 */
const methodDescriptor_EsmApi_ChangePassword = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/ChangePassword',
  grpc.web.MethodType.UNARY,
  proto.api.esm.ChangePasswordRequest,
  proto.api.esm.ChangePasswordResponse,
  /**
   * @param {!proto.api.esm.ChangePasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.ChangePasswordResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.ChangePasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.ChangePasswordResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.ChangePasswordResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.changePassword =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/ChangePassword',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ChangePassword,
      callback);
};


/**
 * @param {!proto.api.esm.ChangePasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.ChangePasswordResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.changePassword =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/ChangePassword',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ChangePassword);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.GetPlayerRequest,
 *   !proto.api.esm.GetPlayerResponse>}
 */
const methodDescriptor_EsmApi_GetPlayer = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/GetPlayer',
  grpc.web.MethodType.UNARY,
  proto.api.esm.GetPlayerRequest,
  proto.api.esm.GetPlayerResponse,
  /**
   * @param {!proto.api.esm.GetPlayerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.GetPlayerResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.GetPlayerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.GetPlayerResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.GetPlayerResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.getPlayer =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/GetPlayer',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetPlayer,
      callback);
};


/**
 * @param {!proto.api.esm.GetPlayerRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.GetPlayerResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.getPlayer =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/GetPlayer',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetPlayer);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.GetConfigRequest,
 *   !proto.api.esm.GetConfigResponse>}
 */
const methodDescriptor_EsmApi_GetConfig = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/GetConfig',
  grpc.web.MethodType.UNARY,
  proto.api.esm.GetConfigRequest,
  proto.api.esm.GetConfigResponse,
  /**
   * @param {!proto.api.esm.GetConfigRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.GetConfigResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.GetConfigRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.GetConfigResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.GetConfigResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.getConfig =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/GetConfig',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetConfig,
      callback);
};


/**
 * @param {!proto.api.esm.GetConfigRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.GetConfigResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.getConfig =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/GetConfig',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetConfig);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.ListSpinnerRuleRequest,
 *   !proto.api.esm.ListSpinnerRuleResponse>}
 */
const methodDescriptor_EsmApi_ListSpinnerRule = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/ListSpinnerRule',
  grpc.web.MethodType.UNARY,
  proto.api.esm.ListSpinnerRuleRequest,
  proto.api.esm.ListSpinnerRuleResponse,
  /**
   * @param {!proto.api.esm.ListSpinnerRuleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.ListSpinnerRuleResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.ListSpinnerRuleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.ListSpinnerRuleResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.ListSpinnerRuleResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.listSpinnerRule =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/ListSpinnerRule',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListSpinnerRule,
      callback);
};


/**
 * @param {!proto.api.esm.ListSpinnerRuleRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.ListSpinnerRuleResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.listSpinnerRule =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/ListSpinnerRule',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListSpinnerRule);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.ListGameLeaderRuleRequest,
 *   !proto.api.esm.ListGameLeaderRuleResponse>}
 */
const methodDescriptor_EsmApi_ListGameLeaderRule = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/ListGameLeaderRule',
  grpc.web.MethodType.UNARY,
  proto.api.esm.ListGameLeaderRuleRequest,
  proto.api.esm.ListGameLeaderRuleResponse,
  /**
   * @param {!proto.api.esm.ListGameLeaderRuleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.ListGameLeaderRuleResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.ListGameLeaderRuleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.ListGameLeaderRuleResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.ListGameLeaderRuleResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.listGameLeaderRule =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/ListGameLeaderRule',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListGameLeaderRule,
      callback);
};


/**
 * @param {!proto.api.esm.ListGameLeaderRuleRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.ListGameLeaderRuleResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.listGameLeaderRule =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/ListGameLeaderRule',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListGameLeaderRule);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.ListGameRequest,
 *   !proto.api.esm.ListGameResponse>}
 */
const methodDescriptor_EsmApi_ListGame = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/ListGame',
  grpc.web.MethodType.UNARY,
  proto.api.esm.ListGameRequest,
  proto.api.esm.ListGameResponse,
  /**
   * @param {!proto.api.esm.ListGameRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.ListGameResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.ListGameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.ListGameResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.ListGameResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.listGame =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/ListGame',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListGame,
      callback);
};


/**
 * @param {!proto.api.esm.ListGameRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.ListGameResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.listGame =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/ListGame',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListGame);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.GetGameCodeRequest,
 *   !proto.api.esm.GetGameCodeResponse>}
 */
const methodDescriptor_EsmApi_GetGameCode = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/GetGameCode',
  grpc.web.MethodType.UNARY,
  proto.api.esm.GetGameCodeRequest,
  proto.api.esm.GetGameCodeResponse,
  /**
   * @param {!proto.api.esm.GetGameCodeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.GetGameCodeResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.GetGameCodeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.GetGameCodeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.GetGameCodeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.getGameCode =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/GetGameCode',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetGameCode,
      callback);
};


/**
 * @param {!proto.api.esm.GetGameCodeRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.GetGameCodeResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.getGameCode =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/GetGameCode',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetGameCode);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.GetGameDetailRequest,
 *   !proto.api.esm.GetGameDetailResponse>}
 */
const methodDescriptor_EsmApi_GetGameDetail = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/GetGameDetail',
  grpc.web.MethodType.UNARY,
  proto.api.esm.GetGameDetailRequest,
  proto.api.esm.GetGameDetailResponse,
  /**
   * @param {!proto.api.esm.GetGameDetailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.GetGameDetailResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.GetGameDetailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.GetGameDetailResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.GetGameDetailResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.getGameDetail =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/GetGameDetail',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetGameDetail,
      callback);
};


/**
 * @param {!proto.api.esm.GetGameDetailRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.GetGameDetailResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.getGameDetail =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/GetGameDetail',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetGameDetail);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.GetSpinAvailableRequest,
 *   !proto.api.esm.GetSpinAvailableResponse>}
 */
const methodDescriptor_EsmApi_GetSpinAvailable = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/GetSpinAvailable',
  grpc.web.MethodType.UNARY,
  proto.api.esm.GetSpinAvailableRequest,
  proto.api.esm.GetSpinAvailableResponse,
  /**
   * @param {!proto.api.esm.GetSpinAvailableRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.GetSpinAvailableResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.GetSpinAvailableRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.GetSpinAvailableResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.GetSpinAvailableResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.getSpinAvailable =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/GetSpinAvailable',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetSpinAvailable,
      callback);
};


/**
 * @param {!proto.api.esm.GetSpinAvailableRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.GetSpinAvailableResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.getSpinAvailable =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/GetSpinAvailable',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetSpinAvailable);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.LogSExtraRequest,
 *   !proto.api.esm.LogSExtraResponse>}
 */
const methodDescriptor_EsmApi_LogSExtra = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/LogSExtra',
  grpc.web.MethodType.UNARY,
  proto.api.esm.LogSExtraRequest,
  proto.api.esm.LogSExtraResponse,
  /**
   * @param {!proto.api.esm.LogSExtraRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.LogSExtraResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.LogSExtraRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.LogSExtraResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.LogSExtraResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.logSExtra =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/LogSExtra',
      request,
      metadata || {},
      methodDescriptor_EsmApi_LogSExtra,
      callback);
};


/**
 * @param {!proto.api.esm.LogSExtraRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.LogSExtraResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.logSExtra =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/LogSExtra',
      request,
      metadata || {},
      methodDescriptor_EsmApi_LogSExtra);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.LogSEnterRequest,
 *   !proto.api.esm.LogSEnterResponse>}
 */
const methodDescriptor_EsmApi_LogSEnter = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/LogSEnter',
  grpc.web.MethodType.UNARY,
  proto.api.esm.LogSEnterRequest,
  proto.api.esm.LogSEnterResponse,
  /**
   * @param {!proto.api.esm.LogSEnterRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.LogSEnterResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.LogSEnterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.LogSEnterResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.LogSEnterResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.logSEnter =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/LogSEnter',
      request,
      metadata || {},
      methodDescriptor_EsmApi_LogSEnter,
      callback);
};


/**
 * @param {!proto.api.esm.LogSEnterRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.LogSEnterResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.logSEnter =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/LogSEnter',
      request,
      metadata || {},
      methodDescriptor_EsmApi_LogSEnter);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.LogSLeaveRequest,
 *   !proto.api.esm.LogSLeaveResponse>}
 */
const methodDescriptor_EsmApi_LogSLeave = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/LogSLeave',
  grpc.web.MethodType.UNARY,
  proto.api.esm.LogSLeaveRequest,
  proto.api.esm.LogSLeaveResponse,
  /**
   * @param {!proto.api.esm.LogSLeaveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.LogSLeaveResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.LogSLeaveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.LogSLeaveResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.LogSLeaveResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.logSLeave =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/LogSLeave',
      request,
      metadata || {},
      methodDescriptor_EsmApi_LogSLeave,
      callback);
};


/**
 * @param {!proto.api.esm.LogSLeaveRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.LogSLeaveResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.logSLeave =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/LogSLeave',
      request,
      metadata || {},
      methodDescriptor_EsmApi_LogSLeave);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.LogGEnterRequest,
 *   !proto.api.esm.LogGEnterResponse>}
 */
const methodDescriptor_EsmApi_LogGEnter = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/LogGEnter',
  grpc.web.MethodType.UNARY,
  proto.api.esm.LogGEnterRequest,
  proto.api.esm.LogGEnterResponse,
  /**
   * @param {!proto.api.esm.LogGEnterRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.LogGEnterResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.LogGEnterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.LogGEnterResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.LogGEnterResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.logGEnter =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/LogGEnter',
      request,
      metadata || {},
      methodDescriptor_EsmApi_LogGEnter,
      callback);
};


/**
 * @param {!proto.api.esm.LogGEnterRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.LogGEnterResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.logGEnter =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/LogGEnter',
      request,
      metadata || {},
      methodDescriptor_EsmApi_LogGEnter);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.LogGLeaveRequest,
 *   !proto.api.esm.LogGLeaveResponse>}
 */
const methodDescriptor_EsmApi_LogGLeave = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/LogGLeave',
  grpc.web.MethodType.UNARY,
  proto.api.esm.LogGLeaveRequest,
  proto.api.esm.LogGLeaveResponse,
  /**
   * @param {!proto.api.esm.LogGLeaveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.LogGLeaveResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.LogGLeaveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.LogGLeaveResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.LogGLeaveResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.logGLeave =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/LogGLeave',
      request,
      metadata || {},
      methodDescriptor_EsmApi_LogGLeave,
      callback);
};


/**
 * @param {!proto.api.esm.LogGLeaveRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.LogGLeaveResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.logGLeave =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/LogGLeave',
      request,
      metadata || {},
      methodDescriptor_EsmApi_LogGLeave);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.ListLogGRequest,
 *   !proto.api.esm.ListLogGResponse>}
 */
const methodDescriptor_EsmApi_ListLogG = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/ListLogG',
  grpc.web.MethodType.UNARY,
  proto.api.esm.ListLogGRequest,
  proto.api.esm.ListLogGResponse,
  /**
   * @param {!proto.api.esm.ListLogGRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.ListLogGResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.ListLogGRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.ListLogGResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.ListLogGResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.listLogG =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/ListLogG',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListLogG,
      callback);
};


/**
 * @param {!proto.api.esm.ListLogGRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.ListLogGResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.listLogG =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/ListLogG',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListLogG);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.ListLogPrizePoolRequest,
 *   !proto.api.esm.ListLogPrizePoolResponse>}
 */
const methodDescriptor_EsmApi_ListLogPrizePool = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/ListLogPrizePool',
  grpc.web.MethodType.UNARY,
  proto.api.esm.ListLogPrizePoolRequest,
  proto.api.esm.ListLogPrizePoolResponse,
  /**
   * @param {!proto.api.esm.ListLogPrizePoolRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.ListLogPrizePoolResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.ListLogPrizePoolRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.ListLogPrizePoolResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.ListLogPrizePoolResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.listLogPrizePool =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/ListLogPrizePool',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListLogPrizePool,
      callback);
};


/**
 * @param {!proto.api.esm.ListLogPrizePoolRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.ListLogPrizePoolResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.listLogPrizePool =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/ListLogPrizePool',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListLogPrizePool);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.ListLeaderboardRequest,
 *   !proto.api.esm.ListLeaderboardResponse>}
 */
const methodDescriptor_EsmApi_ListLeaderboard = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/ListLeaderboard',
  grpc.web.MethodType.UNARY,
  proto.api.esm.ListLeaderboardRequest,
  proto.api.esm.ListLeaderboardResponse,
  /**
   * @param {!proto.api.esm.ListLeaderboardRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.ListLeaderboardResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.ListLeaderboardRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.ListLeaderboardResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.ListLeaderboardResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.listLeaderboard =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/ListLeaderboard',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListLeaderboard,
      callback);
};


/**
 * @param {!proto.api.esm.ListLeaderboardRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.ListLeaderboardResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.listLeaderboard =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/ListLeaderboard',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListLeaderboard);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.ListLeaderboardHistoryRequest,
 *   !proto.api.esm.ListLeaderboardHistoryResponse>}
 */
const methodDescriptor_EsmApi_ListLeaderboardHistory = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/ListLeaderboardHistory',
  grpc.web.MethodType.UNARY,
  proto.api.esm.ListLeaderboardHistoryRequest,
  proto.api.esm.ListLeaderboardHistoryResponse,
  /**
   * @param {!proto.api.esm.ListLeaderboardHistoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.ListLeaderboardHistoryResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.ListLeaderboardHistoryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.ListLeaderboardHistoryResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.ListLeaderboardHistoryResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.listLeaderboardHistory =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/ListLeaderboardHistory',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListLeaderboardHistory,
      callback);
};


/**
 * @param {!proto.api.esm.ListLeaderboardHistoryRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.ListLeaderboardHistoryResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.listLeaderboardHistory =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/ListLeaderboardHistory',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListLeaderboardHistory);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.ListPlayerHighscoreRequest,
 *   !proto.api.esm.ListPlayerHighscoreResponse>}
 */
const methodDescriptor_EsmApi_ListPlayerHighscore = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/ListPlayerHighscore',
  grpc.web.MethodType.UNARY,
  proto.api.esm.ListPlayerHighscoreRequest,
  proto.api.esm.ListPlayerHighscoreResponse,
  /**
   * @param {!proto.api.esm.ListPlayerHighscoreRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.ListPlayerHighscoreResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.ListPlayerHighscoreRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.ListPlayerHighscoreResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.ListPlayerHighscoreResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.listPlayerHighscore =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/ListPlayerHighscore',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListPlayerHighscore,
      callback);
};


/**
 * @param {!proto.api.esm.ListPlayerHighscoreRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.ListPlayerHighscoreResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.listPlayerHighscore =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/ListPlayerHighscore',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListPlayerHighscore);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.GetCurrentPlayerRankRequest,
 *   !proto.api.esm.GetCurrentPlayerRankResponse>}
 */
const methodDescriptor_EsmApi_GetCurrentPlayerRank = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/GetCurrentPlayerRank',
  grpc.web.MethodType.UNARY,
  proto.api.esm.GetCurrentPlayerRankRequest,
  proto.api.esm.GetCurrentPlayerRankResponse,
  /**
   * @param {!proto.api.esm.GetCurrentPlayerRankRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.GetCurrentPlayerRankResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.GetCurrentPlayerRankRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.GetCurrentPlayerRankResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.GetCurrentPlayerRankResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.getCurrentPlayerRank =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/GetCurrentPlayerRank',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetCurrentPlayerRank,
      callback);
};


/**
 * @param {!proto.api.esm.GetCurrentPlayerRankRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.GetCurrentPlayerRankResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.getCurrentPlayerRank =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/GetCurrentPlayerRank',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetCurrentPlayerRank);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.AddInviteRequest,
 *   !proto.api.esm.AddInviteResponse>}
 */
const methodDescriptor_EsmApi_AddInvite = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/AddInvite',
  grpc.web.MethodType.UNARY,
  proto.api.esm.AddInviteRequest,
  proto.api.esm.AddInviteResponse,
  /**
   * @param {!proto.api.esm.AddInviteRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.AddInviteResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.AddInviteRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.AddInviteResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.AddInviteResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.addInvite =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/AddInvite',
      request,
      metadata || {},
      methodDescriptor_EsmApi_AddInvite,
      callback);
};


/**
 * @param {!proto.api.esm.AddInviteRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.AddInviteResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.addInvite =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/AddInvite',
      request,
      metadata || {},
      methodDescriptor_EsmApi_AddInvite);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.ListInvitedByRequest,
 *   !proto.api.esm.ListInvitedByResponse>}
 */
const methodDescriptor_EsmApi_ListInvitedBy = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/ListInvitedBy',
  grpc.web.MethodType.UNARY,
  proto.api.esm.ListInvitedByRequest,
  proto.api.esm.ListInvitedByResponse,
  /**
   * @param {!proto.api.esm.ListInvitedByRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.ListInvitedByResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.ListInvitedByRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.ListInvitedByResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.ListInvitedByResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.listInvitedBy =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/ListInvitedBy',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListInvitedBy,
      callback);
};


/**
 * @param {!proto.api.esm.ListInvitedByRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.ListInvitedByResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.listInvitedBy =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/ListInvitedBy',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListInvitedBy);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.ListItemRequest,
 *   !proto.api.esm.ListItemResponse>}
 */
const methodDescriptor_EsmApi_ListItem = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/ListItem',
  grpc.web.MethodType.UNARY,
  proto.api.esm.ListItemRequest,
  proto.api.esm.ListItemResponse,
  /**
   * @param {!proto.api.esm.ListItemRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.ListItemResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.ListItemRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.ListItemResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.ListItemResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.listItem =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/ListItem',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListItem,
      callback);
};


/**
 * @param {!proto.api.esm.ListItemRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.ListItemResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.listItem =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/ListItem',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListItem);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.GetItemCountRequest,
 *   !proto.api.esm.GetItemCountResponse>}
 */
const methodDescriptor_EsmApi_GetItemCount = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/GetItemCount',
  grpc.web.MethodType.UNARY,
  proto.api.esm.GetItemCountRequest,
  proto.api.esm.GetItemCountResponse,
  /**
   * @param {!proto.api.esm.GetItemCountRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.GetItemCountResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.GetItemCountRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.GetItemCountResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.GetItemCountResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.getItemCount =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/GetItemCount',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetItemCount,
      callback);
};


/**
 * @param {!proto.api.esm.GetItemCountRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.GetItemCountResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.getItemCount =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/GetItemCount',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetItemCount);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.ListItemTypeRequest,
 *   !proto.api.esm.ListItemTypeResponse>}
 */
const methodDescriptor_EsmApi_ListItemType = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/ListItemType',
  grpc.web.MethodType.UNARY,
  proto.api.esm.ListItemTypeRequest,
  proto.api.esm.ListItemTypeResponse,
  /**
   * @param {!proto.api.esm.ListItemTypeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.ListItemTypeResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.ListItemTypeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.ListItemTypeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.ListItemTypeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.listItemType =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/ListItemType',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListItemType,
      callback);
};


/**
 * @param {!proto.api.esm.ListItemTypeRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.ListItemTypeResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.listItemType =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/ListItemType',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListItemType);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.GetPrizeTicketPoolRequest,
 *   !proto.api.esm.GetPrizeTicketPoolResponse>}
 */
const methodDescriptor_EsmApi_GetPrizeTicketPool = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/GetPrizeTicketPool',
  grpc.web.MethodType.UNARY,
  proto.api.esm.GetPrizeTicketPoolRequest,
  proto.api.esm.GetPrizeTicketPoolResponse,
  /**
   * @param {!proto.api.esm.GetPrizeTicketPoolRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.GetPrizeTicketPoolResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.GetPrizeTicketPoolRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.GetPrizeTicketPoolResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.GetPrizeTicketPoolResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.getPrizeTicketPool =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/GetPrizeTicketPool',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetPrizeTicketPool,
      callback);
};


/**
 * @param {!proto.api.esm.GetPrizeTicketPoolRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.GetPrizeTicketPoolResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.getPrizeTicketPool =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/GetPrizeTicketPool',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetPrizeTicketPool);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.GetPrizeTicketsCollectedRequest,
 *   !proto.api.esm.GetPrizeTicketsCollectedResponse>}
 */
const methodDescriptor_EsmApi_GetPrizeTicketsCollected = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/GetPrizeTicketsCollected',
  grpc.web.MethodType.UNARY,
  proto.api.esm.GetPrizeTicketsCollectedRequest,
  proto.api.esm.GetPrizeTicketsCollectedResponse,
  /**
   * @param {!proto.api.esm.GetPrizeTicketsCollectedRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.GetPrizeTicketsCollectedResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.GetPrizeTicketsCollectedRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.GetPrizeTicketsCollectedResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.GetPrizeTicketsCollectedResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.getPrizeTicketsCollected =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/GetPrizeTicketsCollected',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetPrizeTicketsCollected,
      callback);
};


/**
 * @param {!proto.api.esm.GetPrizeTicketsCollectedRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.GetPrizeTicketsCollectedResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.getPrizeTicketsCollected =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/GetPrizeTicketsCollected',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetPrizeTicketsCollected);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.ListPrizeRequest,
 *   !proto.api.esm.ListPrizeResponse>}
 */
const methodDescriptor_EsmApi_ListPrize = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/ListPrize',
  grpc.web.MethodType.UNARY,
  proto.api.esm.ListPrizeRequest,
  proto.api.esm.ListPrizeResponse,
  /**
   * @param {!proto.api.esm.ListPrizeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.ListPrizeResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.ListPrizeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.ListPrizeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.ListPrizeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.listPrize =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/ListPrize',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListPrize,
      callback);
};


/**
 * @param {!proto.api.esm.ListPrizeRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.ListPrizeResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.listPrize =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/ListPrize',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListPrize);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.GetPrizeDetailRequest,
 *   !proto.api.esm.GetPrizeDetailResponse>}
 */
const methodDescriptor_EsmApi_GetPrizeDetail = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/GetPrizeDetail',
  grpc.web.MethodType.UNARY,
  proto.api.esm.GetPrizeDetailRequest,
  proto.api.esm.GetPrizeDetailResponse,
  /**
   * @param {!proto.api.esm.GetPrizeDetailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.GetPrizeDetailResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.GetPrizeDetailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.GetPrizeDetailResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.GetPrizeDetailResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.getPrizeDetail =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/GetPrizeDetail',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetPrizeDetail,
      callback);
};


/**
 * @param {!proto.api.esm.GetPrizeDetailRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.GetPrizeDetailResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.getPrizeDetail =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/GetPrizeDetail',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetPrizeDetail);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.GetTotalTicketsSinceRequest,
 *   !proto.api.esm.GetTotalTicketsSinceResponse>}
 */
const methodDescriptor_EsmApi_GetTotalTicketsSince = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/GetTotalTicketsSince',
  grpc.web.MethodType.UNARY,
  proto.api.esm.GetTotalTicketsSinceRequest,
  proto.api.esm.GetTotalTicketsSinceResponse,
  /**
   * @param {!proto.api.esm.GetTotalTicketsSinceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.GetTotalTicketsSinceResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.GetTotalTicketsSinceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.GetTotalTicketsSinceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.GetTotalTicketsSinceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.getTotalTicketsSince =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/GetTotalTicketsSince',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetTotalTicketsSince,
      callback);
};


/**
 * @param {!proto.api.esm.GetTotalTicketsSinceRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.GetTotalTicketsSinceResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.getTotalTicketsSince =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/GetTotalTicketsSince',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetTotalTicketsSince);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.ListRankRequest,
 *   !proto.api.esm.ListRankResponse>}
 */
const methodDescriptor_EsmApi_ListRank = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/ListRank',
  grpc.web.MethodType.UNARY,
  proto.api.esm.ListRankRequest,
  proto.api.esm.ListRankResponse,
  /**
   * @param {!proto.api.esm.ListRankRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.ListRankResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.ListRankRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.ListRankResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.ListRankResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.listRank =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/ListRank',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListRank,
      callback);
};


/**
 * @param {!proto.api.esm.ListRankRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.ListRankResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.listRank =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/ListRank',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListRank);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.BuyRequest,
 *   !proto.api.esm.BuyResponse>}
 */
const methodDescriptor_EsmApi_Buy = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/Buy',
  grpc.web.MethodType.UNARY,
  proto.api.esm.BuyRequest,
  proto.api.esm.BuyResponse,
  /**
   * @param {!proto.api.esm.BuyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.BuyResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.BuyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.BuyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.BuyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.buy =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/Buy',
      request,
      metadata || {},
      methodDescriptor_EsmApi_Buy,
      callback);
};


/**
 * @param {!proto.api.esm.BuyRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.BuyResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.buy =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/Buy',
      request,
      metadata || {},
      methodDescriptor_EsmApi_Buy);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.ListBuyRequest,
 *   !proto.api.esm.ListBuyResponse>}
 */
const methodDescriptor_EsmApi_ListBuy = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/ListBuy',
  grpc.web.MethodType.UNARY,
  proto.api.esm.ListBuyRequest,
  proto.api.esm.ListBuyResponse,
  /**
   * @param {!proto.api.esm.ListBuyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.ListBuyResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.ListBuyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.ListBuyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.ListBuyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.listBuy =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/ListBuy',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListBuy,
      callback);
};


/**
 * @param {!proto.api.esm.ListBuyRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.ListBuyResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.listBuy =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/ListBuy',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListBuy);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.GetActiveSubscriptionRequest,
 *   !proto.api.esm.GetActiveSubscriptionResponse>}
 */
const methodDescriptor_EsmApi_GetActiveSubscription = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/GetActiveSubscription',
  grpc.web.MethodType.UNARY,
  proto.api.esm.GetActiveSubscriptionRequest,
  proto.api.esm.GetActiveSubscriptionResponse,
  /**
   * @param {!proto.api.esm.GetActiveSubscriptionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.GetActiveSubscriptionResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.GetActiveSubscriptionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.GetActiveSubscriptionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.GetActiveSubscriptionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.getActiveSubscription =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/GetActiveSubscription',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetActiveSubscription,
      callback);
};


/**
 * @param {!proto.api.esm.GetActiveSubscriptionRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.GetActiveSubscriptionResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.getActiveSubscription =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/GetActiveSubscription',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetActiveSubscription);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.CancelRequest,
 *   !proto.api.esm.CancelResponse>}
 */
const methodDescriptor_EsmApi_Cancel = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/Cancel',
  grpc.web.MethodType.UNARY,
  proto.api.esm.CancelRequest,
  proto.api.esm.CancelResponse,
  /**
   * @param {!proto.api.esm.CancelRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.CancelResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.CancelRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.CancelResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.CancelResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.cancel =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/Cancel',
      request,
      metadata || {},
      methodDescriptor_EsmApi_Cancel,
      callback);
};


/**
 * @param {!proto.api.esm.CancelRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.CancelResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.cancel =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/Cancel',
      request,
      metadata || {},
      methodDescriptor_EsmApi_Cancel);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.ActivateRequest,
 *   !proto.api.esm.ActivateResponse>}
 */
const methodDescriptor_EsmApi_Activate = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/Activate',
  grpc.web.MethodType.UNARY,
  proto.api.esm.ActivateRequest,
  proto.api.esm.ActivateResponse,
  /**
   * @param {!proto.api.esm.ActivateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.ActivateResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.ActivateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.ActivateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.ActivateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.activate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/Activate',
      request,
      metadata || {},
      methodDescriptor_EsmApi_Activate,
      callback);
};


/**
 * @param {!proto.api.esm.ActivateRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.ActivateResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.activate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/Activate',
      request,
      metadata || {},
      methodDescriptor_EsmApi_Activate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.ListSubscriptionRequest,
 *   !proto.api.esm.ListSubscriptionResponse>}
 */
const methodDescriptor_EsmApi_ListSubscription = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/ListSubscription',
  grpc.web.MethodType.UNARY,
  proto.api.esm.ListSubscriptionRequest,
  proto.api.esm.ListSubscriptionResponse,
  /**
   * @param {!proto.api.esm.ListSubscriptionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.ListSubscriptionResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.ListSubscriptionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.ListSubscriptionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.ListSubscriptionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.listSubscription =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/ListSubscription',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListSubscription,
      callback);
};


/**
 * @param {!proto.api.esm.ListSubscriptionRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.ListSubscriptionResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.listSubscription =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/ListSubscription',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListSubscription);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.GetSubscriptionCountRequest,
 *   !proto.api.esm.GetSubscriptionCountResponse>}
 */
const methodDescriptor_EsmApi_GetSubscriptionCount = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/GetSubscriptionCount',
  grpc.web.MethodType.UNARY,
  proto.api.esm.GetSubscriptionCountRequest,
  proto.api.esm.GetSubscriptionCountResponse,
  /**
   * @param {!proto.api.esm.GetSubscriptionCountRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.GetSubscriptionCountResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.GetSubscriptionCountRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.GetSubscriptionCountResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.GetSubscriptionCountResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.getSubscriptionCount =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/GetSubscriptionCount',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetSubscriptionCount,
      callback);
};


/**
 * @param {!proto.api.esm.GetSubscriptionCountRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.GetSubscriptionCountResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.getSubscriptionCount =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/GetSubscriptionCount',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetSubscriptionCount);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.ListSubscriptionTypeRequest,
 *   !proto.api.esm.ListSubscriptionTypeResponse>}
 */
const methodDescriptor_EsmApi_ListSubscriptionType = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/ListSubscriptionType',
  grpc.web.MethodType.UNARY,
  proto.api.esm.ListSubscriptionTypeRequest,
  proto.api.esm.ListSubscriptionTypeResponse,
  /**
   * @param {!proto.api.esm.ListSubscriptionTypeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.ListSubscriptionTypeResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.ListSubscriptionTypeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.ListSubscriptionTypeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.ListSubscriptionTypeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.listSubscriptionType =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/ListSubscriptionType',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListSubscriptionType,
      callback);
};


/**
 * @param {!proto.api.esm.ListSubscriptionTypeRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.ListSubscriptionTypeResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.listSubscriptionType =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/ListSubscriptionType',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListSubscriptionType);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.ListWinnerRequest,
 *   !proto.api.esm.ListWinnerResponse>}
 */
const methodDescriptor_EsmApi_ListWinner = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/ListWinner',
  grpc.web.MethodType.UNARY,
  proto.api.esm.ListWinnerRequest,
  proto.api.esm.ListWinnerResponse,
  /**
   * @param {!proto.api.esm.ListWinnerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.ListWinnerResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.ListWinnerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.ListWinnerResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.ListWinnerResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.listWinner =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/ListWinner',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListWinner,
      callback);
};


/**
 * @param {!proto.api.esm.ListWinnerRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.ListWinnerResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.listWinner =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/ListWinner',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListWinner);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.ListWinnerRecentRequest,
 *   !proto.api.esm.ListWinnerRecentResponse>}
 */
const methodDescriptor_EsmApi_ListWinnerRecent = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/ListWinnerRecent',
  grpc.web.MethodType.UNARY,
  proto.api.esm.ListWinnerRecentRequest,
  proto.api.esm.ListWinnerRecentResponse,
  /**
   * @param {!proto.api.esm.ListWinnerRecentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.ListWinnerRecentResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.ListWinnerRecentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.ListWinnerRecentResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.ListWinnerRecentResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.listWinnerRecent =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/ListWinnerRecent',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListWinnerRecent,
      callback);
};


/**
 * @param {!proto.api.esm.ListWinnerRecentRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.ListWinnerRecentResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.listWinnerRecent =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/ListWinnerRecent',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListWinnerRecent);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.ListWinnerUnclaimedRequest,
 *   !proto.api.esm.ListWinnerUnclaimedResponse>}
 */
const methodDescriptor_EsmApi_ListWinnerUnclaimed = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/ListWinnerUnclaimed',
  grpc.web.MethodType.UNARY,
  proto.api.esm.ListWinnerUnclaimedRequest,
  proto.api.esm.ListWinnerUnclaimedResponse,
  /**
   * @param {!proto.api.esm.ListWinnerUnclaimedRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.ListWinnerUnclaimedResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.ListWinnerUnclaimedRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.ListWinnerUnclaimedResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.ListWinnerUnclaimedResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.listWinnerUnclaimed =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/ListWinnerUnclaimed',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListWinnerUnclaimed,
      callback);
};


/**
 * @param {!proto.api.esm.ListWinnerUnclaimedRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.ListWinnerUnclaimedResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.listWinnerUnclaimed =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/ListWinnerUnclaimed',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListWinnerUnclaimed);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.ListWinnerClaimedRequest,
 *   !proto.api.esm.ListWinnerClaimedResponse>}
 */
const methodDescriptor_EsmApi_ListWinnerClaimed = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/ListWinnerClaimed',
  grpc.web.MethodType.UNARY,
  proto.api.esm.ListWinnerClaimedRequest,
  proto.api.esm.ListWinnerClaimedResponse,
  /**
   * @param {!proto.api.esm.ListWinnerClaimedRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.ListWinnerClaimedResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.ListWinnerClaimedRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.ListWinnerClaimedResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.ListWinnerClaimedResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.listWinnerClaimed =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/ListWinnerClaimed',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListWinnerClaimed,
      callback);
};


/**
 * @param {!proto.api.esm.ListWinnerClaimedRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.ListWinnerClaimedResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.listWinnerClaimed =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/ListWinnerClaimed',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListWinnerClaimed);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.ClaimWinnerRequest,
 *   !proto.api.esm.ClaimWinnerResponse>}
 */
const methodDescriptor_EsmApi_ClaimWinner = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/ClaimWinner',
  grpc.web.MethodType.UNARY,
  proto.api.esm.ClaimWinnerRequest,
  proto.api.esm.ClaimWinnerResponse,
  /**
   * @param {!proto.api.esm.ClaimWinnerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.ClaimWinnerResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.ClaimWinnerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.ClaimWinnerResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.ClaimWinnerResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.claimWinner =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/ClaimWinner',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ClaimWinner,
      callback);
};


/**
 * @param {!proto.api.esm.ClaimWinnerRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.ClaimWinnerResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.claimWinner =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/ClaimWinner',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ClaimWinner);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.ListNotificationRequest,
 *   !proto.api.esm.ListNotificationResponse>}
 */
const methodDescriptor_EsmApi_ListNotification = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/ListNotification',
  grpc.web.MethodType.UNARY,
  proto.api.esm.ListNotificationRequest,
  proto.api.esm.ListNotificationResponse,
  /**
   * @param {!proto.api.esm.ListNotificationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.ListNotificationResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.ListNotificationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.ListNotificationResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.ListNotificationResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.listNotification =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/ListNotification',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListNotification,
      callback);
};


/**
 * @param {!proto.api.esm.ListNotificationRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.ListNotificationResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.listNotification =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/ListNotification',
      request,
      metadata || {},
      methodDescriptor_EsmApi_ListNotification);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.esm.GetNotificationNoRequest,
 *   !proto.api.esm.GetNotificationNoResponse>}
 */
const methodDescriptor_EsmApi_GetNotificationNo = new grpc.web.MethodDescriptor(
  '/api.esm.EsmApi/GetNotificationNo',
  grpc.web.MethodType.UNARY,
  proto.api.esm.GetNotificationNoRequest,
  proto.api.esm.GetNotificationNoResponse,
  /**
   * @param {!proto.api.esm.GetNotificationNoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.esm.GetNotificationNoResponse.deserializeBinary
);


/**
 * @param {!proto.api.esm.GetNotificationNoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.esm.GetNotificationNoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.esm.GetNotificationNoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.esm.EsmApiClient.prototype.getNotificationNo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.esm.EsmApi/GetNotificationNo',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetNotificationNo,
      callback);
};


/**
 * @param {!proto.api.esm.GetNotificationNoRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.esm.GetNotificationNoResponse>}
 *     Promise that resolves to the response
 */
proto.api.esm.EsmApiPromiseClient.prototype.getNotificationNo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.esm.EsmApi/GetNotificationNo',
      request,
      metadata || {},
      methodDescriptor_EsmApi_GetNotificationNo);
};


module.exports = proto.api.esm;

