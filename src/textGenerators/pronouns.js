import { capitalizeFirst } from '../helpers/utils';
import {_re, _ve} from './linkingVerbs.js';

export const they = (actor) => actor.pronouns.subject;
export const They = (actor) => capitalizeFirst(they(actor));

export const theyRe = (actor) => `${actor.pronouns.subject}${_re(actor)}`;
export const TheyRe = (actor) => capitalizeFirst(theyRe(actor));

export const theyVe = (actor) => `${actor.pronouns.subject}${_ve(actor)}`;
export const TheyVe = (actor) => capitalizeFirst(theyVe(actor));

export const them = (actor) => actor.pronouns.object;
export const Them = (actor) => capitalizeFirst(them(actor));

export const their = (actor) => actor.pronouns.possessive;
export const Their = (actor) => capitalizeFirst(their(actor));

export const theirs = (actor) => actor.pronouns.possessiveStrong;
export const Theirs = (actor) => capitalizeFirst(theirs(actor));

export const themself = (actor) => actor.pronouns.reflexive;
export const Themself = (actor) => capitalizeFirst(themself(actor));
