const { httpGet } = require("./mock-http-interface");

/**
 * Parse the response body to get the message
 * @param {*} body
 * @returns {string} message in the body
 */
const parseResBody = (body) => {
  try {
    const { message } = JSON.parse(body);
    return message || "";
  } catch (err) {
    return "Body must be an JSON object";
  }
};

const getArnieQuotes = async (urls) => {
  const results = [];

  /**
   * Get a single arnie quote with error handling
   * @param {string} url
   */
  const getArnieQuote = async (url) => {
    try {
      const { status, body } = await httpGet(url);

      if (status === 200) {
        results.push({
          "Arnie Quote": parseResBody(body),
        });
      } else {
        results.push({
          FAILURE: parseResBody(body),
        });
      }
    } catch (err) {
      results.push({
        FAILURE: (err && err.message) || "",
      });
    }
  };

  await Promise.all(urls.map(getArnieQuote));

  return results;
};

module.exports = {
  getArnieQuotes,
};
