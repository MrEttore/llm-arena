// Domain models

/**
 * @typedef {Object} Contestant
 * @property {string} id
 * @property {string} name
 * @property {string} model
 * @property {string} systemPrompt
 * @property {ApiMessage[]} messages
 */

/**
 * @typedef {Object} ApiMessage
 * @property {'system'|'user'|'assistant'} role
 * @property {string} content
 */

/**
 * @typedef {Object} ChatMessage
 * @property {string} id
 * @property {string} authorId
 * @property {string} content
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
  return { id: crypto.randomUUID(), name, model, systemPrompt, messages: [] };
}

/**
 *

 * @param {string} role
 * @param {string} content
 * @returns {ApiMessage}
 */
export function createApiMessage(role, content) {
  return {
    role,
    content,
  };
}

/**
 *
 * @param {string} authorId
 * @param {string} content
 * @returns {ChatMessage}
 */
export function createChatMessage(authorId, content) {
  return {
    id: crypto.randomUUID(),
    authorId,
    content,
    timeStamp: Date.now(),
  };
}
