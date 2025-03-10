import { OpenAI } from "openai";
import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../secrets/.env') });

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})


const elasticClient = new Client({
    node: process.env.ELASTIC_ENDPOINT ?? "",
    auth: {
        apiKey: process.env.ELASTIC_API_ENTRIES ?? "",
    }
});

async function getEmbeddings(text){      
    try{
        const result = await openai.embeddings.create({
            input: text,
            model: "text-embedding-3-small",
        });
        
        const openAIEmbedding = result.data[0].embedding;
        // Handle the result
        return openAIEmbedding;
    } catch (error) {
        console.log("error with getting embedding");
        console.log(error);
    }
    
}

export async function createDoc(firebaseId, text, userId){
    const embeddingResponse = await getEmbeddings(text);
    console.log("gotten embedding: ", embeddingResponse);
    const documentWithEmbedding = {
        text: text,
        embedding: embeddingResponse,
        id: firebaseId,
        userId: userId,
    };

    console.log("document with embedding:");
    console.log(documentWithEmbedding);

    try {
        const res = await elasticClient.index({
            index: "journals2",
            document: documentWithEmbedding,
        });
    }
    catch (error) {
        console.log("error with creating new vector in elastic");
        console.log(error);
    }
    console.log("entry created successfully!");
}


export async function searchKeyPhrase(keyphrase, threshold, userId) {
    const keyphraseVector = await getEmbeddings(keyphrase);
    try {
        const searchResponse = await elasticClient.search({
            index: "journals2",
            body: {
                query: {
                    script_score: {
                        query: {
                            bool: {
                                filter: [
                                    { term: { userId: userId } }
                                ]
                            }
                            // bool: {
                            //     must: [
                            //         { term: { userId: userId } },
                            //         { exists: { field: "embedding" } }
                            //     ]
                            // }
                        },
                        script: {
                            source: "cosineSimilarity(params.query_vector, 'embedding')",
                            params: { query_vector: keyphraseVector }
                        }
                    }
                },
                size: 1  // Limit to top 5 most similar results
            }
        });

        const hits = searchResponse.hits.hits;
        console.log("Number of hits:", hits.length);
        if (hits.length == 0) {
            return;
        }

        const journals = hits.map(hit => ({
            ...hit._source,
            score: hit._score
        }));
        
        // find if sim score is > threshold
        if (journals && journals[0].score > threshold){
            console.log("Found journal with score above threshold");
            return journals[0].id;
        }
        else{
            console.log("sim score below threshold", journals[0].score);
            return;
        }

    } catch(error) {
        console.error('Search error:', error);
    }
}