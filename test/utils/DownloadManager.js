function DownloadManager() {

}

DownloadManager.prototype.downloadWebPage = function(url) {
    console.log('downloadWebPage');

    var defer = Promise.defer();
    setTimeout(() => {
        defer.resolve('content of the webpage ' + url);
    }, 1000);

    return defer.promise;
}

DownloadManager.prototype.downloadAsset = function(assetUrl) {
    console.log('downloadAsset');

    var defer = Promise.defer();
    setTimeout(() => {
        defer.resolve('content of the asset ' + assetUrl);
    }, 1000);

    return defer.promise;
}


module.exports = DownloadManager;