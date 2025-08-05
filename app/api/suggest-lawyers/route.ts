import { openai } from "@/config/OpenAiModel";
import { AILawyerAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {notes} = await req.json();

  try {
    // If notes are empty or undefined, return a fallback selection of lawyers
    if (!notes || notes.trim() === "") {
      // Return a subset of the available lawyers as fallback
      const fallbackLawyers = AILawyerAgents.slice(0, 3);
      return NextResponse.json(fallbackLawyers);
    }

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash",
      max_tokens: 1024,
      messages: [
        {role:'system' , content:`You are a legal assistant helping to match client needs with appropriate lawyers. Here is the list of available lawyers: ${JSON.stringify(AILawyerAgents)}`},
        { role: "user", content: `User Notes/Issue: ${notes}. Based on these notes and issues, suggest a list of lawyers from the provided list. Respond ONLY with a valid JSON array containing lawyer objects with the same structure as the provided list. Include id, specialist, description, image, agentPrompt, and subscriptionRequired fields.` }
      ],
    });

    const rawResp = completion.choices[0].message;
    //@ts-ignore
    const Resp = rawResp.content.trim().replace(/```json|```/g,'');

    // Debug: log the raw response
    console.log('Raw model response:', rawResp.content);
    
    let JSONResp;
    try {
      JSONResp = JSON.parse(Resp);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      // Fallback to returning a subset of the available lawyers
      return NextResponse.json(AILawyerAgents.slice(0, 3));
    }

    // Validate and sanitize the response to match lawyerAgent structure
    let validLawyers = [];
    if (Array.isArray(JSONResp)) {
      validLawyers = JSONResp.map((item, idx) => {
        // Find a matching lawyer from the original list if possible
        const matchingLawyer = AILawyerAgents.find(lawyer => 
          lawyer.id === item.id || lawyer.specialist === item.specialist
        );
        
        // Use matching lawyer data or fallback to sanitized item data
        return matchingLawyer || {
          id: typeof item.id === 'number' ? item.id : idx + 1,
          specialist: typeof item.specialist === 'string' ? item.specialist : 'Unknown',
          description: typeof item.description === 'string' ? item.description : '',
          image: typeof item.image === 'string' ? item.image : '/gen.png',
          agentPrompt: typeof item.agentPrompt === 'string' ? item.agentPrompt : '',
          subscriptionRequired: typeof item.subscriptionRequired === 'boolean' ? item.subscriptionRequired : false
        };
      });
    } else {
      // Fallback to returning a subset of the available lawyers
      validLawyers = AILawyerAgents.slice(0, 3);
    }
    
    return NextResponse.json(validLawyers);
  } catch (e) {
    console.error('API error:', e);
    // Return a fallback response instead of the error
    return NextResponse.json(AILawyerAgents.slice(0, 3));
  }
}