import {realm} from 'database';
import {tableNames} from 'database/tableNames';
const realmInstance = realm();
const queryHandler = realmInstance.objects(tableNames.Transfers);

export const TransfersQueries = {};
