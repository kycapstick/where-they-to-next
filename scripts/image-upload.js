module.exports.uploadImage = (file, user_id) => {
    return new Promise( async (resolve, reject) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("user_id", user_id);
        try {
            const uploadFile = await fetch('/api/images/upload', {
                method: 'POST',
                body: formData
            });
            const { response } = await uploadFile.json();
            return resolve(response);
        } catch (err) {
            console.log(err);
            return reject(err);
        }

    })
}