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
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @entities */ "./libs/entities/_entity-map.ts");

var isProd = process.env.IS_PROD === 'true';
var pathToEntities = isProd ? './database/entities/**/*.js' : './database/entities/**/*.ts';
var pathToMigrations = isProd ? './database/migrations/**/*.js' : './database/migrations/**/*.ts';
/* harmony default export */ __webpack_exports__["default"] = ({
    isProd: isProd,
    httpsOpts: {
    // Server SSL private key and certificate
    // key: fs.readFileSync(__dirname + '/security/dev-cert.key'),
    // cert: fs.readFileSync(__dirname + '/security/dev-cert.pem'),
    // issuer/CA certificate against which the client certificate will be
    // validated. A certificate that is not signed by a provided CA will be
    // rejected at the protocol layer.
    // ca: fs.readFileSync(__dirname + '/config/certs/ca-cert.pem'),
    // request a certificate, but don't necessarily reject connections from
    // clients providing an untrusted or no certificate. This lets us protect only
    // certain routes, or send a helpful error message to unauthenticated clients.
    // requestCert: true,
    // rejectUnauthorized: true,
    },
    dbOptions: {
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE || 'dakimbo-server',
        synchronize: true,
        logging: isProd ? false : false,
        entities: Object.values(_entities__WEBPACK_IMPORTED_MODULE_0__["entityMap"])
        // entities: [path.join(__dirname, pathToEntities)],
        // migrations: [path.join(__dirname, pathToMigrations)],
        // migrationsDir: 'migration'
    },
    jwtSecret: process.env.JWT_SECRET || 'CHANGE_ME'
});


/***/ }),

/***/ "./apps/dakimbo-server/src/controllers/authController.ts":
/*!***************************************************************!*\
  !*** ./apps/dakimbo-server/src/controllers/authController.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @entities */ "./libs/entities/_entity-map.ts");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config */ "./apps/dakimbo-server/src/config.ts");
/* harmony import */ var _userController__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./userController */ "./apps/dakimbo-server/src/controllers/userController.ts");






var loginAttempts = 3;
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.login = function (req, res) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
        var _a, username, email, password, userRepository, user, error_1, attemptsRemaining, attemptsRemaining, token;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                    if (!((username || email) && password)) {
                        res.status(400).send("You didn't enter a username or password...");
                        console.log("LOGIN: Username or Password not found; failed to log in!");
                        return [2 /*return*/];
                    }
                    userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["getRepository"])(_entities__WEBPACK_IMPORTED_MODULE_1__["User"]);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail({ where: [{ username: username }, { email: email }] })];
                case 2:
                    user = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    res.status(401).send('Account was not found, please check your username / e-mail and try again.');
                    console.log("LOGIN: User " + username + " not found; failed to log in!");
                    return [2 /*return*/];
                case 4:
                    if (!(user.numFailedLogin >= loginAttempts || user.isLocked)) return [3 /*break*/, 6];
                    attemptsRemaining = loginAttempts - user.numFailedLogin;
                    user.isLocked = user.isLocked || attemptsRemaining <= 0;
                    return [4 /*yield*/, userRepository.save(user)];
                case 5:
                    _b.sent(); // increment num failed login counter
                    res.status(401).send('Account is locked; please contact an administrator!');
                    console.log("LOGIN: User " + username + " has a locked account.");
                    return [2 /*return*/];
                case 6:
                    if (!!_userController__WEBPACK_IMPORTED_MODULE_5__["default"].checkIfUnencryptedPasswordIsValid(password, user)) return [3 /*break*/, 8];
                    user.numFailedLogin++;
                    attemptsRemaining = loginAttempts - user.numFailedLogin;
                    user.isLocked = user.isLocked || attemptsRemaining <= 0;
                    return [4 /*yield*/, userRepository.save(user)];
                case 7:
                    _b.sent(); // increment num failed login counter
                    res.status(401).send("You entered a wrong username, e-mail or password. " + (attemptsRemaining > 0
                        ? attemptsRemaining + ' login attempts remaining before account is locked!'
                        : 'Account is now LOCKED!') + " ");
                    console.log("LOGIN: User " + user.username + " wrong password; failed to log in!");
                    return [2 /*return*/];
                case 8:
                    token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__["sign"]({
                        userId: user.id,
                        username: user.username,
                        roles: user.roles.map(function (r) {
                            return { role: r.role };
                        })
                    }, _config__WEBPACK_IMPORTED_MODULE_4__["default"].jwtSecret, {
                        expiresIn: '1h'
                    });
                    // Delete user pass
                    delete user.password;
                    console.log("LOGIN: User " + user.username + " successfully logged in!");
                    user.numSuccessfulLogin++;
                    user.numFailedLogin = 0;
                    user.lastLoggedInDate = new Date();
                    return [4 /*yield*/, userRepository.save(user)];
                case 9:
                    _b.sent(); // increment num successful login counter
                    //Send the jwt in the response
                    res.send(Object.assign({ jwt: token }, user));
                    return [2 /*return*/];
            }
        });
    }); };
    AuthController.changePassword = function (req, res) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
        var id, _a, oldPassword, newPassword, userRepository, user, id_1;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = res.locals.jwtPayload.userId;
                    _a = req.body, oldPassword = _a.oldPassword, newPassword = _a.newPassword;
                    if (!(oldPassword && newPassword)) {
                        res.status(400).send();
                    }
                    userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["getRepository"])(_entities__WEBPACK_IMPORTED_MODULE_1__["User"]);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail(id)];
                case 2:
                    user = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    id_1 = _b.sent();
                    res.status(401).send();
                    return [3 /*break*/, 4];
                case 4:
                    //Check if old password matches
                    if (!_userController__WEBPACK_IMPORTED_MODULE_5__["default"].checkIfUnencryptedPasswordIsValid(oldPassword, user)) {
                        res.status(401).send();
                        return [2 /*return*/];
                    }
                    //Validate the model (password length)
                    try {
                        user.password = newPassword;
                        //Hash the new password and save
                        _userController__WEBPACK_IMPORTED_MODULE_5__["default"].hashPassword(user);
                        userRepository.save(user);
                        res.status(204).send();
                    }
                    catch (e) {
                        res.status(400).send(e);
                        return [2 /*return*/];
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return AuthController;
}());
/* harmony default export */ __webpack_exports__["default"] = (AuthController);


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
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @entities */ "./libs/entities/_entity-map.ts");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config */ "./apps/dakimbo-server/src/config.ts");
/* harmony import */ var _database_database__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../database/database */ "./apps/dakimbo-server/src/database/database.ts");
/* harmony import */ var _libs_utilities_src_lib_auth_checkModelAllowedRoles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../../../libs/utilities/src/lib/auth/checkModelAllowedRoles */ "./libs/utilities/src/lib/auth/checkModelAllowedRoles.ts");






var DataTransaction = /** @class */ (function () {
    function DataTransaction(req, res) {
        this.req = req;
        this.res = res;
        this.entityName = this.req.params.entity;
        this.model = _entities__WEBPACK_IMPORTED_MODULE_1__["entityMap"][this.entityName];
        this.dataObject = req.body;
        this.repo = _database_database__WEBPACK_IMPORTED_MODULE_4__["Database"]._connection.getRepository(this.entityName);
        this.userJwt = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__["verify"](this.res.getHeader('token'), _config__WEBPACK_IMPORTED_MODULE_3__["default"].jwtSecret);
        if (!this.entityName) {
            this.res.send('You must include the resource name to post this entity to!');
            return;
        }
        if (!Object(_libs_utilities_src_lib_auth_checkModelAllowedRoles__WEBPACK_IMPORTED_MODULE_5__["checkModelAllowedRoles"])(this.model, this.userJwt)) {
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
            var isArray, preProcessPromises_1, savedEntity, postProcessPromises_1, e_1;
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
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
                        if (!this.model.preProcess) return [3 /*break*/, 5];
                        if (!isArray) return [3 /*break*/, 3];
                        preProcessPromises_1 = [];
                        this.dataObject.forEach(function (o) {
                            return preProcessPromises_1.push(_this.model.preProcess(o));
                        });
                        return [4 /*yield*/, Promise.all(preProcessPromises_1)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.model.preProcess(this.dataObject)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.repo.save(this.dataObject)];
                    case 6:
                        savedEntity = _a.sent();
                        if (!this.model.postProcess) return [3 /*break*/, 10];
                        if (!isArray) return [3 /*break*/, 8];
                        postProcessPromises_1 = [];
                        this.dataObject.forEach(function (o) {
                            return postProcessPromises_1.push(_this.model.postProcess(o));
                        });
                        return [4 /*yield*/, Promise.all(postProcessPromises_1)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, this.model.postProcess(this.dataObject)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        if (!this.model.loadAfterCreate) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.repo.findOne(this.dataObject.id)];
                    case 11:
                        savedEntity = _a.sent();
                        _a.label = 12;
                    case 12:
                        console.log(this.req.method + ": " + this.entityName + " | " + (isArray ? 'Length: ' + savedEntity.length : savedEntity.id) + " | USER: " + this.userJwt.username);
                        this.res.send(savedEntity);
                        return [3 /*break*/, 14];
                    case 13:
                        e_1 = _a.sent();
                        this.res.status(500).send(e_1);
                        console.error(this.req.method + " FAILED: " + this.entityName + " | USER: " + this.userJwt.username);
                        console.error("ERROR: ", e_1);
                        return [3 /*break*/, 14];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    DataTransaction.prototype.executeDelete = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var idToDelete, isArray, e_2;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idToDelete = this.req.params.id;
                        isArray = Array.isArray(this.dataObject);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.repo.delete(isArray ? this.dataObject : idToDelete)];
                    case 2:
                        _a.sent();
                        console.log("DELETE: " + this.entityName + " | " + (isArray ? 'Length: ' + this.dataObject.length : idToDelete) + " | USER: " + this.userJwt.username);
                        this.res.send({
                            id: idToDelete
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        this.res.status(500).send(e_2);
                        console.error("DELETE FAILED: " + this.entityName + " | " + idToDelete + " | USER: " + this.userJwt.username);
                        console.error("ERROR: ", e_2);
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
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @entities */ "./libs/entities/_entity-map.ts");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _libs_utilities_src_lib_auth_checkModelAllowedRoles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../libs/utilities/src/lib/auth/checkModelAllowedRoles */ "./libs/utilities/src/lib/auth/checkModelAllowedRoles.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../config */ "./apps/dakimbo-server/src/config.ts");
/* harmony import */ var _database_database__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../database/database */ "./apps/dakimbo-server/src/database/database.ts");







var readData = function (req, res) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
    var entityName, userJwt, model, repo, entities, findOptions, useDefaultRepo, queries, query, attrs, i, len, key, value, splitProp, prop, subProp, manager, _a, e_1;
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
        switch (_b.label) {
            case 0:
                entityName = req.params.entity;
                if (!entityName) {
                    res.send('You must include the resource name to get these entities from!');
                    return [2 /*return*/];
                }
                userJwt = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__["verify"](res.getHeader('token'), _config__WEBPACK_IMPORTED_MODULE_5__["default"].jwtSecret);
                model = _entities__WEBPACK_IMPORTED_MODULE_1__["entityMap"][entityName];
                if (!Object(_libs_utilities_src_lib_auth_checkModelAllowedRoles__WEBPACK_IMPORTED_MODULE_4__["checkModelAllowedRoles"])(model, userJwt)) {
                    this.res.status(403).send('You are not allowed to transaction this entity!');
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 12, , 13]);
                repo = _database_database__WEBPACK_IMPORTED_MODULE_6__["Database"]._connection.getRepository(entityName);
                entities = [];
                findOptions = {};
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
                if (!(model && model.relationships && model.relationships.length)) return [3 /*break*/, 11];
                return [4 /*yield*/, loadRelationships(entityName, repo, model.relationships, entities)];
            case 10:
                _b.sent();
                _b.label = 11;
            case 11:
                removeIgnoredAttrs(entities);
                console.log("GET: " + entityName + (Object.keys(req.query).length ? ' ' + JSON.stringify(req.query) : '') + " | Returned " + entities.length + " entities! USER: " + userJwt.username);
                res.send(entities);
                return [3 /*break*/, 13];
            case 12:
                e_1 = _b.sent();
                res.status(500).send(e_1);
                console.error("GET FAILED: " + entityName + " " + JSON.stringify(req.query) + " | USER: " + userJwt.username);
                console.error("ERROR: ", e_1);
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
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
    var ignoreAttrs = ['relationships', 'loadAfterCreate'];
    (entities instanceof Array ? entities : [entities]).forEach(function (e) {
        return ignoreAttrs.forEach(function (attr) { return delete e[attr]; });
    });
};
var loadRelationships = function (entityName, repo, relationships, baseEntities, ignoreSubRelations) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
    var res, subRelationshipPromises, _i, _a, i, _loop_1, _b, _c, r;
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (!baseEntities || !baseEntities.length)
                    return [2 /*return*/];
                return [4 /*yield*/, Promise.all(relationships.map(function (relation) {
                        var manager = Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["getManager"])();
                        if (relation.model && relation.model.repoType && !relation.useDefaultRepo) {
                            switch (relation.model.repoType) {
                                case 'tree':
                                    return manager.getTreeRepository(entityName).findTrees();
                                    break;
                                default:
                                    return repo.findByIds(baseEntities.map(function (entity) {
                                        if (!entity || !entity.id)
                                            return;
                                        return entity.id;
                                    }), {
                                        select: ['id'],
                                        relations: [relation.name]
                                    });
                                    break;
                            }
                        }
                        else {
                            return repo.findByIds(baseEntities.map(function (entity) {
                                if (!entity || !entity.id)
                                    return;
                                return entity.id;
                            }), {
                                select: ['id'],
                                relations: [relation.name]
                            });
                        }
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
                            var relationObject = r[relationName];
                            if (relationships[i].model &&
                                relationships[i].model.relationships &&
                                !ignoreSubRelations) {
                                var subRepo = _database_database__WEBPACK_IMPORTED_MODULE_6__["Database"]._connection.getRepository(relationships[i].model.displayName);
                                var subRelationships = relationships[i].model.relationships;
                                subRelationshipPromises.push(loadRelationships(entityName, subRepo, subRelationships, relationObject instanceof Array ? relationObject : [relationObject], relationships[i].ignoreSubRelations));
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _data_read__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data/read */ "./apps/dakimbo-server/src/controllers/data/read.ts");
/* harmony import */ var _data_data_transaction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data/data-transaction */ "./apps/dakimbo-server/src/controllers/data/data-transaction.ts");



var DataController = /** @class */ (function () {
    function DataController() {
    }
    DataController.get = _data_read__WEBPACK_IMPORTED_MODULE_1__["readData"];
    DataController.create = function (req, res) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new _data_data_transaction__WEBPACK_IMPORTED_MODULE_2__["DataTransaction"](req, res).performTransaction()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    DataController.update = function (req, res) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new _data_data_transaction__WEBPACK_IMPORTED_MODULE_2__["DataTransaction"](req, res).performTransaction()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    DataController.delete = function (req, res) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new _data_data_transaction__WEBPACK_IMPORTED_MODULE_2__["DataTransaction"](req, res).performTransaction()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return DataController;
}());
/* harmony default export */ __webpack_exports__["default"] = (DataController);


/***/ }),

/***/ "./apps/dakimbo-server/src/controllers/metricsController.ts":
/*!******************************************************************!*\
  !*** ./apps/dakimbo-server/src/controllers/metricsController.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config */ "./apps/dakimbo-server/src/config.ts");
/* harmony import */ var _database_database__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../database/database */ "./apps/dakimbo-server/src/database/database.ts");




var MetricsController = /** @class */ (function () {
    function MetricsController() {
    }
    MetricsController.getMetricsFor = function (req, res) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
        var username, metricToFind, metricRepo, metrics, error_1;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__["verify"](res.getHeader('token'), _config__WEBPACK_IMPORTED_MODULE_2__["default"].jwtSecret).username;
                    metricToFind = req.params.metricName;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    metricRepo = _database_database__WEBPACK_IMPORTED_MODULE_3__["Database"]._connection.getRepository(metricToFind);
                    return [4 /*yield*/, metricRepo.find()];
                case 2:
                    metrics = _a.sent();
                    console.log("METRICS FETCHED: " + metricToFind + " --- FOUND: " + metrics.length + " | USER: " + username);
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
    }); };
    return MetricsController;
}());
/* harmony default export */ __webpack_exports__["default"] = (MetricsController);


/***/ }),

/***/ "./apps/dakimbo-server/src/controllers/userController.ts":
/*!***************************************************************!*\
  !*** ./apps/dakimbo-server/src/controllers/userController.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @entities */ "./libs/entities/_entity-map.ts");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ "bcryptjs");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config */ "./apps/dakimbo-server/src/config.ts");






var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.hashPassword = function (userEntity) {
        userEntity.password = bcryptjs__WEBPACK_IMPORTED_MODULE_2__["hashSync"](userEntity.password, 8);
    };
    UserController.checkIfUnencryptedPasswordIsValid = function (unencryptedPassword, userEntity) {
        return bcryptjs__WEBPACK_IMPORTED_MODULE_2__["compareSync"](unencryptedPassword, userEntity.password);
    };
    UserController.listAll = function (req, res) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
        var userRepository, users;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_4__["getRepository"])(_entities__WEBPACK_IMPORTED_MODULE_1__["User"]);
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
    }); };
    UserController.getOneById = function (req, res) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
        var id, userRepository, user, error_1;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_4__["getRepository"])(_entities__WEBPACK_IMPORTED_MODULE_1__["User"]);
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
    }); };
    UserController.newUser = function (req, res) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
        var _a, username, password, email, roles, user, userRepository, e_1;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, username = _a.username, password = _a.password, email = _a.email, roles = _a.roles;
                    user = new _entities__WEBPACK_IMPORTED_MODULE_1__["User"]();
                    user.username = username;
                    user.password = password;
                    user.email = email;
                    user.roles = roles;
                    // const { adminUser } = <any>jwt.verify(<string>res.getHeader('token'), config.jwtSecret);
                    //Hash the password, to securely store on DB
                    UserController.hashPassword(user);
                    userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_4__["getRepository"])(_entities__WEBPACK_IMPORTED_MODULE_1__["User"]);
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
                    console.log("CREATE USER: " + user.username);
                    res.status(201).send(user);
                    return [2 /*return*/];
            }
        });
    }); };
    UserController.editUser = function (req, res) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
        var id, _a, username, password, roles, email, isLocked, numFailedLogin, adminUser, userRepository, user, error_2, e_2;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    _a = req.body, username = _a.username, password = _a.password, roles = _a.roles, email = _a.email, isLocked = _a.isLocked, numFailedLogin = _a.numFailedLogin;
                    adminUser = jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__["verify"](res.getHeader('token'), _config__WEBPACK_IMPORTED_MODULE_5__["default"].jwtSecret).adminUser;
                    userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_4__["getRepository"])(_entities__WEBPACK_IMPORTED_MODULE_1__["User"]);
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
                    user.isLocked = isLocked;
                    user.numFailedLogin = numFailedLogin;
                    if (password) {
                        user.password = password;
                        UserController.hashPassword(user);
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
                    res.status(409).send('username already in use');
                    return [2 /*return*/];
                case 8:
                    //After all send a 204 (no content, but accepted) response
                    console.log("EDIT USER: " + user.username + " | BY ADMIN: " + adminUser);
                    res.status(204).send();
                    return [2 /*return*/];
            }
        });
    }); };
    UserController.deleteUser = function (req, res) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
        var id, adminUser, userRepository, user, error_3;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    adminUser = jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__["verify"](res.getHeader('token'), _config__WEBPACK_IMPORTED_MODULE_5__["default"].jwtSecret).adminUser;
                    userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_4__["getRepository"])(_entities__WEBPACK_IMPORTED_MODULE_1__["User"]);
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
                    console.log("DELETE USER: " + user.username + " | BY ADMIN: " + adminUser);
                    res.status(204).send();
                    return [2 /*return*/];
            }
        });
    }); };
    UserController.getCurrentUser = function (req, res) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
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
                        jwtPayload = jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__["verify"](token, _config__WEBPACK_IMPORTED_MODULE_5__["default"].jwtSecret);
                        res.locals.jwtPayload = jwtPayload;
                    }
                    catch (error) {
                        // If token is not valid, respond with 401 (unauthorized)
                        res.status(401).send();
                        return [2 /*return*/];
                    }
                    userId = jwtPayload.userId, username = jwtPayload.username;
                    userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_4__["getRepository"])(_entities__WEBPACK_IMPORTED_MODULE_1__["User"]);
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
    }); };
    return UserController;
}());
/* harmony default export */ __webpack_exports__["default"] = (UserController);


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
/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! helmet */ "helmet");
/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(helmet__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _database_database__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./database/database */ "./apps/dakimbo-server/src/database/database.ts");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./routes */ "./apps/dakimbo-server/src/routes/index.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./config */ "./apps/dakimbo-server/src/config.ts");

__webpack_require__(/*! ./utilities/logStamp */ "./apps/dakimbo-server/src/utilities/logStamp.ts");
__webpack_require__(/*! dotenv */ "dotenv").config();









(function () { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
    var db, app, port, server;
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        switch (_a.label) {
            case 0:
                db = new _database_database__WEBPACK_IMPORTED_MODULE_7__["Database"]();
                return [4 /*yield*/, db.connect(_config__WEBPACK_IMPORTED_MODULE_9__["default"].dbOptions)];
            case 1:
                _a.sent();
                app = express__WEBPACK_IMPORTED_MODULE_5___default()();
                port = process.env.port || 1337;
                // MIDDLEWARE
                app.use(cors__WEBPACK_IMPORTED_MODULE_4___default()());
                app.use(helmet__WEBPACK_IMPORTED_MODULE_6___default()());
                app.use(compression__WEBPACK_IMPORTED_MODULE_3___default()());
                app.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.urlencoded({ extended: false }));
                app.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.json());
                app.use(express__WEBPACK_IMPORTED_MODULE_5___default.a.static(__dirname + '/public'));
                app.use('/', _routes__WEBPACK_IMPORTED_MODULE_8__["default"]);
                app.get('*', function (req, res) {
                    res.sendFile(__dirname + '/public/index.html');
                });
                server = app.listen(port, function () {
                    return console.log("Server is listening on " + port);
                });
                server.on('error', console.error);
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


var checkJwt = function (req, res, next) {
    // Get the jwt token from the head
    var authHeader = req.headers['authorization'];
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
        expiresIn: '1h'
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
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @entities */ "./libs/entities/_entity-map.ts");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _libs_utilities_src_lib_auth_checkUserRole__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../../../libs/utilities/src/lib/auth/checkUserRole */ "./libs/utilities/src/lib/auth/checkUserRole.ts");




var checkRole = function (roles) {
    return function (req, res, next) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
        var id, userRepository, user, id_1;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = res.locals.jwtPayload.userId;
                    userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_2__["getRepository"])(_entities__WEBPACK_IMPORTED_MODULE_1__["User"]);
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
                    if (Object(_libs_utilities_src_lib_auth_checkUserRole__WEBPACK_IMPORTED_MODULE_3__["checkUserRole"])(user, roles))
                        next();
                    else
                        res.status(401).send();
                    return [2 /*return*/];
            }
        });
    }); };
};


/***/ }),

/***/ "./apps/dakimbo-server/src/routes/auth.ts":
/*!************************************************!*\
  !*** ./apps/dakimbo-server/src/routes/auth.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_authController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/authController */ "./apps/dakimbo-server/src/controllers/authController.ts");
/* harmony import */ var _middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../middlewares/checkJwt */ "./apps/dakimbo-server/src/middlewares/checkJwt.ts");



var router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
//Login route
router.post('/login', _controllers_authController__WEBPACK_IMPORTED_MODULE_1__["default"].login);
//Change my password
router.post('/change-password', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__["checkJwt"]], _controllers_authController__WEBPACK_IMPORTED_MODULE_1__["default"].changePassword);
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),

/***/ "./apps/dakimbo-server/src/routes/data.ts":
/*!************************************************!*\
  !*** ./apps/dakimbo-server/src/routes/data.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../middlewares/checkJwt */ "./apps/dakimbo-server/src/middlewares/checkJwt.ts");
/* harmony import */ var _middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../middlewares/checkRole */ "./apps/dakimbo-server/src/middlewares/checkRole.ts");
/* harmony import */ var _controllers_dataController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controllers/dataController */ "./apps/dakimbo-server/src/controllers/dataController.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config */ "./apps/dakimbo-server/src/config.ts");





var router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
if (_config__WEBPACK_IMPORTED_MODULE_4__["default"].isProd) {
    router.get('/:entity', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin', 'admin'])], _controllers_dataController__WEBPACK_IMPORTED_MODULE_3__["default"].get);
    router.post('/:entity', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin', 'admin'])], _controllers_dataController__WEBPACK_IMPORTED_MODULE_3__["default"].create);
    router.patch('/:entity/:id', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin', 'admin'])], _controllers_dataController__WEBPACK_IMPORTED_MODULE_3__["default"].update);
    router.put('/:entity/:id', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin', 'admin'])], _controllers_dataController__WEBPACK_IMPORTED_MODULE_3__["default"].update);
    router.delete('/:entity/:id', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superamdin', 'admin'])], _controllers_dataController__WEBPACK_IMPORTED_MODULE_3__["default"].delete);
}
else {
    router.get('/:entity', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin', 'admin'])], _controllers_dataController__WEBPACK_IMPORTED_MODULE_3__["default"].get);
    router.post('/:entity', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin', 'admin'])], _controllers_dataController__WEBPACK_IMPORTED_MODULE_3__["default"].create);
    router.patch('/:entity/:id', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin', 'admin'])], _controllers_dataController__WEBPACK_IMPORTED_MODULE_3__["default"].update);
    router.put('/:entity/:id', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin', 'admin'])], _controllers_dataController__WEBPACK_IMPORTED_MODULE_3__["default"].update);
    router.delete('/:entity/:id', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin', 'admin'])], _controllers_dataController__WEBPACK_IMPORTED_MODULE_3__["default"].delete);
}
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
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth */ "./apps/dakimbo-server/src/routes/auth.ts");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user */ "./apps/dakimbo-server/src/routes/user.ts");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data */ "./apps/dakimbo-server/src/routes/data.ts");
/* harmony import */ var _metrics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./metrics */ "./apps/dakimbo-server/src/routes/metrics.ts");





var routes = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
routes.use('/auth', _auth__WEBPACK_IMPORTED_MODULE_1__["default"]);
routes.use('/user', _user__WEBPACK_IMPORTED_MODULE_2__["default"]);
routes.use('/data', _data__WEBPACK_IMPORTED_MODULE_3__["default"]);
routes.use('/metrics', _metrics__WEBPACK_IMPORTED_MODULE_4__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (routes);


/***/ }),

/***/ "./apps/dakimbo-server/src/routes/metrics.ts":
/*!***************************************************!*\
  !*** ./apps/dakimbo-server/src/routes/metrics.ts ***!
  \***************************************************/
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
// Get specific metric
router.get('/:metricName', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_1__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_2__["checkRole"])(['superadmin'])], _controllers_metricsController__WEBPACK_IMPORTED_MODULE_3__["default"].getMetricsFor);
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),

/***/ "./apps/dakimbo-server/src/routes/user.ts":
/*!************************************************!*\
  !*** ./apps/dakimbo-server/src/routes/user.ts ***!
  \************************************************/
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
//Get all users
router.get('/', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_3__["checkRole"])(['admin'])], _controllers_userController__WEBPACK_IMPORTED_MODULE_1__["default"].listAll);
// Get one user
router.get('/:id([0-9]+)', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_3__["checkRole"])(['admin'])], _controllers_userController__WEBPACK_IMPORTED_MODULE_1__["default"].getOneById);
//Create a new user
router.post('/', _controllers_userController__WEBPACK_IMPORTED_MODULE_1__["default"].newUser);
//Edit one user
router.patch('/:id([0-9]+)', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_3__["checkRole"])(['admin'])], _controllers_userController__WEBPACK_IMPORTED_MODULE_1__["default"].editUser);
//Delete one user
router.delete('/:id([0-9]+)', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__["checkJwt"], Object(_middlewares_checkRole__WEBPACK_IMPORTED_MODULE_3__["checkRole"])(['admin'])], _controllers_userController__WEBPACK_IMPORTED_MODULE_1__["default"].deleteUser);
// Current User
router.get('/me', [_middlewares_checkJwt__WEBPACK_IMPORTED_MODULE_2__["checkJwt"]], _controllers_userController__WEBPACK_IMPORTED_MODULE_1__["default"].getCurrentUser);
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),

/***/ "./apps/dakimbo-server/src/utilities/logStamp.ts":
/*!*******************************************************!*\
  !*** ./apps/dakimbo-server/src/utilities/logStamp.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
    return "[\u001B[34m" + new Date().toISOString() + "\u001B[0m]";
};


/***/ }),

/***/ "./libs/entities/_entity-map.ts":
/*!**************************************!*\
  !*** ./libs/entities/_entity-map.ts ***!
  \**************************************/
/*! exports provided: entityMap, User, AuthAction, AuthEntity, AuthRole, AuthRolePermission, MetricPageView, MetricPageVisit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "entityMap", function() { return entityMap; });
/* harmony import */ var _metrics_metric_page_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_metrics/metric-page-view */ "./libs/entities/_metrics/metric-page-view.ts");
/* harmony import */ var _metrics_metric_page_visit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_metrics/metric-page-visit */ "./libs/entities/_metrics/metric-page-visit.ts");
/* harmony import */ var _auth_auth_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth/auth-action */ "./libs/entities/auth/auth-action.ts");
/* harmony import */ var _auth_auth_entity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth/auth-entity */ "./libs/entities/auth/auth-entity.ts");
/* harmony import */ var _auth_auth_role__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth/auth-role */ "./libs/entities/auth/auth-role.ts");
/* harmony import */ var _auth_auth_role_permission__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth/auth-role-permission */ "./libs/entities/auth/auth-role-permission.ts");
/* harmony import */ var _auth_user__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./auth/user */ "./libs/entities/auth/user.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "User", function() { return _auth_user__WEBPACK_IMPORTED_MODULE_6__["User"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthAction", function() { return _auth_auth_action__WEBPACK_IMPORTED_MODULE_2__["AuthAction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthEntity", function() { return _auth_auth_entity__WEBPACK_IMPORTED_MODULE_3__["AuthEntity"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthRole", function() { return _auth_auth_role__WEBPACK_IMPORTED_MODULE_4__["AuthRole"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthRolePermission", function() { return _auth_auth_role_permission__WEBPACK_IMPORTED_MODULE_5__["AuthRolePermission"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MetricPageView", function() { return _metrics_metric_page_view__WEBPACK_IMPORTED_MODULE_0__["MetricPageView"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MetricPageVisit", function() { return _metrics_metric_page_visit__WEBPACK_IMPORTED_MODULE_1__["MetricPageVisit"]; });








var entityMap = {
    // AUTH
    User: _auth_user__WEBPACK_IMPORTED_MODULE_6__["User"],
    AuthRole: _auth_auth_role__WEBPACK_IMPORTED_MODULE_4__["AuthRole"],
    AuthAction: _auth_auth_action__WEBPACK_IMPORTED_MODULE_2__["AuthAction"],
    AuthEntity: _auth_auth_entity__WEBPACK_IMPORTED_MODULE_3__["AuthEntity"],
    AuthRolePermission: _auth_auth_role_permission__WEBPACK_IMPORTED_MODULE_5__["AuthRolePermission"],
    // METRICS
    MetricPageView: _metrics_metric_page_view__WEBPACK_IMPORTED_MODULE_0__["MetricPageView"],
    MetricPageVisit: _metrics_metric_page_visit__WEBPACK_IMPORTED_MODULE_1__["MetricPageVisit"]
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
    User.relationships = [{ model: _auth_role__WEBPACK_IMPORTED_MODULE_3__["AuthRole"] }];
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

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

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