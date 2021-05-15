const getPhotoPath = (path) => {
    return path ? `${process.env.REACT_APP_SERVER_URL}/${path}` : undefined
}

export default getPhotoPath
