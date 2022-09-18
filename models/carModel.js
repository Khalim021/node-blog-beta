const {v4: uuidv4} = require("uuid");
const fs = require("fs");
const path = require("path");
const {resolve} = require("path");

class Car {
    constructor(title, price, description, image) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.image = image;
        this.id = uuidv4();
    }

    toJSON() {
        return {
            title: this.title,
            price: this.price,
            description: this.description,
            image: this.image,
            id: this.id,
        }
    }

    static async update(tes) {
        const teslacars = await Car.getAll();

        const tesInd = teslacars.findIndex((s) => s.id === tes.id);
        teslacars[tesInd] = tes;

        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, "..", "database", "carDatabase.json"), JSON.stringify(cars), (err) => {
                if(err) {
                    reject(err);
                } else {
                  resolve();
                }
            })
        })
    }

    async save() {
        const cars = await Car.getAll();
        cars.push(this.toJSON())
        console.log("Car", cars)

        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, "..", "database", "carDatabase.json"), JSON.stringify(cars), (err) => {
                if(err) {
                    reject(err);
                } else {
                  resolve();
                }
            })
        })

    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, "..", "database", "carDatabase.json"), "utf-8", (err, content) => {
                if(err) {
                    reject(err);
                } else {
                  resolve(JSON.parse(content));
                }
            })
        })
    }

    static async getById(id) {
        const cars = await Car.getAll()
        return cars.find((c) => c.id === id)
    }
}



module.exports = Car;










