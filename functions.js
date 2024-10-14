/*
  Project: Hack Heroes
  File: applyBulmaClasses.js
  Description: Helper functions for Hack Heroes
  Author: Chris Cooper
  License: GNU AGPLv3
  -----------------------------------------------------------
  This JavaScript file is part of the Hack Heroes project.
*/

/**
 * Delays execution for a specified amount of time.
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise} A promise that resolves after the specified delay.
 */
const xaDelay = ms => new Promise(res => setTimeout(res, ms));

/**
 * Loads and parses a JSON file from a given URL.
 * @param {string} file - The URL of the JSON file to load.
 * @returns {Promise<object>} A promise that resolves to the parsed JSON data.
 * @throws {Error} If the response from the server is not OK (status code outside 200-299).
 */
async function xaLoadJSON(file) {
    // Fetch the JSON file from the given URL
    const response = await fetch(file);
    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Parse the response as JSON
    const data = response.json();
    // Return the parsed JSON data
    return data;
}

/**
 * Loads a Markdown file from a given URL and converts it to HTML.
 * @param {string} file - The URL of the Markdown file to load.
 * @returns {Promise<string>} A promise that resolves to the HTML content converted from the Markdown file.
 * @throws {Error} If there is an issue with fetching or processing the Markdown file.
 */
async function xaLoadMD(file) {
    try {
    const response = await fetch(file);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const markdownText = await response.text();
    // Use Marked to convert MD to HTML
    const htmlContent = marked.parse(markdownText);
    return applyBulmaClasses(htmlContent);
    } catch (error) {
    console.error('Error loading markdown file:', error);
    }
}

/**
 * Generates a SHA-256 hash for a given message.
 * @param {string} message - The input string to hash.
 * @returns {Promise<string>} A promise that resolves to the hex-encoded SHA-256 hash.
 */
async function xaHash(message) {
    const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8); // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
    return hashHex;
}

/**
 * Converts an absolute URL to a relative URL if the URL belongs to the same origin.
 * @param {string} absoluteURL - The absolute URL to process.
 * @returns {string} The relative URL if it belongs to the same origin, otherwise the absolute URL.
 */
function xaRelUrl(absoluteURL) {
    // Get the current page's origin (protocol + domain + port)
    const currentOrigin = window.location.origin;

    try {
    // Create a URL object from the provided absolute URL
    const urlObj = new URL(absoluteURL);

    // If the URL is from the same origin, return the relative path + query
    if (urlObj.origin === currentOrigin) {
        return urlObj.pathname + urlObj.search;
    }

    // If it's not from the same origin, return the full absolute URL
    return absoluteURL;
    } catch (error) {
    console.error("Invalid URL:", absoluteURL);
    return absoluteURL; // If URL is invalid, return the input as-is
    }
}

/**
 * Compares the provided answer with the expected hashed answers for a given challenge.
 * @param {object} challenge - The challenge object containing the expected answers and validation rules.
 * @param {string} answer - The user-provided answer.
 * @returns {Promise<boolean>} A promise that resolves to true if the answer matches one of the expected answers, false otherwise.
 */
function xaCompareAnswer(challenge,answer) {
    if (!challenge.answerCaseSensitive) { answer = answer.toLowerCase(); }
    if (challenge.answerAlphaNumeric) { answer = answer.replace(/[^a-zA-Z0-9]/g, ''); }
    return xaHash(answer).then((hashedAnswer) => {
        console.log('Comparing answer: ' + hashedAnswer);
        return challenge.answers.includes(hashedAnswer);
    });
}

/**
 * Generates a unique detector token based on a hashed input value.
 * @param {string} value - The value to generate the token from.
 * @returns {Promise<string>} A promise that resolves to a unique 8 character token.
 */
function xaDetectorToken(value) {
    return xaHash(value).then((hashedAnswer) => {
        token = hashedAnswer.slice(0,8);
        console.log('Detector token: ' + token);
        return token;
    });
}

/**
 * Escapes HTML special characters in a string.
 * @param {string} value - The string to escape.
 * @returns {string} The escaped string where special characters are replaced by HTML entities.
 */
function he(value) {
    return value.replace(/[\u00A0-\u9999<>\&]/g, i => '&#'+i.charCodeAt(0)+';');
}