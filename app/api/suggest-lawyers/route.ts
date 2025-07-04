import { openai } from "@/config/OpenAiModel";
import { AILawyerAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {notes} = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash",
      max_tokens: 1024,
      messages: [
        {role:'system' , content:JSON.stringify(AILawyerAgents)},
        { role: "user", content: `User Notes/Issue: ${notes}. Based on these notes and issues, suggest a list of lawyers. Respond ONLY with a valid JSON array/object, no extra text, no markdown, no explanation.` }],
    });

    const rawResp = completion.choices[0].message;
    //@ts-ignore
    const Resp = rawResp.content.trim().replace('```json','').replace('```','');

    // Debug: log the raw response
    console.log('Raw model response:', rawResp.content);
    let JSONResp;
    try {
      JSONResp = JSON.parse(Resp);
    } catch (parseError) {
      return NextResponse.json({ error: 'Failed to parse model response as JSON', raw: Resp, details: (parseError instanceof Error ? parseError.toString() : String(parseError)) }, { status: 500 });
    }

    // Validate and sanitize the response to match lawyerAgent structure
    const requiredFields = ["id", "specialist", "description", "image", "agentPrompt", "subscriptionRequired"];
    let validLawyers = [];
    if (Array.isArray(JSONResp)) {
      validLawyers = JSONResp.map((item, idx) => {
        return {
          id: typeof item.id === 'number' ? item.id : idx + 1,
          specialist: typeof item.specialist === 'string' ? item.specialist : 'Unknown',
          description: typeof item.description === 'string' ? item.description : '',
          image: typeof item.image === 'string' ? item.image : '/lawyer1.png',
          agentPrompt: typeof item.agentPrompt === 'string' ? item.agentPrompt : '',
          subscriptionRequired: typeof item.subscriptionRequired === 'boolean' ? item.subscriptionRequired : false
        }
      });
    } else {
      return NextResponse.json({ error: 'Model response is not an array', raw: JSONResp }, { status: 500 });
    }
    return NextResponse.json(validLawyers);
  } catch (e) {
    return NextResponse.json(e);
  }
}