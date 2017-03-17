const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('app3GPfBakzyWI8WO');

const extractCompanyName = (str) => {
  let [matched] = str.match(/\[(.*?)\]/g);
  return matched.substring(1, matched.length - 1);
};

const extractUrl = (str) => {
  let [matched] = str.match(/\((.*?)\)/g);
  return matched.substring(1, matched.length - 1);
};

const processor = (addition) => {
  let [companyAndUrl, location, description] = addition.split('|').map((s) => s.trim());
  let extractedCompany = extractCompanyName(companyAndUrl);
  let extractedUrl = extractUrl(companyAndUrl);

  base('Raw').create({
    Company: extractedCompany,
    URL: extractedUrl,
    Location: location,
    Description: description
  }, function(err, record) {
    if (err) { console.error(err); return; }
    console.log(record.getId());
  });
};

module.exports = processor;