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
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @entities */ "./apps/dakimbo-server/src/database/entities/index.ts");

const isProd = process.env.IS_PROD === 'true';
const pathToEntities = isProd ? './database/entities/**/*.js' : './database/entities/**/*.ts';
const pathToMigrations = isProd ? './database/migrations/**/*.js' : './database/migrations/**/*.ts';
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
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @entities */ "./apps/dakimbo-server/src/database/entities/index.ts");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config */ "./apps/dakimbo-server/src/config.ts");
/* harmony import */ var _userController__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./userController */ "./apps/dakimbo-server/src/controllers/userController.ts");







const loginAttempts = 3;
class AuthController {
}
AuthController.login = (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    //Check if username and password are set
    let { username, email, password } = req.body;
    if (!((username || email) && password)) {
        res.status(400).send(`You didn't enter a username or password...`);
        console.log(`LOGIN: Username or Password not found; failed to log in!`);
        return;
    }
    //Get user from database
    const userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_4__["getRepository"])(_entities__WEBPACK_IMPORTED_MODULE_1__["User"]);
    let user;
    try {
        user = yield userRepository.findOneOrFail({ where: [{ username }, { email }] });
    }
    catch (error) {
        res.status(401).send('Account was not found, please check your username / e-mail and try again.');
        console.log(`LOGIN: User ${username} not found; failed to log in!`);
        return;
    }
    if (user.numFailedLogin >= loginAttempts || user.isLocked) {
        const attemptsRemaining = loginAttempts - user.numFailedLogin;
        user.isLocked = user.isLocked || attemptsRemaining <= 0;
        yield userRepository.save(user); // increment num failed login counter
        res.status(401).send('Account is locked; please contact an administrator!');
        console.log(`LOGIN: User ${username} has a locked account.`);
        return;
    }
    //Check if encrypted password match
    if (!_userController__WEBPACK_IMPORTED_MODULE_6__["default"].checkIfUnencryptedPasswordIsValid(password, user)) {
        user.numFailedLogin++;
        const attemptsRemaining = loginAttempts - user.numFailedLogin;
        user.isLocked = user.isLocked || attemptsRemaining <= 0;
        yield userRepository.save(user); // increment num failed login counter
        res.status(401).send(`You entered a wrong username, e-mail or password. ${attemptsRemaining > 0
            ? attemptsRemaining + ' login attempts remaining before account is locked!'
            : 'Account is now LOCKED!'} `);
        console.log(`LOGIN: User ${user.username} wrong password; failed to log in!`);
        return;
    }
    //Sign JWT, valid for 1 hour
    const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__["sign"]({
        userId: user.id,
        username: user.username,
        roles: user.roles.map((r) => {
            return { role: r.role };
        })
    }, _config__WEBPACK_IMPORTED_MODULE_5__["default"].jwtSecret, {
        expiresIn: '1h'
    });
    // Delete user pass
    delete user.password;
    console.log(`LOGIN: User ${user.username} successfully logged in!`);
    user.numSuccessfulLogin++;
    user.numFailedLogin = 0;
    user.lastLoggedInDate = new Date();
    yield userRepository.save(user); // increment num successful login counter
    //Send the jwt in the response
    res.send(Object.assign({ jwt: token }, user));
});
AuthController.changePassword = (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;
    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
        res.status(400).send();
    }
    //Get user from the database
    const userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_4__["getRepository"])(_entities__WEBPACK_IMPORTED_MODULE_1__["User"]);
    let user;
    try {
        user = yield userRepository.findOneOrFail(id);
    }
    catch (id) {
        res.status(401).send();
    }
    //Check if old password matches
    if (!_userController__WEBPACK_IMPORTED_MODULE_6__["default"].checkIfUnencryptedPasswordIsValid(oldPassword, user)) {
        res.status(401).send();
        return;
    }
    //Validate the model (password length)
    user.password = newPassword;
    const errors = yield Object(class_validator__WEBPACK_IMPORTED_MODULE_2__["validate"])(user);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }
    //Hash the new password and save
    _userController__WEBPACK_IMPORTED_MODULE_6__["default"].hashPassword(user);
    userRepository.save(user);
    res.status(204).send();
});
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
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @entities */ "./apps/dakimbo-server/src/database/entities/index.ts");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config */ "./apps/dakimbo-server/src/config.ts");
/* harmony import */ var _database_database__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../database/database */ "./apps/dakimbo-server/src/database/database.ts");
/* harmony import */ var _libs_utilities_src_lib_auth_checkModelAllowedRoles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../../../libs/utilities/src/lib/auth/checkModelAllowedRoles */ "./libs/utilities/src/lib/auth/checkModelAllowedRoles.ts");






class DataTransaction {
    constructor(req, res) {
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
    performTransaction() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (['POST', 'PATCH', 'PUT'].includes(this.req.method)) {
                yield this.executeSave();
            }
            else if (this.req.method === 'DELETE') {
                yield this.executeDelete();
            }
        });
    }
    executeSave() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const isArray = Array.isArray(this.dataObject);
            if (isArray) {
                this.dataObject.forEach((d) => this.setEntityUser(d));
            }
            else {
                this.setEntityUser(this.dataObject);
                if (!this.dataObject.id && this.req.params.id)
                    this.dataObject.id = this.req.params.id;
            }
            try {
                if (this.model.preProcess) {
                    if (isArray) {
                        const preProcessPromises = [];
                        this.dataObject.forEach((o) => preProcessPromises.push(this.model.preProcess(o)));
                        yield Promise.all(preProcessPromises);
                    }
                    else {
                        yield this.model.preProcess(this.dataObject);
                    }
                }
                let savedEntity = yield this.repo.save(this.dataObject);
                if (this.model.postProcess) {
                    if (isArray) {
                        const postProcessPromises = [];
                        this.dataObject.forEach((o) => postProcessPromises.push(this.model.postProcess(o)));
                        yield Promise.all(postProcessPromises);
                    }
                    else {
                        yield this.model.postProcess(this.dataObject);
                    }
                }
                if (this.model.loadAfterCreate) {
                    savedEntity = yield this.repo.findOne(this.dataObject.id);
                }
                console.log(`${this.req.method}: ${this.entityName} | ${isArray ? 'Length: ' + savedEntity.length : savedEntity.id} | USER: ${this.userJwt.username}`);
                this.res.send(savedEntity);
            }
            catch (e) {
                this.res.status(500).send(e);
                console.error(`${this.req.method} FAILED: ${this.entityName} | USER: ${this.userJwt.username}`);
                console.error(`ERROR: `, e);
            }
        });
    }
    executeDelete() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const idToDelete = this.req.params.id;
            const isArray = Array.isArray(this.dataObject);
            try {
                yield this.repo.delete(isArray ? this.dataObject : idToDelete);
                console.log(`DELETE: ${this.entityName} | ${isArray ? 'Length: ' + this.dataObject.length : idToDelete} | USER: ${this.userJwt.username}`);
                this.res.send({
                    id: idToDelete
                });
            }
            catch (e) {
                this.res.status(500).send(e);
                console.error(`DELETE FAILED: ${this.entityName} | ${idToDelete} | USER: ${this.userJwt.username}`);
                console.error(`ERROR: `, e);
            }
        });
    }
    setEntityUser(entity) {
        entity.modifyUser = this.userJwt.username;
        if (this.req.method === 'POST') {
            entity.createUser = this.userJwt.username;
        }
    }
}


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
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @entities */ "./apps/dakimbo-server/src/database/entities/index.ts");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _libs_utilities_src_lib_auth_checkModelAllowedRoles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../libs/utilities/src/lib/auth/checkModelAllowedRoles */ "./libs/utilities/src/lib/auth/checkModelAllowedRoles.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../config */ "./apps/dakimbo-server/src/config.ts");
/* harmony import */ var _database_database__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../database/database */ "./apps/dakimbo-server/src/database/database.ts");







const readData = (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const entityName = req.params.entity;
    if (!entityName) {
        res.send('You must include the resource name to get these entities from!');
        return;
    }
    const userJwt = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__["verify"](res.getHeader('token'), _config__WEBPACK_IMPORTED_MODULE_5__["default"].jwtSecret);
    const model = _entities__WEBPACK_IMPORTED_MODULE_1__["entityMap"][entityName];
    if (!Object(_libs_utilities_src_lib_auth_checkModelAllowedRoles__WEBPACK_IMPORTED_MODULE_4__["checkModelAllowedRoles"])(model, userJwt)) {
        this.res.status(403).send('You are not allowed to transaction this entity!');
        return;
    }
    try {
        let repo = _database_database__WEBPACK_IMPORTED_MODULE_6__["Database"]._connection.getRepository(entityName);
        let entities = [];
        let findOptions = {};
        let useDefaultRepo = false;
        const queries = Object.keys(req.query);
        if (queries && queries.length) {
            let query = {};
            let attrs = [];
            for (let i = 0, len = queries.length; i < len; i++) {
                const key = queries[i];
                const value = req.query[key];
                if (key === 'useDefaultRepo') {
                    useDefaultRepo = true;
                }
                else if (key === 'attrs') {
                    attrs = value.split(',');
                }
                else if (key.indexOf('.') >= 0) {
                    const splitProp = key.split('.');
                    const prop = splitProp[0], subProp = splitProp[1];
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
        if (model.repoType && !useDefaultRepo) {
            const manager = Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["getManager"])();
            switch (model.repoType) {
                case 'tree':
                    entities = yield manager.getTreeRepository(entityName).findTrees();
                    break;
                default:
                    entities = yield repo.find(findOptions);
                    break;
            }
        }
        else {
            entities = yield repo.find(findOptions);
        }
        if (model && model.relationships && model.relationships.length) {
            yield loadRelationships(entityName, repo, model.relationships, entities);
        }
        removeIgnoredAttrs(entities);
        console.log(`GET: ${entityName}${Object.keys(req.query).length ? ' ' + JSON.stringify(req.query) : ''} | Returned ${entities.length} entities! USER: ${userJwt.username}`);
        res.send(entities);
    }
    catch (e) {
        res.status(500).send(e);
        console.error(`GET FAILED: ${entityName} ${JSON.stringify(req.query)} | USER: ${userJwt.username}`);
        console.error(`ERROR: `, e);
    }
});
const transformQueryValue = (value) => {
    const lowerValue = value.toLowerCase();
    if (lowerValue === 'null') {
        return Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["IsNull"])();
    }
    else {
        return value;
    }
};
const removeIgnoredAttrs = (entities) => {
    if (!entities)
        return;
    const ignoreAttrs = ['relationships', 'loadAfterCreate'];
    (entities instanceof Array ? entities : [entities]).forEach((e) => ignoreAttrs.forEach((attr) => delete e[attr]));
};
const loadRelationships = (entityName, repo, relationships, baseEntities, ignoreSubRelations) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    if (!baseEntities || !baseEntities.length)
        return;
    // Wait for all sub finds to complete and spread them into a res object
    const res = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(yield Promise.all(relationships.map((relation) => {
        const manager = Object(typeorm__WEBPACK_IMPORTED_MODULE_3__["getManager"])();
        if (relation.model && relation.model.repoType && !relation.useDefaultRepo) {
            switch (relation.model.repoType) {
                case 'tree':
                    return manager.getTreeRepository(entityName).findTrees();
                    break;
                default:
                    return repo.findByIds(baseEntities.map((entity) => {
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
            return repo.findByIds(baseEntities.map((entity) => {
                if (!entity || !entity.id)
                    return;
                return entity.id;
            }), {
                select: ['id'],
                relations: [relation.name]
            });
        }
    })), []);
    // Loop over every sub find result, find the "full entity" we're trying to build from our base entities,
    // and attach the corresponding related entites to it (not a "pure" function)
    const subRelationshipPromises = [];
    for (const i of Object.keys(res)) {
        for (const r of res[i]) {
            const fullEntity = baseEntities.find((e) => e.id === r.id);
            if (fullEntity) {
                const relationName = relationships[i].name;
                const relationObject = r[relationName];
                if (relationships[i].model &&
                    relationships[i].model.relationships &&
                    !ignoreSubRelations) {
                    const subRepo = _database_database__WEBPACK_IMPORTED_MODULE_6__["Database"]._connection.getRepository(relationships[i].model.displayName);
                    const subRelationships = relationships[i].model.relationships;
                    subRelationshipPromises.push(loadRelationships(entityName, subRepo, subRelationships, relationObject instanceof Array ? relationObject : [relationObject], relationships[i].ignoreSubRelations));
                }
                removeIgnoredAttrs(relationObject);
                removeIgnoredAttrs(fullEntity);
                fullEntity[relationName] = relationObject;
            }
        }
    }
    yield Promise.all(subRelationshipPromises);
});


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



class DataController {
}
DataController.get = _data_read__WEBPACK_IMPORTED_MODULE_1__["readData"];
DataController.create = (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    yield new _data_data_transaction__WEBPACK_IMPORTED_MODULE_2__["DataTransaction"](req, res).performTransaction();
});
DataController.update = (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    yield new _data_data_transaction__WEBPACK_IMPORTED_MODULE_2__["DataTransaction"](req, res).performTransaction();
});
DataController.delete = (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    yield new _data_data_transaction__WEBPACK_IMPORTED_MODULE_2__["DataTransaction"](req, res).performTransaction();
});
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




class MetricsController {
}
MetricsController.getMetricsFor = (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const { username } = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__["verify"](res.getHeader('token'), _config__WEBPACK_IMPORTED_MODULE_2__["default"].jwtSecret);
    const metricToFind = req.params.metricName;
    try {
        const metricRepo = _database_database__WEBPACK_IMPORTED_MODULE_3__["Database"]._connection.getRepository(metricToFind);
        const metrics = yield metricRepo.find();
        console.log(`METRICS FETCHED: ${metricToFind} --- FOUND: ${metrics.length} | USER: ${username}`);
        res.send(metrics);
    }
    catch (error) {
        res.status(500).send(error);
        console.log(`FAILED: Metrics fetch for ${metricToFind}`);
    }
});
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
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @entities */ "./apps/dakimbo-server/src/database/entities/index.ts");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ "bcryptjs");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../config */ "./apps/dakimbo-server/src/config.ts");







class UserController {
    static hashPassword(userEntity) {
        userEntity.password = bcryptjs__WEBPACK_IMPORTED_MODULE_2__["hashSync"](userEntity.password, 8);
    }
    static checkIfUnencryptedPasswordIsValid(unencryptedPassword, userEntity) {
        return bcryptjs__WEBPACK_IMPORTED_MODULE_2__["compareSync"](unencryptedPassword, userEntity.password);
    }
}
UserController.listAll = (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    //Get users from database
    const userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_5__["getRepository"])(_entities__WEBPACK_IMPORTED_MODULE_1__["User"]);
    const users = yield userRepository.find();
    users.forEach((user) => {
        delete user.password;
    });
    //Send the users object
    res.send(users);
});
UserController.getOneById = (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    //Get the ID from the url
    const id = req.params.id;
    //Get the user from database
    const userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_5__["getRepository"])(_entities__WEBPACK_IMPORTED_MODULE_1__["User"]);
    try {
        const user = yield userRepository.findOneOrFail(id);
        delete user.password;
        res.status(201).send(user);
    }
    catch (error) {
        res.status(404).send('User not found');
    }
});
UserController.newUser = (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    //Get parameters from the body
    let { username, password, email, roles } = req.body;
    let user = new _entities__WEBPACK_IMPORTED_MODULE_1__["User"]();
    user.username = username;
    user.password = password;
    user.email = email;
    user.roles = roles;
    // const { adminUser } = <any>jwt.verify(<string>res.getHeader('token'), config.jwtSecret);
    //Validade if the parameters are ok
    const errors = yield Object(class_validator__WEBPACK_IMPORTED_MODULE_3__["validate"])(user);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }
    //Hash the password, to securely store on DB
    UserController.hashPassword(user);
    //Try to save. If fails, the username is already in use
    const userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_5__["getRepository"])(_entities__WEBPACK_IMPORTED_MODULE_1__["User"]);
    try {
        yield userRepository.save(user);
    }
    catch (e) {
        res.status(409).send('Username already in use!');
        return;
    }
    delete user.password;
    //If all ok, send 201 response
    console.log(`CREATE USER: ${user.username}`);
    res.status(201).send(user);
});
UserController.editUser = (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    //Get the ID from the url
    const id = req.params.id;
    //Get values from the body
    const { username, password, roles, email, isLocked, numFailedLogin } = req.body;
    const { adminUser } = jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__["verify"](res.getHeader('token'), _config__WEBPACK_IMPORTED_MODULE_6__["default"].jwtSecret);
    //Try to find user on database
    const userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_5__["getRepository"])(_entities__WEBPACK_IMPORTED_MODULE_1__["User"]);
    let user;
    try {
        user = yield userRepository.findOneOrFail(id);
    }
    catch (error) {
        //If not found, send a 404 response
        res.status(404).send('User not found');
        return;
    }
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
    const errors = yield Object(class_validator__WEBPACK_IMPORTED_MODULE_3__["validate"])(user);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }
    //Try to save, if fails, that means username already in use
    try {
        yield userRepository.save(user);
    }
    catch (e) {
        res.status(409).send('username already in use');
        return;
    }
    //After all send a 204 (no content, but accepted) response
    console.log(`EDIT USER: ${user.username} | BY ADMIN: ${adminUser}`);
    res.status(204).send();
});
UserController.deleteUser = (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    //Get the ID from the url
    const id = req.params.id;
    const { adminUser } = jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__["verify"](res.getHeader('token'), _config__WEBPACK_IMPORTED_MODULE_6__["default"].jwtSecret);
    const userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_5__["getRepository"])(_entities__WEBPACK_IMPORTED_MODULE_1__["User"]);
    let user;
    try {
        user = yield userRepository.findOneOrFail(id);
    }
    catch (error) {
        res.status(404).send('User not found');
        return;
    }
    userRepository.delete(id);
    //After all send a 204 (no content, but accepted) response
    console.log(`DELETE USER: ${user.username} | BY ADMIN: ${adminUser}`);
    res.status(204).send();
});
UserController.getCurrentUser = (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    // Get the jwt token from the head
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.includes('Bearer')) {
        res.status(408).send('No Authorization Header or Bearer token presented!');
        return;
    }
    const token = authHeader.split('Bearer')[1].trim();
    let jwtPayload;
    // Try to validate the token and get data
    try {
        jwtPayload = jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__["verify"](token, _config__WEBPACK_IMPORTED_MODULE_6__["default"].jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        // If token is not valid, respond with 401 (unauthorized)
        res.status(401).send();
        return;
    }
    // The token is valid for 1 hour
    // We want to send a new token on every request
    const { userId, username } = jwtPayload;
    const userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_5__["getRepository"])(_entities__WEBPACK_IMPORTED_MODULE_1__["User"]);
    let user;
    try {
        user = yield userRepository.findOneOrFail(userId);
    }
    catch (error) {
        res.status(404).send('User not found');
        return;
    }
    delete user.password;
    res.status(201).send(user);
});
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


class Database {
    constructor() { }
    connect(dbOptions) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            Database._dbOptions = dbOptions;
            try {
                console.log(`Connecting to ${Database._dbOptions.type} Database: ${Database._dbOptions.database} at ${Database._dbOptions.host}:${Database._dbOptions.port} with user: ${Database._dbOptions.username}`);
                Database._connection = yield Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["createConnection"])(Database._dbOptions);
                yield this.runMigrations();
                console.log(`Connection to database established!`);
            }
            catch (e) {
                console.log(`Error Connecting to ${Database._dbOptions.host}:${Database._dbOptions.port}\n`, e);
            }
        });
    }
    runMigrations() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const migrations = [];
            if (migrations.length) {
                console.log(`Running migrations...`);
                yield Promise.all(migrations);
                console.log(`Migrations finished!`);
            }
        });
    }
}


/***/ }),

/***/ "./apps/dakimbo-server/src/database/entities/_entity-map.ts":
/*!******************************************************************!*\
  !*** ./apps/dakimbo-server/src/database/entities/_entity-map.ts ***!
  \******************************************************************/
/*! exports provided: entityMap, User, AuthAction, AuthEntity, AuthRole, AuthRolePermission */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "entityMap", function() { return entityMap; });
/* harmony import */ var _auth_auth_action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth/auth-action */ "./apps/dakimbo-server/src/database/entities/auth/auth-action.ts");
/* harmony import */ var _auth_auth_entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth/auth-entity */ "./apps/dakimbo-server/src/database/entities/auth/auth-entity.ts");
/* harmony import */ var _auth_auth_role__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth/auth-role */ "./apps/dakimbo-server/src/database/entities/auth/auth-role.ts");
/* harmony import */ var _auth_auth_role_permission__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth/auth-role-permission */ "./apps/dakimbo-server/src/database/entities/auth/auth-role-permission.ts");
/* harmony import */ var _auth_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth/user */ "./apps/dakimbo-server/src/database/entities/auth/user.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "User", function() { return _auth_user__WEBPACK_IMPORTED_MODULE_4__["User"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthAction", function() { return _auth_auth_action__WEBPACK_IMPORTED_MODULE_0__["AuthAction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthEntity", function() { return _auth_auth_entity__WEBPACK_IMPORTED_MODULE_1__["AuthEntity"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthRole", function() { return _auth_auth_role__WEBPACK_IMPORTED_MODULE_2__["AuthRole"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthRolePermission", function() { return _auth_auth_role_permission__WEBPACK_IMPORTED_MODULE_3__["AuthRolePermission"]; });






const entityMap = {
    // AUTH
    User: _auth_user__WEBPACK_IMPORTED_MODULE_4__["User"],
    AuthRole: _auth_auth_role__WEBPACK_IMPORTED_MODULE_2__["AuthRole"],
    AuthAction: _auth_auth_action__WEBPACK_IMPORTED_MODULE_0__["AuthAction"],
    AuthEntity: _auth_auth_entity__WEBPACK_IMPORTED_MODULE_1__["AuthEntity"],
    AuthRolePermission: _auth_auth_role_permission__WEBPACK_IMPORTED_MODULE_3__["AuthRolePermission"]
};







/***/ }),

/***/ "./apps/dakimbo-server/src/database/entities/auth/auth-action.ts":
/*!***********************************************************************!*\
  !*** ./apps/dakimbo-server/src/database/entities/auth/auth-action.ts ***!
  \***********************************************************************/
/*! exports provided: AuthAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthAction", function() { return AuthAction; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base */ "./apps/dakimbo-server/src/database/entities/base.ts");
/* harmony import */ var _auth_role_permission__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth-role-permission */ "./apps/dakimbo-server/src/database/entities/auth/auth-role-permission.ts");




let AuthAction = class AuthAction extends _base__WEBPACK_IMPORTED_MODULE_2__["BaseModel"] {
};
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
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["OneToMany"])((type) => _auth_role_permission__WEBPACK_IMPORTED_MODULE_3__["AuthRolePermission"], (authRolePermission) => authRolePermission.action),
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



/***/ }),

/***/ "./apps/dakimbo-server/src/database/entities/auth/auth-entity.ts":
/*!***********************************************************************!*\
  !*** ./apps/dakimbo-server/src/database/entities/auth/auth-entity.ts ***!
  \***********************************************************************/
/*! exports provided: AuthEntity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthEntity", function() { return AuthEntity; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base */ "./apps/dakimbo-server/src/database/entities/base.ts");
/* harmony import */ var _auth_role_permission__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth-role-permission */ "./apps/dakimbo-server/src/database/entities/auth/auth-role-permission.ts");




let AuthEntity = class AuthEntity extends _base__WEBPACK_IMPORTED_MODULE_2__["BaseModel"] {
};
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
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["OneToMany"])((type) => _auth_role_permission__WEBPACK_IMPORTED_MODULE_3__["AuthRolePermission"], (authRolePermission) => authRolePermission.entity),
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



/***/ }),

/***/ "./apps/dakimbo-server/src/database/entities/auth/auth-role-permission.ts":
/*!********************************************************************************!*\
  !*** ./apps/dakimbo-server/src/database/entities/auth/auth-role-permission.ts ***!
  \********************************************************************************/
/*! exports provided: AuthRolePermission */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthRolePermission", function() { return AuthRolePermission; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base */ "./apps/dakimbo-server/src/database/entities/base.ts");
/* harmony import */ var _auth_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth-action */ "./apps/dakimbo-server/src/database/entities/auth/auth-action.ts");
/* harmony import */ var _auth_entity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth-entity */ "./apps/dakimbo-server/src/database/entities/auth/auth-entity.ts");
/* harmony import */ var _auth_role__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth-role */ "./apps/dakimbo-server/src/database/entities/auth/auth-role.ts");
var _a, _b, _c;






let AuthRolePermission = class AuthRolePermission extends _base__WEBPACK_IMPORTED_MODULE_2__["BaseModel"] {
};
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
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["ManyToOne"])((type) => _auth_action__WEBPACK_IMPORTED_MODULE_3__["AuthAction"], (authAction) => authAction.authRolePermissions),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_a = typeof _auth_action__WEBPACK_IMPORTED_MODULE_3__["AuthAction"] !== "undefined" && _auth_action__WEBPACK_IMPORTED_MODULE_3__["AuthAction"]) === "function" ? _a : Object)
], AuthRolePermission.prototype, "action", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["ManyToOne"])((type) => _auth_entity__WEBPACK_IMPORTED_MODULE_4__["AuthEntity"], (authEntity) => authEntity.authRolePermissions),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_b = typeof _auth_entity__WEBPACK_IMPORTED_MODULE_4__["AuthEntity"] !== "undefined" && _auth_entity__WEBPACK_IMPORTED_MODULE_4__["AuthEntity"]) === "function" ? _b : Object)
], AuthRolePermission.prototype, "entity", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["ManyToOne"])((type) => _auth_role__WEBPACK_IMPORTED_MODULE_5__["AuthRole"], (authRole) => authRole.authRolePermissions),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_c = typeof _auth_role__WEBPACK_IMPORTED_MODULE_5__["AuthRole"] !== "undefined" && _auth_role__WEBPACK_IMPORTED_MODULE_5__["AuthRole"]) === "function" ? _c : Object)
], AuthRolePermission.prototype, "role", void 0);
AuthRolePermission = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["Entity"])({
        name: 'auth_role_permission'
    })
], AuthRolePermission);



/***/ }),

/***/ "./apps/dakimbo-server/src/database/entities/auth/auth-role.ts":
/*!*********************************************************************!*\
  !*** ./apps/dakimbo-server/src/database/entities/auth/auth-role.ts ***!
  \*********************************************************************/
/*! exports provided: AuthRole */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthRole", function() { return AuthRole; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base */ "./apps/dakimbo-server/src/database/entities/base.ts");
/* harmony import */ var _auth_role_permission__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth-role-permission */ "./apps/dakimbo-server/src/database/entities/auth/auth-role-permission.ts");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user */ "./apps/dakimbo-server/src/database/entities/auth/user.ts");





let AuthRole = class AuthRole extends _base__WEBPACK_IMPORTED_MODULE_2__["BaseModel"] {
};
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
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["OneToMany"])((type) => _auth_role_permission__WEBPACK_IMPORTED_MODULE_3__["AuthRolePermission"], (authRolePermission) => authRolePermission.role),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Array)
], AuthRole.prototype, "authRolePermissions", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_1__["ManyToMany"])((type) => _user__WEBPACK_IMPORTED_MODULE_4__["User"], (user) => user.roles, {
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



/***/ }),

/***/ "./apps/dakimbo-server/src/database/entities/auth/user.ts":
/*!****************************************************************!*\
  !*** ./apps/dakimbo-server/src/database/entities/auth/user.ts ***!
  \****************************************************************/
/*! exports provided: User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base */ "./apps/dakimbo-server/src/database/entities/base.ts");
/* harmony import */ var _auth_role__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth-role */ "./apps/dakimbo-server/src/database/entities/auth/auth-role.ts");
var _a;





let User = class User extends _base__WEBPACK_IMPORTED_MODULE_3__["BaseModel"] {
    constructor(props) {
        super(props);
    }
};
User.displayName = 'User';
User.relationships = [{ model: _auth_role__WEBPACK_IMPORTED_MODULE_4__["AuthRole"] }];
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_2__["Column"])(),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_1__["Length"])(4, 20),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], User.prototype, "username", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_2__["Column"])(),
    Object(class_validator__WEBPACK_IMPORTED_MODULE_1__["Length"])(4, 100),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], User.prototype, "password", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_2__["Column"])({
        nullable: true,
        length: 255
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], User.prototype, "email", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_2__["Column"])({
        nullable: true,
        default: 0
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
], User.prototype, "numSuccessfulLogin", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_2__["Column"])({
        nullable: true,
        default: 0
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
], User.prototype, "numFailedLogin", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_2__["Column"])({ nullable: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], User.prototype, "lastLoggedInDate", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_2__["Column"])({ default: false }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
], User.prototype, "isLocked", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_2__["ManyToMany"])((type) => _auth_role__WEBPACK_IMPORTED_MODULE_4__["AuthRole"], (role) => role.users, { eager: true, cascade: true }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Array)
], User.prototype, "roles", void 0);
User = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(typeorm__WEBPACK_IMPORTED_MODULE_2__["Entity"])({
        name: 'auth_user',
        orderBy: {
            username: 'ASC'
        }
    }),
    Object(typeorm__WEBPACK_IMPORTED_MODULE_2__["Unique"])(['username']),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [User])
], User);



/***/ }),

/***/ "./apps/dakimbo-server/src/database/entities/base.ts":
/*!***********************************************************!*\
  !*** ./apps/dakimbo-server/src/database/entities/base.ts ***!
  \***********************************************************/
/*! exports provided: BaseModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseModel", function() { return BaseModel; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_1__);
var _a, _b;


class BaseModel {
    constructor(props) {
        if (!props)
            return;
        Object.keys(props).forEach((prop) => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
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


/***/ }),

/***/ "./apps/dakimbo-server/src/database/entities/index.ts":
/*!************************************************************!*\
  !*** ./apps/dakimbo-server/src/database/entities/index.ts ***!
  \************************************************************/
/*! exports provided: entityMap, User, AuthAction, AuthEntity, AuthRole, AuthRolePermission */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _entity_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_entity-map */ "./apps/dakimbo-server/src/database/entities/_entity-map.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "entityMap", function() { return _entity_map__WEBPACK_IMPORTED_MODULE_0__["entityMap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "User", function() { return _entity_map__WEBPACK_IMPORTED_MODULE_0__["User"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthAction", function() { return _entity_map__WEBPACK_IMPORTED_MODULE_0__["AuthAction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthEntity", function() { return _entity_map__WEBPACK_IMPORTED_MODULE_0__["AuthEntity"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthRole", function() { return _entity_map__WEBPACK_IMPORTED_MODULE_0__["AuthRole"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthRolePermission", function() { return _entity_map__WEBPACK_IMPORTED_MODULE_0__["AuthRolePermission"]; });

/**
 * ENTITIES
 */



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









(() => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const db = new _database_database__WEBPACK_IMPORTED_MODULE_7__["Database"]();
    yield db.connect(_config__WEBPACK_IMPORTED_MODULE_9__["default"].dbOptions);
    const app = express__WEBPACK_IMPORTED_MODULE_5___default()();
    const port = process.env.port || 1337;
    // MIDDLEWARE
    app.use(cors__WEBPACK_IMPORTED_MODULE_4___default()());
    app.use(helmet__WEBPACK_IMPORTED_MODULE_6___default()());
    app.use(compression__WEBPACK_IMPORTED_MODULE_3___default()());
    app.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.urlencoded({ extended: false }));
    app.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.json());
    app.use(express__WEBPACK_IMPORTED_MODULE_5___default.a.static(__dirname + '/public'));
    app.use('/', _routes__WEBPACK_IMPORTED_MODULE_8__["default"]);
    app.get('*', (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
    });
    const server = app.listen(port, () => {
        return console.log(`Server is listening on ${port}`);
    });
    server.on('error', console.error);
}))();


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


const checkJwt = (req, res, next) => {
    // Get the jwt token from the head
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.includes('Bearer')) {
        res.status(408).send('No Authorization Header or Bearer token presented!');
        return;
    }
    const token = authHeader.split('Bearer')[1].trim();
    let jwtPayload;
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
    const { userId, username, roles } = jwtPayload;
    const newToken = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__["sign"]({ userId, username, roles }, _config__WEBPACK_IMPORTED_MODULE_1__["default"].jwtSecret, {
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
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @entities */ "./apps/dakimbo-server/src/database/entities/index.ts");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typeorm */ "typeorm");
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(typeorm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _libs_utilities_src_lib_auth_checkUserRole__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../../../libs/utilities/src/lib/auth/checkUserRole */ "./libs/utilities/src/lib/auth/checkUserRole.ts");




const checkRole = (roles) => {
    return (req, res, next) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
        // Get the user ID from previous midleware
        const id = res.locals.jwtPayload.userId;
        // Get user role from the database
        const userRepository = Object(typeorm__WEBPACK_IMPORTED_MODULE_2__["getRepository"])(_entities__WEBPACK_IMPORTED_MODULE_1__["User"]);
        let user;
        try {
            user = yield userRepository.findOneOrFail(id);
        }
        catch (id) {
            res.status(401).send();
        }
        // Check if array of authorized roles includes the user's role
        if (Object(_libs_utilities_src_lib_auth_checkUserRole__WEBPACK_IMPORTED_MODULE_3__["checkUserRole"])(user, roles))
            next();
        else
            res.status(401).send();
    });
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



const router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
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





const router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
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





const routes = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
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




const router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
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




const router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
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

const log = console.log;
console.log = function () {
    const firstParameter = arguments[0];
    const otherParameters = Array.prototype.slice.call(arguments, 1);
    log.apply(console, [`${dateFormat()} ${firstParameter}`.concat(otherParameters)]);
};
const error = console.error;
console.error = function () {
    const firstParameter = arguments[0];
    const otherParameters = Array.prototype.slice.call(arguments, 1);
    error.apply(console, [`${dateFormat()} ${firstParameter}`.concat(otherParameters)]);
};
const dateFormat = () => {
    return `[\x1b[34m${new Date().toISOString()}\x1b[0m]`;
};


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

const checkModelAllowedRoles = (model, userJwt) => {
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
const checkUserRole = (user, expectedRoles) => {
    if (!user || !expectedRoles)
        return true;
    const expectedRolesLower = expectedRoles.map((er) => er.toLowerCase().trim().split(' ').join(''));
    const userRolesLower = (user.roles || []).map((r) => r.role.toLowerCase().trim().split(' ').join(''));
    return (expectedRoles.includes('*') || userRolesLower.some((r) => expectedRolesLower.includes(r)));
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

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("class-validator");

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