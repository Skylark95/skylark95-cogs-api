const csvFilePath = 'wingspan/master.csv';
const csv = require('csvtojson');
const fs = require('fs');

// create wingspan db
csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    let birds = []; 
    jsonObj.forEach(row => {
      if (row["Common name"] == "") {
        return;
      }
      let id = row["Common name"].toLowerCase().replaceAll(' ', '-').replaceAll('\'', '');
      birds.push({
        id: id,
        name: row["Common name"],
        expansion: row["Expansion"],
        color: row["Color"],
        points: parseInt(row["Victory points"]),
        url: `/wingspan/v1/birds/${id}`
      });
    });
    fs.writeFileSync('wingspan/db.json', JSON.stringify({birds: birds}));
  });