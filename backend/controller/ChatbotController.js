// // import express from "express";

// // import {
// //   RunnablePassthrough,
// //   RunnableSequence,
// // } from "langchain/schema/runnable";
// // import { createClient } from "@supabase/supabase-js";
// // import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
// // import { OpenAIEmbeddings } from "@langchain/openai";
// // import { ChatOpenAI } from "langchain/chat_models/openai";
// // import { PromptTemplate } from "@langchain/core/prompts";
// // import { StringOutputParser } from "langchain/schema/output_parser";
// // import { DataSource } from "typeorm";
// // import { SqlDatabase } from "langchain/sql_db";

// // import { createSqlAgent, SqlToolkit } from "langchain/agents/toolkits/sql";
// // import connection from "../config/dbConnection.js";

// // import { Router } from "express";
// // import dotenv from "dotenv";

// // dotenv.config();
// // const router = Router();

// // const openAIApiKey = "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";
// // const supabaseUrl = "https://awmkztjrwjqacpnxywoy.supabase.co";
// // const supabaseKey =
// //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3bWt6dGpyd2pxYWNwbnh5d295Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1ODU3NDQsImV4cCI6MjAyODE2MTc0NH0.6q_7mZ2BKAr7BfOvim9Y7Kop_RgddkN8BhMS3pLqmyg";

// // const datasource = new DataSource({
// //   type: "mysql",
// //   database: "seg",
// // });
// // const db = await SqlDatabase.fromDataSourceParams({
// //   appDataSource: datasource,
// // });

// // const llm = new ChatOpenAI({ openAIApiKey });
// // const toolkit = new SqlToolkit(db, llm);

// // //define sql tool kits
// // const sqlToolKit = new SqlToolkit(db, llm);
// // //define promps

// // const executor = createSqlAgent(llm, toolkit, {
// //   verbose: true,
// //   agent: "conversational-react-description",
// //   return_intermediate_steps: true,
// //   handle_parsing_errors: true,
// //   prompt: PromptTemplate.fromTemplate("say haha every time"),
// // });
// // const client = createClient(supabaseUrl, supabaseKey);
// // const embeddings = new OpenAIEmbeddings({ openAIApiKey });
// // const vectorStore = new SupabaseVectorStore(embeddings, {
// //   client,
// //   tableName: "documents",
// //   queryName: "match_documents",
// // });
// // const retriever = vectorStore.asRetriever();

// // //miscellaeous
// // function combineDocuments(docs) {
// //   return docs.map((doc) => doc.pageContent).join("\n\n");
// // }
// // const formatConvHistory = (messages) => {
// //   return messages
// //     .map((message) => {
// //       if (message.type === "human") {
// //         return `Human: ${message.text}`;
// //       } else if (message.type === "ai") {
// //         return `AI: ${message.text}`;
// //       }
// //       return "";
// //     })
// //     .join("\n");
// // };

// // //templates and promtps
// // const standaloneQuestionTemplate = `Given some conversation history (if any) and a question, convert the question to a standalone question.
// // conversation history: {conv_history}
// // question: {question}
// // (Don't modify if the question is a statement)
// // standalone question:`;
// // const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
// //   standaloneQuestionTemplate
// // );

// // //chaining
// // const standaloneQuestionChain = standaloneQuestionPrompt
// //   .pipe(llm)
// //   .pipe(new StringOutputParser());

// // const retrieverChain = RunnableSequence.from([
// //   (prevResult) => prevResult.standalone_question,
// //   retriever,
// //   combineDocuments,
// // ]);

// // const answerTemplate = `You have a friendly, helpful and knowledgeable AI assistant who answers questions by combining information from a given context, its own knowledge, and a database.

// // When the user makes a statement rather than asking a question, I will respond in a friendly and conversational manner, acknowledging the user's input and offering to assist further if needed. I will not assume the user is asking a database-related question unless the context clearly indicates that.

// // ------------
// // QUESTION: {question}
// // ------------
// // SQL RESPONSE: {text}

// // NATURAL LANGUAGE RESPONSE:

// // Let's start by analyzing the SQL response and formulating a natural language response:

// // Note: A book uniquely identified by book code has a ISBN (referenced to isbn table) which shows all details information such as title, publisher, author, year of the book.

// // If the question is not directly related to the database such that {text} is "I don't know", I will still do my best to provide a helpful response. I have a broad knowledge base and can engage in general conversation, offer advice, or direct the user to additional resources if needed. My goal is to be a friendly and useful assistant, no matter the nature of the user's input. But don't tell user "I dont have this information in database"

// // Next, I'll utilize my own knowledge to delve deeper into answering the question if requested by user or if the answer cannot be found in database:

// // If I'm unable to provide an answer, I'll say "I don't know, sorry."

// // The final answer is:
// // `;

// // const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

// // const answerChain = RunnableSequence.from([
// //   {
// //     question: (prevResult) => prevResult.question,
// //     text: async (prevResult) => {
// //       const q = prevResult.question;
// //       console.log(prevResult.question);
// //       const input = q;

// //       const result = await executor.invoke({ input });

// //       console.log(`Got output ${result.output}`);
// //       console.log(
// //         `Got intermediate steps ${JSON.stringify(
// //           result.intermediateSteps,
// //           null,
// //           2
// //         )}`
// //       );
// //       return result.output;
// //     },
// //   },

// //   answerPrompt,
// //   llm,
// //   new StringOutputParser(),
// // ]);

// // const chain = RunnableSequence.from([
// //   {
// //     standalone_question: standaloneQuestionChain,
// //     original_input: new RunnablePassthrough(),
// //   },
// //   {
// //     context: retrieverChain,
// //     // question: ({ original_input }) => original_input.question,
// //     question: (prev) => prev.standalone_question,

// //     conv_history: ({ original_input }) => original_input.conv_history,
// //   },
// //   answerChain,
// // ]);

// // //request
// // router.post("/", async (req, res) => {
// //   console.log(process.env.openAIApiKey);
// //   const { userQuestion, convHistory } = req.body;
// //   const question = userQuestion.trim();

// //   // Add AI response to history
// //   const response = await chain.invoke({
// //     question,
// //     conv_history: formatConvHistory(convHistory),
// //   });

// //   // Here you would process the question, interact with your AI models, and send back a response
// //   res.json({ messages: response });
// // });

// // export default router;

// import express from "express";

// import {
//   RunnablePassthrough,
//   RunnableSequence,
// } from "@langchain/core/runnables";

// import { createClient } from "@supabase/supabase-js";
// import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
// import { OpenAIEmbeddings } from "@langchain/openai";
// import { PromptTemplate } from "@langchain/core/prompts";
// import { StringOutputParser } from "@langchain/core/output_parsers";
// import {
//   ChatPromptTemplate,
//   HumanMessagePromptTemplate,
//   MessagesPlaceholder,
// } from "@langchain/core/prompts";
// import { ChatOpenAI } from "@langchain/openai";
// import { createOpenAIToolsAgent, AgentExecutor } from "langchain/agents";
// import { AIMessage } from "langchain/schema";
// import { SqlDatabase } from "langchain/sql_db";
// import { DataSource } from "typeorm";

// import { createSqlAgent, SqlToolkit } from "langchain/agents/toolkits/sql";
// import connection from "../config/dbConnection.js";

// import { Router } from "express";
// import dotenv from "dotenv";

// dotenv.config();
// const router = Router();

// const openAIApiKey = "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";
// const supabaseUrl = "https://awmkztjrwjqacpnxywoy.supabase.co";
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3bWt6dGpyd2pxYWNwbnh5d295Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1ODU3NDQsImV4cCI6MjAyODE2MTc0NH0.6q_7mZ2BKAr7BfOvim9Y7Kop_RgddkN8BhMS3pLqmyg";

// const datasource = new DataSource({
//   type: "mysql",
//   database: "vhack",
// });
// const db = await SqlDatabase.fromDataSourceParams({
//   appDataSource: datasource,
// });

// const llm = new ChatOpenAI({ openAIApiKey });

// const sqlToolKit = new SqlToolkit(db, llm);
// const tools = sqlToolKit.getTools();
// const SQL_PREFIX = `You are an agent designed to interact with a SQL database with given {schema}
// Given an input question, create a syntactically correct {dialect} query to run, then look at the results of the query and return the answer.
// Unless the user specifies a specific number of examples they wish to obtain, always limit your query to at most {top_k} results using the LIMIT clause.
// You can order the results by a relevant column to return the most interesting examples in the database.
// Never query for all the columns from a specific table, only ask for a the few relevant columns given the question.
// You have access to tools for interacting with the database.
// Only use the below tools.
// Only use the information returned by the below tools to construct your final answer.
// You MUST double check your query before executing it. If you get an error while executing a query, rewrite the query and try again.

// DO NOT make any DML statements (INSERT, UPDATE, DELETE, DROP etc.) to the database.

// Note: A book uniquely identified by book code has a ISBN (referenced to isbn table) which shows all details information such as title, publisher, author, year of the book.

// Look into tables the foreign keys referenced to, you may find many information

// If the question does not seem related to the database, just return "I don't know" as the answer.`;
// const SQL_SUFFIX = `Begin!

// Question: {input}
// Thought: I should look at the tables in the database to see what I can query.
// {agent_scratchpad}`;
// const prompt = ChatPromptTemplate.fromMessages([
//   ["system", SQL_PREFIX],
//   HumanMessagePromptTemplate.fromTemplate("{input}"),
//   new AIMessage(SQL_SUFFIX.replace("{agent_scratchpad}", "")),
//   new MessagesPlaceholder("agent_scratchpad"),
// ]);
// const newPrompt = await prompt.partial({
//   dialect: sqlToolKit.dialect,
//   top_k: "10",
//   schema: await db.getTableInfo(),
// });
// const runnableAgent = await createOpenAIToolsAgent({
//   llm,
//   tools,
//   prompt: newPrompt,
// });
// const agentExecutor = new AgentExecutor({
//   agent: runnableAgent,

//   returnIntermediateSteps: true,
//   tools,
// });

// const client = createClient(supabaseUrl, supabaseKey);
// const embeddings = new OpenAIEmbeddings({ openAIApiKey });
// const vectorStore = new SupabaseVectorStore(embeddings, {
//   client,
//   tableName: "documents",
//   queryName: "match_documents",
// });
// const retriever = vectorStore.asRetriever();

// //miscellaeous
// function combineDocuments(docs) {
//   return docs.map((doc) => doc.pageContent).join("\n\n");
// }
// const formatConvHistory = (messages) => {
//   return messages
//     .map((message) => {
//       if (message.type === "human") {
//         return `Human: ${message.text}`;
//       } else if (message.type === "ai") {
//         return `AI: ${message.text}`;
//       }
//       return "";
//     })
//     .join("\n");
// };

// //templates and promtps
// const standaloneQuestionTemplate = `Given some conversation history (if any) and a input, convert the question to a standalone question. If the input is greeting, do not convert.
// conversation history: {conv_history}
// input: {question}
// standalone question:`;
// const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
//   standaloneQuestionTemplate
// );

// //chaining
// const standaloneQuestionChain = standaloneQuestionPrompt
//   .pipe(llm)
//   .pipe(new StringOutputParser());

// const retrieverChain = RunnableSequence.from([
//   (prevResult) => prevResult.standalone_question,
//   retriever,
//   combineDocuments,
// ]);

// const answerTemplate = `You have a friendly, helpful and knowledgeable AI assistant who answers questions by combining information from a given context, its own knowledge, and a database.

// When the user makes a statement rather than asking a question, I will respond in a friendly and conversational manner, acknowledging the user's input and offering to assist further if needed. I will not assume the user is asking a database-related question unless the context clearly indicates that.

// -----------------
// QUESTION: {question}
// ---------------------
// SQL RESPONSE: {text}

// -------------------------------
// NATURAL LANGUAGE RESPONSE:

// Given the question  , Let's start by analyzing the SQL response and formulating a natural language response:

// Note: A book uniquely identified by book code has a ISBN (referenced to isbn table) which shows all details information such as title, publisher, author, year of the book.

// If the question is not directly related to the database such that SQL response is "I don't know", I will still do my best to provide a helpful response with my current knowledge. I have a broad knowledge base and can engage in general conversation, offer advice, or direct the user to additional resources if needed. My goal is to be a friendly and useful assistant, no matter the nature of the user's input. But don't tell user "I dont have this information in database"

// Next, I'll utilize my own knowledge to delve deeper into answering the question if requested by user or if the answer cannot be found in database:

// If I'm unable to provide an answer, I'll say "I don't know, sorry."

// The final answer is:
// `;

// const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

// const answerChain = RunnableSequence.from([
//   {
//     question: (prevResult) => prevResult.question,
//     text: async (prevResult) => {
//       const q = prevResult.question;
//       console.log(prevResult.question);
//       const input = q;

//       const result = await agentExecutor.invoke({ input: input });
//       console.log(await db.getTableInfo);
//       console.log(`Got output ${result.output}`);
//       console.log(
//         `Got intermediate steps ${JSON.stringify(
//           result.intermediateSteps,
//           null,
//           2
//         )}`
//       );
//       return result.output;
//     },
//     conv_history: (original_input) => original_input.conv_history,
//   },

//   answerPrompt,
//   llm,
//   new StringOutputParser(),
// ]);

// const chain = RunnableSequence.from([
//   {
//     standalone_question: standaloneQuestionChain,
//     original_input: new RunnablePassthrough(),
//   },
//   {
//     context: retrieverChain,
//     // question: ({ original_input }) => original_input.question,
//     question: (prev) => prev.standalone_question,

//     conv_history: ({ original_input }) => original_input.conv_history,
//   },
//   answerChain,
// ]);

// //request
// router.post("/", async (req, res) => {
//   console.log(process.env.openAIApiKey);
//   const { userQuestion, convHistory } = req.body;
//   const question = userQuestion.trim();

//   // Add AI response to history
//   const response = await chain.invoke({
//     question,
//     conv_history: formatConvHistory(convHistory),
//   });

//   // Here you would process the question, interact with your AI models, and send back a response
//   res.json({ messages: response });
// });

// export default router;
