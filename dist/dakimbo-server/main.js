(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./apps/dakimbo-server/src/config.ts":
/*!*******************************************!*\
  !*** ./apps/dakimbo-server/src/config.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _libs_entities_entity_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../../libs/entities/_entity-map */ "./libs/entities/_entity-map.ts");

__webpack_require__(/*! dotenv */ "dotenv").config();
var fs = __webpack_require__(/*! fs */ "fs");
var isProd = process.env.IS_PROD === 'true';
var httpPort = isProd ? +process.env.SERVER_PORT_HTTP : +process.env.SERVER_PORT_HTTP_DEV || 1337;
var httpsPort = isProd
    ? +process.env.SERVER_PORT_HTTPS
    : +process.env.SERVER_PORT_HTTPS_DEV || 2337;
var certKey = process.env.CERT_KEY_PATH;
var cert = process.env.CERT_PATH;
var pathToEntities = isProd ? './database/entities/**/*.js' : './database/entities/**/*.ts';
var pathToMigrations = isProd ? './database/migrations/**/*.js' : './database/migrations/**/*.ts';
var dbType = isProd ? process.env.DB_TYPE : process.env.DB_TYPE_DEV;
var dbHost = isProd ? process.env.DB_HOST : process.env.DB_HOST_DEV;
var dbPort = isProd ? process.env.DB_PORT : process.env.DB_PORT_DEV;
var dbUsername = isProd ? process.env.DB_USER : process.env.DB_USER_DEV;
var dbPassword = isProd ? process.env.DB_PASSWORD : process.env.DB_PASSWORD_DEV;
var dbDatabase = isProd ? process.env.DB_DATABASE : process.env.DB_DATABASE_DEV || 'sof-server';
// const createCertificate = util.promisify(pem.createCertificate);
// const keys = await createCertificate({ days: 1, selfSigned: true });
var config = {
    isProd: isProd,
    port: httpPort,
    portSSL: httpsPort,
    jwtSecret: process.env.JWT_SECRET || 'CHANGE_ME',
    dbOptions: {
        type: dbType,
        host: dbHost,
        port: +dbPort,
        username: dbUsername,
        password: dbPassword,
        database: dbDatabase,
        synchronize: true,
        logging: isProd ? false : false,
        entities: Object.values(_libs_entities_entity_map__WEBPACK_IMPORTED_MODULE_0__["entityMap"])
        // cache: true,
        // entities: [path.join(__dirname, pathToEntities)],
        // migrations: [path.join(__dirname, pathToMigrations)],
        // migrationsDir: 'migration'
    },
    pathToMedia: '/public/_media'
};
if (certKey && cert) {
    config['httpsOpts'] = {
        key: fs.readFileSync(__dirname + certKey),
        cert: fs.readFileSync(__dirname + cert),
        ca: fs.readFileSync(__dirname + cert),
        requestCert: true,
        rejectUnauthorized: false
    };
}
/* harmony default export */ __webpack_exports__["default"] = (config);


/***/ }),

/***/ "./apps/dakimbo-server/src/controllers/authController.ts":
/*!***************************************************************!*\
  !*** ./apps/dakimbo-server/src/controllers/authController.ts ***!
  \***************************************************************/
/*! exports provided: AuthController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthController", function() { return AuthController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ "bcryptjs");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! chalk */ "chalk");
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(chalk__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _libs_entities_auth_auth_role__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../libs/entities/auth/auth-role */ "./libs/entities/auth/auth-role.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../config */ "./apps/dakimbo-server/src/config.ts");
/* harmony import */ var _libs_entities_auth_user__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../../../libs/entities/auth/user */ "./libs/entities/auth/user.ts");
/* harmony import */ var _userController__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./userController */ "./apps/dakimbo-server/src/controllers/userController.ts");









var loginAttempts = 3;
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.prototype.getUserRepository = function () {
        if (!this.userRepository) {
            this.userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["getRepository"])(_libs_entities_auth_user__WEBPACK_IMPORTED_MODULE_7__["User"]);
        }
    };
    AuthController.prototype.login = function (req, res) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var _a, username, email, password, user, error_1, attemptsRemaining, isValidPassword, attemptsRemaining;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.getUserRepository();
                        _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                        if (!((username || email) && password)) {
                            res.status(400).send("You didn't enter a username or password...");
                            console.log("LOGIN: Username or Password not found; failed to log in!");
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.userRepository.findOneOrFail({ where: [{ username: username }, { email: email }] })];
                    case 2:
                        user = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        res.status(401).send('Account was not found, please check your username / e-mail and try again.');
                        console.log("LOGIN: User " + chalk__WEBPACK_IMPORTED_MODULE_4___default.a.magenta(username) + " not found; failed to log in!");
                        return [2 /*return*/];
                    case 4:
                        if (!(user.numFailedLogin >= loginAttempts || user.isLocked)) return [3 /*break*/, 6];
                        attemptsRemaining = loginAttempts - user.numFailedLogin;
                        user.isLocked = user.isLocked || attemptsRemaining <= 0;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 5:
                        _b.sent(); // increment num failed login counter
                        res.status(401).send('Account is locked; please contact an administrator!');
                        console.log("LOGIN: User " + chalk__WEBPACK_IMPORTED_MODULE_4___default.a.magenta(username) + " has a locked account.");
                        return [2 /*return*/];
                    case 6: return [4 /*yield*/, this.checkIfUnencryptedPasswordIsValid(password, user)];
                    case 7:
                        isValidPassword = _b.sent();
                        if (!!isValidPassword) return [3 /*break*/, 9];
                        user.numFailedLogin++;
                        attemptsRemaining = loginAttempts - user.numFailedLogin;
                        user.isLocked = user.isLocked || attemptsRemaining <= 0;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 8:
                        _b.sent(); // increment num failed login counter
                        res.status(401).send("You entered a wrong username, e-mail or password. " + (attemptsRemaining > 0
                            ? attemptsRemaining + ' login attempts remaining before account is locked!'
                            : 'Account is now LOCKED!') + " ");
                        console.log("LOGIN: User " + chalk__WEBPACK_IMPORTED_MODULE_4___default.a.magenta(user.username) + " wrong password; failed to log in!");
                        return [2 /*return*/];
                    case 9: return [4 /*yield*/, this.handleUserLogin(res, user)];
                    case 10:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.loginCertificate = function (req, res) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var cert, _a, lastName, firstName, certUsername, user, error_2;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.getUserRepository();
                        if (!req.connection.getPeerCertificate) {
                            res.status(500).send("Token login not implemented on the server, please use username / password...");
                            return [2 /*return*/]; // SSL not enabled, don't try to do anything else
                        }
                        if (!req.client.authorized) {
                            res.status(401).send("Unauthorized: Client certificate not authorized!");
                            return [2 /*return*/];
                        }
                        cert = req.connection.getPeerCertificate(true);
                        if (!cert || !Object.keys(cert).length) {
                            res.status(401).send("Client certificate was authenticated, but certificate information could not be retrieved...");
                            return [2 /*return*/];
                        }
                        _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spreadArrays"])(cert.subject.CN.toLowerCase().split('.')), lastName = _a[0], firstName = _a[1];
                        certUsername = firstName + "." + lastName;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 5]);
                        return [4 /*yield*/, this.userRepository.findOneOrFail({ where: [{ username: certUsername }] })];
                    case 2:
                        user = _b.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_2 = _b.sent();
                        return [4 /*yield*/, this.createUser(certUsername)];
                    case 4:
                        user = _b.sent();
                        console.info("Didn't find an existing user for presented Certificate, created a new user: " + chalk__WEBPACK_IMPORTED_MODULE_4___default.a.magenta(certUsername) + "!");
                        return [3 /*break*/, 5];
                    case 5: return [4 /*yield*/, this.handleUserLogin(res, user)];
                    case 6:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.checkIfUnencryptedPasswordIsValid = function (unencryptedPassword, userEntity) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var isValid;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                isValid = bcryptjs__WEBPACK_IMPORTED_MODULE_1__["compareSync"](unencryptedPassword, userEntity.password);
                return [2 /*return*/, isValid];
            });
        });
    };
    AuthController.prototype.changePassword = function (req, res) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var id, _a, oldPassword, newPassword, user, id_1, isOldPasswordValid;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.getUserRepository();
                        id = res.locals.jwtPayload.userId;
                        _a = req.body, oldPassword = _a.oldPassword, newPassword = _a.newPassword;
                        if (!(oldPassword && newPassword)) {
                            res.status(400).send();
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.userRepository.findOneOrFail(id)];
                    case 2:
                        user = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        id_1 = _b.sent();
                        res.status(401).send();
                        return [3 /*break*/, 4];
                    case 4: return [4 /*yield*/, this.checkIfUnencryptedPasswordIsValid(oldPassword, user)];
                    case 5:
                        isOldPasswordValid = _b.sent();
                        if (!isOldPasswordValid) {
                            res.status(401).send("New password must be different than the previous...");
                            return [2 /*return*/];
                        }
                        // TODO: Validate the model (password length)
                        user.password = newPassword;
                        //Hash the new password and save
                        new _userController__WEBPACK_IMPORTED_MODULE_8__["UserController"]().hashPassword(user);
                        this.userRepository.save(user);
                        res.status(204).send();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.handleUserLogin = function (res, user) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var token;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__["sign"]({
                            userId: user.id,
                            username: user.username,
                            roles: user.roles.map(function (r) {
                                return { role: r.role };
                            })
                        }, _config__WEBPACK_IMPORTED_MODULE_6__["default"].jwtSecret, {
                            expiresIn: '10h'
                        });
                        // Delete user pass
                        delete user.password;
                        console.log("LOGIN: User " + chalk__WEBPACK_IMPORTED_MODULE_4___default.a.magenta(user.username) + " successfully logged in!");
                        user.numSuccessfulLogin++;
                        user.numFailedLogin = 0;
                        user.lastLoggedInDate = new Date();
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 1:
                        _a.sent(); // increment num successful login counter
                        //Send the jwt in the response
                        res.send(Object.assign({ jwt: token }, user));
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.createUser = function (username, roles) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var randomPassword, authRoleRepository, guestRole, guest, user, createdUser;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        randomPassword = __webpack_require__(/*! generate-password */ "generate-password").generate({
                            length: 14,
                            numbers: true,
                            symbols: true
                        });
                        if (!!roles) return [3 /*break*/, 4];
                        authRoleRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["getRepository"])(_libs_entities_auth_auth_role__WEBPACK_IMPORTED_MODULE_5__["AuthRole"]);
                        return [4 /*yield*/, authRoleRepository.findOne({ where: { role: 'guest' } })];
                    case 1:
                        guestRole = _a.sent();
                        if (!!guestRole) return [3 /*break*/, 3];
                        guest = new _libs_entities_auth_auth_role__WEBPACK_IMPORTED_MODULE_5__["AuthRole"]();
                        guest.role = 'guest';
                        return [4 /*yield*/, authRoleRepository.save(guest)];
                    case 2:
                        guestRole = _a.sent();
                        _a.label = 3;
                    case 3:
                        roles = [guestRole];
                        _a.label = 4;
                    case 4:
                        user = new _libs_entities_auth_user__WEBPACK_IMPORTED_MODULE_7__["User"]({
                            username: username,
                            password: randomPassword,
                            roles: roles,
                            lastLoggedInDate: new Date(),
                            numSuccessfulLogin: 0,
                            numFailedLogin: 0,
                            isLocked: false
                        });
                        new _userController__WEBPACK_IMPORTED_MODULE_8__["UserController"]().hashPassword(user);
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 5:
                        createdUser = _a.sent();
                        return [2 /*return*/, createdUser];
                }
            });
        });
    };
    return AuthController;
}());



/***/ }),

/***/ "./apps/dakimbo-server/src/controllers/data/data-transaction.ts":
/*!**********************************************************************!*\
  !*** ./apps/dakimbo-server/src/controllers/data/data-transaction.ts ***!
  \**********************************************************************/
/*! exports provided: DataTransaction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataTransaction", function() { return DataTransaction; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _log_data_transaction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./log-data-transaction */ "./apps/dakimbo-server/src/controllers/data/log-data-transaction.ts");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _libs_entities_entity_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../libs/entities/_entity-map */ "./libs/entities/_entity-map.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../config */ "./apps/dakimbo-server/src/config.ts");
/* harmony import */ var _database_database__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../database/database */ "./apps/dakimbo-server/src/database/database.ts");
/* harmony import */ var _libs_utilities_src_lib_auth_checkModelAllowedRoles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../../../libs/utilities/src/lib/auth/checkModelAllowedRoles */ "./libs/utilities/src/lib/auth/checkModelAllowedRoles.ts");







var DataTransaction = /** @class */ (function () {
    function DataTransaction(req, res) {
        this.req = req;
        this.res = res;
        this.entityName = this.req.params.entity;
        this.model = _libs_entities_entity_map__WEBPACK_IMPORTED_MODULE_3__["entityMap"][this.entityName];
        this.concreteModel = new this.model();
        this.dataObject = req.body;
        this.repo = _database_database__WEBPACK_IMPORTED_MODULE_5__["Database"]._connection.getRepository(this.entityName);
        if (!this.model.ignoreAuthorization) {
            this.userJwt = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__["verify"](this.res.getHeader('token'), _config__WEBPACK_IMPORTED_MODULE_4__["default"].jwtSecret);
        }
        else {
            this.userJwt = {
                username: 'guest'
            };
        }
        if (!this.entityName) {
            this.res.send('You must include the resource name to post this entity to!');
            return;
        }
        if (!Object(_libs_utilities_src_lib_auth_checkModelAllowedRoles__WEBPACK_IMPORTED_MODULE_6__["checkModelAllowedRoles"])(this.model, this.userJwt)) {
            this.res.status(403).send('You are not allowed to transaction this entity!');
            return;
        }
    }
    DataTransaction.prototype.performTransaction = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!['POST', 'PATCH', 'PUT'].includes(this.req.method)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.executeSave()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(this.req.method === 'DELETE')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.executeDelete()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DataTransaction.prototype.executeSave = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var start, isArray, preProcessPromises_1, savedEntity, postProcessPromises_1, end, e_1, end;
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        start = Date.now();
                        isArray = Array.isArray(this.dataObject);
                        if (isArray) {
                            this.dataObject.forEach(function (d) { return _this.setEntityUser(d); });
                        }
                        else {
                            this.setEntityUser(this.dataObject);
                            if (!this.dataObject.id && this.req.params.id)
                                this.dataObject.id = this.req.params.id;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 13, , 14]);
                        if (!this.concreteModel.preProcess) return [3 /*break*/, 5];
                        if (!isArray) return [3 /*break*/, 3];
                        preProcessPromises_1 = [];
                        this.dataObject.forEach(function (o) {
                            return preProcessPromises_1.push(_this.concreteModel.preProcess(o, _database_database__WEBPACK_IMPORTED_MODULE_5__["Database"]._connection, _this.entityName, _this.userJwt));
                        });
                        return [4 /*yield*/, Promise.all(preProcessPromises_1)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.concreteModel.preProcess(this.dataObject, _database_database__WEBPACK_IMPORTED_MODULE_5__["Database"]._connection, this.entityName, this.userJwt)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.repo.save(this.dataObject)];
                    case 6:
                        savedEntity = _a.sent();
                        if (!this.concreteModel.postProcess) return [3 /*break*/, 10];
                        if (!isArray) return [3 /*break*/, 8];
                        postProcessPromises_1 = [];
                        this.dataObject.forEach(function (o) {
                            return postProcessPromises_1.push(_this.concreteModel.postProcess(o, _database_database__WEBPACK_IMPORTED_MODULE_5__["Database"]._connection, _this.entityName, _this.userJwt));
                        });
                        return [4 /*yield*/, Promise.all(postProcessPromises_1)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, this.concreteModel.postProcess(this.dataObject, _database_database__WEBPACK_IMPORTED_MODULE_5__["Database"]._connection, this.entityName, this.userJwt)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        if (!this.model.loadAfterSave) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.repo.findOne(this.dataObject.id)];
                    case 11:
                        savedEntity = _a.sent();
                        _a.label = 12;
                    case 12:
                        end = Date.now();
                        Object(_log_data_transaction__WEBPACK_IMPORTED_MODULE_1__["logDataTransaction"])(this.req.method, this.entityName, savedEntity, this.userJwt, end - start);
                        this.res.send(savedEntity);
                        return [3 /*break*/, 14];
                    case 13:
                        e_1 = _a.sent();
                        end = Date.now();
                        Object(_log_data_transaction__WEBPACK_IMPORTED_MODULE_1__["logDataTransactionError"])(e_1, this.req.method, this.entityName, this.userJwt, end - start);
                        this.res.status(500).send(e_1);
                        return [3 /*break*/, 14];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    DataTransaction.prototype.executeDelete = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var start, idToDelete, isArray, end, e_2, end;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        start = Date.now();
                        idToDelete = this.req.params.id;
                        isArray = Array.isArray(this.dataObject);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.repo.delete(isArray ? this.dataObject : idToDelete)];
                    case 2:
                        _a.sent();
                        end = Date.now();
                        Object(_log_data_transaction__WEBPACK_IMPORTED_MODULE_1__["logDataTransaction"])(this.req.method, this.entityName, this.dataObject, this.userJwt, end - start);
                        this.res.send({
                            id: idToDelete
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        end = Date.now();
                        Object(_log_data_transaction__WEBPACK_IMPORTED_MODULE_1__["logDataTransactionError"])(e_2, this.req.method, this.entityName, this.userJwt, end - start);
                        this.res.status(500).send(e_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DataTransaction.prototype.setEntityUser = function (entity) {
        entity.modifyUser = this.userJwt.username;
        if (this.req.method === 'POST') {
            entity.createUser = this.userJwt.username;
        }
    };
    return DataTransaction;
}());



/***/ }),

/***/ "./apps/dakimbo-server/src/controllers/data/log-data-transaction.ts":
/*!**************************************************************************!*\
  !*** ./apps/dakimbo-server/src/controllers/data/log-data-transaction.ts ***!
  \**************************************************************************/
/*! exports provided: logDataTransaction, logDataTransactionError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logDataTransaction", function() { return logDataTransaction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logDataTransactionError", function() { return logDataTransactionError; });
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chalk */ "chalk");
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chalk__WEBPACK_IMPORTED_MODULE_0__);

var logDataTransaction = function (method, entityName, entity, userJwt, time, query) {
    var msg = chalk__WEBPACK_IMPORTED_MODULE_0___default.a.bold(method) + ": " + chalk__WEBPACK_IMPORTED_MODULE_0___default.a.yellow(entityName);
    switch (method) {
        case 'GET':
            msg += "" + (query ? (Object.keys(query).length ? ' ' + JSON.stringify(query) : '') : '');
            msg += " | Returned " + chalk__WEBPACK_IMPORTED_MODULE_0___default.a.underline(entity.length) + " entities!";
            break;
        default:
            msg += " | " + (Array.isArray(entity)
                ? 'Length: ' + chalk__WEBPACK_IMPORTED_MODULE_0___default.a.underline(entity.length)
                : chalk__WEBPACK_IMPORTED_MODULE_0___default.a.underline(entity.id));
            break;
    }
    msg += " | " + chalk__WEBPACK_IMPORTED_MODULE_0___default.a.bold('USER') + ": " + chalk__WEBPACK_IMPORTED_MODULE_0___default.a.magenta(userJwt.username) + " | " + chalk__WEBPACK_IMPORTED_MODULE_0___default.a.bold('TIME') + ": " + chalk__WEBPACK_IMPORTED_MODULE_0___default.a.grey(time) + " ms";
    console.log(msg);
};
var logDataTransactionError = function (error, method, entityName, userJwt, time, query) {
    var msg = chalk__WEBPACK_IMPORTED_MODULE_0___default.a.bold(method) + ": " + chalk__WEBPACK_IMPORTED_MODULE_0___default.a.yellow(entityName);
    msg += "" + (query ? (Object.keys(query).length ? ' ' + JSON.stringify(query) : '') : '');
    msg += " | " + chalk__WEBPACK_IMPORTED_MODULE_0___default.a.bold('USER') + ": " + chalk__WEBPACK_IMPORTED_MODULE_0___default.a.magenta(userJwt.username) + " | " + chalk__WEBPACK_IMPORTED_MODULE_0___default.a.bold('TIME') + ": " + chalk__WEBPACK_IMPORTED_MODULE_0___default.a.grey(time) + " ms";
    console.error(msg);
    console.error(error);
};


/***/ }),

/***/ "./apps/dakimbo-server/src/controllers/data/read.ts":
/*!**********************************************************!*\
  !*** ./apps/dakimbo-server/src/controllers/data/read.ts ***!
  \**********************************************************/
/*! exports provided: readData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readData", function() { return readData; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _log_data_transaction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./log-data-transaction */ "./apps/dakimbo-server/src/controllers/data/log-data-transaction.ts");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _libs_entities_entity_map__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../libs/entities/_entity-map */ "./libs/entities/_entity-map.ts");
/* harmony import */ var _libs_utilities_src_lib_auth_checkModelAllowedRoles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../libs/utilities/src/lib/auth/checkModelAllowedRoles */ "./libs/utilities/src/lib/auth/checkModelAllowedRoles.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../config */ "./apps/dakimbo-server/src/config.ts");
/* harmony import */ var _database_database__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../database/database */ "./apps/dakimbo-server/src/database/database.ts");
/* harmony import */ var _libs_utilities_src_lib_utilities_arrays_getUniqueValues__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../../../../libs/utilities/src/lib/utilities/arrays/getUniqueValues */ "./libs/utilities/src/lib/utilities/arrays/getUniqueValues.ts");









var readData = function (req, res) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
    var entityName, model, concreteModel, userJwt, start, repo, entities, findOptions, cacheTime, distinct, distinctProp, useDefaultRepo, queries, query, attrs, i, len, key, value, splitProp, prop, subProp, manager, _a, end, e_1, end;
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
        switch (_b.label) {
            case 0:
                entityName = req.params.entity;
                if (!entityName) {
                    res.send('You must include the resource name to get these entities from!');
                    return [2 /*return*/];
                }
                model = _libs_entities_entity_map__WEBPACK_IMPORTED_MODULE_4__["entityMap"][entityName];
                concreteModel = new model();
                if (!model.ignoreAuthorization) {
                    userJwt = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__["verify"](res.getHeader('token'), _config__WEBPACK_IMPORTED_MODULE_6__["default"].jwtSecret);
                }
                else {
                    userJwt = {
                        username: 'guest'
                    };
                }
                if (!Object(_libs_utilities_src_lib_auth_checkModelAllowedRoles__WEBPACK_IMPORTED_MODULE_5__["checkModelAllowedRoles"])(model, userJwt)) {
                    this.res.status(403).send('You are not allowed to transaction this entity!');
                    return [2 /*return*/];
                }
                start = Date.now();
                _b.label = 1;
            case 1:
                _b.trys.push([1, 14, , 15]);
                repo = _database_database__WEBPACK_IMPORTED_MODULE_7__["Database"]._connection.getRepository(entityName);
                entities = [];
                findOptions = {};
                cacheTime = void 0;
                distinct = false;
                distinctProp = void 0;
                useDefaultRepo = false;
                queries = Object.keys(req.query);
                if (queries && queries.length) {
                    query = {};
                    attrs = [];
                    for (i = 0, len = queries.length; i < len; i++) {
                        key = queries[i];
                        value = req.query[key];
                        if (key === 'useDefaultRepo') {
                            useDefaultRepo = true;
                        }
                        else if (key === 'attrs') {
                            attrs = value.split(',');
                        }
                        else if (key === 'distinct') {
                            distinct = true;
                        }
                        else if (key === 'distinctProp') {
                            distinctProp = value;
                        }
                        else if (key.indexOf('.') >= 0) {
                            splitProp = key.split('.');
                            prop = splitProp[0], subProp = splitProp[1];
                            query[prop] = {};
                            query[prop][subProp] = transformQueryValue(value);
                        }
                        else {
                            query[key] = transformQueryValue(value);
                        }
                    }
                    findOptions = {};
                    if (query) {
                        findOptions.where = query;
                    }
                    if (attrs && attrs.length) {
                        findOptions.select = attrs;
                    }
                    if (cacheTime) {
                        findOptions.cache = { id: entityName, milliseconds: cacheTime };
                    }
                    else {
                        findOptions.cache = false;
                    }
                }
                if (!(model.repoType && !useDefaultRepo)) return [3 /*break*/, 7];
                manager = Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["getManager"])();
                _a = model.repoType;
                switch (_a) {
                    case 'tree': return [3 /*break*/, 2];
                }
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, manager.getTreeRepository(entityName).findTrees()];
            case 3:
                entities = _b.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, repo.find(findOptions)];
            case 5:
                entities = _b.sent();
                return [3 /*break*/, 6];
            case 6: return [3 /*break*/, 9];
            case 7: return [4 /*yield*/, repo.find(findOptions)];
            case 8:
                entities = _b.sent();
                _b.label = 9;
            case 9:
                if (!concreteModel.postLoad) return [3 /*break*/, 11];
                return [4 /*yield*/, concreteModel.postLoad(entities, _database_database__WEBPACK_IMPORTED_MODULE_7__["Database"]._connection)];
            case 10:
                entities = _b.sent();
                _b.label = 11;
            case 11:
                if (!(model && model.relationships && model.relationships.length)) return [3 /*break*/, 13];
                return [4 /*yield*/, loadRelationships(entityName, model.relationships, entities)];
            case 12:
                _b.sent();
                _b.label = 13;
            case 13:
                removeIgnoredAttrs(entities);
                if (distinct && distinctProp) {
                    entities = Object(_libs_utilities_src_lib_utilities_arrays_getUniqueValues__WEBPACK_IMPORTED_MODULE_8__["getUniqueValues"])(entities, distinctProp)
                        .filter(function (v) { return v; })
                        .sort();
                }
                end = Date.now();
                Object(_log_data_transaction__WEBPACK_IMPORTED_MODULE_1__["logDataTransaction"])('GET', entityName, entities, userJwt, end - start, req.query);
                res.send(entities);
                return [3 /*break*/, 15];
            case 14:
                e_1 = _b.sent();
                res.status(500).send(e_1);
                end = Date.now();
                Object(_log_data_transaction__WEBPACK_IMPORTED_MODULE_1__["logDataTransactionError"])(e_1, 'GET', entityName, userJwt, end - start, req.query);
                return [3 /*break*/, 15];
            case 15: return [2 /*return*/];
        }
    });
}); };
var transformQueryValue = function (value) {
    var lowerValue = value.toLowerCase();
    if (lowerValue === 'null') {
        return Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["IsNull"])();
    }
    else {
        return value;
    }
};
var removeIgnoredAttrs = function (entities) {
    if (!entities)
        return;
    var ignoreAttrs = ['relationships', 'loadAfterSave'];
    (entities instanceof Array ? entities : [entities]).forEach(function (e) {
        return ignoreAttrs.forEach(function (attr) { return delete e[attr]; });
    });
};
var loadRelationships = function (entityName, relationships, baseEntities, ignoreSubRelations) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
    var repo, res, subRelationshipPromises, _i, _a, i, _loop_1, _b, _c, r;
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (!baseEntities || !baseEntities.length)
                    return [2 /*return*/];
                repo = _database_database__WEBPACK_IMPORTED_MODULE_7__["Database"]._connection.getRepository(entityName);
                return [4 /*yield*/, Promise.all(relationships.map(function (relation) {
                        return repo.findByIds(baseEntities.map(function (entity) {
                            if (!entity || !entity.id)
                                return;
                            return entity.id;
                        }), {
                            select: ['id'],
                            relations: [relation.name]
                        });
                    }))];
            case 1:
                res = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"].apply(void 0, [_d.sent(),
                    []]);
                subRelationshipPromises = [];
                for (_i = 0, _a = Object.keys(res); _i < _a.length; _i++) {
                    i = _a[_i];
                    _loop_1 = function (r) {
                        var fullEntity = baseEntities.find(function (e) { return e.id === r.id; });
                        if (fullEntity) {
                            var relationName = relationships[i].name;
                            var relationModel = relationships[i].model;
                            var relationModelName = relationModel && relationModel.displayName
                                ? relationModel.displayName
                                : relationships[i].modelName;
                            var relationObject = r[relationName];
                            if (relationModelName) {
                                var subRelationships = _libs_entities_entity_map__WEBPACK_IMPORTED_MODULE_4__["entityMap"][relationModelName].relationships;
                                if (subRelationships && !ignoreSubRelations) {
                                    subRelationshipPromises.push(loadRelationships(relationModelName, subRelationships, relationObject instanceof Array ? relationObject : [relationObject], relationships[i].ignoreSubRelations));
                                }
                            }
                            removeIgnoredAttrs(relationObject);
                            removeIgnoredAttrs(fullEntity);
                            fullEntity[relationName] = relationObject;
                        }
                    };
                    for (_b = 0, _c = res[i]; _b < _c.length; _b++) {
                        r = _c[_b];
                        _loop_1(r);
                    }
                }
                return [4 /*yield*/, Promise.all(subRelationshipPromises)];
            case 2:
                _d.sent();
                return [2 /*return*/];
        }
    });
}); };


/***/ }),

/***/ "./apps/dakimbo-server/src/controllers/dataController.ts":
/*!***************************************************************!*\
  !*** ./apps/dakimbo-server/src/controllers/dataController.ts ***!
  \***************************************************************/
/*! exports provided: DataController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataController", function() { return DataController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _data_read__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data/read */ "./apps/dakimbo-server/src/controllers/data/read.ts");
/* harmony import */ var _data_data_transaction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data/data-transaction */ "./apps/dakimbo-server/src/controllers/data/data-transaction.ts");



var DataController = /** @class */ (function () {
    function DataController() {
        this.get = _data_read__WEBPACK_IMPORTED_MODULE_1__["readData"];
    }
    DataController.prototype.create = function (req, res) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new _data_data_transaction__WEBPACK_IMPORTED_MODULE_2__["DataTransaction"](req, res).performTransaction()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DataController.prototype.update = function (req, res) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new _data_data_transaction__WEBPACK_IMPORTED_MODULE_2__["DataTransaction"](req, res).performTransaction()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DataController.prototype.delete = function (req, res) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new _data_data_transaction__WEBPACK_IMPORTED_MODULE_2__["DataTransaction"](req, res).performTransaction()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return DataController;
}());



/***/ }),

/***/ "./apps/dakimbo-server/src/controllers/mediaController.ts":
/*!****************************************************************!*\
  !*** ./apps/dakimbo-server/src/controllers/mediaController.ts ***!
  \****************************************************************/
/*! exports provided: MediaController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediaController", function() { return MediaController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _libs_entities_entity_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../libs/entities/_entity-map */ "./libs/entities/_entity-map.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config */ "./apps/dakimbo-server/src/config.ts");





var os = __webpack_require__(/*! os */ "os");
var mkdirp = __webpack_require__(/*! mkdirp */ "mkdirp");
var MediaController = /** @class */ (function () {
    function MediaController() {
    }
    MediaController.prototype.uploadMedia = function (req, res) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var entityName, entityId, model, userJwt, media, mediaFiles, mediaMap, mediaEntities;
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entityName = req.params.entity;
                        entityId = req.params.id;
                        if (entityName) {
                            model = _libs_entities_entity_map__WEBPACK_IMPORTED_MODULE_3__["entityMap"][entityName];
                            userJwt = void 0;
                            if (!model.ignoreAuthorization) {
                                userJwt = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__["verify"](res.getHeader('token'), _config__WEBPACK_IMPORTED_MODULE_4__["default"].jwtSecret);
                            }
                            else {
                                userJwt = {
                                    username: 'guest'
                                };
                            }
                        }
                        media = req.files.media;
                        mediaFiles = [];
                        if (!media.length) {
                            mediaFiles = [media];
                        }
                        else {
                            mediaFiles = media;
                        }
                        mediaMap = {};
                        mediaFiles.forEach(function (f) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
                            var directoryPath, mediaPath;
                            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        directoryPath = "" + __dirname + _config__WEBPACK_IMPORTED_MODULE_4__["default"].pathToMedia + (entityName ? '/' + entityName.toLowerCase() : '') + (entityId ? '/' + entityId : '');
                                        mediaPath = directoryPath + "/" + f.name;
                                        if (os.platform() === 'win32') {
                                            directoryPath = directoryPath.replace('/', '\\');
                                            mediaPath = mediaPath.replace('/', '\\');
                                        }
                                        directoryPath = path__WEBPACK_IMPORTED_MODULE_2___default.a.resolve(directoryPath);
                                        mediaPath = path__WEBPACK_IMPORTED_MODULE_2___default.a.resolve(mediaPath);
                                        return [4 /*yield*/, mkdirp(directoryPath, { recursive: true })];
                                    case 1:
                                        _a.sent();
                                        f.mv(mediaPath, function (error) {
                                            if (error) {
                                                console.error(error);
                                                res.writeHead(500, { 'Content-Type': 'application/json' });
                                                return;
                                            }
                                        });
                                        mediaMap[mediaPath] = f;
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, this.handleEntityMediaUpload(mediaMap, entityName, entityId)];
                    case 1:
                        mediaEntities = _a.sent();
                        res.status(201).send(mediaEntities);
                        return [2 /*return*/];
                }
            });
        });
    };
    MediaController.prototype.handleGeneralMediaUpload = function () { };
    MediaController.prototype.handleEntityMediaUpload = function (media, entityName, entityId) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return MediaController;
}());



/***/ }),

/***/ "./apps/dakimbo-server/src/controllers/metaController.ts":
/*!***************************************************************!*\
  !*** ./apps/dakimbo-server/src/controllers/metaController.ts ***!
  \***************************************************************/
/*! exports provided: MetaController, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetaController", function() { return MetaController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _libs_utilities_src_lib_utilities_arrays_getUniqueValues__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../../libs/utilities/src/lib/utilities/arrays/getUniqueValues */ "./libs/utilities/src/lib/utilities/arrays/getUniqueValues.ts");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! chalk */ "chalk");
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(chalk__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config */ "./apps/dakimbo-server/src/config.ts");
/* harmony import */ var _database_database__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../database/database */ "./apps/dakimbo-server/src/database/database.ts");
/* harmony import */ var _libs_entities_entity_map__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../../libs/entities/_entity-map */ "./libs/entities/_entity-map.ts");
/* harmony import */ var _libs_entities_entity_utilities__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../../../libs/entities/entity-utilities */ "./libs/entities/entity-utilities.ts");








var MetaController = /** @class */ (function () {
    function MetaController() {
    }
    MetaController.prototype.getAllEntitiesMetadata = function (req, res) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var entityNames;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                try {
                    entityNames = Object.keys(_libs_entities_entity_map__WEBPACK_IMPORTED_MODULE_6__["entityMap"])
                        .map(function (model) {
                        return _libs_entities_entity_map__WEBPACK_IMPORTED_MODULE_6__["entityMap"][model].displayName || model;
                    })
                        .filter(function (name) {
                        return ![
                            'User',
                            'AuthRole',
                            'AuthAction',
                            'AuthRoleAction',
                            'MetricPageView',
                            'MetricPageVisit'
                        ].includes(name);
                    })
                        .sort();
                    res.send(entityNames);
                }
                catch (e) {
                    console.error("ERROR: " + e);
                    res.status(500).send(e);
                }
                return [2 /*return*/];
            });
        });
    };
    MetaController.prototype.getEntityMetadata = function (req, res) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var entityName, userJwt, metadata, properties;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                entityName = req.params.entity;
                if (!entityName) {
                    res.send('You must include the resource name to get these entities from!');
                    return [2 /*return*/];
                }
                userJwt = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__["verify"](res.getHeader('token'), _config__WEBPACK_IMPORTED_MODULE_4__["default"].jwtSecret);
                try {
                    metadata = _database_database__WEBPACK_IMPORTED_MODULE_5__["Database"]._connection.getMetadata(entityName);
                    properties = Object.keys(metadata.propertiesMap)
                        .filter(function (p) { return !_libs_entities_entity_utilities__WEBPACK_IMPORTED_MODULE_7__["ignoreProps"].includes(p); })
                        .sort();
                    console.log("METADATA: " + chalk__WEBPACK_IMPORTED_MODULE_3___default.a.yellow(entityName) + " | # of Props: " + properties.length + " | USER: " + chalk__WEBPACK_IMPORTED_MODULE_3___default.a.magenta(userJwt.username));
                    res.send(properties);
                }
                catch (e) {
                    console.error("Could not find metadata for entity " + entityName + "...");
                    res.status(500).send(e);
                }
                return [2 /*return*/];
            });
        });
    };
    MetaController.prototype.getUniqueValuesForPropInEntity = function (req, res) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var entityName, prop, userJwt, values, uniqueValues, e_1;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entityName = req.params.entity, prop = req.params.prop;
                        if (!entityName) {
                            res.send('You must include the resource name to get these unique values from!');
                            return [2 /*return*/];
                        }
                        if (!prop) {
                            res.send('You must include the property to get the unique values for!');
                            return [2 /*return*/];
                        }
                        userJwt = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__["verify"](res.getHeader('token'), _config__WEBPACK_IMPORTED_MODULE_4__["default"].jwtSecret);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, _database_database__WEBPACK_IMPORTED_MODULE_5__["Database"]._connection
                                .getRepository(entityName)
                                .createQueryBuilder(entityName)
                                .getMany()];
                    case 2:
                        values = _a.sent();
                        uniqueValues = Object(_libs_utilities_src_lib_utilities_arrays_getUniqueValues__WEBPACK_IMPORTED_MODULE_1__["getUniqueValues"])(values, prop)
                            .filter(function (v) { return v; })
                            .sort();
                        console.log("METADATA: " + chalk__WEBPACK_IMPORTED_MODULE_3___default.a.yellow(entityName) + " | # of Unique Values: " + uniqueValues.length + " | USER: " + chalk__WEBPACK_IMPORTED_MODULE_3___default.a.magenta(userJwt.username));
                        res.send(uniqueValues);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error("Could not find unique values for entity: " + chalk__WEBPACK_IMPORTED_MODULE_3___default.a.yellow(entityName) + ", prop: " + prop);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return MetaController;
}());

/* harmony default export */ __webpack_exports__["default"] = (MetaController);


/***/ }),

/***/ "./apps/dakimbo-server/src/controllers/metricsController.ts":
/*!******************************************************************!*\
  !*** ./apps/dakimbo-server/src/controllers/metricsController.ts ***!
  \******************************************************************/
/*! exports provided: MetricsController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetricsController", function() { return MetricsController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _database_database__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../database/database */ "./apps/dakimbo-server/src/database/database.ts");


var MetricsController = /** @class */ (function () {
    function MetricsController() {
    }
    MetricsController.prototype.getMetricsFor = function (req, res) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var metricToFind, metricRepo, metrics, error_1;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        metricToFind = req.params.metricName;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        metricRepo = _database_database__WEBPACK_IMPORTED_MODULE_1__["Database"]._connection.getRepository(metricToFind);
                        return [4 /*yield*/, metricRepo.find()];
                    case 2:
                        metrics = _a.sent();
                        console.log("METRICS FETCHED: " + metricToFind + " --- FOUND: " + metrics.length);
                        res.send(metrics);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        res.status(500).send(error_1);
                        console.log("FAILED: Metrics fetch for " + metricToFind);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return MetricsController;
}());



/***/ }),

/***/ "./apps/dakimbo-server/src/controllers/userController.ts":
/*!***************************************************************!*\
  !*** ./apps/dakimbo-server/src/controllers/userController.ts ***!
  \***************************************************************/
/*! exports provided: UserController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserController", function() { return UserController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ "bcryptjs");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! chalk */ "chalk");
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(chalk__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _libs_entities_auth_user__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../libs/entities/auth/user */ "./libs/entities/auth/user.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../config */ "./apps/dakimbo-server/src/config.ts");







var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.listAll = function (req, res) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var userRepository, users;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["getRepository"])(_libs_entities_auth_user__WEBPACK_IMPORTED_MODULE_5__["User"]);
                        return [4 /*yield*/, userRepository.find()];
                    case 1:
                        users = _a.sent();
                        users.forEach(function (user) {
                            delete user.password;
                        });
                        //Send the users object
                        res.send(users);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getOneById = function (req, res) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var id, userRepository, user, error_1;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["getRepository"])(_libs_entities_auth_user__WEBPACK_IMPORTED_MODULE_5__["User"]);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, userRepository.findOneOrFail(id)];
                    case 2:
                        user = _a.sent();
                        delete user.password;
                        res.status(201).send(user);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        res.status(404).send('User not found');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.newUser = function (req, res) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var _a, username, password, email, roles, user, userRepository, e_1;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, username = _a.username, password = _a.password, email = _a.email, roles = _a.roles;
                        user = new _libs_entities_auth_user__WEBPACK_IMPORTED_MODULE_5__["User"]();
                        user.username = username;
                        user.password = password;
                        user.email = email;
                        user.roles = roles;
                        // const { adminUser } = <any>jwt.verify(<string>res.getHeader('token'), config.jwtSecret);
                        // TODO: Validade if the parameters are ok
                        //Hash the password, to securely store on DB
                        this.hashPassword(user);
                        userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["getRepository"])(_libs_entities_auth_user__WEBPACK_IMPORTED_MODULE_5__["User"]);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, userRepository.save(user)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        res.status(409).send('Username already in use!');
                        return [2 /*return*/];
                    case 4:
                        delete user.password;
                        //If all ok, send 201 response
                        console.log("CREATE USER: " + chalk__WEBPACK_IMPORTED_MODULE_4___default.a.magenta(user.username));
                        res.status(201).send(user);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.editUser = function (req, res) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var id, _a, username, password, roles, email, isLocked, numFailedLogin, adminUser, userRepository, user, error_2, e_2;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, username = _a.username, password = _a.password, roles = _a.roles, email = _a.email, isLocked = _a.isLocked, numFailedLogin = _a.numFailedLogin;
                        adminUser = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__["verify"](res.getHeader('token'), _config__WEBPACK_IMPORTED_MODULE_6__["default"].jwtSecret).adminUser;
                        userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["getRepository"])(_libs_entities_auth_user__WEBPACK_IMPORTED_MODULE_5__["User"]);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, userRepository.findOneOrFail(id)];
                    case 2:
                        user = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        //If not found, send a 404 response
                        res.status(404).send('User not found');
                        return [2 /*return*/];
                    case 4:
                        //Validate the new values on model
                        user.username = username;
                        user.roles = roles;
                        user.email = email;
                        user.isLocked = isLocked || false;
                        user.numFailedLogin = numFailedLogin || 0;
                        if (password) {
                            user.password = password;
                            this.hashPassword(user);
                        }
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, userRepository.save(user)];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        e_2 = _b.sent();
                        console.error(e_2);
                        res.status(409).send('username already in use');
                        return [2 /*return*/];
                    case 8:
                        //After all send a 204 (no content, but accepted) response
                        console.log("EDIT USER: " + chalk__WEBPACK_IMPORTED_MODULE_4___default.a.magenta(user.username) + " | BY ADMIN: " + chalk__WEBPACK_IMPORTED_MODULE_4___default.a.red(adminUser === null || adminUser === void 0 ? void 0 : adminUser.username));
                        res.status(204).send();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.deleteUser = function (req, res) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var id, adminUser, userRepository, user, error_3;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        adminUser = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__["verify"](res.getHeader('token'), _config__WEBPACK_IMPORTED_MODULE_6__["default"].jwtSecret).adminUser;
                        userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["getRepository"])(_libs_entities_auth_user__WEBPACK_IMPORTED_MODULE_5__["User"]);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, userRepository.findOneOrFail(id)];
                    case 2:
                        user = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        res.status(404).send('User not found');
                        return [2 /*return*/];
                    case 4:
                        userRepository.delete(id);
                        //After all send a 204 (no content, but accepted) response
                        console.log("DELETE USER: " + chalk__WEBPACK_IMPORTED_MODULE_4___default.a.magenta(user.username) + " | BY ADMIN: " + chalk__WEBPACK_IMPORTED_MODULE_4___default.a.red(adminUser === null || adminUser === void 0 ? void 0 : adminUser.username));
                        res.status(204).send();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getCurrentUser = function (req, res) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var authHeader, token, jwtPayload, userId, username, userRepository, user, error_4;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authHeader = req.headers['authorization'];
                        if (!authHeader || !authHeader.includes('Bearer')) {
                            res.status(408).send('No Authorization Header or Bearer token presented!');
                            return [2 /*return*/];
                        }
                        token = authHeader.split('Bearer')[1].trim();
                        // Try to validate the token and get data
                        try {
                            jwtPayload = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__["verify"](token, _config__WEBPACK_IMPORTED_MODULE_6__["default"].jwtSecret);
                            res.locals.jwtPayload = jwtPayload;
                        }
                        catch (error) {
                            // If token is not valid, respond with 401 (unauthorized)
                            res.status(401).send();
                            return [2 /*return*/];
                        }
                        userId = jwtPayload.userId, username = jwtPayload.username;
                        userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["getRepository"])(_libs_entities_auth_user__WEBPACK_IMPORTED_MODULE_5__["User"]);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, userRepository.findOneOrFail(userId)];
                    case 2:
                        user = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        res.status(404).send('User not found');
                        return [2 /*return*/];
                    case 4:
                        delete user.password;
                        res.status(201).send(user);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.hashPassword = function (userEntity) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                userEntity.password = bcryptjs__WEBPACK_IMPORTED_MODULE_1__["hashSync"](userEntity.password, 8);
                return [2 /*return*/];
            });
        });
    };
    return UserController;
}());



/***/ }),

/***/ "./apps/dakimbo-server/src/database/database.ts":
/*!******************************************************!*\
  !*** ./apps/dakimbo-server/src/database/database.ts ***!
  \******************************************************/
/*! exports provided: Database */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Database", function() { return Database; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_1__);


var Database = /** @class */ (function () {
    function Database() {
    }
    Database.prototype.connect = function (dbOptions) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var _a, e_1;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        Database._dbOptions = dbOptions;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        console.log("Connecting to " + Database._dbOptions.type + " Database: " + Database._dbOptions.database + " at " + Database._dbOptions.host + ":" + Database._dbOptions.port + " with user: " + Database._dbOptions.username);
                        _a = Database;
                        return [4 /*yield*/, Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["createConnection"])(Database._dbOptions)];
                    case 2:
                        _a._connection = _b.sent();
                        return [4 /*yield*/, this.runMigrations()];
                    case 3:
                        _b.sent();
                        console.log("Connection to database established!");
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _b.sent();
                        console.log("Error Connecting to " + Database._dbOptions.host + ":" + Database._dbOptions.port + "\n", e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.runMigrations = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var migrations;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        migrations = [];
                        if (!migrations.length) return [3 /*break*/, 2];
                        console.log("Running migrations...");
                        return [4 /*yield*/, Promise.all(migrations)];
                    case 1:
                        _a.sent();
                        console.log("Migrations finished!");
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return Database;
}());



/***/ }),

/***/ "./apps/dakimbo-server/src/main.ts":
/*!*****************************************!*\
  !*** ./apps/dakimbo-server/src/main.ts ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reflect-metadata */ "reflect-metadata");
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ "body-parser");
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! compression */ "compression");
/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cors */ "cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var express_fileupload__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! express-fileupload */ "express-fileupload");
/* harmony import */ var express_fileupload__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(express_fileupload__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! helmet */ "helmet");
/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(helmet__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./config */ "./apps/dakimbo-server/src/config.ts");
/* harmony import */ var _database_database__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./database/database */ "./apps/dakimbo-server/src/database/database.ts");
/* harmony import */ var _middlewares_setupProxies__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./middlewares/setupProxies */ "./apps/dakimbo-server/src/middlewares/setupProxies.ts");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./routes */ "./apps/dakimbo-server/src/routes/index.ts");












__webpack_require__(/*! ./utilities/logStamp */ "./apps/dakimbo-server/src/utilities/logStamp.ts");
__webpack_require__(/*! dotenv */ "dotenv").config();
(function () { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
    var db, app, httpServer, https, httpsServer;
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        switch (_a.label) {
            case 0:
                db = new _database_database__WEBPACK_IMPORTED_MODULE_9__["Database"]();
                return [4 /*yield*/, db.connect(_config__WEBPACK_IMPORTED_MODULE_8__["default"].dbOptions)];
            case 1:
                _a.sent();
                app = express__WEBPACK_IMPORTED_MODULE_5___default()();
                Object(_middlewares_setupProxies__WEBPACK_IMPORTED_MODULE_10__["setupProxies"])(app);
                // MIDDLEWARE
                // app.use(morgan('dev'));
                app.use(cors__WEBPACK_IMPORTED_MODULE_4___default()());
                app.use(helmet__WEBPACK_IMPORTED_MODULE_7___default()());
                app.use(compression__WEBPACK_IMPORTED_MODULE_3___default()());
                app.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.urlencoded({ limit: '100mb', extended: true }));
                app.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.json({ limit: '100mb' }));
                app.use(express_fileupload__WEBPACK_IMPORTED_MODULE_6___default()({
                    limits: { fileSize: 50 * 1024 * 1024 }
                    // useTempFiles: true,
                    // tempFileDir: '/temp',
                    // createParentPath: true
                }));
                // ROUTES
                app.use(express__WEBPACK_IMPORTED_MODULE_5___default.a.static(__dirname + '/public'));
                app.use('/', _routes__WEBPACK_IMPORTED_MODULE_11__["default"]);
                app.get('*', function (req, res) {
                    res.sendFile(__dirname + '/public/index.html');
                });
                httpServer = app.listen(_config__WEBPACK_IMPORTED_MODULE_8__["default"].port, function () {
                    return console.log("HTTP Server is listening on " + _config__WEBPACK_IMPORTED_MODULE_8__["default"].port);
                });
                httpServer.on('error', console.error);
                https = __webpack_require__(/*! https */ "https");
                httpsServer = https.createServer(_config__WEBPACK_IMPORTED_MODULE_8__["default"].httpsOpts, app).listen(_config__WEBPACK_IMPORTED_MODULE_8__["default"].portSSL, function () {
                    return console.log("HTTPS Server is listening on " + _config__WEBPACK_IMPORTED_MODULE_8__["default"].portSSL);
                });
                httpsServer.on('error', console.error);
                return [2 /*return*/];
        }
    });
}); })();


/***/ }),

/***/ "./apps/dakimbo-server/src/middlewares/checkJwt.ts":
/*!*********************************************************!*\
  !*** ./apps/dakimbo-server/src/middlewares/checkJwt.ts ***!
  \*********************************************************/
/*! exports provided: checkJwt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkJwt", function() { return checkJwt; });
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ "./apps/dakimbo-server/src/config.ts");
/* harmony import */ var _libs_entities_entity_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../../../libs/entities/_entity-map */ "./libs/entities/_entity-map.ts");



var checkJwt = function (req, res, next) {
    // Check if the requested entity doesn't need authorization
    var entityName = req.params.entity;
    var model = _libs_entities_entity_map__WEBPACK_IMPORTED_MODULE_2__["entityMap"][entityName];
    var authHeader = req.headers['authorization'];
    if (model && model.ignoreAuthorization) {
        next();
        return;
    }
    // Get the jwt token from the head
    if (!authHeader || !authHeader.includes('Bearer')) {
        res.status(408).send('No Authorization Header or Bearer token presented!');
        return;
    }
    var token = authHeader.split('Bearer')[1].trim();
    var jwtPayload;
    // Try to validate the token and get data
    try {
        jwtPayload = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__["verify"](token, _config__WEBPACK_IMPORTED_MODULE_1__["default"].jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        // If token is not valid, respond with 401 (unauthorized)
        res.status(401).send();
        return;
    }
    // The token is valid for 1 hour
    // We want to send a new token on every request
    var userId = jwtPayload.userId, username = jwtPayload.username, roles = jwtPayload.roles;
    var newToken = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__["sign"]({ userId: userId, username: username, roles: roles }, _config__WEBPACK_IMPORTED_MODULE_1__["default"].jwtSecret, {
        expiresIn: '10h'
    });
    res.setHeader('token', newToken);
    // Call the next middleware or controller
    next();
};


/***/ }),

/***/ "./apps/dakimbo-server/src/middlewares/checkRole.ts":
/*!**********************************************************!*\
  !*** ./apps/dakimbo-server/src/middlewares/checkRole.ts ***!
  \**********************************************************/
/*! exports provided: checkRole */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkRole", function() { return checkRole; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _libs_entities_auth_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../libs/entities/auth/user */ "./libs/entities/auth/user.ts");
/* harmony import */ var _libs_entities_entity_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../../../libs/entities/_entity-map */ "./libs/entities/_entity-map.ts");
/* harmony import */ var _libs_utilities_src_lib_auth_checkUserRole__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../../libs/utilities/src/lib/auth/checkUserRole */ "./libs/utilities/src/lib/auth/checkUserRole.ts");





var checkRole = function (roles) {
    return function (req, res, next) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
        var entityName, model, id, userRepository, user, id_1;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    entityName = req.params.entity;
                    model = _libs_entities_entity_map__WEBPACK_IMPORTED_MODULE_3__["entityMap"][entityName];
                    if (!model || model.ignoreAuthorization) {
                        next();
                        return [2 /*return*/];
                    }
                    id = res.locals.jwtPayload.userId;
                    userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["getRepository"])(_libs_entities_auth_user__WEBPACK_IMPORTED_MODULE_2__["User"]);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail(id)];
                case 2:
                    user = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    id_1 = _a.sent();
                    res.status(401).send();
                    return [3 /*break*/, 4];
                case 4:
                    // Check if array of authorized roles includes the user's role
                    if (Object(_libs_utilities_src_lib_auth_checkUserRole__WEBPACK_IMPORTED_MODULE_4__["checkUserRole"])(user, roles))
                        next();
                    else
                        res.status(401).send();
                    return [2 /*return*/];
            }
        });
    }); };
};


/***/ }),

/***/ "./apps/dakimbo-server/src/middlewares/setupProxies.ts":
/*!*************************************************************!*\
  !*** ./apps/dakimbo-server/src/middlewares/setupProxies.ts ***!
  \*************************************************************/
/*! exports provided: setupProxies */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupProxies", function() { return setupProxies; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var http_proxy_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! http-proxy-middleware */ "http-proxy-middleware");
/* harmony import */ var http_proxy_middleware__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(http_proxy_middleware__WEBPACK_IMPORTED_MODULE_1__);


__webpack_require__(/*! dotenv */ "dotenv").config();
var setupProxies = function (app) {
    var proxyUrls;
    try {
        proxyUrls = process.env.PROXY_URLS ? JSON.parse(process.env.PROXY_URLS) : null;
        if (proxyUrls === null || proxyUrls === void 0 ? void 0 : proxyUrls.length) {
            proxyUrls.forEach(function (proxyUrl) {
                app.use(proxyUrl.route, Object(http_proxy_middleware__WEBPACK_IMPORTED_MODULE_1__["createProxyMiddleware"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ target: proxyUrl.target, secure: false, changeOrigin: true, headers: {
                        Connection: 'keep-alive'
                    } }, proxyUrl.options)));
            });
        }
    }
    catch (e) {
        console.error('ERROR: Failed parsing PROXY_URLS', e);
    }
};


/***/ }),

/***/ "./apps/dakimbo-server/src/routes/authRoute.ts":
/*!*****************************************************!*\
  !*** ./apps/dakimbo-server/src/routes/authRoute.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_authController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/authController */ "./apps/dakimbo-server/src/controllers/authController.ts");
/* harmony import */ var _middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../middlewares/checkJwt */ "./apps/dakimbo-server/src/middlewares/checkJwt.ts");



var router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
var authController = new _controllers_authController__WEBPACK_IMPORTED_MODULE_1__["AuthController"]();
//Login route
router.post('/login', authController.login.bind(authController));
router.post('/login-cert', authController.loginCertificate.bind(authController));
//Change my password
router.post('/change-password', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__["checkJwt"]], authController.changePassword.bind(authController));
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),

/***/ "./apps/dakimbo-server/src/routes/dataRoute.ts":
/*!*****************************************************!*\
  !*** ./apps/dakimbo-server/src/routes/dataRoute.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../middlewares/checkJwt */ "./apps/dakimbo-server/src/middlewares/checkJwt.ts");
/* harmony import */ var _middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../middlewares/checkRole */ "./apps/dakimbo-server/src/middlewares/checkRole.ts");
/* harmony import */ var _controllers_dataController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controllers/dataController */ "./apps/dakimbo-server/src/controllers/dataController.ts");




var router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
var dataController = new _controllers_dataController__WEBPACK_IMPORTED_MODULE_3__["DataController"]();
router.get('/:entity', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin', 'admin', 'user', 'guest'])], dataController.get);
router.post('/:entity', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin', 'admin', 'user', 'guest'])], dataController.create.bind(dataController));
router.patch('/:entity/:id', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin', 'admin', 'user'])], dataController.update.bind(dataController));
router.put('/:entity/:id', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin', 'admin', 'user'])], dataController.update.bind(dataController));
router.put('/:entity', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin', 'admin', 'user'])], dataController.update.bind(dataController));
router.delete('/:entity/:id', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin', 'admin', 'user'])], dataController.delete.bind(dataController));
router.delete('/:entity', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin', 'admin', 'user'])], dataController.delete.bind(dataController));
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),

/***/ "./apps/dakimbo-server/src/routes/index.ts":
/*!*************************************************!*\
  !*** ./apps/dakimbo-server/src/routes/index.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _authRoute__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authRoute */ "./apps/dakimbo-server/src/routes/authRoute.ts");
/* harmony import */ var _dataRoute__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataRoute */ "./apps/dakimbo-server/src/routes/dataRoute.ts");
/* harmony import */ var _mediaRoute__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mediaRoute */ "./apps/dakimbo-server/src/routes/mediaRoute.ts");
/* harmony import */ var _metaRoute__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./metaRoute */ "./apps/dakimbo-server/src/routes/metaRoute.ts");
/* harmony import */ var _metricsRoute__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./metricsRoute */ "./apps/dakimbo-server/src/routes/metricsRoute.ts");
/* harmony import */ var _userRoute__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./userRoute */ "./apps/dakimbo-server/src/routes/userRoute.ts");







var routes = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
routes.use('/auth', _authRoute__WEBPACK_IMPORTED_MODULE_1__["default"]);
routes.use('/user', _userRoute__WEBPACK_IMPORTED_MODULE_6__["default"]);
routes.use('/data', _dataRoute__WEBPACK_IMPORTED_MODULE_2__["default"]);
routes.use('/meta', _metaRoute__WEBPACK_IMPORTED_MODULE_4__["default"]);
routes.use('/metrics', _metricsRoute__WEBPACK_IMPORTED_MODULE_5__["default"]);
routes.use('/media', _mediaRoute__WEBPACK_IMPORTED_MODULE_3__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (routes);


/***/ }),

/***/ "./apps/dakimbo-server/src/routes/mediaRoute.ts":
/*!******************************************************!*\
  !*** ./apps/dakimbo-server/src/routes/mediaRoute.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_mediaController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/mediaController */ "./apps/dakimbo-server/src/controllers/mediaController.ts");
/* harmony import */ var _middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../middlewares/checkJwt */ "./apps/dakimbo-server/src/middlewares/checkJwt.ts");



var router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
var mediaController = new _controllers_mediaController__WEBPACK_IMPORTED_MODULE_1__["MediaController"]();
// Upload Media
router.post('/', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__["checkJwt"]], mediaController.uploadMedia.bind(mediaController));
router.post('/:entity', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__["checkJwt"]], mediaController.uploadMedia.bind(mediaController));
router.post('/:entity/:id', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__["checkJwt"]], mediaController.uploadMedia.bind(mediaController));
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),

/***/ "./apps/dakimbo-server/src/routes/metaRoute.ts":
/*!*****************************************************!*\
  !*** ./apps/dakimbo-server/src/routes/metaRoute.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_metaController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/metaController */ "./apps/dakimbo-server/src/controllers/metaController.ts");
/* harmony import */ var _middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../middlewares/checkJwt */ "./apps/dakimbo-server/src/middlewares/checkJwt.ts");
/* harmony import */ var _middlewares_checkRole__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../middlewares/checkRole */ "./apps/dakimbo-server/src/middlewares/checkRole.ts");




var router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
var metaController = new _controllers_metaController__WEBPACK_IMPORTED_MODULE_1__["MetaController"]();
router.get('/', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_3__["checkRole"])(['superadmin'])], metaController.getAllEntitiesMetadata.bind(metaController));
// Get Metadata for entity
router.get('/:entity', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_3__["checkRole"])(['superadmin'])], metaController.getEntityMetadata.bind(metaController));
router.get('/values/unique/:entity/:prop', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_3__["checkRole"])(['superadmin', 'admin', 'user'])], metaController.getUniqueValuesForPropInEntity.bind(metaController));
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),

/***/ "./apps/dakimbo-server/src/routes/metricsRoute.ts":
/*!********************************************************!*\
  !*** ./apps/dakimbo-server/src/routes/metricsRoute.ts ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../middlewares/checkJwt */ "./apps/dakimbo-server/src/middlewares/checkJwt.ts");
/* harmony import */ var _middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../middlewares/checkRole */ "./apps/dakimbo-server/src/middlewares/checkRole.ts");
/* harmony import */ var _controllers_metricsController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controllers/metricsController */ "./apps/dakimbo-server/src/controllers/metricsController.ts");




var router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
var metricsController = new _controllers_metricsController__WEBPACK_IMPORTED_MODULE_3__["MetricsController"]();
// Get specific metric
router.get('/:metricName', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin'])], metricsController.getMetricsFor.bind(metricsController));
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),

/***/ "./apps/dakimbo-server/src/routes/userRoute.ts":
/*!*****************************************************!*\
  !*** ./apps/dakimbo-server/src/routes/userRoute.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_userController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/userController */ "./apps/dakimbo-server/src/controllers/userController.ts");
/* harmony import */ var _middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../middlewares/checkJwt */ "./apps/dakimbo-server/src/middlewares/checkJwt.ts");
/* harmony import */ var _middlewares_checkRole__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../middlewares/checkRole */ "./apps/dakimbo-server/src/middlewares/checkRole.ts");




var router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
var userController = new _controllers_userController__WEBPACK_IMPORTED_MODULE_1__["UserController"]();
//Get all users
router.get('/', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_3__["checkRole"])(['admin', 'superadmin'])], userController.listAll.bind(userController));
// Get one user
router.get('/:id', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_3__["checkRole"])(['admin', 'superadmin'])], userController.getOneById.bind(userController));
//Create a new user
router.post('/', userController.newUser.bind(userController));
//Edit one user
router.patch('/:id', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_3__["checkRole"])(['superadmin'])], userController.editUser.bind(userController));
//Delete one user
router.delete('/:id', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_3__["checkRole"])(['superadmin'])], userController.deleteUser.bind(userController));
// Current User
router.get('/me', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__["checkJwt"]], userController.getCurrentUser);
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),

/***/ "./apps/dakimbo-server/src/utilities/logStamp.ts":
/*!*******************************************************!*\
  !*** ./apps/dakimbo-server/src/utilities/logStamp.ts ***!
  \*******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-fns */ "date-fns");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(date_fns__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chalk */ "chalk");
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(chalk__WEBPACK_IMPORTED_MODULE_1__);


var log = console.log;
console.log = function () {
    var firstParameter = arguments[0];
    var otherParameters = Array.prototype.slice.call(arguments, 1);
    log.apply(console, [(dateFormat() + " " + firstParameter).concat(otherParameters)]);
};
var error = console.error;
console.error = function () {
    var firstParameter = arguments[0];
    var otherParameters = Array.prototype.slice.call(arguments, 1);
    error.apply(console, [(dateFormat() + " " + firstParameter).concat(otherParameters)]);
};
var dateFormat = function () {
    return "[" + chalk__WEBPACK_IMPORTED_MODULE_1___default.a.cyan(Object(date_fns__WEBPACK_IMPORTED_MODULE_0__["format"])(new Date(), "yyyy-MM-dd HH:mm:ss")) + "]";
};


/***/ }),

/***/ "./libs/entities/_common/picture.ts":
/*!******************************************!*\
  !*** ./libs/entities/_common/picture.ts ***!
  \******************************************/
/*! exports provided: Picture */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Picture", function() { return Picture; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base */ "./libs/entities/base.ts");
/* harmony import */ var _kid_money_kid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../kid-money/kid */ "./libs/entities/kid-money/kid.ts");
/* harmony import */ var _kid_money_km_transaction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../kid-money/km-transaction */ "./libs/entities/kid-money/km-transaction.ts");





var Picture = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Picture, _super);
    function Picture() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Picture.preProcess = function (entity, dbConnection) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                if (entity.name) {
                    entity.extension = entity.name.split('.')[1];
                }
                console.log(entity.file);
                return [2 /*return*/];
            });
        });
    };
    var _a, _b, _c;
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], Picture.prototype, "path", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], Picture.prototype, "name", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], Picture.prototype, "extension", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
    ], Picture.prototype, "lastModifiedDate", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
    ], Picture.prototype, "size", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["ManyToOne"])(function (type) { return _kid_money_kid__WEBPACK_IMPORTED_MODULE_3__["Kid"]; }, function (kid) { return kid.pictures; }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_b = typeof _kid_money_kid__WEBPACK_IMPORTED_MODULE_3__["Kid"] !== "undefined" && _kid_money_kid__WEBPACK_IMPORTED_MODULE_3__["Kid"]) === "function" ? _b : Object)
    ], Picture.prototype, "kid", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["ManyToOne"])(function (type) { return _kid_money_km_transaction__WEBPACK_IMPORTED_MODULE_4__["KMTransaction"]; }, function (kmTransaction) { return kmTransaction.pictures; }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_c = typeof _kid_money_km_transaction__WEBPACK_IMPORTED_MODULE_4__["KMTransaction"] !== "undefined" && _kid_money_km_transaction__WEBPACK_IMPORTED_MODULE_4__["KMTransaction"]) === "function" ? _c : Object)
    ], Picture.prototype, "kmTransaction", void 0);
    Picture = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Entity"])()
    ], Picture);
    return Picture;
}(_base__WEBPACK_IMPORTED_MODULE_2__["BaseModel"]));



/***/ }),

/***/ "./libs/entities/_entity-map.ts":
/*!**************************************!*\
  !*** ./libs/entities/_entity-map.ts ***!
  \**************************************/
/*! exports provided: entityMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "entityMap", function() { return entityMap; });
/* harmony import */ var _common_picture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_common/picture */ "./libs/entities/_common/picture.ts");
/* harmony import */ var _metrics_metric_page_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_metrics/metric-page-view */ "./libs/entities/_metrics/metric-page-view.ts");
/* harmony import */ var _metrics_metric_page_visit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_metrics/metric-page-visit */ "./libs/entities/_metrics/metric-page-visit.ts");
/* harmony import */ var _auth_auth_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth/auth-action */ "./libs/entities/auth/auth-action.ts");
/* harmony import */ var _auth_auth_entity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth/auth-entity */ "./libs/entities/auth/auth-entity.ts");
/* harmony import */ var _auth_auth_role__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth/auth-role */ "./libs/entities/auth/auth-role.ts");
/* harmony import */ var _auth_auth_role_permission__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./auth/auth-role-permission */ "./libs/entities/auth/auth-role-permission.ts");
/* harmony import */ var _auth_user__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./auth/user */ "./libs/entities/auth/user.ts");
/* harmony import */ var _kid_money_kid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./kid-money/kid */ "./libs/entities/kid-money/kid.ts");
/* harmony import */ var _kid_money_km_transaction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./kid-money/km-transaction */ "./libs/entities/kid-money/km-transaction.ts");










var entityMap = {
    // AUTH
    User: _auth_user__WEBPACK_IMPORTED_MODULE_7__["User"],
    AuthRole: _auth_auth_role__WEBPACK_IMPORTED_MODULE_5__["AuthRole"],
    AuthAction: _auth_auth_action__WEBPACK_IMPORTED_MODULE_3__["AuthAction"],
    AuthEntity: _auth_auth_entity__WEBPACK_IMPORTED_MODULE_4__["AuthEntity"],
    AuthRolePermission: _auth_auth_role_permission__WEBPACK_IMPORTED_MODULE_6__["AuthRolePermission"],
    // METRICS
    MetricPageView: _metrics_metric_page_view__WEBPACK_IMPORTED_MODULE_1__["MetricPageView"],
    MetricPageVisit: _metrics_metric_page_visit__WEBPACK_IMPORTED_MODULE_2__["MetricPageVisit"],
    // COMMON
    Picture: _common_picture__WEBPACK_IMPORTED_MODULE_0__["Picture"],
    // KID MONEY
    Kid: _kid_money_kid__WEBPACK_IMPORTED_MODULE_8__["Kid"],
    KMTransaction: _kid_money_km_transaction__WEBPACK_IMPORTED_MODULE_9__["KMTransaction"]
};


/***/ }),

/***/ "./libs/entities/_metrics/metric-page-view.ts":
/*!****************************************************!*\
  !*** ./libs/entities/_metrics/metric-page-view.ts ***!
  \****************************************************/
/*! exports provided: MetricPageView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetricPageView", function() { return MetricPageView; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base */ "./libs/entities/base.ts");



var MetricPageView = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(MetricPageView, _super);
    function MetricPageView(props) {
        return _super.call(this, props) || this;
    }
    MetricPageView.displayName = 'MetricPageView';
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], MetricPageView.prototype, "pageName", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true, default: 1 }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
    ], MetricPageView.prototype, "viewCount", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], MetricPageView.prototype, "appName", void 0);
    MetricPageView = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Entity"])({
            name: '__metric_page_view',
            orderBy: {
                pageName: 'ASC'
            }
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [MetricPageView])
    ], MetricPageView);
    return MetricPageView;
}(_base__WEBPACK_IMPORTED_MODULE_2__["BaseModel"]));



/***/ }),

/***/ "./libs/entities/_metrics/metric-page-visit.ts":
/*!*****************************************************!*\
  !*** ./libs/entities/_metrics/metric-page-visit.ts ***!
  \*****************************************************/
/*! exports provided: MetricPageVisit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetricPageVisit", function() { return MetricPageVisit; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base */ "./libs/entities/base.ts");
/* harmony import */ var _apps_dakimbo_server_src_database_database__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../../apps/dakimbo-server/src/database/database */ "./apps/dakimbo-server/src/database/database.ts");




var MetricPageVisit = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(MetricPageVisit, _super);
    function MetricPageVisit(props) {
        return _super.call(this, props) || this;
    }
    MetricPageVisit.preProcess = function (entity) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var repo, existingPageViewMetric;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repo = _apps_dakimbo_server_src_database_database__WEBPACK_IMPORTED_MODULE_3__["Database"]._connection.getRepository('MetricPageView');
                        return [4 /*yield*/, repo.findOne({
                                where: { appName: entity.appName, pageName: entity.pageName }
                            })];
                    case 1:
                        existingPageViewMetric = _a.sent();
                        if (!!existingPageViewMetric) return [3 /*break*/, 3];
                        return [4 /*yield*/, repo.save({
                                pageName: entity.pageName,
                                appName: entity.appName,
                                viewCount: 1
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        existingPageViewMetric.viewCount++;
                        return [4 /*yield*/, repo.save(existingPageViewMetric)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MetricPageVisit.displayName = 'MetricPageVisit';
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], MetricPageVisit.prototype, "pageName", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], MetricPageVisit.prototype, "appName", void 0);
    MetricPageVisit = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Entity"])({
            name: '__metric_page_visit',
            orderBy: {
                createDate: 'DESC'
            }
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [MetricPageVisit])
    ], MetricPageVisit);
    return MetricPageVisit;
}(_base__WEBPACK_IMPORTED_MODULE_2__["BaseModel"]));



/***/ }),

/***/ "./libs/entities/auth/auth-action.ts":
/*!*******************************************!*\
  !*** ./libs/entities/auth/auth-action.ts ***!
  \*******************************************/
/*! exports provided: AuthAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthAction", function() { return AuthAction; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base */ "./libs/entities/base.ts");
/* harmony import */ var _auth_role_permission__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth-role-permission */ "./libs/entities/auth/auth-role-permission.ts");




var AuthAction = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(AuthAction, _super);
    function AuthAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AuthAction.displayName = 'AuthAction';
    AuthAction.repoType = 'tree';
    AuthAction.allowedRoles = ['superadmin'];
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], AuthAction.prototype, "action", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], AuthAction.prototype, "type", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], AuthAction.prototype, "application", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true, default: false }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
    ], AuthAction.prototype, "isFolder", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["OneToMany"])(function (type) { return _auth_role_permission__WEBPACK_IMPORTED_MODULE_3__["AuthRolePermission"]; }, function (authRolePermission) { return authRolePermission.action; }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Array)
    ], AuthAction.prototype, "authRolePermissions", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["TreeChildren"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Array)
    ], AuthAction.prototype, "children", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["TreeParent"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", AuthAction)
    ], AuthAction.prototype, "parent", void 0);
    AuthAction = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Entity"])({
            name: 'auth_action',
            orderBy: {
                action: 'ASC'
            }
        }),
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Tree"])('nested-set')
    ], AuthAction);
    return AuthAction;
}(_base__WEBPACK_IMPORTED_MODULE_2__["BaseModel"]));



/***/ }),

/***/ "./libs/entities/auth/auth-entity.ts":
/*!*******************************************!*\
  !*** ./libs/entities/auth/auth-entity.ts ***!
  \*******************************************/
/*! exports provided: AuthEntity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthEntity", function() { return AuthEntity; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base */ "./libs/entities/base.ts");
/* harmony import */ var _auth_role_permission__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth-role-permission */ "./libs/entities/auth/auth-role-permission.ts");




var AuthEntity = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(AuthEntity, _super);
    function AuthEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AuthEntity.displayName = 'AuthAction';
    AuthEntity.allowedRoles = ['superadmin'];
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], AuthEntity.prototype, "entity", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], AuthEntity.prototype, "type", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], AuthEntity.prototype, "application", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["OneToMany"])(function (type) { return _auth_role_permission__WEBPACK_IMPORTED_MODULE_3__["AuthRolePermission"]; }, function (authRolePermission) { return authRolePermission.entity; }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Array)
    ], AuthEntity.prototype, "authRolePermissions", void 0);
    AuthEntity = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Entity"])({
            name: 'auth_entity',
            orderBy: {
                action: 'ASC'
            }
        })
    ], AuthEntity);
    return AuthEntity;
}(_base__WEBPACK_IMPORTED_MODULE_2__["BaseModel"]));



/***/ }),

/***/ "./libs/entities/auth/auth-role-permission.ts":
/*!****************************************************!*\
  !*** ./libs/entities/auth/auth-role-permission.ts ***!
  \****************************************************/
/*! exports provided: AuthRolePermission */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthRolePermission", function() { return AuthRolePermission; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base */ "./libs/entities/base.ts");
/* harmony import */ var _auth_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth-action */ "./libs/entities/auth/auth-action.ts");
/* harmony import */ var _auth_entity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth-entity */ "./libs/entities/auth/auth-entity.ts");
/* harmony import */ var _auth_role__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth-role */ "./libs/entities/auth/auth-role.ts");






var AuthRolePermission = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(AuthRolePermission, _super);
    function AuthRolePermission() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var _a, _b, _c;
    AuthRolePermission.displayName = 'AuthRoleAction';
    AuthRolePermission.allowedRoles = ['superadmin'];
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true, default: false }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
    ], AuthRolePermission.prototype, "allowed", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true, default: false }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
    ], AuthRolePermission.prototype, "canCreate", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true, default: false }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
    ], AuthRolePermission.prototype, "canRead", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true, default: false }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
    ], AuthRolePermission.prototype, "canUpdate", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true, default: false }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
    ], AuthRolePermission.prototype, "canDelete", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["ManyToOne"])(function (type) { return _auth_action__WEBPACK_IMPORTED_MODULE_3__["AuthAction"]; }, function (authAction) { return authAction.authRolePermissions; }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_a = typeof _auth_action__WEBPACK_IMPORTED_MODULE_3__["AuthAction"] !== "undefined" && _auth_action__WEBPACK_IMPORTED_MODULE_3__["AuthAction"]) === "function" ? _a : Object)
    ], AuthRolePermission.prototype, "action", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["ManyToOne"])(function (type) { return _auth_entity__WEBPACK_IMPORTED_MODULE_4__["AuthEntity"]; }, function (authEntity) { return authEntity.authRolePermissions; }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_b = typeof _auth_entity__WEBPACK_IMPORTED_MODULE_4__["AuthEntity"] !== "undefined" && _auth_entity__WEBPACK_IMPORTED_MODULE_4__["AuthEntity"]) === "function" ? _b : Object)
    ], AuthRolePermission.prototype, "entity", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["ManyToOne"])(function (type) { return _auth_role__WEBPACK_IMPORTED_MODULE_5__["AuthRole"]; }, function (authRole) { return authRole.authRolePermissions; }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_c = typeof _auth_role__WEBPACK_IMPORTED_MODULE_5__["AuthRole"] !== "undefined" && _auth_role__WEBPACK_IMPORTED_MODULE_5__["AuthRole"]) === "function" ? _c : Object)
    ], AuthRolePermission.prototype, "role", void 0);
    AuthRolePermission = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Entity"])({
            name: 'auth_role_permission'
        })
    ], AuthRolePermission);
    return AuthRolePermission;
}(_base__WEBPACK_IMPORTED_MODULE_2__["BaseModel"]));



/***/ }),

/***/ "./libs/entities/auth/auth-role.ts":
/*!*****************************************!*\
  !*** ./libs/entities/auth/auth-role.ts ***!
  \*****************************************/
/*! exports provided: AuthRole */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthRole", function() { return AuthRole; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base */ "./libs/entities/base.ts");
/* harmony import */ var _auth_role_permission__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth-role-permission */ "./libs/entities/auth/auth-role-permission.ts");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user */ "./libs/entities/auth/user.ts");





var AuthRole = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(AuthRole, _super);
    function AuthRole() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AuthRole.displayName = 'AuthRole';
    AuthRole.allowedRoles = ['superadmin'];
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], AuthRole.prototype, "role", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], AuthRole.prototype, "type", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["OneToMany"])(function (type) { return _auth_role_permission__WEBPACK_IMPORTED_MODULE_3__["AuthRolePermission"]; }, function (authRolePermission) { return authRolePermission.role; }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Array)
    ], AuthRole.prototype, "authRolePermissions", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["ManyToMany"])(function (type) { return _user__WEBPACK_IMPORTED_MODULE_4__["User"]; }, function (user) { return user.roles; }, {
            onDelete: 'SET NULL'
        }),
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["JoinTable"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Array)
    ], AuthRole.prototype, "users", void 0);
    AuthRole = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Entity"])({
            name: 'auth_role',
            orderBy: {
                role: 'ASC'
            }
        }),
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Unique"])(['role'])
    ], AuthRole);
    return AuthRole;
}(_base__WEBPACK_IMPORTED_MODULE_2__["BaseModel"]));



/***/ }),

/***/ "./libs/entities/auth/user.ts":
/*!************************************!*\
  !*** ./libs/entities/auth/user.ts ***!
  \************************************/
/*! exports provided: User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base */ "./libs/entities/base.ts");
/* harmony import */ var _auth_role__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth-role */ "./libs/entities/auth/auth-role.ts");




var User = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(User, _super);
    function User(props) {
        return _super.call(this, props) || this;
    }
    var _a;
    User.displayName = 'User';
    User.relationships = [{ model: _auth_role__WEBPACK_IMPORTED_MODULE_3__["AuthRole"], name: 'roles' }];
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], User.prototype, "username", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], User.prototype, "password", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({
            nullable: true,
            length: 255
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], User.prototype, "email", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({
            nullable: true,
            default: 0
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
    ], User.prototype, "numSuccessfulLogin", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({
            nullable: true,
            default: 0
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
    ], User.prototype, "numFailedLogin", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
    ], User.prototype, "lastLoggedInDate", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ default: false }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
    ], User.prototype, "isLocked", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["ManyToMany"])(function (type) { return _auth_role__WEBPACK_IMPORTED_MODULE_3__["AuthRole"]; }, function (role) { return role.users; }, { eager: true, cascade: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Array)
    ], User.prototype, "roles", void 0);
    User = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Entity"])({
            name: 'auth_user',
            orderBy: {
                username: 'ASC'
            }
        }),
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Unique"])(['username']),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [User])
    ], User);
    return User;
}(_base__WEBPACK_IMPORTED_MODULE_2__["BaseModel"]));



/***/ }),

/***/ "./libs/entities/base.ts":
/*!*******************************!*\
  !*** ./libs/entities/base.ts ***!
  \*******************************/
/*! exports provided: BaseModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseModel", function() { return BaseModel; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_1__);


var BaseModel = /** @class */ (function () {
    function BaseModel(props) {
        var _this = this;
        if (!props)
            return;
        Object.keys(props).forEach(function (prop) {
            var value = props[prop];
            _this[prop] = value;
        });
    }
    var _a, _b;
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["PrimaryGeneratedColumn"])('uuid'),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], BaseModel.prototype, "id", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["VersionColumn"])({
            nullable: true
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], BaseModel.prototype, "version", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["CreateDateColumn"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
    ], BaseModel.prototype, "createDate", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["UpdateDateColumn"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
    ], BaseModel.prototype, "modifyDate", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({
            nullable: true
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], BaseModel.prototype, "createUser", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({
            nullable: true
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], BaseModel.prototype, "modifyUser", void 0);
    return BaseModel;
}());



/***/ }),

/***/ "./libs/entities/entity-utilities.ts":
/*!*******************************************!*\
  !*** ./libs/entities/entity-utilities.ts ***!
  \*******************************************/
/*! exports provided: ignoreProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ignoreProps", function() { return ignoreProps; });
var ignoreProps = [
    'id',
    'version',
    'createDate',
    'modifyDate',
    'createUser',
    'modifyUser',
    'displayName',
    'repoType',
    'allowedRoles',
    'relationships',
    'loadAfterSave',
    '_tempId'
];


/***/ }),

/***/ "./libs/entities/kid-money/kid.ts":
/*!****************************************!*\
  !*** ./libs/entities/kid-money/kid.ts ***!
  \****************************************/
/*! exports provided: Kid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Kid", function() { return Kid; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_picture__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_common/picture */ "./libs/entities/_common/picture.ts");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base */ "./libs/entities/base.ts");
/* harmony import */ var _km_transaction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./km-transaction */ "./libs/entities/kid-money/km-transaction.ts");





var Kid = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Kid, _super);
    function Kid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Kid_1 = Kid;
    Kid.preProcess = function (entity, dbConnection) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var nameSplit, i;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                if (entity.firstName || entity.middleName || entity.lastName) {
                    entity.fullName = Kid_1.getKidFullName(entity);
                }
                else if (entity.fullName) {
                    nameSplit = entity.name.split(' ');
                    entity.firstName = nameSplit[0];
                    if (nameSplit.length > 2) {
                        entity.middleName = nameSplit[1];
                        for (i = 2; i < nameSplit.length; i++) {
                            entity.lastName += nameSplit[i];
                        }
                    }
                    else {
                        entity.lastName = nameSplit[1];
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    Kid.getKidFullName = function (kid) {
        return "" + (kid.firstName || '') + (kid.firstName ? ' ' : '') + (kid.middleName || '') + (kid.middleName ? ' ' : '') + (kid.lastName || '');
    };
    var Kid_1, _a;
    Kid.displayName = 'Kid';
    Kid.relationships = [
        { model: _km_transaction__WEBPACK_IMPORTED_MODULE_4__["KMTransaction"], name: 'transactions' },
        { model: _common_picture__WEBPACK_IMPORTED_MODULE_2__["Picture"], name: 'pictures' }
    ];
    Kid.fieldConfig = [
        { key: 'firstName' },
        { key: 'middleName' },
        { key: 'lastName' },
        { key: 'birthday', type: 'date' },
        { key: 'gender' },
        { key: 'notes', label: 'Notes', type: 'textarea' },
        { key: 'money' },
    ];
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], Kid.prototype, "firstName", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], Kid.prototype, "lastName", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], Kid.prototype, "middleName", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], Kid.prototype, "fullName", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
    ], Kid.prototype, "birthday", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], Kid.prototype, "gender", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], Kid.prototype, "notes", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true, type: 'float4' }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
    ], Kid.prototype, "money", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["OneToMany"])(function (type) { return _km_transaction__WEBPACK_IMPORTED_MODULE_4__["KMTransaction"]; }, function (kmTransaction) { return kmTransaction.kid; }, { cascade: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Array)
    ], Kid.prototype, "transactions", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["OneToMany"])(function (type) { return _common_picture__WEBPACK_IMPORTED_MODULE_2__["Picture"]; }, function (picture) { return picture.kid; }, { eager: true, cascade: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Array)
    ], Kid.prototype, "pictures", void 0);
    Kid = Kid_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Entity"])()
    ], Kid);
    return Kid;
}(_base__WEBPACK_IMPORTED_MODULE_3__["BaseModel"]));



/***/ }),

/***/ "./libs/entities/kid-money/km-transaction.ts":
/*!***************************************************!*\
  !*** ./libs/entities/kid-money/km-transaction.ts ***!
  \***************************************************/
/*! exports provided: KMTransaction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KMTransaction", function() { return KMTransaction; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base */ "./libs/entities/base.ts");
/* harmony import */ var _common_picture__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../_common/picture */ "./libs/entities/_common/picture.ts");
/* harmony import */ var _kid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./kid */ "./libs/entities/kid-money/kid.ts");





var KMTransaction = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(KMTransaction, _super);
    function KMTransaction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var _a, _b;
    KMTransaction.displayName = 'KMTransaction';
    // OTHER
    KMTransaction.fieldConfig = [
        { key: 'name', label: 'Transaction Name', type: 'input' },
        { key: 'transactionDate', label: 'Date of Transaction', type: 'date' },
        { key: 'cost', label: 'Cost', type: 'input' },
        { key: 'income', label: 'Income', type: 'input' },
        { key: 'type', label: 'Type', type: 'input' }
        // { key: 'pictures', type: 'array' }
    ];
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], KMTransaction.prototype, "name", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], KMTransaction.prototype, "type", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
    ], KMTransaction.prototype, "income", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
    ], KMTransaction.prototype, "cost", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
    ], KMTransaction.prototype, "previousAmount", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
    ], KMTransaction.prototype, "newAmount", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Column"])({ nullable: true }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
    ], KMTransaction.prototype, "transactionDate", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["OneToMany"])(function (type) { return _common_picture__WEBPACK_IMPORTED_MODULE_3__["Picture"]; }, function (picture) { return picture.kmTransaction; }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Array)
    ], KMTransaction.prototype, "pictures", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["ManyToOne"])(function (type) { return _kid__WEBPACK_IMPORTED_MODULE_4__["Kid"]; }, function (kid) { return kid.transactions; }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_b = typeof _kid__WEBPACK_IMPORTED_MODULE_4__["Kid"] !== "undefined" && _kid__WEBPACK_IMPORTED_MODULE_4__["Kid"]) === "function" ? _b : Object)
    ], KMTransaction.prototype, "kid", void 0);
    KMTransaction = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Entity"])()
    ], KMTransaction);
    return KMTransaction;
}(_base__WEBPACK_IMPORTED_MODULE_2__["BaseModel"]));



/***/ }),

/***/ "./libs/utilities/src/lib/auth/checkModelAllowedRoles.ts":
/*!***************************************************************!*\
  !*** ./libs/utilities/src/lib/auth/checkModelAllowedRoles.ts ***!
  \***************************************************************/
/*! exports provided: checkModelAllowedRoles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkModelAllowedRoles", function() { return checkModelAllowedRoles; });
/* harmony import */ var _checkUserRole__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkUserRole */ "./libs/utilities/src/lib/auth/checkUserRole.ts");

var checkModelAllowedRoles = function (model, userJwt) {
    if (model.allowedRoles && model.allowedRoles.length) {
        return Object(_checkUserRole__WEBPACK_IMPORTED_MODULE_0__["checkUserRole"])(userJwt, model.allowedRoles);
    }
    else {
        return true;
    }
};


/***/ }),

/***/ "./libs/utilities/src/lib/auth/checkUserRole.ts":
/*!******************************************************!*\
  !*** ./libs/utilities/src/lib/auth/checkUserRole.ts ***!
  \******************************************************/
/*! exports provided: checkUserRole */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkUserRole", function() { return checkUserRole; });
var checkUserRole = function (user, expectedRoles) {
    if (!user || !expectedRoles)
        return true;
    var expectedRolesLower = expectedRoles.map(function (er) {
        return er.toLowerCase().trim().split(' ').join('');
    });
    var userRolesLower = (user.roles || []).map(function (r) {
        return r.role.toLowerCase().trim().split(' ').join('');
    });
    return (expectedRoles.includes('*') || userRolesLower.some(function (r) { return expectedRolesLower.includes(r); }));
};


/***/ }),

/***/ "./libs/utilities/src/lib/utilities/arrays/getUniqueValues.ts":
/*!********************************************************************!*\
  !*** ./libs/utilities/src/lib/utilities/arrays/getUniqueValues.ts ***!
  \********************************************************************/
/*! exports provided: getUniqueValues */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUniqueValues", function() { return getUniqueValues; });
var getUniqueValues = function (array, prop) {
    return Array.from(new Set(array.map(function (item) { return item[prop]; }))).sort();
};


/***/ }),

/***/ 0:
/*!***********************************************!*\
  !*** multi ./apps/dakimbo-server/src/main.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! S:\Programming\Projects\gilly\apps\dakimbo-server\src\main.ts */"./apps/dakimbo-server/src/main.ts");


/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bcryptjs");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "chalk":
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "date-fns":
/*!***************************!*\
  !*** external "date-fns" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("date-fns");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-fileupload":
/*!*************************************!*\
  !*** external "express-fileupload" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-fileupload");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "generate-password":
/*!************************************!*\
  !*** external "generate-password" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("generate-password");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),

/***/ "http-proxy-middleware":
/*!****************************************!*\
  !*** external "http-proxy-middleware" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http-proxy-middleware");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mkdirp":
/*!*************************!*\
  !*** external "mkdirp" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mkdirp");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "reflect-metadata":
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("typeorm");

/***/ })

/******/ })));
//# sourceMappingURL=main.js.map