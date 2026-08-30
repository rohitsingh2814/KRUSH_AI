const { GoogleGenAI, Type } = require("@google/genai");


// ======================================================
// GEMINI CLIENT
// ======================================================

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


// ======================================================
// RESPONSE SCHEMA
// ======================================================

const fashionSchema = {
    type: Type.OBJECT,

    properties: {

        appearance: {
            type: Type.OBJECT,

            properties: {
                skinTone: {
                    type: Type.STRING
                },

                undertone: {
                    type: Type.STRING,
                    enum: [
                        "warm",
                        "cool",
                        "neutral",
                        "olive",
                        "uncertain"
                    ]
                },

                confidence: {
                    type: Type.NUMBER
                }
            },

            required: [
                "skinTone",
                "undertone",
                "confidence"
            ]
        },


        style: {
            type: Type.OBJECT,

            properties: {
                currentStyle: {
                    type: Type.STRING
                },

                formality: {
                    type: Type.STRING
                }
            },

            required: [
                "currentStyle",
                "formality"
            ]
        },


        colors: {
            type: Type.OBJECT,

            properties: {

                recommended: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.STRING
                    }
                },

                avoid: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.STRING
                    }
                }
            },

            required: [
                "recommended",
                "avoid"
            ]
        },


        outfit: {
            type: Type.OBJECT,

            properties: {

                top: {
                    type: Type.STRING
                },

                bottom: {
                    type: Type.STRING
                },

                shoes: {
                    type: Type.STRING
                },

                accessories: {
                    type: Type.ARRAY,

                    items: {
                        type: Type.STRING
                    }
                }
            },

            required: [
                "top",
                "bottom",
                "shoes",
                "accessories"
            ]
        },


        stylingTips: {
            type: Type.ARRAY,

            items: {
                type: Type.STRING
            }
        },


        shoppingQueries: {
            type: Type.ARRAY,

            items: {
                type: Type.STRING
            }
        }
    },

    required: [
        "appearance",
        "style",
        "colors",
        "outfit",
        "stylingTips",
        "shoppingQueries"
    ]
};


// ======================================================
// ANALYZE FASHION
// ======================================================

const analyzeFashion = async ({
    imageBuffer,
    mimeType,
    preferences = {},
    occasion
}) => {

    // --------------------------------------------------
    // Validation
    // --------------------------------------------------

    if (!imageBuffer) {
        throw new Error("Image is required");
    }

    if (!mimeType) {
        throw new Error(
            "Image MIME type is required"
        );
    }

    if (!occasion) {
        throw new Error(
            "Occasion is required"
        );
    }

    if (!process.env.GEMINI_API_KEY) {
        throw new Error(
            "GEMINI_API_KEY is missing"
        );
    }


    // --------------------------------------------------
    // Convert image to Base64
    // --------------------------------------------------

    const base64Image =
        imageBuffer.toString("base64");


    // --------------------------------------------------
    // Preferences
    // --------------------------------------------------

    const preferredColors =
        Array.isArray(preferences.preferredColors)
            ? preferences.preferredColors.join(", ")
            : "Not specified";


    const preferredStyles =
        Array.isArray(preferences.style)
            ? preferences.style.join(", ")
            : "Not specified";


    const budget =
        preferences.budget?.max
            ? `Up to ${preferences.budget.max}`
            : "Not specified";


    // --------------------------------------------------
    // Prompt
    // --------------------------------------------------

    const prompt = `
You are Krush AI, an expert personal fashion stylist.

Analyze the uploaded photograph and create a
personalized fashion recommendation.

OCCASION:
${occasion}

USER PREFERENCES:

Gender:
${preferences.gender || "Not specified"}

Age Range:
${preferences.ageRange || "Not specified"}

Preferred Colors:
${preferredColors}

Preferred Styles:
${preferredStyles}

Maximum Budget:
${budget}


ANALYZE:

- Visible clothing
- Visible clothing colors
- Overall visible fashion style
- Approximate visible skin tone
- Approximate color undertone
- Suitable colors
- Colors that may be less flattering
- Suitable clothing for the occasion
- Suitable shoes
- Suitable accessories


IMPORTANT RULES:

Do not identify the person.

Do not determine the person's identity.

Do not infer sensitive personal attributes.

Do not guess exact body measurements.

Do not make medical claims.

Skin tone and undertone are approximate visual
color analysis only.

Lighting and camera quality can affect the result.

If the image is unclear, use "uncertain".


OUTFIT:

Create ONE complete outfit.

The outfit must contain:

- Top
- Bottom
- Shoes
- Accessories


SHOPPING QUERIES:

Create realistic ecommerce search queries.

Examples:

men cream linen shirt
men navy tailored trousers
men brown leather loafers
men leather watch

Do NOT create URLs.

Do NOT create fake product names.

Do NOT create fake prices.

Do NOT create fake retailer names.

Only create search queries.


STYLING TIPS:

Provide 3-5 useful styling tips.


RETURN:

Return ONLY JSON matching the provided schema.
`;



    // ==================================================
    // GEMINI REQUEST
    // ==================================================

    try {

        console.log(
            "Starting Gemini analysis..."
        );

        console.log(
            "Calling Gemini 3.6 Flash..."
        );


        const response =
            await ai.interactions.create({

                model:
                    "gemini-3.6-flash",

                input: [

                    {
                        type: "image",

                        data:
                            base64Image,

                        mime_type:
                            mimeType
                    },

                    {
                        type: "text",

                        text:
                            prompt
                    }

                ],

                response_format: {

                    type: "text",

                    mime_type:
                        "application/json",

                    schema:
                        fashionSchema
                },

                generation_config: {

                    temperature: 0.4,

                    max_output_tokens: 2000

                }

            });


        console.log(
            "Gemini response received"
        );


        // ==================================================
        // CHECK RESPONSE
        // ==================================================

        if (!response) {

            throw new Error(
                "Empty response from Gemini"
            );
        }


        console.log(
            "Gemini output received"
        );


        if (!response.output_text) {

            console.error(
                "Full Gemini response:",
                response
            );

            throw new Error(
                "Gemini returned no output text"
            );
        }


        // ==================================================
        // PARSE JSON
        // ==================================================

        let result;

        try {

            result =
                JSON.parse(
                    response.output_text
                );

        } catch (error) {

            console.error(
                "JSON parsing failed"
            );

            console.error(
                "Gemini output:",
                response.output_text
            );

            throw new Error(
                "Gemini returned invalid JSON"
            );
        }


        // ==================================================
        // VALIDATE RESULT
        // ==================================================

        if (!result.appearance) {

            throw new Error(
                "Missing appearance data"
            );
        }


        if (!result.style) {

            throw new Error(
                "Missing style data"
            );
        }


        if (!result.colors) {

            throw new Error(
                "Missing colors data"
            );
        }


        if (!result.outfit) {

            throw new Error(
                "Missing outfit data"
            );
        }


        if (!Array.isArray(
            result.stylingTips
        )) {

            result.stylingTips = [];

        }


        if (!Array.isArray(
            result.shoppingQueries
        )) {

            result.shoppingQueries = [];

        }


        // Limit shopping queries

        result.shoppingQueries =
            result.shoppingQueries
                .filter(
                    query =>
                        typeof query === "string" &&
                        query.trim().length > 0
                )
                .slice(0, 5);


        // ==================================================
        // RETURN
        // ==================================================

        return result;


    } catch (error) {

        console.error(
            "Gemini fashion analysis error:",
            error
        );

        throw error;
    }
};


// ======================================================
// EXPORT
// ======================================================

module.exports = {
    analyzeFashion
};