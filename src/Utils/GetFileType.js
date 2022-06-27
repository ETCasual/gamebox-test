const getFileType = (filename) => {
    return filename?.length > 0
        ? filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
        : "";
};

export default getFileType;
