import admin from './firebase.js';

import { generateKeywordPhrasesPrompt, generateQuestionPrompt, generateEventPrompt, generateBrainstormPrompt } from './prompts.js';
import { Client } from '@elastic/elasticsearch';
import { createDoc, searchKeyPhrase } from './rag.js';
import { askOpenAI } from './openAI.js';

const db = admin.firestore();

async function getJournals(user) {
    try {
        let journals = await db.collection('journals').where('user', '==', user).get();
        let journalsArray = [];
        journals.forEach(journal => {
            journalsArray.push(journal.data());
        });
        return journalsArray;
    }
    catch (error) {
        console.log("error with getting journals");
        console.log(error);
    }
}

// creates a string with all previous journal entries
export async function preprocessJournalsLLM(userId) {
    const journals = await getJournals(userId);
    // between each journal should be the title of the entry as well
    const journalString = journals.map(journal => `${journal.title}\n${journal.text}`).join("\n\n");
    return ` ` + journalString;
}

export async function prepareUserInfo(userId){
    try {
        const userDoc = await db.collection('users').doc(userId).get();
        const user = userDoc.data();
        userInfo = `User Info. name: ${user.name}, date of birth: ${user.dob}, pronouns: ${user.pronouns}, city: ${user.city}, interests: ${user.interests}, bio: ${user.bio}`;
        return userInfo;
    }
    catch (error) {
        console.log("error with getting user info");
    }
}

export async function getUserBrainstormPrompt(userId){
    const userInfo = await prepareUserInfo(userId);
    const journalString = await preprocessJournalsLLM(userId);
    const prompt = generateBrainstormPrompt + "\n\n" + userInfo + "\n\n" + "User journal entries:\n" + journalString;
    return prompt;
}