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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @next-auth/prisma-adapter */ \"(rsc)/./node_modules/@next-auth/prisma-adapter/dist/index.js\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/prisma/client */ \"(rsc)/./prisma/client.ts\");\n\n\n\n\nconst authOptions = {\n    session: {\n        strategy: \"jwt\"\n    },\n    adapter: (0,_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_2__.PrismaAdapter)(_prisma_client__WEBPACK_IMPORTED_MODULE_3__[\"default\"]),\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Admin-Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\",\n                    placeholder: \"Email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\",\n                    placeholder: \"Password\"\n                }\n            },\n            async authorize (credentials, req) {\n                // if (!credentials?.email || !credentials?.password) {\n                //   return null;\n                // }\n                // // check if admin\n                // const admin = await prisma.admin.findUnique({\n                //   where: {\n                //     email: credentials.email,\n                //   },\n                // });\n                // if (admin && credentials.password === admin.password) {\n                //   return {\n                //     id: admin.id.toString(),\n                //     name: admin.name,\n                //     email: admin.email,\n                //     role: \"admin\",\n                //     image: \"\",\n                //   };\n                // }\n                // // check if teacher\n                // const teacher = await prisma.teacher.findUnique({\n                //   where: {\n                //     email: credentials.email,\n                //   },\n                // });\n                // if (teacher && credentials.password === teacher.password) {\n                //   return {\n                //     id: teacher.id.toString(),\n                //     name: teacher.name,\n                //     email: teacher.email,\n                //     role: \"teacher\",\n                //     image: \"\",\n                //   };\n                // }\n                // // check if student\n                // const student = await prisma.student.findUnique({\n                //   where: {\n                //     email: credentials.email,\n                //   },\n                // });\n                // if (student && credentials.password === student.password) {\n                //   return {\n                //     id: student.id.toString(),\n                //     name: student.name,\n                //     email: student.email,\n                //     role: \"student\",\n                //     image: \"\",\n                //   };\n                // }\n                return null;\n            }\n        })\n    ],\n    pages: {\n        signIn: \"/login\"\n    },\n    callbacks: {\n    }\n};\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQXNEO0FBQ1k7QUFDUjtBQUNyQjtBQUVyQyxNQUFNSSxjQUErQjtJQUNuQ0MsU0FBUztRQUNQQyxVQUFVO0lBQ1o7SUFDQUMsU0FBU0wsd0VBQWFBLENBQUNDLHNEQUFNQTtJQUM3QkssV0FBVztRQUNUUCwyRUFBbUJBLENBQUM7WUFDbEJRLE1BQU07WUFDTkMsYUFBYTtnQkFDWEMsT0FBTztvQkFBRUMsT0FBTztvQkFBU0MsTUFBTTtvQkFBU0MsYUFBYTtnQkFBUTtnQkFDN0RDLFVBQVU7b0JBQ1JILE9BQU87b0JBQ1BDLE1BQU07b0JBQ05DLGFBQWE7Z0JBQ2Y7WUFDRjtZQUNBLE1BQU1FLFdBQVVOLFdBQVcsRUFBRU8sR0FBRztnQkFDOUIsdURBQXVEO2dCQUN2RCxpQkFBaUI7Z0JBQ2pCLElBQUk7Z0JBRUosb0JBQW9CO2dCQUNwQixnREFBZ0Q7Z0JBQ2hELGFBQWE7Z0JBQ2IsZ0NBQWdDO2dCQUNoQyxPQUFPO2dCQUNQLE1BQU07Z0JBRU4sMERBQTBEO2dCQUMxRCxhQUFhO2dCQUNiLCtCQUErQjtnQkFDL0Isd0JBQXdCO2dCQUN4QiwwQkFBMEI7Z0JBQzFCLHFCQUFxQjtnQkFDckIsaUJBQWlCO2dCQUNqQixPQUFPO2dCQUNQLElBQUk7Z0JBRUosc0JBQXNCO2dCQUV0QixvREFBb0Q7Z0JBQ3BELGFBQWE7Z0JBQ2IsZ0NBQWdDO2dCQUNoQyxPQUFPO2dCQUNQLE1BQU07Z0JBRU4sOERBQThEO2dCQUM5RCxhQUFhO2dCQUNiLGlDQUFpQztnQkFDakMsMEJBQTBCO2dCQUMxQiw0QkFBNEI7Z0JBQzVCLHVCQUF1QjtnQkFDdkIsaUJBQWlCO2dCQUNqQixPQUFPO2dCQUNQLElBQUk7Z0JBRUosc0JBQXNCO2dCQUV0QixvREFBb0Q7Z0JBQ3BELGFBQWE7Z0JBQ2IsZ0NBQWdDO2dCQUNoQyxPQUFPO2dCQUNQLE1BQU07Z0JBRU4sOERBQThEO2dCQUM5RCxhQUFhO2dCQUNiLGlDQUFpQztnQkFDakMsMEJBQTBCO2dCQUMxQiw0QkFBNEI7Z0JBQzVCLHVCQUF1QjtnQkFDdkIsaUJBQWlCO2dCQUNqQixPQUFPO2dCQUNQLElBQUk7Z0JBRUosT0FBTztZQUNUO1FBQ0Y7S0FDRDtJQUNEQyxPQUFPO1FBQ0xDLFFBQVE7SUFDVjtJQUNBQyxXQUFXO0lBdUNYO0FBQ0Y7QUFFQSxNQUFNQyxVQUFVckIsZ0RBQVFBLENBQUNJO0FBRWtCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dGpzLXJhZGl4LXRlbXBsYXRlLy4vYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHM/YzhhNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGgsIHsgTmV4dEF1dGhPcHRpb25zIH0gZnJvbSBcIm5leHQtYXV0aFwiO1xuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHNcIjtcbmltcG9ydCB7IFByaXNtYUFkYXB0ZXIgfSBmcm9tIFwiQG5leHQtYXV0aC9wcmlzbWEtYWRhcHRlclwiO1xuaW1wb3J0IHByaXNtYSBmcm9tIFwiQC9wcmlzbWEvY2xpZW50XCI7XG5cbmNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XG4gIHNlc3Npb246IHtcbiAgICBzdHJhdGVneTogXCJqd3RcIixcbiAgfSxcbiAgYWRhcHRlcjogUHJpc21hQWRhcHRlcihwcmlzbWEpLFxuICBwcm92aWRlcnM6IFtcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcbiAgICAgIG5hbWU6IFwiQWRtaW4tQ3JlZGVudGlhbHNcIixcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiBcIkVtYWlsXCIsIHR5cGU6IFwiZW1haWxcIiwgcGxhY2Vob2xkZXI6IFwiRW1haWxcIiB9LFxuICAgICAgICBwYXNzd29yZDoge1xuICAgICAgICAgIGxhYmVsOiBcIlBhc3N3b3JkXCIsXG4gICAgICAgICAgdHlwZTogXCJwYXNzd29yZFwiLFxuICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlBhc3N3b3JkXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzLCByZXEpIHtcbiAgICAgICAgLy8gaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkge1xuICAgICAgICAvLyAgIHJldHVybiBudWxsO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gLy8gY2hlY2sgaWYgYWRtaW5cbiAgICAgICAgLy8gY29uc3QgYWRtaW4gPSBhd2FpdCBwcmlzbWEuYWRtaW4uZmluZFVuaXF1ZSh7XG4gICAgICAgIC8vICAgd2hlcmU6IHtcbiAgICAgICAgLy8gICAgIGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCxcbiAgICAgICAgLy8gICB9LFxuICAgICAgICAvLyB9KTtcblxuICAgICAgICAvLyBpZiAoYWRtaW4gJiYgY3JlZGVudGlhbHMucGFzc3dvcmQgPT09IGFkbWluLnBhc3N3b3JkKSB7XG4gICAgICAgIC8vICAgcmV0dXJuIHtcbiAgICAgICAgLy8gICAgIGlkOiBhZG1pbi5pZC50b1N0cmluZygpLFxuICAgICAgICAvLyAgICAgbmFtZTogYWRtaW4ubmFtZSxcbiAgICAgICAgLy8gICAgIGVtYWlsOiBhZG1pbi5lbWFpbCxcbiAgICAgICAgLy8gICAgIHJvbGU6IFwiYWRtaW5cIixcbiAgICAgICAgLy8gICAgIGltYWdlOiBcIlwiLFxuICAgICAgICAvLyAgIH07XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyAvLyBjaGVjayBpZiB0ZWFjaGVyXG5cbiAgICAgICAgLy8gY29uc3QgdGVhY2hlciA9IGF3YWl0IHByaXNtYS50ZWFjaGVyLmZpbmRVbmlxdWUoe1xuICAgICAgICAvLyAgIHdoZXJlOiB7XG4gICAgICAgIC8vICAgICBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwsXG4gICAgICAgIC8vICAgfSxcbiAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgLy8gaWYgKHRlYWNoZXIgJiYgY3JlZGVudGlhbHMucGFzc3dvcmQgPT09IHRlYWNoZXIucGFzc3dvcmQpIHtcbiAgICAgICAgLy8gICByZXR1cm4ge1xuICAgICAgICAvLyAgICAgaWQ6IHRlYWNoZXIuaWQudG9TdHJpbmcoKSxcbiAgICAgICAgLy8gICAgIG5hbWU6IHRlYWNoZXIubmFtZSxcbiAgICAgICAgLy8gICAgIGVtYWlsOiB0ZWFjaGVyLmVtYWlsLFxuICAgICAgICAvLyAgICAgcm9sZTogXCJ0ZWFjaGVyXCIsXG4gICAgICAgIC8vICAgICBpbWFnZTogXCJcIixcbiAgICAgICAgLy8gICB9O1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gLy8gY2hlY2sgaWYgc3R1ZGVudFxuXG4gICAgICAgIC8vIGNvbnN0IHN0dWRlbnQgPSBhd2FpdCBwcmlzbWEuc3R1ZGVudC5maW5kVW5pcXVlKHtcbiAgICAgICAgLy8gICB3aGVyZToge1xuICAgICAgICAvLyAgICAgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsLFxuICAgICAgICAvLyAgIH0sXG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIC8vIGlmIChzdHVkZW50ICYmIGNyZWRlbnRpYWxzLnBhc3N3b3JkID09PSBzdHVkZW50LnBhc3N3b3JkKSB7XG4gICAgICAgIC8vICAgcmV0dXJuIHtcbiAgICAgICAgLy8gICAgIGlkOiBzdHVkZW50LmlkLnRvU3RyaW5nKCksXG4gICAgICAgIC8vICAgICBuYW1lOiBzdHVkZW50Lm5hbWUsXG4gICAgICAgIC8vICAgICBlbWFpbDogc3R1ZGVudC5lbWFpbCxcbiAgICAgICAgLy8gICAgIHJvbGU6IFwic3R1ZGVudFwiLFxuICAgICAgICAvLyAgICAgaW1hZ2U6IFwiXCIsXG4gICAgICAgIC8vICAgfTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgcGFnZXM6IHtcbiAgICBzaWduSW46IFwiL2xvZ2luXCIsXG4gIH0sXG4gIGNhbGxiYWNrczoge1xuICAgIC8vIGp3dDogYXN5bmMgKHsgdG9rZW4gfSkgPT4ge1xuICAgIC8vICAgLy8gaWYgYWRtaW5cbiAgICAvLyAgIGNvbnN0IGFkbWluID0gYXdhaXQgcHJpc21hLmFkbWluLmZpbmRVbmlxdWUoe1xuICAgIC8vICAgICB3aGVyZToge1xuICAgIC8vICAgICAgIGVtYWlsOiB0b2tlbi5lbWFpbCEsXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICB9KTtcbiAgICAvLyAgIGlmIChhZG1pbikge1xuICAgIC8vICAgICB0b2tlbi5yb2xlID0gXCJhZG1pblwiO1xuICAgIC8vICAgICByZXR1cm4gdG9rZW47XG4gICAgLy8gICB9XG4gICAgLy8gICAvLyBpZiB0ZWFjaGVyXG4gICAgLy8gICBjb25zdCB0ZWFjaGVyID0gYXdhaXQgcHJpc21hLnRlYWNoZXIuZmluZFVuaXF1ZSh7XG4gICAgLy8gICAgIHdoZXJlOiB7XG4gICAgLy8gICAgICAgZW1haWw6IHRva2VuLmVtYWlsISxcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgIH0pO1xuICAgIC8vICAgaWYgKHRlYWNoZXIpIHtcbiAgICAvLyAgICAgdG9rZW4ucm9sZSA9IFwidGVhY2hlclwiO1xuICAgIC8vICAgICByZXR1cm4gdG9rZW47XG4gICAgLy8gICB9XG4gICAgLy8gICAvLyBpZiBzdHVkZW50XG4gICAgLy8gICBjb25zdCBzdHVkZW50ID0gYXdhaXQgcHJpc21hLnN0dWRlbnQuZmluZFVuaXF1ZSh7XG4gICAgLy8gICAgIHdoZXJlOiB7XG4gICAgLy8gICAgICAgZW1haWw6IHRva2VuLmVtYWlsISxcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgIH0pO1xuICAgIC8vICAgaWYgKHN0dWRlbnQpIHtcbiAgICAvLyAgICAgdG9rZW4ucm9sZSA9IFwic3R1ZGVudFwiO1xuICAgIC8vICAgICByZXR1cm4gdG9rZW47XG4gICAgLy8gICB9XG4gICAgLy8gICByZXR1cm4gdG9rZW47XG4gICAgLy8gfSxcbiAgICAvLyBzZXNzaW9uOiBhc3luYyAoeyBzZXNzaW9uLCB0b2tlbiB9KSA9PiB7XG4gICAgLy8gICBzZXNzaW9uLnVzZXIucm9sZSA9IHRva2VuLnJvbGU7XG4gICAgLy8gICBzZXNzaW9uLnVzZXIuaWQgPSAodG9rZW4uc3ViICYmIHBhcnNlSW50KHRva2VuLnN1YikpIHx8IG51bGw7XG4gICAgLy8gICByZXR1cm4gc2Vzc2lvbjtcbiAgICAvLyB9LFxuICB9LFxufTtcblxuY29uc3QgaGFuZGxlciA9IE5leHRBdXRoKGF1dGhPcHRpb25zKTtcblxuZXhwb3J0IHsgaGFuZGxlciBhcyBHRVQsIGhhbmRsZXIgYXMgUE9TVCB9O1xuIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiQ3JlZGVudGlhbHNQcm92aWRlciIsIlByaXNtYUFkYXB0ZXIiLCJwcmlzbWEiLCJhdXRoT3B0aW9ucyIsInNlc3Npb24iLCJzdHJhdGVneSIsImFkYXB0ZXIiLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBsYWNlaG9sZGVyIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJyZXEiLCJwYWdlcyIsInNpZ25JbiIsImNhbGxiYWNrcyIsImhhbmRsZXIiLCJHRVQiLCJQT1NUIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

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