import {
  GoogleGenAI,
} from '@google/genai';
import mime from 'mime';
import { writeFile } from 'fs';
import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { eq } from 'drizzle-orm';

const PROMPT = `Generate Learning Course depends on following details. In which Make sure to add Course Name,
Description, Course Banner Image Prompt (Create a modern, flat-style 2D digital illustration representing
user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. 
Add symbolic elements related to user Course, like sticky notes, design components,
and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. 
The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user
Course) for Course Banner in 3d format Chapter Name,, Topic under each chapters, Duration for each chapters etc, in JSON format only

Schema:
{
    "course": {
        "name": "string",
        "description": "string",
        "category": "string",
        "level": "string",
        "includeVideo": "boolean",
        "noOfChapters": "number",
        "chapters":[
                {
                    "chapterName": "string",
                    "duration": "string",
                    "topics": [
                        "string"
                    ],
                    "imagePrompt": "string"
                }
            ]
    }
}
, User input:`

export const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

export async function POST(req) {
    const {courseId,...formData} = await req.json();
    const user = await currentUser();

    const { has } = await auth();
    const hasPremiumAccess = has({ plan: 'starter'});

    // If user already created any course
    if(!hasPremiumAccess){
      const result = await db.select(coursesTable)
      .where(eq(coursesTable.userEmail, user?.primaryEmailAddress?.emailAddress));
      if(result?.length>=1){
        return NextResponse.json({'resp':'limit exceed'});
      }
    }

/*function saveBinaryFile(fileName: string, content: Buffer) {
  writeFile(fileName, content, 'utf8', (err) => {
    if (err) {
      console.error(`Error writing file ${fileName}:`, err);
      return;
    }
    console.log(`File ${fileName} saved to file system.`);
  });
}*/

  const config = {
    responseModalities: [
        'IMAGE',
        'TEXT',
    ],
  };
  const model = 'gemini-2.5-flash-image';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: PROMPT + JSON.stringify(formData),
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });
    console.log(response?.candidates[0].content.parts[0].text);
    const RawResp = response?.candidates[0].content.parts[0].text;
    const RawJson = RawResp.replace('```json', '').replace('```', '');
    const JSONResp = JSON.parse(RawJson);
    // Save to Database
    /* const result = await db.insert(coursesTable).values({
        ...formData,
        courseJson: JSONResp,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        cid: courseId,
    }) */

        // to create a banner using AI we can use AI Guru Lab Tech

    return NextResponse.json({ courseId: courseId });

}