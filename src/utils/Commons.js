const { parseISO, parse } = require('date-fns');
const { utcToZonedTime } = require('date-fns-tz');
const { constants } = require('./constants');

const { DATE } = constants;

class Commons {
	static getLocaleDate() {
		const parsedDate = parseISO(new Date().toISOString());
		return utcToZonedTime(parsedDate, 'America/Sao_Paulo').toISOString();
	}

	static formatDate(date, format = DATE.ISO8601) {
		return parse(date, format);
	}
}

module.exports = Commons;
