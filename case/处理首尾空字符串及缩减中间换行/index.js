// 调用即可
formatContent:(val) => {
	return val.replace(/^\s+|\s+$/g, '').replace(/\n{3,}/g, '\n\n');
}
