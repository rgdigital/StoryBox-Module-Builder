/*
 * Storybox Taskrunner Definition
 * @constructor
 */

/*
 * Dependancies
 */
var requireDir = require('require-dir');

/*
 * Storybox Taskrunner
 */
requireDir('./system/server/gulp/', { recurse: true });