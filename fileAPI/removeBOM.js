function readText(pathname) {                   //识别以及去除utf-8 BOM
    var bin = fs.readFileSync(pathname);

    if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
        bin = bin.slice(3);
    }

    return bin.toString('utf-8');
}