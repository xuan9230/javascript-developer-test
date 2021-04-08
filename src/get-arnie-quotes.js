const { httpGet } = require("./mock-http-interface");

const parseResBody = (body) => {
  const { message } = JSON.parse(body);
  return message || "";
};

const getArnieQuotes = async (urls) => {
  const results = [];

  await Promise.all(
    urls.map(async (url) => {
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
          FAILURE: parseResBody(body),
        });
      }
    })
  );

  return results;
};

module.exports = {
  getArnieQuotes,
};
