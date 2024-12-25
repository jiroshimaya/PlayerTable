//jsonファイルを同期で読み込む
const loadJsonFileSync = path => {
	let json = "";
	$.ajaxSetup({ async: false });
	$.getJSON(path)
		.done(function (data, textStatus, jqXHR) {
			console.log(jqXHR.status); //例：200
			console.log(textStatus); //例：success
			json = data;
		})
		// 5. failは、通信に失敗した時に実行される
		.fail(function (jqXHR, textStatus, errorThrown) {
			console.log(jqXHR.status); //例：404
			console.log(textStatus); //例：error
			console.log(errorThrown); //例：NOT FOUND
		});
	$.ajaxSetup({ async: true });
	return json;
}



//テキストファイルを同期で読み込む
const loadTextFileSync = path => {
	let text = "";
	$.ajaxSetup({ async: false });
	$.get(path)
		.done(function (data) {
			text = data;
		})
		.fail(function (data) {
			console.log("error", data);
		})
	$.ajaxSetup({ async: true });
	return text;
}

//csvファイルを直接読み込む場合に使うが、今は使っていない
const loadCsvFileSync = path => {
	let csvArray = [];
	$.ajaxSetup({ async: false });
	$.get(path)
		.done(function (data) {
			const parsedData = Papa.parse(data, {
				header: true,
				skipEmptyLines: true
			});
			csvArray = parsedData.data;
		})
		.fail(function (data) {
			console.log("error", data);
		})
	$.ajaxSetup({ async: true });
	return csvArray;
}
//csvファイルを直接読み込む場合に使うが、今は使っていない
const dictlistToReferenceJson = dictlist => {
	const reference = {};
	const idmemo = {}
	for (let dict of dictlist) {
		let surface = dict.surface;
		let id = dict.id;
		let original = dict.original;
		if (!(surface in idmemo)) {
			reference[surface] = []
			idmemo[surface] = []
		}

		if (!(idmemo[surface].includes(id))) {
			reference[surface].push(original)
			idmemo[surface].push(id)
		}
	}
	return reference;
}