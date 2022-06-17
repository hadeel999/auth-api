'use strict';

// THIS IS THE STRETCH GOAL ...
// It takes in a schema in the constructor and uses that instead of every collection
// being the same and requiring their own schema. That's not very DRY!

class Collection {

  constructor(model) {
    this.model = model;
  }

  async createRecord(obj) {
    try {
        let newRecord = await this.model.create(obj);
        return newRecord;
    } catch (e) {
        console.error("Error in creating a new record in model ", this.model)
    }
} 

async readRecord(dataID) {
    try {
        let record = null;
        if (dataID) {
            record = await this.model.findOne({ where: { id: dataID } });
            return record;
        }
        else {
            record = await this.model.findAll();
            return record;
        }

    } catch (e) {
        console.error("Error in reading record in model ", this.model)
    }

}

async updateRecord(obj,dataID) {
  try {
    let updated = await this.model.update(obj,{where:{id:dataID},returning: true});
    return updated;
} catch (e) {
    console.error("Error in updating record in model ", this.model)
}
  }
    


async removeRecord(dataID) {
    if (!dataID) {
        throw new Error('No id provided for model ', this.model)
    }
    try {
        let deleted = await this.model.destroy({ where: { id: dataID } });
        return deleted;
    } catch (e) {
        console.error('Error in deleting record in model ', this.model);
    }
}
}

module.exports = Collection;