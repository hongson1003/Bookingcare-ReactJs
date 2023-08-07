let dataUrlToBinary = (dataUrl) => {
    const base64Data = dataUrl.split(',')[1];
    const binaryData = Buffer.from(base64Data, 'base64'); // chuyen ve binary
    return binaryData;
}
let getBase64 = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        let x64 = '';
        reader.onload = () => {
            x64 = reader.result;
            resolve(x64);
        }

    })
}
export {
    dataUrlToBinary,
    getBase64

};