// Domain models

/**
 * @typedef {Object} Contestant
 * @property {string} id
 * @property {string} name
 * @property {string} model
 * @property {string} systemPrompt
 */

/**
 * @typedef {Object} Message
 * @property {string} id
 * @property {string} authorId
 * @property {'system'|'user'|'assistant'} role
 * @property {string} content
 * @property {number} turn
 * @property {number} ts
 */

/**
 * @typedef {Object} Match
 * @property {string} id
 * @property {Contestant[]} contestants
 * @property {string} starter
 * @property {number} turnsMax
 * @property {'idle'|'running'|'paused'|'done'} status
 */

// Factory functions

/**
 *
 * @param {string} name
 * @param {string} model
 * @param {string} systemPrompt
 * @returns {Contestant}
 */
export function createContestant(name, model, systemPrompt) {
  return { id: crypto.randomUUID(), name, model, systemPrompt };
}

/**
 *
 * @param {string} authorId
 * @param {string} role
 * @param {string} content
 * @param {number} turn
 * @returns
 */
export function createMessage(authorId, role, content, turn) {
  return {
    id: crypto.randomUUID(),
    authorId,
    role,
    content,
    turn,
    timeStamp: Date.now(),
  };
}

/**
 *
 * @param {Contestant[]} contestants
 * @param {string} starter
 * @param {number} turnsMax
 * @returns
 */
export function createMatch(contestants, starter, turnsMax) {
  return {
    id: crypto.randomUUID(),
    contestants,
    starter,
    turnsMax,
    status: 'idle',
  };
}
