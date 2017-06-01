/*********************************************************
*
*  Copyright © 2017, Raybit Games.
*
*  All Rights Reserved.
*
*  Redistribution and use in source and binary forms,
*  with or without modification,
*  is permitted only for authors.
*
*********************************************************/

process._debugProcess( process.pid );

// Костыль
global.Color = function object() {};

let Server = require( "./bin/Server" ).default;

new Server();
