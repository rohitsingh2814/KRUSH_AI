const Analysis = require("../models/Analysis");

const {
    analyzeFashion
} = require("../services/gemini.service");

const {
    searchProducts
} = require("../services/shopping.service");


const analyzeOutfit = async (req, res) => {

    try {

        // -----------------------------
        // 1. Check uploaded image
        // -----------------------------

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a photo"
            });
        }


        // -----------------------------
        // 2. Check occasion
        // -----------------------------

        const {
            occasion
        } = req.body;

        if (!occasion) {
            return res.status(400).json({
                success: false,
                message: "Occasion is required"
            });
        }


        // -----------------------------
        // 3. Get logged-in user
        // -----------------------------

        const user = req.user;

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }


        // -----------------------------
        // 4. Get user preferences
        // -----------------------------

        const preferences =
            user.preferences || {};


        // -----------------------------
        // 5. Send image to Gemini
        // -----------------------------

        console.log(
            "Starting Gemini analysis..."
        );

        const aiResult =
            await analyzeFashion({

                imageBuffer:
                    req.file.buffer,

                mimeType:
                    req.file.mimetype,

                preferences,

                occasion
            });


        console.log(
            "Gemini analysis completed"
        );


        // -----------------------------
        // 6. Search ecommerce products
        // -----------------------------

        const shoppingQueries =
            aiResult.shoppingQueries || [];


        const productResults = [];


        /*
         * Limit the number of queries.
         *
         * This prevents unnecessary
         * API usage.
         */

        const queries =
            shoppingQueries.slice(0, 5);


        for (const query of queries) {

            try {

                console.log(
                    `Searching products: ${query}`
                );


                const products =
                    await searchProducts({

                        query,

                        location: "India",

                        minPrice:
                            preferences.budget?.min,

                        maxPrice:
                            preferences.budget?.max
                    });


                productResults.push({

                    query,

                    products:
                        products.slice(0, 5)

                });


            } catch (error) {

                console.error(
                    `Product search failed for: ${query}`,
                    error.message
                );

                /*
                 * Don't fail the entire
                 * analysis if one shopping
                 * search fails.
                 */

                productResults.push({

                    query,

                    products: []

                });

            }

        }


        // -----------------------------
        // 7. Save analysis
        // -----------------------------

        const analysis =
            await Analysis.create({

                user: user._id,

                occasion,

                appearance:
                    aiResult.appearance,

                colors:
                    aiResult.colors,

                style:
                    aiResult.style,

                outfit:
                    aiResult.outfit,

                shoppingQueries,

                products:
                    productResults.flatMap(
                        item => item.products
                    )

            });


        // -----------------------------
        // 8. Send response
        // -----------------------------

        return res.status(200).json({

            success: true,

            message:
                "Fashion analysis completed",

            analysis: {

                id: analysis._id,

                occasion,

                appearance:
                    aiResult.appearance,

                colors:
                    aiResult.colors,

                style:
                    aiResult.style,

                outfit:
                    aiResult.outfit,

                stylingTips:
                    aiResult.stylingTips,

                shoppingQueries

            },

            products:
                productResults

        });


    } catch (error) {

        console.error(
            "Fashion analysis error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to analyze outfit"

        });

    }
};


module.exports = {
    analyzeOutfit
};