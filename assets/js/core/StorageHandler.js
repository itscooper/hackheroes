/*
  Project: Hack Heroes
  File: StorageHandler.js
  Description: Class for handling storage for all challenges
  Author: Chris Cooper
  License: GNU AGPLv3
  -----------------------------------------------------------
  This JavaScript file is part of the Hack Heroes project.
*/

class StorageHandler {
    constructor(challengeID) {
        this.storageKey = 'state';
        this.challengeID = challengeID; // Set the challengeID when the class is instantiated
    }

    // Retrieve all challenge data or create initial structure if not present
    getAllChallenges() {
        return JSON.parse(localStorage.getItem(this.storageKey)) || {};
    }

    // Save all challenges back to localStorage
    saveAllChallenges(challenges) {
        localStorage.setItem(this.storageKey, JSON.stringify(challenges));
    }

    // Get data for the current challenge ID
    getChallengeData() {
        let challenges = this.getAllChallenges();
        if (!challenges[this.challengeID]) {
            challenges[this.challengeID] = { hintsRead: [], answer: '' };
            this.saveAllChallenges(challenges);
        }
        return challenges[this.challengeID];
    }

    // Save updated data for the current challenge ID
    saveChallengeData(data) {
        let challenges = this.getAllChallenges();
        challenges[this.challengeID] = data;
        this.saveAllChallenges(challenges);
    }

    // Get the answer for the current challenge
    getAnswer() {
        let challengeData = this.getChallengeData();
        return challengeData.answer;
    }

    // Set the answer for the current challenge
    setAnswer(answer) {
        let challengeData = this.getChallengeData();
        challengeData.answer = answer;
        this.saveChallengeData(challengeData);
    }

    // Get the hintsRead array for the current challenge
    getHintsRead() {
        let challengeData = this.getChallengeData();
        return challengeData.hintsRead;
    }

    // Add a hint to the hintsRead array for the current challenge
    addHintRead(hintNumber) {
        let challengeData = this.getChallengeData();
        if (!challengeData.hintsRead.includes(hintNumber)) {
            challengeData.hintsRead.push(hintNumber);
            this.saveChallengeData(challengeData);
        }
    }

    // Remove a hint from the hintsRead array for the current challenge
    removeHintRead(hintNumber) {
        let challengeData = this.getChallengeData();
        challengeData.hintsRead = challengeData.hintsRead.filter(hint => hint !== hintNumber);
        this.saveChallengeData(challengeData);
    }

    // Overwrite the entire hintsRead array for the current challenge
    setHintsRead(hintsArray) {
        let challengeData = this.getChallengeData();
        challengeData.hintsRead = hintsArray;
        this.saveChallengeData(challengeData);
    }

    // Erase all challenge data from localStorage
    clearAllData() {
        localStorage.removeItem(this.storageKey);
    }
}

// // Example usage
// const store = new StorageManager('challenge1');

// // Set an answer for the current challenge
// store.setAnswer('my answer');
