"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fimtiyazsayyid%2FDocuments%2FNew%20Projects%2FNextJS%2Fone-stop%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fimtiyazsayyid%2FDocuments%2FNew%20Projects%2FNextJS%2Fone-stop&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fimtiyazsayyid%2FDocuments%2FNew%20Projects%2FNextJS%2Fone-stop%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fimtiyazsayyid%2FDocuments%2FNew%20Projects%2FNextJS%2Fone-stop&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var _Users_imtiyazsayyid_Documents_New_Projects_NextJS_one_stop_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"/Users/imtiyazsayyid/Documents/New Projects/NextJS/one-stop/app/api/auth/[...nextauth]/route.ts\",\n    nextConfigOutput,\n    userland: _Users_imtiyazsayyid_Documents_New_Projects_NextJS_one_stop_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_2__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmltdGl5YXpzYXl5aWQlMkZEb2N1bWVudHMlMkZOZXclMjBQcm9qZWN0cyUyRk5leHRKUyUyRm9uZS1zdG9wJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmltdGl5YXpzYXl5aWQlMkZEb2N1bWVudHMlMkZOZXclMjBQcm9qZWN0cyUyRk5leHRKUyUyRm9uZS1zdG9wJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUM2RDtBQUM1SDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVHQUF1RztBQUMvRztBQUNpSjs7QUFFakoiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0anMtcmFkaXgtdGVtcGxhdGUvP2NjMDYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2ltdGl5YXpzYXl5aWQvRG9jdW1lbnRzL05ldyBQcm9qZWN0cy9OZXh0SlMvb25lLXN0b3AvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL2ltdGl5YXpzYXl5aWQvRG9jdW1lbnRzL05ldyBQcm9qZWN0cy9OZXh0SlMvb25lLXN0b3AvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgaGVhZGVySG9va3MsIHN0YXRpY0dlbmVyYXRpb25CYWlsb3V0IH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCI7XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIGhlYWRlckhvb2tzLCBzdGF0aWNHZW5lcmF0aW9uQmFpbG91dCwgb3JpZ2luYWxQYXRobmFtZSwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fimtiyazsayyid%2FDocuments%2FNew%20Projects%2FNextJS%2Fone-stop%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fimtiyazsayyid%2FDocuments%2FNew%20Projects%2FNextJS%2Fone-stop&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @next-auth/prisma-adapter */ \"(rsc)/./node_modules/@next-auth/prisma-adapter/dist/index.js\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/prisma/client */ \"(rsc)/./prisma/client.ts\");\n\n\n\n\nconst authOptions = {\n    session: {\n        strategy: \"jwt\"\n    },\n    adapter: (0,_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_2__.PrismaAdapter)(_prisma_client__WEBPACK_IMPORTED_MODULE_3__[\"default\"]),\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Admin-Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\",\n                    placeholder: \"Email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\",\n                    placeholder: \"Password\"\n                }\n            },\n            async authorize (credentials, req) {\n                if (!credentials?.email || !credentials?.password) {\n                    return null;\n                }\n                // check if admin\n                const admin = await _prisma_client__WEBPACK_IMPORTED_MODULE_3__[\"default\"].admin.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (admin && credentials.password === admin.password) {\n                    return {\n                        id: admin.id.toString(),\n                        name: admin.name,\n                        email: admin.email,\n                        role: \"admin\",\n                        image: \"\"\n                    };\n                }\n                // check if teacher\n                const teacher = await _prisma_client__WEBPACK_IMPORTED_MODULE_3__[\"default\"].teacher.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (teacher && credentials.password === teacher.password) {\n                    return {\n                        id: teacher.id.toString(),\n                        name: teacher.name,\n                        email: teacher.email,\n                        role: \"teacher\",\n                        image: \"\"\n                    };\n                }\n                // check if student\n                const student = await _prisma_client__WEBPACK_IMPORTED_MODULE_3__[\"default\"].student.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (student && credentials.password === student.password) {\n                    return {\n                        id: student.id.toString(),\n                        name: student.name,\n                        email: student.email,\n                        role: \"student\",\n                        image: \"\"\n                    };\n                }\n                return null;\n            }\n        })\n    ],\n    pages: {\n        signIn: \"/login\"\n    },\n    callbacks: {\n        jwt: async ({ token })=>{\n            // if admin\n            const admin = await _prisma_client__WEBPACK_IMPORTED_MODULE_3__[\"default\"].admin.findUnique({\n                where: {\n                    email: token.email\n                }\n            });\n            if (admin) {\n                token.role = \"admin\";\n                return token;\n            }\n            // if teacher\n            const teacher = await _prisma_client__WEBPACK_IMPORTED_MODULE_3__[\"default\"].teacher.findUnique({\n                where: {\n                    email: token.email\n                }\n            });\n            if (teacher) {\n                token.role = \"teacher\";\n                return token;\n            }\n            // if student\n            const student = await _prisma_client__WEBPACK_IMPORTED_MODULE_3__[\"default\"].student.findUnique({\n                where: {\n                    email: token.email\n                }\n            });\n            if (student) {\n                token.role = \"student\";\n                return token;\n            }\n            return token;\n        },\n        session: async ({ session, token })=>{\n            session.user.role = token.role;\n            session.user.id = token.sub && parseInt(token.sub) || null;\n            return session;\n        }\n    }\n};\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQXNEO0FBQ1k7QUFDUjtBQUNyQjtBQUVyQyxNQUFNSSxjQUErQjtJQUNuQ0MsU0FBUztRQUNQQyxVQUFVO0lBQ1o7SUFDQUMsU0FBU0wsd0VBQWFBLENBQUNDLHNEQUFNQTtJQUM3QkssV0FBVztRQUNUUCwyRUFBbUJBLENBQUM7WUFDbEJRLE1BQU07WUFDTkMsYUFBYTtnQkFDWEMsT0FBTztvQkFBRUMsT0FBTztvQkFBU0MsTUFBTTtvQkFBU0MsYUFBYTtnQkFBUTtnQkFDN0RDLFVBQVU7b0JBQ1JILE9BQU87b0JBQ1BDLE1BQU07b0JBQ05DLGFBQWE7Z0JBQ2Y7WUFDRjtZQUNBLE1BQU1FLFdBQVVOLFdBQVcsRUFBRU8sR0FBRztnQkFDOUIsSUFBSSxDQUFDUCxhQUFhQyxTQUFTLENBQUNELGFBQWFLLFVBQVU7b0JBQ2pELE9BQU87Z0JBQ1Q7Z0JBRUEsaUJBQWlCO2dCQUNqQixNQUFNRyxRQUFRLE1BQU1mLHNEQUFNQSxDQUFDZSxLQUFLLENBQUNDLFVBQVUsQ0FBQztvQkFDMUNDLE9BQU87d0JBQ0xULE9BQU9ELFlBQVlDLEtBQUs7b0JBQzFCO2dCQUNGO2dCQUVBLElBQUlPLFNBQVNSLFlBQVlLLFFBQVEsS0FBS0csTUFBTUgsUUFBUSxFQUFFO29CQUNwRCxPQUFPO3dCQUNMTSxJQUFJSCxNQUFNRyxFQUFFLENBQUNDLFFBQVE7d0JBQ3JCYixNQUFNUyxNQUFNVCxJQUFJO3dCQUNoQkUsT0FBT08sTUFBTVAsS0FBSzt3QkFDbEJZLE1BQU07d0JBQ05DLE9BQU87b0JBQ1Q7Z0JBQ0Y7Z0JBRUEsbUJBQW1CO2dCQUVuQixNQUFNQyxVQUFVLE1BQU10QixzREFBTUEsQ0FBQ3NCLE9BQU8sQ0FBQ04sVUFBVSxDQUFDO29CQUM5Q0MsT0FBTzt3QkFDTFQsT0FBT0QsWUFBWUMsS0FBSztvQkFDMUI7Z0JBQ0Y7Z0JBRUEsSUFBSWMsV0FBV2YsWUFBWUssUUFBUSxLQUFLVSxRQUFRVixRQUFRLEVBQUU7b0JBQ3hELE9BQU87d0JBQ0xNLElBQUlJLFFBQVFKLEVBQUUsQ0FBQ0MsUUFBUTt3QkFDdkJiLE1BQU1nQixRQUFRaEIsSUFBSTt3QkFDbEJFLE9BQU9jLFFBQVFkLEtBQUs7d0JBQ3BCWSxNQUFNO3dCQUNOQyxPQUFPO29CQUNUO2dCQUNGO2dCQUVBLG1CQUFtQjtnQkFFbkIsTUFBTUUsVUFBVSxNQUFNdkIsc0RBQU1BLENBQUN1QixPQUFPLENBQUNQLFVBQVUsQ0FBQztvQkFDOUNDLE9BQU87d0JBQ0xULE9BQU9ELFlBQVlDLEtBQUs7b0JBQzFCO2dCQUNGO2dCQUVBLElBQUllLFdBQVdoQixZQUFZSyxRQUFRLEtBQUtXLFFBQVFYLFFBQVEsRUFBRTtvQkFDeEQsT0FBTzt3QkFDTE0sSUFBSUssUUFBUUwsRUFBRSxDQUFDQyxRQUFRO3dCQUN2QmIsTUFBTWlCLFFBQVFqQixJQUFJO3dCQUNsQkUsT0FBT2UsUUFBUWYsS0FBSzt3QkFDcEJZLE1BQU07d0JBQ05DLE9BQU87b0JBQ1Q7Z0JBQ0Y7Z0JBRUEsT0FBTztZQUNUO1FBQ0Y7S0FDRDtJQUNERyxPQUFPO1FBQ0xDLFFBQVE7SUFDVjtJQUNBQyxXQUFXO1FBQ1RDLEtBQUssT0FBTyxFQUFFQyxLQUFLLEVBQUU7WUFDbkIsV0FBVztZQUNYLE1BQU1iLFFBQVEsTUFBTWYsc0RBQU1BLENBQUNlLEtBQUssQ0FBQ0MsVUFBVSxDQUFDO2dCQUMxQ0MsT0FBTztvQkFDTFQsT0FBT29CLE1BQU1wQixLQUFLO2dCQUNwQjtZQUNGO1lBQ0EsSUFBSU8sT0FBTztnQkFDVGEsTUFBTVIsSUFBSSxHQUFHO2dCQUNiLE9BQU9RO1lBQ1Q7WUFFQSxhQUFhO1lBQ2IsTUFBTU4sVUFBVSxNQUFNdEIsc0RBQU1BLENBQUNzQixPQUFPLENBQUNOLFVBQVUsQ0FBQztnQkFDOUNDLE9BQU87b0JBQ0xULE9BQU9vQixNQUFNcEIsS0FBSztnQkFDcEI7WUFDRjtZQUNBLElBQUljLFNBQVM7Z0JBQ1hNLE1BQU1SLElBQUksR0FBRztnQkFDYixPQUFPUTtZQUNUO1lBRUEsYUFBYTtZQUNiLE1BQU1MLFVBQVUsTUFBTXZCLHNEQUFNQSxDQUFDdUIsT0FBTyxDQUFDUCxVQUFVLENBQUM7Z0JBQzlDQyxPQUFPO29CQUNMVCxPQUFPb0IsTUFBTXBCLEtBQUs7Z0JBQ3BCO1lBQ0Y7WUFDQSxJQUFJZSxTQUFTO2dCQUNYSyxNQUFNUixJQUFJLEdBQUc7Z0JBQ2IsT0FBT1E7WUFDVDtZQUVBLE9BQU9BO1FBQ1Q7UUFDQTFCLFNBQVMsT0FBTyxFQUFFQSxPQUFPLEVBQUUwQixLQUFLLEVBQUU7WUFDaEMxQixRQUFRMkIsSUFBSSxDQUFDVCxJQUFJLEdBQUdRLE1BQU1SLElBQUk7WUFDOUJsQixRQUFRMkIsSUFBSSxDQUFDWCxFQUFFLEdBQUcsTUFBT1ksR0FBRyxJQUFJQyxTQUFTSCxNQUFNRSxHQUFHLEtBQU07WUFDeEQsT0FBTzVCO1FBQ1Q7SUFDRjtBQUNGO0FBRUEsTUFBTThCLFVBQVVuQyxnREFBUUEsQ0FBQ0k7QUFFa0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0anMtcmFkaXgtdGVtcGxhdGUvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cz9jOGE0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCwgeyBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tIFwibmV4dC1hdXRoXCI7XG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFsc1wiO1xuaW1wb3J0IHsgUHJpc21hQWRhcHRlciB9IGZyb20gXCJAbmV4dC1hdXRoL3ByaXNtYS1hZGFwdGVyXCI7XG5pbXBvcnQgcHJpc21hIGZyb20gXCJAL3ByaXNtYS9jbGllbnRcIjtcblxuY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcbiAgc2Vzc2lvbjoge1xuICAgIHN0cmF0ZWd5OiBcImp3dFwiLFxuICB9LFxuICBhZGFwdGVyOiBQcmlzbWFBZGFwdGVyKHByaXNtYSksXG4gIHByb3ZpZGVyczogW1xuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xuICAgICAgbmFtZTogXCJBZG1pbi1DcmVkZW50aWFsc1wiLFxuICAgICAgY3JlZGVudGlhbHM6IHtcbiAgICAgICAgZW1haWw6IHsgbGFiZWw6IFwiRW1haWxcIiwgdHlwZTogXCJlbWFpbFwiLCBwbGFjZWhvbGRlcjogXCJFbWFpbFwiIH0sXG4gICAgICAgIHBhc3N3b3JkOiB7XG4gICAgICAgICAgbGFiZWw6IFwiUGFzc3dvcmRcIixcbiAgICAgICAgICB0eXBlOiBcInBhc3N3b3JkXCIsXG4gICAgICAgICAgcGxhY2Vob2xkZXI6IFwiUGFzc3dvcmRcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMsIHJlcSkge1xuICAgICAgICBpZiAoIWNyZWRlbnRpYWxzPy5lbWFpbCB8fCAhY3JlZGVudGlhbHM/LnBhc3N3b3JkKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBpZiBhZG1pblxuICAgICAgICBjb25zdCBhZG1pbiA9IGF3YWl0IHByaXNtYS5hZG1pbi5maW5kVW5pcXVlKHtcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChhZG1pbiAmJiBjcmVkZW50aWFscy5wYXNzd29yZCA9PT0gYWRtaW4ucGFzc3dvcmQpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IGFkbWluLmlkLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBuYW1lOiBhZG1pbi5uYW1lLFxuICAgICAgICAgICAgZW1haWw6IGFkbWluLmVtYWlsLFxuICAgICAgICAgICAgcm9sZTogXCJhZG1pblwiLFxuICAgICAgICAgICAgaW1hZ2U6IFwiXCIsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRlYWNoZXJcblxuICAgICAgICBjb25zdCB0ZWFjaGVyID0gYXdhaXQgcHJpc21hLnRlYWNoZXIuZmluZFVuaXF1ZSh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGVhY2hlciAmJiBjcmVkZW50aWFscy5wYXNzd29yZCA9PT0gdGVhY2hlci5wYXNzd29yZCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogdGVhY2hlci5pZC50b1N0cmluZygpLFxuICAgICAgICAgICAgbmFtZTogdGVhY2hlci5uYW1lLFxuICAgICAgICAgICAgZW1haWw6IHRlYWNoZXIuZW1haWwsXG4gICAgICAgICAgICByb2xlOiBcInRlYWNoZXJcIixcbiAgICAgICAgICAgIGltYWdlOiBcIlwiLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBpZiBzdHVkZW50XG5cbiAgICAgICAgY29uc3Qgc3R1ZGVudCA9IGF3YWl0IHByaXNtYS5zdHVkZW50LmZpbmRVbmlxdWUoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHN0dWRlbnQgJiYgY3JlZGVudGlhbHMucGFzc3dvcmQgPT09IHN0dWRlbnQucGFzc3dvcmQpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IHN0dWRlbnQuaWQudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIG5hbWU6IHN0dWRlbnQubmFtZSxcbiAgICAgICAgICAgIGVtYWlsOiBzdHVkZW50LmVtYWlsLFxuICAgICAgICAgICAgcm9sZTogXCJzdHVkZW50XCIsXG4gICAgICAgICAgICBpbWFnZTogXCJcIixcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBwYWdlczoge1xuICAgIHNpZ25JbjogXCIvbG9naW5cIixcbiAgfSxcbiAgY2FsbGJhY2tzOiB7XG4gICAgand0OiBhc3luYyAoeyB0b2tlbiB9KSA9PiB7XG4gICAgICAvLyBpZiBhZG1pblxuICAgICAgY29uc3QgYWRtaW4gPSBhd2FpdCBwcmlzbWEuYWRtaW4uZmluZFVuaXF1ZSh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgZW1haWw6IHRva2VuLmVtYWlsISxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgaWYgKGFkbWluKSB7XG4gICAgICAgIHRva2VuLnJvbGUgPSBcImFkbWluXCI7XG4gICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgdGVhY2hlclxuICAgICAgY29uc3QgdGVhY2hlciA9IGF3YWl0IHByaXNtYS50ZWFjaGVyLmZpbmRVbmlxdWUoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIGVtYWlsOiB0b2tlbi5lbWFpbCEsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIGlmICh0ZWFjaGVyKSB7XG4gICAgICAgIHRva2VuLnJvbGUgPSBcInRlYWNoZXJcIjtcbiAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiBzdHVkZW50XG4gICAgICBjb25zdCBzdHVkZW50ID0gYXdhaXQgcHJpc21hLnN0dWRlbnQuZmluZFVuaXF1ZSh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgZW1haWw6IHRva2VuLmVtYWlsISxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgaWYgKHN0dWRlbnQpIHtcbiAgICAgICAgdG9rZW4ucm9sZSA9IFwic3R1ZGVudFwiO1xuICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9LFxuICAgIHNlc3Npb246IGFzeW5jICh7IHNlc3Npb24sIHRva2VuIH0pID0+IHtcbiAgICAgIHNlc3Npb24udXNlci5yb2xlID0gdG9rZW4ucm9sZTtcbiAgICAgIHNlc3Npb24udXNlci5pZCA9ICh0b2tlbi5zdWIgJiYgcGFyc2VJbnQodG9rZW4uc3ViKSkgfHwgbnVsbDtcbiAgICAgIHJldHVybiBzZXNzaW9uO1xuICAgIH0sXG4gIH0sXG59O1xuXG5jb25zdCBoYW5kbGVyID0gTmV4dEF1dGgoYXV0aE9wdGlvbnMpO1xuXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH07XG4iXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJDcmVkZW50aWFsc1Byb3ZpZGVyIiwiUHJpc21hQWRhcHRlciIsInByaXNtYSIsImF1dGhPcHRpb25zIiwic2Vzc2lvbiIsInN0cmF0ZWd5IiwiYWRhcHRlciIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsInJlcSIsImFkbWluIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiaWQiLCJ0b1N0cmluZyIsInJvbGUiLCJpbWFnZSIsInRlYWNoZXIiLCJzdHVkZW50IiwicGFnZXMiLCJzaWduSW4iLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsInVzZXIiLCJzdWIiLCJwYXJzZUludCIsImhhbmRsZXIiLCJHRVQiLCJQT1NUIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./prisma/client.ts":
/*!**************************!*\
  !*** ./prisma/client.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prismaClientSingleton = ()=>{\n    return new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n};\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? prismaClientSingleton();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9wcmlzbWEvY2xpZW50LnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxNQUFNQyx3QkFBd0I7SUFDNUIsT0FBTyxJQUFJRCx3REFBWUE7QUFDekI7QUFJQSxNQUFNRSxrQkFBa0JDO0FBSXhCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJSDtBQUV6QyxpRUFBZUcsTUFBTUEsRUFBQztBQUV0QixJQUFJQyxJQUFxQyxFQUFFSCxnQkFBZ0JFLE1BQU0sR0FBR0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0anMtcmFkaXgtdGVtcGxhdGUvLi9wcmlzbWEvY2xpZW50LnRzP2RiNjQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XG5cbmNvbnN0IHByaXNtYUNsaWVudFNpbmdsZXRvbiA9ICgpID0+IHtcbiAgcmV0dXJuIG5ldyBQcmlzbWFDbGllbnQoKTtcbn07XG5cbnR5cGUgUHJpc21hQ2xpZW50U2luZ2xldG9uID0gUmV0dXJuVHlwZTx0eXBlb2YgcHJpc21hQ2xpZW50U2luZ2xldG9uPjtcblxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsVGhpcyBhcyB1bmtub3duIGFzIHtcbiAgcHJpc21hOiBQcmlzbWFDbGllbnRTaW5nbGV0b24gfCB1bmRlZmluZWQ7XG59O1xuXG5jb25zdCBwcmlzbWEgPSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID8/IHByaXNtYUNsaWVudFNpbmdsZXRvbigpO1xuXG5leHBvcnQgZGVmYXVsdCBwcmlzbWE7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBwcmlzbWE7XG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwicHJpc21hQ2xpZW50U2luZ2xldG9uIiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYSIsInByb2Nlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./prisma/client.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/uuid","vendor-chunks/oauth","vendor-chunks/@panva","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/oidc-token-hash","vendor-chunks/preact","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/@next-auth"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fimtiyazsayyid%2FDocuments%2FNew%20Projects%2FNextJS%2Fone-stop%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fimtiyazsayyid%2FDocuments%2FNew%20Projects%2FNextJS%2Fone-stop&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();