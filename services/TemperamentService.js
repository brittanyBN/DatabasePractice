class TemperamentService {
    constructor(db) {
        this.client = db.sequelize;
        this.Temperament = db.Temperament;
        this.AnimalTemperament = db.AnimalTemperament;
        console.log(db);
    }

    async create(name) {
        return this.Temperament.create(
            {
                name: name,
            }
        )
    }

    async get() {
        return this.temperament = this.Temperament.findAll({
            where: {}
        })
    }

    async deleteTemperament(TemperamentId) {
        return this.Temperament.destroy({
            where: {id: TemperamentId}
        })
    }

    async updateTemperament(TemperamentId, newName) {
        console.log("TemperamentId: " + TemperamentId);
        const temperament = await this.getTemperamentById(TemperamentId);
        temperament.name = newName;
        await temperament.save()
    .then((response) => {
            console.log("Temperament updated");
            console.log("response: " + response);
        })
            .catch((response) => {
                alert(response.statusText);
            });
    }

    async getAnimalCountByTemperamentId(animalTemperamentId) {
        return await this.AnimalTemperament.count({
            where: {TemperamentId: animalTemperamentId}
        });
    }

    async getTemperamentById(tempId) {
        return this.Temperament.findOne({
            where: {id: tempId},
        });
    }
}

module.exports = TemperamentService;