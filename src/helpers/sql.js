/**
 * Helper for making selective update queries.
 *
 * The calling function can use it to make the SET clause of an SQL UPDATE
 * statement.
 *
 * @param dataToUpdate {Object} {field1: newVal, field2: newVal, ...}
 * @param jsToSql {Object} maps js-style data fields to database column names,
 *   like { firstName: "first_name", age: "age" }
 *
 * @returns {Object} {sqlSetCols, dataToUpdate}
 *
 * @example {firstName: 'Aliya', age: 32} =>
 *   { setCols: '"first_name"=$1, "age"=$2',
 *     values: ['Aliya', 32] }
 */

export default function sqlForPartialUpdate (dataToUpdate, jsToSql) {
  console.log('data in sql helper before if', dataToUpdate);
  // for (let key in dataToUpdate) {
  //   if (!dataToUpdate[key]) {
  //     delete dataToUpdate[key];
  //     delete jsToSql[key];
  //   }
  // }
  console.log("data and jsToSql after if statement", dataToUpdate, jsToSql);
	const keys = Object.keys(dataToUpdate);
	if (keys.length === 0) throw new Error('No data');

	// {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
	const cols = keys.map((colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`);

	return {
		setCols: cols.join(', '),
		values: Object.values(dataToUpdate)
	};
}
