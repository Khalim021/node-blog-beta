const path = require("path");
const fs = require("fs");

const pathtodb = path.join(path.dirname(process.mainModule.filename), "database", "cardDatabase.json")



class Card {
    static async add(tesla){
      const card = await Card.fetch();

      const teslaS = card.teslaX.findIndex((s) => s.id === tesla.id);
      const client = card.teslaX[teslaS];

      if(client) {
        client.count++;
        card.teslaX[teslaS] = client;
      } else {
        tesla.count = 1;
        card.teslaX.push(tesla);
      }

      card.price += +tesla.price;

      return new Promise((resolve, reject) => {
        fs.writeFile(pathtodb, JSON.stringify(card), (err) => {
          if(err) {
            reject(err);
          } else {
            resolve();
          }
        })
      })
    };

    static async remove(id) {
      const card = await Card.fetch();

      const idx = card.teslaX.findIndex((s) => s.id === id);
      const tesla = card.teslaX[idx];

      if(tesla.count == 1) {
        card.teslaX = card.teslaX.filter((s) => s.id !== id);
      } else {
        card.teslaX[idx].count--;
      }
      card.price -= tesla.price;

      return new Promise((resolve, reject) => {
        fs.writeFile(pathtodb, JSON.stringify(card), (err) => {
          if(err) {
            reject(err);
          } else {
            resolve(card);
          }
        })
      })
    }


    static async fetch(){
      return new Promise((resolve, reject) => {
        fs.readFile(pathtodb, "utf-8", (err, content) => {
          if(err) {
            reject(err);
          } else {
            resolve(JSON.parse(content));
          }
        })
      })
  };
}

module.exports = Card;






