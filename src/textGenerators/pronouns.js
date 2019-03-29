import { capitalizeFirst } from '../helpers/utils';
import { _re, _ve } from './linkingVerbs';

export const they = actor => actor.grammar.pronouns.subject;
export const They = actor => capitalizeFirst(they(actor));

export const they_re = actor => `${actor.grammar.pronouns.subject}${
  _re(actor)}`;
export const They_re = actor => capitalizeFirst(they_re(actor));

export const they_ve = actor => `${actor.grammar.pronouns.subject}${
  _ve(actor)}`;
export const They_ve = actor => capitalizeFirst(they_re(actor));

export const them = actor => actor.grammar.pronouns.object;
export const Them = actor => capitalizeFirst(them(actor));

export const their = actor => actor.grammar.pronouns.possessive;
export const Their = actor => capitalizeFirst(their(actor));

export const theirs = actor => actor.grammar.pronouns.possessiveStrong;
export const Theirs = actor => capitalizeFirst(theirs(actor));

export const themself = actor => actor.grammar.pronouns.reflexive;
export const Themself = actor => capitalizeFirst(themself(actor));
