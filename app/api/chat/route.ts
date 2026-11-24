import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Urgent medical symptom keywords
const URGENT_KEYWORDS_REGEX = /\b(chest\s*pain|bleeding|bleed|heart\s*attack|stroke|unconscious|difficulty\s*breathing|shortness\s*of\s*breath|seizure|severe\s*burn|poisoning|overdose|loss\s*of\s*consciousness)\b/i;

// Cache the FAQ content to avoid reading disk on every request
let cachedFaqContent = '';
function getFaqContent(): string {
  if (cachedFaqContent) return cachedFaqContent;
  try {
    const faqPath = path.join(process.cwd(), 'data', 'faq.md');
    if (fs.existsSync(faqPath)) {
      cachedFaqContent = fs.readFileSync(faqPath, 'utf8');
      return cachedFaqContent;
    }
  } catch (err) {
    console.error('Error reading data/faq.md:', err);
  }
  return '';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userMessage: string = body?.message?.trim() || '';

    if (!userMessage) {
      return NextResponse.json(
        { error: 'Message is required.' },
        { status: 400 }
      );
    }

    const emergencyNumber = '108 / +1 (800) 467-7482';
    const receptionNumber = '+1 (800) 467-7000';

    // 1. Immediate Safety Guardrail: Detect urgent words like "chest pain" or "bleeding"
    if (URGENT_KEYWORDS_REGEX.test(userMessage)) {
      return NextResponse.json({
        reply: `🚨 EMERGENCY ALERT: If you or anyone with you is experiencing chest pain, severe bleeding, or any urgent/life-threatening symptoms, DO NOT wait for online replies. Call our 24/7 Emergency Hotline immediately at ${emergencyNumber} or visit our Ground Floor Emergency & Trauma Center right away.`,
        isEmergency: true,
        emergencyNumber,
        receptionNumber,
      });
    }

    // 2. Load answers only from /data/faq.md
    const faqContent = getFaqContent();
    if (!faqContent) {
      return NextResponse.json({
        reply: "I don't have that information, please contact our reception.",
        receptionNumber,
      });
    }

    // 3. Read API Key from environment (.env.local)
    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (!apiKey) {
      return NextResponse.json({
        reply: "I don't have that information, please contact our reception.",
        receptionNumber,
        warning: "GEMINI_API_KEY is not configured in .env.local.",
      });
    }

    // 4. Construct System Prompt strictly enforcing:
    // - Answer ONLY from /data/faq.md
    // - If not there, reply: "I don't have that information, please contact our reception."
    // - Never give medical advice or diagnoses
    // - Highlight emergency contact for urgent situations
    const systemPrompt = `You are the Apex Care Hospital Enquiry Assistant.

STRICT INSTRUCTIONS & POLICIES:
1. ONLY USE THE PROVIDED FAQ KNOWLEDGE BASE: You must answer questions using ONLY the factual information contained in the FAQ document below. Do NOT assume, speculate, extrapolate, or use outside medical or general knowledge.
2. STRICT FALLBACK RULE: If the user's question cannot be completely and accurately answered directly using the FAQ document below, you MUST reply with this EXACT sentence and nothing else:
"I don't have that information, please contact our reception."
3. ABSOLUTELY NO MEDICAL ADVICE OR DIAGNOSES: You are strictly an administrative enquiry assistant. Never provide clinical diagnoses, medical interpretations of symptoms, drug prescriptions, or treatment advice under any circumstance. If asked for medical advice, tell the user to book a consultation with our hospital specialists or contact reception.
4. URGENT SYMPTOMS: If the user mentions urgent or emergency symptoms (such as chest pain, bleeding, stroke signs, difficulty breathing), immediately instruct them to call the 24/7 Emergency Line at 108 / +1 (800) 467-7482 or proceed to the Emergency Room.
5. Tone: Professional, compassionate, concise, and clear.

--- BEGIN FAQ KNOWLEDGE BASE (/data/faq.md) ---
${faqContent}
--- END FAQ KNOWLEDGE BASE ---`;

    // 5. Send message to Google Gemini API
    // Candidate models to ensure 100% uptime: starts with user's configured model, then active fallbacks
    const configuredModel = process.env.GEMINI_MODEL?.trim() || 'gemini-3.5-flash';
    const candidateModels = Array.from(
      new Set([configuredModel, 'gemini-3.5-flash', 'gemini-3.1-flash-lite', 'gemini-3.8-flash'])
    );

    let assistantReply = '';
    let lastError = '';

    for (const model of candidateModels) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const geminiResponse = await fetch(geminiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemPrompt }],
            },
            contents: [
              {
                role: 'user',
                parts: [{ text: userMessage }],
              },
            ],
            generationConfig: {
              temperature: 0.1,
              maxOutputTokens: 600,
            },
          }),
        });

        if (geminiResponse.ok) {
          const data = await geminiResponse.json();
          assistantReply =
            data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
          if (assistantReply) {
            break; // Successfully got response
          }
        } else {
          lastError = `Model ${model} returned status ${geminiResponse.status}`;
          console.warn(lastError);
        }
      } catch (modelErr: any) {
        lastError = modelErr?.message || 'Request failed';
        console.warn(`Error with ${model}:`, lastError);
      }
    }

    if (!assistantReply) {
      return NextResponse.json({
        reply: "I don't have that information, please contact our reception.",
        receptionNumber,
        error: lastError || 'No models responded successfully',
      });
    }

    return NextResponse.json({
      reply: assistantReply,
      receptionNumber,
      isEmergency:
        assistantReply.toLowerCase().includes('emergency') ||
        assistantReply.includes('108'),
    });
  } catch (error: any) {
    console.error('Error in /api/chat route:', error);
    return NextResponse.json(
      {
        reply: "I don't have that information, please contact our reception.",
        receptionNumber: '+1 (800) 467-7000',
        error: error?.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}
