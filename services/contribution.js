const db = require('./db');
const config = require('../config');

function getMultiple(page = 1) {
    const offset = (page - 1) * config.listPerPage;
    const data = db.query(`SELECT * FROM contribution  LIMIT ?,?`, [offset, config.listPerPage]);
    const meta = { page };

    return {
        data,
        meta
    }
}

function addContribution(contribtion_object){

    const {username, filename, track, response} = contribtion_object;
    console.log('response', response)

    let feed = ''

    if (track == 'gender') {
        const {clarity, identity_type, depict_accuracy, subject_relevance} = response
        feed = db.run('INSERT INTO gender(username, filename, clarity, identity_type, depict_accuracy, subject_relevance)\
                VALUES(@username, @filename, @clarity, @identity_type, @depict_accuracy, @subject_relevance)',
                {username, filename, clarity, identity_type, depict_accuracy, subject_relevance});
    }else if(track == 'culture'){
        const {region, familiarity, region_alt, subject_relevance}  = response
        feed = db.run('INSERT INTO culture(username, filename, region, familiarity, region_alt, subject_relevance)\
                VALUES(@username, @filename, @region, @familiarity, @region_alt,  @subject_relevance)',
                {username, filename, region, familiarity, region_alt,  subject_relevance});
    }else{
        const {region, accuracy, region_alt, representation}  = response
        feed = db.run('INSERT INTO cloth(username, filename, region, accuracy, region_alt, representation)\
                VALUES(@username, @filename, @region, @accuracy, @region_alt, @representation)',
                {username, filename, region, accuracy, region_alt, representation});
    }

    let res = {}
    if (feed.changes) {
        res.status = 'success';
        res.message = 'Contribution saved successfully'
    }
    return res;
}

module.exports = {
    getMultiple,
    addContribution
}