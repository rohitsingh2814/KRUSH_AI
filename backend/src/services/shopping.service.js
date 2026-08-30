const { getJson } = require("serpapi");

const searchProducts = async ({
    query,
    location = "India",
    minPrice,
    maxPrice
}) => {
    try {
        if (!query) {
            throw new Error("Shopping query is required");
        }

        const params = {
            engine: "google_shopping",
            q: query,
            location,
            hl: "en",
            gl: "in",
            api_key: process.env.SERPAPI_KEY
        };

        // Optional price filters
        if (minPrice !== undefined) {
            params.min_price = String(minPrice);
        }

        if (maxPrice !== undefined) {
            params.max_price = String(maxPrice);
        }

        const response = await getJson(params);

        if (response.error) {
            throw new Error(response.error);
        }

        const products = response.shopping_results || [];

        return products.map((product) => ({
            title: product.title || "",
            source: product.source || "",
            price: product.price || "",
            extractedPrice:
                product.extracted_price || null,

            oldPrice:
                product.old_price || null,

            rating:
                product.rating || null,

            reviews:
                product.reviews || 0,

            image:
                product.thumbnail ||
                product.serpapi_thumbnail ||
                "",

            productLink:
                product.product_link ||
                product.link ||
                "",

            delivery:
                product.delivery || "",

            description:
                product.snippet || "",

            position:
                product.position || null
        }));

    } catch (error) {

        console.error(
            "Shopping search error:",
            error
        );

        throw new Error(
            "Unable to fetch shopping products"
        );
    }
};


module.exports = {
    searchProducts
};