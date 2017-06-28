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

enum PlayerNameCheckResult
{
	Ok,

	MinimumLengthError,
	MaximumLengthError,

	UnavaliableLetter,

	SpacesInName,
	InvalidWord,
	BannedWords,
	MultipleLanguages,

	NotAcceptableName,
}

module.exports = PlayerNameCheckResult;
