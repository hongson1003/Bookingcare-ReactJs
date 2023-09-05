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

let toDateString = (ngayChuoi) => {
    console.log(typeof ngayChuoi)
    var parts = ngayChuoi.split('/');
    var ngay = parseInt(parts[0], 10);
    var thang = parseInt(parts[1], 10) - 1; // Trừ 1 vì tháng trong JavaScript bắt đầu từ 0
    var nam = parseInt(parts[2], 10);

    // Tạo đối tượng ngày tháng
    var ngayThang = new Date(nam, thang, ngay);

    // Tạo đối tượng thời gian có định dạng ISO 8601
    var isoDate = ngayThang.toISOString();
    return isoDate;
}
export {
    dataUrlToBinary,
    getBase64,
    toDateString

};