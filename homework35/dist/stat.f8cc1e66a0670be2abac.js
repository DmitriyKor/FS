/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./statistics.ts":
/*!***********************!*\
  !*** ./statistics.ts ***!
  \***********************/
/***/ (() => {

eval("function createStatistics() {\n  let counter = 0;\n  let isDestroyed = false;\n  const listener = () => counter++;\n  document.addEventListener('click', listener);\n  return {\n    destroy() {\n      document.removeEventListener('click', listener);\n      isDestroyed = true;\n      return 'Statistics fully destroyed';\n    },\n    getClicks() {\n      if (isDestroyed) return 'Statistics is destroyed';\n      return counter;\n    }\n  };\n}\nwindow['statistics'] = createStatistics();\n\n//# sourceURL=webpack:///./statistics.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./statistics.ts"]();
/******/ 	
/******/ })()
;